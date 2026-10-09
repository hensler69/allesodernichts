# HORTA (Shop-Entwurf)

Entwurf im Neo-Brutalism-Look (dicke Konturen, harte Schatten, flache Farben) eines Ein-Produkt-Shops für den elektrischen Gemüseschneider "HORTA" (Lieferant: AliExpress, Versand direkt aus China).
Alle Firmen-, Hersteller- und Technikangaben sowie alle Bewertungen sind erfunden.
Das Produktfoto (assets/img/produkt-entwurf.jpg) stammt vom Lieferanten und darf nur mit schriftlicher Freigabe verwendet werden.
Vor echter Nutzung den Namen "HORTA" markenrechtlich prüfen lassen (DPMA, EUIPO).

- Seiten: index, kasse, danke, widerrufen, impressum, datenschutz, agb, widerrufsbelehrung, versand-und-zahlung, newsletter-bestaetigt
- send.php: Bestellung, Newsletter (mit Bestätigungsmail), Bewertung und Online-Widerruf. Preise rechnet der Server neu.
- Vor einer Veröffentlichung: Konstanten oben in send.php anpassen (SHOP_MAIL, GEHEIMNIS), echte Angaben eintragen, Rechtstexte prüfen lassen, robots.txt und noindex entfernen.
- Die HTML-Seiten werden von Python-Generatoren erzeugt (Ordner generatoren/horta im Projekt). Änderungen dort machen, nicht in den HTML-Dateien.
- Bild-Prompts: bild-prompts.txt
- Schriften (selbst gehostet, OFL): Archivo Black, Archivo, Space Mono in assets/fonts/

## Speicher im Browser
horta-korb (Warenkorb), horta-schuessel (Salat aus dem Probierstand), horta-hilfreich ("Hilfreich"-Markierungen). Alle in der Datenschutzerklärung genannt.

## Bewertungen
- Die Bewertungen stehen in index.html im Block `<script type="application/json" id="bewertungen-daten">` (Quelle: build_index.py, Liste R).
- Die enthaltenen 36 Bewertungen sind ERFUNDENE BEISPIELE (`"beispiel": true`) und müssen vor dem Start gelöscht werden.
  Erfundene Bewertungen als echt auszugeben ist verboten (UWG, Anhang Nr. 23b und 23c).
- Neue Bewertungen kommen über das Formular per E-Mail an. Erst nach Prüfung der Bestellnummer eintragen, mit `"beispiel": false`
  (dann erscheint "Geprüfter Kauf"). Gute und schlechte Bewertungen gleich behandeln, Texte nicht ändern.
