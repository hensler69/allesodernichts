/* Glassmorphism-Demo: kleine Zusätze. Ohne dieses Skript bleibt die Seite voll lesbar.
   - Menü am Handy
   - Einblenden beim Scrollen (IntersectionObserver)
   - Orbs anhalten, wenn sie nicht im Bild sind oder der Tab verdeckt ist
   - Glanz folgt dem Zeiger auf der Hero-Karte (nur Maus, nur ohne reduzierte Bewegung)
   - Kaufknopf zählt den Warenkorb hoch (Demo) */
(function () {
  'use strict';
  var wenigBewegung = window.matchMedia('(prefers-reduced-motion: reduce)');
  var wurzel = document.documentElement;

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
    var setzeAktuell = function (aktiv) {
      abschnitte.forEach(function (x) {
        if (x.a === aktiv) x.a.setAttribute('aria-current', 'true');
        else x.a.removeAttribute('aria-current');
      });
    };
    var spion = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        abschnitte.forEach(function (x) { if (x.ziel === e.target) setzeAktuell(x.a); });
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
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    zeigen.forEach(function (el) { beob.observe(el); });
  } else {
    zeigen.forEach(function (el) { el.classList.add('ist-da'); });
  }

  /* ---------- Orbs nur bewegen, wenn sichtbar ---------- */
  var orbs = document.querySelectorAll('.orb');
  if ('IntersectionObserver' in window) {
    var orbBeob = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) { e.target.classList.toggle('ist-aus', !e.isIntersecting); });
    }, { rootMargin: '200px 0px' });
    orbs.forEach(function (o) { orbBeob.observe(o); });
  }
  document.addEventListener('visibilitychange', function () {
    orbs.forEach(function (o) {
      if (document.hidden) o.classList.add('ist-aus');
      else o.classList.remove('ist-aus');
    });
  });

  /* ---------- Glanz folgt dem Zeiger (weich nachgezogen, nur transform) ---------- */
  var karte = document.querySelector('[data-glanz]');
  var licht = karte && karte.querySelector('.glanz i');
  if (licht && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !wenigBewegung.matches) {
    var zielX = 220, zielY = 130, x = zielX, y = zielY, laeuft = false;
    var schritt = function () {
      x += (zielX - x) * 0.14;
      y += (zielY - y) * 0.14;
      licht.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      // Die Schleife endet, sobald das Licht angekommen ist oder der Tab verdeckt wird
      if (!document.hidden && (Math.abs(zielX - x) > 0.4 || Math.abs(zielY - y) > 0.4)) requestAnimationFrame(schritt);
      else laeuft = false;
    };
    karte.addEventListener('pointermove', function (e) {
      var r = karte.getBoundingClientRect();
      zielX = e.clientX - r.left; zielY = e.clientY - r.top;
      if (!laeuft) { laeuft = true; requestAnimationFrame(schritt); }
    });
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
