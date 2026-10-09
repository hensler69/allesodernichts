# Skill-Verbund: womit jedes Layout überarbeitet wird

Manuel will, dass jedes Layout (HELIA, HORTA und jedes künftige) mit denselben Skills überarbeitet wird, und dass diese Skills
zusammen mit allen Design-Vorlagen in einem Skill liegen. Dies ist der Platz dafür.

## Stand
Manuel hat in der Nachricht vom 09.10.2026 "die folgenden Skills" angekündigt, aber keine genannt (es stand keine Liste in der
Nachricht). Die drei Skills sind noch offen. Sobald er sie nennt:
1. Die Zeilen in der Tabelle unten ausfüllen (Reihenfolge, Name, Aufgabe, was sie am Layout prüfen oder ändern).
2. Die Beschreibung in `SKILL.md` ergänzen.
3. Jedes Layout in `shops/` und `vorlagen/` damit durchgehen und die Ergebnisse als Regeln in die Look-Dateien schreiben.
4. Eine Notiz in `notes/` anlegen.

## Die drei Skills (offen)
| Reihenfolge | Skill | Aufgabe am Layout | Ergebnis kommt in |
| --- | --- | --- | --- |
| 1 | (noch nicht genannt) | | |
| 2 | (noch nicht genannt) | | |
| 3 | (noch nicht genannt) | | |

## Bisher schon eingearbeitet (aus `ein-produkt-shop`)
Diese Skills wurden beim HELIA-Shop angewendet und stehen als feste Regeln in `ein-produkt-shop/references/`. Sie bleiben gültig
und werden bei Bedarf zusätzlich aufgerufen:

| Skill | Wofür | Wo die Ergebnisse stehen |
| --- | --- | --- |
| gpt-taste | Aufbau (AIDA), breite Überschriften, lückenloses Raster, große Abstände | `gestaltung.md` |
| apple-design | Glas, Federn, Unterbrechbarkeit, Typografie | `gestaltung.md`, `bewegung.md` |
| impeccable | Farbe für Aufmerksamkeit, Hierarchie, Barrierefreiheit | `gestaltung.md` |
| improve-animations | Bewegung prüfen und verbessern | `bewegung.md` |
| find-animation-opportunities | Wo Bewegung fehlt, und wo sie nicht hingehört | `bewegung.md` |
| emil-design-eng | Details, Besuchergefühl, Knopf-Rückmeldung | `besuchergefuehl.md`, `bewegung.md` |
| animate | Bewegung von Grund auf bauen | `bewegung.md` |

Bei Konflikten gehen die Grundregeln des Nutzers vor (zum Beispiel "genau eine Handlungsaufforderung" vor zwei Knöpfen im Kopfbereich).

## So wird ein Layout damit überarbeitet
1. Layout als Bildschirmfoto (PC und Handy) ansehen und den Ist-Zustand in zwei Sätzen beschreiben.
2. Die Skills der Tabelle der Reihe nach anwenden. Jeder Skill liefert eine Liste Vorher/Nachher, danach wird umgesetzt.
3. Nach jedem Skill testen (Seitentest, Bildschirmfotos). Nie mehrere Skills ungeprüft hintereinander.
4. Am Ende `text_check.py` und der CHECK aus `ein-produkt-shop`, danach Vorschau neu bauen.
