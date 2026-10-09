# Skill-Verbund: womit jedes Layout überarbeitet wird

Manuel will, dass jedes Layout (HELIA, HORTA und jedes künftige) mit denselben Skills überarbeitet wird, und dass diese Skills
zusammen mit allen Design-Vorlagen in einem Skill liegen. Dies ist der Platz dafür.

## Stand
Manuel hat am 09.10.2026 festgelegt, mit welchen drei Skills jedes Layout überarbeitet wird: **gpt-taste**, **impeccable** und
**emil-design-eng** (Emil Kowalski). Sie gelten für HELIA, HORTA, alle Vorlagen und jeden künftigen Look. Jeder Look-Skill
(`look-<name>`) enthält deshalb einen Abschnitt "Verbund-Durchgang" mit einer Vorher/Nachher-Tabelle.

## Die drei Skills (in dieser Reihenfolge anwenden)
| Reihenfolge | Skill | Aufgabe am Layout | Was aus dem Skill übernommen wird | Ergebnis kommt in |
| --- | --- | --- | --- | --- |
| 1 | gpt-taste | Aufbau und Raster | AIDA-Reihenfolge (Aufmerksamkeit, Interesse, Verlangen, Handlung), Überschrift breit und höchstens 2 bis 3 Zeilen, Raster ohne leere Löcher, große gleichmäßige Abstände, keine Meta-Labels ("ABSCHNITT 01"), Knopftext immer lesbar | Look-Skill, Abschnitt "Verbund-Durchgang"; `ein-produkt-shop/references/gestaltung.md` |
| 2 | impeccable | Farbe, Hierarchie, Barrierefreiheit | Jede Farbe hat eine Rolle, Signalfarbe nur für Kaufen und Auswahl, ein Blickfang pro Bildschirm, Kontrast gemessen, sichtbarer Fokus, kein Standard-Klischee ohne Absicht | Look-Skill, Abschnitt "Verbund-Durchgang"; `gestaltung.md`, Abschnitt Farbe |
| 3 | emil-design-eng | Details und Bewegung | `:active` mit `scale(.97)`, eigene Easing-Kurven, Oberflächen-Animationen unter 300 ms, nur `transform` und `opacity`, nie `ease-in`, nie von `scale(0)`, Hover nur bei feinem Zeiger, Tastatur-Aktionen nicht animieren, Versatz 30 bis 80 ms bei Gruppen | Look-Skill, Abschnitt "Verbund-Durchgang"; `bewegung.md`, `besuchergefuehl.md` |

### Was bewusst nicht übernommen wird
Die Grundregeln des Nutzers gehen immer vor. Darum gilt aus den Skills nur das Prinzip, nicht jede Einzelvorgabe:
- gpt-taste verlangt React, Tailwind, GSAP, Bilder von picsum.photos und zwei Knöpfe im Hero. Das Projekt baut statisches HTML, CSS und
  Vanilla-JS, nur selbst gezeichnete Bilder, genau einen Kaufknopf und keine Bibliotheken. Die Zufallsauswahl per Python-Simulation entfällt, die Wahl
  des Looks trifft der Nutzer oder diese Vergleichstabelle.
- impeccable arbeitet mit Projektdateien (PRODUCT.md, DESIGN.md) und einem Befehlsprogramm. Hier zählen seine Prüffragen und Verbote,
  nicht der Programmablauf. Ausdrückliche Look-Wünsche des Nutzers (zum Beispiel Neon oder Comic) gehen vor seinen Klischee-Warnungen.
- emil-design-eng verlangt kurze Oberflächen-Animationen. Dekorative Hero-Effekte (Partikel, Morphing) sind davon ausgenommen,
  müssen aber pausieren, wenn sie nicht im Bild sind, und bei `prefers-reduced-motion` stillstehen.

## Weitere Skills, die beim HELIA-Shop schon angewendet wurden (aus `ein-produkt-shop`)
Diese Skills wurden beim HELIA-Shop angewendet und stehen als feste Regeln in `ein-produkt-shop/references/`. Sie bleiben gültig
und werden bei Bedarf zusätzlich aufgerufen:

| Skill | Wofür | Wo die Ergebnisse stehen |
| --- | --- | --- |
| gpt-taste | Aufbau (AIDA), breite Überschriften, lückenloses Raster, große Abstände | `gestaltung.md` |
| apple-design | Glas, Federn, Unterbrechbarkeit, Typografie | `gestaltung.md`, `bewegung.md` |
| impeccable | Farbe für Aufmerksamkeit, Hierarchie, Barrierefreiheit | `gestaltung.md` |
| improve-animations | Bewegung prüfen und verbessern | `bewegung.md` |
| find-animation-opportunities | Wo Bewegung fehlt, und wo sie nicht hingehört | `bewegung.md` |
| emil-design-eng | Details, Besuchergefühl, Knopf-Rückmeldung | `besuchergefuehl.md`, `bewegung.md` |
| animate | Bewegung von Grund auf bauen | `bewegung.md` |

Bei Konflikten gehen die Grundregeln des Nutzers vor (zum Beispiel "genau eine Handlungsaufforderung" vor zwei Knöpfen im Kopfbereich).

## So wird ein Layout damit überarbeitet
1. Layout als Bildschirmfoto (PC und Handy) ansehen und den Ist-Zustand in zwei Sätzen beschreiben.
2. Die Skills der Tabelle der Reihe nach anwenden. Jeder Skill liefert eine Liste Vorher/Nachher, danach wird umgesetzt.
3. Nach jedem Skill testen (Seitentest, Bildschirmfotos). Nie mehrere Skills ungeprüft hintereinander.
4. Am Ende `text_check.py` und der CHECK aus `ein-produkt-shop`, danach Vorschau neu bauen.
