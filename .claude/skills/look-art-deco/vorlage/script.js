/* Art Deco: das Skript ergänzt nur Kleinigkeiten. Ohne JS bleibt die Seite vollständig lesbar. */
(function () {
  var ruhe = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* 1. Funkeln der Strahlen pausiert, wenn das Bild nicht zu sehen ist oder der Tab verdeckt ist */
  var szene = document.querySelector('.szene');
  if (szene) {
    var sichtbar = true;
    var setze = function () { szene.classList.toggle('ruht', document.hidden || !sichtbar); };
    document.addEventListener('visibilitychange', setze);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { sichtbar = e[0].isIntersecting; setze(); }).observe(szene);
    }
  }

  /* 2. Warenkorb-Zähler (Demo) */
  var knopf = document.querySelector('.cta');
  var zahl = document.getElementById('korb-zahl');
  if (knopf && zahl) {
    var n = 0;
    knopf.addEventListener('click', function (e) {
      n += 1; zahl.textContent = String(n);
      /* kleines Zucken des Zählers: nur bei Maus oder Tipp (detail > 0), nie bei Tastatur, nie bei reduzierter Bewegung */
      if (e.detail > 0 && !ruhe.matches && zahl.animate) {
        zahl.animate([{ transform: 'translateY(-4px)', opacity: .4 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 180, easing: 'cubic-bezier(.23,1,.32,1)' });
      }
    });
  }
})();
