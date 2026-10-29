# Projekt-Gedächtnis

Diese Datei wird von Claude Code bei jeder Session automatisch gelesen.
Hier steht, woran wir arbeiten und was entschieden wurde.

## Arbeitsweise
- Sprache: Deutsch
- Am Ende einer Session: Zusammenfassung in `notes/YYYY-MM-DD.md` ablegen
  und wichtige Entscheidungen und offene Punkte unten ergänzen.
- Vor dem Start: `notes/` auf aktuelle Einträge prüfen.

## Entscheidungen
<!-- Format: - YYYY-MM-DD: Entscheidung (Grund) -->
- 2026-10-12: Foto-Retusche nur per lokaler Verformung und weichen Masken, ohne generative KI (bleibt natürlich, Originalpixel bleiben erhalten)
- 2026-10-12: Private Fotos und Ergebnisbilder nicht ins Repo legen, nur Notizen (kein versehentlicher Commit oder Push)
- 2026-10-12: Mundkorrektur über glatte Zielkurve entlang der gemessenen Lippenlinie, keine Zugpunkte an den Mundwinkeln (wirkte beim Reinzoomen schief)
- 2026-10-12: Export für Instagram und Dating als sRGB ohne EXIF, 4:5 mit 1080×1350 plus 9:16 für Stories (Plattformen müssen nicht mehr skalieren oder umrechnen)
- 2026-10-12: Bearbeitete Bilder zusätzlich im Originalformat (gleiche Pixelgröße, Profil und EXIF) liefern (Nutzer will beide Fassungen speichern)
- 2026-10-21: Verformung der Arme/Schultern entlang handvermessener Konturen mit asymmetrischem Gauß (innen weich, außen enger), max. ca. 1,5 % der Schulterbreite pro Seite (Hintergrund bleibt ruhig, kein Verbiegen von Kanten)
- 2026-10-21: Bauch nur über vorhandenes Shirt-Relief plus sanfte Licht-Formgebung, keine aufgemalten Muskeln (bleibt echt; mehr nur auf ausdrücklichen Wunsch)
- 2026-10-21: Bild mit größter Person und bestem Licht auf dem Oberkörper wählen (Quelle ist klein, Qualität hängt an der Person-Größe)
- 2026-10-21: Bei mehreren Fotos dieselbe Retusche mit je eigener Konfiguration (Konturen, Polygone, Größenfaktor); Bauchrelief nach Quellqualität dosieren, zu starkes Entrauschen wirkt gemalt
- 2026-10-21: Auf Wunsch immer auch die unzugeschnittene bearbeitete Fassung im Originalformat einzeln schicken (Nutzer speichert sie)
- 2026-10-21: Mehr Auflösung nur als 2-fach-Hochskalieren mit Rückprojektion, Entfalten und Schärfen, keine erfundenen Details und keine generative Super-Resolution; Nutzer ehrlich darauf hinweisen, dass echte Auflösung nicht entsteht
- 2026-10-21: Weicheres Licht per Basis/Detail-Tonwert (Schatten anheben, Lichter dämpfen, additiver Schwarzpunkt) statt einfachem Kontrastregler (wirkt wie Smart HDR, nicht flau)
- 2026-10-21: Schärfe nicht global, sondern per Gewichtungskarte: Gesicht, Arme, Brust, Hände am stärksten, Rest der Person mittel, Hintergrund wenig (Fokus liegt auf der Person, kein Weichzeichner, sonst Halos)
- 2026-10-21: Schärfung mit Entfaltung statt nur Unscharf maskieren, Gesicht schwächer (nur ca. 120 px breit, sonst wie gezeichnet), Foto mit Blockrauschen vorher reinigen und schwächer schärfen
- 2026-10-21: Wenn Uploads verkleinert ankommen: Nutzer das Foto auf dem Handy eng auf sich zuschneiden lassen, dann Maßstab per SIFT gegen die alte Datei messen und echtes Zusatzdetail per Frequenzanalyse prüfen; bestehende Masken per Ähnlichkeitstransformation übernehmen statt neu vermessen
- 2026-10-21: Liegt dieselbe Aufnahme in höherer Auflösung (enger Zuschnitt) vor, die dort bearbeitete Person per Transformation ins weite Bild einsetzen statt das weite Bild selbst zu schärfen (echtes Detail, natürlicher)
- 2026-10-21: Adern durch blickdichten Stoff nicht aufmalen (wäre erfunden); nur vorhandene Adern an Händen/Handgelenken betonen, mit schmalem Filter und Schonung dunkler Stellen (breiter Filter macht die Hand fleckig)
- 2026-10-21: Beim Einsetzen einer Hi-Res-Person die Maske eng an der verformten Silhouette führen, nicht großzügig erweitern (sonst weicher Hintergrund-Saum)
- 2026-10-21: Zubehör wie Mützen nur prozedural zeichnen (Rippen als Meridiane, Zylinderprojektion, Licht von oben-vorn, Farbe am Pullover-Schwarz kalibriert, Weichheit und Korn ans Foto angepasst), keine generative KI; Marken-Logos nur als handgezeichnete Annäherung und den Nutzer darauf hinweisen
- 2026-10-21: Bart verdichten mit feinen, schwachen mittelbraunen Haarstrichen in Wuchsrichtung (Alpha ca. 0,14–0,34, 2-fach überabgetastet), Dichte von der Wangenlinie zur Kieferkante steigend; keine fast schwarzen Striche (wirkt wie Pfeffer)
- 2026-10-21: Original-EXIF kann GPS enthalten; Originalformat-Datei behält es wie entschieden, Nutzer bei jeder Lieferung kurz darauf hinweisen, Post-Fassungen immer ohne EXIF
- 2026-10-23: Schärfung nach gemessener Feindetail-Energie dosieren (Ziel ca. ×1,1–1,2 in Fokuszonen, Hintergrund ≤ ×0,95); bei bereits knackigen oder verrauschten Quellen die Werte weicherer Fotos nicht übernehmen (×1,6 wirkte hart und schmutzig), Relief und Schärfung auf vorgeglättetem Signal
- 2026-10-23: Armverbreiterung nur, wo die Kontur frei liegt (am Spiegelrand angeschnittene Arme nicht verformen, dort nur Licht und Definition); handvermessene Kontur vorher auf die stärkste Kante einrasten (lag 2–4 px daneben), Jacobi min ≥ ca. 0,65
- 2026-10-23: Story-Ausschnitt: Person im linken oder rechten Drittel, Kopf bei ca. 25 % von oben, keine angeschnittenen Fragmente am Rand, Skalierung höchstens ca. 1,2
- 2026-10-24: Video-Zusammenfassungen nur aus dem echten Inhalt (Transkript), nichts erfinden; YouTube ist in der Cloud-Umgebung gesperrt, dann den Nutzer um die Transkripte bitten (YouTube: „Transkript anzeigen“)
- 2026-10-24: Lern-PDFs mit eigenen Schemagrafiken statt Video-Screenshots; jede Grafik und jede Seite als Bild prüfen (keine Überlappungen, keine verwaisten Kästen), Kerzendaten automatisch prüfen; Aufbau: Kurzfassung, Abschnitte mit Merke-Kästen, Checklisten vor/während/nach dem Trade, Fehler-Tabelle, Glossar, klickbares Inhaltsverzeichnis; Ergänzungen, die nicht aus dem Video stammen, kennzeichnen
- 2026-10-24: Druck-Checklisten auf eine A4-Seite: jeder Punkt einzeilig (Textbreite messen, wortgenau kürzen, lange Punkte teilen), Verweise auf die Leitfaden-Abschnitte, Graustufen prüfen, keine Linien, die mit Schreiblinien verwechselt werden können
- 2026-10-26: Live-Chart-Fragen: kein Kauf-/Verkaufssignal, sondern Vorgehen nach den Leitfäden mit Wenn-dann-Szenarien, Bestätigung und Ungültigkeits-Punkt; Levels aus Fotos mit Perspektivkorrektur messen, gegen die OHLC-Kopfzeile prüfen und die Genauigkeit nennen; für genaue Werte um Screenshots statt Handyfotos bitten
- 2026-10-27: Tagesvorbereitung immer mit Termin-Check (Notenbanken, US-Daten) per Websuche und Quellen; diese Woche Fed Mi 19:00 MEZ, EZB Do 14:15 MEZ; Werte aus Fotos über Kurslinie (Krümmung) und bekannte Level gegenprüfen
- 2026-10-27: Trading-Begleitung läuft über den Skill trading-tagesablauf; Leitfäden L1–L3 sind das Modell, Handbuch (H) und TradingView-Werkzeuge nur Konfluenz, immer Zeitrahmen mit Begründung nennen
- 2026-10-27: Risikoregeln vom Nutzer bestätigt: 250 $ Risiko pro Trade, höchstens 2 Verluste pro Tag, keine neuen Einstiege 15 Min. vor bis 15 Min. nach wichtigen US-Daten
- 2026-10-27: Live-Setups: Sweep des Levels bzw. gleicher Hochs/Tiefs vor dem Einstieg als Pflicht nennen, Stop über die ganze Zone (nicht knapp über gleiche Hochs) und Lots danach berechnen; Seitwärtsphase im Level und die Stunde vor wichtigen Daten ohne Sweep heißt abwarten (erster Short am 27.10. so ausgestoppt)
- 2026-10-28: Wirtschaftstermine sind Teil des Skills (references/wirtschaftstermine.md): Stufen, Sperrregeln, Szenarien; Warnung in der ersten Zeile, wenn ein Termin der Stufe 1/2 in < 90 Min. ansteht; Erinnerungen per send_later vor Stufe-1-Terminen
- 2026-10-28: Volumenprofil Fixed Range und verankertes Volumenprofil im Skill (Analyse und Ausführung), aber nur wo es sich anbietet und sinnvoll ist; Nutzer zeichnet, Claude nennt Anker und liest POC/VAH/VAL/HVN/LVN ab
- 2026-10-28: Silver Bullet (10–11 Uhr New York, Sweep → CHoCH → FVG → Rücklauf, „No sweep, no trade“) als Szenario im Skill (references/silver-bullet.md); Stop standardmäßig nach seiner Regel hinter dem Sweep-Extrem, FVG-Stop nur auf seinen Wunsch; SB-Trades im Journal mit „SB“ kennzeichnen
- 2026-10-28: Nur vier Setups, jedes eigenständig mit eigenen Pflicht-Bedingungen: M (Grundmodell: Zone, Sweep, SMT, M5-CISD, keine Seitwärtsphase/Annahme), SB, PV, TJR; Risiko-Rahmen für jeden Trade (≥ 2R, Stop hinter Ungültigkeits-Punkt ohne Liquidität dahinter, Auslöser nicht in der Sperrzeit, Abstand zu Notenbank/Tageswechsel, max. 2 Verluste); Noten A (ein Setup vollständig + Risiko-Rahmen), A+ (mehrere am selben Ort, gleiche Richtung), sonst „Lass es.“ in der ersten Zeile ohne Einstiegswerte; bei jeder Option Dafür/Dagegen-Bilanz mit Anzahl (ersetzt die 7-Punkte-Regel; Handbuch-Muster und Indikatoren nur Konfluenz)
- 2026-10-28: TJR-Setup (references/tjr-setup.md): HTF-Sweep → M5-BOS → Rücklauf in die M5-FVG → M1-BOS = Einstieg, Short und Long; Stop hinter dem Sweep-Extrem; Journal „TJR“
- 2026-10-28: Key-Level-Reel als Variante TJR-KL (references/key-level-variante.md), kein fünftes Setup: Key Level (vorige Session/1H/4H) nach der Eröffnung gesweept → Wende per BOS/IFVG/79 % → Rücklauf in FVG/EQ/OB/Breaker → M5-Kerze stößt heraus; zählt mit TJR als ein Setup; Journal „TJR-KL“ mit Art der Wende und Zone
- 2026-10-28: FVG-Nachzügler-Einstieg TJR-FE (references/fvg-ifvg.md): kein neues Setup, zählt mit TJR; nur erwähnen, wenn es sich anbietet (Setup gelaufen, Einstieg verpasst)
- 2026-10-28: IFVG-Video als Variante TJR-IF (references/fvg-ifvg.md, Ton per Whisper transkribiert), zählt mit TJR als ein Setup: Sweep (seine Regel) → bärische FVG mit Körper überschlossen = IFVG → Ziel festlegen, ≥ 2R → Rücklauf in die IFVG = Limit an der Kante, Stop 1–2 Pips hinter der IFVG, Ziel offensichtliche Liquidität; läuft wie die anderen jeden Morgen (FVG-Status je Zone) und live vor und während des Trades; Gegen-IFVG im offenen Trade = Warnzeichen (Stop bleibt, ab 1R Breakeven); Journal „TJR-IF“
- 2026-10-29: Index-CFDs bei IQ Capital als zwei getrennte Strategien (Nutzer: S&P und Nasdaq nicht zusammenlegen): references/strategie-spx500.md und references/strategie-nas100.md, Namen wie bei IQ (SPX500, NAS100); je ORB aus Video (2 Bildschirmaufnahmen, Ton per Whisper, MES-Beispiel): erste 15-Min.-Kerze ab 09:30 NY, Ausbruch nur mit 1-Min.-Körper-Schluss, Retest berührt Kante, Rejection + Schluss wieder außerhalb = Einstieg, Stop wie im gezeigten Trade unter dem Rejection-Tief (+ Spread), Ziel SPX500 20–25 Punkte, NAS100 ca. 0,3 % (Übertragung = Ergänzung), ≥ 2R; plus ganze TJR-Familie; Fehlausbruch = Sweep → TJR; SMT keine Bedingung; Tageslimit über alle Märkte; „Guten Morgen, heute <Markt>“ lädt die Strategie und das passende Morgen-Paket; rechner.py --markt SPX500/NAS100 (IQ-Tick 0,01, 1 Unit = 10 $ pro Punkt, gemessen im IQ-Panel: 0,5 Units × 10 Punkte = 50 $), pivots.py mit --pip 1 in Punkten
- 2026-10-28: Skill-Änderungen landen automatisch in der Repo-Fassung `.claude/skills/trading-tagesablauf` (Nutzer will nichts extra speichern); diese Fassung ist maßgeblich, auch wenn die Konto-Fassung älter ist
- 2026-10-28: Screenshot-Protokoll (references/screenshot-protokoll.md): Morgen-Paket 08:30–09:00 (Daily mit Kopfzeile, 1H 3–5 Tage, 30 Min. mit Zonen, GBPUSD 15 Min., IQ-Kopfleiste), danach Bilder nur bei Ereignissen in fester Reihenfolge
- 2026-10-28: Begrüßung: Auf „Guten Morgen“/„Guten Tag“ mit „Guten Tag, Manuel“ antworten und sagen, welche Screenshots er jetzt schicken soll (Uhrzeit, Termine, Marktlage)
- 2026-10-28: Pivot-Setup (PV) im Skill (references/pivot-setup.md, scripts/pivots.py): tägliche OANDA-Floor-Pivots jeden Morgen, nur Pivots mit Konfluenz zu seinen Zonen werden Optionen; Push → Rücklauf mit Sweep → Engulfing 15 Min. + SMT; Teilgewinne 1/3 bei 1R/2R/Endziel ≥ 3R als drei IQ-Orders; Nachlegen und News-Trading aus dem Video nicht übernommen

## Offene Themen
<!-- Format: - [ ] Thema (seit YYYY-MM-DD) -->
- [ ] Foto-Retusche Gym-Selfie (Instagram/Dating-Fassung): Rückmeldung zu Ausschnitt, Hautton und Stärke von Armen und Bauch abwarten (seit 2026-10-12)
- [ ] Zweites Foto (eb03be67, Feed 4:5 und Story 9:16, Bart und Gesicht mit Fülllicht): Rückmeldung zu Stärke von Armen, Bauch, Bart und Gesichtshelligkeit abwarten (seit 2026-10-21, Details in notes/2026-10-21.md)
- [ ] Foto 2 (39108e99) und Foto 3 (be0380d5), gleiche Retusche, je Feed 4:5, Story 9:16 und Originalformat: Rückmeldung abwarten (seit 2026-10-21)
- [x] Finish für alle 3 Fotos (heller, Digicam-Look): Nutzer gefiel das Ergebnis nicht, Schritt verworfen (2026-10-21)
- [ ] Alle 3 Fotos neu ohne Finish, mit Fokus-Schärfung auf Gesicht, Arme, Brust (Dateien in ergebnis_v3, Feed 4:5, Story 9:16, unzugeschnitten): Rückmeldung zu Schärfe abwarten (seit 2026-10-21)
- [ ] Originale in voller Auflösung: Enger Zuschnitt vor dem Upload brachte beim Hüft-Foto 1,4-fach mehr Pixel auf der Person (neu bearbeitet, ergebnis_v4). Wasserflaschen-Foto ohne Gewinn, Foto 1 noch nicht neu geschickt (seit 2026-10-21)
- [ ] Hüft-Foto im weiten Originalformat 1680×2576, Arme und Adern verstärkt (ergebnis_v6, ersetzt v5): Rückmeldung abwarten (seit 2026-10-21)
- [ ] Selfie von unten (1242×2208) mit dunkelblauer Polo-Beanie (Rippstrick, Umschlag, Pony-Logo) und verstärktem Seitenbart (Originalformat, Feed 4:5, Story 9:16): Rückmeldung zu Mützenform und -höhe, Blauton, Logo und Bartstärke abwarten (seit 2026-10-21, Details in notes/2026-10-21.md, Nachtrag 8)
- [ ] Gym-Spiegelselfie A (1654×2576, Hantelscheiben-Wand) für die Story, Foto B nicht bearbeitet: Rückmeldung zu Schärfe, Stärke von Arm und Bauch, Ausschnitt abwarten (seit 2026-10-23, Details in notes/2026-10-23.md)
- [ ] Trading-PDFs aus 3 YouTube-Videos (TNybDCtwBnc, 3eTG_b5NTgw, oucPinjDdlk), aus eingefügten Transkripten, je mit Grafiken, Checklisten vor/während/nach dem Trade, Fehler-Tabelle und Glossar, dazu eine einseitige Kompakt-Checkliste zum Ausdrucken: geliefert, Rückmeldung abwarten (seit 2026-10-24, Details in notes/2026-10-24.md)
- [x] EURUSD live 26.10.: Szenario A (Short aus der FVG-Box) ist aufgegangen, Kurs bis 1,1173 (2026-10-27)
- [ ] EURUSD-Vorbereitung 27.10. (grüne Linien erklärt, Level, Fed/EZB-Woche, FVG-Indikator empfohlen): Nutzer prüft Tageschart-Bias und SMT mit GBPUSD (seit 2026-10-27, Details in notes/2026-10-27.md)
- [x] EURUSD live 27.10.: Short 1 nach SMT (GBPUSD über sein Hoch) und M5-CISD ausgelöst, Einstieg 1,11444, SL 1,11530, Ziel 1,11138: Stop getroffen, −1R (≈ −286 $) (2026-10-27)
- [x] EURUSD 27.10. Trade 2: Short 1 nach Sweep (1,11545), SMT und M5-CISD, Einstieg 1,11472, Stop 1,11570, abends von Hand geschlossen mit ca. +400 $ (≈ +1,6R); Tag ≈ +114 $, Journal-Einträge geliefert (2026-10-27)

- [x] Skill „trading-tagesablauf“ (.claude/skills/) erstellt und getestet; Nutzer hat Annahmen (250 $ Risiko, max. 2 Verluste/Tag, Sperrzeit ±15 Min. um US-Daten) und Bilder bestätigt (2026-10-27)
- [ ] EURUSD 28.10. (Fed-Tag): Morgenplan mit Long 1 (Gegentrend nach Sweep 1,11132), Short A 1,1130–1,1137, Short 1 1,1142–1,1155; Erinnerungen 16:45 und 18:15 MEZ gesetzt (seit 2026-10-28, Details in notes/2026-10-28.md)
- [x] EURUSD 28.10. Trade: Short A nach Sweep (1,11369), SMT und M5-CISD, 5,74 Lots ab 1,11327, Stop 1,11411 getroffen ≈ −482 $ (Lots zu groß, Seitwärtsphase in der Zone) (2026-10-28)
- [ ] EURUSD Do 29.10.: Morgenplan geliefert (Long A 1,1131–1,1134 nach London-Sweep mit SMT, M5 fehlt; Short 2 1,1163–1,1177; Long B 1,1111–1,1122; Mitte 1,1143–1,1155 kein Trade); Handel bis 12:15, Sperre 13:15–16:00; Erinnerungen 12:05 und 12:55 (Details in notes/2026-10-29.md)
- [ ] Silver Bullet: Nutzer entscheidet, ob Stop nach seiner Regel (hinter Sweep-Extrem) oder enger hinter der FVG wie im Video (seit 2026-10-28)
- [ ] Pivot-Setup: Nutzer testet es am besten zuerst im TradingView-Replay oder Papierhandel (ca. 20 Tage), Stochastic RSI und 20/50/200-MA im Chart klären (Indikator-Plätze) (seit 2026-10-28)
- [ ] SPX500/NAS100: ORB erst im Replay/Papierhandel testen; Punktwert geklärt (1 Unit = 10 $ pro Punkt) (seit 2026-10-29)
- [ ] Regeln von IQ Capital zu News-Trading und Halten über Notenbank-Termine prüfen (Nutzer)

## Laufende Themen
<!-- Themen der letzten Tage, die du mir nennst, kommen hierher -->
