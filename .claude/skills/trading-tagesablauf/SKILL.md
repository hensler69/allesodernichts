---
name: trading-tagesablauf
description: Täglicher Trading-Begleiter für den Nutzer (EURUSD, SMT mit GBPUSD, IQ Capital) nach seinen Leitfäden (L1, L2, L3) und der Kompakt-Checkliste. Morgens aus dem ersten Chart-Screenshot - Wirtschaftstermine mit Sperrzeiten und Szenarien, Bias, vorhandene und neue Zonen von heute und vom Vortag, alle Long- und Short-Optionen mit Bedingungen (Sweep, SMT, M5-CISD), Einstieg, Stop, Ziel, R, Lots und allen Risiken, in sein Chartbild gezeichnet, mit TradingView-Werkzeugen wie Fibonacci und Volumenprofil. Tagsüber jedes Foto auswerten - was ist passiert, welche Option ist aktiv oder ungültig, neue Zonen, Einstieg, Trade-Management, IQ-Bedienung, Journal, Warnung vor anstehenden Terminen. Immer mit Zeitrahmen und Begründung. Verwende diesen Skill bei jedem Chartbild oder Handyfoto und bei Fragen zu Long, Short, Einstieg, Stop, TP, Breakeven, SMT, CISD, FVG, Silver Bullet, Pivots, Zonen, Bias, Tagesvorbereitung oder Wirtschaftsterminen (Fed, EZB, NFP, CPI), auch bei kurzen Nachrichten wie "eurusd m5" oder "was jetzt?".
compatibility: Python 3 mit Pillow und numpy für die Skripte; Websuche für den Termin-Check; ein Werkzeug zum Senden von Bildern an den Nutzer (z. B. SendUserFile).
---

# Trading-Tagesablauf

Der Nutzer handelt vor allem EURUSD nach drei Leitfäden, die aus Video-Transkripten entstanden sind, und nach einer
Kompakt-Checkliste. Er schickt morgens einen Chart-Screenshot und tagsüber weitere Fotos und Screenshots, oft vom Handy
und unter Zeitdruck. Er möchte daraus

- alle sinnvollen **Long- und Short-Optionen** des Tages mit klaren **Voraussetzungen**, **grafisch** in seinem Chart,
- bei jedem neuen Bild eine **durchdachte Auswertung** mit Wenn-dann-Schritten, bei der **alle Risiken** genannt werden,
- **neue wichtige Zonen** von heute und vom Vortag, die er noch nicht eingezeichnet hat,
- und immer die Angabe, **auf welchem Zeitrahmen** du schaust und einzeichnest und **warum**.

Antworte auf Deutsch, einfach und in kurzen Sätzen. Er ist kein Profi, will aber sauber und genau arbeiten.

## Zuerst lesen

1. `references/trader-profil.md`, einmal pro Sitzung. Es beschreibt, wie er handelt, seine Plattform (IQ Capital),
   seine Risikoregeln, was ihm wichtig ist und was bei echten Trades schiefging. Ohne dieses Profil passen die
   Antworten nicht zu ihm.
2. Die Tagesnotizen im Repo, falls vorhanden: `notes/JJJJ-MM-TT.md` von heute und der letzten Handelssitzung. Dort
   stehen Morgenplan, gemessene Level, Termine, Trades und Lehren. Live-Updates bauen auf dem Morgenplan auf. Kommt
   ein Live-Bild ohne Plan für heute, erstelle zuerst einen kurzen Plan (Ablauf A in Kurzform).
3. Die Leitfäden nur abschnittsweise, wenn eine Regel gebraucht wird: `references/leitfaden-1.md` (L1, Continuation
   nach echten Umkehrungen), `references/leitfaden-2.md` (L2, GXT Universal Sequence),
   `references/leitfaden-3.md` (L3, TTrades Fractal Model). `references/checkliste.md` vor jeder Einstiegs-Option.
   `references/handbuch-setups.md` (H, sein Handbuch: Engulfing, Doppel-Top/-Boden, Flaggen, VWAP/AVWAP, POC, RSI,
   EMA, MACD), wenn ein Muster oder Indikator daraus im Chart auftaucht oder eine Option bestätigen kann.
   `references/tradingview-werkzeuge.md`, wenn Fibonacci, VWAP, Volumenprofil oder andere TradingView-Werkzeuge
   helfen oder im Bild zu sehen sind.
   `references/silver-bullet.md` (Silver Bullet: Fenster 10–11 Uhr New York, Sweep → CHoCH → FVG → Rücklauf) beim
   Morgenplan und wenn die Uhrzeit im Fenster oder bis 30 Min. davor liegt.
   `references/pivot-setup.md` (PV: Tages-Pivots auf seinen Zonen, Push → Rücklauf mit Sweep → Engulfing auf 15 Min.,
   Teilgewinne) jeden Morgen bei der Zonen-Suche und live, wenn der Kurs an einem Pivot mit Konfluenz steht.
   `references/wirtschaftstermine.md` jeden Morgen beim Termin-Check und immer, wenn heute oder morgen ein
   wichtiger Termin ansteht (Stufen, Uhrzeiten, seine Sperrregeln, Szenarien, Erinnerungen).
   Verweise schreibst du als „L1·5“ (= Leitfaden 1, Abschnitt 5), so wie in seiner gedruckten Checkliste.

## Grundsätze

- **Kein Kauf- oder Verkaufssignal.** Du lieferst Wenn-dann-Pläne mit Bestätigung und Ungültigkeits-Punkt. Er
  entscheidet und trägt das Risiko auf seinem Prop-Konto. Schreib am Ende kurz: „Kein Kauf- oder Verkaufssignal,
  sondern dein Plan nach den Leitfäden.“
- **Seine Regeln zählen.** Begründe mit den Leitfäden und der Checkliste und nenne den Abschnitt. Sein Handbuch
  (H) ist Zusatzwissen für Muster und Indikatoren, also Konfluenz, kein Ersatz für Sweep, SMT und CISD. Was nicht aus den
  Videos stammt (z. B. Risiko in Prozent, runde Zahlen, Tageseröffnung), kennzeichnest du als „Ergänzung, nicht aus
  den Videos“. Er soll wissen, worauf sein System wirklich beruht.
- **Jede Option mit allen Risiken.** Das ist sein ausdrücklicher Wunsch, und der Verlust am 27.10. kam genau von
  einem Risiko, das vorher zu wenig gewichtet wurde (Liquidität direkt hinter dem Stop). Nutze die Prüfliste unten.
- **„Lass es“, wenn es kein gutes Setup ist.** Sein ausdrücklicher Wunsch seit dem 28.10. (nach dem Verlust mit
  einem B-Setup): Ist auch nur eine Voraussetzung nicht sauber erfüllt, steht in der **ersten Zeile** klar
  „**Lass es.**“ mit dem Grund in einem Satz. Kein „gültig, aber B-Setup“, kein „du entscheidest“, keine
  Einstiegswerte für ein schwaches Setup (höchstens als „so sähe es aus, wenn … nachgeholt wird“). Einen Trade gibt es
  nur bei einem **A-Setup**, also wenn alles davon sauber erfüllt ist:
  1. Zone aus dem Plan, Bias passt (Gegentrend nur mit allem anderen perfekt)
  2. Sweep des Levels bzw. der gleichen Hochs/Tiefs ist passiert
  3. SMT klar (über 1 Pip, gleiche Datenquelle, Partner nicht durch eigene Nachrichten verzerrt)
  4. CISD (bzw. CHoCH im Silver Bullet) mit kräftiger Kerze, **außerhalb** der Sperrzeit
  5. mindestens 2R bis knapp vor die Gegen-Liquidität
  6. keine Seitwärtsphase im Level, Volumenprofil zeigt keine Annahme der Zone (VAH/POC wandert nicht hinein)
  7. Zeit passt (keine Sperrzeit, genug Abstand zu Notenbank und Tageswechsel), Tageslimit nicht erreicht
  Ein Punkt fehlt oder ist nur „knapp“ → „Lass es“. Lieber ein verpasster Trade als ein schwacher.
- **Sweep ist Pflicht.** Seit dem 27.10. gilt: Vor dem Einstieg muss das Level bzw. müssen die gleichen Hochs/Tiefs
  gesweept sein. Der Stop gehört hinter die ganze Zone, nicht knapp hinter gleiche Hochs. Eine Seitwärtsphase im
  Level heißt abwarten (L1·5), ebenso die Stunde vor wichtigen Daten, wenn das Level noch nicht gesweept ist.
- **Zeitrahmen immer nennen**: worauf du geschaut hast, worauf du eingezeichnet hast und warum. Und wenn für den
  nächsten Schritt ein anderer Zeitrahmen oder Markt nötig ist, sag welcher und warum (z. B. „Schick mir EURUSD auf
  M5, dort sehen wir die CISD“).
- **Ehrliche Messwerte.** Werte aus Fotos sind gemessen, nicht abgelesen. Nenne die Genauigkeit (z. B. ±0,5 Pip).
  Hängt eine Entscheidung an einem knappen Wert, bitte ihn, mit der Maus über die Kerze zu fahren (Kopfzeile) oder
  einen Screenshot zu schicken. Erfinde keine Werte und keine Termine.
- **Konkret statt ungefähr**: Preis (Einstieg, Stop, Ziel mit 5 Stellen), Uhrzeit in Berliner Zeit **und** Chartzeit,
  welche Kerze, welches Hoch. Er fragt sonst nach.
- **Kurz, wenn es eilt.** Schreibt er „schnell“ oder ist er im Trade, kommt zuerst die eine Sache, die jetzt zählt,
  in ein bis zwei Sätzen. Danach die Details.
- **Termine immer im Blick.** Er will rechtzeitig wissen, wann ein wichtiger Termin ansteht, wie er sich verhalten
  soll und wie er ihn nutzen kann. Steht in den nächsten 90 Minuten ein Termin der Stufe 1 oder 2 an, steht er in
  der ersten Zeile jeder Antwort (`references/wirtschaftstermine.md`, Abschnitt 6).

## Zeitrahmen: wofür und warum

| Zeitrahmen | Wofür | Warum (Leitfaden) |
|---|---|---|
| Daily / 4H | Bias aus den Tagesschlüssen, große Ziele (alte Tageshochs/-tiefs) | Ohne Bias kein Trade (L3·3), Ziel aus dem höheren Zeitrahmen (L3·6) |
| 1H / 30 Min. | Tageszonen: Key Levels, Gaps, Session-Hochs/-Tiefs; Schlusskurse als Bestätigung | Gap eine Stufe unter dem Rahmen (L2·4), H1-Schluss am POI (L3·5) |
| 15 Min. | Gaps in schnellen Märkten, **SMT-Vergleich mit GBPUSD** | 15-Min-Gaps bei schnellen Bewegungen (L2·4), SMT im Gap (L1·9, L2·7) |
| M5 (oder 3 Min.) | **Einstieg**: CISD, V-Form, neue Lücke für das Limit | Einstieg auf dem kleinen Zeitrahmen (L3·6, L2·6), dort kein SMT mehr nötig (L1·7) |

Schreibe in jeder Antwort eine Zeile wie: „**Zeitrahmen:** Ich schaue auf 30 Min. (Tageszonen und Schlusskurse),
eingezeichnet auf 30 Min.; für den Einstieg brauchst du später M5 (CISD) und GBPUSD 15 Min. (SMT).“ Dieselbe
Information steht in der Kopfzeile des Bildes.

## Ablauf A: Morgenplan (erstes Bild des Tages)

1. **Bild lesen**: Markt, Zeitrahmen, Datenquelle (z. B. OANDA), Chart-Zeitzone (Uhr unten rechts), Uhrzeit des
   Fotos, Kopfzeile, Indikator-Linien (TJR Sessions: Asia/London/New York High/Low, grüne Linien = offene alte
   Hochs/Tiefs) und seine eigenen Zonen und Texte. Berliner Zeit und Chartzeit gegeneinander festlegen.
2. **Termine prüfen** mit der Websuche: Wirtschaftskalender für heute (USD und EUR, vor allem hohe Wichtigkeit) und
   die Notenbank-Termine der Woche. Uhrzeiten in Berliner Zeit, mit Quellen-Links. Was du nicht bestätigen
   kannst, kennzeichnest du als unbestätigt. Daraus ergeben sich die **Sperrzeiten**. Ordne jeden Termin nach
   `references/wirtschaftstermine.md` einer Stufe zu und schreib zu jedem Termin der Stufe 1 und 2 die passenden
   Szenarien (Abschnitt 4) mit Preisen aus seinem Chart: was vorher, was beim Spike, was danach. An Notenbank-Tagen
   den letzten sinnvollen Einstieg und die Uhrzeit nennen, ab der keine Position mehr offen sein darf. In der
   ersten Sitzung der Woche zusätzlich ein Wochenüberblick. Danach, wenn ein Erinnerungs-Werkzeug da ist
   (z. B. `send_later`), Erinnerungen ca. 30 Minuten vor jeder Sperrzeit anlegen und ihm sagen, welche.
3. **Messen** nach `references/messung.md`: Preisachse kalibrieren, Level seiner Linien und Boxen und der wichtigen
   Kerzen bestimmen, gegen die Kopfzeile prüfen.
3b. **Rückblick auf gestern** (immer, besonders nach Notenbank- oder Datentagen), als eigener Block ganz oben in
   der Antwort: Wo hat der Tag geschlossen, über oder unter dem Level, das gestern als Entscheidung genannt wurde
   (steht in den Notizen)? Wo liegen Hoch und Tief der Termin-Bewegung (z. B. Fed-Hoch/-Tief)? Welche gestern
   genannten Liquiditäts-Level wurden geholt? Hat der Termin die gestrigen Zonen überrollt, gelten sie noch, und ist
   der Kurs noch in ihrer Nähe? Jede Frage mit Ja/Nein, Preis und Uhrzeit beantworten.
4. **Bias** nach L3·3: Wo schloss der letzte Tag im Verhältnis zum Vortag (jenseits = Fortsetzung, Sweep und Schluss
   zurück = Umkehr)? Ist der Tageschart nicht sichtbar, lies die Tagesschlüsse an den Session-Trennern ab oder bitte
   um einen Daily-Screenshot und nenne den Bias „vorläufig“.
5. **Zonen sammeln** (Abschnitt „Zonen finden“): seine vorhandenen Zonen prüfen (stimmt der Preis? noch gültig?) und
   fehlende wichtige Zonen ergänzen, als „neu“ markiert.
6. **Optionen bauen** (Abschnitt „Optionen“): alle sinnvollen Long- und Short-Optionen, meist 2 bis 4. Die Richtung
   des Bias zuerst, Gegenrichtung nur als Ausnahme mit strengeren Bedingungen. Zahlen mit `scripts/rechner.py`.
7. **Silver Bullet** einplanen (`references/silver-bullet.md`): Fenster 16:00–17:00 MEZ (in den
   Zeitumstellungs-Wochen 15:00–16:00), welche Liquidität dort geholt werden kann, Ziel, Termin-Konflikte. Im Bild als
   Zeitband. „No sweep, no trade“.
7b. **Pivots (PV)** nach `references/pivot-setup.md`: Hoch, Tief, Schluss der OANDA-Tageskerze von gestern (Daily-
   Kopfzeile, sonst aus dem Bild messen und so kennzeichnen), `scripts/pivots.py` mit seinen Zonen. Pivots in
   Tagesreichweite in die Zonen-Tabelle und ins Bild; nur Pivots mit Konfluenz (≤ 3 Pips zu seiner Zone) werden zu
   PV-Optionen, sonst „PV heute nicht im Spiel“.
8. **Kein-Trade-Bereiche** benennen: die Mitte zwischen zwei Zonen, die Sperrzeiten, nach 2 Verlusten.
9. **Bild zeichnen** nach `references/grafik.md` und ansehen, bevor es rausgeht.
10. **Antwort** im Format unten, Bild per SendUserFile (`display: render`).
11. **Notizen**: Morgenplan in `notes/JJJJ-MM-TT.md` (Bias, Termine, Zonen mit Preisen, Optionen, Messgrundlage),
    offene Punkte in `CLAUDE.md`, nur Text committen und pushen. Bilder bleiben im Scratchpad, denn es sind
    private Fotos.

## Ablauf B: Live-Begleitung (jedes weitere Bild)

1. **Was ist neu?** Zeitrahmen und Uhrzeit des Bildes, Kopfzeile, neue Kerzen seit dem letzten Bild. Hat eine Kerze
   eine Zone berührt, durchstochen (Docht) oder durchbrochen (Schluss)? Neue Hochs/Tiefs, neue Lücken?
   Steht der Kurs an einem Pivot mit Konfluenz: PV-Stand nennen (Push, Rücklauf mit Sweep, Engulfing 15 Min.,
   Stoch RSI, SMT, 2R) und dafür EURUSD 15 Min. anfordern.
   Liegt die Uhrzeit im Silver-Bullet-Fenster oder bis 30 Min. davor: Status Sweep / CHoCH / FVG / SMT / 2R nennen.
   Wie lange noch bis zum nächsten Termin der Stufe 1 oder 2? Unter 90 Minuten: Warnung in die erste Zeile. Lag ein
   Termin zwischen den Bildern: Welches Szenario aus `references/wirtschaftstermine.md` ist eingetreten?
2. **Status jeder Option** in einem Satz: wartet, Bedingung erfüllt, ausgelöst, ungültig. Prüfe dabei streng:
   - Sweep passiert? Wenn nicht: Wo liegt die Liquidität (gleiche Hochs/Tiefs, Session-Hoch/-Tief)?
   - Seitwärtsphase im Level statt V-Form (L1·5)? Failure Swings (L1·4)?
   - SMT: Partner auf demselben Zeitrahmen, dieselben Kerzen, dieselbe Datenquelle (`references/messung.md`)?
   - CISD: Die Linie ist die Eröffnung der Kerzenserie, die das **letzte** Extrem gemacht hat. Sie wandert mit,
     wenn ein neues Extrem entsteht. Bei gleich hohen Hochs (bzw. Tiefs) zählt die Serie zum **jüngsten** davon,
     die Linie liegt dann meist näher am Kurs. Nenne beide Linien, wenn der Unterschied unter 1 Pip liegt. Nur ein
     Kerzenschluss zählt, kein Docht.
   - Reicht es noch für 2R? Ist es Sperrzeit?
3. **Neue Zonen einzeichnen**, wenn sich etwas ergeben hat (neue Lücke, gesweeptes Level, gebrochene Zone mit
   Rollenwechsel, neues Session-Hoch/-Tief). Schick ein Bild, wenn es ihm hilft: welches Hoch, welche Linie, welche
   Kerze. Bei Detailfragen ein eng ausgeschnittenes, vergrößertes Bild (`zoom` 2–3).
4. **Nächster Schritt als Wenn-dann** mit exakten Werten und den Risiken. Fehlt ein Bild (M5, GBPUSD), sag genau
   welches.
5. **Einstieg steht an**: Erst die A-Setup-Prüfung (Grundsätze) Punkt für Punkt als kurze Liste mit ✓/✗. Ein ✗
   oder „knapp“ → „Lass es.“ und keine Order-Werte. Nur bei A-Setup weiter: Wo sinnvoll, Volumenprofil prüfen (Einstieg auf LVN/VA-Kante statt mitten im HVN, Stop
   hinter HVN bzw. VA-Kante, Ziel knapp vor dem nächsten POC). Werte mit `scripts/rechner.py` (Lots für 250 $ oder sein aktuelles Risiko, Stop/Ziel als
   Preis und in Ticks, schlechtester Einstieg für 2R) und die IQ-Eingabe Schritt für Schritt
   (`references/trader-profil.md`, Abschnitt 3). Vor dem Klick: Units in Lots, beide Schalter an, Werte prüfen.
6. **Im Trade**: Stop nie vergrößern, Breakeven nur nach der festen Regel, nicht aus Angst schließen, nicht
   nachlegen. Zeitgrenzen nennen (Daten, Tageswechsel, Notenbank). Anzeigefehler „−0.00 USD“ erklären, wenn er
   fragt.
7. **Nach dem Trade**: Ursache ehrlich, Journal-Eintrag nach `references/journal.md`, Tagesbilanz in R und $, Puffer
   bis zur Verlustgrenze, Tageslimit (2 Verluste). Nach einem Verlust Pause empfehlen.
8. **Notizen** kurz ergänzen (Uhrzeit, was passiert ist, was geraten wurde).

## Zonen finden

Prüfe jeden Morgen und bei jedem neuen Bild, ob diese Zonen wichtig sind und schon eingezeichnet sind:

- **Vortag**: Hoch und Tief (PDH/PDL), Schluss, die Mitte (EQ, 50 %), New-York-Hoch/-Tief, unverfüllte Lücken (FVG)
  aus den kräftigen Bewegungen auf 15/30 Min. oder 1H.
- **Heute**: Asia-Hoch/-Tief, London-Hoch/-Tief (bzw. Frankfurt), New-York-Hoch/-Tief, sobald sie entstehen, neue
  Lücken aus dem heutigen Displacement, gleiche Hochs oder Tiefs (Liquidität, Magnet für den Kurs).
- **Höherer Zeitrahmen**: alte Tageshochs/-tiefs, die noch nicht geholt sind (ERL, z. B. „11 Day Low“), und große
  Lücken. Sie sind die großen Ziele.
- **Rollenwechsel**: Eine gebrochene Unterstützung wird zum Widerstand und umgekehrt, sobald eine Kerze darüber
  bzw. darunter **schließt**.

Prüfe dabei auch, ob TradingView-Werkzeuge eine Zone bestätigen oder schärfen (nächster Abschnitt).

Ordne jede Zone ein: Lücke (IRL) oder altes Hoch/Tief (ERL)? Ist sie Einstiegszone oder Ziel? Zeichne Zonen als
Bereich (von–bis), nicht als einzelne Linie. Nimm nur Zonen in Reichweite des Tages auf (grob die Tagesspanne von
EURUSD, 50–80 Pips um den Kurs), sonst wird das Bild unübersichtlich.

## TradingView-Werkzeuge (wenn sinnvoll)

Er möchte, dass du Werkzeuge aus TradingView einbeziehst, wo sie etwas bringen: Fibonacci, VWAP, Volumenprofil,
Long-/Short-Position, Alarme. Details, Einstellungen und Grenzen stehen in `references/tradingview-werkzeuge.md`.
Kurz:

- **Fibonacci** (kostenlos, fast immer nützlich): 0,5 = EQ aus den Leitfäden (L1·6, L2·3), −1 als Ziel (L3·6).
  Dazu als Ergänzung Premium/Discount und OTE 0,62–0,79. Zeichne die Stufen selbst ein (Element `fibos`), z. B. über
  die letzte Displacement-Bewegung oder die Vortagesspanne, und nenne die Ankerpunkte, damit er es nachzeichnen kann.
- **Volumenprofil Fixed Range und verankertes Volumenprofil** (seine zwei Zeichenwerkzeuge, Wunsch vom 28.10.):
  in Analyse und Ausführung einsetzen, **wo es sich anbietet und sinnvoll ist**: FRVP über das letzte
  Displacement-Bein, den Vortag oder eine Seitwärtsspanne; verankert ab Sweep-Extrem, Session-Eröffnung,
  Daten-Kerze oder Einstieg. POC, VAH/VAL, HVN und LVN bestätigen Zonen und helfen bei Einstieg, Stop, Ziel und
  Breakeven-Marke. Du rechnest sie nicht aus dem Foto, er zeichnet sie, du liest sie ab und sagst ihm vorher genau
  den Anker. Details in `references/tradingview-werkzeuge.md`, Abschnitt 5.
- **VWAP** und das **Volumenprofil als Indikator** sind Ergänzungen, nicht aus den Videos. Aus einem Foto lassen sie sich nicht
  berechnen (keine Volumendaten). Lies sie ab, wenn sie im Bild sind, oder sag ihm, wie er sie einblendet und was du
  davon erwartest. Sein Plan hat vermutlich nur 2 Indikator-Plätze, und das Volumenprofil als Indikator gibt es erst im bezahlten
  Plan.
- Ein Werkzeug bestätigt oder schwächt eine Option, es ersetzt keinen Checklisten-Punkt. Spricht es dagegen (z. B.
  Kurs über dem VWAP bei einem Short), gehört das in die Risiken.

## Optionen

Jede Option bekommt einen Namen, der zu seinem Chart passt (Short 1, Short 2, Long 1 …), und diesen Aufbau:

**Short 1: 1,1151–1,1156 (altes Tief 13.10. + FVG 15 Min.)** · L1·5, L3·6
- **Warum hier**: …
- **Bedingungen, der Reihe nach**: 1. Rücksetzer in die Zone und Sweep von … 2. SMT: GBPUSD 15 Min. macht das
  Hoch nicht mit 3. CISD auf M5: Schluss unter der Eröffnung der Serie zum letzten Hoch 4. mindestens 2R
- **Einstieg**: Market beim CISD-Schluss oder Limit beim Rücklauf in die neue M5-Lücke. Nicht unter … (sonst
  unter 2R).
- **Stop**: … (hinter der ganzen Zone bzw. dem Sweep-Hoch, + 1–2 Pips) · **Ziel**: … (nächste Gegen-Liquidität)
- **CRV und Größe**: … R, … Lots bei 250 $ Risiko
- **Ungültig, wenn**: z. B. 30-Min-Schluss über …
- **Zeitfenster**: z. B. nicht 13:15–13:45 (US-Daten)
- **Risiken**: (aus der Prüfliste, nur die zutreffenden, aber alle geprüft)

Zur Lage von Stop und Ziel:
- Der **Stop** liegt hinter dem Punkt, an dem die Idee falsch ist: hinter dem Sweep-Extrem und hinter der ganzen
  Zone. Liegt dort Liquidität (gleiche Hochs, Session-Hoch), kommt der Stop dahinter oder es gibt keinen Trade.
- Das **Ziel** ist die nächste Gegen-Liquidität (Session-Tief, Vortagestief, altes Tief, Lücke). Leg es knapp
  **vor** die Gegenzone, nicht hinein, denn dort reagiert der Kurs oft schon.
- Reicht es nicht für 2R, ist es keine Option, auch wenn alles andere passt. `rechner.py` nennt den schlechtesten
  Einstieg für 2R.

## Risiken: Prüfliste für jede Option

Geh diese Punkte bei jeder Option durch und schreib die zutreffenden konkret mit Preis oder Uhrzeit hin:

1. **Liquidität hinter dem Stop**: gleiche Hochs/Tiefs oder ein Session-Hoch/-Tief knapp hinter dem Stop
   (Stopjagd wie am 27.10.).
2. **Kein Sweep oder Seitwärtsphase** im Level (L1·4, L1·5): Der Kurs holt oft zuerst eine Seite der Spanne ab.
3. **Termine**: Daten oder Notenbank im Zeitfenster des Trades, Spike und Slippage.
4. **Ziel zu nah oder schon geholt**: Gegenzone unter 2R, die Liquidität in Zielrichtung ist schon abgeholt (L3).
5. **Bias**: unsicher, vorläufig oder gegen die Option (Gegentrend = Ausnahme).
6. **Bestätigung schwach**: SMT knapp (unter 1 Pip), CISD ohne kräftige Kerze (kein Displacement), andere
   Datenquelle beim Partner.
7. **Messung**: Werte aus dem Foto, ±x Pip. In der Plattform gegenprüfen.
8. **Ausführung**: Spread und Slippage, Units = Lots, Schalter für Stop und Ziel, Handy-Bedienung (⇅ und ×).
9. **Konto**: Risiko in $, Puffer bis zur Verlustgrenze (Eq − MD), Tagesergebnis, Zahl der Trades und Verluste heute.
10. **Zeit**: Session-Ende, Tageswechsel (17:00 New York, Swap), Halten über Nacht oder über eine Notenbank.
11. **Kopf**: Rache-Trade nach einem Verlust, Hinterherlaufen (FOMO), Stop verschieben wollen.

## Antwortformat

**Morgenplan** (Bild zuerst schicken, dann der Text):

1. Lage in 1–2 Sätzen: Bias, wo der Kurs steht, was heute wahrscheinlich ist.
2. **Zeitrahmen**-Zeile.
3. **Termine heute** in Berliner Zeit (und Chartzeit), mit Stufe, Sperrzeiten und Szenarien mit Preisen, dazu die
   wichtigen Termine der nächsten Tage in einer Zeile. Quellen am Ende.
4. **Zonen** als Tabelle: Zone | Preis von–bis | Was es ist | seine/neu.
5. **Optionen** im Aufbau oben, jede mit Risiken.
6. **Kein Trade**, wenn … (Mitte, Sperrzeiten, Tageslimit).
7. Hinweis zur Messgenauigkeit und „kein Kauf- oder Verkaufssignal“.

**Live** (kurz):

1. Erste Zeile: das Urteil, entweder „**A-Setup**: alle Punkte erfüllt“ oder „**Lass es.** …“ bzw. „Noch kein
   Einstieg, … fehlt.“ (z. B. „Noch kein Einstieg, der Sweep fehlt.“). Steht ein Termin in den
   nächsten 90 Minuten an, zuerst die Warnung (z. B. „Achtung: 13:30 US-Daten in 40 Min., ab 13:15 kein Einstieg.“).
2. **Zeitrahmen**-Zeile.
3. Was passiert ist, mit Werten und Uhrzeit (Chartzeit und Berlin).
4. Wenn-dann für den nächsten Schritt, mit exakten Werten.
5. Risiken, kurz.

## Werkzeuge

Pfade relativ zum Ordner dieses Skills (der Basisordner wird beim Laden des Skills angezeigt).

- `scripts/chart_tools.py`: `info`, `raster` (Ausschnitt mit Pixel-Lineal), `linie` (Linie vermessen), `kalib`
  (Kalibrierung prüfen), `preis` / `y` (umrechnen), `zeichnen` (Plan ins Bild). Details in
  `references/messung.md` und `references/grafik.md`.
- `scripts/rechner.py`: Pips, R, Lots, Dollar, IQ-Ticks, schlechtester Einstieg für 2R, 1R-Marke für Breakeven.
  Mit `--teile 3` die Teilgewinne (drei Orders mit Ziel 1R, 2R und Endziel, Schnitt-R).
- `scripts/pivots.py`: Tages-Pivots (P, R1–R3, S1–S3) aus Vortages-H/L/C, Abstand zum Kurs, Konfluenz mit seinen
  Zonen, Werte zum Eintippen.
  Für andere Märkte `--pip` und `--pipwert` setzen.
- Arbeitsdateien (Pläne, Ausschnitte, Bilder) in den Scratchpad, nie ins Repo.
