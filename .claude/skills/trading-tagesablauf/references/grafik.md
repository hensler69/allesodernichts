# Grafik: den Plan in das Chartbild des Nutzers zeichnen

Werkzeug: `python scripts/chart_tools.py zeichnen PLAN.json`. Das Skript nimmt das Originalbild, schneidet aus,
vergrößert bei Bedarf, zeichnet Zonen, Linien, Pfeile und Texte perspektivisch richtig ein (über die Kalibrierung)
und setzt Kopfzeile, Fußzeile und einen rechten Rand für Beschriftungen dazu. Danach das Ergebnis **immer mit Read
ansehen** und prüfen, bevor es an den Nutzer geht.

## Gestaltung (warum so)

- **Sein Chart bleibt die Basis.** Er findet sich sofort zurecht und sieht seine eigenen Boxen und Linien weiter.
  Deshalb halbtransparente Flächen statt deckender Farbe.
- **Farben haben eine feste Bedeutung**, damit er nicht jedes Mal die Legende lesen muss:
  `short`/`widerstand` rot, `long`/`unterstuetzung` grün, `neutral`/`kein-trade` grau, `stop` dunkelrot,
  `ziel` violett, `info` blau, `termin` orange, `liquiditaet` braun-orange.
- **Neue Zonen** (von dir ergänzt, nicht von ihm gezeichnet) bekommen `"neu": true`: gestrichelter Rand und „(neu)“
  im Etikett. So sieht er sofort, was dazugekommen ist.
- **Optionen als Pfeile mit Buchstaben** (A, B, C …) oder mit seinen Namen (Short 1, Short 2, Long 1). Der Pfeil zeigt
  den erwarteten Weg: Rücksetzer in die Zone, Sweep, dann Richtung Ziel. Long grün, Short rot.
- **Kopfzeile** mit Markt, Zeitrahmen, Uhrzeit (Berlin und Chartzeit) und der Zeitrahmen-Begründung. Er möchte
  immer wissen, worauf geschaut und eingezeichnet wurde und warum.
- **Fußzeile** mit den wichtigsten Bedingungen, „kein Kauf- oder Verkaufssignal“ und der Messgenauigkeit.
- **Lesbar am Handy**: Er schaut oft am Handy. Das Skript skaliert die Schrift mit der Bildbreite (Faktor `schrift`).
  Lieber weniger, dafür große Beschriftungen. Preise mit Komma („1,1163“), Zonen als „von–bis“.
- **Nicht überladen**: Bei mehr als drei Optionen oder vielen Pfeilen lieber mehrere Bilder: ein Überblick nur mit
  Zonen, dann ein Bild für die Shorts und eins für die Longs (gleicher Ausschnitt, gleiche Farben). Auf
  Handyfotos mit Moiré wirken dünne Striche schnell unruhig, deshalb weniger, dafür kräftigere Linien.
- **Nichts verdecken, was zählt**: Kerzen am rechten Rand (aktueller Kurs) und die Kopfzeile frei lassen. Texte in
  den rechten Rand legen (`rand_rechts`), lange Erklärungen in die Fußzeile.

## Aufbau von PLAN.json

```json
{
  "bild": "/pfad/zum/originalbild.jpg",
  "ausgabe": "plan_heute.png",
  "pip": 0.0001,
  "referenzen": [
    {"name": "Kurslinie", "preis": 1.11376, "punkte": [[550, 1397.5], [1100, 1394.0]]},
    {"name": "Asia-Hoch", "preis": 1.11780, "a": 1052.1, "b": -0.0021},
    {"name": "Achse 1,11550", "preis": 1.11550, "punkte": [[1880, 768.0]]}
  ],
  "ausschnitt": [0, 515, 1512, 1835],
  "zoom": 1,
  "rand_rechts": 560,
  "schrift": 1.0,
  "kopf": ["EURUSD · 30 Min. · 09:24 MEZ (04:24 New York) · Plan für heute",
           "Zeitrahmen: Zonen auf 30 Min. (Tageszonen, Schlusskurse zählen), Einstieg später auf M5 (CISD), SMT auf 15 Min."],
  "zonen": [
    {"oben": 1.1178, "unten": 1.1163, "x0": 557, "x1": 1110, "art": "short",
     "titel": "SHORT 2", "text": "Short 2: 1,1163–1,1178", "unterzeile": "nur wenn Zone 1 bricht", "neu": false,
     "deckkraft": 55}
  ],
  "linien": [
    {"preis": 1.1160, "x0": 557, "x1": 700, "art": "stop", "text": "Stop spätestens 1,1160", "text_x": 700,
     "stil": "gestrichelt"}
  ],
  "pfeile": [
    {"punkte": [[558, 1.11385], [588, 1.11500], [690, 1.11165]], "art": "short", "badge": "A",
     "badge_xy": [652, 1.1133]}
  ],
  "ringe": [{"x": 550, "preis": 1.11376, "r": 14, "art": "text"}],
  "rahmen": [{"x0": 1313, "x1": 1346, "oben": 1.1151, "unten": 1.1140, "art": "info"}],
  "fibos": [{"von": 1.11780, "bis": 1.11353, "x0": 300, "x1": 1000, "stufen": [0, 0.5, 0.62, 0.705, 0.79, 1, -1],
             "zone": [0.62, 0.79], "art": "ziel", "text": "Fib London-Abverkauf (30 Min.)"}],
  "texte": [{"x": 640, "y": 1763, "text": "US-Daten 13:30 + 15:00 MEZ", "art": "termin"}],
  "fuss": ["Bedingungen …", "Kein Kauf- oder Verkaufssignal. Werte aus dem Foto gemessen, ±0,5 Pip."]
}
```

Regeln für die Felder:

- **Koordinaten**: x immer in Pixeln des Originalbilds. Höhe entweder als **Preis** (`preis`, `oben`, `unten`;
  braucht `referenzen`) oder als Pixel (`y`, `y_oben`, `y_unten`). In `punkte` und `badge_xy` gilt mit Kalibrierung
  `[x, preis]`, ohne Kalibrierung `[x, y]`. Pixelpunkte sonst als `{"x": …, "y": …}`.
- **referenzen**: Linie als `a`/`b` (Ausgabe von `linie`) oder als `punkte` (1 Punkt: Neigung wird von den Nachbarn
  übernommen, 2+ Punkte: Gerade). Ab 4 Referenzen rechnet das Skript mit einer gekrümmten Achse (Grad 2).
- **zonen**: `titel` = großer Text in der Zone, `text`/`unterzeile` = Etikett im rechten Rand (mit Linie zur Zone).
  `"seite": false` legt das Etikett direkt neben die Zone.
- **linien**: Etikett neben `text_x`. `"seite": true` legt es in den rechten Rand. `stil`: gestrichelt,
  durchgezogen oder gepunktet.
- **fibos**: Fibonacci wie in TradingView. `von` = Stufe 1 (Start der Bewegung), `bis` = Stufe 0 (Ende). Stufe 0,5 =
  EQ, negative Stufen liegen jenseits von `bis` (z. B. −1 als Ziel nach L3·6). `zone` färbt einen Bereich ein (z. B.
  OTE 0,62–0,79). Ohne Kalibrierung `y_von`/`y_bis` in Pixeln angeben. Hintergrund in
  `references/tradingview-werkzeuge.md`.
- **zeitfenster**: senkrechtes Band über die ganze Höhe, z. B. die Sperrzeit um US-Daten:
  `{"x0": 900, "x1": 990, "text": ["13:15–13:45 MEZ", "keine neue Order"], "art": "termin"}`. Sinnvoll, wenn die
  Zeitachse rechts in die Zukunft reicht (TradingView zeigt dort leere Zeit). x aus der Zeitachse ablesen.
- **zoom**: für Detailbilder (z. B. M5-Kerzen) Ausschnitt eng wählen und `zoom` 2–3 setzen.
- **ausgabe**: relativ zum Plan-Ordner. Bilder und Pläne gehören in den Scratchpad, **nie ins Repo** (private Fotos).

## Prüfen vor dem Senden

- Liegen Zonen und Linien auf den richtigen Preisen? Einen bekannten Wert gegen seine Linien halten.
- Überlappen sich Etiketten, Pfeile oder Badges? Verdeckt etwas die aktuellen Kerzen oder seine Beschriftungen?
- Ist alles am Handy lesbar? Sonst `schrift` erhöhen oder weniger Text.
- Stimmen Kopfzeile (Zeitrahmen, Uhrzeit) und Fußzeile (Genauigkeit)?
- Erst dann mit SendUserFile schicken (`display: render`).
