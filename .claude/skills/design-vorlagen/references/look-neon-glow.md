<!-- Kopie aus look-neon-glow/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Neon Glow

Gebaut und getestet am HORTA-Gemüseschneider (Startseite). Demo: `vorlage/demo.html`, Stylesheet: `vorlage/style.css`.
Idee: eine Leuchtreklame bei Nacht. Der Grund ist fast schwarz (#0a0614). Große Titel und Rahmen leuchten, der Fließtext nie.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt Spaß, Abend, Party, Küche mit Stimmung, Gaming, Bar, Technik für Zuhause oder Geschenk ist und die
Seite auffallen soll. Der gelbe Kaufknopf ist auf dem dunklen Grund sofort zu finden.
Passt nicht bei Produkten, die Ruhe, Vertrauen, Gesundheit, Babys, Natur oder Luxus versprechen. Auch nicht, wenn die Zielgruppe
viele ältere Menschen oder Menschen mit Sehschwäche umfasst (helle Schrift mit Schein auf Dunkel verschwimmt dort schneller).

## Merkmale
- Grund #0a0614 mit zwei sehr schwachen Farbflecken (Rosa links oben, Cyan rechts), fest 900 px hoch, kein Verlauf über die ganze Seite.
- Titel und Logo in Tilt Neon mit vier Schichten Text-Schein: weißer Kern, enger Schein, zwei weitere Stufen, alle Weichzeichner höchstens 20 px.
- Rahmen als Röhre: helle Randlinie (2 bis 3 px) plus `box-shadow` außen und innen (`inset`). Drei Leuchtstufen: stark (Schild), mittel (Karten), schwach (Preisfeld, Kacheln, Warenkorb).
- Hero-Bild als Leuchtschild: Gerät in Rosa, Schüssel und Gemüse in Cyan, Röhren mit weißem Kern, kleine unbeleuchtete Halter, vier Schrauben.
- Kaufknopf als einzige gelbe Röhre: gefüllte Pille mit hellem Rand und gelbem Schein. Alle anderen Rahmen leuchten nur Rosa oder Cyan.
- Fließtext in reinem Hellgrau (#e9e6f5), ohne Schein, mindestens 9,9:1 Kontrast (Nebentext) bis 16:1 (Haupttext).
- Bewegung nur einmal beim Laden: Logo flackert kurz an (3 Wechsel in 0,21 s gemessen), danach ruhig. Nichts läuft endlos.
- Handy: Schatten mit weniger Schichten (2 statt 4), Funktionskarten als Zeilen mit Symbol links, Ablauf senkrecht, Links als wischbarer Streifen.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #0a0614 | Seitengrund |
| `--flaeche` | #130b26 | Karten, Kacheln, Hinweisblock |
| `--text` | #e9e6f5 | Fließtext, nie mit Schein (16,3:1 auf Grund) |
| `--text-leise` | #bdb7d4 | Nebentext, Fußnoten (9,9:1 auf Fläche) |
| `--pink` | #ff2e97 | Marke und Inhalt: Logo, Titel, Funktions- und Bewertungskarten, Sterne, Gerät in der Zeichnung |
| `--pink-kern` / `--pink-rand` | #ffd6ec / #ff9fd1 | weißer Kern der Röhre, helle Randlinie der Rosa-Rahmen |
| `--cyan` | #27f3ff | Fakten und Bedienung: Eyebrow, Zahlen, Preisrahmen, Warenkorb, Ablauf, Hinweisblock, Schüssel |
| `--cyan-kern` / `--cyan-rand` | #d6fdff / #8ff9ff | weißer Kern, helle Randlinie der Cyan-Rahmen |
| `--gelb` | #ffe14a | NUR Kaufknopf (auch nicht für Hover, Fokus, Sterne oder Marken) |
| `--gelb-kern` / `--gelb-text` | #fff4b8 / #1b1500 | Rand des Kaufknopfs / Schrift auf Gelb (14:1) |
| Fokus | #fff | Fokusring 3 px weiß, 4 px Abstand |

## Schriften
| Familie | Gewicht | Datei (aus `../design-vorlagen/fonts/`) | Wofür |
| --- | --- | --- | --- |
| Tilt Neon | 400 | `TiltNeon-400.woff2` | nur Logo, H1, H2, H3, Zahlen, Ablaufnummern (nie Fließtext, nie unter 24 px) |
| Outfit | 400 | `Outfit-400.woff2` | Fließtext |
| Outfit | 500 | `Outfit-500.woff2` | Navigation, Preiszeile |
| Outfit | 700 | `Outfit-700.woff2` | Preis, Kaufknopf, Eyebrow, Marke "Beispiel" |
Zusammen 60 KB. Lizenztexte `TiltNeon-LICENSE.txt` und `Outfit-LICENSE.txt` liegen im selben Ordner.

## So ist er gebaut

**1. Neon-Titel mit Schein, der mit der Schriftgröße wächst, aber bei 20 px endet**
```css
--glow-pink:0 0 .03em #fff, 0 0 .12em rgba(255,46,151,.9),
            0 0 min(.34em,20px) rgba(255,46,151,.55), 0 0 min(.8em,20px) rgba(255,46,151,.3);
.neon--pink{color:var(--pink-kern);text-shadow:var(--glow-pink)}
/* Handy: nur zwei Schichten */
@media (max-width:720px){:root{--glow-pink:0 0 .04em #fff, 0 0 .3em rgba(255,46,151,.7)}}
```
Der Fließtext sitzt nie in einem `.neon`-Element. Das ist die ganze Lesbarkeitsregel.

**2. Logo flackert einmal an (nur Deckkraft, eine Schicht darüber)**
```html
<a class="logo" aria-label="HORTA, zur Startseite"><span class="logo__text" data-text="HORTA">HORTA</span></a>
```
```css
.logo__text{position:relative;color:#c9609a}                /* Röhre aus */
.logo__text::after{content:attr(data-text);position:absolute;inset:0;
  color:var(--pink-kern);text-shadow:var(--glow-pink);
  animation:anflackern 1s linear .3s 1 both}                /* genau 1 Durchlauf */
@keyframes anflackern{0%{opacity:0}12%{opacity:1}22%{opacity:.2}36%{opacity:1}100%{opacity:1}}
@media (prefers-reduced-motion:reduce){.logo__text::after{animation:none;opacity:1}}
```
Gemessen im Browser: an bei 661 ms, aus bei 773 ms, an bei 869 ms, danach dauerhaft 1. Bei reduzierter Bewegung gibt es keinen Wechsel.

**3. Rahmen als Röhre, in drei Stufen**
```css
.karte{border:2px solid var(--pink-rand);border-radius:20px;background:var(--flaeche);
  box-shadow:0 0 10px rgba(255,46,151,.5), 0 0 20px rgba(255,46,151,.28),
             inset 0 0 10px rgba(255,46,151,.36), inset 0 0 20px rgba(255,46,151,.14)}
```
Stark nur beim Hero-Schild, mittel bei Karten, schwach (2 Schichten) bei Preisfeld, Kacheln und Warenkorb. So gibt es auf jedem Bildschirm einen Blickfang.

**4. Röhrenzeichnung: Rohr plus Kern, jede Farbe als eigenes Wurzel-SVG mit gestuftem `drop-shadow`**
```html
<svg class="ebene ebene--rosa" viewBox="0 0 640 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><g id="rohr-rosa" fill="none" stroke-linecap="round" stroke-linejoin="round"> ...Pfade... </g></defs>
  <use href="#rohr-rosa" class="rohr"/>   <!-- farbiges Rohr, 8 -->
  <use href="#rohr-rosa" class="kern"/>    <!-- heller Kern, 3 -->
</svg>
```
```css
.ebene--rosa{filter:drop-shadow(0 0 1px rgba(255,255,255,.9)) drop-shadow(0 0 5px rgba(255,46,151,.9))
             drop-shadow(0 0 12px rgba(255,46,151,.55)) drop-shadow(0 0 20px rgba(255,46,151,.35))}
.ebene--rosa .rohr{stroke:#ff2e97;stroke-width:8} .ebene--rosa .kern{stroke:#ffd6ec;stroke-width:3}
```
Das Handy bekommt `aspect-ratio:640/500` mit `slice` (oben und unten weniger Rand) und dickere Röhren (11 und 4,2).

**5. Kaufknopf als gelbe Röhre, Schein stärker per Deckkraft**
```css
.cta{min-height:64px;padding:0 2.5rem;font:700 1.25rem/1 var(--font-text);color:#1b1500;background:var(--gelb);
  border:3px solid var(--gelb-kern);border-radius:999px;position:relative;isolation:isolate;
  box-shadow:0 0 10px rgba(255,225,74,.7),0 0 20px rgba(255,225,74,.45),inset 0 0 8px rgba(255,255,255,.55);
  transition:transform 160ms cubic-bezier(.23,1,.32,1)}
.cta::after{content:"";position:absolute;inset:-3px;z-index:-1;border-radius:inherit;
  box-shadow:0 0 14px rgba(255,225,74,.9),0 0 20px rgba(255,225,74,.6);opacity:0;transition:opacity 160ms cubic-bezier(.23,1,.32,1)}
@media (hover:hover) and (pointer:fine){.cta:hover{transform:translateY(-2px)} .cta:hover::after{opacity:1}}
.cta:active{transform:translateY(0) scale(.97)}
```

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge wie gefordert, nach jedem Durchgang Prüfskript und Bildschirmfotos. Die Datei `impeccable/SKILL.md` lag vor, die dort
genannten Unterdateien (`reference/craft-floor.md` und andere) und das Startskript fehlten im Ordner. Für impeccable galten deshalb
die Kurzregeln aus dem Auftrag (Rollen, Hierarchie, gemessener Kontrast, sichtbarer Fokus).

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | H1 `clamp(2.7rem,4.4vw,4.1rem)` in der halben Spalte: 3 Zeilen ab 1440 px Breite und bei 820 px (gemessen) | Höchstgröße 3,8 rem, Zeile 1 passt in die Spalte: 2 Zeilen von 1021 bis 1920 px. Zwischen 721 und 1020 px liegt die Überschrift über der vollen Breite (neuer Block `hero__kopf`) und braucht 1 Zeile | Zwei-Zeilen-Regel, breite Überschrift |
| gpt-taste | Kopfzeile lief bei 721 bis 860 px über (Seite 808 px breit bei 721 px Fenster) | Zweizeilige Kopfzeile (Logo und Warenkorb oben, Links als Streifen) schon ab 860 px, bis 1020 px kleinere Links | Nichts darf überlaufen |
| gpt-taste | Abstände gemischt (1,1 / 1,25 / 1,75 / 2,75 rem), Abschnitt oben 64 und unten 96 px, also 160 px Lücke | Feste Stufen 4, 8, 16, 24, 40, 64, 96 px; Abschnitt oben und unten je 64 px (Lücke 128 px), Handy je 32 px | Gleichmäßige, großzügige Stufen |
| gpt-taste | Hero als ein Textblock (Eyebrow bis Kaufknopf) neben dem Bild, die H1 konnte nie breiter als die Spalte werden | Kopf (Eyebrow, H1), Text (Untertitel, Sterne, Preis, Knopf) und Bild als drei Gitterbereiche. Reihenfolge bleibt Aufmerksamkeit (H1, Bild), Interesse (Untertitel), Verlangen (Sterne, Preis), Handlung (Knopf), am Handy untereinander in genau dieser Folge | Blickführung AIDA und breite Überschrift |
| impeccable | Warenkorb-Zähler als gefüllte Cyan-Scheibe, damit zweite helle Fläche neben dem gelben Knopf | Zähler nur als Cyan-Umriss; gefüllt ist allein der Kaufknopf | Signalfarbe und Füllung nur für den Kauf |
| impeccable | Alle Rahmen gleich stark (Kacheln, Preisfeld, Warenkorb, Schild, Karten), Kopfzeilenschein 0,45, Kachelzahlen mit 4 Schichten | Drei Stufen: Schild und Titel stark, Karten mittel, Preisfeld, Kacheln, Warenkorb schwach. Kopfzeilenschein 0,3, Kachelzahlen 2 Schichten | Ein Blickfang pro Bildschirm, Kaufknopf bleibt vorn |
| impeccable | `:focus-visible` setzte `border-radius:6px` (Pillen wären beim Fokus eckig geworden), Fokusring im Wischstreifen am Handy wäre vom Rand beschnitten worden (Innenabstand 4 px, Ring braucht 7 px) | Eckenregel entfernt, im Streifen Ring innen (`outline-offset:-6px`). Gemessen: weißer Ring 3 px an allen 9 Tab-Zielen auf PC und Handy | Sichtbarer Fokus |
| impeccable | Kontrast nur geschätzt | Eigenes Skript: 65 Textelemente, kleinster Fließtext 9,87:1, Logo (große Schrift, Röhre aus) 5,36:1. Am Pixelbild: Titelkern gegen Schein 5,9 bis 7,2:1 | Kontrast gemessen, nicht geglaubt |
| emil-design-eng | `transition:all .3s ease` auf Navigation, Warenkorb, Kaufknopf, Karten. Direkt nach Tab war die Ringbreite 0 px, weil der Fokusring über 300 ms einblendete | `transition:transform 160ms cubic-bezier(.23,1,.32,1)`, Ring sofort da. Hover-Farben schalten ohne Übergang (die Röhre geht sofort an) | Nie `all`, eigene Kurve, unter 300 ms, Tastatur nie animieren |
| emil-design-eng | Kein `:active`, Hover ohne Abfrage, Hover-Hebung auf Karten, die gar nicht klickbar sind | `:active{transform:scale(.97)}` auf Kaufknopf, Navigation, Warenkorb, Logo, Fußlinks (gemessen matrix 0,97). Hover nur unter `(hover:hover) and (pointer:fine)`, Kartenhebung entfernt | Rückmeldung beim Drücken, keine falschen Treffer am Handy |
| emil-design-eng | Kaufknopf-Hover animierte `box-shadow` (Neuzeichnen), Weichzeichner bis 48 px (Text), 30 px (Zeichnung), 40 px (Rahmen innen) | Schein über `::after` nur per Deckkraft. Alle Weichzeichner höchstens 20 px (`min(.8em,20px)`) | Nur `transform` und `opacity` animieren, Blur unter 20 px |
| emil-design-eng | Röhren im Hero standen sofort da | Rosa dann Cyan blenden einmal ein (Deckkraft, 240 ms, 120 ms Versatz). Zähler pulsiert 200 ms nur bei Mausklick oder Tippen, nie bei Tastatur | Kleine Rückmeldung, Staffelung, nichts von `scale(0)` |

Konflikte: Neon lebt vom Flackern, die Regeln gegen Dauerbewegung und Blitze gehen vor. Gelöst mit genau einem Anflackern des Logos (3 Wechsel,
linear, bewusst nicht als UI-Kurve) und sonst nur statischen Schatten. gpt-taste verlangt riesige Abstände und GSAP: Abstände ja (64 px je
Seite), GSAP nein (keine Bibliotheken erlaubt, der Kaufweg soll schnell sein). Reduzierte Bewegung schaltet auch die Einblendung der Röhren ab.

## Pro
- Der Kaufknopf ist das einzige gefüllte, warme Element. Nach den drei Durchgängen sind alle anderen Leuchten gedämpft, das Auge landet bei Titel, Zeichnung und Knopf.
- Sehr gute Lesbarkeit des Textes: Fließtext 15,5 bis 16,3:1, kleinster Wert 9,87:1 (Nebentext). Der Schein sitzt nur auf Titeln, Zahlen und Rahmen.
- Leicht: 35 KB ohne Schriften (HTML 14, CSS 20, JS 1), Schriften 60 KB, 7 Anfragen, kein Bild, kein Foto, keine Bibliothek.
- Ruhig im Betrieb: 0 requestAnimationFrame pro Sekunde, 0 endlose Animationen. Scroll-Test mit 4-fach gebremster CPU: 0 von 52 (PC) und 0 von 78 (Handy) Bildern über 33 ms.
- Unverwechselbar: die Zeichnung aus Rohr und Kern wirkt wie echtes Neon, ohne ein Foto oder eine Bilddatei.
- Die Farben sind in drei Rollen aufgeteilt, das macht Umfärben einfach: nur `--pink` und `--cyan` ändern, Gelb bleibt.

## Contra
- Die Zeichnung ist Handarbeit: Gerät, Schüssel und Gemüse mit Rohr, Kern und Haltern brauchten drei SVG-Ebenen. Für jedes neue Produkt muss ein neues Röhrenbild gezeichnet werden.
- Das Abstimmen der Leuchtstufen kostete einen ganzen Durchgang: zuerst leuchtete alles gleich stark und der Kaufknopf ging unter.
- Rund 20 Elemente mit je 2 bis 4 statischen Schatten und vier `drop-shadow`-Stufen pro Zeichnung. Im Test lief das flüssig, aber nur in einem Computer-Browser ohne Grafikkarte, nicht auf einem echten billigen Handy.
- Hell auf Dunkel mit Schein kann bei Astigmatismus verschwimmen. Gegenmittel: Fließtext ohne Schein, Tilt Neon nur ab 24 px. Es gibt keine helle Variante.
- Der Look wirkt wie Bar oder Spielhalle. Für Zahlung und Rechtliches kann das weniger seriös wirken, als ein ruhiger Look.
- Die 20-px-Grenze für Weichzeichner macht den Schein kompakter. Ein breiter Hof wie bei klassischen Neon-Mustern (60 px und mehr) ist damit nicht drin.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Gelber Knopf ist auf dem Nachtgrund der klare Blickfang, die Stimmung ist stark, aber nur für passende Produkte. |
| Lesbarkeit | 4 | Fließtext 15 bis 16:1 ohne Schein, nur die kleinen Titel verlieren etwas Schärfe durch den Schein. |
| Handy | 4 | Eigener Entwurf mit gekürztem Bild, 48-px-Zielen und halbierten Schatten, nur die H1 braucht drei Zeilen. |
| Tempo | 4 | 35 KB, keine Bewegungsschleife, aber viele Schatten und nur im Computer-Browser getestet. |
| Barrierefreiheit | 3 | Kontrast, Fokus und reduzierte Bewegung sind gemessen gut, doch Schein auf Dunkel bleibt für manche Augen anstrengend. |
| Aufwand (5 = wenig Aufwand) | 2 | Zeichnung von Hand, Leuchtstufen abstimmen, jedes Produkt braucht ein neues Röhrenbild. |
| Risiko (5 = geringes Risiko) | 3 | Look polarisiert, wirkt für manche Produkte unseriös, Flackern muss immer bei einem einzigen Mal bleiben. |

## Passt besonders zu
Küchen- und Partygeräten, Bar- und Getränkezubehör, Gaming, Lampen und Deko, Geschenken, Produkten, die abends benutzt werden.

## Passt nicht zu
Gesundheit, Baby, Bio und Natur, Finanzen, Luxus und alles, was Ruhe und Vertrauen verkaufen soll.

## Stolperfallen
- `filter: drop-shadow` auf einem Pfad im SVG wirkt nicht überall. Deshalb jede Farbe als eigenes Wurzel-SVG, das Filter liegt auf dem `<svg>` selbst.
- Das Logo-Flackern braucht `data-text` am selben Element wie das `::after`. Am Link hat der Text nicht gestimmt (`attr()` liest nur das eigene Element).
- Das Logo trägt zwei Ebenen, die untere (Röhre aus) muss selbst Kontrast haben (hier 5,36:1), sonst meldet der Prüfer die dunkle Grundebene.
- Die H1 war ab 1440 px dreizeilig, weil die Höchstgröße größer war als die Spalte. Immer bei 1100, 1280, 1440 und 1920 px Zeilen zählen.
- Die Kopfzeile mit fünf Links und Warenkorb läuft zwischen 721 und 860 px über. Zweizeilig ab 860 px.
- `transition:all` ließ auch den Fokusring einblenden (Ringbreite 0 px direkt nach Tab). Nur `transform` und `opacity` nennen.
- Das Etikett "Beispiel" liegt absolut oben links. Die Karte braucht oben genug Innenabstand (64 px), sonst überdeckt es das Zitat.
- Der Preis brach vor dem Eurozeichen um. Beträge mit `white-space:nowrap` in einen eigenen `<span>` setzen.
- Ein Verlauf mit absolut positioniertem Pseudo-Element rechts über den Rand erzeugt waagerechten Überlauf. Stattdessen mehrere `radial-gradient` am `body` mit fester Höhe.
- Ohne `<link rel="icon">` zeigt das Prüfskript einen 404-Fehler. In der Demo steht `href="data:,"`.
- `text-wrap:balance` und `hyphens:auto` brauchen `lang="de"`. Lange Wörter wie "Bewertungen" sonst am Handy zu breit.
- Teilsterne: der Verlauf für 4,6 Sterne gilt für die Umrisse der Form (`objectBoundingBox`), ergibt etwa 60 % Füllung. Das reicht als Anzeige.

## Anwenden
1. `vorlage/style.css` nach `assets/style.css` des Shops kopieren. Farben nur in `:root` ändern, die Rollen (Rosa, Cyan, Gelb nur Kaufknopf) beibehalten.
2. Schriften aus `../design-vorlagen/fonts/` kopieren: `TiltNeon-400.woff2`, `Outfit-400.woff2`, `Outfit-500.woff2`, `Outfit-700.woff2` samt Lizenzdateien. Die `@font-face`-Zeilen im CSS auf den neuen Pfad stellen, `font-display:swap` lassen.
3. Klassen der Demo: `.neon .neon--pink .neon--cyan` (Titel), `.kopf .logo .logo__text[data-text] .nav .korb`, `.hero .hero__kopf .hero__text .hero__bild`, `.schild .ebene--rosa .ebene--cyan .ebene--halter .rohr .kern`, `.preisblock`, `.cta`, `.zahlen .kachel .zahl`, `.karten .karte .symbol`, `.schritte .schritt .schritt__nr`, `.stimmen .stimme .marke`, `.hinweis`, `.fuss`.
4. Passend zu den Haken des Skills `ein-produkt-shop`: Die Demo hat eigene Namen. Im Shop entweder die Selektoren im CSS ergänzen (zum Beispiel `.cta,.knopf{...}`, `.karte,.kachel{...}`, `.neon,.leucht{...}`, `.korb`) oder im HTML umbenennen. Die Schritte zum Wechsel (Schriften, `style.css`, Logo, Hintergrund, Favicon, Vorschaubild) stehen in `../design-vorlagen/references/umstellen.md`. Dort `WELT` leer lassen (der Grund kommt aus dem CSS) und `theme-color` auf #0a0614 setzen.
5. Hero-Bild neu zeichnen: Pfade in `<defs>` als `rohr-rosa` und `rohr-cyan` (Linien mit runden Enden, `fill:none`), im Zeichenraum 640 mal 600, Inhalt zwischen y 50 und 555, damit die Handy-Kürzung nichts abschneidet.
6. Danach prüfen: Zeilen der H1 bei 1100, 1280, 1440 und 1920 px, Kontrast, Tab-Fokus, reduzierte Bewegung (Logo ohne Flackern), kein waagerechter Überlauf bei 390, 820 und 1280 px.

## Dateien
- `vorlage/demo.html` (HORTA-Startseite, 14 KB)
- `vorlage/style.css` (20 KB)
- `vorlage/script.js` (Warenkorb-Zähler, 1 KB)
- Schriften: `../design-vorlagen/fonts/TiltNeon-400.woff2`, `Outfit-400.woff2`, `Outfit-500.woff2`, `Outfit-700.woff2`
