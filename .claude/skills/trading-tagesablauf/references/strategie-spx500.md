# SPX500 (S&P 500, CFD bei IQ Capital): TJR-Strategie

Wunsch des Nutzers (29.10.2026): eine eigene Strategie für den S&P 500, **getrennt vom Nasdaq** (eigene Datei
`references/strategie-nas100.md`), so wie er ihn handelt: als CFD **„SPX500“ bei IQ Capital** (Kurs ca. 7.730, Spread
ca. 0,55 Punkte = 55 IQ-Ticks). Anwenden, wenn er morgens „Guten Morgen“ schreibt und im selben Satz den Markt nennt
(z. B. „Guten Morgen, heute SPX500“).

**Einziges Setup: TJR** (Entscheidung vom 29.10.: „auf ORB scheißen und einfach nach Sweeps, BOS, IFVGs traden wie
TJR“). Der Ablauf steht in `references/tjr-index-strategie.md` (TJRs 6-Schritte-Box, Variante A „SPX500 allein“,
Variante C „zusammen“ mit NAS100 und SMT, Long und Short, mit Box-Text). Diese Datei ergänzt das Marktspezifische:
Instrument, Zeiten, Levels, Morgenplan, Bilder.

**ORB gestrichen, Spanne bleibt als Level**: Die ORB-Strategie aus einem Video („Mind Over Market“, MES-Beispiel)
war kurz im Plan und ist am 29.10. als Setup gestrichen. Zwei Dinge daraus bleiben:
- **Eröffnungsspanne**: Hoch und Tief der ersten 15-Min.-Kerze ab 09:30 New York sind ein **Key Level** für
  TJR-Schritt 1. Ein Docht darüber bzw. darunter mit Schluss zurück in die Spanne ist ein Sweep.
- **Körper-Schluss zählt, Docht nicht**: Das gilt auch für jeden BOS und jede IFVG.

## Inhalt

1. Instrument bei IQ Capital und Chart
2. Zeiten
3. Levels für Schritt 1 (Sweep)
4. Pflicht, Noten, Konfluenz
5. Vor dem Trade (Morgenplan, 15:15, ab 15:30)
6. Während des Trades
7. Risiken
8. Bilder, Grafik, Journal

## 1. Instrument bei IQ Capital und Chart

- **Handel**: CFD **SPX500** bei IQ Capital. In IQ ist ein Tick 0,01 Punkte (Spread 55 = 0,55 Punkte).
- **1 Unit = 10 $ pro Punkt** (gemessen im IQ-Order-Panel am 29.10.2026: 0,5 Units mit Stop 10 Punkte = 50 $
  Risiko; die Symbol-Info zeigt keinen Punktwert).
  - Positionsgröße: **Units = 25 ÷ Stop in Punkten**, genau mit `scripts/rechner.py --markt SPX500`.
  - Beispiel: Stop 8 Punkte → **3,12 Units** für 250 $.
  - Ändert IQ den Wert, zeigt das Panel bei „Risk“ den Betrag zum Gegenprüfen.
- **Chart**: Levels auf dem Chart messen, dessen Kurse er handelt, also **SPX500 in IQ** (Quelle „INDEX“). Andere
  Charts (OANDA:SPX500USD, ES1!) weichen um einige Punkte ab; ES1! ist in kostenlosen TradingView-Konten meist
  verzögert („D“). Zum Lernen reicht ES1!, für echte Einstiege zählt IQ (Ergänzung).
- **Spread** 0,55 Punkte: beim Stop mitrechnen. Ein Short-Stop wird über den Ask ausgelöst, ein Long-Stop über den
  Bid.
- **Volumen**: Ein CFD hat nur Tick-Volumen, das Volumenprofil ist dort nur grob.

## 2. Zeiten

Normal / in den Zeitumstellungs-Wochen (z. B. 26.–31.10.2026) eine Stunde früher:

| Was | New York | Berlin |
|---|---|---|
| Kassa-Eröffnung, Beginn der Eröffnungsspanne | 09:30 | **15:30** / 14:30 |
| Eröffnungsspanne fertig (15-Min.-Kerze) | 09:45 | **15:45** / 14:45 |
| US-Daten um 08:30 (BIP, CPI, Arbeitsmarkt) | 08:30 | 14:30 / 13:30 |
| US-Daten um 10:00 (ISM, Verbrauchervertrauen, JOLTS) | 10:00 | **16:00** / 15:00 |
| Silver-Bullet-Fenster | 10:00–11:00 | 16:00–17:00 / 15:00–16:00 |
| Letzter Einstieg (Ergänzung) | 11:30 | 17:30 / 16:30 |

- **Premarket-Sweep (Fall 2b)**: Kam der Sweep vor 15:30 MEZ, nach der Eröffnung auf die 5-Min.-Manipulation warten.
- Seine Regeln gelten: keine neuen Einstiege 15 Min. vor bis 15 Min. nach US-Daten, an Fed-Tagen ab 30 Min. vor dem
  Entscheid keine Position. Fällt die Eröffnung in eine EZB-/Fed-Pressekonferenz, ist der Tag zum Zuschauen.

## 3. Levels für Schritt 1 (Sweep)

- **Vortag**: Hoch, Tief, Schluss (PDH/PDL/PDC).
- **Sessions**: Asia- und London-Hoch/-Tief, im Premarket das Nacht-Hoch/-Tief.
- **1H und 4H**: Swing-Hochs und -Tiefs in Tagesreichweite, gleiche Hochs/Tiefs (Liquidität).
- **Eröffnungsspanne**: Hoch und Tief der ersten 15-Min.-Kerze ab 09:30 New York, sobald sie steht.
- **Offene FVGs** auf 15 Min./1H mit Status (offen / angelaufen / IFVG).
- Pivots aus Vortages-H/L/C nur als Konfluenz (`scripts/pivots.py --pip 1 --band 2 --toleranz 3`, in Punkten).

## 4. Pflicht, Noten, Konfluenz

- **Pflicht**: die 6 Schritte aus `references/tjr-index-strategie.md`, Abschnitt 2a (Long und Short), plus
  Risiko-Rahmen:
  - Stop hinter dem Sweep-Extrem + Spread, ohne Liquidität direkt dahinter;
  - ≥ 2R bis zur vorigen Liquidität;
  - außerhalb der Sperrzeit;
  - höchstens 2 Verluste pro Tag **über alle Märkte**.
- **A (TJR-SPX500)** = alles erfüllt. **A+** = zusätzlich im Silver-Bullet-Fenster, oder mit SMT zum NAS100
  (Variante C). Sonst **„Lass es.“**
- **Dafür/Dagegen** mit Anzahl:
  - Bias Daily/4H,
  - Displacement der Wende,
  - mehrere Bestätigungen je Schritt,
  - Ziel-Liquidität noch offen,
  - Termine,
  - SMT (wenn beide Charts),
  - VWAP (Ergänzung),
  - Spread.

## 5. Vor dem Trade

**Morgenplan** (wenn er morgens „SPX500“ nennt; der Haupthandel beginnt erst um 15:30):
1. **Termine** per Websuche: US-Daten 08:30 und 10:00 New York, Fed, große Quartalszahlen.
2. **Bias** aus Daily und 4H (L3·3).
3. **Levels** für Schritt 1 einzeichnen (Abschnitt 3), mit FVG-Status.
4. **Szenarien Long und Short**: Welche Liquidität kann nach 15:30 gesweept werden? Wo wäre die vorige Liquidität als
   Ziel, mit ≥ 2R?

**15:15 MEZ** (14:15): Wurde ein Level schon im Premarket gesweept (→ Fall 2b)? Levels aktualisieren, Alarme setzen.

**Ab 15:30 MEZ** (14:30):
1. **15:45**: Eröffnungsspanne als Level einzeichnen.
2. **Nach einem Sweep**: 5-Min.-Bestätigung (BOS/IFVG/79 %)? EQ und FVG markieren, Alarm an der Zone.
3. **In der Zone**: 1-Min.-Bestätigung, dann Einstieg.
   - Units = 25 ÷ Stop (Rechner).
   - Stop hinter dem Sweep + Spread.
   - Ziel = vorige Liquidität.
4. **IFVG-Limit** (TJR-IF): Limit an der Kante der IFVG, Stop trotzdem hinter dem Sweep-Hoch/-Tief, wenn direkt
   hinter der IFVG Dochte oder Tiefs liegen. Lehre vom 29.10. (NQ-Beispiel): Ein Stop knapp über der IFVG wäre von
   Dochten abgeholt worden.

## 6. Während des Trades

- **Stop bleibt** und wird nie vergrößert. **Breakeven bei 1R**. Nicht aus Angst schließen, nicht nachlegen.
- **Gegen-IFVG** auf M1/M5 (Lücke in Trade-Richtung mit Körper durchbrochen):
  - Warnzeichen in die erste Zeile.
  - Der Stop bleibt.
  - Ab 1R kommt der Stop auf Breakeven.
- **Vor US-Daten um 10:00 New York**: kein neuer Einstieg. Ein offener Trade behält seinen Stop, ab 1R auf
  Breakeven.
- **Am Ziel raus.** Nichts über große Quartalszahlen am Abend halten.

## 7. Risiken (zusätzlich zur Prüfliste in SKILL.md)

- **Zu viele „Bestätigungen“**: Nur eine klare Wende mit kräftiger Kerze, keine kleinen 1-Min.-Lücken.
- **79 %** ist die schwächste Bestätigung.
- **Premarket-Bewegungen**: verlockend, aber Fall 2b. Erst nach der Eröffnung handeln.
- **US-Daten um 10:00** mitten im Ablauf.
- **Spread und Schlupf** in den ersten Minuten nach der Eröffnung.
- **CFD ≠ Future**: auf demselben Instrument messen und handeln.
- **Lernphase**: erst einige Tage Papierhandel bzw. Replay und Journal, dann echtes Geld.

## 8. Bilder, Grafik, Journal

**Bilder** (normal / Umstellungs-Woche):

| Wann | Bild | Wofür |
|---|---|---|
| Morgens (Morgen-Paket) | SPX500 **Daily** mit Kopfzeile von gestern, **1H** (3–5 Tage), **15 Min.** (gestern und die Nacht), IQ-Kopfleiste | Bias, Levels, Termine |
| 15:15 / 14:15 | SPX500 **15 Min.** | Premarket-Sweep? Levels, Alarme |
| 15:46 / 14:46 | SPX500 **15 Min.** | Eröffnungsspanne als Level |
| Nach einem Sweep | SPX500 **5 Min.** (bei Variante C auch NAS100 5 Min.) | Schritt 2 und 3 |
| In der Zone | SPX500 **1 Min.** | Schritt 4, Einstieg |
| Vor dem Klick | IQ-Order-Panel | Units, Stop, Ziel, Schalter |
| Im Trade | SPX500 **1 Min.** bei 1R, sonst alle 15 Min. | Breakeven, Gegen-IFVG |

**Grafik**: Levels und Eröffnungsspanne, Sweep-Docht, Wende (BOS-Linie bzw. IFVG-Box), Fortsetzungs-Zone (EQ/FVG),
Einstieg, Stop, Ziel, die Schritte als Nummern 1–6.

**Journal**: „TJR-SPX500“ bzw. „TJR-ES+NQ“; Bestätigung in Schritt 2 und 4; Zone; Fall 2b ja/nein; Ergebnis in R.
