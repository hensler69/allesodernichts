# HELIA (Shop-Entwurf)

Entwurf eines Ein-Produkt-Shops für den Lichtwecker "HELIA". Alle Firmen-, Hersteller- und Technikangaben sind erfunden.
Das Produktfoto (assets/img/produkt-entwurf.jpg) stammt von Amazon und darf auf einer echten Seite nicht verwendet werden.
Vor echter Nutzung den Namen "HELIA" markenrechtlich prüfen lassen (DPMA, EUIPO).

- Seiten: index, kasse, danke, widerrufen, impressum, datenschutz, agb, widerrufsbelehrung, versand-und-zahlung, newsletter-bestaetigt
- send.php: Bestellung, Newsletter (mit Bestätigungsmail) und Online-Widerruf. Preise rechnet der Server neu.
- Vor einer Veröffentlichung: Konstanten oben in send.php anpassen (SHOP_MAIL, GEHEIMNIS), echte Angaben eintragen, Rechtstexte prüfen lassen, robots.txt und noindex entfernen.
- Der Shop ist ein Entwurf: noindex auf allen Seiten und robots.txt mit Disallow. Eine Sperre in einer übergeordneten .htaccess gibt es nicht mehr.
- Bild-Prompts: bild-prompts.txt

## Bewertungen
- Die Bewertungen stehen in index.html im Block `<script type="application/json" id="bewertungen-daten">`.
- Die enthaltenen Bewertungen sind ERFUNDENE BEISPIELE (`"beispiel": true`) und müssen vor dem Start gelöscht werden.
  Erfundene Bewertungen als echt auszugeben ist verboten (UWG, Anhang Nr. 23b und 23c).
- Neue Bewertungen kommen über das Formular per E-Mail an. Erst nach Prüfung der Bestellnummer eintragen, mit `"beispiel": false`
  (dann erscheint "Geprüfter Kauf"). Gute und schlechte Bewertungen gleich behandeln, Texte nicht ändern.
