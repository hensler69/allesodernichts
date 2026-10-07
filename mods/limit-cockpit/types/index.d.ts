export type Fenster = { prozent: number; zurueck?: string }
export type Limits = { fuenfStunden?: Fenster; woche?: Fenster; gemeldet: boolean }
export type Kontext = { tokens?: number; fenster?: number; prozent?: number }
export type Uebergabe = { zustand: 'bereit' | 'schreibt' | 'kopiert' | 'nicht-kopiert' | 'fehler'; hinweis?: string }

declare module 'claude-code' {
  interface PluginState {
    'limit-cockpit': { limits: Limits; kontext: Kontext; uebergabe: Uebergabe }
  }
}
