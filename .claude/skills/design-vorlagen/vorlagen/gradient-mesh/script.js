/* Gradient-Mesh-Demo: kleine Zusätze. Ohne dieses Skript bleibt die Seite voll lesbar (das Netz steht dann still).
   - prüft, ob @property funktioniert, und schaltet erst dann die Netz-Bewegung ein
   - pausiert Netz und fallende Stücke, wenn der Hero nicht im Bild oder der Tab verdeckt ist
   - Menü am Handy, aktueller Abschnitt in der Navigation, Einblenden beim Scrollen
   - Kaufknopf zählt den Warenkorb hoch (Demo) */
(function () {
  'use strict';
  var wenigBewegung = window.matchMedia('(prefers-reduced-motion: reduce)');
  var wurzel = document.documentElement;

  /* ---------- Netz: Bewegung nur, wenn typisierte Eigenschaften (@property) verfügbar sind ----------
     Ohne diese Unterstützung würden die Mittelpunkte nicht weich, sondern sprunghaft wechseln. Darum bleibt das Netz dann ruhig. */
  var kannEigenschaften = !!(window.CSS && typeof CSS.registerProperty === 'function');
  if (kannEigenschaften && !wenigBewegung.matches) wurzel.classList.add('netz-an');
  wenigBewegung.addEventListener && wenigBewegung.addEventListener('change', function () {
    wurzel.classList.toggle('netz-an', kannEigenschaften && !wenigBewegung.matches);
  });

  /* ---------- Pausieren: Hero außerhalb des Bildes oder Tab verdeckt ---------- */
  var tafel = document.querySelector('[data-netz-huelle]');
  var imBild = true;
  var setzePause = function () {
    if (tafel) tafel.classList.toggle('ruht', document.hidden || !imBild);
  };
  if (tafel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (eintraege) {
      imBild = eintraege[eintraege.length - 1].isIntersecting;
      setzePause();
    }, { rootMargin: '80px 0px' }).observe(tafel);
  }
  document.addEventListener('visibilitychange', setzePause);

  /* ---------- Menü am Handy ---------- */
  var knopf = document.querySelector('.menue-knopf');
  var menue = document.getElementById('hauptmenue');
  if (knopf && menue) {
    var zu = function () {
      menue.classList.remove('ist-offen');
      knopf.setAttribute('aria-expanded', 'false');
    };
    knopf.addEventListener('click', function () {
      var offen = menue.classList.toggle('ist-offen');
      knopf.setAttribute('aria-expanded', String(offen));
    });
    menue.addEventListener('click', function (e) { if (e.target.closest('a')) zu(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menue.classList.contains('ist-offen')) { zu(); knopf.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (menue.classList.contains('ist-offen') && !e.target.closest('.kopf')) zu();
    });
  }

  /* ---------- Aktueller Abschnitt in der Navigation ---------- */
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var abschnitte = [];
    navLinks.forEach(function (a) {
      var ziel = document.querySelector(a.getAttribute('href'));
      if (ziel) abschnitte.push({ a: a, ziel: ziel });
    });
    var spion = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        abschnitte.forEach(function (x) {
          if (x.ziel === e.target) x.a.setAttribute('aria-current', 'true');
          else x.a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    abschnitte.forEach(function (x) { spion.observe(x.ziel); });
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  var zeigen = document.querySelectorAll('.zeigen');
  if ('IntersectionObserver' in window && !wenigBewegung.matches) {
    var beob = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('ist-da'); beob.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    zeigen.forEach(function (el) { beob.observe(el); });
  } else {
    zeigen.forEach(function (el) { el.classList.add('ist-da'); });
  }

  /* ---------- Kaufknopf (Demo) ---------- */
  var kauf = document.querySelector('[data-kaufen]');
  var zaehler = document.querySelector('[data-zaehler]');
  var status = document.querySelector('[data-status]');
  if (kauf && zaehler) {
    var n = 0;
    kauf.addEventListener('click', function () {
      n += 1;
      zaehler.textContent = String(n);
      if (status) status.textContent = 'Im Warenkorb: ' + n + ' Artikel';
      if (!wenigBewegung.matches && zaehler.animate) {
        zaehler.animate([{ transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 200, easing: 'cubic-bezier(.23,1,.32,1)' });
      }
    });
  }
})();
