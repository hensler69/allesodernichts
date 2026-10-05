# 009: Summe im Angebot beim Ändern weich wechseln

- Stand: Commit `79a6061` · Stärke: Ergänzung · Bereich: Verpasste Gelegenheit · Status: OFFEN
- Datei: `shops/helia/assets/script.js` (Funktion `angebotSumme()`)

## Problem
Wechsel zwischen "Ein Lichtwecker" und "2er-Set" oder Ändern der Menge tauscht die Summe hart aus. Man übersieht leicht, dass sich etwas geändert hat.

## Ziel
Neue Zahl kommt aus 4 px Tiefe mit Aufblenden, 150 ms, Kurve `cubic-bezier(0.23, 1, 0.32, 1)`. Nur wenn sich der Text wirklich ändert.
Bei "weniger Bewegung": nur Aufblenden ohne Verschieben.

## Schritte
In `angebotSumme()` die Zeile mit `data-feld="angebot-summe"` ersetzen durch:
```js
const feld = $('[data-feld="angebot-summe"]', angebot);
const neu = euro(menge * preis(id));
if (feld.textContent !== neu) {
  feld.textContent = neu;
  if (feld.animate) feld.animate(ruhig ? [{ opacity: 0.4 }, { opacity: 1 }] : [{ opacity: 0.3, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 150, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
}
```
Hinweis: `<strong>` ist inline. Damit `transform` wirkt, in style.css ergänzen: `.summe strong{display:inline-block}`.

## Prüfen
Schnell mehrmals "+" klicken: Jede Änderung zuckt kurz und ruhig, nichts stapelt sich (Web-Animationen ersetzen sich, kein Flackern).
