# Gestaltung: Aufbau, Farbe, Glas, Schrift, 3D-Produkt, Handy

Ergebnisse der Durchgänge mit gpt-taste, apple-design und impeccable, verallgemeinert. Werte in Klammern stammen aus der
Referenz (`referenz/shop/assets/style.css`) und lassen sich direkt übernehmen.

## Inhalt
1. Grundidee: Produkt als Bühne
2. AIDA-Aufbau und Abschnittsbausteine
3. Goldener Schnitt
4. Farbe für Aufmerksamkeit
5. Glas im Apple-Stil
6. Schrift
7. Welt im Hintergrund
8. 3D-Produkt aus CSS
9. Handy als eigener Entwurf
10. Was wir verworfen haben

## 1. Grundidee
Die Seite ist eine ruhige, dunkle Welt. Das einzig Warme und Helle ist das Produkt, sein Preis und der Kaufknopf.
Alles andere tritt zurück. So steht das Produkt im Vordergrund, und die Seite wirkt trotzdem entspannend.
Die gewünschte Stimmung (bei HELIA "futuristisch, entspannend, leicht dystopisch") entsteht im Hintergrund
(Himmel, Stadt, Regen), nie auf Kosten der Lesbarkeit.

## 2. AIDA-Aufbau
- Aufmerksamkeit: Kopfbereich "Cinematic Center": Text mittig, Überschrift sehr breit (höchstens zwei Zeilen,
  `clamp(3rem,7vw,6.2rem)`, Laufweite -0,035em), darunter das große 3D-Produkt als Bühne mit Lichtschein dahinter.
  Preis mit allen Pflichtangaben direkt neben dem einen Kaufknopf. Kleine Glas-Kärtchen mit drei Vorteilen schweben neben dem
  Produkt (am Handy als wischbare Leiste).
- Interesse: Laufband mit Stichworten (gefüllte Schrift mit wenig Deckkraft, keine Umriss-Schrift, die überlappt), dann vier
  Glas-Kacheln "Auf einen Blick" mit großen Zahlen, die beim Hineinscrollen hochzählen. Eine Geschichte in einem Satz, der Wort
  für Wort hell wird.
- Verlangen: ein Abschnitt, in dem man das Produkt ausprobiert (Regler, Simulation, Klang zum Probehören), Funktionen als
  lückenloses Bento-Raster, ein Ablauf als waagerechtes Akkordeon, Technik als Kartenstapel, Bewertungen.
- Handlung: Angebot als zwei Glasflächen im goldenen Schnitt (Bild 1,618 : Box 1 oder umgekehrt), Paketwahl als große
  Optionen, Mengen-Stepper, Summe, Kaufknopf, drei Fakten (Versand, Zahlung, kostenlos ab), Kleingedrucktes. Danach Fragen
  und ein ruhiger Abschied.
- Große Abstände zwischen Kapiteln (11rem), damit jedes Kapitel wie eine eigene Szene wirkt.
- Keine billigen Etiketten wie "ABSCHNITT 01" oder "FRAGE 05". Nur der Produktname klein über der Hauptüberschrift.

## 3. Goldener Schnitt
- Abstände als Reihe 0,382 / 0,618 / 1 / 1,618 / 2,618 / 4,236 / 6,854 / 11,09 rem (`--s1` bis `--s8`).
- Zweispaltige Teile im Verhältnis 1 : 1,618 (`grid-template-columns:1fr 1.618fr`).
- Das Produkt sitzt auf einer Drittel- oder Goldlinie, nicht in der toten Mitte, außer im zentrierten Kopfbereich.

## 4. Farbe für Aufmerksamkeit
Fünf Farben. Das Prinzip ist der Isolationseffekt (von Restorff): Das eine abweichende Element wird zuerst gesehen und
besser erinnert.
- Grund kühl und dunkel (`--nacht #070a1a`, `--nebel #8c93b8`), Text in drei Hellstufen.
- Signalfarbe NUR für Kaufknopf und Auswahl (`--rot #ff6a3d`). Sie kommt sonst nirgends vor.
- Warme Akzentfarbe für Produktlicht, Preis und kursive Akzentwörter (`--honig #ffc27a`).
- Kühle Hilfsfarbe für Fokusrahmen und "geprüft"-Marken (`--neon #5fe3e6`).
- Kaufknopf mit ruhigem Glühen im Takt des Produkts (nur Deckkraft einer Extra-Schicht animieren, 7 s).
- Für ein anderes Produkt: Signalfarbe aus der Produktwirkung ableiten (Wärme, Frische, Energie) und die Rollen beibehalten.

## 5. Glas im Apple-Stil
- Kopfleiste: durchgehende Glasleiste, Navigation mittig als Pille, aktiver Abschnitt hervorgehoben.
- Glasfläche: leichter Verlauf von oben, halbtransparenter Grund, 1px Kante, obere Kante heller ("Lichtkante"),
  `backdrop-filter: blur(28px) saturate(160%)`, gestaffelte Schatten (innen oben hell, unten dunkel, außen weich und tief).
  Werte: `.glas` und `--schatten` in der Referenz.
- Große Radien (28px, groß 40px), Knöpfe als Pillen.
- Keine Körnung, keine Pixel-Muster, keine Neonschilder. Der Nutzer empfand das als "verpixelt".
- `prefers-reduced-transparency`: feste Flächen statt Glas. `prefers-contrast: more`: kräftigere Kanten und Texte.

## 6. Schrift
- Überschriften: eine geometrische Display-Schrift mit Charakter, fett (Referenz: Outfit Bold).
- Akzentwörter: kursive Serifenschrift mit Verlauf (Referenz: Instrument Serif Italic, Klasse `.leucht`).
- Fließtext: gut lesbare Grotesk (Referenz: Instrument Sans).
- Zahlen von Uhren und Displays: Monospace (Referenz: Geist Mono).
- Alle Schriften OFL-lizenziert, als woff2 selbst gehostet, Lizenztext daneben. Herunterladen zum Beispiel über die
  Pakete `@fontsource/<name>` von jsDelivr (nur einmalig beim Bauen, nie zur Laufzeit). Teilmengen (Latin) reichen.
- Verboten: Inter, Roboto, Arial, Open Sans als sichtbare Schrift.
- `text-wrap: balance` für Überschriften.

## 7. Welt im Hintergrund
- Fester Hintergrund (`.welt`) mit Himmel aus drei Farbvariablen, die JavaScript beim Scrollen weich angleicht
  (Nacht oben, Morgen beim Erlebnis-Abschnitt, Nacht im Abschied). Variablen nur am Hintergrund setzen und nur bei Änderung,
  nie an `<html>` (sonst rechnet die ganze Seite neu).
- Stadt-Silhouetten in drei Ebenen, weichgezeichnet, verschieben sich leicht mit Maus und Scroll (Tiefe).
- Regen auf einer Zeichenfläche (canvas) mit 30 Bildern pro Sekunde, auf Touch-Geräten halb so viele Tropfen, Pause bei
  offenem Dialog oder verstecktem Tab.
- Für ein anderes Produkt eine andere Welt wählen, die zur Stimmung passt (Meer, Wald, Weltall), aber gleich zurückhaltend.

## 8. 3D-Produkt aus CSS
Ein in CSS gebautes Produkt ersetzt das fremde Foto im Kopfbereich und wirkt hochwertiger. Bauweise (`.l3d` in der Referenz):
- Aufbau: `.l3d[data-dreh] > .l3d__buehne (perspective:1100px) > .l3d__skala (scale(var(--gr))) > .l3d__objekt
  (transform-style:preserve-3d)`, darin flache Flächen `<i>`.
- Ein Quader oder Kegelstumpf entsteht aus vier Seiten: `rotateY(k*90deg) translateZ(halbe Breite)`. Schräge Seiten mit
  `clip-path` als Trapez und kleinem `rotateX`. Deckel und Boden mit `rotateX(90deg)`.
- Licht: JavaScript setzt pro Fläche `--hell` aus dem Winkel zur Kamera (cos), CSS nutzt `filter: brightness(var(--hell))`.
- Bedienung: mit Maus oder Finger ziehen (Pointer Capture, Schwung aus den letzten 100 ms, weiches Ausrollen
  `tempo *= 0.04^dt`), Pfeiltasten drehen in 20°-Schritten, langsames Eigendrehen, rechnet nur, solange sichtbar.
  `touch-action: pan-y`, damit man am Handy trotzdem senkrecht scrollen kann.
- WICHTIG: Das Modell ist kein Text. `user-select:none` und `-webkit-user-drag:none` auf dem Modell und allen Kindern,
  `dragstart` und `selectstart` verhindern, bei `pointerdown` `preventDefault()` und eine bestehende Markierung aufheben,
  nur die linke Maustaste dreht. Sonst lässt sich zum Beispiel eine Uhrzeit auf dem Display beim Drehen markieren und
  herausziehen (gemeldeter Fehler).
- `role="img"`, `aria-label` mit Bedienhinweis, `tabindex="0"`, Hinweis "Zum Drehen ziehen" darunter.
- Kopfbereich: Das Produkt "geht beim Laden an" (bei HELIA Glut zu Gold in etwa 2,6 s), danach ruhig.
- Für andere Produkte: Flasche (Zylinder aus 12 bis 16 schmalen Flächen), Box, Uhr, Kopfhörer (Bügel als SVG-Fläche).
  Lieber einfach und sauber als detailliert und wackelig. Bildschirmfoto aus mehreren Winkeln prüfen.

## 9. Handy als eigener Entwurf
- Kopfbereich: Überschrift kleiner, Kaufknopf volle Breite, Vorteils-Kärtchen als wischbare Leiste unter dem Produkt.
- Erlebnis-Abschnitt kompakter: Produkt oben klein, Text und Bedienung darunter, Erklärsatz weglassen.
- Kartenstapel wird zur normalen Liste, Bento zu einer Spalte, waagerechtes Akkordeon zu einem senkrechten.
- Kaufleiste unten (Preis plus Knopf), erscheint erst, wenn der obere Knopf aus dem Bild ist, und verschwindet beim Angebot.
- Menü als Glasfläche, klappt aus der Kopfleiste herunter, Symbol wird zum X.
- Knöpfe mindestens 44px hoch, kein seitliches Überlaufen (`overflow-x: clip` auf `main`).

## 10. Was wir verworfen haben (nicht wieder einbauen)
- Streichpreis mit UVP (rechtswidrig bei Eigenmarke).
- Lichtkegel über einer Lampe, deren Oberseite geschlossen ist (physikalisch falsch, fiel dem Nutzer auf).
- Umriss-Schrift im Laufband (Buchstaben überlappen sichtbar).
- Kärtchen, die in 3D um das Produkt kreisen (unscharf, verdecken das Produkt). Besser 2D-Kärtchen mit Tiefe zur Maus.
- Kartenstapel mit Ausblenden per Deckkraft (Text der hinteren Karte scheint durch). Besser `filter: brightness()` und
  deckender Grund.
- Zwei Knöpfe im Kopfbereich (gpt-taste-Vorgabe), die Grundregel "eine Handlungsaufforderung" geht vor.
