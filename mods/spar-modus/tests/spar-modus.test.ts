import { expect, mock, test } from 'claude-code/testing'

import { entscheide, HAIKU, haikuDarfBleiben } from '../hooks/regel.ts'

const GROSS = 'claude-opus-5-5'
const KLEIN_NUTZUNG = { input_tokens: 5, output_tokens: 100, cache_read_input_tokens: 0, cache_creation_input_tokens: 20_000 }

test('Entscheidung: im Zweifel groß', () => {
  const lesen = [{ name: 'Read', input: { file_path: 'a.ts' } }]
  expect(entscheide(0, lesen, 10_000).modell).toBe('gross')
  expect(entscheide(1, undefined, 10_000).modell).toBe('gross')
  expect(entscheide(1, lesen, undefined).modell).toBe('gross')
  expect(entscheide(1, lesen, 10_000).modell).toBe('haiku')
  expect(entscheide(1, [{ name: 'Bash', input: { command: 'git status && ls' } }], 10_000).modell).toBe('haiku')
  expect(entscheide(1, [{ name: 'Bash', input: { command: 'npm install' } }], 10_000).modell).toBe('gross')
  expect(entscheide(1, [{ name: 'Edit', input: {} }], 10_000).modell).toBe('gross')
  expect(entscheide(1, lesen, 400_000).modell).toBe('gross')
  expect(haikuDarfBleiben('end_turn', [])).toBe(false)
  expect(haikuDarfBleiben('tool_use', [{ name: 'Write', input: {} }])).toBe(false)
  expect(haikuDarfBleiben('tool_use', [{ name: 'Grep', input: {} }])).toBe(true)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stubs(on: any, gefragt: string[], haikuAntwort: 'lesen' | 'final', kontext = 10_000) {
  mock.store(on, {})
  on('command.register', () => ({ value: undefined }))
  on('session.start', () => ({ cwd: '/p' }))
  on('turn.start', ($: unknown, e: { turnId: string }) => ({ turnId: e.turnId }))
  on('ui.render', ($: unknown, e: { props: { suffix: string } }) => ({ type: 'Text', props: {}, children: ['Denkt' + e.props.suffix] }))
  on('turn.step', async function* ($: unknown, e: { turnId: string; index: number; model: string }) {
    gefragt.push(e.model)
    const istHaiku = e.model === HAIKU
    yield { kind: 'text', index: 0, text: istHaiku ? 'haiku' : 'gross' }
    const lesend = !istHaiku || haikuAntwort === 'lesen'
    return {
      turnId: e.turnId,
      index: e.index,
      answer: lesend ? '' : 'Finale Antwort',
      toolUses: lesend ? [{ name: 'Read', input: { file_path: 'x.ts' } }] : [],
      stopReason: lesend ? 'tool_use' : 'end_turn',
      usage: istHaiku ? { ...KLEIN_NUTZUNG, model: HAIKU } : { input_tokens: 5, output_tokens: 50, cache_read_input_tokens: kontext, cache_creation_input_tokens: 0, model: GROSS },
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function schritt($: any, index: number) {
  const strom = $.turn.step({ turnId: 't', index, model: GROSS, messageCount: 3 })
  const stuecke: unknown[] = []
  let s = await strom.next()
  while (s.done !== true) {
    stuecke.push(s.value)
    s = await strom.next()
  }
  return { ergebnis: s.value, stuecke }
}

test('Standardmäßig aus: jede Anfrage bleibt beim großen Modell', async ($, on) => {
  const gefragt: string[] = []
  stubs(on, gefragt, 'lesen')
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/p' } as never)
  await $.turn.start({ turnId: 't', text: 'x' } as never)
  await schritt($, 0)
  await schritt($, 1)
  expect(gefragt).toEqual([GROSS, GROSS])
})

test('An: nach reinem Lesen geht der nächste Schritt an Haiku, gemessen und ohne Ersparnis-Behauptung', async ($, on) => {
  const gefragt: string[] = []
  stubs(on, gefragt, 'lesen')
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/p' } as never)
  const an = await $.command.run({ command: 'sparmodus', args: 'an' } as never)
  expect(an.text).toMatch(/^Spar-Modus \(Experiment\) ist an/)
  await $.turn.start({ turnId: 't', text: 'x' } as never)
  await schritt($, 0)
  const zwei = await schritt($, 1)
  expect(gefragt).toEqual([GROSS, HAIKU])
  expect(zwei.stuecke).toEqual([{ kind: 'text', index: 0, text: 'haiku' }])
  const status = await $.command.run({ command: 'sparmodus', args: 'status' } as never)
  expect(status.text).toContain('An Haiku: 1 Schritte. Gemessen: 5 neu, 0 Cache gelesen, 20k Cache geschrieben, 100 Ausgabe.')
  expect(status.text).toContain('Ersparnis: unbekannt.')
  const ui = await $.ui.mount({ plugin: 'spar-modus', component: 'Spinner', surface: 'terminal', viewport: { columns: 120, rows: 30 }, props: { word: 'Denkt', message: null, suffix: '…', mode: 'thinking' } } as never)
  expect(await ui.find({ type: 'Text', text: /Spar-Experiment: 1 an Haiku · 20k Tokens gemessen · API ≈0,03 \$ · Ersparnis unbekannt…$/ })).toBeDefined()
})

test('Will Haiku die finale Antwort geben, wird verworfen und groß neu gefragt (Mehrkosten sichtbar)', async ($, on) => {
  const gefragt: string[] = []
  stubs(on, gefragt, 'final')
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/p' } as never)
  await $.command.run({ command: 'sparmodus', args: 'an' } as never)
  await $.turn.start({ turnId: 't', text: 'x' } as never)
  await schritt($, 0)
  const zwei = await schritt($, 1)
  expect(gefragt).toEqual([GROSS, HAIKU, GROSS])
  expect(zwei.stuecke).toEqual([{ kind: 'text', index: 0, text: 'gross' }])
  const status = await $.command.run({ command: 'sparmodus', args: 'status' } as never)
  expect(status.text).toContain('Mehrkosten: 1 Haiku-Antworten verworfen')
})

test('Zu großer Kontext: bleibt beim großen Modell', async ($, on) => {
  const gefragt: string[] = []
  stubs(on, gefragt, 'lesen', 336_000)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/p' } as never)
  await $.command.run({ command: 'sparmodus', args: 'an' } as never)
  await $.turn.start({ turnId: 't', text: 'x' } as never)
  await schritt($, 0)
  await schritt($, 1)
  expect(gefragt).toEqual([GROSS, GROSS])
})
