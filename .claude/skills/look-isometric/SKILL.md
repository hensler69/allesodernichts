---
name: look-isometric
description: Der Look "Isometric" (isometrische Illustration) ist eine aufgeräumte Miniaturwelt aus Blöcken in 30-Grad-Projektion auf warmem Creme, mit Salbei, Pfirsich und Blau in je drei Tonstufen und einem orangen Kaufknopf als einziger Signalfarbe. Der Hero ist eine Küchenarbeitsplatte als Iso-Szene, die eine kleine JavaScript-Funktion aus Quadern zusammensetzt. Verwenden bei "Isometric-Look", "isometrisch", "Iso-Illustration", "Miniaturwelt", "Blockwelt", "isometric design", "isometric illustration", "Design-Vorlage isometric", wenn ein Ein-Produkt-Shop freundlich, ordentlich und erklärend wirken soll (Küche, Haushalt, Werkzeug, Geräte mit sichtbarem Aufbau) oder wenn ein Hero aus gezeichneten Blöcken statt aus Fotos gebaut wird.
---

# Look: Isometric

Gebaut und getestet als Startseite des HORTA-Shops (elektrischer Gemüseschneider). Lauffähige Demo: `vorlage/demo.html` mit `vorlage/style.css` und `vorlage/script.js`. Ansehen: im Ordner `.claude/skills` einen Server starten (`python3 -m http.server 8101`) und `http://localhost:8101/look-isometric/vorlage/demo.html` öffnen.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt aus erkennbaren Teilen besteht und die Seite erklären soll, wie es aufgebaut ist und was es tut: Küchengeräte, Haushalt, Werkzeug, Möbel, Zubehör, Lieferpakete. Die Zeichnung ersetzt hier das Produktfoto und zeigt Gerät, Umgebung und Ergebnis in einem Bild.
Passt nicht, wenn Kunden ein echtes Foto des Produkts erwarten (Mode, Schmuck, Kosmetik, Lebensmittel zum Anschauen) oder wenn das Produkt Luxus und Strenge verkaufen soll. Die Welt wirkt spielerisch und genau, aber nicht edel.

## Merkmale
- Grund ist warmes Creme (`#f6f3ec`). Alle Flächen sind flach, ohne Verläufe und ohne Weichzeichner. Tiefe entsteht nur durch drei Tonstufen je Farbe.
- Hero: eine Küchenarbeitsplatte als Iso-Szene in SVG, 54 Blöcke und 150 Polygone, erzeugt von der Hilfsfunktion `box(x, y, z, breite, tiefe, hoehe, farbe)`. Jeder Block hat drei Flächen: oben hell, links mittel, rechts dunkel.
- Die Szene besteht aus Unterschrank, Arbeitsplatte, Gerät (dunkler Sockel, Glasschacht mit Gurke, Kegel-Einsatz in drei Stufen), Schüssel mit Gemüsewürfeln, Brett, fünf gestapelten Einsätzen und einer Pflanze.
- Beim Laden setzen sich die Blöcke von oben ein (`transform` und `opacity`, 260 ms je Block, 18 ms Staffel, fertig nach 1,17 s). Mit reduzierter Bewegung steht die Szene sofort komplett.
- Nur die Zeichnung ist isometrisch. Text, Raster und Kacheln bleiben gerade. Es gibt keinen schrägen Text.
- Zahlenleiste, Funktionen, Ablauf, Bewertungen und der China-Hinweis sind gerade Kacheln ("Plattformen") mit dicker Unterkante in der dunklen Tonstufe. Bei Maus-Hover hebt sich die Fläche um 6 px.
- Jede Kachel trägt ein kleines Iso-Symbol (12 Stück, alle aus derselben Funktion `box()`), das sich einsetzt, sobald die Kachel ins Bild kommt.
- Der Kaufknopf ist ein orange Block mit dunkler Kante. Beim Drücken sinkt die Fläche 5 px in die Kante, dazu `scale(.97)`.
- Hintergrund des Heros: ein feines Iso-Gitter (Linien bei 30 und 150 Grad), zum Rand hin ausgeblendet.

## Farben
Rollen: Salbei steht für Gemüse und Zustimmung, Pfirsich für Wärme und Lieferung, Blau für Technik und Ablauf, Papier für Neutrales. Die Stufe 2 (links) kommt nur in den Zeichnungen vor (`TON` in `script.js`).
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #f6f3ec | Seitengrund, Kopfzeile |
| `--grund-dunkel` | #e6e0d1 | Linie unter der Kopfzeile |
| `--papier` | #fffdf8 | neutrale Kachel, Kartons und Schüssel in der Zeichnung (Tinte darauf 13,5:1) |
| `--tinte` | #23302b | Text, Überschriften, Gerät, Marken, Ziffern, Fokusring, Fußzeile (Tinte auf Grund 12,4:1) |
| `--tinte-weich` | #47564f | Nebentext, Eyebrow, Preiszeile (7,0:1 auf Grund) |
| `--salbei-1` / `-3` | #d4ecca / #93c585 | Kachelfläche und Kante für Gemüse und Bewertungen (Tinte darauf 10,9:1) |
| `--pfirsich-1` / `-3` | #ffddc7 / #e3a283 | Kachelfläche und Kante für Raspeln und Lieferung (10,7:1) |
| `--blau-0` / `-1` / `-3` | #e4edff / #cddfff / #7aa0e0 | Ablauf-Band, Kachelfläche und Kante für Technik (10,2:1) |
| `--papier-3` | #d4c9ae | Kante der Papier-Kachel |
| `--signal` | #ff7a3d | NUR Kaufknopf und Textauswahl (`::selection`). Text darauf Tinte (5,3:1), Weiß fällt durch (2,6:1) |
| `--signal-dunkel` | #b9480f | Kante des Kaufknopfs |
Tonstufen in der Zeichnung (oben, links, rechts): Salbei `#d4ecca #bfe3b4 #93c585`, Pfirsich `#ffddc7 #ffc9a8 #e3a283`, Karotte `#ffd2b8 #f2b08a #d4916f`, Blau `#cddfff #a9c8ff #7aa0e0`, Nacht `#3d4d46 #2c3a34 #1c2622`, Stahl `#f1f4f2 #d3dad6 #a6b1ab`, Papier `#fffdf8 #ece5d3 #d4c9ae`. Die Kante der Pfirsich-Kachel ist bewusst gedämpft, sonst wirkt sie wie die Signalfarbe.

## Schriften
Dateien aus `../design-vorlagen/fonts/`, zwei Stück, eine Familie, 32 KB zusammen:
| Familie | Gewicht | Datei | Wofür |
| --- | --- | --- | --- |
| Nunito | 800 | `Nunito-800.woff2` | H1 bis H3, Preis, Zahlen, Kaufknopf, Logo, Navigation, Marken, Ziffern |
| Nunito | 600 | `Nunito-600.woff2` | Fließtext |
"Weniger schnippeln." misst 9,7 em. Die H1 ist darum auf `clamp(2.4rem,4.55vw,3.7rem)` gedeckelt, sonst bricht sie in der linken Spalte auf drei Zeilen.

## So ist er gebaut
**1. Die Hilfsfunktion `box()`.** Isometrie ist reine Umrechnung: x läuft nach rechts unten, y nach links unten, z nach oben. Ein Quader wird aus drei Vierecken gebaut. Die Farben sind ein Dreier-Satz `[oben, links, rechts]`. Die gleiche Farbe als Rand (0,8 px) schließt die feinen Lücken zwischen den Flächen.
```js
var C = 0.8660254, H = 0.5, S = 20;                       // cos 30, sin 30, Maßstab
function pt(x, y, z) { return ((x - y) * C * S).toFixed(1) + ',' + (((x + y) * H - z) * S).toFixed(1); }
function box(x, y, z, breite, tiefe, hoehe, farbe) {
  var a = pt(x, y, z + hoehe), b = pt(x + breite, y, z + hoehe), c = pt(x + breite, y + tiefe, z + hoehe), e = pt(x, y + tiefe, z + hoehe);
  var f = pt(x, y + tiefe, z), g = pt(x + breite, y + tiefe, z), i = pt(x + breite, y, z);
  poly([a, b, c, e], farbe[0]); poly([e, c, g, f], farbe[1]); poly([b, c, g, i], farbe[2]);   // oben, links, rechts
}
box(6.5, 1.2, 1, 4.5, 4.0, 4.6, TON.nacht);               // Sockel des Geräts
```
Gezeichnet wird von hinten nach vorn (kleine x + y zuerst) und von unten nach oben. Für lose Würfel sortiert `reihe([...])` nach der Mitte. Die Reihenfolge der Szene ist von Hand festgelegt: Sockel, Schüssel hinten, Kegel, fallende Würfel, Schüssel vorn. Die Gurke kommt vor dem Schachtglas, das Glas hat keine Deckfläche (`offen`), sonst liegt es über der Gurke.

**2. Die Blöcke setzen sich ein.** Jeder Block ist eine Gruppe mit der Nummer `--i`. Die Animation nutzt nur `transform` und `opacity`, eine eigene Kurve und startet nicht bei `scale(0)`.
```css
@keyframes setzen{from{opacity:0;transform:translateY(-30px)}to{opacity:1;transform:translateY(0)}}
.js .szene .blk{animation:setzen 260ms var(--ease-out) both;animation-delay:calc(60ms + var(--i) * 18ms)}
.js .zeig:not(.da) .iso .blk{opacity:0}     /* kleine Symbole setzen sich ein, wenn ihre Kachel sichtbar wird */
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.blk{opacity:1!important;transform:none!important}}
```
`--ease-out` ist `cubic-bezier(.23,1,.32,1)`. Das Gewicht ist klein: 54 Blöcke, 0 `requestAnimationFrame`-Aufrufe, 0 Endlos-Animationen.

**3. Plattform-Kacheln.** Die Kachel ist gerade. Die dicke Kante ist ein Hintergrund-Element, das 10 px tiefer liegt. Beim Hover hebt sich nur die Fläche, die Kante bleibt stehen und wird sichtbar.
```css
.platte{position:relative;display:grid;padding-bottom:var(--dicke)}
.platte::before{content:"";position:absolute;inset:var(--dicke) 0 0 0;border-radius:var(--r);background:var(--kante)}
.platte__flaeche{position:relative;border-radius:var(--r);background:var(--flaeche);box-shadow:inset 0 3px 0 rgba(255,255,255,.55);transition:transform 180ms var(--ease-out)}
.t-salbei{--flaeche:var(--salbei-1);--kante:var(--salbei-3)}
@media (hover:hover) and (pointer:fine){.platte:hover .platte__flaeche{transform:translateY(-6px)}}
```

**4. Kaufknopf als Block.** Die Fläche sinkt beim Drücken in die Kante. Die Regel für `:active` muss nach der für `:hover` stehen, sonst gewinnt der Hover.
```css
.cta{position:relative;display:inline-block;padding:0 0 8px;border:0;background:none;transition:transform 160ms var(--ease-out)}
.cta::before{content:"";position:absolute;inset:8px 0 0 0;border-radius:18px;background:var(--signal-dunkel)}
.cta__flaeche{position:relative;display:flex;align-items:center;gap:12px;min-height:60px;padding:0 36px 0 28px;border-radius:18px;background:var(--signal);color:var(--tinte);transition:transform 200ms var(--ease-out)}
@media (hover:hover) and (pointer:fine){.cta:hover .cta__flaeche{transform:translateY(-4px)}}
.cta:active{transform:scale(.97)}
.cta:active .cta__flaeche{transform:translateY(5px);transition-duration:80ms}
```

**5. Szene am Handy zuschneiden und im Hero größer machen.** Die SVG-Größe folgt dem `viewBox`, den `bauen()` aus den Umrissen berechnet. Am PC ragt die Szene 6 % über die Spalte hinaus, am Handy wird sie in einem festen Rahmen angeschnitten und unten ausgeblendet.
```css
.szene .iso{width:112%;margin-inline:-6%}
@media (max-width:640px){
  .szene{aspect-ratio:358 / 224;overflow:hidden;mask-image:linear-gradient(to bottom,#000 84%,transparent)}
  .szene .iso{position:absolute;width:120%;margin:0;left:-18%;top:-9%}
}
```
Ohne JS erscheint kein `.js` am `<html>`, dann blendet `html:not(.js) .iso{display:none}` die leeren Zeichenflächen aus.

## Pro
- Sehr eigenständig: Block-Welt in Salbei, Pfirsich und Blau sieht weder nach Standardvorlage noch nach Foto-Shop aus. Das Gerät ist als Modell mit Kegel, Schacht und Schüssel sofort lesbar.
- Text steht nie auf der Zeichnung, sondern auf flachen hellen Kacheln. Gemessen: Tinte mindestens 10,2:1, Nebentext 7,0:1, Kaufknopf-Text 5,3:1.
- Der Kaufknopf ist die einzige gesättigte Orange-Fläche und das einzige Bedienelement mit Kante und Druckeffekt. Gemessen: hebt sich beim Hover 4 px, sinkt beim Drücken 5 px mit `scale(.97)`.
- Leicht: 41 KB ohne Schriften (HTML 12,8 KB, CSS 16 KB, JS 13,2 KB), 32 KB Schriften, 5 Anfragen. Kein Weichzeichner, kein Filter, kein `requestAnimationFrame`, 0 Endlos-Animationen.
- Eine Funktion für alles: Hero und alle 12 kleinen Symbole nutzen `box()`. Ein neues Symbol sind 5 bis 12 Zeilen. Die Zeichnung bleibt als SVG scharf und skaliert über den `viewBox`.
- Raster ohne Lücken: 7/5, 5/7 und 1+2 mit `grid-auto-flow:dense`, die Zeilenhöhen waren bei 901, 1000, 1280, 1440 und 390 px gleich (gemessen). Die H1 hat bei 901 bis 1440 px zwei Zeilen.

## Contra
- Hoher Aufwand für die Hero-Szene: Koordinaten und Zeichenreihenfolge sind von Hand gesetzt. Es gibt keine automatische Tiefensortierung (nur `reihe()` für lose Würfel). Eine falsche Reihenfolge zeigt eine Fläche an der falschen Stelle. Für jedes neue Produkt ist eine neue Szene mit etwa 50 Blöcken nötig.
- Die Zeichnungen entstehen erst im Browser. Ohne JavaScript bleibt die Hero-Fläche leer (nur das Iso-Gitter), der Text ist aber komplett lesbar. Suchmaschinen und Link-Vorschauen sehen kein Bild.
- Die Szene ist ein Modell, kein Produktfoto. Wer sehen will, wie das echte Gerät aussieht, findet es hier nicht. Maße, Farben und Form der Zeichnung müssen zum echten Produkt passen, sonst entsteht ein falscher Eindruck.
- Der Handy-Zuschnitt ist ein fester Prozent-Ausschnitt (`width:120%`, `left:-18%`) und passt nur zu dieser Szene. Ändert sich die Szene, muss er neu gesetzt werden. Der Kaufknopf liegt am Handy bei 829 px, ragt also nur knapp in den ersten Bildschirm (844 px) hinein.
- Fünf Farbfamilien mit je drei Stufen sind viele Werte. Ein Karton in Pfirsich auf einer Pfirsich-Kachel verschwand fast, ein gedämpfter Pfirsich-Ton musste sein, damit die Kantenfarbe nicht wie die Signalfarbe wirkt.
- Die Kacheln heben sich bei Hover, sind aber keine Links. Das kann Klickbarkeit vortäuschen. Nur Zeiger fein, am Handy gibt es das nicht. Die Handy-Navigation hat 14 px Schrift mit sehr engem Abstand, damit alle fünf Links in einer Zeile passen.
- Nur in Chromium getestet. Firefox und Safari zeigen CSS-Transformationen auf SVG-Gruppen normalerweise gleich, aber das ist nicht geprüft.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Orange ist die einzige gesättigte Fläche und der Knopf hat einen Druckeffekt, aber die verspielte Block-Welt bringt keinen Foto-Beweis. |
| Lesbarkeit | 5 | Aller Text steht gerade auf flachen hellen Kacheln, gemessen mindestens 7,0:1, das meiste über 10:1. |
| Handy | 4 | Eigener Entwurf mit zugeschnittener Szene, 2x2-Zahlen und Kacheln mit kleinem Symbol, der Kaufknopf liegt knapp unter dem Rand des ersten Bildschirms. |
| Tempo | 4 | 41 KB, kein Filter, keine Dauerbewegung, nur 150 Polygone im Hero, aber auf einem schwachen Handy nicht gemessen. |
| Barrierefreiheit | 4 | Kontrast, Fokusring (Tinte, 3 px), Szene mit Alternativtext am `figure`, reduzierte Bewegung ohne Animation; die Zeichnung fehlt ohne JS. |
| Aufwand | 2 | Die Szene und 12 Symbole sind Handarbeit, jedes neue Produkt braucht eine neue Szene. |
| Risiko | 4 | Keine teuren Effekte, aber Zeichenreihenfolge und Produkttreue der Zeichnung müssen von Hand geprüft werden. |

## Passt besonders zu
Küchen- und Haushaltsgeräte (wie HORTA), Werkzeug und Zubehör mit sichtbaren Teilen, Aufbewahrung, Möbel und Pakete.

## Passt nicht zu
Produkte, die man auf einem echten Foto beurteilen will (Mode, Schmuck, Kosmetik), und strenge Luxus- oder Technikmarken.

## Stolperfallen
- Die H1 hatte bei 1280 px drei Zeilen: 4,1rem Schrift in der 1,04fr-Spalte. "Weniger schnippeln." misst 9,7 em. Gelöst mit Spalten 1,18fr / 1fr und `clamp(2.4rem,4.55vw,3.7rem)`. Danach zwei Zeilen bei 901, 1000, 1280 und 1440 px gemessen.
- Kopfzeile: Logo, fünf Links und Warenkorb passen unter 900 px nicht in eine Zeile (Überlauf 886 > 820 bei 820 px, 441 > 390 am Handy). Lösung: zweizeilige, nicht mitlaufende Kopfzeile bis 900 px, am Handy 14 px Schrift und 2 px Innenabstand. Das Prüfskript fand es, weil die Kopfzeile außerhalb von `main{overflow-x:clip}` liegt.
- Bei 320 und 360 px lief die Navigationszeile über (371 px breit). Unter 380 px darf sie in zwei Zeilen umbrechen. Danach bei 16 Breiten von 320 bis 1920 px kein waagerechter Überlauf.
- Zwischen zwei Flächen blieb eine feine helle Linie. Gelöst mit einem Rand in der Farbe der Fläche (`stroke` gleich `fill`, 0,8 px). Das Glas bekommt bewusst einen weißen Rand, dort sind die Kanten gewollt.
- Glas über einer Gurke: Die Deckfläche des Glases lag über der Gurke, die oben herausragt. Die Deckfläche ist deshalb nur ein Umriss (`offen`).
- `.cta:hover` stand nach `.cta:active` und überstimmte den Druck (gleiche Gewichtung, spätere Regel gewinnt). Gemessen: Beim Drücken blieb die Fläche bei -4 px. Mit `:active` hinter dem Hover sinkt sie auf +5 px.
- Das Paket-Symbol in Pfirsich auf einer Pfirsich-Kachel war kaum zu sehen. Karton jetzt in Papier mit blauem Band.
- Die Pfirsich-Kante (`#ee9d72`) sah aus wie der Kaufknopf. Mit `#e3a283` ist der Knopf wieder das Einzige, was orange ist.
- Der globale Fokusring hatte `border-radius:6px` und änderte beim Fokus die Form von Links. Weggelassen, der Ring folgt jetzt der Form des Elements.
- Am Handy lag der Kaufknopf zuerst bei 964 px. Mit niedrigerer Szene (224 px), kleineren Abständen und H1 `8.6vw` liegt er bei 829 px.
- Das Sechseck vor dem Eyebrow ist ein Stempel-Zeichen im Hero und wurde entfernt.
- Der Rand des Hero-Bildes ragt um 6 % aus der Spalte. `main{overflow-x:clip}` fängt das ab. Immer das Bildschirmfoto ansehen, das Prüfskript meldet Überlauf in `main` nicht.

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge wie vorgegeben, nach jedem Durchgang Prüfskript und Bildschirmfotos. Gelesen wurden die drei SKILL.md. Beim Skill impeccable lag nur die SKILL.md vor (keine `reference/*.md`, kein Startskript), angewendet wurden deshalb seine Kernregeln aus der SKILL.md und dem Auftrag.

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | H1 in 4,1rem, in der Spalte 3 Zeilen bei 1280 px | Spalten 1,18fr / 1fr, `clamp(2.4rem,4.55vw,3.7rem)`, 2 Zeilen bei 901, 1000, 1280, 1440 px (gemessen) | Zwei-Zeilen-Regel, die Überschrift fließt waagerecht |
| gpt-taste | Eyebrow mit Sechseck-Zeichen | schlichte Textzeile in `--tinte-weich` | Stempel-Zeichen im Hero sind verboten |
| gpt-taste | Abschnitte 96 px, Hero oben 40 px | `--sektion: clamp(64px,9vw,128px)` für alle Abschnitte (neue Stufe 128 px), Hero oben 64 px | Große, gleichmäßige Abstandsstufen |
| gpt-taste | Raster 7/5, 5/7 und 1+2 ohne `dense` und ohne Messung | `grid-auto-flow:dense` auf allen drei Rastern, Zeilenhöhen bei 5 Breiten gleich gemessen | Raster ohne Lücken, mathematisch geprüft |
| gpt-taste | Hero-Bild 100 % der Spalte | 112 % mit `margin-inline:-6%`, ragt leicht aus der Spalte | Mehr Gewicht für die Aufmerksamkeit, Blick läuft Bild, Überschrift, Preis, Knopf |
| gpt-taste | Handy: Szene 272 px hoch, Kaufknopf bei 964 px | Szene 224 px mit Ausblendung unten, kleinere Abstände, H1 `8.6vw`, Knopf bei 829 px | Handlung ohne langes Scrollen |
| impeccable | Kachelfarben reihum (Salbei, Pfirsich, Blau, Papier) ohne Bedeutung | Rollen: Salbei Gemüse und Bewertungen, Pfirsich Raspeln und Lieferung, Blau Technik und Ablauf, Papier neutral | Jede Farbe hat eine Rolle |
| impeccable | Pfirsich-Kante `#ee9d72` ähnelte dem Kaufknopf | `#e3a283`, Signal nur Kaufknopf und `::selection` | Ein Blickfang, die Signalfarbe bleibt einmalig |
| impeccable | Kontrast nach Augenmaß | Alle Paare gerechnet: Tinte 10,2 bis 13,5:1, Nebentext 7,0:1, Fußzeile 11,8 und 9,0:1, Tinte auf Orange 5,3:1 (Weiß 2,6:1 fiel durch) | Kontrast gemessen, nicht geschätzt |
| impeccable | Fokusring mit `border-radius:6px` für alle | Ring folgt der Form, Kaufknopf 6 px Abstand, in der Fußzeile Papier auf Tinte, per Tab geprüft | Sichtbarer, passender Fokus |
| impeccable | Karton in Pfirsich auf Pfirsich-Kachel kaum sichtbar, Marke 12,8 px | Karton in Papier mit blauem Band, Marke 13,6 px | Zeichnung und Marke lesbar |
| emil-design-eng | Kein `:active` auf Skip-Link, Warenkorb, Navigation | `:active{transform:scale(.97)}` auf Logo, Navigation, Warenkorb, Fußzeilen-Links, Skip-Link, Kaufknopf; Fläche des Knopfs sinkt 5 px in 80 ms, Loslassen 200 ms | Jedes drückbare Element antwortet, Drücken schnell, Loslassen weich |
| emil-design-eng | `:hover` des Knopfs überstimmte `:active` (gemessen -4 px beim Drücken) | `:active` nach `:hover`, gemessen +5 px | Druckeffekt muss gewinnen |
| emil-design-eng | Hover färbte Navigation in 160 ms um (`background-color`) | nur `transform` und `opacity` animiert, Farbwechsel sofort | Nur Eigenschaften ohne Neuberechnung des Layouts |
| emil-design-eng | Staffel 24 ms je Block (fertig nach etwa 1,5 s), Kacheln erscheinen gleichzeitig | 18 ms je Block (54 Blöcke fertig nach 1,17 s, je Block 260 ms), Symbole 22 ms, Kacheln einer Reihe 50, 100, 150 ms versetzt | Kurze Staffel, nie über 300 ms je Element |
Konflikte: gpt-taste verlangt GSAP, Bilder von picsum, zwei Knöpfe im Hero und Stimmungseffekte, das gilt wegen der Projektregeln (ein Kaufknopf, nur selbst gezeichnete Grafiken, keine Bibliotheken) nicht. emil-design-eng lässt bei reduzierter Bewegung sanfte Einblendungen zu, hier steht stattdessen alles still, weil die Szene dann komplett stehen soll. Die Einsetz-Animation ist als Einmal-Effekt beim Laden gedacht und bleibt je Block unter 300 ms.

## Anwenden
1. Neuer Shop: `ein-produkt-shop` bis zur Gestaltungsphase, dann `vorlage/style.css` nach `assets/style.css` und `vorlage/script.js` nach `assets/script.js` kopieren.
2. Schriften: `Nunito-800.woff2` und `Nunito-600.woff2` aus `../design-vorlagen/fonts/` nach `assets/fonts/` kopieren, die Lizenzdatei `Nunito-LICENSE.txt` daneben, und die beiden `@font-face`-Zeilen am Dateianfang auf den neuen Pfad ändern.
3. Farben in `:root` und in `TON` (`script.js`) anpassen. Rollen beibehalten: `--signal` nur für den Kaufknopf und die Auswahl, Tonstufe 1 oben, 3 rechts und Kante. Neue Farbe immer in drei Stufen anlegen.
4. Hero neu zeichnen: in `script.js` die Funktion `szeneHero()` ersetzen, Reihenfolge von hinten nach vorn und von unten nach oben, Glas ohne Deckfläche (`{glas:true, offen:true}`). Danach den Handy-Zuschnitt (`width`, `left`, `top` an `.szene .iso`) neu setzen und mit Bildschirmfoto prüfen.
5. Symbole: neuer Eintrag in `ICONS` (z. B. `schneiden: function(){ box(...); }`), im HTML `<svg class="iso iso--karte" data-iso="schneiden" viewBox="0 0 120 120" aria-hidden="true"></svg>`. Der `viewBox` wird beim Laden passend gesetzt.
6. Klassen der Vorlage: `.huelle`, `.kopf`, `.logo`, `.nav`, `.warenkorb`, `.zaehler`, `.hero__raster` (`.hero__kopf`, `.hero__text`, `.szene`), `.eyebrow`, `.sterne`, `.preis`, `.cta` (`.cta__flaeche`), `.platte` mit `.platte__flaeche` und Ton `.t-salbei`, `.t-pfirsich`, `.t-blau`, `.t-papier`, `.zahlen__liste`, `.funktionen` (`.f1` bis `.f4`), `.karte`, `.ablauf`, `.schritte`, `.schritt`, `.ziffer`, `.stimmen`, `.stimme`, `.marke`, `.hinweis__block`, `.fuss`, `.zeig` (Einblenden), `.iso` (Zeichnung).
7. Zu den Haken des Skills `ein-produkt-shop`: Seine Klassennamen (`.glas`, `.knopf`, `.leise-knopf`, `.kachel`, `.schritt`, `.option`, `.frage`, `.korb`, `.kasse`) heißen in der Vorlage anders. Beim Umstellen `.knopf` auf `.cta` und `.glas`/`.kachel` auf `.platte` mit `.platte__flaeche` abbilden. Ablauf, Generator-Änderungen (Logo, `theme-color` auf `#f6f3ec`, Favicon als Würfel) und was nie vom Look abhängt: `../design-vorlagen/references/umstellen.md`.
8. Prüfen: Bildschirmfotos PC, Tablet und Handy, Überlauf bei 390, 820 und 1280 px, Kopfzeile zwischen 720 und 900 px, H1 bei 1440 px (zwei Zeilen), Fokus mit Tab, reduzierte Bewegung (Szene komplett?), Seite ohne JavaScript, Safari und Firefox.

## Dateien
- `vorlage/demo.html`: HORTA-Startseite im Look (alle Texte laut Vorgabe, 1 Kaufknopf).
- `vorlage/style.css`: komplettes Stylesheet mit `@font-face`, Farben als `:root`-Werte, Plattformen, Kaufknopf, Raster, Handy-Entwurf und reduzierter Bewegung.
- `vorlage/script.js`: `box()`, `ICONS` (Hero-Szene und 12 Symbole), Einblenden beim Scrollen, Warenkorb-Zähler im Beispiel.
- `../design-vorlagen/fonts/`: Nunito (nur lesen, nicht verändern).
- `../design-vorlagen/references/umstellen.md`: Ablauf zum Umstellen eines bestehenden Shops.
