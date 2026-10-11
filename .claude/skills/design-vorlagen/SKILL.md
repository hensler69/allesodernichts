---
name: design-vorlagen
description: Sammel-Skill für alle 21 Design-Looks mit Katalog, Vergleichsregeln, Pro und Contra und Vorlagen: Glas im Apple-Stil, Neo-Brutalism, KI-Vorlagen-Look (Gegenbeispiel), Neon Glow, Liquid Morph, Wireframe 3D, Holographic, Glassmorphism, Isometric, Clay 3D, ASCII Art, Kinetic Type, Particles, Gradient Mesh, Retro VHS, Split-Flap, Comic Book, Bauhaus, Halftone, Pixel Art, Art Deco. Verwenden bei Look wählen, wechseln, vergleichen, "welcher Look passt", Pro und Contra, passende Vorlage erstellen, Design-Galerie, Layout überarbeiten, "anderer Stil", "Look umstellen", "mach es neo-brutalistisch", "wie bei HELIA", Design-Vorlage, Design-Entwurf, wenn ein neuer Shop einen Look braucht oder shops/helia und shops/horta im Stil geändert werden. Enthält den Skill-Verbund gpt-taste, impeccable, emil-design-eng. Ergänzt ein-produkt-shop.
---

# Design-Vorlagen

Dieser Skill vereint alle 21 Looks, die in diesem Projekt gebaut und getestet wurden, hilft beim Vergleichen und Wählen und hält die Skills fest,
mit denen jedes Layout überarbeitet wird (der Skill-Verbund gpt-taste, impeccable, emil-design-eng). Er ersetzt nicht `ein-produkt-shop` (Ablauf, Recht, Technik),
sondern kommt dort in Phase 5 und 6 dazu: erst den Look wählen, dann bauen, dann mit dem Skill-Verbund überarbeiten.

## Wie du mit dem Nutzer sprichst
Der Nutzer heißt Manuel und ist kein Programmierer. Einfaches Deutsch, Fachbegriffe im selben Satz erklären, jede Antwort mit
"Manuel" beginnen. Er sieht nur den Chat: Bildschirmfotos und Links zeigen, nicht Pfade nennen.

## Die Looks

Alle Pfade beziehen sich auf den Ordner dieses Skills. Zu jedem Look gibt es eine Detail-Datei `references/look-<name>.md` mit Merkmalen, Farben, Schriften,
Pro, Contra, Eignung, Stolperfallen und dem Weg, ihn anzuwenden. Die 18 neueren Looks haben außerdem einen eigenen Einzel-Skill `look-<name>`
(`.claude/skills/look-<name>/`), der die Quelle der Wahrheit ist. Die Detail-Dateien und `vorlagen/` sind Kopien davon (`scripts/abgleichen.py`).

| Look | Stimmung | Skill-Name | Vorlage-Pfad |
| --- | --- | --- | --- |
| Glas im Apple-Stil (dunkel) | ruhig, hochwertig, nächtlich | `design-vorlagen` (`references/look-glas-apple.md`) | `vorlagen/glas-apple/` (gebaut in `shops/helia/`) |
| Neo-Brutalism (hell, flach) | laut, frisch, handfest | `design-vorlagen` (`references/look-neo-brutalism.md`) | `vorlagen/neo-brutalism/` (gebaut in `shops/horta/`) |
| KI-Vorlagen-Look (Gegenbeispiel) | überladen, austauschbar, klischeehaft | `design-vorlagen` (`references/look-ki-vorlage.md`) | `vorlagen/ki-vorlage/` (nur Entwurf) |
| Art Deco | edel, festlich, geordnet | `look-art-deco` | `vorlagen/art-deco/` |
| ASCII Art | nerdig, technisch, reduziert | `look-ascii-art` | `vorlagen/ascii-art/` |
| Bauhaus | klar, grafisch, selbstbewusst | `look-bauhaus` | `vorlagen/bauhaus/` |
| Clay 3D | weich, verspielt, anfassbar | `look-clay-3d` | `vorlagen/clay-3d/` |
| Comic Book | laut, verspielt, erzählend | `look-comic-book` | `vorlagen/comic-book/` |
| Glassmorphism | frisch, hell, verspielt | `look-glassmorphism` | `vorlagen/glassmorphism/` |
| Gradient Mesh | freundlich, hell, ruhig | `look-gradient-mesh` | `vorlagen/gradient-mesh/` |
| Halftone | gedruckt, handgemacht, plakativ | `look-halftone` | `vorlagen/halftone/` |
| Holographic | schillernd, modern, glatt | `look-holographic` | `vorlagen/holographic/` |
| Isometric | freundlich, ordentlich, erklärend | `look-isometric` | `vorlagen/isometric/` |
| Kinetic Type | mutig, bewegt, schriftstark | `look-kinetic-type` | `vorlagen/kinetic-type/` |
| Liquid Morph | weich, warm, lebendig | `look-liquid-morph` | `vorlagen/liquid-morph/` |
| Neon Glow | nächtlich, leuchtend, auffällig | `look-neon-glow` | `vorlagen/neon-glow/` |
| Particles | technisch, vernetzt, lebendig | `look-particles` | `vorlagen/particles/` |
| Pixel Art | verspielt, nostalgisch, pixelig | `look-pixel-art` | `vorlagen/pixel-art/` |
| Retro VHS | nostalgisch, verspielt, plakativ | `look-retro-vhs` | `vorlagen/retro-vhs/` |
| Split-Flap | sachlich, technisch, markant | `look-split-flap` | `vorlagen/split-flap/` |
| Wireframe 3D | technisch, präzise, kühl | `look-wireframe-3d` | `vorlagen/wireframe-3d/` |

Jede neuere Vorlage ist eine lauffähige HORTA-Startseite: `demo.html`, `style.css`, `script.js` (manchmal Hilfsprogramme zum Erzeugen von Zeichnungen).
Die Tabelle mit Aufwand, Gewicht, Lighthouse-Werten und der größten Schwäche jedes Looks steht in `references/katalog.md`.
Die Rangfolge der 18 neueren Looks für den Gemüseschneider HORTA (Platz 1 Isometric 86, Platz 2 Gradient Mesh 81, Platz 3 Bauhaus 81) steht in `references/empfehlung-horta.md`.
Sie gilt nur für dieses Produkt.

## Ablauf

1. **Look wählen oder vergleichen.**
   - Nennt der Nutzer einen Look, geht sein Wunsch vor. Zeige trotzdem kurz Pro und Contra.
   - Weiß er es nicht oder will er vergleichen: `references/vergleich.md` (Fragen an den Nutzer, Bewertungsraster, feste Antwortvorlage mit Rangliste der besten drei,
     Pro und Contra und Empfehlung) zusammen mit `references/katalog.md` (Vorauswahl nach Produktart). Stelle die Fragen als Auswahlfragen (Empfehlung zuerst, mit "(Empfohlen)").
   - Schnellwahl nach Stimmung, wenn eine kurze Antwort reicht:
     dunkel und ruhig, Produkt leuchtet (Licht, Schlaf, Technik, Audio) → Glas im Apple-Stil;
     hell und laut, Alltag und Essen, Spaß am Produkt → Neo-Brutalism;
     hell, freundlich, ordentlich, ein Küchengerät → Isometric, Gradient Mesh oder Bauhaus;
     technisch und sachlich → Wireframe 3D, Split-Flap oder Particles;
     edel und festlich → Art Deco oder Holographic;
     nur ein Entwurf zum Zeigen oder als Gegenbeispiel → KI-Vorlagen-Look (nie für einen echten Shop empfehlen).
   - Soll ein Look entstehen, den es noch nicht gibt (oder eine Mischung): `references/neue-vorlage-erstellen.md`.
2. **Vorlage laden.**
   - Neuer Shop: `ein-produkt-shop` Phase 5, danach das Stylesheet der gewählten Vorlage als Startpunkt nehmen
     (`vorlagen/<look>/shop/style.css` bei Glas und Neo-Brutalism, `vorlagen/<look>/style.css` bei den 18 neueren Looks). Farben nur in `:root` ändern, die Rollen beibehalten.
     Pro Produkt muss die Hero-Zeichnung neu entstehen (Checkliste in `references/neue-vorlage-erstellen.md`).
   - Bestehender Shop soll den Look wechseln: `references/umstellen.md` (welche Stellen in den Generatoren und im CSS angepasst werden, in welcher Reihenfolge).
   - Design-Entwurf als Artifact: Skill der Design-Fläche verwenden, Quelltexte aus `vorlagen/<look>/entwurf/` (Neo-Brutalism, KI-Vorlage) oder die Demo der neueren Looks als Ausgang.
3. **Skills des Verbunds anwenden** (`references/verbund.md`): gpt-taste, impeccable, emil-design-eng. Jedes Layout durchläuft dieselben Durchgänge, in dieser
   Reihenfolge, mit Prüfung nach jedem, und danach noch einmal der CHECK aus `ein-produkt-shop`. Das Ergebnis ist eine Tabelle Vorher/Nachher.
4. **Testen.** Seiten auf PC, Handy und Tablet (Bildschirmfotos ansehen), Kaufweg, Sicherheit, `text_check.py`, Lighthouse.
   Für Demos und Entwürfe: `scripts/pruefen.js` (Bildschirmfotos und harte Prüfungen) und `scripts/messen.py` (Lighthouse).
   Überlauf nach rechts auf dem Tablet ist der häufigste Fehler nach einem Look-Wechsel (Kopfzeile prüfen).
5. **Vorschau und Notiz.** Vorschau neu bauen und gleich dieselbe Datei erneut veröffentlichen, damit der Link bleibt.
   Notiz in `notes/`, Entscheidung in `CLAUDE.md`.

## Galerie
`scripts/galerie_bauen.py`, falls vorhanden, baut eine Design-Galerie, in der Manuel alle Looks nebeneinander ansehen kann. Sie hilft beim Vergleichen. Ist das Skript nicht da, zeige Bildschirmfotos
der besten drei Looks (`scripts/pruefen.js` erzeugt sie).

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
- Weitere Regeln gegen Fehlentscheidungen (Zweifarbdruck bei Lebensmitteln, Pause-Knopf bei Dauerbewegung, heller Kontrast für Rechtstexte auf dunklen Looks,
  neue Hero-Zeichnung pro Produkt, Mischungen) stehen in `references/vergleich.md`.

## Dateien
- `references/katalog.md`: Tabelle aller 21 Looks (Stimmung, hell oder dunkel, passt zu, Aufwand, Gewicht, Lighthouse, größte Schwäche) und die Zuordnung nach Produktart
- `references/vergleich.md`: Fragen an den Nutzer, Bewertungsraster mit Gewichten und Formel, Antwortvorlage, Regeln gegen Fehlentscheidungen, Mischungen
- `references/empfehlung-horta.md` und `references/bewertung-horta.json`: vollständige Wertung der 18 neueren Looks für HORTA, Rohdaten zum Neurechnen
- `references/neue-vorlage-erstellen.md`: eine neue Vorlage oder einen neuen Look bauen, prüfen, als Einzel-Skill anlegen
- `references/look-bauen-brief.md`: der Rahmenauftrag, nach dem jeder Look gebaut wird (für Sub-Agenten)
- `references/look-<name>.md`: Detail-Datei je Look (21 Stück, die 18 neueren sind Kopien der Einzel-Skills)
- `references/umstellen.md`: einen bestehenden Shop in einen anderen Look bringen
- `references/verbund.md`: die Skills, mit denen jedes Layout überarbeitet wird (gpt-taste, impeccable, emil-design-eng)
- `vorlagen/glas-apple/shop/style.css`, `vorlagen/neo-brutalism/shop/style.css`: fertige, getestete Stylesheets
- `vorlagen/neo-brutalism/entwurf/*.dc.html`, `vorlagen/ki-vorlage/entwurf/*.dc.html`: Quelltexte der Entwürfe für die Design-Fläche
- `vorlagen/<name>/`: lauffähige HORTA-Startseite je neuerem Look (`demo.html`, `style.css`, `script.js`)
- `fonts/` und `fonts/README.md`: die 24 selbst gehosteten Schriftfamilien (woff2 und Lizenztext) mit Tabelle, welcher Look welche nutzt
- `scripts/pruefen.js`: Prüfskript mit Playwright (Bildschirmfotos PC, Tablet, Handy, harte Prüfungen). Aufruf: `NODE_PATH=/opt/node22/lib/node_modules node scripts/pruefen.js <slug-oder-URL>`
- `scripts/messen.py`: Lighthouse-Messung (mobil). Aufruf: `python3 scripts/messen.py <slug-oder-URL>`
- `scripts/abgleichen.py`: kopiert die Einzel-Skills `look-<name>` in diesen Sammel-Skill (`--pruefen` zeigt nur, was sich ändern würde)
- `scripts/galerie_bauen.py`, falls vorhanden: baut die Design-Galerie
