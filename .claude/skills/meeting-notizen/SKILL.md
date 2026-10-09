---
name: meeting-notizen
description: Verwandelt ein rohes Meeting-Transkript in Meeting-Notizen mit Entscheidungen, Aufgaben und offenen Punkten, als HTML-Seite zum Ansehen und als Markdown zum Weiterarbeiten. Aktivieren bei "Meeting-Notizen", "Meeting Notes", "Protokoll aus dem Transkript", "was wurde besprochen", "Action Items aus dem Meeting", oder wenn ein Transkript eingefügt oder ein Ordner mit Transkripten angegeben wird. Wird ein Ordner statt eines Transkripts angegeben, vor dem Lesen fragen, ob ein lokales Modell die personenbezogenen Daten entfernen soll.
---

# Meeting-Notizen

Aus einem Transkript werden Notizen, die man nach dem Meeting direkt weiterverwenden kann: eine Seite zum Ansehen, eine Markdown-Datei zum Weiterarbeiten.

## Schritt 1: Eingang prüfen

**Transkript direkt im Chat oder als einzelne Datei:** sofort weiter zu Schritt 2.

**Ordner angegeben:** Vor dem Lesen genau eine Rückfrage stellen, wörtlich:

> Soll ich vorher ein lokales Modell über das Transkript laufen lassen, das personenbezogene Daten (Namen, E-Mails, Telefonnummern, Adressen) entfernt, bevor ich es lese? Das dauert etwa eine Minute. (ja / nein)

Bei "ja": `python3 scripts/anonymisieren.py <ordner-oder-datei>` ausführen. Das Skript nutzt Ollama auf dem Rechner, ersetzt Personen durch "Person A", "Person B" und legt neben dem Original eine Datei `*_anonym.txt` sowie `zuordnung.json` ab. Danach nur die anonymisierte Datei lesen, nie das Original. Die Platzhalter in der Auswertung beibehalten; beim Rendern setzt `render.py` die echten Namen aus `zuordnung.json` lokal wieder ein, sodass die fertigen Notizen die richtigen Namen tragen, ohne dass sie das Modell in der Cloud je gesehen hat.

Bei "nein": Original lesen.

**Wo die Anonymisierung läuft:** Das Skript braucht Ollama auf dem Rechner des Nutzers. In Claude Code und Codex läuft es direkt. Claude Cowork arbeitet in einer eigenen, abgeschotteten Umgebung ohne Zugriff auf Ollama; dort die Rückfrage trotzdem stellen und bei "ja" erklären, dass die Anonymisierung nur in Claude Code funktioniert, dann mit dem Original weiterarbeiten oder abbrechen, wie der Nutzer will.

## Schritt 2: Transkript auswerten

Aus dem Transkript ziehen, nichts erfinden:

- **Kopf:** Titel, Datum, Dauer, Teilnehmer (so, wie sie im Transkript stehen).
- **Ein Satz:** Worum ging es und was ist das Ergebnis (nur für die Chat-Meldung, erscheint nicht auf der Seite).
- **Themen:** drei bis sieben Themen in der Reihenfolge des Gesprächs, je zwei bis vier Sätze, was gesagt und was geklärt wurde.
- **Entscheidungen:** nur, was ausdrücklich beschlossen wurde. Eine Absicht ("sollte man mal") ist keine Entscheidung.
- **Aufgaben:** was, wer, bis wann. Wer und bis wann nur eintragen, wenn es im Transkript steht, sonst "offen". Jede Aufgabe beginnt mit einem Verb.
- **Offene Punkte:** Fragen, die gestellt, aber nicht beantwortet wurden.
- **Zitate:** höchstens drei kurze Sätze, die eine Entscheidung oder Haltung belegen, mit Sprecher.

## Schritt 3: Seite bauen

Die Auswertung als `notizen.json` nach dem Schema in `scripts/render.py` speichern und rendern:

```
python3 scripts/render.py <ordner>/notizen.json
```

Das erzeugt `notizen.html` (Seite zum Ansehen) und `notizen.md` (zum Weiterarbeiten) im selben Ordner. Reihenfolge auf der Seite: Entscheidungen, Aufgaben als Tabelle zum Abhaken, Offene Punkte, Themen, Zitate. Liegt eine `zuordnung.json` im Ordner, werden die Platzhalter automatisch durch die echten Namen ersetzt (`--ohne-namen` unterdrückt das). Ordner: der Ordner des Transkripts; bei eingefügtem Text `Meeting-Notizen/YYYY-MM-DD-<kurztitel>/`.

## Schritt 4: Im Chat melden

Nur ausgeben: der eine Satz, die Aufgabenliste (was, wer, bis wann) und die Pfade der beiden Dateien. Die HTML-Datei zusätzlich mit dem Datei-Werkzeug zeigen, falls verfügbar.

## Regeln

- Nichts erfinden. Steht ein Verantwortlicher oder Termin nicht im Transkript, bleibt das Feld "offen".
- Sprecherbezeichnungen aus dem Transkript übernehmen ("Speaker 2" bleibt "Speaker 2", außer der Name fällt im Gespräch eindeutig).
- Keine Bewertung der Teilnehmer, keine Stimmungsbeschreibung, nur Inhalt.
- Sprache des Transkripts beibehalten, Fülllaute und Wiederholungen weglassen.
- Bei anonymisierten Transkripten in `notizen.json` die Platzhalter beibehalten und nicht versuchen, Personen zu erraten. Die Rückübersetzung übernimmt das Skript.
