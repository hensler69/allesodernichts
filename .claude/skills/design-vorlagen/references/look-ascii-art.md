<!-- Kopie aus look-ascii-art/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: ASCII Art

Gebaut und getestet am HORTA-Gemüseschneider (Startseite). Demo: `vorlage/demo.html`, Stylesheet: `vorlage/style.css`, Hero-Bild: `vorlage/script.js`.
Idee: eine Welt aus Zeichen. Der Grund ist fast schwarz mit grünem Schimmer (#07100a), alles ist Monospace, Rahmen sind aus `+ - | =` gesetzt,
und das Gerät im Hero ist ein Zeichenbild, das der Browser jede Sekunde 12 Mal neu aus einem unsichtbaren Bild berechnet.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt Technik, Werkzeug, Küchengerät, Gadget, Software, Spiel oder Nerd-Geschenk ist und die Zielgruppe den Terminal-Witz
versteht. Der Amber-Knopf ist auf dem dunklen Grund sofort zu finden, weil es die einzige warme Fläche ist.
Passt nicht bei Produkten, die Wärme, Gesundheit, Babys, Mode, Luxus oder Natur versprechen, und nicht, wenn Käufer das echte Produkt in einem
Foto sehen wollen. Das Zeichenbild zeigt Form und Aufbau, aber keine Oberfläche, Farbe oder Größe im Vergleich.

## Merkmale
- Grund #07100a mit einem sehr schwachen Punktraster (ein Punkt je Zeichenzelle, Deckkraft .1). Kein Verlauf, keine Bilddatei.
- Nur eine Schriftfamilie, JetBrains Mono. Überschriften 700, Text 400. Die Schrift enthält keine Rahmenzeichen aus dem Unicode-Block Box Drawing, deshalb sind alle Rahmen aus ASCII.
- Karten, Kacheln und Hinweisblock sind Zeichenrahmen: Kopfzeile `+-- Titel -----+`, Seiten aus `|`, Fußzeile `+------+`. Der Hinweisblock nutzt `=` statt `-`.
- Überschriften der Abschnitte als `==[ Funktionen ]=====`, Trenner als Zeichenreihe `+ - - - - + - - - -`, Kopfzeile unterstrichen mit `=====`.
- Hero-Bild: Gerät, Kegel-Einsatz und Schüssel werden auf ein unsichtbares Canvas gemalt und mit der Folge ` .:-=+*#%@` in Zeichen umgerechnet. Gemüsestücke fallen in die Schüssel, die Rillen am Kegel laufen mit, nach 15 Sekunden blendet alles über die Zeichenfolge aus.
- Zeilenbreite des Hero-`<pre>` richtet sich nach dem Platz: 72 Spalten am PC, 48 am Handy, die Schriftgröße folgt aus der Containerbreite. Kein Überlauf.
- H1 groß in Bold-Mono mit blinkendem Block-Cursor (1,2 s Takt, nur Deckkraft). Dazu ein ASCII-Banner `HORTA` in der Fußzeile (`aria-hidden`).
- Kaufknopf: gefülltes Amber, dunkle Schrift, hartes Pixel-Schatten-Rechteck, Präfix `> `. Alle anderen Flächen sind Grün oder Umriss.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #07100a | Seitengrund, Schrift auf dem Kaufknopf |
| `--flaeche` | #0a1a10 | Karten, Kacheln, Hinweisblock |
| `--gruen` | #3dff7a | Leuchtfarbe: Logo, H1, Überschriften, Zahlen, Links, Zeichenbilder (13,5:1 auf Fläche) |
| `--text` | #9aeab6 | Fließtext, ruhiger als die Leuchtfarbe (12,7:1 auf Fläche) |
| `--leise` | #58c880 | Nebentext, Eyebrow, Fußnoten, Symbole (8,6:1) |
| `--linie` | #2fae5b | Rahmen aus Zeichen, leerer Teilstern (6,3:1) |
| `--deko` | #1d6a3a | nur Trenner, Kopfzeilen-Linie, Punktraster (2,9:1, trägt nie Text) |
| `--amber` | #ffb000 | NUR Kaufknopf (10,5:1 gegen den Grund, Schrift darauf 10,5:1) |
| `--amber-schatten` | #6d4a00 | harter Schatten des Kaufknopfs |
| `--fokus` | #eafff1 | Fokusring 3 px, 3 px Abstand (17,2:1) |

## Schriften
| Familie | Gewicht | Datei (aus `../design-vorlagen/fonts/`) | Wofür |
| --- | --- | --- | --- |
| JetBrains Mono | 400 | `JetBrainsMono-400.woff2` | Fließtext, Navigation, Zeichenbilder, Rahmenzeichen |
| JetBrains Mono | 700 | `JetBrainsMono-700.woff2` | Logo, H1, Überschriften, Zahlen, Kaufknopf, Titel in Rahmen |
Zusammen 42 KB. Lizenztext `JetBrainsMono-LICENSE.txt` liegt im selben Ordner. Die Dateien sind eine Latin-Auswahl mit 229 Zeichen: ASCII, Umlaute, `€`, `„ “`, `·` sind drin, `┌ ─ │ █ ▶ ★` fehlen.

## So ist er gebaut

**1. Rahmen aus Zeichen: Kopf und Fuß als Flex-Zeile, Seiten als Zeichenspalte, rechte Ecke per Schreibrichtung**
```css
.box{position:relative;display:flex;flex-direction:column;padding:0 2ch;--fuell:var(--h)}   /* --h ist "-----..." (260 Zeichen) */
.box::before,.box::after{position:absolute;top:.94rem;bottom:.94rem;width:1ch;overflow:hidden;white-space:pre;line-height:.94;color:var(--linie)}
.box::before{content:var(--v) / "";left:0}      /* --v ist "|\A|\A|..." (64 Zeilen) */
.box::after{content:var(--v) / "";right:0}
.box__kopf::before{content:"+-- " / ""}
.box__kopf::after,.box__fuss::after{content:"+" var(--fuell) / "";flex:1 1 0;min-width:0;overflow:hidden;
  direction:rtl;unicode-bidi:bidi-override;margin-left:1ch}   /* + steht immer genau am rechten Rand, links wird abgeschnitten */
```
```html
<li class="box"><h3 class="box__kopf"><span>Schneiden</span></h3> ...Inhalt... <div class="box__fuss" aria-hidden="true"></div></li>
```
Das `/ ""` nach dem Inhalt ist der Ersatztext: Screenreader lesen die Zeichenreihen nicht vor. `line-height:.94` lässt die `|` aneinanderstoßen (der Strich ist 0,94 em hoch).

**2. Gerät zeichnen und in Zeichen umrechnen (Zeichenzelle ist 0,6 em breit und 1 em hoch)**
```js
var RAMPE=' .:-=+*#%@', UNTER=3, ZELLE_B=0.6;               // 3 x 3 Messpunkte je Zeichen glätten die Kanten
cx.setTransform(UNTER*k/ZELLE_B,0,0,UNTER*k,0,oy*UNTER*k);  // ab hier in em malen, Kreise bleiben rund
/* ... Formen mit Graustufen malen (hell = viel Tinte) ... */
var v=summe/(UNTER*UNTER*255);
zeile+=RAMPE.charAt(Math.min(RAMPE.length-1,Math.floor(Math.pow(v,0.9)*RAMPE.length)));
pre.textContent=zeilenText.join('\n');
```
Die Szene ist eine reine Funktion der Zeit `malen(t)`: Stück `n` startet bei `n*0,5 s`, fällt 0,8 s lang (`y = start + (ziel-start)*tau*tau`) und liegt dann auf einem festen Platz im Haufen. So ist jedes Standbild und jedes Bild im Lauf berechenbar.

**3. Zeichenbild passt sich der Breite an (kein Überlauf), das Raster wählt JS**
```css
.szene__flaeche{container-type:inline-size;overflow:hidden}
.szene__pre{font-size:calc(100cqw / (var(--spalten,72) * .606));line-height:1;white-space:pre}
```
```js
var klein=flaeche.clientWidth<460;  spalten=klein?48:72;  zeilen=klein?26:42;
pre.style.setProperty('--spalten',String(spalten));
```
0,606 statt 0,6 lässt eine Reserve, damit auch Browser, die Schriftgrößen runden, nichts abschneiden. Am Handy sind es 12 px Zeichenhöhe, am PC rund 10 px.

**4. Lauf: höchstens 12 Bilder pro Sekunde, pausiert, Standbild bei reduzierter Bewegung**
```js
function planen(){ timer=setTimeout(function(){ requestAnimationFrame(bild); }, 1000/MAX_FPS-8); }
function soll(){ return !reduziert && sichtbar && !document.hidden; }   // sichtbar kommt vom IntersectionObserver
if(reduziert){ zeigen(STAND_T); }                                        // ein einziges Bild, keine Schleife
```
Im HTML steht außerdem ein fertiges Standbild im `<pre>` (2 KB), damit die Seite ohne JavaScript nicht leer ist.

**5. H1 immer in 2 Zeilen: Schriftgröße aus der Spaltenbreite**
```css
.hero__text{container-type:inline-size}
h1{font-size:clamp(1.75rem,calc(100cqw / 11.8),4.5rem)}   /* "Weniger schnippeln." = 19 Zeichen * 0,6 em = 11,4 em */
h1 .z{display:block}
```

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge wie gefordert, nach jedem Durchgang Prüfskript und Bildschirmfotos. Von impeccable lag nur `SKILL.md` vor, die Unterdateien (`craft-floor.md` und andere) und das Startskript fehlten. Dafür galten die Kurzregeln aus dem Auftrag (Rollen, Hierarchie, gemessener Kontrast, sichtbarer Fokus).

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | H1 höchstens 3,5 rem: 56 px bei 720 bis 999 px, nur 638 von 788 px Breite genutzt | Höchstgröße 4,5 rem, 67 px bei 820 px; gemessen 2 Zeilen an 14 Breiten von 360 bis 1920 px | Überschrift breit, höchstens 2 Zeilen |
| gpt-taste | Kaufknopf unten bei 751 px (1280 x 800) und 798 px (390 x 844, unter dem Rand) | 707 px und 734 px: Hero oben 64 auf 40 px, Textabstände 24 auf 16 px, Preis 2,75 auf 2,5 rem, am Handy Rahmenabstand 16 auf 8 px | Blickführung Aufmerksamkeit, Interesse, Verlangen, Handlung ohne Scrollen |
| gpt-taste | Hinweisblock mit `max-width:60rem` ließ rechts eine Lücke (960 von 1180 px) | Volle Rasterbreite, Text 1,25 rem, Päckchen-Zeichnung links | Lückenloses Raster |
| gpt-taste | Funktionssymbole 3 und 4 Zeilen hoch, Texte in den Karten saßen auf verschiedenen Höhen | `min-height:4.8em` am Symbol, alle Texte beginnen auf einer Linie | Gleichmäßige Abstandsstufen (4, 8, 16, 24, 40, 64) im Raster |
| impeccable | Aller Text in der Leuchtfarbe #3dff7a (14,5:1), Überschrift und Fließtext gleich hell | Fließtext `--text` #9aeab6 (12,7:1), Leuchtfarbe nur für Logo, Titel, Zahlen, Links, Zeichenbilder | Jede Farbe hat eine Rolle, klare Hierarchie |
| impeccable | Kaufknopf als `<a href="#warenkorb">` ohne Rand | `<button type="button">` mit 2 px transparentem Rand (bleibt im Kontrastmodus als Rahmen sichtbar) | Eine Aktion ist ein Knopf, Signalfarbe nur dort |
| impeccable | Fußlink "AGB" 37 px breit, Kachelnebentext am Handy 13 px | 45 px breit (`min-width:44px`), 14 px | Touch-Ziele mindestens 44 px, Text nicht unter 14 px |
| emil-design-eng | Hero erschien in einem Rutsch | Sechs Textblöcke und das Bild blenden ein: `rein` 240 und 280 ms, `cubic-bezier(.23,1,.32,1)`, 60 ms Versatz, nur `opacity` und `transform`, Start bei `translateY(10px)`, `backwards` | Staffelung statt Schlag, nie von `scale(0)`, unter 300 ms |
| emil-design-eng | `scroll-behavior:smooth`: Anker per Enter wurden animiert | Entfernt, der Sprung ist sofort | Tastatur-Aktionen nie animieren |
| emil-design-eng | Warenkorb-Zähler sprang ohne Rückmeldung | `hupf` 200 ms (scale 1,4 auf 1), nur bei Mausklick oder Tippen (`event.detail > 0`), bei Enter und Leertaste gemessen keine Klasse | Rückmeldung nur wo sie hilft |
| emil-design-eng | `.cta:active` stand doppelt (Grund und Hover-Block) | Hover nur unter `(hover:hover) and (pointer:fine)`, `.cta:hover:active` und `.cta:active` gemessen `matrix(0.97 ...)`, Übergang `transform 160ms` mit eigener Kurve, Farbwechsel ohne Übergang | Druck-Rückmeldung, keine Hover-Treffer am Handy |

Gemessen und ohne Änderung bestanden: 78 Textknoten ohne Fehlwert (Nebentext mindestens 8,6:1), Fokusring 3 px an allen 12 Tab-Zielen auf PC und Handy, im Wischstreifen innen (`outline-offset:-4px`), alle Touch-Ziele mindestens 44 px hoch.

Konflikte: gpt-taste verlangt GSAP, angeheftete Abschnitte, Hintergrundbilder und zwei Knöpfe im Hero. Das gilt hier nicht: keine Bibliothek, keine Bilder, genau ein Kaufknopf, Abstände und Zwei-Zeilen-Regel ja.
Der Block-Cursor an der H1 blinkt endlos (0,83 Hz, nur Deckkraft), weil er zum Terminal gehört. Er ist bei reduzierter Bewegung aus und steht dann fest. Das fallende Gemüse folgt der Schwerkraft, nicht einer UI-Kurve, und läuft mit höchstens 12 Bildern pro Sekunde.

## Pro
- Leicht: 40 KB ohne Schriften (HTML 12,7, CSS 13,9, JS 13,3), Schriften 42 KB, 5 Anfragen, kein Bild. Das Hero-Bild ist Code, nicht Datei.
- Ruhig im Betrieb: 11,8 Bilder pro Sekunde gemessen (Grenze 12), 0 Bilder außerhalb des Bildschirms, bei reduzierter Bewegung 0 requestAnimationFrame pro Sekunde und 0 Endlos-Animationen.
- Mit 4-fach gebremster CPU 10,6 Bilder pro Sekunde und nur ein längerer Vorgang beim Start (57 ms ungebremst, 171 ms gebremst am Handy-Format), danach keiner über 50 ms.
- Der Kaufknopf ist die einzige warme Fläche: Amber gegen den Grund 10,5:1, daneben nur Grün. Kaufknopf liegt am Handy (390 x 844) bei 674 bis 734 px, also im ersten Bildschirm.
- Gute Lesbarkeit: Fließtext 12,7:1, kleinster Text 8,6:1, 78 Textknoten ohne Fehlwert. H1 ist echter Text und bleibt an 14 Breiten (360 bis 1920 px) in 2 Zeilen.
- Unverwechselbar und billig umzufärben: nur `--gruen`, `--text`, `--leise`, `--linie` ändern (Bernstein-Terminal, Weiß auf Schwarz), Amber bleibt für den Kauf.

## Contra
- Das Hero-Bild ist Handarbeit: rund 165 Zeilen Canvas-Code für Gerät, Kegel, Schüssel und Stücke, mit mehreren Runden Feinabstimmung der Formen. Für jedes neue Produkt muss eine neue Szene gezeichnet werden.
- Das Zeichenbild zeigt nur Umriss und Schattierung. Am Handy (48 Spalten) ist das Gerät nur noch zu erahnen, der Kegel-Einsatz kaum zu erkennen. Kein Ersatz für ein Produktfoto.
- Monospace braucht Platz: die vier Funktionskarten fassen nur etwa 25 Zeichen je Zeile, lange Wörter wie "Einfuhrsteuern" brechen früh. Die Seite ist lang: 2974 px am PC und 4403 px am Handy.
- Rahmenlinien aus `-` sind gestrichelt, nicht durchgezogen, und die Schrift hat keine echten Rahmenzeichen. Wer andere Schrift nimmt, muss Breite (0,6 em) und Strichhöhe (0,94 em) neu messen.
- Barrierefreiheit hängt an einem Detail: Der Ersatztext `content: "..." / ""` für die Zeichenreihen wird von älteren Browsern nicht verstanden, dort läge "plus minus minus" im Lesefluss. Getestet wurde nur in Chromium.
- Leuchtgrün auf Schwarz mit Schein an der H1 ist für manche Augen anstrengend; deshalb bekommt nur die Überschrift Schein und der Text die ruhigere Mintfarbe. Eine helle Variante gibt es nicht.
- Wirkt wie ein Entwickler-Werkzeug. Für Zahlung und Rechtliches kann das weniger vertrauenswürdig wirken als ein ruhiger Look.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Der Amber-Knopf (10,5:1) ist die einzige warme Fläche und sofort zu finden, der Look selbst spricht aber nur eine technische Zielgruppe an. |
| Lesbarkeit | 4 | Text 12,7:1 und H1 in 2 Zeilen, aber Monospace macht Zeilen kurz und Absätze länger. |
| Handy | 4 | Eigenes 48-Spalten-Raster, Knopf im ersten Bildschirm bei 390 x 844, die Navigation ist ein Wischstreifen und der Hero lang. |
| Tempo | 5 | 40 KB ohne Schriften, kein Bild, 11,8 Bilder pro Sekunde, außerhalb des Bildes 0. |
| Barrierefreiheit | 3 | Fokus, Kontrast und Touch-Ziele gemessen gut, aber alle Rahmen sind Zeichen im Inhalt und brauchen Ersatztext und `aria-hidden` an jeder Stelle. |
| Aufwand | 3 | Rahmen-Baukasten wiederverwendbar, doch das Hero-Bild je Produkt neu zu malen und abzustimmen kostet Stunden. |
| Risiko | 3 | Kein Foto vom Produkt, Wirkung nur bei passender Zielgruppe, Browser außer Chromium nicht geprüft. |

## Passt besonders zu
Küchengeräte und Gadgets mit klarer Form (Schneider, Mixer, Waage), Werkzeug, Computer- und Spielzubehör, Nerd-Geschenke, Software-nahe Produkte.

## Passt nicht zu
Kosmetik, Pflege, Mode, Schmuck, Baby- und Gesundheitsartikel, Luxus; alles, was nur über ein echtes Foto verkauft wird.

## Stolperfallen
- Die Schriftdatei hat keine Rahmenzeichen (Prüfung mit fontTools: 229 Zeichen, `┌ ─ │ ═ █ ▶ ★` fehlen). Erster Entwurf mit Rahmenzeichen wäre auf eine Ersatzschrift gefallen, deshalb alles in ASCII.
- Rahmen in einem Flex-Elternteil (Ablauf-Schritte) ließen die Seite auf 3546 px Breite aufgehen, weil die 260 Zeichen lange Füllzeile die Mindestbreite bestimmte. Lösung: `min-width:0` an `.schritt` und `.box`.
- Rechte Ecke: Wer die Füllzeile normal laufen lässt, schneidet das `+` ab. `direction:rtl` mit `unicode-bidi:bidi-override` setzt es an den Rand und beschneidet links.
- Seitenstriche stoßen nur zusammen, wenn die Zeilenhöhe 0,94 em beträgt (der Strich `|` misst 940 von 1000 Einheiten). Kopf- und Fußzeile müssen auf derselben Schriftgröße (1 rem) bleiben, sonst passen die Ecken nicht.
- Die Zelle ist 0,6 em breit und 1 em hoch. Ohne die Streckung beim Zeichnen (`UNTER/ZELLE_B` waagerecht) werden Kreise zu schmalen Ovalen.
- Schriftgröße des Zeichenbilds darf nicht aus JS kommen: `calc(100cqw / (spalten * .606))` im CSS, sonst springt das Bild beim Laden der Schrift. Mit genau .6 rundet manche Engine auf und schneidet die letzte Spalte ab.
- Eine reine Schleife mit `requestAnimationFrame` zählt 60 Aufrufe pro Sekunde. Besser erst `setTimeout` (rund 75 ms), dann im nächsten Anzeigebild malen: 11,8 Bilder pro Sekunde gemessen.
- `animation-fill-mode:both` an den Hero-Blöcken hätte `transform` der Knöpfe festgehalten, `backwards` reicht.
- `p{color:var(--text)}` überschreibt keine Klassenfarben, aber `.zahl__wert` und `.preis__zahl` sind Absätze und brauchen die Leuchtfarbe ausdrücklich.
- Wischstreifen am Handy: Ohne Hinweis sieht man nur drei Links. Kleinere Schrift (14 px) lässt den vierten halb herausschauen.

## Anwenden
1. `vorlage/style.css` als `assets/style.css` des Shops kopieren. Farben nur in `:root` ändern, die Rollen (Grün Leuchtfarbe, Mint Text, Amber nur Kaufknopf) beibehalten. Die langen Zeichenreihen `--h`, `--hh`, `--v`, `--trenner` nicht anfassen.
2. Schriften aus `../design-vorlagen/fonts/` kopieren: `JetBrainsMono-400.woff2`, `JetBrainsMono-700.woff2` samt `JetBrainsMono-LICENSE.txt`. Die `@font-face`-Zeilen auf den neuen Pfad stellen, `font-display:swap` lassen.
3. Klassen der Demo: `.rahmen .kopf .kopf__in .logo .logo__pfeil .nav .warenkorb .zaehler`, `.box .box__kopf .box__fuss .box--doppel`, `.abschnitt .trenner`, `.hero .hero__raster .hero__text .eyebrow .lead .bewertung .sterne .preis .cta`, `.szene .szene__flaeche .szene__pre`, `.zahlen .zahl`, `.karten .symbol`, `.schritte .schritt .ziffer`, `.bewertungen`, `.hinweis .paket`, `.fuss .banner`.
4. Passend zu den Haken des Skills `ein-produkt-shop`: Die Demo hat eigene Namen. Im Shop entweder die Selektoren im CSS ergänzen (zum Beispiel `.cta,.knopf{...}`, `.box,.karte{...}`) oder im HTML umbenennen. Die Schritte zum Wechsel (Schriften, `style.css`, Logo, Hintergrund, Favicon, Vorschaubild) stehen in `../design-vorlagen/references/umstellen.md`. Dort `WELT` leer lassen (der Grund kommt aus dem CSS) und `theme-color` auf #07100a setzen.
5. Hero-Bild für das neue Produkt: in `script.js` nur die Funktion `malen(t)` austauschen (Maße in Bezugseinheiten 43,2 x 42, Graustufen als Helligkeit, Oberkante der Zeichnung bei y = 3, damit die Handy-Kürzung (oben 3 Einheiten weniger) nichts abschneidet). Raster, Zeichenfolge, Schleife und Pausen bleiben.
6. Standbild für Leute ohne JavaScript neu erzeugen: Seite mit `reducedMotion: 'reduce'` laden, `document.querySelector('[data-szene]').textContent` kopieren und ins `<pre>` des HTML einsetzen.
7. Danach prüfen: Zeilen der H1 bei 1100, 1280, 1440 und 1920 px, Kopfzeile zwischen 720 und 900 px, Kontrast, Tab-Fokus, reduzierte Bewegung (Standbild, kein Cursor-Blinken), Seite ohne JS, kein waagerechter Überlauf bei 390, 820 und 1280 px.

## Dateien
- `vorlage/demo.html` (HORTA-Startseite, 12,7 KB, enthält das Standbild und die ASCII-Banner)
- `vorlage/style.css` (13,9 KB)
- `vorlage/script.js` (Hero-Bild in Zeichen, Warenkorb-Zähler, 13,3 KB)
- Schriften: `../design-vorlagen/fonts/JetBrainsMono-400.woff2`, `JetBrainsMono-700.woff2`
