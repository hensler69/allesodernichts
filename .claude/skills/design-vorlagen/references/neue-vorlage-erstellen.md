# Eine neue Vorlage oder einen neuen Look für den Nutzer bauen

Diese Datei brauchst du in zwei Fällen:
- **Fall A, neue Vorlage für ein neues Produkt:** Der Look steht fest (zum Beispiel Bauhaus), nur das Produkt ist neu. Du nimmst die Vorlage des Looks als Startpunkt und zeichnest Hero und Symbole neu.
- **Fall B, neuer Look oder gemischter Look:** Es gibt noch keinen passenden Look (zum Beispiel eine Mischung nach `vergleich.md`, Teil e). Du baust eine neue Demo und legst einen neuen Einzel-Skill `look-<slug>` an.

Manuel ist kein Programmierer. Erkläre ihm jeden Schritt in einfachen Worten, zeige Bildschirmfotos und keine Pfade. Zu Beginn jeder Antwort steht "Manuel".

## Die Schritte im Überblick
1. Look wählen (`katalog.md`, `vergleich.md`) und die Wahl von Manuel bestätigen lassen.
2. Vorlage als Startpunkt kopieren.
3. Farben und Schriften anpassen (nur `:root` und `@font-face`).
4. Neu zeichnen, was pro Produkt neu sein muss (Checkliste).
5. Pflichtregeln einhalten.
6. Prüfen mit `scripts/pruefen.js` und `scripts/messen.py`, Bildschirmfotos ansehen.
7. Skill-Verbund anwenden (gpt-taste, impeccable, emil-design-eng) mit Tabelle Vorher/Nachher.
8. Bei Fall B: Einzel-Skill `look-<slug>` anlegen und `scripts/abgleichen.py` ausführen.
9. Ergebnis zeigen: als Design-Entwurf (Artifact) oder direkt in den Shop.

## 1. Look wählen
Gehe nach `vergleich.md` vor: Fragen stellen, Vorauswahl aus `katalog.md`, Punkte rechnen, Antwort nach der festen Vorlage. Erst wenn Manuel einen Look (oder eine Mischung) bestätigt hat, wird gebaut.
Nenne ihm vorher den Aufwand: Bei Aufwand 2 (hoch) dauert allein die neue Hero-Zeichnung mehrere Stunden.

## 2. Vorlage als Startpunkt kopieren
Jeder Look liegt in zwei Kopien: das Original im Einzel-Skill `.claude/skills/look-<slug>/vorlage/` und eine Kopie im Sammel-Skill `.claude/skills/design-vorlagen/vorlagen/<slug>/`.
Die Kopie wird von `scripts/abgleichen.py` erzeugt, nicht von Hand bearbeitet. Die Vorlage besteht aus `demo.html`, `style.css`, `script.js` und manchmal Hilfsprogrammen
(zum Beispiel `vorlagen/particles/figur-erzeugen.py` bei Particles oder `vorlagen/halftone/standbild-erzeugen.py` bei Halftone). Die älteren Looks Glas im Apple-Stil und Neo-Brutalism liegen als `vorlagen/<look>/shop/style.css`.

- **Fall A:** In einen neuen Arbeitsordner kopieren, der nicht in `.claude/skills/` liegt (für einen Shop `shops/<produkt>/`, für einen Entwurf ein eigener Ordner). Kopiere die Dateien, überschreibe nie die Vorlage.
  Passe danach die Schriftpfade an: In der Vorlage zeigen sie auf `../../design-vorlagen/fonts/` (im Einzel-Skill) oder `../../fonts/` (im Sammel-Skill). Im Arbeitsordner kopierst du die gebrauchten
  `.woff2`-Dateien samt `…-LICENSE.txt` nach `assets/fonts/` und stellst die Pfade in `style.css` und in den `preload`-Zeilen der `demo.html` darauf um (Schriften immer selbst hosten).
- **Fall B:** `cp -r .claude/skills/look-<basis>/vorlage .claude/skills/look-<neuer-slug>/vorlage` (der Ordner `look-<neuer-slug>` darf noch nicht existieren). Die Pfade bleiben `../../design-vorlagen/fonts/`, damit der Testserver sie findet.
  Wähle als Basis den Look, der dem neuen am nächsten ist, bei einer Mischung den Hauptlook.

Testserver für alles Weitere (Wurzel `.claude/skills`):
```
cd .claude/skills && nohup python3 -m http.server 8101 >/dev/null 2>&1 &
```
Die Demo des neuen Looks ist dann unter `http://localhost:8101/look-<slug>/vorlage/demo.html` erreichbar.

## 3. Farben und Schriften anpassen
- **Farben nur in `:root`.** Jede Farbe hat eine Rolle (Tabelle "Farben" im Look-Skill). Die Signalfarbe steht nur für den Kaufknopf und die Auswahl. Rollen beibehalten, nur die Werte tauschen.
  Kontrast jedes Paars rechnen: Text mindestens 4,5 zu 1, große Schrift 3 zu 1. Weiß auf Orange, Gelb oder Pastell fällt oft durch.
- **Schriften nur in den `@font-face`-Zeilen.** Höchstens 2 Familien und 4 Dateien, `font-display: swap`, kein `@import`, kein Google-Fonts-Link, keine CDN-Skripte.
  Welche Schriften schon da sind, steht in `fonts/README.md`. Eine neue Schrift: Datei als `.woff2` (Zeichensatz latin) samt Lizenztext (OFL) nach `fonts/` legen
  (zum Beispiel mit `npm pack @fontsource/<name>`, die Datei `*-latin-400-normal.woff2` und die Lizenz nehmen; heruntergeladene Dateien in einen eigenen leeren Ordner entpacken)
  und in `fonts/README.md` eine Zeile ergänzen.
- Alles andere (Raster, Abstände, Komponenten) bleibt, solange der Look gleich bleibt.

## 4. Was pro Produkt neu gezeichnet werden muss (Checkliste)
Alle Grafiken sind selbst gezeichnet (SVG, CSS, Canvas), keine Fotos, keine echten Personen, keine Bild-Downloads, kein Netz zur Laufzeit.

- [ ] **Hero-Zeichnung:** Das Produkt (bei HORTA Gerät mit Kegel-Einsatz und Schüssel mit Gemüsestücken, sonst eine passende Form). Maße, Farben und Form müssen zum echten Produkt passen (Datenblatt). Zeichenreihenfolge und Handy-Zuschnitt neu setzen.
- [ ] **Symbole:** Die kleinen Zeichnungen der Funktionskarten, der Zahlenleiste und des Lieferhinweises (je nach Look 4 bis 12 Stück).
- [ ] **Standbild ohne JavaScript:** Die Seite muss ohne JS lesbar sein (Texte stehen im HTML, JS ergänzt nur Effekte). Wo die Zeichnung erst im Browser entsteht (Isometric, Pixel Art, Particles, Halftone), braucht es ein statisches Ersatzbild oder
  das fertige SVG im HTML. Bei `prefers-reduced-motion: reduce` muss der Effekt als vollständiges Standbild stehen.
- [ ] **Texte:** Nur Fakten aus dem Produktdatenblatt. Keine erfundenen Zahlen, keine Gesundheitsversprechen, Beispiel-Bewertungen mit der Marke "Beispiel", Fußzeile mit Entwurfshinweis.
- [ ] **Logo, Favicon, Vorschaubild (1200 mal 630):** aus der eigenen Zeichnung, nie aus einem Fremdfoto.
- [ ] **Alternativtexte** für jede Zeichnung, `aria-hidden` für reine Zierde.

## 5. Pflichtregeln
- Genau **ein Kaufknopf** (Klasse `cta`, Text "In den Warenkorb"). Der Navigationslink "Warenkorb" mit Zähler ist kein Kaufknopf.
- **Kein Menüpunkt "Home"** und kein Menüpunkt "Startseite". Das Logo ist ein Link mit `aria-label="<Marke>, zur Startseite"`.
- **Keine Gedankenstriche** (lange und mittellange Striche) und **keine Wörter der Verbotsliste** aus `ein-produkt-shop/references/grundregeln.md`. Das Prüfskript meldet jeden Fund. Bindestriche in Wörtern wie "Ein-Produkt" sind erlaubt.
- **`prefers-reduced-motion: reduce`:** keine Endlos-Animationen, keine Schleifen mit `requestAnimationFrame`, kein Blinken, nichts blitzt öfter als 3 mal pro Sekunde, die Seite sieht ruhig und vollständig aus.
- **Mobil ist ein eigener Entwurf:** andere Anordnung, Tippflächen mindestens 44 px, Hero-Bild sinnvoll gekürzt, Kaufknopf möglichst im ersten Bildschirm (390 mal 844 px).
- **Kein waagerechter Überlauf** bei 390, 820 und 1280 px Breite (zusätzlich zwischen 320 und 1920 px stichprobenartig). Die Kopfzeile ist die häufigste Stelle, besonders zwischen 720 und 900 px.
- **Layoutverschiebung (CLS) unter 0,1:** Weißraum für Inhalte reservieren, die JavaScript erst baut (feste Höhe oder `aspect-ratio`, fertig berechneter `viewBox` im HTML), Schriften mit `<link rel="preload">` vorladen und eine passende Ersatzschrift
  mit gleichen Maßen definieren (`size-adjust`, `ascent-override`, `descent-override`), damit beim Schriftwechsel nichts springt. Bei Isometric sank der Wert so von 0,11 auf 0.
- **Gewicht:** alles außer Schriften höchstens 250 KB. JavaScript-Animationen mit `requestAnimationFrame`, pausiert bei `document.hidden` und außerhalb des Bildes (`IntersectionObserver`). Canvas mit `devicePixelRatio` höchstens 2.
- **Barrierefreiheit:** `<html lang="de">`, viewport-Meta, Titel, genau eine `h1`, geordnete Überschriften, sichtbarer Fokus (`:focus-visible`), Kontrast 4,5 zu 1, Hover nur unter `@media (hover:hover) and (pointer:fine)`.
- **Eine Signalfarbe**, und sie gehört dem Kaufknopf.
- Der Look muss erkennbar und mutig sein, der Text lesbar und der Kaufknopf das auffälligste Bedienelement.

Der vollständige Rahmenauftrag für einen Look (Text, Seitenaufbau, Qualität, Skill-Format) steht in `look-bauen-brief.md`.

## 6. Prüfen
```
NODE_PATH=/opt/node22/lib/node_modules node .claude/skills/design-vorlagen/scripts/pruefen.js <slug>
python3 .claude/skills/design-vorlagen/scripts/messen.py <slug>
```
Einstellungen (Umgebungsvariablen, alle optional): `LOOKS_SERVER` (Standard `http://localhost:8101`), `LOOKS_AUSGABE` (Ausgabeordner, Standard `./pruefung`), `CHROME_PATH` (Standard
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`), `LIGHTHOUSE` (Pfad zum Programm lighthouse, sonst `lighthouse` im PATH). Statt des Slugs darf eine Adresse stehen, zum Beispiel für einen Shop im Arbeitsordner.

- `pruefen.js` schreibt Bildschirmfotos (`desktop-1` bis `-3`, `desktop-full`, `mobil-1` bis `-3`, `mobil-full`, `tablet-1`, `desktop-reduziert`) und `pruefung.json` nach `<ausgabe>/<slug>/` und nennt am Ende die harten Fehler. Ziel: "ALLE HARTEN PRÜFUNGEN BESTANDEN".
- **Sieh dir die Bildschirmfotos an** (mindestens `desktop-1`, `desktop-2`, `mobil-1`, `mobil-2`). Abgeschnittener Text, schwacher Kontrast, leere Flächen, überlappende Teile und ein kaputtes Hero-Bild sieht nur das Auge.
- `messen.py` schreibt Lighthouse-Werte nach `<ausgabe>/_lh/ergebnis.json`. Ziel: Barrierefreiheit 100, Technik 100, Leistung ab 95, Layoutverschiebung unter 0,1. Die Messung läuft in Chromium ohne Grafikkarte und ist kein Test auf echten Handys.
- Prüfe nach jedem Durchgang des Verbunds erneut, nie mehrere Durchgänge ungeprüft hintereinander.

## 7. Skill-Verbund anwenden
Reihenfolge und Inhalte stehen in `verbund.md`: erst **gpt-taste** (Aufbau, Raster, Überschrift höchstens 2 Zeilen am PC, Abstände), dann **impeccable** (Farbrollen, Hierarchie, Kontrast, Fokus), dann **emil-design-eng**
(`:active` mit `scale(.97)`, eigene Kurven wie `cubic-bezier(.23,1,.32,1)`, Animationen unter 300 ms, nur `transform` und `opacity`, nie `ease-in`, nie von `scale(0)`).
Nach jedem Skill: Prüfskript, Bildschirmfotos ansehen, dann der nächste.

Das Ergebnis kommt in den Look-Skill als Abschnitt `## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)`:
```
| Skill | Vorher | Nachher | Warum |
| --- | --- | --- | --- |
| gpt-taste | H1 hat 3 Zeilen bei 1280 px | Spalten 1,18fr / 1fr, 2 Zeilen gemessen | Zwei-Zeilen-Regel |
| gpt-taste | ... | ... | ... |
| impeccable | ... | ... | ... |
| impeccable | ... | ... | ... |
| emil-design-eng | ... | ... | ... |
| emil-design-eng | ... | ... | ... |
```
Mindestens 2 echte Zeilen je Skill mit dem, was du wirklich geändert hast, dazu ein Satz zu Konflikten (die Regeln des Nutzers gehen vor, zum Beispiel ein Kaufknopf statt zwei).
Bei impeccable liegt unter Umständen nur die `SKILL.md` vor (ohne die dort genannten Referenzdateien und ohne Startskript): Arbeite mit der `SKILL.md` und den Kurzregeln und vermerke das in einem Satz.

## 8. Einzel-Skill anlegen und abgleichen (Fall B)
Lege `.claude/skills/look-<slug>/SKILL.md` an. Das Pflichtformat zeigt zum Beispiel `.claude/skills/look-isometric/SKILL.md`. Kurzfassung:

```
---
name: look-<slug>
description: <2 bis 3 Sätze: was der Look ist und wofür er passt, mit Auslöser-Wörtern auf Deutsch und Englisch, z. B. "Partikel-Look", "particles design", "Design-Vorlage particles". Verwenden, wenn ...>
---
# Look: <Name>
## Wann der Look passt / Wann nicht
## Merkmale                  (5 bis 8 konkrete Punkte)
## Farben                    (Tabelle: Token | Wert | Rolle)
## Schriften                 (Familie, Gewicht, Dateiname aus fonts/, wofür)
## So ist er gebaut          (3 bis 5 Schlüsseltechniken mit getesteten Code-Ausschnitten)
## Pro                       (4 bis 6 Punkte, konkret, mit Zahlen)
## Contra                    (4 bis 6 Punkte, ehrlich: Aufwand, Leistung, Lesbarkeit, Risiko)
## Eignung für Ein-Produkt-Shops   (Tabelle Kriterium | Note 1 bis 5 | Begründung; Kaufwirkung, Lesbarkeit, Handy, Tempo, Barrierefreiheit, Aufwand, Risiko)
## Passt besonders zu
## Passt nicht zu
## Stolperfallen
## Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng)
## Anwenden
## Dateien
```
Pro und Contra müssen zur eigenen Demo passen und mit Messwerten belegt sein, nicht allgemeines Wissen. Keine Gedankenstriche, keine Verbotswörter.

Dann den Abgleich ausführen. Er kopiert den Textteil nach `references/look-<slug>.md` und die Vorlage nach `vorlagen/<slug>/` (Schriftpfad wird angepasst) und löscht nie etwas:
```
python3 .claude/skills/design-vorlagen/scripts/abgleichen.py --pruefen   # zeigt nur, was sich ändern würde
python3 .claude/skills/design-vorlagen/scripts/abgleichen.py             # kopiert
```
Danach den Sammel-Skill nachziehen, von Hand: eine Zeile in `katalog.md` (und die Zählung "alle N Looks"), eine Zeile in der Tabelle in `SKILL.md` und die `description` in `SKILL.md`, bei Bedarf Noten in `empfehlung-horta.md`.
Änderungen am Look immer im Einzel-Skill machen und dann erneut abgleichen, nie in der Kopie.

## 9. Ergebnis zeigen: Design-Entwurf oder direkt in den Shop

**Weg 1, als Design-Entwurf in der Design-Fläche (Artifact).** Gut zum Anschauen und Teilen, ohne den Shop anzufassen. Frage Manuel zuerst, ob er einen Link will, denn ein Artifact ist ein veröffentlichter Entwurf (er startet privat).
Nimm den Artifact-Typ "Design" der Design-Fläche (der Aufruf `quickstart` mit `intent` "design" zeigt, was in diesem Konto geht). Als einfachere Variante die Demo als Seite mit Hilfsdateien veröffentlichen:
`demo.html`, `style.css`, `script.js` und die gebrauchten Schriften in einen eigenen Ordner legen, die Pfade `../../design-vorlagen/fonts/` auf `fonts/` umstellen und alle Dateien mit `files` mitgeben.
Der Entwurf behält den Hinweis "Alle Angaben und Bewertungen sind erfunden" und `noindex`. Quelltexte der älteren Entwürfe liegen in `vorlagen/neo-brutalism/entwurf/` und `vorlagen/ki-vorlage/entwurf/`.
Bei einer Änderung dieselbe Datei erneut veröffentlichen, damit der Link bleibt.

**Weg 2, direkt in einen Shop.** Für einen bestehenden Shop gilt `umstellen.md`: Schriften tauschen, `style.css` ersetzen, die wenigen Stellen in den Generatoren anpassen, Favicon und Vorschaubild neu, prüfen, Vorschau neu bauen.
Die Klassennamen der Look-Vorlagen (`.cta`, `.platte` und so weiter) heißen anders als die Haken des Skills `ein-produkt-shop` (`.knopf`, `.glas`, `.kachel`, `.schritt` und so weiter). Der Abschnitt "Anwenden" des jeweiligen Looks sagt, wie sie abgebildet werden.
Texte, Preise, Rechtsseiten, Formulare und Warenkorb-Logik bleiben unverändert. Ein neuer Shop beginnt mit dem Skill `ein-produkt-shop` und nimmt den Look aus dieser Datei als Gestaltung.
Danach: Seitentest, Kaufweg, `ein-produkt-shop/scripts/text_check.py`, Lighthouse, Entscheidung in `CLAUDE.md` und eine Notiz in `notes/`.

## Bewährte Arbeitsweise mit Sub-Agenten
So wurden die 18 Demo-Looks gebaut, und so lassen sich mehrere neue Looks parallel bauen:
- **Ein Auftrag pro Look.** Jeder Sub-Agent bekommt den Rahmenauftrag aus `look-bauen-brief.md` und die Beschreibung seines Looks (Name, Stimmung, Farben, Schriften, Besonderheit). Er arbeitet nur im eigenen Ordner `look-<slug>/` und im Ordner für Bildschirmfotos.
- **Harte Regeln im Auftrag:** nichts löschen, nichts committen oder veröffentlichen, keine fremden Looks anfassen.
- **Rückgabe kurz** (höchstens 25 Zeilen): Dateien, Ergebnis des Prüfskripts, eigene Noten für die 7 Kriterien, bekannte Schwächen.
- **Du prüfst selbst:** `pruefen.js` laufen lassen, Bildschirmfotos ansehen, `messen.py` ausführen. Fehler gehen als Liste zurück an den Sub-Agenten.
- **Höchstens zwei Nachbesserungsrunden** pro Look. Danach bewertest du, was da ist, und hältst Schwächen im Contra und in den Stolperfallen fest, statt endlos zu feilen.
- Der Verbund-Durchgang (gpt-taste, impeccable, emil-design-eng) gehört in den Auftrag, mit Prüfung nach jedem Durchgang.
- Danach einmal `abgleichen.py`, damit der Sammel-Skill alle Looks enthält, und die Wertung neu rechnen (`vergleich.md`).
