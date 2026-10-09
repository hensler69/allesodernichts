---
name: ein-produkt-shop
description: Baut einen rechtssicheren deutschen Ein-Produkt-Onlineshop als statische Website (HTML, CSS, reines JavaScript, PHP-Formular) von der Trend- und Produktrecherche über Name, Preise, Fragen und Zusammenfassung bis zum fertigen, getesteten Shop mit 3D-Produkt, Warenkorb, Kasse, Online-Widerruf, Bewertungen, Newsletter-Gutschein, Rechtstexten, Vorschau-Artifact und CHECK. Enthält eine komplette Referenz-Umsetzung (HELIA-Lichtwecker) zum Übernehmen und alle Lehren aus Design-, Bewegungs- und Rechtsdurchgängen. Unbedingt verwenden, wenn jemand einen Onlineshop, E-Commerce-Shop, Produktshop, eine Produktseite mit Kasse, eine Verkaufsseite oder Landingpage für ein Produkt, ein "winning product", Dropshipping oder "mit E-Commerce starten" erwähnt, auch wenn das Wort "Skill" nicht fällt, und auch für spätere Änderungen an einem so gebauten Shop.
---

# Ein-Produkt-Shop (Deutschland)

Dieser Skill fasst einen kompletten Weg zusammen, der beim HELIA-Shop über viele Sitzungen und
sieben Skills entstanden ist (gpt-taste, apple-design, impeccable, improve-animations,
find-animation-opportunities, emil-design-eng, animate). Die Ergebnisse dieser Skills stehen hier schon
als feste Regeln drin, damit sie nicht jedes Mal neu erarbeitet werden müssen. Die Skills selbst
kannst du für einen Feinschliff zusätzlich aufrufen, nötig ist es nicht.

Die Referenz in `referenz/` ist ein fertiger, getesteter Shop. Fast alles außer dem Produkt selbst
(Warenkorb, Kasse, Widerruf, Bewertungen, Newsletter, send.php, Rechtstexte, Glas-Design, Tests)
wird übernommen und angepasst, statt neu geschrieben. Das ist der größte Zeitgewinn.

## Wie du mit dem Nutzer sprichst

Der Nutzer ist kein Programmierer. Schreib einfaches Deutsch, erkläre jeden Fachbegriff im selben Satz
und zeig Dateiinhalte, die für ihn gedacht sind, direkt im Chat. Er sieht nur den Chat.
Lies vor dem Start `references/grundregeln.md`: Dort stehen seine festen Regeln für Technik, Design,
Bilder, Fragen, die Pflicht-Zusammenfassung und den CHECK. Sie gelten für jeden Shop, auch wenn er sie
nicht noch einmal schickt. Wenn er in einem neuen Chat eigene Regeln mitbringt, gehen seine vor.

## Ablauf

Arbeite die Phasen der Reihe nach ab. Lege für die Phasen eine Aufgabenliste an, damit nichts verloren
geht. Nach jeder größeren Phase eine kurze Zwischenmeldung im Chat.

### Phase 0: Gedächtnis
Gibt es `CLAUDE.md` und `notes/`, lies sie zuerst. Dort stehen frühere Entscheidungen und offene Punkte.

### Phase 1: Recherche (nur wenn das Produkt noch offen ist)
Lies `references/produkt-preise-name.md`, Abschnitt Recherche.
- Trends im Netz suchen (Suchvolumen, Marktwachstum, Preisband in Deutschland).
- Drei bis fünf Kandidaten bewerten, dabei das Rechtsrisiko des Produkts mitprüfen
  (Gesundheitsversprechen, Kosmetik, Elektro, Kinder). Ein Produkt mit hohem Abmahnrisiko wird nicht empfohlen.
- Ergebnis kurz mit Quellen im Chat, Empfehlung zuerst.

### Phase 2: Fragen
Ablauf genau wie in `references/grundregeln.md`:
1. Geschmacksfragen über das Auswahl-Widget (AskUserQuestion), Empfehlung zuerst mit "(Empfohlen)".
   Für Shops sinnvoll: Produkt (falls offen), Stimmung/Welt der Seite, Leitfarbe/Verlauf, Umfang
   (Produktseite mit Kasse oder nur Landingpage).
2. Fakten danach als normaler Text: Firmendaten (echt oder erfunden für einen Entwurf), Zahlungsarten,
   Versandkosten, Rabatt-Idee, Produktbilder (Hinweis: einfach in den Chat ziehen), E-Mail für Bestellungen.
Alles, was die Regeln schon festlegen, wird nicht gefragt.

### Phase 3: Name, Preise, Rechtliches festlegen
- Name nach `references/produkt-preise-name.md` (Verwechslungsprüfung, kein "0815"-Name).
- Preise und Rabatte nach derselben Datei. Kein Streichpreis ohne echten Vorpreis.
- Rechtliche Pflichtteile nach `references/recht-de.md` einplanen. Diese Datei ist der wichtigste
  Schutz vor Abmahnungen. Prüfe bei Unsicherheit per Websuche, ob sich seit Juni 2026 etwas geändert hat.

### Phase 4: Pflicht-Zusammenfassung
Genau im Format aus `references/grundregeln.md` (Aufbau als Liste, eine Zeile pro Abschnitt, dann
die kurzen Zeilen, Hinweis "jetzt ist der beste Moment für Änderungen", Hinweis auf ein stärkeres
Modell). Danach erst das Widget "Ja, jetzt bauen (Empfohlen)" / "Warte, ich möchte noch etwas ändern".
Nicht bauen, bevor er bestätigt.

Bewährter Seitenaufbau nach AIDA (an das Produkt anpassen, Begründungen in `references/gestaltung.md`):
- Kopfbereich (Aufmerksamkeit): Begrüßung nach Tageszeit, Überschrift in höchstens zwei Zeilen, ein Satz Nutzen,
  Sterne-Zeile, Preis mit allen Pflichtangaben, der eine Kaufknopf, darunter groß das 3D-Produkt.
- Laufband mit Stichworten
- Auf einen Blick (Interesse): vier Glas-Kacheln mit hochzählenden Zahlen
- Geschichte: ein Satz, der Wort für Wort beim Scrollen hell wird
- Erlebnis-Abschnitt: das Produkt zum Ausprobieren (bei HELIA Tag-Nacht-Simulation mit Regler und persönlicher Weckzeit)
- Funktionen als Bento-Raster (Verlangen)
- Ein Ablauf als waagerechtes Akkordeon (zum Beispiel "Vom Abend bis zum Morgen")
- Technik als Kartenstapel: Datenblatt, Lieferumfang, Produktsicherheit (GPSR)
- Bewertungen: Zitat-Karussell, Zusammenfassung, Liste, Formular, Prüfhinweis
- Angebot (Handlung): Foto, Paketwahl, Menge, Summe, Kaufknopf, Fakten, Kleingedrucktes
- Fragen (Akkordeon)
- Abschied: ruhiger Schluss-Moment ohne zweiten Knopf
- Fußzeile mit Newsletter-Gutschein, Rechtslinks, "Vertrag widerrufen"
Unterseiten: Kasse, Danke, Vertrag widerrufen, Impressum, Datenschutz, AGB, Widerrufsbelehrung,
Versand und Zahlung, Newsletter bestätigt.

### Phase 5: Bauen aus der Referenz
Wähle zuerst den Look mit dem Skill `design-vorlagen` (Glas dunkel, Neo-Brutalism hell oder ein Entwurf); dessen
`vorlagen/<look>/shop/style.css` ist der Startpunkt für `assets/style.css`.
Lies `references/referenz-karte.md`. Dort steht, welche Teile allgemein sind, welche produktabhängig
sind und in welcher Reihenfolge du anpasst. Kurz:
1. `referenz/shop/` in den neuen Ordner kopieren (zum Beispiel `shops/<name>/`), die Generator-Dateien aus
   `referenz/generator/` in den Arbeitsordner (Scratchpad) kopieren.
2. In `bausteine.py` Name, Firma, Domain, Mail, Farben, Logo ändern; Startseite in `build_index.py` neu
   texten; Rechtsseiten in `build_rest.py` anpassen. Dann mit `SHOP_ZIEL=<ordner> python3 build_index.py && python3 build_rest.py` erzeugen.
3. `assets/style.css`: Farb-Variablen, Schriften, das Produktmodell. `assets/script.js`: Preise,
   Speicher-Schlüssel, Bestellnummer-Präfix, produktabhängige Bausteine (3D-Modell, Erlebnis-Abschnitt).
4. `send.php`: Einstellungen oben (Mail, Name, Preise, Gutschein, GEHEIMNIS, Präfix).
5. Produkt als 3D-Modell aus CSS nachbauen, Anleitung in `references/gestaltung.md`.
6. Schriften nur selbst gehostet (woff2 in `assets/fonts/`, OFL-Lizenztext daneben).
7. Platzhalter und `bild-prompts.txt` nach den Bilder-Regeln, Vorschaubild für soziale Netzwerke (1200×630)
   aus eigener Grafik, nie aus einem fremden Produktfoto.
8. Der Shop-Ordner ist ein Entwurf: `noindex`, `robots.txt` mit Disallow, Entwurfsleiste, und in der
   `.htaccess` der Wurzel gesperrt, wenn er neben einer anderen Website liegt.

### Phase 6: Feinschliff-Durchgänge
Diese Durchgänge haben den HELIA-Shop von "ordentlich" zu "fühlt sich gut an" gebracht. Ihre Ergebnisse
stehen als Regeln in den Referenzen, setz sie direkt um:
- Layout und Glas (apple-design, gpt-taste): `references/gestaltung.md`
- Farben für Aufmerksamkeit (impeccable): `references/gestaltung.md`, Abschnitt Farbe
- Bewegung (improve-animations, find-animation-opportunities, emil-design-eng, animate): `references/bewegung.md`
- Besuchergefühl (emil-design-eng): `references/besuchergefuehl.md`
Danach läuft der Skill-Verbund aus `design-vorlagen/references/verbund.md` (gilt für jedes Layout).
Wenn der Nutzer später einen dieser Skills ausdrücklich aufruft, nimm ihn zusätzlich dazu. Bei Konflikten
gehen seine Grundregeln vor (Beispiel: gpt-taste will zwei Knöpfe im Kopfbereich, die Regel sagt einer).

### Phase 7: Testen
Nach `references/tests-und-check.md`:
- `scripts/server_starten.sh` startet einen PHP-Testserver, Mails landen in einer Textdatei.
- `scripts/seiten_test.js` prüft alle Seiten auf PC, Handy und Tablet.
- Kaufweg, Gutschein, Widerruf, Newsletter, Bewertungen und Sicherheit von send.php durchspielen
  (Testfälle in der Datei).
- Bildschirmfotos ansehen, nicht nur Zahlen. Viele Fehler sieht man nur auf dem Bild.

### Phase 8: CHECK
Die fünf Punkte aus `references/grundregeln.md`. `scripts/text_check.py <shop-ordner>` erledigt den
maschinellen Teil (Floskeln, Gedankenstriche, Meta-Angaben, Links, Schriften, Alt-Texte, Kaufknöpfe,
send.php). Den Rest (Werbesprache, Wirkung, Bildausschnitte, send.php lesen) machst du selbst.

### Phase 9: Vorschau und Übergabe
- `scripts/vorschau_bauen.py <shop-ordner> <scratchpad>/vorschau.html "<Name> Shop"` baut eine einzige Datei,
  im Browser kurz testen, dann als privates Artifact veröffentlichen. Bei Änderungen dieselbe Datei
  erneut veröffentlichen, dann bleibt der Link gleich.
- Übergabe im Chat nach `references/grundregeln.md` (Zum Schluss): was gebaut wurde, Link, Bild-Prompts,
  dass Formulare und Kasse erst online funktionieren, dass "mach bitte nochmal den Check" jederzeit geht,
  und die offenen Punkte vor einem echten Start (Liste am Ende von `references/recht-de.md`).
- Notizen nach `notes/JJJJ-MM-TT.md`, Entscheidungen und offene Punkte in `CLAUDE.md`, dann committen und pushen,
  falls das Projekt ein Git-Repository ist.

## Spätere Änderungen
Alle Regeln gelten weiter. Bei jeder Änderung: Generator anpassen statt die HTML-Datei direkt (sonst
überschreibt der nächste Lauf sie), danach Tests, Vorschau neu bauen, Notiz ergänzen. Kurz melden, was
angepasst wurde. Wenn eine Änderung eine neue Speicherung im Browser einführt, die Datenschutzerklärung ergänzen.

## Ehrlichkeit vor Wirkung
Der Shop soll den Kunden berühren und das Produkt in den Mittelpunkt stellen, aber nie mit Tricks:
keine erfundenen Bewertungen als echt, keine falsche Knappheit, keine Countdowns ohne echten Grund,
keine Ausstiegs-Fenster, keine Gesundheitsversprechen. Das ist in Deutschland meist verboten (UWG, PAngV, HWG)
und zerstört Vertrauen. Was erlaubt und wirksam ist, steht in `references/besuchergefuehl.md`.
