# 014: Gutschein eingelöst: Rabattzeile gleitet ein, Gesamtsumme blendet weich um

- Stand: Commit `adc9dc8` · Art: Gelegenheit (Zustand zeigen, gelegentlich) · Status: ERLEDIGT
- Dateien: `shops/helia/assets/style.css`, `shops/helia/assets/script.js` (Funktion `kasseZeigen()`, Zeile 932 ff.)

## Heute
`[data-feld="rabatt-zeile"]` wird per `hidden` sofort sichtbar, die Gesamtsumme springt hart um.

## Ziel
- Rabattzeile: `opacity 0` und `translate 0 -4px` zu ruhig, 200 ms, `cubic-bezier(0.23,1,0.32,1)`, per `@starting-style` (kein JavaScript nötig).
- Gesamtsumme: bei Änderung 150 ms Aufblenden aus 4 px Tiefe (gleiches Muster wie Plan 009), bei "weniger Bewegung" nur Aufblenden.

## Schritte
1. CSS:
   ```css
   [data-feld="rabatt-zeile"]{transition:opacity .2s var(--ease-out),translate .2s var(--ease-out)}
   @starting-style{[data-feld="rabatt-zeile"]{opacity:0;translate:0 -4px}}
   ```
2. In `kasseZeigen()` die Zeile `$('[data-feld="gesamt"]', seite).textContent = euro(gesamt);` ersetzen durch einen Aufruf von `weichSetzen($('[data-feld="gesamt"]', seite), euro(gesamt))`.
   `weichSetzen(el, text)` setzt den Text nur bei Änderung und animiert dann
   `[{ opacity: 0.3, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }]` über 150 ms, `cubic-bezier(0.23, 1, 0.32, 1)`.
   Der Betrag braucht `display:inline-block`.

## Prüfen
Kasse: Code SONNE10 einlösen: Die Rabattzeile gleitet ein, die Summe blendet weich auf den neuen Betrag.
