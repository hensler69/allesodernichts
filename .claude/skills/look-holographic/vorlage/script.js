/* Look Holographic: das JavaScript ergänzt nur Effekte. Ohne JS bleibt die Seite vollständig lesbar. */
(function () {
  'use strict';

  var fein = window.matchMedia('(hover: hover) and (pointer: fine)');
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* 1. Der Glanzpunkt folgt dem Zeiger. Geschrieben wird nur auf das eine Element unter dem Zeiger,
        nie auf html oder body, damit der Browser nicht die ganze Seite neu berechnet. */
  function folienFolgen() {
    if (!fein.matches || ruhig.matches) return;
    var karten = document.querySelectorAll('[data-folie]');
    Array.prototype.forEach.call(karten, function (el) {
      var frame = 0, x = 50, y = 50;
      function setzen() {
        frame = 0;
        el.style.setProperty('--mx', x.toFixed(1) + '%');
        el.style.setProperty('--my', y.toFixed(1) + '%');
      }
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = el.getBoundingClientRect();
        x = Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100));
        y = Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100));
        if (!frame) frame = requestAnimationFrame(setzen);
      }, { passive: true });
      el.addEventListener('pointerleave', function () {
        if (frame) { cancelAnimationFrame(frame); frame = 0; }
        el.style.removeProperty('--mx');
        el.style.removeProperty('--my');
      });
    });
  }

  /* 2. Das Hero-Gerät: Glanz folgt dem Zeiger über den ganzen Hero-Bereich, geschrieben nur auf die Bühne. */
  function buehneFolgen() {
    var hero = document.querySelector('[data-hero]');
    var buehne = document.querySelector('[data-buehne]');
    if (!hero || !buehne || !fein.matches || ruhig.matches) return;
    var frame = 0, sx = 0.34, sy = 0.28;
    function setzen() {
      frame = 0;
      buehne.style.setProperty('--sx', sx.toFixed(3));
      buehne.style.setProperty('--sy', sy.toFixed(3));
    }
    hero.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = buehne.getBoundingClientRect();
      sx = Math.max(-0.1, Math.min(1.1, (e.clientX - r.left) / r.width));
      sy = Math.max(-0.1, Math.min(1.1, (e.clientY - r.top) / r.height));
      if (!frame) frame = requestAnimationFrame(setzen);
    }, { passive: true });
    hero.addEventListener('pointerleave', function () {
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      buehne.style.removeProperty('--sx');
      buehne.style.removeProperty('--sy');
    });
  }

  /* 3. Das langsame Driften am Handy läuft nur, wenn die Bühne im Bild ist und der Tab sichtbar. */
  function driftSteuern() {
    var buehne = document.querySelector('[data-buehne]');
    if (!buehne) return;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (eintraege) {
        buehne.classList.toggle('im-bild', eintraege[0].isIntersecting);
      }, { threshold: 0.1 }).observe(buehne);
    }
    document.addEventListener('visibilitychange', function () {
      buehne.classList.toggle('verdeckt', document.hidden);
    });
  }

  /* 4. Demo: Der Kaufknopf zählt den Warenkorb hoch. */
  function kaufZaehler() {
    var knopf = document.querySelector('.cta');
    var zahl = document.querySelector('.korb__zahl');
    if (!knopf || !zahl) return;
    var n = 0;
    knopf.addEventListener('click', function () {
      n += 1;
      zahl.textContent = String(n);
      if (ruhig.matches) return;
      zahl.classList.remove('hupf');
      void zahl.offsetWidth;
      zahl.classList.add('hupf');
    });
  }

  folienFolgen();
  buehneFolgen();
  driftSteuern();
  kaufZaehler();
})();
