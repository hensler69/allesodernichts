# Werte aus Chart-Fotos und Screenshots messen

Ziel: Preise von Linien, Boxen und Dochten so genau bestimmen, dass Stop, Ziel und R stimmen, und die Genauigkeit
ehrlich angeben. Werkzeug: `scripts/chart_tools.py` (alle Pixel im Originalbild).

## Was exakt ist und was gemessen wird

- **Exakt**: die Kopfzeile (O H L C, Änderung) und die Preis-Box an der Achse (aktueller Kurs, darunter die
  Restzeit der Kerze). Achtung: Die Kopfzeile zeigt die Kerze **unter dem Fadenkreuz**, wenn eins im Bild ist
  (Zeitangabe am unteren Rand prüfen). Sonst die aktuelle Kerze.
- **Exakt in der IQ-Plattform**: die Preis-Etiketten der Order-Linien an der Achse (z. B. 1.11570 = Stop).
- **Gemessen** wird alles andere. Typische Genauigkeit: Screenshot ±0,2 Pip, gerades Foto ±0,5 Pip, schräges Foto
  ohne Preisachse ±1–2 Pips. Immer dazuschreiben: „aus dem Foto gemessen, ±x Pip“.

## Ablauf

1. `python scripts/chart_tools.py info BILD`: tatsächliche Bildgröße. Angezeigte Bilder können verkleinert sein,
   gerechnet wird im Original. Am 27.10. war ein Foto 2576 statt 2000 Pixel breit, und alle Werte lagen daneben.
2. Überblick: Bild ansehen, Bereiche festlegen. Dann vergrößerte Ausschnitte mit Pixel-Lineal:
   `python scripts/chart_tools.py raster BILD --box X0 Y0 X1 Y1 --zoom 3 --out a.png` und mit Read ansehen.
3. **Referenzen mit bekanntem Preis** suchen, mindestens 3, besser 5 oder mehr, über die ganze Höhe verteilt:
   - Preisachsen-Beschriftungen (Textmitte = Preis; bei Fotos die Neigung von Nachbarlinien übernehmen),
   - die gepunktete Kurslinie = aktueller Kurs aus Preis-Box oder Kopfzeile,
   - Linien und Boxkanten, deren Preis schon bekannt ist (aus früheren Messungen in `notes/`, vom Nutzer genannt,
     oder IQ-Order-Linien mit Etikett),
   - Docht-Enden der Kopfzeilen-Kerze (H und L).
4. Jede Referenzlinie vermessen:
   `python scripts/chart_tools.py linie BILD --x X0 X1 --y Y0 Y1` → `{"a": …, "b": …}` (y = a + b·x).
   Fenster eng um **eine** Linie legen. Zwei Linien im Fenster vermischen sich. Für helle Linien auf dunklem Grund
   `--hell`. Die Neigung b zeigt die Perspektive. Bei Fotos ist sie oben und unten verschieden, deshalb Referenzen
   über die ganze Höhe verteilen.
5. Die Referenzen in den Plan (`referenzen`, siehe `references/grafik.md`) schreiben und prüfen:
   `python scripts/chart_tools.py kalib PLAN.json`. Die Spalte „ohne“ ist der Fehler, wenn die Referenz selbst nicht
   mitzählt. Das ist die ehrliche Genauigkeit. Liegt eine Referenz deutlich daneben (> 1 Pip), ist sie meist falsch
   zugeordnet (falsche Linie, falscher Preis).
6. Gesuchte Werte bestimmen: Linien und Boxkanten mit `linie` vermessen und mit `preis PLAN.json --xy X Y` umrechnen.
   Dochte im Raster ablesen (Spitze des Dochts) und ebenso umrechnen.
7. **Gegenprüfen**: Bekannte Level (z. B. Asia-Hoch aus der Morgen-Notiz, Kopfzeile) müssen getroffen werden.
   Erst dann Werte an den Nutzer geben.

## Kerzen und Uhrzeiten richtig zuordnen

- Von der **aktuellen Kerze rückwärts zählen** (sie ist in der Kopfzeile bzw. Preis-Box) und mit der Zeitachse
  abgleichen. Am 27.10. lag eine Zuordnung eine Kerze daneben (06:50 statt 06:45). Bei Unsicherheit die Uhrzeit mit
  „ca.“ angeben oder den Nutzer bitten, mit der Maus über die Kerze zu fahren.
- Immer **beide Zeiten** nennen: Chartzeit (z. B. New York) und Berliner Zeit. Die Chart-Uhr unten rechts zeigt die
  Zeitzone (z. B. „09:15:04 UTC-4“), die Handy-Statusleiste die Ortszeit.
- Kerzenzeit = **Startzeit** der Kerze. Die 30-Min-Kerze „09:00“ schließt um 09:30. Ihr Schluss ist gleich dem
  Schluss der letzten M5-Kerze darin (09:25–09:30).

## SMT richtig vergleichen

- Beide Märkte auf **demselben Zeitrahmen** (15 Min.) und für **dieselben Kerzen** vergleichen. Die Zuordnung
  gelingt über gemeinsame markante Kerzen (z. B. den gemeinsamen Abverkauf zur London-Eröffnung).
- **Dieselbe Datenquelle**: OANDA hat 5 Nachkommastellen, ICE nur 4. Bei knappen Unterschieden (unter 1 Pip)
  entscheidet die fünfte Stelle. Dann den Nutzer bitten, mit der Maus über die beiden Kerzen zu fahren und die
  H-Werte abzulesen.
- Ein Unterschied unter ca. 0,5 Pip ist praktisch „gleich hoch“. Dann ist das SMT schwach, so auch benennen.

## Stolperfallen

- Automatische Suche nach Tiefs/Hochs greift gestrichelte Session-Trenner oder Text auf. Dochte lieber im Raster
  ablesen.
- Moiré und Unschärfe: `linie` nimmt den gewichteten Schwerpunkt der dunklen Stelle. Streuung über 1 px heißt
  unsauberes Fenster.
- Die Preisachse kann bei Fotos gekrümmt und gestaucht sein (Linse, Perspektive). Deshalb nie nur zwei Achsenwerte
  linear verbinden, wenn mehr Referenzen da sind.
- Stimmt die Kalibrierung nicht und es eilt: lieber ehrlich „ca.“ mit größerer Spanne sagen und um einen
  Screenshot bitten, als einen falschen Pip-genauen Wert zu nennen.
