// Die Risikoregeln des Schutzschilds. Reine Funktionen, damit sie ohne Sitzung testbar sind.
// Die Erkennung arbeitet mit Textmustern. Sie fängt typische Fälle, aber nicht jede Schreibweise:
// ein Befehl in einem Skript, ein Alias oder eine ungewöhnliche Schreibweise kann durchrutschen.

export type Befund = {
  regel: string
  vorhaben: string // was Claude vorhat, in einfachen Worten
  verlust: string // was dabei verloren gehen kann
  rueckgaengig: 'ja' | 'teilweise' | 'nein'
}

type BashRegel = { name: string; muster: RegExp; vorhaben: string; verlust: string; rueckgaengig: Befund['rueckgaengig'] }

const BASH_REGELN: BashRegel[] = [
  { name: 'git-push-force', muster: /\bgit\b[^;&|\n]*\bpush\b[^;&|\n]*(\s--force(-with-lease)?\b|\s-f\b|\s\+\S)/, vorhaben: 'Änderungen mit Gewalt auf den Server schieben (git push --force).', verlust: 'Fremde oder ältere Stände auf dem Server werden überschrieben.', rueckgaengig: 'teilweise' },
  { name: 'git-reset-hard', muster: /\bgit\b[^;&|\n]*\breset\b[^;&|\n]*--hard\b/, vorhaben: 'Alle nicht gespeicherten Änderungen verwerfen (git reset --hard).', verlust: 'Ungespeicherte Arbeit in den Dateien ist danach weg.', rueckgaengig: 'nein' },
  { name: 'git-verwerfen', muster: /\bgit\b[^;&|\n]*\b(checkout\s+(--\s+)?\.(\s|$)|restore\s+(--\S+\s+)*\.(\s|$)|clean\s+-[a-zA-Z]*f|stash\s+(drop|clear)|branch\s+-D\b)/, vorhaben: 'Mit git Änderungen, Dateien, Zwischenspeicher oder einen Zweig verwerfen.', verlust: 'Nicht gespeicherte Änderungen oder ganze Zweige gehen verloren.', rueckgaengig: 'nein' },
  { name: 'loeschen', muster: /(^\s*|[;&|(]\s*|\bsudo\s+|\bxargs\s+)(rm|rmdir|unlink|shred)\b|\bfind\b[^;&|\n]*\s-delete\b/, vorhaben: 'Dateien oder Ordner löschen.', verlust: 'Die gelöschten Dateien. Es gibt keinen Papierkorb.', rueckgaengig: 'nein' },
  { name: 'datenbank', muster: /\b(drop\s+(table|database|schema)|truncate(\s+table)?\s+\w|delete\s+from\s+\w+\s*(;|$|")|flushall|flushdb|dropDatabase\s*\()|\bdropdb\b/i, vorhaben: 'Eine Datenbank oder Tabelle leeren oder löschen.', verlust: 'Alle Datensätze darin.', rueckgaengig: 'nein' },
  { name: 'geheimnis-ueberschreiben', muster: /(>|\btee\b|\bcp\b|\bmv\b|\bsed\s+-i)[^;&|\n]*(\.env\b|\.pem\b|id_rsa|id_ed25519|credentials|passw|secret)/i, vorhaben: 'Eine Datei mit Zugangsdaten (.env, Schlüssel, Passwörter) überschreiben.', verlust: 'Die bisherigen Zugangsdaten. Ohne Sicherung sind sie weg.', rueckgaengig: 'nein' },
  { name: 'massenaenderung', muster: /\b(mkfs\S*|dd\s+[^;&|\n]*\bof=|chmod\s+-R\s+0*7?77|chown\s+-R)\b/, vorhaben: 'Ein Laufwerk oder viele Dateirechte auf einmal ändern.', verlust: 'Daten auf dem Laufwerk oder die bisherigen Zugriffsrechte.', rueckgaengig: 'nein' },
]

const GEHEIM_DATEI = /(^|\/)(\.env(\.[\w-]+)?|[^/]*\.(pem|key|p12|pfx)|id_(rsa|ed25519)[^/]*|[^/]*(credentials|passw(or)?d|secret)[^/]*)$/i

export function normalisiere(pfad: string, cwd: string): string {
  const voll = pfad.startsWith('/') ? pfad : cwd.replace(/\/$/, '') + '/' + pfad
  const teile: string[] = []
  for (const t of voll.split('/')) {
    if (t === '' || t === '.') continue
    if (t === '..') teile.pop()
    else teile.push(t)
  }
  return '/' + teile.join('/')
}

export function liegtInnerhalb(pfad: string, ordner: string): boolean {
  const o = ordner.replace(/\/$/, '')
  return pfad === o || pfad.startsWith(o + '/')
}

// Pfade außerhalb des Projekts, die trotzdem harmlos sind: Ordner für Zwischendateien
const ERLAUBT_AUSSERHALB = ['/tmp', '/var/tmp']

export function pruefeBash(befehl: string, projekt: string): Befund | undefined {
  for (const r of BASH_REGELN) {
    if (r.muster.test(befehl)) return { regel: r.name, vorhaben: r.vorhaben, verlust: r.verlust, rueckgaengig: r.rueckgaengig }
  }
  // Umleitung oder Kopie in eine Datei außerhalb des Projekts
  const ziele = [...befehl.matchAll(/(?:>>?|\btee\s+(?:-a\s+)?)\s*([~/][^\s;&|]+)/g)].map(m => m[1] ?? '')
  for (const z of ziele) {
    const pfad = z.startsWith('~') ? z : normalisiere(z, projekt)
    if (pfad.startsWith('/dev/')) continue
    if (z.startsWith('~') || (!liegtInnerhalb(pfad, projekt) && !ERLAUBT_AUSSERHALB.some(o => liegtInnerhalb(pfad, o)))) {
      return { regel: 'ausserhalb-projekt', vorhaben: `In eine Datei außerhalb des Projekts schreiben (${z}).`, verlust: 'Der bisherige Inhalt dieser Datei.', rueckgaengig: 'nein' }
    }
  }
  return undefined
}

export function pruefeDatei(pfad: string, cwd: string, projekt: string): Befund | undefined {
  const voll = normalisiere(pfad, cwd)
  if (GEHEIM_DATEI.test(voll)) {
    return { regel: 'geheimnis-datei', vorhaben: `Die Datei ${voll.split('/').pop()} ändern, die Zugangsdaten enthalten kann.`, verlust: 'Die bisherigen Zugangsdaten oder Passwörter darin.', rueckgaengig: 'nein' }
  }
  if (!liegtInnerhalb(voll, projekt) && !ERLAUBT_AUSSERHALB.some(o => liegtInnerhalb(voll, o))) {
    return { regel: 'ausserhalb-projekt', vorhaben: `Die Datei ${voll} außerhalb des aktuellen Projekts ändern.`, verlust: 'Der bisherige Inhalt dieser Datei. Außerhalb des Projekts gibt es meist keine git-Sicherung.', rueckgaengig: 'nein' }
  }
  return undefined
}

export function frage(b: Befund, detail: string): string {
  const zurueck = b.rueckgaengig === 'ja' ? 'Ja.' : b.rueckgaengig === 'teilweise' ? 'Nur teilweise.' : 'Nein, in der Regel nicht.'
  return [
    'Schutzschild: Claude möchte einen riskanten Schritt ausführen.',
    `Vorhaben: ${b.vorhaben}`,
    detail ? `Genau: ${detail}` : '',
    `Was verloren gehen kann: ${b.verlust}`,
    `Rückgängig machbar: ${zurueck}`,
    'Soll der Schritt ausgeführt werden?',
  ].filter(Boolean).join('\n')
}

export function heute(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10)
}
