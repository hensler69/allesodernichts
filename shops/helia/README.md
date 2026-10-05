# HELIA (Shop-Entwurf)

Entwurf eines Ein-Produkt-Shops für den Lichtwecker "HELIA". Alle Firmen-, Hersteller- und Technikangaben sind erfunden.
Das Produktfoto (assets/img/produkt-entwurf.jpg) stammt von Amazon und darf auf einer echten Seite nicht verwendet werden.
Vor echter Nutzung den Namen "HELIA" markenrechtlich prüfen lassen (DPMA, EUIPO).

- Seiten: index, kasse, danke, widerrufen, impressum, datenschutz, agb, widerrufsbelehrung, versand-und-zahlung, newsletter-bestaetigt
- send.php: Bestellung, Newsletter (mit Bestätigungsmail) und Online-Widerruf. Preise rechnet der Server neu.
- Vor einer Veröffentlichung: Konstanten oben in send.php anpassen (SHOP_MAIL, GEHEIMNIS), echte Angaben eintragen, Rechtstexte prüfen lassen, robots.txt und noindex entfernen.
- Der Ordner ist in der .htaccess der Wurzel gesperrt (RedirectMatch auf /shops), damit er nicht versehentlich online geht.
- Bild-Prompts: bild-prompts.txt
