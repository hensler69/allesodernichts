# NAS100 (Nasdaq 100, CFD bei IQ Capital): ORB plus TJR-Familie

Wunsch des Nutzers (29.10.2026): eine eigene Strategie für den Nasdaq 100, **getrennt vom S&P 500** (eigene Datei
`references/strategie-spx500.md`), so wie er ihn handelt: als CFD **„NAS100“ bei IQ Capital** (Kurs ca. 29.500,
Spread ca. 1,89 Punkte = 189 IQ-Ticks). Anwenden, wenn er morgens „Guten Morgen“ schreibt und im selben Satz den
Markt nennt (z. B. „Guten Morgen, heute NAS100“).

**Quellen**:
- zwei Bildschirmaufnahmen (je ca. 13 Sekunden) eines Videos mit dem Logo „Mind Over Market“ zur **ORB-Strategie**
  (Opening Range Breakout), Ton englisch, mit Whisper transkribiert, dazu die eingeblendete Infografik
  „ORB Strategy“. **Das Beispiel im Video ist der S&P 500 (MES1!), nicht der Nasdaq.** Die Übertragung auf NAS100 ist
  deshalb eine Ergänzung: Die Schritte bleiben gleich, die Punktwerte werden umgerechnet (Abschnitt 2).
- das ganze **TJR-Setup** mit seinen Varianten aus `references/tjr-setup.md`, `references/key-level-variante.md` und
  `references/fvg-ifvg.md`.

Hier steht nur, was dort gesagt oder gezeigt wird. Was dazukommt, ist als **Ergänzung** gekennzeichnet.

**Einordnung**: Die Regel „nur vier Setups“ gilt für EURUSD. Für NAS100 gibt es zwei Setups:
- **ORB-NAS100**: Ausbruch aus der Eröffnungsspanne mit Rücktest, also eine **Fortsetzung**.
- **TJR-Familie** (TJR, TJR-KL, TJR-IF, TJR-FE): Sweep und Wende, also eine **Umkehr**.

Beide treffen sich an den Kanten der Spanne: Hält der Ausbruch, ist es ORB. Scheitert er, ist es ein Sweep, also TJR
in die Gegenrichtung (Abschnitt 6).

## Inhalt

1. Was im Video steht
2. Instrument bei IQ Capital, Chart und was beim Nasdaq anders ist
3. Zeiten
4. ORB-NAS100 (Pflicht-Bedingungen)
5. TJR-Familie auf NAS100
6. ORB oder TJR: der Fehlausbruch
7. Noten und Konfluenz
8. Vor dem Trade (Morgenplan, 15:15, 15:46)
9. Während des Trades
10. Risiken
11. Bilder, Grafik, Journal

## 1. Was im Video steht

**Gesprochen** (sinngemäß übersetzt, Kraftausdrücke weggelassen; die Aufnahmen beginnen und enden mitten im Satz):
1. „[Markiere] die erste 15-Minuten-Kerze zur New-Yorker Eröffnung, und stell sicher, dass du auf den ES-Futures
   bist.“
2. „Schritt zwei: Warte auf einen Ausbruch, und zwar auf dem **1-Minuten-Chart**. **Wenn der Körper nicht außerhalb
   der Spanne schließt, ist es kein Ausbruch.**“
3. „Ausbruch nach oben. Schritt drei: Warten, bis der Kurs zurückkommt und testet, sicherstellen, dass er abgewiesen
   wird, dann einsteigen.“
4. „Mit **Retest** meine ich nur, dass der Kurs zurückkommt und den Bereich **berührt**.“
5. „Mit **Rejection** meine ich **Kerzenmuster**, **Ablehnungs-Kerzen** und **Konsolidierung** an dem Bereich.“
6. „Wir haben eine **Morning-Star-Formation**, dann eine bullische Kerze, die wieder **außerhalb der Spanne
   schließt**: mehr als genug Bestätigung für den Einstieg.“
7. „Stop hierhin, und dann zielen wir auf **20 bis 25 Punkte**.“ (Das sind S&P-Punkte.)

**Infografik „ORB Strategy“**:
1. Hoch und Tief der ersten **5 bis 15 Minuten** nach Marktöffnung markieren.
2. Auf den Ausbruch über das Hoch bzw. unter das Tief warten, **bei erhöhtem Volumen**.
3. Retest und Ablehnung am Hoch bzw. Tief abwarten, dann in Ausbruchs-Richtung einsteigen, **Stop unter dem anderen
   Ende der Spanne**.

**Gezeigt** (MES1!, 02.03.2026, Zeiten New York):
- Die erste 15-Min.-Kerze ab 09:30 ist als Box markiert.
- Auf 1 Min. sticht zuerst nur ein **Docht** über das Hoch („kein Ausbruch“), dann schließen Körper darüber.
- Rücklauf, Berührung der Kante, Morning Star, dann eine grüne Kerze mit Schluss wieder über der Kante.
- **Einstieg 09:54 an der Kante. Stop 7,75 Punkte = 0,113 %** (knapp unter den Ablehnungs-Tiefs). **Ziel 22 Punkte
  = 0,321 %, 2,84R.** Das Ziel wird gegen 10:08 erreicht.

**Widerspruch im Video**: Die Infografik sagt „Stop unter dem anderen Ende der Spanne“, der gezeigte Trade hat ihn
unter den Ablehnungs-Tiefs. **Standard ist der gezeigte Trade** (Stop hinter dem Ungültigkeits-Punkt, seine Regel).
Den weiten Stop gibt es nur als Variante, wenn trotzdem ≥ 2R herauskommen.

## 2. Instrument bei IQ Capital, Chart und was beim Nasdaq anders ist

- **Handel**: CFD **NAS100** bei IQ Capital. In IQ ist ein Tick 0,01 Punkte (Spread 189 = 1,89 Punkte).
- **1 Unit = 10 $ pro Punkt** (gemessen im IQ-Order-Panel am 29.10.2026: 0,5 Units mit Stop 10 Punkte = 50 $
  Risiko; die Symbol-Info zeigt keinen Punktwert). Positionsgröße immer mit `scripts/rechner.py --markt NAS100`.
  Beispiel: Stop 35 Punkte → **0,71 Units** für 250 $. Ändert IQ den Wert, zeigt das Panel bei „Risk“ den Betrag zum Gegenprüfen.
- **Chart**: Levels auf dem Chart messen, dessen Kurse er handelt, also **NAS100 in IQ**. Andere Charts
  (OANDA:NAS100USD, NQ1!) weichen ab; NQ1! ist in kostenlosen TradingView-Konten meist auch verzögert (Ergänzung).
- **Punkte umrechnen (Ergänzung)**: Der Nasdaq steht ca. 3,8-mal so hoch wie der S&P 500 und schwankt stärker. Feste
  S&P-Punkte passen deshalb nicht. Orientierung an den **Prozenten** aus dem Video:
  - Ziel ca. 0,3 %, also **ca. 90 Punkte** bei 29.500;
  - der Stop im Beispiel war 0,11 %, also ca. 33 Punkte.
  Maßgeblich bleibt aber: Stop hinter dem Ungültigkeits-Punkt, Ziel knapp vor der Liquidität, ≥ 2R.
- **Spread** 1,89 Punkte: deutlich mehr als beim SPX500. Bei Stop und Einstieg mitrechnen.
- **Was beim Nasdaq anders ist (Ergänzung)**:
  - Er ist technologielastig.
  - Er reagiert stärker auf Zinsen, Anleiherenditen, CPI und die Fed.
  - **Quartalszahlen der großen Tech-Werte** (Apple, Microsoft, Nvidia, Amazon, Alphabet, Meta, Tesla) kommen meist
    nach US-Börsenschluss (ca. 22:00 MEZ). Sie verschieben den nächsten Tag oft stark. Im Morgenplan prüfen.
  - Die Kerzen sind schneller, Fehlausbrüche häufiger. Die Rejection muss deshalb klar sein.

## 3. Zeiten

Normal / in den Zeitumstellungs-Wochen (z. B. 26.–31.10.2026) eine Stunde früher:

| Was | New York | Berlin |
|---|---|---|
| Kassa-Eröffnung, Beginn der Spanne | 09:30 | **15:30** / 14:30 |
| Spanne fertig (15-Min.-Kerze schließt) | 09:45 | **15:45** / 14:45 |
| US-Daten um 08:30 (BIP, CPI, Arbeitsmarkt) | 08:30 | 14:30 / 13:30, also vor der Spanne |
| US-Daten um 10:00 (ISM, Verbrauchervertrauen, JOLTS) | 10:00 | **16:00** / 15:00, also mitten im Rücktest |
| Silver-Bullet-Fenster (das Beispiel im SB-Beitrag war NAS100) | 10:00–11:00 | 16:00–17:00 / 15:00–16:00 |
| Letzter ORB-Einstieg (Ergänzung) | 11:30 | 17:30 / 16:30 |
| Tech-Quartalszahlen | ca. 16:00–16:30 | ca. 22:00–22:30 / 21:00–21:30 |

- Seine Regeln gelten: keine neuen Einstiege 15 Min. vor bis 15 Min. nach US-Daten, an Fed-Tagen ab 30 Min. vor dem
  Entscheid keine Position. **Fällt die Spanne in eine Sperrzeit oder in eine EZB-/Fed-Pressekonferenz, gibt es an
  dem Tag kein ORB.** Kein NAS100-Trade über große Tech-Zahlen am Abend halten (Ergänzung).

## 4. ORB-NAS100 (Pflicht-Bedingungen)

Zeitrahmen: Spanne auf **15 Min.**, Ausbruch, Rücktest und Einstieg auf **1 Min.** (wie im Video). Struktur und Ziele
auf 15 Min./1H.

**Long** (Short genau gespiegelt):

| Pflicht | Bedeutung | Quelle |
|---|---|---|
| 1. Spanne | Hoch und Tief der **ersten 15-Min.-Kerze ab 09:30 New York** | Video |
| 2. Ausbruch | Eine **1-Min.-Kerze schließt mit dem Körper über dem Hoch**. Ein Docht ist kein Ausbruch. | Video |
| 3. Retest | Der Kurs läuft zurück und **berührt** die Kante | Video |
| 4. Rejection | An der Kante: Kerzenmuster (Morning Star, bullische Engulfing), Ablehnungs-Dochte oder Konsolidierung; dann **schließt eine 1-Min.-Kerze wieder über der Kante** = Einstieg (Market beim Schluss) | Video |
| 5. Risiko-Rahmen | Stop knapp unter dem Tief der Rejection plus Spread (1,89 Punkte); Ziel knapp vor der nächsten Liquidität, Orientierung ca. 0,3 % (≈ 90 Punkte); **≥ 2R**; außerhalb der Sperrzeit; Tageslimit nicht erreicht | Video (in %), seine Regeln |

- **Ungültig**: Ein 1-Min.-Körper schließt unter dem Tief der Rejection (dort liegt der Stop).
- **Nur Dafür/Dagegen** (nicht im Video):
  - Tages-Bias,
  - Tick-Volumen beim Ausbruch,
  - eine 5-Min.-Kerze schließt ebenfalls außerhalb (zusätzliche Bestätigung gegen Fehlausbrüche, Ergänzung),
  - VWAP,
  - Volumenprofil,
  - Größe der Spanne.

## 5. TJR-Familie auf NAS100

Pflicht-Bedingungen wie in den drei TJR-Dateien, mit diesen Anpassungen:
- **Levels (Key Levels)**:
  - Vortageshoch/-tief (PDH/PDL) und Vortagesschluss,
  - Nacht-Hoch/-tief (Asia und London),
  - Swing-Hochs/-Tiefs auf 1H und 4H,
  - **Hoch und Tief der Spanne**, sobald sie steht,
  - offene FVGs mit Status (offen / angelaufen / IFVG),
  - **Lücke zum Vortagesschluss** nach Tech-Zahlen (Ergänzung).
- **„Markteröffnung“ (TJR-KL)** = Kassa-Eröffnung 09:30 New York. Sweeps in der Nacht lösen nichts aus.
- **Zeitrahmen**: Sweep auf 15 Min./1H, BOS und FVG auf M5, Auslöser auf M1. Bei sehr schnellen Bewegungen darf
  M5 → M1 eine Stufe kleiner sein (L2·4).
- **Stop**: hinter dem Sweep-Extrem (TJR, TJR-KL), hinter der IFVG (TJR-IF), hinter der FVG-Bewegung (TJR-FE). Immer
  plus Spread und ohne Liquidität direkt dahinter.
- **Ziel**: nächste Gegen-Liquidität, ≥ 2R.
- **SMT ist hier keine Bedingung** (Wunsch des Nutzers: Märkte getrennt). Bei TJR fällt der SMT-Punkt also weg,
  dafür muss die Wende auf M5 sauber sein (kräftige Kerze, Displacement).

## 6. ORB oder TJR: der Fehlausbruch

- **Docht über das Hoch der Spanne, Körper bleibt drin** (oder schließt kurz darüber und sofort wieder darunter):
  Das ist ein **Sweep** der Liquidität über der Spanne.
- **Folgt ein M5-BOS nach unten** (oder ein Körper-Schluss durch eine bullische FVG = IFVG): **TJR-Short** bzw.
  TJR-KL/TJR-IF, Ziel am Tief der Spanne.
- **Folgt ein echter Körper-Schluss darüber mit Retest**: **ORB-Long**.
- Nie beide Richtungen an derselben Kante handeln.
- Beim Nasdaq kommen Fehlausbrüche öfter vor. Deshalb vor einem ORB-Einstieg immer erst prüfen, ob es nicht ein Sweep
  ist.

## 7. Noten und Konfluenz

- **A** = ORB-NAS100 **oder** ein TJR-Setup vollständig + Risiko-Rahmen.
- **A+** = zwei Setups am selben Ort in dieselbe Richtung, zum Beispiel:
  - ORB-Retest und TJR-IF an derselben Kante,
  - ORB oder TJR im Silver-Bullet-Fenster mit Sweep, CHoCH und FVG.
- Sonst **„Lass es.“** in der ersten Zeile, ohne Einstiegswerte.
- **Dafür/Dagegen** mit Anzahl:
  - Bias Daily/4H,
  - Größe der Spanne,
  - Ziel-Liquidität noch offen,
  - 5-Min.-Bestätigung,
  - Tick-Volumen,
  - VWAP (Ergänzung),
  - Volumenprofil,
  - Termine,
  - Tech-Zahlen am Vortag oder heute Abend.

## 8. Vor dem Trade

**Morgenplan** (wenn er morgens „NAS100“ nennt; die Spanne entsteht erst am Nachmittag):
1. **Termine** per Websuche:
   - US-Daten 08:30 und 10:00 New York,
   - Fed,
   - **Tech-Quartalszahlen** gestern Abend und heute Abend.
   Liegt die Spanne in einer Sperrzeit: „Heute kein ORB“ in die erste Zeile.
2. **Bias** aus Daily und 4H (L3·3). Bei einer Lücke nach Tech-Zahlen: Wo liegt der Vortagesschluss (Ziel des
   Lückenschlusses)?
3. **Levels** einzeichnen (Abschnitt 5) mit FVG-Status. Pivots nur als Konfluenz
   (`scripts/pivots.py --pip 1 --band 8 --toleranz 10`, Band und Toleranz in Punkten, Ergänzung).
4. **Szenarien** für den Nachmittag:
   - Wo liegt Liquidität über und unter dem Kurs?
   - Welche Levels machen einen Fehlausbruch zum Sweep?
   - Welche Ziele wären ≥ 2R?

**15:15 MEZ** (14:15): neues 15-Min.-Bild, Levels prüfen, Termine des Nachmittags nennen.

**15:46 MEZ** (14:46), nach dem Schluss der ersten 15-Min.-Kerze:
1. Spanne als Box einzeichnen (Hoch/Tief aus der Kopfzeile, nach rechts verlängert).
2. **Größe der Spanne prüfen**: Wo läge der Stop bei einem Retest? Bringt das ≥ 2R bis zur nächsten Liquidität?
3. **Alarme** an Hoch und Tief der Spanne.

**Beim Ausbruch** (Alarm): 1-Min.-Körper außerhalb? Nur ein Docht → Fehlausbruch prüfen (Abschnitt 6).

**Beim Retest**: Muster an der Kante, dann Kerzenschluss wieder außerhalb.
- Einstieg Market beim Schluss.
- Stop unter dem Rejection-Tief plus Spread.
- Ziel festlegen.
- Units mit `rechner.py`, beide Schalter an.

## 9. Während des Trades

- **Stop bleibt** und wird nie vergrößert. **Breakeven bei 1R**. Nicht aus Angst schließen, nicht nachlegen.
- **Gegen-IFVG** auf M1/M5, also eine Lücke in Trade-Richtung, mit Körper durchbrochen:
  - Warnzeichen in die erste Zeile.
  - Der Stop bleibt.
  - Ab 1R kommt der Stop auf Breakeven (`references/fvg-ifvg.md`, Abschnitt 4).
- **Vor US-Daten um 10:00 New York**:
  - kein neuer Einstieg;
  - ein offener Trade behält seinen Stop;
  - ist er schon ≥ 1R im Plus, steht er auf Breakeven.
- **Am Ziel** raus. Kein zweiter ORB in dieselbe Richtung am selben Tag. Nicht über Tech-Zahlen am Abend halten
  (Ergänzung).

## 10. Risiken (zusätzlich zur Prüfliste in SKILL.md)

- **Fehlausbruch** (Docht oder nur kurz außerhalb): der häufigste ORB-Verlust, beim Nasdaq noch häufiger.
- **Große Spanne**: Stop und Ziel passen nicht mehr zu 2R → „Lass es.“
- **US-Daten um 10:00** mitten im Rücktest: Spike durch die Kante.
- **Spread 1,89 Punkte** und Schlupf in den ersten Minuten nach 09:30. Beim CFD ist der Spread zur Eröffnung oft
  breiter.
- **Tech-Zahlen** über Nacht: Lücken und Sprünge.
- **Übertragung**: Das Video zeigt den S&P 500. Für NAS100 sind die Prozent-Ziele eine Ergänzung.
- **CFD ≠ Future**: Kurse und Volumen weichen ab. Auf demselben Instrument messen und handeln.
- **Tageslimit**: höchstens 2 Verluste pro Tag, **zusammen mit allen Märkten**.
- **Ein Beispiel-Trade** belegt keine Trefferquote. Erst einige Wochen im TradingView-Replay oder Papierhandel und im
  Journal mitschreiben (Ergänzung).

## 11. Bilder, Grafik, Journal

**Bilder** (normal / Umstellungs-Woche):

| Wann | Bild | Wofür |
|---|---|---|
| Morgens (Morgen-Paket) | NAS100 **Daily** mit Kopfzeile von gestern, **1H** (3–5 Tage), **15 Min.** (gestern und die Nacht), IQ-Kopfleiste | Bias, Levels, Termine |
| 15:15 / 14:15 | NAS100 **15 Min.** | Levels aktualisieren |
| 15:46 / 14:46 | NAS100 **15 Min.**, Maus auf der 09:30-Kerze (Kopfzeile Hoch/Tief) | Spanne, Positionsgröße |
| Alarm an der Spanne | NAS100 **1 Min.** und **5 Min.** | Ausbruch oder Fehlausbruch |
| Retest | NAS100 **1 Min.** | Rejection, Einstieg |
| Vor dem Klick | IQ-Order-Panel | Units, Stop, Ziel, Schalter |
| Im Trade | NAS100 **1 Min.** bei 1R, sonst alle 15 Min. | Breakeven, Gegen-IFVG |

**Grafik**:
- Spanne als Box mit den Linien „OR-Hoch“ und „OR-Tief“.
- Levels, Ausbruch, Retest, Einstieg, Stop und Ziel.
- Bei einem Fehlausbruch zusätzlich den Sweep-Docht und die TJR-Linien.

**Journal**:
- Kennung „ORB-NAS100“ bzw. „TJR-NAS100“, „TJR-KL-NAS100“ usw.
- Art der Rejection: Morning Star, Engulfing, Docht oder Konsolidierung.
- Größe der Spanne in Punkten und Ergebnis in R.
