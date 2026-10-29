# TJR-Tagesstrategie (Text-Box aus dem Video) für S&P 500 und Nasdaq: einzeln und zusammen

Wunsch des Nutzers (29.10.2026): „Erstell mir eine Strategie für S&P 500, also ES, und Nasdaq, also NQ, anhand des
Videos, für die beiden einzelnen und zusammen“. Dazu der Text für eine Box im eigenen TradingView-Layout, so wie im
Video. Er handelt beide als CFD bei IQ Capital: **SPX500** (= S&P 500, ES) und **NAS100** (= Nasdaq 100, NQ).

**Quelle**: Bildschirmaufnahme (18 Sekunden) eines Reels „TJR Explains His Exact Daytrading Strategy“. Der Ton ist
englisch und wurde mit Whisper transkribiert. Im Chart ist eine Text-Box mit 6 Schritten zu sehen; deren rechter Rand
ist in zwei Zeilen abgeschnitten. Gezeigt werden Short-Beispiele im ES/NQ (5 Min. und 1 Min.). Was nicht aus dem Video
stammt, ist als **Ergänzung** gekennzeichnet.

**Einordnung**: Das ist das TJR-Modell, das schon als TJR-KL im Skill steht (`references/key-level-variante.md`).
Diese Box ist die vollständige Fassung. Sie ergänzt zwei Dinge:
- **Schritt 2b**: Sweep im Premarket bzw. in einer anderen Session.
- **Schritt 4**: Bestätigung auf **1 Min.** in der Fortsetzungs-Zone.

Für SPX500 und NAS100 ist sie **das TJR-Setup** (Journal „TJR-SPX500“, „TJR-NAS100“, „TJR-ES+NQ“). Das ORB-Setup aus
`references/strategie-spx500.md` und `references/strategie-nas100.md` bleibt daneben bestehen.

## Inhalt

1. Was im Video steht
2. Die 6 Schritte auf Deutsch
2a. Long und Short mit der ganzen TJR-Familie
3. Variante A: SPX500 allein
4. Variante B: NAS100 allein
5. Variante C: zusammen (ES + NQ mit SMT)
6. Pflicht, Risiko-Rahmen, Noten
7. Vor und während des Trades
8. Text für die Box im Layout
9. Risiken, Journal

## 1. Was im Video steht

**Text-Box im Chart** (wörtlich, „…“ = am rechten Rand abgeschnitten):
```
1: liquidity sweep(1hr, 4hr, session highs/lows)
2: 5 confirmation conf (bos,ifvg,smt,79% ext)
2b: IF the liq sweep happens during premarket or a dif ses…
3: 5 continuation conf (eq or fvg or if 2b happens a smt div…
4: 1 confirmation conf (bos,ifvg,smt,79%ext)
5: enter
6: target prev draws on liq in our direction
```

**Gesprochen** (sinngemäß übersetzt, Kraftausdrücke weggelassen):
1. „Wir müssen warten, bis der New Yorker Markt öffnet, wir müssen auf eine **5-Minuten-Manipulation** warten.“
2. „Wir haben hier ein **5-Minuten-Hoch**. Haben wir es im **ES** gesweept? **Nein.** Aber im **Nasdaq** schon, und
   dadurch gab es eine Manipulation im Nasdaq. **Eine SMT-Divergenz.**“
3. „Runter auf den **1-Minuten-Chart** … [BOS] oder eine **inverse Fair Value Gap**. Da ist die inverse FVG.“
4. „Was kommt als Nächstes? **Einsteigen.** **Stop über den Hochs.** Gewinn mitnehmen.“
5. Am Ende nennt er einen Tagesgewinn von 45.000 $ „mit genau derselben Strategie“. Das ist Werbung, kein Beleg für
   eine Trefferquote.

**Gezeigt**: mehrere Short-Beispiele.
- Ein Hoch wird gesweept (zwei Linien knapp übereinander).
- Darunter liegen graue Boxen und gestrichelte Lücken (FVG/IFVG).
- Die Short-Position hat den Stop über dem Hoch und das Ziel weit darunter. Der Kurs fällt danach stark.

**Was abgeschnitten ist**: das Ende von 2b und 3. Aus dem Gesprochenen ergibt sich:
- **2b**: Kam der Sweep im Premarket oder in einer anderen Session, wird nach der New-Yorker Eröffnung auf eine
  5-Min.-Manipulation gewartet (Satz 1).
- **3**: Im Fall 2b ist die SMT-Divergenz an dieser Manipulation die Fortsetzungs-Bestätigung (Satz 2).

Das ist eine Auslegung, keine wörtliche Box-Zeile.

## 2. Die 6 Schritte auf Deutsch

| Schritt | Video | Bedeutung | Zeitrahmen |
|---|---|---|---|
| 1 | liquidity sweep (1hr, 4hr, session highs/lows) | Ein Hoch/Tief auf 1H oder 4H oder ein Session-Hoch/-Tief (Asia, London, Vortag) wird gesweept | 1H/4H/15 Min. |
| 2 | 5 confirmation conf (bos, ifvg, smt, 79% ext) | Bestätigung der Wende auf **5 Min.**: BOS **oder** IFVG **oder** SMT **oder** Schluss jenseits der 79-%-Fib-Stufe des Sweep-Beins | 5 Min. |
| 2b | if the liq sweep happens during premarket or a dif session … | Kam der Sweep im Premarket (vor 15:30 MEZ) oder in einer anderen Session: nach der NY-Eröffnung auf eine **5-Min.-Manipulation** warten (ein 5-Min.-Hoch/-Tief nach der Eröffnung wird gesweept) | 5 Min. |
| 3 | 5 continuation conf (eq or fvg or if 2b … smt div …) | Rücklauf auf **5 Min.** in die Fortsetzungs-Zone: **EQ** (50 % des Wende-Beins) **oder** **FVG**; im Fall 2b zählt eine **SMT-Divergenz** an der Manipulation | 5 Min. |
| 4 | 1 confirmation conf (bos, ifvg, smt, 79% ext) | In der Zone Bestätigung auf **1 Min.**: BOS oder IFVG oder SMT oder 79 % | 1 Min. |
| 5 | enter | Einstieg beim Schluss der Bestätigungs-Kerze; **Stop über dem Hoch** (Short) bzw. unter dem Tief (Long) des Sweeps | 1 Min. |
| 6 | target prev draws on liq in our direction | Ziel: die vorige Liquidität in Trade-Richtung (altes Tief/Hoch, Session-Tief/-Hoch, offene FVG) | 15 Min./1H |

- **79 % ext** ist wie in TJR-KL ausgelegt: Fibonacci über das Sweep-Bein, Schluss jenseits der 79-%-Stufe. Das ist
  die unsicherste Bestätigung; Rangfolge BOS vor IFVG vor SMT vor 79 % (Ergänzung).
- **Eine** Bestätigung je Schritt reicht laut Box („bos, ifvg, smt, 79%“ als Auswahl). Mehrere zählen als Dafür.

## 2a. Long und Short mit der ganzen TJR-Familie

Wunsch des Nutzers (29.10.2026): dasselbe nicht nur für Short, sondern auch für Long, mit allem, was im TJR-Setup
schon steht. Das Video zeigt nur Shorts. Long ist **genau gespiegelt**. Die TJR-Familie füllt die Schritte so:
- **TJR** (`references/tjr-setup.md`): Schritt 2 = M5-BOS, Schritt 3 = M5-FVG, Schritt 4 = M1-BOS.
- **TJR-KL** (`references/key-level-variante.md`): mehr Auswahl in Schritt 2 (BOS/IFVG/79 %) und 3
  (FVG/EQ/Order Block/Breaker); als Auslöser auch eine M5-Kerze, die aus der Zone herausstößt.
- **TJR-IF** (`references/fvg-ifvg.md`): IFVG als Wende in Schritt 2 und als Zone in Schritt 3. Einstieg dann per
  Limit an der IFVG-Kante, Stop hinter der IFVG (ohne Tiefs/Hochs direkt dahinter).
- **TJR-FE** (`references/fvg-ifvg.md`): Einstieg verpasst? Die 1. oder 2. FVG nach dem BOS, darin dreht M1.

| Schritt | **LONG** (Sweep eines Tiefs) | **SHORT** (Sweep eines Hochs) |
|---|---|---|
| 1 Sweep | Tief auf 1H/4H, Asia-/London-/Vortagestief oder Tief der Eröffnungsspanne wird unterstochen, Schluss zurück darüber | Hoch auf 1H/4H, Asia-/London-/Vortageshoch oder Hoch der Spanne wird überstochen, Schluss zurück darunter |
| 2 5-Min.-Wende | BOS: Schluss über dem letzten tieferen Hoch · IFVG: bärische FVG mit Körper **überschlossen** · 79 %: Schluss über der 79-%-Stufe · (zusammen: SMT, der andere Index macht das Tief nicht mit) | BOS: Schluss unter dem letzten höheren Tief · IFVG: bullische FVG mit Körper **unterschlossen** · 79 %: Schluss unter der 79-%-Stufe · (zusammen: SMT, der andere Index macht das Hoch nicht mit) |
| 2b Premarket | Tief schon vor 15:30 geholt → nach der Eröffnung entsteht ein 5-Min.-Tief, das gesweept wird | Hoch schon vor 15:30 geholt → nach der Eröffnung entsteht ein 5-Min.-Hoch, das gesweept wird |
| 3 5-Min.-Rücklauf | in **bullische** FVG, EQ (50 %), Order Block (letzte rote Kerze vor dem Anstieg), Breaker oder IFVG, ohne 5-Min.-Schluss darunter | in **bärische** FVG, EQ (50 %), Order Block (letzte grüne Kerze vor dem Abverkauf), Breaker oder IFVG, ohne 5-Min.-Schluss darüber |
| 4 1-Min.-Bestätigung | BOS nach oben (höheres Hoch), IFVG nach oben, (SMT), 79 % · oder M5-Kerze stößt nach oben aus der Zone (KL) | BOS nach unten (tieferes Tief), IFVG nach unten, (SMT), 79 % · oder M5-Kerze stößt nach unten aus der Zone (KL) |
| 5 Einstieg | beim Schluss der Bestätigungs-Kerze · **Stop unter dem Sweep-Tief** + Spread (IF-Limit: Stop unter der IFVG) | beim Schluss der Bestätigungs-Kerze · **Stop über dem Sweep-Hoch** + Spread (IF-Limit: Stop über der IFVG) |
| 6 Ziel | vorige Hochs/Liquidität oben (Session-Hoch, Vortageshoch, offene FVG), ≥ 2R | vorige Tiefs/Liquidität unten (Session-Tief, Vortagestief, offene FVG), ≥ 2R |
| Nachzügler (FE) | 1./2. bullische FVG nach dem BOS, darin M1 höheres Tief + höheres Hoch | 1./2. bärische FVG nach dem BOS, darin M1 tieferes Hoch + tieferes Tief |

## 3. Variante A: SPX500 allein

- Nur der SPX500-Chart. **SMT fällt weg**. Erlaubt sind also BOS, IFVG und 79 % in Schritt 2 und 4.
- **Schritt 2b allein**: Nach 15:30 MEZ entsteht ein 5-Min.-Hoch bzw. -Tief. Dann gilt:
  1. Dieses Hoch bzw. Tief wird gesweept.
  2. Danach kommt eine 5-Min.-Bestätigung (BOS/IFVG).
  3. Dann folgt Schritt 3 (EQ/FVG) wie normal.
- **Stop** über dem Sweep-Hoch plus Spread (0,55 Punkte). **Units = 25 ÷ Stop in Punkten** (1 Unit = 10 $ pro Punkt,
  250 $ Risiko), genau mit `scripts/rechner.py --markt SPX500`.
- Ziel ≥ 2R, sonst „Lass es.“

## 4. Variante B: NAS100 allein

- Wie Variante A, nur mit dem NAS100-Chart. SMT fällt weg.
- Der Nasdaq schwankt stärker: Stops sind in Punkten größer, die Position kleiner, Spread 1,89 Punkte.
  Units = 25 ÷ Stop in Punkten (z. B. Stop 35 Punkte → 0,71 Units).
- 1-Min.-Kerzen sind beim Nasdaq unruhiger. In Schritt 4 bevorzugt BOS oder IFVG mit kräftiger Kerze, nicht nur
  79 % (Ergänzung).

## 5. Variante C: zusammen (ES + NQ mit SMT)

So wird es im Video gemacht: **beide Charts nebeneinander** (SPX500 und NAS100, gleicher Zeitrahmen, gleiche
Datenquelle).
- **SMT ist erlaubt** in Schritt 2 und 4 als Bestätigung. In Schritt 3 ist sie im Fall 2b **die**
  Fortsetzungs-Bestätigung.
- **Beispiel aus dem Video** (Short):
  1. Nach der NY-Eröffnung entsteht ein 5-Min.-Hoch.
  2. Der **Nasdaq holt es, der ES nicht**. Das ist die SMT-Divergenz, die Manipulation passiert im Nasdaq.
  3. Auf 1 Min. entsteht eine IFVG: Einstieg, Stop über dem Hoch.
- **Welcher Index wird gehandelt?** Das Video sagt es nicht ausdrücklich. Auslegung (Ergänzung): **der Index, der
  den Sweep gemacht hat**. Dort ist die Manipulation passiert, und der Stop über dem Sweep-Hoch ist klar. Nur **einen**
  der beiden handeln, nie beide gleichzeitig (sonst doppeltes Risiko).
- Der Nutzer hält die beiden Indizes für verschieden. Das stimmt: Der Nasdaq ist technologielastig und schwankt
  stärker. Gerade weil sie trotzdem meist gleich laufen, ist ein Auseinanderlaufen an einem Hoch/Tief das Signal.

## 6. Pflicht, Risiko-Rahmen, Noten

**Pflicht** (alle Varianten):
1. Sweep (Schritt 1). Kam er vor 15:30 MEZ, zusätzlich die 5-Min.-Manipulation nach der Eröffnung (2b).
2. 5-Min.-Bestätigung (Schritt 2).
3. Rücklauf in EQ/FVG (Schritt 3), bzw. bei 2b in Variante C die SMT.
4. 1-Min.-Bestätigung in der Zone (Schritt 4).
5. **Risiko-Rahmen**:
   - Stop hinter dem Sweep-Extrem plus Spread, ohne Liquidität direkt dahinter.
   - ≥ 2R bis zur Liquidität (Schritt 6).
   - Außerhalb der Sperrzeit.
   - Tageslimit nicht erreicht (2 Verluste über alle Märkte).

**Noten**:
- **A (TJR)** = alles erfüllt.
- **A+** = zusätzlich ORB am selben Ort in dieselbe Richtung (z. B. Fehlausbruch der Spanne = Sweep, Abschnitt 6 der
  ORB-Strategie), oder im Silver-Bullet-Fenster.
- Sonst **„Lass es.“**
- **Dafür/Dagegen**: Bias Daily/4H, mehrere Bestätigungen je Schritt, Displacement, Ziel-Liquidität offen, Termine,
  Spread.

## 7. Vor und während des Trades

**Vor dem Trade**:
- **Morgenplan** (bei „Guten Morgen, heute …“):
  - Termine,
  - Bias,
  - Levels für Schritt 1: 1H-/4H-Hochs/-Tiefs, Asia-, London- und Vortages-Hoch/-Tief,
  - offene FVGs.
  Bei Variante C beide Indizes.
- **15:15 MEZ**: Welche Levels wurden schon im Premarket gesweept (→ Fall 2b)?
- **Ab 15:30 MEZ** (in den Zeitumstellungs-Wochen 14:30):
  - 5-Min.-Chart beobachten.
  - Bei 2b das erste 5-Min.-Hoch/-Tief markieren.
  - Alarme an den Levels setzen.
- **Nach dem Sweep**:
  - 5-Min.-Bestätigung?
  - EQ (Fibonacci 0,5 des Wende-Beins) und FVG markieren.
  - Alarm an der Zone.
- **In der Zone**: 1-Min.-Chart, Bestätigung abwarten, dann Einstieg.
  - Units mit `rechner.py`.
  - Stop über dem Sweep-Hoch plus Spread.
  - Ziel = vorige Liquidität.

**Während des Trades**:
- Stop bleibt und wird nie vergrößert. Breakeven bei 1R.
- Gegen-IFVG = Warnzeichen (`references/fvg-ifvg.md`, Abschnitt 4).
- Keine neuen Einstiege 15 Min. vor/nach US-Daten (10:00 New York = 16:00 MEZ). Am Ziel raus.

## 8. Text für die Box im Layout

Zum Kopieren in eine TradingView-Text-Box (Zeichenwerkzeug „Text“ bzw. „Notiz“). Je Markt eine Box für **Long** und
eine für **Short**, mit der ganzen TJR-Familie (Abschnitt 2a). Uhrzeiten gelten außerhalb der Zeitumstellungs-Wochen
(sonst 1 Std. früher).

**SPX500 allein**

```
TJR LONG – SPX500 (allein)
1: Sweep eines Tiefs (1H, 4H, Asia/London,
   Vortag, Spanne) – Schluss zurück darüber
2: 5-Min.-Wende nach oben: BOS, IFVG o. 79%
2b: Tief schon im Premarket geholt -> ab 15:30
    5-Min.-Tief nach Eröffnung wird gesweept
3: 5-Min.-Rücklauf in bullische FVG, EQ 50%,
   Order Block o. IFVG – kein Schluss darunter
4: 1-Min.: BOS o. IFVG nach oben
5: Einstieg – Stop unter Sweep-Tief + Spread, min. 2R
6: Ziel: vorige Hochs / Liquidität oben
IFVG-Limit: an der Oberkante, Stop hinter IFVG
Verpasst? 1./2. FVG nach BOS: M1 höheres Tief + Hoch
Units = 25 / Stop in Punkten (250 $)
```

```
TJR SHORT – SPX500 (allein)
1: Sweep eines Hochs (1H, 4H, Asia/London,
   Vortag, Spanne) – Schluss zurück darunter
2: 5-Min.-Wende nach unten: BOS, IFVG o. 79%
2b: Hoch schon im Premarket geholt -> ab 15:30
    5-Min.-Hoch nach Eröffnung wird gesweept
3: 5-Min.-Rücklauf in bärische FVG, EQ 50%,
   Order Block o. IFVG – kein Schluss darüber
4: 1-Min.: BOS o. IFVG nach unten
5: Einstieg – Stop über Sweep-Hoch + Spread, min. 2R
6: Ziel: vorige Tiefs / Liquidität unten
IFVG-Limit: an der Unterkante, Stop hinter IFVG
Verpasst? 1./2. FVG nach BOS: M1 tieferes Hoch + Tief
Units = 25 / Stop in Punkten (250 $)
```

**NAS100 allein**

```
TJR LONG – NAS100 (allein)
1: Sweep eines Tiefs (1H, 4H, Asia/London,
   Vortag, Spanne) – Schluss zurück darüber
2: 5-Min.-Wende nach oben: BOS, IFVG o. 79%
2b: Tief schon im Premarket geholt -> ab 15:30
    5-Min.-Tief nach Eröffnung wird gesweept
3: 5-Min.-Rücklauf in bullische FVG, EQ 50%,
   Order Block o. IFVG – kein Schluss darunter
4: 1-Min.: BOS o. IFVG nach oben, kräftige Kerze
5: Einstieg – Stop unter Sweep-Tief + Spread, min. 2R
6: Ziel: vorige Hochs / Liquidität oben
IFVG-Limit: an der Oberkante, Stop hinter IFVG
Verpasst? 1./2. FVG nach BOS: M1 höheres Tief + Hoch
Units = 25 / Stop in Punkten (250 $)
```

```
TJR SHORT – NAS100 (allein)
1: Sweep eines Hochs (1H, 4H, Asia/London,
   Vortag, Spanne) – Schluss zurück darunter
2: 5-Min.-Wende nach unten: BOS, IFVG o. 79%
2b: Hoch schon im Premarket geholt -> ab 15:30
    5-Min.-Hoch nach Eröffnung wird gesweept
3: 5-Min.-Rücklauf in bärische FVG, EQ 50%,
   Order Block o. IFVG – kein Schluss darüber
4: 1-Min.: BOS o. IFVG nach unten, kräftige Kerze
5: Einstieg – Stop über Sweep-Hoch + Spread, min. 2R
6: Ziel: vorige Tiefs / Liquidität unten
IFVG-Limit: an der Unterkante, Stop hinter IFVG
Verpasst? 1./2. FVG nach BOS: M1 tieferes Hoch + Tief
Units = 25 / Stop in Punkten (250 $)
```

**ES + NQ zusammen** (SPX500 und NAS100 nebeneinander)

```
TJR LONG – ES + NQ (zusammen, SMT)
1: Sweep eines Tiefs (1H, 4H, Asia/London,
   Vortag, Spanne) – Schluss zurück darüber
2: 5-Min.-Wende nach oben: BOS, IFVG, SMT o. 79%
2b: Tief schon im Premarket geholt -> ab 15:30
    5-Min.-Tief nach Eröffnung wird gesweept (SMT)
3: 5-Min.-Rücklauf in bullische FVG, EQ 50%,
   Order Block o. IFVG – kein Schluss darunter
4: 1-Min.: BOS o. IFVG nach oben, SMT
5: Einstieg – Stop unter Sweep-Tief + Spread, min. 2R
   nur EIN Index: der mit dem Sweep
6: Ziel: vorige Hochs / Liquidität oben
IFVG-Limit: an der Oberkante, Stop hinter IFVG
Verpasst? 1./2. FVG nach BOS: M1 höheres Tief + Hoch
Units = 25 / Stop in Punkten (250 $)
```

```
TJR SHORT – ES + NQ (zusammen, SMT)
1: Sweep eines Hochs (1H, 4H, Asia/London,
   Vortag, Spanne) – Schluss zurück darunter
2: 5-Min.-Wende nach unten: BOS, IFVG, SMT o. 79%
2b: Hoch schon im Premarket geholt -> ab 15:30
    5-Min.-Hoch nach Eröffnung wird gesweept (SMT)
3: 5-Min.-Rücklauf in bärische FVG, EQ 50%,
   Order Block o. IFVG – kein Schluss darüber
4: 1-Min.: BOS o. IFVG nach unten, SMT
5: Einstieg – Stop über Sweep-Hoch + Spread, min. 2R
   nur EIN Index: der mit dem Sweep
6: Ziel: vorige Tiefs / Liquidität unten
IFVG-Limit: an der Unterkante, Stop hinter IFVG
Verpasst? 1./2. FVG nach BOS: M1 tieferes Hoch + Tief
Units = 25 / Stop in Punkten (250 $)
```

## 9. Risiken, Journal

- **Abgeschnittene Box**: Das Ende von 2b und 3 ist aus dem Gesprochenen ergänzt, nicht wörtlich.
- **Viele Wahlmöglichkeiten** (BOS, IFVG, SMT oder 79 %): Wer jede kleine Bewegung als „Bestätigung“ sieht, handelt
  zu oft. Eine klare Bestätigung mit kräftiger Kerze, keine kleinen 1-Min.-Lücken.
- **79 %** ist die schwächste Bestätigung.
- **Spread** beim Stop mitrechnen (SPX500 0,55, NAS100 1,89 Punkte); in den ersten Minuten nach 15:30 oft breiter.
- **10:00-Daten New York** (16:00 MEZ) mitten im Ablauf.
- **Werbe-Video** mit Gewinnangabe: keine Trefferquote. Erst Replay/Papierhandel, im Journal mitschreiben.
- **Journal**:
  - Kennung „TJR-SPX500“, „TJR-NAS100“ oder „TJR-ES+NQ“.
  - Welche Bestätigung in Schritt 2 und 4 (BOS/IFVG/SMT/79 %).
  - Fortsetzungs-Zone (EQ/FVG) und ob 2b vorlag.
  - Ergebnis in R.
