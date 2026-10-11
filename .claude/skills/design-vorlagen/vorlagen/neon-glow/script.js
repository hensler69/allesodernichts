/* Neon Glow: das Skript ergänzt nur eine Kleinigkeit. Ohne JS bleibt die Seite vollständig lesbar. */
(function () {
  var knopf = document.querySelector('.cta');
  var zahl = document.getElementById('korb-zahl');
  if (!knopf || !zahl) return;
  var ruhe = window.matchMedia('(prefers-reduced-motion: reduce)');
  var n = 0;
  knopf.addEventListener('click', function (e) {
    n += 1;
    zahl.textContent = String(n);
    /* kurzes Aufleuchten des Zählers: nur bei Mausklick oder Tipp (detail > 0), nie bei Tastatur, nie bei reduzierter Bewegung */
    if (e.detail > 0 && !ruhe.matches && zahl.animate) {
      zahl.animate([{ transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 200, easing: 'cubic-bezier(.23,1,.32,1)' });
    }
  });
})();
