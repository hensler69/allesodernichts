# 010: Häufige Fragen weich öffnen und schließen

- Stand: Commit `79a6061` · Stärke: Ergänzung · Bereich: Verpasste Gelegenheit · Status: OFFEN
- Datei: `shops/helia/assets/style.css` (Abschnitt "Fragen", Zeilen etwa 360–373)

## Problem
`<details class="frage">` öffnet mit einer kleinen Einblendung (`.frage[open] .frage__antwort{animation:wechsel ...}`), schließt aber schlagartig.

## Ziel
In Browsern, die `::details-content` können (Chrome und Edge ab 131), klappt die Antwort in 250 ms auf und zu.
Kurve `cubic-bezier(0.23, 1, 0.32, 1)`. Andere Browser verhalten sich wie bisher. Bei "weniger Bewegung" ohne Höhenanimation.

## Schritte
Am Ende des Fragen-Abschnitts ergänzen:
```css
@supports selector(::details-content){
  .frage{interpolate-size:allow-keywords}
  .frage::details-content{block-size:0;overflow:hidden;transition:block-size .25s var(--ease-out),content-visibility .25s allow-discrete}
  .frage[open]::details-content{block-size:auto}
}
@media (prefers-reduced-motion:reduce){
  .frage::details-content{transition:none}
}
```
Die bestehende Einblend-Animation der Antwort bleibt.

## Prüfen
Chrome: Frage öffnen und wieder schließen, beides gleitet. Firefox und Safari: öffnen und schließen wie bisher, kein Fehler.
Mit der Tastatur (Tab, Enter) bedienbar wie vorher.
