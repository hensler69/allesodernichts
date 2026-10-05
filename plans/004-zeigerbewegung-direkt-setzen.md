# 004: Zeigerbewegung direkt am Element setzen statt über vererbte Variablen

- Stand: Commit `79a6061` · Stärke: MITTEL · Bereich: Leistung · Status: OFFEN
- Dateien: `shops/helia/assets/script.js` (Zeilen 324–328 und 457–474), `shops/helia/assets/style.css` (Zeilen 202–207 und 640–645)

## Problem
CSS-Variablen vererben sich an alle Kinder. Werden sie bei jeder Mausbewegung an einem Container gesetzt, berechnet der Browser
den ganzen Unterbaum neu.
- Kopfbereich: `held.style.setProperty('--px', ...)` und `--py` am ganzen `<section class="held">` (Text, 3D-Lampe mit vielen Flächen),
  obwohl nur die drei `.held__chips .hinweis-chip` sie nutzen.
- Kacheln `[data-kipp]`: `--kx, --ky, --mx, --my` an der Kachel, gebraucht nur für deren eigenes `transform` und den Lichtreflex `::after`.

## Ziel
- Kärtchen: `style.translate` direkt an jedem Kärtchen setzen.
- Kacheln: `style.transform` direkt an der Kachel setzen. Den Lichtreflex als eigenes Kind-Element bauen, das per `transform` verschoben wird.

## Schritte
1. style.css Zeile 203: aus `.held__chips .hinweis-chip{...translate:calc(var(--px,0) * var(--t,20px)) calc(var(--py,0) * var(--t,20px));...}`
   die `translate:`-Deklaration entfernen (die `transition:translate .6s var(--ease-out)` bleibt). Die `--t`-Werte der drei Kärtchen
   (34px, 22px, 44px) bleiben als Tiefenfaktor stehen.
2. script.js Zeilen 324–328 ersetzen:
   ```js
   const held = ;
   if (held && feinZeiger && !ruhig) {
     const karten = $$('.held__chips .hinweis-chip').map((el) => ({ el, t: parseFloat(getComputedStyle(el).getPropertyValue('--t')) || 20 }));
     held.addEventListener('pointermove', (e) => {
       const px = e.clientX / innerWidth - 0.5, py = e.clientY / innerHeight - 0.5;
       karten.forEach((k) => { k.el.style.translate = `${(px * k.t).toFixed(1)}px ${(py * k.t).toFixed(1)}px`; });
     });
     held.addEventListener('pointerleave', () => karten.forEach((k) => { k.el.style.translate = ''; }));
   }
   ```
3. style.css Zeilen 640–645 (`[data-kipp]` und `::after`) ersetzen durch:
   ```css
   [data-kipp]{position:relative;overflow:hidden}
   [data-kipp].kippt{transition:opacity .8s var(--ease-out),translate .8s var(--ease-out),transform .1s linear;transition-delay:var(--d,0ms),var(--d,0ms),0ms}
   .kipp-glanz{position:absolute;left:-210px;top:-210px;width:420px;height:420px;border-radius:50%;pointer-events:none;opacity:0;
     background:radial-gradient(closest-side,rgba(255,255,255,.08),transparent);transition:opacity .3s ease}
   [data-kipp].kippt .kipp-glanz{opacity:1}
   ```
   (Falls Plan 001 schon umgesetzt ist, ist die `transition-delay` dort schon richtig.)
4. script.js Zeilen 457–474 ersetzen:
   ```js
   $$('[data-kipp]').forEach((k) => {
     const glanz = document.createElement('span');
     glanz.className = 'kipp-glanz';
     glanz.setAttribute('aria-hidden', 'true');
     k.appendChild(glanz);
     k.addEventListener('pointermove', (e) => {
       const r = k.getBoundingClientRect();
       const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
       k.classList.add('kippt');
       k.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * 7).toFixed(2)}deg) rotateY(${((x - 0.5) * 7).toFixed(2)}deg)`;
       glanz.style.transform = `translate(${(x * r.width).toFixed(0)}px, ${(y * r.height).toFixed(0)}px)`;
     });
     k.addEventListener('pointerleave', () => { k.classList.remove('kippt'); k.style.transform = ''; });
   });
   ```
5. In style.css im Block `@media (prefers-reduced-motion:reduce)` bleibt `[data-kipp]{transform:none!important}` bestehen.

## Grenzen
Kippwinkel (7 Grad), Dauer und Kurven nicht ändern. Kein anderes Element bekommt `overflow:hidden`.

## Prüfen
- Über Kacheln fahren: Kippen und Lichtreflex wie vorher. Kopfbereich: Kärtchen wandern je nach Tiefe unterschiedlich weit.
- Performance-Aufnahme (Chrome): Bei Mausbewegung über dem Kopfbereich nur noch kleine "Recalculate Style"-Einträge (3 Elemente).
