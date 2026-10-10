/* Split-Flap: baut aus jedem Element mit der Klasse "tafel" Kacheln und lässt sie EINMAL blättern.
   - Der Klartext bleibt als unsichtbarer Text im Element (für Screenreader), die Kacheln sind aria-hidden.
   - Ohne JavaScript bleibt der normale Text stehen.
   - Bei "weniger Bewegung" stehen sofort die Zielzeichen da.
   - Kein Dauerblättern: jede Tafel läuft genau einmal, sobald sie sichtbar wird. */
(function () {
  'use strict';

  var REDUZIERT = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var BUCHSTABEN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ZIFFERN = '0123456789';
  var SYMBOLE = '€%/&';
  var SCHMAL = '.,:-/';           // diese Zeichen bekommen halb breite Kacheln
  var SCHRITT_MS = 110;           // Dauer eines Klappens (muss zu --dauer im CSS passen)
  var GESAMT_STAFFEL_MS = 720;    // so lange dauert die Staffelung über eine ganze Tafel
  var tafeln = [];

  function pool(c) {
    if (ZIFFERN.indexOf(c) > -1) return ZIFFERN;
    if (BUCHSTABEN.indexOf(c) > -1) return BUCHSTABEN;
    if (SCHMAL.indexOf(c) > -1) return '.,:-';
    return SYMBOLE;
  }
  function zufall(vorrat, nicht) {
    var c;
    do { c = vorrat.charAt(Math.floor(Math.random() * vorrat.length)); } while (c === nicht && vorrat.length > 1);
    return c;
  }

  function kachel(ziel, ok, ruhig) {
    var z = document.createElement('span');
    z.className = 'z' + (SCHMAL.indexOf(ziel) > -1 ? ' z--schmal' : '') + (ok ? ' z--ok' : '');
    var start = (REDUZIERT || ruhig) ? ziel : zufall(pool(ziel), ziel);
    z.setAttribute('data-ziel', ziel);
    z.setAttribute('data-c', start);
    z.innerHTML = '<span class="h h--o" data-c="' + start + '"></span><span class="h h--u" data-c="' + start + '"></span>';
    return z;
  }

  /* Liest den Inhalt (Text, <br> = neue Zeile, <b> = Statusfarbe) und baut die Kachelzeilen */
  function bau(el) {
    var ruhig = el.hasAttribute('data-ruhig');
    var versteckt = el.getAttribute('aria-hidden') === 'true';
    var zeilen = [[]];
    var klar = [];
    function worte(text, ok) {
      text.split(/\s+/).forEach(function (w) {
        if (w) { zeilen[zeilen.length - 1].push({ w: w, ok: ok }); }
      });
    }
    Array.prototype.forEach.call(el.childNodes, function (n) {
      if (n.nodeType === 3) { worte(n.textContent, false); klar.push(n.textContent); }
      else if (n.nodeName === 'BR') { zeilen.push([]); klar.push(' '); }
      else { worte(n.textContent, n.nodeName === 'B'); klar.push(n.textContent); }
    });
    var text = klar.join('').replace(/\s+/g, ' ').trim();

    var flaeche = document.createElement('span');
    flaeche.className = 'tafel__flaeche';
    flaeche.setAttribute('aria-hidden', 'true');
    var alle = [];
    zeilen.forEach(function (zeile) {
      var zs = document.createElement('span');
      zs.className = 'zeile';
      zeile.forEach(function (wort) {
        var ws = document.createElement('span');
        ws.className = 'wort';
        Array.from(wort.w.toUpperCase()).forEach(function (c) {
          var k = kachel(c, wort.ok, ruhig);
          ws.appendChild(k);
          alle.push(k);
        });
        zs.appendChild(ws);
      });
      flaeche.appendChild(zs);
    });

    el.textContent = '';
    if (!versteckt) {
      var vh = document.createElement('span');
      vh.className = 'vh';
      vh.textContent = text;
      el.appendChild(vh);
    }
    el.appendChild(flaeche);
    el.classList.add('tafel--fertig');
    return { el: el, kacheln: alle, ruhig: ruhig, gestartet: false };
  }

  /* Ein Klappen: oben erscheint das neue Zeichen, das alte Blatt fällt nach vorn, unten liegt dann das neue */
  function klappen(z, neu, verzoegerung, danach) {
    var alt = z.getAttribute('data-c');
    var o = z.children[0], u = z.children[1];
    o.setAttribute('data-c', neu);
    var k = document.createElement('span');
    k.className = 'klapp';
    k.style.animationDelay = verzoegerung + 'ms';
    k.innerHTML = '<span class="h h--o" data-c="' + alt + '"></span><span class="h h--u" data-c="' + neu + '"></span>';
    z.appendChild(k);
    k.addEventListener('animationend', function () {
      u.setAttribute('data-c', neu);
      z.setAttribute('data-c', neu);
      if (k.parentNode) { k.parentNode.removeChild(k); }
      if (danach) { danach(); }
    }, { once: true });
  }

  function endstand(t) {
    t.kacheln.forEach(function (z) {
      var ziel = z.getAttribute('data-ziel');
      z.setAttribute('data-c', ziel);
      z.children[0].setAttribute('data-c', ziel);
      z.children[1].setAttribute('data-c', ziel);
      Array.prototype.slice.call(z.querySelectorAll('.klapp')).forEach(function (k) { k.remove(); });
    });
  }

  function lauf(t) {
    if (t.gestartet) { return; }
    t.gestartet = true;
    if (REDUZIERT || t.ruhig) { endstand(t); return; }
    var n = t.kacheln.length;
    var staffel = Math.min(34, GESAMT_STAFFEL_MS / Math.max(n, 1));
    var laengste = 0;
    t.kacheln.forEach(function (z, i) {
      var ziel = z.getAttribute('data-ziel');
      var vorrat = pool(ziel);
      var anzahl = 2 + (i * 7) % 2;                 // 2 bis 3 Zufallszeichen, also höchstens 4 Klappen je Kachel (440 ms)
      var folge = [];
      var letztes = z.getAttribute('data-c');
      for (var s = 0; s < anzahl; s++) { letztes = zufall(vorrat, letztes); folge.push(letztes); }
      folge.push(ziel);
      laengste = Math.max(laengste, i * staffel + folge.length * SCHRITT_MS);
      var pos = 0;
      (function weiter() {
        if (pos >= folge.length) { return; }
        var c = folge[pos++];
        klappen(z, c, pos === 1 ? Math.round(i * staffel) : 0, weiter);
      })();
    });
    window.setTimeout(function () { endstand(t); }, laengste + 700);   // Sicherung: am Ende stimmt immer alles
  }

  function starten(t) {
    if (document.hidden) {
      document.addEventListener('visibilitychange', function einmal() {
        if (!document.hidden) { document.removeEventListener('visibilitychange', einmal); lauf(t); }
      });
    } else { lauf(t); }
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('.tafel'), function (el) { tafeln.push(bau(el)); });
    if (REDUZIERT || !('IntersectionObserver' in window)) {
      tafeln.forEach(function (t) { starten(t); });
      return;
    }
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          starten(e.target.__tafel);
        }
      });
    }, { rootMargin: '0px', threshold: 0.01 });
    tafeln.forEach(function (t) { t.el.__tafel = t; io.observe(t.el); });
  }

  /* Warenkorb-Zähler */
  function korb() {
    var knopf = document.querySelector('.cta');
    var zahl = document.getElementById('korb-zahl');
    if (!knopf || !zahl) { return; }
    knopf.addEventListener('click', function () {
      zahl.textContent = String((parseInt(zahl.textContent, 10) || 0) + 1);
      if (REDUZIERT) { return; }
      zahl.classList.remove('neu');
      void zahl.offsetWidth;          // Animation neu starten, auch bei schnellen Klicks
      zahl.classList.add('neu');
    });
  }

  /* Beim Drucken sofort alle Zielzeichen zeigen (sonst stünden unten noch Zufallszeichen) */
  window.addEventListener('beforeprint', function () { tafeln.forEach(function (t) { t.gestartet = true; endstand(t); }); });

  init();
  korb();
})();
