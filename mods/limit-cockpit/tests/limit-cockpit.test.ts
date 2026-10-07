import { expect, mock, test } from 'claude-code/testing'

import { HINWEIS_KOPIERT, leistenText, treiberZeile, wochenWarnung } from '../hooks/register.tsx'

const BAND = {
  plugin: 'limit-cockpit',
  component: 'AbovePrompt',
  viewport: { columns: 120, rows: 30 },
  props: { hasSurvey: false, isWorking: false, maxRows: 6, bodyColumns: 115, scroll: { offset: 0, bodyRows: 6 }, view: {} },
} as const

const NUTZUNG = { input_tokens: 12, output_tokens: 800, cache_read_input_tokens: 300_000, cache_creation_input_tokens: 4_000 }

test('Leiste: Limit, Rücksetzzeit und Kontext stehen im Text, Warnung erst ab 75 % Wochenlimit', () => {
  const jetzt = Date.parse('2026-10-07T12:00:00Z')
  const limits = { gemeldet: true, fuenfStunden: { prozent: 42, zurueck: '2026-10-07T15:30:00Z' }, woche: { prozent: 74.9 } }
  const text = leistenText(limits, { tokens: 336_000, fenster: 1_000_000, prozent: 33.6 }, jetzt)
  expect(text).toMatch(/^5-Std\.-Limit 42 % · zurück \d\d:\d\d/)
  expect(text).toContain('Kontext 34 % (336k von 1,0 Mio.)')
  expect(wochenWarnung(limits, jetzt)).toBeUndefined()
  expect(wochenWarnung({ ...limits, woche: { prozent: 75 } }, jetzt)).toMatch(/^Wochenlimit 75 % verbraucht/)
})

test('Leiste ohne Messung sagt das offen, statt Zahlen zu erfinden', () => {
  expect(leistenText({ gemeldet: false }, {}, 0)).toBe('5-Std.-Limit: noch keine Messung  ·  Kontext: noch keine Messung')
})

test('Treiber-Zeile: Top 3 gemessen je Anfrage, Werkzeuge nur in Zeichen mit Schätzung', () => {
  const zeile = treiberZeile(
    [
      { nr: 1, modell: 'claude-opus-5-5', lesen: 100_000, schreiben: 0, neu: 10, aus: 100, subagent: false },
      { nr: 2, modell: 'claude-opus-5-5', lesen: 300_000, schreiben: 5_000, neu: 10, aus: 900, subagent: false },
      { nr: 3, modell: 'claude-haiku-4-5', lesen: 1_000, schreiben: 0, neu: 10, aus: 10, subagent: true },
      { nr: 4, modell: 'claude-opus-5-5', lesen: 200_000, schreiben: 0, neu: 10, aus: 50, subagent: false },
    ],
    [{ name: 'Read', ziel: 'riesig.log', zeichen: 400_000 }],
  )
  expect(zeile).toMatch(/^Größte Treiber \(gemessen je Anfrage\): Anfrage 2 .*Anfrage 4 .*Anfrage 1 /)
  expect(zeile).not.toContain('Anfrage 3')
  expect(zeile).toContain('Read riesig.log: 400k Zeichen ≈ 100k Tokens')
})

test('Band zeigt gemessene Limits aus session.measure und die Wochenwarnung', async ($, on) => {
  mock.clock(on)
  on('ui.render', () => ({ type: 'Text', props: {}, children: ['von Claude Code'] }))
  on('session.measure', ($, e) => ({ changed: e.changed }))
  await $.session.measure({
    context: { tokens: 500_000, window: 1_000_000, percent: 50 },
    rateLimits: [
      { kind: 'five_hour', percentUsed: 61, resetsAt: '2026-10-07T18:00:00Z' },
      { kind: 'seven_day', percentUsed: 80, resetsAt: '2026-10-10T09:00:00Z' },
    ],
    changed: ['context', 'rateLimits'],
  } as never)
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...BAND, surface })
    expect(await ui.find({ type: 'Text', text: /5-Std\.-Limit 61 %.*Kontext 50 %/ })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /Wochenlimit 80 % verbraucht/ })).toBeDefined()
    expect(await ui.find({ key: 'uebergabe' })).toBeDefined()
    await ui.unmount()
  }
})

test('/handoff schreibt die Übergabe, kopiert sie und nennt den Zusatzverbrauch', async ($, on) => {
  on('session.surfaces', () => ({ value: ['terminal'] }))
  on('model.fork', () => ({ value: { isAnswered: true, text: 'Ziel: Shop bauen\nAktueller Stand: fertig', usage: NUTZUNG } }))
  let kopiert = ''
  on('ui.copy', ($, e) => {
    kopiert = e.text
    return { value: { isCopied: true } }
  })
  on('ui.toast', () => ({ value: undefined }))
  const antwort = await $.command.run({ command: 'handoff', args: '' } as never)
  expect(kopiert).toBe('Ziel: Shop bauen\nAktueller Stand: fertig')
  expect(antwort.text).toContain(HINWEIS_KOPIERT)
  expect(antwort.text).toContain('zusätzliche Modell-Anfrage')
})

test('/handoff ohne Zwischenablage zeigt den Text zum Selbstkopieren', async ($, on) => {
  on('session.surfaces', () => ({ value: [] }))
  on('model.fork', () => ({ value: { isAnswered: true, text: 'Ziel: X', usage: NUTZUNG } }))
  on('ui.copy', () => ({ value: { isCopied: false, reason: 'no-surface' } }))
  const antwort = await $.command.run({ command: 'handoff', args: '' } as never)
  expect(antwort.text).toMatch(/^Kopieren in die Zwischenablage war hier nicht möglich \(no-surface\)/)
  expect(antwort.text).toContain('Ziel: X')
})

test('Nach einer Antwort steht die Treiber-Zeile darunter', async ($, on) => {
  on('turn.start', ($, e) => ({ turnId: e.turnId }))
  on('tool.call', () => ({ result: 'x'.repeat(8_000) }))
  on('turn.step', async function* ($, e) {
    return { turnId: e.turnId, index: e.index, answer: '', toolUses: [], stopReason: 'end_turn', usage: { ...NUTZUNG, model: 'claude-opus-5-5' } }
  })
  on('turn.complete', () => ({ text: 'Antwort' }))
  await $.turn.start({ turnId: 't1', text: 'mach was' })
  await $.tool.call({ tool: 'Read', file_path: '/p/gross.txt' })
  const strom = $.turn.step({ turnId: 't1', index: 0, model: 'claude-opus-5-5', messageCount: 3 })
  let schritt = await strom.next()
  while (schritt.done !== true) schritt = await strom.next()
  const fertig = await $.turn.complete({ turnId: 't1', answer: 'Antwort', durationMs: 10, isAborted: false, reason: 'answer', usage: null } as never)
  expect(fertig.text).toMatch(/^Größte Treiber \(gemessen je Anfrage\): Anfrage 1 \(opus-5-5\): 305k/)
  expect(fertig.text).toContain('Read gross.txt: 8k Zeichen')
})
