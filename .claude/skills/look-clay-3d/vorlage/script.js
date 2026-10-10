/* Clay 3D: JS ergänzt nur Effekte. Ohne JS ist die Seite vollständig lesbar. Kein requestAnimationFrame nötig. */
(function () {
  'use strict';
  var wurzel = document.documentElement;

  // Einblenden beim Scrollen
  var zeigen = document.querySelectorAll('.zeig');
  if ('IntersectionObserver' in window) {
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('da'); beobachter.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    zeigen.forEach(function (el) { beobachter.observe(el); });
  } else {
    zeigen.forEach(function (el) { el.classList.add('da'); });
  }

  // Schwebende Knetfigur pausiert, wenn sie nicht im Bild ist oder der Tab verdeckt ist
  var szenen = document.querySelectorAll('[data-pause]');
  if ('IntersectionObserver' in window) {
    var wacher = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) { e.target.classList.toggle('ruht', !e.isIntersecting); });
    }, { rootMargin: '80px' });
    szenen.forEach(function (s) { wacher.observe(s); });
  }
  document.addEventListener('visibilitychange', function () {
    wurzel.classList.toggle('versteckt', document.hidden);
  });

  // Kaufknopf zählt im Beispiel nur den Warenkorb-Zähler hoch und lässt ihn kurz anschwellen (Transition, unterbrechbar)
  var zaehler = document.querySelector('[data-zaehler]');
  var knopf = document.querySelector('[data-kaufen]');
  var platschZeit = 0;
  if (zaehler && knopf) {
    knopf.addEventListener('click', function () {
      zaehler.textContent = String((parseInt(zaehler.textContent, 10) || 0) + 1);
      zaehler.classList.add('hoch');
      clearTimeout(platschZeit);
      platschZeit = setTimeout(function () { zaehler.classList.remove('hoch'); }, 90);
    });
  }
})();
