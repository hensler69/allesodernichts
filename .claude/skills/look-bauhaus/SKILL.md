---
name: look-bauhaus
description: Der Look "Bauhaus" ist Geometrie und Komposition. Nur Kreis, Quadrat und Dreieck in Rot, Gelb, Blau und Schwarz auf Elfenbein, Flächen statt Konturen, kein Schatten, strenges 12-Spalten-Raster, asymmetrisch, mit dicken schwarzen Balken, einer um 90 Grad gedrehten Nebenzeile und einem Hero-Gerät aus Grundformen. Verwenden bei "Bauhaus-Look", "Bauhaus", "Grundformen", "Kreis Quadrat Dreieck", "Primärfarben", "geometrisches Plakat", "bauhaus design", "geometric poster style", "Design-Vorlage bauhaus", wenn ein Ein-Produkt-Shop klar, grafisch und gestaltet wirken soll (Küchengeräte, Werkzeug, Lampen, Möbel, Schreibwaren) oder wenn Looks verglichen werden. Nicht verwechseln mit Neo-Brutalism (dicke Konturen und harte Schatten, design-vorlagen/references/look-neo-brutalism.md).
---

# Look: Bauhaus

Gebaut und getestet als Startseite des HORTA-Shops (elektrischer Gemüseschneider). Lauffähige Demo: `vorlage/demo.html` mit `vorlage/style.css` und `vorlage/script.js`. Ansehen: im Ordner `.claude/skills` einen Server starten (`python3 -m http.server 8101`) und `http://localhost:8101/look-bauhaus/vorlage/demo.html` öffnen.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt eine klare, einfache Form hat, die sich aus Kreis, Quadrat und Dreieck zusammensetzen lässt, und wenn die Seite ordentlich, grafisch und selbstbewusst wirken soll: Küchengeräte mit Sockel, Schacht und Schüssel, Werkzeug, Lampen, Möbel und Wohnobjekte, Schreibwaren, Uhren, Bausteinspielzeug. Er trägt auch Produkte ohne Foto, weil das Hero-Bild gezeichnet ist.
Passt nicht, wenn das Produkt nur mit einem echten Foto überzeugt (Kleidung, Kosmetik, Essen) oder wenn Wärme, Weichheit und Luxus verkauft werden sollen (Baby, Pflege, Schmuck). Ein Foto steht zwischen den harten Flächen fremd da. Rot ist gleichzeitig Bauhaus-Farbe und Kaufknopf-Farbe, das braucht Disziplin (siehe Verbund-Durchgang).

## Merkmale
- Elfenbein (`#f4efe3`) als Grund, nur Rot, Gelb, Blau, Schwarz als Farben, nur Kreis, Quadrat, Dreieck als Formen. Flächen statt Konturen: kein `box-shadow`, kein Verlauf, keine Weichzeichnung, keine Rundung außer echten Kreisen.
- Strenges 12-Spalten-Raster, asymmetrisch und lückenlos: Funktionskacheln 7/5 und 5/7 Spalten ohne Zwischenraum, Bewertungen 7/5 mit zwei gestapelten Karten rechts, Ablauf als Treppe aus drei Blöcken (je 4 Spalten, Höhen 320, 384, 448 px).
- Dicke schwarze Balken als Trenner und Gerüst: 8 px unter der Kopfzeile, 16 px vor der Zahlenleiste, 12 px breiter Balken neben der Nebenzeile, 96 mal 12 px lange Balken über jeder H2, vierfarbiger Streifen vor der Fußzeile.
- Die Nebenzeile (Eyebrow "Elektrischer Gemüseschneider") steht um 90 Grad gedreht (`writing-mode`) am linken Rand, darunter ein schwarzer Balken bis zum Ende des Hero-Textes. Die H1 bleibt gerade, Jost 900, zwei Zeilen, ein gelber Block hinter "Salat."
- Hero-Gerät aus 21 Grundformen: Quadrat = blauer Sockel, Dreieck = schwarzer Schacht (Spitze auf der Sockelmitte), Kreis = gelber Kegel-Einsatz mit fünf schwarzen Löchern auf dem blauen Quadrat, Halbkreis = schwarze Schüssel mit Gemüsestücken, schwarzer Balken als Tisch.
- Zahlenleiste als Formen mit Zahlen: gelber Kreis (5), blaues Quadrat (800 W), rotes Dreieck (27 cm), schwarzes Quadrat (8 bis 15), im Zickzack (gerade Kacheln tragen die Beschriftung oben).
- Der Kaufknopf ist ein rotes Rechteck mit einem schwarzen Quadrat am Ende, darin ein elfenbeinfarbenes Dreieck als Pfeil. Im ersten Bildschirm ist er die einzige rote Fläche.
- Bewertungs-Sterne sind fünf Kreise (der letzte bei 4,6 zu 60 % gefüllt). Kaum Bewegung: ein Einblenden unter 300 ms, der Hero setzt sich in fünf Schritten zusammen.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--elfenbein` | #f4efe3 | Seitengrund (Schwarz darauf 16,5:1), Schrift auf Blau (7,9:1) und Schwarz (16,5:1), Pfeil im Kaufknopf |
| `--schwarz` | #111111 | aller Text auf Hell, Balken, Trichter, Schüssel, Sockel der Zahlenleiste, Fokusring (auf Gelb und Elfenbein 10,4:1 und 16,5:1) |
| `--rot` | #d62828 | Signalfarbe: Kaufknopf. Dazu als Fläche, aber nie anklickbar: ein Dreieck, eine Funktionskachel, ein Streifensegment |
| `--auf-rot` | #fffaf0 | einzige Schrift auf Rot (4,81:1; Elfenbein hätte nur 4,36:1, Schwarz 3,77:1) |
| `--gelb` | #f7b500 | Hervorhebungsfläche: Block hinter "Salat.", Einführungspreis, Kegel-Einsatz, eine Kachel, Hinweisband. Schrift darauf nur Schwarz (10,4:1). Gelb ist nie Textfarbe auf Hell (1,6:1), nur auf Schwarz (10,4:1) bei großen Ziffern |
| `--blau` | #1d3fa8 | Fläche: Sockel, Zahlen-Quadrat, Kachel, Ablauf-Band. Schrift darauf nur Elfenbein (7,9:1), Schwarz fällt mit 2,1:1 durch |
| `--weich` | #3d3d3d | nur Kleingedrucktes auf Elfenbein (9,5:1) |
Zusätzlich `--aus` (Kurve `cubic-bezier(.23,1,.32,1)`) und die Abstandsstufen `--s1` bis `--s6` (8, 16, 24, 40, 64, 96 px). Regel: Schrift unter 24 px (oder unter 18,66 px fett) braucht 4,5:1, deshalb steht auf Rot nur `--auf-rot`.

## Schriften
Dateien aus `../design-vorlagen/fonts/`, drei Stück, eine Familie, 29 KB zusammen:
| Familie | Gewicht | Datei | Wofür |
| --- | --- | --- | --- |
| Jost | 900 | `Jost-900.woff2` | H1, H2, H3 der Kacheln, Preis, Zahlen, Ziffern der Treppe, Logo |
| Jost | 700 | `Jost-700.woff2` | Navigation, Kaufknopf, Sätze in Kacheln und Stufen, Zitate, Beschriftungen, Marke "Beispiel" |
| Jost | 400 | `Jost-400.woff2` | Fließtext (Untertitel, Kleingedrucktes) |
Jost ist eine geometrische Schrift (Futura-Verwandte) und passt zu den Grundformen. Die 900 ist breit: "Weniger schnippeln." braucht bei 77 px etwa 740 px, die Zeile hat 11 Spalten (1054 px). Darum steht die H1 über der ganzen Breite und die Nebenzeile links daneben, und `clamp(2.6rem,6vw,5rem)` hält sie von 600 bis 1920 px bei zwei Zeilen.

## So ist er gebaut
**1. Formen als Flächen, Zahlen skalieren mit der Form.** Jede Form ist ein Quadrat mit `aspect-ratio:1`. Der Kreis bekommt `border-radius:50%`, das Dreieck `clip-path`. Die Zahl nutzt `cqw` (ein Hundertstel der Breite der Form), damit sie in 208 px großen und in 132 px kleinen Formen passt. Gerade Kacheln drehen die Reihenfolge um, damit der Zickzack kein Loch hinterlässt.
```css
.form{width:min(100%,208px);aspect-ratio:1;display:grid;place-items:center;container-type:inline-size}
.form--kreis{background:var(--gelb);border-radius:50%}
.form--dreieck{background:var(--rot);color:var(--auf-rot);clip-path:polygon(50% 0,100% 100%,0 100%);place-items:end center;padding-bottom:12%}
.zahl{font:900 21px/1 "Jost",sans-serif;font-size:21cqw;white-space:nowrap}
.einheit{font-size:max(.5em,1.2rem);font-weight:700}   /* Einheit nie unter 19 px, sonst fällt sie auf Rot durch */
.zk:nth-child(even){flex-direction:column-reverse;justify-content:flex-end}
.zahl__text{min-height:2.6em}
```
```html
<li class="zk zeig"><div class="form form--dreieck"><p class="zahl">27 <span class="einheit">cm</span></p></div><p class="zahl__text">Höhe, passt unter den Hängeschrank</p></li>
```

**2. Gedrehte Nebenzeile mit Balken.** Die Box bleibt beim Drehen gleich groß, darum folgt der Balken dem Text sauber. `rotate(180deg)` lässt den Text von unten nach oben laufen. Die H1 daneben bleibt gerade und braucht kein `writing-mode`.
```css
.neben{grid-column:1;grid-row:1 / span 2;display:flex;flex-direction:column;align-items:center;gap:16px}
.neben__text{writing-mode:vertical-rl;transform:rotate(180deg);font:700 .9375rem/1 "Jost",sans-serif;letter-spacing:.14em;white-space:nowrap}
.neben__balken{flex:1;width:12px;background:var(--schwarz)}
.hell{display:inline-block;background:var(--gelb);padding:.04em .1em .1em;line-height:.92}   /* Block hinter "Salat." */
```

**3. Hero-Gerät aus Grundformen, Farben über Klassen.** Eine SVG mit `viewBox="0 0 480 470"`, jeder Teil eine Gruppe, die Füllungen kommen aus den Farb-Tokens. Die fünf Löcher liegen auf einem Fünfeck (Radius 40, Winkel -90, -18, 54, 126, 198 Grad). Der gelbe Kreis liegt auf dem blauen Quadrat, weil Gelb auf Elfenbein nur 1,6:1 hat. Jede Gruppe setzt sich beim Laden in 240 ms ein (nur `opacity` und `transform`, ohne JavaScript).
```html
<svg class="bild" viewBox="0 0 480 470" role="img" aria-label="Das Gerät aus Grundformen: ...">
  <rect class="f-schwarz" x="0" y="446" width="480" height="24"/>
  <g class="teil t2"><rect class="f-blau" x="36" y="236" width="210" height="210"/></g>
  <g class="teil t1"><polygon class="f-schwarz" points="41,40 241,40 141,236"/><circle class="f-gelb" cx="141" cy="104" r="19"/></g>
  <g class="teil t3"><circle class="f-gelb" cx="141" cy="341" r="76"/><circle class="f-schwarz" cx="141" cy="301" r="11"/><circle class="f-schwarz" cx="179" cy="329" r="11"/><circle class="f-schwarz" cx="164.5" cy="373.5" r="11"/><circle class="f-schwarz" cx="117.5" cy="373.5" r="11"/><circle class="f-schwarz" cx="103" cy="329" r="11"/></g>
  <g class="teil t4"><path class="f-schwarz" d="M264 342A104 104 0 0 0 472 342Z"/><rect class="f-schwarz" x="254" y="332" width="228" height="12"/></g>
</svg>
```
```css
.f-gelb{fill:var(--gelb)} .f-blau{fill:var(--blau)} .f-schwarz{fill:var(--schwarz)}
@media (prefers-reduced-motion:no-preference){
  @keyframes setzen{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
  .teil{animation:setzen 240ms var(--aus) backwards}
  .t3{animation-delay:60ms}.t1{animation-delay:120ms}.t4{animation-delay:180ms}.t5{animation-delay:240ms}
}
.hero__bild{grid-column:8 / -1;grid-row:2;align-self:start;margin-top:calc(var(--s5) * -1)}   /* zieht das Bild neben die zweite H1-Zeile */
```

**4. Lückenloses, asymmetrisches Raster und die Treppe.** Zwölf Spalten ohne `gap`, Kacheln greifen 7/5 und 5/7 ineinander. Die Treppe steht auf dem unteren Rand des blauen Bands, ihre Höhen sind Vielfache von 64 px.
```css
.fk-raster{display:grid;grid-template-columns:repeat(12,minmax(0,1fr))}
.fk--a{grid-column:1 / span 7;background:var(--gelb)}   .fk--b{grid-column:8 / span 5;background:var(--rot);color:var(--auf-rot)}
.fk--c{grid-column:1 / span 5;background:var(--blau);color:var(--elfenbein)}   .fk--d{grid-column:6 / span 7;background:var(--schwarz);color:var(--elfenbein)}
.treppe{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));align-items:end}
.stufe{grid-column:span 4}
.stufe--1{min-height:320px}.stufe--2{min-height:384px}.stufe--3{min-height:448px}
@media (max-width:700px){ .treppe{display:block} .stufe--1{margin-right:var(--s5)} .stufe--2{margin:0 var(--s3)} .stufe--3{margin-left:var(--s5)} }  /* Handy: versetzt statt Treppe */
```

**5. Kaufknopf aus zwei Flächen, Drücken ohne Schatten.** Rotes Rechteck mit schwarzem Quadrat, der Pfeil ist ein `clip-path`-Dreieck. Drücken skaliert auf 97 % in 100 ms, Loslassen dauert 180 ms, der Pfeil rückt nur bei Mausbedienung 4 px vor.
```css
.cta{display:flex;align-items:stretch;width:100%;max-width:440px;min-height:72px;border:0;padding:0;background:none;color:var(--auf-rot);font:700 1.375rem/1.1 "Jost",sans-serif;transition:transform 180ms var(--aus)}
.cta__text{flex:1;display:flex;align-items:center;padding:0 var(--s3);background:var(--rot)}
.cta__pfeil{flex:0 0 72px;display:grid;place-items:center;background:var(--schwarz)}
.cta__pfeil::before{content:"";width:22px;height:26px;background:var(--elfenbein);clip-path:polygon(0 0,100% 50%,0 100%);transition:transform 180ms var(--aus)}
.cta:active{transform:scale(.97);transition-duration:100ms}
@media (hover:hover) and (pointer:fine){ .cta:hover .cta__pfeil::before{transform:translateX(4px)} }
```
```html
<button class="cta" type="button"><span class="cta__text">In den Warenkorb</span><span class="cta__pfeil" aria-hidden="true"></span></button>
```

## Pro
- Leicht: 29 KB ohne Schriften (HTML 12,8, CSS 15,0, JS 1,1), Schriften 29 KB (drei Dateien, eine Familie), 6 Anfragen, kein Bild, keine Bibliothek, kein `requestAnimationFrame`, kein Schatten, kein Weichzeichner. Das Gerät braucht kein Foto: 21 Formen und 5 Farbklassen ergeben die ganze Zeichnung, scharf in jeder Größe.
- Lesbar: 66 Textstellen bei 390, 820 und 1280 px gemessen, keine fällt durch. Niedrigster Wert 4,81:1 (Kaufknopf), alle anderen Texte mindestens 7,86:1. Fließtext steht schwarz auf Elfenbein mit 16,5:1.
- Der Kaufknopf liegt am PC bei 610 bis 682 px (Fenster 800 hoch) und am Handy bei 756 bis 828 px (844 hoch), also im ersten Bildschirm. Dort ist er die einzige rote Fläche, das Hero-Bild kommt ohne Rot aus.
- Die H1 hat von 600 bis 1920 px zwei Zeilen, bei 360 und 390 px drei. Kein waagerechter Überlauf in 13 Breiten von 360 bis 1920 px. Die Kopfzeile bricht zwischen 720 und 999 px sauber in zwei Zeilen um (Logo und Warenkorb oben, schwarze Navigationsleiste darunter).
- Raster lückenlos: Funktionskacheln und Bewertungen haben von 720 bis 1920 px 0 px² Lücke (gemessen als Umriss minus Summe der Kacheln).
- Ohne JavaScript ist alles sichtbar (19 Einblend-Elemente getestet), bei reduzierter Bewegung läuft keine Animation (0 gemessen).

## Contra
- Rot hat zwei Rollen. Die rote Funktionskachel (5 Spalten mal 320 px, 160.000 px²) ist sechsmal so groß wie die rote Fläche des Kaufknopfs (26.500 px²). Der Knopf bleibt nur im ersten Bildschirm die einzige rote Fläche. Wer "Signalfarbe nur am Kaufknopf" streng will, muss eine der vier Farbflächen aufgeben.
- Zwei Kontrastfallen. Elfenbein auf Rot hat nur 4,36:1, darum gibt es ein zusätzliches Warmweiß (`#fffaf0`, 4,81:1) und die Regel "kleine Schrift auf Rot nur in diesem Weiß". Gelb auf Elfenbein hat 1,6:1: gelbe Flächen haben am Seitengrund keine harte Kante, der Kegel-Einsatz wirkt nur auf dem blauen Quadrat, Gelb als Schriftfarbe ist tabu.
- Am Handy kommt das Hero-Bild erst nach dem Kaufknopf (Oberkante bei 852 px von 844), ein Bild im ersten Bildschirm hätte den Knopf nach unten geschoben. Bei 360 px Breite endet der Knopf bei 856 px, also knapp unter dem Rand.
- Handarbeit: Das Gerät besteht aus 21 Formen mit Koordinaten von Hand (das Fünfeck der Löcher ist gerechnet). Für ein anderes Produkt muss die Zeichnung neu entstehen, die vier Funktionssymbole ebenfalls.
- Bewertungs-Sterne sind Kreise. Das passt zum Look, ob Kunden sie so schnell als Wertung lesen wie Sterne, ist nicht getestet. Die gedrehte Nebenzeile ist schwerer zu lesen und trägt deshalb nur den kurzen Satz "Elektrischer Gemüseschneider".
- Nur in Chromium getestet. `cqw`-Einheiten und `clip-path` sind in Safari und Firefox offen. Ohne `cqw` fiele die Zahl auf 21 px und wäre in den Formen klein.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Das einzige Rot im ersten Bildschirm ist der Knopf mit schwarzem Pfeil, aber der Look wirkt kühl und gestaltet statt einladend. |
| Lesbarkeit | 5 | Schwarz auf Elfenbein mit 16,5:1, niedrigster Wert 4,81:1 am Kaufknopf, Gelb nie als Schrift. |
| Handy | 4 | Eigener Entwurf mit versetzten Blöcken und Knopf im ersten Bildschirm, aber das Hero-Bild kommt erst danach und die Kopfzeile ist 100 px hoch. |
| Tempo | 5 | 29 KB, keine Bilder, kein rAF, nur transform und opacity unter 300 ms. |
| Barrierefreiheit | 4 | Fokusring 4 px, Ziele mindestens 44 px, keine Animation bei reduzierter Bewegung, aber gedrehter Text und Sterne als Kreise. |
| Aufwand | 4 | Einfaches CSS ohne Effekte, nur die Zeichnung des Geräts und vier Symbole sind Handarbeit. |
| Risiko | 4 | Nur Chromium getestet und Fotos passen nicht, dafür keine Bibliothek und kein Spezial-CSS außer `cqw` und `clip-path`. |

## Passt besonders zu
Küchengeräte und Haushalt mit klarer Form (Schneider, Mixer, Wasserkocher, Waage), Werkzeug, Lampen und Wohnobjekte, Schreibwaren, Bausteinspielzeug, alles, was sich aus Kreis, Quadrat und Dreieck zeichnen lässt.

## Passt nicht zu
Kleidung, Kosmetik, Essen und alles, was ein Foto braucht. Baby, Pflege und Schmuck, wo Weichheit oder Luxus gefragt ist.

## Stolperfallen
- **Gelber Block hinter "Salat." überlappte die Zeile darüber.** Ein `background` auf einem Inline-Element ist so hoch wie der Zeilenkasten der Schrift. Lösung: `display:inline-block`, `line-height:.92`.
- **Schwarze Navigationsleiste endete 24 px vor dem Rand.** `flex:0 0 100%` mit negativen Rändern ergibt 100 % der Breite minus die Ränder. Richtig: `flex:0 0 calc(100% + 48px)` (am Handy `+ 32px`).
- **Einheit "cm" im roten Dreieck fiel am Handy durch.** 14 px sind kleine Schrift und brauchen 4,5:1, Elfenbein auf Rot hat 4,36:1. Lösung: Einheit mindestens 1,2 rem fett und Warmweiß `--auf-rot`.
- **Versetzte Zahlenkacheln ließen Löcher.** Die Kacheln 2 und 4 um 56 px nach unten zu schieben ergab 5.510 px² leere Fläche. Besser: gerade Kacheln mit der Beschriftung oben (`column-reverse`) und `min-height:2.6em` für die Beschriftung, dann bleiben 1.950 px².
- **Das Hero-Bild ließ rechts neben "Mehr Salat." ein leeres Feld.** Das Bild startete in der zweiten Rasterzeile. Mit `margin-top:-64px` rückt es neben die zweite H1-Zeile, ohne die erste zu berühren.
- **Das Dreieck mit `clip-path` schneidet Text ab.** Die Zahl muss im unteren Drittel sitzen (`place-items:end center`, `padding-bottom:12%`), dort ist das Dreieck breit genug.
- **Gelber Streifen vor der Fußzeile verschmolz mit dem gelben Hinweisband.** Davor kommt jetzt ein 16 px hoher schwarzer Streifen (`padding-top` an der Fußzeile).
- **Kegel-Kreis in Gelb auf Elfenbein war blass.** Er liegt jetzt vollständig auf dem blauen Sockel.
- **Kopfzeile zwischen 720 und 999 px:** einzeilig braucht sie etwa 910 px Inhaltsbreite (Logo 187, Navigation 542, Warenkorb 130, dazu Lücken). Darum ab 999 px abwärts zwei Zeilen mit schwarzer Leiste, ab 600 px abwärts ein Raster mit 3 plus 2 Feldern.
```css
@media (max-width:999px){ .nav{order:3;flex:0 0 calc(100% + 48px);margin-inline:-24px;background:var(--schwarz);color:var(--elfenbein)} .nav li{flex:1} }
@media (max-width:600px){ .nav ul{display:grid;grid-template-columns:repeat(6,1fr);gap:2px;background:var(--elfenbein)} .nav li{grid-column:span 2;background:var(--schwarz)} .nav li:nth-child(n+4){grid-column:span 3} }
```

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Die Demo wurde zuerst lauffähig gebaut und geprüft, dann folgten drei Durchgänge in dieser Reihenfolge, nach jedem lief das Prüfskript und die Bildschirmfotos wurden angesehen. Von impeccable ist nur die `SKILL.md` lesbar, das Startskript und die Dateien unter `reference/` fehlen. Darum wurde dort mit der `SKILL.md` und den Kurzregeln gearbeitet.
| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Freie Abstände (36, 56, 72, 14, 12, 28, 20 px), Hero 40 und 80 px, Zahlenleiste 56 und 80 px, dazu 176 px Abstand zwischen Zahlenleiste und Funktionen | Nur sechs Stufen als Variablen `--s1` bis `--s6` (8, 16, 24, 40, 64, 96 px), Zahlenleiste ohne Unterpolster, Abstand zu den Funktionen 96 px | Großzügige, gleichmäßige Abstandsstufen, jeder Abschnitt ein Kapitel mit gleichem Abstand davor |
| gpt-taste | Hero-Bild begann in der zweiten Rasterzeile (Oberkante 311 px bei 1280 px Breite), rechts neben "Mehr Salat." blieb ein leeres Feld von etwa 120 px Höhe | `margin-top:-64px`, Oberkante 243 px, Bild und Knopf (610 bis 682 px) im ersten Bildschirm von 800 px | Blickführung Aufmerksamkeit (H1 und Bild), Interesse (Untertitel, Sterne), Verlangen (Preis), Handlung (Knopf) ohne tote Fläche |
| gpt-taste | Zahlenkacheln 2 und 4 um 56 px versetzt, gemessene Lücke 5.510 px² | Gerade Kacheln mit Beschriftung oben (`column-reverse`), Lücke 1.950 px² (minus 65 Prozent) | Lückenloses Raster ohne leere Löcher, Zickzack bleibt erhalten |
| gpt-taste | Treppenhöhen 300, 380, 460 px (Differenz 80, Lücke über den Stufen 9.600 px²) | 320, 384, 448 px (Vielfache von 64, Lücke 7.680 px²) | Gleichmäßige Stufen in der Abstandsleiter, weniger tote Fläche |
| impeccable | Schrift auf Rot in Elfenbein, 4,36:1, die Einheit "cm" (14 px) fiel am Handy durch (1 von 66 Texten) | `--auf-rot` `#fffaf0` mit 4,81:1 an Knopf, roter Kachel und Dreieck, Einheit mindestens 19 px fett, 0 von 66 Texten fallen durch (bei 390, 820, 1280 px) | Kontrast gemessen statt geschätzt, kleine Schrift auf Rot bekommt eine eigene Regel |
| impeccable | Preis 72 px fast so groß wie die H1 (77 px, Verhältnis 0,94), Preis und Chip in zwei Reihen, Knopf bei 692 px | Preis 56 px (Verhältnis 0,73), Preis und gelber Chip in einer Reihe, Knopf bei 610 px | Klare Hierarchie, die H1 ist der Blickfang des Bildschirms, der Knopf das auffälligste Bedienelement |
| impeccable | Rot an fünf Stellen (Knopf, Dreieck, Kachel, Streifen, Etikett am Paket) | Das Etikett am Paket ist Elfenbein, vier Stellen übrig, im ersten Bildschirm bei 1280 mal 800 ist der Knopf die einzige rote Fläche (per Abfrage der Hintergrundfarben bestätigt) | Jede Farbe hat eine Rolle, die Signalfarbe nur am Knopf und in wenigen kleinen Flächen weiter unten |
| impeccable | Textmarkierung im Browser-Standard, Fokusring ungeprüft | `::selection` in Gelb mit Schwarz (10,4:1), Fokus per Tab an allen 13 Zielen geprüft: 4 px schwarz, in der schwarzen Fußzeile und Navigationsleiste gelb | Auswahl in einer Rollenfarbe, sichtbarer Fokus auf jedem Grund |
| emil-design-eng | Navigation: `transition: background .2s` (Kurve `ease`), Hover ohne Medienabfrage, Farbe animiert | Hover nur unter `@media (hover:hover) and (pointer:fine)`, Farbe wechselt sofort, nur `transform` wird animiert | Touch-Geräte lösen kein falsches Hover aus, nur `transform` und `opacity` animieren |
| emil-design-eng | Kaufknopf ohne `:active` (`transition: transform .2s` ohne Wirkung), Logo, Warenkorb, Navigation und Fußlinks ohne Druckzustand | `:active { transform: scale(.97) }` an allen sechs drückbaren Elementen, Drücken 100 ms, Loslassen 180 ms mit `cubic-bezier(.23,1,.32,1)`, Pfeil im Knopf rückt bei Maus 4 px vor | Jedes drückbare Element antwortet sofort, eigene Kurve statt `ease` |
| emil-design-eng | Einblenden mit `.25s ease`, alle 19 Elemente gleichzeitig | 240 ms mit starker Ease-out-Kurve, Staffel 60 ms (0, 60, 120, 180) bei Kacheln, Stufen und Bewertungen, Start bei 16 px Versatz und Deckkraft 0 (kein `scale(0)`) | Gestaffeltes Einblenden wirkt natürlicher, alle UI-Animationen unter 300 ms |
| emil-design-eng | Hero stand sofort da, Warenkorb-Zähler sprang ohne Rückmeldung | Hero setzt sich aus fünf Gruppen zusammen (je 240 ms, Staffel 60 ms, nur `opacity` und `translateY`, einmal, ohne JavaScript), Zähler pulsiert per Transition auf 125 Prozent in 160 ms (unterbrechbar) | Seltene Erstansicht darf Freude machen, Zustandswechsel braucht Rückmeldung |
Geprüft und ohne Änderung: kein `transition: all`, nichts startet bei `scale(0)`, kein `ease-in`, keine Weichzeichnung, kein `scroll-behavior:smooth` (Tastatursprünge über Navigation und Sprunglink laufen ohne Animation), `:focus-visible` erscheint ohne Übergang.
Konflikte: Die Regeln des Auftrags (genau ein Kaufknopf, Eyebrow, Preis-Chip und Zahlen im Hero, Verbotsliste, Barrierefreiheit) gehen vor. gpt-taste verbietet Pill-Tags und Kennzahlen im Hero, verlangt Bilder von `picsum.photos`, GSAP und einen großen Kaufknopf in der Fußzeile, das steht im Widerspruch zu Auftrag und Look (keine Bilder, keine Bibliothek, ein Knopf), darum bleiben Eyebrow, rechteckiger Preis-Chip und eine Fußzeile ohne zweiten Knopf. impeccable verlangt die Signalfarbe nur am Knopf, Bauhaus braucht Rot als eine von vier Farben: gelöst mit einer Rot-Regel (Knopf allein im ersten Bildschirm, rote Flächen weiter unten klein und nie anklickbar, in der Tabelle festgehalten). emil-design-eng würde bei reduzierter Bewegung Deckkraft und Farbe behalten, der Auftrag will ein ruhiges, vollständiges Standbild, darum läuft dann gar keine Animation und kein Übergang.

## Anwenden
1. Neuer Shop: `ein-produkt-shop` bis zur Gestaltungsphase, dann `vorlage/style.css` nach `assets/style.css` kopieren und `vorlage/script.js` dazulegen.
2. Schriften: `Jost-900.woff2`, `Jost-700.woff2`, `Jost-400.woff2` und `Jost-LICENSE.txt` aus `../design-vorlagen/fonts/` nach `assets/fonts/` kopieren und die drei `@font-face`-Zeilen am Dateianfang auf den neuen Pfad ändern.
3. Farben nur in `:root` ändern. Rollen beibehalten: `--rot` nur Kaufknopf (und wenige kleine Flächen weiter unten), `--auf-rot` einzige Schrift auf Rot, `--gelb` nie als Schriftfarbe auf Hell, Schrift auf Blau nur Elfenbein. Nach jeder Änderung Kontrast messen (Text mindestens 4,5:1, Schrift ab 24 px oder 18,66 px fett mindestens 3:1).
4. Hero neu zeichnen: Das Produkt in Grundformen zerlegen (rundes Teil = Kreis, Körper oder Sockel = Quadrat, Spitze oder Trichter = Dreieck, Gefäß = Halbkreis), etwa 25 Formen als Obergrenze, einen schwarzen Balken als Tisch darunter, Gelb nie direkt auf Elfenbein, das Gerät muss als Produkt erkennbar bleiben. Funktionssymbole und Zahlenformen dazu passend setzen.
5. Klassen der Vorlage: `.huelle`, `.kopf`, `.kopf__innen`, `.logo`, `.nav`, `.korb`, `.zaehler`, `.hero__raster`, `.neben` (`__text`, `__balken`), `.zeile`, `.hell`, `.hero__text`, `.hero__bild`, `.bild` mit `.teil .t1` bis `.t5` und `.f-rot/-gelb/-blau/-schwarz/-elfenbein`, `.lead`, `.bewertung`, `.sterne`, `.kauf`, `.preis` (`__betrag`, `__aktion`, `__fein`), `.cta` (`__text`, `__pfeil`), `.zahlen`, `.zahlen__liste`, `.zk`, `.form--kreis/--quadrat/--dreieck/--schwarz`, `.zahl`, `.einheit`, `.abschnitt`, `.fk-raster`, `.fk--a` bis `.fk--d`, `.fk__sym`, `.ablauf`, `.treppe`, `.stufe--1` bis `.stufe--3`, `.stufe__nr`, `.st-raster`, `.st--a` bis `.st--c`, `.marke`, `.hinweis`, `.paket`, `.fuss`, `.fuss__farben`, `.zeig` (Einblenden), `.springen`.
6. Zu den Haken des Skills `ein-produkt-shop`: Die Klassennamen in HORTA (`.glas`, `.knopf`, `.leise-knopf`, `.kachel`, `.schritt`, `.option`, `.frage`, `.korb`, `.kasse`) heißen hier anders. Beim Umstellen `.glas` auf eine Fläche (`.fk`, `.st`, `.stufe`), `.knopf` auf `.cta`, `.kachel` auf `.zk` und `.schritt` auf `.stufe` abbilden. Reihenfolge, Generator-Änderungen (Logo im Look neu zeichnen, `WELT` leer lassen, `theme-color` auf `#f4efe3`, Favicon aus Kreis, Quadrat und Dreieck) und was nie vom Look abhängt: `../design-vorlagen/references/umstellen.md`.
7. Prüfen: Bildschirmfotos PC, Tablet und Handy, Überlauf bei 390, 820 und 1280 px, Kopfzeile zwischen 720 und 900 px, H1 bei 1440 px (höchstens zwei Zeilen), Knopf am Handy im ersten Bildschirm, Kontrast aller Texte, Tab durch alle Ziele, reduzierte Bewegung, Safari und Firefox (`cqw`, `clip-path`).

## Dateien
- `vorlage/demo.html`: HORTA-Startseite im Look (alle Texte laut Vorgabe).
- `vorlage/style.css`: komplettes Stylesheet mit `@font-face`, Farb- und Abstands-Tokens, Raster, Formen, Hero-Zeichnung, Kaufknopf, Handy-Entwurf, Bewegung und reduzierter Bewegung.
- `vorlage/script.js`: Einblenden beim Scrollen, Warenkorb-Zähler im Beispiel.
- `../design-vorlagen/fonts/`: Jost 400, 700, 900 (nur lesen, nicht verändern).
- `../design-vorlagen/references/umstellen.md`: Ablauf zum Umstellen eines bestehenden Shops.
