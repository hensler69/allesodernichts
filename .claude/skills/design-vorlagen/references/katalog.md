# Katalog: alle 21 Looks auf einen Blick

Dieser Katalog ist die Nachschlagetabelle für `vergleich.md`. Er sagt für jeden Look in einer Zeile, wie er wirkt, wozu er passt, was
er pro neues Produkt kostet und wo seine größte Schwäche liegt. Die Tabelle enthält alle 18 getesteten Demo-Looks (je ein Einzel-Skill
`look-<slug>`) und die 3 älteren Looks aus `design-vorlagen`. Sortiert ist sie nach der Wertung für HORTA (siehe `empfehlung-horta.md`),
die 3 älteren stehen am Ende, weil sie nicht in dieser Reihe gemessen wurden.

Lesehilfe:
- **Aufwand pro neues Produkt**: Was bei einem anderen Produkt neu gebaut werden muss. Die Note stammt aus dem Skill des Looks
  (Aufwand, 5 = wenig Aufwand): Note 4 = gering, Note 3 = mittel, Note 2 = hoch.
- **Gewicht der Demo**: HTML, CSS und JavaScript der Demo-Seite, ohne Schriften (gemessen mit `scripts/pruefen.js`, Grenze der Vorgabe 250 KB).
  Die Schriften kommen dazu (zwischen 26 und 97 KB, Einzelheiten in `fonts/README.md`).
- **Lighthouse** Leistung / Barrierefreiheit / Technik: mobiler Lauf mit `scripts/messen.py`, nur Chromium ohne Grafikkarte, Stand 11.10.2026.
  100 ist der Höchstwert. Das ist ein Labortest, kein Test mit echten Besuchern.
- **Größte Schwäche**: ein Satz aus der Contra-Liste des Look-Skills. Alle Contra-Punkte stehen im jeweiligen `references/look-<slug>.md`.
- Hell oder dunkel beschreibt den Seitengrund. Dunkle Looks brauchen für Rechtstexte eine eigene ruhige Fassung (`vergleich.md`, Regel 3).

## Die Tabelle

| Look | Skill-Name | Stimmung in 3 Wörtern | Hell oder dunkel | Passt zu | Passt nicht zu | Aufwand pro neues Produkt | Gewicht der Demo in KB (ohne Schriften) | Lighthouse Leistung/Barrierefreiheit/Technik | Größte Schwäche |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Isometric | `look-isometric` | freundlich, ordentlich, erklärend | hell | Küchengeräte, Haushalt, Werkzeug, Möbel und Zubehör mit sichtbaren Teilen | Mode, Schmuck, Kosmetik (alles, was man auf einem Foto beurteilt), strenge Luxusmarken | hoch (Note 2): neue Szene mit etwa 50 Blöcken und 12 kleine Symbole | 42 | 100/100/100 | Die Szene ist ein Modell und kein Produktfoto, und ohne JavaScript bleibt die Hero-Fläche leer. |
| Gradient Mesh | `look-gradient-mesh` | freundlich, hell, ruhig | hell | Küche, Haushalt, Pflege, Wellness, Tee, Kerzen, Produkte ohne Foto | Profi-Werkzeug, Medizin, Finanzen, dunkle Premium-Auftritte, Kundschaft mit sehr alten Handys | mittel (Note 3): flaches Gerät neu zeichnen, Farbnetz und Kachel-Paletten bleiben | 53 | 100/100/100 | Pastell allein hat wenig Wucht, die Seite wirkt vertraut, fast wie eine Standardseite. |
| Bauhaus | `look-bauhaus` | klar, grafisch, selbstbewusst | hell | Küchengeräte mit klarer Form, Werkzeug, Lampen, Möbel, Schreibwaren, Bausteinspielzeug | Kleidung, Kosmetik, Essen, Baby, Pflege, Schmuck | gering (Note 4): Gerät aus etwa 21 Grundformen neu setzen, vier Symbole | 29 | 100/100/100 | Rot ist zugleich Bauhaus-Farbe und Kaufknopf-Farbe, die rote Funktionskachel ist sechsmal so groß wie der Knopf. |
| Liquid Morph | `look-liquid-morph` | weich, warm, lebendig | hell | Küchengeräte, Essen und Trinken, Pflege, Wasser, Baby, Haushalt | Technik, Werkzeug, Luxus, Kundschaft mit alten Handys | mittel (Note 3): Gerät zeichnen und die Blob-Positionen darauf abstimmen | 39 | 100/100/100 | Die Dauerbewegung hat keinen Pause-Knopf, und Filter und Konturwechsel sind auf alten Handys die teuerste Stelle. |
| Glassmorphism | `look-glassmorphism` | frisch, hell, verspielt | hell | Küche, Haushalt, Pflege, Wasser, Kinderzimmer, Produkte ohne Foto | Medizin, Finanzen, Profi-Werkzeug, dunkle Premium-Produkte, Shops mit sehr alten Telefonen | mittel (Note 3): Glasform neu zeichnen, drei Rückfall-Blöcke mitführen | 58 | 100/100/100 | Der Weichzeichner im Glas kostet Leistung (im Software-Test 42 bis 44 ms pro Bild statt 16,7 ms), auf billigen Telefonen kann das Scrollen ruckeln. |
| Clay 3D | `look-clay-3d` | weich, verspielt, anfassbar | hell | Küche, Essen, Haushalt, Kinder, Spielzeug, Pflege, Babyartikel | Technik, Werkzeug, Luxus, Produkte, die nur mit einem echten Foto überzeugen | mittel (Note 3): neue Knetfigur aus etwa 20 Teilen in em, vier Symbole | 38 | 99/100/100 | Pastell auf Pastell trägt nur mit dunkler Schrift, und echte Produktfotos wirken zwischen den Knetflächen aufgeklebt. |
| Art Deco | `look-art-deco` | edel, festlich, geordnet | dunkel | Tischzubehör, Geschenke, Bar und Wein, Lampen, Schmuck, Wohnaccessoires, Pflege mit Stil | laute, spielerische oder sehr günstige Produkte, Kinderartikel, rein technische Ware | mittel (Note 3): Hero-Zeichnung (etwa 8 KB SVG) neu, Strahlen, Fächer und Zackenkranz bleiben | 44 | 100/100/100 | Der edle Ton ist ein Versprechen und kann bei 44,90 € für Ware aus China Misstrauen wecken. |
| Halftone | `look-halftone` | gedruckt, handgemacht, plakativ | hell | Küchenhelfer mit einfacher Silhouette, Papierwaren, Pflanzen, Getränke, Kreatives, Zine-Marken | frische Lebensmittel, Kosmetik und Mode (echte Farbe verkauft), Technik und Medizin | mittel (Note 3): Szene aus Formen neu (etwa 60 Zeilen), Standbild per Python erzeugen | 49 | 99/100/100 | Mit zwei Druckfarben lässt sich nichts natürlich abbilden: Tomaten werden rosa, Gurken blau. |
| Wireframe 3D | `look-wireframe-3d` | technisch, präzise, kühl | dunkel | Geräte und Werkzeug mit Bauteilen, Elektronik, Zubehör mit Maßen (Halterungen, Ständer, Regale) | Essen, Kosmetik, Mode, Schmuck, Geschenke, Produkte ohne feste Form | hoch (Note 2): neues Drahtgitter aus Drehkörpern modellieren, Maßlinien neu rechnen (mehrere Stunden) | 79 | 100/100/100 | Marineblau mit Cyan wirkt kühl, für Essen oder Pflege fehlt die Wärme. |
| Comic Book | `look-comic-book` | laut, verspielt, erzählend | hell | Haushaltshelfer mit sichtbarem Ablauf, Küchengeräte, Spielzeug, Hobby, Geschenke | Medizin, Finanzen, Luxus, Profi-Werkzeug, Produkte, die nur mit Foto überzeugen | hoch (Note 2): drei neue Bildszenen, Panel-Polygone von Hand in Prozent | 52 | 99/100/100 | Der verspielte Ton wirkt bei einem Gerät zu 44,90 € kindlich, und die Seite ist am Handy 6057 px lang. |
| Kinetic Type | `look-kinetic-type` | mutig, bewegt, schriftstark | hell | Geräte mit klarer Tätigkeit (schneiden, mixen), Werkzeug, Sport, Produkte ohne gutes Foto und mit kurzem Slogan | Mode, Schmuck, Möbel, Kosmetik, Luxus, Baby, Gesundheit, Slogans über etwa 22 Zeichen pro Zeile | mittel (Note 3): Slogan in Buchstaben-Spans zerlegen und die größte Zeilenbreite messen | 29 | 98/100/100 | Die Scheibe im Hero sieht aus wie eine Filmspule, das Gerät selbst ist nicht zu erkennen. |
| Pixel Art | `look-pixel-art` | verspielt, nostalgisch, pixelig | dunkel | Küchengadgets, Haushalt, Spielzeug, Geschenke, Gamer-Zubehör, Produkte mit wenigen Teilen | Gesundheit, Baby, Pflege, Finanzen, Luxus, Seiten mit viel Fließtext oder Formularen | hoch (Note 2): 23 Zeichenkarten, Gerät und Gemüse als Sprite neu zeichnen | 79 | 100/100/100 | Die breite Pixelschrift ist anstrengend (die H1 wird am Handy dreizeilig), und die Kasse ist in der Demo nicht gebaut. |
| Neon Glow | `look-neon-glow` | nächtlich, leuchtend, auffällig | dunkel | Party- und Barzubehör, Gaming, Lampen, Deko, Geschenke, Produkte für den Abend | Gesundheit, Baby, Bio, Natur, Finanzen, Luxus, Kundschaft mit Sehschwäche | hoch (Note 2): neues Röhrenbild in drei SVG-Ebenen, Leuchtstufen abstimmen | 35 | 99/100/100 | Der Look wirkt wie Bar oder Spielhalle und für Zahlung und Rechtliches weniger seriös als ein ruhiger Look. |
| Holographic | `look-holographic` | schillernd, modern, glatt | hell | Edelstahl- und Kunststoffgeräte, Elektronik-Zubehör, Kosmetik, Schmuck, Geschenke für junge Käufer | Schlaf, Wellness, Natur, Medizin, Handwerk, Produkte mit bunter Fotografie | hoch (Note 2): Hero-Zeichnung mit Folienschablonen, Waben und Gemüse neu bauen | 55 | 99/100/100 | Am Handy wirkt der Look schwächer, weil ohne Zeiger nur der langsame Drift bleibt. |
| Retro VHS | `look-retro-vhs` | nostalgisch, verspielt, plakativ | dunkel | Spiel- und Küchengeräte mit Humor, Musik, Gaming, Deko, Sammlerprodukte, Partys | Gesundheit, Baby, Pflege, Bio, Finanzen, Luxus, Kundschaft, die auf Flimmern oder Zeilenraster reagiert | mittel (Note 3): Gerät, Schüssel und Gemüse neu, Himmel, Sonne, Berge und Gitterboden bleiben | 38 | 99/100/100 | Der Störstreifen ist ein Sicherheitsthema: Die Grenzen (höchstens einer pro 8 s, höchstens 150 ms) müssen bei jeder Änderung neu gemessen werden. |
| Particles | `look-particles` | technisch, vernetzt, lebendig | dunkel | Lampen, Lichtwecker, Ladegeräte, Smart-Home, Sensoren, Kopfhörer, alles mit Netz im Versprechen | Lebensmittel, Naturkosmetik, Kinderprodukte, Handwerk, Geschenke, Kundschaft mit alten Handys | hoch (Note 2): neue Punktfigur mit dem Generator, Ring-Zuordnung und viele Randfälle | 76 | 100/100/100 | Der Canvas ist der teuerste Teil der Seite und braucht einen Pause-Knopf, am Handy trägt das Feld kaum. |
| Split-Flap | `look-split-flap` | sachlich, technisch, markant | dunkel | Küchen- und Haushaltsgeräte, Werkzeug, Reise und Gepäck, Produkte mit klaren Eckdaten und Ablauf | Pflege, Baby, Mode, Genuss, Geschenke, Produkte mit langen Namen oder Überschriften | mittel (Note 3): kurze Texte für die Kacheln finden, ein neues Piktogramm zeichnen | 41 | 95/100/100 | Nur kurze Wörter gehören in Kacheln, längere laufen über und müssen als Fließtext stehen. |
| ASCII Art | `look-ascii-art` | nerdig, technisch, reduziert | dunkel | Gadgets mit klarer Form, Werkzeug, Computer- und Spielzubehör, Nerd-Geschenke, Software-nahe Produkte | Kosmetik, Pflege, Mode, Schmuck, Baby, Gesundheit, Luxus, Produkte, die nur über ein Foto verkauft werden | mittel (Note 3): neue Canvas-Szene aus etwa 165 Zeilen Code | 39 | 100/100/100 | Am Handy ist das Gerät im Zeichenbild nur noch zu erahnen, ein Ersatz für ein Produktfoto ist es nicht. |
| Glas im Apple-Stil | design-vorlagen (`references/look-glas-apple.md`) | ruhig, hochwertig, nächtlich | dunkel | Licht, Schlaf, Klang, Technik, Pflege | laute, bunte, günstige Alltagsprodukte | nicht bewertet: 3D-Modell aus CSS neu bauen, Himmel und Stadt kommen aus dem Generator `ein-produkt-shop/referenz/generator/stadt.py` | nicht gemessen | nicht gemessen | Der Weichzeichner (28 px) ist teuer, die Himmel-Variablen dürfen nur an `.welt` hängen. |
| Neo-Brutalism | design-vorlagen (`references/look-neo-brutalism.md`) | laut, frisch, handfest | hell | Küche, Essen, Alltag, Spielzeug, Werkzeug, Geschenke | Produkte, die Ruhe, Luxus oder Schlaf versprechen | nicht bewertet: fertiges Stylesheet, Farben in `:root` tauschen, Produkt als Zeichnung auf Farbfläche | nicht gemessen | 91/97/100 (Wert aus HORTA, laut Notiz vom 09.10.2026) | Auf dem Tablet (820 px) passen Logo, sechs Links und Warenkorb nicht in die Kopfzeile, es braucht Sonderregeln. |
| KI-Vorlagen-Look | design-vorlagen (`references/look-ki-vorlage.md`) | überladen, austauschbar, klischeehaft | dunkel | nur als Entwurf, Parodie oder Gegenbeispiel, nie für einen echten Shop | jeder echte Shop | nicht bewertet: Entwurf liegt vor, wird aber nie in einen Shop übernommen | nicht gemessen | nicht gemessen | Die Texte brechen die Grundregeln (Verbotsliste), und der Look wirkt austauschbar. |

Hinweise zu einzelnen Werten:
- Layoutverschiebung: Bei Isometric, Split-Flap, Halftone und Pixel Art hat Lighthouse zuerst Werte über 0,1 gemessen (Split-Flap 0,305, Pixel Art 0,14,
  Halftone 0,124, Isometric 0,11). Die Ursache war überall der Wechsel der Webschrift oder eine zu spät umgestellte Kopfzeile. Behoben sind alle vier mit
  vorgeladenen Schriften, einer passenden Ersatzschrift (`size-adjust`) und vorab reserviertem Platz. Die Tabelle zeigt den Stand danach (höchste gemessene
  Verschiebung der Reihe: Retro VHS mit 0,076).
- Neo-Brutalism: Der Wert 91/97/100 stammt aus der Messung des fertigen HORTA-Shops (Notiz vom 09.10.2026), nicht aus einer Demo-Seite.
  Für die Glas-Vorlage und den KI-Vorlagen-Look liegt keine Messung vor.
- Die Wertung für HORTA (Rang und Punkte) steht in `empfehlung-horta.md`. Sie gilt nur für ein Küchengerät aus China zu 44,90 €.
  Für ein anderes Produkt rechnet `vergleich.md` die Reihenfolge neu.

## Wenn das Produkt ... ist, dann zuerst diese Looks ansehen

Die Zuordnung stammt aus den Zeilen "Passt besonders zu" und "Passt nicht zu" der Look-Skills. Sie ist eine Vorauswahl von zwei bis fünf
Looks. Die Entscheidung trifft danach der Vergleich nach `vergleich.md`.

- **Küche und Essen** (Küchengerät, Zubehör, Getränke, Lebensmittel): zuerst Isometric, Gradient Mesh, Bauhaus (Platz 1 bis 3 der HORTA-Wertung). Danach Liquid Morph,
  Glassmorphism, Clay 3D und Neo-Brutalism. Comic Book, wenn der Ablauf (hineinlegen, Knopf, fertig) die Geschichte ist. Vorsicht: Halftone nur, wenn die echten
  Farben des Essens keine Rolle spielen (Zweifarbdruck macht Tomaten rosa), Art Deco nur für Tischzubehör und Festliches.
- **Technik und Werkzeug** (Geräte, Elektronik, Zubehör mit Maßen): zuerst Wireframe 3D (Maße als Kaufargument), Particles (Elektronik, Smart-Home), Split-Flap (Eckdaten und Ablauf).
  Danach ASCII Art für Nerd-Kundschaft, Kinetic Type für Werkzeug mit klarer Tätigkeit, Bauhaus und Isometric für Werkzeug mit sichtbaren Teilen, Glas im Apple-Stil für Audio und Licht.
  Vorsicht: Bei unbekannter Marke zählt Vertrauen. ASCII Art und Neon Glow bekamen dafür in der HORTA-Wertung nur Note 2, sie wirken weniger seriös.
- **Kosmetik und Pflege**: zuerst Holographic (Kosmetik, Pflege, Schmuck), Gradient Mesh (Pflege, Wellness), Glassmorphism und Liquid Morph (Pflege, Wasser). Für ruhige, hochwertige
  Pflege das Glas im Apple-Stil. Vorsicht: Halftone passt nicht (die echte Farbe verkauft), Isometric, Bauhaus und Kinetic Type nennen Kosmetik ausdrücklich als nicht passend.
  Kosmetik lebt meist vom Foto, deshalb früh klären, ob Bildmaterial da ist (`vergleich.md`, Frage 6).
- **Geschenke und Luxus**: zuerst Art Deco (Geschenke, Bar und Wein, Schmuck, Lampen) und Holographic (Schmuck, Geschenke für junge Käufer), für Ruhe und Hochwertigkeit das Glas
  im Apple-Stil. Für verspielte Geschenke Neo-Brutalism, Pixel Art, Retro VHS, Comic Book oder Neon Glow, für Nerd-Geschenke ASCII Art. Vorsicht: Der edle Ton von Art Deco braucht
  einen Preis, der ihn trägt. Bei günstiger Ware aus China kann er Misstrauen wecken.
- **Spielzeug und Spiele**: zuerst Pixel Art, Comic Book, Clay 3D. Danach Retro VHS und Neon Glow (Gaming), Neo-Brutalism (Spielzeug), Bauhaus (Bausteinspielzeug).
  Vorsicht: Pixel Art hat in der Demo keine Kasse, Retro VHS hat einen Störstreifen mit festen Sicherheitsgrenzen.
- **Kinder und Baby** (Eltern kaufen): zuerst Clay 3D, Liquid Morph, Glassmorphism (Kinderzimmer). Danach Comic Book für ältere Kinder und Spielzeug. Vorsicht: Neon Glow, Retro VHS,
  ASCII Art, Particles, Split-Flap, Pixel Art und Art Deco nennen Baby- oder Kinderprodukte als nicht passend. Hier zählt das Vertrauen der Eltern mehr als der Effekt.
- **Nachtleben** (Bar, Party, Getränke, Abendprodukte): zuerst Neon Glow, Retro VHS, Particles. Danach das Glas im Apple-Stil für ruhige Abendprodukte (Licht, Schlaf) und Art Deco für Bar und Wein.
  Vorsicht: Helle Schrift mit Schein auf Dunkel ermüdet bei langen Texten, Fließtext und Rechtstexte ruhig halten.
- **Büro und Schreibwaren**: zuerst Bauhaus (Schreibwaren, Uhren) und Halftone (Papierwaren, Kreatives). Danach Isometric (Zubehör, Aufbewahrung), Wireframe 3D (Halterungen, Ständer),
  ASCII Art (Computerzubehör). Vorsicht: Halftone braucht eine einfache Silhouette, kleine Details unter etwa 14 px gehen im Raster verloren.
- **Möbel und Licht**: zuerst Bauhaus (Lampen, Möbel, Wohnobjekte), Isometric (Möbel, Aufbewahrung), Art Deco (Lampen, Wohnaccessoires). Für Lichtwecker und Leuchten mit Elektronik
  Particles und das Glas im Apple-Stil (HELIA), für Deko und Partylicht Neon Glow, für Regale und Ständer mit Maßen Wireframe 3D.
  Vorsicht: Bei Möbeln will die Kundschaft oft ein Foto sehen, das passt zu Zeichnungs-Looks nur eingeschränkt.
- **Mode**: Kein Look wurde für Mode gebaut, und Mode lebt vom Foto. Isometric, Kinetic Type, Split-Flap, Wireframe 3D und ASCII Art schließen sie ausdrücklich aus, Bauhaus nennt Kleidung als
  nicht passend. Für Accessoires und Schmuck zuerst Art Deco und Holographic ansehen. Für Kleidung mit Foto bietet sich Neo-Brutalism an (das Foto steht dort auf einer Papierfläche),
  ob das trägt, ist nicht erprobt. Bei echtem Mode-Shop zusammen mit dem Nutzer prüfen, ob ein neuer Look mit Raum für Fotos gebaut werden soll (`neue-vorlage-erstellen.md`).
