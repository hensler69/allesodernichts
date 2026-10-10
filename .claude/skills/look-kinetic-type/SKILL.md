---
name: look-kinetic-type
description: Der Look "Kinetic Type" (bewegte Typografie) macht die Schrift zum Bild. Papierfarbener Grund, schwarze Tinte, eine riesige Überschrift in der variablen Schrift Anybody, deren Gewicht und Breite auf Scrollen und Mauszeiger reagieren, dazu gegenläufige Laufbänder und ein Kaufknopf in Orangerot als einzige Farbe. Verwenden bei "Kinetic Type", "bewegte Typografie", "Schrift-Look", "variable Schrift", "Laufband", "Marquee", "kinetic typography", "variable font design", "Design-Vorlage kinetic-type", wenn ein Ein-Produkt-Shop mit starkem Slogan und ohne gutes Produktfoto auskommen soll oder wenn ein Hero allein aus Buchstaben gebaut wird.
---

# Look: Kinetic Type

Gebaut und getestet am HORTA-Gemüseschneider (Startseite). Demo: `vorlage/demo.html`, Stylesheet: `vorlage/style.css`, Skript: `vorlage/script.js`.
Idee: Die Schrift ist das Bild. Die H1 "Weniger schnippeln. Mehr Salat." füllt die ganze Breite (bei 1280 px etwa 151 px hoch). Jeder Buchstabe hat sein
eigenes Gewicht, daraus entsteht eine Welle aus dicken und dünnen Buchstaben, die beim Scrollen und beim Bewegen der Maus wandert. Das Produktbild ist nur eine flache, schwarze Scheibe.

## Wann der Look passt / Wann nicht
Passt, wenn der Slogan stark ist und das Produkt eine Tätigkeit verspricht (schneiden, raspeln, reiben, mixen, bohren, tragen), wenn es kein gutes eigenes Foto gibt
(typisch bei Ware von AliExpress) und wenn die Seite mutig wirken darf. Der orangerote Kaufknopf ist auf Papier und Schwarz sofort zu finden.
Passt nicht, wenn das Foto den Kauf verkauft (Mode, Schmuck, Möbel), bei Ruhe, Luxus, Baby, Gesundheit oder wenn der Slogan lang ist (mehr als etwa 22 Zeichen
pro Zeile, dann wird die Schrift zu klein für den Effekt). Auch nicht bei Zielgruppen, die Bewegung und wechselnde Schriftstärke schlecht vertragen.

## Merkmale
- Grund Papier #f4f1e8, Text und Linien Tinte #111, dazu ein zweiter Papierton für Flächen. Orangerot #ff4d00 steht an genau einer Stelle: dem Kaufknopf.
- H1 in Anybody, jeder der 28 Buchstaben ein eigenes `<span>`. Das Gewicht läuft als Welle durch die Buchstaben (gemessen 300 bis 900). Die Breite gleicht das Gewicht aus, die Zeilenbreite bleibt dadurch fast gleich (gemessen 7,17 bis 7,34 em ohne Zeiger).
- Scrollen setzt Grundgewicht (640 bis 500) und verschiebt die Welle. Der Mauszeiger (nur Maus) verschiebt sie ebenfalls und ändert die Breite um höchstens plus minus 3 Punkte. Das Skript schreibt nur drei CSS-Variablen auf den Titel-Container.
- Auftritt: Die Buchstaben fallen beim Laden gestaffelt an ihren Platz (30 ms Abstand, 280 ms je Buchstabe, nur `transform` und `opacity`), danach rutschen vier Gemüsescheiben im Bild nach.
- Zwei Laufbänder in Gegenrichtung mit "SCHNEIDEN · RASPELN · REIBEN": oben schwer in Papier auf Tinte, unten hauchdünn (Gewicht 200) in Tinte auf Papier. Sie pausieren bei Maus, Fokus und mit einem Pausenknopf, bei reduzierter Bewegung stehen sie still.
- Hero-Bild: Kegel-Einsatz als große Scheibe mit Zahnkranz, fünf Löchern mit Klinge und vier Gemüsescheiben darunter. Nur Tinte, Papier und Papier tief, als SVG ohne Bilddatei.
- Alle Kästen (Zahlen, Funktionen, Ablauf, Bewertungen) sind gleich gebaut: 2 px Linien, keine Lücken, Abstände nur in sieben Stufen (4, 8, 16, 24, 40, 64, 96 px).
- Handy ist ein eigener Entwurf: H1 in 3 Zeilen (84 px), Zeiger-Effekt aus, nur Scroll-Welle, Scheibe unten angeschnitten, Nav als Wischstreifen, Kaufknopf im ersten Bildschirm (Unterkante 824 px bei 844 px Höhe).

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--papier` | #f4f1e8 | Seitengrund, Kästen, Laufband unten |
| `--papier-tief` | #e8e3d2 | Fläche für den Ablauf-Abschnitt, Schatten der Scheibe, Gemüsescheiben |
| `--tinte` | #111111 | Text (16:1 auf Papier), alle Linien, Laufband oben, Hinweisblock, Scheibe, Fokusring |
| `--tinte-leise` | #3f3b33 | Nebentext (Preiszeile klein, Fußnote), 9,87:1 auf Papier |
| `--signal` | #ff4d00 | nur der Kaufknopf (Tinte darauf 5,68:1, große Schrift) |

Fokusring: 3 px Tinte (auf dem Hinweisblock Papier), 3 px Abstand. Am Kaufknopf 10 px Abstand, damit er nicht mit dem harten Schatten verschmilzt.

## Schriften
| Familie | Gewicht | Datei (aus `../design-vorlagen/fonts/`) | Wofür |
| --- | --- | --- | --- |
| Anybody (variabel) | 100 bis 900, Breite 50 bis 150 % | `Anybody-variable.woff2` (56 KB) | Logo, H1, H2, H3, Zahlen, Preis, Laufbänder, Kaufknopf, Zitate (nie Fließtext) |
| DM Sans | 400 | `DMSans-400.woff2` | Fließtext, nie unter Gewicht 400 |
| DM Sans | 500 | `DMSans-500.woff2` | Navigation, Sterne-Zeile, Fußlinks |
| DM Sans | 700 | `DMSans-700.woff2` | Eyebrow, Preiszeile, Marke "Beispiel" |
Zusammen 97 KB. Im `@font-face` steht für Anybody `font-weight:100 900; font-stretch:50% 150%;`. Lizenztexte `Anybody-LICENSE.txt` und `DMSans-LICENSE.txt` liegen im selben Ordner.

## So ist er gebaut

**1. H1 als Buchstaben-Spans, Gewicht als Welle, Breite gleicht aus**
```html
<h1 class="h1" aria-label="Weniger schnippeln. Mehr Salat.">
  <span class="zeile zeile--1" aria-hidden="true"><span class="wort"><span class="b" style="--i:0;--r:-13deg">W</span><span class="b" style="--i:1;--r:2deg">e</span> ...</span> ...</span>
  <span class="zeile zeile--2" aria-hidden="true"> ... </span>
</h1>
```
```css
.hero__innen{container-type:inline-size;--R:7.8;--fs:calc(100cqw / var(--R))}   /* Schriftgröße = Containerbreite / größte Zeilenbreite in em */
.titel{--w:640;--ph:2.5;--b:0;--basis:82;--komp:.0433;--amp:220}
.h1{font:900 var(--fs)/.86 var(--anybody);text-wrap:nowrap}
.zeile{display:block;white-space:nowrap;height:.86em}
.b{display:inline-block;font-weight:640;font-stretch:72%}            /* Rückfall ohne sin() */
@supports (width:calc(sin(1) * 1px)){
  .b{--wi:clamp(300,calc(var(--w) + var(--amp) * sin(var(--i) * .55 + var(--ph))),900);
    font-weight:var(--wi);
    font-stretch:calc((var(--basis) + var(--b) - var(--komp) * (var(--wi) - 400)) * 1%)}   /* dickere Buchstaben werden schmaler */
}
```
Der Ausgleich (`--komp`) stammt aus einer Messung: pro Gewichtspunkt braucht eine Zeile 0,0052 em mehr, pro Breitenpunkt 0,12 em. Deshalb wird die Breite um 0,0433 Punkte je Gewichtspunkt gesenkt. Die Buchstaben-Spans erzeugt ein kleines Skript einmal beim Bauen (Schleife über die Wörter, `--i` fortlaufend, `--r` wechselt zwischen minus 13 und plus 13 Grad), im fertigen HTML steht alles statisch. Die H1 hat den Klartext als `aria-label`, die Zeilen sind `aria-hidden`. Der Zugänglichkeitsbaum nennt "heading Weniger schnippeln. Mehr Salat. (level 1)" ohne Einzelbuchstaben.

**2. Skript: nur Variablen, nur auf Anfrage, gedrosselt**
```js
function schreiben() {
  laeuft = false;
  if (ruhe.matches || document.hidden || !istSichtbar) return;      /* reduzierte Bewegung, Tab verdeckt, H1 nicht im Bild */
  var jetzt = performance.now();
  if (jetzt - letzte < 30) { anstossen(); return; }                 /* höchstens alle 30 ms schreiben */
  letzte = jetzt;
  jetztX += (zielX - jetztX) * 0.16;                                /* Zeiger weich nachführen */
  titel.style.setProperty('--w',  (640 - 140 * p).toFixed(1));
  titel.style.setProperty('--ph', (2.5 + y * 0.011 + (jetztX - 0.5) * 5).toFixed(3));
  titel.style.setProperty('--b',  ((jetztX - 0.5) * 6).toFixed(2));
  if (jetztX !== zielX) anstossen();
}
function anstossen() { if (laeuft) return; laeuft = true; requestAnimationFrame(schreiben); }
window.addEventListener('scroll', anstossen, { passive: true });
```
Es gibt keine Dauerschleife: Ein Bild wird nur nach Scroll oder Mausbewegung angefordert, im Ruhezustand sind es 0 `requestAnimationFrame` pro Sekunde (vom Prüfskript gemessen). Der Zeiger-Teil hängt nur an `(hover:hover) and (pointer:fine)`, ein `IntersectionObserver` hält alles an, solange die H1 nicht im Bild ist. Die CSS-Startwerte (`--w:640`, `--ph:2.5`) sind genau die Werte, die das Skript bei Scroll 0 und Zeiger in der Mitte schreibt, sonst springt das Gewicht beim ersten Scrollen.

**3. Gestufte Werte gegen Ruckeln**
```css
@supports (width:round(10px,5px)){
  .b{--wi:round(clamp(300,calc(var(--w) + var(--amp) * sin(var(--i) * .55 + var(--ph))),900),20);
    font-stretch:round(calc((var(--basis) + var(--b) - var(--komp) * (var(--wi) - 400)) * 1%),2%)}
}
```
Jeder neue Wert aus Gewicht und Breite erzeugt im Browser einen neuen Schriftschnitt. Mit Stufen (Gewicht in 20er-, Breite in 2er-Schritten) gibt es viel weniger davon. Messung: Scroll durch den Hero mit vierfach gebremster CPU, 89 Bilder. Ohne Stufung und ohne Drosselung brauchten 8 bis 14 Bilder länger als 33 ms (PC und Handy), mit beidem 0 bis 1 (drei Läufe). Ohne Skript sind es 0.

**4. Laufbänder in Gegenrichtung, pausierbar**
```html
<div class="band band--a" aria-hidden="true"><div class="spur"> <!-- 2 gleiche Sätze, je 3 mal "SCHNEIDEN · RASPELN · REIBEN ·" --> </div></div>
<p class="sr">Schneiden, Raspeln, Reiben.</p>
```
```css
.spur{display:flex;width:max-content;animation:lauf 40s linear infinite}
.band--b .spur{animation-direction:reverse}
@keyframes lauf{to{transform:translateX(-50%)}}                       /* 2 gleiche Hälften, die Schleife springt nicht */
.baender:focus-within .spur,.baender--halt .spur{animation-play-state:paused}
@media (hover:hover) and (pointer:fine){.baender:hover .spur{animation-play-state:paused}}
@media (prefers-reduced-motion:reduce){.spur{animation:none;width:auto;display:block}
  .satz:not(:first-child),.satz span:not(:first-child){display:none}}  /* Standbild: ein Satz, bricht um */
```
Der Pausenknopf ist ein `<button aria-pressed>` mit fester Beschriftung "Laufbänder anhalten" und steht per `hidden` zuerst unsichtbar, das Skript zeigt ihn. Ohne JS läuft das Band trotzdem per CSS. Hohle Schrift (`-webkit-text-stroke`) zeigte bei der variablen Schrift die inneren Überlappungen der Konturen, deshalb ist das untere Band dünn gefüllt.

**5. Kaufknopf: Beschriftung rollt bei Maus-Hover durch**
```html
<button class="cta" type="button"><span class="cta__clip"><span class="cta__text" data-text="In den Warenkorb">In den Warenkorb</span></span></button>
```
```css
.cta{background:var(--signal);border:3px solid var(--tinte);box-shadow:6px 6px 0 var(--tinte);transition:transform 160ms cubic-bezier(.23,1,.32,1)}
.cta__clip{display:block;overflow:hidden}
.cta__text{display:block;position:relative;transition:transform 200ms cubic-bezier(.23,1,.32,1)}
.cta__text::after{content:attr(data-text);content:attr(data-text) / "";position:absolute;left:0;top:100%;margin-top:.4em}
@media (hover:hover) and (pointer:fine){.cta:hover{transform:translate(-2px,-2px)} .cta:hover .cta__text{transform:translateY(calc(-100% - .4em))}}
.cta:active{transform:scale(.97)}
```
Das Duplikat steckt im `::after` mit `/ ""` als Ersatztext, so liest ein Screenreader die Beschriftung nur einmal, und der Text des Knopfs bleibt exakt "In den Warenkorb". Die Rolle läuft nur bei Maus, nie bei Tastatur.

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge wie gefordert, nach jedem Durchgang Prüfskript und Bildschirmfotos. Von impeccable lag nur die `SKILL.md` vor, die genannten Unterdateien (`reference/craft-floor.md` und andere) und das Startskript fehlten. Für impeccable galten deshalb die SKILL.md (Brief gewinnt, nur gezielt verbessern, begrenzt prüfen) und die Kurzregeln aus dem Auftrag (Rollen, Hierarchie, gemessener Kontrast, sichtbarer Fokus).

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Zeilenbreite nicht über alle Zustände geprüft. Messung über Gewicht, Welle und Zeiger (plus minus 5): Zeile 1 bis 7,89 em breit bei Platz für 7,4 em, also 6,6 % zu breit | Zeiger auf plus minus 3 begrenzt, `--R` von 7,4 auf 7,8: größte Zeile 7,70 em (1,3 % Luft). Gemessen 2 Zeilen bei 721 bis 2560 px, 3 Zeilen am Handy | Hero-Rechnung: H1 darf nie umbrechen oder überlaufen |
| gpt-taste | CSS-Startgewicht 620, Skript schrieb beim ersten Scrollen 740: sichtbarer Sprung der ganzen Zeile | Startwerte in CSS und Skript gleich (`--w:640`, `--ph:2.5`), beim Scrollen um 1 px ändert sich höchstens ein Buchstabe um eine Stufe (20) | Keine Sprünge im Layout |
| gpt-taste | 17 verschiedene Abstandswerte (.25rem bis 5rem), Abschnitte 80 px | Nur 7 Stufen (4, 8, 16, 24, 40, 64, 96 px), Abschnitte 96 px oben und unten (Handy 64) | Gleichmäßige, großzügige Abstandsstufen |
| gpt-taste | Zahlenleiste: erste Kachel ohne Innenabstand und Linie, Ablauf und Bewertungen als lose Karten mit Lücken | Alle vier Raster (Zahlen, Funktionen, Ablauf, Bewertungen) als gleiche Kästen mit 2 px Linien, ohne Lücken | Lückenloses Raster |
| gpt-taste | Kaufknopf-Unterkante am Handy bei 935 px (Fenster 844 px), PC 1280 x 800 bei 792 px | Preis als zwei Spalten (Betrag links, zwei Zeilen rechts), engere Handy-Abstände: Handy 824 px, PC 766 px, 1100 x 800 bei 743 px | Blickführung bis zur Handlung ohne Scrollen |
| impeccable | Fokusring im Wischstreifen am Handy: nur zwei senkrechte Balken sichtbar, oben und unten abgeschnitten | `outline-offset:-3px` im Streifen: voller Rahmen sichtbar (Bildschirmfoto geprüft) | Sichtbarer Fokus |
| impeccable | Fokusring am Kaufknopf (3 px Abstand) lief mit dem harten Schatten zusammen | 10 px Abstand: Ring liegt frei um Knopf und Schatten | Sichtbarer Fokus, Rolle des Schattens klar |
| impeccable | Warenkorb-Zähler als gefüllte Tinte-Scheibe: zweiter schwerer dunkler Fleck neben dem Kaufknopf | Zähler nur als Umriss. Gefüllt und farbig ist allein der Kaufknopf | Ein Blickfang pro Bildschirm |
| impeccable | Pausenknopf wechselte die Beschriftung und trug `aria-pressed`: Screenreader sagt den Zustand doppelt | Beschriftung fest, nur `aria-pressed` ändert sich | Barrierefreiheit |
| impeccable | Hero-Abschnitt mit `aria-labelledby` auf die H1: Zugänglichkeitsbaum nennt Region und Überschrift mit gleichem Namen. Kleinste Schrift 12,8 px (Marke "Beispiel") | Landmark entfernt, Marke auf 14 px. Gemessen: 59 Textelemente, kleinster Fließtext 9,87:1, Kaufknopf-Text 5,68:1 (große Schrift), nichts unter Soll | Kontrast gemessen, nicht geglaubt |
| emil-design-eng | Kaufknopf: `transition: transform .2s ease, box-shadow .2s ease`, Hover ohne Medienabfrage, kein `:active` | `transition: transform 160ms cubic-bezier(.23,1,.32,1)`, Hover nur unter `(hover:hover) and (pointer:fine)`, `:active` scale(.97) (gemessen matrix 0,97) | Nie `ease`, nur `transform`, Rückmeldung beim Drücken |
| emil-design-eng | Logo, Navigation, Warenkorb, Pausenknopf und Fußlinks ohne Druck-Rückmeldung, Unterstreichung bei Hover auch am Handy | Alle mit `:active{transform:scale(.97)}` (160 ms), Hover-Unterstreichung nur mit Maus | Jedes drückbare Element reagiert |
| emil-design-eng | Buchstaben 500 ms je, Staffel 28 ms, Gemüsescheiben 600 ms | Je 280 ms, Staffel 30 ms, Scheiben 280 ms (alles `transform` und `opacity`, keine Skalierung ab 0) | UI-Animationen unter 300 ms, Staffel 30 bis 80 ms |
| emil-design-eng | Der Skill warnt vor vererbten CSS-Variablen. Gemessen am Look: 8 bis 14 von 89 Bildern über 33 ms beim Scrollen (4-fach gebremste CPU), ohne Skript 0 | Gestufte Werte per `round()` und Schreiben höchstens alle 30 ms: 0 bis 1 von 89 in drei Läufen. `contain: layout` allein half nicht (19 von 89 am PC im Einzellauf) und wurde verworfen | Messen statt vermuten |
| emil-design-eng | `scroll-behavior:smooth` auf der Seite, Laufband-Pause bei `:hover` auch auf Touch (ein Tipp hätte das Band dauerhaft angehalten) | Sanftes Scrollen entfernt (Tastatur-Sprünge nie animieren), Hover-Pause nur mit Maus, Fokus und Knopf pausieren auch | Tastatur-Aktionen nie animieren, Hover nur mit feiner Maus |

Konflikte: Der Brief verlangt Scroll-Kopplung über CSS-Variablen am H1-Container, der Skill rät davon ab. Der Look lebt davon (Schriftachsen sind weder `transform` noch `opacity`), deshalb bleibt es bei einem Container, aber gestuft, gedrosselt und gemessen. GSAP und Bilder aus dem Netz verbietet der Auftrag (nur Vanilla-JS, nichts aus dem Netz). Sterne und Preis im Hero verlangt der Auftrag, auch wenn gpt-taste Zahlen dort verbietet. Das Laufband läuft endlos, WCAG verlangt dafür eine Pause: Hover, Fokus und Knopf, bei reduzierter Bewegung steht es still.

## Pro
- Der Kaufknopf ist das einzige Farbige auf der Seite. Orangerot auf Papier und Tinte findet jeder sofort, dazu läuft die Beschriftung bei Maus-Hover einmal durch.
- Keine Bilddatei und kein Foto: 29 KB ohne Schriften (HTML 14, CSS 13, JS 3), Schriften 97 KB, 7 Anfragen. Die Scheibe ist ein SVG von 1,8 KB im HTML.
- Sehr gute Lesbarkeit des Fließtextes: kleinster gemessener Wert 9,87:1 (Nebentext), Haupttext 16:1. Der Effekt sitzt nur auf H1, nicht auf Texten zum Lesen.
- Stabiles Layout: Achsen-Sweep über Gewicht, Welle und Zeiger, keine Zeile bricht um, kein waagerechter Überlauf bei 14 geprüften Breiten von 360 bis 2560 px.
- Ruhig im Stand: 0 `requestAnimationFrame` pro Sekunde, 2 endlose CSS-Animationen (die Laufbänder), bei reduzierter Bewegung 0.
- Trägt ein Produkt ohne eigenes Foto: Die Typografie verkauft, die Scheibe ist nur Zeichen. Das passt zu Ware, deren Fotos nicht freigegeben sind.

## Contra
- Jeder neue Slogan braucht Handarbeit: Buchstaben-Spans erzeugen, die größte Zeilenbreite über alle Zustände messen und `--R` setzen. Ohne Ausgleich schwankt die Zeile um 20 % (6,59 bis 7,89 em).
- Die variable Schrift ist die größte Datei (56 KB), und das Verändern der Achsen kostet Rechenzeit: Ohne Stufung und Drosselung ruckelte das Scrollen (8 bis 14 von 89 Bildern langsam bei gebremster CPU). Es wurde nur in Chromium ohne Grafikkarte gemessen, nicht auf einem echten Handy.
- Braucht neuere CSS-Funktionen (`sin()`, `round()`, Container-Einheiten `cqw`). Der Rückfall ist ruhig (Gewicht 640, Breite 72 %), die Welle fehlt dann. Safari und Firefox wurden nicht getestet.
- Die Scheibe sieht auf den ersten Blick aus wie eine Filmspule. Wer das Produkt zeigen muss, braucht ein Foto oder eine genauere Zeichnung.
- Das dünne Laufband (Gewicht 200) ist bei 104 px gut lesbar, bei kleiner Schrift wäre es zu schwach. Hohle Schrift funktioniert mit der variablen Schrift nicht (Konturen überlappen).
- Bewegung ist Pflicht für den Look. Zusätzlich zum Laufband braucht es einen Pausenknopf und Pflege für reduzierte Bewegung, das sind mehr Teile als bei einem ruhigen Look.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Einzige Farbe am Kaufknopf und ein starker Slogan wirken sofort, aber ohne Produktbild fehlt etwas Verlangen. |
| Lesbarkeit | 4 | Fließtext 9,9 bis 16:1 in DM Sans, nur die wandernden Gewichte der H1 kosten kurz Lesezeit. |
| Handy | 4 | Eigener Entwurf mit H1 in 3 Zeilen, Kaufknopf im ersten Bildschirm und 44-px-Zielen, Zeiger-Effekt entfällt. |
| Tempo | 4 | 29 KB plus 97 KB Schrift, im Ruhezustand keine Schleife, beim Scrollen nach Stufung 0 bis 1 von 89 langsamen Bildern. |
| Barrierefreiheit | 4 | Kontrast gemessen, H1 mit Klartext, Fokus überall sichtbar, Pausenknopf und Standbild, nur Dauerbewegung bleibt. |
| Aufwand (5 = wenig Aufwand) | 3 | Kein Foto nötig, aber Slogan-Spans, Zeilenmessung und Rückfälle brauchen einen Durchgang pro Shop. |
| Risiko (5 = geringes Risiko) | 3 | Neue CSS-Funktionen und Achsen-Animation sind nur in einem Browser geprüft, lange Slogans passen nicht. |

## Passt besonders zu
Küchen- und Haushaltsgeräten mit klaren Tätigkeiten (schneiden, mixen, putzen), Werkzeug, Sport- und Fitnesszubehör, allem mit einem kurzen, kräftigen Slogan.
Produkten ohne gutes Foto, bei denen Text und Zahlen den Kauf tragen.

## Passt nicht zu
Mode, Schmuck, Möbel und Kosmetik, die vom Bild leben. Ruhe-, Luxus-, Baby- und Gesundheitsprodukten oder Slogans mit mehr als etwa 22 Zeichen pro Zeile.

## Stolperfallen
- Ohne ausdrückliche `grid-row` rutschte die H1 unter die Scheibe und war scheinbar unsichtbar (Gitter platzierte sie hinter die Bildzeile). Eyebrow, Titel, Text und Bild bekommen feste Zeilen, am Handy `grid-row:auto`.
- Die feste Zeilenhöhe `.zeile{height:.86em}` überlappte am Handy, weil dort Zeile 1 aus zwei Wörtern in zwei Zeilen besteht. Für diesen Fall `height:1.72em`.
- Die Kurzschreibweise `font:` setzt `font-stretch` zurück. Die Breite immer nach `font` setzen.
- `--R` hängt von Text und Schrift ab. Nach jeder Textänderung den Sweep laufen lassen (Gewicht, Welle, Zeiger durchfahren, rechten Rand der längsten Zeile messen), sonst läuft eine Zeile in den Rand.
- Startwerte in CSS und Skript müssen gleich sein, sonst springt die H1 beim ersten Scrollen (zuerst 620 gegen 740).
- Laufband: Ein Leerzeichen am Ende eines Flex-Elements verschwindet, die Sätze klebten aneinander. Der Abstand kommt jetzt von `.punkt{margin-inline:.3em}`. Pro Spur braucht es drei Sätze, sonst entsteht bei 2560 px Breite am Ende eine Lücke.
- Das Zeichen "·" sieht in Anybody wie ein kurzer Strich aus. Es steckt in einem eigenen `<i class="punkt">`, damit Abstand und Größe stimmen.
- Bei reduzierter Bewegung zeigte das Laufband zunächst den abgeschnittenen Anfang der langen Spur. Im Standbild nur ersten Satz zeigen und umbrechen lassen.
- Fokusring im Wischstreifen der Navigation wird vom Streifen abgeschnitten (`overflow-x:auto` schneidet auch oben und unten). Ring nach innen legen.
- Der Duplikat-Text für die Knopf-Rolle ragte mit den Oberkanten in die sichtbare Beschriftung. `margin-top:.4em` am `::after` und die gleiche Strecke im `translateY`.
- `round()` und `sin()` ohne `@supports` verwenden: Ein Browser, der sie nicht kennt, würde die ganze Deklaration verwerfen und die H1 im Gewicht 400 mit Breite 100 % zeigen. Das passt dann nicht mehr in die Zeile.
- `contain: layout` am Titel brachte nichts (19 von 89 langsame Bilder). Was half: Werte stufen und das Schreiben auf alle 30 ms begrenzen.
- Ein Suchlauf mit `grep -P` nach Gedankenstrichen meldet bei Zeichen wie € und „ falsch, weil er Bytes statt Zeichen vergleicht. Mit Python und Unicode prüfen.

## Anwenden
1. `vorlage/style.css` nach `assets/style.css` des Shops kopieren. Farben nur in `:root` ändern. Die Rollen bleiben: Papier und Tinte tragen alles, Signalfarbe nur am Kaufknopf.
2. Schriften aus `../design-vorlagen/fonts/` kopieren: `Anybody-variable.woff2`, `DMSans-400.woff2`, `DMSans-500.woff2`, `DMSans-700.woff2` samt `Anybody-LICENSE.txt` und `DMSans-LICENSE.txt`. Die `@font-face`-Pfade im CSS auf den neuen Ort stellen, `font-display:swap` und die Bereiche `font-weight:100 900; font-stretch:50% 150%` für Anybody lassen.
3. Slogan in Buchstaben-Spans zerlegen (einmal beim Bauen, nicht im Browser): jedes Wort `.wort`, jede Zeile `.zeile`, jeder Buchstabe `<span class="b" style="--i:N;--r:Wdeg">`. Die H1 bekommt `aria-label` mit dem Klartext, die Zeilen `aria-hidden="true"`.
4. `--R` neu messen: Sweep über `--w` (500 bis 640), `--ph` (0 bis 6,3) und `--b` (minus 3 bis plus 3), größte Zeilenbreite in em mal 1,01 eintragen. Handy hat eigenen `--R` (dort wird Zeile für Zeile gemessen, jede Zeile eigene Breite).
5. Klassen der Demo: `.kopf .logo .nav .korb`, `.hero .hero__innen .eyebrow .titel .h1 .zeile .wort .b`, `.hero__text .untertitel .sterne .kauf .preis .cta .cta__clip .cta__text`, `.hero__bild .scheibe .stueck`, `.baender .band .band--a .band--b .spur .satz .halt`, `.zahlen .kachel .zahl`, `.abschnitt .h2 .h3 .karten .karte .schritte .schritt .nr .stimmen .stimme .marke`, `.china`, `.fuss`.
6. Passend zu den Haken des Skills `ein-produkt-shop`: Die Demo hat eigene Namen. Im Shop entweder die Selektoren im CSS ergänzen (zum Beispiel `.cta,.knopf{...}`, `.karte,.kachel{...}`, `.korb`) oder im HTML umbenennen. Die Schritte zum Wechsel (Schriften, `style.css`, Logo, Hintergrund, Favicon, Vorschaubild) stehen in `../design-vorlagen/references/umstellen.md`. Dort `WELT` leer lassen (der Grund kommt aus dem CSS) und `theme-color` auf #f4f1e8 setzen.
7. Hero-Bild neu zeichnen: Scheibe im Zeichenraum 600 mal 660, Löcher im Fünfeck, Gemüsescheiben unten. Das Handy zeigt die untere Hälfte (`.hero__bild` mit fester Höhe und `align-items:flex-end`), also Wichtiges nicht in die obere Hälfte legen.
8. Danach prüfen: Zeilen der H1 bei 1100, 1280, 1440 und 1920 px (2) und am Handy (3), Sweep, Kontrast, Tab-Fokus auch im Wischstreifen, reduzierte Bewegung (alles still, Welle als Standbild), Scrollen mit gebremster CPU, kein waagerechter Überlauf bei 390, 820 und 1280 px.

## Dateien
- `vorlage/demo.html` (HORTA-Startseite, 14 KB)
- `vorlage/style.css` (13 KB)
- `vorlage/script.js` (Titel-Welle, Pausenknopf, Warenkorb-Zähler, 3 KB)
- Schriften: `../design-vorlagen/fonts/Anybody-variable.woff2`, `DMSans-400.woff2`, `DMSans-500.woff2`, `DMSans-700.woff2`
