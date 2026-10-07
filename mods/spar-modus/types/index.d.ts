export type Nutzung = { neu: number; lesen: number; schreiben: number; aus: number }
export type Bilanz = { haikuSchritte: number; haiku: Nutzung; verworfen: number; verworfenNutzung: Nutzung; grossSchritte: number }

declare module 'claude-code' {
  interface PluginState {
    'spar-modus': { an: boolean; bilanz: Bilanz }
  }
}
