---
name: look-art-deco
description: Look "Art Deco" (die Eleganz der 1920er) für Ein-Produkt-Shops. Flaschengrün bis Schwarzgrün als Grund, Gold nur als dünne Linie, Text in Creme, streng symmetrische Komposition mit gestuften Ecken, Doppellinien-Rahmen, Fächern, Sonnenstrahlen und Zickzack-Borten; der Kaufknopf ist die einzige große Goldfläche. Verwenden bei "Art-Deco-Look", "Art Deco", "goldene Zwanziger", "Gatsby", "Fächer-Muster", "Sonnenstrahlen", "Gold auf Grün", "art deco design", "gatsby style", "Design-Vorlage art-deco", wenn ein Shop edel, festlich und geordnet wirken soll oder wenn Looks verglichen werden.
---

# Look: Art Deco

Gebaut und getestet am HORTA-Gemüseschneider (Startseite). Demo: `vorlage/demo.html`, Stylesheet: `vorlage/style.css`, Skript: `vorlage/script.js`.
Idee: Eleganz durch Ordnung. Alles steht auf einer Mittelachse (Logo, Überschrift, Bild, Medaillons, Karten), Gold zieht nur dünne Linien, und der Kaufknopf ist die einzige Fläche aus Gold.
Abgrenzung: Neon Glow leuchtet, Particles ist technisch, Bauhaus nutzt Geometrie in Grundfarben und ist asymmetrisch. Art Deco lebt von Gold auf Dunkelgrün, Symmetrie und Ornament.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt hochwertig, festlich oder "gut gemacht" wirken soll: Küche und Tisch, Geschenke, Bar und Wein, Schmuck, Lampen, Wohnaccessoires, Pflege mit Stil. Die ruhige Symmetrie führt den Blick auf Titel, Bild, Preis und Knopf, und der goldene Knopf ist auf dem dunklen Grund sofort zu finden.
Passt nicht bei Produkten, die laut, spielerisch, günstig oder rein technisch wirken sollen, und nicht bei einer Ware, deren Preis den edlen Ton nicht trägt (Misstrauen). Wer viele Produkte zeigt, braucht mehr Platz, als die zentrierte Ordnung bietet.

## Merkmale
- Grund Schwarzgrün (#0b0f10) mit einem Verlauf nach Flaschengrün (#123228) nur hinter dem Hero (feste Höhe 980 px). Bänder in Flaschengrün (#0f2a24) wechseln mit dem dunklen Grund.
- Streng zentriert: Kopfzeile in zwei Stufen (Logo mittig, darunter die Links), H1 in Versalien mit Sperrung (`letter-spacing:.1em`), Medaillons und Karten gleich breit, der Hero als Dreiklang links Text, Mitte Bild, rechts Preis und Knopf.
- Gestufte Ecken (zwei Stufen je Ecke) und Doppellinien-Rahmen an Karten, Preisblock, Bewertungen, Hinweisblock und Hero-Bild: eine Linie außen (Gold), eine dünne Innenlinie.
- Hero-Bild als Zeichnung in SVG: Gerät mit zweistufigem Sockel, Körper, gestuftem Hals, Schacht mit Gurke, Tomate und Paprika, dem Kegel-Einsatz als Medaillon mit Zackenkranz, Knopf und Schüssel mit Gemüsestücken. Dahinter ein Sonnenstrahlen-Muster aus 72 Linien und drei Ringen, oben ein kleiner Fächer.
- Zickzack-Borten (zwei verschachtelte Linien, SVG als Daten-URI) oben und unten an jedem Band, ein Fächer-Zeichen über jeder Abschnittsüberschrift, Doppellinien neben den H2.
- Zahlenleiste als vier Medaillons: Kreis mit Doppelring und Zackenkranz (`repeating-conic-gradient` mit Maske), die Zahl darin, der Text darunter.
- Ablauf mit Rauten (um 45 Grad gedrehte Quadrate mit Doppelrahmen) auf einer Doppellinie.
- Bewegung minimal: ein langsames Funkeln der Strahlen (zwei Schichten, nur Deckkraft, 7 Sekunden), ein Einblenden beim Laden (240 ms), sonst nur Druckrückmeldung.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #0b0f10 | Seitengrund, Kopfzeile, Schrift auf dem Kaufknopf |
| `--flaeche` | #0f2a24 | Bänder (Zahlenleiste, Ablauf, Hinweis) |
| `--karte` | #0d241f | Füllung von Karten, Preisblock und Bewertungen |
| `--creme` | #f4ead2 | Text und Überschriften (16,1:1 auf Grund, 13,6:1 auf Karte) |
| `--creme-leise` | #cfc6ad | Nebentext (9,6:1 auf Karte, 6,7:1 im Medaillon) |
| `--gold` | #c9a24b | Linien, Zackenkranz, Unterstreichung; gefüllt NUR im Kaufknopf (als Verlauf `--gold-verlauf`, #ecd690 bis #b98f3a) und als Markierfarbe (`::selection`) |
| `--gold-hell` | #e8d08a | Zierde und Zeichen: Sterne, Fächer, Zeichnung, Fokusring (10,7:1 auf Karte) |
| `--linie` / `--linie-leise` | Gold mit 80 % / 45 % | Rahmen (4,6:1 bis 5,5:1) und Innenlinien (2,4:1, nur Zierde) |
| `--auf-gold` | #0b0f10 | Schrift auf dem Knopf (13,4:1 am hellen, 6,5:1 am dunklen Ende des Verlaufs) |
| Zeichnung | #1a463d, #2b8a68, #d08a35, #d4694f, #3aa07b | nur im Hero-Bild: Körperlicht, Gurke, Paprika, Tomate, Stiele |

## Schriften
| Familie | Gewicht | Datei (aus `../design-vorlagen/fonts/`) | Wofür |
| --- | --- | --- | --- |
| Limelight | 400 | `Limelight-400.woff2` | nur Logo, H1, H2 (immer Versalien mit Sperrung, nie als Fließtext) |
| Josefin Sans | 400 | `JosefinSans-400.woff2` | Fließtext, Nebentext |
| Josefin Sans | 600 | `JosefinSans-600.woff2` | Zwischentitel (H3), Navigation, Knopf, Preis, Zahlen, Marken, Namen, Versalien |
Zusammen 47 KB. Lizenztexte `Limelight-LICENSE.txt` und `JosefinSans-LICENSE.txt` liegen im selben Ordner. Beide Schriften enthalten Umlaute, ß, €, „ und “. Josefin Sans hat eine kleine x-Höhe: Fließtext 17 px, Nebentext mindestens 15 px, Versalien mindestens 13 px.

## So ist er gebaut

**1. Gestufte Ecken mit Doppellinie: eine Form, zwei Pseudo-Elemente, der Fokusring bleibt heil**
```css
.karte,.stimme,.preisblock,.hinweis,.szene,.cta{
  --form:polygon(
    0 calc(var(--st)*2), var(--st) calc(var(--st)*2), var(--st) var(--st), calc(var(--st)*2) var(--st), calc(var(--st)*2) 0,
    calc(100% - var(--st)*2) 0, calc(100% - var(--st)*2) var(--st), calc(100% - var(--st)) var(--st), calc(100% - var(--st)) calc(var(--st)*2), 100% calc(var(--st)*2),
    100% calc(100% - var(--st)*2), calc(100% - var(--st)) calc(100% - var(--st)*2), calc(100% - var(--st)) calc(100% - var(--st)), calc(100% - var(--st)*2) calc(100% - var(--st)), calc(100% - var(--st)*2) 100%,
    calc(var(--st)*2) 100%, calc(var(--st)*2) calc(100% - var(--st)), var(--st) calc(100% - var(--st)), var(--st) calc(100% - var(--st)*2), 0 calc(100% - var(--st)*2));
  position:relative;isolation:isolate;
}
.karte::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--linie);clip-path:var(--form)}   /* Goldlinie */
.karte::after{content:"";position:absolute;inset:1px;z-index:-1;background:var(--innen),var(--karte);clip-path:var(--form)} /* Füllung mit Innenlinie */
```
`--st` (Stufe, 8 px, am Handy 6 px) und `--form` müssen auf demselben Element stehen, sonst gilt der Wert von `:root`. Die Innenlinie `--innen` ist eine Liste aus vier 1-px-Verläufen im Abstand `--il`. Weil `clip-path` auf dem Pseudo-Element liegt und nicht auf dem Element selbst, wird der Fokusring des Knopfes nicht abgeschnitten.

**2. Sonnenstrahlen aus zwei SVG-Schichten, Funkeln nur über Deckkraft**
```python
import math
CX, CY = 300, 292
def strahl(r1, r2, grad):
    a = math.radians(grad - 90)
    return f"M{CX+r1*math.cos(a):.1f} {CY+r1*math.sin(a):.1f}L{CX+r2*math.cos(a):.1f} {CY+r2*math.sin(a):.1f}"
lang  = "".join(strahl(100, 560, d)     for d in range(0, 360, 10))   # Schicht A, 36 lange Strahlen
kurz  = "".join(strahl(100, 330, d + 5) for d in range(0, 360, 10))   # Schicht B, 36 kurze, 5 Grad versetzt
```
```css
.strahlen{animation:funkeln 7s var(--ease-weich) infinite alternate}   /* --ease-weich: cubic-bezier(.65,0,.35,1) */
.strahlen--b{animation-delay:-3.5s}
@keyframes funkeln{from{opacity:.35}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.strahlen{animation:none;opacity:.85}}
```
Jede Schicht ist ein eigenes `<svg>`, damit der Browser nur die Deckkraft einer Ebene ändert und nicht das Gerät neu zeichnet. `script.js` setzt die Klasse `ruht` (Animation pausiert), wenn das Bild außerhalb des Fensters liegt oder der Tab verdeckt ist. Gemessen: 60 Bilder pro Sekunde, längstes Bild 17 ms, außerhalb des Bildes 0 laufende Endlos-Animationen.

**3. Medaillon mit Zackenkranz: ein Kegelverlauf, durch eine Ringmaske geschnitten**
```css
.medaillon{--m:150px;position:relative;display:grid;place-items:center;width:var(--m);height:var(--m);border-radius:50%;margin:var(--a3);
  background:radial-gradient(circle at 50% 30%,#17403a,#0b1a17 72%);
  box-shadow:0 0 0 1px var(--linie),inset 0 0 0 7px #0b1a17,inset 0 0 0 8px var(--linie-leise)}
.medaillon::before{content:"";position:absolute;inset:-13px;border-radius:50%;
  background:repeating-conic-gradient(var(--gold) 0 1.2deg,transparent 1.2deg 7.5deg);
  -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 11px),#000 calc(100% - 10px));
  mask:radial-gradient(farthest-side,transparent calc(100% - 11px),#000 calc(100% - 10px));opacity:.8}
```
48 Zacken, kein Bild. Am Handy `--m:104px`, die Zahl `white-space:nowrap`, sonst bricht "800 W" um.

**4. Kaufknopf: Goldverlauf auf `::before`, dunkle Schrift, Rahmen als Hilfslinie**
```css
.cta{--st:5px;min-height:60px;padding:0 24px;border:0;background:none;color:var(--auf-gold);
  font:600 1rem/1 var(--font-text);letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;
  transition:transform 160ms var(--ease-out)}
.cta::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--gold-verlauf);clip-path:var(--form)}
.cta::after{content:"";position:absolute;inset:4px;z-index:-1;pointer-events:none;border:1px solid rgba(11,15,16,.55)}
@media (hover:hover) and (pointer:fine){.cta:hover{transform:translateY(-2px)}}
.cta:active{transform:scale(.97)}
```
Der Text steht direkt im Knopf (`In den Warenkorb`), die Goldfläche ist nur Pseudo-Element. Im Hochkontrast-Modus gibt es dazu `@media (forced-colors:active){.cta{border:2px solid ButtonText}}`.

**5. Ersatzschriften mit gleichen Maßen und Vorladen: kein Springen beim Laden der Schriften**
```css
@font-face{font-family:"Josefin Sans Ersatz";src:local("Arial"),local("Liberation Sans"),local("Helvetica");font-weight:400;
  size-adjust:101.8%;ascent-override:73.6%;descent-override:24.5%;line-gap-override:0%}
--font-text:"Josefin Sans","Josefin Sans Ersatz","Gill Sans","Century Gothic",system-ui,sans-serif;
```
```html
<link rel="preload" href="../../design-vorlagen/fonts/Limelight-400.woff2" as="font" type="font/woff2" crossorigin>
```
Die Werte kommen aus den Schriftdateien (mittlere Zeichenbreite im Verhältnis zu Arial, 600er gegen Arial Bold 99,5 %, Limelight gegen Times 102,3 %). In der Demo stehen drei Vorladezeilen (Limelight 400, Josefin 400 und 600).

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge wie gefordert, nach jedem Durchgang Prüfskript und Bildschirmfotos. Von impeccable war nur die `SKILL.md` lesbar, die genannten Unterdateien (`reference/craft-floor.md` und andere) und das Startskript fehlten. Dafür galten die Kurzregeln aus dem Auftrag (Rollen, Hierarchie, gemessener Kontrast, sichtbarer Fokus).

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Abstände gemischt: 23 verschiedene px-Werte in gap, padding und margin (4 bis 70), Hero 44 px oben und 70 px unten, Abschnitte 70 px | Stufen 4, 8, 16, 24, 40, 64, 96 px als `--a1` bis `--a7`, Abschnitte oben und unten 64 px (Handy 40 px), im Stylesheet bleibt nur 12 px im Symbolkreis | Großzügige, gleichmäßige Abstandsstufen |
| gpt-taste | Kopfzeile bei 720 px zweizeilig und 172 px hoch (Links brachen um) | Innenabstand 18 auf 16 px, Sperrung unter 1040 px .16em statt .2em: einzeilig, 128 px hoch, gemessen bei 23 Breiten von 600 bis 1920 px | Häufigster Überlauf-Fehler, Kopfzeile zwischen 720 und 900 px |
| gpt-taste | Tablet 820 px: Hero-Bild bis 30rem breit, Kaufknopf bei y 1005 bis 1065 | Bild bis 24rem, Knopf bei y 919 bis 979 (Ausgangswert 900 px hoher Bildschirm, Seite 820 px breit) | Hero mit klarer Blickführung, Handlung früher erreichbar |
| gpt-taste | Bewertungskarten: Sterne und Name folgten direkt dem Zitat (je Karte andere Höhe) | Kartenraster `auto 1fr auto`: Sterne und Name sitzen bei allen drei Karten auf einer Linie | Lückenloses, gleichmäßiges Raster |
| gpt-taste | Zeilen wie "Deckel" und "zu." (Einzelwort in der letzten Zeile) bei Ablauf und Karten | `text-wrap:balance` auf H1 bis H3, Karten-, Ablauf- und Zahlentexten | Überschrift und Texte ohne Waisen, H1 höchstens 2 Zeilen von 600 bis 1920 px (gemessen) |
| impeccable | Kleinste Schrift 11 px (Zähler am Handy), 12 px (Navigation und Eyebrow am Handy), 14 px (Preisinfo, Fußhinweis, Namen) | Kleinschrift mindestens 15 px, Versalien mindestens 13 px, Zähler 12 px | Josefin Sans ist klein gebaut, Nebentext muss lesbar bleiben |
| impeccable | Preisblock mit vollem Goldrahmen (80 %), gleich stark wie das Hero-Bild | Preisblock 55 %, Innenlinie bleibt dünn; der Kaufknopf ist die einzige volle Goldfläche | Ein Blickfang pro Bildschirm, Signalgold nur für den Knopf |
| impeccable | Markierter Text in Browserfarbe | `::selection` in Gold mit dunkler Schrift (8,0:1) | Signalgold nur für Kaufknopf und Auswahl |
| impeccable | Hochkontrast-Modus (`forced-colors`): Rahmen von Karten und Knopf verschwanden (Rand 0 px, im Bild gesehen) | Regel mit echten Rahmen: Knopf 2 px `ButtonText`, Karten 1 px `CanvasText` | Barrierefreiheit, die Rahmen stehen sonst nur in Pseudo-Elementen |
| emil-design-eng | Kaufknopf `transition:transform .2s ease`, kein `:active` | `160ms cubic-bezier(.23,1,.32,1)`, `:active{transform:scale(.97)}` auf Knopf, Navigation, Warenkorb, Logo und Fußlinks (alle fünf gemessen als `matrix(0.97,0,0,0.97,0,0)`) | Eigene Kurve statt `ease`, Rückmeldung beim Drücken |
| emil-design-eng | Hover ohne Abfrage (Knopf, Navigation) | Nur unter `@media (hover:hover) and (pointer:fine)`, am Handy gemessen `false`; bei Tastaturfokus erscheint die Unterstreichung sofort ohne Übergang | Keine falschen Treffer beim Tippen, Tastatur-Aktionen nie animieren |
| emil-design-eng | Warenkorb-Zähler sprang ohne Rückmeldung | Zucken von 180 ms (`translateY` und Deckkraft), nur bei Maus oder Tipp: gemessen Klick 1 Animation, Enter 0 | Feedback, ohne Tastaturwege zu verlangsamen |
| emil-design-eng | Hero erschien auf einmal, Funkeln mit `ease-in-out` | Links, Bild und rechts blenden nacheinander ein (240 ms, 60 ms Versatz, nur Deckkraft und 8 px `translateY`), Funkeln mit `cubic-bezier(.65,0,.35,1)`; bei reduzierter Bewegung beides aus | Kurzes Einblenden, nur `transform` und `opacity` |

Konflikte: gpt-taste verlangt GSAP, Scroll-Pinning, zufällige Auswahl, zwei Knöpfe im Hero und riesige Abstände. GSAP, Scrub und Zufall entfallen (keine Bibliotheken, ein Kaufknopf), die Abstände gelten als 64 px je Seite, damit der Kaufweg kurz bleibt. emil-design-eng verlangt Animationen unter 300 ms: Das Funkeln dauert bewusst 7 Sekunden, ist aber ein reines, sehr langsames Atmen der Deckkraft und bei reduzierter Bewegung abgeschaltet (0 Endlos-Animationen, 0 `requestAnimationFrame`, gemessen).

## Pro
- Der Look ist auf einen Blick erkannt (Gold auf Flaschengrün, Fächer, Strahlen, gestufte Ecken) und liegt nie unter Fließtext: Muster nur im Hero-Bild, in Borten und neben Überschriften.
- Der Kaufknopf ist die einzige volle Goldfläche. Schriftkontrast 6,5:1 am dunkelsten Ende des Verlaufs, bei 1280 mal 800 px liegt er bei y 670 bis 730 im ersten Bildschirm, bei 390 mal 844 px bei y 760 bis 820.
- Sehr leicht: 44 KB ohne Schriften (HTML 24, CSS 20, JS 1), Schriften 47 KB, 6 Anfragen, kein Bild. Lighthouse mobil 100 / 100 / 100, LCP 1,5 s, Blockierzeit 0 ms, Layoutverschiebung 0.
- Ruhig im Betrieb: 0 `requestAnimationFrame`, 2 endlose CSS-Animationen (nur Deckkraft), bei reduzierter Bewegung 0. 60 Bilder pro Sekunde mit laufendem Funkeln gemessen, längstes Bild 17 ms.
- Gute Lesbarkeit: kleinster Textwert 6,5:1 (65 Textknoten gemessen), Fließtext 9,6:1 bis 16,1:1, Fokusring 3 px Hellgold an allen 13 Tab-Zielen, Zielgrößen mindestens 44 px.
- Die Symmetrie macht das Raster einfach: Medaillons, Karten, Schritte und Bewertungen ohne Lücke bei 26 gemessenen Breiten (4, 2 mal 2 und 1 Spalte, 3 und 1 Spalte).

## Contra
- Das Hero-Bild ist Handarbeit: Gerät, Sockel, Schüssel und Gemüse (rund 8 KB SVG) sind pro Produkt neu zu zeichnen. Nur Strahlen, Ringe, Fächer und der Zackenkranz sind wiederverwendbar.
- Jede gerahmte Fläche braucht zwei Pseudo-Elemente mit `clip-path`, eine Hilfsvariable für die Stufe und im Hochkontrast-Modus eine Zusatzregel. Auf dem Element selbst darf kein `clip-path` stehen, sonst wird der Fokusring abgeschnitten.
- Die Kopfzeile ist zweistufig und hoch: 128 px am PC, am Handy 144 px (Navigation läuft in zwei Zeilen). Bei 360 mal 844 px liegt der Kaufknopf bei y 794 bis 854, also 10 px unter dem Bildschirm.
- Die Innenlinien (45 % Gold) erreichen nur 2,4:1. Das ist als Zierde in Ordnung, aber wer sie als Rahmen für Eingabefelder nutzt, muss `--linie` (4,6:1) nehmen.
- Limelight taugt nur für große Titel in Versalien mit Sperrung. Die H1 misst am PC 67 bis 70 px und füllt zwei Zeilen fast ganz ("WENIGER SCHNIPPELN." ist rund 900 px breit), am Handy sind es drei Zeilen bei 34 px. Ein längerer Slogan bricht auf drei Zeilen und sprengt die Symmetrie.
- Der edle Ton ist ein Versprechen. Bei 44,90 € für eine Ware aus China kann er Misstrauen wecken, wenn Foto, Firmenangaben und Bewertungen nicht ebenso hochwertig sind.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Der Goldknopf ist die einzige volle Fläche und der Look wirkt wertig, aber er passt nicht zu jedem Produkt. |
| Lesbarkeit | 4 | Creme auf Grün mit 9,6:1 bis 16,1:1, nur die kleine Josefin Sans verlangt 17 px Fließtext. |
| Handy | 4 | Symmetrie bleibt, Knopf bei y 760 bis 820 im ersten Bildschirm, aber die Kopfzeile ist 144 px hoch. |
| Tempo | 5 | 44 KB ohne Schriften, Lighthouse 100, Layoutverschiebung 0, 60 Bilder pro Sekunde. |
| Barrierefreiheit | 4 | Kontrast, Fokus, reduzierte Bewegung und Hochkontrast-Modus sind gemessen, die Zierlinien bleiben bei 2,4:1. |
| Aufwand (5 = wenig Aufwand) | 3 | Das Hero-Bild ist Handarbeit, die gerahmten Flächen brauchen je zwei Pseudo-Elemente. |
| Risiko (5 = geringes Risiko) | 3 | Technisch ruhig (kein Flackern), aber der edle Ton kann zu einem günstigen Produkt nicht passen. |

## Passt besonders zu
Küchen- und Tischzubehör, Geschenken, Bar und Wein, Lampen, Schmuck und Wohnaccessoires, Pflege und Kosmetik mit Stil, Produkten für Feste und Feiertage.

## Passt nicht zu
Lauten, spielerischen oder sehr günstigen Produkten, Kinderartikeln und allem, was technisch-nüchtern oder wie ein Schnäppchen wirken soll.

## Stolperfallen
- Das Band (`.band`) ohne `position:relative`: Der Zickzack wanderte an den Seitenanfang, weil die Pseudo-Elemente `position:absolute` haben. Jedes Band braucht `position:relative`.
- Die H2 mit Linien links und rechts (`display:flex`, `::before` und `::after` mit `flex:1`) blieb ohne Linien: Der Elternteil hatte `justify-items:center`, die H2 wurde so schmal wie ihr Text. Mit `justify-items:stretch` und dem Fächer auf `justify-self:center` stehen die Linien.
- `clip-path` auf dem Knopf selbst schnitt den Fokusring ab. Die Form liegt jetzt nur auf `::before` und `::after`, der Ring sitzt am Element.
- `--karte:var(--karte)` auf der Karte ist ein Selbstbezug und macht den Wert ungültig. Der Wert steht nur in `:root`, abweichende Werte (Hero-Bild, Hinweis) werden dort direkt gesetzt.
- Die erste Karotte (dicke Seite oben, grüne Blätter) sah hinter dem Schacht-Rand wie ein Blumentopf aus. Eine Paprika mit Stiel ist als Gemüse sofort erkennbar.
- Das Medaillon "800 W" brach am Handy in zwei Zeilen um: Zahl am Handy 1,7 rem und `white-space:nowrap`, die Zahl "8 bis 15" bekommt eine eigene kleinere Größe.
- Hero-Reihenfolge am Handy: Mit Untertitel und Sternen vor dem Preis lag der Knopf deutlich unter dem Bildschirm. Jetzt Überschrift, Bild (280 px breit), Preis, Knopf, danach Text und Sterne (`grid-template-areas`). Die Tab-Reihenfolge bleibt die im HTML.
- Die Preiszeile brach als "Lieferzeit 8" und "bis 15 Werktage". Mit `white-space:nowrap` (`.nb`) um "8 bis 15 Werktage", "19 % MwSt." und "4,90 €" bricht sie vor dem Wort.
- Der Fußhinweis stand am Handy linksbündig: `text-align:center` auf der Fußzeile, nicht nur `justify-items`.
- Das Prüfskript meldet ohne `<link rel="icon">` einen 404-Fehler. In der Demo steht `href="data:,"`.
- Ohne Ersatzschrift springt der Text: mit 1,2 s verzögerter Schrift gemessen 0,036 am PC und 0,102 am Handy, mit den `size-adjust`-Ersatzschriften 0,002 und 0,001.
- Das Fächer-Zeichen oben im Hero-Bild lag zuerst an der Oberkante und wurde von der Innenlinie angeschnitten. Jetzt Mitte bei y 38 und Radius 22 statt y 34 und 30 (Bildraum 600 mal 548). Am Handy wird das Bild nicht zugeschnitten, sondern auf 280 px Breite verkleinert (Stufe 6 px, Innenlinie näher am Rand), damit der Kaufknopf in den ersten Bildschirm rückt.

## Anwenden
1. `vorlage/style.css` nach `assets/style.css` des Shops kopieren. Farben nur in `:root` ändern und die Rollen beibehalten (Gold als Linie, Creme als Text, Goldfläche nur im Kaufknopf). Die Stufe der Ecken steuern `--st` und `--il`.
2. Schriften aus `../design-vorlagen/fonts/` kopieren: `Limelight-400.woff2`, `JosefinSans-400.woff2`, `JosefinSans-600.woff2` samt `Limelight-LICENSE.txt` und `JosefinSans-LICENSE.txt`. Die `@font-face`-Zeilen und die drei `preload`-Zeilen auf den neuen Pfad stellen, `font-display:swap` und die Ersatzschriften (`Limelight Ersatz`, `Josefin Sans Ersatz`) lassen.
3. Klassen der Demo: `.kopf .logo .nav .korb .korb__zahl .korb__ikon .korb__text`, `.hero .hero__kopf .hero__links .hero__bild .hero__rechts .eyebrow .untertitel .bewertung .sterne .preisblock .preis .cta`, `.szene .szene__innen .strahlen .strahlen--a .strahlen--b`, `.abschnitt .abschnitt__kopf .faecher .band`, `.zahlenleiste .medaillons .medaillon-kachel .medaillon .zahl`, `.karten .karte .symbol`, `.schritte .schritt .raute`, `.stimmen .stimme .marke`, `.hinweis`, `.fuss`.
4. Passend zu den Haken des Skills `ein-produkt-shop`: Die Demo hat eigene Namen. Im Shop entweder die Selektoren im CSS ergänzen (zum Beispiel `.cta,.knopf{...}`, `.karte,.kachel{...}`, `.korb`) oder im HTML umbenennen. Die Schritte zum Wechsel (Schriften, `style.css`, Logo, Hintergrund, Favicon, Vorschaubild) stehen in `../design-vorlagen/references/umstellen.md`. Dort `WELT` leer lassen (Grund und Verlauf kommen aus dem CSS), das Logo als reinen Text in Limelight setzen und `theme-color` auf #0b0f10 stellen.
5. `script.js` mitnehmen (Funkeln pausieren, Warenkorb-Zähler). Ohne das Skript bleibt die Seite vollständig lesbar, die Strahlen funkeln dann weiter, auch außerhalb des Bildes.
6. Hero-Bild neu zeichnen: Bildraum 600 mal 548, Mittelpunkt der Strahlen bei (300, 292). Strahlen, Ringe und Fächer behalten, die Gruppe mit Sockel, Körper, Schacht, Medaillon und Schüssel durch das Produkt ersetzen. Inhalt zwischen y 40 und 540 und innerhalb von x 110 bis 490 halten, das Produkt immer auf der Mittelachse (x 300). Zeichnung mit Goldlinien (#e8d08a, 1,6 bis 2,4 px) und dunkelgrünen Füllungen, wenige Farben nur für das Gemüse.
7. Danach prüfen: H1 bei 1100, 1280, 1440 und 1920 px (höchstens 2 Zeilen), Kopfzeile bei 720 bis 900 px, Kaufknopf im ersten Bildschirm am Handy, Kontrast (Hero-Verlauf mitrechnen), Tab-Fokus, `prefers-reduced-motion` (0 Endlos-Animationen, 0 `requestAnimationFrame`), Hochkontrast-Modus, kein waagerechter Überlauf bei 390, 820 und 1280 px, Lighthouse und Layoutverschiebung (Schrift mit Verzögerung laden).

## Dateien
- `vorlage/demo.html` (HORTA-Startseite, 24 KB)
- `vorlage/style.css` (20 KB)
- `vorlage/script.js` (Funkeln pausieren, Warenkorb-Zähler, 1 KB)
- Schriften: `../design-vorlagen/fonts/Limelight-400.woff2`, `JosefinSans-400.woff2`, `JosefinSans-600.woff2`
