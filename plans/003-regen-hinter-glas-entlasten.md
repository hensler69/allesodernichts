# 003: Regen hinter den Glasflächen entlasten

- Stand: Commit `79a6061` · Stärke: HOCH (am echten Gerät fühlen) · Bereich: Leistung · Status: ERLEDIGT
- Datei: `shops/helia/assets/script.js` (Regen ab Zeile 333, Schleife Zeile 364)

## Problem
Der Regen wird 60-mal pro Sekunde auf eine Vollbild-Zeichenfläche gemalt:
```js
const schleife = () => { if (!document.hidden) malen(true); requestAnimationFrame(schleife); };
```
Über dem Regen liegen bis zu 17 Glasflächen mit `backdrop-filter: blur(28px) saturate(160%)`. Ändert sich der Hintergrund,
muss jede sichtbare Glasfläche neu weichgezeichnet werden, also auch 60-mal pro Sekunde. Auf Mittelklasse-Handys und -Laptops
kostet das viel Rechenzeit und Akku. Bei geöffnetem Warenkorb oder Bewertungsfenster ist der Regen ohnehin kaum sichtbar.

## Ziel
- Regen mit 30 Bildern pro Sekunde zeichnen, Geschwindigkeit pro Sekunde bleibt gleich.
- Pausieren, solange ein `<dialog>` offen ist.
- Auf Touch-Geräten (`(pointer: coarse)`) halb so viele Tropfen.

## Schritte
1. In `groesse()` die Tropfenzahl ändern:
   ```js
   const grob = window.matchMedia('(pointer: coarse)').matches;
   const anzahl = Math.min(grob ? 55 : 110, Math.round((b * h) / (grob ? 30000 : 15000)));
   ```
2. In `malen(bewegen)` einen Zeitfaktor einführen: Signatur `malen(bewegen, faktor = 1)` und in der Schleife
   `t.y += t.v * faktor; t.x += t.v * 0.16 * faktor;`.
3. Schleife ersetzen:
   ```js
   let letztes = 0;
   const schleife = (jetzt) => {
     const offen = document.querySelector('dialog[open]');
     if (!document.hidden && !offen && jetzt - letztes >= 33) {
       const faktor = letztes ? Math.min(3, (jetzt - letztes) / 16.7) : 1;
       letztes = jetzt;
       malen(true, faktor);
     }
     requestAnimationFrame(schleife);
   };
   requestAnimationFrame(schleife);
   ```

## Grenzen
Aussehen der Tropfen (Farbe, Länge, Neigung, Deckkraft) nicht ändern. Bei "weniger Bewegung" bleibt das statische Einzelbild.

## Prüfen
- Regen sieht gleich schnell aus wie vorher, nur minimal weniger flüssig. Wenn das störend auffällt: Schwelle 33 auf 24 senken (etwa 40 Bilder pro Sekunde).
- Warenkorb öffnen: Regen steht still. Schließen: Regen läuft weiter.
- Gefühlsprobe am ECHTEN Handy (nicht im Emulator): Scrollen über die Bewertungen und Funktionen muss flüssig sein.
  Vorher und nachher vergleichen, am besten mit Akku unter 50 %, wenn das Gerät drosselt.
