# Projekt-Gedächtnis

Diese Datei wird von Claude Code bei jeder Session automatisch gelesen.
Hier steht, woran wir arbeiten und was entschieden wurde.

## Arbeitsweise
- Sprache: Deutsch
- Den Nutzer zu Beginn jeder Antwort mit "Manuel" ansprechen (Wunsch vom 05.10.2026, gilt für jeden Chat).
- Am Ende einer Session: Zusammenfassung in `notes/YYYY-MM-DD.md` ablegen
  und wichtige Entscheidungen und offene Punkte unten ergänzen.
- Vor dem Start: `notes/` auf aktuelle Einträge prüfen.
- Projektinhalt seit dem Aufräumen am 07.10.2026: HELIA-Shop, HORTA-Shop (seit 09.10.2026), Skill ein-produkt-shop, Claude-Code-Mods. Versicherungs-Website, Musterschutz, Dachdecker Wagler und Mein Fischer wurden entfernt (stehen noch in der Git-Versionsgeschichte).

## Entscheidungen
- E-Commerce-Entwurf HELIA (shops/helia/, früher DÄMMER): Ein-Produkt-Shop für einen Lichtwecker im Apple-Layout mit Glasflächen, alle Firmenangaben erfunden, Produktfoto von Amazon nur im Entwurf. Details in notes/2026-10-03.md und notes/2026-10-05.md.
- E-Commerce-Entwurf HORTA (shops/horta/, Generatoren in generatoren/horta/): Ein-Produkt-Shop für einen elektrischen Gemüseschneider von AliExpress, frische Marktküche auf hellem Grund, Versand aus China (8 bis 15 Werktage, Zoll inklusive), 44,90 € Einführungspreis bis 30.11.2026. Details in notes/2026-10-09.md.
- Szenen und Bilder verwenden nur selbst gezeichnete, erfundene Personen, keine echten Fotos.

- Skill `ein-produkt-shop` (.claude/skills/ein-produkt-shop/): kompletter Ablauf für neue Ein-Produkt-Shops mit HELIA als Referenz, für jeden neuen Shop verwenden. Details in notes/2026-10-07.md.
- Claude-Code-Mods (mods/, Katalog manuel-mods in .claude-plugin/marketplace.json): limit-cockpit, schutzschild, pruefer, spar-modus (Experiment, aus). Zeichnen nur lokal (Terminal/Desktop), nicht in Cloud-Sitzungen. Anleitung in mods/README.md.

## Offene Themen
- Mods auf dem eigenen Rechner installieren (mods/README.md) und dort die Darstellung prüfen.
- HORTA vor einem echten Start: Typenschild und Lebensmittel-Konformität prüfen, WEEE und LUCID, echte Firmendaten, Produktfoto oder Freigabe, Markenprüfung, Beispiel-Bewertungen löschen, GEHEIMNIS ersetzen, noindex entfernen (Liste in notes/2026-10-09.md).
- HELIA vor einem echten Start: echtes Produktfoto, echte Firmendaten, Zahlungsanbieter (PayPal, Klarna), Markenprüfung, Beispiel-Bewertungen löschen, GEHEIMNIS in send.php ersetzen, noindex entfernen.

## Laufende Themen
- HORTA-Shop (shops/horta/): fertig gebaut und getestet, Vorschau https://claude.ai/artifact/Jq3Aq2eh9gxzBJHUqqVW7D. 36 Bewertungen sind erfundene Beispiele.
- HELIA-Shop (shops/helia/): Glas-Layout mit 3D-Lampe, Bewertungsbereich, persönlicher Weckzeit und Gute-Nacht-Abschluss fertig getestet. Die Bewertungen sind erfundene Beispiele und müssen vor dem Start raus.
