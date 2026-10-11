<!-- Kopie aus look-holographic/SKILL.md, nicht hier bearbeiten, sondern im Einzel-Skill und dann abgleichen.py ausführen -->
# Look: Holographic

Perlmutt und Hologramm-Folie. Der Grund ist ein kühles, helles Silber (#eef0f7 bis #f7f4fb). Karten, Kopfzeile und das Hero-Gerät tragen eine Folie mit Regenbogenverlauf (Rosa, Cyan, Lila, Mint, Gelb), und ein heller Glanzpunkt wandert dorthin, wo der Zeiger steht. Text steht nie direkt auf der Folie, sondern auf einer ruhigen, hellen Platte davor. Der Kaufknopf ist die einzige gesättigte Fläche der Seite.

Gebaut und getestet als Demo der HORTA-Startseite (Gemüseschneider HT-5): `vorlage/demo.html`, `vorlage/style.css`, `vorlage/script.js`. Ansehen: Testserver in `.claude/skills` starten, dann `/look-holographic/vorlage/demo.html` öffnen.

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt glatt, sauber, technisch oder kosmetisch ist und "neu und leicht" wirken soll: Küchengeräte aus Edelstahl, Elektronik-Zubehör, Pflege, Schmuck, Geschenke. Er verträgt Produkte, die man als Zeichnung zeigt (kein Foto nötig), und Kunden, die am Handy und am PC einkaufen.

Passt nicht, wenn Ruhe, Tradition oder Ernst gefragt sind (Schlaf, Medizin, Handwerk, Bio, Finanzen), oder wenn das Produkt selbst sehr bunt ist: ein farbiges Foto streitet mit dem Regenbogenrand. Auch ungünstig, wenn die Seite fast nur aus Fließtext besteht, weil die Folie dann jede Karte laut macht.

## Merkmale
- Perlmuttgrund (#eef0f7 bis #f7f4fb) mit vier ruhigen, festen Farbflecken (Rosa, Cyan, Lila, Mint), die sich alle 1500 px wiederholen. Nichts davon bewegt sich.
- Folienkarten (`.folie`): 5 px Regenbogenrand, darin eine weiße Platte (82 % Deckkraft), auf der der Text steht. Die Folie schimmert nur leicht durch.
- Der Glanzpunkt und die Regenbogenbänder folgen dem Zeiger, per CSS-Variablen `--mx` und `--my` nur auf der Karte unter dem Zeiger. Alles läuft über `transform`.
- Feine Wabenstruktur (selbst gezeichnete Sechsecke als SVG-Datenadresse) liegt in der Folie und verschiebt sich mit ihr.
- Hero: Gerät, Kegel-Einsatz mit Schlitzen und Schüssel sind Folienformen. Der Regenbogen liegt als großes Rechteck hinter einer Schablone (clipPath) und wird verschoben, dazu ein Glanzfleck, ein Lichtstreifen und eine Folienscheibe als Halo.
- Kopfzeile ab 900 px als schwebende Glas-Pille mit Folienrand, darunter wischbare Chips am Handy.
- Eine Überschrift mit genau einem Verlaufswort ("Salat.") in tiefen Tönen (Magenta, Blau, Petrol), alles andere Tinte.
- Handy: Glanz driftet sehr langsam (38 s), Karten gleiten beim Scrollen, der Kaufknopf bleibt im Hero am unteren Bildrand stehen.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` / `--grund-2` | #eef0f7 / #f7f4fb | Seitengrund, kühles Perlmutt |
| `--platte` | rgb(255 255 255 / 0.82) | helle Fläche vor der Folie, hier steht aller Text |
| `--tinte` | #14102a | Text, Konturen, Zähler (16,2:1 auf dem Grund) |
| `--tinte-2` | #433e63 | Untertitel, Nebentexte (8,8:1 auf dem Grund) |
| `--f-rosa` `--f-cyan` `--f-lila` `--f-mint` `--f-gelb` | #ff9bd5 #6fe6ff #a58bff #8dffcf #fff08a | Folienfarben, nur Fläche und Rand, nie Textfarbe |
| `--tief-magenta` `--tief-indigo` `--tief-petrol` | #a1136b #1d58a8 #00697f | nur für das eine Verlaufswort, 5,5 bis 6,5:1 auf dem Grund |
| `--signal` | #5b3dff | Signalfarbe: nur Kaufknopf und Fokusring (Weiß darauf 5,9:1, Ring auf dem Grund 5,2:1) |

Regel: Die Signalfarbe taucht sonst nirgends auf. Die tiefen Töne des Verlaufsworts liegen bewusst weit weg von #5b3dff (Blau statt Indigo), sonst wirkt das Wort wie ein zweiter Knopf.

## Schriften
Beide Familien liegen in `../design-vorlagen/fonts/`, Lizenztexte daneben.
- Unbounded 700 (`Unbounded-700.woff2`): Überschrift, Preis, Zahlen, Knopf, Logo
- Unbounded 500 (`Unbounded-500.woff2`): Zwischentitel (h3)
- Manrope 400 (`Manrope-400.woff2`): Fließtext
- Manrope 600 (`Manrope-600.woff2`): fette Nebentexte, Navigation, Etiketten

Zusammen 68 KB. Unbounded ist sehr breit: "Weniger schnippeln." ist 12,4 em lang, deshalb ist die H1 auf `min(3.1rem, 3.5vw)` gesetzt (ab 980 px) und `min(3.4rem, 7.2vw)` darunter. So bleibt sie bei allen getesteten Breiten von 320 bis 1920 px genau zweizeilig.

## So ist er gebaut

**1. Folie aus zwei bewegten Ebenen (nur `transform`).** Die Karte schneidet mit `overflow: hidden` ab. Ebene 1 ist ein 2,6 mal so großes Regenbogenbild mit Waben und wird verschoben. Ebene 2 ist der Glanzpunkt, so groß wie die Karte, dessen Mitte zum Zeiger wandert. Die Zeigerwerte sind als Prozent registriert, damit CSS sie weich überblenden kann.
```css
@property --mx { syntax: "<percentage>"; inherits: true; initial-value: 30%; }
@property --my { syntax: "<percentage>"; inherits: true; initial-value: 20%; }
.folie { --mx: var(--mx0); --my: var(--my0); position: relative; isolation: isolate; overflow: hidden;
  display: flex; border-radius: var(--radius);
  transition: --mx 0.25s var(--glatt), --my 0.25s var(--glatt); }
.folie::before { content: ""; position: absolute; inset: -80%;
  background: var(--wabe) 0 0 / 21px 38px, linear-gradient(118deg, var(--f-rosa) 0, var(--f-cyan) 12%, var(--f-lila) 24%, var(--f-mint) 36%, var(--f-gelb) 46%, var(--f-rosa) 58%, var(--f-cyan) 70%, var(--f-lila) 82%, var(--f-mint) 94%, var(--f-gelb) 100%);
  transform: translate(calc((var(--mx) - 50%) * -0.2), calc((var(--my) - 50%) * -0.2)); }
.folie::after { content: ""; position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 50%, rgb(255 255 255 / 0.95), rgb(255 255 255 / 0) 44%);
  transform: translate(calc(var(--mx) - 50%), calc(var(--my) - 50%)); }
.platte { position: relative; z-index: 1; flex: 1; margin: var(--rand); background: var(--platte); }
```
Das JavaScript schreibt die zwei Werte nur auf die Karte unter dem Zeiger, höchstens einmal pro Bild, und nur bei Maus und ohne reduzierte Bewegung:
```js
el.addEventListener('pointermove', function (e) {
  if (e.pointerType === 'touch') return;
  var r = el.getBoundingClientRect();
  x = (e.clientX - r.left) / r.width * 100; y = (e.clientY - r.top) / r.height * 100;
  if (!frame) frame = requestAnimationFrame(function () { frame = 0;
    el.style.setProperty('--mx', x.toFixed(1) + '%'); el.style.setProperty('--my', y.toFixed(1) + '%'); });
}, { passive: true });
el.addEventListener('pointerleave', function () { el.style.removeProperty('--mx'); el.style.removeProperty('--my'); });
```

**2. Hero-Gerät: Regenbogen hinter einer Schablone.** SVG-Verläufe können keine CSS-Variablen lesen. Darum liegt ein riesiges Rechteck mit Verlauf (`spreadMethod="repeat"`) in einer Gruppe mit `clip-path`, und CSS verschiebt das Rechteck. Gerät, Kegel und Schüssel haben je eine Schablone und einen anderen Winkel, deshalb schimmern sie verschieden.
```html
<clipPath id="cp-geraet"><use href="#s-sockel"/><use href="#s-turm"/><use href="#s-schacht"/><use href="#s-deckel"/></clipPath>
<g clip-path="url(#cp-geraet)"><rect class="fo fo-a" x="-700" y="-700" width="2000" height="2000" fill="url(#reg-a)"/></g>
```
```css
.buehne { --sx: 0.34; --sy: 0.28; transition: --sx 0.28s var(--glatt), --sy 0.28s var(--glatt); }
.fo { transform: translate(calc((var(--sx) - 0.5) * 380px), calc((var(--sy) - 0.5) * 260px)); }
.spitze { transform: translate(calc(var(--sx) * 600px), calc(var(--sy) * 620px)); }
```
Danach kommen Volumen (weiß nach Tinte), Waben (`<pattern>`), Kontur (Tinte 74 %) und der Glanzfleck, alles in derselben Schablone.

**3. Kaufknopf mit Folienring in zwei Ebenen.** Der Ring (`z-index: -2`) und die Füllung (`-1`) sind getrennte Pseudoelemente. Mit nur einem Pseudoelement mit `z-index: -1` deckt der Ring die Füllung zu.
```css
.cta { position: relative; isolation: isolate; color: #fff; background: none; transition: transform 0.16s var(--glatt); }
.cta::before { content: ""; position: absolute; inset: -6px; z-index: -2; border-radius: 999px;
  background: linear-gradient(100deg, var(--f-rosa), var(--f-cyan) 20%, var(--f-lila) 42%, var(--f-mint) 64%, var(--f-gelb) 84%, var(--f-rosa)) 30% 50% / 320% 100%; }
.cta::after { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: 999px;
  background: var(--signal); border: 2px solid rgb(255 255 255 / 0.92); }
.cta:active { transform: scale(0.97); }
```

**4. Touch: Drift und Gleiten ohne JavaScript-Schleife.** Am Handy gibt es keinen Zeiger. Die Bühne driftet über registrierte Zahlen in 38 s hin und her und pausiert, solange sie nicht im Bild ist (Klasse `im-bild` per IntersectionObserver, `verdeckt` bei `document.hidden`). Die Karten gleiten, wo der Browser `animation-timeline: view()` kennt.
```css
@media (hover: none) and (prefers-reduced-motion: no-preference) {
  .buehne { animation: drift 38s var(--sanft) infinite alternate; animation-play-state: paused; }
  .buehne.im-bild:not(.verdeckt) { animation-play-state: running; }
  @supports (animation-timeline: view()) {
    .folie { animation: gleiten linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
  }
}
@keyframes drift { from { --sx: 0.2; --sy: 0.18; } to { --sx: 0.8; --sy: 0.72; } }
@keyframes gleiten { from { --mx: 6%; --my: 8%; } to { --mx: 94%; --my: 92%; } }
```

**5. Hero am Handy: ein Kaufknopf, der im Hero stehen bleibt.** Der Knopf liegt in einer Zeile, die das ganze Raster überspannt, und klebt unten. Die letzte Zeile hat feste Höhe, sonst überdeckt der klebende Knopf den Preis.
```css
@media (max-width: 979px) {
  .hero { --kauf-h: 7rem; grid-template-rows: repeat(6, auto) var(--kauf-h); }
  .kauf { grid-area: 1 / 1 / -1 / -1; align-self: end; position: sticky; bottom: 0; height: var(--kauf-h); pointer-events: none; }
  .cta { pointer-events: auto; }
}
```

## Pro
- Gemessener Kontrast auf dem gerenderten Bild (Text unsichtbar gemacht, Pixel hinter jeder Textzeile gelesen, drei Breiten): kleinster Wert 5,4:1 beim Verlaufswort, Ziffern auf der Folienscheibe 6,8:1, alle anderen Texte darüber. Kein Text steht direkt auf Folie.
- Leicht: 55 KB ohne Schriften (HTML 26, CSS 26, JS 4, davon die Hero-Zeichnung 13,5 KB), Schriften 68 KB, 7 Anfragen. Im Ruhezustand 0 rAF-Aufrufe pro Sekunde und 0 Endlos-Animationen.
- Flüssig: Bei Zeigerbewegung über Hero und Karten liefen 308 Bilder mit Median 16,7 ms und längstem Bild 16,8 ms (Chromium ohne Grafikkarte). Es bewegt sich nur `transform`, der Text wird nie neu gezeichnet.
- Der Kaufknopf ist die einzige gesättigte Fläche (#5b3dff, Weiß darauf 5,9:1) mit eigenem Folienring und tintenfarbenem Fokusring mit 9 px Abstand. Er bleibt am PC und am Handy der Blickfang.
- Ohne JavaScript sieht die Seite gleich aus (Bildschirmfoto mit und ohne JS gleich groß, 2.180.329 Byte). Bei reduzierter Bewegung steht der Glanz fest, 0 Endlos-Animationen.
- Die H1 bleibt bei 15 geprüften Breiten (320 bis 1920 px) zweizeilig, kein Überlauf, keine Touch-Ziele unter 44 px.

## Contra
- Aufwand: Die Hero-Zeichnung ist die Arbeit. 9 Folienformen in 3 Schablonen plus Halo, 16 Gemüsestücke, Wabe, Schlitze und Volumen wurden von Hand gesetzt und mehrfach nach Bildschirmfoto korrigiert (der Kegel sah erst wie ein Megafon aus). Jedes neue Produkt braucht eine neue Zeichnung.
- Am Handy wirkt der Look schwächer. Ohne Zeiger gibt es nur den 38-s-Drift und das Gleiten beim Scrollen, und das Gleiten braucht `animation-timeline: view()` (Chrome, nicht überall). Sonst steht die Folie still.
- Unbounded ist breit und schwer zu kürzen: 12,4 em pro Zeile in der H1, "Lieferung aus China" bricht in der Platte um, Silbentrennung ist in Überschriften aus. Längere Produktnamen oder Slogans brauchen kleinere Schrift.
- Lesbarkeit hängt an der Platte. Der Kontrast stimmt nur, solange die Platte mindestens 82 % weiß bleibt und das Verlaufswort tiefe Töne nutzt (5,4:1). Wer die Platte durchsichtiger macht oder gelbe Folie größer, verliert schnell unter 4,5:1.
- Unruhe: Jede Karte trägt Regenbogenrand und Wabe. Die Ordnung kommt nur aus dem einen violetten Knopf. Ein buntes Produktfoto oder viele Karten würden die Seite laut machen.
- Browser: `@property` (Safari ab 16.4, Firefox ab 128) und `backdrop-filter` für die Pille. In älteren Browsern steht die Folie still auf der Grundfarbe.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Das schimmernde Gerät zieht den Blick, der violette Knopf mit Folienring bleibt klar das Wichtigste. |
| Lesbarkeit | 4 | Aller Text auf weißer Platte mit mindestens 5,4:1, nur die breite Schrift braucht Platz. |
| Handy | 4 | Eigener Entwurf mit wischbarer Navigation und stehendem Kaufknopf, aber weniger Glanz ohne Zeiger. |
| Tempo | 4 | 55 KB ohne Schriften, nur `transform` bewegt sich, 60 Bilder pro Sekunde gemessen. |
| Barrierefreiheit | 4 | Fokus, Hochkontrast-Modus, reduzierte Bewegung und gemessener Kontrast sind drin, Waben bleiben rein dekorativ. |
| Aufwand (5 = wenig Aufwand) | 2 | Die Zeichnung mit Schablonen, Waben und Gemüse muss pro Produkt neu gebaut werden. |
| Risiko (5 = geringes Risiko) | 3 | Ältere Browser zeigen keine Bewegung, und der Look kippt bei buntem Produkt oder durchsichtigeren Platten. |

## Passt besonders zu
Küchen- und Haushaltsgeräte aus Edelstahl oder Kunststoff, Elektronik-Zubehör und Ladegeräte, Kosmetik, Pflege und Schmuck, Geschenkartikel für junge Käufer.

## Passt nicht zu
Schlaf, Wellness und Naturprodukte (dafür Glas dunkel), Werkzeug und Handwerk mit schweren, ernsten Bildern, Produkte mit bunter Fotografie.

## Stolperfallen
- Kaufknopf verschwand: Ein Pseudoelement mit `z-index: -1` in einem isolierten Knopf wird über dessen eigenem Hintergrund gezeichnet. Ring und Füllung müssen zwei Pseudoelemente sein (`-2` und `-1`).
- Tablet 820 px lief über (842 > 820): Logo, fünf Links und Warenkorb passen nicht in eine Zeile. Lösung: unter 900 px zweizeilig mit wischbaren Chips, darüber die Pille.
- Handy-Ausschnitt mit `overflow: hidden` schnitt die runde Folienscheibe und die Schüssel ab. Besser die Zeichnung nicht beschneiden, sondern auf 86 % Breite verkleinern.
- Klebender Kaufknopf überdeckte den Preis: Als Rasterelement über alle Zeilen hat er in der letzten, leeren Zeile keine Höhe. Die Zeile braucht eine feste Höhe (`--kauf-h`).
- Der Einstiegs-Glanz mit `animation-fill-mode: both` hielt `transform` fest, danach folgte der Streifen dem Zeiger nicht mehr. Mit `backwards` endet die Animation und der normale Wert gilt wieder.
- Pseudoelemente der Folie mit `position: absolute` liegen über nicht positionierten Kindern. Das Paketsymbol im China-Block war zugedeckt, bis es `position: relative; z-index: 1` bekam.
- Kontrastmessung: Die Box einer Überschrift enthält ihre Zierlinie, die Box eines Etiketts den Rand. Gemessen werden darum nur die Rechtecke der Textzeilen (Range), sonst melden sich Tinte-Pixel als Fehler.
- Ein festes Hintergrund-Pseudoelement (`position: fixed`) endet in Vollbild-Aufnahmen an der Fensterhöhe und zeigt eine harte Naht. Mit `position: absolute` und `background-repeat: repeat-y` gibt es sie nicht.
- Der Browser fragt `favicon.ico` an und meldet 404 als Konsolenfehler. Ein eigenes Favicon als Datenadresse im `<head>` verhindert das.
- Verlaufstext: `padding-right: 0.06em`, sonst wird der Schlusspunkt abgeschnitten. Fallbackfarbe vor `@supports` setzen.
- Klebender Knopf in Vollbild-Aufnahmen steht am unteren Rand des ersten Bildschirms, nicht an seinem Platz. Das ist kein Fehler, nur beim Ansehen der Aufnahme wichtig.

## Anwenden
1. Neuer Shop: Look mit `../design-vorlagen/SKILL.md` wählen, Ablauf aus `ein-produkt-shop` Phase 5. Dann `vorlage/style.css` als Startpunkt nach `assets/style.css` kopieren, `vorlage/script.js` daneben.
2. Schriften kopieren: `Unbounded-700.woff2`, `Unbounded-500.woff2`, `Manrope-400.woff2`, `Manrope-600.woff2` samt Lizenztexten aus `../design-vorlagen/fonts/` nach `assets/fonts/`, in `style.css` die `url(...)` der vier `@font-face` anpassen, `preload` für die 700er setzen.
3. Klassen der Vorlage: `.folie` (Karte mit Folienrand, Attribut `data-folie` schaltet die Zeigerfolge ein) mit `.platte` darin, `.kachel`, `.karte` und `.karte--breit`, `.schritte` und `.schritt`, `.preis`, `.hinweis`, `.hero` mit `.buehne` und `.geraet`, `.kauf` und `.cta`, `.irisieren` (genau ein Wort). Farben und Rollen nur in `:root` ändern, `--signal` bleibt allein beim Kaufknopf.
4. Hero-Zeichnung ersetzen: Formen in `<defs>` neu zeichnen (`s-...`), je Teil eine `clipPath` und eine Gruppe mit `fo fo-a`, `fo-b` oder `fo-c`. Die Klassen `.fo`, `.spitze` und `.streifen` und die Werte `--sx`, `--sy` bleiben.
5. Zu den Haken des Skills `ein-produkt-shop` passen: Dort heißen die Look-Klassen `.glas`, `.knopf`, `.leise-knopf`, `.leucht`, `.kachel`, `.schritt`, `.option`, `.frage`, `.korb`, `.kasse`. Entweder diese Namen in `style.css` nachziehen (`.glas` wird `.folie` plus `.platte`, `.knopf` wird `.cta`, `.leucht` wird `.irisieren`) oder die Selektoren doppeln. Reihenfolge und Generator-Stellen stehen in `../design-vorlagen/references/umstellen.md`. Texte, Rechtsseiten, Formulare und JavaScript-Haken bleiben unverändert.
6. Prüfen: Bildschirmfotos PC, Tablet und Handy ansehen (Kopfzeile bei 820 px, klebender Knopf), Kontrast mit gerenderten Pixeln messen, Fokus mit Tab durchgehen, reduzierte Bewegung einschalten (Glanz muss stehen), danach `text_check.py` und Lighthouse aus `ein-produkt-shop`.

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | Kopfzeile als volle Leiste mit Folienlinie unten | Ab 900 px schwebende Glas-Pille mit Folienrand und 12 px Abstand zum Rand | Eine eigene, hochwertige Navigation statt der Standardleiste |
| gpt-taste | Funktionen: vier gleich große Karten in einer Reihe | Raster mit 3 Spalten, `grid-auto-flow: dense`, Schneiden und Breiter Schacht zwei Spalten breit (breit+schmal, schmal+breit) | Lückenloses, abwechslungsreiches Raster ohne leere Zelle |
| gpt-taste | Ablauf: drei getrennte Karten wie bei Funktionen und Bewertungen | Eine Folienfläche mit drei Schritten und Regenbogenlinie zwischen den Nummern | Nicht dreimal denselben Kartenblock wiederholen |
| gpt-taste | Abstände `clamp(64px, 9vw, 128px)`, Hintergrund fest mit Naht in Vollbild | `clamp(72px, 10vw, 144px)`, Stufen `--s1` bis `--s10`, Hintergrund als wiederholte Kachel; H1 bei 15 Breiten zweizeilig gemessen | Große, gleichmäßige Abschnitte, H1 höchstens 2 Zeilen auf dem PC |
| impeccable | Verlaufswort mit Indigo #3d2bb8, nahe der Signalfarbe | Magenta, Blau #1d58a8, Petrol; kleinster Kontrast 5,4:1 gemessen | Jede Farbe eine Rolle, die Signalfarbe gehört nur dem Kaufknopf und dem Fokus |
| impeccable | Preisblock mit demselben lauten Foliennaht-Rand wie alle Karten | 2 px Rand, Platte 90 % weiß, leiserer Schatten | Ein Blickfang pro Bildschirm: Gerät, Überschrift, dann der Knopf |
| impeccable | Fokusregel mit pauschalem `border-radius: 6px`; Fußzeilen-Link AGB nur 34 px breit | Ring ohne eigene Rundung, Kaufknopf-Ring in Tinte mit 9 px Abstand, Fußzeilen-Ziele mindestens 44 x 44 px, Hochkontrast-Block (`forced-colors`), `color-scheme: light` | Sichtbarer Fokus beim Tab-Durchlauf (13 Stopps, 12 davon als Ring gemessen), Touch-Ziele, Systemmodus |
| emil-design-eng | Folie per `background-position` und Radial-Verlauf, bei jeder Zeigerbewegung neu gezeichnet | Zwei Pseudoelemente (Regenbogen, Glanz), nur per `transform` verschoben | Nur `transform` und `opacity` animieren, Text bleibt unberührt |
| emil-design-eng | Kaufknopf-Ring folgte dem Zeiger über `--mx`, `scroll-behavior: smooth` für Sprungmarken | Ruhiger Ring, Knopf bewegt nur `transform` (`:active` mit `scale(0.97)`), Glätten beim Springen entfernt | Tastatur-Sprünge nie animieren, der Kaufknopf soll ruhig bleiben |
| emil-design-eng | Logo und Fußzeilen-Links ohne Druckrückmeldung, Übergang des Glanzes 0,3 s, Einstieg ohne Staffelung | `:active` mit `scale(0.97)` auch dort, Übergänge 0,16 s und 0,25 s mit `cubic-bezier(.23,1,.32,1)`, Hero-Teile fahren in 0,28 s mit 40 ms Versatz ein, Lichtstreifen mit `backwards` | Unter 300 ms, eigene Kurve statt `ease`, Staffel 30 bis 80 ms, Hover nur bei feinem Zeiger |

Konflikte: Die Regeln des Nutzers gingen vor. gpt-taste verlangt zwei Knöpfe, GSAP und Bilder aus dem Netz, hier gibt es einen Kaufknopf, reines CSS und nur eigene Zeichnungen. Die dekorativen Hero-Effekte (Lichtstreifen 1,1 s beim Laden, Drift 38 s am Handy) sind länger als 300 ms, laufen aber nur für das Gerät, pausieren außerhalb des Bilds und stehen bei reduzierter Bewegung. Die Zeigerwerte `--mx` und `--my` selbst werden im Hauptthread überblendet, gezeichnet wird dabei nichts neu. Von impeccable lag nur die SKILL.md vor (kein Startprogramm, keine Referenzdateien), angewendet wurden seine Grundsätze zu Rollen, Hierarchie, Kontrast und Fokus.

## Dateien
- `vorlage/demo.html`: HORTA-Startseite im Look (Kopfzeile, Hero mit Zeichnung, Zahlenleiste, Funktionen, Ablauf, Bewertungen, China-Hinweis, Fußzeile)
- `vorlage/style.css`: komplettes Stylesheet mit Werten, Folie, Hero-Zeichnung, Breiten (Pille ab 900 px, Handy unter 720 px) und reduzierter Bewegung
- `vorlage/script.js`: Zeigerfolge für Karten und Gerät, Drift-Steuerung (Sichtbarkeit), Zähler am Kaufknopf
- Schriften: `../design-vorlagen/fonts/Unbounded-700.woff2`, `Unbounded-500.woff2`, `Manrope-400.woff2`, `Manrope-600.woff2` (mit Lizenztexten)
- Anleitung zum Look-Wechsel: `../design-vorlagen/references/umstellen.md`
