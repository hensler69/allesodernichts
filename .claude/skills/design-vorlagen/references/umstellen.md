# Einen bestehenden Shop in einen anderen Look bringen

Beispiel aus der Praxis: HORTA wurde von "helle Glasflächen auf Creme" auf Neo-Brutalism umgestellt. Dabei blieben alle HTML-Haken,
das JavaScript, send.php, die Rechtsseiten und die Tests unverändert. Reihenfolge:

1. **Schriften tauschen.** Neue woff2 samt Lizenztext in `assets/fonts/`, alte löschen, in `style.css` die `@font-face`-Zeilen
   und in `bausteine.py` die `preload`-Zeile (`head()`) anpassen. Nur selbst gehostet.
2. **`style.css` ersetzen** durch `vorlagen/<look>/shop/style.css`. Die Klassennamen sind in allen Looks gleich
   (`.glas`, `.knopf`, `.leise-knopf`, `.leucht`, `.kachel`, `.schritt`, `.option`, `.frage`, `.korb`, `.kasse` ...), deshalb
   ändert sich am HTML fast nichts.
3. **Generator `bausteine.py`:**
   - `LOGO_MARK` (Logo im Look des Stils neu zeichnen)
   - `WELT` (Glas: Himmel, Stadt, Regen. Neo-Brutalism: ein leeres `<div class="welt" aria-hidden="true"></div>`, den Punktgrund macht das CSS)
   - `head()`: `theme-color` auf die Grundfarbe, `preload` auf die Überschriftenschrift, `og:image:alt`
4. **Generator `build_index.py`:**
   - Überschrift: im Neo-Look `<span class="leucht">` auf ein bis zwei Wörter, `<span class="leucht leucht--gruen">` für das zweite
   - `SCHRITTE`: Hintergründe als flache Farben (`#dff3a6`, `#fffef6`, `#ffd23f`, `#ff5236`, `#b79cff`) statt Verläufe
   - Abschied: Neo-Look = dunkler Block mit Text links und Schüssel rechts (`.abschied__in`, `.abschied__text`, `.abschied__schale`),
     Glas = Szene mit Licht, Tisch und Schale (`.abschied__szene`)
   - Farben in Zeichnungen, die als SVG im Generator stehen (Schüssel, Gerät), nur anfassen, wenn sie auf dem neuen Grund nicht tragen
5. **Favicon und Vorschaubild neu.** Favicon: gleiches Motiv in den neuen Farben. Vorschaubild 1200 × 630 aus der eigenen Zeichnung
   (`generatoren/horta/og_bild.py` ist die Vorlage für Neo-Brutalism), nie aus einem Fremdfoto.
6. **Nicht mehr gebrauchte Grafiken löschen** (Glas: `stadt-*.svg`, Neo-Brutalism: keine Welt-Grafiken nötig).
7. **JavaScript nur prüfen.** Der Himmel-Code (`HIMMEL`, `--sky1` …) und die Stadt-Tiefe laufen im Neo-Look ohne Wirkung weiter
   und schaden nicht. Wer aufräumen will: nur nach Test, die Haken `.welt`, `[data-gruss]`, `.abschied` bleiben.
8. **Prüfen:** Bildschirmfotos aller Abschnitte auf PC und Handy, Seitentest (Tablet-Breite: Kopfzeile!), Kaufweg, `text_check.py`,
   Lighthouse. Dann Vorschau neu bauen und denselben Link erneut veröffentlichen.

## Zurück zu Glas
`ein-produkt-shop/referenz/generator/bausteine.py` enthält `WELT`, `LOGO_MARK` und die Kopfzeile des Glas-Looks, `referenz/generator/stadt.py`
erzeugt Stadt-Silhouetten und Favicon. Die Abschied-Struktur mit `.abschied__szene` steht in `referenz/generator/build_index.py`.

## Was nie vom Look abhängt
Texte, Preise, Pflichtangaben, Rechtsseiten, Formulare, Warenkorb-Logik, Bestellnummern, Speicher-Schlüssel im Browser.
