---
name: look-glassmorphism
description: Der Look Glassmorphism (helles, buntes Milchglas) für Ein-Produkt-Shops mit farbigen weichen Kugeln in Grün, Türkis, Gelb und Violett hinter Milchglas-Karten, dem Produkt als gezeichneter Glasform und einem orangen Kaufknopf als einziger warmer Fläche. Verwenden bei "Glassmorphism", "Milchglas", "Glas-Look hell", "bunte Kugeln", "Orbs", "frosted glass", "glass design", "Design-Vorlage glassmorphism", wenn ein Shop frisch, freundlich und verspielt wirken soll oder wenn Looks verglichen werden. Nicht verwechseln mit dem dunklen Apple-Glas von HELIA (design-vorlagen/references/look-glas-apple.md).
---

# Look: Glassmorphism

Gebaut und getestet als Demo der HORTA-Startseite (Gemüseschneider HT-5). Alles liegt in `vorlage/` (demo.html, style.css, script.js). Gemessen wird immer an dieser Demo.

## Wann der Look passt / Wann nicht

Passt, wenn das Produkt hell, frisch und freundlich sein soll: Küche, Essen, Pflege, Wasser, Haushalt, Kinderzimmer, alles, was "leicht" wirken soll. Passt auch, wenn es keine guten Produktfotos gibt, weil die Glasform-Zeichnung mit den bunten Kugeln dahinter ohne Foto auskommt.

Passt nicht bei Produkten, die Ernst oder Vertrauen über Strenge verkaufen (Medizin, Finanzen, Werkzeug für Profis), und nicht, wenn die Zielgruppe überwiegend billige Telefone nutzt, weil der Weichzeichner im Glas Leistung kostet. Für dunkle, ruhige Premium-Produkte gibt es das Apple-Glas (HELIA). Wer nur einen Hauch Glas will, nimmt wenige Karten und lässt den Rest flach.

## Merkmale

- Vier farbige Kugeln (Orbs) in Grün, Türkis, Gelb, Violett treiben langsam (34 bis 48 Sekunden pro Richtung) hinter dem Inhalt. Sie bestehen aus Verläufen mit weichem Rand, nicht aus `filter: blur(60px)`.
- Milchglas-Karten: `backdrop-filter: blur(18px) saturate(1.4)`, weiß mit 20 bis 34 Prozent Deckkraft, 1 px hellerer Rand, innerer Glanz oben links, weicher Schatten. Kopfzeile 16 px, Hero-Karte 20 px, Handy 12 px.
- Vier getönte Glasarten (`.t-gruen`, `.t-tuerkis`, `.t-gelb`, `.t-violett`), die Funktionskarten nehmen jeweils eine Farbe.
- Hero-Bild: Gerät, Kegel und Schüssel als Glasformen in SVG (Verlauf von 95 auf 34 Prozent Weiß, weißer Rand, Lichtkante), Gemüsestücke fallen in die Schüssel.
- Kugeln aus Glas statt Symbole: Zahlenleiste, Überschriften, Funktions- und Schritt-Nummern sitzen auf kleinen Glaskugeln mit Glanzpunkt.
- Tannengrüner Text (#0d2b25) auf allem. Weiße Schrift gibt es nur auf dem dunklen "Beispiel"-Schild.
- Einzige Signalfarbe: orangefarbener Kaufknopf mit Glanzkante und Schein.
- Kopfzeile als schwebende Glas-Pille, bleibt beim Scrollen oben; der aktuelle Abschnitt steht weiß hinterlegt mit Punkt.

## Farben

| Token | Wert | Rolle |
| --- | --- | --- |
| `--tinte` | #0d2b25 | Haupttext, Linien, Zeichen auf Glas, Zahlen im Gerät |
| `--tinte-2` | #29463f | Zweittext (Preis-Kleingedrucktes, Fußzeile) |
| `--grund-a/b/c` | #e6fbf2, #d8f2f8, #e9f8ea | Seitengrund, Aqua-Grün-Verlauf |
| `--orb-gruen` | #7be0a3 | Kugel, Tönung, Glaskugeln, Marker unter "Mehr Salat." |
| `--orb-tuerkis` | #5fd3e8 | Kugel, Tönung, Glaskugeln |
| `--orb-gelb` | #ffe27a | Kugel, Tönung (auch Hinweisblock), Sterne |
| `--orb-violett` | #b69cff | Kugel, Tönung, Glaskugeln |
| `--orb-*-d` | #3fbf79, #2fb3cf, #f2c230, #8a6ff0 | dunklere Kanten der Glaskugeln, nie Fläche |
| `--glas-rand` | rgba(255,255,255,.72) | 1 px Rand jeder Glasfläche |
| `--signal` / `--signal-hell` | #ff7a3d / #ffa070 | nur der Kaufknopf (Schrift darauf: Tinte, nicht Weiß) |

Die vier Orb-Farben haben keine Bedeutung, sie sind frei verteilbare Dekoration. Orange kommt sonst nirgends vor, auch nicht in den Gemüsestücken der Zeichnung. Gemessener Kontrast (Text gegen die Pixel dahinter): Fließtext mindestens 8,3 zu 1, Zweittext mindestens 8,8 zu 1, Kaufknopf 5,65 zu 1 (Weiß auf diesem Orange hätte nur etwa 2,3 zu 1).

## Schriften

Eine Familie: Plus Jakarta Sans, Dateien in `../design-vorlagen/fonts/` (zusammen 35 KB).

| Gewicht | Datei | Wofür |
| --- | --- | --- |
| 800 | PlusJakartaSans-800.woff2 | H1, H2, H3, Preis, Zahlen, Kaufknopf, Logo |
| 600 | PlusJakartaSans-600.woff2 | Navigation, Eyebrow, Preisnotiz, Zitate, "Beispiel"-Schild |
| 400 | PlusJakartaSans-400.woff2 | Fließtext, Kleingedrucktes |

`font-display: swap`, die 800er und die 400er Datei werden per `preload` geladen. Die Überschrift ist 59 px groß, bei 1000 bis 1920 px Breite immer zwei Zeilen (Größe = 10 Prozent der Spaltenbreite).

## So ist er gebaut

**1. Orbs als Verlauf, nur `transform` bewegt sich**

```css
.orb {
  position: absolute;
  width: calc(var(--d) * 1.3);          /* Verlauf braucht mehr Platz als eine unscharfe Scheibe */
  aspect-ratio: 1;
  margin: calc(var(--d) * -.15) 0 0 calc(var(--d) * -.15);
  border-radius: 50%;
  background: radial-gradient(closest-side,
    rgb(var(--cr) / 1) 0%, rgb(var(--cr) / .95) 36%,
    rgb(var(--cr) / .6) 62%, rgb(var(--cr) / .2) 84%, rgb(var(--cr) / 0) 100%);
  opacity: .86;
  will-change: transform;
  animation: treibe var(--t, 36s) cubic-bezier(.37,0,.63,1) var(--v, 0s) infinite alternate;
}
.orb--gruen { --cr: 123 224 163; }
@keyframes treibe { to { transform: translate3d(var(--dx), var(--dy), 0) scale(1.07); } }
```

Der Container `.orbs` ist `position:absolute; inset:0; overflow:hidden; z-index:-1` in einer `.seite` mit `isolation:isolate`. Er klippt die Kugeln am Rand, ohne dass die Kopfzeile ihr `position:sticky` verliert (ein `overflow:hidden` an einem Elternteil der Kopfzeile würde es brechen). Acht Kugeln am PC, fünf am Handy. Ein kleines Skript pausiert Kugeln außerhalb des Bildes (IntersectionObserver) und alle bei verdecktem Tab.

**2. Die Glasfläche**

```css
.glas {
  position: relative; isolation: isolate;
  background:
    linear-gradient(135deg, rgba(255,255,255,.34), rgba(255,255,255,.20) 55%, rgba(255,255,255,.28)),
    rgb(var(--tint, 255 255 255) / var(--tint-a, 0));      /* Tönung, nur wenn eine .t-Klasse da ist */
  border: 1px solid rgba(255,255,255,.72);
  border-radius: 28px;
  box-shadow: inset 1.5px 1.5px 0 rgba(255,255,255,.9), inset -1px -1px 0 rgba(255,255,255,.35),
              0 26px 60px -22px rgba(13,43,37,.28), 0 6px 16px -8px rgba(13,43,37,.14);
  -webkit-backdrop-filter: blur(var(--blur)) saturate(1.4);
  backdrop-filter: blur(var(--blur)) saturate(1.4);
}
.glas::before {                       /* Glanz oben links, liegt hinter dem Inhalt */
  content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; pointer-events: none;
  background: radial-gradient(90% 70% at 0% 0%, rgba(255,255,255,.55), rgba(255,255,255,0) 56%);
}
```

`isolation:isolate` macht, dass der Glanz (z-index -1) über dem Glas-Hintergrund, aber unter dem Text liegt. Glas steckt nie in Glas: Elemente innerhalb einer Glasfläche (Preisplakette, Schilder, Kugeln) haben nur eine weiße Füllung ohne Weichzeichner. Insgesamt sind höchstens fünf Weichzeichner gleichzeitig im Bild: Kopfzeile plus ein bis vier Karten.

**3. Drei Rückfälle, alle getestet**

```css
@supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
  .glas, .glas--dicht { background: linear-gradient(135deg, #f7fdfa, #eaf8f4); }   /* deckend */
}
@media (prefers-reduced-transparency: reduce) {
  .glas { -webkit-backdrop-filter: none; backdrop-filter: none; background: #f6fcf9; }
  .glas::before { display: none; }
}
@media (prefers-contrast: more) {
  .orbs { display: none; }
  .glas { backdrop-filter: none; background: #fff; border: 2px solid #0d2b25; box-shadow: none; }
}
```

Die getönten Varianten (`.glas.t-gruen` und die anderen drei) müssen in jedem der drei Blöcke mit aufgeführt werden, sonst gewinnt ihre Tönung.

**4. Gerät als Glasform (SVG)**

```html
<linearGradient id="gl-tuerkis" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0"  stop-color="#fff" stop-opacity=".9"/>
  <stop offset=".55" stop-color="#5fd3e8" stop-opacity=".38"/>
  <stop offset="1"  stop-color="#fff" stop-opacity=".6"/>
</linearGradient>
<rect x="92" y="176" width="152" height="232" rx="48" fill="url(#gl-tuerkis)" stroke="#fff" stroke-opacity=".95" stroke-width="2.5"/>
<path d="M110 232c0-16 8-26 20-30" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>  <!-- Lichtkante -->
```

Durchsichtigkeit entsteht allein durch die Zeichenreihenfolge: Gurke zuerst, Schacht (Glas) darüber, Schüssel-Inhalt zuerst, Schüssel-Vorderwand darüber. Die Gemüsestücke fallen mit `linear` (konstante Bewegung); jedes Stück hat eine Ruhestellung (`--sy`, `--sr`), damit das Standbild bei reduzierter Bewegung mitten im Fall steht.

**5. Handy als eigener Entwurf**

```css
@media (max-width: 700px) {
  :root { --blur: 12px; --s3: 20px; --s4: 32px; --s5: 48px; --s6: 72px; }
  .o3, .o4, .o7 { display: none; }              /* drei von acht Kugeln weg, die übrigen kleiner */
  .hero__karte { display: flex; flex-direction: column; }
  .hero__text  { display: contents; }           /* Kinder werden Geschwister und lassen sich ordnen */
  .eyebrow{order:1} .hero h1{order:2} .hero__bild{order:3; height:196px} .untertitel{order:4} .preis{order:6}
  .karte { display: grid; grid-template-columns: 56px 1fr; }   /* Funktionen waagerecht */
}
```

Kopfzeile am Handy: Logo, Warenkorb, Menü-Knopf (ab 800 px abwärts); ohne JavaScript bleibt die Navigation als Zeile unter dem Logo sichtbar. Kaufknopf am iPhone-Format (390 mal 844) liegt vollständig im ersten Bild (y 766 bis 826).

## Pro

- Sehr gut lesbar, weil der Text dunkel auf Pastell steht: gemessen 8,3 zu 1 und besser bei Fließtext über allen vier Orb-Farben, kleinster Wert im ganzen Dokument 5,65 zu 1 (Kaufknopf). Die Kugeln dürfen wandern, ohne dass Text verschwindet.
- Der Kaufknopf ist die einzige warme Fläche auf kühlem Aqua-Grün: Orange gegen Violett und Türkis hebt ihn ab, ohne dass er größer sein muss als nötig (64 px hoch, volle Breite der Preisplakette).
- Leicht: 58 KB ohne Schriften (HTML 26 KB, CSS 28 KB, JS 5 KB), 35 KB Schriften, 6 Anfragen, kein Canvas, 0 rAF-Aufrufe im Ruhezustand, kein Bild nötig, alles gezeichnet.
- Kommt ohne Produktfoto aus: Die Glasform-Zeichnung plus Kugeln dahinter wirkt fertig. Für Dropshipping ohne Freigabe der Herstellerbilder ein Vorteil.
- Alle Sonderfälle laufen: kein Weichzeichner (`@supports not`), weniger Transparenz, mehr Kontrast und reduzierte Bewegung sind als Bildschirmfotos geprüft und lesbar.
- Am Handy ein eigener Entwurf ohne Mehraufwand im HTML: nur Reihenfolge, Raster und Abstandsstufen ändern sich, die Seite ist 3716 px hoch (PC 3036 px).

## Contra

- Der Weichzeichner im Glas ist der teure Teil. Software-Messung ohne Grafikkarte (Scrollen über 5 Sekunden, 1280 px): mit Glas im Mittel 42 bis 44 ms pro Bild, ohne `backdrop-filter` 16,7 ms (60 Bilder pro Sekunde). Allein die große Hero-Karte macht etwa 13 ms davon aus (29 statt 42 ms ohne). Auf echter Grafikkarte viel weniger, aber auf billigen Telefonen kann Scrollen ruckeln. Am Handy (390 px) blieb die Software-Messung bei 16,7 ms.
- Kugeln mit `filter: blur(60px)` waren in der gleichen Messung etwa doppelt so teuer (82 bis 90 ms statt 42 bis 44 ms) und widersprechen der Regel "Blur über 20 px meiden". Deshalb Verläufe. Der Look sieht dadurch einen Hauch weicher und blasser aus (Deckkraft von .78 auf .86 nachgezogen).
- Der Look hängt am dunklen Text. Weiße Schrift auf Glas über Pastellkugeln fällt durch, und auch der Kaufknopf braucht dunkle Schrift auf Orange (Weiß nur 2,3 zu 1).
- Pflegeaufwand: Jede neue Glasklasse oder Tönung muss in drei Rückfall-Blöcken mitgeführt werden (`@supports not`, weniger Transparenz, mehr Kontrast). Im Kontrast-Modus waren Preisplakette und Eyebrow weiß auf weiß und brauchten extra Rahmen.
- Verspielt: Bei ernsten Produkten wirkt der Look zu leicht. Und er ist gängig genug, dass ein Shop ohne eigene Zeichnung schnell nach Vorlage aussieht. Die selbst gezeichnete Glasform trägt hier viel.
- Handy-Hero ist klein: Das Gerät steht nur 196 px hoch, weil Überschrift, Bild, Text, Sterne und Preis in den ersten 844 px passen mussten.

## Eignung für Ein-Produkt-Shops

| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Frisch und freundlich, der orange Knopf ist die einzige warme Fläche, nur bei ernsten Produkten zu verspielt. |
| Lesbarkeit | 4 | Fließtext gemessen mindestens 8,3 zu 1, Knopf 5,65 zu 1, Abzug weil Text über wandernden Kugeln steht. |
| Handy | 4 | Eigene Anordnung, weniger Kugeln, Blur 12 px, Knopf im ersten Bild, aber kleines Hero-Bild. |
| Tempo | 3 | 58 KB Gewicht sind klein, doch der Weichzeichner kostet im Software-Test den Faktor 2,5 gegenüber flachen Karten. |
| Barrierefreiheit | 4 | Kontrast hoch, Fokus sichtbar, drei Sondermodi fertig, Abzug für die dauernd treibenden Kugeln. |
| Aufwand (5 = wenig Aufwand) | 3 | Glasklasse ist schnell kopiert, aber Hero-Zeichnung, drei Rückfall-Blöcke und Handy-Entwurf brauchen Zeit. |
| Risiko (5 = geringes Risiko) | 3 | Safari braucht das Präfix, schwache Geräte können ruckeln, der Look kann nach Standardvorlage wirken. |

## Passt besonders zu

Küchen- und Haushaltsgeräten, Pflege und Wasserprodukten, Alltagsprodukten für junge, helle Zielgruppen (Trinkflasche, Mixer, Aufbewahrung), allem, wo das Produkt gezeichnet statt fotografiert werden soll.

## Passt nicht zu

Medizin, Finanzen, Profi-Werkzeug und allem, was dunkel und hochwertig wirken soll (dort Apple-Glas). Auch nicht zu Shops, die vor allem über sehr alte Telefone besucht werden.

## Stolperfallen

- **Glas in Glas:** Ein Kind mit eigenem `backdrop-filter` innerhalb eines Elternteils mit `backdrop-filter` sieht die Seite dahinter nicht. Das Handy-Menü sitzt deshalb deckend (weiß, 96 Prozent) in der Kopfzeile.
- **Sticky und Overflow:** `overflow:hidden` an der Seite bricht die mitlaufende Kopfzeile. Die Kugeln haben ihren eigenen klippenden Container.
- **Kopfzeile bei Tablet-Breite:** Bei 820 px liefen die fünf Links über (833 zu 820), später auch bei 701 bis 800 px (787 zu 701). Das Menü mit Knopf gilt jetzt ab 800 px abwärts, bei 320 px fällt zusätzlich das Warenkorb-Symbol weg.
- **Überschrift in drei Zeilen:** Mit fester Größe brach "Weniger schnippeln." zwischen 1100 und 1200 px um. Die Größe hängt jetzt an der Spaltenbreite (`container-type:inline-size`, `font-size: clamp(2.2rem, 10cqi, 3.7rem)`). Am Handy gilt dafür eine Größe in `vw`, weil `display:contents` keinen Container bildet.
- **Preis brach um:** "44,90 €" zerfiel bei 360 px in zwei Zeilen. Lösung: `white-space:nowrap`, am Handy kleinere Zahl und unter 380 px Preis und Hinweis untereinander.
- **Kugel hinter den Ziffern:** Die erste Zahlenleiste hatte Glaskugeln hinter den Ziffern, das sah schmutzig aus. Jetzt stehen sie über der Zahl.
- **Einblenden mit Verzögerung:** Als Übergang mit gestaffelter `transition-delay` blieb die Verzögerung stehen, und die Karten hoben sich beim Darüberfahren 50 bis 150 ms zu spät. Jetzt Keyframes mit `animation-delay`.
- **Prozenthöhe im Raster:** `height:100%` am SVG in einem `display:grid` wurde nicht aufgelöst, das Bild überdeckte den Text. Ein `display:flex` mit fester Höhe löst es.
- **Teilstern:** Der 0,6-Stern ist ein `linearGradient` mit zwei Stopps bei gleichem Offset (.6 und .6), kein Beschnitt.
- **Orbs am rechten Rand:** Bei `right:` positionierten Kugeln wirkt nur der obere und linke negative Rand. Die Kugel wächst nach links, nicht zentriert.
- **Rückfälle prüfen:** Chromium kann `backdrop-filter` nicht abschalten. Für `@supports not` die Regeln des Blocks per Skript als normale Regeln einfügen. `prefers-reduced-transparency` und `prefers-contrast` gehen über `Emulation.setEmulatedMedia` im Chrome-DevTools-Protokoll.
- **Kontrast messen statt schätzen:** Text per CSS unsichtbar machen (`color: transparent`), ganze Seite fotografieren, für jede Textzeile die Pixel dahinter lesen, Kontrast gegen die Textfarbe rechnen. Das fand den Wert 5,65 beim Kaufknopf; geschätzt hätte man 8 gesagt.

## Anwenden

1. `vorlage/style.css` als Startpunkt in `assets/style.css` kopieren. Schriften aus `../design-vorlagen/fonts/` (Plus Jakarta Sans 400, 600, 800 samt Lizenztext) nach `assets/fonts/` kopieren, die drei `@font-face`-Pfade und das `preload` anpassen. Kein Netz zur Laufzeit.
2. Klassen der Demo: Seite `.seite`, Kugeln `.orbs > .orb.orb--gruen|tuerkis|gelb|violett` mit `.o1` bis `.o8` für Platz und Weg; Glas `.glas`, `.glas--dicht`, Tönung `.t-gruen|tuerkis|gelb|violett`; Glaskugeln `.k-gruen` und weitere (`--k1`, `--k2`); Aufbau `.huelle`, `.abschnitt`, `.abschnitt__kopf`, `.kopf`, `.nav`, `.korb`, `.hero__karte`, `.hero__text`, `.hero__bild`, `.preis`, `.cta`, `.zahlen`, `.karten > .karte`, `.schritte > .schritt`, `.stimmen > .stimme`, `.hinweis`, `.fuss`; Einblenden `.zeigen` mit `--i` für die Staffelung.
3. Haken des Skills `ein-produkt-shop` (siehe `../design-vorlagen/references/umstellen.md`): Die Klassen heißen hier etwas anders als im Glas-Apple- und Neo-Brutalism-Stylesheet. Zuordnung: `.knopf` ist `.cta`, `.kachel` ist `.karte`, `.schritt` bleibt, `.welt` ist `.orbs` (dem Container zusätzlich die Klasse `welt` geben, dann greifen Haken und Skript), `.leucht` entfällt (Akzentwort mit `.marker`). `[data-gruss]`, `.abschied` und die Himmel-Variablen im JavaScript laufen ohne Wirkung weiter oder können weg.
4. `LOGO_MARK` im Generator als Glaskugel neu zeichnen (Demo: `<radialGradient id="logo-kugel">` mit grünem Verlauf), `WELT` durch den Orb-Container ersetzen, `theme-color` auf #e6fbf2 setzen, Favicon als grüne Kugel mit Glanzpunkt.
5. Die Hero-Zeichnung ersetzen: gleiche Verlaufs-Defs (`gl-weiss`, `gl-tuerkis`, `gl-gruen`, `gl-violett`), neue Form des Produkts, Reihenfolge der Ebenen beachten. Keine Fremdfotos.
6. Prüfen: Bildschirmfotos PC und Handy, Kontrast gemessen (Methode unter Stolperfallen), drei Sondermodi, Tablet bei 701, 820 und 1024 px (Kopfzeile!), Kaufweg, Lighthouse.
7. Wer Kugeln mit `filter: blur(60px)` will: `background: var(--c)` plus `filter: blur(60px)` auf die Kugel setzen, Breite wieder auf `var(--d)`, am Handy `blur(36px)`. Vorher auf einem echten Telefon messen.

## Dateien

- `vorlage/demo.html`: HORTA-Startseite im Look (26 KB), Hero-SVG und Icons inline.
- `vorlage/style.css`: Stylesheet mit Tokens, Glas, Orbs, Rückfällen und Handy-Entwurf (28 KB).
- `vorlage/script.js`: Menü, aktuelle Navigation, Einblenden, Orbs pausieren, Zeiger-Glanz, Demo-Warenkorb (5 KB).
- Schriften nicht kopiert, sie werden aus `../design-vorlagen/fonts/` geladen: PlusJakartaSans-400.woff2, -600.woff2, -800.woff2.

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)

Reihenfolge wie im Auftrag, nach jedem Durchgang Prüfskript und Bildschirmfotos. Gelesen wurden die drei SKILL.md. Von `impeccable` liegt nur die SKILL.md vor (die Verweise `reference/*.md` und `scripts/` fehlen im Ordner), deshalb gilt dort die Kurzregel: jede Farbe eine Rolle, Signalfarbe nur Kaufknopf und Auswahl, ein Blickfang pro Bildschirm, Kontrast gemessen, sichtbarer Fokus.

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Überschrift mit fester Größe (Formel in `vw`, höchstens 56 px), zwischen 1100 und 1200 px drei Zeilen | Größe = 10 Prozent der Spaltenbreite (`cqi`), 59 px, gemessen immer zwei Zeilen von 1024 bis 1920 px (Höhe 128 px bei 1280 px) | Breite Überschrift, höchstens zwei Zeilen am PC |
| gpt-taste | Karten mit gemischtem Innenabstand (24, 28, 32 px), Handy mit 18, 20, 22 px | Eine Stufe `--s3` für alle Karten; am Handy eigene Stufen 20, 32, 48, 72 px über dieselben Variablen | Gleichmäßige Abstandsstufen |
| gpt-taste | Handy: Überschrift in drei Zeilen, Kaufknopf am unteren Rand des ersten Bildes abgeschnitten (nach Bildschirmfoto) | Überschrift in zwei Zeilen (32 px), Bild 196 px, Knopf bei y 766 bis 826 vollständig sichtbar | Hero-Blickführung: Aufmerksamkeit, Interesse, Verlangen, Handlung innerhalb eines Bildschirms |
| impeccable | Farben als verstreute Hex-Werte (acht Inline-Verläufe im HTML, zwei verschiedene Gelbtöne bei Sternen und Kugeln) | Vier Orb-Tokens plus vier dunklere Kantentöne, Klassen `.k-*`, ein Gelb für Sterne und Kugeln | Jede Farbe hat eine Rolle, Orange bleibt allein beim Kaufknopf |
| impeccable | Kugeln mit 90 Prozent Deckkraft, Violett und Türkis zogen im ersten Bild gegen den Knopf | Deckkraft auf .78 gesenkt, nach dem Wechsel auf Verläufe auf .86 nachgezogen, damit die Farbe nicht verblasst | Ein Blickfang pro Bildschirm: der Knopf |
| impeccable | Kontrast nur geschätzt, Fokus nur im Code | Gemessen mit Pixelprobe hinter dem Text (kleinster Wert 5,65 zu 1, Fließtext 8,3 zu 1 und besser, PC, Tablet, Handy, auch bei weniger Transparenz und mehr Kontrast); Fokus per Tastatur fotografiert (3 px Tinte plus weißer Rand) | Kontrast gemessen, sichtbarer Fokus |
| impeccable | Navigation zeigte nicht, wo man ist; Preisplakette und Eyebrow im Kontrast-Modus weiß auf weiß | Aktueller Abschnitt per `aria-current` mit weißer Pille und Punkt (nicht nur Farbe); im Kontrast-Modus 2 px Rahmen auf Plakette und Eyebrow | Auswahl sichtbar, Barrierefreiheit in Sondermodi |
| emil-design-eng | Orbs mit `filter: blur(60px)`; im Software-Test 82 bis 90 ms pro Bild | Orbs als Verlauf mit weichem Rand: 42 bis 44 ms (am Handy 17 statt 24 ms); Glas-Blur bleibt bei höchstens 20 px (PC 18 und 20, Handy 12) | Blur über 20 px meiden, nur `transform` bewegen |
| emil-design-eng | Einblenden als Übergang mit `transition-delay` 0 bis 150 ms, blieb nach dem Einblenden stehen und verzögerte das Anheben der Karten beim Hover | Keyframes `einblenden` mit `animation-delay` und `backwards`; danach `transition-delay` 0 s (gemessen) | Hover ohne Verzögerung, Staffel 50 ms, 280 ms |
| emil-design-eng | Druck-Rückmeldung 180 bis 200 ms, Sprunglink ohne `:active`; Warenkorb-Zähler pulste per Klasse und Reflow-Trick, 280 ms | `:active { transform: scale(.97) }` auf Knopf, Navigation, Warenkorb, Menü, Logo, Fußzeilenlinks und Sprunglink in 160 ms mit `cubic-bezier(.23,1,.32,1)`; Zähler per `element.animate` in 200 ms | Rückmeldung 100 bis 160 ms, eigene Kurve, unterbrechbar |
| emil-design-eng | Zeiger-Glanz setzte CSS-Variablen an der Hero-Karte, direkt am Zeiger ohne Nachlaufen; fallende Stücke mit Ease-in-out; bei reduzierter Bewegung alle Übergänge aus | Eigenes Glanz-Element, nur `transform`, weich nachgezogen (Faktor 0,14), Schleife endet bei Ruhe und bei verdecktem Tab; Stücke fallen `linear`; bei reduzierter Bewegung bleiben nur Farb- und Deckkraft-Übergänge (150 ms) | Variablen am Elternteil lösen Neuberechnung aus; konstante Bewegung ist linear; reduziert heißt weniger, nicht null |

Konflikte: Die Nutzerregeln gingen vor (ein Kaufknopf, keine Gedankenstriche, Verbotsliste). Der Look verlangt weiche Kugeln und viel Glas, `emil-design-eng` verlangt "Blur über 20 px meiden" und Animationen unter 300 ms: Gelöst durch Verlaufskugeln statt blur(60px) und durch die Trennung zwischen Bedienelementen (alle unter 300 ms, 160 bis 280 ms) und der Hintergrund-Deko (34 bis 48 Sekunden langsam, `transform` only, bei reduzierter Bewegung aus). Das Menü am Handy öffnet bewusst ohne Animation, weil es auch per Tastatur bedient wird. `gpt-taste` fordert GSAP, Marquee und Pinning: nicht übernommen (nur Vanilla-JS, ruhiger Look), die Regeln zu Überschrift, Raster, Abstand und Blickführung gelten.
