# Backtest-Journal: TTrades Scalping Model (TTFM-Scalp)

Modell: `.claude/skills/trading-tagesablauf/references/ttrades-scalping.md`
Ablauf und Spalten: `.claude/skills/trading-tagesablauf/references/backtest-training.md`
Chart: CME_MINI:MNQ1! (MNQ-Futures, oder NQ1!), Zeitzone Europe/Berlin. Ergebnis in R; Kontrakte mit `rechner.py --markt MNQ`. Auswertung: `python3 .claude/skills/trading-tagesablauf/scripts/backtest_stats.py notes/backtest-ttfm-scalp.md`

| Nr | Datum Chart | Uhrzeit | Session | Stufe | Richtung | Trade | Einstieg | Stop | Ziel | R geplant | Ergebnis R | Regelkonform | Fehler | Variante | Punkte | Notiz |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 12.10.2026 | 08:00 | NY | 1 | Short | nein | – | – | 30.990 | – |  | ja | - | Stufe 1 | 2/3 | Bias Short + Ziel (Fr-10:00-Tief ≈ 30.990) richtig: 09:00-Kerze O 31.070 H 31.087,75 L 30.936,25 C 30.960,75 (−109). 08:00 war schwache bullische C2 (Tief 07:00 geholt, kein POI, mitten im Abwärtstrend) → kein gültiges Long-Signal. Daily nicht geprüft, Begründung fehlte. |
