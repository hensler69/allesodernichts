---
name: tiefenrecherche
description: Gründliche Recherche zu einem Thema direkt im Chat, in festen Absätzen, jede Zahl mit Link am Satz. Aktivieren bei "recherchiere", "recherchiere gründlich", "Deep Dive", "arbeite dich ein", "untersuche", "Recherche-Auftrag", "was wissen wir über". Nicht aktivieren, wenn "kurz", "schnell" oder "nur kurz" in der Anfrage steht, auch nicht bei "recherchiere kurz", dafür gibt es den Skill kurz-nachschlagen.
---

# Tiefenrecherche

Der Leser soll das Thema so weit verstehen, dass er selbst entscheiden kann. Dafür bekommt er zuerst die Antwort, dann die Regeln und Zahlen dahinter, dann die Umsetzung, dann die Fallen, und am Ende seine Weiche. Alles im Chat, bis 1.000 Wörter. Keine Datei, außer der Nutzer bittet darum.

## Vorgehen

1. **Höchstens eine Rückfrage**, und nur, wenn die Antwort ohne diese Information wertlos wäre. Mit Vorschlag stellen, damit "ja" reicht. Sonst die wahrscheinlichste Situation annehmen und in der ersten Zeile nennen.
2. **Eigene Unterlagen zuerst.** Projektordner und, falls vorhanden, Wissensordner des Nutzers durchsuchen. Treffer mit Dateipfad verlinken, sie haben Vorrang vor dem Web.
3. **Quellen nach Rangfolge, nicht nach Anzahl.** Jede Regel und jede Zahl kommt aus der besten verfügbaren Stufe:
   1. Gesetzestext, Behörde, Ministerium, amtliche Statistik
   2. Hersteller- oder Anbieterseite, für Preise und Funktionen
   3. Originalstudie, Fachpresse, Kammern und Verbände
   4. Blogs, Berater-Seiten, Foren: nur, wenn nichts Besseres existiert, und dann mit "Anbieter" oder "Blog" im Link-Text
   Jede Quelle im Original öffnen und die Aussage dort prüfen, nie aus Suchauszügen zitieren. Nicht erreichbare Seiten unter OFFEN nennen. Deutsch und englisch suchen. Bei Preisen, Fristen und Produktstatus nur Quellen aus den letzten zwölf Monaten, ältere ausdrücklich mit Jahr.
4. **Antwort schreiben**, immer in dieser Form.

## Form

```
**[Die Antwort in einer Zeile. Gibt es eine Weiche, ist die Zeile die Weiche: "Unter 800.000 Euro Umsatz: Pflicht ab 2028. Darüber: ab 2027." Gibt es keine, ist die Zeile die Empfehlung oder der Satz, der es erklärt.]**
Für: [wen, welche Situation] · Stand [Monat Jahr]

REGELN
[Was gilt: Pflichten, Voraussetzungen, Zuständigkeiten, Funktionen. Wer es festlegt und seit wann. Vier bis acht Sätze, jeder mit Link am Satz. Keine Beträge und keine Fristen, die stehen unter ZAHLEN.]

ZAHLEN
[Beträge, Fristen, Grenzen, Mengen. Ein Satz pro Zahl, mit Link und Stand. Alles, was der Leser in eine Kalkulation oder einen Kalender überträgt.]

PRAXIS
[Wie es im Alltag umgesetzt wird: Schritte, Werkzeuge, Aufwand, wer es im Betrieb macht. Drei bis sechs Sätze mit Link, wo eine Quelle das belegt.]

FALLEN
[Ausnahmen, typische Fehler, und Stellen, an denen Quellen uneins sind: Quelle A sagt X, Quelle B sagt Y, welche zählt und warum. Drei bis sechs Sätze.]

WEICHE
[Die Entscheidung als Bedingung: "Wenn A, dann X. Wenn B, dann Y." Je Ast eine Handlung mit Frist oder Betrag. Ohne Weiche: die eine Empfehlung mit Handlung. Drei bis sechs Sätze, keine Wiederholung von Fakten aus REGELN und ZAHLEN.]

OFFEN
[Was sich nicht belegen ließ, welche Seite nicht erreichbar war, welche Annahme der Leser selbst prüfen muss. Ein bis drei Sätze.]
```

## Regeln

- Absätze, keine Aufzählungen, keine Tabellen, keine Trennlinien, keine weiteren Überschriften. Die sechs Absatzwörter stehen immer, in dieser Reihenfolge. Gibt ein Absatz beim Thema nichts her, besteht er aus einem Satz, der das sagt.
- Jede Zahl trägt ihren Link, ohne Link keine Zahl. Das gilt ebenso für Fristen, Regeln und Produktmerkmale. Link-Text ist Herausgeber und Datum: ([Bundesfinanzministerium, März 2026](Link)), ([Microsoft-Preisseite, September 2026](Link)), ([Blog eines Softwareanbieters, 2025](Link)). Keine Quellenliste am Ende.
- Was keine Quelle hat, steht unter OFFEN als Vermutung oder gar nicht.
- Jede Information steht genau einmal, im Absatz, zu dem sie gehört. WEICHE nennt nur Handlungen, keine Fakten.
- Eigene Bewertungen nur unter FALLEN und WEICHE, eingeleitet mit "Einschätzung:".
- Bis 1.000 Wörter, kürzer, wenn das Thema es hergibt.
- Sprache wie im Gespräch mit einem Kollegen: "du", kurze Sätze, Fachbegriffe beim ersten Auftreten in einem Halbsatz erklärt, keine Werbesprache aus Quellen.
- Bei Rechts-, Steuer- oder Gesundheitsthemen als letzter Satz unter OFFEN: Das ersetzt keine Beratung durch Fachleute.
- Nur auf Wunsch als Datei speichern, dann unter `Rechercheberichte/YYYY-MM-DD-[thema-kurz].md`.
