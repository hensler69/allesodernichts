# Look: Glas im Apple-Stil (dunkel)

Gebaut und getestet in `shops/helia/` (Lichtwecker). Fertiges Stylesheet: `vorlagen/glas-apple/shop/style.css`, dieselbe Datei
wie `ein-produkt-shop/referenz/shop/assets/style.css`. Alle Einzelheiten stehen in `ein-produkt-shop/references/gestaltung.md`,
`bewegung.md` und `besuchergefuehl.md`. Hier nur das, was beim Wählen und Wechseln zählt.

## Wann
Dunkel, ruhig, hochwertig. Das Produkt ist die einzige warme Lichtquelle der Seite. Passt zu Licht, Schlaf, Klang, Technik,
Pflege. Schlecht für laute, bunte, günstige Alltagsprodukte (dafür Neo-Brutalism).

## Merkmale
- Dunkler, kühler Grund (#070a1a), Text in drei Hellstufen, Signalfarbe (#ff6a3d) nur für Kaufknopf und Auswahl.
- Glasflächen: halbtransparent, Lichtkante oben, `backdrop-filter: blur(28px)`, gestaffelte weiche Schatten, Radien 28 und 40 px.
- Welt im Hintergrund: Himmel aus drei Farbvariablen, die JavaScript beim Scrollen angleicht, Stadt-Silhouetten, Regen (Zeichenfläche).
- Produkt als 3D-Modell aus CSS, das beim Laden "angeht". Erlebnis-Abschnitt mit Simulation (Tag und Nacht).
- Persönliche Einstellung (Weckzeit), Begrüßung nach Tageszeit, Abschied mit sinkender Sonne.
- Abstände nach dem goldenen Schnitt, große Abschnitte (11 rem).

## Schriften
Outfit Bold (Überschriften), Instrument Serif Kursiv (Akzentwörter, Klasse `.leucht` mit Verlauf), Instrument Sans (Text), Geist Mono (Zahlen).

## Anwenden und wechseln
Neuer Shop: Referenz kopieren (`ein-produkt-shop` Phase 5). Von Neo-Brutalism zurück zu Glas: `references/umstellen.md`,
Abschnitt "Zurück zu Glas". Die Welt-Grafiken (`stadt-*.svg`) erzeugt `referenz/generator/stadt.py`.

## Stolperfallen
- Der Blur ist teuer: Variablen am Himmel nur an `.welt` setzen, nie an `<html>`.
- Streichpreis, Lichtkegel über geschlossener Lampe, Umriss-Schrift im Laufband: verworfen (siehe `gestaltung.md`, Abschnitt 10).
- `prefers-reduced-transparency` und `prefers-contrast` müssen feste Flächen liefern.
