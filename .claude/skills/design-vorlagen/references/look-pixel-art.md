<!-- Kopie aus look-pixel-art/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Pixel Art

Gebaut und getestet am HORTA-Gemüseschneider (Startseite). Demo: `vorlage/demo.html`, Stylesheet: `vorlage/style.css`, Skript: `vorlage/script.js`.
Idee: ein Retro-Videospiel. Der Grund ist Dunkelblau (#1d2b53), alle Bilder sind aus Pixeln gebaut, die ein kleines Skript aus Zeichenketten
in SVG umsetzt. Das Gerät (Sockel, Schacht mit Karotte, Kegel-Einsatz im Fenster, Auswurf) steht auf einer Arbeitsplatte, Gemüsestücke fallen
in Schritten in die Schüssel. Der Kaufknopf ist die einzige gelbe Fläche.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt Spaß, Küche, Haushalt, Gadget, Geschenk oder Spielzeug ist, wenn die Zielgruppe Videospiele kennt
und wenn das Produkt einen klaren Aufbau aus wenigen Teilen hat (Sockel, Schacht, Einsatz, Schüssel), den man als Sprite zeichnen kann.
Passt nicht bei Produkten, die Ruhe, Vertrauen, Gesundheit, Babys, Luxus oder Geld versprechen, und nicht, wenn die Seite viel Fließtext
oder viele Formulare haben soll (die Kasse ist in dieser Demo nicht gebaut und nicht getestet).

## Merkmale
- Palette aus 16 Farben (PICO-8). Jede Zeichenkarte benutzt nur diese Farben, jedes Zeichen ist eine Hex-Ziffer 0 bis f, der Punkt ist durchsichtig.
- Sprites werden ganzzahlig vergrößert: Szene 4x (Handy ab 390 px, Laptop von 960 bis 1179 px), 5x (Tablet und ab 1180 px), 3x unter 390 px, Symbole in Karten 4x bis 5x, Sterne 3x. Nie 1,5x oder 4,3x.
- Rahmen mit Pixeltreppen aus vier `box-shadow` ohne Ecke (4 px Stufe), kein `border-radius` irgendwo auf der Seite.
- Hero: Gerät mit Schacht, Kegel-Einsatz und Sockel, Schüssel mit Gemüse. Sieben Stücke fallen in 12 Schritten pro 1,5 s (8 Bilder pro Sekunde), 3 Durchläufe, danach Standbild.
- Lieferhinweis als Dialogkasten mit weißem Treppenrahmen und blauer Innenlinie, der Text tippt einmal in rund 2,6 s. Lieferzeit als Balken aus 15 Segmenten (8 grün, 7 blau gerastert).
- Schrift in zwei Rollen: Press Start 2P nur für Titel und Knopf in 16, 24 und 32 px (Vielfache von 8, sonst unscharf), VT323 für allen Fließtext ab 22 px.
- Der Boden ist ein Streifen aus Gras und Erde (nur CSS-Verläufe), Sterne im Hero sind ein einziger `box-shadow` mit 44 Punkten.
- Handy: eigener Entwurf. Die Szene steht unter dem Kaufknopf (am 390 px breiten Handy liegt der Knopf ganz im ersten Bildschirm), Navigation als Wischstreifen, Karten als Zeilen mit Symbolfeld.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #1d2b53 | Seitengrund, Band-Panels |
| `--tief` | #0f1735 | Karten, Kacheln, Dialog, Kopfzeile, Szenenhintergrund |
| `--weiss` | #fff1e8 | Titel, Fließtext (12,5 zu 1 auf dem Grund), Fokusring |
| `--grau` | #c2c3c7 | Nebentext (7,8 zu 1) |
| `--lila` | #83769c | Rahmen und Linien, leere Sterne, nie als Text (3,3 zu 1 auf dem Grund) |
| `--gruen` | #00e436 | Marke und Fakten: Logo, Eyebrow, zweite H1-Zeile, Kennzahlen, Ablaufnummern, Lieferbalken |
| `--gruen-dunkel` | #008751 | Schatten der grünen Zeile, Gurke |
| `--orange` | #ffa300 | Wert: Preis, Sterne, Münze, Karotte, Kante des Kaufknopfs |
| `--blau` | #29adff | Information: Innenlinie des Dialogs, Schüssel, "bis Werktag 15" |
| `--rosa` | #ff77a8 | Etikett "Beispiel" (dunkle Schrift darauf, 5,55 zu 1) |
| `--gelb` | #ffec27 | NUR der Kaufknopf (dunkle Schrift #1d2b53 darauf, 11,3 zu 1) |
| `--braun`, `--purpur` | #ab5236, #7e2553 | Arbeitsplatte, Erde, Schatten der weißen H1-Zeile, nur Zierde |
| `--schwarz` | #000000 | Umrisse der Sprites, harter Schatten des Kaufknopfs |
| Rot #ff004d | nur in Sprites | Tomate. Im Layout nie, damit Rot nicht mit dem Kaufknopf konkurriert. |
Fokus: weißer Ring, 4 px, 4 px Abstand (am Kaufknopf 12 px).

## Schriften
| Familie | Gewicht | Datei (aus `../design-vorlagen/fonts/`) | Wofür |
| --- | --- | --- | --- |
| Press Start 2P | 400 | `PressStart2P-400.woff2` (12,5 KB) | Logo, H1, H2, H3, Kennzahlen, Preis, Kaufknopf, Ablaufnummern. Nur 16, 24, 32 px. Zeilenabstand 1,5 bis 1,6. |
| VT323 | 400 | `VT323-400.woff2` (17,9 KB) | Navigation, Fließtext, Eyebrow, Etiketten. 22 bis 28 px, nie kleiner. |
Zusammen 30 KB, 2 Dateien. Beide Schriften haben ä ö ü ß € und "·", aber keine Pfeile oder Sterne (die sind in Sprites oder `clip-path` gezeichnet).
Lizenztexte `PressStart2P-LICENSE.txt` und `VT323-LICENSE.txt` liegen im selben Ordner.

## So ist er gebaut

**1. Zeichenkarten werden zu SVG. Pro Farbe ein Pfad aus Rechtecken, ganzzahlig skaliert über eine CSS-Variable**
```js
var PAL = { '0': '#000000', '1': '#1d2b53', /* ... bis 'f' */ 'b': '#00e436' };
var KARTEN = { tomate: [ "....33....", "..888888..", /* ein String pro Zeile */ ] };
function pfade(zeilen) {                       // aufeinanderfolgende gleiche Zeichen werden ein Rechteck
  var d = {}, x, e, c, z, y, out = '', k;
  for (y = 0; y < zeilen.length; y++) {
    z = zeilen[y]; x = 0;
    while (x < z.length) {
      c = z.charAt(x); if (c === '.') { x++; continue; }
      e = x; while (e < z.length && z.charAt(e) === c) e++;
      d[c] = (d[c] || '') + 'M' + x + ' ' + y + 'h' + (e - x) + 'v1h-' + (e - x) + 'z'; x = e;
    }
  }
  for (k in d) out += '<path fill="' + PAL[k] + '" d="' + d[k] + '"/>';
  return out;
}
```
```css
.sprite svg{display:block;width:calc(var(--w) * var(--s,4) * 1px);height:calc(var(--h) * var(--s,4) * 1px);image-rendering:pixelated}
```
Im HTML steht nur `<span class="sprite" data-sprite="tomate" style="--w:14;--h:14;--s:5" aria-hidden="true"></span>` (Größe schon vorab, damit nichts springt), das Skript setzt den SVG-Inhalt aus der Karte. Das Gerät (76 mal 82 Pixel) ist die größte Karte, gebaut mit einem kleinen Python-Zeichner aus Rechtecken, Ellipsen und einem automatischen schwarzen Umriss.

**2. Pixeltreppen-Rahmen: vier verschobene Kopien des Kastens ergeben ein Kreuz, also eine Kante ohne Ecke**
```css
.kachel{margin:4px;background:var(--panel);
  box-shadow:0 -4px 0 0 var(--lila),0 4px 0 0 var(--lila),-4px 0 0 0 var(--lila),4px 0 0 0 var(--lila)}
```
Der Schatten liegt außerhalb und braucht deshalb 4 px `margin`. Er zählt nicht zur scrollbaren Breite, es gibt keinen waagerechten Überlauf.

**3. Fallende Stücke: nur CSS, 12 Schritte in 1,5 s, 3 Durchläufe, Standbild ist der Ruhezustand**
```css
.szene.bereit .stueck{opacity:0}                    /* JS setzt .bereit beim Laden und .laeuft beim Sichtbarwerden */
.szene.laeuft .stueck{animation:fallen 2s steps(1) calc(var(--i) * 125ms) 3 forwards}
@keyframes fallen{
  0%{opacity:1;transform:translateY(calc(var(--d) * -1));animation-timing-function:steps(12,jump-end)}
  75%{opacity:1;transform:translateY(0)} 100%{opacity:1;transform:translateY(0)}}
```
`--d` ist die Fallhöhe in Pixeln (Vielfache von 12, damit jeder Schritt ganze Pixel springt), `--i` die Verzögerung in Bildern. Die Stücke starten hinter dem Gerät (es liegt in der Szene über ihnen) und tauchen aus dem Auswurf auf. Ohne Skript, bei reduzierter Bewegung und nach den 3 Durchläufen liegen alle Stücke in der Schüssel.

**4. Schreibmaschine mit vollem Text für Vorlesegeräte und ohne Skript**
```js
p.classList.add('nur-vorlesen');                       // Original bleibt im Baum, nur unsichtbar (sr-only)
kopie.setAttribute('aria-hidden', 'true');             // sichtbare Kopie: <span>getippt</span><span class="tipp__rest">Rest</span>
/* in einer rAF-Schleife: n = Math.floor((t - t0) / 16); a.textContent = voll.slice(0, n); b.textContent = voll.slice(n); */
```
```css
.tipp__rest{visibility:hidden}   /* nimmt Platz ein, wird nicht gemalt, steht nicht im Zugriffsbaum */
```
Das Tippen startet erst, wenn der Kasten zu 50 % sichtbar ist (`IntersectionObserver`), läuft einmal und fragt keine Tastatureingabe ab. Bei reduzierter Bewegung und ohne Skript wird nichts verändert.

**5. Kaufknopf: fester Schatten auf einer Hülle, nur der Knopf bewegt sich**
```css
.cta-huelle{position:relative;isolation:isolate;display:inline-block;margin:4px}
.cta-huelle::before{content:"";position:absolute;inset:8px -8px -8px 8px;z-index:-1;background:#000;
  box-shadow:0 -4px 0 #000,0 4px 0 #000,-4px 0 0 #000,4px 0 0 #000}
.cta{min-height:64px;font:16px/1.6 var(--titel);color:var(--grund);background:var(--gelb);border:0;
  box-shadow:0 -4px 0 var(--weiss),0 4px 0 var(--weiss),-4px 0 0 var(--weiss),4px 0 0 var(--weiss),inset -4px -4px 0 var(--orange);
  transition:transform 120ms cubic-bezier(.23,1,.32,1)}
@media (hover:hover) and (pointer:fine){.cta:hover{transform:translate(-4px,-4px)}}
.cta:active{transform:translate(4px,4px) scale(.97)}
```

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge wie gefordert, nach jedem Durchgang Prüfskript und Bildschirmfotos. Von impeccable lag nur die `SKILL.md` vor, die Unterdateien
(`reference/craft-floor.md` und andere) und das Startskript fehlten. Dafür galten die Kurzregeln aus dem Auftrag (Rollen, Hierarchie, gemessener
Kontrast, sichtbarer Fokus).

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Abstände gemischt (4, 8, 12, 16, 20, 28, 40, 56 px), Abschnitte 40 px (Handy) und 56 px (PC) hoch. Seite am PC 3302 px | Nur noch Stufen 8, 16, 24, 32, 48, 64, 96 px, Abschnitte 48, 64 und 96 px. Seite am PC rund 3760 px | Gleichmäßige, großzügige Abstände, Abschnitte wie getrennte Kapitel |
| gpt-taste | H1 bei 600 bis 719 px dreizeilig (32 px, "Weniger / schnippeln. / Mehr Salat.") | 24 px zwischen 600 und 719 px: zwei Zeilen. Gemessen bei 17 Breiten von 320 bis 1920 px: 2 Zeilen ab 600 px, 3 nur am Handy | Überschrift darf nie mehr als 2 bis 3 Zeilen haben |
| gpt-taste | Hero-Szene oben bündig, darunter ein Loch von rund 160 px neben dem längeren Textblock | `align-self:center`, Szene sitzt mittig zur Textspalte, kein leerer Block | Raster ohne tote Flächen, klare Blickführung H1, Bild, Preis, Knopf |
| gpt-taste | Kein Schutz gegen waagerechtes Wischen | `overflow-x:clip` auf `main`. Überlauf trotzdem an 17 Breiten gemessen, nicht nur versteckt (0 gefunden) | Regel gegen den Bug mit waagerechter Scrollleiste |
| impeccable | Warenkorb-Link in Kasten mit Treppenrahmen, die zweitstärkste Fläche der Kopfzeile und optisch ein Knopf | Nur Text mit Zähler, Kopfzeile am PC 72 auf 64 px. Der Kaufknopf ist die einzige Fläche mit Füllung im ersten Bildschirm | Ein Blickfang pro Bildschirm, Signalfarbe nur für den Kauf |
| impeccable | Leere Sterne in #5f574f (1,9 zu 1 auf dem Grund) | Lila #83769c (3,3 zu 1), Teilstern 4,6 deutlich lesbar | Kontrast gemessen für Grafiken, nicht nur für Text |
| impeccable | Fußlinks ohne Unterstreichung, in Windows-Kontrastmodus wären alle Schattenrahmen weg | 2 px Unterstreichung in Lila mit 6 px Abstand, `@media (forced-colors:active)` setzt echte 2-px-Linien | Links erkennbar, Kontrastmodus lesbar |
| impeccable | Navigationsstreifen am Handy: der erste Link rastete 8 px links aus der Spalte (`scroll-snap` ohne `scroll-padding`) | `scroll-padding-inline` gleich Innenabstand, Text bündig mit dem Seitenrand. Kontrast gemessen: 70 Textknoten, kleinster Wert 5,55 zu 1 | Ausrichtung und sichtbarer Fokus (4 px weiß an allen 13 Tab-Zielen gemessen) |
| emil-design-eng | Schatten des Kaufknopfs war `box-shadow` mit Variable, beim Hover sprang er um 4 px, weil nur `transform` animiert wurde | Fester Schatten auf der Hülle `.cta-huelle`, nur der Knopf bewegt sich (gemessen: Hover `translate(-4px,-4px)`, Druck `matrix(.97, 4, 4)`) | Nur `transform` und `opacity` animieren, Schatten springt nie |
| emil-design-eng | `:active{scale(.97)}` auf Links ohne Übergang, das Loslassen sprang zurück | `transition:transform 120ms cubic-bezier(.23,1,.32,1)` auf Navigation, Logo, Warenkorb, Fußlinks. Hover nur unter `(hover:hover) and (pointer:fine)` | Eigene Kurve statt `ease`, unter 160 ms, keine falschen Treffer am Handy |
| emil-design-eng | Balkensegmente erschienen im Abstand von 125 ms (1,9 s für 15 Segmente) | 60 ms Abstand, 0,9 s insgesamt | Staffelung 30 bis 80 ms, nichts blockiert |
| emil-design-eng | Antippen mit grauem Aufblitzen der Treppenrahmen, Textmarkierung beim langen Drücken auf dem Knopf | `-webkit-tap-highlight-color:transparent`, `touch-action:manipulation`, `user-select:none` am Knopf. Zähler-Plopp (200 ms, von `scale(1.25)`) nur bei Maus oder Tippen, nie per Tastatur (`e.detail > 0`) | Unsichtbare Details, Tastaturaktionen nie animieren |

Konflikte: Pixel Art lebt von gestuften Bewegungen. Die Sprites laufen deshalb mit `steps()` (8 Bilder pro Sekunde) statt mit der Kurve des Skills,
Rückmeldungen am Bedienelement mit `cubic-bezier(.23,1,.32,1)` unter 160 ms. Die Sprite-Bewegung dauert 6 s, weil sie erklärt und nichts blockiert.
Emil empfiehlt bei reduzierter Bewegung "weniger statt keine", hier gilt der Auftrag: Standbild, keine Animation. Von gpt-taste entfallen GSAP, Tailwind,
Fotos von picsum und zwei Knöpfe im Hero (es gibt genau einen Kaufknopf). Wegen der Pixelschrift bleibt die Überschrift am Handy bei drei Zeilen.

## Pro
- Der Kaufknopf ist die einzige gelbe Fläche und mit 11,3 zu 1 der kontrastreichste Text. Er liegt am 390 px breiten Handy komplett im ersten Bildschirm (Oberkante 759 px von 844 px).
- Sehr leicht: 77 KB ohne Schriften (HTML 32, CSS 21, JS 26), Schriften 30 KB, 5 Anfragen, kein Bild, keine Bibliothek. Lighthouse mobil (11.10.2026): Leistung 100, Barrierefreiheit 100, Technik 100, Layoutverschiebung 0. Dazu 0 requestAnimationFrame pro Sekunde und 0 endlose Animationen im Normalbetrieb.
- Ruhig im Betrieb: Mit vierfach gebremster CPU 452 Bilder beim Fallen, nur 2 über 33 ms (längstes 83 ms beim Laden). Beim Scrollen 0 von 38 (PC) und 0 von 55 (Handy) über 33 ms.
- Unverwechselbar und ohne Foto: Gerät, Schüssel, Gemüse, Münze, Sterne und Avatare sind selbst gezeichnet. Das Gerät ist als Produkt erkennbar (Sockel, Schacht mit Karotte, Kegel-Einsatz im Fenster, Auswurf, Schüssel).
- Lesbar und kontraststark: 70 Textknoten gemessen, kleinster Wert 5,55 zu 1 (Etikett "Beispiel"), Fließtext 12,5 zu 1. Fokus 4 px weiß an allen 13 Tab-Zielen.
- Die Farben haben feste Rollen (Grün Marke, Orange Wert, Blau Information, Gelb nur Kauf). Umfärben heißt nur `:root` ändern.
- Ohne Skript lesbar: gesamter Text und der Kaufknopf stehen im HTML, die Hero-Szene als statische Kopie ebenfalls, bei reduzierter Bewegung gibt es das Standbild mit gefüllter Schüssel.

## Contra
- Handarbeit: 23 Zeichenkarten, das Gerät allein hat 6200 Zeichen. Für jedes andere Produkt müssen Gerät und Gemüse neu gezeichnet werden. Das Gerät besteht aus rund 45 Zeichenbefehlen und brauchte drei Korrekturrunden nach Bildschirmfoto (Öffnung im Schacht, breiterer Auswurf, Karotte).
- Press Start 2P ist sehr breit (1 em je Zeichen): "Weniger schnippeln." braucht 456 px bei 24 px. Am Handy wird die H1 dreizeilig, in vier Kacheln passt "8 bis 15" erst ab 860 px nebeneinander. Scharf ist die Schrift nur bei 16, 24 und 32 px.
- Das große Ü der Press Start 2P sieht aus wie ein kleines ü ("Überblick" liest sich als "überblick"). Wörter mit großem Umlaut am Wortanfang in Titeln meiden oder in VT323 setzen.
- VT323 hat nur ein Gewicht und dünne Striche. Lange Absätze sind anstrengend, deshalb Mindestgröße 22 px, besser 24 bis 26 px, und kurze Texte.
- Ohne Skript fehlen Sterne, Münze, Symbole in Karten und Avatare, nur die Hero-Szene steht als statische Kopie im HTML (rund 22 KB mehr). Die Kopie muss nach jeder Änderung einer Zeichenkarte neu erzeugt werden.
- Die Schreibmaschine braucht ein doppeltes Gerüst (unsichtbares Original, sichtbare Kopie). Das ist Pflegeaufwand und eine Fehlerquelle für Vorlesegeräte, wenn jemand `aria-hidden` an die falsche Stelle setzt.
- Kleine Telefone: Auf 360 mal 740 und 375 mal 667 liegt der Kaufknopf 40 bis 180 px unter dem ersten Bildschirm, weil Press Start 2P und 24-px-Fließtext viel Höhe brauchen.
- Der schwarze Schatten des Kaufknopfs ist auf Dunkelblau kaum zu sehen (1,5 zu 1). Die Tiefe kommt vom weißen Rand und dem Versatz beim Drücken.
- Kasse, Formularfelder und Fehlermeldungen sind in diesem Look nicht gebaut und nicht getestet. Eingabefelder in VT323 mit Treppenrahmen sind der nächste Schritt.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Gelber Knopf mit Pixelschatten ist der klare Blickfang, die fallenden Stücke zeigen den Nutzen, aber der Spiel-Look passt nicht zu jedem Produkt. |
| Lesbarkeit | 3 | Fließtext 12,5 zu 1, doch Press Start 2P ist breit und VT323 dünn, das große Ü kippt. |
| Handy | 4 | Eigener Entwurf, 4x-Sprites, 48-px-Ziele, Knopf bei 390 mal 844 komplett sichtbar, auf kleinen Telefonen darunter. |
| Tempo | 5 | 77 KB, kein Bild, 0 requestAnimationFrame pro Sekunde, 0 endlose Animationen, 0 lange Bilder beim Scrollen. |
| Barrierefreiheit | 4 | Fokus 4 px, kleinster Kontrast 5,55 zu 1, Standbild bei reduzierter Bewegung, voller Text im Zugriffsbaum, aber Pixelschrift ist für manche Leser schwer. |
| Aufwand (5 = wenig Aufwand) | 2 | 23 Zeichenkarten von Hand und mit Skript, jedes neue Produkt braucht neue Sprites und eine neue Szene. |
| Risiko (5 = geringes Risiko) | 3 | Wirkt verspielt, für Kasse und Rechtstexte weniger seriös, Formulare im Look noch ungetestet. |

## Passt besonders zu
Küchengeräten und Haushaltsgadgets, Spielzeug, Geschenken, Zubehör für Gamer, Produkten mit einem klaren Aufbau aus wenigen Teilen (Sockel, Aufsatz, Behälter).

## Passt nicht zu
Gesundheit, Baby, Pflege, Finanzen, Luxus und allem, was Ruhe und Vertrauen verkaufen soll. Ebenso Produkten, die sich schwer als einfache Form zeichnen lassen.

## Stolperfallen
- Der automatische Umriss malte die Öffnung im Schacht zu. Lösung: Platzhalter `x` für "hier bleibt es durchsichtig", der Umrissschritt ignoriert ihn und ersetzt ihn danach durch `.`.
- Sprites, die den Rand der Karte berühren, verlieren dort die Kontur (das Paket hatte oben einen Strich, sonst nichts). Lösung: Karte vor dem Umriss um 1 Pixel an allen Seiten erweitern.
- Ein Pseudo-Element mit `z-index:-1` als Knopfschatten liegt über dem Knopf, sobald der Knopf `transform` hat (er bildet dann seinen eigenen Stapel). Lösung: Hülle mit `isolation:isolate`, Schatten dort.
- Fallhöhe nicht durch die Schrittzahl teilbar: Stücke landen auf halben Pixeln und flimmern. Fallhöhe immer ein Vielfaches von 12 bei 12 Schritten. `animation-timing-function` gehört in den ersten Keyframe, nicht an das Element.
- `color:transparent` für den noch nicht getippten Text lässt Kontrastprüfer meckern. `visibility:hidden` auf dem Rest plus unsichtbares Original ist sauber.
- `scroll-snap` im Navigationsstreifen braucht `scroll-padding-inline`, sonst klebt der erste Link am Rand.
- Die Kopfzeile mit fünf Links und Warenkorb passt bei 960 px auf den Pixel (864 px Inhalt plus 48 px Abstände in 912 px). Darunter zweizeilig: Logo und Warenkorb oben, die Links als Streifen darunter. Bei 320 px braucht die obere Zeile 267 px und passt, der Streifen wischt.
- Die Eyebrow "Elektrischer Gemüseschneider" in VT323 24 px mit Versalien und 0,08 em Abstand braucht 323 px, passt also gerade auf 358 px Handybreite.
- Der Prüfer meldete einen Link "AGB" mit 29 px Breite. Fußlinks bekommen seitlich 8 px Innenabstand.
- Ein Euro-Zeichen, Umlaute und "·" gibt es in beiden Schriften, Pfeile und Sterne nicht. Pfeile als `clip-path:polygon(...)` mit 4-px-Stufen zeichnen.
- Die Stufenrahmen (`box-shadow`) verschwinden im Windows-Kontrastmodus. Deshalb `@media (forced-colors:active)` mit echten Linien.
- Die H1 mit `text-shadow:.125em .125em 0` setzt den Schatten um genau einen Schriftpixel versetzt, das passt zu jeder der drei Größen.
- Layoutverschiebung (CLS 0,14 im Lighthouse mobil): Gemessen mit einem `layout-shift`-Observer und dem Lighthouse-Audit (Ursache „Web font loaded“) verschob der Tausch von Press Start 2P (1,0 em pro Zeichen) und VT323 (0,4 em) gegen die Systemschrift (0,6 em) die H1, den Fließtext und den Preisblock am Handy um 30 bis 36 px, bei verspätetem Skript kamen die Sprites ohne feste Größe dazu, und bei 320 bis 375 px sprang die Dialogbox, weil der Cursor als Kästchen in der Zeile den Umbruch änderte. Gelöst mit Preload beider Schriften, den Ersatzschnitten `Press Start 2P Ersatz` (`size-adjust` 166,64 %) und `VT323 Ersatz` (66,65 %) samt `ascent-override` und `descent-override`, `--w` und `--h` aller Sprites schon im HTML (die Fläche hat danach feste Größe) und einem Cursor, der nur noch Hintergrund des getippten Teils ist (Innenpolster rechts, gleich großer negativer Außenabstand). CLS vorher 0,14, nachher 0 (Performance 92 auf 100), auch bei 1,5 s verspäteter Schrift oder verspätetem Skript und gedrosselt am Handy; bei anderen Schriften die Faktoren aus Textbreiten neu messen.

## Anwenden
1. `vorlage/style.css` nach `assets/style.css` des Shops kopieren, `vorlage/script.js` als `assets/pixel.js` ablegen und im `<head>` mit `defer` laden. Farben nur in `:root` ändern, die Rollen (Gelb nur Kaufknopf) beibehalten.
2. Schriften aus `../design-vorlagen/fonts/` kopieren: `PressStart2P-400.woff2` und `VT323-400.woff2` samt Lizenzdateien. Die zwei `@font-face`-Blöcke der Webschriften im CSS auf den neuen Pfad stellen (die zwei Ersatzschnitte daneben unverändert mitnehmen), `font-display:swap` lassen, beide Dateien im `<head>` per `<link rel="preload" as="font" type="font/woff2" crossorigin>` vorladen.
3. Klassen der Demo: `.kopf .logo .nav .korb .korb__zahl`, `.hero .hero__raster .hero__kopf .hero__text .hero__bild .hero__sterne`, `.eyebrow .untertitel .bewertung .preis`, `.cta-huelle .cta`,
   `.szene .szene__bild .stueck .s-karotte .s-geraet .boden`, `.abschnitt .band`, `.kacheln .kachel`, `.karten .karte .slot`, `.schritte .schritt .nr`, `.stimmen .stimme .marke`,
   `.dialog .dialog__text .lieferzeit .balken .seg .seg--bis`, `.fuss`. Hooks für das Skript: `data-sprite`, `data-sterne`, `data-szene`, `data-tipp`, `data-balken`.
4. Passend zu den Haken des Skills `ein-produkt-shop`: Die Demo hat eigene Namen. Im Shop entweder die Selektoren im CSS ergänzen (`.cta,.knopf{...}`, `.kachel,.leucht{...}`, `.korb`) oder im HTML umbenennen. Die Schritte zum Wechsel
   (Schriften, `style.css`, Logo, Hintergrund, Favicon, Vorschaubild) stehen in `../design-vorlagen/references/umstellen.md`. Dort `WELT` leer lassen (der Sternenhimmel kommt aus `.hero__sterne`), `theme-color` auf #1d2b53 setzen, das Logo als Pixelzeichen (`blatt`) neu zeichnen.
5. Neue Szene zeichnen: Zeichenkarten in `KARTEN` anlegen (Farben nur aus `PAL`, Umriss in `0`, Gesamtbreite der Szene 88 Pixel für 4x am Handy), Positionen in `szene()` und in der Liste `RUHE` und `FALL` eintragen. Fallhöhen als Vielfache von 12, Stücke starten hinter dem Gerät.
   Danach die statische Kopie erneuern: Seite im Browser öffnen, in der Konsole `copy(document.querySelector(".szene > svg").outerHTML)` und in `demo.html` ersetzen.
6. Danach prüfen: Zeilen der H1 bei 390, 600, 820, 1100, 1280 und 1440 px, Kopfzeile zwischen 720 und 960 px, Kaufknopf im ersten Bildschirm am Handy, Kontrast, Tab-Fokus, reduzierte Bewegung (Standbild mit gefüllter Schüssel, voller Text im Dialog), kein waagerechter Überlauf bei 390, 820 und 1280 px, Seite mit ausgeschaltetem JavaScript.

## Dateien
- `vorlage/demo.html` (HORTA-Startseite, 32 KB, davon 22 KB statische Szene)
- `vorlage/style.css` (21 KB)
- `vorlage/script.js` (26 KB: Zeichenkarten, Sprites, Szene, Schreibmaschine, Balken, Warenkorb-Zähler)
- Schriften: `../design-vorlagen/fonts/PressStart2P-400.woff2`, `VT323-400.woff2`
