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
- 2026-10-28: Bei nicht sauber erfüllten Voraussetzungen klar „Lass es.“ in der ersten Zeile, Trade nur bei A-Setup (Zone+Bias, Sweep, klares SMT, CISD mit Displacement außerhalb der Sperrzeit, ≥ 2R, keine Seitwärtsphase/Volumen-Annahme, Zeit passt); keine Einstiegswerte für B-Setups (Wunsch des Nutzers nach Verlust am 28.10.)

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
- [ ] Morgen 29.10. nach 4H- und 30-Min-Screenshot zuerst beantworten (Wunsch des Nutzers): Tagesschluss 28.10. über oder unter 1,1127? Fed-Hoch und Fed-Tief? 1,1155 geholt? Hat die Fed die Zonen (Support 1 1,1134–1,1139, Support 2 1,1130–1,1133, Short 1 1,1142–1,1155) überrollt, gelten sie noch, ist der Kurs in der Nähe? Dann der gewohnte Morgenplan (EZB 14:15, US-BIP/PCE 13:30) (seit 2026-10-28)
- [ ] Silver Bullet: Nutzer entscheidet, ob Stop nach seiner Regel (hinter Sweep-Extrem) oder enger hinter der FVG wie im Video (seit 2026-10-28)
- [ ] Regeln von IQ Capital zu News-Trading und Halten über Notenbank-Termine prüfen (Nutzer)

## Laufende Themen
<!-- Themen der letzten Tage, die du mir nennst, kommen hierher -->
