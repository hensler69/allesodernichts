/* Look Bauhaus: ruhiges Einblenden und Warenkorb-Zähler (nur Demo). Ohne JavaScript bleibt alles lesbar. */
(function () {
  'use strict';
  var els = document.querySelectorAll('.zeig');
  var reduziert = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduziert) {
    Array.prototype.forEach.call(els, function (e) { e.classList.add('ist'); });
  } else {
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('ist'); io.unobserve(x.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(els, function (e) { io.observe(e); });
  }

  var zaehler = document.querySelector('[data-zaehler]');
  var knopf = document.querySelector('[data-kaufen]');
  if (zaehler && knopf) {
    knopf.addEventListener('click', function () {
      zaehler.textContent = String((parseInt(zaehler.textContent, 10) || 0) + 1);
      zaehler.classList.add('stoss');
      setTimeout(function () { zaehler.classList.remove('stoss'); }, 140);
    });
  }
})();
