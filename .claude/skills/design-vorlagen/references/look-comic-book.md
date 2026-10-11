<!-- Kopie aus look-comic-book/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Comic Book

Gebaut und getestet als Startseite des HORTA-Shops (elektrischer Gemüseschneider). Lauffähige Demo: `vorlage/demo.html` mit `vorlage/style.css` und `vorlage/script.js`. Ansehen: im Ordner `.claude/skills` einen Server starten (`python3 -m http.server 8101`) und `http://localhost:8101/look-comic-book/vorlage/demo.html` öffnen.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt eine kleine Geschichte hat: Gerät steht bereit, etwas geht hinein, etwas kommt heraus. Dann tragen drei Bildkästen den Ablauf (Gerät, Gemüse fliegt in den Schacht, volle Schüssel) und die Sprechblasen dürfen frech sein. Gut für Küche, Haushalt, Spielzeug, Hobby, Geschenke und alles, was Spaß machen soll.
Passt nicht bei ernsten oder teuren Produkten (Medizin, Finanzen, Luxus, Werkzeug für Profis), weil Comic Neue und Lautmalerei verspielt wirken. Auch schlecht, wenn ein echtes Produktfoto im Mittelpunkt stehen soll: Ein Foto in einem Comic-Rahmen wirkt eingeklebt.

## Merkmale
- Alles ist ein Bildkasten: Hero, Zahlen, Funktionen und Ablauf haben 4 px dicke Tintenrahmen. Im Hero trennen schräge weiße Rinnen (4 % der Breite) drei Bilder, im Handy-Entwurf stehen die Bilder untereinander.
- Texte stehen in gelben Erzählkästen (Untertitel, Preis-Tag, Funktionstexte, Hinweisblock), die Bewertungen in Sprechblasen mit Schwanz und einem selbst gezeichneten, erfundenen Sprecher.
- Lautmalerei als Burst-Sterne (ZACK!, WUSCH!, ZISCH!, RATSCH!, ZIPP!, HOPP!, KLACK!, PLUMPS!, BRRR!). Sie sind reine Deko (`aria-hidden`) und versprechen nichts. Die zwei im Hero poppen einmal auf (260 ms).
- Halbton-Raster (Rasterpunkte) sitzt nur in Ecken: große Punkte am Rand, kleine weiter innen, nie hinter Text. 14 Stellen, alle mit `radial-gradient`.
- Panel-Hintergründe sind Strahlenkränze aus `repeating-conic-gradient` (Blau, Gelb) oder helles Blau, das Gerät und das Gemüse sind flach gezeichnet mit 4 bis 5 px Tintenkontur.
- Der Ablauf ist ein schräg geschnittenes blaues Band. Die drei Schritt-Karten sind um 0,5 bis 0,8 Grad gekippt und tragen einen gelben Burst mit der Ziffer.
- Es gibt keine Versatzschatten an Flächen (das unterscheidet ihn von Neo-Brutalism), nur Versatzdruck an Schrift (gelb an der H1, Tinte am Kaufknopf-Text). Tiefe entsteht durch Rinnen, Überlappung (Blasen und Bursts ragen über Panelränder) und Halbton.
- Der Kaufknopf ist rot, leicht gekippt und sitzt auf einem gelben Burst als Hof. Er ist die einzige rote Fläche der Seite.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--papier` | #fffdf2 | Seitengrund, Sprechblasen, Karten (Tinte darauf 18,5:1) |
| `--gelb` | #ffe14a | Erzählkästen für Text, Eyebrow, Preis-Tag, Burst-Füllung, Panel-Strahlen (Tinte darauf 14,5:1) |
| `--blau` | #1d4ed8 | Banner "Mehr Salat.", Panel-Grund, Ablauf-Band, Zähler, Lautmalerei auf Papier (Weiß darauf 6,7:1, auf Papier 6,6:1) |
| `--blau-hell` | #cfe0ff | helle Panel-Hintergründe, Paketbild (Tinte darauf 14,2:1) |
| `--tinte` | #111111 | alle Konturen, aller Text, Fokusring, Fußzeile |
| `--tinte-weich` | #3a3a3a | nur Kleingedrucktes auf Papier (etwa 11:1) |
| `--rot` | #d62839 | NUR Kaufknopf und Textauswahl (`::selection`). Weiß darauf 4,97:1 |
| `--gruen`, `--gruen-hell`, `--karotte` | #2fae63, #b7eb9c, #ff9a3c | nur Zeichnungen (Gemüse), nie Text oder Bedienelement |
| `--blau-strahl`, `--gelb-strahl` | #2b5ee8, #ffd51c | nur zweiter Streifen der Strahlenkränze |
Das Beispiel aus dem Auftrag nannte Rot #e63946. Weiß darauf erreicht nur 4,17:1, darum ist es auf #d62839 abgedunkelt (4,97:1). Orange (`--karotte`) ist im Bild bewusst kein Rot, damit der Knopf die einzige Signalfarbe bleibt.

## Schriften
Dateien aus `../design-vorlagen/fonts/`, drei Stück, zwei Familien, 61 KB zusammen:
| Familie | Gewicht | Datei | Wofür |
| --- | --- | --- | --- |
| Bangers | 400 | `Bangers-400.woff2` (23,5 KB) | H1, H2, H3, Preis, Zahlen, Kaufknopf, Lautmalerei, Logo. Nie für Fließtext |
| Comic Neue | 700 | `ComicNeue-700.woff2` (19,2 KB) | Text in Blasen und Erzählkästen, Navigation, Etiketten |
| Comic Neue | 400 | `ComicNeue-400.woff2` (19,6 KB) | Kleingedrucktes (Preis-Hinweis, Fußzeile) und Grundwert für `body` |
Bangers hat nur Großbuchstaben (kleine Buchstaben erscheinen als Versalien). "In den Warenkorb" steht im HTML normal und wird als "IN DEN WARENKORB" gezeichnet. Der Text im Knopf bleibt für Screenreader normal lesbar.

## So ist er gebaut
**1. Bildkasten mit gleichmäßigem Rahmen auf schräger Kante.** Ein `clip-path` schneidet auch den Rahmen weg. Darum liegt der Ausschnitt in einem Kind (`.panel__bild`) und der Rahmen entsteht im Eltern-Element aus vier harten Schatten, die der Form folgen. Alle drei Panels liegen als volle Ebenen übereinander, nur das Polygon unterscheidet sie. Die Rinne ist der Abstand zweier paralleler Kanten (4 % Breite, die linke Kante läuft von 57 % oben nach 49,5 % unten, die rechte von 61 % nach 53,5 %).
```css
.panel{position:absolute;inset:0}
.panel--1{--form:polygon(0 0,57% 0,49.5% 100%,0 100%)}
.panel--2{--form:polygon(61% 0,100% 0,100% 43%,57.3% 49%)}
.panel__rahmen{position:absolute;inset:0;
  filter:drop-shadow(4px 0 0 var(--tinte)) drop-shadow(-4px 0 0 var(--tinte)) drop-shadow(0 4px 0 var(--tinte)) drop-shadow(0 -4px 0 var(--tinte))}
.panel__bild{position:absolute;inset:0;overflow:hidden;clip-path:var(--form);
  background:repeating-conic-gradient(from 6deg at 30% 62%,var(--blau) 0 6deg,var(--blau-strahl) 6deg 12deg)}
@media (max-width:600px){.panel{position:relative;height:clamp(176px,52vw,230px);--form:polygon(0 0,100% 5%,100% 100%,0 95%)}}
```
```html
<div class="panel panel--1"><div class="panel__rahmen"><div class="panel__bild"><i class="halbton halbton--lu"></i><svg class="art">...</svg></div></div>
  <p class="blase blase--leicht">Ganz leicht!</p></div>
```
Blasen und Bursts stehen neben `.panel__rahmen`, nicht darin, sonst bekämen auch sie den Schattenrahmen. Am Handy bekommen alle drei Panels dasselbe Polygon (obere und untere Kante fallen parallel nach rechts), dann bleibt die Rinne überall 24 px breit.

**2. Sprechblase mit Schwanz aus zwei Dreiecken.** Das Tinte-Dreieck ist der Rand, das etwas kleinere Papier-Dreieck (3,5 px nach innen gerückt) öffnet den Blasenrand an der Ansatzstelle. `top:100%` beginnt an der Innenkante des Randes, deshalb passt es ohne Lücke. `.blase--links` spiegelt den Schwanz mit `scale:-1 1`. Die Schriftgröße folgt der Breite der Collage (`cqw`, ein Hundertstel der Containerbreite).
```css
.blase{position:absolute;padding:.35em .85em .42em;background:var(--papier);border:3px solid var(--tinte);border-radius:26px;
  font:700 clamp(1.05rem,3.9cqw,1.5rem)/1.1 var(--text);white-space:nowrap}
.blase::before,.blase::after{content:"";position:absolute;top:100%;width:36px;height:40px;left:var(--tx,60%)}
.blase::before{background:var(--tinte);clip-path:polygon(0 0,36px 0,30px 40px)}
.blase::after{background:var(--papier);clip-path:polygon(4.4px 0,32.5px 0,27.8px 31.2px)}
.blase--links::before,.blase--links::after{left:auto;right:var(--tx,60%);scale:-1 1}
```

**3. Halbton in der Ecke mit zwei Größen.** Zwei Pseudo-Elemente legen je ein Punktraster aus `radial-gradient`, das eine mit großen Punkten, das andere mit kleinen Punkten um einen halben Schritt versetzt. Zwei Masken lassen die großen Punkte nur nahe der Ecke und die kleinen weiter außen stehen. `--ox` und `--oy` sagen, in welcher Ecke das Zentrum liegt.
```css
.halbton{position:absolute;width:var(--hb,150px);height:var(--hb,150px);color:var(--punkt,rgba(17,17,17,.25));pointer-events:none}
.halbton::before,.halbton::after{content:"";position:absolute;inset:0}
.halbton::before{background:radial-gradient(circle,currentColor 0 2.7px,transparent 3.2px) 0 0/11px 11px;
  -webkit-mask-image:radial-gradient(circle at var(--ox) var(--oy),#000 0,#000 30%,transparent 46%);
  mask-image:radial-gradient(circle at var(--ox) var(--oy),#000 0,#000 30%,transparent 46%)}
.halbton::after{background:radial-gradient(circle,currentColor 0 1.5px,transparent 2px) 5.5px 5.5px/11px 11px;
  -webkit-mask-image:radial-gradient(circle at var(--ox) var(--oy),transparent 0,transparent 34%,#000 48%,#000 70%,transparent 100%);
  mask-image:radial-gradient(circle at var(--ox) var(--oy),transparent 0,transparent 34%,#000 48%,#000 70%,transparent 100%)}
.halbton--lu{left:0;bottom:0;--ox:0%;--oy:100%}
```

**4. Burst-Stern mit einmaligem Pop.** Der Stern ist ein `<symbol>` mit einem Polygon (13 Zacken, leicht unregelmäßig), `fill` und `stroke` kommen von der Klasse. Der Text liegt als HTML darüber. Ohne JavaScript ist er sichtbar, mit JavaScript blendet ein Beobachter beim ersten Sichtbarwerden die Klasse `da` ein, und nur dann läuft der Pop. Bei reduzierter Bewegung steht der Stern still da.
```css
.js .burst{opacity:0}
.js .burst.da{opacity:1;animation:pop 260ms var(--ease) both}
@keyframes pop{from{opacity:0;transform:scale(.75) rotate(-8deg)}60%{opacity:1;transform:scale(1.06) rotate(1deg)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.js .burst,.js .burst.da{opacity:1;animation:none}}
```
Die Drehung des Sterns steht in der Einzel-Eigenschaft `rotate`, die Animation in `transform`. Beide überlagern sich, ohne sich zu stören.

**5. Kaufknopf mit Burst-Hof.** Hinter dem Knopf liegt ein gelber Stern, auf die Breite des Kaufblocks gedehnt (`preserveAspectRatio="none"`). Mit `vector-effect="non-scaling-stroke"` am Polygon bleibt die Kontur trotz Dehnung 3 px dick. Der Knopf selbst hat kein `clip-path`, damit sein Fokusring vollständig bleibt.
```html
<div class="cta-huelle"><svg class="cta-halo" viewBox="0 0 120 120" preserveAspectRatio="none" aria-hidden="true"><use href="#burst-c"/></svg>
  <button class="cta" type="button">In den Warenkorb</button></div>
```
```css
.cta{border:4px solid var(--tinte);border-radius:6px;background:var(--rot);color:#fff;font:400 2.3rem/1 var(--titel);
  text-shadow:2px 2px 0 var(--tinte);rotate:-1.5deg;transition:transform 160ms var(--ease)}
.cta:active{transform:scale(.97);transition-duration:90ms}
```

## Pro
- Der Look ist sofort erkennbar und lässt sich nicht mit Neo-Brutalism verwechseln: Rinnen, Blasen, Bursts und Halbton statt Versatzschatten. Auf dem ersten Bildschirm (1280 mal 800) sieht man Collage, Titelbanner und Kaufknopf zugleich.
- Der Kaufknopf ist die einzige rote Fläche. Er misst 235 mal 104 px, liegt bei 1280 mal 800 bei 609 bis 712 px und am Handy (390 mal 844) bei 709 bis 781 px, also im ersten Bildschirm. Auf dem kleinen Handy (360 mal 740) beginnt er bei 702 px.
- Lesbarkeit gemessen statt geschätzt: Pixelstichprobe hinter 75 Textknoten bei 390, 820 und 1280 px, kleinster Wert 4,97:1 (Weiß auf dem Kaufknopf), alle anderen Texte klar darüber. Die H1 hat von 360 bis 1920 px in 13 gemessenen Breiten zwei Zeilen.
- Leicht: 52 KB ohne Schriften (HTML 26,7, CSS 25,0, JS 1,3), Schriften 61 KB, 6 Anfragen, keine Bilddatei, kein `requestAnimationFrame`, keine Endlos-Animation. Die ganze Szene (Gerät, Gemüse, Schüssel, vier Symbole, Paket, drei Gesichter) ist inline-SVG und bleibt bei jeder Größe scharf.
- Das Hero braucht kein Foto. Der Handy-Entwurf nutzt dieselben drei Zeichnungen: nur das Polygon, die Höhe (176 bis 230 px) und die Lage der Blasen wechseln, die Bilder stehen untereinander.
- Wenig Bewegung: nur der einmalige Pop (260 ms) und das Einblenden (280 ms). Ohne JavaScript und bei reduzierter Bewegung ist die Seite vollständig sichtbar und still.

## Contra
- Hoher Aufwand: Die Bilder sind von Hand gezeichnet (330 mal 520 Einheiten für das Gerät, je 300 mal 300 für Gemüse und Schüssel, vier Symbole, Paket, drei Gesichter), und die Panel-Polygone müssen in Prozent von Hand parallel gehalten werden. Für ein anderes Produkt entstehen drei neue Szenen.
- Verspielter Ton: Comic Neue, Bangers und Lautmalerei passen nicht zu Produkten, die Ruhe oder Ernst verkaufen. Die Lautmalerei darf nur Deko bleiben, sonst wirkt sie wie ein Produktversprechen.
- Bangers gibt es nur in Versalien und ist breit. Die H1 musste auf `4,3rem` begrenzt werden, weil sie bei 1440 px mit 78 px dreizeilig wurde. Am Handy braucht sie `12,2vw`, sonst bricht "Weniger schnippeln." um.
- Comic Neue 400 ist dünn. Text in Blasen und Kästen steht darum in 700, die 400 nur im Kleingedruckten. Das Kleingedruckte hat 11:1, wirkt aber hell.
- Technisch nur in Chromium geprüft: Der Rahmen nutzt vier `drop-shadow`-Filter pro Panel (und zwei am Ablauf-Band), dazu `mask-image`, `cqw`, `rotate` und `translate` als Einzel-Eigenschaften und `vector-effect` im `<symbol>`. Safari und Firefox sind offen, schwache Handys ungeprüft.
- Die Seite ist lang: 3653 px am PC, 6057 px am Handy, weil jedes Bild und jede Karte seinen eigenen Kasten mit Rahmen und Rinne bekommt.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Roter Knopf mit gelbem Hof ist die einzige rote Fläche, aber das blaue Titelbanner und die Collage konkurrieren im ersten Bild. |
| Lesbarkeit | 4 | Kleinster gemessener Kontrast 4,97:1, Text in Erzählkästen und Blasen mit 15 bis 19 px, nur das Kleingedruckte in dünnem Comic Neue. |
| Handy | 4 | Eigener Entwurf mit untereinander stehenden Bildkästen und Kaufknopf bei 709 bis 781 px, dafür 6057 px Seitenlänge. |
| Tempo | 4 | 52 KB, kein rAF, keine Endlos-Animation, aber vier Filterflächen (drei Panels, ein Band) und 14 Halbton-Ecken mit Masken sind auf schwachen Handys ungeprüft. |
| Barrierefreiheit | 4 | Fokusring doppelt (Tinte mit Papierring), Ziele mindestens 44 px, reduzierte Bewegung ohne Animation, Lautmalerei `aria-hidden`, Bild als `role="img"` beschrieben; aber Bangers nur in Versalien. |
| Aufwand | 2 | Fünf bis sechs Zeichnungen und die Panel-Geometrie von Hand, jede neue Produktwelt braucht neue Szenen. |
| Risiko | 3 | Nur Chromium geprüft, kindlicher Ton passt nicht zu jedem Produkt, Konturen erinnern an Neo-Brutalism. |

## Passt besonders zu
Küchengeräte und Essen (wie HORTA), Haushaltshelfer mit sichtbarem Ablauf, Spielzeug, Hobby- und Bastelbedarf, Geschenkartikel.

## Passt nicht zu
Medizin, Finanzen, Luxus und Profi-Werkzeug. Produkte, die nur mit einem echten Foto überzeugen.

## Stolperfallen
- **`clip-path` schneidet den Rahmen weg.** Eine Border am Panel ginge mit verloren. Lösung: Rahmen über `drop-shadow`-Kette am Eltern-Element, Ausschnitt im Kind. Blasen und Bursts nie in dieses Eltern-Element setzen, sonst bekommen sie auch einen Rahmen.
- **Bursts verschwanden hinter dem nächsten Panel.** Die Panels sind übereinander gestapelt, ein später stehendes Panel malt über einen früheren Burst. `.panel` bekommt kein `z-index` (sonst eigener Stapel), die Bursts `z-index:4`, die Blasen `z-index:3`.
- **Schwanz der Sprechblase.** Das Tinte-Dreieck und das Papier-Dreieck müssen gleich groß in einem Kasten liegen, das innere Polygon ist um 3,5 px nach innen gerechnet (`polygon(4.4px 0,32.5px 0,27.8px 31.2px)`). Mit geraden Rändern ohne Rechnung wird der Rand an den Schrägen dünn.
- **Weiß auf #e63946 fällt knapp durch** (4,17:1). Der Kaufknopf nutzt #d62839 mit 4,97:1.
- **Das Prüfskript meldete "Schrift nicht geladen".** Alles stand in Gewicht 700, darum wurde `ComicNeue-400.woff2` nie angefordert. `body` und das Kleingedruckte stehen jetzt auf 400.
- **Die H1 war bei 1440 px dreizeilig** (`clamp(2.6rem,5.4vw,5rem)`, 78 px in 568 px Spalte). Gedeckelt auf 4,3 rem (69 px).
- **Halbton lief am Handy in die Zahl "8 bis 15"** (Abstand zur Ecke 40 px, große Punkte reichen 55 px). Ab 600 px abwärts entfällt die Ecke in den Zahlen-Kacheln.
- **Doppelte `text-shadow`.** Die gelbe Schattenzeile der H1 überschrieb am Handy das `text-shadow:none` des blauen Banners und gab der weißen Schrift einen gelben Rand. Die Regel steht jetzt auch im Handy-Block.
- **Collage kürzer als die linke Spalte.** Mit festem Seitenverhältnis 14/15 blieben unter dem Bild etwa 70 px leer. Ab 960 px füllt `align-self:stretch` die Spalte.
- **Gerät schnitt an der Schräge ab.** Der Sockel (zuerst 252 Einheiten breit) ragte unten rechts über die schräge Kante. Auf 224 Einheiten gekürzt. Allgemein: Zeichnungen mit Rand zur Schrägseite planen.
- **Schwarzer Streifen in der Schüssel.** Die dunkle Rückseite der Schüssel schaute zwischen Haufen und Vorderrand hervor. Der Haufen reicht jetzt bis hinter den Vorderrand.
- **Kaufblock mit Kleingedrucktem in der Preisspalte** machte den Knopf schmal und zweizeilig. Das Kleingedruckte hat nun eine eigene Zeile über beide Spalten (`grid-template-areas`, `.preis{display:contents}`).
- **Messung am gedrehten Banner.** Einmal kam bei 390 px für "Mehr Salat." 1,02:1 heraus (vermutlich liegt das Messrechteck des gedrehten Textes teils auf Papier). Drei Wiederholungen ergaben 4,97:1 und besser, Weiß auf Blau rechnet 6,7:1 und sieht auf dem Bild stimmig aus.
- **Beim Handy-Hero entscheidet jede Zeile.** Erst mit H1 in `12,2vw` (zwei Zeilen statt drei), Sterne und Text in einer Zeile und dem Kleingedruckten unter dem Knopf liegt der Kaufknopf im ersten Bildschirm.

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Die Demo wurde zuerst lauffähig gebaut und geprüft, dann folgten drei Durchgänge in dieser Reihenfolge. Nach jedem lief das Prüfskript, die Bildschirmfotos wurden angesehen. Von impeccable ist nur die `SKILL.md` lesbar, das Startskript (`impeccable context`) und die Dateien unter `reference/` fehlen. Darum wurde dort mit der `SKILL.md` und den Kurzregeln des Auftrags gearbeitet.
| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Freie Abstände im Stylesheet: 6, 10, 12, 14, 18, 20, 22, 26, 28 px (Erzählkasten `16px 20px`, Kaufhof `28px 16px`, Titelabstand 6 px, Sprecher-Abstand 12 px) | Alle Abstände aus den Stufen 8, 16, 24, 40, 64, 96 (Erzählkasten `16px 24px`, Kaufhof `24px 16px`, Titelabstand 8 px, Handy-Rinne 24 px statt 26 px) | Gleichmäßige Abstandsstufen, großzügige und regelmäßige Kapitel |
| gpt-taste | Collage mit festem Seitenverhältnis 14/15 (576 mal 617 px bei 1280 px) endete etwa 70 px über der linken Spalte, darunter Leerfläche | Ab 960 px `align-self:stretch` mit Mindesthöhe 560 px, das Bild füllt die Spalte | Lückenloses Raster ohne tote Fläche, ruhiger Hero |
| gpt-taste | Preis-Tag brach nach dem Aufpolstern in drei Zeilen mit einem einsamen "€" | `text-wrap:balance` und `max-width:26ch`, zwei ausgewogene Zeilen | Keine verwaisten Wörter im Hero |
| impeccable | Kaufblock: Kleingedrucktes in der Preisspalte, Knopf 204 mal 93 px, Schrift 2 rem | Kleingedrucktes als eigene Zeile, Knopf 235 mal 104 px, Schrift 2,3 rem. Handy: Reihenfolge Preis, Knopf, Kleingedrucktes, Knopf bei 709 bis 781 px statt 761 bis 832 px | Ein Blickfang pro Bildschirm: der Kaufknopf ist die größte rote Fläche und liegt im ersten Bild |
| impeccable | Kleinster Text 14 px an drei Stellen (Marke "Beispiel", Preis-Tag und Kleingedrucktes am Handy), Zahlen-Beschriftung am Handy 15 px | 15 bis 16 px | Lesbarkeit ohne Zoomen |
| impeccable | Textauswahl im Standard-Blau des Browsers, die Signalfarbe nur am Knopf | `::selection` in Rot mit Weiß (4,97:1) | Signalfarbe nur für Kaufknopf und Auswahl, jede Farbe mit Rolle |
| emil-design-eng | Warenkorb-Zähler: 90 ms hin und 90 ms zurück | 90 ms beim Hochzählen, 220 ms zurück (`.hoch` mit eigener Dauer) | Schnell, wo der Nutzer handelt, weich, wo das System antwortet |
| emil-design-eng | Burst-Pop startete bei `scale(.6)`, schwang auf 1,1, der zweite Stern kam 90 ms später | Start bei `scale(.75)`, Überschwingen 1,06, Versatz 60 ms, Dauer 260 ms | Nichts erscheint aus dem Nichts, Staffel 30 bis 80 ms |
| emil-design-eng | Einblenden mit `translateY(12px)`, Antippen ohne `touch-action` | `translateY(8px)`, dazu `touch-action:manipulation` und `-webkit-tap-highlight-color:transparent` an Logo, Navigation, Warenkorb, Kaufknopf und Fußzeilen-Links | Kleinere Wege wirken schneller, Tippen ohne Verzögerung und ohne graues Aufblitzen |
Geprüft und ohne Änderung: Kein `transition: all`, kein `ease-in`, nichts startet bei `scale(0)`, alle Hover-Effekte stehen unter `@media (hover:hover) and (pointer:fine)`, die längste UI-Dauer ist 280 ms, animiert werden nur `transform` und `opacity`, `:active { transform: scale(.97) }` liegt an Logo, Navigation, Warenkorb, Fußzeilen-Links und Kaufknopf, der Kaufknopf drückt in 90 ms und federt in 160 ms zurück. Der Fokus wurde per Tab an Navigation, Warenkorb, Logo, Kaufknopf (auf Gelb und Papier) und Fußzeile (auf Tinte) angesehen und ist überall sichtbar. Die H1 hat von 360 bis 1920 px zwei Zeilen, nach dem Fund bei 1440 px aus der ersten Testrunde.
Konflikte: Die Regeln des Auftrags (genau ein Kaufknopf, Eyebrow, Preis und Zahlen im Hero, Verbotsliste, Barrierefreiheit) gehen vor. gpt-taste verbietet Stempel, Pill-Tags und Kennzahlen im Hero und verlangt einen großen Kaufknopf in der Fußzeile, außerdem GSAP, Fotos von picsum und Schriften wie Satoshi: Das widerspricht den Pflichtangaben, der Ein-Knopf-Regel und der Vorgabe "nur lokale Schriften, keine Bibliotheken". Darum bleiben Eyebrow und Preis-Tag, die Burst-Sterne gelten als Teil der Zeichnung im Bildkasten, und die Fußzeile hat keinen zweiten Knopf. emil-design-eng würde bei reduzierter Bewegung die Deckkraft behalten, der Auftrag will ein ruhiges, vollständiges Standbild: Darum blendet hier nichts mehr ein, und die Bursts stehen sofort da. Der Pop überschwingt leicht (1,06), das ist ein bewusster Comic-Zug und liegt unter 300 ms.

## Anwenden
1. Neuer Shop: `ein-produkt-shop` bis zur Gestaltungsphase, dann `vorlage/style.css` nach `assets/style.css` kopieren und `vorlage/script.js` dazulegen.
2. Schriften: `Bangers-400.woff2`, `ComicNeue-400.woff2`, `ComicNeue-700.woff2` aus `../design-vorlagen/fonts/` nach `assets/fonts/` kopieren, die Lizenzdateien (`Bangers-LICENSE.txt`, `ComicNeue-LICENSE.txt`) daneben legen und die drei `@font-face`-Zeilen am Dateianfang auf den neuen Pfad ändern.
3. Farben in `:root` anpassen. Rollen beibehalten: `--rot` nur für den Kaufknopf und die Textauswahl, Text immer in Tinte, auf Gelb und Hellblau nie Weiß. Soll das Blau oder Gelb wechseln, danach Kontrast messen (Tinte auf Gelb mindestens 4,5:1, Weiß auf Blau und Rot ebenso).
4. Hero umbauen: Die drei Bilder in `.collage` neu zeichnen (SVG mit `class="art"` und den Füllklassen `f-gelb`, `f-blau` und so weiter, Konturen über `.k`). Die Polygone `--form` in Prozent der Collage setzen und die Kanten parallel halten. Blasen mit `.blase--leicht` und `.blase--fertig` positionieren, Schwanz nach links mit `.blase--links`. Bei einem anderen Produkt die Geschichte ändern (Gerät, Zutat im Flug, Ergebnis).
5. Klassen der Vorlage: `.huelle`, `.kopf`, `.logo`, `.nav`, `.warenkorb`, `.zaehler`, `.hero__raster` (`.hero__kopf`, `.hero__text`), `.eyebrow`, `.zeile`, `.zeile--blau`, `.erzaehler`, `.bewertung`, `.sterne`, `.kauf` (`.preis__betrag`, `.preis__aktion`, `.preis__fein`), `.cta`, `.cta-huelle`, `.cta-halo`, `.collage`, `.panel`, `.panel__rahmen`, `.panel__bild`, `.art`, `.halbton` (`--lo`, `--ro`, `--lu`, `--ru`, `--klein`), `.blase`, `.burst`, `.kachel`, `.zahl`, `.kapitel`, `.funktionen`, `.karte` (`--hell`, `--blau`), `.ablauf`, `.schritt`, `.ziffer`, `.laut`, `.stimme`, `.marke`, `.sprecher`, `.gesicht`, `.hinweis__block`, `.fuss`, `.zeig` (Einblenden). Für den Kaufknopf des echten Shops den Hof-Burst beibehalten, aber nie einen zweiten roten Knopf anlegen.
6. Zu den Haken des Skills `ein-produkt-shop`: Die Klassennamen in HORTA (`.glas`, `.knopf`, `.leise-knopf`, `.kachel`, `.schritt`, `.option`, `.frage`, `.korb`, `.kasse`) heißen hier anders. Beim Umstellen `.glas` auf `.karte` oder `.kachel`, `.knopf` auf `.cta` und `.schritt` auf `.schritt` abbilden. Reihenfolge, Generator-Änderungen (Logo, Welt, `theme-color` auf `#fffdf2`) und was nie vom Look abhängt: `../design-vorlagen/references/umstellen.md`.
7. Prüfen: Bildschirmfotos PC, Tablet und Handy, Überlauf bei 390, 820 und 1280 px, Kopfzeile zwischen 720 und 900 px, H1 bei 1440 px (höchstens zwei Zeilen), Kaufknopf im ersten Handy-Bild, Fokus mit Tab, reduzierte Bewegung, Halbton nicht unter Text, Safari und Firefox (Filter, Masken, `cqw`).

## Dateien
- `vorlage/demo.html`: HORTA-Startseite im Look (alle Texte laut Vorgabe, Zeichnungen inline).
- `vorlage/style.css`: komplettes Stylesheet mit `@font-face`, Farben als `:root`-Werte, Bildkästen, Blasen, Halbton, Bursts, Kaufknopf, Raster, Handy-Entwurf und reduzierter Bewegung.
- `vorlage/script.js`: Einblenden und Aufpoppen beim Sichtbarwerden, Warenkorb-Zähler im Beispiel.
- `../design-vorlagen/fonts/`: Bangers und Comic Neue (nur lesen, nicht verändern).
- `../design-vorlagen/references/umstellen.md`: Ablauf zum Umstellen eines bestehenden Shops.
