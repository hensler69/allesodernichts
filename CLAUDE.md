# Projekt-Gedächtnis

Diese Datei wird von Claude Code bei jeder Session automatisch gelesen.
Hier steht, woran wir arbeiten und was entschieden wurde.

## Arbeitsweise
- Sprache: Deutsch
- Den Nutzer zu Beginn jeder Antwort mit "Manuel" ansprechen (Wunsch vom 05.10.2026, gilt für jeden Chat).
- Am Ende einer Session: Zusammenfassung in `notes/YYYY-MM-DD.md` ablegen
  und wichtige Entscheidungen und offene Punkte unten ergänzen.
- Vor dem Start: `notes/` auf aktuelle Einträge prüfen.
- Projektinhalt seit dem Aufräumen am 07.10.2026: HELIA-Shop, HORTA-Shop (seit 09.10.2026), Skills ein-produkt-shop und design-vorlagen, Claude-Code-Mods. Versicherungs-Website, Musterschutz, Dachdecker Wagler und Mein Fischer wurden entfernt (stehen noch in der Git-Versionsgeschichte).

## Entscheidungen
- E-Commerce-Entwurf HELIA (shops/helia/, früher DÄMMER): Ein-Produkt-Shop für einen Lichtwecker im Apple-Layout mit Glasflächen, alle Firmenangaben erfunden, Produktfoto von Amazon nur im Entwurf. Details in notes/2026-10-03.md und notes/2026-10-05.md.
- E-Commerce-Entwurf HORTA (shops/horta/, Generatoren in generatoren/horta/): Ein-Produkt-Shop für einen elektrischen Gemüseschneider von AliExpress, seit 09.10.2026 im Look Neo-Brutalism (dicke Konturen, harte Schatten, flache Farben), vorher frische Marktküche mit Glas, Versand aus China (8 bis 15 Werktage, Zoll inklusive), 44,90 € Einführungspreis bis 30.11.2026. Details in notes/2026-10-09.md.
- Szenen und Bilder verwenden nur selbst gezeichnete, erfundene Personen, keine echten Fotos.

- Skill `ein-produkt-shop` (.claude/skills/ein-produkt-shop/): kompletter Ablauf für neue Ein-Produkt-Shops mit HELIA als Referenz, für jeden neuen Shop verwenden. Details in notes/2026-10-07.md.
- Skill `design-vorlagen` (.claude/skills/design-vorlagen/): vereint alle Looks (Glas dunkel wie HELIA, Neo-Brutalism hell wie HORTA, KI-Vorlagen-Look als Gegenbeispiel) mit Vorlagen, Anleitung zum Look-Wechsel und dem Platz für den Skill-Verbund. Vor jedem neuen Shop den Look damit wählen. Details in notes/2026-10-09.md.
- Claude-Code-Mods (mods/, Katalog manuel-mods in .claude-plugin/marketplace.json): limit-cockpit, schutzschild, pruefer, spar-modus (Experiment, aus). Zeichnen nur lokal (Terminal/Desktop), nicht in Cloud-Sitzungen. Anleitung in mods/README.md.

## Offene Themen
- Mods auf dem eigenen Rechner installieren (mods/README.md) und dort die Darstellung prüfen.
- HORTA vor einem echten Start: Typenschild und Lebensmittel-Konformität prüfen, WEEE und LUCID, echte Firmendaten, Produktfoto oder Freigabe, Markenprüfung, Beispiel-Bewertungen löschen, GEHEIMNIS ersetzen, noindex entfernen (Liste in notes/2026-10-09.md).
- HELIA vor einem echten Start: echtes Produktfoto, echte Firmendaten, Zahlungsanbieter (PayPal, Klarna), Markenprüfung, Beispiel-Bewertungen löschen, GEHEIMNIS in send.php ersetzen, noindex entfernen.
- Skill-Verbund: Manuel will jedes Layout (HELIA, HORTA, Vorlagen) mit drei Skills überarbeiten und sie in `design-vorlagen` bündeln. Seine Nachricht vom 09.10.2026 nannte keine Namen. Nachfragen, dann `references/verbund.md` füllen und alle Layouts durchgehen.

## Laufende Themen
- HORTA-Shop (shops/horta/): im Neo-Brutalism-Look fertig gebaut und getestet (Lighthouse 91/97/100), Vorschau https://claude.ai/artifact/Jq3Aq2eh9gxzBJHUqqVW7D. 36 Bewertungen sind erfundene Beispiele. Entwurf im KI-Vorlagen-Look: https://claude.ai/artifact/SjdCxa1UFoJ47XBgj2X383.
- HELIA-Shop (shops/helia/): Glas-Layout mit 3D-Lampe, Bewertungsbereich, persönlicher Weckzeit und Gute-Nacht-Abschluss fertig getestet. Die Bewertungen sind erfundene Beispiele und müssen vor dem Start raus.
