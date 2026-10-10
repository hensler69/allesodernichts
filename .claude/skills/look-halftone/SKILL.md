---
name: look-halftone
description: Der Look "Halftone" (Rasterdruck, Risograph) lässt die Seite wie zweifarbig auf Cremepapier gedruckt wirken: Rosa und Blau als Druckfarben (wo sie sich decken, wird es Dunkelviolett), Überschriften mit versetztem Überdruck, Karten mit Punktschatten und ein Hero-Bild, das ein Skript einmal beim Laden in Rasterpunkte umrechnet. Verwenden bei "Halftone-Look", "Rasterdruck", "Risograph", "Riso-Druck", "Punktraster", "Überdruck", "halftone design", "riso print style", "Design-Vorlage halftone", wenn ein Ein-Produkt-Shop gedruckt, handgemacht und plakativ wirken soll oder wenn Looks verglichen werden. Nicht verwechseln mit Comic Book (Panels und Sprechblasen), hier gibt es nur Druck-Ästhetik.
---

# Look: Halftone

Papier (#fbf3e4), zwei Druckfarben Rosa (#ff4f8b, Raster 15 Grad) und Blau (#2d5bff, Raster 45 Grad), Tinte (#1a1530) für Text. Wo Rosa und Blau sich überlappen, entsteht Dunkelviolett (`mix-blend-mode: multiply`). Das Hero-Bild (Gerät mit Kegel-Einsatz, Schüssel, Gemüse) wird auf einem unsichtbaren Canvas gezeichnet und per Abtastung in Kreise umgerechnet: Radius = Dichte der Farbe, zwei Ebenen mit versetztem Winkel. Das passiert einmal beim Laden (40 bis 58 ms), danach läuft nichts mehr. Gebaut und getestet als Demo der HORTA-Startseite: `vorlage/demo.html`.

## Wann der Look passt / Wann nicht
**Passt**, wenn die Marke gedruckt, handgemacht, plakativ und ein wenig subkulturell wirken soll (Küche, Haushalt, Kreatives, Papier, Pflanzen, Getränke) und das Produkt als einfache Form zeichenbar ist. Der Look braucht keine Fotos, die Seite ist leicht (48 KB plus 46 KB Schriften), und der Kaufknopf bleibt die einzige volle Farbfläche.
**Passt nicht**, wenn das Produkt echte Farben verkaufen muss (Lebensmittel, Kosmetik, Mode: im Zweifarbendruck wird die Tomate rosa und die Gurke blau), wenn Fotos Vertrauen schaffen sollen (Elektronik mit Technikdaten, Medizin) oder wenn der Auftritt ruhig und edel sein soll. Auch schwach, wenn viele feine Details im Produkt stecken: unter etwa 20 Zeichnungseinheiten (rund 14 px) gehen Teile im Raster verloren.

## Merkmale
- Zwei Druckplatten als zwei gestapelte Canvas-Elemente mit `mix-blend-mode: multiply`: Rosa im 15-Grad-Raster, Blau im 45-Grad-Raster. Am PC 4580 Punkte (Raster 6,5 px), am Handy 2590 Punkte (Raster 7,5 px, also gröber).
- Überdruck-Schrift: Anton in Großbuchstaben, Blau mit einer um 0,05 em versetzten rosa Kopie (`::after`, multiply). In der Überlappung entsteht Violett, an den Kanten bleiben Blau (links oben) und Rosa (rechts unten).
- Karten, Preisschild und Kaufknopf haben Punktschatten statt Weichschatten: eine um 12 px versetzte Schicht aus Rasterpunkten (8 px Kachel), die zur Ecke hin ausblendet.
- Punktrampen als Übergänge: eine 12 x 80 px Kachel mit acht Punktreihen, die von 0,6 auf 7,2 px Radius wachsen, führt vom Papier in die tintenfarbene Zahlenleiste und wieder heraus, ebenso vor der Fußzeile.
- Hintergrundverläufe als Punktverläufe: `radial-gradient`-Punkte mit `mask-image`, aber nur dort, wo kein Text liegt (neben dem Hero-Bild, im Band "Ablauf").
- Passermarken (Fadenkreuz mit Ring) an zwei Ecken des Hero-Bilds, 50 % Deckkraft.
- Der Kaufknopf ist die einzige volle Blaufläche der Seite (Papierschrift, 4,7 : 1), 68 px hoch, mit Punktschatten in Tinte, der sich bei Zeiger und Druck mitbewegt.
- Zeiger fein: die beiden Druckplatten des Hero-Bilds verschieben sich um (4, 3) und (-3, -2) px, als säßen sie nicht ganz im Register (240 ms, nur `transform`).

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--papier` | #fbf3e4 | Seitengrund, Grundfarbe des Drucks |
| `--papier-hell` | #fffaf0 | Karten, Preisschild (Text liegt immer auf diesem ruhigen Grund) |
| `--papier-tief` | #f1e4cb | Band "Ablauf" (große Schrift darauf 4,1 : 1, Fließtext liegt in Karten) |
| `--tinte` | #1a1530 | Text (15,95 : 1 auf Papier), Linien, Zahlenband, Fußzeile, Punktschatten des Knopfs |
| `--tinte-2` | #4a4263 | Kleingedrucktes (8,5 : 1 auf Papier, 9,0 : 1 auf Karten) |
| `--rosa` | #ff4f8b | Druckfarbe A: nur Raster, Etikett "Beispiel" (Tinte darauf 5,65 : 1), Schatten, Überdruck. Nie Textfarbe (2,8 : 1 auf Papier) |
| `--blau` | #2d5bff | Druckfarbe B und Signalfarbe: als VOLLE Fläche nur am Kaufknopf, sonst nur Raster oder Überschrift (4,7 : 1, große Schrift). Auch Farbe der Textauswahl (`::selection`) |
| `--violett` | #2d1c8b | entsteht, wo Rosa und Blau sich decken (11,5 : 1), nur als Ergebnis, nicht gesetzt |
| `--auf-blau` | #fbf3e4 | Schrift auf dem Kaufknopf (4,7 : 1, Schrift 19 px fett) |

Werte mit der WCAG-Formel gemessen (Python-Rechner und Skript über alle 63 Textknoten): Fließtext und Kleingedrucktes mindestens 5,65 : 1, Schrift des Kaufknopfs 4,7 : 1, große Überschriften mindestens 4,12 : 1.

## Schriften
Zwei Familien, drei Dateien aus `../design-vorlagen/fonts`, zusammen 47 KB: `Anton-400.woff2` (Überschriften, Zahlen, Preis, Logo, Gewicht 400 in Großbuchstaben, 18,6 KB), `DMSans-400.woff2` (Fließtext, 14,2 KB) und `DMSans-700.woff2` (Navigation, Knöpfe, Hinweise, 14,3 KB). Lizenztexte `Anton-LICENSE.txt` und `DMSans-LICENSE.txt` mitkopieren. Anton ist sehr schmal: "WENIGER SCHNIPPELN." ist bei 100 px genau 790 px breit (7,9 em), darauf baut die Größenregel der H1 auf. Die Anton-Datei per `<link rel="preload" as="font" type="font/woff2" crossorigin>` vorladen.

## So ist er gebaut
**1. Zeichnung in zwei Platten, dann Abtastung in Punkte.** Jede Form wird auf zwei unsichtbare Canvas gezeichnet, je einen pro Druckfarbe, mit schwarzer Deckkraft als Dichte (Alpha = Farbmenge). `teil()` räumt die Stelle erst auf beiden Platten frei (Papier, wie beim echten Druck mit Aussparung) und trägt dann Dichte für Rosa und Blau auf. Mit `ueberdruck = true` bleibt das Darunterliegende stehen, dort wird es Violett. Verläufe (linear, radial, kegelförmig für Metallglanz) werden zu Punktverläufen.
```js
function teil(pfad, fr, fb, ueberdruck) {
  var fs = [fr, fb];
  for (var k = 0; k < 2; k++) {
    var c = platten[k];
    if (!ueberdruck) { c.save(); c.globalCompositeOperation = 'destination-out'; c.beginPath(); pfad(c); c.fillStyle = '#000'; c.fill(); c.restore(); }
    if (fs[k]) { c.beginPath(); pfad(c); c.fillStyle = dichte(c, fs[k]); c.fill(); }
  }
}
teil(kreis(300, 316, 268), { l: [90, 70, 520, 560], s: [[0, 0.03], [0.5, 0.2], [1, 0.55]] }, null, true);  // rosa Scheibe, Punktverlauf
```

**2. Gitter drehen, Dichte messen, Radius setzen.** Das Gitter wird um 15 beziehungsweise 45 Grad gedreht. An jedem Gitterpunkt wird die Dichte aus fünf Messpunkten gemittelt, daraus folgt der Radius mit einem leichten Punktzuwachs (wie im echten Druck). Alle Kreise einer Platte werden in einem Pfad gefüllt (ein `fill()`, keine Doppeldeckung).
```js
var dd = messen(daten, w, h, x, y, raster * 0.22);
if (dd < 0.04) continue;
var r = raster * (0.56 * Math.sqrt(dd) + 0.16 * dd * dd * dd);
if (r < 0.45) continue;
c.moveTo(x + r, y); c.arc(x, y, r, 0, PI2);
```
Der Canvas hat eine feste Größe: CSS-Größe = Größe des Containers beim Laden (435 x 435 px am PC, 348 x 298 am Handy), physische Größe mal `Math.min(devicePixelRatio, 2)`. Er wird nie per CSS skaliert, das vermeidet Moiré. Bei echter Größenänderung (Drehen, Fenster) baut `resize` nach 200 ms Ruhe neu, sonst nie. Kein `requestAnimationFrame`.

**3. Überdruck-Schrift in reinem CSS.** Der Text steht einmal im HTML (`data-t` trägt die Kopie), die rosa Kopie liegt versetzt darüber und multipliziert sich mit dem blauen Text. `content: ... / ""` setzt einen leeren Ersatztext, damit Screenreader die Kopie nicht doppelt lesen (ältere Browser lesen sie, ändert nur die Ansage).
```css
.ueber{position:relative;display:block;color:var(--blau)}
.ueber::after{
  content:attr(data-t);content:attr(data-t) / "";
  position:absolute;left:0;top:0;width:100%;
  color:var(--rosa);mix-blend-mode:multiply;
  transform:translate(var(--dx,.05em),var(--dy,.04em));pointer-events:none;user-select:none;
}
```
Die H1-Größe hängt an der Breite ihrer Spalte (`container-type:inline-size` auf `.hero__kopf`), damit "WENIGER SCHNIPPELN." genau in eine Zeile passt: `font-size:clamp(2.75rem,12.2cqi,7rem)` (12,2 cqi bei 7,9 em Textbreite lassen 3,6 % Luft). Am Handy `clamp(2.75rem,19cqi,4.5rem)`, dort sind drei Zeilen gewollt.

**4. Punktschatten mit zwei Pseudoebenen.** Karte und Kaufknopf brauchen `isolation:isolate`, die Punktschicht liegt auf `z-index:-2`, die Papierfläche mit Rahmen auf `z-index:-1`. Mit nur einer Ebene verschwindet der Schatten hinter dem Abschnittsgrund oder die Kartenfläche überdeckt ihn.
```css
.druck{position:relative;isolation:isolate;--punkt:var(--rosa)}
.druck::before{content:"";position:absolute;inset:0;z-index:-2;transform:translate(12px,12px);
  background:radial-gradient(circle at 50% 50%,var(--punkt) 0 2.1px,transparent 2.7px) 0 0/8px 8px;
  mask-image:linear-gradient(135deg,#000 35%,rgba(0,0,0,.4))}
.druck::after{content:"";position:absolute;inset:0;z-index:-1;background:var(--papier-hell);border:1.5px solid var(--tinte)}
```
Beim Kaufknopf trägt `::after` das Blau und den Rahmen, `::before` die Punkte in Tinte; Hover verschiebt den Knopf um (-2, -2) px und den Schatten auf (11, 11), `:active` setzt `translate(2px,2px) scale(.97)`.

**5. Standbild ohne JavaScript, Rampen als Data-URI.** Ohne JS (und wenn der Aufbau scheitert) zeigt `.bild__stand` ein SVG (4,3 KB) mit Rasterfüllungen (`<pattern>` mit `patternTransform="rotate(15)"` und `rotate(45)`) und `mix-blend-mode: multiply`. Das SVG wird von `standbild-erzeugen.py` aus denselben Formen wie die Szene erzeugt, am Handy schneidet `preserveAspectRatio="xMidYMax slice"` oben ab. Die Rampen kommen aus `rampe-erzeugen.py` als Data-URI-Kachel (12 x 80 px), die Fußzeile nutzt dieselbe Kachel, die Ausgangsrampe wird mit `transform:scaleY(-1)` gespiegelt.
```css
.rampe{height:80px;background:var(--rampe-tinte) repeat-x 0 0/12px 80px}
.rampe--aus{transform:scaleY(-1)}
.js .bild__stand{display:none}
.js .hero__bild.fehler .bild__stand{display:block}   /* Aufbau gescheitert: Standbild zeigen */
```

## Pro
- Einmaliger Aufbau, danach Ruhe: 40 bis 58 ms im Testbrowser (PC und Handy, auch bei 2-facher Dichte), 0 `requestAnimationFrame`-Aufrufe pro Sekunde, 0 Endlos-Animationen, bei reduzierter Bewegung identisch.
- Leicht: HTML 18 KB, CSS 18 KB, JS 12 KB (zusammen 48 KB) plus 47 KB Schriften, 6 Anfragen, kein Bild, kein Netz zur Laufzeit.
- Sofort erkennbar und ohne Hilfsmittel: Der Überdruck der Überschriften braucht nur CSS. Selbst ohne JavaScript (Standbild-SVG) und am Handy trägt die H1 den Look.
- Der Kaufknopf bleibt Blickfang: einzige volle Blaufläche, 4,7 : 1, am Handy (390 x 844) bei y 752 bis 820 im ersten Bildschirm, am PC (1280 x 800) bei y 638 bis 706.
- Gut lesbar trotz Raster: Text liegt nur auf Papier, Karten oder Tinte, kleinster Kontrast bei Fließtext 5,65 : 1, das Punktfeld hinter dem Hero endet vor der Überschrift.
- Das Raster macht die Schattierung selbst: Wer ein neues Produkt zeichnet, setzt nur Formen und Verläufe (die Szene hat etwa 60 Zeilen), die Punktgrößen ergeben sich aus der Dichte.

## Contra
- Das Zeichnen der Szene ist Handarbeit und brauchte vier Durchgänge (siehe Stolperfallen). Details unter etwa 14 px verschwinden, das Produkt muss als klare Silhouette funktionieren.
- Mit zwei Farben lässt sich nichts natürlich abbilden: Tomaten wurden rosa, Gurken blau, Edelstahl ein Wechsel aus Rosa und Papier. Für Lebensmittelprodukte ist das ein Verlust an Appetit.
- Die Palette ist eng: Rosa erreicht auf Papier nur 2,8 : 1 und darf nie Text tragen, Blau nur 4,7 : 1 und taugt für große Schrift. Blau ist zugleich Druckfarbe und Signalfarbe, unterscheidbar nur durch "volle Fläche gegen Punkte".
- Die Überschriften-Kopie verdoppelt den Text im Quelltext (`data-t`), jede Textänderung muss an zwei Stellen passieren. Die Kanten (7 px Versatz bei 91 px Schrift) wirken bei langem Hinsehen unruhig.
- Das Handy zeigt das Hero-Bild erst nach dem Kaufblock (unter dem ersten Bildschirm), damit der Knopf oben liegt. Der erste Eindruck am Handy stammt dadurch von Überschrift und Rampe, nicht vom Bild.
- Das CSS-Punktraster (8-px-Kachel) wird bei 1,25- und 1,5-facher Seitenvergrößerung auf Bruchteile gerundet, die Punkte wirken dann leicht ungleich groß. Auffälliges Moiré trat nicht auf, aber auf echten Handys mit 3-facher Dichte nicht gemessen.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Der Kaufknopf ist die einzige volle Blaufläche und liegt in jedem Bildschirmformat im ersten Bildschirm, nur das bunte Hero-Bild konkurriert ein wenig. |
| Lesbarkeit | 4 | Text steht nur auf Papier, Karten oder Tinte mit mindestens 5,65 : 1, allein die Überdruck-Kanten der großen Überschriften flimmern leicht. |
| Handy | 4 | Knopf bei y 752 bis 820 (390 x 844) und eigener Bildausschnitt mit gröberem Raster, aber das Bild kommt erst nach dem Kaufblock. |
| Tempo | 5 | 48 KB plus 47 KB Schriften, Aufbau einmalig in 40 bis 58 ms, danach null Arbeit. |
| Barrierefreiheit | 4 | Sichtbarer Fokus, Standbild und reduzierte Bewegung ohne Sonderfall, aber Rosa ist nie als Text nutzbar und die Kopie braucht den Ersatztext-Trick. |
| Aufwand (5 = wenig Aufwand) | 3 | CSS ist einfach, doch die Szene muss je Produkt gezeichnet und in zwei Ausschnitten (PC, Handy) geprüft werden. |
| Risiko (5 = geringes Risiko) | 4 | Wenig Laufzeitrisiko, aber das Produkt muss in zwei Farben lesbar bleiben und die Palette lässt kaum Spielraum. |

## Passt besonders zu
Küchenhelfer und Haushaltsgeräte mit einfacher Silhouette, Papierwaren, Pflanzen, Getränke, Kreativ- und Bastelprodukte, Marken mit Zine- oder Poster-Charakter.

## Passt nicht zu
Frische Lebensmittel und Kosmetik, bei denen die echte Farbe verkauft, sowie Technik und Medizin, bei denen Fotos und nüchterne Daten Vertrauen schaffen.

## Stolperfallen
- **Das erste Hero-Bild sah aus wie eine Flasche mit Gesicht.** Das Gehäuse war zu hell (links nur 0,3 Dichte, wirkte hohl), die Löcher des Kegel-Einsatzes (23 x 13 Einheiten, etwa zwei Rasterpunkte) verschwammen, der Schacht saß wie ein Flaschenhals auf dem Block. Lösung: dunkles Gehäuse (0,8 bis 0,98 Blau), heller Kragen mit dunklem Ring, Löcher 28 x 15, Trichter mit Stößel statt Hals, Gemüse mit Ringen von mindestens 5 Einheiten Breite.
- **Der Handy-Ausschnitt wirkte wie ein Totenkopf.** Oben gekürzt (y ab 150) und mit Raster 8 blieben nur Scheibe und Löcher. Jetzt eigener Ausschnitt (500 x 429 Einheiten ab x 50, y 131) und Raster 7,5, dazu ein dünner Rahmen, damit die Kanten gewollt wirken.
- **Dreifacher Überdruck wird fast schwarz.** Der Versuch, die H1 in Violett zu setzen und zwei Kopien (Blau, Rosa) darüber zu legen, ergab durch dreimal multiply ein Marineschwarz ohne Farbe. Zurück auf Blau plus eine rosa Kopie: Violett entsteht nur in der Überlappung.
- **`container-type` erzeugt einen eigenen Stapelkontext.** Darin mischt `multiply` nur mit dem Inhalt des Containers, nicht mit dem Papier. Für Rosa auf Papier fällt das nicht auf, für andere Farben kann es.
- **Punktschatten verschwand oder überdeckte die Karte.** Mit einer Pseudoebene lag der Schatten hinter dem Abschnittsgrund oder die Kartenfläche deckte ihn ab. Lösung: `isolation:isolate` plus zwei Ebenen (`z-index:-2` Punkte, `-1` Fläche).
- **Kaufknopf mit Punktschicht über dem Blau.** Hat der Knopf selbst eine Hintergrundfarbe, liegt eine negative Pseudoebene darüber. Hintergrund und Rahmen gehören deshalb auch beim Knopf auf `::after`.
- **Kopfzeile am Handy brach um.** Logo, Warenkorb und Menü passten bei 390 px nicht in eine Zeile (Höhe 105 statt 61 px). Das Logo-Zeichen entfällt unter 430 px, die 350-px-Regel muss im CSS NACH der 430-px-Regel stehen, sonst wird sie überschrieben.
- **Hero bei 1000 bis 1024 px schrumpfte die H1 auf 54 bis 57 px**, weil die Bildspalte fest 460 px breit war. Jetzt `clamp(380px,34vw,480px)` und unter 1100 px der Tablet-Aufbau mit voller Zeilenbreite (112 px).
- **Der Kaufknopf lag am Handy bei y 1034**, solange das Bild vor dem Text stand. Reihenfolge am Handy: Kopf, Text mit Preis und Knopf, danach das Bild.
- **Die Skript-Prüfung auf Gedankenstriche mit `grep -P` meldet Treffer bei €, „ und “** (gleiche Bytes im Nicht-UTF-8-Modus). Stattdessen mit Python auf die Zeichen mit den Codes 8211 und 8212 prüfen (`chr(8211)`, `chr(8212)`).
- **`<pattern>` in einem `display:none`-SVG wird nicht gezeichnet.** Die Muster für Symbole stehen in einem SVG mit `width="0" height="0"` und `position:absolute`.

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge: erst lauffähige Demo, dann drei Durchgänge, nach jedem Prüfskript und Bildschirmfotos. Von impeccable war nur die `SKILL.md` lesbar (Startskript und `craft-floor.md` fehlen), die Regeln daraus sind auf die Kurzregeln des Auftrags gestützt.

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Eyebrow "Elektrischer Gemüseschneider" als gefülltes rosa Etikett über der H1 | Schlichter Text mit einer wachsenden Punktreihe davor | Der Skill verbietet Badges und Pill-Tags im Hero. |
| gpt-taste | Preisschild und Kaufknopf nebeneinander, der Knopf schwebte mittig (y 511 bis 579 neben Karte y 467 bis 623) | Untereinander, gleiche Breite (max. 30 rem), Knopf y 638 bis 706 | Eine senkrechte Blickführung H1, Untertitel, Sterne, Preis, Knopf (Aufmerksamkeit bis Handlung). |
| gpt-taste | Abstände gemischt: Hero unten 64, Zahlenleiste 40, Abschnitte 96, Fußzeile 40 und 64 | Eine Variable `--kapitel` (96 px PC, 64 px Tablet und Handy), Zahlenleiste und Fußzeile 64 | Gleichmäßige Stufen aus der Reihe 8, 16, 24, 40, 64, 96. |
| gpt-taste | Bildspalte fest 460 px, die H1 schrumpfte bei 1000 bis 1024 px auf 54 bis 57 px | `clamp(380px,34vw,480px)`, unter 1100 px volle Zeilenbreite für die H1 (112 px, 2 Zeilen), `align-self:center` für das Bild | Die Überschrift soll breit fließen und höchstens 2 Zeilen brauchen (PC 91 px, 1440 px 87 px, 2 Zeilen). |
| gpt-taste | Raster ohne Prüfung auf Lücken | `grid-auto-flow:dense` und Prüfskript: Funktionen 4, 2 x 2 und 1 Spalte, Ablauf und Bewertungen 3 Spalten (PC) und 1 Spalte, Zahlen 4, 2 x 2, 1 | Lückenloses Raster bei 390, 820 und 1280 px, `main{overflow-x:clip}` gegen Überlauf. |
| impeccable | Trennlinien der Zahlenleiste als `border-left` (Seitenstrich) | Senkrechte Punktreihe aus `radial-gradient` (am Handy waagerecht) | Passt zum Look und vermeidet den Seitenstreifen-Anti-Pattern. |
| impeccable | Punktfeld hinter dem Hero reichte bis unter das Ende der Überschrift (x etwa 730 bei 1280 px) | Maske nur über der Bildspalte, am Tablet unten rechts, am Handy unten | Text steht auf ruhigem Papier, ein Blickfang pro Bildschirm. |
| impeccable | Eyebrow und Etikett "Beispiel" mit 13 px, Passermarken mit 80 % Deckkraft, Kontraste nur gerechnet | 14 px, Passermarken 50 %, Kontrast über alle 63 Textknoten gemessen (Fließtext mindestens 5,65 : 1, Kaufknopf 4,7 : 1, große Schrift mindestens 4,12 : 1) und in die Token-Kommentare geschrieben | Kleinste Schrift lesbar, Dekoration tritt zurück, jede Zahl belegt. |
| impeccable | Versuch: H1 in Violett mit zwei Kopien (Blau, Rosa) für mehr Kontrast | Rückgängig, wieder Blau mit rosa Kopie | Dreifachdruck wurde fast schwarz und nahm dem Look die Farbe. Blau bleibt als volle Fläche dem Kaufknopf vorbehalten, an der Überschrift ist es nur Kante. |
| emil-design-eng | `scroll-behavior:smooth` auf der ganzen Seite | Entfernt (Sprünge per Tastatur springen) | Tastatur-Aktionen nie animieren, die Kopfzeile ist über `scroll-padding-top` ausgeglichen. |
| emil-design-eng | Hover auf Warenkorb und Menü mit `background-color .16s` | Farbwechsel sofort, nur `transform` mit `cubic-bezier(.23,1,.32,1)` in 120 ms animiert | Nur `transform` und `opacity` animieren, nie eingebaute Kurven. |
| emil-design-eng | Warenkorb-Zähler sprang ohne Rückmeldung | Hüpfer `scale(1.2)` für 120 ms nur bei Maus oder Touch (`e.detail > 0`), nie bei Enter und nicht bei reduzierter Bewegung (getestet: Enter erhöht auf 2, Klasse bleibt leer) | Rückmeldung für Zeigen, keine Animation für Tastatur. |
| emil-design-eng | Hero-Platten: 280 ms `transform` plus 200 ms `opacity linear` | 240 ms mit eigener Kurve für beides, die blaue Platte 60 ms später; Start bei `translate(9px,7px)` und Deckkraft 0, nie bei `scale(0)` | Unter 300 ms, kein `linear`, Staffel von 60 ms wie ein zweiter Druckgang. |
| emil-design-eng | Fußlinks mit `:active`, aber ohne Übergang, mit Standard-Tap-Highlight | `transition: transform .12s`, `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation` | Jedes drückbare Element antwortet gleich schnell (Kaufknopf hatte `scale(.97)` und Hover unter `(hover:hover) and (pointer:fine)` von Anfang an). |

Konflikte: gpt-taste verlangt zwei Kaufknöpfe, einen massiven Aufruf in der Fußzeile, GSAP-Bewegung, Bilder mit Filtern und keine Datenblöcke im Hero. Nach den Regeln des Nutzers gibt es genau einen Kaufknopf, keine Bibliothek und einen Pflichttext mit Preisblock im Hero, das hat Vorrang. Emils 300-ms-Grenze gilt für alle Oberflächen: Der einmalige Druck-Auftritt des Hero-Bilds (240 ms) liegt darunter, es gibt keine Dauerbewegung. Von impeccable wirkte die Warnung vor Reizüberflutung nur bei den Überdruck-Kanten, die bleiben als Kern des Looks.

## Anwenden
1. **Stylesheet:** `vorlage/style.css` nach `assets/style.css` des Shops kopieren, `vorlage/script.js` als `assets/halftone.js` einbinden (mit `defer`) und im `<head>` vor dem Stylesheet `<script>document.documentElement.classList.add('js');</script>` setzen. Die Klasse `js` schaltet Canvas, Menü und Standbild-Wechsel frei.
2. **Schriften:** `Anton-400.woff2`, `DMSans-400.woff2`, `DMSans-700.woff2` und die beiden Lizenzdateien aus `../design-vorlagen/fonts` nach `assets/fonts/` kopieren, in `style.css` die drei `url("../../design-vorlagen/fonts/...")` auf `url("fonts/...")` ändern, Anton per `preload` laden.
3. **Hero-Gerüst:** `<div class="hero__bild" id="bild" role="img" aria-label="...">` mit `<div class="bild__raum" id="bildraum">`, darin zwei `<canvas class="ebene ebene--rosa|ebene--blau" aria-hidden="true">` und das Standbild `<svg class="bild__stand">`. Die Überschrift bekommt `class="ueber"` und `data-t` mit dem Text, `.h1`, `.h2` und `.nr` nutzen den Überdruck.
4. **Klassen:** `.rahmen`, `.kopf` mit `.logo`, `.nav`, `.korb`, `.menue`; `.hero__innen` mit `.hero__kopf`, `.hero__text`, `.hero__bild`; `.eyebrow`, `.h1`, `.h2`, `.h3`; `.druck` und `.druck--blau` (Punktschatten für Karten), `.cta` (Kaufknopf), `.rampe` mit `.rampe--ein` und `.rampe--aus`; `.zahlen` mit `.kachel`, `.karten` mit `.karte`, `.schritte` mit `.schritt`, `.stimmen` mit `.stimme` und `.marke`, `.china`, `.fuss`. Die Haken des Skills ein-produkt-shop sinngemäß abbilden: `.knopf` auf `.cta`, `.glas` auf `.druck`, `.kachel` auf `.kachel`, `.schritt` auf `.schritt`. Das Hero-Element `.welt` des Glas-Looks entfällt.
5. **Szene anpassen:** In `szene()` in `script.js` stehen alle Formen als `teil(pfad, Rosa, Blau, ueberdruck)`. Neues Produkt: Formen in Silhouette zeichnen, nichts unter etwa 20 Einheiten, dunkle Flächen mit Dichte 0,8 bis 1, helle Flächen mit Papier (`teil(..., 0, 0)`). Den Handy-Ausschnitt in `bauen()` prüfen (`x0`, `y0`, Breite 500 Einheiten). Danach das Standbild mit `python3 standbild-erzeugen.py` neu erzeugen und in `.bild__raum` einsetzen.
6. **Prüfen:** Tablet-Breite 720 bis 900 px (Kopfzeile bleibt einzeilig dank Menü), 320 px, Größenwechsel PC zu Handy (Canvas muss neu bauen), reduzierte Bewegung, ohne JavaScript (Standbild), Zoom 125 %, Fokus per Tastatur. Danach `../design-vorlagen/references/umstellen.md` (Reihenfolge für das Umstellen eines bestehenden Shops: Schriften, Stylesheet, Generator, Favicon, Prüfung) und der CHECK von ein-produkt-shop.

## Dateien
- `vorlage/demo.html` Startseite von HORTA im Look (Hero, Zahlenleiste, Funktionen, Ablauf, Bewertungen, Hinweis China, Fußzeile), mit Standbild-SVG
- `vorlage/style.css` alle Regeln, Farben und Stufen als Variablen in `:root`
- `vorlage/script.js` Menü, Warenkorb-Zähler (nur Demo), Szene, Abtastung und Rasterung der zwei Platten
- `vorlage/standbild-erzeugen.py` erzeugt das Standbild-SVG für den Fall ohne JavaScript
- `vorlage/rampe-erzeugen.py` erzeugt die Data-URI-Kachel der Punktrampe in Tinte, Rosa und Blau
- Schriften: `../design-vorlagen/fonts/Anton-400.woff2`, `DMSans-400.woff2`, `DMSans-700.woff2`, `Anton-LICENSE.txt`, `DMSans-LICENSE.txt`
