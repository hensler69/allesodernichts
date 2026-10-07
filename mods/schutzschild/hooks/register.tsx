// schutzschild: hält riskante Schritte an, erklärt sie in einfachen Worten und fragt nach.
// - Harmlose Schritte laufen ohne Unterbrechung durch.
// - Bestätigt Manuel, geht der Aufruf an Claude Codes eigene Berechtigungsprüfung weiter: bestehende Regeln bleiben bestehen.
// - Die Mod erteilt nie selbst eine Erlaubnis.
// - Schlägt die Prüfung fehl, wird der Schritt blockiert und der Fehler angezeigt.
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Zaehler } from '../types'
import { frage, heute, pruefeBash, pruefeDatei } from './regeln.ts'
import type { Befund } from './regeln.ts'

const anAtom = atom({ plugin: 'schutzschild', key: 'an' } as const, true)
const zaehlerAtom = atom({ plugin: 'schutzschild', key: 'zaehler' } as const, { tag: '', geprueft: 0, angehalten: 0 } as Zaehler)

export const JA = 'Ausführen'
export const NEIN = 'Abbrechen'
const GEPRUEFTE_WERKZEUGE = ['Bash', 'Write', 'Edit', 'NotebookEdit'] as const

async function zaehle($: EngineInterface, angehalten: boolean): Promise<void> {
  const tag = heute(await $.clock.now())
  const gespeichert = ((await $.store.get('zaehler')) as Zaehler | undefined) ?? { tag, geprueft: 0, angehalten: 0 }
  const basis = gespeichert.tag === tag ? gespeichert : { tag, geprueft: 0, angehalten: 0 }
  const neu = { tag, geprueft: basis.geprueft + 1, angehalten: basis.angehalten + (angehalten ? 1 : 0) }
  await $.store.set('zaehler', neu)
  await update($, zaehlerAtom, () => neu)
  $.ui.invalidate('ui.render')
}

async function bewerte($: EngineInterface, e: { tool: string } & Record<string, unknown>): Promise<{ befund?: Befund; detail: string }> {
  const projekt = await $.session.root()
  const cwd = await $.session.cwd()
  if (e.tool === 'Bash') {
    const befehl = typeof e.command === 'string' ? e.command : ''
    return { befund: pruefeBash(befehl, projekt), detail: befehl.length > 300 ? befehl.slice(0, 300) + '…' : befehl }
  }
  const pfad = typeof e.file_path === 'string' ? e.file_path : typeof e.notebook_path === 'string' ? e.notebook_path : ''
  if (!pfad) throw new Error('Kein Dateipfad im Aufruf gefunden')
  return { befund: pruefeDatei(pfad, cwd, projekt), detail: pfad }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'schutzschild', description: 'Schutzschild an- oder ausschalten (ohne Zusatz: umschalten; "an", "aus" oder "status")' })
    const an = (await $.store.get('an')) as boolean | undefined
    await update($, anAtom, () => an !== false)
    const z = (await $.store.get('zaehler')) as Zaehler | undefined
    const tag = heute(await $.clock.now())
    await update($, zaehlerAtom, () => (z && z.tag === tag ? z : { tag, geprueft: 0, angehalten: 0 }))
    return next(e)
  })

  on('tool.call', { tool: GEPRUEFTE_WERKZEUGE }, async ($, e, next) => {
    if (!(await read($, anAtom))) return next(e)
    const { befund, detail } = await bewerte($, e as unknown as { tool: string } & Record<string, unknown>)
    if (befund === undefined) {
      await zaehle($, false)
      return next(e)
    }
    await zaehle($, true)
    let antwort = NEIN
    try {
      // Der Aufruf wartet hier, bis Manuel entscheidet
      antwort = await $.ui.ask(frage(befund, detail), [JA, NEIN])
    } catch {
      // Niemand kann gefragt werden (zum Beispiel claude -p) oder die Frage wurde geschlossen: sicher ablehnen
      return { deny: `Schutzschild: Dieser Schritt wurde angehalten und konnte nicht bestätigt werden, weil hier niemand gefragt werden kann. Vorhaben: ${befund.vorhaben} Bitte frage Manuel im Chat, ob er das wirklich möchte, und erkläre, was verloren gehen kann.` }
    }
    if (antwort !== JA) {
      return { deny: `Schutzschild: Manuel hat diesen Schritt abgelehnt (${befund.vorhaben}). Führe ihn nicht auf anderem Weg aus. Frage nach, bevor du es anders versuchst.` }
    }
    // Bestätigt: Claude Codes eigene Berechtigungsprüfung läuft trotzdem noch
    return next(e)
  }).catch(($, e, next) =>
    next.called ? next(e) : { deny: `Schutzschild: Die Risikoprüfung ist fehlgeschlagen (${next.error.kind}). Zur Sicherheit wurde dieser Schritt blockiert. Mit /schutzschild aus lässt sich die Prüfung abschalten.` },
  )

  on('command.run', { command: 'schutzschild' }, async ($, e) => {
    const wunsch = e.args.trim().toLowerCase()
    const jetzt = await read($, anAtom)
    if (wunsch === 'status') {
      const z = await read($, zaehlerAtom)
      return { text: `Schutzschild ist ${jetzt ? 'an' : 'aus'}. Heute ${z.geprueft} Schritte geprüft, ${z.angehalten} angehalten.` }
    }
    const neu = wunsch === 'an' ? true : wunsch === 'aus' ? false : !jetzt
    await $.store.set('an', neu)
    await update($, anAtom, () => neu)
    $.ui.invalidate('ui.render')
    return { text: neu ? 'Schutzschild ist an. Riskante Schritte werden angehalten und erklärt.' : 'Schutzschild ist aus. Es wird nichts mehr geprüft, bis du /schutzschild an eingibst.' }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const darunter = await next(e)
    if (e.props.hasSurvey) return darunter
    const { Box, Text } = $.ui.resolve(e)
    const an = await read($, anAtom)
    const z = await read($, zaehlerAtom)
    return (
      <Box flexDirection="column">
        <Text dimColor>
          {an ? `Schutzschild an · heute ${z.geprueft} geprüft · ${z.angehalten} angehalten` : 'Schutzschild aus · /schutzschild schaltet es an'}
        </Text>
        {darunter}
      </Box>
    )
  })
}
