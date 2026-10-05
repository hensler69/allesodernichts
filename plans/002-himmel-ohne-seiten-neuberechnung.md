# 002: Himmel und Stadt aktualisieren, ohne die ganze Seite neu zu berechnen

- Stand: Commit `79a6061` · Stärke: HOCH · Bereich: Leistung · Status: ERLEDIGT
- Datei: `shops/helia/assets/script.js` (Funktion `bild()` ab Zeile 236, Maus-Listener Zeile 322)

## Problem
`bild()` läuft bei jedem Scroll-Bild UND (Zeile 322) bei jeder Mausbewegung. Dabei passiert:
1. Vier CSS-Variablen werden am Wurzelelement gesetzt, auch wenn sich der Wert nicht ändert:
   ```js
   root.style.setProperty('--sky1', verlauf(HIMMEL, s, 1));
   root.style.setProperty('--sky2', verlauf(HIMMEL, s, 2));
   root.style.setProperty('--sky3', verlauf(HIMMEL, s, 3));
   root.style.setProperty('--sun', s.toFixed(3));
   ```
   Eine geänderte Variable an `<html>` zwingt den Browser, die Stile der GANZEN Seite neu zu berechnen.
   Verwendet werden die Variablen aber nur in `.welt` (style.css Zeile 78) und `.welt__sonne` (Zeile 80).
2. Messen (`getBoundingClientRect`) und Schreiben wechseln sich ab (erst Schreiben am Himmel, dann Messen von `wortweise`,
   dann Schreiben, dann Messen von `heldKnopf` und `angebotTeil`). Jeder Wechsel erzwingt eine zusätzliche Layout-Berechnung.
3. Die Mausbewegung braucht nur die Verschiebung der Stadtebenen, löst aber das komplette `bild()` aus.

## Ziel
- Himmel-Variablen nur am Element `.welt` setzen (Variable `welt` existiert schon), und nur, wenn sich der Text-Wert ändert.
- In `bild()` erst alle Messungen, dann alle Schreibzugriffe.
- Mausbewegung ruft eine eigene, kleine Funktion auf, die nur `stadt[i].style.transform` setzt.

## Schritte
1. Über `function bild()` einfügen:
   ```js
   const himmelZuletzt = {};
   function himmelSetzen(name, wert) {
     if (!welt || himmelZuletzt[name] === wert) return;
     himmelZuletzt[name] = wert;
     welt.style.setProperty(name, wert);
   }
   let stadtP = 0;
   function stadtSetzen() {
     if (ruhig) return;
     stadt.forEach((el, i) => { el.style.transform = `translate3d(${(maus.x * [-6, -14, -26][i]).toFixed(1)}px, ${(stadtP * [3, 7, 12][i]).toFixed(2)}vh, 0)`; });
   }
   ```
2. In `bild()` die vier `root.style.setProperty(...)` ersetzen durch `himmelSetzen('--sky1', ...)` usw.
   Für `--sun` den Wert auf 2 Nachkommastellen runden: `himmelSetzen('--sun', s.toFixed(2))`.
3. In `bild()` die Zeile mit `stadt.forEach(...)` ersetzen durch `stadtP = p; stadtSetzen();`.
4. In `bild()` alle Messungen an den Anfang ziehen (direkt nach `const a = aufgangFortschritt();`):
   ```js
   const rWort = wortweise && !ruhig ? wortweise.getBoundingClientRect() : null;
   const hk = kaufleiste && heldKnopf ? heldKnopf.getBoundingClientRect() : null;
   const an = kaufleiste && angebotTeil ? angebotTeil.getBoundingClientRect() : null;
   ```
   und weiter unten statt der eigenen Messungen diese Variablen verwenden (`r` im Wort-Block wird zu `rWort`).
5. Zeile 322 ändern: statt `planen()` eine eigene rAF-gedrosselte Funktion aufrufen:
   ```js
   let mausWartet = false;
   if (feinZeiger && !ruhig) addEventListener('pointermove', (e) => {
     maus.x = e.clientX / innerWidth - 0.5; maus.y = e.clientY / innerHeight - 0.5;
     if (!mausWartet) { mausWartet = true; requestAnimationFrame(() => { mausWartet = false; stadtSetzen(); }); }
   }, { passive: true });
   ```
6. Optional, aber empfohlen: `aufgangKlebt.style.setProperty('--lamp'|'--glow'|'--p', ...)` ebenfalls nur bei Änderung setzen
   (gleiches Muster mit eigenem Zwischenspeicher).

## Grenzen
Keine Farben, Kurven oder Werte ändern. Die Variablen-Standardwerte in `style.css` (`:root{--sky1...}`) bleiben als Rückfall stehen.

## Prüfen
- `node --check shops/helia/assets/script.js` ohne Fehler.
- Seite scrollen: Himmel wechselt wie vorher von Nacht zu Morgenrot, Sonnenaufgang-Abschnitt färbt Lampe und Uhr wie vorher.
- Maus bewegen: Stadt verschiebt sich in drei Tiefen wie vorher.
- Leistung: Chrome Entwicklerwerkzeuge, "Performance", 5 Sekunden Maus kreisen lassen. Vorher: lange lila "Recalculate Style"-Blöcke
  für viele Elemente. Nachher: keine "Recalculate Style" über die ganze Seite bei reiner Mausbewegung.
