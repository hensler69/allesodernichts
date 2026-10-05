# 006: Zeitleiste "Vom Abend bis zum Morgen" erst nach kurzem Verweilen öffnen

- Stand: Commit `79a6061` · Stärke: NIEDRIG · Bereich: Gefühl · Status: OFFEN
- Datei: `shops/helia/assets/script.js` (Zeilen 424–433)

## Problem
```js
if (fein) t.addEventListener('mouseenter', () => oeffnen(t));
```
Wer die Maus nur über die vier Felder zieht, löst nacheinander große Umbauten (0,7 s, `flex-grow`) aus. Das wirkt unruhig.

## Ziel
Öffnen per Maus erst nach 120 ms Verweilen. Klick und Tastatur-Fokus öffnen weiterhin sofort.

## Schritte
Zeile 432 ersetzen durch:
```js
if (fein) {
  let warte;
  t.addEventListener('mouseenter', () => { clearTimeout(warte); warte = setTimeout(() => oeffnen(t), 120); });
  t.addEventListener('mouseleave', () => clearTimeout(warte));
}
```

## Grenzen
Dauer und Kurve des Öffnens (`.7s var(--ease-in-out)`) bleiben.

## Prüfen
Maus schnell quer über alle vier Felder ziehen: Nichts klappt auf. Auf einem Feld verweilen: Es öffnet sich nach kurzer Pause. Klick öffnet sofort.
