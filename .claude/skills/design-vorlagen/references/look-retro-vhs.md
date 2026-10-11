<!-- Kopie aus look-retro-vhs/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Retro VHS

Gebaut und getestet am HORTA-Gemüseschneider (Startseite). Demo: `vorlage/demo.html`, Stylesheet: `vorlage/style.css`, Skript: `vorlage/script.js`.
Idee: ein altes Videoband. Der Grund ist Nachtblau (#0b0a2a). Das Leben kommt aus Bandfehlern, Scanlines, der Bildschirmanzeige und einer
Synthwave-Szene, nicht aus Schein. Abgrenzung: Neon Glow leuchtet (Röhrenschein auf Schwarz), Wireframe 3D zeichnet Drahtgitter auf Blaupause.
Retro VHS hat flache Farben ohne Weichzeichner, dafür Zeilenraster, Farbversatz und selten einen Störstreifen.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt Spaß, Küche mit Humor, Gaming, Musik, Technik, Geschenk oder "damals war's schön" ausstrahlt und die Zielgruppe
die 80er und 90er kennt oder mag. Der gelbe Kaufknopf ist auf Nachtblau sofort zu finden, das Hero-Bild zieht Blicke.
Passt nicht bei Produkten, die Ruhe, Vertrauen, Gesundheit, Baby, Luxus oder Natur versprechen, und nicht bei Kundschaft, die empfindlich
auf Flimmern oder Zeilenraster reagiert. Wer eine Seite ganz ohne Bewegung braucht, nimmt einen ruhigeren Look.

## Merkmale
- Grund #0b0a2a mit einem sanften Verlauf zu #170d4d hinter dem Hero (feste Höhe 1200 px, kein Verlauf über die ganze Seite).
- Scanlines: fest stehendes Overlay (`body::after`), 1 px dunkle Zeile alle 3 px mit Deckkraft .12, am Handy alle 4 px mit .08, `pointer-events:none`.
- Überschriften (Logo, H1, H2) in VT323 mit statischem RGB-Versatz: Magenta 2 px links, Cyan 2 px rechts (Handy 1,5 px). Fließtext hat nie einen Effekt.
- Störstreifen: ein schräger Streifen aus Bandrauschen läuft einmal alle 8 Sekunden über das Bild, sichtbar rund 120 ms, an wechselnder Höhe, nie bei reduzierter Bewegung.
- Bildschirmanzeige im Hero-Bild: "PLAY" oben links, "SP" und Bandzähler oben rechts (zählt jede Sekunde, nur Zierde), "AUFNAHME" unten links, dazu Sucher-Ecken wie bei einer Videokamera. Die Zeichen für Play, Aufnahme und Stopp sind CSS-Formen.
- Tracking-Balken: Bandrauschen mit schräger Kante am unteren Rand des Hero-Bildes, im Hinweisblock und als Streifen über der Fußzeile. Alle stehen still.
- Hero-Bild als Synthwave-Zeichnung in SVG: Sternenhimmel, Sonne mit Streifen, Berge, Gitterboden mit Perspektive, davor Gerät mit Kegel-Einsatz und Schüssel.
- Kaufknopf als einzige gelbe Fläche: Rechteck mit hartem Magenta-Schatten, VT323 in Großbuchstaben, Play-Zeichen davor.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #0b0a2a | Seitengrund, Schrift auf dem gelben Knopf |
| `--flaeche` | #15134a | Karten und Kacheln |
| `--flaeche-tief` | #100e3a | Preisblock und Hinweisblock |
| `--text` | #f2f2f2 | Fließtext und Überschriften (17,2:1 auf Grund, 15,3:1 auf Karte) |
| `--text-leise` | #b9b8e0 | Nebentext, Kleingedrucktes (9,0:1 auf Karte) |
| `--magenta` | #ff3cac | Marke und Gefühl: Sterne, Rahmen von Bild und Hinweisblock, Kopf der Bewertungskarten, Schrittkästen, Sonne, Versatz links, Aufnahme-Punkt |
| `--cyan` | #2de2e6 | Fakten und Bedienung: Eyebrow, Zahlen, Funktionen, Warenkorb, Preisrahmen, Gitterboden, Versatz rechts (12,0:1 auf Grund) |
| `--gelb` | #ffe600 | NUR der Kaufknopf (auch nicht für Hover, Fokus, Sterne oder Marken) |
| `--gelb-text` | #0b0a2a | Schrift auf Gelb (15,2:1) |
| Fokus | #fff | Ring 3 px, Abstand 3 px |
| Zeichnung | #1d1a6e, #26238a, #ffb3de, #7a2bd6 | nur im Hero-Bild: Gerät, Schacht, Sonnenverlauf oben und unten |

## Schriften
| Familie | Gewicht | Datei (aus `../design-vorlagen/fonts/`) | Wofür |
| --- | --- | --- | --- |
| VT323 | 400 | `VT323-400.woff2` | Bildschirmanzeige, H1 bis H3, Logo, Navigation, Zahlen, Preis, Kaufknopf (nie Fließtext, nie unter 20 px) |
| IBM Plex Mono | 400 | `IBMPlexMono-400.woff2` | Fließtext, Nebentext |
| IBM Plex Mono | 600 | `IBMPlexMono-600.woff2` | Preiszeile, Marke "Beispiel", Namen |
Zusammen 47 KB. Lizenztexte `VT323-LICENSE.txt` und `IBMPlexMono-LICENSE.txt` liegen im selben Ordner. Beide Schriften haben kein Play-, Punkt- und Stopp-Zeichen.

## So ist er gebaut

**1. Scanlines und RGB-Versatz: ein Overlay und ein `text-shadow`**
```css
body::after{content:"";position:fixed;inset:0;z-index:900;pointer-events:none;
  background:repeating-linear-gradient(to bottom,var(--scan-dunkel) 0 1px,transparent 1px var(--scan-takt))}
:root{--scan-dunkel:rgba(0,0,0,.12);--scan-takt:3px;
  --split:-2px 0 0 rgba(255,60,172,.95), 2px 0 0 rgba(45,226,230,.95)}
@media (max-width:720px){:root{--scan-dunkel:rgba(0,0,0,.08);--scan-takt:4px;
  --split:-1.5px 0 0 rgba(255,60,172,.95), 1.5px 0 0 rgba(45,226,230,.95)}}
h1,h2{color:var(--text);text-shadow:var(--split)}
```
Gemessen mit Abzug der dunkelsten Scanline-Zeile (Farben mal .88, am Handy .92): kleinster Textwert 7,6:1 am PC und 8,2:1 am Handy.

**2. Störstreifen: reines CSS, eine Wiederholung alle 8 Sekunden, nur Deckkraft und `transform`**
```css
.stoerung{position:fixed;left:0;right:0;top:0;height:52px;z-index:800;pointer-events:none;opacity:0;
  background:var(--rauschen) 0 0/320px 100% repeat-x,
    linear-gradient(90deg,rgba(255,60,172,.45),rgba(45,226,230,.45) 55%,rgba(255,60,172,.45));
  clip-path:polygon(0 22%,7% 0,100% 14%,100% 86%,93% 100%,0 78%);
  transform:translateY(var(--stoer-y,32vh));animation:stoerung 8s linear infinite}
@keyframes stoerung{
  0%,97.9%{opacity:0;transform:translateY(var(--stoer-y,32vh))}
  98%{opacity:1;transform:translateY(var(--stoer-y,32vh))}
  98.8%{opacity:1;transform:translateY(calc(var(--stoer-y,32vh) + 30px))}
  99.4%{opacity:0;transform:translateY(calc(var(--stoer-y,32vh) + 40px))}
  100%{opacity:0;transform:translateY(var(--stoer-y,32vh))}}
@media (prefers-reduced-motion:reduce){.stoerung{display:none;animation:none}}
```
```js
st.addEventListener('animationiteration',function(){ st.style.setProperty('--stoer-y',(12+Math.floor(Math.random()*66))+'vh'); });
```
Gemessen durch Abtasten von `getAnimations()[0].currentTime`: sichtbar von 7834 bis 7952 ms, also 118 ms, danach wieder bei 15834 ms. Das Rauschbild (`--rauschen`) ist ein Daten-SVG mit `feTurbulence` (`baseFrequency='.01 .85'`, waagerecht gezogen) und wird auch für die Tracking-Balken benutzt.

**3. Bildschirmanzeige: Zeichen aus Formen, Zähler per `setInterval`, kein `requestAnimationFrame`**
```css
.ikon--play{width:.6em;height:.68em;margin-right:.4em;background:currentColor;clip-path:polygon(0 0,100% 50%,0 100%)}
.ikon--rec{width:.62em;height:.62em;margin-right:.4em;border-radius:50%;background:var(--magenta)}
.osd{font:400 clamp(1.3rem,2.4vw,1.8rem)/1 var(--font-osd);letter-spacing:.06em;text-transform:uppercase;
  color:var(--text);text-shadow:2px 2px 0 rgba(0,0,0,.9);pointer-events:none}
```
```js
var los=function(){ if(!timer && !ruhe.matches && !document.hidden && sichtbar) timer=setInterval(tick,1000); };
/* stoppt bei verdecktem Tab (visibilitychange), außerhalb des Bildes (IntersectionObserver) und bei reduzierter Bewegung */
```
Bei reduzierter Bewegung steht der Zähler auf 00:00:42 (gemessen: nach 3 s unverändert), ohne JS ebenso.

**4. Synthwave-Szene: Sonne mit Maske, Gitterboden aus Linien zum Fluchtpunkt**
```html
<mask id="sonnenstreifen" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="600">
  <rect width="640" height="600" fill="#fff"/>
  <rect y="264" width="640" height="3" fill="#000"/><rect y="278" width="640" height="4" fill="#000"/>
  <rect y="293" width="640" height="6" fill="#000"/><rect y="311" width="640" height="8" fill="#000"/>
  <rect y="330" width="640" height="10" fill="#000"/>
</mask>
<circle cx="340" cy="250" r="130" fill="url(#sonne)" mask="url(#sonnenstreifen)"/>
<g stroke="#2de2e6" stroke-width="1.6" fill="none">
  <path d="M320 340 L80 600"/> <path d="M320 340 L320 600"/> <path d="M320 340 L560 600"/>   <!-- 17 Linien zum Fluchtpunkt -->
  <path d="M0 346 H640"/><path d="M0 353 H640"/><path d="M0 363 H640"/> ...                <!-- Abstände wachsen nach vorn -->
</g>
```
Der Horizont liegt bei y 340, das Gerät steht davor (`translate(24 -4) scale(.9)`). Alles ist flach gefüllt, kein Filter, kein Weichzeichner. Das Bild kommt mit rund 7 KB im HTML aus.

**5. Kaufknopf: hartes Rechteck, Hover nur mit Maus, Drücken als `scale(.97)`**
```css
.cta{min-height:64px;padding:0 var(--a4);font:400 2rem/1 var(--font-osd);letter-spacing:.06em;text-transform:uppercase;
  color:var(--gelb-text);background:var(--gelb);border:0;border-radius:0;box-shadow:5px 5px 0 var(--magenta);
  transition:transform 160ms var(--ease-out)}
@media (hover:hover) and (pointer:fine){.cta:hover{transform:translate(-2px,-2px)}}
.cta:active{transform:scale(.97)}
```

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge wie gefordert, nach jedem Durchgang Prüfskript und Bildschirmfotos. Von impeccable war nur die `SKILL.md` lesbar, die genannten
Unterdateien (`reference/craft-floor.md` und andere) und das Startskript fehlten. Dafür galten die Kurzregeln aus dem Auftrag (Rollen, Hierarchie, gemessener Kontrast, sichtbarer Fokus).

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | H1 in der linken Hälfte: 3 Zeilen von 1100 bis 1920 px (gemessen), Kaufknopf bei 1280 mal 800 px erst ab y 786 und unten abgeschnitten (bis 850) | Eyebrow und H1 liegen über beiden Spalten (Gitterbereich `kopf kopf`), eine Zeile von 721 bis 1920 px (72 px Schrift bei 1280), Knopf bei y 667 bis 731 komplett sichtbar. Die Tablet-Sonderregeln für den Hero entfielen | Breite Überschrift, höchstens 2 Zeilen, Blickführung Aufmerksamkeit (H1 und Bild), Interesse (Text), Verlangen (Sterne, Preis), Handlung (Knopf) |
| gpt-taste | Vier Zeitmarken wie "00:01:20" über den Abschnittsüberschriften | Entfernt. Bildschirmanzeige nur im Hero-Bild, "STOP" in der Fußzeile | Verbot billiger Meta-Labels (wie "SECTION 01") |
| gpt-taste | Abstände gemischt: Zahlenleiste oben 24 px, Hero bis Zahlen 88 px, sonst 128 px | Jeder Abschnitt oben und unten 64 px aus den Stufen 4, 8, 16, 24, 40, 64, 96 px (Lücke überall 128 px), Handy 40 px (Lücke 80 px) | Großzügige, gleichmäßige Abstandsstufen |
| gpt-taste | Raster nicht geprüft | Geprüft: 4, 2 mal 2, 3 und 1 Spalte ohne leere Zellen, keine Änderung nötig | Lückenloses Raster |
| impeccable | Marke "Beispiel" in Magenta, 12,5 px: nominal 5,5:1, mit der dunkelsten Scanline-Zeile 4,35:1 (unter 4,5) | Schrift Hellgrau, Rand Magenta, 13,6 px. Kleinster Textwert mit Overlay jetzt 7,6:1 (PC) und 8,2:1 (Handy) | Kontrast gemessen, nicht geglaubt (das Overlay zählt mit) |
| impeccable | Hero-Bild mit weißem 3-px-Rahmen, die stärkste Linie der Seite neben dem Kaufknopf | Rahmen 2 px Magenta (Rolle Marke und Gefühl) | Ein Blickfang pro Bildschirm, Gelb bleibt die einzige volle Warmfläche |
| impeccable | Warenkorb mit voller Cyan-Linie und zweitem Rahmen um die Null, Preisblock mit voller Cyan-Linie | Ein Rahmen mit 55 % Deckkraft, Trennlinie vor der Zahl; Preisblock gleich gedämpft | Navigation und Preis dürfen den Knopf nicht überbieten |
| impeccable | Kleinste Schrift 12,5 px (Marke), 13,6 px (Preisinfo), 13,6 px (Kachel-Text am Handy) | Marke 13,6 px, Preisinfo und Kachel-Text 14,4 px | Lesbarkeit von Nebentext in breiter Monospace |
| emil-design-eng | `transition:transform .15s ease` | `transition:transform 160ms cubic-bezier(.23,1,.32,1)` (Variable `--ease-out`, im Browser so gemessen) | Eigene Kurve statt `ease`, unter 300 ms, nur `transform` |
| emil-design-eng | Kein `:active` auf Knopf, Navigation, Warenkorb, Logo, Fußlinks | `:active{transform:scale(.97)}` (alle fünf gemessen als `matrix(0.97,0,0,0.97,0,0)`) | Rückmeldung beim Drücken |
| emil-design-eng | `.cta:hover` und `.nav a:hover` ohne Abfrage | Nur unter `@media (hover:hover) and (pointer:fine)`; am Handy greift die Abfrage nicht (gemessen `false`) | Keine falschen Treffer beim Tippen |
| emil-design-eng | `scroll-behavior:smooth` ließ Sprünge per Tastatur über die Seite gleiten | Entfernt, Sprünge sind sofort | Tastatur-Aktionen nie animieren |
| emil-design-eng | Störstreifen sichtbar 142 ms (97,6 bis 99,4 % von 8 s, Rampen mitgezählt) | 118 ms (97,9 bis 99,4 %), weiter nur Deckkraft und `transform` | Mehr Abstand zur Grenze von 150 ms |
| emil-design-eng | Zähler im Kopf sprang ohne Rückmeldung | Zucken von 180 ms mit eigener Kurve, nur bei Mausklick oder Tipp (`e.detail > 0`), nie bei Tastatur und nie bei reduzierter Bewegung | Feedback, ohne Tastaturwege zu verlangsamen |

Konflikte: gpt-taste verlangt GSAP, Scrub-Animationen, Python-Zufall und riesige Abstände. GSAP und Zufall entfallen (keine Bibliotheken, der Kaufweg soll schnell sein), die Abstände gelten
(64 px je Seite). Der Look lebt von Bandfehlern, die Regeln gegen Flackern gehen vor: genau ein Störstreifen alle 8 Sekunden, höchstens 150 ms, gemessen 118 ms, bei reduzierter Bewegung gar keiner. emil-design-eng
verlangt `ease-out`-Kurven für UI. Der Störstreifen läuft bewusst `linear` (Dauerlauf, keine Bedienung). Die Scanlines sind kein Effekt, den ein Stufenplan abschaffen könnte, sie bleiben mit .12 als schwaches Overlay.

## Pro
- Der Look ist in einer Sekunde erkannt: Scanlines, Farbversatz, Sucher-Ecken und Synthwave-Szene sind eindeutig, aber nichts davon liegt auf dem Fließtext.
- Der Kaufknopf ist die einzige gelbe, gefüllte Fläche und auf Nachtblau mit 15,2:1 Schriftkontrast der klare Blickfang. Er sitzt bei 1280 mal 800 px und bei 390 mal 844 px komplett im ersten Bildschirm.
- Sehr leicht: 38 KB ohne Schriften (HTML 18, CSS 18, JS 2), Schriften 47 KB, 6 Anfragen, kein Bild, keine Bibliothek. Die Szene ist reines SVG ohne Filter.
- Ruhig im Betrieb: 0 `requestAnimationFrame` pro Sekunde, 1 endlose CSS-Animation (der Störstreifen), bei reduzierter Bewegung 0. Scroll-Test über die ganze Seite mit 4-fach gebremster CPU: 0 bis 1 von rund 250 Bildern über 33 ms am PC (einmal 5 bei einem Lauf), 0 am Handy.
- Gute Lesbarkeit trotz Raster: kleinster Fließtext 7,6:1 mit Scanline-Abzug, Fokusring 3 px weiß an allen 13 Tab-Zielen gemessen.
- Die Farbrollen sind klar getrennt (Magenta Gefühl, Cyan Fakten, Gelb nur Kauf). Umfärben geht über `--magenta` und `--cyan`.

## Contra
- Der Störstreifen ist ein Sicherheitsthema. Die Grenzen (höchstens 1 pro 8 s, höchstens 150 ms, schwach, nicht über Text-Dauerlauf) müssen bei jeder Änderung neu gemessen werden. Ein Kunde, der "mehr Störung" will, bekommt ein Gesundheitsrisiko.
- Das Hero-Bild ist Handarbeit: Gerät, Schüssel und Gemüse sind pro Produkt neu zu zeichnen. Nur Himmel, Sonne, Berge und Gitterboden sind wiederverwendbar.
- VT323 ist unter 20 px schlecht lesbar und fehlt für Fließtext. Dadurch ist der Fließtext in IBM Plex Mono sehr breit (0,6 em je Zeichen): Absätze brauchen mehr Zeilen, die Preisinfo bricht in zwei Zeilen um.
- Das Scanline-Overlay wurde nur in Chromium am Bildschirm getestet. Auf echten Handys und bei Browser-Zoom kann es Moiré (flimmernde Muster) geben. Der Look kennt nur diese dunkle Variante.
- Am Handy zeigt die Linkleiste nur 3 von 5 Links, der Rest ist wischbar (Hinweis nur durch eine ausblendende Kante). Die Tab-Reihenfolge am Handy läuft Logo, Links, Warenkorb, obwohl der Warenkorb oben rechts steht.
- Nostalgie ist nicht für jede Kundschaft ein Vorteil: Ältere erkennen den Look, Jüngere halten ihn für Spielerei, und für Zahlung und Rechtliches wirkt er weniger seriös als ein ruhiger Look.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Gelber Knopf und Synthwave-Bild ziehen stark, aber Nostalgie passt nur zu passenden Produkten. |
| Lesbarkeit | 4 | Fließtext 7,6:1 und mehr unter dem Overlay, nur die Überschriften verlieren etwas Schärfe durch den Versatz. |
| Handy | 4 | Eigene Reihenfolge, Knopf bei y 762 bis 826 im ersten Bildschirm, 48-px-Ziele, nur die Linkleiste scrollt. |
| Tempo | 5 | 38 KB, kein Bild, kein rAF, nur eine CSS-Animation, im Scroll-Test fast keine langsamen Bilder. |
| Barrierefreiheit | 3 | Kontrast, Fokus und reduzierte Bewegung sind gemessen gut, aber Raster und Versatz bleiben für manche Augen anstrengend. |
| Aufwand (5 = wenig Aufwand) | 3 | Effekte sind einfaches CSS, das Hero-Bild muss pro Produkt neu gezeichnet und der Störstreifen neu gemessen werden. |
| Risiko (5 = geringes Risiko) | 3 | Die Störung muss immer klein und selten bleiben, und der Look polarisiert. |

## Passt besonders zu
Küchen- und Spielgeräten, Musik, Gaming, Geschenken und Deko, Retro- und Sammlerprodukten, Produkten für Videoabende und Partys.

## Passt nicht zu
Gesundheit, Baby, Pflege, Bio und Natur, Finanzen und Luxus, und allem, was Ruhe und Vertrauen verkaufen soll.

## Stolperfallen
- Die Zeichen Play, Aufnahme-Punkt und Stopp fehlen in VT323 und IBM Plex Mono. Sie fielen auf eine Systemschrift zurück (am Handy womöglich als Emoji). Deshalb CSS-Formen (`clip-path:polygon`, `border-radius`) mit `aria-hidden`.
- Das Overlay zieht Kontrast ab. Kleine Magenta-Schrift hatte nominal 5,5:1 und mit der dunkelsten Scanline-Zeile nur 4,35:1. Immer mit Faktor .88 (Handy .92) auf Vorder- und Hintergrund nachrechnen.
- VT323 ist breit: "Weniger schnippeln." misst 798 px bei 100 px Schrift (0,42 em je Zeichen). In der halben Spalte reichen höchstens 4,4 rem für eine Zeile, größer ergibt 3 Zeilen. Lösung: Überschrift über beide Spalten.
- Am Handy wurde das Hero-Bild nur als Punkt gezeichnet: `.hero__bild{align-self:center}` aus dem PC-Gitter macht das Element im Flex-Spaltenlayout 0 px breit. Am Handy `align-self:stretch`.
- Der Kaufknopf brach am Handy in zwei Zeilen ("IN DEN" und "WARENKORB"). Mit `white-space:nowrap`, 16 px Innenabstand und 2 rem Schrift passt er in 358 px.
- Reihenfolge am Handy: mit Text vor dem Preis lag der Knopf bei etwa y 1118, 270 px unter dem ersten Bildschirm. Jetzt Bild, Preis, Knopf, danach Sterne und Text (Knopf bei y 762 bis 826). Auf 360 mal 740 px liegt er knapp darunter (oben bei 758).
- Der Handy-Zuschnitt (`slice` bei Seitenverhältnis 640/470) schneidet oben und unten rund 65 Einheiten ab. Das Gerät liegt deshalb mit `translate(24 -4)` hoch genug, nur die Gemüse-Spitzen sind leicht angeschnitten.
- Die Kopfzeile passt einzeilig bis herunter auf 901 px (gemessen, ab 1020 px mit kleineren Links und weniger Innenabstand). Darunter ist sie zweizeilig (Logo und Warenkorb oben, Links als Streifen). Bei 721, 740, 899, 900, 901, 920 und 960 px gemessen kein Überlauf.
- Messung des Störstreifens: Rampen zählen mit. Mit 142 ms lag er nah an 150 ms, nach dem Kürzen sind es 118 ms. Immer über `getAnimations()[0].currentTime` abtasten, nicht schätzen.
- `calc(var(--stoer-y) + 30px)` in `@keyframes` funktioniert in Chromium. Die Höhe wird nach jedem Durchlauf in `animationiteration` neu gesetzt, ohne JS bleibt sie bei 32vh.
- Das Rauschbild liegt als Daten-SVG in einer Variablen. `#` muss als `%23` stehen, `stitchTiles='stitch'` verhindert Kanten beim Wiederholen.
- Ohne `<link rel="icon">` meldet das Prüfskript einen 404-Fehler. In der Demo steht `href="data:,"`.
- Die Sterne mit Teilfüllung (4,6) nutzen einen Verlauf bei 60 %, das genügt als Anzeige.

## Anwenden
1. `vorlage/style.css` nach `assets/style.css` des Shops kopieren. Farben nur in `:root` ändern und die Rollen beibehalten (Magenta Gefühl, Cyan Fakten, Gelb nur Kaufknopf).
2. Schriften aus `../design-vorlagen/fonts/` kopieren: `VT323-400.woff2`, `IBMPlexMono-400.woff2`, `IBMPlexMono-600.woff2` samt `VT323-LICENSE.txt` und `IBMPlexMono-LICENSE.txt`. Die `@font-face`-Zeilen auf den neuen Pfad stellen, `font-display:swap` lassen.
3. Klassen der Demo: `.stoerung` (ein leeres `div` direkt unter `<body>`), `.kopf .logo .nav .korb .korb__zahl`, `.hero .hero__kopf .hero__text .hero__bild .eyebrow .untertitel .bewertung .sterne .preisblock .preis .cta`, `.szene .szene__bild .osd .osd--play .osd--zeit .osd--rec .osd--stop .zaehler .ikon .ikon--play .ikon--rec .ikon--stop .spur .spur--breit`, `.zahlen .kachel .zahl`, `.karten .karte .symbol`, `.schritte .schritt .schritt__nr`, `.stimmen .stimme .marke`, `.hinweis`, `.fuss`.
4. Passend zu den Haken des Skills `ein-produkt-shop`: Die Demo hat eigene Namen. Im Shop entweder die Selektoren im CSS ergänzen (zum Beispiel `.cta,.knopf{...}`, `.karte,.kachel{...}`, `.korb`) oder im HTML umbenennen. Die Schritte zum Wechsel (Schriften, `style.css`, Logo, Hintergrund, Favicon, Vorschaubild) stehen in `../design-vorlagen/references/umstellen.md`. Dort `WELT` leer lassen (Grund und Scanlines kommen aus dem CSS), das Logo als reinen Text in VT323 setzen und `theme-color` auf #0b0a2a stellen.
5. `script.js` mitnehmen (Bandzähler, Störstreifen-Höhe, Warenkorb-Zähler). Ohne das Skript bleibt die Seite vollständig lesbar, der Zähler steht dann auf 00:00:42.
6. Hero-Bild neu zeichnen: im SVG-Raum 640 mal 600 Himmel, Sonne und Gitterboden übernehmen, die Gruppe `translate(24 -4) scale(.9)` mit dem Produkt ersetzen. Inhalt zwischen y 50 und 545 halten, damit der Handy-Zuschnitt nichts abschneidet und die Bildschirmanzeige oben und unten frei bleibt. Keine gelben Teile in der Zeichnung (Gelb gehört dem Kaufknopf).
7. Danach prüfen: H1 bei 1100, 1280, 1440 und 1920 px (höchstens 2 Zeilen), Kopfzeile bei 720 bis 900 px, Kaufknopf im ersten Bildschirm am Handy, Kontrast mit Scanline-Abzug, Tab-Fokus, Störstreifen abtasten (höchstens 150 ms, alle 8 s), reduzierte Bewegung (0 Endlos-Animationen, Zähler steht), kein waagerechter Überlauf bei 390, 820 und 1280 px.

## Dateien
- `vorlage/demo.html` (HORTA-Startseite, 18 KB)
- `vorlage/style.css` (18 KB)
- `vorlage/script.js` (Bandzähler, Störstreifen-Höhe, Warenkorb-Zähler, 2 KB)
- Schriften: `../design-vorlagen/fonts/VT323-400.woff2`, `IBMPlexMono-400.woff2`, `IBMPlexMono-600.woff2`
