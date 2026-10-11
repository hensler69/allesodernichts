---
name: look-split-flap
description: Der Look "Split-Flap" (Fallblatt-Anzeige wie im Bahnhof oder am Flughafen) ist ein dunkler Anthrazit-Look. Überschrift, Preis, Zahlen und Status bestehen aus Kacheln mit Mittellinie, die beim Laden einmal durch Zufallszeichen blättern. Verwenden bei "Split-Flap", "Fallblatt", "Fallblattanzeige", "Abflugtafel", "Anzeigetafel", "Bahnhofstafel", "flip board", "departure board", "split-flap display", "Design-Vorlage split-flap", wenn ein Ein-Produkt-Shop sachlich, technisch und mit Wiedererkennung wirken soll oder wenn Looks verglichen werden.
---

# Look: Split-Flap

Gebaut und getestet am HORTA-Gemüseschneider (Startseite). Demo: `vorlage/demo.html`, Stylesheet: `vorlage/style.css`, Skript: `vorlage/script.js`.
Idee: eine Anzeigetafel im Bahnhof. Der Grund ist Anthrazit (#15161a), die Zeichen sitzen auf Kacheln (#24262c) mit feiner Mittellinie (dem Scharnier) und kleinem Schatten. Die Zeichen sind warmweiß (#f3efe0). Amber (#ffb703) gibt es nur für den Kaufknopf und die Statusanzeigen "OK".

## Wann der Look passt / Wann nicht
Passt, wenn das Produkt etwas Technisches, Ordentliches oder Praktisches ist und die Seite Wiedererkennung braucht: Küchengeräte, Werkzeug, Haushaltshelfer, Reise und Gepäck, alles mit Lieferstatus, Zahlen und einem klaren Ablauf. Der amber Kaufknopf ist auf dem dunklen Grund die einzige warme Fläche und sofort zu finden.
Passt nicht bei Produkten, die Wärme, Natur, Pflege, Baby, Luxus oder Verspieltes versprechen. Auch nicht, wenn Überschriften lange Wörter oder viele Sätze brauchen (Kacheln vertragen nur kurze Texte), und nicht für Zielgruppen, die Bewegung beim Laden stört.

## Merkmale
- Kacheln aus zwei Hälften mit Mittellinie, zwei Achsstiften an den Seiten und kleinem Schatten. Die H1 (19 Zeichen in Zeile 1) steht als zweizeilige Tafel über die volle Breite, am Handy als drei Kachelzeilen mit höchstens 11 Kacheln.
- Preis, Zahlenleiste, Funktionsüberschriften, "GLEIS 1 bis 3", die Marke "BEISPIEL" und der Lieferstatus sind Kacheln. Fließtext (Untertitel, Hinweise, Zitate, Beschreibungen) bleibt immer normaler Text.
- Beim Laden blättert jede Tafel genau einmal: 2 bis 3 Zufallszeichen, dann das Zielzeichen, höchstens 4 Klappen je Kachel (je 110 ms), gestaffelt. Die H1 steht nach etwa 1,5 s. Tafeln unterhalb des Bildes blättern erst, wenn sie sichtbar werden.
- Klartext für Screenreader: Jede Tafel enthält einen visuell versteckten Text, die Kachelzeilen sind `aria-hidden`. Ohne JavaScript bleibt normaler Text im Tafel-Stil stehen.
- Funktionen als Tafelbrett mit Spalten FUNKTION, HINWEIS, STATUS, der Ablauf als Fahrplan mit Gleis-Schildern, Bewertungen als Tafelmeldungen mit Marke "BEISPIEL".
- Hero-Bild: das Gerät als flaches Piktogramm (vier Grautöne auf Warmweiß, selbst gezeichnetes SVG) auf einer großen Kachel mit Scharnier in der Mitte, dazu fünf kleine Scheiben für die fünf Einsätze.
- Vier Farbrollen: Anthrazit (Grund), Kachel, Warmweiß (Zeichen, Fokusring, Sterne), Amber nur für Kaufknopf und "OK".
- Der Kaufknopf trägt als einziges Element eine volle Signalfarbe, harten Schatten und `scale(.97)` beim Drücken.

## Farben
| Token | Wert | Rolle |
| --- | --- | --- |
| `--grund` | #15161a | Seitengrund |
| `--flaeche` | #1c1e23 | Tafelrahmen, Bretter, Karten |
| `--kachel` / `--kachel-oben` / `--kachel-unten` | #24262c / #2b2e35 / #1d1f24 | Kachelhälften (oben heller, unten dunkler) |
| `--scharnier` | #0c0d10 | Mittellinie und Achsstifte der Kacheln |
| `--linie` | #34373f | Rahmenlinien |
| `--zeichen` | #f3efe0 | Zeichen auf Kacheln, Überschriften, Sterne, Fokusring (11,8:1 auf Kachel, 15,7:1 auf Grund) |
| `--text` | #dcd8c9 | Fließtext (11,7:1 auf Fläche) |
| `--text-leise` | #aeab9d | Nebentext, Spaltenköpfe (mindestens 7,2:1) |
| `--amber` | #ffb703 | NUR Kaufknopf und Statusanzeige "OK" (7,8:1 bis 9,8:1 auf Kachel) |
| `--amber-dunkel` / `--auf-amber` | #8a6200 / #15161a | harter Schatten des Kaufknopfs / Schrift auf Amber (10,4:1) |
| `--p-hell`, `--p-licht`, `--p-mittel`, `--p-tief`, `--p-aus` | #f3efe0, #cfcab8, #a8a597, #8f8c80, Fläche | Rollen im Piktogramm: Gerät, Rand und Möhre, Teile, Sockel, Hohlraum |

## Schriften
| Familie | Gewicht | Datei (aus `../design-vorlagen/fonts/`) | Wofür |
| --- | --- | --- | --- |
| Barlow Condensed | 700 | `BarlowCondensed-700.woff2` | Kachelzeichen, Überschriften, Kaufknopf, Fahrplan-Titel |
| Barlow Condensed | 600 | `BarlowCondensed-600.woff2` | Navigation, Eyebrow, Spaltenköpfe, Namen |
| Barlow | 400 | `Barlow-400.woff2` | Fließtext |
| Barlow | 500 | `Barlow-500.woff2` | Preiszeile, Zitate |
Zusammen 87 KB. Lizenztexte `BarlowCondensed-LICENSE.txt` und `Barlow-LICENSE.txt` liegen im selben Ordner. Alle vier Dateien sind per `<link rel="preload">` vorgeladen, dazu gibt es im CSS Ersatzschriften in Arial-Breite (`Barlow Condensed Ersatz`, `Barlow Ersatz`), damit beim Schrifttausch nichts springt.

## So ist er gebaut

**1. Eine Kachel: zwei Hälften, das Zeichen kommt aus `data-c`**
Jede Hälfte zeigt per Pseudo-Element dasselbe Zeichen, nur ein anderes Stück davon. Das Pseudo-Element ist doppelt so hoch wie die Hälfte und oben beziehungsweise unten verankert.
```css
.h{position:absolute;left:0;right:0;height:50%;overflow:hidden;backface-visibility:hidden}
.h--o{top:0;border-radius:var(--r) var(--r) 0 0;background:linear-gradient(var(--kachel-oben),var(--kachel))}
.h--u{bottom:0;border-radius:0 0 var(--r) var(--r);background:linear-gradient(var(--kachel-unten),#1a1c20)}
.h::before{content:attr(data-c);position:absolute;left:0;right:0;height:200%;display:flex;
           align-items:center;justify-content:center;padding-bottom:calc(var(--kf)*.1)}
.h--o::before{top:0}  .h--u::before{bottom:0}
```
Größe nur über Variablen: `--kw` Breite, `--kh` Höhe (1,45 mal die Breite), `--kf` Schrift (0,88 mal die Höhe), `--kg` Abstand. Jede Tafelsorte (`tafel--h1`, `--preis`, `--zahl`, `--h2`, `--h3`, `--klein`, `--logo`) setzt nur diese Variablen. Das `padding-bottom:.1em` rückt die Großbuchstaben optisch in die Mitte (ohne es saßen sie bei 87 px Kachelhöhe etwa 6 px zu tief).

**2. Das fallende Blatt: ein Blatt, zwei Seiten, nur `transform`**
Beim Klappen liegt über der oberen Hälfte ein Blatt mit dem alten Zeichen vorn und dem neuen unteren Teil hinten. Es dreht sich um seine untere Kante um 180 Grad. Danach wird das Blatt entfernt, die untere Hälfte zeigt schon das neue Zeichen, es gibt keinen Sprung.
```css
.z{perspective:calc(var(--kh)*5)}
.klapp{position:absolute;left:0;right:0;top:0;height:50%;transform-origin:50% 100%;transform-style:preserve-3d;
       animation:klapp var(--dauer) var(--kurve) both}      /* --dauer:110ms; --kurve:cubic-bezier(.45,0,.2,1) */
.klapp .h{height:100%}
.klapp .h--u{bottom:0;transform:rotateX(180deg)}             /* Rückseite: neues Zeichen, untere Hälfte */
@keyframes klapp{from{transform:rotateX(0deg)}to{transform:rotateX(-180deg)}}
```
```js
function klappen(z, neu, verzoegerung, danach) {
  var alt = z.getAttribute('data-c'), o = z.children[0], u = z.children[1];
  o.setAttribute('data-c', neu);                       // oben liegt schon das neue Zeichen unter dem Blatt
  var k = document.createElement('span'); k.className = 'klapp';
  k.style.animationDelay = verzoegerung + 'ms';
  k.innerHTML = '<span class="h h--o" data-c="' + alt + '"></span><span class="h h--u" data-c="' + neu + '"></span>';
  z.appendChild(k);
  k.addEventListener('animationend', function () {
    u.setAttribute('data-c', neu); z.setAttribute('data-c', neu); k.remove(); if (danach) danach();
  }, { once: true });
}
```
Jede Kachel startet ihre Folge (2 bis 3 Zufallszeichen, dann das Ziel) mit `i * staffel` Millisekunden Verzögerung, `staffel = min(34, 720 / Anzahl)`. Eine Sicherung am Ende (`setTimeout`) setzt alle Kacheln auf das Zielzeichen, falls ein `animationend` ausbleibt.

**3. Text wird zu Kacheln, der Klartext bleibt**
Im HTML steht ganz normaler Text. `<br>` trennt Tafelzeilen, `<b>` färbt Zeichen als Status (Amber). Das Skript ersetzt den Inhalt durch einen unsichtbaren Klartext plus die Kacheln. Wörter sind eigene Gruppen (`.wort`), deshalb bricht die Tafel an Wortgrenzen um.
```html
<h1 id="titel" class="tafel tafel--h1">Weniger schnippeln.<br>Mehr Salat.</h1>
<p class="tafel tafel--klein">Zoll inklusive <b>OK</b></p>
<p class="tafel tafel--klein tafel--ok" aria-hidden="true">OK</p>   <!-- reine Zierde: kein Klartext -->
```
```js
el.textContent = '';
if (!versteckt) { var vh = document.createElement('span'); vh.className = 'vh'; vh.textContent = text; el.appendChild(vh); }
flaeche.setAttribute('aria-hidden', 'true');   // Kachelzeilen für Screenreader unsichtbar
el.appendChild(flaeche);
```
```css
.vh{position:absolute!important;width:1px;height:1px;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.tafel--ok .z{color:var(--amber)}      /* Statusanzeige OK */
```
Ohne JavaScript greift nur `.tafel{font:700 ... var(--font-tafel);text-transform:uppercase}`: die Seite zeigt Überschrift, Preis und Status als lesbaren Text.

**4. Genau einmal blättern: beim Sichtbarwerden, nie bei weniger Bewegung**
```js
var REDUZIERT = matchMedia('(prefers-reduced-motion: reduce)').matches;
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); starten(e.target.__tafel); } });
}, { rootMargin: '0px', threshold: 0.01 });          // sobald ein Pixel sichtbar ist
function starten(t){ if (document.hidden) { /* warten, bis der Tab sichtbar ist */ } else lauf(t); }
// REDUZIERT: Kacheln werden gleich mit dem Zielzeichen gebaut, .klapp ist per CSS ausgeblendet
window.addEventListener('beforeprint', function(){ tafeln.forEach(function(t){ endstand(t); }); });
```
Kein `requestAnimationFrame`, keine Endlosanimation: gemessen 0 rAF-Aufrufe pro Sekunde und 0 laufende Endlos-CSS-Animationen. Beim Drucken stehen sofort alle Zielzeichen da.

**5. Kachelbreite aus der Breite der Tafel (Container-Einheit)**
Die erste Zeile "WENIGER SCHNIPPELN." hat 17,5 Kachelbreiten plus Abstände. Damit sie nie umbricht, rechnet die Kachelbreite aus der Breite des Rahmens, nicht aus der Fensterbreite (die den Scrollbalken mitzählt).
```css
.anzeige{container-type:inline-size}
.tafel--h1{--kw:clamp(28px,calc((100vw - 190px)/18.4),60px)}                       /* Rückfall für alte Browser */
@supports (width:1cqw){.tafel--h1{--kw:clamp(28px,calc((100cqw - 52px)/18.3),60px)}}
@media (max-width:640px){ .tafel--h1{--kw:29px} }       /* am Handy brechen die Wörter in drei Zeilen um */
```

## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
Reihenfolge wie gefordert, nach jedem Durchgang Prüfskript und Bildschirmfotos. Von impeccable lag nur die `SKILL.md` vor, die Unterdateien (`reference/craft-floor.md` und andere) und das Startskript fehlten. Für impeccable galten deshalb die Kurzregeln aus dem Auftrag (Rollen, Hierarchie, gemessener Kontrast, sichtbarer Fokus). Für gpt-taste und emil-design-eng lagen die Dateien vor.

| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | H1-Tafel in der halben Spalte (580 px): 3 Kachelzeilen bei 1100 bis 1920 px | Eyebrow und H1 über die volle Breite, Text und Bild darunter: 2 Kachelzeilen von 820 bis 1920 px (gemessen bei 820, 1100, 1280, 1440, 1920) | Überschrift breit, höchstens 2 Zeilen auf dem PC |
| gpt-taste | Kaufknopf bei 1280 x 800 auf y 827 bis 887 (unter dem Bildrand), am Handy 390 x 844 auf y 846 | Status nach unten verschoben, Knopf bei y 696 bis 756 (PC) und y 754 bis 814 (Handy), beide im ersten Bildschirm | Blickführung Aufmerksamkeit (Tafel), Interesse (Bild, Untertitel), Verlangen (Preis), Handlung (Knopf) |
| gpt-taste | Abstände gemischt (56, 64, 28, 22, 20, 12 px), Abschnitt 56 oben und unten | Feste Stufen 4, 8, 16, 24, 40, 64, 96 px als `--s1` bis `--s7`, Abschnitt 64 oben und unten (Handy 40) | gleichmäßige, großzügige Abstände |
| gpt-taste | Zahlenkacheln: Text klebte unter der Zahl, leere Fläche unten in den Karten mit einzeiligem Text | `justify-content:space-between`: Zahl oben, Text unten, alle vier Karten gleich hoch und ohne Loch. Hero-Text links (484 px) und Bild (433 px) fast gleich hoch, davor war eine Seite deutlich länger und ließ eine Leerfläche unter dem Knopf. Alle vier Zahlenkarten 164 px hoch | lückenloses Raster ohne Löcher |
| gpt-taste | Kachelbreite der breiten H1 aus `vw` gerechnet: bei 820 und 1100 px brach sie auf 3 Zeilen um (gemessen) | Container-Einheit `cqw` aus der Rahmenbreite, Rückfall `vw` mit mehr Reserve: 2 Zeilen bei 820 bis 1920 px | kein Umbruch, kein Scrollbalken-Fehler |
| impeccable | "OK"-Kacheln (Funktionen und Status) waren warmweiß: `.z{color}` überschrieb `.tafel--ok`, Amber war nur im Kaufknopf | `.tafel--ok .z{color:var(--amber)}`. Gemessen: Amber auf Kachel 7,8:1 oben, 9,8:1 unten | Signalfarbe nur für Kaufknopf und Status, und sie muss dort auch ankommen |
| impeccable | Farben im Piktogramm als 6 feste Hexwerte im SVG | 5 Rollen als Klassen (`f-hell`, `f-licht`, `f-mittel`, `f-tief`, `f-aus`) mit Variablen in `.bild` | Jede Farbe hat eine Rolle, Umfärben an einer Stelle |
| impeccable | `:focus-visible{border-radius:4px}` machte den Kaufknopf (8 px) beim Fokus eckiger; Preis-Info 15 px; Lieferhinweis ohne eigenes Gewicht | Eckenregel entfernt, Fokusring 3 px warmweiß (15,7:1) an allen 13 Tab-Zielen gemessen; Preis-Info 16 px; Hinweisblock mit 6 px warmweißem Balken links | Fokus sichtbar, Pflichtangabe lesbar, ein Blickfang je Bereich |
| impeccable | Kontrast nur geschätzt | Eigenes Skript: kleinster Fließtext 7,2:1 (Nebentext auf Fläche), Kachelzeichen 11,8:1 bis 14,8:1, Knopfschrift 10,4:1 | Kontrast gemessen, nicht geglaubt |
| emil-design-eng | `transition:all .2s ease` auf Navigation, Warenkorb und Kaufknopf; Fokusring wurde mit animiert (nach Tab gemessen 0 px statt 3 px) | `transition:transform 160ms var(--ease-out)` mit `--ease-out:cubic-bezier(.23,1,.32,1)`, Fokusring erscheint sofort an allen Zielen | keine `all`-Übergänge, Tastatur-Fokus nie animieren |
| emil-design-eng | Kein `:active`, `:hover` überall, Kaufknopf animierte `box-shadow` | `:active{transform:scale(.97)}` (Knopf mit `translateY(1px)`) auf Knopf, Navigation, Warenkorb und Fußlinks; Hover nur in `@media (hover:hover) and (pointer:fine)`; Hover am Knopf nur `translateY(-2px)` | Rückmeldung beim Drücken, kein falscher Hover am Handy, nur `transform` und `opacity` |
| emil-design-eng | Sprunglink animierte `top` (200 ms), `scroll-behavior:smooth` ließ Tastatur-Sprünge gleiten, Blattkurve `ease` | Sprunglink ohne Animation (nur `transform` zum Verstecken), weiches Scrollen entfernt, Blatt mit `cubic-bezier(.45,0,.2,1)` (kein `ease-in`), Hover-Strich unter Navigationslinks per `scaleX(.5)` bis 1 mit `opacity` | Tastatur-Aktionen nie animieren, eigene Kurven, nie von Null starten |
| emil-design-eng | Je Kachel bis zu 5 Klappen (550 ms), der Warenkorb-Zähler sprang ohne Rückmeldung | höchstens 4 Klappen je Kachel (440 ms, unter der Grenze von 3 Blitzpaaren je Sekunde), Zähler klappt einmal in 160 ms (nur `transform` und `opacity`, bei weniger Bewegung aus) | Staffel unter 40 ms, kurze Dauer, ruhiger Rhythmus |

Konflikte: gpt-taste verlangt Hover-Skalierung 1,05, Scroll-Pinning, GSAP und Laufbänder; das kollidiert mit der ruhigen Tafel, dem Verbot von Bibliotheken und der Regel "nichts läuft endlos", deshalb gibt es davon nichts. gpt-taste verbietet Zahlen im Hero, der Look braucht aber Preis und Lieferstatus, deshalb stehen sie als Tafel unter dem Fließtext und nicht als Kennzahlenleiste. emil-design-eng will UI unter 300 ms und kein `ease-in`: ein Klappen dauert 110 ms mit Ein-und-Aus-Kurve, die Gesamtfolge der Tafel (1,2 bis 1,8 s, einmalig) ist die vom Look verlangte erklärende Bewegung. Die Regeln des Nutzers (ein Kaufknopf, keine Gedankenstriche, Verbotsliste, Barrierefreiheit) haben überall Vorrang.

## Pro
- Der Look ist in einer Sekunde erkennbar und passt zum Lieferstatus: Tafel, Fahrplan "GLEIS 1 bis 3" und Zahlenleiste erzählen Ablauf und Eckdaten, ohne ein einziges Foto.
- Der Kaufknopf ist die einzige gefüllte Signalfläche der Seite. Er liegt bei 1280 x 800 auf y 696 bis 756 und am Handy (390 x 844) auf y 754 bis 814, also im ersten Bildschirm.
- Gut lesbar: Kachelzeichen 11,8:1 bis 14,8:1, Fließtext 7,2:1 bis 15,7:1. Die H1 steht von 820 bis 1920 px in 2 Zeilen, am Handy in 3 mit höchstens 11 Kacheln.
- Leicht: HTML 15 KB, CSS 18,9 KB, JS 7,4 KB (zusammen 42 KB), Schriften 87 KB. 0 rAF-Aufrufe, 0 Endlosanimationen, alles per CSS-Transform.
- Ohne JavaScript bleibt Überschrift, Preis und Status als normaler Text lesbar (geprüft per Bildschirmfoto), bei "weniger Bewegung" sofort fertig und ruhig.
- Das Blättern ist eine kleine, sinnvolle Belohnung beim ersten Blick, danach steht alles still. Die H1 ist nach etwa 1,5 s fertig.

## Contra
- Nur kurze Wörter gehören in Kacheln. Ein Wort bricht nicht um: bei 390 px passen etwa 11 große oder 14 kleine Kacheln in eine Zeile. Längere Wörter (zum Beispiel "Widerrufsbelehrung") laufen über und müssen als Fließtext stehen.
- JavaScript baut die Kacheln: 213 Kacheln, nach dem Bau 993 Elemente im Dokument, während des Blätterns drei weitere je Kachel. Das ist bei diesem Umfang unproblematisch, bei langen Texten nicht.
- Vor dem Blättern stehen auf Tafeln außerhalb des Bildes Zufallszeichen. Wer die Seite druckt, mit einem Werkzeug fotografiert oder sehr schnell springt, sieht sie. Gegen das Drucken hilft der `beforeprint`-Handler, sonst nichts.
- Bewegung ist der Kern des Looks und für manche störend. Pro Kachel sind es 4 Klappen in 440 ms (2 Blitzpaare, unter der Grenze von 3 je Sekunde). Das ist eingehalten, aber nicht großzügig: mehr Zufallszeichen oder schnellere Klappen würden die Grenze reißen.
- Großschreibung und Sperrung: alles auf Kacheln wird zu Großbuchstaben ("27 CM", "ß" wird "SS"). Einheiten und Eigennamen verlieren ihre Schreibweise, und breite Kacheln mit schmalen Zeichen wirken locker gesetzt.
- Aufwand: eigener Kachelbauer, 3D-Blatt, Größenvarianten je Tafelsorte und ein selbst gezeichnetes Piktogramm. Kleine Phone-Breiten (320 und 360 px) brauchten eigene Regeln, bei 320 px bricht die Navigation in zwei Zeilen.

## Eignung für Ein-Produkt-Shops
| Kriterium | Note | Begründung |
| --- | --- | --- |
| Kaufwirkung | 4 | Amber ist nur beim Knopf voll, die Tafel fesselt, wirkt aber eher sachlich als verführerisch. |
| Lesbarkeit | 4 | Kacheln 11,8:1 und Fließtext normal gesetzt, nur Wörter über 11 Zeichen sind ein Problem. |
| Handy | 4 | Kachelzeilen mit höchstens 11 Zeichen, Knopf im ersten Bildschirm, bei 320 px zweizeilige Navigation. |
| Tempo | 4 | 42 KB ohne Schriften und nur CSS-Transform, aber 993 Elemente und JavaScript vor dem ersten Bild der Tafel. |
| Barrierefreiheit | 4 | Klartext, Fokus, reduzierte Bewegung und Kontrast sind sauber, die Blätterbewegung bleibt Geschmackssache. |
| Aufwand | 3 | Skript, 3D-Blatt und Größenvarianten sind viel Arbeit je neuem Shop, die Vorlage spart das Meiste. |
| Risiko | 3 | Lange Wörter, ausgefallene Skripte (Zufallszeichen) und die Blitzgrenze brauchen Aufmerksamkeit bei jeder Änderung. |

## Passt besonders zu
Küchen- und Haushaltsgeräten, Werkzeug und Technik mit klaren Eckdaten (Leistung, Maße, Lieferzeit), Reise- und Gepäckprodukten, allem, was einen Ablauf in drei Schritten hat.

## Passt nicht zu
Pflege, Baby, Mode, Genuss und Geschenken, die Wärme brauchen, und zu Produkten mit sehr langen Namen oder Überschriften.

## Stolperfallen
- `.z{color}` überschrieb die Farbe von `.tafel--ok`: Die "OK"-Kacheln blieben warmweiß. Gefunden nur auf dem Bildschirmfoto. Regel: `.tafel--ok .z{color:var(--amber)}`.
- `transition:all` animierte auch den Fokusring. Nach Tab war er einen Moment lang 0 px stark (gemessen), Tastatur-Fokus muss sofort stehen.
- Kachelbreite aus `100vw` rechnete den Scrollbalken und das Innenpolster nicht mit: bei 1100 px brach die H1 auf 3 Zeilen um. Besser Container-Einheiten (`cqw`).
- Die Navigation lief am Handy über (Seite 431 px bei 390 px Fenster), später auch bei 360 und 320 px. Lösung: 15 px Schrift, kleine Innenabstände, bei 340 px Umbruch in zwei Zeilen. Zwischen 720 und 900 px gab es keinen Überlauf (Kopfzeile ab 961 px einzeilig, darunter zweizeilig, geprüft von 700 bis 1000 px in 20-px-Schritten).
- Tafeln am Bildrand zeigten Zufallszeichen: Start bei 20 % Sichtbarkeit und 6 % Randabzug war zu spät. Jetzt `threshold:.01` ohne Randabzug.
- `filter:drop-shadow` pro Kachel (213 Stück) ist teuer und flacht 3D ab. Stattdessen `box-shadow` am Kachelrahmen. `perspective` gehört auf die Kachel, `preserve-3d` auf das Blatt, `backface-visibility:hidden` auf beide Seiten des Blatts.
- Zeichen saßen im flex-zentrierten Zeilenkasten etwa 6 px zu tief (Großbuchstaben liegen über der Mitte der Zeilenhöhe). `padding-bottom:.1em` am Zeichen-Pseudo-Element behebt es.
- Volle Seiten-Bildschirmfotos während schnellen Scrollens zeigen Zufallszeichen. Zum Prüfen langsam scrollen und 2 s warten, oder `prefers-reduced-motion` einstellen.
- Ein Element mit `aria-hidden="true"` bekommt im Skript keinen Klartext (gewollt für Zierde wie die OK-Kacheln der Funktionszeilen). Wer das auf eine wichtige Tafel setzt, macht sie für Screenreader unsichtbar.
- Ein einziges Wort mit mehr als 11 großen Kacheln (zum Beispiel "BEWERTUNGEN" in 24-px-Kacheln bei 320 px) liegt an der Grenze. Kachelgröße der Überschriften notfalls mit `cqw` verkleinern.
- Layoutverschiebung (CLS 0,305 in Lighthouse mobil): Schuld waren nicht die Kacheln, sondern die zwei nicht vorgeladenen Schriften (Barlow Condensed 600, Barlow 500), deren breitere Ersatzschrift die Eyebrow-Zeile umbrechen ließ und die Seite beim Tausch um 16 px nach oben schob (gemessen mit PerformanceObserver, auch ohne `script.js` blieb der Wert bei 0,305). Lösung: alle vier Schriften per Preload, Ersatzschriften in Arial-Breite mit `size-adjust`, `nowrap` an Eyebrow und Navigation und vor dem Kachelbau `line-height:var(--kh)`, damit eine Textzeile so hoch ist wie die Kachelzeile. Danach CLS 0 (bei um 1,5 s verspäteten Schriften 0,0005, bei verspätetem Skript 0,002) und Performance 96 bis 100 statt 84.

## Anwenden
1. `vorlage/style.css` und `vorlage/script.js` in den Shop kopieren (`assets/`). Farben nur in `:root` ändern. Rollen beibehalten: Amber ausschließlich für Kaufknopf und "OK".
2. Schriften aus `../design-vorlagen/fonts/` kopieren: `BarlowCondensed-600.woff2`, `BarlowCondensed-700.woff2`, `Barlow-400.woff2`, `Barlow-500.woff2` samt Lizenzdateien, `@font-face`-Pfade im CSS anpassen, `font-display:swap` lassen, die Ersatzschriften (`... Ersatz`) im CSS mitnehmen und alle vier Dateien per `<link rel="preload" as="font" crossorigin>` vorladen.
3. Klassen der Demo: `.tafel` mit `--h1`, `--preis`, `--zahl`, `--h2`, `--h3`, `--klein`, `--logo`, `--ok`; Attribute `data-ruhig` (kein Blättern) und `aria-hidden="true"` (Zierde ohne Klartext); in der Tafel `<br>` für neue Zeile und `<b>` für Amber-Status. Seite: `.kopf .logo .nav .korb`, `.hero .anzeige .hero__raster .hero__text .hero__bild .bild`, `.preisblock`, `.status .status__zeile`, `.cta`, `.zahlen .zahl-kachel`, `.brett .reihe`, `.fahrplan .gleis`, `.meldungen .meldung .marke`, `.hinweis`, `.fuss`. Das Skript am Ende von `<body>` laden (nicht `defer`, damit die Kacheln vor dem ersten Bild stehen).
4. Passend zu den Haken des Skills `ein-produkt-shop`: Die Demo hat eigene Namen. Im Shop entweder die Selektoren im CSS ergänzen (zum Beispiel `.cta,.knopf{...}`, `.zahl-kachel,.kachel{...}`, `.korb`) oder im HTML umbenennen. Die Schritte zum Wechsel (Schriften, `style.css`, Logo, Hintergrund, Favicon, Vorschaubild) stehen in `../design-vorlagen/references/umstellen.md`. Dort `WELT` leer lassen (der Grund kommt aus dem CSS) und `theme-color` auf #15161a setzen.
5. Hero-Bild neu zeichnen: SVG im Zeichenraum 640 x 480 mit Farbklassen `f-hell`, `f-licht`, `f-mittel`, `f-tief`, `f-aus`, Inhalt zwischen y 40 und 435, damit eine Kürzung am Handy nichts abschneidet.
6. Danach prüfen: Zeilen der H1 bei 820, 1100, 1280, 1440 und 1920 px (soll 2 sein), Kacheln je Zeile bei 390 px (höchstens 11 bis 14), Kopfzeile von 700 bis 1000 px, Kontrast, Tab-Fokus, `prefers-reduced-motion` (alle Zielzeichen sofort), Seite ohne JavaScript, kein waagerechter Überlauf bei 320, 390, 820 und 1280 px.

## Dateien
- `vorlage/demo.html` (HORTA-Startseite, 15 KB)
- `vorlage/style.css` (18,9 KB)
- `vorlage/script.js` (Kachelbauer, Blättern, Warenkorb-Zähler, 7,4 KB)
- Schriften: `../design-vorlagen/fonts/BarlowCondensed-600.woff2`, `BarlowCondensed-700.woff2`, `Barlow-400.woff2`, `Barlow-500.woff2`
