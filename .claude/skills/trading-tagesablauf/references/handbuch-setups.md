# Trading-Setups-Handbuch (vom Nutzer, 27.10.2026)

Inhalt seines PDFs „Trading Setups – Handbuch für Technische Analyse“ (16 Seiten), als Text übernommen. Verweise im
Skill: **H·Abschnitt**, z. B. H1.2 = Doppel-Top. Abbildungen des PDFs sind hier als Beschreibung enthalten.

## Einordnung in sein System

- **Kein Handbuch-Muster ist ein eigenes Setup** (Wunsch vom 28.10.: nur wenige Setups handeln). Alles hier ist
  Konfluenz. Begründung je Muster in `references/screenshot-protokoll.md`, Abschnitt 1.

- Sein Kernmodell sind die Leitfäden L1–L3 und die Kompakt-Checkliste. Das Handbuch ist **zusätzliches Wissen**:
  klassische Chartmuster und Indikatoren. Nutze es als **Konfluenz** (zweite, unabhängige Bestätigung, so verlangt
  es das Handbuch selbst in H5.3) und um Muster in seinen Charts zu benennen. Kennzeichne Herkunft: „laut Handbuch
  (H1.2)“.
- Wo sich beides trifft, ist das ein starkes Argument:
  - **Doppel-Top/-Boden (H1.2, H1.3)** = gleich hohe Hochs/Tiefs = Liquidität. Das Handbuch warnt selbst: „Der Kurs
    kann noch kurz darüber spiken“. Das ist der Sweep aus seinen Leitfäden. Also nie am zweiten Top einsteigen,
    sondern Sweep bzw. Nackenlinien-Bruch abwarten. Genau das hätte am 27.10. den ersten Stop verhindert.
  - **Bear Flag (H1.4)** nach einem Abverkauf = Rücksetzer in die Zone. Die enge, aufwärts geneigte Konsolidierung
    entspricht der Seitwärtsphase im Level (L1·5): abwarten, bis sie gesweept bzw. gebrochen ist.
  - **Engulfing an Extremen (H1.1)** ähnelt der CISD bzw. dem C2-/C3-Schluss (L2·2, L3·4). Mitte der Range meiden
    (H1.1) = „nie in der Mitte handeln“.
  - **Fibonacci 61,8 % (H1.1)** passt zur OTE-Zone (`references/tradingview-werkzeuge.md`).
  - **VWAP/AVWAP und POC (H2)** sind die Volumen-Werkzeuge aus dem Werkzeug-Kapitel.
- Wo es abweicht, gilt sein Kernmodell, und du sagst es offen: Das Handbuch nimmt z. B. die Nackenlinie als
  Einstieg, seine Leitfäden verlangen Sweep, SMT und M5-CISD. RSI, EMA und MACD (H3) kommen in den Leitfäden nicht
  vor. Sie sind nur Zusatz, wenn er sie im Chart hat (Indikator-Plätze im kostenlosen Plan beachten).
- **Volumen bei Forex**: Das Handbuch nutzt oft Volumen als Bestätigung. Bei EURUSD gibt es nur Tick-Volumen
  (TradingView/OANDA), im IQ-Chart gar keins. Volumen-Bestätigungen deshalb vorsichtig formulieren.

## H1 Chart-Muster und Setups

### H1.1 Engulfing Candles (umhüllende Kerzen)
Starkes Umkehrsignal: Der Körper einer Kerze umhüllt den vorherigen Körper vollständig. Am effektivsten auf 1 Stunde
und an wichtigen Strukturniveaus (Bild: Engulfing in der Boden-Region und in der Top-Region).

| Typ | Anwendungszone | Schlüsseltechnik |
|---|---|---|
| Bullish Engulfing | untere Region (Unterstützung) | Fibonacci vom Tief zeichnen, Einstieg beim 61,8-%-Retracement |
| Bearish Engulfing | obere Region (Widerstand) | Fibonacci vom Hoch zeichnen, Einstieg nur bei vollständiger Body-Rückeroberung |

Einstiegsregeln:
- Bullisch: große Körperkerze → Fibonacci von Tief zu Hoch → Einstieg auf 61,8 % („618-Einstieg“).
- Bärisch: große Docht-Kerze → auf vollständige Body-Rückeroberung warten, dann Short.
- Mit Volumen bestätigen: erhöhtes Volumen auf der Engulfing-Kerze stärkt das Signal.
- Nicht in der Mitte einer Range, nur an strukturellen Extremen.

### H1.2 Doppel-Top (bärische Umkehr, „M“)
| Komponente | Beschreibung |
|---|---|
| Top 1 und Top 2 | zwei annähernd gleiche Hochs am selben Widerstand |
| Nackenlinie | Reaktionstief zwischen den Tops |
| Toleranz | ca. 1–3 % Abweichung zwischen den Hochs |
| Bestätigung | entschlossener Bruch unter die Nackenlinie |
| Volumen | steigendes Verkaufsvolumen beim Ausbruch erhöht die Zuverlässigkeit |
| Kursziel | Musterhöhe vom Ausbruchspunkt nach unten projiziert |

Vorsicht: nicht sofort am zweiten Top short gehen, der Kurs kann noch kurz darüber spiken. Immer die
Nackenlinien-Bestätigung abwarten.
- Klaren Schlusskurs unter der Nackenlinie abwarten.
- Retest der Nackenlinie nach dem Bruch = risikoärmerer Einstieg.
- Stop über dem zweiten Top.
- Musterhöhe nach unten als Ziel.

### H1.3 Doppel-Boden (bullische Umkehr, „W“)
| Komponente | Beschreibung |
|---|---|
| Boden 1 und Boden 2 | zwei annähernd gleiche Tiefs an derselben Unterstützung |
| Nackenlinie | Zwischenhoch zwischen den Böden |
| Toleranz | ca. 1–3 % Abweichung |
| Volumen (Formation) | oft niedriger am zweiten Boden (nachlassender Verkaufsdruck) |
| Bestätigung | Bruch über die Nackenlinie bei erhöhtem Volumen |
| Kursziel | Abstand Nackenlinie–Tiefs, vom Ausbruch nach oben projiziert |
| Retest-Einstieg | Nackenlinien-Retest nach dem Ausbruch = zweite, risikoärmere Gelegenheit |

- Long bei bestätigtem Ausbruch über die Nackenlinie, alternativ beim Retest mit engerem Risiko.
- Stop unter dem zweiten Boden. Volumen auf der Ausbruchskerze als Bestätigung.

### H1.4 Bull Flag und Bear Flag (Fortsetzung)
Kernsequenz: impulsive Welle → Flagge (Konsolidierung) → Ausbruch und Fortsetzung. Bild-Hinweis: auf Retests
vorheriger Hochs achten (Doppel-Top).

| Muster | Formation | Signal |
|---|---|---|
| Bull Flag | starker Aufwärtsimpuls → enge, abwärts geneigte Konsolidierung | Ausbruch über die obere Grenze → Long |
| Bear Flag | starker Abwärtsimpuls → enge, aufwärts geneigte Konsolidierung | Bruch unter die untere Grenze → Short |

Kombination:
- Bear Flag + Doppel-Boden → der Abwärtsausbruch scheitert deutlich wahrscheinlicher.
- Bull Flag + Doppel-Top → der Aufwärtsausbruch ist womöglich erschöpft.
- Volumen soll in der Flagge sinken und beim Ausbruch steigen.

Best Practice: Flagge nicht zu steil, mit klaren Grenzen. Der Mast (Impuls) größer als die Flagge. Zu lange oder
unruhige Konsolidierungen meiden.

## H2 Volumen-Indikatoren

Hohes Volumen beim Ausbruch bestätigt, niedriges warnt vor Fehlbewegungen. Die zwei Werkzeuge: VWAP und POC.

### H2.1 VWAP und Anchored VWAP
VWAP = durchschnittlicher Preis gewichtet mit Volumen über die Sitzung; Benchmark institutioneller Trader, wirkt als
dynamische Unterstützung bzw. Widerstand. Der **Anchored VWAP (AVWAP)** startet an einem frei gewählten Punkt
(Swing-Hoch/-Tief, Ereignis).

| Markt | AVWAP-Verhalten |
|---|---|
| Aufwärtstrend | Kurs dauerhaft darüber, Pullbacks zum AVWAP als Long-Einstiege |
| Abwärtstrend | Kurs dauerhaft darunter, Anstiege zum AVWAP als Short-Einstiege |
| Seitwärts | Kurs pendelt um den AVWAP, keine gerichteten Trades bis zum klaren Bruch |

VWAP-Regeln:
1. Großes Gap bei Eröffnung → ab der 2. Berührung vorsichtig, Bruch bei der 3. oder 4. Berührung erwarten.
2. Nicht handeln, solange der Kurs um den VWAP keine klare Richtung zeigt.
3. Bestätigte Ausbrüche über wichtige Hochs bzw. unter wichtige Tiefs abwarten.
4. Oberes VWAP-Band = Zielzone/Take Profit, darüber keine Einstiege jagen.

AVWAP-Pullback-Einstieg: (1) am wichtigen Swing-Tief (Long) bzw. Swing-Hoch (Short) verankern, (2) Rückkehr zum
AVWAP abwarten, (3) Farbwechsel der Kerze als Signal (z. B. rot → grün), (4) Stop knapp jenseits des AVWAP, Ziel
nächster Widerstand bzw. oberes Band.

### H2.2 Point of Control (POC)
Preis mit dem höchsten Volumen in einem Zeitraum, „fairster Preis“, wirkt oft magnetisch. Berechnung: Zeitraum
wählen (Tag, Woche, eigener Bereich), Volumenprofil zeichnen, POC = höchster Balken.

| Trend | POC-Funktion |
|---|---|
| Aufwärtstrend | Pullback zum POC = Kaufgelegenheit, dynamische Unterstützung |
| Abwärtstrend | Anstieg zum POC = Verkaufsgelegenheit, Widerstand von oben |
| Konsolidierung | POC = Zentrum, Kurs zieht dorthin, Ausbrüche testen ihn oft erneut |

Der POC verschiebt sich, immer den jüngsten relevanten nehmen. HVN nahe dem POC bremsen den Kurs, LVN lassen ihn
schnell laufen.

## H3 Momentum- und Trend-Indikatoren

### H3.1 RSI und RSL
RSI: Oszillator 0–100, Standard 14 Perioden. Unter 30 überverkauft, über 70 überkauft, 30–70 neutral. Schwach als
Einzelsignal, unzuverlässig bei wenig Volatilität oder starken Trends.

| Divergenz | Kurs | RSI |
|---|---|---|
| bullisch | tieferes Tief | höheres Tief → Umkehrsignal |
| bärisch | höheres Hoch | tieferes Hoch → Umkehrsignal |

RSL (Relative-Stärke-Linie): über 1,0 stärker als die Referenzperiode (bullisch), unter 1,0 schwächer (bärisch);
zusammen mit dem RSI nutzen.

Hinweis: Eine bärische RSI-Divergenz am Sweep-Hoch ähnelt dem SMT (L1·2), ist aber kein Ersatz dafür. SMT
vergleicht zwei Märkte, die Divergenz Kurs und Indikator desselben Marktes.

### H3.2 EMA
EMA gewichtet neue Kurse stärker als ein SMA. Golden Cross (z. B. EMA 50 kreuzt EMA 200 nach oben) bullisch, Death
Cross bärisch. EMA 8/21 kurzfristig (Intraday/Swing), EMA 50 mittelfristig, EMA 200 langfristiger Trend. Am besten
in Trends, in Seitwärtsphasen viele Fehlsignale, immer mit Struktur und Volumen kombinieren.

### H3.3 MACD
MACD-Linie = EMA 12 − EMA 26, Signallinie = EMA 9 der MACD-Linie, Histogramm = Abstand. Kauf: MACD über Signallinie;
Verkauf: darunter; Nulllinie über/unter = Trend dreht bullisch/bärisch; Divergenz wie beim RSI.

## H4 Spezial-Strategien

### H4.1 21-EMA-Bottom-Catching
Für Umkehrungen am Boden starker Abwärtstrends:
1. Starken Abwärtstrend bestätigen, 21 EMA liegt über dem Kurs.
2. Zeitrahmen: 5 Minuten bei langsameren, 3 Minuten bei schnellen Abwärtstrends.
3. Ersten Bruch beobachten: Kerze schließt über dem 21 EMA.
4. Danach auf einen Doppel-Boden achten.
5. Long beim Nackenlinien-Bruch des Doppel-Bodens mit Volumen.
Warum: Der EMA-Bruch zeigt den Momentum-Wechsel, der Doppel-Boden die Struktur. Zwei Schritte verhindern das
Greifen ins fallende Messer.

### H4.2 Anchored-VWAP-Trendstrategie
| Phase | Kurs vs. AVWAP | Strategie |
|---|---|---|
| Aufwärtstrend | dauerhaft darüber | Pullbacks zum AVWAP kaufen, neue Hochs anvisieren |
| Abwärtstrend | dauerhaft darunter | Anstiege zum AVWAP shorten, neue Tiefs anvisieren |
| Trendwechsel | Kurs erobert/verliert den AVWAP | nachhaltiges Halten abwarten |

Ankerpunkte: wichtige Swing-Hochs/-Tiefs, Nachrichtenereignisse, Sitzungseröffnungen (z. B. London, New York).

### H4.3 Liquidationen
Im Handbuch noch in Arbeit (Krypto-Futures, Liquidations-Cluster, Short-Squeeze, Open Interest). Für EURUSD nicht
relevant.

## H5 Schnellreferenz

### H5.1 Muster
| Muster | Typ | Bestätigung | Einstieg | Stop |
|---|---|---|---|---|
| Bullish Engulfing | Umkehr ↑ | große Körperkerze an Unterstützung | 61,8-%-Fib-Retracement | unter dem Swing-Tief |
| Bearish Engulfing | Umkehr ↓ | vollständige Body-Rückeroberung | bei Body-Rückeroberung | über dem Swing-Hoch |
| Doppel-Top | Umkehr ↓ | Nackenlinien-Bruch | Bruch oder Retest | über Top 2 |
| Doppel-Boden | Umkehr ↑ | Nackenlinien-Ausbruch | Bruch oder Retest | unter Boden 2 |
| Bull Flag | Fortsetzung ↑ | obere Grenze bricht | Flaggen-Ausbruch | unter Flaggen-Tief |
| Bear Flag | Fortsetzung ↓ | untere Grenze bricht | Flaggen-Breakdown | über Flaggen-Hoch |

### H5.2 Indikatoren
| Indikator | Typ | Signal | bullisch | bärisch |
|---|---|---|---|---|
| VWAP | Volumen | dynamisches Niveau | Kurs über VWAP | Kurs unter VWAP |
| POC | Volumen | Hochvolumen-Knoten | Pullback zum POC = Kauf | Anstieg zum POC = Verkauf |
| RSI | Momentum | überkauft/überverkauft | RSI unter 30 + bull. Divergenz | RSI über 70 + bär. Divergenz |
| EMA | Trend | Richtung, Crossovers | Golden Cross | Death Cross |
| MACD | Momentum/Trend | Linien-Crossover | MACD über Signallinie | MACD unter Signallinie |

### H5.3 Allgemeine Handelsprinzipien
- Nie auf ein einzelnes Signal handeln, immer Konfluenz aus mindestens zwei unabhängigen Werkzeugen.
- Volumen bestätigt Überzeugung, wenig Volumen heißt Vorsicht.
- Risikomanagement zuerst: Stop vor jedem Einstieg festlegen.
- Zeitrahmen-Ausrichtung: Setup im höheren Zeitrahmen bestätigen, im niedrigeren einsteigen.
- Geduld: Einen Trade zu verpassen ist besser als einen schlechten einzugehen.
- Emotionale Disziplin, besonders nach Verlusten.
