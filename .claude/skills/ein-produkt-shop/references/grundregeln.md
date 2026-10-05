# Grundregeln des Nutzers

Diese Regeln hat der Nutzer zu Beginn festgelegt. Sie gelten für jeden Shop und jede spätere Änderung,
ohne dass er sie wiederholen muss. Bringt er neue Regeln mit, gehen die neuen vor.

## Inhalt
1. Kommunikation
2. Technik
3. Design
4. Bilder
5. Ablauf der Fragen
6. Zusammenfassung vor dem Bauen
7. Der CHECK
8. Spätere Änderungen
9. Zum Schluss

## 1. Kommunikation
- Einfache, normale Worte. Ein nötiger Fachbegriff wird im selben Satz kurz erklärt.
- Der Nutzer sieht nur den Chat, keine Ordner. Jede Datei, die für ihn gedacht ist: sagen, Inhalt im Chat
  zeigen, in einem Satz erklären, wofür er sie braucht.
- Sprache Deutsch, Anrede im Shop "Sie".
- Den Nutzer im Chat zu Beginn jeder Antwort mit seinem Namen ansprechen, wenn er das wünscht (steht dann in CLAUDE.md, bei Manuel: "Manuel").

## 2. Technik (nicht verhandelbar)
- Statische Website: `index.html` plus `assets/`. Reines HTML, CSS, einfaches JavaScript.
  Kein Framework, kein Build-Schritt, kein Node.js, kein npm (Node nur zum Testen auf unserer Seite).
- Unterseiten sind eigene HTML-Dateien im selben Ordner, mit gleicher Navigation, gleichem Design, gleicher Kopf- und Fußzeile.
- Saubere Adressen ohne `.html` über `.htaccess`. Alle internen Links, Canonical und og:url ohne Endung.
- Formulare über `send.php` (läuft auf günstigem Shared Hosting):
  - unsichtbares Honeypot-Feld (ein Feld, das nur Spam-Programme ausfüllen),
  - Eingaben nie ungeprüft in Mail-Kopfzeilen (Empfänger, Betreff, Absender): Zeilenumbrüche und Steuerzeichen entfernen,
  - Ratenbegrenzung gegen wiederholtes Abschicken von derselben Quelle.
- SEO-Grundlagen ohne Nachfrage: eigener Titel und Meta-Beschreibung pro Seite, Canonical, `lang="de"`, Alt-Texte,
  saubere Überschriften, selbst gezeichnetes SVG-Favicon, Open-Graph- und Twitter-Tags mit Vorschaubild
  (von Anfang an ansprechend), passende JSON-LD-Daten (beim Shop: Product mit Offer).
- `impressum.html` und `datenschutz.html` mit Standardtexten und dem Hinweis, sie prüfen zu lassen.
- Schriften IMMER selbst hosten (woff2 in `assets/fonts/`, per @font-face). Nie Google Fonts oder andere
  fremde Server, auch nicht per Link oder @import. Grund: Das überträgt die IP-Adresse an Dritte, ohne Einwilligung ein DSGVO-Verstoß.

## 3. Design (gegen den KI-Einheitslook)
- 3 bis 5 Farben, passend zur Marke, keine Regenbogenfarben. Eine vorgegebene Markenfarbe ist die Basis.
- Eine Überschriftenschrift mit Charakter, eine gut lesbare Textschrift. Verboten: Inter, Roboto und ähnliche Standardschriften.
- Klare Hierarchie: was zuerst, was als Zweites, was als Drittes wichtig ist.
- Kurze, menschliche Texte. Verboten: innovativ, nahtlos, maßgeschneidert, ganzheitlich, revolutionär, einzigartig, Leidenschaft.
  Keine Gedankenstriche (die langen Striche – und —). Stattdessen Punkt, Komma oder Doppelpunkt.
- Dezente Bewegung, kein Video-Hintergrund, nichts Aufdringliches.
- Die Handy-Ansicht ist ein eigener Design-Durchgang: bewusst entscheiden, was wegfällt, kompakter oder anders angeordnet ist.
- Genau EINE Handlungsaufforderung, auf die alles hinführt (beim Shop: "In den Warenkorb"; der Knopf darf an mehreren
  Stellen stehen, aber immer mit derselben Aktion).
- Kein Menüpunkt "Startseite" oder "Home". Das Logo verlinkt auf die Startseite und hat `aria-label="Zur Startseite"`.

## 4. Bilder (feste Regel, nicht zur Wahl stellen)
- Gibt der Nutzer Bilder oder Logo: jedes einzeln ansehen, selbst zuordnen, auf Webgröße verkleinern,
  am Ende berichten, welches Bild wo ist.
- Ohne Bilder: Platzhalter-Flächen in Markenfarben mit festem Seitenverhältnis und dezentem Symbol, sodass die Seite
  fertig aussieht. Für jede Bildstelle ein englischer Prompt für einen KI-Bildgenerator (Stil, Farbwelt, Seitenverhältnis,
  alle im selben Look) in `bild-prompts.txt` UND bei der Übergabe vollständig im Chat, je mit einer Zeile, wofür.
  Dazu ein Satz: Texte in einen Bildgenerator wie ChatGPT kopieren, Bilder speichern, in den Chat ziehen.
- Beim Shop zusätzlich: Ein Produktfoto aus fremder Quelle (zum Beispiel Amazon) nur im Entwurf und deutlich markiert,
  nie im Vorschaubild für soziale Netzwerke. Ein gezeichnetes oder in CSS gebautes Produkt ist die bessere Bühne.
- Personen nur gezeichnet und erfunden, keine echten Fotos von Menschen.

## 5. Ablauf der Fragen
- Erst alle nötigen Fragen, dann bauen.
- Geschmacks- und Richtungsfragen ZUERST über das Auswahl-Widget, einzeln oder in Gruppen, 2 bis 4 Optionen,
  Empfehlung an erster Stelle mit "(Empfohlen)". Beginnen mit der allgemeinsten Frage.
- Fakten ohne sinnvolle Auswahl (Namen, Adresse, Mail, Bilder vorhanden?) DANACH als normaler Text. Darauf hinweisen,
  dass Fotos und Logo per Drag & Drop in den Chat gezogen werden können. Keine erfundenen Auswahloptionen für Fakten.
- Nur fragen, was wirklich wichtig ist. Was hier festgelegt ist, nicht fragen. Wo eine sinnvolle Standardentscheidung möglich
  ist, treffen und kurz als Annahme nennen.

## 6. Zusammenfassung vor dem Bauen (Pflicht)
Zuerst eine normale Chat-Nachricht. Herzstück ist der Aufbau, genau so:

```
Startseite
- Kopfbereich: Name, ein Satz worum es geht, Knopf zur Handlungsaufforderung
- [Abschnitt]: ein paar Worte zum Inhalt
- [Abschnitt]: ein paar Worte zum Inhalt

[Unterseite]
- Kopfbereich: Überschrift und Einleitung
- [Abschnitt]: ein paar Worte zum Inhalt
```

Jeder sichtbare Block eine eigene Zeile, nie zusammenfassen, nicht tiefer als Abschnittsebene, keine Erklärtexte dazwischen.
Danach je eine kurze Zeile:
- Name, Art des Projekts und Ort
- Zielgruppe, Stimmung und Stilrichtung
- Farben und Schriften
- die eine Handlungsaufforderung
- E-Mail-Adresse für Formulare
- Angaben fürs Impressum
- Bilder: was vorhanden ist, wo Platzhalter hinkommen
- alle eigenen Annahmen

Am Ende: ausdrücklich sagen, dass jetzt der beste Moment für Änderungen am Aufbau ist. Dann als freundliche Option:
"Du kannst zu einem stärkeren KI-Modell wechseln, dann erhältst du ein besseres Ergebnis."
ERST DANACH als eigener Schritt das Widget: "Ja, jetzt bauen (Empfohlen)" oder "Warte, ich möchte noch etwas ändern".

## 7. Der CHECK
Automatisch vor der Übergabe und jedes Mal bei "mach bitte nochmal den Check". Alles selbst beheben, danach
in zwei bis drei Sätzen berichten, was geändert wurde.
1. Texte: keine verbotenen Floskeln, keine Gedankenstriche. Werbesprache konkreter und einfacher schreiben.
2. Technik: alle Links führen irgendwohin, keine Konsolenfehler, jede Seite mit Titel und Meta-Beschreibung,
   Favicon da, keine verbotenen oder extern geladenen Schriften.
3. Bilder: jedes Bild mit Alt-Text, der beschreibt, was zu sehen ist. Ausschnitte sitzen auf schmalen Bildschirmen,
   Dateien klein genug, Vorschaubild passt zum aktuellen Stand.
4. Ansicht und Wirkung: schmal nichts abgeschnitten oder überlappend, Knöpfe gut tippbar. Wirkt ein Abschnitt leer,
   genau EIN feines Detail ergänzen (Linie, Hover, sanftes Einblenden), nicht mehr.
5. Sicherheit der Formulare: `send.php` gezielt lesen. Felder ungefiltert in Kopfzeilen? Bereinigung von Zeilenumbrüchen?
   Ratenbegrenzung und Honeypot da? Sonst beheben.

## 8. Spätere Änderungen
Alle Regeln gelten unverändert weiter: neue Bilder mit Alt-Text und Webgröße, neue Seiten mit Titel, Beschreibung,
Canonical, JSON-LD, gleicher Kopf- und Fußzeile, Navigationseintrag. Danach in ein, zwei Sätzen sagen, was angepasst
wurde. Den kompletten CHECK nur auf Wunsch.

## 9. Zum Schluss
Fertige Seite zeigen (beim Shop: Vorschau-Artifact). In einfachen Worten erklären, was gebaut wurde, und dass Änderungen
in normalen Sätzen beschrieben werden können. Zwei Hinweise: Formulare (und die Kasse) funktionieren erst, wenn die Seite
online ist; "mach bitte nochmal den Check" geht jederzeit.
