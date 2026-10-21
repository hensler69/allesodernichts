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

## Offene Themen
<!-- Format: - [ ] Thema (seit YYYY-MM-DD) -->
- [ ] Foto-Retusche Gym-Selfie (Instagram/Dating-Fassung): Rückmeldung zu Ausschnitt, Hautton und Stärke von Armen und Bauch abwarten (seit 2026-10-12)
- [ ] Zweites Foto (eb03be67, Feed 4:5 und Story 9:16, Bart und Gesicht mit Fülllicht): Rückmeldung zu Stärke von Armen, Bauch, Bart und Gesichtshelligkeit abwarten (seit 2026-10-21, Details in notes/2026-10-21.md)
- [ ] Foto 2 (39108e99) und Foto 3 (be0380d5), gleiche Retusche, je Feed 4:5, Story 9:16 und Originalformat: Rückmeldung abwarten (seit 2026-10-21)
- [x] Finish für alle 3 Fotos (heller, Digicam-Look): Nutzer gefiel das Ergebnis nicht, Schritt verworfen (2026-10-21)
- [ ] Alle 3 Fotos neu ohne Finish, mit Fokus-Schärfung auf Gesicht, Arme, Brust (Dateien in ergebnis_v3, Feed 4:5, Story 9:16, unzugeschnitten): Rückmeldung zu Schärfe abwarten (seit 2026-10-21)

## Laufende Themen
<!-- Themen der letzten Tage, die du mir nennst, kommen hierher -->
