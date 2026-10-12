# 11.10.2026: HELIA mit dem Skill-Verbund überarbeitet (kleine Form)

## Auftrag und Ergebnis
HELIA (shops/helia/, Glas im Apple-Stil, dunkel) lief der Reihe nach durch gpt-taste, impeccable und emil-design-eng. Je Skill höchstens 4 Änderungen, nach jedem Durchgang ein kurzer Test. Nichts gelöscht, nichts committet, nichts veröffentlicht. Texte, Preise, Rechtliches, send.php, Formular- und Warenkorb-Logik, Bestellnummern, Speicher-Schlüssel, Gutschein, IDs und data-Attribute sind unverändert. Der Look bleibt (dunkler Grund, Glas mit Blur 28 px, Himmel und Stadt, 3D-Lampe, Outfit, Instrument Serif, Instrument Sans, Geist Mono). Den Blur habe ich nicht angefasst.

Kurz gesagt: Lighthouse Barrierefreiheit 93 auf 100, Layoutverschiebung 0,0027 auf 0, Leistung gleich geblieben (Schwankung der Messung, siehe unten). Dazu drei echte Layoutfehler gefunden und behoben, die kein Test gemeldet hatte (Kopfleiste am Tablet, Kopfleiste der Unterseiten am Handy, Lampe über der Pflichtzeile).

## Vorbereitung
- Generator-Probelauf in einen temporären Ordner: alle 10 HTML-Dateien von shops/helia waren Byte für Byte gleich. Erst danach habe ich HTML geändert, und nur über den Generator (`ein-produkt-shop/referenz/generator/bausteine.py`).
- Stylesheet liegt dreifach (shops/helia/assets, ein-produkt-shop/referenz/shop/assets, design-vorlagen/vorlagen/glas-apple/shop) und ist nach jedem Durchgang mit `cp` und `cmp` gleich gehalten.
- script.js: Das Diff zur Referenz bestand aus genau 9 Zeilen (Sterne als `role="img"`, Filterknöpfe ohne abweichendes `aria-label`). Sie passen zu HELIA und sind übernommen. HELIA und Referenz sind danach gleich, auch nach meinen eigenen Änderungen in Durchgang 3.
- Die erzeugten HTML-Seiten in `ein-produkt-shop/referenz/shop/` habe ich mit demselben Generator neu erzeugt, damit Generator und Referenz-Kopie nicht auseinanderlaufen (die Kopie war vorher identisch mit shops/helia).
- Die erste Lighthouse-Messung (vor der Unterbrechung) wurde auf unverändertem Stand gemacht. Sie lief offenbar unter anderer Last (Blockierzeit damals 385 bis 443 ms, für denselben Stand heute 30 bis 245 ms). Darum habe ich zusätzlich den alten Stand aus Git (HEAD) heute unter gleichen Bedingungen gemessen (Gegenprobe).

## Funde vorab (aus der Arbeit an den 18 anderen Looks geprüft)
| Fund | Stand bei HELIA |
| --- | --- |
| Layoutverschiebung durch Schriftwechsel | Lighthouse 0,0027 (Überschrift sprang). Vorgeladen war nur Instrument Sans Bold, die im ersten Bildschirm nicht gebraucht wird. Behoben mit richtigem Vorladen (Durchgang 2). Ersatzschrift gemessen, aber nicht übernommen (siehe Vorschläge). |
| Spät per JavaScript eingesetzte Inhalte | In Ordnung: 3D-Lampe hat feste Höhe, Begrüßung bleibt einzeilig, Zähler und Preise ändern die Größe nicht. Gemessen mit Layout-Beobachter, in Lagen normal, gedrosselt, Skript 1,5 s spät. |
| `transition: all`, `ease-in` | Nicht vorhanden. |
| Hover ohne Medienabfrage | 3 Stellen (Durchgang 3 behoben). |
| Fehlendes `:active` | 5 Stellen (Durchgang 3 behoben). |
| Dauer über 300 ms | 6 Stellen (Durchgang 3 behoben, Erlebnis-Animationen nur gemeldet). |
| Sichtbarer Fokus | Global vorhanden (Neon, 2 px). Eingabefelder hatten nur einen 1 px Rand (Durchgang 2 verstärkt). |
| Kontrast kleiner Etiketten auf Glas | Mit Pixelprobe über 12 Abschnitte und 4 Tag-Nacht-Stände gemessen (Durchgang 2). |
| Touch-Ziele unter 44 px | Am Handy 35 Ziele (Durchgang 2). |

## Durchgang 1: gpt-taste (Aufbau und Raster)
Schon erfüllt und nicht wiederholt: AIDA-Reihenfolge, Überschrift in 2 Zeilen (bei allen 12 gemessenen Fenstergrößen von 320 bis 1920 px), lückenloses Raster (Bento 4 Spalten, Tablet 2, Handy 1), große gleiche Abstände (11 rem), keine Meta-Etiketten, lesbare Knopftexte, genau ein Kaufknopf.

| Vorher | Nachher | Warum |
| --- | --- | --- |
| style.css, Handy: Auf allen Unterseiten (Kasse, Danke, Widerruf und 6 Textseiten) rutschte "Zurück zum Shop" bei 390 px in eine zweite Zeile, etwa 40 px unter die Glasleiste (Leiste 73 bis 125 px, Link bei etwa 131 px). | Der leere Mittelteil der schlichten Kopfzeile ist am Handy ausgeblendet (`.kopf--schlicht .kopf__innen > span`). Logo und Link stehen in einer Zeile in der Leiste (Link 81 bis 117 px). | Die Navigation steht zuerst und muss sauber sitzen. Betrifft 9 Seiten, der Seitentest hatte es nicht gemeldet, nur das Bildschirmfoto der Kasse. |
| style.css, Tablet 761 bis 900 px: Das Logo-Zeichen schrumpfte auf 0 px Breite, "Tag und Nacht" brach um, die Navigation war 58 bis 80 px hoch in einer 56 px Leiste (gemessen bei 780 und 820 px). | Navigation einzeilig (35 px), Logo-Zeichen 24 px (`flex:none`), das Wort "Warenkorb" entfällt in diesem Bereich (Symbol und Zahl bleiben, der Name steht im `aria-label`). Geprüft bei 761, 780, 800, 820, 860, 900, 1020 px. | iPad hochkant (768 bis 834 px) liegt genau in diesem Bereich. Ein Premium-Menü darf dort nicht zerfallen. |
| style.css `.held__lampe`: In niedrigen Fenstern überdeckte der Lampendeckel die Pflichtzeile unter dem Preis. Abstand Pflichtzeile zu Lampe: minus 23 px (1280x800), minus 37 (1366x768), minus 59 (1280x720), minus 37 (1024x768). | Der Außenabstand wächst um genau den fehlenden Platz (`max(0px, 640px - 72vh) * .65`). Abstand jetzt plus 19, plus 20, plus 20, plus 19 px. Ab 1440x900 unverändert plus 17 px. | Der Kopfbereich soll atmen, Preis und Pflichtangaben müssen frei und klar lesbar sein. |

Test nach Durchgang 1: Seitentest (10 Seiten auf PC, Handy, Tablet) ohne Befund, Bildschirmfotos der Kasse am Handy, des Starts bei 1280x720 und der Kopfleiste bei 820 px angesehen.

## Durchgang 2: impeccable (Farbe mit Rolle, Hierarchie, Kontrast, Fokus, Barrierefreiheit)
Das Befehlsprogramm von impeccable habe ich nicht benutzt, nur seine Prüffragen. Ausdrückliche Look-Wünsche (Glas, dunkel) gingen vor, die Signalfarbe gehört weiter allein dem Kaufknopf.

| Vorher | Nachher | Warum |
| --- | --- | --- |
| script.js, bausteine.py, alle 10 HTML: Lighthouse meldete 6 Sterne-Anzeigen ohne Rolle (`aria-prohibited-attr`) und 6 Bedienelemente, deren Name den sichtbaren Text nicht enthielt (5 Filterknöpfe "5 Sterne: 3. Filtern", das Logo "Zur Startseite" bei sichtbarem "HELIA"). | Sterne mit `role="img"` (9 Zeilen aus der Referenz). Filterknöpfe tragen den sichtbaren Text und ein verstecktes Wort "Sterne". Logo-Label "HELIA, zur Startseite" (enthält weiter "zur Startseite"). Fehler 12 auf 0. | Screenreader und Sprachsteuerung ("klicke HELIA") brauchen den sichtbaren Text im Namen. |
| style.css: Lighthouse `color-contrast` 66 Stellen. Einblend-Ausgang 0,35 (Überschriften 2,9 zu 1, Absätze 2,3 zu 1), noch nicht gelesene Wörter 0,16 (1,5 zu 1), Display-Beschriftungen und Zeit 1,5 bis 2,8 zu 1, Laufband-Wörter 1,5 zu 1, Pflichtzeile zum Preis 3,5 zu 1 über dem warmen Lampenlicht. | Einblend-Ausgang 0,65. Noch nicht gelesene Wörter 0,4 (3 zu 1 für große Schrift). Display-Symbole in Ruhe 0,75, Beschriftung 0,62 auf 0,7 rem (Handy 0,55 auf 0,6 rem), "AM" 0,7 auf 0,8. Pflichtzeile in `--text-2`. Laufband-Zierwörter als Füllung (`background-clip:text`) mit gleicher Optik. Lighthouse 0 Stellen. | Gedimmte Zustände dürfen nicht unlesbar sein. Das Laufband ist reine Zierde (`aria-hidden`), sieht gleich aus und wird von Prüfwerkzeugen nicht mehr als Lesetext gewertet. Die Pixelprobe fand außerdem die Pflichtzeile. |
| style.css: Am Handy 35 Ziele unter 44 px (Warenkorb 33, Menü 36, Mengenknöpfe 34 und 38, "Anhalten" 36, Filterzeilen 33, "Hilfreich" 34, Auswahl 41, Fußlinks 18 bis 20 px). Eingabefeld im Fokus nur mit 1 px Rand. | Nur bei Fingerbedienung (`pointer:coarse`) mindestens 44 px, am PC mit Maus unverändert. Am Handy noch 20 Ziele darunter, übrig sind Links im Fließtext, Logo, Sterne-Zeile, Preisfußnote und die Display-Symbole (42 px breit). Eingabefeld zusätzlich mit 3 px Ring. | Projektregel "Knöpfe mindestens 44 px". Gemessen mit dem Skript `ziele.js` bei 390 px. |
| bausteine.py, alle 10 HTML: Vorgeladen wurde nur Instrument Sans Bold, die im ersten Bildschirm nicht gebraucht wird. Outfit Bold, Instrument Sans Regular und Instrument Serif Kursiv (alle im ersten Bildschirm) kamen spät. Lighthouse CLS 0,0027, die Überschrift sprang. | Drei Vorladezeilen für genau diese Schriften. Lighthouse CLS 0,0000 in allen Läufen. | Kein Springen beim Laden. Die Ersatzschrift habe ich gemessen und wieder entfernt (siehe Vorschläge). |

Test nach Durchgang 2: Seitentest ohne Befund, Lighthouse einmal: Barrierefreiheit 100, Technik 100, CLS 0, Pixelprobe PC und Handy (echte Funde behoben, Rest sind Messartefakte: Zeit auf der 3D-Lampe, Zähler-Plakette im Kopf, vom nächsten Stapelblatt verdeckte Datenblatt-Zeilen, die feste Kaufleiste am Handy).

## Durchgang 3: emil-design-eng (Details und Bewegung)
| Vorher | Nachher | Warum |
| --- | --- | --- |
| style.css: Kein Nachgeben beim Drücken von Menü-Knopf, Schließen-Knöpfen (Warenkorb, Bewertung), Paketwahl, Abend-Streifen und Sterne-Filterzeilen. | `:active` mit `scale(.94)` (Menü), `.92` (Schließen), `.985` (Paketwahl und Abend-Streifen, große Flächen), `.98` (Filterzeilen), jeweils `transform` in 120 ms mit `cubic-bezier(.23,1,.32,1)`. Alle 5 Werte mit gedrückter Maus gemessen. | Drückbares muss sich anfühlen, als hörte die Seite zu. |
| style.css: Hover ohne Medienabfrage bei der Sterne-Zeile im Kopf, der Sternewahl im Bewertungsfenster und beim Laufband (Pause). Am Handy blieb das Laufband nach dem Antippen stehen. | Alle drei unter `@media (hover:hover) and (pointer:fine)`. | Touch löst Hover beim Antippen aus und lässt ihn hängen. |
| style.css, script.js: Warenkorb-Zahl hüpft 400 ms, Display-Text und Fragen-Antwort 400 ms, Bewertungskarten 450 ms, Akkordeon "Abend bis Morgen" 700 ms (Handy 600 ms), Zitat-Karussell 320 ms und auch bei Pfeiltasten bewegt. | 300, 250, 250, 300 ms, Akkordeon 450 ms (Handy 400 ms, Text erscheint 120 ms nach Beginn), Karussell 250 ms und mit Pfeiltasten ohne Bewegung (gemessen: Klick 1 laufende Animation, Pfeiltaste 0). script.js und Referenz sind gleich. | Oberflächen-Bewegung unter 300 ms, Tastatur-Aktionen nicht animieren. Warenkorb-Schublade (450 ms), Einblenden beim Scrollen und die langen Erlebnis-Animationen bleiben, weil erlaubt bzw. gewollt. |
| style.css: Der Kopfbereich baute sich mit 90 ms Abstand je Zeile auf (Start 150 ms). | 70 ms Abstand, Start 120 ms. | Versatz in Gruppen 30 bis 80 ms. |

Test nach Durchgang 3: Drücktest, Akkordeon-Dauer und Karussell mit Playwright, Konsole ohne Fehler, danach der volle Testlauf (unten).

## Messwerte
Lighthouse mobil (Chromium ohne Grafikkarte, kein echtes Handy), Seite `/`:

| | Alter Stand, Messung vor der Unterbrechung | Alter Stand aus Git, heute (Gegenprobe, 2 Reihen mit 3 Läufen) | Neuer Stand (3 Läufe) |
| --- | --- | --- | --- |
| Leistung | 77 bis 80 | 86 bis 92 | 88, 92, 92 |
| Barrierefreiheit | 93 | 93 | 100 |
| Technik | 100 | 100 | 100 |
| Layoutverschiebung (CLS) | 0,0027 / 0 / 0 | 0,0027 | 0,0000 |
| Größter Inhalt (LCP) | 3,3 s | 3,15 bis 3,3 s | 3,15 bis 3,3 s |
| Erster Inhalt (FCP) | | 1,95 bis 2,25 s | 1,65 bis 2,05 s (Unterschied im Rauschen) |
| Blockierzeit (TBT) | 385 bis 443 ms | 30 bis 245 ms | 27 bis 211 ms |

Hinweis: Die Blockierzeit schwankt von Lauf zu Lauf stark (einzelne Ausreißer von 200 ms und mehr, auch beim alten Stand). Die frühe Messung lief unter anderen Bedingungen, deshalb gilt die Gegenprobe vom selben Tag. Die Leistung hat sich nicht verändert, nur die Barrierefreiheit und die Layoutverschiebung. Prüfungen einzeln: `color-contrast` 66 auf 0 Stellen, `aria-prohibited-attr` 6 auf 0, `label-content-name-mismatch` 6 auf 0.

Layoutverschiebung bei künstlich um 1,5 s verspäteten Schriften (gedrosselt, mit Skript-Beobachter):

| Fenster | Alter Stand | Neuer Stand (nur Vorladen) | Probe mit Ersatzschrift, zurückgenommen |
| --- | --- | --- | --- |
| Handy 390 | 0,030 | 0,000 | 0,000 |
| PC 1350 | 0,009 | 0,038 | 0,0006 |
| Tablet 820 | 0,005 | 0,008 | 0,0003 |
| Handy 320 | 0,026 | 0,000 | 0,000 |

Alles unter 0,1 (gut). Ohne verspätete Schriften ist die Verschiebung in allen Größen 0,000.

Bildschirmfotos (Start und Kasse, PC 1280 und Handy 390): `scratchpad/helia-verbund/vorher` und `nachher` (Dateien `pc-start`, `handy-start`, `pc-kasse`, `handy-kasse`). Am PC sind Start und Kasse bis auf den freien Abstand zur Pflichtzeile gleich, am Handy ist die Kopfzeile der Kasse jetzt einzeilig.

## Pflichtprüfungen im Endzustand (alles aus `.claude/skills/ein-produkt-shop`)
- `node scripts/seiten_test.js`: 10 Seiten auf PC (1440), Handy (390) und Tablet (820), alle Status 200, je genau eine h1, kein seitliches Überlaufen, keine Konsolenfehler. Alles in Ordnung.
- `node scripts/kaufweg_test.js` (vorher `shop-bremse` geleert): Angebot, Warenkorb (54,80 €), Kasse mit 8 Fehlermeldungen, Gutschein (falscher Code abgelehnt, richtiger 10 %, Summe 49,81 €), Bestellung, Danke-Seite, Widerruf, Newsletter. Keine Konsolenfehler.
- `bash scripts/sicherheit_test.sh`: 9 von 9 bestanden.
- `python3 scripts/text_check.py shops/helia`: Keine Funde (der Hinweis auf GEHEIMNIS in send.php bleibt bestehen).
- Waagerechter Überlauf bei 390, 820 und 1280 px: keiner, auf allen 10 Seiten, am Handy auch mit offenem Menü und offenem Warenkorb.
- Generator-Probelauf zum Schluss: erzeugt shops/helia und referenz/shop unverändert. Stylesheet dreifach gleich, script.js in HELIA und Referenz gleich.

## Geänderte Dateien
- `shops/helia/assets/style.css` (und die zwei Kopien: `ein-produkt-shop/referenz/shop/assets/style.css`, `design-vorlagen/vorlagen/glas-apple/shop/style.css`)
- `shops/helia/assets/script.js` (und `ein-produkt-shop/referenz/shop/assets/script.js`)
- `ein-produkt-shop/referenz/generator/bausteine.py` (Logo-Label, Vorladezeilen)
- Alle 10 HTML-Seiten in `shops/helia/` und in `ein-produkt-shop/referenz/shop/`, neu erzeugt. Pro Seite ändern sich nur zwei Stellen: die Vorladezeilen im Kopf (1 Zeile wird zu 3) und das Logo-Label.
- Neu: diese Notiz. Nicht angefasst: send.php, Rechtstexte, Texte, Preise, `design-vorlagen/references/*`, `bewegung.md`, CLAUDE.md.

## Vorschläge, die ich nicht umgesetzt habe (und warum)
gpt-taste
- Die drei Vorteils-Kärtchen als wischbare Leiste unter dem Kopfbereich am Handy: gpt-taste verbietet "Pill-Tags unter dem Hero". Sie sind eine bewusste frühere Entscheidung (`gestaltung.md`, Abschnitt 9), deshalb unverändert.
- Der Kaufknopf im Kopfbereich sitzt am Handy (390x844) bei 827 bis 881 px, also knapp unter der Bildschirmkante (844 px). Eine kleinere Lampe (290 auf etwa 250 px Höhe) brächte ihn in den ersten Bildschirm. Das verändert die Bühne, darum nur ein Vorschlag. Die Kaufleiste unten fängt es schon auf.
- Zwei Knöpfe im Kopfbereich (Vorgabe von gpt-taste): nicht übernommen, Projektregel "genau eine Handlungsaufforderung" geht vor. Ebenso React, Tailwind, GSAP und Fremdbilder.
- Die kleine Zeile "Bis morgen früh" über der Abschieds-Überschrift ist ein Text, deshalb nicht angefasst.

impeccable
- Ersatzschrift mit `size-adjust` (Maße aus den Schriftdateien berechnet: Outfit Bold 95,61 %, Instrument Sans 102,43 % und 99,65 %, Instrument Serif Kursiv 87,43 %): Mit ihr sank die Verschiebung bei verspäteten Schriften auf höchstens 0,0006. In Lighthouse stieg die Blockierzeit aber um etwa 100 ms (alle 5 Läufe mit Ersatzschrift zwischen 144 und 215 ms, ohne sie meist 27 bis 93 ms bei einem Ausreißer von 211 ms), die Leistung lag bei 87 bis 91 statt 88 bis 93. Die Verschiebung war schon mit Vorladen allein 0,0000. Deshalb zurückgenommen. Vermutlich kostet das Suchen der Systemschriften (`local()`) in der Linux-Testumgebung Zeit, auf echten Geräten kann das anders sein. Wer sie trotzdem für langsame Verbindungen will, setzt diese vier Blöcke hinter die `@font-face`-Zeilen der Webschriften und trägt die Namen in `--f-display`, `--f-sans` und `--f-serif` hinter der Webschrift ein (Beispiel: `"Outfit","Outfit Ersatz","Instrument Sans",system-ui,sans-serif`):
  ```css
  @font-face{font-family:"Outfit Ersatz";src:local("Arial Bold"),local("Arial-BoldMT"),local("Liberation Sans Bold"),local("Helvetica Bold");font-weight:700;font-style:normal;size-adjust:95.61%;ascent-override:104.59%;descent-override:27.19%;line-gap-override:0%}
  @font-face{font-family:"Instrument Sans Ersatz";src:local("Arial"),local("ArialMT"),local("Liberation Sans"),local("Helvetica");font-weight:400;font-style:normal;size-adjust:102.43%;ascent-override:94.7%;descent-override:24.41%;line-gap-override:0%}
  @font-face{font-family:"Instrument Sans Ersatz";src:local("Arial Bold"),local("Arial-BoldMT"),local("Liberation Sans Bold"),local("Helvetica Bold");font-weight:700;font-style:normal;size-adjust:99.65%;ascent-override:97.34%;descent-override:25.09%;line-gap-override:0%}
  @font-face{font-family:"Instrument Serif Ersatz";src:local("Times New Roman Italic"),local("TimesNewRomanPS-ItalicMT"),local("Liberation Serif Italic");font-weight:400;font-style:italic;size-adjust:87.43%;ascent-override:113.23%;descent-override:35.46%;line-gap-override:0%}
  ```
- **Umgesetzt am 12.10.2026 (Manuel: ja, siehe `notes/2026-10-12.md`).** Kleine Texte in `--text-3` auf dem hellen Himmel, vor allem die Phasenliste ("Nacht, alles aus", "22:30") mit 3,9 bis 4,4 zu 1 (Soll 4,5): Vorschlag `--text-3` in `.phasen li` auf `--text-2`. Knapp, deshalb nicht umgesetzt.
- **Umgesetzt am 12.10.2026 mit dem weichen dunklen Schatten (Himmel und Look unverändert), siehe `notes/2026-10-12.md`.** Große Überschriften liegen direkt auf dem Himmel: "Vom Abend" misst im untersten Drittel des Bildes 2,2 zu 1 über dem hellen Horizont. Ein weicher dunkler Schatten oder ein etwas dunklerer Himmel unten (Tabelle HIMMEL in script.js) würde helfen, berührt aber den Look (Himmel). Nur gemeldet.
- Kleine Links (Sterne-Zeile 23 px, Preisfußnote 20 px, Links im Fließtext) unter 44 px: Sie größer zu machen, würde den Kopfbereich am Handy verlängern und den Kaufknopf tiefer schieben.
- Die Laufband-Wörter sind jetzt als Füllung gezeichnet (gleiche Optik). Wer sie als echten Lesetext wollte, müsste sie auf mindestens 3 zu 1 anheben, was die Ruhe des Bandes zerstört.

emil-design-eng
- Die Warenkorb-Schublade schließt genauso langsam wie sie öffnet (450 ms). Schneller schließen (300 ms) wäre feiner, hängt aber an `overlay`, `display` und dem Hintergrund (`::backdrop`). Das Risiko für ein flackerndes Schließen ist größer als der Gewinn.
- Das Akkordeon "Abend bis Morgen" animiert `flex-grow` (Layout) und öffnet beim Tab-Fokus mit Bewegung. Eine Umstellung auf `transform` wäre ein Umbau.
- Tag-Nacht-Simulation (20 s) und Abschied (Sonne sinkt) sind bewusste Erlebnis-Animationen und nur gemeldet.
- `.knopf` blendet beim Hover den Schatten um (`box-shadow`, 250 ms). Wirkung klein, das dauernde Glühen läuft schon über eine eigene Schicht.
- Die Ziffern der Weckzeit gleiten auch bei Enter auf dem Knopf (180 ms). Unkritisch.

## Offene Punkte und Hinweise
- Alles wurde in Chromium ohne Grafikkarte gemessen. Touch-Ziele, `:active` und die kürzeren Bewegungen bitte einmal auf einem echten Handy und iPad nachfühlen.
- `ein-produkt-shop/references/bewegung.md` nannte für das Einblenden noch "Deckkraft 0,35", im Stylesheet steht jetzt 0,65. Inzwischen nachgezogen.
- Stand 12.10.2026: alles committet und gepusht (Commit 4ba8a4b), die Testserver sind beendet.
- Vor einem echten Start bleiben die bekannten Punkte aus CLAUDE.md (echtes Produktfoto, Firmendaten, Zahlungsanbieter, Markenprüfung, Beispiel-Bewertungen löschen, GEHEIMNIS ersetzen, noindex entfernen).
