// limit-cockpit: zeigt Abo-Limit, Rücksetzzeit und Kontext-Füllstand über dem Eingabefeld,
// nach jeder Antwort die größten Token-Treiber, und schreibt auf Wunsch eine Übergabe für einen neuen Chat.
//
// Ehrlichkeitsregeln:
// - Limit-Prozente und Rücksetzzeit kommen nur aus dem, was die API meldet (session.measure / $.session.usage).
// - Token-Zahlen gibt es von der API nur pro Modell-Anfrage. Einzelne Werkzeuge bekommen keine Token-Zahl,
//   nur ihre gemessene Ausgabegröße in Zeichen; eine Token-Schätzung daraus ist als "≈" gekennzeichnet.
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, RenderSurface } from 'claude-code'

import type { Kontext, Limits, Uebergabe } from '../types'

const limitsAtom = atom({ plugin: 'limit-cockpit', key: 'limits' } as const, { gemeldet: false } as Limits)
const kontextAtom = atom({ plugin: 'limit-cockpit', key: 'kontext' } as const, {} as Kontext)
const uebergabeAtom = atom({ plugin: 'limit-cockpit', key: 'uebergabe' } as const, { zustand: 'bereit' } as Uebergabe)

export const WARNUNG_WOCHE = 75
export const HINWEIS_KOPIERT = 'Übergabe kopiert. Neuen Chat öffnen und Cmd+V beziehungsweise Strg+V drücken.'

type Anfrage = { nr: number; modell: string; lesen: number; schreiben: number; neu: number; aus: number; subagent: boolean }
type Werkzeug = { name: string; ziel: string; zeichen: number }

// Pro Antwort gesammelt, beim nächsten Prompt geleert
let anfragen: Anfrage[] = []
let werkzeuge: Werkzeug[] = []

export function kurzTokens(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.', ',') + ' Mio.'
  if (n >= 1_000) return Math.round(n / 1_000) + 'k'
  return String(n)
}

export function uhrzeit(iso: string | undefined, jetzt: number): string {
  if (!iso) return 'unbekannt'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'unbekannt'
  const zeit = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  const heute = new Date(jetzt).toDateString() === d.toDateString()
  return heute ? zeit : d.toLocaleDateString('de-DE', { weekday: 'short' }) + ' ' + zeit
}

export function limitsAus(rateLimits: readonly { kind: string; percentUsed: number; resetsAt?: string }[]): Limits {
  const finde = (art: string) => rateLimits.find(r => r.kind === art)
  const f = finde('five_hour')
  const w = finde('seven_day')
  return {
    gemeldet: rateLimits.length > 0,
    fuenfStunden: f ? { prozent: f.percentUsed, zurueck: f.resetsAt } : undefined,
    woche: w ? { prozent: w.percentUsed, zurueck: w.resetsAt } : undefined,
  }
}

export function leistenText(limits: Limits, kontext: Kontext, jetzt: number): string {
  const teile: string[] = []
  if (limits.fuenfStunden) {
    teile.push(`5-Std.-Limit ${limits.fuenfStunden.prozent} % · zurück ${uhrzeit(limits.fuenfStunden.zurueck, jetzt)}`)
  } else {
    teile.push(limits.gemeldet ? '5-Std.-Limit: nicht gemeldet' : '5-Std.-Limit: noch keine Messung')
  }
  if (kontext.prozent !== undefined) {
    const menge = kontext.tokens !== undefined && kontext.fenster ? ` (${kurzTokens(kontext.tokens)} von ${kurzTokens(kontext.fenster)})` : ''
    teile.push(`Kontext ${Math.round(kontext.prozent)} %${menge}`)
  } else {
    teile.push('Kontext: noch keine Messung')
  }
  return teile.join('  ·  ')
}

export function wochenWarnung(limits: Limits, jetzt: number): string | undefined {
  const w = limits.woche
  if (!w || w.prozent < WARNUNG_WOCHE) return undefined
  return `Wochenlimit ${w.prozent} % verbraucht · zurück ${uhrzeit(w.zurueck, jetzt)}`
}

// Die drei größten Treiber einer Antwort: gemessen je Modell-Anfrage, dazu die größten Werkzeug-Ausgaben in Zeichen.
export function treiberZeile(liste: readonly Anfrage[], tools: readonly Werkzeug[]): string {
  if (liste.length === 0) return 'Token-Treiber: keine Anfrage mit Nutzungsdaten gemeldet.'
  const summe = (a: Anfrage) => a.lesen + a.schreiben + a.neu + a.aus
  const top = [...liste].sort((a, b) => summe(b) - summe(a)).slice(0, 3)
  const teile = top.map(a => {
    const wer = a.subagent ? 'Subagent' : a.modell.replace(/^claude-/, '')
    return `Anfrage ${a.nr} (${wer}): ${kurzTokens(summe(a))} [Cache lesen ${kurzTokens(a.lesen)}, schreiben ${kurzTokens(a.schreiben)}, neu ${kurzTokens(a.neu)}, Ausgabe ${kurzTokens(a.aus)}]`
  })
  let zeile = 'Größte Treiber (gemessen je Anfrage): ' + teile.join(' · ')
  const grosse = [...tools].sort((a, b) => b.zeichen - a.zeichen).slice(0, 3).filter(w => w.zeichen > 0)
  if (grosse.length > 0) {
    zeile += '\nGrößte Werkzeug-Ausgaben (gemessen in Zeichen, Tokens nur geschätzt): ' +
      grosse.map(w => `${w.name}${w.ziel ? ' ' + w.ziel : ''}: ${kurzTokens(w.zeichen)} Zeichen ≈ ${kurzTokens(Math.round(w.zeichen / 4))} Tokens`).join(' · ')
  }
  return zeile
}

function zielVon(e: { tool: string } & Record<string, unknown>): string {
  const pfad = typeof e.file_path === 'string' ? e.file_path : typeof e.path === 'string' ? e.path : ''
  if (pfad) return pfad.split('/').slice(-1)[0] ?? ''
  if (typeof e.command === 'string') return '`' + e.command.slice(0, 30) + (e.command.length > 30 ? '…' : '') + '`'
  return ''
}

// Gemessene Größe der Werkzeug-Ausgabe in Zeichen: der Text, den das Modell liest, sonst die Rohausgabe
export function ausgabeZeichen(text: string | undefined, roh: unknown): number {
  if (typeof text === 'string') return text.length
  if (typeof roh === 'string') return roh.length
  if (roh === undefined || roh === null) return 0
  try {
    return JSON.stringify(roh).length
  } catch {
    return 0
  }
}

const UEBERGABE_AUFTRAG = [
  'Schreibe eine kompakte Übergabe dieser Sitzung für einen neuen Chat, auf Deutsch, höchstens 300 Wörter.',
  'Gliederung genau so: "Ziel:", "Aktueller Stand:", "Nächste Schritte:" (nummeriert), "Wichtige Dateien:" (Pfade mit je einem Halbsatz).',
  'Keine Passwörter, Schlüssel oder persönlichen Daten übernehmen. Nur Fakten aus diesem Verlauf, nichts erfinden.',
].join('\n')

async function uebergabeErstellen($: EngineInterface, surface: RenderSurface | undefined): Promise<string> {
  await update($, uebergabeAtom, () => ({ zustand: 'schreibt' }) as Uebergabe)
  $.ui.invalidate('ui.render')
  const antwort = await $.model.fork({ prompt: UEBERGABE_AUFTRAG })
  if (!antwort.isAnswered) {
    await update($, uebergabeAtom, () => ({ zustand: 'fehler', hinweis: 'Die Übergabe konnte nicht geschrieben werden.' }) as Uebergabe)
    $.ui.invalidate('ui.render')
    return 'Die Übergabe konnte nicht geschrieben werden (Modell-Anfrage fehlgeschlagen). Nichts wurde kopiert.'
  }
  const text = antwort.text.trim()
  const kopie = await $.ui.copy(surface ? { text, surface } : { text })
  const verbrauch = `Diese Übergabe hat eine zusätzliche Modell-Anfrage gekostet: ${kurzTokens(antwort.usage.cache_read_input_tokens)} Tokens aus dem Cache gelesen, ${kurzTokens(antwort.usage.cache_creation_input_tokens)} geschrieben, ${kurzTokens(antwort.usage.input_tokens)} neu, ${kurzTokens(antwort.usage.output_tokens)} Ausgabe.`
  if (kopie.isCopied) {
    await update($, uebergabeAtom, () => ({ zustand: 'kopiert', hinweis: HINWEIS_KOPIERT }) as Uebergabe)
    $.ui.toast(HINWEIS_KOPIERT, { timeoutMs: 8000 })
    $.ui.invalidate('ui.render')
    return `${HINWEIS_KOPIERT}\n\n${text}\n\n${verbrauch}`
  }
  await update($, uebergabeAtom, () => ({ zustand: 'nicht-kopiert', hinweis: 'Kopieren war hier nicht möglich. Bitte den Text unten markieren und kopieren.' }) as Uebergabe)
  $.ui.invalidate('ui.render')
  return `Kopieren in die Zwischenablage war hier nicht möglich (${kopie.reason}). Bitte den Text markieren, kopieren, einen neuen Chat öffnen und einfügen.\n\n${text}\n\n${verbrauch}`
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'handoff', description: 'Übergabe dieser Sitzung schreiben und in die Zwischenablage kopieren (kostet eine Modell-Anfrage)' })
    await $.command.register({ name: 'cockpit', description: 'Limit, Rücksetzzeit und Kontext als Text anzeigen' })
    const jetzt = await $.session.usage()
    await update($, limitsAtom, () => limitsAus(jetzt.rateLimits))
    await update($, kontextAtom, () => ({ tokens: jetzt.context.tokens ?? undefined, fenster: jetzt.context.window ?? undefined, prozent: jetzt.context.percent ?? undefined }))
    return next(e)
  })

  // Nach jeder Antwort und wenn sich ein Limit um einen ganzen Punkt bewegt
  on('session.measure', async ($, e, next) => {
    await update($, limitsAtom, () => limitsAus(e.rateLimits))
    await update($, kontextAtom, () => ({ tokens: e.context.tokens ?? undefined, fenster: e.context.window ?? undefined, prozent: e.context.percent ?? undefined }))
    $.ui.invalidate('ui.render')
    return next(e)
  })

  on('turn.start', ($, e, next) => {
    anfragen = []
    werkzeuge = []
    return next(e)
  })

  // Jede Modell-Anfrage: die API meldet hier ihre Nutzung, das ist die gemessene Basis
  on('turn.step', async function* ($, e, next) {
    const ergebnis = yield* next(e)
    if (ergebnis.usage) {
      anfragen.push({
        nr: anfragen.length + 1,
        modell: ergebnis.usage.model,
        lesen: ergebnis.usage.cache_read_input_tokens,
        schreiben: ergebnis.usage.cache_creation_input_tokens,
        neu: ergebnis.usage.input_tokens,
        aus: ergebnis.usage.output_tokens,
        subagent: e.agentId !== undefined,
      })
    }
    return ergebnis
  })

  on('tool.call', async ($, e, next) => {
    const ergebnis = await next(e)
    // Nur beobachten: Fehler hier dürfen den Werkzeugaufruf nie verändern
    if (ergebnis.deny === undefined) {
      werkzeuge.push({ name: e.tool, ziel: zielVon(e as unknown as { tool: string } & Record<string, unknown>), zeichen: ausgabeZeichen(ergebnis.text, ergebnis.result) })
    }
    return ergebnis
  }).catch(($, e, next) => next(e)) // reines Beobachten: bei einem Fehler läuft der Aufruf unverändert weiter

  // Eine kurze Zeile unter jeder Antwort des Hauptverlaufs
  on('turn.complete', async ($, e, next) => {
    const ergebnis = await next(e)
    if (e.agentId !== undefined || e.reason !== 'answer') return ergebnis
    return { ...ergebnis, text: treiberZeile(anfragen, werkzeuge) }
  })

  on('command.run', { command: 'cockpit' }, async $ => {
    const jetzt = await $.clock.now()
    const limits = await read($, limitsAtom)
    const kontext = await read($, kontextAtom)
    const warnung = wochenWarnung(limits, jetzt)
    return { text: leistenText(limits, kontext, jetzt) + (warnung ? '\nAchtung: ' + warnung : '') + '\n' + treiberZeile(anfragen, werkzeuge) }
  })

  on('command.run', { command: 'handoff' }, async ($, e) => {
    const flaechen = await $.session.surfaces()
    return { text: await uebergabeErstellen($, flaechen[0]) }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    // Was andere Mods und Claude Code hier zeichnen, bleibt darunter erhalten
    const darunter = await next(e)
    if (e.props.hasSurvey) return darunter
    const { Box, Text, Button } = $.ui.resolve(e)
    const jetzt = await $.clock.now()
    const limits = await read($, limitsAtom)
    const kontext = await read($, kontextAtom)
    const uebergabe = await read($, uebergabeAtom)
    const warnung = wochenWarnung(limits, jetzt)
    const knopfText = uebergabe.zustand === 'schreibt' ? 'Übergabe wird geschrieben …' : 'Neuer Chat mit Übergabe'
    return (
      <Box flexDirection="column">
        <Box>
          <Text dimColor>{leistenText(limits, kontext, jetzt)}  </Text>
          <Button
            key="uebergabe"
            label={knopfText}
            onPress={async () => {
              if (uebergabe.zustand === 'schreibt') return
              await uebergabeErstellen($, e.surface)
            }}
          />
        </Box>
        {warnung !== undefined && <Text color="yellow">⚠ {warnung}</Text>}
        {uebergabe.hinweis !== undefined && uebergabe.zustand !== 'schreibt' && <Text dimColor>{uebergabe.hinweis}</Text>}
        {darunter}
      </Box>
    )
  })
}
