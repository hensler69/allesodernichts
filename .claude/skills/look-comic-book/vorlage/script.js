/* Comic Book: JS ergänzt nur Effekte. Ohne JS ist die Seite vollständig lesbar. Kein requestAnimationFrame nötig. */
(function () {
  'use strict';

  // Einblenden beim Scrollen und einmaliges Aufpoppen der Burst-Sterne (CSS entscheidet über die Bewegung)
  var ziele = document.querySelectorAll('.zeig, .burst');
  if ('IntersectionObserver' in window) {
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('da'); beobachter.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    ziele.forEach(function (el) { beobachter.observe(el); });
  } else {
    ziele.forEach(function (el) { el.classList.add('da'); });
  }

  // Kaufknopf zählt im Beispiel nur den Warenkorb-Zähler hoch
  var zaehler = document.querySelector('[data-zaehler]');
  var knopf = document.querySelector('[data-kaufen]');
  var zeit = 0;
  if (zaehler && knopf) {
    knopf.addEventListener('click', function () {
      zaehler.textContent = String((parseInt(zaehler.textContent, 10) || 0) + 1);
      zaehler.classList.add('hoch');
      clearTimeout(zeit);
      zeit = setTimeout(function () { zaehler.classList.remove('hoch'); }, 90);
    });
  }
})();
