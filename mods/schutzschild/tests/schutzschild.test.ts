import { expect, mock, test } from 'claude-code/testing'

import { pruefeBash, pruefeDatei } from '../hooks/regeln.ts'

const PROJEKT = '/arbeit/projekt'

test('Riskante Befehle werden erkannt (nur Textprüfung, nichts wird ausgeführt)', () => {
  const riskant: [string, string][] = [
    ['rm -rf testordner/alt', 'loeschen'],
    ['cd testordner && rm datei.txt', 'loeschen'],
    ['find testordner -name "*.log" -delete', 'loeschen'],
    ['git push --force origin main', 'git-push-force'],
    ['git push -f', 'git-push-force'],
    ['git reset --hard HEAD~1', 'git-reset-hard'],
    ['git clean -fd', 'git-verwerfen'],
    ['git checkout -- .', 'git-verwerfen'],
    ['psql -c "DROP TABLE kunden"', 'datenbank'],
    ['mysql -e "TRUNCATE TABLE bestellungen"', 'datenbank'],
    ['redis-cli FLUSHALL', 'datenbank'],
    ['echo "KEY=1" > .env', 'geheimnis-ueberschreiben'],
    ['cp vorlage.txt config/credentials.json', 'geheimnis-ueberschreiben'],
    ['echo hallo > ~/.bashrc', 'ausserhalb-projekt'],
    ['echo hallo > /etc/hosts', 'ausserhalb-projekt'],
  ]
  for (const [befehl, regel] of riskant) {
    expect(pruefeBash(befehl, PROJEKT)?.regel).toBe(regel)
  }
})

test('Harmlose Befehle laufen ohne Unterbrechung', () => {
  const harmlos = [
    'ls -la',
    'git status',
    'git push origin feature',
    'npm test',
    'echo hallo > ausgabe.txt',
    'echo hallo > /tmp/notiz.txt',
    'grep -rn "rm -rf" docs',
    'cat .env.example',
    'python3 skript.py 2>/dev/null',
  ]
  for (const befehl of harmlos) {
    expect(pruefeBash(befehl, PROJEKT)).toBeUndefined()
  }
})

test('Dateiänderungen: .env, Schlüssel und Pfade außerhalb des Projekts sind riskant', () => {
  expect(pruefeDatei('.env', PROJEKT, PROJEKT)?.regel).toBe('geheimnis-datei')
  expect(pruefeDatei('config/.env.production', PROJEKT, PROJEKT)?.regel).toBe('geheimnis-datei')
  expect(pruefeDatei('/home/u/.ssh/id_rsa', PROJEKT, PROJEKT)?.regel).toBe('geheimnis-datei')
  expect(pruefeDatei('../anderes-projekt/index.html', PROJEKT, PROJEKT)?.regel).toBe('ausserhalb-projekt')
  expect(pruefeDatei('src/app.ts', PROJEKT, PROJEKT)).toBeUndefined()
  expect(pruefeDatei('/tmp/zwischen.txt', PROJEKT, PROJEKT)).toBeUndefined()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function grundStubs(on: any, antwort: string | 'kein-dialog', ausgefuehrt: string[]) {
  mock.clock(on)
  mock.store(on, {})
  on('command.register', () => ({ value: undefined }))
  on('session.start', () => ({ cwd: PROJEKT }))
  on('session.root', () => ({ value: PROJEKT }))
  on('session.cwd', () => ({ value: PROJEKT }))
  on('tool.call', ($: unknown, e: { tool: string }) => {
    if (e.tool === 'AskUserQuestion') {
      if (antwort === 'kein-dialog') return { deny: 'niemand da' }
      const q = (e as unknown as { questions: { question: string }[] }).questions[0]?.question ?? ''
      return { result: { answers: { [q]: antwort } } }
    }
    ausgefuehrt.push(e.tool + ' ' + String((e as unknown as { command?: string; file_path?: string }).command ?? (e as unknown as { file_path?: string }).file_path))
    return { result: 'ok' }
  })
}

test('Riskanter Schritt: erst nach Bestätigung ausgeführt, harmloser läuft direkt', async ($, on) => {
  const ausgefuehrt: string[] = []
  grundStubs(on, 'Ausführen', ausgefuehrt)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: PROJEKT } as never)
  await $.tool.call({ tool: 'Bash', command: 'ls testordner' })
  const riskant = await $.tool.call({ tool: 'Bash', command: 'rm -r testordner/muell' })
  expect(riskant).toEqual({ result: 'ok' })
  expect(ausgefuehrt).toEqual(['Bash ls testordner', 'Bash rm -r testordner/muell'])
  const status = await $.command.run({ command: 'schutzschild', args: 'status' } as never)
  expect(status.text).toBe('Schutzschild ist an. Heute 2 Schritte geprüft, 1 angehalten.')
})

test('Abgelehnt: der riskante Schritt läuft nicht', async ($, on) => {
  const ausgefuehrt: string[] = []
  grundStubs(on, 'Abbrechen', ausgefuehrt)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: PROJEKT } as never)
  const r = await $.tool.call({ tool: 'Write', file_path: '.env', content: 'X=1' })
  expect('deny' in r && r.deny).toMatch(/^Schutzschild: Manuel hat diesen Schritt abgelehnt/)
  expect(ausgefuehrt).toEqual([])
})

test('Niemand kann gefragt werden: sicher ablehnen statt durchlassen', async ($, on) => {
  const ausgefuehrt: string[] = []
  grundStubs(on, 'kein-dialog', ausgefuehrt)
  await $.session.start({ surface: 'terminal', isInteractive: false, cwd: PROJEKT } as never)
  const r = await $.tool.call({ tool: 'Bash', command: 'git reset --hard' })
  expect('deny' in r && r.deny).toMatch(/konnte nicht bestätigt werden/)
  expect(ausgefuehrt).toEqual([])
})

test('Prüfung schlägt fehl: Schritt wird blockiert und der Fehler genannt', async ($, on) => {
  const ausgefuehrt: string[] = []
  grundStubs(on, 'Ausführen', ausgefuehrt)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: PROJEKT } as never)
  // Ein Edit ohne Dateipfad lässt die Prüfung scheitern
  const r = await $.tool.call({ tool: 'Edit' } as never)
  expect('deny' in r && r.deny).toMatch(/^Schutzschild: Die Risikoprüfung ist fehlgeschlagen \(throw\)/)
  expect(ausgefuehrt).toEqual([])
})

test('/schutzschild aus: nichts wird mehr geprüft, Leiste zeigt den Zustand', async ($, on) => {
  const ausgefuehrt: string[] = []
  grundStubs(on, 'Abbrechen', ausgefuehrt)
  on('ui.render', () => ({ type: 'Text', props: {}, children: ['von Claude Code'] }))
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: PROJEKT } as never)
  const aus = await $.command.run({ command: 'schutzschild', args: 'aus' } as never)
  expect(aus.text).toMatch(/^Schutzschild ist aus/)
  await $.tool.call({ tool: 'Bash', command: 'rm alt.txt' })
  expect(ausgefuehrt).toEqual(['Bash rm alt.txt'])
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ plugin: 'schutzschild', component: 'AbovePrompt', surface, viewport: { columns: 100, rows: 30 }, props: { hasSurvey: false, isWorking: false, maxRows: 4, bodyColumns: 95, scroll: { offset: 0, bodyRows: 4 }, view: {} } } as never)
    expect(await ui.find({ type: 'Text', text: 'Schutzschild aus · /schutzschild schaltet es an' })).toBeDefined()
    await ui.unmount()
  }
  await $.command.run({ command: 'schutzschild', args: 'an' } as never)
  const ui = await $.ui.mount({ plugin: 'schutzschild', component: 'AbovePrompt', surface: 'terminal', viewport: { columns: 100, rows: 30 }, props: { hasSurvey: false, isWorking: false, maxRows: 4, bodyColumns: 95, scroll: { offset: 0, bodyRows: 4 }, view: {} } } as never)
  expect(await ui.find({ type: 'Text', text: /^Schutzschild an · heute \d+ geprüft · \d+ angehalten$/ })).toBeDefined()
})
