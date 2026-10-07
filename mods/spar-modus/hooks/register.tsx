// spar-modus (EXPERIMENT, standardmäßig aus)
// Vor jeder Modell-Anfrage entscheidet die Mod: leicht (nach reinem Lesen oder Suchen) geht an Haiku, alles andere bleibt beim großen Modell.
// Will Haiku planen, Code schreiben oder die finale Antwort geben, wird seine Antwort verworfen und das große Modell fragt neu.
// Diese verworfene Anfrage ist Mehrverbrauch und wird angezeigt.
// Gemessen werden nur die Tokens, die die API je Anfrage meldet. Kosten sind Listenpreis-Schätzungen, keine Messung des Abo-Limits.
// Eine Ersparnis wird nie behauptet: Was das große Modell gekostet hätte, ist nicht gemessen.
import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Bilanz, Nutzung } from '../types'
import { dollar, entscheide, HAIKU, haikuDarfBleiben, kurz, schaetzeKosten, summe, tokens } from './regel.ts'
import type { Werkzeugaufruf } from './regel.ts'

const NULL: Nutzung = { neu: 0, lesen: 0, schreiben: 0, aus: 0 }
const anAtom = atom({ plugin: 'spar-modus', key: 'an' } as const, false)
const bilanzAtom = atom({ plugin: 'spar-modus', key: 'bilanz' } as const, { haikuSchritte: 0, haiku: NULL, verworfen: 0, verworfenNutzung: NULL, grossSchritte: 0 } as Bilanz)

// Letzter Schritt des Hauptverlaufs: Werkzeuge und gemessene Kontextgröße
let vorher: Werkzeugaufruf[] | undefined
let kontext: number | undefined

function alsNutzung(u: { input_tokens: number; output_tokens: number; cache_read_input_tokens: number; cache_creation_input_tokens: number }): Nutzung {
  return { neu: u.input_tokens, lesen: u.cache_read_input_tokens, schreiben: u.cache_creation_input_tokens, aus: u.output_tokens }
}

export function zaehlerText(b: Bilanz): string {
  const haikuKosten = schaetzeKosten(HAIKU, b.haiku)
  const mehr = schaetzeKosten(HAIKU, b.verworfenNutzung)
  let t = ` · Spar-Experiment: ${b.haikuSchritte} an Haiku · ${kurz(tokens(b.haiku))} Tokens gemessen · API ${dollar(haikuKosten)}`
  if (b.verworfen > 0) t += ` · Mehrkosten: ${b.verworfen} verworfen, ${kurz(tokens(b.verworfenNutzung))} Tokens, ${dollar(mehr)}`
  return t + ' · Ersparnis unbekannt'
}

export function statusText(an: boolean, b: Bilanz): string {
  const haikuKosten = schaetzeKosten(HAIKU, b.haiku)
  const mehr = schaetzeKosten(HAIKU, b.verworfenNutzung)
  return [
    `Spar-Modus (Experiment) ist ${an ? 'an' : 'aus'}.`,
    `An Haiku: ${b.haikuSchritte} Schritte. Gemessen: ${kurz(b.haiku.neu)} neu, ${kurz(b.haiku.lesen)} Cache gelesen, ${kurz(b.haiku.schreiben)} Cache geschrieben, ${kurz(b.haiku.aus)} Ausgabe. Geschätzte API-Kosten: ${dollar(haikuKosten)}.`,
    `Mehrkosten: ${b.verworfen} Haiku-Antworten verworfen und vom großen Modell wiederholt. Gemessen ${kurz(tokens(b.verworfenNutzung))} Tokens, geschätzt ${dollar(mehr)}. Dazu kommt das Cache-Schreiben bei Haiku oben, weil jeder Modellwechsel den Cache neu füllt.`,
    `Beim großen Modell geblieben: ${b.grossSchritte} Schritte.`,
    'Ersparnis: unbekannt. Was dieselben Schritte beim großen Modell gekostet hätten, ist nicht gemessen. Die Kosten sind Listenpreis-Schätzungen und keine Messung deines Abo-Limits.',
  ].join('\n')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'sparmodus', description: 'Spar-Experiment an oder aus (ohne Zusatz umschalten). Zusätze: an, aus, status' })
    const an = (await $.store.get('an')) as boolean | undefined
    await update($, anAtom, () => an === true) // standardmäßig aus
    return next(e)
  })

  on('turn.start', ($, e, next) => {
    vorher = undefined
    return next(e)
  })

  on('turn.step', async function* ($, e, next) {
    // Subagenten und ausgeschalteter Modus: unverändert durchreichen
    if (e.agentId !== undefined || !(await read($, anAtom))) {
      const r = yield* next(e)
      if (e.agentId === undefined) {
        vorher = r.toolUses.map(t => ({ name: t.name, input: t.input }))
        if (r.usage) kontext = r.usage.input_tokens + r.usage.cache_read_input_tokens + r.usage.cache_creation_input_tokens + r.usage.output_tokens
      }
      return r
    }
    const wahl = entscheide(e.index, vorher, kontext)
    if (wahl.modell === 'gross' || e.model === HAIKU) {
      const r = yield* next(e)
      vorher = r.toolUses.map(t => ({ name: t.name, input: t.input }))
      if (r.usage) kontext = r.usage.input_tokens + r.usage.cache_read_input_tokens + r.usage.cache_creation_input_tokens + r.usage.output_tokens
      await update($, bilanzAtom, b => ({ ...b, grossSchritte: b.grossSchritte + 1 }))
      return r
    }
    // Leichter Schritt: Haiku fragen, Antwort erst ansehen, bevor sie gezeigt wird
    const strom = next({ ...e, model: HAIKU })
    const puffer = []
    let stueck = await strom.next()
    while (stueck.done !== true) {
      puffer.push(stueck.value)
      stueck = await strom.next()
    }
    const haiku = stueck.value
    const aufrufe = haiku.toolUses.map(t => ({ name: t.name, input: t.input }))
    if (haiku.usage !== null && haikuDarfBleiben(haiku.stopReason, aufrufe)) {
      const n = alsNutzung(haiku.usage)
      await update($, bilanzAtom, b => ({ ...b, haikuSchritte: b.haikuSchritte + 1, haiku: summe(b.haiku, n) }))
      $.ui.invalidate('ui.render')
      for (const c of puffer) yield c
      vorher = aufrufe
      kontext = n.neu + n.lesen + n.schreiben + n.aus
      return haiku
    }
    // Haiku wollte mehr als lesen: verwerfen, großes Modell fragt neu (Mehrkosten)
    const verworfen = haiku.usage ? alsNutzung(haiku.usage) : NULL
    await update($, bilanzAtom, b => ({ ...b, verworfen: b.verworfen + 1, verworfenNutzung: summe(b.verworfenNutzung, verworfen), grossSchritte: b.grossSchritte + 1 }))
    $.ui.invalidate('ui.render')
    const r = yield* next(e)
    vorher = r.toolUses.map(t => ({ name: t.name, input: t.input }))
    if (r.usage) kontext = r.usage.input_tokens + r.usage.cache_read_input_tokens + r.usage.cache_creation_input_tokens + r.usage.output_tokens
    return r
  })

  on('command.run', { command: 'sparmodus' }, async ($, e) => {
    const wunsch = e.args.trim().toLowerCase()
    const jetzt = await read($, anAtom)
    if (wunsch === 'status') return { text: statusText(jetzt, await read($, bilanzAtom)) }
    const an = wunsch === 'an' ? true : wunsch === 'aus' ? false : !jetzt
    await $.store.set('an', an)
    await update($, anAtom, () => an)
    $.ui.invalidate('ui.render')
    return {
      text: an
        ? 'Spar-Modus (Experiment) ist an. Leichte Zwischenschritte gehen an Haiku, Planen, Code und finale Antworten bleiben beim großen Modell. Achtung: Bei großem Kontext oder häufigem Wechsel kann es teurer werden. Details: /sparmodus status'
        : 'Spar-Modus ist aus. Alle Schritte laufen wieder beim großen Modell.',
    }
  })

  // Zähler neben dem Ladesymbol, nur wenn der Modus an ist
  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    if (!(await read($, anAtom))) return next(e)
    return next({ ...e, props: { ...e.props, suffix: zaehlerText(await read($, bilanzAtom)) + '…' } })
  })
}
