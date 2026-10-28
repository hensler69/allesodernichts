# Screenshot-Protokoll: was er wann schickt

Wunsch des Nutzers (28.10.2026): ein fester Uhrzeitplan, welche Bilder er wann schickt, passend zu seinen Setups.
Zeiten in **Berliner Zeit**. In normalen Wochen liegt New York 6 Stunden zurück, in den Zeitumstellungs-Wochen
5 Stunden (2026: 26.–31.10.). Bei jedem Bild hilft die Kopfzeile (O/H/L/C) und eine sichtbare Preisachse.
Screenshots sind besser als Fotos (±0,2 statt ±0,5–1 Pip).

## 1. Seine Setups (nur diese)

Gute Trader handeln wenige Setups, die sie genau kennen. Deshalb gibt es nur vier, in zwei Familien. Jedes braucht
**mehrere Bedingungen zusammen**. Das zeigen seine eigenen Trades: Am 27.10. ging Trade 1 ohne Sweep verloren, Trade 2
mit Sweep, SMT und CISD war sauber. Am 28.10. fehlten Displacement und Zeit (Sperrzeit), dazu kam eine
Seitwärtsphase.

| Familie | Setup | Kurz | Pflicht |
|---|---|---|---|
| Sweep → Strukturbruch | **M** (Grundmodell) | Zone, Sweep, SMT, M5-CISD | 5 Bedingungen, `references/checkliste.md` |
| | **TJR** (mit Variante TJR-KL) | HTF-Sweep, M5-BOS, Rücklauf in M5-FVG, M1-BOS; KL: Key-Level-Sweep, BOS/IFVG/79 %, FVG/EQ/OB/Breaker, Kerze stößt heraus | 4 Schritte, `references/tjr-setup.md`, `references/key-level-variante.md` |
| | **SB** (Silver Bullet) | wie TJR, aber nur im Fenster, CHoCH + FVG | 5 Bedingungen, `references/silver-bullet.md` |
| Pivot | **PV** | Pivot auf Zone, Rücklauf mit Sweep, Engulfing 15 Min. | 3 Bedingungen, `references/pivot-setup.md` |

**Aus dem Handbuch nicht als eigenes Setup**, nur als Konfluenz (Dafür/Dagegen):
- Engulfing (H1.1), RSI, EMA, MACD (H3), VWAP, POC (H2): je **eine** Bestätigung, also allein zu wenig.
- Doppel-Top/-Boden (H1.2/H1.3): Das zweite Top ist meist der Sweep des ersten, also die Form eines M- oder
  TJR-Setups. Allein, ohne Sweep, war genau das der Fehler vom 27.10.
- Bull/Bear Flag (H1.4): Die Flagge ist eine Seitwärtsphase im Level (L1·5), also ein Grund zu warten.
- 21-EMA-Bottom-Catching (H4.1) und AVWAP-Trendstrategie (H4.2) sind zwar vollständige Strategien, aber nur Long
  bzw. trendfolgend, ohne Sweep-Logik und bei EURUSD nur mit Tick-Volumen. Nicht handeln. Höchstens später im
  Journal mitschreiben, bevor sie dazukommen.
- Liquidationen (H4.3): Krypto, für EURUSD nicht relevant.

## 2. Normaler Tag

| Zeit (normal / Umstellungs-Woche) | Was er schickt | Wofür |
|---|---|---|
| **08:30–09:00** Morgen-Paket, alles auf einmal | 1. EURUSD **Daily** mit Kopfzeile der gestrigen Kerze<br>2. EURUSD **1H** (3–5 Tage)<br>3. EURUSD **30 Min.** mit seinen Zonen und dem Sessions-Indikator<br>4. GBPUSD **15 Min.** (gleicher Ausschnitt wie EURUSD)<br>5. **IQ-Kopfleiste** (Eq, DPL, MD) | 1: Bias, PDH/PDL, alte Hochs/Tiefs, Pivots (H/L/C) · 2: HTF-Zonen und Sweep-Kandidaten für TJR · 3: Tageszonen, Asia-Hoch/-Tief · 4: SMT-Ausgangslage · 5: Puffer und Risiko |
| nach meinem Morgenplan | sein Chart mit den eingezeichneten Pivots, Fibonacci, FRVP (falls ich darum bitte) | prüfen, ob alles richtig sitzt |
| **09:00–11:00** London (Hauptfenster) | **nur bei Ereignis**, Reihenfolge siehe Abschnitt 4 | |
| 30 Min. vor jedem Termin der Stufe 1/2 | EURUSD **30 Min.** | Status, Szenario, Breakeven-Frage |
| **15:30** / 14:30 | EURUSD **M5** + GBPUSD 15 Min. | Silver-Bullet-Vorbereitung: welche Liquidität im Fenster |
| **16:00–17:00** / 15:00–16:00 | **nur bei Ereignis** (Abschnitt 4) | Silver-Bullet-Fenster |
| Tagesende | IQ-Kopfleiste und Positionsliste | Journal, Tagesbilanz |

## 3. Notenbank- oder Datentag

- Morgen-Paket wie immer, dazu: Hoch und Tief der letzten Termin-Bewegung im 1H-Bild sichtbar lassen (Rückblick).
- **Letzter neuer Einstieg ca. 2 Stunden vor dem Entscheid**; offene Trades spätestens 30 Min. vorher schließen
  (`references/wirtschaftstermine.md`, Abschnitt 3). Liegt vorher noch ein US-Termin, gilt alles als ein Block.
- Fällt das Silver-Bullet-Fenster in den Block, entfällt es.
- Nach dem Block optional ein EURUSD **30 Min.** als Rückblick-Bild für den nächsten Morgen (Termin-Hoch/-Tief).

## 4. Bei einem Ereignis: Bilder der Reihe nach

| Schritt | Auslöser | Bild | Prüft |
|---|---|---|---|
| 1 | Kurs erreicht eine Zone aus dem Plan (TradingView-Alarm) | EURUSD **15 Min.** + GBPUSD **15 Min.** | Sweep? SMT? PV-Pivot? Seitwärtsphase? |
| 2 | Sweep ist passiert | EURUSD **M5** | CISD (M), BOS und FVG (TJR), BOS/IFVG/79 % und Zone (TJR-KL), CHoCH (SB) |
| 3 | M5-FVG wird angelaufen (TJR, TJR-FE) | EURUSD **M1** | M1-BOS bzw. tieferes Hoch/tieferes Tief in der Lücke |
| 3b | Engulfing-Kerze an einem Pivot (nur PV) | EURUSD **15 Min.** | Körper, Stoch RSI |
| 4 | Setup erfüllt, vor dem Klick | **IQ-Order-Panel** (Units, Stop, Ziel, Schalter) | Lots, Werte, Schalter an |
| 5 | Im Trade: bei 1R, vor Terminen, oder alle 30 Min. | EURUSD **M5** | Breakeven, Management |
| 6 | Trade beendet | IQ-Positionsliste + EURUSD M5 | Journal |

Ohne Ereignis keine Bilder nötig. Er muss nicht dauernd schauen: Alarme an den Zonen reichen.
