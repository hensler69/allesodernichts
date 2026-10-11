<!-- Kopie aus look-liquid-morph/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Liquid Morph

Gebaut und getestet als Startseite des HORTA-Shops (elektrischer Gemüseschneider). Lauffähige Demo: `vorlage/demo.html` mit `vorlage/style.css` und `vorlage/script.js`. Ansehen: im Ordner `.claude/skills` einen Server starten (`python3 -m http.server 8101`) und `http://localhost:8101/look-liquid-morph/vorlage/demo.html` öffnen.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt freundlich, alltäglich und ein bisschen verspielt ist und die Seite Wärme ausstrahlen soll: Küchengeräte, Essen und Trinken, Pflege, Wasser, Baby und Haushalt. Der Hero darf Zeit bekommen: eine große Bildfläche mit Bewegung trägt die erste Seite, der Text bleibt auf ruhigen, flachen Farben.
Passt nicht, wenn das Produkt Ernst, Präzision oder Luxus verkaufen soll (Werkzeug, Technik, Uhren, Finanzen) oder wenn viele Kunden alte Handys nutzen. Dann lieber einen ruhigeren Look wie Glas oder Neo-Brutalism.

## Merkmale
- Grund ist warmes Creme (`#fff6ec`), alle Flächen sind flache, weiche Farben in Pfirsich, Lavendel, Sand und Violett. Keine Verläufe, keine Schatten außer dem sanften der Kopfzeile.
- Hero: fünf Blobs (runde Flächen), deren Rand per `border-radius` mit acht Werten in 10 bis 16 Sekunden ineinander übergeht. Ein SVG-Filter ("gooey") lässt sie wie Tropfen verschmelzen.
- Das Produkt ist eine scharfe Zeichnung, die oberhalb des gefilterten Bereichs liegt. Dadurch bleibt sie klar, nur die Formen dahinter sind weich.
- Karten, Kacheln und Blöcke haben unterschiedliche, ungleichmäßige Rundungen (`border-radius` mit acht Werten). Bei Maus-Hover wechselt die Kontur in 280 ms in eine zweite Form.
- Der Kaufknopf ist ein gooey Pill: Beim Darüberfahren steigen drei Tropfen aus dem Knopf und verschmelzen mit ihm.
- Überschriften in breiter, runder Syne in Schwarzviolett, sehr groß, höchstens zwei Zeilen auf dem PC.
- Aufbau in großzügigen Stufen (8, 16, 24, 40, 64, 96 px) und Rastern ohne Lücken (7/5 und 5/7 in zwölf Spalten, eine große Bewertung neben zwei kleinen).
- Zahlen in der Zahlenleiste und die Schritt-Ziffern sitzen in kleinen Tropfenformen; eine gepunktete Welle verbindet die drei Schritte.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--creme` | #fff6ec | Seitengrund |
| `--papier` | #fffbf6 | Kopfzeile, Glas der Schüssel, Ziffern auf Violett |
| `--tinte` | #1b1330 | Text, Überschriften, Rahmen, Fußzeile, Fokusring |
| `--tinte-weich` | #4a4161 | Nebentext auf Creme (8,9:1), nie auf Violett hell |
| `--pfirsich` | #ffb48a | Blob, Karte, erste Kachel (Tinte darauf 10,3:1) |
| `--lavendel` | #dcd2ff | Blob, Ablauf-Band, Karte (Tinte darauf 12,4:1) |
| `--sand` | #ffe3c6 | ruhige Karte und Kachel (Tinte darauf 14,4:1) |
| `--violett` | #7b5cff | Blob, Sterne auf Creme, Ziffern-Tropfen; nie für kleinen Text (4,1:1) |
| `--violett-hell` | #b8a6ff | Karte, Kachel, China-Block (Tinte darauf 8,4:1) |
| `--signal` | #ff6b57 | NUR Kaufknopf und seine Tropfen, Text darauf immer Tinte (6,3:1, Weiß fällt durch mit 2,8:1) |
Gemüse in der Zeichnung (Grün, Orange, Gelb) gehört zur Illustration, nicht zur Oberfläche. Rotes Gemüse gibt es nicht, damit Korall nur den Kaufknopf bedeutet.

## Schriften
Dateien aus `../design-vorlagen/fonts/`, vier Stück, zwei Familien, 55 KB zusammen:
| Familie | Gewicht | Datei | Wofür |
| --- | --- | --- | --- |
| Syne | 800 | `Syne-800.woff2` | H1, H2, Preis, Zahlen, Kaufknopf, Logo |
| Syne | 700 | `Syne-700.woff2` | Zwischentitel (H3), Zitate |
| DM Sans | 400 | `DMSans-400.woff2` | Fließtext |
| DM Sans | 700 | `DMSans-700.woff2` | fetter Text, Navigation, Etiketten |
Syne 800 ist sehr breit: "Weniger schnippeln." braucht bei 72 px etwa 1.120 px, die Spalte hat 1.160 px. Darum ist die H1 auf 4,6rem gedeckelt. Darauf achten, wenn die Überschrift länger wird.

## So ist er gebaut
**1. Gooey Blobs mit klarem Gerät obenauf.** Der Filter macht aus weichgezeichneten Formen wieder scharfe, runde Kanten (Alpha wird verstärkt). Er sitzt nur auf dem Blob-Container, das Gerät ist ein Geschwister daneben, Text steht nie im Filter.
```html
<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute"><defs>
  <filter id="goo" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="weich"/>
    <feColorMatrix in="weich" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/>
  </filter></defs></svg>
<div class="szene" data-pause>
  <div class="szene__blobs" aria-hidden="true"><i class="blob b1"></i> ... <i class="blob b5"></i></div>
  <svg class="geraet" role="img" aria-label="Zeichnung: ...">...</svg>
</div>
```
```css
.szene{position:relative;width:100%;max-width:540px;aspect-ratio:1/1}
.szene__blobs{position:absolute;inset:0;filter:url(#goo);contain:layout paint}
```
`color-interpolation-filters="sRGB"` ist wichtig, sonst kippen die Farben. Der Container ist 540 x 540 px, am Handy höchstens 268 x 268 px mit schwächerem Filter (`stdDeviation` 9 statt 14).

**2. Konturen, die ineinander übergehen.** Pro Blob zwei getrennte Animationen: `morph-*` ändert nur `border-radius`, `drift-*` nur `transform`. Verschiedene Längen (10 bis 17 s) und negative Startzeiten verhindern, dass sich alles im Gleichtakt wiederholt.
```css
.b1{width:58%;height:56%;background:var(--violett);border-radius:58% 42% 61% 39% / 44% 58% 42% 56%;
    animation:morph-a 13s var(--ease-weich) -3s infinite alternate,drift-a 17s var(--ease-weich) -6s infinite alternate}
@keyframes morph-a{0%{border-radius:58% 42% 61% 39% / 44% 58% 42% 56%}
  33%{border-radius:41% 59% 47% 53% / 61% 39% 61% 39%} 66%{border-radius:52% 48% 36% 64% / 38% 62% 38% 62%}
  100%{border-radius:62% 38% 55% 45% / 55% 45% 60% 40%}}
@keyframes drift-a{from{transform:translate(0,0) rotate(0)}to{transform:translate(5%,-6%) rotate(24deg)}}
```

**3. Pausieren und Standbild.** Außerhalb des Bildes oder bei verdecktem Tab stehen alle Animationen. Bei `prefers-reduced-motion: reduce` laufen keine Animationen, jeder Blob behält die Form aus seiner Grundregel.
```js
var wacher = new IntersectionObserver(function (es) {
  es.forEach(function (e) { e.target.classList.toggle('ruht', !e.isIntersecting); });
}, { rootMargin: '80px' });
document.querySelectorAll('[data-pause]').forEach(function (s) { wacher.observe(s); });
document.addEventListener('visibilitychange', function () { document.documentElement.classList.toggle('versteckt', document.hidden); });
```
```css
.ruht .blob,.versteckt .blob,.ruht .geraet,.versteckt .geraet{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none !important;transition:none !important}}
```

**4. Kaufknopf mit gooey Tropfen.** Der Knopf ist transparent, die Farbfläche liegt als gefilterte Ebene dahinter (14 px größer als der Knopf, damit Tropfen Platz haben). Der Text liegt darüber und wird nie gefiltert. Tropfen bewegen sich nur bei Maus-Hover, nie bei Tastaturfokus.
```html
<button class="cta" type="button">
  <span class="cta__goo" aria-hidden="true"><i class="cta__koerper"></i><i class="cta__tropfen t1"></i><i class="cta__tropfen t2"></i><i class="cta__tropfen t3"></i></span>
  <span class="cta__text">In den Warenkorb</span>
</button>
```
```css
.cta{position:relative;isolation:isolate;border-radius:999px;transition:transform 160ms var(--ease-out)}
.cta:active{transform:scale(.97)}
.cta__goo{position:absolute;inset:-14px;z-index:-1;pointer-events:none;filter:url(#goo-k)}
@media (hover:hover) and (pointer:fine){.cta:hover .t2{transform:translate(2px,-40px) scale(1.2)}}
```

**5. Raster ohne Lücken und wandernde Konturen der Karten.** Zwölf Spalten, Karten 7/5 und 5/7, `grid-auto-flow:dense`. Jede Karte hat eine eigene Grundkontur, bei Hover wechselt sie.
```css
.bento{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-flow:dense;gap:var(--s2)}
.bento>li:nth-child(1),.bento>li:nth-child(4){grid-column:span 7}
.bento>li:nth-child(2),.bento>li:nth-child(3){grid-column:span 5}
.karte{border-radius:52px 40px 56px 36px / 40px 56px 36px 52px;transition:border-radius 280ms var(--ease-out)}
@media (hover:hover) and (pointer:fine){.karte:hover{border-radius:36px 56px 40px 52px / 56px 36px 52px 40px}}
```

## Pro
- Sehr wiedererkennbar: Violett, Pfirsich und Creme mit Tropfenformen sehen nicht nach Standardvorlage aus.
- Der Text steht nie auf bewegten Flächen, alle Karten sind flach. 63 Textstellen per Skript gemessen: alle mindestens 8,4:1, nur die drei Ziffern 1, 2, 3 auf Violett liegen bei 4,2:1 (große Schrift, Grenze 3:1).
- Der Kaufknopf ist die einzige Korall-Fläche der Seite, hat einen Tropfen-Effekt beim Darüberfahren, einen pillenförmigen Fokusring (Tinte, 3 px) und drückt sich bei `:active` ein.
- Leicht: 39 KB ohne Schriften (HTML 20 KB, CSS 19 KB, JS 1,6 KB), 55 KB Schriften, 7 Anfragen, 0 `requestAnimationFrame`-Aufrufe pro Sekunde. In einem Testbrowser ohne Grafikkarte liefen die Blobs mit 60 Bildern pro Sekunde (längstes Bild 33 ms).
- Pausiert vollständig: Wenn die Szene nicht im Bild ist, laufen 0 von 11 Endlos-Animationen. Mit reduzierter Bewegung sind es 0 und die Seite sieht vollständig aus.
- Ohne JavaScript bleibt alles lesbar (1.620 Zeichen Text, Kaufknopf sichtbar, nichts ausgeblendet).

## Contra
- Der SVG-Filter und der Wechsel der Kontur zeichnen die Fläche in jedem Bild neu (`border-radius` läuft nicht auf der Grafikkarte). Auf einem echten alten Handy ist das die teuerste Stelle der Seite. Ich konnte nur im Testbrowser messen, nicht auf echten Geräten.
- Nur in Chromium getestet. Firefox und Safari zeichnen gefilterte, bewegte Elemente manchmal anders (Flackern, Verzögerung). Vor einem Start dort prüfen.
- Die Dauerbewegung hat keinen Pause-Knopf. Streng nach WCAG 2.2.2 (Bewegtes ohne Stopp, länger als 5 Sekunden) ist das offen. Gelöst nur über die Systemeinstellung "Bewegung reduzieren" und das Pausieren außerhalb des Bildes.
- Das Gerät muss selbst gezeichnet und mit den Blobs abgestimmt werden: Helle Geräteteile verschwanden auf dem Lavendel-Blob, deshalb ist das Gehäuse dunkel. Ein anderes Produkt heißt neue Zeichnung und neue Blob-Positionen.
- Syne 800 ist sehr breit. Lange Wörter, Zahlen wie "8 bis 15" und Marken mit vielen Buchstaben brauchen eigene Schriftgrößen (Kachelzahl: `clamp(1.7rem,3.3vw,2.8rem)`), sonst laufen sie über.
- Am Handy ist die Navigation eine wischbare Chip-Zeile. "Bewertungen" und "Fragen" sind angeschnitten und könnten übersehen werden.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Korall ist die einzige warme Signalfläche und der Knopf hat eine spürbare Belohnung, aber der verspielte Ton wirkt bei ernsten Produkten weniger vertrauensvoll. |
| Lesbarkeit | 5 | Aller Text steht auf flachen Karten oder Creme, gemessen mindestens 8,4:1. |
| Handy | 4 | Eigener Entwurf mit Bild vor Preis und Kaufknopf am unteren Rand des ersten Bildschirms, nur die Navigation ist angeschnitten. |
| Tempo | 3 | 39 KB und 60 Bilder pro Sekunde im Test, aber Filter und Konturwechsel sind auf schwachen Handys ungeprüft. |
| Barrierefreiheit | 3 | Kontrast, Fokus und reduzierte Bewegung sind erledigt, ein Pause-Knopf für die Dauerbewegung fehlt. |
| Aufwand | 3 | Fünf Blobs, Filter, Gerätezeichnung und Tropfenknopf brauchten mehrere Durchgänge, die Vorlage macht neue Shops danach schneller. |
| Risiko | 3 | Nur in einem Browser getestet, Filter-Darstellung in Safari und Firefox offen. |

## Passt besonders zu
Küchengeräte und Essen (wie HORTA), Pflege und Wasser (Flaschen, Duschköpfe, Seifen), Haushalt, Baby und Spielzeug.

## Passt nicht zu
Technik, Werkzeug und Luxus, bei denen Präzision und Ruhe verkaufen. Zielgruppen mit vielen alten Handys.

## Stolperfallen
- Die H1 sprang bei 1440 px auf drei Zeilen, weil `5.2rem` für die 1.160 px breite Spalte zu groß war. Deckel bei 4,6rem, danach Zeilen bei 1020, 1100, 1280, 1366, 1440, 1536 und 1920 px gemessen (immer 2).
- `main{overflow-x:clip}` blendet echten Überlauf aus. Die Zahl "8 bis 15" lief sichtbar aus der Kachel, das Prüfskript meldete nichts. Immer das Bildschirmfoto ansehen.
- Eingangsanimation mit `animation-fill-mode: both` hält den Endzustand fest und überschreibt `:active { transform: scale(.97) }` auf dem Kaufknopf. Mit `backwards` bleibt der Druckeffekt.
- Der Kontrastmesser findet bei Ziffern in Filter-Blobs den violetten Grund nicht (meldet 1,4:1). Von Hand nachrechnen (4,2:1, große Schrift).
- Ziffern und Text nie in den gefilterten Container legen, sonst werden sie unscharf. Darum sind die Ziffern Geschwister des Filter-Elements (`position:absolute`).
- Der Filter-SVG darf nicht `display:none` haben, sondern `width="0" height="0"` mit `position:absolute`.
- Ohne `border-radius:999px` am `<button>` ist der Fokusring ein Rechteck, obwohl der Knopf rund aussieht.
- Der Kaufknopf braucht `white-space:nowrap`, sonst bricht er zwischen 960 und 1020 px in zwei Zeilen.
- Kopfzeile bei 820 px: Logo, fünf Links und Warenkorb passen nicht in eine Zeile, unter 960 px läuft sie zweizeilig.
- `rgba`-Kopfzeile ohne `backdrop-filter` lässt den Text darunter durchscheinen. Deckende Farbe nehmen.
- Das Prüfskript meldete einen 404 für `favicon.ico`. Ein eingebettetes Symbol per Daten-URI im `<head>` löst das.
- Gerätezeichnung: Die Gurke wird vor dem Kegel gezeichnet, das Schachtglas danach, sonst ragt sie vor den Kegel.

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge wie vorgegeben, nach jedem Durchgang Prüfskript und Bildschirmfotos. Gelesen wurden die drei SKILL.md. Beim Skill impeccable liegen im Ordner nur SKILL.md, keine `reference/*.md` und kein Programm `impeccable`, angewendet wurden deshalb seine Kernregeln aus der SKILL.md und dem Auftrag.

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | H1 in der linken Spalte, 3 Zeilen bei 1280 px | H1 über beiden Spalten, `.zeile{display:block}`, 2 Zeilen bei 1020 bis 1920 px (gemessen), `clamp(2.2rem,5.6vw,4.6rem)` | Eiserne 2-Zeilen-Regel, Blickführung läuft von Überschrift über Bild zu Preis und Knopf |
| gpt-taste | Funktionen in 4 gleichen Spalten mit Symbol oben | 12-Spalten-Raster 7/5 und 5/7, `grid-auto-flow:dense`, Symbol links | Lückenloses Raster mit Rhythmus statt Reihe |
| gpt-taste | Bewertungen als 3 gleiche Karten | eine große Karte über zwei Zeilen und zwei gestapelte Karten, große Zitatschrift | Raster ohne Loch und eine klare Hauptstimme |
| gpt-taste | Abstände 28, 40, 44, 80, 88, 100 px gemischt | sechs Stufen 8/16/24/40/64/96 px, Abschnitte überall 96 px (Handy 72) | Großzügige, gleichmäßige Abstandsstufen |
| gpt-taste | Eyebrow als Pillen-Tag | schlichte Zeile mit Tropfenzeichen | Pillen-Tags im Hero sind verboten |
| gpt-taste | Handy: Titel, Beschreibung, Preis, Knopf, dann erst das Bild | Titel, Bild, Sterne, Preis, Knopf, danach die Beschreibung (`order`) | Kaufknopf rückt an den Rand des ersten Bildschirms |
| impeccable | Warenkorb-Link als gefüllte Lavendel-Pille | Kontur in Tinte, 1,5 px | Kein zweites gefülltes Element neben dem Kaufknopf, eine Hauptaktion |
| impeccable | "Beispiel"-Marke als schwarze gefüllte Pille | Kontur in Tinte, Schrift 14 px statt 13 px | Die Marke zog den Blick von Zitat und Sternen weg |
| impeccable | Vierte Zahlenkachel in Tinte | Violett hell | Schwerster Block der zweiten Bildschirmseite entfernt |
| impeccable | Sterne in Karten in Violett (2,5:1 auf Pfirsich) | Tinte (10,3:1) | Kontrast gemessen, Nicht-Text mindestens 3:1 |
| impeccable | Kopfzeile zu 94 % deckend, Text schien durch | deckendes Papier | Lesbarkeit der Navigation beim Scrollen |
| impeccable | Fokusring am Kaufknopf rechteckig | `border-radius:999px`, Ring folgt der Pille | Sichtbarer, passender Fokus (Tinte 3 px, in der Fußzeile Creme) |
| emil-design-eng | Kein `:active` | `:active{transform:scale(.97)}` auf Kaufknopf, Navigation, Warenkorb, Logo, Fußzeilen-Links | Jedes drückbare Element gibt Rückmeldung |
| emil-design-eng | `ease` und `ease-in-out`, 300 bis 600 ms | `--ease-out: cubic-bezier(.23,1,.32,1)` für UI, `--ease-weich: cubic-bezier(.45,.05,.55,.95)` für die Dauerbewegung, 160 bis 280 ms | Eigene Kurven, UI unter 300 ms |
| emil-design-eng | Hover überall, Karten 500 ms | Hover nur unter `@media (hover:hover) and (pointer:fine)`, Konturwechsel 280 ms | Keine falschen Hover auf Touch |
| emil-design-eng | Einblenden 24 px und 600 ms ohne Staffel | 12 px und 280 ms, Staffel 50 ms über `--i`, Hero-Text und Bild rücken beim Laden nach | Kurz, nur `transform` und `opacity`, keine Wartezeit |
| emil-design-eng | Tropfen 400 ms in beide Richtungen | 260 ms hin, 160 ms zurück, nur Maus-Hover, nie Tastaturfokus | Antwort schnell, Tastatur ohne Animation |

Konflikte: Der Look lebt von `border-radius`-Wechseln (nicht nur `transform` und `opacity`) und von Dauerbewegung über 300 ms. Das bleibt, ist aber auf einen Container von höchstens 540 x 540 px begrenzt, pausiert außerhalb des Bildes und steht bei reduzierter Bewegung still. Der Weichzeichner-Wert 14 liegt unter der Grenze von 20. gpt-taste verlangt React, GSAP, Bilder von picsum und zwei Knöpfe im Hero, das gilt wegen der Projektregeln (ein Kaufknopf, nur selbst gezeichnete Bilder, keine Bibliotheken) nicht.

## Anwenden
1. Neuer Shop: `ein-produkt-shop` bis zur Gestaltungsphase, dann `vorlage/style.css` nach `assets/style.css` kopieren und `vorlage/script.js` dazulegen.
2. Schriften: `Syne-800.woff2`, `Syne-700.woff2`, `DMSans-400.woff2`, `DMSans-700.woff2` aus `../design-vorlagen/fonts/` nach `assets/fonts/` kopieren, die Lizenzdateien daneben, und die vier `@font-face`-Zeilen am Dateianfang auf den neuen Pfad ändern.
3. Farben in `:root` anpassen. Rollen beibehalten: `--signal` nur für den Kaufknopf, `--violett` nie für kleinen Text.
4. Hero umbauen: fünf `.blob` in `.szene__blobs`, die Gerätezeichnung als `<svg class="geraet">` daneben. Für ein anderes Produkt Zeichnung tauschen und Blob-Positionen (`left`, `top`, `width`, `height` in Prozent) so setzen, dass helle Teile nicht auf hellem Blob liegen.
5. Klassen der Vorlage: `.huelle`, `.kopf`, `.kopf__pille`, `.logo`, `.nav`, `.warenkorb`, `.zaehler`, `.hero__raster` (`.hero__kopf`, `.hero__text`), `.eyebrow`, `.zeile`, `.sterne`, `.preis`, `.cta` (`.cta__goo`, `.cta__koerper`, `.cta__tropfen`), `.szene`, `.blob`, `.geraet`, `.zahlen__liste`, `.bento`, `.karte` (`--pfirsich`, `--lavendel`, `--violett`, `--sand`), `.ablauf__band`, `.schritte`, `.ziffer`, `.stimmen`, `.stimme` (`--gross`, `--lavendel`, `--sand`), `.marke`, `.hinweis__block`, `.paket`, `.fuss`, `.zeig` (Einblenden).
6. Zu den Haken des Skills `ein-produkt-shop`: Die Klassennamen in HORTA (`.glas`, `.knopf`, `.leise-knopf`, `.kachel`, `.schritt`, `.option`, `.frage`, `.korb`, `.kasse`) heißen hier anders. Beim Umstellen `.knopf` auf `.cta`, `.kachel` auf `.karte` oder die Zahlenkachel abbilden. Reihenfolge, Generator-Änderungen (Logo, Welt, `theme-color` auf `#fff6ec`, Hintergründe der Schritte) und was nie vom Look abhängt: `../design-vorlagen/references/umstellen.md`.
7. Prüfen: Bildschirmfotos PC, Tablet und Handy, Überlauf bei 390, 820 und 1280 px, Fokus mit Tab, reduzierte Bewegung, Safari und Firefox, ein echtes mittleres Handy.

## Dateien
- `vorlage/demo.html`: HORTA-Startseite im Look (alle Texte laut Vorgabe).
- `vorlage/style.css`: komplettes Stylesheet mit `@font-face`, Farben als `:root`-Werte, Hero-Blobs, Kaufknopf, Raster, Handy-Entwurf und reduzierter Bewegung.
- `vorlage/script.js`: Pausieren der Blobs, Einblenden, Warenkorb-Zähler im Beispiel.
- `../design-vorlagen/fonts/`: Syne und DM Sans (nur lesen, nicht verändern).
- `../design-vorlagen/references/umstellen.md`: Ablauf zum Umstellen eines bestehenden Shops.
