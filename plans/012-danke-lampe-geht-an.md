# 012: Danke-Seite: Lampe geht an, Text steigt auf (und Klassen-Fehler beheben)

- Stand: Commit `adc9dc8` · Art: Gelegenheit (Freude, selten) · Status: ERLEDIGT
- Dateien: `shops/helia/danke.html` (vom Generator erzeugt, siehe Hinweis in Plan 011), `shops/helia/assets/script.js` (Abschnitt "Kopfbereich: die Lampe geht beim Laden auf")

## Heute
- Die gezeichnete Lampe ist sofort voll an. Überschrift und Text stehen starr.
- `danke.html:78`: `<span class="leuchtschrift">` ist eine Klasse aus der DÄMMER-Zeit, die im Stylesheet fehlt. Der Schriftzug ist ungestaltet.

## Ziel
- Lampe wird über 1,8 s von Glut zu Gold hell (`--glow` 0,04 bis 0,92, Farbe über die vorhandene `LAMPE`-Tabelle bis 0,8).
- Überschrift, Text und Bestellnummer steigen gestaffelt auf. Dafür wird die vorhandene Klasse `held__an` mit `--i` genutzt
  (1 s, `cubic-bezier(0.23,1,0.32,1)`, Versatz 90 ms, bei "weniger Bewegung" aus).

## Schritte
1. In `danke.html`: `class="leuchtschrift"` ersetzen durch `class="leucht"`.
2. Die Lampe in `<div data-intro="1800">…</div>` einpacken. `<h1>` bekommt `class="held__an" style="--i:1"`, die drei folgenden `<p>` `--i:2`, `--i:3`, `--i:4`.
3. In `script.js` im Intro-Block: `const dauer = 2600` ersetzen durch `const dauer = Number(intro.dataset.intro) || 2600`.

## Prüfen
Danke-Seite laden: Die Lampe glimmt auf, der Text steigt nacheinander hoch. "Es wird hell." ist kursiv und honigfarben. Bei "weniger Bewegung" ist alles sofort da.
