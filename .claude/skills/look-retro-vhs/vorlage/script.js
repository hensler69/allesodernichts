/* Retro VHS: das Skript ergänzt nur Kleinigkeiten. Ohne JS bleibt die Seite vollständig lesbar. */
(function () {
  var ruhe = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* 1. Bandzähler: zählt langsam (eine Sekunde pro Schritt), nur sichtbar, nur im Vordergrund, nie bei reduzierter Bewegung */
  var zaehler = document.getElementById('zaehler');
  var szene = document.querySelector('.szene');
  if (zaehler) {
    var sek = 42, timer = null, sichtbar = true;
    var zwei = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function () {
      sek += 1;
      zaehler.textContent = '00:' + zwei(Math.floor(sek / 60) % 60) + ':' + zwei(sek % 60);
    };
    var stopp = function () { if (timer) { clearInterval(timer); timer = null; } };
    var los = function () { if (!timer && !ruhe.matches && !document.hidden && sichtbar) timer = setInterval(tick, 1000); };
    document.addEventListener('visibilitychange', function () { if (document.hidden) stopp(); else los(); });
    if (ruhe.addEventListener) ruhe.addEventListener('change', function () { if (ruhe.matches) stopp(); else los(); });
    if ('IntersectionObserver' in window && szene) {
      new IntersectionObserver(function (e) { sichtbar = e[0].isIntersecting; if (sichtbar) los(); else stopp(); }).observe(szene);
    }
    los();
  }

  /* 2. Störstreifen: nach jedem Durchlauf eine neue Höhe (die Bewegung selbst macht das CSS) */
  var st = document.querySelector('.stoerung');
  if (st) {
    st.addEventListener('animationiteration', function () {
      st.style.setProperty('--stoer-y', (12 + Math.floor(Math.random() * 66)) + 'vh');
    });
  }

  /* 3. Warenkorb-Zähler (Demo) */
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
