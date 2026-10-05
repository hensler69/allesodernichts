# 013: Sende-Zustand für Formularknöpfe

- Stand: Commit `adc9dc8` · Art: Gelegenheit (Rückmeldung, gelegentlich) · Status: ERLEDIGT
- Dateien: `shops/helia/assets/script.js` (Funktion `senden()`, Zeile 594 ff.), `shops/helia/assets/style.css`

## Heute
`knopf.disabled = true` macht den Knopf nur blasser (`.knopf[disabled]{opacity:.55}`). Bei langsamer Verbindung wirkt es, als passiere nichts.

## Ziel
Dauert die Antwort länger als 150 ms, zeigt der Knopf einen kleinen drehenden Ring und den Text "Wird gesendet". Danach kommt der ursprüngliche Text zurück.
Ring: `rotate` 0 bis 360 Grad, 700 ms, `linear`, endlos. Bei "weniger Bewegung" kein Ring, nur der Text.

## Schritte
1. In `senden()` nach `knopf.disabled = true;`:
   ```js
   const text = knopf.textContent;
   const uhr = setTimeout(() => { knopf.classList.add('sendet'); knopf.setAttribute('aria-busy', 'true'); knopf.textContent = 'Wird gesendet'; }, 150);
   ```
   Im `finally` vor `knopf.disabled = false;`:
   ```js
   clearTimeout(uhr);
   if (knopf.classList.contains('sendet')) { knopf.classList.remove('sendet'); knopf.removeAttribute('aria-busy'); knopf.textContent = text; }
   ```
2. CSS ergänzen:
   ```css
   .sendet::before{content:"";width:1em;height:1em;border-radius:50%;border:2px solid currentColor;border-right-color:transparent;animation:drehen .7s linear infinite}
   .knopf.sendet,.leise-knopf.sendet{opacity:.85}
   @keyframes drehen{to{transform:rotate(360deg)}}
   @media (prefers-reduced-motion:reduce){.sendet::before{display:none}}
   ```

## Prüfen
In den Entwicklerwerkzeugen das Netz auf "Slow 3G" drosseln und eine Bestellung absenden: Ring und "Wird gesendet" erscheinen. Bei schneller Antwort flackert nichts.
