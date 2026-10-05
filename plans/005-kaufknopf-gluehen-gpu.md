# 005: Glühen des Kaufknopfs ohne ständiges Neuzeichnen

- Stand: Commit `79a6061` · Stärke: MITTEL · Bereich: Leistung · Status: ERLEDIGT
- Datei: `shops/helia/assets/style.css` (Zeilen 153–154 und Block `prefers-reduced-motion`)

## Problem
```css
.knopf--gross{font-size:1.08rem;padding:1.1rem 2rem;animation:knopf-glut 7s ease-in-out infinite}
@keyframes knopf-glut{50%{box-shadow:0 0 0 6px rgba(255,106,61,.12),0 16px 44px -8px rgba(255,106,61,.85)}}
```
`box-shadow` zu animieren heißt, in jedem Bild neu zu zeichnen, und zwar endlos (zwei Knöpfe auf der Startseite).

## Ziel
Gleiches Aussehen, aber nur `opacity` einer eigenen Schicht wird animiert (läuft auf der Grafikkarte).

## Schritte
1. Die beiden Zeilen ersetzen durch:
   ```css
   .knopf--gross{font-size:1.08rem;padding:1.1rem 2rem;position:relative;isolation:isolate}
   .knopf--gross::after{content:"";position:absolute;inset:0;border-radius:inherit;z-index:-1;pointer-events:none;opacity:0;
     box-shadow:0 0 0 6px rgba(255,106,61,.12),0 16px 44px -8px rgba(255,106,61,.85);animation:knopf-glut 7s ease-in-out infinite}
   @keyframes knopf-glut{50%{opacity:1}}
   ```
2. Im Block `@media (prefers-reduced-motion:reduce)` die vorhandene Zeile `.knopf--gross{animation:none}` ändern zu
   `.knopf--gross::after{animation:none}`.

## Grenzen
Farbe, Takt (7 s) und Kurve (`ease-in-out`, zulässig für eine ruhige Dauerschleife) bleiben. `.knopf` selbst nicht ändern.

## Prüfen
- Knopf glüht im selben Rhythmus wie vorher. Text und Symbol im Knopf bleiben scharf und über dem Glühen.
- Chrome, Entwicklerwerkzeuge, "Rendering" und dort "Paint flashing": Der Knopf blinkt nicht mehr dauerhaft grün.
