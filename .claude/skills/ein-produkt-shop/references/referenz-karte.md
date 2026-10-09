# Karte der Referenz-Umsetzung (HELIA)

`referenz/shop/` ist der fertige HELIA-Shop (Lichtwecker), `referenz/generator/` sind die Python-Skripte, die alle HTML-Seiten
erzeugen. Alle Firmenangaben darin sind erfunden. Nicht enthalten: das Produktfoto (stammte von Amazon) und das Vorschaubild
`assets/og-image.jpg`. Beides für den neuen Shop selbst erstellen (Platzhalter oder eigene Grafik, Bild-Prompts).

## Inhalt
1. Vorgehen beim Übernehmen
2. Dateien und was darin produktabhängig ist
3. script.js nach Abschnitten
4. style.css nach Abschnitten
5. Liste zum Umbenennen

## 1. Vorgehen
```bash
SKILL=<pfad-zu>/ein-produkt-shop
NEU=<projekt>/shops/<name>
cp -a "$SKILL/referenz/shop/." "$NEU/"
mkdir -p <scratchpad>/<name> && cp "$SKILL"/referenz/generator/*.py <scratchpad>/<name>/
cd <scratchpad>/<name> && SHOP_ZIEL="$NEU" python3 build_index.py && SHOP_ZIEL="$NEU" python3 build_rest.py
```
Dann in dieser Reihenfolge anpassen: `bausteine.py` (Name, Firma, Domain, Mail, Logo, Kopf- und Fußzeile, Produktmodell),
`build_index.py` (Texte und Abschnitte der Startseite, JSON-LD, Fragen, Bewertungsbeispiele), `build_rest.py` (Kasse,
Rechtsseiten, Versand), danach `style.css`, `script.js`, `send.php`, `.htaccess`, `robots.txt`, `sitemap.xml`,
`bild-prompts.txt`, `README.md`. HTML-Dateien nie von Hand ändern, immer über die Generatoren, sonst gehen Änderungen beim
nächsten Lauf verloren. Die Generatoren gehören in den Scratchpad; wenn sie über mehrere Sitzungen gebraucht werden, in einen
gesperrten Ordner im Projekt legen (zum Beispiel `entwuerfe/<name>-generator/`), weil der Scratchpad nicht dauerhaft ist.

## 2. Dateien
| Datei | Allgemein (übernehmen) | Produktabhängig (neu machen) |
| --- | --- | --- |
| `generator/bausteine.py` | `head()` mit allen SEO-Tags, `kopf()` Kopfzeile, `KORB` Warenkorb-Dialog, `FUSS` mit Newsletter und Rechtslinks, `seite()`, `textseite()`, Symbole | `NAME`, `FIRMA`, `MAIL`, `DOMAIN`, `LOGO_MARK`, `lampe_3d()` und `lampe_svg()` (das Produktmodell), `WELT` (Hintergrund), Entwurfstext |
| `generator/build_index.py` | Reihenfolge der Abschnitte, Angebot, Fragen-Akkordeon, Bewertungsbereich mit JSON-Daten, Dialog "Bewertung schreiben", Kaufleiste | alle Texte, Funktionen, Erlebnis-Abschnitt, Datenblatt, GPSR-Angaben, Beispielbewertungen, JSON-LD |
| `generator/build_rest.py` | Kasse (Felder, Fehlertexte, Zahlart, AGB-Haken, "zahlungspflichtig bestellen"), Danke, Widerrufen, Rechtsseiten als Gerüst | Firmendaten, Produkt in AGB und Versand, Zahlungsarten, Lieferzeit, Datenschutz-Absätze zu Speicherschlüsseln |
| `generator/stadt.py` | Muster für eine erzeugte SVG-Grafik (Stadt-Silhouetten) | Motiv der Welt |
| `shop/send.php` | alles: Bestellung, Newsletter mit signiertem Bestätigungslink, Widerruf mit Eingangszeit, Bewertung, Honeypot, Ratenbegrenzung, Herkunftsprüfung, Kopfzeilen-Bereinigung, Preisberechnung | Einstellungen oben (SHOP_MAIL, SHOP_NAME, GEHEIMNIS, Gutschein, Preise, Präfix "HL-" in der Bestellnummer, Produktnamen in den Mailzeilen), Zahlarten-Liste |
| `shop/.htaccess` | alles (HTTPS, saubere Adressen, Sicherheits-Kopfzeilen, Zwischenspeicher) | nichts |
| `shop/robots.txt`, `sitemap.xml` | Aufbau | Domain; Entwurf sperrt alles |
| `shop/assets/fonts/` | woff2 plus OFL-Lizenzen (Outfit, Instrument Sans/Serif, Geist Mono) | andere Schriften, wenn die Marke es verlangt |
| `shop/assets/favicon.svg` | nichts | neu zeichnen |

## 3. script.js nach Abschnitten (Kommentarzeilen `/* ---------- ... ---------- */`)
Allgemein:
- Preise (PRODUKTE, VERSAND, GRATIS_AB, MAX_MENGE, Einführungsdatum, Gutschein-Prüfwert als SHA-256 des Codes)
- Speicher (abgesichert für privaten Modus), Warenkorb mit Dialog, Entfernen-Animation, "Noch X € bis kostenlos"
- Menü am Handy, Erscheinen beim Scrollen, aktiver Menüpunkt
- Himmel weich angleichen (`setzeWenn`, `himmelZiel`), Stadt-Tiefe, Regen
- Begrüßung nach Tageszeit, Abschied (Sonne sinkt, Himmel wird Nacht)
- Formulare an PHP schicken (Sende-Zustand nach 150 ms, Meldungen)
- 3D: Kippen mit dem Zeiger, drehbares Modell `[data-dreh]` (Ziehen mit Schwung, Pfeiltasten, kein Markieren)
- Zahlen zählen hoch, Kartenstapel, Zitat-Karussell
- Bewertungen (Zusammenfassung, Filter, Sortierung, "Weitere", "Hilfreich", Antworten, Formular)
- Kasse (Zusammenfassung, Gutschein, Prüfung der Felder, Bestellung), Danke-Seite, Vertrag widerrufen
Produktabhängig (ersetzen oder entfernen):
- Uhrzeit auf der Lampe, Tag-Nacht-Simulation mit PHASEN und Regler, "Ihre Weckzeit", Display zum Antippen,
  Regen probehören, "Abend bis Morgen", Lampe geht beim Laden an
Den neuen Gutschein-Prüfwert so berechnen: `printf '%s' CODE | sha256sum`.

## 4. style.css nach Abschnitten
Allgemein: `:root` (Farben, Glas, Abstände nach goldenem Schnitt, Schriften, Kurven), Welt, Entwurfsleiste, Kopfzeile,
Bausteine (`.glas`, `.knopf`, `.leise-knopf`, `.zeigen`, `.wachsen`, `.leucht`), Kopfbereich, Auf einen Blick, Geschichte,
Bento, Akkordeon, Datenblatt, Angebot, Fragen, Abschied, Fußbereich, Warenkorb, Kasse, Textseiten, Tablet, Handy,
Barrierefreiheit. Produktabhängig: Lampe, `.l3d*` (3D-Modell), Sonnenaufgang-Abschnitt, Weckzeit.
Farben nur in `:root` ändern, die Rollen (Signal nur für Kauf) beibehalten.

## 5. Liste zum Umbenennen (alles suchen und ersetzen)
`HELIA`, `Helia`, `helia` (Speicher-Schlüssel `helia-korb`, `helia-hilfreich`, `helia-weckzeit`), `Helia Licht GmbH`,
`helia.example`, `HL-` (Bestellnummer), `HL-1` (Modell), `SONNE10` (Gutschein, auch Prüfwert in script.js), `Lichtwecker`,
Preise `49,90` `59,90` `84,80` `101,80` `4990` `5990` `8480` `10180`, Datum `30.11.2026` und `2026-11-30`, Versand `4,90`/`490`,
Schwelle `59 €`/`5900`. Danach `grep -ri helia <neuer-ordner>` muss leer sein.

## 6. Zweites Beispiel: HORTA (heller Shop, Ware aus China)
- `shops/horta/` mit Generatoren in `generatoren/horta/`: Gemüseschneider, frische Marktküche auf hellem Grund.
  Zeigt, was für eine helle Welt umgestellt wird: Glas (weiß, halbtransparent), Schatten grünlich statt schwarz,
  Kopfleiste, Warenkorb und Dialoge hell, Stapelkarten mit deckendem hellem Grund, Entwurfshinweise in Honiggelb.
- Erlebnis-Abschnitt als Seitenansicht in SVG (Probierstand): Auswahl als Chips, ein grüner Bedienknopf (nicht die
  Signalfarbe), Stücke fallen per Web Animations in eine Schüssel, die Auswahl wird gemerkt und im Abschied gezeigt.
- 3D-Modell eines Kegelstumpfs aus 16 Flächen mit Glanzstreifen, waagerechte Trommel als Zylinder um die X-Achse
  (`rotateX(k*36deg) translateZ(r)`). Teile, die ineinander stecken, leicht auseinanderrücken, sonst entstehen helle Splitter.
- Generatoren immer ins Projekt legen (`generatoren/<name>/`), der Scratchpad ist nach der Sitzung weg.
- Seit 09.10.2026 trägt HORTA den Look Neo-Brutalism (dicke Konturen, harte Schatten, flache Farben). Aufbau, Haken und
  Tests blieben gleich, nur CSS, Schriften, Logo, Favicon, Vorschaubild und wenige Stellen in den Generatoren wurden
  getauscht. Alle Looks mit Anleitung zum Wechseln stehen im Skill `design-vorlagen`.
