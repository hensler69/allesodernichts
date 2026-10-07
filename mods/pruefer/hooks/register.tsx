// pruefer: "fertig" heißt erst fertig, wenn es Belege gibt.
// Während Claude arbeitet, beobachtet die Mod nur. Erst beim Abgeben (Stop) urteilt sie nach Belegen:
// geänderte Dateien, und danach gelaufene Tests, Builds, Typchecks oder Aufrufe mit Ergebnis.
// Höchstens zweimal pro Antwort zurückschicken; nie bei Rückfragen, Hintergrundjobs oder ohne Oberfläche (headless).
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Abgabe, Aenderung, Check, Learning, Zweit } from '../types'
import { aendertDateien, checkArt, istRueckfrage, istSchwierig, rueckmeldung, urteile } from './beleg.ts'

const PANE = 'pruefer'
const anAtom = atom({ plugin: 'pruefer', key: 'an' } as const, true)
const aenderungenAtom = atom({ plugin: 'pruefer', key: 'aenderungen' } as const, [] as Aenderung[])
const checksAtom = atom({ plugin: 'pruefer', key: 'checks' } as const, [] as Check[])
const abgabeAtom = atom({ plugin: 'pruefer', key: 'abgabe' } as const, { zustand: 'beobachtet', sperren: 0 } as Abgabe)
const learningsAtom = atom({ plugin: 'pruefer', key: 'learnings' } as const, [] as Learning[])
const zweitAtom = atom({ plugin: 'pruefer', key: 'zweit' } as const, { an: true } as Zweit)

export const MAX_SPERREN = 2
export const LEARNINGS_DATEI = '.claude/pruefer-learnings.md'

// Pro Nutzer-Prompt
let nr = 0
let auftrag = ''
let startMs = 0

function learningsAlsText(liste: readonly Learning[]): string {
  return ['# Learnings des Prüfers', '', 'Abgaben, die in diesem Projekt angehalten wurden. Daraus lernen: nach jeder Änderung prüfen, dann abgeben.', '', ...liste.map(l => `- ${l.datum}: ${l.text}`), ''].join('\n')
}

export function learningsAusText(text: string): Learning[] {
  return text.split('\n').map(z => /^- (\d{4}-\d{2}-\d{2}): (.+)$/.exec(z)).filter((m): m is RegExpExecArray => m !== null).map(m => ({ datum: m[1] ?? '', text: m[2] ?? '' }))
}

async function learningsLaden($: EngineInterface): Promise<Learning[]> {
  const root = await $.session.root()
  try {
    return learningsAusText(String(await $.fs.read(root + '/' + LEARNINGS_DATEI)))
  } catch {
    return []
  }
}

async function learningMerken($: EngineInterface, text: string): Promise<void> {
  const datum = new Date(await $.clock.now()).toISOString().slice(0, 10)
  const alt = await learningsLaden($)
  const neu = [...alt.filter(l => l.text !== text), { datum, text }].slice(-30)
  const root = await $.session.root()
  try {
    await $.fs.write(root + '/' + LEARNINGS_DATEI, learningsAlsText(neu))
  } catch {
    // Schreiben ging nicht (zum Beispiel schreibgeschützt): dann nur in dieser Sitzung merken
  }
  await update($, learningsAtom, () => neu)
}

async function zustand($: EngineInterface, z: Abgabe['zustand'], grund: string | undefined, sperren: number): Promise<void> {
  await update($, abgabeAtom, () => ({ zustand: z, grund, sperren }))
  $.ui.invalidate('ui.render')
}

// Unabhängige Gegenprüfung durch ein zweites Modell. Antwortet mit "OK" oder "LUECKE: …".
async function zweitPruefung($: EngineInterface, antwort: string, aenderungen: readonly Aenderung[], checks: readonly Check[]): Promise<string | undefined> {
  const haupt = await $.session.model()
  const modell = /opus/i.test(haupt) ? 'sonnet' : 'opus'
  $.ui.toast(`pruefer: Zweitprüfung durch ${modell} läuft. Das kostet zusätzlich eine Modell-Anfrage.`, { timeoutMs: 6000 })
  const r = await $.model.complete({
    model: modell,
    maxTokens: 400,
    system: 'Du prüfst unabhängig, ob eine Programmieraufgabe belegt erledigt ist. Antworte in der ersten Zeile nur mit "OK" oder mit "LUECKE: <ein Satz, was fehlt>". Urteile nur nach den gelieferten Fakten.',
    prompt: [
      `Aufgabe des Nutzers:\n${auftrag.slice(0, 2000)}`,
      `Tatsächlich geänderte Dateien:\n${aenderungen.map(a => `- ${a.pfad} (${a.per})`).join('\n')}`,
      `Tatsächlich gelaufene Checks (Reihenfolge, Ergebnis):\n${checks.map(c => `- [${c.ok ? 'grün' : 'rot'}] ${c.art}: ${c.befehl.slice(0, 120)}`).join('\n') || '- keine'}`,
      `Abschlussantwort des Assistenten:\n${antwort.slice(0, 3000)}`,
    ].join('\n\n'),
  })
  if (!r.isAnswered) return undefined
  const tokens = r.usage.input_tokens + r.usage.output_tokens + r.usage.cache_read_input_tokens + r.usage.cache_creation_input_tokens
  const ersteZeile = r.text.trim().split('\n')[0] ?? ''
  await update($, zweitAtom, z => ({ ...z, letzte: ersteZeile.slice(0, 200), tokens: (z.tokens ?? 0) + tokens }))
  return /^LUECKE:/i.test(ersteZeile) ? ersteZeile.replace(/^LUECKE:\s*/i, '') : undefined
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'pruefer', description: 'Prüfer an/aus (ohne Zusatz umschalten). Zusätze: an, aus, status, panel, zweit an, zweit aus' })
    const an = (await $.store.get('an')) as boolean | undefined
    const zweit = (await $.store.get('zweit')) as boolean | undefined
    await update($, anAtom, () => an !== false)
    await update($, zweitAtom, z => ({ ...z, an: zweit !== false }))
    await update($, learningsAtom, () => [])
    const flaechen = await $.session.surfaces()
    if (flaechen.length > 0) void $.ui.open({ id: PANE, title: 'Prüfer' })
    return next(e)
  })

  // Neue Sitzung im selben Projekt: Learnings automatisch mitgeben
  on('classic.SessionStart', async ($, e, next) => {
    const ergebnis = await next(e)
    const liste = await learningsLaden($)
    await update($, learningsAtom, () => liste)
    if (liste.length === 0) return ergebnis
    const text = 'Learnings des Prüfers aus früheren Sitzungen in diesem Projekt (nach jeder Änderung prüfen, dann abgeben):\n' + liste.slice(-10).map(l => `- ${l.text}`).join('\n')
    return { ...ergebnis, additionalContext: [...(ergebnis.additionalContext ?? []), text] }
  }).catch(($, e, next) => next(e))

  // Ein neuer Prompt von Manuel beginnt eine neue Antwort
  on('prompt.submit', async ($, e, next) => {
    const ergebnis = await next(e)
    if (e.origin?.kind === 'plugin') return ergebnis
    nr = 0
    auftrag = e.text
    startMs = await $.clock.now()
    await update($, aenderungenAtom, () => [])
    await update($, checksAtom, () => [])
    await zustand($, (await read($, anAtom)) ? 'beobachtet' : 'aus', undefined, 0)
    return ergebnis
  }).catch(($, e, next) => next(e))

  // Nur beobachten, nie dazwischenreden
  on('tool.call', async ($, e, next) => {
    nr += 1
    const meineNr = nr
    const ergebnis = await next(e)
    if (!(await read($, anAtom)) || ergebnis.deny !== undefined) return ergebnis
    if ((e.tool === 'Write' || e.tool === 'Edit' || e.tool === 'NotebookEdit') && ergebnis.isError !== true) {
      const pfad = e.tool === 'NotebookEdit' ? e.notebook_path : e.file_path
      await update($, aenderungenAtom, l => [...l, { pfad, nr: meineNr, per: e.tool }].slice(-200))
    } else if (e.tool === 'Bash') {
      const art = checkArt(e.command)
      if (art !== undefined) {
        await update($, checksAtom, l => [...l, { befehl: e.command, art, ok: ergebnis.isError !== true, nr: meineNr }].slice(-100))
      } else if (aendertDateien(e.command) && ergebnis.isError !== true) {
        await update($, aenderungenAtom, l => [...l, { pfad: 'Befehl: ' + e.command.slice(0, 60), nr: meineNr, per: 'Bash' }].slice(-200))
      }
    }
    $.ui.invalidate('ui.render')
    return ergebnis
  }).catch(($, e, next) => next(e))

  // Erst hier wird geurteilt: wenn Claude die Antwort abgeben will
  on('classic.Stop', async ($, e, next) => {
    const ergebnis = await next(e)
    if (!(await read($, anAtom))) return ergebnis
    const abgabe = await read($, abgabeAtom)
    const antwort = e.last_assistant_message ?? ''
    if ((await $.session.surfaces()).length === 0) {
      await zustand($, 'ausnahme', 'Ohne Oberfläche (headless) wird nie angehalten.', abgabe.sperren)
      return ergebnis
    }
    if ((e.background_tasks ?? []).length > 0) {
      await zustand($, 'ausnahme', 'Es laufen noch Hintergrundjobs. Abgabe nicht angehalten.', abgabe.sperren)
      return ergebnis
    }
    if (istRueckfrage(antwort)) {
      await zustand($, 'ausnahme', 'Rückfrage an Manuel. Abgabe nicht angehalten.', abgabe.sperren)
      return ergebnis
    }
    const aenderungen = await read($, aenderungenAtom)
    const checks = await read($, checksAtom)
    let urteil = urteile(aenderungen, checks, antwort)
    if (urteil.abgabe === 'nichts-zu-pruefen') {
      await zustand($, 'bestanden', urteil.grund, abgabe.sperren)
      return ergebnis
    }
    if (urteil.abgabe === 'bestanden' && (await read($, zweitAtom)).an && abgabe.sperren < MAX_SPERREN) {
      const dauer = (await $.clock.now()) - startMs
      if (istSchwierig(new Set(aenderungen.map(a => a.pfad)).size, dauer)) {
        const luecke = await zweitPruefung($, antwort, aenderungen, checks)
        if (luecke !== undefined) urteil = { abgabe: 'zurueck', grund: `Zweitprüfung: ${luecke}` }
      }
    }
    if (urteil.abgabe === 'bestanden') {
      await zustand($, 'bestanden', urteil.grund, abgabe.sperren)
      return ergebnis
    }
    if (urteil.abgabe === 'ehrlich-offen') {
      await zustand($, 'ehrlich-offen', urteil.grund, abgabe.sperren)
      return ergebnis
    }
    if (abgabe.sperren >= MAX_SPERREN) {
      await zustand($, 'ausnahme', `Schon ${MAX_SPERREN}-mal zurückgeschickt. Abgabe durchgelassen, damit Claude nicht hängen bleibt. Offen: ${urteil.grund}`, abgabe.sperren)
      return ergebnis
    }
    const versuch = abgabe.sperren + 1
    await zustand($, 'zurueckgeschickt', urteil.grund, versuch)
    await learningMerken($, urteil.grund.replace(/ Geändert: .*$/, ''))
    return { ...ergebnis, block: rueckmeldung(urteil.grund, versuch) }
  }).catch(($, e, next) => next(e)) // Fehler im Prüfer: Abgabe durchlassen, nie hängen bleiben

  on('command.run', { command: 'pruefer' }, async ($, e) => {
    const wunsch = e.args.trim().toLowerCase()
    if (wunsch === 'panel') {
      await $.ui.open({ id: PANE, title: 'Prüfer' })
      return { text: 'Prüfer-Panel geöffnet.' }
    }
    if (wunsch === 'zweit an' || wunsch === 'zweit aus') {
      const an = wunsch === 'zweit an'
      await $.store.set('zweit', an)
      await update($, zweitAtom, z => ({ ...z, an }))
      return { text: an ? 'Zweitprüfung an: Bei schwierigen Antworten prüft ein zweites Modell gegen. Das kostet zusätzliche Anfragen.' : 'Zweitprüfung aus.' }
    }
    if (wunsch === 'status') {
      const a = await read($, abgabeAtom)
      const ae = await read($, aenderungenAtom)
      const c = await read($, checksAtom)
      return { text: `Prüfer ist ${(await read($, anAtom)) ? 'an' : 'aus'}. Abgabe: ${a.zustand}${a.grund ? ' (' + a.grund + ')' : ''}. ${new Set(ae.map(x => x.pfad)).size} Dateien geändert, ${c.length} Checks gelaufen, ${a.sperren} von ${MAX_SPERREN} Sperren genutzt.` }
    }
    const an = wunsch === 'an' ? true : wunsch === 'aus' ? false : !(await read($, anAtom))
    await $.store.set('an', an)
    await update($, anAtom, () => an)
    await zustand($, an ? 'beobachtet' : 'aus', undefined, (await read($, abgabeAtom)).sperren)
    return { text: an ? 'Prüfer ist an. Abgaben ohne Beleg werden höchstens zweimal zurückgeschickt.' : 'Prüfer ist aus.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const an = await read($, anAtom)
    const aenderungen = await read($, aenderungenAtom)
    const checks = await read($, checksAtom)
    const abgabe = await read($, abgabeAtom)
    const learnings = await read($, learningsAtom)
    const zweit = await read($, zweitAtom)
    const dateien = [...new Map(aenderungen.map(a => [a.pfad, a])).values()]
    const farbe = abgabe.zustand === 'bestanden' ? 'green' : abgabe.zustand === 'zurueckgeschickt' ? 'red' : abgabe.zustand === 'ehrlich-offen' || abgabe.zustand === 'ausnahme' ? 'yellow' : undefined
    const status: Record<Abgabe['zustand'], string> = {
      beobachtet: 'Beobachtet, urteilt erst bei der Abgabe',
      bestanden: 'Abgabe mit Beleg',
      zurueckgeschickt: `Zurückgeschickt (${abgabe.sperren} von ${MAX_SPERREN})`,
      'ehrlich-offen': 'Durchgelassen: offen als nicht getestet benannt',
      ausnahme: 'Durchgelassen (Ausnahme)',
      aus: 'Prüfer ist aus',
    }
    return (
      <Box flexDirection="column">
        <Text bold>Abgabe</Text>
        <Text color={farbe}>{an ? status[abgabe.zustand] : status.aus}</Text>
        {abgabe.grund !== undefined && <Text dimColor wrap="wrap">{abgabe.grund}</Text>}
        <Text> </Text>
        <Text bold>Geänderte Dateien ({dateien.length})</Text>
        {dateien.length === 0 && <Text dimColor>noch keine</Text>}
        {dateien.slice(-8).map(a => <Text dimColor wrap="truncate-start">{a.pfad}</Text>)}
        <Text> </Text>
        <Text bold>Gelaufene Checks ({checks.length})</Text>
        {checks.length === 0 && <Text dimColor>noch keine</Text>}
        {checks.slice(-8).map(c => (
          <Text color={c.ok ? 'green' : 'red'} wrap="truncate-end">
            {c.ok ? '✓' : '✗'} {c.art}: {c.befehl}
          </Text>
        ))}
        <Text> </Text>
        <Text bold>Learnings ({learnings.length})</Text>
        {learnings.length === 0 && <Text dimColor>noch keine</Text>}
        {learnings.slice(-5).map(l => <Text dimColor wrap="wrap">{l.datum}: {l.text}</Text>)}
        <Text> </Text>
        <Text dimColor wrap="wrap">
          Zweitprüfung: {zweit.an ? 'an (bei vielen Dateien oder langer Aufgabe, kostet zusätzlich)' : 'aus'}
          {zweit.tokens !== undefined ? ` · bisher ${zweit.tokens} Tokens gemessen` : ''}
        </Text>
      </Box>
    )
  })
}
