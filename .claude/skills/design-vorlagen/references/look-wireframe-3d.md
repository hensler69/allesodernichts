<!-- Kopie aus look-wireframe-3d/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Wireframe 3D

Blaupause statt Foto: Das Produkt wird als Drahtgitter (nur Linien, keine Flächen) gezeichnet und lässt sich mit der Maus oder dem Finger drehen. Daneben stehen Maßlinien wie in einer Konstruktionszeichnung. Getestete Demo der HORTA-Startseite: `vorlage/demo.html` (Testserver: `http://localhost:8101/look-wireframe-3d/vorlage/demo.html`).

## Wann der Look passt / Wann nicht
- Passt, wenn das Produkt aus erkennbaren Teilen besteht (Gerät, Werkzeug, Gadget, Möbel mit Bauteilen), wenn Maße ein Kaufargument sind (27 cm Höhe, Schacht 5 cm) und wenn "technisch, genau, durchdacht" das gewünschte Gefühl ist.
- Passt, wenn kein Produktfoto vorhanden oder erlaubt ist: Das Drahtgitter ersetzt das Bild, ganz ohne Rechte-Probleme.
- Passt nicht, wenn das Produkt Wärme, Genuss oder Mode ausstrahlen soll (Essen, Pflege, Kleidung, Geschenke). Dunkelblau mit Cyan wirkt dann kühl.
- Passt nicht, wenn das Produkt keine klare Form hat (Pulver, Stoffe, Kosmetik) oder wenn die Kundschaft eher älter ist und große, ruhige Schrift braucht: Die Mono-Schrift ist breit und wirkt nüchtern.

## Merkmale
- Marineblauer Grund `#06121f` mit feinem Raster (24 px) und kräftigerem Raster (120 px), gemalt aus vier CSS-Verläufen, ohne Bild.
- Dünne Cyan-Linien (`#5fe3ff`) für alle Konturen, dazu Eckmarken (L-förmige Ecken) an jedem "Zeichnungsfeld" und eine Positionsmarke (`Pos. 2 Einsatz`) auf dem oberen Rand wie in einer Stückliste.
- Hero: ein eigener 3D-Renderer auf Canvas (Projektion und Drehung selbst gerechnet, 1425 Linien, keine Bibliothek). Er zeichnet Schüssel, Kegelstumpf-Einsatz mit fünf Löchern, Zylinderschacht, Gemüsescheiben und ein Bodenraster. Tiefe entsteht über Linienhelligkeit: Nahe Linien sind hell, ferne blass.
- Gelbe Maßlinien mit Pfeilen (`27 cm Höhe`, `Schacht 5 cm`) als SVG über dem Canvas, dazu Hilfslinien gestrichelt. Alle Maße stehen zusätzlich als echter Text in einer Stückliste unter dem Bild.
- Einmaliger Aufbau beim ersten Sichtbarwerden: eine helle Ebene fährt von unten nach oben und zeichnet das Gitter in 1,2 Sekunden.
- Drehen: langsame Eigendrehung (0,2 Bogenmaß pro Sekunde), Ziehen mit Maus oder Finger dreht von Hand, danach läuft die Drehung mit Schwung aus.
- Schriften: IBM Plex Mono für Text (wirkt wie Beschriftung auf einer Zeichnung), Chakra Petch für Überschriften.
- Der Kaufknopf ist die einzige orange Fläche der Seite, mit Doppelrahmen und leichtem Schein.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | `#06121f` | Seitengrund, Kopfzeile, Fußzeile |
| `--flaeche` | `#0a1b2e` (88 % deckend) | Karten und Zeichnungsfelder |
| `--linie` | `#5fe3ff` | Konturen, Eckmarken, Pos.-Marken, Logo, zweite Zeile der Überschrift, Skizzen |
| `--linie-mid` | `rgba(95,227,255,.5)` | Rahmen von Karten (3,9:1 gegen den Grund) |
| `--linie-hell` | `#b9f3ff` | Fluss und Bewegung in kleinen Skizzen (Pfeile, fallende Teile) |
| `--text` | `#d8ecf7` | Fließtext (15,5:1 auf dem Grund) |
| `--text-leise` | `#9dbdd2` | Nebentexte, Preis-Kleingedrucktes (8,8:1 auf Karten) |
| `--kopf` | `#f2fbff` | Überschriften, Preis |
| `--mass` | `#ffd166` | Maße, Zahlen, Hinweisblock, Sterne, Marke "Beispiel", Einführungspreis-Zeile |
| `--signal` | `#ff8a3d` | Nur der Kaufknopf und die Textauswahl (`::selection`). Dunkle Schrift darauf: 8,0:1 |
| `--fokus` | `#ffffff` | Fokusring, 3 px, 18,9:1 auf dem Grund |

## Schriften
Alle lokal aus `design-vorlagen/fonts`, `font-display: swap`, zusammen 49 KB.
| Familie | Gewicht | Datei | Wofür |
| --- | --- | --- | --- |
| IBM Plex Mono | 400 | `IBMPlexMono-400.woff2` | Fließtext, Navigation, Stückliste, SVG-Beschriftung |
| IBM Plex Mono | 600 | `IBMPlexMono-600.woff2` | Pos.-Marken, Maße, Eyebrow, Marke "Beispiel" |
| Chakra Petch | 700 | `ChakraPetch-700.woff2` | H1, H2 (Großbuchstaben), Preis, Zahlenleiste, Kaufknopf, Logo |
| Chakra Petch | 500 | `ChakraPetch-500.woff2` | Zwischentitel (H3 der Karten) |

## So ist er gebaut
**1. Eckmarken und Positionsmarke mit einem einzigen Pseudo-Element.** Acht Verläufe malen vier L-förmige Ecken, nichts anderes im HTML nötig:
```css
.feld{position:relative;background:rgba(10,27,46,.88);border:1px solid var(--linie-mid);
  --ecke:linear-gradient(var(--linie),var(--linie));}
.feld::before{content:"";position:absolute;inset:-4px;pointer-events:none;
  background:
    var(--ecke) 0 0/14px 2px,var(--ecke) 0 0/2px 14px,
    var(--ecke) 100% 0/14px 2px,var(--ecke) 100% 0/2px 14px,
    var(--ecke) 0 100%/14px 2px,var(--ecke) 0 100%/2px 14px,
    var(--ecke) 100% 100%/14px 2px,var(--ecke) 100% 100%/2px 14px;
  background-repeat:no-repeat}
.pos{position:absolute;top:0;left:20px;transform:translateY(-50%);background:var(--grund);padding:0 8px}
```

**2. Der Renderer: drehen, kippen, perspektivisch umrechnen.** Jede Linie ist ein Paar von 3D-Punkten. Pro Bild wird jeder Punkt um die senkrechte Achse gedreht, nach vorn gekippt und mit Perspektive auf die Zeichenfläche gerechnet:
```js
function projektion(winkel, kipp) {
  var ca = Math.cos(winkel), sa = Math.sin(winkel), ct = Math.cos(kipp), st = Math.sin(kipp);
  return function (x, y, z, aus) {
    y -= MIDY;
    var x1 = x * ca + z * sa, z1 = -x * sa + z * ca;      // drehen um die Hochachse
    var y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;     // Blick von schräg oben
    var k = SCALE * DIST / (DIST - z2);                   // Perspektive: nah = größer
    aus[0] = CX + x1 * k; aus[1] = CY - y2 * k; aus[2] = z2;
    return aus;
  };
}
```
Die Teile entstehen aus Drehkörpern (Profil aus Radius und Höhe, dazu Ringe und Längslinien). Der Abschnitt "Pos. 3 Schüssel" ist nur eine Liste: `drehkoerper([[3.5,0],[5.2,0.8],[7.0,2.4],[8.4,4.4],[9.2,6.2],[9.5,8]], 16, 48, 0)`.

**3. Tiefe und Tempo: Linien nach Helligkeit sammeln.** Statt tausend Einzelstriche zeichnet der Renderer pro Linienart und Helligkeitsstufe (5 Stufen) einen gemeinsamen Pfad. Das sind 15 `stroke()`-Aufrufe pro Bild, gemessen 60 Bilder pro Sekunde:
```js
a = 0.26 + 0.74 * Math.min(1, Math.max(0, ((P0[2] + P1[2]) / 2 + 13) / 26));   // nah = hell
bk = Math.min(BUCKETS - 1, Math.floor(a * s[7] * DAempf[s[6]] * BUCKETS));
pfade[s[6]][bk].push(P0[0], P0[1], P1[0], P1[1]);
```

**4. Ziehen, ohne das Scrollen zu stören, und sauber pausieren.**
```css
.zeichnung canvas{touch-action:pan-y;cursor:grab}   /* senkrechtes Wischen scrollt weiter */
```
```js
canvas.addEventListener('pointerdown', function (e) {
  if (ziehen || (e.pointerType === 'mouse' && e.button !== 0)) return;   // zweiter Finger ignorieren
  ziehen = true; zeigerId = e.pointerId; letztesX = e.clientX; tempo = 0;
  canvas.setPointerCapture(e.pointerId);
});
function pruefeLauf() {
  var soll = sichtbar && !document.hidden && !weich.matches;   // IntersectionObserver + Tab + Bewegung reduzieren
  if (soll && !raf) { davor = 0; raf = requestAnimationFrame(schritt); }
  else if (!soll && raf) { cancelAnimationFrame(raf); raf = 0; }
}
```
Gemessen: 60 Aufrufe pro Sekunde im Bild, 0 außerhalb des Bildes, 0 bei verdecktem Tab, 0 bei `prefers-reduced-motion`. Die Zeichenfläche ist höchstens `devicePixelRatio` 2 groß (bei Handy mit Faktor 3: 600 Pixel für 300 CSS-Pixel).

**5. Maße exakt über dem Bild: ein Generator rechnet beides aus derselben Quelle.** `vorlage/poster-erzeugen.js` lädt `script.js` in Node, projiziert dieselben Punkte und schreibt ins HTML (a) ein statisches SVG-Standbild ("Poster", für Seiten ohne JavaScript, 33 KB) und (b) die gelben Maßlinien mit den richtigen Koordinaten. Beide Teile benutzen `viewBox="0 20 600 600"`, genau wie der Canvas den Bildausschnitt wählt. Weil nur um die Hochachse gedreht wird, bleiben Höhe und Breite der Silhouette beim Drehen gleich, die Maßlinien stimmen also in jeder Stellung. Auf dem Handy (unter 600 px) wird die SVG-Ebene ausgeblendet, der Canvas nimmt einen engeren Ausschnitt (`400 x 536` statt `600 x 600`), und die Maße stehen in der Stückliste darunter.

## Pro
- Kein Foto nötig: Das Gerät entsteht aus 1425 berechneten Linien, daher keine Bildrechte und keine Bilddatei (gesamte Seite ohne Schriften 79 KB, Grenze 250 KB).
- Drehbar mit Maus und Finger, und das ohne Bibliothek: `script.js` ist 13 KB groß. Der Hero ist damit "mutig und erkennbar", wirkt aber nicht wie eine Vorlage.
- Maße als Kaufargument: "27 cm, passt unter den Hängeschrank" wird sichtbar bewiesen, nicht nur behauptet.
- Der Kaufknopf bleibt der Blickfang: Auf dem kühlen Blau ist Orange (`#ff8a3d`) die einzige warme Farbe der Seite, Kontrast 8,0:1.
- Kontrast durchgehend hoch: Fließtext 15,5:1, Nebentext 8,8:1, Gelb 12,1:1.
- Läuft ohne JavaScript: Texte, Poster-SVG und Maßlinien stehen im HTML; JS ergänzt Drehen, Aufbau-Effekt und Einblenden.

## Contra
- Aufwand: Der Renderer samt Seitenlogik ist rund 250 Zeilen, dazu Poster-Generator und Maßlinien. Jedes neue Produkt braucht ein neu modelliertes Drahtgitter (Teile als Drehkörper), das dauert pro Produkt mehrere Stunden.
- Das Modell passt nur zu Dingen aus Drehkörpern und geraden Teilen. Ein Gerät mit freien Formen (Griffe, Kurven) wird aufwendig und sieht schnell ungenau aus.
- Der Canvas ist für Screenreader unsichtbar (`aria-hidden`), und Drehen per Tastatur gibt es nicht. Die Information steckt deshalb doppelt als Text in der Stückliste, aber das Drehen selbst bleibt nur für Maus und Finger.
- Lesbarkeit: Die Mono-Schrift ist breit und braucht Platz. Damit die Überschrift bei 1280 px in zwei Zeilen bleibt, musste die Textspalte auf 1,1fr verbreitert werden (bei gleich breiten Spalten waren es drei Zeilen).
- Stimmung: Marineblau mit Cyan wirkt kühl und technisch. Für Essen oder Pflege fehlt Wärme, dort liegt die Wirkung eher bei "Labor".
- Handy: Die Navigation ist eine Leiste, die seitlich scrollt (5 Links brauchen 448 px), und das Modell ist als eigener Ausschnitt nur 300 px breit. Die gelben Maßlinien am Bild entfallen dort.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung in einem Satz |
| --- | --- | --- |
| Kaufwirkung | 4 | Orange Knopf ist der einzige warme Punkt und das drehbare Modell hält die Aufmerksamkeit, aber der Look ist eher sachlich als verführerisch. |
| Lesbarkeit | 4 | Kontrast 8,8:1 bis 15,5:1 und große Zeilenhöhe, nur die breite Mono-Schrift ermüdet bei langen Texten. |
| Handy | 4 | Eigener Bildausschnitt, Kaufknopf schon im ersten Bildschirm (390 x 844), Maße unter dem Bild, nur die seitlich scrollende Navigation ist ein Kompromiss. |
| Tempo | 4 | 79 KB ohne Schriften und 60 Bilder pro Sekunde, aber die Canvas-Berechnung kostet auf schwachen Handys Akku. |
| Barrierefreiheit | 4 | Echter Text für alle Maße, sichtbarer Fokus, Tastatur komplett nutzbar, nur das Drehen selbst ist ohne Maus oder Finger nicht möglich. |
| Aufwand (5 = wenig Aufwand) | 2 | Für jedes Produkt ein neues Drahtgitter modellieren und Maßlinien per Generator neu rechnen. |
| Risiko (5 = geringes Risiko) | 3 | Maßlinien und Modell müssen zusammenpassen, und die Wirkung hängt stark an einem gut modellierten Gerät. |

## Passt besonders zu
- Haushaltsgeräte und Küchengadgets mit klarer Bauform, Werkzeug, Elektronik, Zubehör mit Maßen (Halterungen, Ständer, Regale).
- Produkte, bei denen "passt das?" die wichtigste Kundenfrage ist (Maße, Einsätze, Teile).

## Passt nicht zu
- Essen, Kosmetik, Mode, Schmuck und Geschenke, also alles, was Wärme oder Gefühl verkaufen soll.
- Produkte ohne feste Form oder mit sehr vielen freien Rundungen (Plüsch, Kleidung, Pflanzen).

## Stolperfallen
- Seitlicher Überlauf auf dem Handy (411 statt 390 px): Die Abschnittsüberschrift "BEISPIELBEWERTUNGEN" steht in einer Reihe mit Kreis und Strichlinie, die Linie hatte `min-width:24px`. Lösung: `min-width:0` auf Linie und H2 und die kleinste Schriftgröße auf 1,3 rem.
- Überschrift dreizeilig statt zweizeilig bei 1280 px: Der Text "Weniger schnippeln." ist bei 56 px genau 531 px breit, die Spalte nur 528 px. Immer mit einem Skript messen (Zeilen = Höhe geteilt durch Zeilenhöhe) bei 360, 390, 820, 960, 1280 und 1920 px.
- Die Stückliste in zwei festen Spalten lief bei 960 px 6 px über den Rand. Besser `grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))` mit 1 px Lücke auf farbigem Grund, dann braucht man keine Rahmen pro Zelle.
- Kopfzeile mit 96 % Deckkraft zeigte beim Scrollen Geisterschrift von darunterliegender Stückliste. Kopf- und Fußzeile deshalb voll deckend (`background:var(--grund)`).
- `margin:0` weiter unten im CSS überschrieb den Abstand `margin-top` der Zeichnung auf dem Handy (nur 27 statt 72 px). Immer prüfen, welche Regel zuletzt steht.
- Der Aufbau-Effekt läuft erst, wenn der Canvas sichtbar wird (IntersectionObserver). Bildschirmfotos der Handyansicht zeigen deshalb manchmal die helle Ebene mitten im Aufbau, das ist kein Fehler.
- Der Textumschalter "Zum Drehen ziehen" (Maus) und "wischen" (Touch) war zuerst ein `font-size:0`-Trick, den Screenreader trotzdem beide vorlasen. Jetzt zwei `span`, einer mit `display:none`.
- Maßlinien als SVG funktionieren nur, solange um die Hochachse gedreht wird. Kippen per Ziehen würde sie verschieben. Deshalb ist Kippen fest und nur die Drehung frei.
- Weißer Fokusring auf Orange hat nur 2,35:1. Der Ring sitzt deshalb mit `outline-offset:8px` außerhalb des Doppelrahmens auf dem dunklen Grund (18,9:1).
- Wenn man die Geometrie in `script.js` ändert, muss `node poster-erzeugen.js` neu laufen, sonst stimmen Poster und Maßlinien nicht mehr.
- Von `impeccable` war nur die Datei SKILL.md lesbar, die Unterdateien (`reference/...`) fehlten. Angewendet wurde nur, was dort steht.

## Anwenden
1. `vorlage/style.css` als Startpunkt nehmen, Schriften aus `../design-vorlagen/fonts` (die vier Dateien oben) in den Shop-Ordner `assets/fonts/` kopieren und die `url()` in den vier `@font-face` anpassen. Nur selbst gehostet, `font-display: swap`.
2. Klassen der Vorlage und ihre Entsprechung im HORTA-Shop: `.feld` (= `.glas` und `.kachel`), `.cta` (= `.knopf`), `.pos` (neu, nur Zeichnungsfelder), `.karten`, `.karte`, `.schritt`, `.bewertung`, `.hinweis`, `.zahlen__liste` (= `.blick__kachel`), `.zeichnung` mit `#bild`, `#canvas` und `.masse` (neu, ersetzt die 3D-Trommel `g3d__*`), `.korb`, `.zeig` (= `.zeigen`). Entweder die Klassen im Shop umbenennen oder in `style.css` Selektoren zusammenlegen (`.glas,.kachel,.feld{...}`).
3. Vorgehen wie in `../design-vorlagen/references/umstellen.md`: Schriften tauschen, `style.css` ersetzen, Generator (`bausteine.py`, `build_index.py`) anpassen: `WELT` bleibt ein leeres `<div class="welt" aria-hidden="true"></div>` (das Raster macht das CSS), `LOGO_MARK` als Drahtgitter-Zeichen, `theme-color` auf `#06121f`. Texte, Warenkorb, Kasse, Rechtsseiten, Formular und Tests ändern sich nicht. Die HTML-Haken `.welt`, `[data-gruss]`, `.abschied` bleiben bestehen.
4. Für ein neues Produkt das Drahtgitter in `baue()` in `vorlage/script.js` neu zusammensetzen (Teile als `drehkoerper([...])`, Ringe, Linien) und `MIDY` auf die halbe Höhe setzen. Dann `node poster-erzeugen.js` ausführen: Es schreibt Poster und Maßlinien neu in `demo.html`. Die Maße (hier 27 cm und 5 cm) im Block `masse` von `poster-erzeugen.js` (Variablen `yd`, `a1` bis `a3`, Texte) und in der Stückliste anpassen, nur echte Angaben verwenden.
5. Einen Kaufknopf behalten: genau ein Element mit Klasse `cta`, die Navigation hat nur den Link "Warenkorb". Die Signalfarbe `--signal` nirgendwo sonst verwenden.
6. Prüfen: Testserver starten, `pruefen.js wireframe-3d` laufen lassen, Bildschirmfotos ansehen (PC, Handy, Tablet, reduzierte Bewegung) und mit Tab die Fokusreihenfolge durchgehen. Wer die Bewegung im Shop abschalten will: `prefers-reduced-motion` zeigt schon jetzt eine feste Pose ohne Schleife.

## Dateien
- `vorlage/demo.html`: HORTA-Startseite im Look (50 KB mit eingebettetem Poster)
- `vorlage/style.css`: alle Stile, Schriften, Abstandsstufen, Hover und Bewegung (17 KB)
- `vorlage/script.js`: 3D-Renderer, Ziehen, Pausieren, Einblenden, Warenkorb-Zähler (13 KB)
- `vorlage/poster-erzeugen.js`: schreibt Poster-SVG und Maßlinien aus der Geometrie ins HTML (Aufruf `node poster-erzeugen.js`)
- Schriften: `../design-vorlagen/fonts/` (IBMPlexMono-400, IBMPlexMono-600, ChakraPetch-500, ChakraPetch-700)

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge: erst die Demo bauen und prüfen, dann je Skill ein Durchgang mit Prüfskript und Bildschirmfotos. Die Tabelle nennt nur, was in dieser Demo wirklich geändert wurde.

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | H1 bei 1280 px 51 px, bei 360 px dreizeilig (Mindestgröße 2,2 rem) | `clamp(2rem,8.4vw,3.3rem)` auf dem Handy, `clamp(2.3rem,4.4vw,3.5rem)` ab 960 px, Spalten 1,1fr zu 1fr: zweizeilig bei 360, 390, 600, 820, 960, 1024, 1100, 1280, 1440 und 1920 px (gemessen) | Überschrift breit und höchstens 2 Zeilen auf dem PC |
| gpt-taste | Krumme Abstände (22, 26, 28, 30, 34, 36 px), Abschnitte 104 px | Sieben Stufen `--s1` bis `--s7` (8, 16, 24, 32, 48, 72, 112 px), Abschnitte 112 px, Kartenabstand 24 px, ab 900 px 32 px | Gleichmäßige, großzügige Abstandsstufen |
| gpt-taste | Billige Meta-Marken: "Anm. 1/2/3", "Schritt 1/2/3", Kreisbuchstaben A, B, C, Tab "Preis", Marke "Hinweis" | Entfernt. Die Pos.-Marken nennen jetzt echte Bauteile aus der Zeichnung (`Pos. 2 Einsatz` auf Schneiden, Raspeln, Reiben und Schritt 1, `Pos. 1 Schacht` auf Breiter Schacht und Schritt 2, `Pos. 3 Schüssel` auf Schritt 3); Abschnittszeichen ist ein Fadenkreuz ohne Buchstabe | Bedeutungslose Beschriftungen wirken billig, Querverweise zur Zeichnung haben Inhalt |
| gpt-taste | Raster ohne Dichte-Regel, Stückliste mit Rahmen pro Zelle (bei 960 px 6 px Überlauf) | `grid-auto-flow: dense` auf allen Kartenrastern (4, 2 oder 1 Spalte; 3 oder 1), Stückliste mit `auto-fit` und 1-px-Lücke | Lückenloses Raster ohne leere Löcher, kein Überlauf |
| impeccable | Gelbe Akzente an 7 Stellen in kleinen Skizzen (Klinge, Raspeln, Punkte, Pfeile) neben den echten Maßen | Skizzenakzente in hellem Cyan `--linie-hell`, Gelb nur noch für Maße, Zahlen, Hinweisblock, Sterne und Marke "Beispiel"; Orange zusätzlich für `::selection` | Jede Farbe hat eine Rolle, die Signalfarbe gehört nur dem Kaufknopf und der Auswahl |
| impeccable | Preis 54 px, gleich schwer wie die H1 (56 px); Kleinschrift 11 bis 13 px (Marken, Preis-Fußzeile, Stückliste, SVG-Namen) | Preis 44 px; Kleinschrift auf 12 bis 14 px; Rangfolge H1, Preis, Kaufknopf | Ein Blickfang pro Bildschirm, rechtlich wichtige Zeile ("inkl. MwSt.") besser lesbar |
| impeccable | Kartenrahmen 40 % Cyan (2,9:1), Kontrast nur geschätzt | Rahmen 50 % (3,9:1); alle Textpaare gemessen: 8,0 bis 18,9:1; Fokusring per Tab an 13 Stellen geprüft und im Bild kontrolliert; Regel für den Windows-Kontrastmodus ergänzt | Kontrast gemessen statt geschätzt, Fokus überall sichtbar |
| emil-design-eng | Hover mit `transition: ... .2s ease` auf Farbe und Rahmen; Hover ohne Mediaabfrage | Hover als Überlagerung mit `opacity` (nur `transform` und `opacity`), 140 bis 200 ms, `cubic-bezier(.23,1,.32,1)`, alles in `@media (hover:hover) and (pointer:fine)` | Kein `ease`, nichts außer Transform und Deckkraft animieren, kein falscher Hover auf Touch |
| emil-design-eng | Kein Druckzustand auf Knopf und Links | `:active { transform: scale(.97) }` auf Kaufknopf, Warenkorb-Link, Logo, Navigation und Fußzeilenlinks; zweiter Finger beim Ziehen wird ignoriert | Rückmeldung beim Drücken, Mehrfach-Berührung stört das Drehen nicht |
| emil-design-eng | `scroll-behavior: smooth` (Tastatursprünge animiert), Einblenden 500 ms `ease` aus 14 px, Warenkorb-Zahl 400 ms Keyframes | Weiches Scrollen entfernt; Einblenden 280 ms mit starkem Ease-out, 8 px, 50 ms Versatz (höchstens 3 Stufen); Zahl per Web Animations API 200 ms von `scale(1.2)` zu 1 (nie von 0) | Tastatur-Aktionen nie animieren, unter 300 ms, unterbrechbar |
| emil-design-eng | Aufbau-Effekt des Gitters 1,7 s, quadratisch | 1,2 s, kubisch (stark auslaufend), läuft nur einmal und bei reduzierter Bewegung gar nicht | Dekorative Einmal-Bewegung, aber nicht länger als nötig |

Konflikte: Die Regeln "UI-Animationen unter 300 ms" und "nur transform und opacity" passen zur Oberfläche, aber nicht zum Wesen des Looks, denn der Renderer ist eine Dauer-Animation und der Aufbau dauert 1,2 s. Gelöst so: Die Eigendrehung (0,2 Bogenmaß pro Sekunde) pausiert außerhalb des Bildes und bei verdecktem Tab und fehlt bei reduzierter Bewegung ganz, der Aufbau läuft einmalig; alle Bedienelemente folgen strikt den Regeln. Die Regeln des Nutzers (ein Kaufknopf, keine Gedankenstriche, Verbotsliste, Barrierefreiheit) gingen überall vor. Bei `gpt-taste` entfielen alle GSAP-, Tailwind- und Bildvorgaben, weil die Rahmenregeln Bibliotheken und Fotos verbieten.
