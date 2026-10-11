<!-- Kopie aus look-clay-3d/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Clay 3D

Gebaut und getestet als Startseite des HORTA-Shops (elektrischer Gemüseschneider). Lauffähige Demo: `vorlage/demo.html` mit `vorlage/style.css` und `vorlage/script.js`. Ansehen: im Ordner `.claude/skills` einen Server starten (`python3 -m http.server 8101`) und `http://localhost:8101/look-clay-3d/vorlage/demo.html` öffnen.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt greifbar, freundlich und alltäglich ist und die Seite zum Anfassen einladen soll: Küchengeräte, Essen und Trinken, Haushalt, Kinder, Pflege, Spielzeug. Er trägt auch Produkte, die als einfache Form gezeichnet werden können, weil das Hero-Bild nur aus runden Teilen besteht.
Passt nicht, wenn Präzision, Ernst oder Luxus verkauft werden soll (Werkzeug, Technik, Uhren, Finanzen), und nicht, wenn ein echtes Produktfoto im Mittelpunkt steht. Ein Foto wirkt zwischen den Knetflächen wie aufgeklebt.

## Merkmale
- Warmer Grund (`#fff5ee`), alle Flächen in vier Pastelltönen (Pfirsich, Mint, Lila, Butter) oder Cremeweiß, Text in dunklem Braunviolett.
- Jede Fläche trägt drei Schatten: weicher Wurf außen, heller Glanz oben links (innen), dunklerer Innenschatten unten rechts (innen). Daraus entsteht die aufgeblasene Knetform.
- Sehr große Radien: 32 bis 48 px bei Karten, Pillen bei Knöpfen und Chips, Kreise bei Kugeln und Ziffern.
- Hero-Gerät als Knetfigur aus 20 leeren Elementen (Sockel, Gehäuse mit Knopf, Schacht mit Stopfer, Kegel aus drei Ringen, Schüssel mit fünf Gemüsekugeln), dazu vier Deko-Kugeln. Sie schwebt 6 px auf und ab, langsam, nur mit `transform`.
- Der Kaufknopf ist ein dickes Kissen in Tomatenrosa, der einzigen gesättigten Farbe der Seite. Beim Drücken tauscht der Schatten (Kissen wird zur Delle) und der Knopf schrumpft auf 97 %.
- Zahlen sitzen in farbigen Pillen auf cremefarbenen Kacheln, Funktions-Symbole liegen in einer Delle (Schatten umgekehrt), die drei Schritte hängen als Kugeln an einem Knetstrang.
- Überschriften in rundem, fettem Fredoka mit einer hellen Prägung (`text-shadow` 0 .035em weiß), Text in Nunito.
- Abstände nur in Stufen 8, 16, 24, 40, 64, 96 px, Raster 7/5 und 5/7 in zwölf Spalten ohne Lücken.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #fff5ee | Seitengrund (Tinte darauf 12,5:1) |
| `--karte` | #fffaf6 | Kopfzeile, Kaufkarte, Kacheln, Schritt-Karten (Tinte 13,0:1) |
| `--tinte` | #3a2748 | aller Text, Fokusring, Zähler, Marke "Beispiel" |
| `--tinte-weich` | #5a4668 | nur Kleingedrucktes auf Creme (7,8:1), nie auf Pastell |
| `--pfirsich` | #ffc7a8 | erste Fläche jeder Reihe, Gehäuse der Figur (Tinte 8,9:1) |
| `--mint` | #b8ecd0 | zweite Fläche jeder Reihe, Logo, Sockel (Tinte 10,2:1) |
| `--lila` | #d3c4ff | dritte Fläche, Warenkorb-Pille, Ablauf-Band, Fußzeile (Tinte 8,4:1) |
| `--butter` | #ffe9a0 | vierte Fläche, Eyebrow, Einführungspreis, Hover-Füllung der Pillen (Tinte 11,1:1) |
| `--signal` | #ff6f61 | NUR der Kaufknopf, Text darauf Tinte (4,9:1, Weiß fällt mit 2,7:1 durch) |
| `--signal-tief` | #d9534a | NUR Innenschatten und Wurf des Kaufknopfs |
Reihenfolge der Pastellfarben ist überall gleich: Pfirsich, Mint, Lila, Butter. Zusätzlich gibt es zwei Zeichnungstöne ohne Textrolle: `fl-gruen` (#8fdcb0, Gemüsekugeln, Gurke) und `fl-lilahell` (#e9e0ff, Schüsselrand). Jeder Pastellton hat einen Schattenton `--t` für den Innenschatten (zum Beispiel Lila `rgba(110,80,210,.42)`).

## Schriften
Dateien aus `../design-vorlagen/fonts/`, vier Stück, zwei Familien, 64 KB zusammen:
| Familie | Gewicht | Datei | Wofür |
| --- | --- | --- | --- |
| Fredoka | 700 | `Fredoka-700.woff2` | H1, H2, Preis, Zahlen, Kaufknopf, Logo |
| Fredoka | 500 | `Fredoka-500.woff2` | Zwischentitel (H3), große Bewertung |
| Nunito | 600 | `Nunito-600.woff2` | Fließtext |
| Nunito | 800 | `Nunito-800.woff2` | fetter Text, Navigation, Etiketten, kleine Zitate |
Fredoka 700 ist breit und rund: "Weniger schnippeln." braucht bei 70 px etwa 630 px, die Spalte hat 676 px. Darum ist die H1 auf `clamp(2.4rem, 4.9vw, 4.4rem)` begrenzt.

## So ist er gebaut
**1. Die Knete-Grundform mit drei Schatten.** Eine Klasse für alles, Größe und Farbe kommen über Variablen. `--o` skaliert die Innenschatten mit der Fläche (Chip 3 px, Karte 8 px, Band 12 px), `--f` ist die Füllung, `--t` der Schattenton.
```css
.fl-lila{--f:#d3c4ff;--t:rgba(110,80,210,.42)}
.knete{
  --o:6px;--h:18px;--w:28px;
  background:var(--f);
  border-radius:var(--r,32px);
  box-shadow:
    0 var(--h) var(--w) calc(var(--h) * -.55) var(--wurf),
    inset calc(var(--o) * 1.1) calc(var(--o) * 1.3) calc(var(--o) * 2) var(--licht),
    inset calc(var(--o) * -1.3) calc(var(--o) * -1.6) calc(var(--o) * 2.4) var(--t);
}
```
```html
<article class="karte knete fl-lila">...</article>
```

**2. Knetfigur aus leeren Elementen, in `em`, skaliert mit der Spaltenbreite.** Die Figur ist 100 em breit und 92 em hoch, `1cqw` (ein Hundertstel der Breite des Containers) macht daraus jede Größe. Reihenfolge im HTML bestimmt, was vorn liegt (Ringe vor dem Gehäuse, Gemüse vor der Schüssel, Rand zuletzt).
```css
.szene{container-type:inline-size}
.figur{position:relative;width:100%;aspect-ratio:100/92;font-size:5px}
@supports (font-size:1cqw){.figur{font-size:1cqw}}
.figur i{position:absolute;display:block}
.figur .knete{--o:.8em;--h:1.6em;--w:2.4em}
.gehaeuse{left:52em;top:28em;width:36em;height:46em;--r:12em}
.ring--1{left:41em;top:31em;width:18em;height:30em;--r:9em}
.ring--2{left:31em;top:35em;width:15em;height:22em;--r:7.5em}
.ring--3{left:23em;top:39em;width:12em;height:14em;--r:6em}   /* Kegel: drei Ringe, nach links kleiner */
```
```html
<div class="figur" role="img" aria-label="Knetfigur des Geräts: ...">
  <i class="boden"></i>
  <div class="figur__innen"><i class="ring ring--1 knete fl-mint glanz"></i> ... <i class="rand knete fl-lilahell"></i></div>
</div>
```

**3. Kaufknopf als Kissen mit Delle beim Drücken.** Der Knopf selbst hat keinen Hintergrund. Drei Geschwister: Wurf, Körper, Text. Die Delle ist eine Schicht auf dem Körper, die nur ihre `opacity` ändert (keine Schatten-Animation). Drücken ist schnell (100 ms), Loslassen federt mit einer Kurve, die leicht überschwingt.
```css
.cta{position:relative;border:0;border-radius:999px;background:none;transition:transform 220ms var(--pop)}
.cta__schatten{position:absolute;inset:10px 12px 0;border-radius:999px;box-shadow:0 22px 28px -10px rgba(217,83,74,.70);transition:opacity 120ms var(--ease)}
.cta__koerper{position:absolute;inset:0;border-radius:999px;background:var(--signal);
  box-shadow:inset 9px 11px 14px rgba(255,255,255,.55),inset -10px -14px 18px var(--signal-tief)}
.cta__koerper::after{content:"";position:absolute;inset:0;border-radius:inherit;background:var(--signal);
  box-shadow:inset 8px 10px 18px var(--signal-tief),inset -3px -4px 8px rgba(255,255,255,.40);opacity:0;transition:opacity 100ms var(--ease)}
.cta:active{transform:scale(.97);transition-duration:100ms;transition-timing-function:var(--ease)}
.cta:active .cta__koerper::after{opacity:1}
.cta:active .cta__schatten{opacity:.35}
```
```html
<button class="cta" type="button"><span class="cta__schatten" aria-hidden="true"></span><span class="cta__koerper" aria-hidden="true"></span><span class="cta__text">In den Warenkorb</span></button>
```

**4. Schweben, das ruht, wenn niemand hinsieht.** Nur `transform`, nur bei erlaubter Bewegung. Das Skript pausiert die Animation, wenn die Szene außerhalb des Bildes liegt oder der Tab verdeckt ist. Kein `requestAnimationFrame`.
```css
@media (prefers-reduced-motion:no-preference){
  @keyframes schweben{from{transform:translateY(0)}to{transform:translateY(-6px)}}
  .figur__innen{animation:schweben 6s cubic-bezier(.37,0,.63,1) infinite alternate}
  .szene.ruht *,.versteckt .szene *{animation-play-state:paused}
}
```
```js
new IntersectionObserver(function (e) { e.forEach(function (x) { x.target.classList.toggle('ruht', !x.isIntersecting); }); }, { rootMargin: '80px' }).observe(szene);
document.addEventListener('visibilitychange', function () { document.documentElement.classList.toggle('versteckt', document.hidden); });
```

**5. Kopfzeile in drei Stufen, damit zwischen 720 und 900 px nichts überläuft.** Einzeilig braucht sie etwa 800 px. Darum ab 960 px abwärts zwei Zeilen (Logo und Warenkorb oben, Navigation darunter, umbrechend), ab 600 px abwärts ein Raster mit 3 plus 2 Pillen.
```css
@media (max-width:960px){
  .kopf{position:static}
  .kopf__bar{grid-template-columns:1fr auto;grid-template-areas:"logo korb" "nav nav"}
  .nav ul{flex-wrap:wrap;justify-content:center}
}
@media (max-width:600px){
  .nav ul{display:grid;grid-template-columns:repeat(6,1fr)}
  .nav li:nth-child(-n+3){grid-column:span 2}
  .nav li:nth-child(n+4){grid-column:span 3}
}
```

## Pro
- Der Kaufknopf ist das Einzige in Tomatenrosa auf einer Seite aus Pastell und Creme. Im Fenster 1280 mal 800 liegt er bei 674 bis 742 px, am Handy (844 px hoch) bei 766 bis 838 px, also im ersten Bildschirm.
- Lesbarkeit gemessen, nicht geschätzt: Pixelstichprobe hinter jedem Text bei 390, 820 und 1280 px. Niedrigster Wert 4,6:1 am Kaufknopf, alle anderen Texte mindestens 6,3:1.
- Leicht: 38 KB ohne Schriften (HTML 13,5, CSS 23,5, JS 1,9), Schriften 64 KB, 7 Anfragen, kein Bild, keine Bibliothek, kein `requestAnimationFrame`.
- Das Hero braucht kein Foto und keinen Download: 20 leere Elemente und CSS-Variablen ergeben die ganze Figur. Sie bleibt scharf bei jeder Größe, weil alles in `em` steht.
- Die Seite hält in 14 Breiten von 360 bis 1920 px ohne waagerechten Überlauf. Die H1 hat von 768 bis 1920 px zwei Zeilen, am Handy drei. Die Kopfzeile bricht bei 720 bis 960 px sauber in zwei Zeilen um.
- Ohne JavaScript ist alles sichtbar (18 Einblend-Elemente getestet). Mit reduzierter Bewegung stehen alle Elemente still und vollständig da.
- Drücken fühlt sich echt an: Schattenlage kippt, Knopf schrumpft auf 97 %, Loslassen federt in 220 ms zurück.

## Contra
- Viele Schatten: 78 Elemente haben drei Schatten, der weichste mit bis zu 40 px Weichzeichnung (der Ablauf-Band). Sie werden nie animiert, aber auf alten Handys ist das Scrollen ungeprüft. Im Software-Rendering des Tests lag der Median bei 16,7 ms pro Bild.
- Pastell auf Pastell trägt nur mit dunkler Schrift. Weiß auf einem der Töne ergibt 1,0 bis 1,6:1. Auch der Kaufknopf geht nur mit dunkler Schrift (4,9:1 rein, 4,6:1 mit Schatten darunter), weiße Schrift fiele mit 2,7:1 durch.
- Hoher Aufwand: Jede Farbe braucht Füllung und Schattenton, jede Flächengröße eigene Werte für `--o`, `--h`, `--w`, die 20 Figurteile sind von Hand in `em` gesetzt, die vier Symbole der Funktionskarten ebenfalls. Ein anderes Produkt heißt eine neue Figur.
- Echte Produktfotos passen nicht hinein. Ein Foto braucht entweder einen Knetrahmen oder die Seite muss mit einer gezeichneten Figur arbeiten.
- Am Handy braucht die Kopfzeile 160 px (zwei Zeilen Navigation) und ist dort nicht angeheftet. Die Figur ist neben der H1 nur etwa 150 px breit, damit der Kaufknopf im ersten Bildschirm bleibt.
- Kein dunkler Modus (`color-scheme: light`). Der Einführungspreis-Chip bricht am Handy in zwei Zeilen und musste deshalb Radius 22 px statt Pille bekommen.
- Nur in Chromium getestet. `cqw`-Einheiten und viele Schatten sind in Safari und Firefox offen. Ohne `cqw`-Unterstützung fällt die Figur auf feste 5 px pro Einheit zurück und ist klein.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Tomatenrosa ist die einzige gesättigte Fläche und der Knopf drückt sich sichtbar ein, aber der verspielte Ton schadet bei ernsten Produkten. |
| Lesbarkeit | 4 | Aller Text steht auf Creme oder Pastell mit mindestens 6,3:1, nur der Kaufknopf liegt bei 4,6:1. |
| Handy | 4 | Eigener Entwurf mit Kaufknopf im ersten Bildschirm, aber 160 px hohe Kopfzeile und nur 150 px breite Figur. |
| Tempo | 4 | 38 KB, keine Bilder, kein rAF, fünf Transform-Animationen die außerhalb des Bildes pausieren, 78 Schattenflächen auf schwachen Handys ungeprüft. |
| Barrierefreiheit | 4 | Fokusring 4 px, Ziele mindestens 44 px, reduzierte Bewegung ohne Endlosanimation, aber kein Dunkelmodus und knapper Kontrast am Knopf. |
| Aufwand | 3 | Figur, Symbole und Schattenwerte sind Handarbeit, die Vorlage macht den nächsten Shop deutlich schneller. |
| Risiko | 3 | Nur Chromium getestet, `cqw` und die vielen Schatten in Safari und Firefox offen, Fotos passen nicht. |

## Passt besonders zu
Küchengeräte und Essen (wie HORTA), Haushalt, Kinder und Spielzeug, Pflege und Babyartikel, alles was rund, weich und anfassbar ist.

## Passt nicht zu
Technik, Werkzeug und Luxus, bei denen Präzision verkauft. Produkte, die nur mit einem echten Foto überzeugen.

## Stolperfallen
- **Schatten hinter dem Kaufknopf als `::before` mit `z-index:-1` geht nicht.** Sobald der Knopf `transform` bekommt (Hover, Drücken), bildet er einen eigenen Stapelkontext und das Pseudo-Element malt über seinen Grund. Lösung: Wurf, Körper und Text als drei Geschwister.
- **Heller Streifen unter dem Kaufknopf.** Das Wurf-Element ragte 4 px unter den Körper, und ein äußerer Schatten malt nie innerhalb seiner eigenen Box. Dort schien die Karte durch. Jetzt endet das Wurf-Element bündig.
- **Fokusring war rechteckig.** Das Kissen besteht aus Kindelementen, der Button selbst hatte Radius 0. `border-radius:999px` am Button genügt.
- **Handy-Hero schob den Kaufknopf unter den ersten Bildschirm.** Ein Bild über dem Text ist zu hoch. Lösung: Bild neben der H1 (42 % Breite), dafür `display:contents` am Kopf-Block, damit Eyebrow, H1 und Bild in ein Raster passen.
- **Der Kegel verschwand.** Die Ringe lagen hinter dem Gehäuse und den Gemüsekugeln, der dritte Ring in Pfirsich verschmolz mit Gehäuse und Kugel. Reihenfolge im HTML ändern, Ring 3 in Lila, Kugeln tiefer setzen.
- **Zahl-Pillen.** `justify-content:center` auf einer Zeilen-Kachel verschob die Pillen je nach Textbreite. Auf `flex-start` stellen. Vier Spalten quetschten "8 bis 15" unter 1100 px, deshalb dort zwei Spalten.
- **Doppelte Abschnittsabstände.** Oben und unten je 64 px ergaben 128 px, mit Band 192 px. Besser nur Oberpolster pro Abschnitt.
- **Weiße Prägung der Überschrift** wirkte auf dem lila Band wie eine Kontur. Dort auf 45 % Deckkraft gesenkt.
- **Weiches Scrollen** (`scroll-behavior:smooth`) animiert Tastatursprünge über die Navigation. Entfernt.
- **Schritt-Strang am Handy** ragte über die erste Kugel hinaus. Jetzt hat jeder Schritt sein eigenes Stück, das beim nächsten Ziffern-Kreis endet.

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Die Demo wurde zuerst lauffähig gebaut und geprüft, dann folgten drei Durchgänge, nach jedem lief das Prüfskript und die Bildschirmfotos wurden angesehen. Von impeccable ist nur die `SKILL.md` lesbar, das Startskript und die Dateien unter `reference/` fehlen. Darum wurde dort mit der `SKILL.md` und den Kurzregeln gearbeitet.
| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Jeder Abschnitt hatte oben und unten 64 px Polster (128 px Abstand, mit Band 192 px) und freie Werte wie 12, 28, 32, 36, 52 px | Nur Oberpolster aus einer Variablen `--abschnitt` (96 px PC, 64 px Tablet, 40 px Handy), alle Polster und Lücken aus den Stufen 8, 16, 24, 40, 64 | Gleichmäßige Abstandsstufen, jeder Abschnitt ein eigenes Kapitel mit gleichem Abstand davor |
| gpt-taste | Große Bewertungskarte hatte einen leeren Block in der Mitte (zwei Zeilen Zitat in einer 330 px hohen Karte) | Marke und Anführungszeichen-Kugel oben, Zitat in `clamp(1.75rem,3vw,2.5rem)` vertikal zentriert, Name unten | Lückenloses Raster ohne tote Fläche |
| gpt-taste | Kaufkarte im Hero mit ungleichen Polstern (24, 28, 28 px), H1 nur bei 1280 px angesehen | Kaufkarte mit 40 px rundum, H1 in 14 Breiten gemessen: zwei Zeilen von 768 bis 1920 px | Überschrift breit und höchstens zwei Zeilen auf dem PC, ruhiger Hero |
| impeccable | Zahlenleiste: vier Vollflächen-Kacheln in Pfirsich, Mint, Lila, Butter direkt über vier bunten Funktionskarten | Kacheln in Cremeweiß, Farbe nur in der Zahl-Pille | Ein Blickfang pro Bildschirm, bunte Blöcke nicht doppelt hintereinander |
| impeccable | Funktionskarten in der Folge Mint, Butter, Lila, Pfirsich, Zahlen in Pfirsich, Mint, Lila, Butter | Überall Pfirsich, Mint, Lila, Butter, Symbolfarben angepasst (Scheiben jetzt grün auf Pfirsich) | Jede Farbe hat eine feste Rolle in einer festen Reihenfolge |
| impeccable | Fokusring am Kaufknopf rechteckig, Kontrast nur aus Reinfarben gerechnet | Ring folgt der Pille (`border-radius` am Button), Kontrast per Pixelstichprobe hinter jedem Text bei drei Breiten: Minimum 4,6:1 | Sichtbarer Fokus, gemessener Kontrast |
| impeccable | Mint-Kugel im Hero 34 % der Szenenbreite, hell und groß neben der Figur | 27 %, Lila-Kugel 16 % (vorher 19 %), Pfirsich-Kugel kleiner und weiter nach rechts | Die Figur bleibt der Blickfang des Hero, der Kaufknopf die einzige gesättigte Fläche |
| emil-design-eng | Kaufknopf: Drücken und Loslassen mit gleicher Kurve und 120 ms | Drücken 100 ms mit starkem Ease-out, Loslassen 220 ms mit leichtem Überschwingen (`cubic-bezier(.34,1.56,.64,1)`) | Schnell, wo der Nutzer entscheidet, weich beim Zurückfedern; passt zur Knete |
| emil-design-eng | `scroll-behavior:smooth` animierte Tastatursprünge, Zähler-Effekt mit `@keyframes` (startet bei jedem Klick neu) | Weiches Scrollen entfernt, Zähler mit Transition und Klasse `.hoch` (90 ms hoch, 220 ms zurück), unterbrechbar | Tastatur-Aktionen nie animieren, Transitions statt Keyframes bei schnell wiederholten Klicks |
| emil-design-eng | Alle Karten, Kacheln und Schritte blendeten gleichzeitig ein, Logo ohne Druckzustand | Staffelung 60 ms je Geschwister (bis 180 ms), `:active { transform: scale(.97) }` auch am Logo | Gestaffeltes Einblenden wirkt natürlicher, jedes drückbare Element reagiert |
Geprüft und ohne Änderung: kein `transition: all`, nichts startet bei `scale(0)` (Einblenden beginnt bei 97 % mit Deckkraft 0), alle Hover-Effekte stehen unter `@media (hover:hover) and (pointer:fine)`, alle UI-Animationen dauern höchstens 280 ms, animiert werden nur `transform` und `opacity`.
Konflikte: Die Regeln des Auftrags (genau ein Kaufknopf, Eyebrow, Preis-Chip und Zahlen im Hero, Barrierefreiheit) gehen vor. gpt-taste verbietet Pill-Tags und Kennzahlen im Hero und verlangt einen großen Kaufknopf in der Fußzeile, das steht im Widerspruch zu den Pflichtangaben, darum bleiben Eyebrow und Preis-Chip und die Fußzeile ohne zweiten Knopf. emil-design-eng warnt vor Weichzeichnung über 20 px: Es gibt keinen `filter: blur`, aber die Schatten der Knete gehen bis 40 px und bleiben, weil sie das Wesen des Looks sind (sie werden nie animiert). Bei reduzierter Bewegung blendet nichts mehr ein (der Auftrag will ein ruhiges, vollständiges Standbild), emil würde nur die Bewegung weglassen und die Deckkraft behalten.

## Anwenden
1. Neuer Shop: `ein-produkt-shop` bis zur Gestaltungsphase, dann `vorlage/style.css` nach `assets/style.css` kopieren und `vorlage/script.js` dazulegen.
2. Schriften: `Fredoka-700.woff2`, `Fredoka-500.woff2`, `Nunito-600.woff2`, `Nunito-800.woff2` aus `../design-vorlagen/fonts/` nach `assets/fonts/` kopieren, die Lizenzdateien daneben, und die vier `@font-face`-Zeilen am Dateianfang auf den neuen Pfad ändern.
3. Farben in `:root` und in den `.fl-*`-Klassen anpassen. Rollen beibehalten: `--signal` nur für den Kaufknopf, Tinte immer dunkel, Pastell nie mit weißer Schrift. Nach jeder Farbänderung Kontrast messen (Tinte auf jedem Pastell mindestens 4,5:1).
4. Hero umbauen: die Figur in `.figur` als leere `<i>`-Elemente neu setzen (alle Maße in `em`, Rahmen 100 mal 92). Für ein anderes Produkt Teile und Positionen tauschen, Pastellfarben so verteilen, dass keine zwei Nachbarn denselben Ton haben.
5. Klassen der Vorlage: `.knete` mit `.fl-pfirsich`, `.fl-mint`, `.fl-lila`, `.fl-butter`, `.fl-karte`, `.fl-gruen`, `.fl-lilahell`; Variablen `--r` (Radius), `--o`, `--h`, `--w` (Größe der Schatten); `.glanz`; `.huelle`, `.kopf`, `.kopf__bar`, `.logo`, `.nav`, `.pille`, `.warenkorb`, `.zaehler`, `.hero__raster` (`.hero__kopf`, `.hero__text`), `.eyebrow`, `.zeile`, `.sterne`, `.kauf`, `.preis`, `.cta` (`.cta__schatten`, `.cta__koerper`, `.cta__text`), `.szene`, `.kugel`, `.figur` mit Teilen, `.zahlen__liste`, `.kachel`, `.zahl`, `.funktionen`, `.karte`, `.sym`, `.ablauf__band`, `.schritte`, `.schritt`, `.ziffer`, `.stimmen`, `.stimme`, `.marke`, `.hinweis__block`, `.paket`, `.fuss`, `.zeig` (Einblenden).
6. Zu den Haken des Skills `ein-produkt-shop`: Die Klassennamen in HORTA (`.glas`, `.knopf`, `.leise-knopf`, `.kachel`, `.schritt`, `.option`, `.frage`, `.korb`, `.kasse`) heißen hier anders. Beim Umstellen `.glas` auf `.knete` mit einer `fl-`Klasse, `.knopf` auf `.cta` und `.kachel` auf `.kachel` oder `.karte` abbilden. Reihenfolge, Generator-Änderungen (Logo, Welt, `theme-color` auf `#fff5ee`, Hintergründe der Schritte) und was nie vom Look abhängt: `../design-vorlagen/references/umstellen.md`.
7. Prüfen: Bildschirmfotos PC, Tablet und Handy, Überlauf bei 390, 820 und 1280 px, Kopfzeile zwischen 720 und 900 px, H1 bei 1440 px, Fokus mit Tab, reduzierte Bewegung, Safari und Firefox (`cqw`, Schatten), ein echtes mittleres Handy.

## Dateien
- `vorlage/demo.html`: HORTA-Startseite im Look (alle Texte laut Vorgabe).
- `vorlage/style.css`: komplettes Stylesheet mit `@font-face`, Farben als `:root`-Werte, Knete-Grundform, Knetfigur, Kaufknopf, Raster, Handy-Entwurf und reduzierter Bewegung.
- `vorlage/script.js`: Einblenden, Pausieren der Figur, Warenkorb-Zähler im Beispiel.
- `../design-vorlagen/fonts/`: Fredoka und Nunito (nur lesen, nicht verändern).
- `../design-vorlagen/references/umstellen.md`: Ablauf zum Umstellen eines bestehenden Shops.
