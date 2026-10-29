# NAS100 (Nasdaq 100, CFD bei IQ Capital): TJR-Strategie

Wunsch des Nutzers (29.10.2026): eine eigene Strategie für den Nasdaq 100, **getrennt vom S&P 500** (eigene Datei
`references/strategie-spx500.md`), so wie er ihn handelt: als CFD **„NAS100“ bei IQ Capital** (Kurs ca. 29.500,
Spread ca. 1,89 Punkte = 189 IQ-Ticks). Anwenden, wenn er morgens „Guten Morgen“ schreibt und im selben Satz den
Markt nennt (z. B. „Guten Morgen, heute NAS100“).

**Einziges Setup: TJR** (Entscheidung vom 29.10.: „auf ORB scheißen und einfach nach Sweeps, BOS, IFVGs traden wie
TJR“). Der Ablauf steht in `references/tjr-index-strategie.md` (TJRs 6-Schritte-Box, Variante B „NAS100 allein“,
Variante C „zusammen“ mit SPX500 und SMT, Long und Short, mit Box-Text). TJR selbst handelt im Video ES und NQ. Diese
Datei ergänzt das Marktspezifische: Instrument, Zeiten, Levels, Morgenplan, Bilder.

**ORB gestrichen, Spanne bleibt als Level**: Die ORB-Strategie aus einem Video („Mind Over Market“, MES-Beispiel)
war kurz im Plan und ist am 29.10. als Setup gestrichen. Zwei Dinge daraus bleiben:
- **Eröffnungsspanne**: Hoch und Tief der ersten 15-Min.-Kerze ab 09:30 New York sind ein **Key Level** für
  TJR-Schritt 1. Ein Docht darüber bzw. darunter mit Schluss zurück in die Spanne ist ein Sweep.
- **Körper-Schluss zählt, Docht nicht**: Das gilt auch für jeden BOS und jede IFVG.

## Inhalt

1. Instrument bei IQ Capital, Chart und was beim Nasdaq anders ist
2. Zeiten
3. Levels für Schritt 1 (Sweep)
4. Pflicht, Noten, Konfluenz
5. Vor dem Trade (Morgenplan, 15:15, ab 15:30)
6. Während des Trades
7. Risiken
8. Bilder, Grafik, Journal
9. Beispiel vom 29.10. (NQ-Abverkauf)
10. Test-Variante VE: Einstieg vor der Eröffnung (kein Setup)

## 1. Instrument bei IQ Capital, Chart und was beim Nasdaq anders ist

- **Handel**: CFD **NAS100** bei IQ Capital. In IQ ist ein Tick 0,01 Punkte (Spread 189 = 1,89 Punkte).
- **1 Unit = 10 $ pro Punkt** (gemessen im IQ-Order-Panel am 29.10.2026: 0,5 Units mit Stop 10 Punkte = 50 $
  Risiko; die Symbol-Info zeigt keinen Punktwert).
  - Positionsgröße: **Units = 25 ÷ Stop in Punkten**, genau mit `scripts/rechner.py --markt NAS100`.
  - Beispiel: Stop 37 Punkte → **0,67 Units** für 250 $.
- **Chart**: Levels auf dem Chart messen, dessen Kurse er handelt, also **NAS100 in IQ**. Andere Charts
  (OANDA:NAS100USD, NQ1!) weichen ab; NQ1! ist in kostenlosen TradingView-Konten meist verzögert („D“). Zum Lernen
  reicht NQ1!, für echte Einstiege zählt IQ (Ergänzung).
- **Spread** 1,89 Punkte: deutlich mehr als beim SPX500, beim Stop mitrechnen.
- **Was beim Nasdaq anders ist (Ergänzung)**:
  - Er ist technologielastig.
  - Er reagiert stärker auf Zinsen, Anleiherenditen, CPI und die Fed.
  - **Quartalszahlen der großen Tech-Werte** (Apple, Microsoft, Nvidia, Amazon, Alphabet, Meta, Tesla) kommen meist
    nach US-Börsenschluss (ca. 22:00 MEZ). Sie verschieben den nächsten Tag oft stark. Im Morgenplan prüfen.
  - Er bewegt sich in Punkten etwa vier- bis fünfmal so weit wie der S&P 500. Stops sind deshalb größer, die
    Position kleiner.
  - Die Kerzen sind schneller, Fehl-Signale häufiger. In Schritt 4 bevorzugt BOS oder IFVG mit kräftiger Kerze.

## 2. Zeiten

Normal / in den Zeitumstellungs-Wochen (z. B. 26.–31.10.2026) eine Stunde früher:

| Was | New York | Berlin |
|---|---|---|
| Kassa-Eröffnung, Beginn der Eröffnungsspanne | 09:30 | **15:30** / 14:30 |
| Eröffnungsspanne fertig (15-Min.-Kerze) | 09:45 | **15:45** / 14:45 |
| US-Daten um 08:30 (BIP, CPI, Arbeitsmarkt) | 08:30 | 14:30 / 13:30 |
| US-Daten um 10:00 (ISM, Verbrauchervertrauen, JOLTS) | 10:00 | **16:00** / 15:00 |
| Silver-Bullet-Fenster (das Beispiel im SB-Beitrag war NAS100) | 10:00–11:00 | 16:00–17:00 / 15:00–16:00 |
| Letzter Einstieg (Ergänzung) | 11:30 | 17:30 / 16:30 |
| Tech-Quartalszahlen | ca. 16:00–16:30 | ca. 22:00–22:30 / 21:00–21:30 |

- **Premarket-Sweep (Fall 2b)**: Kam der Sweep vor 15:30 MEZ, nach der Eröffnung auf die 5-Min.-Manipulation warten.
- **LuxAlgo-Sessions** (auf PC und Handy gleich): Zeitzone UTC−4, ab 2.11.2026 UTC−5 (Winterzeit New York),
  „Use Exchange Timezone“ aus; New York 09:30–16:00, London 02:00–05:00, Asia 20:00–00:00 (New Yorker Zeit). Mit den
  Standardzeiten beginnt die NY-Box schon um 09:00 und die London-Box läuft bis 12:00 NY (Handy-Foto vom 29.10.).
- Seine Regeln gelten: keine neuen Einstiege 15 Min. vor bis 15 Min. nach US-Daten, an Fed-Tagen ab 30 Min. vor dem
  Entscheid keine Position. Fällt die Eröffnung in eine EZB-/Fed-Pressekonferenz, ist der Tag zum Zuschauen. Kein
  NAS100-Trade über Tech-Zahlen am Abend halten.

## 3. Levels für Schritt 1 (Sweep)

- **Vortag**: Hoch, Tief, Schluss (PDH/PDL/PDC). Nach Tech-Zahlen auch die **Lücke zum Vortagesschluss**.
- **Sessions**: Asia- und London-Hoch/-Tief, im Premarket das Nacht-Hoch/-Tief.
- **1H und 4H**: Swing-Hochs und -Tiefs in Tagesreichweite, gleiche Hochs/Tiefs (Liquidität).
- **Eröffnungsspanne**: Hoch und Tief der ersten 15-Min.-Kerze ab 09:30 New York, sobald sie steht.
- **Offene FVGs** auf 15 Min./1H mit Status (offen / angelaufen / IFVG).
- Pivots nur als Konfluenz (`scripts/pivots.py --pip 1 --band 8 --toleranz 10`, in Punkten, Ergänzung).

## 4. Pflicht, Noten, Konfluenz

- **Pflicht**: die 6 Schritte aus `references/tjr-index-strategie.md`, Abschnitt 2a (Long und Short), plus
  Risiko-Rahmen:
  - Stop hinter dem Sweep-Extrem + Spread, ohne Liquidität direkt dahinter;
  - ≥ 2R bis zur vorigen Liquidität;
  - außerhalb der Sperrzeit;
  - höchstens 2 Verluste pro Tag **über alle Märkte**.
- **A (TJR-NAS100)** = alles erfüllt. **A+** = zusätzlich im Silver-Bullet-Fenster, oder mit SMT zum SPX500
  (Variante C). Sonst **„Lass es.“**
- **Dafür/Dagegen** mit Anzahl:
  - Bias Daily/4H,
  - Displacement der Wende,
  - mehrere Bestätigungen je Schritt,
  - Ziel-Liquidität noch offen,
  - Termine und Tech-Zahlen,
  - SMT (wenn beide Charts),
  - VWAP (Ergänzung),
  - Spread.

## 5. Vor dem Trade

**Morgenplan** (wenn er morgens „NAS100“ nennt; der Haupthandel beginnt erst um 15:30):
1. **Termine** per Websuche: US-Daten 08:30 und 10:00 New York, Fed, **Tech-Quartalszahlen** gestern Abend und
   heute Abend.
2. **Bias** aus Daily und 4H (L3·3), bei einer Lücke nach Tech-Zahlen: Wo liegt der Vortagesschluss?
3. **Levels** für Schritt 1 einzeichnen (Abschnitt 3), mit FVG-Status.
4. **Szenarien Long und Short**: Welche Liquidität kann nach 15:30 gesweept werden? Wo wäre die vorige Liquidität als
   Ziel, mit ≥ 2R?

**15:15 MEZ** (14:15): Wurde ein Level schon im Premarket gesweept (→ Fall 2b)? Levels aktualisieren, Alarme setzen.

**Ab 15:30 MEZ** (14:30):
1. **15:45**: Eröffnungsspanne als Level einzeichnen.
2. **Nach einem Sweep**: 5-Min.-Bestätigung (BOS/IFVG/79 %)? EQ und FVG markieren, Alarm an der Zone.
3. **In der Zone**: 1-Min.-Bestätigung (BOS oder IFVG, kräftige Kerze), dann Einstieg.
   - Units = 25 ÷ Stop (Rechner).
   - Stop hinter dem Sweep + Spread.
   - Ziel = vorige Liquidität.
4. **IFVG-Limit** (TJR-IF): Limit an der Kante der IFVG, Stop trotzdem hinter dem Sweep-Hoch/-Tief, wenn direkt
   hinter der IFVG Dochte oder Tiefs liegen (Beispiel unten).

## 6. Während des Trades

- **Stop bleibt** und wird nie vergrößert. **Breakeven bei 1R**. Nicht aus Angst schließen, nicht nachlegen.
- **Gegen-IFVG** auf M1/M5 (Lücke in Trade-Richtung mit Körper durchbrochen):
  - Warnzeichen in die erste Zeile.
  - Der Stop bleibt.
  - Ab 1R kommt der Stop auf Breakeven.
- **Vor US-Daten um 10:00 New York**: kein neuer Einstieg. Ein offener Trade behält seinen Stop, ab 1R auf
  Breakeven.
- **Am Ziel raus.** Nicht über Tech-Zahlen am Abend halten.

## 7. Risiken (zusätzlich zur Prüfliste in SKILL.md)

- **Zu viele „Bestätigungen“**: Nur eine klare Wende mit kräftiger Kerze, keine kleinen 1-Min.-Lücken.
- **79 %** ist die schwächste Bestätigung.
- **Premarket-Bewegungen**: verlockend (Beispiel unten), aber Fall 2b. Erst nach der Eröffnung handeln.
- **US-Daten um 10:00** mitten im Ablauf.
- **Spread 1,89 Punkte** und Schlupf in den ersten Minuten nach der Eröffnung.
- **Tech-Zahlen**: Lücken und Sprünge über Nacht.
- **CFD ≠ Future**: auf demselben Instrument messen und handeln.
- **Lernphase**: erst einige Tage Papierhandel bzw. Replay und Journal, dann echtes Geld.

## 8. Bilder, Grafik, Journal

**Bilder** (normal / Umstellungs-Woche):

| Wann | Bild | Wofür |
|---|---|---|
| Morgens (Morgen-Paket) | NAS100 **Daily** mit Kopfzeile von gestern, **1H** (3–5 Tage), **15 Min.** (gestern und die Nacht), IQ-Kopfleiste | Bias, Levels, Termine |
| 15:15 / 14:15 | NAS100 **15 Min.** | Premarket-Sweep? Levels, Alarme |
| 15:05–15:20 / 14:05–14:20 | NAS100 **5 Min.** mit Asia- und London-Box | Test-Variante VE (Abschnitt 10) |
| 15:46 / 14:46 | NAS100 **15 Min.** | Eröffnungsspanne als Level |
| Nach einem Sweep | NAS100 **5 Min.** (bei Variante C auch SPX500 5 Min.) | Schritt 2 und 3 |
| In der Zone | NAS100 **1 Min.** | Schritt 4, Einstieg |
| Vor dem Klick | IQ-Order-Panel | Units, Stop, Ziel, Schalter |
| Im Trade | NAS100 **1 Min.** bei 1R, sonst alle 15 Min. | Breakeven, Gegen-IFVG |

**Grafik**: Levels und Eröffnungsspanne, Sweep-Docht, Wende (BOS-Linie bzw. IFVG-Box), Fortsetzungs-Zone (EQ/FVG),
Einstieg, Stop, Ziel, die Schritte als Nummern 1–6.

**Journal**: „TJR-NAS100“ bzw. „TJR-ES+NQ“; Bestätigung in Schritt 2 und 4; Zone; Fall 2b ja/nein; Ergebnis in R.

## 9. Beispiel vom 29.10. (NQ-Abverkauf, Premarket)

NQ1! 5 Min., gemessen aus seinem Foto (±1 Punkt):
1. **Sweep**: gleiche Hochs 29.733,9 → London-Hoch 29.734,7.
2. **IFVG**: Die bullische FVG 29.699,6–29.713,0 aus dem Anstieg wurde mit Körper unterschlossen (29.693,7).
3. **Rücklauf**: drei Rückläufe in die Zone (Dochte bis 29.718, Körper unter 29.703), EQ ≈ 29.710.
4. **1-Min.-Bestätigung**: auf 5 Min. nicht sichtbar.
5. **Fortsetzung**: zweite IFVG 29.678–29.697, dann BOS unter 29.664,5.
6. **Ziel**: Tiefs 29.628 und 29.606 erreicht.

Rechnung im Rückblick (Stop über dem Hoch 29.737, Ziel 29.606):
- Market beim IFVG-Schluss: ca. 2,0R.
- Limit an der IFVG-Unterkante 29.700: ca. 2,5R.
- Limit an der EQ 29.710: ca. 3,9R.

Lehren:
- Ein Stop knapp über der IFVG (≈ 29.715) wäre von den Dochten bis 29.718 abgeholt worden.
- Der Sweep lag im Premarket (Fall 2b), nach den Regeln also kein Trade vor der Eröffnung.

## 10. Test-Variante VE: Einstieg vor der Eröffnung (kein Setup)

Wunsch vom 29.10. abends, nach dem Abverkauf zur Eröffnung: schon vor der Eröffnung drin sein, wenn das London-Hoch
oder -Tief im Premarket gesweept wurde. Der Stop liegt hinter dem Sweep-Extrem, damit eine erste Manipulation nach der
Eröffnung den Trade nicht abholt.
- **Kein Setup, sondern ein Test.** VE bricht Box-Regel 2b (nach einem Premarket-Sweep die 5-Min.-Manipulation nach
  der Eröffnung abwarten) und „No sweep, no trade“ für die Eröffnung.
- **Risiko bis zur Auswertung**: Papierhandel/Replay oder halbes Risiko (125 $, Units = 12,5 ÷ Stop in Punkten).
  Ein Verlust zählt zum Tageslimit.
- **Bewertung**: „VE-Test erfüllt“ oder „Lass es.“ Nie Note A, solange VE nicht ausgewertet ist.

**Foto**: 14:05–14:20 MEZ in Umstellungs-Wochen (z. B. bis 30.10.2026), sonst 15:05–15:20. Dazu NAS100 **5 Min.** mit
Asia- und London-Box (LuxAlgo-Zeiten wie in Abschnitt 2 eingestellt, auch auf dem Handy), Kurs aus IQ oder mit
bekanntem Abstand zu IQ.

**Alle Bedingungen** (Short; Long spiegelverkehrt):
1. **Sweep im Premarket**: Docht über das London-Hoch (oder Asia-Hoch, gleiche Hochs), Körper schließt zurück darunter.
   Ein Körper-Schluss darüber ist ein Ausbruch, kein Sweep.
2. **5-Min.-Bestätigung nach dem Sweep**: BOS oder IFVG nach unten. Docht und Rückkehr allein reichen nicht.
3. **Richtung**: Daily/4H und Nachrichten (Notenbank, Quartalszahlen über Nacht, US-Daten 08:30 NY) sprechen nicht
   dagegen.
4. **Vor der Eröffnung**: Der Rücklauf bildet ein tieferes Hoch unter dem Sweep-Extrem, der Kurs stockt, eine
   5-Min.-Kerze schließt nach unten.
5. **Ziel-Liquidität offen**: ungeholte Tiefs darunter (Asia-/London-Tief, Tief nach den Daten, Vortagestief),
   mindestens **2R**.
6. **Stop** über dem Sweep-Extrem + Spread (1,89) + ca. 2 Punkte. Ein neues Hoch darüber heißt: Der Sweep war ein
   Ausbruch, die Idee ist ungültig.
7. **Zeit**: Einstieg 10–15 Min. vor der Eröffnung (14:15–14:25 bzw. 15:15–15:25), nicht in einer Sperrzeit. Kommen
   US-Daten um 09:45 oder 10:00 NY, läuft der Trade in sie hinein: als Risiko nennen.

**Während des Trades**: Stop bleibt, Breakeven bei 1R. Ist bis 15 Min. nach der Eröffnung weder das Ziel noch 1R
erreicht: schließen (Zeitstopp, Ergänzung). Steht der Stop schon auf Breakeven, darf der Trade weiterlaufen.

**Danach**: Die Gegenseite nach TJR prüfen. Werden die Tiefs gesweept und schließt der Kurs zurück darüber, folgen
Bestätigung, Rücklauf und Einstieg tief im Rücklauf. Ziel ist die Kante, an der der Abverkauf begann.

**Risiken**:
- Die Eröffnung holt zuerst das Sweep-Extrem (doppelter Sweep).
- Große Zahlen über Nacht (z. B. Amazon am 29.10. abends) treiben den Premarket. Ein „Sweep“ ist dann oft ein Ausbruch
  (Ergänzung).
- Spread und Schlupf in der ersten Minute.
- Ohne Bestätigung nach der Eröffnung ist es ein Vorgriff: Die Trefferquote ist unbekannt.

**Journal** „VE-Test“: Zeit des Sweeps, Bestätigung, Einstieg, Stop, Ziel, Ergebnis in R und wie weit die Eröffnung
zuerst gegen den Trade lief (Punkte). Nach 20 Fällen auswerten (Trefferquote, Durchschnitt in R). Dann entscheidet
der Nutzer, ob VE ein Setup wird.

**Beispiel 29.10.** (OANDA NAS100USD 5 Min., aus seinem Foto, ±3 Punkte):
- Mittags Sweep des London-Hochs 29.598, danach IFVG und BOS nach unten (Abschnitt 9, dort auf NQ1!).
- Nach den US-Daten (13:30 MEZ) Tief 29.435, dann Rücklauf bis 29.573: tieferes Hoch, Stillstand.
- 14:20 MEZ rote 5-Min.-Kerze, Schluss ca. 29.520.
- VE-Rechnung: Einstieg ca. 29.520, Stop ca. 29.602, Ziel Asia-Tief 29.349 ≈ 2,1R.
- Eröffnungskerze 14:30 von 29.478 bis 29.303, Tief 29.274: Ziel nach wenigen Minuten erreicht.
