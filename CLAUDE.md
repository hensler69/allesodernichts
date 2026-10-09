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
- 2026-10-09: Die 21 selbst hinzugefügten Skills liegen als Projekt-Skills in
  `.claude/skills/` (damit sie in jeder Session mit diesem Repo verfügbar sind,
  auch ohne Cloud-Sync). Anthropic-eigene Skills (docx, pptx, xlsx, pdf, docs,
  skill-creator, google-workspace, morning, import-memory, setup-writing-style)
  wurden bewusst nicht kopiert.

## Offene Themen
<!-- Format: - [ ] Thema (seit YYYY-MM-DD) -->
- [ ] Skills in `.claude/skills/` sind eine Kopie: Änderungen in der Cloud
  werden nicht automatisch übernommen, bei Bedarf neu importieren (seit 2026-10-09)
- [ ] Repo ist öffentlich, damit sind auch die Fremd-Skills öffentlich
  sichtbar (seit 2026-10-09)

## Laufende Themen
<!-- Themen der letzten Tage, die du mir nennst, kommen hierher -->
