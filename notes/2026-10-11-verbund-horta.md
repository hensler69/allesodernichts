# 11.10.2026: Skill-Verbund auf den HORTA-Shop (kleine Form)

## Kurzfassung
Der fertige HORTA-Shop (Look Neo-Brutalism) wurde nacheinander mit gpt-taste, impeccable und emil-design-eng durchgesehen, je Skill höchstens 4 Änderungen, nach jedem Durchgang kurz getestet. Geändert wurden nur das Stylesheet und zwei Zeilen im Seitenkopf (über den Generator). Texte, Preise, Rechtstexte, `send.php`, `script.js`, Warenkorb- und Formularlogik, IDs, Speicher-Schlüssel und der Gutschein sind unberührt. Die Identität des Looks bleibt (Konturen 3 px, harte Schatten, flache Farben, Archivo Black, Archivo, Space Mono).

Ergebnis in Zahlen: Barrierefreiheit in Lighthouse 97 auf 100 (140 Kontrastfehler auf 0), Layoutverschiebung bei spät kommenden Schriften 0,0176 auf 0,0001, Leistung unverändert im Rauschen (96 gegen 95), alle Pflichtprüfungen bestanden.

## Vorab geprüft: die Funde aus den 18 anderen Looks
| Fund | Ergebnis bei HORTA |
| --- | --- |
| Layoutverschiebung durch Schriftwechsel | Lighthouse 0. Mit künstlich um 1,2 s verspäteten Schriften 0,0176 (Handy) und 0,0175 (PC): klein, aber messbar. Behoben (impeccable, Zeile 4). |
| `transition: all` | keine gefunden |
| `ease-in` | keine gefunden |
| Hover ohne Medienabfrage | 2 gefunden (Laufband, Sterne beim Bewerten), behoben (emil, Zeile 2) |
| Fehlendes `:active` | 8 Bedienelemente ohne Druck-Rückmeldung, ergänzt (emil, Zeile 1) |
| Animationen über 300 ms | mehrere Einblend-Effekte und die Ziehharmonika, gekürzt (emil, Zeile 3). Rest steht unter "Vorschläge". |
| Sichtbarer Fokus | 1 Fehler: Der Fokusring am Mengenknopf wurde abgeschnitten, behoben (impeccable, Zeile 2) |
| Kontrast kleiner Space-Mono-Etiketten | in Ordnung (Lighthouse meldet nach der Korrektur der Einblend-Deckkraft 0 Fehler) |
| Touch-Ziele unter 44 px am Handy | 9 Bedienelemente zu klein, behoben (impeccable, Zeile 3). Textlinks im Fließtext und in der Fußzeile bleiben, siehe "Vorschläge". |

## Messwerte vorher und nachher
Startseite, Lighthouse mobil, ein Lauf Original und ein Lauf Nachher direkt nacheinander auf demselben Rechner. Die Leistung schwankt mit der Rechnerlast stark (Original am selben Stand: 76, 90, 90, 95, 96), darum zählt nur der direkte Vergleich.

| Wert | Vorher (Original) | Nachher |
| --- | --- | --- |
| Leistung | 96 | 95 (Zwischenlauf nach Durchgang 2 bei höherer Last: 90) |
| Barrierefreiheit | 97, Audit "Kontrast" mit 140 Knoten durchgefallen | 100, 0 Knoten |
| Technik | 100 | 100 |
| Layoutverschiebung (CLS) | 0 | 0 |
| Größter Inhalt (LCP) | 2551 ms | 2701 ms (Original schwankte zwischen 2551 und 2867 ms) |
| Blockierzeit (TBT) | 38 ms | 44 ms |
| Übertragene Daten | 267 KB | 271 KB (Stylesheet und zwei Vorlade-Zeilen) |

Layoutverschiebung beim Schriftwechsel (Playwright, Schriftdateien 1,2 s verzögert):

| Ansicht | Vorher | Nachher |
| --- | --- | --- |
| Handy, Schriften normal | 0 | 0 |
| Handy, Schriften 1,2 s später | 0,0176 (Hauptbereich um 19 px nach unten) | 0 |
| PC, Schriften normal | 0,0030 | 0,0001 |
| PC, Schriften 1,2 s später | 0,0175 (Überschrift, Menü) | 0,0001 |

Weitere Messungen bei 390, 820 und 1280 px:
- Waagerechter Überlauf: vorher keiner, nachher keiner (alle 10 Seiten, 3 Breiten).
- Überschrift im Kopfbereich: 2 Zeilen am PC, 2 am Tablet, 3 am Handy (unverändert, schon in Ordnung).
- Raster ohne leere Zellen: Kennzahlen, Funktionen, Fakten, Fußzeile bei 3 Breiten (unverändert, schon in Ordnung).
- Abstände zwischen Abschnitten: PC 177 px überall, Handy 110 px überall (vorher vor dem dunklen Abschluss am Handy 177 px).

Bildschirmfotos (Start und Kasse, PC 1280 und Handy 390): Ordner `scratchpad/horta-verbund/vorher/` und `nachher/` (`start-pc.png`, `start-handy.png`, `kasse-pc.png`, `kasse-handy.png`). Der Kopfbereich sieht vorher und nachher gleich aus, die Kasse ist am Handy durch größere Tippflächen etwa 10 px länger.

## Durchgang 1: gpt-taste (Aufbau und Raster)
Datei für alle Zeilen: `shops/horta/assets/style.css` (Kopie in `design-vorlagen/vorlagen/neo-brutalism/shop/style.css`).

| Vorher | Nachher | Warum |
| --- | --- | --- |
| Probierstand (`.probier__innen`, `.probier__text h2`): Spalten 1fr zu 1,18fr, Überschrift bis 2,5rem, am PC 4 Zeilen (2 Zeilen Text und ein Sticker in 2 Zeilen), Textbreite etwa 430 px | Spalten 1,2fr zu 1fr, Überschrift bis 2,4rem: 2 Zeilen bei 1021, 1100, 1280 und 1440 px, Textbreite 531 px, das Gerätebild ist bei 1280 px 517 statt 560 px breit | Überschriften sollen breit laufen und höchstens 2 bis 3 Zeilen haben. Am Handy bleiben es 4 Zeilen, weil der Kasten dort schmal ist. |
| Abschlussblock (`.abschied__schale`): Die Schüssel stand bei Tablet und Handy links unter dem Text, rechts blieb eine leere Hälfte | bis 920 px mittig (Tablet x=220 bei 754 px Breite, Handy x=65 bei 358 px) | Keine Löcher im Raster. Über 920 px bleibt alles wie vorher (Schüssel rechts neben dem Text). |
| Abstand vor dem dunklen Abschluss am Handy (`.abschied`): 177 px, alle anderen Abschnitte 110 px | 110 px (gemessen) | Große, gleichmäßige Abstände |
| Warenkorb-Karte am Handy (`.posten`): Karte 309 px breit bei nur 297 px Platz (Handy 390 px; bei 360 px nur 267 px, bei 320 px nur 227 px Platz), rechter Rand und Schatten abgeschnitten | bis 430 px ohne das kleine Vorschaubild (Name, Menge, Preis bleiben): Karte 291, 261 und 221 px, kein Überstand mehr bei 390, 360 und 320 px | Raster ohne Überstand im Kaufweg. Der Fehler war schon im Original da, entdeckt beim Test von Durchgang 2, deshalb hier gezählt. |

Schon erfüllt, je ein Satz:
- Aufbau Aufmerksamkeit, Interesse, Verlangen, Handlung stimmt: Kopfbereich mit Gerät, Auf einen Blick, Probierstand mit Funktionen und Technik, dann das Angebot.
- Überschrift im Kopfbereich breit und in 2 bis 3 Zeilen (gemessen 2, 2, 3).
- Raster lückenlos (gemessen: 0 leere Zellen bei 390, 820 und 1280 px).
- Große Abstände, keine Meta-Beschriftungen wie "ABSCHNITT 01", Knopftexte gut lesbar (Tinte auf Tomate 5,8 zu 1).
- Nicht übernommen wegen der Projektregeln: React, Tailwind, GSAP, Fremdbilder, zwei Knöpfe im Kopfbereich.

## Durchgang 2: impeccable (Farbe, Hierarchie, Kontrast, Fokus, Bedienbarkeit)
| Vorher | Nachher | Warum |
| --- | --- | --- |
| Einblend-Effekte (`.zeigen`, `.wachsen`, `.wortweise .w` in `style.css`): Text lag im Ruhezustand bei 35 %, 60 % und 20 % Deckkraft, Kontrast 1,5 bis 2,4 zu 1, Lighthouse: 140 Knoten durchgefallen, Barrierefreiheit 97 | Startwerte 0,9, 0,9 und 0,5, Schrift der Geschichte mindestens 1,5rem (24 px, gilt als großer Text, braucht 3 zu 1, gemessen 3,4 zu 1): 0 Knoten, Barrierefreiheit 100 | Lesbarkeit hat Vorrang vor dem Effekt. Wer scrollt, sieht immer noch Versatz und Aufhellen, nur nie halb unsichtbaren Text. |
| Mengenknopf (`.stepper button`): Der Fokusring wurde vom Rahmen (`overflow: hidden`) abgeschnitten, sichtbar war nur ein schmaler blauer Streifen (Bildschirmfoto `vorher/fokus-mengenknopf.png`) | Ring innen (`outline-offset: -4px`), ganz sichtbar, gilt auch im Warenkorb | Tastaturbedienung braucht einen sichtbaren Fokus |
| Tippflächen bei Touch (neu: Block `@media (pointer: coarse)` am Dateiende): Sternefilter 36 px, "Hilfreich" 40, "So prüfen wir Bewertungen" 21, Logo 36, Mengenknöpfe im Warenkorb 36 hoch, "Entfernen" etwa 22, Sterne beim Bewerten 36, "Zurück zum Shop" 43, Häkchenzeile 32 | mindestens 44 px (gemessen: diese Einträge fehlen in der Liste der zu kleinen Ziele) | Daumen treffen sicherer. Nur Bedienelemente, keine Textlinks. |
| Schriftwechsel (`style.css` oben, `generatoren/horta/bausteine.py` Funktion `head()`): nur Archivo Black vorgeladen, Ersatzschrift `system-ui`, 0,0176 Verschiebung bei spät kommenden Schriften | Vorladen von Archivo Medium und Space Mono Regular, Ersatzschnitte mit gemessenen Maßen hinter jeder Webschrift (Breite 111,9 %, 100,2 %, 98,8 % und 102 %, Auf- und Unterlänge passend, per fontTools aus den Schriftdateien und dem Seitentext berechnet): 0 bis 0,0001 | Kein Springen beim Schriftwechsel |

Schon erfüllt, je ein Satz:
- Jede Farbe hat eine feste Rolle (sieben Farben), die rote Signalfarbe steht auf dem Kaufknopf mit gut lesbarem Text darauf.
- Ein Fokusring (4 px, Blau) auf allen anderen Bedienelementen, Felder zeigen den Fokus mit Gelb und hartem Schatten.
- Kontrast kleiner Etiketten in Space Mono: bestanden (0 Funde in Lighthouse).
- `prefers-contrast: more` ist schon eingebaut.

## Durchgang 3: emil-design-eng (Details und Bewegung)
| Vorher | Nachher | Warum |
| --- | --- | --- |
| Kein `:active` bei Logo, Menüpunkten, Menüknopf am Handy, Textknöpfen, "Entfernen", Sternefiltern, Frage-Köpfen und der Ziehharmonika | Logo, Menüpunkte, Textknöpfe, "Entfernen", Sternefilter schrumpfen auf 0,97, Frage-Köpfe und Ziehharmonika (große Flächen) auf 0,985, der Menüknopf drückt sich wie alle anderen Knöpfe in den Schatten. Alles gemessen, 120 ms mit der Kurve `cubic-bezier(0.23, 1, 0.32, 1)`. | Jedes Drückbare zeigt sofort, dass es gehört wurde. Die Knöpfe mit Schatten hatten das schon. |
| Hover ohne Medienabfrage: Das Laufband blieb nach dem Antippen am Handy hängend angehalten, die Sterne beim Bewerten färbten sich beim Antippen | Beides nur noch bei `@media (hover: hover) and (pointer: fine)` (gemessen: PC pausiert, Handy läuft weiter) | Hover gibt es bei Touch nicht |
| Zeiten: Einblenden 0,8 s, Bild-Einblenden 1,1 s, Eintritt im Kopfbereich 0,9 s mit 90 ms Versatz, Zahl am Warenkorb 0,4 s, Ziehharmonika 0,7 s (Handy 0,5 s), Text darin 0,4 und 0,5 s | Einblenden 0,5 s, Bild-Einblenden 0,6 s, Eintritt 0,6 s mit 70 ms Versatz, Zahl 0,3 s, Ziehharmonika 0,45 s (Handy 0,35 s), Text darin 0,3 und 0,4 s | Oberflächen-Bewegung soll kurz sein, Versatz in Gruppen 30 bis 80 ms |
| Bewegung reduziert: `.zeigen` und `.wachsen` behielten Versatz und Verkleinerung (sie nutzen `translate` und `scale`, die Regel setzte nur `transform` zurück), Pop an der Warenkorbzahl, Wechsel mit 6 px Versatz, Kaufleiste glitt ein | kein Versatz, kein Pop, Wechsel nur mit Deckkraft (neue Animation `wechsel-ruhig`), Kaufleiste ohne Gleiten. Geprüft mit `reducedMotion: reduce`. | Weniger und sanftere Bewegung, nicht null: Deckkraft bleibt |

Schon erfüllt, je ein Satz:
- Kein `transition: all`, kein `ease-in`, eigene Kurven schon vorhanden (`--ease-out`, `--ease-in-out`, `--ease-drawer`).
- Warenkorb 350 ms und Kaufleiste 350 ms liegen im Rahmen für Schubladen (200 bis 500 ms).
- Alle anderen Hover-Regeln sind schon hinter der Medienabfrage, das Kippen der Karten und das Mitwandern der Kärtchen laufen nur bei feinem Zeiger.
- Die kurzen Bewegungen im Skript (Warenkorb-Einträge, Summen, Meldungen, Zitate) nutzen schon die Kurve `cubic-bezier(0.23, 1, 0.32, 1)`.

## Tests (alle am Ende, Stand nach Durchgang 3)
- `seiten_test.js`: 10 Seiten bei PC, Handy und Tablet, alle Status 200, kein waagerechter Überlauf, genau eine h1, keine Konsolenfehler. "Alles in Ordnung."
- `kaufweg_test.js`: Angebot, Warenkorb (44,90 Euro, Set 75,90 Euro, 2 Stück 89,80 Euro), Kasse mit 8 Fehlermeldungen, falscher und richtiger Gutschein (45,31 Euro), Bestellung, Danke-Seite, Warenkorb danach leer, Widerruf, Newsletter. Keine Konsolenfehler.
- `sicherheit_test.sh`: 9 bestanden, 0 Fehler.
- `text_check.py`: "Keine Funde" (Hinweis wie immer: GEHEIMNIS in `send.php` vor dem Start ersetzen).
- Generator zweimal hintereinander gelaufen: HTML beim zweiten Lauf unverändert. Beim ersten Lauf ohne meine Änderung war `git status` sauber.
- Stylesheet-Kopie: `cmp` ohne Unterschied.
- Kurztests nach Durchgang 1 (Seitentest) und Durchgang 2 und 3 (Messskript, Fokus-Bildschirmfoto, Lighthouse-Zwischenlauf, gedrückte Zustände, Hover, reduzierte Bewegung).

## Geänderte Dateien
- `shops/horta/assets/style.css` (alle Änderungen der drei Durchgänge)
- `.claude/skills/design-vorlagen/vorlagen/neo-brutalism/shop/style.css` (byte-gleiche Kopie)
- `generatoren/horta/bausteine.py` (zwei Vorlade-Zeilen in `head()`)
- `shops/horta/*.html`, 10 Seiten (nur diese zwei Zeilen, vom Generator erzeugt)
- Nicht angefasst: `script.js`, `send.php`, Schriften, Texte, Preise, `CLAUDE.md`

## Vorschläge, die ich nicht umgesetzt habe (und warum)
1. **Umgesetzt am 12.10.2026 (Manuel: "so wie du es machen würdest", siehe `notes/2026-10-12.md`).** **Rote Signalfarbe nur für Kaufen.** Die Beschreibung des Looks sagt: Tomate nur für Kaufknopf, Warenkorb-Zeile und geöffnete Fragen. Im Shop sind aber auch die 4. Kachel bei "Auf einen Blick" (27 cm), die 5. Kachel bei "Funktionen" und die Punkte im Laufband tomatenrot. Am Handy steht die rote Kachel nah am Kaufknopf und nimmt ihm den Blickfang. Vorschlag: Papier oder Limette für die Kacheln, Grün für die Punkte. Das ändert das freigegebene Aussehen, darum soll Manuel entscheiden.
2. **Kein Kaufknopf im Abschlussblock.** Der dunkle Block "Der Tisch ist gedeckt" endet ohne "In den Warenkorb" (gpt-taste: Handlung zum Schluss). Am Handy deckt die Kaufleiste das ab, am PC gibt es dort nur den Warenkorb in der Kopfzeile. Ein Knopf wäre neuer Text im Generator, darum nicht umgesetzt.
3. **Konflikt zwischen gpt-taste und impeccable.** gpt-taste verlangt, dass die Wörter im Geschichtsabsatz bei 10 % Deckkraft starten. Das fällt beim Kontrast durch (1,5 zu 1). Ich habe 50 % gewählt (3,4 zu 1). Wer den stärkeren Effekt will, verliert Lesbarkeit.
4. **Probierstand und Danke-Seite.** Die Füllung der Schüssel dauert 1,9 s und startet bei `scaleY(0)` (Skript), die Schichten auf der Danke-Seite fallen 0,7 s mit 260 ms Versatz und starten ebenfalls bei `scaleY(0)`. Das sind bewusste Erlebnis-Animationen, ich habe sie nur gemeldet. Emil: nie von Null skalieren, Vorschlag `scaleY(0.2)`.
5. **Ziehharmonika "Vom Markt bis auf den Teller".** Sie öffnet beim Tab-Fokus mit Animation (Emil: Tastatur-Aktionen nicht animieren) und animiert `flex-grow` und `min-height`, also Layout statt `transform`. Das müsste umgebaut werden und berührt das Skript.
6. **Schatten-Eindruck der Knöpfe** animiert `box-shadow` statt nur `transform`. Das ist der Kern des Looks und nur 80 ms lang, darum belassen.
7. **Schwebende Kärtchen im Kopfbereich am PC** ("5 Einsätze", "Edelstahl", "Ohne Brett"). gpt-taste verbietet schwebende Stempel im Kopfbereich. Sie gehören zur Stickersprache und sind für Vorlese-Programme versteckt. Wegnehmen wäre eine Zeile (`display: none`), die Entscheidung ist ein Geschmacksthema.
8. **Warenkorb am Handy.** Die Schublade ist durch die Browser-Vorgabe 352 px breit statt der im Stylesheet verlangten vollen Breite (links bleiben 41 px Seite sichtbar). Mit `max-width: 100%` würde sie voll breit. Bei zwei Posten ist die Liste klein und scrollt innen, weil die Summe viel Platz braucht. Beides ist ein Gestaltungsthema.
9. **Weitere kleine Tippflächen.** Textlinks in der Fußzeile (15 px hoch), der Link zu den Bewertungen im Kopfbereich (30 px), der Link zu Versand (35 px) und die Häkchenfelder selbst (22 px, die Beschriftung daneben ist groß genug) bleiben. Größere Fußzeilen-Links machen die Seite am Handy über 200 px länger.
10. **Ladezeit.** Die Blockierzeit schwankt je nach Rechner (38 bis 780 ms). Grund ist viel Layout-Arbeit (1302 Elemente, das 3D-Gerät aus CSS-Flächen). `content-visibility: auto` auf den Abschnitten könnte helfen, birgt aber Risiko bei Sprungmarken und beim Kaufleisten-Skript, das das Angebot misst. Nicht angefasst.
11. **Handy-Überschrift im Probierstand** hat im schmalen Kasten 4 Zeilen. Für 3 Zeilen müsste die Schrift unter 1,4rem fallen, das wäre zu klein.

## Offene Punkte
- `design-vorlagen/references/look-neo-brutalism.md` nannte in den Stolperfallen noch `.zeigen` mit Start bei 0,35. Inzwischen angepasst (0,9, und 0,5 für ungelesene Wörter).
- Die Vorschau https://claude.ai/artifact/Jq3Aq2eh9gxzBJHUqqVW7D (Version 3) wurde nach diesem Durchgang aktualisiert. Die Änderung vom 12.10.2026 (Tomatenrot nur für Kaufen) ist dort noch nicht drin.
- Stand 12.10.2026: alles committet und gepusht (Commit e27067c), die Testserver sind beendet.
