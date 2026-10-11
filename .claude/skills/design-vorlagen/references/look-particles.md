<!-- Kopie aus look-particles/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Particles

Dunkler Grund (#070b14), hinter dem Hero ein Canvas mit etwa 90 Punkten (Handy etwa 40), die langsam driften. Nahe Punkte verbindet eine dünne Linie, der Mauszeiger stößt sie sanft ab. Beim Laden sammeln sich die Punkte kurz zu einem Ring mit fünf Löchern (der Kegel-Einsatz des Gemüseschneiders) und lösen sich dann ins Feld auf. Das Hero-Bild ist das Gerät mit Schüssel als Punkt-Linien-Figur. Gebaut und getestet als Demo der HORTA-Startseite: `vorlage/demo.html`.

## Wann der Look passt / Wann nicht
**Passt**, wenn das Produkt Technik, Strom, Licht, Vernetzung oder "Präzision" ausstrahlt und die Seite nachts, nüchtern und modern wirken soll. Der Look trägt einen einzigen starken Effekt (das Feld) und lässt den Rest ruhig, deshalb bleibt Platz für Preis und Kaufknopf.
**Passt nicht**, wenn das Produkt Wärme, Natur, Frische, Kinder oder Handwerk versprechen soll. Auch schwach, wenn die Zielgruppe überwiegend ältere Handys ohne Grafikbeschleunigung nutzt (der Canvas kostet Leistung) oder wenn Bewegung im Hintergrund ablenken würde (viel Text lesen, Vergleichstabellen).

## Merkmale
- Nachtblauer Grund, Text in Weiß und Hellgrau, Limette für Linien, Zahlen, Sterne und Akzent, Mint als zweite Punktfarbe, Orange nur für den Kaufknopf.
- Canvas-Feld hinter dem Hero: 40 bis 90 Punkte (Zahl nach Fläche), Linien bis 124 px Abstand (Handy 92 px), Zeiger-Abstoß am PC.
- Einleitung beim Laden: Punkte fliegen in 0,85 s zu einem Ring mit fünf Löchern (zwei Außenringe, fünf Sechsecke, eine Nabe), halten 0,55 s und drehen sich leicht, lösen sich dann in 1,0 s ins Feld auf.
- Hero-Figur aus 335 Kreisen (Knoten, Gemüsestücke, fallende Stücke, Streupunkte) und etwa 640 Linien: Schacht mit Stopfer, Gehäuse mit Kegel-Einsatz (Scheibe mit fünf Löchern), Motorblock, Schüssel voller Gemüsestücke, fallende Stücke dazwischen.
- Ruhige Zonen: Über Überschrift und Textblock wird das Feld im Canvas auf 14 % gedimmt, zusätzlich liegt ein dunkler Scrim darunter. Text liegt nie auf unruhigen Punkten.
- Zierde im Rest der Seite statt Meta-Label: ein Knoten mit Haarlinie vor jeder Überschrift, Knoten an zwei Ecken jeder Karte, Ablauf als Knoten auf gepunkteter Linie, Lieferweg als Route.
- Kaufknopf als orange Pille, die einzige große gefüllte Farbfläche über dem Falz.
- Pausenknopf für die Hintergrundbewegung, Standbild bei `prefers-reduced-motion`, Seite voll lesbar ohne JavaScript.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #070b14 | Seitengrund, Hero, Canvas-Grund |
| `--flaeche` | #0d1424 | Karten, Zahlenleiste, Menü-Knopf |
| `--text` | #eef2f7 | Überschriften, Fließtext (17,5 : 1 auf Grund, 16,3 : 1 auf Karten) |
| `--text-2` | #b9c4d6 | Untertitel, Kartentexte (11,2 : 1 auf Grund, 10,4 : 1 auf Karten) |
| `--text-3` | #9ba9c0 | nur Kleingedrucktes (8,3 : 1 auf Grund, 7,7 : 1 auf Karten) |
| `--limette` | #b6ff5c | Akzent: Linien, Zahlen, Sterne, Eyebrow, "Mehr Salat.", Fokusring (16,4 : 1 auf Grund) |
| `--mint` | #5cffc8 | zweite Punktfarbe: Knoten, Löcher der Scheibe, Marke "Beispiel" (14,5 : 1 auf Karten) |
| `--orange` | #ff7a3d | NUR Kaufknopf (7,6 : 1 zum Grund) |
| `--auf-orange` | #14100a | Text auf dem Kaufknopf (7,3 : 1; Weiß fällt mit 2,6 : 1 durch) |
| `--haar` | rgba(150,175,215,.2) | neutrale Haarlinien, Kartenrand |
| `--haar-lime` | rgba(182,255,92,.3) | Haarlinien im Akzent, gepunktete Linien, Rand der Hinweisbox |

Werte mit dem kleinen Python-Rechner gemessen (WCAG-Formel), nicht geschätzt.

## Schriften
Space Grotesk, zwei Dateien aus `../design-vorlagen/fonts`: `SpaceGrotesk-700.woff2` (Überschriften, Zahlen, Knöpfe, Gewicht 700) und `SpaceGrotesk-500.woff2` (Fließtext, Gewicht 500). Zusammen 26 KB. Kein Gewicht 400 oder 600 laden, sonst stellt der Browser Fettdruck selbst nach. Lizenz: `SpaceGrotesk-LICENSE.txt` im selben Ordner mitkopieren. Die 700er Datei per `<link rel="preload" as="font" crossorigin>` vorladen.

## So ist er gebaut
**1. Canvas-Feld mit Pixel-Budget und Zahl nach Fläche.** Die Zahl der Punkte hängt an der Fläche des Hero, die Auflösung des Canvas an einem Budget von etwa 1,6 Megapixeln (nie über 2-facher Dichte). Linien werden in vier Alpha-Stufen gesammelt und mit vier `stroke()`-Aufrufen gezeichnet, nicht einzeln.
```js
function zahl() {
  var n = Math.round(W * H / 10500);          // PC 1280x728: 90, Handy 390x900: 40
  n = Math.max(40, Math.min(90, n));
  return Math.max(24, Math.round(n * guete)); // guete sinkt, wenn das Gerät nicht mitkommt
}
dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(1600000 / (W * H)));
dpr = Math.max(1, dpr);
```

**2. Ruhige Zonen.** Jedes Element mit der Klasse `ruhig` ist ein Rechteck, in dem das Feld auf 14 % gedimmt wird, mit weichem Rand. Die Figur dimmt auf 42 %, aber erst, wenn der Ring sich aufgelöst hat. Gemessen nach dem Einschwingen: im Textblock sind auf dem PC höchstens 1,1 % der Canvas-Pixel belegt, am Handy höchstens 5,6 %.
```js
var dx = Math.max(z.l - x, 0, x - z.r), dy = Math.max(z.t - y, 0, y - z.b);
var k = Math.min(1, Math.sqrt(dx * dx + dy * dy) / z.rand);
k = k * k * (3 - 2 * k);                 // weicher Rand
var v = z.min + (1 - z.min) * k;         // z.min = 0.14 für Text
```

**3. Ring mit fünf Löchern.** Aus der Punktzahl n werden Ziele berechnet (Summe immer genau n), die Punkte werden zufällig zugeordnet. Damit der Ring als Form erkennbar ist, zeichnen eigene Linien zwischen den Nachbarn der Form (nicht die Abstandslinien), die beim Auflösen in 0,4 s ausblenden. Abstandslinien sind erst ab der Auflösung aktiv.
```js
var loch = Math.max(4, Math.floor(n * 0.075));
var aussen = n - 5 * loch - 1, a1 = Math.ceil(aussen * 0.6), a2 = aussen - a1;
kreis(a1, R, cx, cy, -Math.PI / 2);                 // Außenring
kreis(a2, R * 0.84, cx, cy, -Math.PI / 2 + Math.PI / a2);
for (k = 0; k < 5; k++) kreis(loch, R * 0.2, cx + R * 0.52 * Math.cos(w), cy + R * 0.52 * Math.sin(w), 0);
```

**4. Pausieren und Standbild.** Die Schleife läuft nur, wenn der Hero im Bild ist, der Tab sichtbar ist und keine reduzierte Bewegung gewünscht wird. Gemessen: im Bild 60 rAF-Aufrufe pro Sekunde, Hero außerhalb des Bildes 0, bei reduzierter Bewegung 0 mit einem einmal gezeichneten Feld.
```js
function starten() { if (laeuft || reduziert || !sichtbar || document.hidden) return; laeuft = true; /* ... */ }
new IntersectionObserver(function (e) { sichtbar = e[e.length - 1].isIntersecting; sichtbar ? starten() : stoppen(); }).observe(hero);
document.addEventListener('visibilitychange', function () { document.hidden ? stoppen() : starten(); });
if (reduziert) { erzeugen(n, false); phase = 2; zeichne(); }   // ein Standbild, keine Schleife
```
Im ruhigen Feld zeichnet die Schleife nur 30 Bilder pro Sekunde (`if (ts - letzte < 28) { rAF; return; }`), Ring und Auflösung laufen mit 60. Kommt das Gerät nicht mit (Durchschnitt über 30 ms pro Bildschirmbild), schrumpft das Feld um ein Viertel (getestet: bei 12-facher CPU-Bremse 89 auf 66 Punkte, ohne Bremse bleibt es bei 89).

**5. Hero-Figur aus Python, zwei Ausschnitte per `<use>`.** `figur-erzeugen.py` beschreibt Formen als Konturen, tastet sie in gleichen Abständen ab, setzt Knoten und verbindet Nachbarn plus kurze Querlinien. Das SVG steht einmal in `<defs>`, die Seite zeigt es zweimal: am PC mit vollem `viewBox`, am Handy mit gekürztem Ausschnitt (ohne Stopfer, oben ausgeblendet). CSS-Animationen laufen auch in `<use>`.
```html
<svg class="figur__svg figur__svg--gross" viewBox="0 0 600 560" role="img" aria-label="Zeichnung aus Punkten und Linien: ..."><use href="#fig-inhalt"/></svg>
<svg class="figur__svg figur__svg--klein" viewBox="60 118 480 436" role="img" aria-label="..."><use href="#fig-inhalt"/></svg>
```
```css
.figur__svg--klein{display:none}
@media (max-width:640px){
  .figur__svg--gross{display:none}
  .figur__svg--klein{display:block;overflow:hidden;mask-image:linear-gradient(180deg,transparent 0,#000 24%)}
}
@media (prefers-reduced-motion:no-preference){
  .figur__svg{animation:schweben 8s cubic-bezier(.37,0,.63,1) infinite}   /* nur transform */
  .fig-fall circle{animation:fallen 2.6s linear infinite;animation-delay:calc(var(--i) * -.52s)}
}
```
Zum Neuzeichnen: `python3 figur-erzeugen.py > figur-teil.html`, Inhalt in `<g id="fig-inhalt">` einsetzen. Formen stehen in `baue()`, Punktabstand in `ABSTAND`.

## Pro
- Der Ring mit fünf Löchern ist der Kegel-Einsatz des Geräts und kehrt in der Figur (Scheibe mit fünf Löchern) und im Logo wieder. Der Look erzählt das Produkt, er ist nicht nur Dekor.
- Kaufknopf bleibt die auffälligste Fläche: Orange (7,6 : 1 zum Grund) ist die einzige große gefüllte Farbe über dem Falz, am Handy 390 x 844 liegt er komplett im ersten Bildschirm (y 705 bis 768).
- Lesbar: Text 10,4 bis 17,5 : 1, Kleingedrucktes 7,7 : 1, im Textblock höchstens 1,1 % Feldpixel (PC).
- Billig im Netz: Seite 76 KB (HTML 39, CSS 20, JS 18) plus 26 KB Schriften, 5 Anfragen, keine Bibliothek, keine Bilddatei. Das Skript selbst braucht 11 bis 17 ms pro Sekunde.
- Stabil bei Ausfall: ohne JavaScript steht die Seite vollständig da (Punktraster als Ersatz), bei reduzierter Bewegung 0 rAF-Aufrufe und 0 Endlos-Animationen.
- Kein waagerechter Überlauf von 320 bis 1920 px Breite getestet (320, 360, 390, 430, 720, 780, 820, 900, 959, 960, 1024, 1280, 1440, 1920).

## Contra
- Der Canvas ist der teuerste Teil. Im Software-Renderer des Testbrowsers kostet er bei 1280 x 800 noch etwa 470 ms Hauptthread-Zeit pro Sekunde (vorher 945, vor der 30-Bilder-Grenze und dem Pixel-Budget). Auf Geräten mit Grafikbeschleunigung ist es viel weniger, aber auf echten schwachen Handys nicht gemessen.
- Dauerbewegung verlangt einen Pausenknopf (WCAG 2.2.2, Bewegung länger als 5 Sekunden). Er ist eingebaut (44 px, am Rand der Figur), ein Bedienelement mehr im Hero.
- Am Handy trägt das Feld kaum: Der Textblock deckt fast den ganzen Hero ab und dort ist das Feld gedimmt, sichtbar bleibt es nur um die Figur. Der Look wirkt am PC deutlich stärker.
- Hoher Aufwand: 465 Zeilen JavaScript, ein Figur-Generator, Ring-Zuordnung, viele Randfälle (Größenänderung während der Einleitung, Schriftwechsel, Tab-Wechsel, Pause). Jedes neue Produkt braucht eine neu gezeichnete Figur.
- Limette und Mint auf Nachtblau sind das Standard-Bild von Technik-Startups. Für Küche und Essen wirkt das kühl, der HORTA-Schneider passt inhaltlich nur mittelmäßig.
- Unterhalb des Heros sieht die Seite fast wie ein normaler Dunkel-Look aus. Der Particles-Charakter bleibt dort nur in Knoten, Linien und Zierpunkten, nicht im Feld.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Orange ist die einzige Farbfläche und der Knopf liegt im ersten Bildschirm, nur das Feld lenkt etwas vom Preis ab. |
| Lesbarkeit | 4 | Kontrast 10 bis 17 : 1 und Text auf ruhiger Fläche, nur die 13 px große Eyebrow ist knapp. |
| Handy | 4 | Knopf im ersten Bildschirm und Figur auf etwa 200 px gekürzt, aber das Feld ist dort kaum sichtbar. |
| Tempo | 3 | Nur 76 KB, aber der Canvas kostet Rasterzeit und braucht Güteregelung. |
| Barrierefreiheit | 4 | Standbild, `aria-hidden`, Fokus 16 : 1 und Menü per Tastatur, aber Dauerbewegung braucht den Pausenknopf. |
| Aufwand (5 = wenig Aufwand) | 2 | 465 Zeilen JavaScript, Figur-Generator und viele Prüfläufe. |
| Risiko (5 = geringes Risiko) | 3 | Leistung auf schwachen Geräten, Technik-Klischee und die Bewegungsregel sind echte Risiken. |

## Passt besonders zu
Lampen, Lichtwecker, Ladegeräte, Smart-Home, Sensoren, Kopfhörer, Geräte mit Elektronik und alles, was "Netz" oder "Verbindung" im Namen oder Versprechen trägt.

## Passt nicht zu
Lebensmittel, Naturkosmetik, Kinderprodukte, Handwerk und Geschenke, bei denen Wärme verkauft.

## Stolperfallen
- **Ring wurde sofort abgebrochen.** Der `ResizeObserver` feuert direkt nach `observe()` einmal. Mein `neuMessen()` setzte darauf die Einleitung auf "frei", der Ring blieb unsichtbar. Jetzt prüft die Funktion, ob sich die Größe wirklich geändert hat, und zieht den Ring bei Änderung zur neuen Mitte, statt abzubrechen. Gleiches gilt für `document.fonts.ready` (Schriftwechsel verändert die Höhe).
- **Ring nicht erkennbar.** Mit Abstandslinien allein (Reichweite 78 px) verklumpte der Ring zu einem Netz, die Löcher verschwanden. Lösung: eigene Linien entlang der Formen, Abstandslinien erst nach der Auflösung.
- **Ring gedimmt.** Die Figurzone dämpfte das Feld auf 55 %, also auch den Ring. Jetzt wirkt sie erst nach der Auflösung.
- **Bilder der Einleitung im Test.** `page.clock.install()` lässt die Zeit weiterlaufen, Bildschirmfotos sind dann nicht wiederholbar. Mit `pauseAt()` anhalten und mit `runFor()` vorrücken.
- **`<use>` und Überlauf.** Ohne `overflow:hidden` am gekürzten Handy-Ausschnitt ragt der Stopfer über die Überschrift. Mit Maske oben ausblenden statt hart abschneiden.
- **Kopfzeile bei 320 und 360 px** ragte um 39 und 6 px über den Rand (Logo, Warenkorb, Menü). Logo-Schrift und Abstände verkleinern, unter 340 px nur Text im Logo.
- **Fokus-Regel mit `border-radius`** im globalen `:focus-visible` machte aus Pillen beim Fokus 6-px-Ecken. Nur den Ring setzen, die Form kommt vom Element.
- **Gruppierte Selektoren** (`.logo, .nav a, ...{padding; font-size}`) überschrieben die Schrift des Logos. Für `:active` darf man gruppieren, für Maße nicht.
- **Kontrast des Fokusrings auf Orange** ist nur 2,2 : 1. Das ist unkritisch, weil der Ring 4 px Abstand hat und auf dem Seitengrund liegt (16,4 : 1). Den Abstand nicht auf 0 setzen.
- **H1 über die Rasterspalte** brauchte 3 Zeilen. Die Überschrift spannt deshalb über beide Spalten (eine Zeile ab 1280 px, zwei Zeilen bei 960 bis 1024 px).

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Kleine Beschriftungen "FUNKTIONEN", "ABLAUF", "BEWERTUNGEN", "FRAGEN ZUR LIEFERUNG" über den Überschriften | Entfernt, dafür ein Knoten mit Haarlinie als Zierde | Meta-Labels doppeln die Navigation und wirken billig. |
| gpt-taste | Abstand zwischen Abschnitten 96 px | 120 px am PC, 88 px Tablet, 64 px Handy, aus einer Stufenreihe (8, 16, 24, 40, 64, 120) | Große, gleichmäßige Abstände machen Kapitel. |
| gpt-taste | Handy-Hero: Figur 330 px hoch, Kaufknopf bei y 1000 (unter dem Falz bei 844 px) | Figur etwa 200 px (gekürzter Ausschnitt, oben ausgeblendet), engerer Textblock, Knopf y 705 bis 768 | Die Handlung gehört in den ersten Bildschirm. |
| gpt-taste | Kleingedrucktes im Preisblock brach mit dem Waisenwort "Werktage" um; Raster ohne Prüfung auf Lücken | `text-wrap:balance`; `grid-auto-flow:dense` und Prüfung 4, 2 x 2 und 1 Spalte bei den Karten, 3 Spalten bei den Bewertungen | Ruhige Blöcke und ein Raster ohne leere Zellen. |
| impeccable | Warenkorb-Zähler als gefüllte Limetten-Pille | Kontur in Limette | Nur der Kaufknopf bleibt gefüllte Farbfläche über dem Falz (ein Blickfang). |
| impeccable | Fokus-Regel mit `border-radius:6px` verformte Pillen; Kontrastwerte im Kommentar geschätzt (17,4 / 10,8 / 7,7 / 8,0) | Regel nur mit Ring; Werte gemessen (17,5 / 11,2 / 8,3 / 7,3) und in den Token-Kommentaren festgehalten | Jede Zahl belegt, Fokus bleibt in Form. |
| impeccable | Endlose Hintergrundbewegung ohne Möglichkeit zum Anhalten | Pausenknopf 44 px am Figurrand, friert Feld und Figur ein, Etikett wechselt | WCAG 2.2.2: Bewegung über 5 Sekunden muss sich anhalten lassen. |
| impeccable | Kopfzeile bei 320 und 360 px zu breit, Kleingedrucktes am Handy 13,6 px, keine Regel für den Windows-Kontrastmodus | Logo und Abstände verkleinert, 14 px, `forced-colors`-Regeln für Knöpfe und Karten | Lesbar und bedienbar auf den kleinsten Geräten. |
| emil-design-eng | `:active` nur auf Kaufknopf, Navigation, Warenkorb, Menü und Fußlinks | `scale(.97)` auch auf Logo und Pausenknopf, Tap-Highlight aus, `touch-action:manipulation` | Jedes drückbare Element antwortet, kein 300-ms-Warten am Handy. |
| emil-design-eng | Zähler hüpfte auch bei Enter per Tastatur; Karten-Hover 200 ms hin und zurück; Knopf-Schatten 20 px Blur | Hüpfen nur bei Maus oder Touch (`e.detail > 0`); 220 ms hin, 140 ms zurück; 16 px Blur | Tastatur-Aktionen nie animieren, zurück schneller als hin, Blur unter 20 px. |
| emil-design-eng | Zeiger-Abstoß mit Rohposition: 0,5 s neben dem Punkt nur etwa 3 px zusätzlich, ruckelig | Zeiger weich nachgeführt (`1 - exp(-16 * dt)`), Kraft nach Abstand zum Quadrat, Zerfall 2,2 pro Sekunde, gemessen etwa 9 px zusätzlich | Mausnahe Dekoration braucht Federgefühl statt Sprung. |
| emil-design-eng | Schleife mit 60 Bildern pro Sekunde, Canvas bis 2-fache Dichte (945 ms Hauptthread pro Sekunde im Software-Renderer) | 30 Bilder im ruhigen Feld, 60 nur für Ring und Auflösung, Pixel-Budget 1,6 Megapixel (468 ms pro Sekunde) | Leistung zuerst, die langsame Drift sieht bei 30 Bildern gleich aus. |

Konflikte: Der Ring (1,4 s) und die endlose Drift sprengen Emils 300-ms-Regel für Oberflächen. Beides ist Dekoration und bleibt, ist aber vierfach begrenzt (Hero nicht im Bild, Tab verdeckt, reduzierte Bewegung, Pausenknopf); der Auftritt der Figur selbst dauert 280 ms mit `scale(.96)` und Ausgangs-Easing. gpt-taste verlangt zwei Knöpfe und einen großen Kaufaufruf im Fuß, hier gibt es nach den Regeln des Nutzers genau einen Kaufknopf im Hero. impeccables Warnung vor Neon-auf-Dunkel gilt nicht, weil der Look vorgegeben ist.

## Anwenden
1. **Stylesheet:** `vorlage/style.css` nach `assets/style.css` des Shops kopieren, `script.js` als `assets/particles.js` einbinden (mit `defer`) und im `<head>` vor dem Stylesheet `<script>document.documentElement.classList.add('js');</script>` setzen. Die Klasse `js` schaltet Menü, Auftritt der Figur und Pausenknopf frei.
2. **Schriften:** `SpaceGrotesk-500.woff2`, `SpaceGrotesk-700.woff2` und `SpaceGrotesk-LICENSE.txt` aus `../design-vorlagen/fonts` nach `assets/fonts/` kopieren, in `style.css` die `url("../../design-vorlagen/fonts/...")` auf `url("fonts/...")` ändern, die 700er per `preload` laden.
3. **Hero-Gerüst:** `<section class="hero" id="ueberblick">` mit `<canvas class="feld" id="feld" aria-hidden="true">` als erstem Kind. Darin `.hero__raster` mit `.hero__kopf.ruhig` (Eyebrow, H1), `.figur#figur` (zwei SVG und Pausenknopf `.bewegung`) und `.hero__rest.ruhig` (Untertitel, Sterne, `.preis`, genau ein `.cta`). Jeder Textblock, der auf dem Feld liegt, bekommt die Klasse `ruhig`.
4. **Weitere Klassen:** `.zahlen__liste`, `.sektion`, `.sektion__kopf` mit `.knoten-linie`, `.karten` und `.karte` (mit `.symbol`), `.schritte`, `.schritt`, `.schritt__knoten`, `.bewertung`, `.marke`, `.hinweis`, `.route`, `.fuss`, Kopfzeile mit `.nav`, `.korb`, `.menue`. Die Demo nutzt eigene Klassennamen. Die Haken des Skills ein-produkt-shop (`.glas`, `.knopf`, `.kachel`, `.schritt`, `.frage`, `.korb`) sinngemäß auf diese Regeln abbilden: `.knopf` auf `.cta`, `.glas` auf `.karte`, `.kachel` auf die Kacheln der Zahlenleiste. Das Hero-Element `.welt` des Glas-Looks entfällt, das Feld liegt im Canvas.
5. **Figur:** Formen in `figur-erzeugen.py` (`baue()`) an das Produkt anpassen, Ausgabe in `<g id="fig-inhalt">` einsetzen, die Ausschnitte (`viewBox`) für PC und Handy prüfen. Für eine Zeichnung ohne Python: beliebiges SVG mit den Klassen `fig-linien`, `fig-netz`, `fig-knoten`, `fig-knoten--mint`.
6. **Ring anpassen:** In `ringZiele()` stehen Zahl und Lage der Löcher (fünf für den Kegel-Einsatz). Anderes Produkt, andere Form: Ziele neu rechnen, die Gruppen für die Formlinien mit zurückgeben.
7. **Prüfen:** Tablet-Breite 720 bis 900 px (Kopfzeile), 320 px, reduzierte Bewegung, ohne JavaScript, Pausenknopf, Hero außerhalb des Bildes (rAF muss auf 0 fallen). Danach `../design-vorlagen/references/umstellen.md` (Reihenfolge für das Umstellen eines bestehenden Shops: Schriften, Stylesheet, Generator, Favicon, Prüfung) und der CHECK von ein-produkt-shop.

## Dateien
- `vorlage/demo.html` Startseite von HORTA im Look (Hero, Zahlenleiste, Funktionen, Ablauf, Bewertungen, Hinweis China, Fußzeile)
- `vorlage/style.css` alle Regeln, Farben als Variablen in `:root`
- `vorlage/script.js` Menü, Warenkorb-Zähler (nur Demo), Canvas-Feld, Pausenknopf
- `vorlage/figur-erzeugen.py` erzeugt die Hero-Figur als SVG-Teil
- Schriften: `../design-vorlagen/fonts/SpaceGrotesk-500.woff2`, `SpaceGrotesk-700.woff2`, `SpaceGrotesk-LICENSE.txt`
