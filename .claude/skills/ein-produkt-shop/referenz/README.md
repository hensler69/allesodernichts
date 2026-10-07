# Referenz: HELIA-Shop

Fertiger, getesteter Ein-Produkt-Shop (Lichtwecker "HELIA") als Vorlage für neue Shops.
Alle Firmen-, Hersteller- und Technikangaben sind erfunden. Die Bewertungen sind als Beispiel markierte Erfindungen.

Bewusst NICHT enthalten (Rechte bzw. produktgebunden), im neuen Shop selbst erstellen:
- `assets/img/produkt-entwurf.jpg` (das Produktfoto stammte von Amazon, nur Entwurf)
- `assets/og-image.jpg` (Vorschaubild 1200 x 630 für soziale Netzwerke)

`shop/` = erzeugte Website, `generator/` = Python-Skripte, die alle HTML-Seiten erzeugen
(`SHOP_ZIEL=<ordner> python3 build_index.py && SHOP_ZIEL=<ordner> python3 build_rest.py`).
Welche Teile allgemein und welche produktabhängig sind: `../references/referenz-karte.md`.
