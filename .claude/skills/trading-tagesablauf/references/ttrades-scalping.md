# TTrades Scalping Model (TTFM-Scalp): H1-Bias, M15-Swing, M1-Einstieg

Wunsch des Nutzers (25.11.2026): das Video „TTrades Scalping Model - Simple Day Trading Strategy“ (TTrades,
YouTube-ID eywpZT3z6GQ, 7.2.2026, 14 Min.) in den Skill aufnehmen und ihm das Modell über **Backtest-Simulationen**
auf dem richtigen Chart beibringen. Der Ablauf des Trainings steht in `references/backtest-training.md`.

**Quellen** (nur diese, nichts erfunden):
- **Artikel** zum Video auf ttrades.com („TTrades Scalping Model – Simple Day Trading Strategy“, vom Kanal unter
  „Blog & PDF“ verlinkt). Zitate unten wörtlich auf Englisch, Übersetzung daneben.
- **PDF-Folien** „TTFM Scalping Model“ (7 Folien: Hourly Bias, 15m Swing, fünfmal 15m > 1m Fractal Model). Die
  Folien sind Skizzen ohne Text; was daraus abgelesen ist, steht als **„(Folie n)“**.
- **Nicht verfügbar**: das gesprochene Video mit den vier Beispielen (Kapitel „Example 1–4“, 1:49–14:18). YouTube
  verlangt in der Cloud-Umgebung eine Anmeldung („confirm you're not a bot“). Schickt er das Transkript oder
  Bildschirmaufnahmen der Beispiele, hier ergänzen (Abschnitt 9).
- Was weder aus Artikel noch Folien stammt, ist als **Ergänzung** gekennzeichnet.

**Einordnung**: Das ist das TTrades Fractal Model aus Leitfaden 3 (`references/leitfaden-3.md`), eine Stufe tiefer:
dort Daily → H1 → M5, hier **Daily → H1 → M15 → M1**. Begriffe (C1–C4, CISD, geschütztes Tief/Hoch, Sweep, FVG) wie
in L3. **Status: Lernmodell im Backtest**, kein fünftes Live-Setup. Live erst, wenn er es nach der Auswertung
(`references/backtest-training.md`, Abschnitt 6) ausdrücklich freigibt.

## Inhalt

1. Die Kernidee
2. Die vier Zeitrahmen
3. Schritt 1: H1-Bias (C2-/C3-Schluss)
4. Schritt 2: M15-Swing (der Docht der H1-Kerze)
5. Schritt 3: M1-Einstieg (15m > 1m Fractal Model)
6. Stop und Ziel
7. Pflicht-Bedingungen (Checkliste)
8. Übertrag auf EURUSD und seine Regeln (Ergänzung)
9. Offene Punkte aus dem Video

## 1. Die Kernidee

> „At its core, you are trading the body of an hourly candle using lower time frame price action.“
> Du handelst den **Körper einer H1-Kerze**. M15 und M1 bilden ihren **Docht** und sind nur Werkzeuge, um effizient
> in die H1-Bewegung einzusteigen.

> „Even though this is a scalping strategy, it is built from the top down.“
> Scalping von oben nach unten: erst die Geschichte (Bias), dann die Struktur, zuletzt der Einstieg.

> „The one minute chart is where the trade is executed, not where decisions are made.“
> Auf M1 wird nur ausgeführt. Entschieden ist vorher.

## 2. Die vier Zeitrahmen

| Zeitrahmen | Aufgabe (Artikel) |
|---|---|
| **Daily** | grobe Richtung („broader directional context“) |
| **H1** | Scalping-Bias: Wo wird die **nächste H1-Kerze** wahrscheinlich expandieren? |
| **M15** | Swing-Struktur: der Swing, der den **Docht** der H1-Kerze bildet |
| **M1** | Ausführung: Einstieg, Stop |

## 3. Schritt 1: H1-Bias (C2-/C3-Schluss)

> „The objective is to anticipate where the next hourly candle is likely to expand. This is done by identifying
> candle two or candle three closures on the hourly chart. When these closures occur after liquidity interaction or
> fair value gap displacement, they often lead to expansion.“

- Suche auf H1 einen **C2-Schluss** (oder C3-Schluss) nach **Liquiditäts-Kontakt** (Sweep eines Hochs/Tiefs) oder
  nach **Displacement mit FVG**. Dann wird die nächste Kerze (C3) als **Expansion** erwartet. Das ist der Bias.
- **Folie 1 (bullisch)**: Aufwärtstrend, große grüne Kerze hinterlässt eine FVG (gelbe Box). Eine rote Kerze läuft
  zurück, die nächste Kerze (C2) holt deren Tief, sticht in die FVG und schließt wieder darüber. Die folgende Kerze
  (C3, hellgrün) expandiert bis über das vorige Hoch (gestrichelte Linie = Ziel).
- **Artikel-Beispiel (bärisch, NQ)**: „There is a candle 2 closure on the hourly chart which sets up a candle 3
  expansion. Within the candle 3 expansion candle, find the 15 minute and 1 minute fractal model with a protected
  swing to trade the expansion.“
- **Ohne Bias kein Trade**: „Without this bias, lower time frame setups lose their reliability.“
- C2-Schluss wie in L3·5: Die Kerze holt das Tief (bullisch) bzw. Hoch (bärisch) der vorigen Kerze und schließt
  wieder in deren Range, möglichst in Bias-Richtung.

## 4. Schritt 2: M15-Swing (der Docht der H1-Kerze)

> „The purpose of this step is to find the swing point that is forming the wick of the hourly candle. You are looking
> for a clean swing low or swing high that aligns with the hourly narrative. A candle two closure at this level gives
> confirmation that price is preparing to continue in the direction of the hourly bias.“

- **Folie 2 (bullisch)**: Die erwartete H1-Expansionskerze (C3) öffnet und läuft zuerst **unter ihre Eröffnung**
  (Docht). In dieser Zeit bilden drei M15-Kerzen ein **Swing-Tief**: C1 rot, C2 rot holt das Tief von C1 und schließt
  zurück, C3 grün expandiert. Das M15-Swing-Tief **ist** der untere Docht der H1-Kerze, danach steigt der H1-Körper.
- Also: **innerhalb der H1-Kerze C3** auf M15 auf einen **C2-Schluss am Swing** warten (bullisch unter der
  H1-Eröffnung, bärisch darüber).

## 5. Schritt 3: M1-Einstieg (15m > 1m Fractal Model)

> „On the one minute chart, you are looking for continuation behavior such as: fair value gap interaction, change in
> the state of delivery, protected swing formation.“

Aus den Folien 3–7 (bullisch; die senkrechten Linien grenzen die M15-Kerze C2 auf M1 ab):
1. **Folie 3**: Während der M15-Kerze C2 läuft M1 abwärts und macht das Tief (Sweep des M15-C1-Tiefs). Danach
   schließt M1 über der Eröffnung der letzten roten Serie: **M1-CISD** (blaue Linie).
2. **Folie 4**: In der M15-Kerze C3 läuft M1 zurück bis an die **Eröffnung der M15-Kerze C3** (= Schluss von C2,
   gestrichelte Linie) und bildet dort ein höheres Tief.
3. **Folie 5**: Von diesem Rücklauf-Tief kommt die **zweite M1-CISD** (blaue Linie über der kleinen roten Serie).
   Das Rücklauf-Tief ist jetzt das **geschützte Tief**. Hier ist der Einstieg.
4. **Folie 6**: M1 expandiert, die M15-Kerze C3 wird ein großer grüner Körper.
5. **Folie 7**: Zusammen gesehen: Der M15-Swing ist der Docht, die M15-C3 ein Teil des **H1-Körpers**.

Kurz: **M15-C2-Schluss am Swing → M1-Rücklauf in M15-C3 (an deren Eröffnung bzw. in eine M1-FVG) → M1-CISD vom
geschützten Tief → Einstieg.**

## 6. Stop und Ziel

> „Stops are placed at logical protected swings, and targets are based on higher time frame objectives rather than
> arbitrary scalping exits.“

- **Stop**: hinter dem **geschützten M1-Swing** (Folie 5: das Rücklauf-Tief), plus Spread. Konservativer: hinter dem
  M15-Swing-Tief (dem H1-Docht). Welches das Video in den Beispielen nutzt, ist offen (Abschnitt 9).
- **Ziel**: das Ziel des **höheren Zeitrahmens**, also wohin die H1-Kerze expandieren soll (Folie 1: das vorige
  H1-Hoch; allgemein H1-Liquidität, FVG, Vortageshoch/-tief).
- **Mindestens 2R** gilt bei ihm für jeden Trade (seine Regel, nicht aus dem Video). Durch den kleinen M1-Stop und
  das H1-Ziel sind oft deutlich mehr als 2R möglich (wie in L3·6).

## 7. Pflicht-Bedingungen (Checkliste)

Alle müssen erfüllt sein. Jede Zeile wird im Backtest einzeln mit ✓/✗ bewertet (`references/backtest-training.md`).

| # | Bedingung | Zeitrahmen |
|---|---|---|
| 0 | Daily-Richtung passt oder steht nicht dagegen | Daily |
| 1 | **H1-C2-Schluss** (oder C3-Schluss) nach Sweep oder FVG-Displacement → Bias für die nächste H1-Kerze | H1 |
| 2 | Das **Ziel** der H1-Expansion ist benannt (Hoch/Tief, FVG, Vortag) | H1 |
| 3 | In der H1-Kerze C3: **M15-Swing** gegen die Richtung (Docht unter bzw. über der H1-Eröffnung) mit **M15-C2-Schluss** | M15 |
| 4 | In der M15-Kerze C3: **M1-Rücklauf** an die M15-C3-Eröffnung bzw. in eine M1-FVG | M1 |
| 5 | **M1-CISD** vom Rücklauf → geschützter Swing steht | M1 |
| 6 | Stop hinter dem geschützten Swing + Spread, Ziel aus H1, **≥ 2R**, Lots mit `scripts/rechner.py` | – |
| 7 | Seine Rahmenregeln: keine Sperrzeit, Tageslimit, Session (Abschnitt 8) | – |

**Ungültig**: Die H1-Kerze C3 schließt gegen den Bias, oder M1/M15 schließt mit dem Körper hinter den geschützten
Swing.

## 8. Übertrag auf EURUSD und seine Regeln (Ergänzung)

- **Markt**: Artikel-Beispiel ist NQ, das Video nennt „forex“ und „futures“. Er übt es auf **OANDA:EURUSD**, dem
  Chart, auf dem er handelt (sein Skill ist nur Forex). GBPUSD als SMT nur als Dafür-Punkt, nicht Pflicht.
- **Zeiten** (Ergänzung, nicht aus dem Video): Scalping braucht Bewegung. Am sinnvollsten in London (09:00–12:00 MEZ)
  und New York (15:30–17:30 MEZ, in Zeitumstellungs-Wochen eine Stunde früher). Sperrzeiten um Daten wie immer.
- **Spread**: EURUSD ca. 0,2 Pip bei IQ. Bei M1-Stops von 3–6 Pips ist das ein spürbarer Teil des Risikos; im
  Backtest immer mitrechnen.
- **Lots**: wie gewohnt, Lots = Risiko ÷ (Stop-Pips × 10); kleine Stops ergeben große Lots, deshalb den Rechner nutzen
  und vor dem Klick „Risk“ im IQ-Panel prüfen.
- **Kein Live-Trade** mit diesem Modell, solange es im Backtest ist (`references/backtest-training.md`, Abschnitt 6).

## 9. Offene Punkte aus dem Video

Diese Fragen beantworten erst die vier Beispiele im Video (1:49–14:18). Bis dahin im Backtest beide Varianten
mitschreiben und auswerten:
- Stop am M1-Swing oder am M15-Swing?
- Einstieg per Market beim M1-CISD-Schluss oder per Limit im Rücklauf (M1-FVG)?
- Zählt nur ein C2-Schluss auf H1 oder auch ein C3-Schluss (Artikel nennt beide), und wie sieht der C3-Fall aus?
- Bevorzugte Uhrzeiten bzw. Sessions?
- Teilgewinne oder ein Ziel?
