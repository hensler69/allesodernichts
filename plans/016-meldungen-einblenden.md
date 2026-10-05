# 016: Erfolgs- und Fehlermeldungen von Formularen sanft einblenden

- Stand: Commit `adc9dc8` · Art: Gelegenheit (harte Wechsel abfedern, gelegentlich) · Status: ERLEDIGT
- Datei: `shops/helia/assets/script.js` (Meldungen werden an mehreren Stellen gesetzt: etwa Zeilen 874, 896, 1009 sowie in `senden()`)

## Heute
Die Meldungen unter Newsletter, Bewertung, Widerruf, Gutschein und Kasse erscheinen schlagartig und werden leicht übersehen.

## Ziel
Jede neue Meldung: `opacity 0` und `translateY(4px)` zu ruhig, 180 ms, `cubic-bezier(0.23,1,0.32,1)`.
Fehlermeldungen zusätzlich mit kleinem seitlichem Zucken: `translate` 0, -3px, 3px, -3px, 3px, 0 über 240 ms, `ease-in-out`.
Bei "weniger Bewegung": nur Aufblenden, kein Zucken.

## Schritte
Statt jede Stelle einzeln zu ändern, einmal zentral nach den Formularen einfügen (beobachtet Textänderungen):
```js
$$('.meldung').forEach((m) => new MutationObserver(() => {
  if (!m.textContent.trim() || !m.animate) return;
  const kurve = 'cubic-bezier(0.23, 1, 0.32, 1)';
  m.animate(ruhig ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 180, easing: kurve });
  if (!ruhig && m.classList.contains('fehler')) m.animate([{ translate: '0' }, { translate: '-3px' }, { translate: '3px' }, { translate: '-3px' }, { translate: '3px' }, { translate: '0' }], { duration: 240, easing: 'ease-in-out' });
}).observe(m, { childList: true, characterData: true, subtree: true }));
```

## Prüfen
Newsletter ohne Häkchen absenden: Die Fehlermeldung erscheint mit kurzem Zucken. Gutschein richtig einlösen: Die Erfolgsmeldung blendet sanft ein.
