# Rahmenauftrag: Look-Vorlage mit Demo-Seite und Skill (für jeden Look gleich)

Dies ist die portable Fassung des Briefs, nach dem die 18 Demo-Looks gebaut wurden (Stand 11.10.2026). Geändert wurden nur Pfade und Skripte.
So benutzt du ihn: Gib einem Sub-Agenten diesen Text und darunter den Auftragskopf mit den Angaben zum Look. Der Agent sieht den Chat nicht, dieser Brief plus der Kopf ist alles, was er braucht.
Die Arbeitsweise drumherum (parallel, zwei Nachbesserungsrunden) steht in `neue-vorlage-erstellen.md`.

```
AUFTRAGSKOPF (ausfüllen)
Look-Name: <z. B. Isometric>
Slug: <z. B. isometric>   (Ordner: .claude/skills/look-<slug>/)
Beschreibung des Looks: <Stimmung, Grundfarbe hell oder dunkel, Signalfarbe, Schriften, Besonderheit des Hero-Bildes, 3 bis 6 Sätze>
Produkt: HORTA (oder ein anderes, dann den Abschnitt TEXT ersetzen)
```

Du siehst den Chat nicht. Dieser Brief plus der Auftragskopf mit der Look-Beschreibung ist alles, was du brauchst.
Der Nutzer heißt Manuel, ist kein Programmierer, spricht Deutsch. Alle Texte auf Deutsch, einfache Sprache, Fachbegriffe im selben Satz erklären.

## Ziel
Für EINEN Look (Name steht im Auftrag) baust du:
1. eine getestete Demo-Seite der HORTA-Startseite in genau diesem Look: `.claude/skills/look-<slug>/vorlage/demo.html` + `style.css` (+ optional `script.js`)
2. den Skill `.claude/skills/look-<slug>/SKILL.md`
Damit prüfen wir, wie gut der Look zu einem echten Ein-Produkt-Shop passt, und der Skill hält das Wissen für später fest.
Projektwurzel: der Ordner, in dem `.claude/skills/` liegt. Arbeite NUR in `.claude/skills/look-<slug>/` und im Ordner für Bildschirmfotos (siehe unten).

## HARTE REGELN FÜR DICH
- Nichts löschen, nichts committen, nichts pushen, nichts veröffentlichen, kein Artifact-Werkzeug, keine Dateien anderer Looks anfassen.
- Alle Grafiken selbst gezeichnet (SVG, CSS, Canvas). Keine Fotos, keine echten Personen, keine Bild-Downloads, kein Netz zur Laufzeit.
- Schriften nur lokal: `@font-face` in style.css mit `url("../../design-vorlagen/fonts/<Datei>.woff2")`, `font-display: swap`. Die Dateien liegen schon dort (mach `ls` auf den Ordner, die Übersicht steht in `design-vorlagen/fonts/README.md`). Höchstens 2 Schriftfamilien, höchstens 4 Dateien. Kein `@import`, kein Google-Fonts-Link, keine CDN-Skripte.
- Reines HTML, CSS und Vanilla-JS. Keine Bibliotheken.

## TEXT (verbindlich, nicht umformulieren; kürzen nur, wenn der Look es braucht)
Produkt: HORTA, elektrischer Gemüseschneider HT-5. Ware aus China, Zoll inklusive.
- Logo-Link: `aria-label="HORTA, zur Startseite"`, Text/Zeichen HORTA
- Navigation (kein "Home"): Überblick, Funktionen, Ablauf, Bewertungen, Fragen. Rechts: Link "Warenkorb" mit Zähler 0 (das ist KEIN Kaufknopf)
- Eyebrow: Elektrischer Gemüseschneider
- H1: Weniger schnippeln. Mehr Salat.
- Untertitel: HORTA schneidet, raspelt und reibt auf Knopfdruck. Fünf Einsätze aus Edelstahl, ein breiter Schacht, und alles fällt direkt in Ihre Schüssel.
- Sterne: 4,6 von 5 · 36 Beispielbewertungen (Sterne als `role="img"` mit `aria-label="4,6 von 5 Sternen"`)
- Preis: 44,90 € | "Einführungspreis bis 30.11.2026, danach 54,90 €" | "inkl. 19 % MwSt., zzgl. 4,90 € Versand, Lieferzeit 8 bis 15 Werktage"
- Der EINE Kaufknopf (Klasse `cta`), Text exakt: In den Warenkorb
- Zahlenleiste (4 Kacheln): 5 | Einsätze aus Edelstahl · 800 W | laut Hersteller · 27 cm | Höhe, passt unter den Hängeschrank · 8 bis 15 | Werktage Lieferung, Zoll inklusive
- Funktionen (4 Karten, Titel + ein Satz): Schneiden: Gleichmäßige Scheiben, auch bei weichen Tomaten. / Raspeln: Karotten und Zucchini fein oder grob in Sekunden. / Reiben: Käse und Kohl fallen locker in die Schüssel. / Breiter Schacht: Ganze Gurken und Paprika passen ohne Vorschneiden hinein (Schacht 5 cm).
- Ablauf (3 Schritte): 1 Einsatz wählen: Kegel einsetzen, bis er einrastet. / 2 Gemüse einlegen: In den Schacht legen, Deckel zu. / 3 Knopf drücken: Alles fällt direkt in die Schüssel.
- Bewertungen (3 Karten, jede mit Marke "Beispiel"): "Endlich Salat ohne Schnippelei. Zehn Minuten sind jetzt zwei." Anna K., 5 Sterne / "Der breite Schacht ist wirklich praktisch. Zucchini ohne Vorschneiden." Jens M., 4 Sterne / "Reinigen geht schnell, die Einsätze sind stabil." Sabine R., 5 Sterne
- Hinweisblock "Lieferung aus China": "Dieses Produkt wird direkt aus China versendet. Lieferzeit 8 bis 15 Werktage, Zoll und Einfuhrsteuern sind im Preis enthalten, es kommen keine Zusatzkosten hinzu."
- Fußzeile: HORTA · Impressum · Datenschutz · AGB · Vertrag widerrufen · "Entwurf: Alle Angaben und Bewertungen sind erfunden."
- Verboten: Gedankenstriche (der lange und der mittellange Strich; nimm Punkt, Komma oder Doppelpunkt; ein normaler Bindestrich in Wörtern wie "Ein-Produkt" ist erlaubt), die Wörter der Verbotsliste in `ein-produkt-shop/references/grundregeln.md` (das Prüfskript kennt sie und meldet jeden Fund), erfundene Zahlen und Gesundheitsversprechen, Emojis als Symbole.

## SEITENAUFBAU (eine Seite, in dieser Reihenfolge)
Kopfzeile · Hero (Eyebrow, H1, Untertitel, Sterne, Preisblock, EIN Kaufknopf, großes Hero-Bild im Look-Stil, selbst gezeichnet, Gerät mit Kegel-Einsatz und Schüssel mit Gemüsestücken oder eine abstrakte Form dafür) · Zahlenleiste · Funktionen · Ablauf · Bewertungen · Hinweisblock China · Fußzeile.
Es gibt GENAU EINEN Kaufknopf auf der Seite. Kein zweiter Knopf mit "Warenkorb"-Text außer dem Navigationslink.
Eine Sektion hat eine Anker-ID passend zur Navigation (#ueberblick, #funktionen, #ablauf, #bewertungen, #fragen; "Fragen" darf auf den Hinweisblock zeigen, id="fragen").

## QUALITÄT (wird vom Prüfskript und von mir geprüft)
- `<html lang="de">`, viewport-Meta, Titel, sinnvolle Überschriftenreihenfolge, `:focus-visible` sichtbar, Kontrast Fließtext mindestens 4,5:1 (große Schrift 3:1), Touch-Ziele mindestens 44 px hoch.
- Kein waagerechter Überlauf bei 390, 820 und 1280 px Breite. Handy ist ein eigener Entwurf, nicht nur verkleinert (andere Anordnung, größere Ziele, Hero-Bild sinnvoll gekürzt).
- `prefers-reduced-motion: reduce`: keine Endlos-Animationen, keine rAF-Schleifen, kein Blinken, Seite sieht dann ruhig und vollständig aus (Standbild des Effekts). Nichts blinkt oder flackert mehr als 3 mal pro Sekunde.
- Leistung: alles außer Schriften höchstens 250 KB. JS-Animationen mit requestAnimationFrame, pausieren, wenn Tab verdeckt (document.hidden) oder Element außerhalb des Bildes (IntersectionObserver). Canvas: devicePixelRatio höchstens 2.
- Die Seite muss ohne JS lesbar bleiben (Texte stehen im HTML, JS ergänzt nur Effekte).
- Der Look muss erkennbar und mutig sein, aber der Text bleibt gut lesbar und der Kaufknopf bleibt das auffälligste Bedienelement.

## PRÜFEN (Pflicht, mehrmals)
Ein Testserver läuft auf http://localhost:8101 mit Wurzel `.claude/skills` (falls nicht: `cd .claude/skills && nohup python3 -m http.server 8101 >/dev/null 2>&1 &`; eine andere Adresse steht in der Umgebungsvariable `LOOKS_SERVER`).
Prüfskript: `NODE_PATH=/opt/node22/lib/node_modules node .claude/skills/design-vorlagen/scripts/pruefen.js <slug>`
Es schreibt Bildschirmfotos nach `./pruefung/<slug>/` (oder nach `$LOOKS_AUSGABE/<slug>/`) (desktop-1..3.png, desktop-full.png, mobil-1..3.png, mobil-full.png, tablet-1.png, desktop-reduziert.png) und `pruefung.json`, und gibt am Ende eine Liste harter Fehler aus. Ziel: "ALLE HARTEN PRÜFUNGEN BESTANDEN".
SIEH DIR DIE BILDSCHIRMFOTOS AN (Read-Werkzeug auf die PNG-Dateien: desktop-1, desktop-2, mobil-1, mobil-2 mindestens). Viele Fehler (abgeschnittener Text, unlesbarer Kontrast, leere Flächen, überlappende Teile, Hero-Bild kaputt) sieht man nur auf dem Bild. Behebe sie und prüfe erneut, bis es gut aussieht.
Lighthouse (mobil) misst `python3 .claude/skills/design-vorlagen/scripts/messen.py <slug>` (Ergebnis in `./pruefung/_lh/ergebnis.json`). Ziel: Barrierefreiheit 100, Technik 100, Leistung ab 95, Layoutverschiebung unter 0,1. Das Programm `lighthouse` muss im PATH liegen oder in `LIGHTHOUSE` stehen.

## SKILL.md (Pflichtformat)
Frontmatter:
---
name: look-<slug>
description: <2 bis 3 Sätze: was der Look ist und wofür er passt; enthält Auslöser-Wörter auf Deutsch und Englisch, z. B. "Partikel-Look", "particles design", "Design-Vorlage particles". Verwenden, wenn ...>
---
Danach diese Überschriften (genau so):
# Look: <Name>
## Wann der Look passt / Wann nicht
## Merkmale (5 bis 8 Punkte, konkret)
## Farben (Tabelle: Token | Wert | Rolle; Farbe mit Rolle, Signalfarbe nur für den Kaufknopf und Auswahl)
## Schriften (Familie, Gewicht, Dateinamen aus design-vorlagen/fonts, wofür)
## So ist er gebaut (die 3 bis 5 Schlüsseltechniken mit kurzen, getesteten Code-Ausschnitten aus deiner Demo)
## Pro (4 bis 6 Punkte, konkret, aus dem was du gebaut und gemessen hast, mit Zahlen wo möglich)
## Contra (4 bis 6 Punkte, ehrlich und konkret: Aufwand, Leistung, Lesbarkeit, Barrierefreiheit, Risiko, was nicht klappte)
## Eignung für Ein-Produkt-Shops (Tabelle, Spalten: Kriterium | Note 1 bis 5 (5 = sehr gut) | Begründung in einem Satz; Kriterien in dieser Reihenfolge: Kaufwirkung, Lesbarkeit, Handy, Tempo, Barrierefreiheit, Aufwand (5 = wenig Aufwand), Risiko (5 = geringes Risiko))
## Passt besonders zu (Produktarten, 1 bis 3 Zeilen) und ## Passt nicht zu (1 bis 2 Zeilen)
## Stolperfallen (alles, was beim Bauen schiefging oder knifflig war)
## Anwenden (Schritte: vorlage/style.css als Startpunkt, welche Klassen es gibt, wie es zu den Haken des Skills ein-produkt-shop passt: Verweis auf ../design-vorlagen/references/umstellen.md; Schriften aus ../design-vorlagen/fonts kopieren)
## Dateien
Keine Gedankenstriche, keine Floskeln und keine Wörter der Verbotsliste. Pro und Contra müssen zu DEINER Demo passen, nicht allgemeines Wissen sein.

## RÜCKGABE AN MICH (höchstens 25 Zeilen)
1. Dateien (Pfade). 2. Ergebnis des Prüfskripts (Fehlerliste, KB, Überlauf). 3. Deine Noten für die 7 Kriterien mit je 4 Wörtern Begründung. 4. Bekannte Schwächen / was offen ist. Keine langen Beschreibungen.

## VERBUND-DURCHGÄNGE (Pflicht, Wunsch des Nutzers: jedes Layout wird mit diesen drei Skills überarbeitet)
Baue zuerst eine lauffähige Demo (prüfen, ansehen). Dann drei Durchgänge in dieser Reihenfolge. Lies bei jedem Durchgang die SKILL.md des Skills und wende nur an, was zu deinem Look passt. Nach JEDEM Durchgang Prüfskript laufen lassen und Bildschirmfotos ansehen, nie mehrere Durchgänge ungeprüft hintereinander.
Die Skills lädst du mit dem Skill-Werkzeug (Namen `gpt-taste`, `impeccable`, `emil-design-eng`, je nach Umgebung mit dem Vorsatz `anthropic-skills:`) oder liest ihre `SKILL.md` im Skill-Ordner des Rechners. Hintergrund und was bewusst nicht übernommen wird: `verbund.md`.
1. gpt-taste: Aufbau und Raster. Überschrift breit, höchstens 2 Zeilen auf dem PC, lückenloses Raster ohne leere Löcher, großzügige und gleichmäßige Abstandsstufen, Hero mit klarer Blickführung (Aufmerksamkeit, Interesse, Verlangen, Handlung).
2. impeccable: Farbe, Hierarchie, Barrierefreiheit. Jede Farbe hat eine Rolle, die Signalfarbe nur für den Kaufknopf und Auswahl, klare Hierarchie (ein Blickfang pro Bildschirm), Kontrast gemessen, sichtbarer Fokus.
3. emil-design-eng: Details und Bewegung. `:active { transform: scale(.97) }` auf jedem drückbaren Element (im Stil des Looks), eigene Easing-Kurven statt `ease` (z. B. `cubic-bezier(.23,1,.32,1)`), UI-Animationen unter 300 ms, nur `transform` und `opacity` animieren, nie `ease-in`, nie von `scale(0)`, Hover nur unter `@media (hover:hover) and (pointer:fine)`, Tastatur-Aktionen nie animieren, Blur über 20 px meiden.
Konflikte: Die Regeln des Nutzers (ein Kaufknopf, keine Gedankenstriche, Verbotsliste, Barrierefreiheit) gehen vor. Wenn eine Regel eines Skills dem Wesen des Looks widerspricht (z. B. Flackern bei Neon), löse es so, dass der Look erkennbar bleibt, und halte es in der Tabelle fest.
Ergebnis: In SKILL.md zusätzlich der Abschnitt `## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)` mit einer Markdown-Tabelle `| Skill | Vorher | Nachher | Warum |`, mindestens 2 echte Zeilen pro Skill (was du in DEINER Demo tatsächlich geändert hast), dazu ein Satz zu Konflikten.
Falls du die Skill-Dateien nicht lesen kannst, melde das in der Rückgabe und arbeite mit den Kurzregeln oben weiter.

## Hinweis zu impeccable
Von impeccable kann unter Umständen nur die `SKILL.md` lesbar sein; die dort genannten reference-Dateien (craft-floor.md usw.) und das Startskript fehlen dann. Lass das Startskript weg, arbeite mit der SKILL.md und den Kurzregeln oben und vermerke das in einem Satz im Abschnitt "Verbund-Durchgang".
## Ablage
Lege nichts außerhalb von `.claude/skills/look-<slug>/` und `pruefung/<slug>/` ab. Wenn dein Look eine eigene Hilfsdatei braucht (z. B. Skizzen), lege sie in `pruefung/<slug>/`.
