// Regeln des Spar-Experiments, als reine Funktionen testbar.
// Grundsatz: Im Zweifel bleibt der Schritt beim großen Modell.
import type { Nutzung } from '../types'

export const HAIKU = 'claude-haiku-4-5'
// Haiku 4.5 verarbeitet höchstens 200.000 Tokens Kontext. Mit Platz für Antwort und Wachstum:
export const HAIKU_KONTEXT_GRENZE = 150_000

// Werkzeuge, nach denen der nächste Schritt meist nur Gelesenes auswertet
const NUR_LESEN = new Set(['Read', 'Grep', 'Glob', 'LS', 'WebSearch', 'WebFetch', 'ToolSearch', 'TaskList', 'TaskGet'])
const LESE_BEFEHL = /^\s*(ls|cat|head|tail|wc|grep|rg|find|tree|pwd|git\s+(status|log|diff|show|branch)|du|df|stat|file|which|echo)\b(?![^|;&]*(-delete|\s-exec\b|>))[^;&]*$/

export type Werkzeugaufruf = { name: string; input: unknown }

export function nurLesend(aufrufe: readonly Werkzeugaufruf[]): boolean {
  if (aufrufe.length === 0) return false
  return aufrufe.every(a => {
    if (NUR_LESEN.has(a.name)) return true
    if (a.name === 'Bash') {
      const befehl = (a.input as { command?: unknown } | null)?.command
      return typeof befehl === 'string' && befehl.split(/&&|\|\||;|\|/).every(t => LESE_BEFEHL.test(t))
    }
    return false
  })
}

export type Entscheidung = { modell: 'haiku' | 'gross'; grund: string }

// Vor der Anfrage: leicht oder schwer?
export function entscheide(index: number, vorher: readonly Werkzeugaufruf[] | undefined, kontextTokens: number | undefined): Entscheidung {
  if (index === 0) return { modell: 'gross', grund: 'Erster Schritt einer Antwort: hier wird geplant.' }
  if (vorher === undefined) return { modell: 'gross', grund: 'Vorheriger Schritt unbekannt.' }
  if (!nurLesend(vorher)) return { modell: 'gross', grund: 'Vorher wurde nicht nur gelesen oder gesucht.' }
  if (kontextTokens === undefined) return { modell: 'gross', grund: 'Kontextgröße unbekannt.' }
  if (kontextTokens > HAIKU_KONTEXT_GRENZE) return { modell: 'gross', grund: `Kontext ${kontextTokens} Tokens ist zu groß für Haiku.` }
  return { modell: 'haiku', grund: 'Nach reinem Lesen oder Suchen: Auswerten ist ein leichter Schritt.' }
}

// Nach der Haiku-Antwort: darf sie bleiben? Plant sie, schreibt sie Code oder formuliert die finale Antwort, wird sie verworfen.
export function haikuDarfBleiben(stopReason: string | null, aufrufe: readonly Werkzeugaufruf[]): boolean {
  if (stopReason !== 'tool_use') return false // finale Antwort oder Abbruch: gehört dem großen Modell
  return nurLesend(aufrufe) // nur weiteres Lesen oder Suchen
}

// Geschätzte API-Kosten nach Listenpreis (Stand 25.09.2026, US-Dollar je Million Tokens).
// Cache-Schreiben mit dem 5-Minuten-Preis (1,25-fach): die Dauer meldet die Schnittstelle hier nicht.
const PREISE: Record<string, { ein: number; aus: number; lesen: number }> = {
  haiku: { ein: 1, aus: 5, lesen: 0.1 },
  sonnet: { ein: 2, aus: 10, lesen: 0.2 },
  opus: { ein: 4, aus: 20, lesen: 0.2 },
}

export function schaetzeKosten(modell: string, n: Nutzung): number | undefined {
  const art = /haiku/i.test(modell) ? 'haiku' : /sonnet/i.test(modell) ? 'sonnet' : /opus/i.test(modell) ? 'opus' : undefined
  if (art === undefined) return undefined
  const p = PREISE[art]
  if (!p) return undefined
  return (n.neu * p.ein + n.schreiben * p.ein * 1.25 + n.lesen * p.lesen + n.aus * p.aus) / 1_000_000
}

export function summe(a: Nutzung, b: Nutzung): Nutzung {
  return { neu: a.neu + b.neu, lesen: a.lesen + b.lesen, schreiben: a.schreiben + b.schreiben, aus: a.aus + b.aus }
}

export function tokens(n: Nutzung): number {
  return n.neu + n.lesen + n.schreiben + n.aus
}

export function dollar(x: number | undefined): string {
  return x === undefined ? 'unbekannt' : '≈' + x.toFixed(2).replace('.', ',') + ' $'
}

export function kurz(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.', ',') + ' Mio.'
  if (n >= 1_000) return Math.round(n / 1_000) + 'k'
  return String(n)
}
