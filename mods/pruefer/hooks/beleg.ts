// Die Urteilslogik des Prüfers als reine Funktionen: welche Befehle zählen als Beleg, und wann wird die Abgabe angehalten.
import type { Aenderung, Check } from '../types'

const CHECK_ARTEN: [string, RegExp][] = [
  ['Test', /\b(npm|pnpm|yarn|bun)\s+(run\s+)?test\b|\b(pytest|vitest|jest|mocha|phpunit|rspec)\b|\bpython3?\s+-m\s+(pytest|unittest)\b|\b(go|cargo|deno)\s+test\b|\bclaude\s+plugin\s+test\b|\bplaywright\s+test\b|\bnode\b[^;&|\n]*\b\w*test\w*\.(m?js|ts)\b|\bmake\s+(test|check)\b/],
  ['Typcheck', /\btsc\b|\b(mypy|pyright)\b|\bclaude\s+plugin\s+validate\b/],
  ['Build', /\b(npm|pnpm|yarn|bun)\s+run\s+build\b|\b(cargo|go)\s+build\b|\bmake\b(\s|$)|\bvite\s+build\b/],
  ['Lint', /\b(eslint|ruff|flake8|php\s+-l|shellcheck|prettier\s+--check)\b/],
  ['Aufruf', /\bcurl\b[^;&|\n]*(localhost|127\.0\.0\.1)|\bnode\s+\S+\.(m?js)\b|\bpython3?\s+(-I\s+)?\S+\.py\b|\bphp\s+\S+\.php\b/],
]

export function checkArt(befehl: string): string | undefined {
  for (const [art, muster] of CHECK_ARTEN) if (muster.test(befehl)) return art
  return undefined
}

// Bash-Befehle, die Dateien verändern (grob): dann zählt der Befehl als Änderung
export function aendertDateien(befehl: string): boolean {
  return /\bsed\s+-i\b|(^|[^0-9&<>])>{1,2}\s*[^\s&|>/][^\s;&|]*|\b(mv|cp|rm|touch|mkdir|tee)\b|\bgit\s+(apply|am|merge|rebase|checkout|restore)\b|\bpython3?\b[^;&|\n]*\b(write|open\()/.test(befehl) && !/>\s*\/dev\/null/.test(befehl.replace(/2>\s*\/dev\/null/g, ''))
}

const EHRLICH = /\b(nicht|noch nicht|nie)\s+(getestet|geprüft|ausprobiert|gestartet|ausgeführt)\b|\bungetestet\b|\bkonnte\b[^.\n]{0,40}\bnicht\b[^.\n]{0,20}\b(testen|prüfen|ausführen|starten)\b|\bnot\s+(been\s+)?(tested|verified|run)\b|\buntested\b/i
const BEHAUPTUNG = /\b(funktioniert|läuft|klappt|ist fertig|alles grün|getestet|works|working|passes|done)\b/i

export function istEhrlichOffen(antwort: string): boolean {
  return EHRLICH.test(antwort)
}

export function behauptetErfolg(antwort: string): boolean {
  return BEHAUPTUNG.test(antwort)
}

export function istRueckfrage(antwort: string): boolean {
  const t = antwort.trim()
  return t.endsWith('?') || /\?\s*$/.test(t.split('\n').filter(Boolean).slice(-1)[0] ?? '')
}

export type Urteil = { abgabe: 'bestanden' | 'zurueck' | 'ehrlich-offen' | 'nichts-zu-pruefen'; grund: string }

export function urteile(aenderungen: readonly Aenderung[], checks: readonly Check[], antwort: string): Urteil {
  if (aenderungen.length === 0) return { abgabe: 'nichts-zu-pruefen', grund: 'Keine Datei geändert.' }
  const letzteAenderung = Math.max(...aenderungen.map(a => a.nr))
  const danach = checks.filter(c => c.nr > letzteAenderung)
  const gruen = danach.filter(c => c.ok)
  const rot = danach.filter(c => !c.ok)
  if (gruen.length > 0 && rot.length === 0) {
    return { abgabe: 'bestanden', grund: `Nach der letzten Änderung ${gruen.length} grüne(r) Check(s): ${gruen.map(c => c.art).join(', ')}.` }
  }
  if (istEhrlichOffen(antwort)) {
    return { abgabe: 'ehrlich-offen', grund: 'Die Antwort sagt offen, was nicht getestet wurde.' }
  }
  const dateien = [...new Set(aenderungen.map(a => a.pfad))]
  const liste = dateien.slice(0, 6).join(', ') + (dateien.length > 6 ? ` und ${dateien.length - 6} weitere` : '')
  if (rot.length > 0) {
    const roteBefehle = rot.map(c => '`' + c.befehl.slice(0, 80) + '`').join(', ')
    return { abgabe: 'zurueck', grund: `Nach der letzten Änderung ist mindestens ein Check rot: ${roteBefehle}. Geändert: ${liste}.` }
  }
  const behauptet = behauptetErfolg(antwort) ? ' Die Antwort behauptet Erfolg, aber es gibt keinen Beleg dafür.' : ''
  return { abgabe: 'zurueck', grund: `Nach der letzten Änderung lief kein Test, Build, Typcheck oder Aufruf.${behauptet} Geändert: ${liste}.` }
}

export function rueckmeldung(grund: string, versuch: number): string {
  return [
    `pruefer (Versuch ${versuch} von 2): Bitte noch nicht abgeben.`,
    grund,
    'Prüfe jetzt mit einem passenden Test, Build, Typcheck oder Aufruf, ob die Änderung wirklich funktioniert, und behebe, was rot ist.',
    'Wenn sich das hier nicht prüfen lässt, schreibe offen "nicht getestet, weil …" in deine Antwort. Das ist in Ordnung.',
  ].join('\n')
}

export function istSchwierig(anzahlDateien: number, dauerMs: number): boolean {
  return anzahlDateien >= 5 || dauerMs >= 10 * 60 * 1000
}
