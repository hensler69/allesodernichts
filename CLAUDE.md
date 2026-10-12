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
- E-Commerce-Entwurf HORTA (shops/horta/, Generatoren in generatoren/horta/): Ein-Produkt-Shop für einen elektrischen Gemüseschneider von AliExpress, seit 09.10.2026 im Look Neo-Brutalism (dicke Konturen, harte Schatten, flache Farben), vorher frische Marktküche mit Glas, Versand aus China (8 bis 15 Werktage, Zoll inklusive), 44,90 € Einführungspreis bis 30.11.2026. Tomatenrot seit 12.10.2026 nur noch für Kaufknopf und geöffnete Fragen (Regel des Looks, Manuels Entscheidung). Details in notes/2026-10-09.md und notes/2026-10-12.md.
- Szenen und Bilder verwenden nur selbst gezeichnete, erfundene Personen, keine echten Fotos.

- Skill `ein-produkt-shop` (.claude/skills/ein-produkt-shop/): kompletter Ablauf für neue Ein-Produkt-Shops mit HELIA als Referenz, für jeden neuen Shop verwenden. Details in notes/2026-10-07.md.
- Skill `design-vorlagen` (.claude/skills/design-vorlagen/): Sammel-Skill für 21 Looks (Glas dunkel, Neo-Brutalism, KI-Vorlage und 18 neue: Particles, Liquid Morph, Holographic, Neon Glow, Wireframe 3D, Glassmorphism, Kinetic Type, Isometric, Clay 3D, ASCII Art, Gradient Mesh, Comic Book, Split-Flap, Retro VHS, Halftone, Bauhaus, Pixel Art, Art Deco) mit Katalog, Vergleich, Pro/Contra, Vorlagen und Galerie-Skript. Jeder neue Look ist auch ein eigener Skill `look-<name>`. Für HORTA bewertet: Platz 1 Isometric, 2 Gradient Mesh, 3 Bauhaus. Vor jedem neuen Shop den Look damit wählen. Details in notes/2026-10-09.md und notes/2026-10-11.md.
- Skill-Verbund (festgelegt 09.10.2026, `design-vorlagen/references/verbund.md`): jedes Layout durchläuft gpt-taste, impeccable, emil-design-eng in dieser Reihenfolge. Grundregeln des Nutzers gehen vor.
- Claude-Code-Mods (mods/, Katalog manuel-mods in .claude-plugin/marketplace.json): limit-cockpit, schutzschild, pruefer, spar-modus (Experiment, aus). Zeichnen nur lokal (Terminal/Desktop), nicht in Cloud-Sitzungen. Anleitung in mods/README.md.

## Offene Themen
- Mods auf dem eigenen Rechner installieren (mods/README.md) und dort die Darstellung prüfen.
- HORTA vor einem echten Start: Typenschild und Lebensmittel-Konformität prüfen, WEEE und LUCID, echte Firmendaten, Produktfoto oder Freigabe, Markenprüfung, Beispiel-Bewertungen löschen, GEHEIMNIS ersetzen, noindex entfernen (Liste in notes/2026-10-09.md).
- HELIA vor einem echten Start: echtes Produktfoto, echte Firmendaten, Zahlungsanbieter (PayPal, Klarna), Markenprüfung, Beispiel-Bewertungen löschen, GEHEIMNIS in send.php ersetzen, noindex entfernen.
- Skill-Verbund ist auf die 18 neuen Looks und auf HELIA und HORTA angewendet (11.10.2026, kleine Form, Tabellen in notes/2026-10-11-verbund-horta.md und -helia.md). Zwei Vorschläge daraus hat Manuel am 12.10.2026 freigegeben und sind umgesetzt (HORTA Tomatenrot nur für Kaufen, HELIA Kontrast bei Phasenliste und Überschriften, notes/2026-10-12.md). Weitere Vorschläge stehen unentschieden in den beiden Verbund-Notizen (zum Beispiel Kaufknopf im HORTA-Abschlussblock, Ersatzschrift für HELIA).
- Design-Galerie: privater Artifact-Link https://claude.ai/artifact/J1RnqQL5SU2684zK8vEiEj (Skript `design-vorlagen/scripts/galerie_bauen.py`, neu bauen und erneut veröffentlichen, wenn sich Looks ändern). Pushen nur mit OK von Manuel.
- Verbrauch: Aufträge mit vielen Sub-Agenten verbrauchen sehr viel und lösen Limits aus. Vorher warnen, in kleinen Wellen arbeiten (Notiz vom 11.10.2026).

## Laufende Themen
- HORTA-Shop (shops/horta/): im Neo-Brutalism-Look fertig gebaut und getestet (Lighthouse 95/100/100 nach dem Verbund-Durchgang vom 11.10.2026), Vorschau https://claude.ai/artifact/Jq3Aq2eh9gxzBJHUqqVW7D (Version 3, zeigt noch die Fassung vor der Tomatenrot-Änderung vom 12.10.2026, neu veröffentlichen nur mit OK von Manuel). 36 Bewertungen sind erfundene Beispiele. Entwurf im KI-Vorlagen-Look: https://claude.ai/artifact/SjdCxa1UFoJ47XBgj2X383.
- HELIA-Shop (shops/helia/): Glas-Layout mit 3D-Lampe, Bewertungsbereich, persönlicher Weckzeit und Gute-Nacht-Abschluss fertig getestet, seit 12.10.2026 mit besserem Kontrast in der Phasenliste und bei den Überschriften. Die Bewertungen sind erfundene Beispiele und müssen vor dem Start raus.
