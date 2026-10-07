# Testen und CHECK

Alle Skripte liegen in `scripts/` dieses Skills. Playwright (Browser-Fernsteuerung) und Chromium sind in der Cloud-Umgebung
schon installiert: `NODE_PATH=/opt/node22/lib/node_modules`, Chromium unter `/opt/pw-browsers/chromium-*/chrome-linux/chrome`.
Nie `playwright install` ausführen. Arbeitsdateien (Bildschirmfotos, Mails, Logs) in den Scratchpad-Ordner, nicht ins Projekt.

## 1. Testserver
```bash
bash scripts/server_starten.sh <shop-ordner> 8092 <scratchpad>
```
PHP-Testserver mit Router für saubere Adressen. `mail()` schreibt in `<scratchpad>/mails.txt`. Läuft weiter, bis die
Umgebung endet. Prüfen, ob er läuft: `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8092/`.

## 2. Reihenfolge der Tests
1. `node scripts/seiten_test.js --basis http://127.0.0.1:8092 --seiten "/,/kasse,/danke?nr=XX-...,/widerrufen,/impressum,/datenschutz,/agb,/widerrufsbelehrung,/versand-und-zahlung,/newsletter-bestaetigt" --korb '<name>-korb={"einzeln":1,"set":0}' --aus <scratchpad>`
   Alle Seiten auf PC, Handy und Tablet: Status 200, kein seitliches Überlaufen, genau eine h1, keine Konsolenfehler.
2. `bash scripts/sicherheit_test.sh http://127.0.0.1:8092 <scratchpad>`
   Fremde Herkunft (403), Honeypot (200 ohne Mail), Zeilenumbruch in Mailadresse (422), eingeschleuste Kopfzeile,
   gefälschter Preis (Server rechnet selbst), leere Bestellung (422), Ratenbegrenzung (429).
3. `node scripts/kaufweg_test.js --basis ... --code <GUTSCHEIN> --korb <name>-korb --zahlart PayPal --nr XX-... --aus <scratchpad>`
   Angebot, Warenkorb, Kasse mit Fehlern, Gutschein, Bestellung, Danke, Widerruf, Newsletter.
4. Eigene kleine Tests für die produktabhängigen Teile (3D-Modell drehen, Erlebnis-Abschnitt, persönliche Einstellung,
   Bewertungen filtern und schreiben). Vorlage: wie `kaufweg_test.js` aufgebaut.
5. Bildschirmfotos ansehen (Read-Werkzeug auf die PNG-Dateien): Kopfbereich PC und Handy, jeder Abschnitt einmal,
   Warenkorb, Kasse, Danke. Viele Fehler (überlappende Schrift, schiefe 3D-Flächen, unlesbarer Kontrast) sieht man nur hier.

## 3. Stolperfallen, die uns schon Zeit gekostet haben
- Der PHP-Testserver braucht `-t <ordner>`, sonst liefert er für Dateien in `assets/` 404 (ist im Startskript drin).
- Prozesse nie mit `pkill -f <muster>` beenden: Das Muster passt auch auf die eigene Shell, die dann mit Code 144 stirbt.
  Laufenden Server einfach weiterverwenden oder einen anderen Port nehmen.
- In Playwright beim Scrollen `behavior:'instant'` verwenden, sonst misst der Test mitten in weichem Scrollen.
- Versteckte Radio-Knöpfe (eigene Optik) über ihr `label` anklicken, nicht über das `input`.
- Ein Klick auf einen deaktivierten Knopf wartet in Playwright 30 s. Vorher `disabled` abfragen.
- Viele Testläufe hintereinander lösen die Ratenbegrenzung aus (429). Das ist richtig so. Für Tests den Ordner
  `<php-temp>/shop-bremse` löschen (macht `sicherheit_test.sh`).
- Heredocs in der Shell mit `<<'EOF'` (in Anführungszeichen) schreiben, sonst werden `$(...)` und Backticks ausgeführt.
- Der Test-Browser hat keine Grafikkarte: ruckelige Animationen dort sind kein Beweis. Bei Zweifel auf echtem Gerät prüfen lassen.
- Zeitabhängiges (Begrüßung, Einführungspreis) hängt von der Uhrzeit des Testlaufs ab. Mit `page.clock` oder durch
  Ausgabe des Werts prüfen, nicht fest erwarten.

## 4. CHECK (fünf Punkte)
1. `python3 scripts/text_check.py <shop-ordner>`: Floskeln, Gedankenstriche, Titel, Beschreibung, Canonical, OG, Favicon,
   eine h1, Links, Sprungmarken, externe oder verbotene Schriften, Alt-Texte, Bildgrößen, Kaufknöpfe, send.php-Grundschutz.
2. Selbst lesen: Klingt ein Text nach Werbung statt nach Mensch? Konkreter und einfacher schreiben.
3. Bilder: Alt-Texte beschreiben das Sichtbare, Vorschaubild (og-image) zeigt den aktuellen Stand und kein Fremdbild.
4. Ansicht: Bildschirmfotos Handy und PC. Wirkt ein Abschnitt leer, genau ein feines Detail ergänzen.
5. `send.php` lesen: alle Felder, die in Kopfzeilen gehen, durch `kopfzeile_bereinigen` bzw. `mailadresse`? Honeypot,
   Ratenbegrenzung, Herkunftsprüfung, Preis vom Server? Dazu `sicherheit_test.sh`.
Danach zwei bis drei Sätze an den Nutzer, was geändert wurde, und die Ergebnisse als kurze Liste mit ✔.

## 5. Vorschau
```bash
python3 scripts/vorschau_bauen.py <shop-ordner> <scratchpad>/vorschau.html "<Name> Shop"
```
Dann die Datei mit Playwright öffnen (`file://`), auf Konsolenfehler und Umschalten der Ansichten (#kasse) prüfen, und mit dem
Artifact-Werkzeug veröffentlichen (vorher den Skill artifact-design laden, falls verlangt). Spätere Versionen mit demselben
Dateipfad veröffentlichen, dann bleibt der Link gleich. Die Vorschau sendet keine Formulare; das im Chat sagen.
Wenn `script.js` auf Elemente zugreift, die es nur auf einer Unterseite gibt, und dabei auf der Startseite abbricht: Zugriff mit
`if (el)` absichern. In der Vorschau liegen alle Ansichten in einer Seite.
