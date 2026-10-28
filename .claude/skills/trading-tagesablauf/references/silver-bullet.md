# Silver Bullet: Ein-Stunden-Fenster mit Sweep, Strukturbruch und FVG

Wunsch des Nutzers (28.10.2026): dieses Szenario in seinen Tagesablauf aufnehmen. Quelle: Instagram-Beitrag von
„fxqon5“ (28.10.2026), Beispiel NAS100 auf 5 Min. (OANDA) vom 15.10.2026. Inhalt hier nur so, wie er im Beitrag
steht; was dazukommt, ist als **Ergänzung** gekennzeichnet.

## Inhalt

1. Die Regeln aus dem Beitrag
2. Das Beispiel aus dem Beitrag
3. Übertragen auf EURUSD und seine Regeln
4. Zeitfenster in Berliner Zeit
5. Ablauf im Fenster (Wenn-dann)
6. Risiken
7. Einbau in Morgenplan, Live und Grafik

## 1. Die Regeln aus dem Beitrag

„ICT Silver Bullet“: ein Zeitfenster von einer Stunde, **10–11 Uhr New Yorker Zeit**.

1. **Liquidität zuerst holen** (Sweep).
2. **Eine Kerze schließt jenseits des letzten Hochs** (CHoCH, Change of Character; bei einem Short: jenseits des
   letzten Tiefs).
3. **Im Fenster entsteht eine FVG.**
4. **Einstieg beim Rücklauf in die FVG**, Stop 10 Punkte hinter der FVG, Ziel das Hoch des Vortags.

Schlussregel: Im Beitragstext steht „No sweep + no CHoCH = no trade“. Im Video selbst lautet die letzte Regel laut
Nutzer kurz **„No sweep, no trade“**: Ohne Sweep gibt es keinen Trade, egal wie gut der Rest aussieht. Der CHoCH bleibt
trotzdem Bedingung 2. Beides passt zu seiner Sweep-Pflicht seit dem 27.10.

## 2. Das Beispiel aus dem Beitrag

NAS100, 5 Min., 15.10.2026 (Werte aus dem Bild abgelesen, gerundet):
- Kurz vor 10:00 New York sticht der Kurs unter die Tiefs der Vor-Spanne bis ca. 29.440 (Sweep).
- Danach schließt eine Kerze über dem letzten tieferen Hoch („LH“, ca. 29.600) → CHoCH.
- Die Bewegung hinterlässt eine FVG ca. 29.505–29.590.
- Einstieg beim Rücklauf in die FVG, Stop 10 Punkte unter der FVG (ca. 29.495), Ziel Vortageshoch 29.828.
- Ergebnis laut Beitrag: +234 Punkte, 2,6R, Ziel kurz vor 11:00 erreicht.

## 3. Übertragen auf EURUSD und seine Regeln

Das Muster passt fast vollständig zu seinem Modell. Unterschiede und wie sie aufgelöst werden:

| Silver Bullet (Beitrag) | Sein Modell (L1–L3, Checkliste) | So machen wir es |
|---|---|---|
| Sweep zuerst | Sweep ist Pflicht (seit 27.10.) | gleich |
| CHoCH: Schluss jenseits des **letzten Hochs/Tiefs** (Struktur) | CISD: Schluss jenseits der **Eröffnung der Kerzenserie** (L3·5) | Beides prüfen. Die CISD kommt meist früher, der CHoCH ist die stärkere Bestätigung. Im Silver-Bullet-Fenster zählt der CHoCH als Pflicht, die CISD allein reicht hier nicht. |
| FVG im Fenster, Einstieg beim Rücklauf | Einstieg 2: Limit in der neuen M5-Lücke (L2·6) | gleich |
| Stop 10 Punkte hinter der FVG | Stop hinter dem Sweep-Extrem und der ganzen Zone | **Standard: seine Regel** (hinter das Sweep-Extrem). Die engere Variante (1–2 Pips hinter der FVG, bei EURUSD entsprechen die 10 NAS-Punkte grob 1–2 Pips) nur, wenn er sich bewusst dafür entscheidet: mehr R, aber häufiger ausgestoppt. |
| Ziel Vortageshoch | Ziel nächste Gegen-Liquidität (L3·6), mindestens 2R | Vortageshoch/-tief oder nächstes Session-Hoch/-Tief, knapp davor; unter 2R kein Trade |
| kein SMT erwähnt | SMT mit GBPUSD (L1·9, L2·7) | SMT bleibt Teil seiner Checkliste. Fehlt es, als Risiko nennen (schwächere Bestätigung). |
| keine Richtung erwähnt | Bias aus den Tagesschlüsseln (L3·3) | Ergänzung: bevorzugt in Richtung des Bias; Gegenrichtung nur als Ausnahme mit allen Bestätigungen |

## 4. Zeitfenster in Berliner Zeit

| Fenster | New York | Berlin (normal) | Berlin (Zeitumstellungs-Wochen, z. B. 26.–31.10.2026) |
|---|---|---|---|
| **AM Silver Bullet (aus dem Beitrag)** | 10:00–11:00 | **16:00–17:00** | 15:00–16:00 |
| London-Fenster (Ergänzung, nicht aus dem Beitrag) | 03:00–04:00 | 09:00–10:00 | 08:00–09:00 |
| PM-Fenster (Ergänzung, nicht aus dem Beitrag) | 14:00–15:00 | 20:00–21:00 | 19:00–20:00 |

- Das AM-Fenster liegt am Ende seiner Handelszeit (bis ca. 15–16 Uhr, Daytrade bis 21:30 entschieden). Es passt,
  wenn er an dem Tag so lange dabei ist.
- Das PM-Fenster nur als Information: spät, an Fed-Tagen genau in der Sperrzeit.
- **Termine**: Um 10:00 New York kommen oft Stufe-2-Daten (ISM, JOLTS, Verbrauchervertrauen, Uni Michigan). Dann
  gilt seine Sperrzeit bis 10:15 New York, das Fenster schrumpft auf 10:15–11:00. Der Daten-Spike liefert dann oft
  genau den Sweep (Szenario 1 in `references/wirtschaftstermine.md`). An Notenbank-Tagen gilt zusätzlich: ab 30 Min.
  vor dem Entscheid keine Position.

## 5. Ablauf im Fenster (Wenn-dann)

Zeitrahmen: Fenster und FVG auf **M5** (wie im Beitrag), Zonen und Ziel aus 30 Min./1H, SMT auf GBPUSD 15 Min.

1. **Vor dem Fenster** (Morgenplan oder ca. 30 Min. vorher): Liquidität auf beiden Seiten markieren, die im Fenster
   geholt werden kann (Hoch/Tief der Spanne vor dem Fenster, London-Hoch/-Tief, gleiche Hochs/Tiefs), und das Ziel
   (Vortageshoch/-tief, Session-Hoch/-Tief). Prüfen, ob von dort bis zum Ziel mindestens 2R möglich sind.
2. **Sweep im Fenster** (oder kurz davor, wie im Beispiel): Der Kurs sticht über/unter die markierte Liquidität.
3. **CHoCH**: Eine M5-Kerze **schließt** jenseits des letzten Gegen-Swings (bei Long: über dem letzten tieferen Hoch,
   bei Short: unter dem letzten höheren Tief). Ein Docht zählt nicht.
4. **FVG**: Die Bewegung hinterlässt im Fenster eine Lücke auf M5. Ohne FVG kein Einstieg.
5. **SMT** prüfen (GBPUSD 15 Min., OANDA): Hat der Partner den Sweep nicht mitgemacht?
6. **Einstieg**: Limit-Order an der Kante der FVG (bzw. in der FVG). Stop nach seiner Regel hinter das Sweep-Extrem
   (Variante: 1–2 Pips hinter die FVG, nur auf seinen Wunsch). Ziel knapp vor der Gegen-Liquidität. Lots mit
   `scripts/rechner.py` für 250 $.
7. **Zeitgrenze**: Wird die Limit-Order bis zum Ende des Fensters (11:00 New York) nicht gefüllt, löschen.
8. **Management**: wie immer. Breakeven bei 1R, Stop nie vergrößern, an Notenbank-Tagen spätestens 30 Min. vor dem
   Entscheid schließen.

## 6. Risiken (zusätzlich zur Prüfliste in SKILL.md)

- **Kein Sweep: kein Trade** (letzte Regel des Videos). Ohne CHoCH ebenfalls kein Trade (Beitragstext).
- **Die FVG wird nicht angelaufen**: kein Hinterherlaufen, Order verfällt am Fensterende.
- **Daten um 10:00 New York** im Fenster: Sperrzeit, Spike, Schlupf.
- **Enger FVG-Stop** (Variante): häufiger ausgestoppt, vor allem wenn hinter der FVG noch Liquidität liegt (gleiche
  Tiefs/Hochs, Lehre vom 27.10.).
- **Ziel zu nah**: Liegt das Vortageshoch/-tief unter 2R entfernt oder ist es heute schon geholt, kein Trade bzw.
  anderes Ziel.
- **Ein einzelnes Beispiel** (NAS100, ein Tag) belegt keine Trefferquote. Erst einige Wochen im Journal mitschreiben
  (auch die Fenster ohne Trade), dann bewerten.

## 7. Einbau in Morgenplan, Live und Grafik

- **Morgenplan**: Unter „Termine heute“ eine Zeile „Silver Bullet: 16:00–17:00 MEZ (diese Woche 15:00–16:00)“, mit
  der Liquidität, die im Fenster geholt werden kann, und dem Ziel. Kollidiert das Fenster mit Daten oder einer
  Notenbank, das dazuschreiben. Im Bild das Fenster als `zeitfenster` (Art `info`) einzeichnen.
- **Live**: Liegt die Uhrzeit im Fenster oder bis 30 Min. davor, den Status der Silver-Bullet-Punkte nennen
  (Sweep / CHoCH / FVG / SMT / 2R). Er kann dafür die Option „Silver Bullet“ nennen, wie Short 1 oder Long 1.
- **Journal**: Silver-Bullet-Trades mit Kennzeichnung „SB“ eintragen, dazu die Fenster ohne Setup, damit sich nach
  einigen Wochen zeigt, ob das Fenster für EURUSD etwas bringt.
