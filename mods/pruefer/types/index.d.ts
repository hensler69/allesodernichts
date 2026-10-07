export type Check = { befehl: string; art: string; ok: boolean; nr: number }
export type Aenderung = { pfad: string; nr: number; per: string }
export type Learning = { datum: string; text: string }
export type Abgabe = { zustand: 'beobachtet' | 'bestanden' | 'zurueckgeschickt' | 'ehrlich-offen' | 'ausnahme' | 'aus'; grund?: string; sperren: number }
export type Zweit = { an: boolean; letzte?: string; tokens?: number }

declare module 'claude-code' {
  interface PluginState {
    pruefer: { an: boolean; aenderungen: Aenderung[]; checks: Check[]; abgabe: Abgabe; learnings: Learning[]; zweit: Zweit }
  }
}
