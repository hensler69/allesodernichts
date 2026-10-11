# So vergleichst und empfiehlst du Looks

Diese Datei brauchst du, wenn Manuel wissen will, welcher Look zu seinem Produkt passt, wenn er zwei oder mehr Looks vergleichen will oder
wenn ein neuer Shop einen Look braucht. Am Ende steht eine Antwort mit Rangliste, Pro und Contra und einer klaren Empfehlung.
Die Looks selbst stehen in `katalog.md`, die fertige Wertung für das Testprodukt HORTA in `empfehlung-horta.md`.

Der Ablauf in sechs Schritten:
1. Fragen stellen (Teil a). Was Manuel schon gesagt hat, fragst du nicht noch einmal.
2. Vorauswahl treffen: in `katalog.md` im Abschnitt "Wenn das Produkt ... ist" nachsehen, dazu die Spalten "Passt zu" und "Passt nicht zu". Zwei bis fünf Looks bleiben übrig.
3. Gewichte einstellen und Punkte rechnen (Teil b).
4. Regeln gegen Fehlentscheidungen anwenden (Teil d) und prüfen, ob eine Mischung sinnvoll ist (Teil e).
5. Antwort nach der festen Vorlage schreiben (Teil c).
6. Entscheidung festhalten (Notiz in `notes/`, Satz in `CLAUDE.md`) und den Skill-Verbund einplanen (Teil f).

Wie du mit Manuel sprichst: einfaches Deutsch, Fachwörter im selben Satz erklären, die Antwort mit "Manuel" beginnen. Er sieht nur den Chat. Zeige
Bildschirmfotos oder Links, nenne keine Dateipfade. Wenn Manuel schon einen Look nennt ("mach es neon"), geht sein Wunsch vor. Du vergleichst ihn
trotzdem ehrlich mit den besten Alternativen und nennst sein Contra, aber du lehnst ihn nicht ab.

## a) Die Fragen an den Nutzer, in dieser Reihenfolge

Stelle zwei bis drei Fragen auf einmal als Auswahlfrage (Empfehlung zuerst, mit "(Empfohlen)"), nicht alle acht in einem Block. Fragen, deren Antwort
schon klar ist (zum Beispiel aus `CLAUDE.md` oder dem Produkt), überspringst du und nennst die Annahme in einem Satz.

| Nr. | Frage in einfachen Worten | Warum du fragst | Was die Antwort verändert |
| --- | --- | --- | --- |
| 1 | Was für ein Produkt ist es? (Küche, Technik, Pflege, Geschenk, Spielzeug, Möbel, Mode ...) | Die Produktart bestimmt die Vorauswahl | Vorauswahl aus `katalog.md`, Note für Passung |
| 2 | Was soll es kosten? | Der Preis entscheidet, welcher Ton glaubwürdig ist. Edle Looks brauchen einen Preis, der sie trägt | Note für Vertrauen. Faustregel (nicht gemessen): bei günstiger Ware lieber klar und freundlich als edel oder laut |
| 3 | Wer kauft? Alter, und eher am Handy oder am PC? | Ältere Kundschaft braucht ruhige, große Schrift. Handy-Kundschaft braucht einen leichten Look | Gewicht Handy und Lesbarkeit, Warnungen bei Flimmern und Schein auf Dunkel |
| 4 | Wie bekannt ist die Marke? | Eine unbekannte Marke muss Vertrauen aufbauen | Gewicht Vertrauen 3. Verspielte Looks nur mit ruhiger Kasse |
| 5 | Kommt die Ware aus China oder ist es Dropshipping? | Lieferzeit, Zoll und Bildrechte sind dann Teil der Seite | Vertrauen, der Hinweisblock "Lieferung aus China", Frage 6 |
| 6 | Gibt es gute Fotos, die du verwenden darfst, oder soll alles gezeichnet werden? | Alle 18 Demo-Looks arbeiten mit einer gezeichneten Hero-Fläche. Fotos fremder Shops sind nur im Entwurf erlaubt | Zeichnungs-Look oder Look mit Foto-Platz, Aufwand für die Zeichnung |
| 7 | Wie viel Aufwand darf jedes Produkt machen? | Manche Looks brauchen pro Produkt Stunden für eine neue Zeichnung | Gewicht Aufwand, Note für Aufwand |
| 8 | Kommen weitere Produkte im selben Look? | Dann zählt der Aufwand doppelt | Gewicht Aufwand 2, Vorlage statt Einzelanfertigung |

## b) Das Bewertungsraster

Jeder Look bekommt für jedes der acht Kriterien eine Note von 1 bis 5 (5 ist sehr gut). Die Gewichte sagen, wie wichtig das Kriterium ist.

| Kriterium | Gewicht | Was gemeint ist | Note 5 heißt | Note 1 heißt |
| --- | --- | --- | --- | --- |
| Passung | 3 | Passt die Stimmung des Looks zur Produktart? | Die Produktart steht in "Passt besonders zu" | Die Produktart steht in "Passt nicht zu" |
| Vertrauen | 2 | Wirkt der Look seriös genug für Preis, Marke und Zahlung? | Ruhig, klar, vertraut | Wirkt wie Spielerei oder Bastelprojekt, besonders an der Kasse |
| Produktwirkung | 2 | Zeigt die Zeichnung das echte Produkt und macht sie Lust zu kaufen? | Gerät sofort erkennbar, Teile und Ablauf sichtbar | Gerät kaum zu erkennen oder sieht nach etwas anderem aus |
| Lesbarkeit | 2 | Kontrast, Schriftgröße, Zeilenlänge | Fließtext mindestens 7 zu 1, nichts auf bewegtem Grund | Breite Spezialschrift, Schein oder Raster stören beim Lesen |
| Handy | 2 | Eigener Entwurf, Kaufknopf im ersten Bildschirm, große Tippflächen, Seitenlänge | Alles im ersten Bild, Seite kurz | Kaufknopf weit unten, sehr lange Seite, Effekt fällt aus |
| Technik | 1 | Lighthouse, Gewicht, Layoutverschiebung, Browser-Risiko | 100/100/100, unter 60 KB, keine Verschiebung | Leistung unter 95 oder spürbare Verschiebung |
| Aufwand | 1 | Was kostet ein neues Produkt? 5 bedeutet wenig Aufwand | Wenige Formen neu setzen | Neue Szene von Hand, mehrere Stunden |
| Risiko | 1 | Was kann bei echten Besuchern schiefgehen? 5 bedeutet geringes Risiko | Keine teuren Effekte, wenig Pflege | Schwache Handys, Flimmern, Browser, Rechtliches |

**Formel:** Punkte = Summe aus (Gewicht mal Note), geteilt durch (5 mal Summe aller Gewichte), mal 100. Mit den Standardgewichten ist die Summe
der Gewichte 14, die Höchstzahl 70. Beispiel Isometric für HORTA: 3 mal 5, 2 mal 4, 2 mal 4, 2 mal 5, 2 mal 4, 1 mal 5, 1 mal 2, 1 mal 4 ergibt 60,
60 geteilt durch 70 mal 100 sind 86 Punkte (auf ganze Zahlen gerundet). Gleiche Punktzahl heißt gleich gut: Nenne beide und sage in einem Satz, was sie unterscheidet.

### So verschieben sich die Gewichte
Verschiebe nur diese vier Gewichte, nicht mehr, sonst wird das Ergebnis Geschmackssache. Die Höchstzahl wird dabei immer neu berechnet
(5 mal Summe der Gewichte).

| Wenn ... | dann | Summe der Gewichte | Höchstzahl |
| --- | --- | --- | --- |
| die Ware günstig ist oder die Marke unbekannt | Vertrauen auf 3 (Passung bleibt bei 3) | 15 | 75 |
| das Produkt ein Gerät mit Technikmerkmalen ist (Leistung, Maße, Einsätze) | Produktwirkung auf 3 | 15 | 75 |
| viel Handy-Verkehr erwartet wird | Handy auf 3 | 15 | 75 |
| mehrere Produkte geplant sind | Aufwand auf 2 | 15 | 75 |
| mehrere Fälle zusammentreffen | alle genannten Änderungen zusammen | bis zu 18 | bis zu 90 |

### Woher die Noten kommen
- Für die 18 Demo-Looks liegen Startnoten für HORTA in `empfehlung-horta.md` und maschinenlesbar in `bewertung-horta.json`.
- **Passung, Vertrauen und Produktwirkung** hängen vom Produkt ab: Neu vergeben. Passung 5, wenn die Produktart bei "Passt besonders zu" steht (`katalog.md`),
  4 bei naher Verwandtschaft, 3 wenn der Look weder empfohlen noch ausgeschlossen ist, 2 bei Ähnlichkeit mit den ausgeschlossenen Produkten, 1 wenn die Produktart bei "Passt nicht zu" steht.
- **Lesbarkeit, Handy, Technik, Aufwand und Risiko** ändern sich kaum mit dem Produkt. Übernimm die Startnoten, prüfe nur den Aufwand neu (ein Produkt mit mehr Teilen
  ist teurer) und die Technik, wenn schon Messwerte aus `scripts/messen.py` vorliegen.
- Die Tabelle "Eignung für Ein-Produkt-Shops" im jeweiligen `references/look-<slug>.md` ist die Quelle der Look-Autoren (dort heißen die Kriterien Kaufwirkung, Lesbarkeit,
  Handy, Tempo, Barrierefreiheit, Aufwand, Risiko). Sie hilft bei Zweifeln, ersetzt aber die Noten oben nicht.
- Für Glas im Apple-Stil, Neo-Brutalism und den KI-Vorlagen-Look gibt es keine Startnoten. Wenn Manuel sie in den Vergleich haben will, vergib die Noten aus
  `look-glas-apple.md` und `look-neo-brutalism.md` und schreibe dazu, dass Technik und Handy nicht in derselben Reihe gemessen wurden.

### Neu rechnen (Beispiel)
Der folgende Schnipsel liest die Startnoten, verschiebt ein Gewicht und ändert Noten für das neue Produkt. Er ändert keine Datei.
Er läuft im Projektordner mit `python3`.

```python
import json
b = json.load(open(".claude/skills/design-vorlagen/references/bewertung-horta.json", encoding="utf-8"))
w = dict(b["gewichte"])
w["Vertrauen"] = 3                      # Gewichte verschieben (Beispiel: unbekannte Marke)
aenderungen = {"art-deco": {"Passung": 5}, "isometric": {"Passung": 3}}   # neue Noten für das neue Produkt
erg = []
for l in b["looks"]:
    n = dict(l["noten"]); n.update(aenderungen.get(l["slug"], {}))
    erg.append((sum(w[k] * n[k] for k in w) / (5 * sum(w.values())) * 100, l["name"]))
for i, (p, name) in enumerate(sorted(erg, reverse=True)[:5], 1):
    print(i, name, round(p))
```

## c) Die feste Vorlage für deine Antwort

Halte dich an diese Reihenfolge. Sie ist bewusst kurz: drei Looks, nicht mehr, sonst kann Manuel nicht entscheiden. Weitere Looks zeigst du nur auf Nachfrage.

```
Manuel, <ein Satz mit der Empfehlung: "für <Produkt> passt <Look> am besten, weil ...">.

**Rangliste (Punkte von 100)**
1. <Look>: <Punkte>
2. <Look>: <Punkte>
3. <Look>: <Punkte>   (bei gleicher Punktzahl dazuschreiben: "gleichauf mit Platz 2")

**<Look 1> (<Punkte>)**
| Pro | Contra |
| --- | --- |
| <konkreter Punkt mit Zahl> | <konkreter Punkt mit Zahl> |
| <konkreter Punkt> | <konkreter Punkt> |
| <konkreter Punkt> | <konkreter Punkt> |
(3 bis 4 Zeilen)

**<Look 2> (<Punkte>)**   dieselbe Tabelle
**<Look 3> (<Punkte>)**   dieselbe Tabelle

**Meine Empfehlung:** <Look>, weil <zwei Gründe>. Nimm stattdessen <Look>, wenn <Bedingung, zum Beispiel "viele Produkte folgen">.

**Wie es weitergeht** (Auswahlfrage, die empfohlene Antwort steht zuerst und trägt "(Empfohlen)"):
- Vorlage laden und die Demo ansehen (Empfohlen): ich zeige dir Bildschirmfotos für PC und Handy
- Entwurf als Design-Entwurf in der Design-Fläche bauen, zum Anschauen und Teilen
- Direkt in den Shop einbauen (bei einem bestehenden Shop mit Wechselplan)

**Was ich nicht weiß:** <ein Satz, zum Beispiel "gemessen nur in Chromium, nicht auf echten Handys, nicht in Safari und Firefox">.
```

Regeln für die Tabellen:
- Pro und Contra stammen aus den Abschnitten "Pro" und "Contra" in `references/look-<slug>.md`. Wähle die 3 bis 4 wichtigsten für dieses Produkt, nicht die ersten.
- Jeder Punkt ist konkret und kurz (höchstens etwa 20 Wörter) und hat wenn möglich eine Zahl (Kontrast, KB, Aufwand). Fachwörter erklärst du beim ersten Mal: Lighthouse
  ist ein Messwert von Google für Tempo und Bedienbarkeit, 100 ist das Maximum.
- Übersetze Technik in Folgen: nicht "benutzt `@property`", sondern "in alten Browsern steht die Bewegung still".
- Mindestens ein Contra pro Look muss ein echtes Problem sein (Aufwand, Leistung, Vertrauen), nicht nur eine Kleinigkeit. Beschönige nichts.
- Bei Gleichstand beide Looks nennen und erklären, was sie unterscheidet.

### Beispiel (ausgefüllt, gekürzt auf einen Look)
```
Manuel, für den Gemüseschneider passt der Look Isometric am besten, weil er das Gerät erklärt und die Seite freundlich und ordentlich wirkt.

**Rangliste (Punkte von 100)**
1. Isometric: 86
2. Gradient Mesh: 81
3. Bauhaus: 81 (gleichauf mit Platz 2)

**Isometric (86)**
| Pro | Contra |
| --- | --- |
| Das Gerät ist als kleines Modell mit Schacht, Kegel und Schüssel sofort zu verstehen | Für jedes neue Produkt muss die Szene neu gebaut werden (etwa 50 Blöcke) |
| Aller Text steht auf hellen, flachen Kacheln, Kontrast mindestens 7 zu 1 | Die Zeichnung ist ein Modell, kein Foto des echten Geräts |
| Sehr leicht: 42 KB, Lighthouse 100/100/100 | Ohne JavaScript bleibt die Bildfläche leer, der Text bleibt lesbar |
| Der orange Knopf ist die einzige kräftige Farbe | Am Handy liegt der Kaufknopf ganz unten im ersten Bildschirm (ab 829 von 844 px) |
```

## d) Regeln, die Fehlentscheidungen verhindern

Gehe diese Liste durch, bevor du eine Empfehlung abgibst. Trifft eine Regel zu, ändere die Rangliste oder schreibe die Warnung in die Antwort.

1. **Lebensmittel und alles, dessen echte Farbe verkauft, nie im Zweifarbdruck.** Halftone druckt mit zwei Farben: Tomaten werden rosa, Gurken blau. Das gilt auch für Kosmetik und Mode.
   Halftone nur für Produkte mit einfacher Silhouette, bei denen die Farbe keine Rolle spielt (Papierwaren, Pflanzen, Haushaltsgeräte).
2. **Ein Look mit Dauerbewegung braucht einen Pause-Knopf und ein Standbild.** Läuft etwas länger als 5 Sekunden ohne Zutun des Besuchers, muss er es anhalten können
   (Barrierefreiheitsregel WCAG 2.2.2). Bei der Systemeinstellung "Bewegung reduzieren" steht ein vollständiges Standbild, und außerhalb des Bildes pausiert die Bewegung.
   Nichts blinkt öfter als 3 mal pro Sekunde. Dauerbewegung haben zum Beispiel Liquid Morph (in der Demo ohne Pause-Knopf), Particles (Pause-Knopf eingebaut), Gradient Mesh,
   Glassmorphism, Holographic, Kinetic Type (Laufbänder), Art Deco (Funkeln) und Retro VHS (Störstreifen, feste Grenzen: höchstens einer pro 8 s, höchstens 150 ms).
3. **Dunkle Looks brauchen für Rechtstexte hellen Kontrast.** Impressum, Datenschutz, AGB und Widerruf werden in ruhiger Fassung gesetzt: Fließtext ohne Schein, ohne Raster und ohne Spezialschrift
   (Pixel, Kacheln, Versalien), mindestens 16 px, Kontrast mindestens 7 zu 1, oder eine helle Textfläche auf dem dunklen Grund. Dunkle Looks sind Art Deco, Wireframe 3D, Pixel Art, Neon Glow,
   Retro VHS, Particles, Split-Flap, ASCII Art, Glas im Apple-Stil und der KI-Vorlagen-Look. Neon Glow und ASCII Art haben keine helle Variante.
4. **Looks mit eingebetteter Zeichnung brauchen pro Produkt eine neue Hero-Zeichnung.** Das gilt für alle 18 Demo-Looks. Plane Zeit ein (Spalte "Aufwand" in `katalog.md`) und sage Manuel den Aufwand in der Antwort.
   Die Zeichnung muss zum echten Produkt passen (Maße, Farben, Form), sonst entsteht ein falscher Eindruck. Prüfe sie gegen das Produktdatenblatt.
5. **Wenn das Foto den Kauf verkauft, keinen Zeichnungs-Look.** Bei Mode, Schmuck, Kosmetik, Möbeln und Lebensmitteln zum Anschauen wirkt ein Foto in Isometric, Bauhaus, Clay 3D, Comic Book
   oder Halftone aufgeklebt. Keiner der 18 Demo-Looks wurde mit einem echten Foto getestet. Fotos von Amazon oder AliExpress gibt es nur im Entwurf, für den echten Shop braucht es ein eigenes Foto oder eine Freigabe.
6. **Preis und Auftritt müssen zusammenpassen.** Edle Looks (Art Deco, Glas im Apple-Stil) können bei günstiger Ware aus China Misstrauen wecken. Verspielte Looks (Comic Book, Pixel Art, Neon Glow, Retro VHS)
   bekamen für HORTA beim Vertrauen nur Note 2: Nimm sie nur mit bekannter Marke oder halte Kasse und Rechtstexte ruhig.
7. **Kurze Überschriften für Spezialschriften.** Split-Flap (etwa 11 große Kacheln pro Zeile am Handy), Pixel Art (die Schrift braucht 1 em je Zeichen), Art Deco (nur große Versalien), Comic Book (Bangers nur Versalien)
   und Kinetic Type (höchstens etwa 22 Zeichen pro Zeile) vertragen nur kurze Namen und Slogans. Miss zuerst die Länge des Produktnamens. Lange Wörter wie "Widerrufsbelehrung" nie in Kacheln oder Pixelschrift setzen.
8. **Ältere Kundschaft, Sehschwäche, Empfindlichkeit gegen Flimmern: Lesbarkeit zuerst.** Dann keine helle Schrift mit Schein auf Dunkel (Neon Glow, ASCII Art), kein Zeilenraster (Retro VHS), keine Pixelschrift.
   Nimm Looks mit Lesbarkeit 5 (Isometric, Gradient Mesh, Bauhaus, Liquid Morph).
9. **Viel Handy-Verkehr oder alte Handys: Weichzeichner und Canvas sind das Risiko.** Betroffen sind Glassmorphism (Weichzeichner), Liquid Morph (Filter), Particles (Canvas), Gradient Mesh (animiertes Netz) und
   Wireframe 3D (Rechnung im Canvas). Auf echten billigen Handys wurde nichts gemessen. Sage das, bevor du es als sicher darstellst.
10. **Mehrere Produkte im selben Look: nach dem Aufwand wählen.** Aufwand 2 (Isometric, Wireframe 3D, Comic Book, Pixel Art, Neon Glow, Holographic, Particles) lohnt sich nur bei wenigen Produkten.
    Bauhaus hat Aufwand 4, die übrigen Looks 3.
11. **Die Signalfarbe gehört dem Kaufknopf.** Sie darf nicht gleichzeitig Gestaltungsfarbe sein. Beim Look Bauhaus ist Rot beides, dort ist die rote Funktionskachel sechsmal so groß wie der Kaufknopf. Bewusst lösen und im Verbund-Durchgang festhalten.
12. **Kasse und Formulare sind kein Schmuck.** Pixel Art hat in der Demo keine gebaute und getestete Kasse. Bei jedem Look gilt: Eingabefelder, Fehlermeldungen und Rechtsseiten in einer schlichten, gut lesbaren Fassung.
13. **Alle Demos sind nur in Chromium getestet.** Safari und Firefox sind offen. Vor einem echten Start dort prüfen, besonders bei Looks mit `cqw`-Einheiten, `@property`, `backdrop-filter` oder `animation-timeline`.
14. **Der KI-Vorlagen-Look ist nie eine Empfehlung für einen echten Shop.** Er darf nur auf ausdrücklichen Wunsch als Entwurf entstehen und bleibt außerhalb von `shops/`.
15. **Die HORTA-Wertung nicht auf andere Produkte übertragen.** Rechne neu (Teil b). Nur die Noten für Lesbarkeit, Handy, Technik, Aufwand und Risiko dürfen als Startwerte dienen.

### Ähnliche Looks auseinanderhalten
Manuel verwechselt Looks leicht. Nenne bei Bedarf den Unterschied:
- Neo-Brutalism hat dicke Konturen und harte Schatten. Comic Book hat Bildkästen mit Rinnen, Sprechblasen und Halbton-Punkte.
- Glassmorphism ist hell, Milchglas über bunten Kugeln. Glas im Apple-Stil ist dunkel, das Produkt ist die Lichtquelle. Gradient Mesh ist ein Farbnetz ohne Glas. Liquid Morph hat verschmelzende Formen mit Kontur.
- Clay 3D ist weiche Pastellknete. Isometric sind harte Blöcke in 30 Grad. Bauhaus sind flache Grundformen in Primärfarben.
- Neon Glow leuchtet in Röhren, Retro VHS hat Scanlines und Synthwave, Particles ist ein Punktfeld.
- Wireframe 3D ist eine Blaupause mit drehbarem Gitter, ASCII Art besteht aus Zeichen, Split-Flap aus Kacheln einer Anzeigetafel.

## e) Welche Looks sich mischen lassen und welche nicht

Eine Mischung heißt: ein Hauptlook liefert Farben, Schrift, Kaufknopf und Fokus. Ein zweiter Look liefert genau eine Zutat (Raster, Zeichnung, Hintergrund oder Kartenform).
Mischungen sind Einschätzungen aus den Look-Skills. Gebaut und gemessen sind sie erst nach dem Test (`neue-vorlage-erstellen.md`).

| Mischung | Geht? | Warum | Worauf du achten musst |
| --- | --- | --- | --- |
| Raster von Bauhaus mit Illustration von Isometric | Ja | Beide sind hell und flach, ohne Weichzeichner, mit Text auf geraden Flächen. Bauhaus liefert das 12-Spalten-Raster und die schwarzen Balken, Isometric die Hero-Szene aus Blöcken | Eine Signalfarbe wählen (Bauhaus-Rot oder Isometric-Orange). Die Tonstufen der Szene in die Bauhaus-Farben und Elfenbein umfärben. Szene ohne Rot zeichnen |
| Karten von Clay 3D mit Verlauf von Gradient Mesh | Ja, mit Vorsicht | Beide sind hell, weich und pastellfarben. Das Farbnetz liegt als Hintergrund hinter dem Hero, die Karten tragen die Knet-Schatten | Dunkle Schrift auf Pastell, Kontrast neu messen. Leistung: Netz plus viele Schatten auf dem Handy testen, am Handy nur drei Netz-Ebenen |
| Wireframe 3D mit Particles | Mit Vorsicht | Beide sind dunkel, technisch und blau. Das Blaupausen-Raster mit Maßlinien kann bleiben, das Punktfeld nur als ruhiger Hintergrund | Zwei Canvas-Bewegungen sind zu viel: eine streichen. Pause-Knopf und Standbild einplanen |
| Neon Glow mit Pastell | Nein | Das Leuchten braucht einen sehr dunklen Grund. Auf Pastell verschwindet der Schein, die dünnen Röhren haben keinen Kontrast | Statt zu mischen: Neon-Akzent auf einem dunklen Block innerhalb eines hellen Looks bauen und als neue Vorlage anlegen |
| Pixel Art mit Glas (Glassmorphism oder Glas im Apple-Stil) | Nein | Pixel braucht harte Kanten und scharfe Schrift (nur bei 16, 24 und 32 px). Weichzeichner und Transparenz machen sie unscharf, beides kostet Leistung | Einen der beiden Looks wählen |
| Halftone mit Gradient Mesh | Nein | Das Punktraster trifft weiche Verläufe: Banding und Moiré drohen, der Zweifarbdruck braucht flache Flächen | Einen wählen |
| Comic Book mit Neo-Brutalism | Nein | Beide arbeiten mit dicken Konturen und harten Flächen. Die Mischung wirkt unentschieden und doppelt die Konturen | Einen wählen. Neo-Brutalism ist flächig und handfest, Comic Book erzählt in Bildern |
| Zwei Looks mit Dauerbewegung (zum Beispiel Particles mit Liquid Morph) | Nein | Zwei Bewegungen konkurrieren um den Blick (ein Blickfang pro Bildschirm) und kosten doppelt Leistung | Höchstens eine Dauerbewegung pro Seite |
| Kinetic Type mit Split-Flap | Nein | Zwei Texteffekte streiten um die Überschrift | Einen wählen |

Regeln fürs Mischen:
- Ein Hauptlook, eine Zutat. Höchstens zwei Looks.
- Höchstens eine Dauerbewegung und genau eine Signalfarbe (der Kaufknopf).
- Höchstens zwei Schriftfamilien und vier Schriftdateien. Die Schrift kommt vom Hauptlook.
- Kontrast und Leistung neu messen, denn die Werte der Einzel-Looks gelten für die Mischung nicht.
- Eine gelungene Mischung wird ein eigener Look: anlegen nach `neue-vorlage-erstellen.md`.

## f) Alle Looks gehen durch den Skill-Verbund

Jeder Look, ob fertig oder neu gemischt, wird mit denselben drei Skills überarbeitet, in dieser Reihenfolge: **gpt-taste** (Aufbau und Raster), **impeccable** (Farbe, Hierarchie, Barrierefreiheit),
**emil-design-eng** (Details und Bewegung). Nach jedem Skill wird getestet, nie mehrere Durchgänge ungeprüft hintereinander. Das Ergebnis ist eine Tabelle Vorher/Nachher im Look-Skill.
Die Regeln des Nutzers (ein Kaufknopf, keine Gedankenstriche, Verbotsliste, Barrierefreiheit) gehen bei Konflikten vor. Einzelheiten und das, was bewusst nicht übernommen wird, stehen in `verbund.md`.
Erwähne in der Antwort an Manuel in einem Satz, dass der gewählte Look durch diesen Verbund läuft, damit er weiß, was als Nächstes passiert.
