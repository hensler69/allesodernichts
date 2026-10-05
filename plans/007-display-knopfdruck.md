# 007: Sanfterer Knopfdruck auf dem Display

- Stand: Commit `79a6061` · Stärke: NIEDRIG · Bereich: Gefühl · Status: OFFEN
- Datei: `shops/helia/assets/style.css` (Zeile 274)

## Problem
`.display__symbole button:active{transform:scale(.94)}` ist deutlich stärker als bei allen anderen Knöpfen (0,96 bis 0,97) und wirkt grob.

## Schritt
Zeile 274 ändern zu `.display__symbole button:active{transform:scale(.97)}`.

## Prüfen
Display-Symbole anklicken: kurzes, feines Nachgeben, gleich wie beim Kaufknopf.
