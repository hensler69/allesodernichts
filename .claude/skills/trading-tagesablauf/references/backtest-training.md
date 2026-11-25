# Backtest-Training: ein Modell im Replay lernen (Alltra oder TradingView)

Wunsch des Nutzers (25.11.2026): Modelle wie das TTrades Scalping Model (`references/ttrades-scalping.md`) soll er
über **Backtest-Simulationen** lernen, die er selbst im Replay macht (sein Programm: **Alltra**), und zwar auf dem Chart, den er auch
handeln will (TTFM-Scalp: **CME_MINI:MNQ1!**, MNQ-Futures). Du bist dabei sein **Trainer**: Er entscheidet zuerst, du prüfst danach. Der Ablauf gilt für
jedes Modell; Beispiele hier beziehen sich auf TTFM-Scalp.

## Inhalt

1. Grundsätze
2. Einrichtung des Backtest-Programms
3. Ablauf eines Falls (Runde)
4. Bewertung
5. Lernstufen
6. Auswertung und Freigabe
7. Journal
8. Antwortformat im Training

## 1. Grundsätze

- **Erst er, dann du.** Bevor du etwas sagst, fragst du seine Einschätzung ab („Was ist dein H1-Bias, welche Kerze
  ist C2, wo ist das Ziel?“). Dann bewertest du. So lernt er das Lesen selbst, statt deine Antwort abzuschreiben.
- **Keine Zukunft.** Er spult nur bis zum jeweiligen Schritt vor. Schickt er ein Bild, auf dem der Ausgang schon zu
  sehen ist, sag es und bewerte den Fall als „gesehen“ (zählt nicht in die Statistik).
- **Prozess vor Ergebnis.** Ein regelkonformer Verlust ist ein guter Fall, ein Gewinn ohne Regeln ein schlechter.
  Beides wird getrennt bewertet.
- **Auch „kein Trade“ üben.** Fälle, in denen eine Bedingung fehlt und er richtig verzichtet, zählen als richtig.
- **Ehrlich und konkret.** Jeder Fehler mit Preis, Uhrzeit und Abschnitt der Modelldatei (z. B. „ttrades-scalping·5“).
- **Nicht live handeln**, solange das Modell im Training ist (Abschnitt 6).

## 2. Einrichtung des Backtest-Programms

Er backtestet in **Alltra** (alltra.app → Optimizer → Studio, Stand 25.11.2026; Bild vom 25.11. geprüft):
- Symbol **MNQ** „Micro E-mini Nasdaq-100 · CME“ (echter CME-Future ✓), Zeitrahmen 1m/2m/3m/5m/15m/1h/4h/1D ✓.
- Zeitzone unten rechts **UTC−4 = New Yorker Zeit** (Sommerzeit; im US-Winter UTC−5). Alle Uhrzeiten im Chart
  sind damit NY-Zeit, die Fenster 09:30 und 20:00 stehen direkt auf der Achse.
- Steuerung: „Select bar“ (Startpunkt), Play, Einzelschritt, „Bar“-Modus, „Day x of 28“; simuliertes Konto
  50.000 $ (BAL, NET, RP&L, UP&L); „Trade“ für simulierte Orders.
- Kopfzeile zeigt O/H/L/C der aktuellen Kerze: Werte daraus statt aus dem Bild messen.
Der Ablauf gilt für jedes Replay-Programm, auch für TradingView. Was das Programm können muss:

- **Markt**: für TTFM-Scalp **MNQ** (Micro E-mini Nasdaq-100, CME) oder NQ, gleiche Kurse. Prüfen, dass es wirklich
  der CME-Future ist und nicht ein Krypto-„Nasdaq“-Kontrakt oder ein CFD mit anderen Preisen.
- **Zeitrahmen**: H1, M15, M1, Kerze für Kerze abspielbar, ohne dass die Zukunft sichtbar ist. Gibt es kein M1:
  M1-Schritt auf **M5** üben und im Journal als „Variante M5“ kennzeichnen (Ergänzung).
- **Zeitzone**: Europe/Berlin einstellen (oder die Zeitzone des Programms nennen), damit die Uhrzeiten zu
  Eröffnung (15:30 MEZ) und Sperrzeiten passen.
- **Startpunkt**: Replay auf H1 starten, ca. 1–2 Stunden **vor** seinem Fenster (NY: ca. 08:00 NY, Asia: ca. 18:00
  NY), damit er den Bias aus der letzten H1-Kerze vor dem Fenster liest. Dann auf M15/M1 wechseln, ohne vorzuspulen.
  Einstiege nur in seinen Fenstern: **NY ab 09:30 NY** und **Asia ab 20:00 NY** (`references/ttrades-scalping.md`,
  Abschnitt 8).
- **Tag wählen**: zufällig, keine Tage, die er schon kennt. Montag bis Freitag, möglichst ohne große Datentermine,
  später gezielt auch Datentage. Bei MNQ keine Tage direkt am Kontraktwechsel (März, Juni, September, Dezember).
- **Bilder**: Screenshot aus dem Programm statt Handyfoto, damit Preise und Uhrzeiten genau sind. Preisachse,
  Datum, Uhrzeit und Zeitrahmen sichtbar.
- **Falls er doch TradingView nutzt**: Bar Replay ab H1 starten; 1-Min.-Replay laut TradingView-Hilfe erst ab dem
  Paket Essential.

## 3. Ablauf eines Falls (Runde)

Er schickt zu jedem Schritt ein Bild und seine Antwort. Du bewertest und sagst, bis wohin er weiter vorspult.

| Schritt | Er schickt | Er beantwortet | Du prüfst |
|---|---|---|---|
| **A · H1** | H1 nach einem Kerzenschluss | Bias? Welche Kerze ist C2 (oder C3)? Liquidität bzw. FVG davor? Ziel der Expansion? | Bedingungen 0–2 (`ttrades-scalping.md`, Abschnitt 7). Kein Bias → „kein Setup, weiter bis zum nächsten H1-Schluss“. |
| **B · M15** | M15 in der H1-Kerze C3 | Wo bildet sich der Swing (Docht)? Ist der M15-C2-Schluss da? | Bedingung 3. Swing auf der richtigen Seite der H1-Eröffnung? |
| **C · M1** | M1 in der M15-Kerze C3 | Rücklauf wohin? Wo ist die CISD? Einstieg, Stop, Ziel, R? | Bedingungen 4–7, R mit `scripts/rechner.py --markt MNQ`, 1–2 Ticks Schlupf. Stop-Variante (M1- oder M15-Swing) festhalten. |
| **D · Auflösung** | Bild nach Ziel oder Stop | Ergebnis in R, was ist passiert? | Ergebnis gegen den Plan, Fehler benennen. |
| **E · Journal** | – | – | Fall eintragen (Abschnitt 7), Zwischenstand nennen. |

Antwortet er nur mit einem Bild ohne eigene Einschätzung: freundlich nach seiner Einschätzung fragen, erst dann
bewerten.

## 4. Bewertung

- **Jede Bedingung** mit ✓ / ✗ / ~ (teilweise) und einem Satz Begründung.
- **Regelkonform**: ja, wenn alle Pflicht-Bedingungen erfüllt waren **oder** er richtig verzichtet hat.
- **Fehlerarten** (eine oder mehrere, für die Statistik):
  - `bias`: kein oder falscher H1-Bias (C2 nicht erkannt, gegen die Daily-Richtung)
  - `c2`: C2-Schluss falsch gelesen (Docht statt Schluss, nicht in die Range zurück)
  - `swing`: M15-Swing auf der falschen Seite der H1-Eröffnung oder ohne C2-Schluss
  - `ruecklauf`: Einstieg ohne Rücklauf, hinterhergelaufen
  - `cisd`: CISD falsch (Docht statt Körper, falsche Serie)
  - `stop`: Stop nicht hinter dem geschützten Swing oder ohne Puffer (Spread bzw. 1–2 Ticks)
  - `ziel`: Ziel nicht aus H1, unter 2R
  - `zeit`: Sperrzeit, außerhalb seiner Fenster (NY ab 09:30 NY, Asia ab 20:00 NY)
  - `zukunft`: Ausgang war schon sichtbar
- **Punkte je Fall** (Ergänzung): 1 Punkt je richtig gelesener Bedingung, Höchstwert 8. Zeigt den Lernfortschritt
  unabhängig vom Ergebnis.

## 5. Lernstufen

Ergänzung, als Vorschlag. Er kann sie überspringen, wenn er eine Stufe sicher kann.

| Stufe | Was | Umfang | Weiter, wenn |
|---|---|---|---|
| **1 · Bias lesen** | nur Schritt A | 10 H1-Fälle | ≥ 8 von 10 richtig gelesen |
| **2 · Swing finden** | Schritte A + B | 10 Fälle | ≥ 8 von 10 richtig |
| **3 · Volles Modell** | Schritte A–E | mind. 30 Fälle (inkl. „kein Trade“) | Auswertung Abschnitt 6 |
| **4 · Vorwärtstest** | live auf Demo bzw. nur im Journal, ohne Replay | 10 Handelstage | Auswertung Abschnitt 6 |

## 6. Auswertung und Freigabe

- **Kennzahlen** mit `scripts/backtest_stats.py notes/backtest-<modell>.md`: Anzahl Fälle, Trades, Trefferquote,
  Ø Gewinn und Ø Verlust in R, **Erwartungswert pro Trade in R**, längste Verlustserie, Anteil regelkonform,
  häufigste Fehler, Werte je Variante (z. B. Stop M1 gegen Stop M15) und je Session (NY gegen Asia).
- **Einordnung**: Bei 2R reicht eine Trefferquote über ca. 34 % (L3·8). Die längste Verlustserie muss zum Puffer
  des Kontos passen, auf dem er das Modell später handelt (bei MNQ noch offen).
- **Freigabe-Vorschlag** (Ergänzung, er entscheidet): mindestens 30 regelkonforme Trades, Erwartungswert ≥ +0,3R,
  längste Verlustserie ≤ 5, Regeltreue ≥ 90 %. Erst dann fragen, ob das Modell als **eigenes Setup** in den Live-Plan
  soll (bisher: M, TJR, SB, PV).
- Auswertung nach Stufe 3 und nach Stufe 4, kurz und mit Zahlen.

## 7. Journal

Datei `notes/backtest-<modell>.md` im Repo (nur Text, keine Bilder). Für TTFM-Scalp: `notes/backtest-ttfm-scalp.md`.
Eine Zeile je Fall:

| Nr | Datum Chart | Uhrzeit | Session | Stufe | Richtung | Trade | Einstieg | Stop | Ziel | R geplant | Ergebnis R | Regelkonform | Fehler | Variante | Punkte | Notiz |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

- **Session**: `NY` oder `Asia`.
- **Trade**: `ja` oder `nein` (bewusst verzichtet bzw. kein Setup).
- **Ergebnis R**: z. B. `+2,4`, `-1`, `0` (Breakeven); leer bei `Trade = nein`.
- **Regelkonform**: `ja` / `nein`.
- **Fehler**: Kürzel aus Abschnitt 4, mit Komma getrennt, sonst `-`.
- **Variante**: z. B. `Stop M1`, `Stop M15`, `Variante M5`.
- Nach jedem Fall eintragen, committen und pushen (er will nichts selbst speichern).

## 8. Antwortformat im Training

1. **Erste Zeile**: Stufe, Fall-Nr. und Urteil zu seinem Schritt, z. B. „**Stufe 3 · Fall 7 · Schritt A: ✓ Bias
   richtig** (H1-C2-Schluss nach Sweep des Asia-Tiefs)“.
2. **Bewertung** je Bedingung mit ✓/✗/~ und einem Satz.
3. **Was richtig gewesen wäre**, wenn etwas falsch war, mit Preis und Uhrzeit; bei Bedarf ein Bild mit Einzeichnung
   (`references/grafik.md`).
4. **Nächster Schritt**: welcher Zeitrahmen, bis wohin vorspulen, welche Frage er dann beantworten soll.
5. Nach Schritt D: Ergebnis in R, Journal-Zeile und Zwischenstand (z. B. „Fall 7 von 30, 5 Trades, +3,4R, Regeltreue
   86 %“).
