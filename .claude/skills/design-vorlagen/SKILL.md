---
name: design-vorlagen
description: Sammelt alle Design-Vorlagen dieses Projekts an einem Ort (Glas im Apple-Stil dunkel, Neo-Brutalism hell, KI-Vorlagen-Look als Gegenbeispiel) und legt fest, mit welchen Skills jedes Layout überarbeitet wird. Verwenden, wenn jemand einen Look wählen, wechseln oder neu anwenden will ("mach es neo-brutalistisch", "wie bei HELIA", "anderer Stil", "Layout überarbeiten", "Design-Vorlage", "Look umstellen"), wenn ein neuer Shop einen Look braucht, wenn ein Design-Entwurf als Artifact entstehen soll, oder wenn bestehende Seiten (shops/helia, shops/horta) im Stil geändert werden. Ergänzt den Skill ein-produkt-shop um die Wahl des Looks.
---

# Design-Vorlagen

Dieser Skill vereint alle Looks, die in diesem Projekt gebaut und getestet wurden, und die Skills, mit denen jedes Layout
überarbeitet wird. Er ersetzt nicht `ein-produkt-shop` (Ablauf, Recht, Technik), sondern kommt dort in Phase 5 und 6 dazu:
erst den Look wählen, dann bauen, dann mit dem Skill-Verbund überarbeiten.

## Wie du mit dem Nutzer sprichst
Der Nutzer heißt Manuel und ist kein Programmierer. Einfaches Deutsch, Fachbegriffe im selben Satz erklären, jede Antwort mit
"Manuel" beginnen. Er sieht nur den Chat: Bildschirmfotos und Links zeigen, nicht Pfade nennen.

## Die Vorlagen

| Look | Stimmung | Gebaut in | Dateien in diesem Skill |
| --- | --- | --- | --- |
| Glas (Apple-Stil, dunkel) | ruhig, hochwertig, nachts, Produkt als leuchtende Bühne | `shops/helia/` | `vorlagen/glas-apple/` |
| Neo-Brutalism (hell, flach) | laut, frisch, handfest, Küche und Alltag | `shops/horta/` | `vorlagen/neo-brutalism/` |
| KI-Vorlagen-Look | Gegenbeispiel mit allen bekannten Klischees | nur als Entwurf (Artifact) | `vorlagen/ki-vorlage/` |

Jede Vorlage hat eine eigene Datei mit Merkmalen, Farben, Schriften, Stolperfallen und dem Weg, sie anzuwenden:
- `references/look-glas-apple.md`
- `references/look-neo-brutalism.md`
- `references/look-ki-vorlage.md`

## Ablauf

1. **Look wählen.** Weiß der Nutzer es nicht, per Auswahl-Widget fragen (Empfehlung zuerst, mit "(Empfohlen)"):
   - dunkel und ruhig, Produkt leuchtet (Licht, Schlaf, Technik, Audio) → Glas
   - hell und laut, Alltag und Essen, Spaß am Produkt → Neo-Brutalism
   - Nur ein Entwurf zum Zeigen oder als Gegenbeispiel → KI-Vorlagen-Look (nie für einen echten Shop empfehlen)
2. **Vorlage laden.**
   - Neuer Shop: `ein-produkt-shop` Phase 5, danach `style.css` der gewählten Vorlage als Startpunkt nehmen
     (`vorlagen/<look>/shop/style.css`). Farben nur in `:root` ändern, die Rollen beibehalten.
   - Bestehender Shop soll den Look wechseln: `references/umstellen.md` (welche Stellen in den Generatoren und im CSS
     angepasst werden, in welcher Reihenfolge).
   - Design-Entwurf als Artifact: Skill der Design-Fläche verwenden, Quelltexte aus `vorlagen/<look>/entwurf/` als Ausgang.
3. **Skills des Verbunds anwenden** (`references/verbund.md`). Jedes Layout durchläuft dieselben Durchgänge, in dieser
   Reihenfolge, und danach noch einmal der CHECK aus `ein-produkt-shop`.
4. **Testen.** Seiten auf PC, Handy und Tablet (Bildschirmfotos ansehen), Kaufweg, Sicherheit, `text_check.py`, Lighthouse.
   Überlauf nach rechts auf dem Tablet ist der häufigste Fehler nach einem Look-Wechsel (Kopfzeile prüfen).
5. **Vorschau und Notiz.** Vorschau neu bauen und gleich dieselbe Datei erneut veröffentlichen, damit der Link bleibt.
   Notiz in `notes/`, Entscheidung in `CLAUDE.md`.

## Regeln, die für jeden Look gelten
- Die Grundregeln des Nutzers aus `ein-produkt-shop/references/grundregeln.md` gelten unverändert: Schriften selbst hosten
  (woff2 und Lizenztext), keine Gedankenstriche, keine Floskeln aus der Verbotsliste, genau eine Handlungsaufforderung,
  kein Menüpunkt "Startseite", Handy als eigener Entwurf, Personen nur gezeichnet.
- Ein Look ist eine Haut: Aufbau, Texte, Rechtsseiten, JavaScript-Haken (`data-…`, Klassen wie `.zeigen`, `.knopf`) bleiben gleich.
  Wer den Look wechselt, ändert CSS, Farben, Schriften, Logo, Favicon, Vorschaubild und die wenigen Stellen in den Generatoren.
- Der KI-Vorlagen-Look ist das Gegenteil dieser Regeln (Floskeln, ungleiche Abstände, Klischee-Verläufe). Er darf nur auf
  ausdrücklichen Wunsch als Entwurf entstehen, bleibt außerhalb von `shops/`, und seine Floskeln kommen nie in einen echten Shop.
- Farbe hat eine Rolle: Die Signalfarbe steht nur für Kauf und Auswahl. Kontrast mindestens 4,5 zu 1 für Text.
- Bewegung nach `ein-produkt-shop/references/bewegung.md`, mit `prefers-reduced-motion`.

## Dateien
- `vorlagen/glas-apple/shop/style.css`, `vorlagen/neo-brutalism/shop/style.css`: fertige, getestete Stylesheets
- `vorlagen/neo-brutalism/entwurf/*.dc.html`, `vorlagen/ki-vorlage/entwurf/*.dc.html`: Quelltexte der Entwürfe für die Design-Fläche
- `references/umstellen.md`: einen bestehenden Shop in einen anderen Look bringen
- `references/verbund.md`: die Skills, mit denen jedes Layout überarbeitet wird, und der offene Platz für weitere
