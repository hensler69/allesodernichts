# 008: Entfernte Artikel im Warenkorb weich ausblenden

- Stand: Commit `79a6061` · Stärke: Ergänzung · Bereich: Verpasste Gelegenheit · Status: OFFEN
- Datei: `shops/helia/assets/script.js` (Funktion `korbZeigen()`, Klick-Handler im `li`, etwa Zeilen 72–76)

## Problem
Beim Klick auf "Entfernen" oder wenn die Menge auf 0 fällt, wird die Liste neu aufgebaut und der Artikel verschwindet schlagartig.

## Ziel
Artikel gleitet 12 px nach rechts und blendet aus (180 ms), dann klappt seine Höhe zusammen (160 ms), dann wird der Korb neu gezeichnet.
Kurve: `cubic-bezier(0.23, 1, 0.32, 1)` (ist im Projekt als `--ease-out` definiert). Bei "weniger Bewegung": sofort entfernen wie bisher.

## Schritte
1. Im Klick-Handler des `li` vor dem Setzen auf 0 eine Hilfsfunktion nutzen:
   ```js
   async function wegAnimieren(li) {
     if (ruhig || !li.animate) return;
     const kurve = 'cubic-bezier(0.23, 1, 0.32, 1)';
     await li.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(12px)' }], { duration: 180, easing: kurve, fill: 'forwards' }).finished;
     await li.animate([{ height: li.offsetHeight + 'px', marginBottom: '0px' }, { height: '0px', marginBottom: '-16px' }], { duration: 160, easing: kurve, fill: 'forwards' }).finished;
   }
   ```
   (Die Liste hat `gap:var(--s2)` = etwa 10 px. `marginBottom` gleicht die Lücke aus. Wenn es springt, Wert an den echten Abstand anpassen.)
2. Handler ändern:
   ```js
   li.addEventListener('click', async (e) => {
     const s = e.target.closest('[data-schritt]');
     const weg = e.target.closest('.entfernen') || (s && korb[id] + Number(s.dataset.schritt) <= 0);
     if (weg) { await wegAnimieren(li); korb[id] = 0; korbSpeichern(); return; }
     if (s) { korb[id] = klemmen(korb[id] + Number(s.dataset.schritt), 0, MAX_MENGE); korbSpeichern(); }
   });
   ```
   Wichtig: Während der Animation darf ein zweiter Klick nichts doppelt auslösen. Einfach `li.style.pointerEvents = 'none'` am Anfang von `wegAnimieren` setzen.

## Grenzen
Nur das Entfernen animieren, nicht das Hinzufügen und nicht das Öffnen des Korbs.

## Prüfen
Zwei Artikelarten in den Korb legen, eine entfernen: Sie gleitet weg, die andere rückt weich nach. "Weniger Bewegung" an: sofortiges Entfernen.
Gefühlsprobe in "Animations" auf 25 %: keine Lücke und kein Sprung am Ende.
