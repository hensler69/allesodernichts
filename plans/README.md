# Umsetzungspläne: Bewegung im HELIA-Shop

Erstellt nach einer Prüfung aller Animationen in `shops/helia/` (Stand Commit `79a6061`).
Jeder Plan ist in sich vollständig und kann ohne Vorwissen umgesetzt werden.

Hinweis: Dieser Ordner ist interne Arbeitsgrundlage und gehört nicht auf einen Webserver.

## Empfohlene Reihenfolge

| Reihenfolge | Plan | Stärke | Abhängig von | Status |
|---|---|---|---|---|
| 1 | [001 Kippen ohne Verzögerung](001-kippen-ohne-verzoegerung.md) | HOCH | keine | ERLEDIGT |
| 2 | [002 Himmel ohne Seiten-Neuberechnung](002-himmel-ohne-seiten-neuberechnung.md) | HOCH | keine | ERLEDIGT |
| 3 | [004 Zeigerbewegung direkt setzen](004-zeigerbewegung-direkt-setzen.md) | MITTEL | nach 001 (gleiche CSS-Zeile) | ERLEDIGT |
| 4 | [003 Regen hinter Glas entlasten](003-regen-hinter-glas-entlasten.md) | HOCH | keine, aber nach 002 messen | ERLEDIGT |
| 5 | [005 Kaufknopf-Glühen auf der Grafikkarte](005-kaufknopf-gluehen-gpu.md) | MITTEL | keine | ERLEDIGT |
| 6 | [007 Display-Knopfdruck](007-display-knopfdruck.md) | NIEDRIG | keine | ERLEDIGT |
| 7 | [006 Zeitleiste mit Verweil-Absicht](006-zeitleiste-hover-absicht.md) | NIEDRIG | keine | ERLEDIGT |
| 8 | [008 Warenkorb: Entfernen animieren](008-warenkorb-entfernen-animieren.md) | Ergänzung | keine | ERLEDIGT |
| 9 | [009 Summe weich wechseln](009-summe-weich-wechseln.md) | Ergänzung | keine | ERLEDIGT |
| 10 | [010 Fragen weich schließen](010-fragen-weich-schliessen.md) | Ergänzung | keine | ERLEDIGT |
| 11 | [011 Tag-Nacht-Schleife](011-tag-nacht-schleife.md) | Wunsch | nach 002 (nutzt setzeWenn) | ERLEDIGT |
| 12 | [012 Danke-Seite: Lampe geht an](012-danke-lampe-geht-an.md) | Gelegenheit | Plan 011 (Intro-Code) | ERLEDIGT |
| 13 | [013 Sende-Zustand](013-sende-zustand.md) | Gelegenheit | keine | ERLEDIGT |
| 14 | [014 Gutschein-Zeile](014-gutschein-zeile.md) | Gelegenheit | keine | ERLEDIGT |
| 15 | [015 Handy-Menü](015-handymenue.md) | Gelegenheit | keine | ERLEDIGT |
| 16 | [016 Meldungen einblenden](016-meldungen-einblenden.md) | Gelegenheit | nach 013 | ERLEDIGT |

Nach der Umsetzung: Vorschau neu bauen (Python-Skript build_preview_shop.py im Arbeitsordner), alle Seiten auf PC, Tablet und Handy
prüfen, Status hier auf ERLEDIGT setzen.
