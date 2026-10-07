export type Zaehler = { tag: string; geprueft: number; angehalten: number }

declare module 'claude-code' {
  interface PluginState {
    schutzschild: { an: boolean; zaehler: Zaehler; letzter?: string }
  }
}
