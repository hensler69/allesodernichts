# Generatoren für den HORTA-Shop

Diese Python-Dateien erzeugen alle HTML-Seiten in `shops/horta/`. Änderungen an Texten und Aufbau hier machen,
nicht in den HTML-Dateien (sonst überschreibt der nächste Lauf sie). Dieser Ordner wird nicht veröffentlicht.

```bash
cd generatoren/horta
SHOP_ZIEL=../../shops/horta python3 build_index.py && SHOP_ZIEL=../../shops/horta python3 build_rest.py
SHOP_ZIEL=../../shops/horta python3 beet.py        # Hintergrundgrafiken und Favicon (nur bei Änderungen)
SHOP_ZIEL=../../shops/horta python3 og_bild.py     # Vorschaubild: danach og.js mit Playwright ausführen
```

- `bausteine.py`: Name, Firma, Mail, Lieferzeit, Logo, 3D-Gerät (`geraet_3d`), Seitenansicht mit Schüssel (`geraet_svg`), Kopf- und Fußzeile
- `build_index.py`: Startseite mit allen Texten, Probierstand, Datenblatt, GPSR-Angaben, 36 Beispielbewertungen (vor dem Start löschen)
- `build_rest.py`: Kasse, Danke, Widerruf und Rechtsseiten
- Preise stehen zusätzlich in `shops/horta/assets/script.js` (PRODUKTE) und `shops/horta/send.php` (PREIS_EINF, PREIS_NORMAL)
