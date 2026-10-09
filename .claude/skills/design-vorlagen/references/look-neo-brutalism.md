# Look: Neo-Brutalism (hell, flach)

Gebaut und getestet in `shops/horta/` (Gemüseschneider). Fertiges Stylesheet: `vorlagen/neo-brutalism/shop/style.css`.
Entwurfs-Quelltexte für die Design-Fläche: `vorlagen/neo-brutalism/entwurf/Startseite.dc.html` und `Kasse.dc.html`.

## Wann
Hell, laut, handfest. Passt zu Küche, Essen, Alltag, Spielzeug, Werkzeug, Geschenke. Schlecht für Produkte, die Ruhe, Luxus
oder Schlaf versprechen (dafür Glas).

## Merkmale
- Dicke Tintenkonturen (3 px), harte Versatzschatten ohne Weichzeichner (`--sh` 6 px), Ecken eckig, kein Glas, kein Blur.
- Flache Farbflächen, jede Karte eine eigene Farbe, leicht gekippt (±1°) wo es Platz hat.
- Stickersprache: Hervorhebung im Titel als gekippter Block (`.leucht`), Etiketten in Space Mono, Laufband in Schwarz.
- Knöpfe drücken sich in den Schatten (`:active` verschiebt um `--sh`), Hover hebt um 2 px.
- Grund: flache Limette mit feinem Punktraster. Dunkler Block (Abschied) als Gegengewicht vor der Fußzeile.
- Produkt als 3D-Modell oder Zeichnung auf einer farbigen, schraffierten Fläche mit Rahmen und Schatten.

## Farben (feste Rollen)
| Token | Wert | Rolle |
| --- | --- | --- |
| `--ink` | #121212 | Kontur, Text, dunkler Block |
| `--paper` | #fffef6 | Karten, Kopfzeile |
| `--ground` | #dff3a6 | Seitengrund (je Produkt tauschbar: Gelb #ffe45e, Rosa #ffc9e3, Hellblau #c8e0ff) |
| `--green` | #43d36b | Produktfläche, Auswahl, Antworten des Shops |
| `--sun` | #ffd23f | Hervorhebung, Entwurfshinweise, Sterne-Rahmen |
| `--violet` | #b79cff | Bewertungen, Newsletter |
| `--tomate` | #ff5236 | NUR Kaufknopf, Warenkorb-Zeile, geöffnete Fragen. Text darauf immer in Tinte (Weiß fällt durch) |

## Schriften (alle selbst gehostet, OFL)
Archivo Black (Überschriften, Knöpfe, Preise), Archivo 500/700 (Text), Space Mono 400/700 (Etiketten, Zahlen).
Holen: `npm pack @fontsource/archivo-black @fontsource/archivo @fontsource/space-mono`, aus `package/files/` die
`*-latin-400-normal.woff2` bzw. `500` und `700` nehmen, `LICENSE` als `…-OFL.txt` daneben legen.
Achtung beim Entpacken: `archivo-*.tgz` passt auch auf `archivo-black-*.tgz`, deshalb die Versionsnummer im Muster nennen.
Überschriften sind groß geschrieben: `hyphens:auto` und `lang="de"` sind Pflicht, sonst sprengen lange Wörter die Spalte.

## Anwenden
Neuer Shop: `ein-produkt-shop` Phase 5, danach `vorlagen/neo-brutalism/shop/style.css` nach `assets/style.css` kopieren, Schriften
laden, Farben in `:root` anpassen. Bestehender Shop: `references/umstellen.md`.

## Stolperfallen (alle in HORTA aufgetreten)
- Kopfzeile auf dem Tablet (820 px): Logo, sechs Links und Warenkorb passen nicht. Unter 1020 px Schrift kleiner, Warenkorb-Text weg.
- Senkrechte Titel im waagerechten Akkordeon überlappen die Schrittnummer: Nummer bei geschlossenen Karten ausblenden.
- `mix-blend-mode:multiply` für ein weißes Produktfoto färbt es auf farbigem Grund ein. Foto auf Papierfläche setzen.
- Hervorhebung `.leucht` auf gelber Fläche verschwindet: dort Papierfarbe als Hintergrund.
- Lighthouse meldet Kontrast für Elemente, die gerade einblenden (`.zeigen` startet bei Deckkraft .35). Kein echter Fehler, aber
  nicht schlechter starten lassen.
- Fokusrahmen in Blau (#3d6bff) ist auf Limette, Papier und Tinte gleichermaßen sichtbar.
- Das Logo-Label darf den Namen enthalten ("HORTA, zur Startseite"), `text_check.py` und Lighthouse verlangen den Namen im Label.

## Regler für Varianten
`--sh` (Schattentiefe, 0 bis 12 px), `--ground` (Grundfarbe), `--tomate` (Kaufknopf). Mehr braucht der Look nicht.
