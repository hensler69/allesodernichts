# Bewegung

Zusammengefasst aus den Durchgängen improve-animations (Pläne 001 bis 010), Tag-Nacht-Schleife (011),
find-animation-opportunities (012 bis 016) und emil-design-eng. Alles ist in der Referenz umgesetzt;
die Stellen im Code findest du über die Kommentarzeilen `/* ---------- ... ---------- */` in `script.js` und `style.css`.

## Inhalt
1. Entscheidungsregeln
2. Kurven und Dauern
3. Leistung
4. Bausteine, die sich bewährt haben
5. Bewusst NICHT animiert
6. Barrierefreiheit

## 1. Entscheidungsregeln
Vor jeder Animation drei Fragen:
- Wie oft sieht man sie? Häufig (Hover, Tastatur) = kaum oder keine Bewegung. Selten (Danke-Seite, erster Besuch) = darf
  besonders sein.
- Wozu? Gültig sind: Rückmeldung (Knopf gibt nach), Zustand zeigen (Senden läuft), Erklären (Produkt zum Ausprobieren),
  Sprünge vermeiden (Zeile gleitet ein statt aufzuploppen), Raum (kommt woher, geht dorthin). "Sieht cool aus" reicht nicht.
- Was ist die Ruhe danach? Nach dem Einblenden steht die Seite still; dauerhaft bewegt sich nur die Welt im Hintergrund,
  das Produkt (langsam) und das Glühen des Kaufknopfs.

## 2. Kurven und Dauern
- Kurven als Variablen: `--ease-out: cubic-bezier(0.23,1,0.32,1)` für Ein- und Ausblenden und alles, was auf eine Aktion
  antwortet, `--ease-in-out: cubic-bezier(0.77,0,0.175,1)` für Bewegung auf dem Bildschirm, `--ease-drawer:
  cubic-bezier(0.32,0.72,0,1)` für Schubladen und Dialoge. Nie `ease-in` für Bedienelemente.
- Dauern: Knopfdruck 100 bis 160 ms (`scale(.97)`, kleine Stepper-Knöpfe `scale(.9)`), Menüs und Zeilen 180 bis 250 ms,
  Dialoge 250 bis 400 ms, Erzählendes (Produkt geht an, Einblenden beim Scrollen) 0,8 bis 2,6 s.
- Nie von `scale(0)` starten, sondern von 0,95 bis 0,97 plus Deckkraft.
- Übergänge (transition) statt fester Abläufe (keyframes) für alles, was man schnell hintereinander auslösen kann.
- Eintritt mit `@starting-style` (Menü, Meldungen), älteren Browsern fehlt dann nur der Effekt.

## 3. Leistung
- Nur `transform`, `opacity` und `filter` animieren. Höhe nur über Web Animations mit gemessener Höhe (Warenkorb-Zeile).
- CSS-Variablen, die sich ständig ändern, nur am betroffenen Element setzen und nur, wenn sich der Wert ändert
  (Hilfsfunktion `setzeWenn`). An `<html>` gesetzt rechnet sonst die ganze Seite neu.
- Erst alles messen (getBoundingClientRect), dann alles schreiben. Scroll-Arbeit in einem requestAnimationFrame bündeln.
- Zeiger-Effekte (Kippen, Tiefe) direkt als `transform` am Element, Lichtreflex als eigenes Element.
- Schleifen (Regen, Produktdrehung, Simulation) laufen nur, solange sie sichtbar sind (IntersectionObserver) und der Tab offen ist.
- Ein dauerhaftes Glühen als eigene Schicht, deren Deckkraft animiert wird, nicht `box-shadow` selbst.

## 4. Bausteine, die sich bewährt haben
- Einblenden beim Scrollen: sichtbarer Ausgangszustand (Deckkraft 0,35, 16px tiefer), nie ganz unsichtbar; Bilder wachsen
  von 0,96 auf 1 und verblassen beim Hinausscrollen (Scroll-Animation in CSS, wo unterstützt).
- Kacheln kippen mit dem Zeiger (höchstens 7°), Lichtreflex folgt. Das Einblend-Delay darf nicht fürs Kippen gelten.
- Zahlen zählen beim ersten Sichtbarwerden hoch. Geldbeträge NICHT hochzählen (wirkt wie ein Spielautomat).
- Satz wird Wort für Wort hell beim Scrollen.
- Erlebnis-Schleife (bei HELIA Tag und Nacht in 20 s): startet, wenn ein Drittel sichtbar ist, stoppt beim Wegscrollen,
  Regler unterbricht, Loslassen setzt an derselben Stelle fort, Tastatur läuft 1,2 s nach der letzten Taste weiter,
  Knopf "Anhalten/Abspielen". Der Seitenhimmel folgt der Schleife weich.
- Zitat-Karussell mit Pfeilen und Pfeiltasten, hält bei Zeiger oder Fokus an.
- Kartenstapel: Karten bleiben oben kleben, die nächste schiebt sich darüber, vordere werden kleiner und dunkler.
- Laufband stoppt bei Mauskontakt.
- Warenkorb: entfernte Artikel gleiten weg (180 ms), die Lücke schließt sich (160 ms). Summen wechseln weich (Überblenden
  mit leichter Unschärfe), Gutschein-Zeile gleitet ein.
- Formulare: Knopf zeigt erst nach 150 ms Wartezeit einen Ring und "Wird gesendet" (schnelle Antworten flackern nicht),
  Meldungen blenden ein, Fehler mit kurzem seitlichem Zucken.
- Fragen-Akkordeon klappt weich auf und zu (`interpolate-size` / `::details-content`, wo unterstützt).
- Danke-Seite: Produkt geht in 1,8 s an, Text steigt gestaffelt auf. Einmalig, darf feierlich sein.
- Wechselnde Ziffern (Weckzeit) rutschen in die Richtung der Änderung (180 ms, 5px).
- Zeitleisten oder Vorschauen, die beim Überfahren öffnen: erst nach 120 ms Verweilen (Absicht), sonst flackert es beim Vorbeifahren.

## 5. Bewusst NICHT animiert (aus find-animation-opportunities)
- Produktbild fliegt in den Warenkorb (verspielt, lenkt ab, bei jedem Klick).
- Warenkorb-Zeilen gestaffelt einblenden (verzögert den Blick auf die Summe).
- Hochzählende Geldbeträge.
- Schrumpfende Kopfleiste beim Scrollen (Unruhe ohne Nutzen).
- Klingel- oder Wackeleffekte in Schleifen.
- Alles, was über die Tastatur ausgelöst wird und oft passiert.

## 6. Barrierefreiheit
- `prefers-reduced-motion: reduce`: kein Selbststart von Schleifen, Produkt dreht nicht von selbst, Einblenden ohne Weg,
  Endzustände direkt zeigen (zum Beispiel Simulation steht auf "volles Licht", Sonne im Abschied halb gesunken).
- Alles, was sich länger als 5 Sekunden von selbst bewegt, braucht einen Anhalten-Knopf (WCAG 2.2.2).
- Bewegung nie als einziger Träger einer Information.
