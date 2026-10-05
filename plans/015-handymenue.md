# 015: Handy-Menü klappt von der Kopfleiste herunter, Symbol wird zum X

- Stand: Commit `adc9dc8` · Art: Gelegenheit (räumlicher Zusammenhang und Zustand zeigen, gelegentlich) · Status: ERLEDIGT
- Dateien: `shops/helia/assets/style.css` (Block `max-width:760px`, `.kopf__nav`), Menü-Symbol im Generator (`ICON["menue"]`) und damit in `index.html`

## Heute
`.kopf__nav{display:none}` beziehungsweise `.ist-offen{display:flex}`: Das Menü erscheint und verschwindet schlagartig. Das Symbol bleibt immer zwei Striche.

## Ziel
- Auf- und Zuklappen: `opacity 0` und `translate 0 -8px` zu ruhig, 220 ms, `cubic-bezier(0.23,1,0.32,1)`, auf demselben Weg zurück
  (`transition-behavior: allow-discrete` für `display`, `@starting-style` für den Start).
- Symbol: Die zwei Striche drehen sich in 200 ms zu einem X (oberer Strich `rotate(45deg) translateY(3px)`, unterer `rotate(-45deg) translateY(-3px)`,
  Drehpunkt `12px 12px` im 24er-Raster des SVG).
- Bei "weniger Bewegung": nur Einblenden, Symbol springt ohne Übergang.

## Schritte
1. Symbol im HTML: `<path d="M4 9h16M4 15h16"/>` ersetzen durch `<path class="m1" d="M4 9h16"/><path class="m2" d="M4 15h16"/>`.
2. CSS (allgemein): 
   ```css
   .menue-knopf path{transform-origin:12px 12px;transition:transform .2s var(--ease-out)}
   .menue-knopf[aria-expanded="true"] .m1{transform:rotate(45deg) translateY(3px)}
   .menue-knopf[aria-expanded="true"] .m2{transform:rotate(-45deg) translateY(-3px)}
   ```
3. CSS im Block `max-width:760px` zu `.kopf__nav{…display:none…}` ergänzen:
   `opacity:0;translate:0 -8px;transition:opacity .22s var(--ease-out),translate .22s var(--ease-out),display .22s allow-discrete`,
   `.kopf__nav.ist-offen{display:flex;opacity:1;translate:none}` und `@starting-style{.kopf__nav.ist-offen{opacity:0;translate:0 -8px}}`.
4. Bei "weniger Bewegung": `.kopf__nav{translate:none}`, `.menue-knopf path{transition:none}`.

## Prüfen
Handy-Ansicht (390 px): Menü öffnen und schließen. Es gleitet aus der Kopfleiste und zurück, das Symbol wird zum X und wieder zu zwei Strichen.
