/* Kinetic Type: das Skript ergänzt nur Effekte. Ohne JS steht die Seite komplett lesbar da.
   Scroll und Zeiger setzen nur drei CSS-Variablen (--w, --b, --ph) auf dem Titel-Container. */
(function () {
  var titel = document.querySelector('.titel');
  var ruhe = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fein = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* Warenkorb-Zähler */
  var knopf = document.querySelector('.cta');
  var zahl = document.getElementById('korb-zahl');
  if (knopf && zahl) {
    var n = 0;
    knopf.addEventListener('click', function (e) {
      n += 1;
      zahl.textContent = String(n);
      /* kurzes Nicken des Zählers: nur bei Maus oder Tipp (detail > 0), nie bei Tastatur, nie bei reduzierter Bewegung */
      if (e.detail > 0 && !ruhe.matches && zahl.animate) {
        zahl.animate([{ transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 200, easing: 'cubic-bezier(.23,1,.32,1)' });
      }
    });
  }

  /* Laufbänder anhalten */
  var halt = document.querySelector('.halt');
  var baender = document.getElementById('baender');
  if (halt && baender && !ruhe.matches) {
    halt.hidden = false;
    halt.addEventListener('click', function () {
      var an = halt.getAttribute('aria-pressed') !== 'true';
      halt.setAttribute('aria-pressed', String(an));
      baender.classList.toggle('baender--halt', an);
    });
  }

  if (!titel) return;
  var hero = document.getElementById('ueberblick');
  var istSichtbar = true;
  var laeuft = false;
  var letzte = 0;   /* Zeitpunkt des letzten Schreibens: höchstens alle 30 ms */
  var jetztX = 0.5, zielX = 0.5;   /* Zeiger-X von 0 bis 1, Mitte als Start (passt zu den CSS-Startwerten) */
  var spaeter = 'IntersectionObserver' in window;

  function schreiben() {
    laeuft = false;
    if (ruhe.matches || document.hidden || !istSichtbar) return;
    var jetzt = performance.now();
    if (jetzt - letzte < 30) { anstossen(); return; }
    letzte = jetzt;
    var y = window.scrollY || 0;
    var p = Math.min(1, y / (hero.offsetHeight * 0.9));
    jetztX += (zielX - jetztX) * 0.16;
    if (Math.abs(zielX - jetztX) < 0.002) jetztX = zielX;
    /* Scroll: Grundgewicht 640 bis 500 und Wellenphase. Zeiger: Welle wandert, Breite plus minus 3 Punkte */
    titel.style.setProperty('--w', (640 - 140 * p).toFixed(1));
    titel.style.setProperty('--ph', (2.5 + y * 0.011 + (jetztX - 0.5) * 5).toFixed(3));
    titel.style.setProperty('--b', ((jetztX - 0.5) * 6).toFixed(2));
    if (jetztX !== zielX) anstossen();
  }
  function anstossen() {
    if (laeuft) return;
    laeuft = true;
    window.requestAnimationFrame(schreiben);
  }

  window.addEventListener('scroll', anstossen, { passive: true });
  if (fein.matches) {
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      zielX = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
      anstossen();
    }, { passive: true });
  }
  if (spaeter) {
    new IntersectionObserver(function (eintraege) {
      istSichtbar = eintraege[0].isIntersecting;
      if (istSichtbar) anstossen();
    }).observe(titel);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) anstossen(); });
})();
