import { expect, mock, test } from 'claude-code/testing'

import { aendertDateien, checkArt, urteile } from '../hooks/beleg.ts'
import { LEARNINGS_DATEI } from '../hooks/register.tsx'

const ROOT = '/arbeit/projekt'
const NUTZUNG = { input_tokens: 900, output_tokens: 20, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 }

test('Checks und Änderungen werden aus Befehlen erkannt', () => {
  expect(checkArt('npm test')).toBe('Test')
  expect(checkArt('cd mods/x && claude plugin test')).toBe('Test')
  expect(checkArt('NODE_PATH=/x node seiten_test.js --basis http://127.0.0.1:8092')).toBe('Test')
  expect(checkArt('tsc -p tsconfig.json')).toBe('Typcheck')
  expect(checkArt('curl -s http://127.0.0.1:8092/')).toBe('Aufruf')
  expect(checkArt('ls -la')).toBeUndefined()
  expect(aendertDateien("sed -i 's/a/b/' datei.txt")).toBe(true)
  expect(aendertDateien('echo hallo > ausgabe.txt')).toBe(true)
  expect(aendertDateien('grep -rn foo . 2>/dev/null')).toBe(false)
  expect(aendertDateien('git status')).toBe(false)
})

test('Urteil: Beleg nach der letzten Änderung, rot, ehrlich offen, nichts zu prüfen', () => {
  const ae = [{ pfad: 'a.ts', nr: 2, per: 'Edit' }]
  expect(urteile([], [], 'Fertig').abgabe).toBe('nichts-zu-pruefen')
  expect(urteile(ae, [{ befehl: 'npm test', art: 'Test', ok: true, nr: 3 }], 'Fertig').abgabe).toBe('bestanden')
  // Ein grüner Test VOR der Änderung zählt nicht
  expect(urteile(ae, [{ befehl: 'npm test', art: 'Test', ok: true, nr: 1 }], 'Fertig, funktioniert').abgabe).toBe('zurueck')
  expect(urteile(ae, [{ befehl: 'npm test', art: 'Test', ok: false, nr: 3 }], 'Fertig').grund).toMatch(/mindestens ein Check rot/)
  expect(urteile(ae, [], 'Geändert, aber nicht getestet, weil kein Testserver da ist.').abgabe).toBe('ehrlich-offen')
  expect(urteile(ae, [], 'Fertig, funktioniert!').grund).toMatch(/behauptet Erfolg, aber es gibt keinen Beleg/)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stubs(on: any, optionen: { flaechen?: string[]; dateien?: Map<string, string>; modellAntwort?: string } = {}) {
  const dateien = optionen.dateien ?? new Map<string, string>()
  mock.clock(on)
  mock.store(on, {})
  on('command.register', () => ({ value: undefined }))
  on('session.start', () => ({ cwd: ROOT }))
  on('session.surfaces', () => ({ value: optionen.flaechen ?? ['terminal'] }))
  on('session.root', () => ({ value: ROOT }))
  on('session.model', () => ({ value: 'claude-opus-5-5' }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('ui.toast', () => ({ value: undefined }))
  on('fs.read', ($: unknown, e: { path: string }) => (dateien.has(e.path) ? { value: dateien.get(e.path) } : { deny: 'fehlt' }))
  on('fs.write', ($: unknown, e: { path: string; text: string }) => {
    dateien.set(e.path, String(e.text))
    return { value: undefined }
  })
  on('model.complete', () => ({ value: { isAnswered: true, text: optionen.modellAntwort ?? 'OK', usage: NUTZUNG } }))
  on('prompt.submit', ($: unknown, e: { text: string }) => ({ text: e.text }))
  on('tool.call', ($: unknown, e: { tool: string; command?: string }) => ({ result: 'ok', isError: e.command?.includes('fehlschlag') === true }))
  on('classic.Stop', () => ({}))
  on('classic.SessionStart', () => ({}))
  return dateien
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function stop($: any, text: string, extra: Record<string, unknown> = {}) {
  return $.classic.Stop({ stop_hook_active: false, last_assistant_message: text, background_tasks: [], session_crons: [], ...extra })
}

test('Ohne Beleg zurück, nach grünem Test durch', async ($, on) => {
  stubs(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: ROOT } as never)
  await $.prompt.submit({ text: 'Baue Funktion X' } as never)
  await $.tool.call({ tool: 'Edit', file_path: ROOT + '/src/x.ts', old_string: 'a', new_string: 'b' } as never)
  const erst = await stop($, 'Fertig, funktioniert.')
  expect(erst.block).toMatch(/^pruefer \(Versuch 1 von 2\): Bitte noch nicht abgeben\./)
  await $.tool.call({ tool: 'Bash', command: 'npm test' } as never)
  const dann = await stop($, 'Fertig, Tests grün.')
  expect(dann.block).toBeUndefined()
})

test('Höchstens zweimal zurück, dann durch, damit Claude nie hängen bleibt', async ($, on) => {
  stubs(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: ROOT } as never)
  await $.prompt.submit({ text: 'Ändere Y' } as never)
  await $.tool.call({ tool: 'Write', file_path: ROOT + '/y.txt', content: 'y' } as never)
  expect((await stop($, 'Erledigt.')).block).toMatch(/Versuch 1 von 2/)
  expect((await stop($, 'Erledigt.', { stop_hook_active: true })).block).toMatch(/Versuch 2 von 2/)
  expect((await stop($, 'Erledigt.', { stop_hook_active: true })).block).toBeUndefined()
  const status = await $.command.run({ command: 'pruefer', args: 'status' } as never)
  expect(status.text).toMatch(/Abgabe: ausnahme \(Schon 2-mal zurückgeschickt/)
})

test('Ehrlichkeit, Rückfragen, Hintergrundjobs und headless werden nie gesperrt', async ($, on) => {
  stubs(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: ROOT } as never)
  await $.prompt.submit({ text: 'Ändere Z' } as never)
  await $.tool.call({ tool: 'Write', file_path: ROOT + '/z.txt', content: 'z' } as never)
  expect((await stop($, 'Geändert, aber nicht getestet, weil der Server fehlt.')).block).toBeUndefined()
  expect((await stop($, 'Soll ich auch die Tests anpassen?')).block).toBeUndefined()
  expect((await stop($, 'Fertig.', { background_tasks: [{ id: '1', type: 'shell', status: 'running', description: 'npm run dev' }] })).block).toBeUndefined()
})

test('Headless: ohne Oberfläche wird nicht angehalten', async ($, on) => {
  stubs(on, { flaechen: [] })
  await $.session.start({ surface: 'terminal', isInteractive: false, cwd: ROOT } as never)
  await $.prompt.submit({ text: 'Ändere Z' } as never)
  await $.tool.call({ tool: 'Write', file_path: ROOT + '/z.txt', content: 'z' } as never)
  expect((await stop($, 'Fertig.')).block).toBeUndefined()
})

test('Jede Sperre wird als Learning gespeichert und neuen Sitzungen mitgegeben', async ($, on) => {
  const dateien = stubs(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: ROOT } as never)
  await $.prompt.submit({ text: 'Ändere W' } as never)
  await $.tool.call({ tool: 'Write', file_path: ROOT + '/w.txt', content: 'w' } as never)
  await $.tool.call({ tool: 'Bash', command: 'npm test fehlschlag' } as never)
  await stop($, 'Fertig.')
  const inhalt = dateien.get(ROOT + '/' + LEARNINGS_DATEI) ?? ''
  expect(inhalt).toMatch(/^- \d{4}-\d{2}-\d{2}: Nach der letzten Änderung ist mindestens ein Check rot/m)
  const neu = await $.classic.SessionStart({ source: 'startup' } as never)
  expect((neu.additionalContext ?? []).join('\n')).toMatch(/Learnings des Prüfers aus früheren Sitzungen/)
})

test('Zweitprüfung bei schwierigen Antworten kann eine Lücke finden', async ($, on) => {
  stubs(on, { modellAntwort: 'LUECKE: Die Fehlerseite wurde nicht geprüft.' })
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: ROOT } as never)
  await $.prompt.submit({ text: 'Großer Umbau' } as never)
  for (const n of [1, 2, 3, 4, 5]) await $.tool.call({ tool: 'Write', file_path: `${ROOT}/d${n}.ts`, content: 'x' } as never)
  await $.tool.call({ tool: 'Bash', command: 'npm test' } as never)
  const r = await stop($, 'Fertig, alle Tests grün.')
  expect(r.block).toMatch(/Zweitprüfung: Die Fehlerseite wurde nicht geprüft\./)
})

test('Panel zeigt Dateien, Checks, Status und Learnings in Terminal und Desktop', async ($, on) => {
  stubs(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: ROOT } as never)
  await $.prompt.submit({ text: 'Ändere V' } as never)
  await $.tool.call({ tool: 'Edit', file_path: ROOT + '/v.ts', old_string: 'a', new_string: 'b' } as never)
  await $.tool.call({ tool: 'Bash', command: 'tsc -p .' } as never)
  await stop($, 'Fertig.')
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ plugin: 'pruefer', component: 'Pane', requestId: 'pruefer', surface, viewport: { columns: 60, rows: 40 }, props: { title: 'Prüfer', isFocused: true, bodyColumns: 56, placement: 'inline', scroll: { offset: 0, bodyRows: 36 }, view: {} } } as never)
    expect(await ui.find({ type: 'Text', text: 'Abgabe mit Beleg' })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /v\.ts$/ })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /Typcheck: tsc -p \./ })).toBeDefined()
    await ui.unmount()
  }
})
