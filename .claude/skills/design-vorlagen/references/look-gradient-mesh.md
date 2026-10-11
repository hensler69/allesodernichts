<!-- Kopie aus look-gradient-mesh/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Gradient Mesh

Gebaut und getestet als Demo der HORTA-Startseite (Gemüseschneider HT-5). Alles liegt in `vorlage/` (demo.html, style.css, script.js). Alle Zahlen unten stammen aus Messungen an dieser Demo (Chromium ohne Grafikkarte, 1280 und 390 px Breite).

## Wann der Look passt / Wann nicht

Passt, wenn das Produkt freundlich, frisch und alltäglich sein soll und keine guten Produktfotos vorliegen: Küche, Essen, Pflege, Haushalt, Wellness, Apps und Geräte für eine breite Zielgruppe. Das Farbnetz wirkt wie ein Himmel hinter dem Produkt und braucht kein Foto, die flache Zeichnung des Geräts reicht.

Passt nicht bei Produkten, die Ernst, Härte oder Luxus verkaufen (Profi-Werkzeug, Medizin, Finanzen, dunkle Premium-Technik), und nicht, wenn die Zielgruppe viele sehr alte Telefone oder Browser nutzt, weil das animierte Netz dort ruckeln kann oder gar nicht läuft (dann steht es still, die Seite bleibt vollständig). Wer lieber Tiefe und Glanz will, nimmt Glassmorphism. Wer lieber Bewegung in Formen will, nimmt Liquid Morph.

## Merkmale

- Hero-Hintergrund aus sechs überlagerten `radial-gradient`-Ebenen (Pfirsich, Limette, Himmelblau, Rosé). Ihre Mittelpunkte wandern in 22, 26 und 30 Sekunden hin und her, nur die Positionen ändern sich, nie die Größe der Flächen.
- Jede Ebene fällt nach einer Kosinus-Kurve in 21 Stufen auf durchsichtig ab. Das ergibt weiche Ränder ohne sichtbare Stufen (Banding).
- Karten, Zahlenleiste, Ablauf-Schritte, Bewertungstafel und Hinweisblock sind Mesh-Kacheln mit eigenem, ruhigem Farbnetz aus drei Ebenen. Die Paletten wechseln (`.m-1` bis `.m-5`), die Kacheln stehen still.
- Gerät und Schüssel sind flache Vektorformen: Weiß mit einer harten Schattenbahn, Stahlgrau für den Kegel, Tintenschwarz für Stopfer, Knopf und Löcher, Gemüsestücke in Grün, Orange und Rosa. Keine Verläufe, keine Unschärfe, keine Körnung.
- Dunkle Tinte (#14221c) auf hellem Netz. Wo kleiner Text steht, liegt er auf der Zeichnung direkt oder auf einer halbdichten weißen Fläche (Preisblock, Eyebrow, Bewertungskarten).
- Der Kaufknopf ist tiefes Tannengrün (#0f3d2e) mit weißer Schrift und die einzige dunkle Fläche der Seite, die man drücken kann. Alle anderen Bedienelemente sind Umrisse.
- Kopfzeile deckend in Seitenfarbe mit Linie darunter, aktuelle Seite als Pille mit Netzverlauf plus Unterstreichung.
- Handy: Das Netz hat nur drei statt sechs Ebenen, Karten stehen waagerecht (Symbol links, Text rechts), der Kaufknopf liegt bei 390 mal 844 px im ersten Bild.

## Farben

| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #fffaf4 | Seitengrund, Kopfzeile, Fußzeile |
| `--mesh-grund` | #fff4ea | Untergrund unter jedem Netz und jeder Kachel |
| `--pfirsich` / `--f-pfirsich` | #ffd7b5 | nur Netz (Farbfleck und Stufenliste), Hover der Navigation |
| `--limette` / `--f-limette` | #d8f5a2 | nur Netz |
| `--himmel` / `--f-himmel` | #b9dcff | nur Netz, Sockelband und Sichtfenster im Gerät |
| `--rose` / `--f-rose` | #ffc4d6 | nur Netz |
| `--tinte` | #14221c | Haupttext, Linien, Fokusring, Zähler, Zeichen, Details im Gerät |
| `--tinte-2` | #2a3b32 | Zweittext (Untertitel, Kleingedrucktes, Fußzeile) |
| `--flaeche` | rgba(255,255,255,.7) | ruhige halbdichte Fläche über dem Netz (Preisblock, Eyebrow, Symbolkreis) |
| `--signal` / `--signal-hell` | #0f3d2e / #1d5c46 | nur der Kaufknopf (Schrift darauf Weiß), Hover des Knopfs |
| `--stern` | #ffb77a | Sterne (immer mit Tintenrand) |
| Zeichnung | #fff, #d3e0d9, #c5d3cc, #a2b4aa, #8fa399, #cfe6ff, #8fc0f0, #7fb4e8 | Gerät (Weiß, Schatten, Stahl, Schüssel), nur im SVG |
| Gemüse | #a8de52, #ff9d5c, #ff86a8 | Gurke, Möhre, Tomate, nur im SVG |

Die vier Netzfarben haben keine Bedeutung, sie sind frei verteilbar. Gemessener Kontrast (Pixel hinter jeder Textzeile, zwölf Phasen der Animation, PC und Handy): Fließtext und Überschriften mindestens 8,26 zu 1 (PC) und 8,77 zu 1 (Handy), der Untertitel direkt auf dem Netz ist der schwächste Wert. Kaufknopf Weiß auf Tannengrün 12,16 zu 1, im Hover 7,86 zu 1.

## Schriften

Eine Familie: Manrope, Dateien in `../design-vorlagen/fonts/` (zusammen 41 KB).

| Gewicht | Datei | Wofür |
| --- | --- | --- |
| 800 | Manrope-800.woff2 | H1, H2, H3, Preis, Zahlen, Ziffern der Schritte, Kaufknopf, Logo, Namen in Bewertungen |
| 600 | Manrope-600.woff2 | Navigation, Eyebrow, Preisnotiz, Zitate, "Beispiel"-Schild, Sterne-Zeile |
| 400 | Manrope-400.woff2 | Fließtext, Kleingedrucktes |

`font-display: swap`, die 800er und die 400er Datei werden per `preload` geladen. Die H1 steht eng (`letter-spacing: -.035em`, Zeilenhöhe 1,02) und ist 63 px groß bei 1280 px, immer genau zwei Zeilen von 320 bis 1920 px Breite.

## So ist er gebaut

**1. Netz aus typisierten Eigenschaften (`@property`), nur die Mittelpunkte wandern**

```css
@property --x1 { syntax: "<percentage>"; inherits: false; initial-value: 12%; }
@property --y1 { syntax: "<percentage>"; inherits: false; initial-value: 20%; }
/* ... bis --x6, --y6 */
.netz {
  position: absolute; inset: 0; z-index: -1;
  --x1: 12%; --y1: 20%;                       /* Standwerte, auch ohne @property-Unterstützung */
  background-color: var(--mesh-grund);
  background-image:
    radial-gradient(ellipse 46% 62% at var(--x1) var(--y1), var(--f-pfirsich)),
    radial-gradient(ellipse 42% 58% at var(--x2) var(--y2), var(--f-limette)),
    /* ... vier weitere Ebenen */;
}
@keyframes wandern-a { 0% { --x1: 12%; --y1: 20%; } 100% { --x1: 30%; --y1: 44%; } }
```

Ohne `@property` kann der Browser einen Wert wie `12%` nicht weich zwischen zwei Werten überblenden, er würde mitten in der Animation springen. Darum gilt die Bewegung nur, wenn das Skript die Klasse `netz-an` setzt. Das Netz ist ein leeres Element ohne Kinder, damit die Neuberechnung nur dieses eine Element trifft.

**2. Weiche Ränder: Stufenlisten als Variablen, 21 Stopps nach Kosinus-Kurve**

```css
:root {
  --f-pfirsich: rgb(255 215 181 / 1) 0%, rgb(255 215 181 / 0.994) 5%, rgb(255 215 181 / 0.976) 10%,
                /* ... Alpha = (1 + cos(pi * t)) / 2, alle 5 Prozent ... */ rgb(255 215 181 / 0) 100%;
}
```

Eine Variable darf eine ganze Stopp-Liste mit Kommas enthalten und lässt sich in `radial-gradient(..., var(--f-pfirsich))` einsetzen. Die Kurve hat am Rand und in der Mitte die Steigung null, es gibt keinen sichtbaren Ring.

**3. Animation in Stufen statt stetig, pausiert außerhalb des Bildes**

```css
@media (prefers-reduced-motion: no-preference) {
  .netz-an .netz {
    animation:
      wandern-a 26s steps(130) infinite alternate,
      wandern-b 30s steps(150) -9s infinite alternate,
      wandern-c 22s steps(110) -4s infinite alternate;
  }
  .netz-an .ruht .netz { animation-play-state: paused; }
}
```

```js
var kannEigenschaften = !!(window.CSS && typeof CSS.registerProperty === 'function');
if (kannEigenschaften && !wenigBewegung.matches) wurzel.classList.add('netz-an');
new IntersectionObserver(function (e) { imBild = e[e.length - 1].isIntersecting; setzePause(); }).observe(tafel);
document.addEventListener('visibilitychange', setzePause);   // setzePause schaltet die Klasse "ruht"
```

`steps(130)` heißt: etwa fünf kleine Sprünge pro Sekunde, jeder rund 2 px. Bei so flachen Verläufen sieht das Auge ein Gleiten, der Browser zeichnet aber nur fünfmal statt 60-mal pro Sekunde neu (siehe Pro).

**4. Mesh-Kachel mit eigenem Netz und Mini-Bewegung bei Hover**

```css
.kachel { position: relative; isolation: isolate; overflow: hidden; background: var(--mesh-grund); border-radius: var(--r-m); }
.kachel::before {
  content: ""; position: absolute; inset: -16%; z-index: -1;
  background-image:
    radial-gradient(ellipse 58% 58% at 20% 22%, var(--k1)),
    radial-gradient(ellipse 56% 56% at 82% 28%, var(--k2)),
    radial-gradient(ellipse 66% 58% at 52% 94%, var(--k3));
  transition: transform .2s var(--ease);
}
.m-2 { --k1: var(--f-limette); --k2: var(--f-himmel); --k3: var(--f-pfirsich); }
@media (hover: hover) and (pointer: fine) { .kachel:hover::before { transform: translate3d(-2%, -1.5%, 0) scale(1.02); } }
```

Das Netz ist 32 Prozent größer als die Kachel (`inset: -16%`), so entsteht beim Verschieben keine Lücke am Rand. Bewegt wird nur `transform`.

**5. Flaches Gerät und Handy als eigener Entwurf**

```html
<g clip-path="url(#c-turm)"><rect x="92" y="168" width="152" height="244" fill="#fff"/><rect x="192" y="168" width="52" height="244" fill="#d3e0d9"/></g>
```

Ein weißer Körper, abgeschnitten (`clip-path`) auf die Form, plus eine flache Schattenbahn rechts. Der Bodenschatten ist eine Ellipse in Tinte mit 12 Prozent Deckkraft, keine Unschärfe. Fallende Stücke bewegen nur `transform` und `opacity`.

```css
@media (max-width: 900px) { .hero__text { display: contents; } .eyebrow { order: 1; } h1 { order: 2; } .hero__bild { order: 3; height: 300px; } /* ... */ }
@media (max-width: 700px) { .netz { background-image: /* nur drei Ebenen */; } .hero__bild { height: 196px; } .karte { display: grid; grid-template-columns: 56px 1fr; } }
```

## Pro

- Sehr gut lesbar: dunkle Tinte auf Pastell, schwächster Wert 8,26 zu 1 am PC und 8,77 zu 1 am Handy, gemessen per Pixelprobe hinter jeder Textzeile in zwölf Phasen der Animation. Das Netz darf wandern, ohne dass Text je unter 8 zu 1 fällt.
- Kein Stufen-Banding in der Messung: In freien Mesh-Bereichen (rechts oben, Mitte rechts) war der längste Lauf gleicher Pixel 37 und 29 px, Chromium mischt die Verläufe sichtbar mit Rauschen auf Pixelebene (Dithering, Nachbarwerte springen um 2 Stufen). Mit 21 Stopps pro Farbe und niedrigem Kontrast gibt es keinen Ring.
- Leicht: 53 KB ohne Schriften (HTML 22,5 KB, CSS 27 KB, JS 4,7 KB), 41 KB Schriften, 6 Anfragen, 0 rAF-Aufrufe, kein Bild, kein Canvas.
- Mit `steps()` kostet das laufende Netz am PC keine Bildzeit mehr: ohne 33,3 ms pro Bild im Mittel (30 Bilder pro Sekunde, schlimmster Wert 83 ms), mit `steps(130)` 16,6 ms (60 Bilder pro Sekunde, schlimmster Wert 17 ms). Am Handy-Format 17,8 auf 16,6 ms. Außerhalb des Bildes laufen 0 Endlos-Animationen.
- Kommt ohne Produktfoto aus: Das flache Gerät in Weiß, Stahl und drei Gemüsefarben trägt den Hero. Für Dropshipping ohne Foto-Freigabe ein Vorteil.
- Rückfälle sind getestet und fotografiert: ohne `@property` steht das Netz still und ist vollständig sichtbar, ohne JavaScript bleibt die Seite lesbar (Navigation unter dem Logo), bei reduzierter Bewegung steht ein Standbild mit Gemüse in der Luft, bei "mehr Kontrast" bekommen Kacheln 2 px Rahmen und das Netz hält an. Die H1 bleibt von 320 bis 1920 px bei zwei Zeilen, die Kopfzeile läuft bei keiner gemessenen Breite über.

## Contra

- Animierte Eigenschaften (`@property`) zeichnen auf dem Hauptprozess neu. Mit stetiger Bewegung brauchte das Netz 33 ms pro Bild im Software-Test, erst `steps()` brachte 16,6 ms. Auf echter Grafikkarte wird es weniger sein, ich habe es nicht gemessen. Auf einem billigen Telefon bleibt es ein Risiko, deshalb nur drei Ebenen am Handy und Pause außerhalb des Bildes.
- Die Bewegung ist ein Stufenlauf: etwa fünf Schritte pro Sekunde, jeder rund 2 px. Das ist bei diesen flachen Verläufen unsichtbar (rechnerisch im Mittel rund 0,07 Stufen Farbänderung pro Schritt), aber Easing-Kurven gehen damit nicht, und an den Umkehrpunkten dreht die Richtung ohne Abbremsen.
- Es gibt keine rein CSS-seitige Prüfung, ob `@property` funktioniert, die ich als verlässlich getestet hätte. Darum braucht die Bewegung ein kleines Skript (Klasse `netz-an`). Ohne Skript steht das Netz still.
- Banding und Dithering habe ich nur in Chromium gemessen. In Safari und Firefox kann der Verlauf anders aussehen (ungemessen).
- Pastell allein hat wenig Wucht. Der Look wirkt vertraut, fast wie eine Standard-SaaS-Seite. Individualität kommt nur aus der selbst gezeichneten Geräte-Form und aus dem tiefgrünen Knopf. Lime über Pfirsich mischt sich außerdem zu einem grauen Beige (sichtbar oben rechts im Hero), Reihenfolge und Abstand der Ebenen mussten nachgezogen werden.
- Der Look hängt am dunklen Text auf hellem Grund. Dunklere Mesh-Farben oder weiße Schrift brauchen sofort eine halbdichte Fläche dahinter (Preisblock, Eyebrow), sonst kippt der Kontrast. Pflegeaufwand: 4 Stufenlisten à 21 Werte (84 Stopps) und vier Kachel-Paletten im CSS.

## Eignung für Ein-Produkt-Shops

| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Hell und freundlich, der Tannengrün-Knopf ist die einzige dunkle Fläche zum Drücken, Pastell wirkt aber vertraut und wenig mutig. |
| Lesbarkeit | 5 | Fließtext gemessen mindestens 8,26 zu 1 in zwölf Animationsphasen, Knopf 12,16 zu 1. |
| Handy | 4 | Netz mit drei Ebenen, Knopf bei 390 mal 844 px im ersten Bild (y 714 bis 774), aber das Gerät ist nur 196 px hoch. |
| Tempo | 4 | 53 KB und 60 Bilder pro Sekunde mit `steps()`, offen bleibt der Hauptprozess-Neuzeichnen-Aufwand auf schwachen Telefonen. |
| Barrierefreiheit | 5 | Kontrast hoch, Fokusring sichtbar, reduzierte Bewegung, mehr Kontrast und ohne JavaScript geprüft. |
| Aufwand (5 = wenig Aufwand) | 3 | Stufenlisten, Netz-Paletten, Rückfälle und Handy-Entwurf brauchen Zeit, die Kachel selbst ist schnell kopiert. |
| Risiko (5 = geringes Risiko) | 3 | `@property` fehlt in alten Browsern (dann Stillstand), Banding außerhalb von Chromium ungemessen, Look kann wie Vorlage wirken. |

## Passt besonders zu

Küchen- und Haushaltsgeräten, Pflege- und Wellnessprodukten, Alltagsprodukten für eine breite, freundliche Zielgruppe (Trinkflasche, Mixer, Aufbewahrung, Tee, Kerzen), allem, was ohne Foto über eine saubere Zeichnung verkauft wird.

## Passt nicht zu

Ernsten oder harten Produkten (Profi-Werkzeug, Medizin, Finanzen) und dunklen Premium-Auftritten. Auch nicht zu Shops, deren Besucher überwiegend sehr alte Telefone nutzen.

## Stolperfallen

- **Ohne Standwert kein Netz:** Steht `var(--x1)` im Verlauf und die Variable ist nicht registriert und nicht gesetzt, wird die ganze `background-image`-Zeile ungültig. Darum stehen die Standwerte zusätzlich als normale Zeilen in `.netz`.
- **Springen statt Gleiten:** Nicht registrierte Variablen lassen sich nicht überblenden, sie kippen in der Mitte der Animation. Die Bewegung darf deshalb nur über die Klasse `netz-an` an, nach der Prüfung per `CSS.registerProperty`.
- **Stetige Bewegung zu teuer:** Sechs Ebenen über 1248 mal 680 px neu zu zeichnen kostete 33 ms pro Bild. `will-change: transform` am Netz brachte nur 25,5 ms. `steps(130)` brachte 16,6 ms, `steps(60)` 17,6 ms. Hinter dem Netz liegt ein eigenes leeres Element, damit Text und Zeichnung nicht mitgezeichnet werden.
- **Fallende Stücke und Netz zugleich:** Die Stücke (nur `transform`) kosteten allein etwa 6 ms zusätzlich, solange das Netz stetig lief. Mit Stufen ist es kein Thema mehr.
- **Warenkorb-Symbol schob die Kopfzeile breit:** Bei 390 px lief die Kopfzeile um 1 px über (391 zu 390), weil das Symbol in der Flex-Zeile schrumpfte. Lösung: `flex: none` am Symbol, dafür unter 430 px engere Abstände und unter 380 px kein Symbol. Das fand erst die Messung bei vielen Breiten.
- **Halbtransparente Kopfzeile:** Mit 96 Prozent Deckkraft schien beim Scrollen Text durch (Bildschirmfoto mobil-3). Jetzt deckend.
- **Weißes Gerät auf hellem Netz:** Die erste Zeichnung (Schattenbahn kaum dunkler als Weiß, Hilfs-Scheibe dahinter) war ein verwaschener Fleck. Erst die dunklere Schattenbahn (#d3e0d9) und der Verzicht auf die Scheibe machten die Form lesbar.
- **Nähte im Gerät:** Der abgerundete Boden des Schachts schimmerte im Turm durch. Der Schacht läuft jetzt unten eckig in den Turm hinein, die Schattenbahnen beginnen bei beiden an derselben Stelle (x 192).
- **Überschrift am Handy:** Der Container für `cqi` fehlt, sobald `.hero__text` auf `display: contents` steht. Dort gilt eine Größe in `vw` (7,6 vw, 26 bis 35 px).
- **Testfilter fraß das Stylesheet:** Beim Test ohne `@property` entfernte mein Filter auch einen Kommentar, der das Wort "@property" enthielt, und mit ihm den `:root`-Block. Der Test meldete fälschlich "kein Netz". Der Filter muss `@property --name { ... }` genau treffen.
- **Rückfälle prüfen:** `CSS.registerProperty` per Init-Skript auf `undefined` setzen und die `@property`-Regeln aus dem Stylesheet entfernen. "Mehr Kontrast" geht über `Emulation.setEmulatedMedia` im Chrome-DevTools-Protokoll.
- **Kontrast messen statt schätzen:** Text per CSS unsichtbar machen (`color: transparent`), Animation auf zwölf Zeitpunkte setzen (`animation.currentTime`), ganze Seite fotografieren und hinter jeder Textzeile den dunkelsten Pixel gegen die Textfarbe rechnen.

## Anwenden

1. `vorlage/style.css` als Startpunkt in `assets/style.css` kopieren. Schriften aus `../design-vorlagen/fonts/` (Manrope 400, 600, 800 samt `Manrope-LICENSE.txt`) nach `assets/fonts/` kopieren, die drei `@font-face`-Pfade und das `preload` anpassen. Kein Netz zur Laufzeit.
2. Klassen der Demo: Hero `.hero > .hero__tafel[data-netz-huelle]` mit leerem `<div class="netz" aria-hidden="true">`, `.hero__text`, `.hero__bild`, `.eyebrow`, `.untertitel`, `.bewertung`, `.preis`, `.cta`; Kacheln `.kachel` mit Palette `.m-1` bis `.m-5`; Aufbau `.huelle`, `.abschnitt`, `.abschnitt__kopf`, `.streifen`, `.zahlen`, `.karten > .karte`, `.schritte > .schritt`, `.stimmen-tafel .stimmen > .stimme`, `.hinweis`, `.kopf`, `.nav`, `.korb`, `.menue-knopf`, `.fuss`; Einblenden `.zeigen` mit `--i` für die Staffelung; fallende Stücke `.fall--1` bis `.fall--5`.
3. Haken des Skills `ein-produkt-shop` (siehe `../design-vorlagen/references/umstellen.md`): Die Klassen heißen hier teils anders als im Glas-Apple- und Neo-Brutalism-Stylesheet. Zuordnung: `.knopf` ist `.cta`, `.kachel` bleibt `.kachel` (hier mit eigenem Netz), `.schritt` bleibt. `.welt` entfällt, weil das Netz nur im Hero liegt (ein leeres `.netz` statt der Himmel-Szene), `.leucht` entfällt, `[data-gruss]`, `.abschied` und der Himmel-Code im JavaScript laufen ohne Wirkung weiter. Ich habe das nicht an einem echten Shop durchgespielt, nur an dieser Demo.
4. `LOGO_MARK` im Generator als Kugel mit vier Farbnetzen neu zeichnen (Demo: vier `radialGradient` in einem Kreis), `theme-color` auf #fffaf4, Favicon als Kreis mit drei Netzfarben.
5. Die Hero-Zeichnung ersetzen: flache Formen, Weiß plus eine Schattenbahn (#d3e0d9), ein dunkles Detail in Tinte, höchstens drei Gemüsefarben. Keine Fremdfotos.
6. Das Skript `script.js` mitnehmen (Prüfung `CSS.registerProperty`, Klasse `netz-an`, Pause per `IntersectionObserver` und `visibilitychange`). Ohne dieses Skript steht das Netz still, das ist gewollt.
7. Prüfen: Bildschirmfotos PC und Handy, Kontrast per Pixelprobe in mehreren Animationsphasen, Rückfälle (ohne `@property`, ohne JavaScript, reduzierte Bewegung, mehr Kontrast), Kopfzeile zwischen 700 und 1000 px, Bildzeit mit und ohne laufendes Netz.

## Dateien

- `vorlage/demo.html`: HORTA-Startseite im Look (22,5 KB), Hero-SVG und Symbole inline.
- `vorlage/style.css`: Tokens, Stufenlisten, `@property`, Netz, Kacheln, Handy-Entwurf, Sondermodi (27 KB).
- `vorlage/script.js`: Netz-Schalter, Pause, Menü, aktuelle Navigation, Einblenden, Demo-Warenkorb (4,7 KB).
- Schriften nicht kopiert, sie werden aus `../design-vorlagen/fonts/` geladen: Manrope-400.woff2, -600.woff2, -800.woff2.

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)

Reihenfolge wie im Auftrag, nach jedem Durchgang Prüfskript und Bildschirmfotos. Gelesen wurden die drei SKILL.md. Von `impeccable` liegt nur die SKILL.md vor, das Startskript und die `reference/*.md` fehlen und wurden ausgelassen, es gilt die Kurzregel: jede Farbe eine Rolle, Signalfarbe nur Kaufknopf, ein Blickfang pro Bildschirm, Kontrast gemessen, sichtbarer Fokus.

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | H1 mit `9.6cqi`, 56 px bei 1280 px, Spalten 1,08 zu 0,92 | `10.2cqi`, 63 px bei 1280 px, Spalten 1,12 zu 0,88, genau zwei Zeilen von 320 bis 1920 px gemessen | Überschrift breit, höchstens zwei Zeilen am PC |
| gpt-taste | Innenabstände gemischt: Karte 24/28/32, Schritt 24/32/36, Stimme 24/28/28, Hero 64/64/64/72 | zwei Stufen: `--pad` 32 px für Kacheln, `--pad-l` 56 px für Tafeln (bei 1100 px 28 und 40, am Handy 18) | gleichmäßige Abstandsstufen |
| gpt-taste | Zahlenleiste bei 820 px mit vier schmalen Kacheln, Bewertungen schon ab 1000 px in einer breiten Spalte | Zahlenleiste ab 900 px abwärts 2 mal 2, Bewertungen drei Spalten bis 900 px | lückenloses Raster, keine leeren Streifen |
| impeccable | Symbol-Striche im HTML als `#14221c`, Hover-Flächen mit zwei Werten (.55 und .45) | `currentColor` mit `.symbol { color: var(--tinte) }`, ein Token `--hover` | jede Farbe hat eine Rolle, `--signal` kommt nur in `.cta` vor (gezählt) |
| impeccable | `--tinte-2` #34453c, Untertitel auf dem Netz 7,09 zu 1 (PC) und 7,5 zu 1 (Handy) | #2a3b32, 8,26 zu 1 und 8,77 zu 1, gemessen in zwölf Animationsphasen | Kontrast gemessen, Reserve für wandernde Farben |
| impeccable | Kopfzeile mit 96 Prozent Deckkraft, Text schien beim Scrollen durch, Kleingedrucktes am Handy 13 px | deckend in Seitenfarbe, Kleingedrucktes 14 px | klare Ebenen, lesbare Pflichtangaben |
| impeccable | Kein Verhalten für "mehr Kontrast" oder erzwungene Farben | `prefers-contrast: more` (2 px Rahmen, deckende Flächen, Netz hält an, fotografiert) und `forced-colors` (Knopf mit Kante) | Barrierefreiheit in Sondermodi |
| emil-design-eng | `scroll-behavior: smooth` für Sprünge der Navigation | entfernt, Menü öffnet ohne Animation | Tastatur-Aktionen nie animieren |
| emil-design-eng | Reduzierte Bewegung setzte jede Übergangsdauer auf 0,01 ms | nur Deckkraft-Übergänge mit 150 ms bleiben (Hover-Fläche am Kaufknopf) | weniger Bewegung, nicht null |
| emil-design-eng | Hover der Kachel-Netze: 280 ms, 3 und 2,5 Prozent Weg, Maßstab 1,04; Sprunglink ohne Druck-Rückmeldung | 200 ms, 2 und 1,5 Prozent, Maßstab 1,02, nur unter `(hover: hover) and (pointer: fine)`; `:active { transform: scale(.97) }` auch am Sprunglink (160 ms, `cubic-bezier(.23,1,.32,1)`); alle gelisteten Übergänge gemessen: nur `transform` und `opacity`, höchstens 200 ms, kein `all`, kein `ease-in` | Hover bei Deko drastisch reduzieren, jedes drückbare Element reagiert |
| emil-design-eng | `touch-action` und Antipp-Markierung nicht gesetzt | `touch-action: manipulation`, `-webkit-tap-highlight-color: transparent` an Links und Knöpfen | kein Antipp-Verzug am Handy |
| emil-design-eng | Netz mit stetiger Kurve `cubic-bezier(.37,0,.63,1)` (aus der ersten Demo, noch vor den Durchgängen gemessen): 33,3 ms pro Bild | `steps(130)`, `steps(150)`, `steps(110)`: 16,6 ms pro Bild, 60 Bilder pro Sekunde | Neuzeichnen nur, wenn sich sichtbar etwas ändert |

Konflikte: Die Nutzerregeln gingen vor (ein Kaufknopf, keine Gedankenstriche, Verbotsliste, Barrierefreiheit). `gpt-taste` verlangt GSAP, Pinning, Marquee, zwei Knöpfe im Hero, Bilder von picsum und "grainy mesh gradients": nicht übernommen (nur Vanilla-JS, genau ein Kaufknopf, keine Fotos, und Körnung ist laut Look-Auftrag ein Klischee, das Chromium-Dithering reicht), Überschrift, Raster, Abstand und Blickführung gelten. `emil-design-eng` verlangt Bewegung nur mit `transform` und `opacity` und Animationen unter 300 ms: Das Netz bewegt sich über `@property` und 22 bis 30 Sekunden, das ist der Kern des Looks. Gelöst durch Trennung: Bedienelemente und Einblenden folgen der Regel (höchstens 280 ms, nur `transform` und `opacity`), das Netz ist Hintergrund-Deko in einem leeren Element, läuft nur im Stufenlauf, pausiert außerhalb des Bildes und bei verdecktem Tab und steht bei reduzierter Bewegung still. Statt einer Easing-Kurve nutzt es `steps()`, weil das die Neuzeichnungen spart.
