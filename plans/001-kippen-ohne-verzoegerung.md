# 001: 3D-Kippen der Kacheln ohne Einblend-Verzögerung

- Stand: Commit `79a6061` · Stärke: HOCH · Bereich: Gefühl (Fehler) · Status: ERLEDIGT
- Dateien: `shops/helia/assets/style.css` (Zeilen 165 und 642)

## Problem
Kacheln mit `class="zeigen"` bekommen eine gestaffelte Einblend-Verzögerung über `--d` (60 bis 200 ms, gesetzt im HTML per `style="--d:80ms"`).
`transition-delay` hat dort nur EINEN Wert und gilt damit für ALLE Übergänge, also auch für `transform`, mit dem das 3D-Kippen
(`[data-kipp]`) arbeitet. Das Kippen folgt der Maus deshalb bis zu 200 ms verspätet und fühlt sich zäh an.

Aktuell (Zeile 165):
```css
.zeigen{opacity:.35;translate:0 16px;transition:opacity .8s var(--ease-out),translate .8s var(--ease-out),transform .5s var(--ease-out);transition-delay:var(--d,0ms)}
```
Aktuell (Zeile 642):
```css
[data-kipp].kippt{transition:opacity .8s var(--ease-out),translate .8s var(--ease-out),transform .1s linear}
```

## Ziel
Die Verzögerung gilt nur für `opacity` und `translate` (das Einblenden), nie für `transform` (das Kippen).

## Schritte
1. Zeile 165: `transition-delay:var(--d,0ms)` ersetzen durch `transition-delay:var(--d,0ms),var(--d,0ms),0ms`.
2. Zeile 642: am Ende der Regel ergänzen: `;transition-delay:var(--d,0ms),var(--d,0ms),0ms`.
   (Reihenfolge der Werte = Reihenfolge der Eigenschaften in `transition`: opacity, translate, transform.)

## Grenzen
Nichts anderes ändern. Keine Dauer, keine Kurve anfassen. `--ease-out` ist `cubic-bezier(0.23,1,0.32,1)` und bleibt.

## Prüfen
- Startseite am PC öffnen, zu "Auf einen Blick" scrollen, über die 4. Kachel fahren: Sie muss sofort kippen, ohne Nachziehen.
- Einblenden beim ersten Scrollen muss weiterhin gestaffelt sein (Kacheln kommen nacheinander).
- Gefühlsprobe: In den Entwicklerwerkzeugen unter "Animations" auf 25 % verlangsamen. Das Kippen startet im selben Bild wie die Mausbewegung.
