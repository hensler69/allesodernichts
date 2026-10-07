# Manuels Claude-Code-Mods

Vier Mods für Claude Code (getestet mit Version 2.1.292). Mods zeichnen nur im **Terminal** und im **Code-Tab der Desktop-App**
auf dem eigenen Rechner. In Cloud-Sitzungen (claude.ai/code, App) laden sie laut Dokumentation nicht über das Projekt
und zeichnen dort auch nichts.

| Mod | Was sie tut | Schalter |
| --- | --- | --- |
| limit-cockpit | Leiste über dem Eingabefeld: 5-Stunden-Limit, Rücksetzzeit, Kontext-Füllstand, Warnung ab 75 % Wochenlimit. Nach jeder Antwort die drei größten Token-Treiber (gemessen je Anfrage). Knopf „Neuer Chat mit Übergabe“ und `/handoff`. `/cockpit` zeigt alles als Text. | Plugin deaktivieren |
| schutzschild | Hält riskante Schritte an (Löschen, `git push --force`, `git reset --hard`, Datenbanken leeren, `.env` und Passwörter überschreiben, Dateien außerhalb des Projekts ändern), erklärt sie und fragt nach. Leiste mit Tageszähler. | `/schutzschild` (an/aus/status) |
| pruefer | „Fertig“ heißt erst fertig mit Beleg: geänderte Dateien und danach gelaufene Checks. Ohne Beleg höchstens zweimal zurück. Learnings pro Projekt in `.claude/pruefer-learnings.md`. Seitenpanel. Optionale Zweitprüfung durch ein zweites Modell (kostet zusätzlich). | `/pruefer` (an/aus/status/panel/zweit an/zweit aus) |
| spar-modus | **Experiment, standardmäßig aus.** Leichte Zwischenschritte nach reinem Lesen oder Suchen gehen an Haiku, alles andere bleibt beim großen Modell. Zähler neben dem Ladesymbol mit gemessenen Tokens, geschätzten API-Kosten und Mehrkosten. Zeigt nie eine Ersparnis, weil der Vergleich nicht messbar ist. | `/sparmodus` (an/aus/status) |

## Installieren (auf dem eigenen Rechner)

Vorher die Einstellungen sichern:

```bash
cp ~/.claude/settings.json ~/.claude/settings.backup-$(date +%F).json
```

Dann im Terminal:

```bash
claude plugin marketplace add hensler69/allesodernichts
claude plugin install limit-cockpit@manuel-mods
claude plugin install schutzschild@manuel-mods
claude plugin install pruefer@manuel-mods
claude plugin install spar-modus@manuel-mods
```

In einer schon offenen Sitzung danach `/reload-plugins` eingeben. Neue Sitzungen laden die Mods von selbst.
Ob sie geladen sind, zeigt `/plugin` (Zeile „mods active“).

## Abschalten

- Eine Mod vorübergehend: `/schutzschild aus`, `/pruefer aus`, `/sparmodus aus`.
- Eine Mod ganz: `claude plugin disable <name>@manuel-mods` oder in `/plugin` unter **Installed** deaktivieren.
- Entfernen: `claude plugin uninstall <name>@manuel-mods`.
- Alle Mods für eine Sitzung: Claude Code mit `--safe-mode` starten.

## Grenzen (ehrlich)

- **schutzschild** erkennt riskante Schritte über Textmuster. Es fängt typische Fälle, aber nicht jede Schreibweise
  (Skripte, Aliase, ungewöhnliche Befehle). Es ist kein vollständiger Schutz. Ohne Oberfläche (zum Beispiel `claude -p`)
  wird ein riskanter Schritt abgelehnt statt nachgefragt. Bestehende Berechtigungsregeln bleiben bestehen; die Mod erteilt nie selbst eine Erlaubnis.
- **pruefer** erkennt Checks an bekannten Befehlen (Tests, Builds, Typchecks, Linter, Aufrufe). Eigene Prüfskripte zählen,
  wenn ihr Name „test“ enthält. Ohne Oberfläche, bei Rückfragen und laufenden Hintergrundjobs hält er nie an.
- **limit-cockpit** zeigt Limits nur, wenn die API sie meldet (Abo). Tokens gibt es nur pro Modell-Anfrage, nicht pro Werkzeug;
  Werkzeug-Ausgaben stehen in Zeichen, die Token-Zahl daneben ist geschätzt. Ein neuer Chat lässt sich von einer Mod nicht öffnen:
  die Übergabe wird kopiert, dann neuen Chat öffnen und einfügen. `/handoff` kostet eine Modell-Anfrage.
- **spar-modus** kann teurer werden statt billiger: Haiku verarbeitet höchstens 200.000 Tokens Kontext, und jeder Modellwechsel
  schreibt den Cache neu. Kosten sind Listenpreis-Schätzungen (Stand 25.09.2026), keine Messung des Abo-Limits.

## Entwickeln

```bash
claude plugin validate mods/<name>
cd mods/<name> && claude plugin test
claude --plugin-dir mods/<name>
```
