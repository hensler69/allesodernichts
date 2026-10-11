/* Wireframe 3D: kleiner Drahtgitter-Renderer ohne Bibliothek.
   Teil 1 (Geometrie und Projektion) laeuft auch in Node (poster-erzeugen.js nutzt ihn).
   Teil 2 (start) zeichnet auf Canvas, dreht per Ziehen und pausiert, wenn nichts zu sehen ist. */
(function (root, fabrik) {
  var api = fabrik();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else api.start();
})(this, function () {
  'use strict';

  /* ---------- Teil 1: Geometrie und Projektion ---------- */
  var W = 600, H = 640;            // Zeichenflaeche in "Zeichnungs-Einheiten"
  var CX = 300, CY = 322;          // Bildmitte des Modells
  var MIDY = 13.5;                 // Drehpunkt auf der Hoehe (Modell ist 27 hoch)
  var TILT = 0.47;                 // Blick von schraeg oben, im Bogenmass (rund 27 Grad)
  var DIST = 95, SCALE = 17.2;     // Kameraabstand und Einheiten pro Modell-cm
  var POSE = 0.7;                  // feste Pose fuer Standbild und Poster
  var TAU = Math.PI * 2;

  function baue() {
    var S = [];                    // Strecken: x0,y0,z0,x1,y1,z1,typ,gewicht
    function strecke(a, b, typ, g) { S.push([a[0], a[1], a[2], b[0], b[1], b[2], typ, g == null ? 1 : g]); }
    function ring(r, y, n, typ, cx, cz) {
      cx = cx || 0; cz = cz || 0;
      for (var i = 0; i < n; i++) {
        var a0 = i / n * TAU, a1 = (i + 1) / n * TAU;
        strecke([cx + r * Math.cos(a0), y, cz + r * Math.sin(a0)], [cx + r * Math.cos(a1), y, cz + r * Math.sin(a1)], typ);
      }
    }
    function drehkoerper(profil, nMer, nRing, typ) {   // profil: [[radius, hoehe], ...]
      var i, k;
      for (i = 0; i < profil.length; i++) ring(profil[i][0], profil[i][1], nRing, typ);
      for (k = 0; k < nMer; k++) {
        var a = k / nMer * TAU, c = Math.cos(a), s = Math.sin(a);
        for (i = 0; i < profil.length - 1; i++)
          strecke([profil[i][0] * c, profil[i][1], profil[i][0] * s], [profil[i + 1][0] * c, profil[i + 1][1], profil[i + 1][0] * s], typ);
      }
    }
    // Pos. 3: Schuessel (0 bis 8)
    drehkoerper([[3.5, 0], [5.2, 0.8], [7.0, 2.4], [8.4, 4.4], [9.2, 6.2], [9.5, 8]], 16, 48, 0);
    ring(9.0, 8, 48, 1);
    // Gemuesescheiben in der Schuessel (feste Zufallswerte, damit das Bild stabil bleibt)
    var sch = [[-2.6, 1.3, 1.2, .5, .2], [1.4, 1.1, -2.9, -.4, 1.1], [3.4, 1.9, 1.4, .8, 2.4], [-0.6, 1.0, 3.6, -.7, .6],
               [-3.6, 2.1, -1.6, .3, 1.9], [0.4, 1.9, -0.5, -.2, 2.9], [2.2, 3.1, -2.6, .9, 0.3], [-1.6, 3.0, -2.2, -.6, 1.6]];
    sch.forEach(function (d) {
      var kx = d[3], kz = d[4], cxk = Math.cos(kx), sxk = Math.sin(kx), czk = Math.cos(kz), szk = Math.sin(kz);
      function pt(px, py, pz) {   // erst um X kippen, dann um Z, dann verschieben
        var y1 = py * cxk - pz * sxk, z1 = py * sxk + pz * cxk, x2 = px * czk - y1 * szk, y2 = px * szk + y1 * czk;
        return [d[0] + x2, d[1] + y2, d[2] + z1];
      }
      for (var h = -1; h <= 1; h += 2) for (var i = 0; i < 10; i++) {
        var a0 = i / 10 * TAU, a1 = (i + 1) / 10 * TAU;
        strecke(pt(1.35 * Math.cos(a0), .17 * h, 1.35 * Math.sin(a0)), pt(1.35 * Math.cos(a1), .17 * h, 1.35 * Math.sin(a1)), 1);
      }
      for (var j = 0; j < 4; j++) { var a = j / 4 * TAU; strecke(pt(1.35 * Math.cos(a), -.17, 1.35 * Math.sin(a)), pt(1.35 * Math.cos(a), .17, 1.35 * Math.sin(a)), 1); }
    });
    // Pos. 2: Einsatz als Kegelstumpf (10 bis 15) mit fuenf Loechern
    var ks = [[4.2, 10], [5.6, 12.5], [7.0, 15]];
    drehkoerper(ks, 20, 40, 0);
    ring(6.3, 15, 40, 1);
    ring(2.9, 15, 28, 1);
    for (var h = 0; h < 5; h++) {
      var w = h / 5 * TAU + 0.31, hx = 4.6 * Math.cos(w), hz = 4.6 * Math.sin(w);
      ring(1.25, 15, 16, 0, hx, hz);
      ring(1.25, 13.8, 16, 1, hx, hz);
      for (var q = 0; q < 4; q++) {
        var qa = q / 4 * TAU;
        strecke([hx + 1.25 * Math.cos(qa), 15, hz + 1.25 * Math.sin(qa)], [hx + 1.25 * Math.cos(qa), 13.8, hz + 1.25 * Math.sin(qa)], 1);
      }
      strecke([hx - 1.25 * Math.sin(w), 15, hz + 1.25 * Math.cos(w)], [hx + 1.25 * Math.sin(w), 15, hz - 1.25 * Math.cos(w)], 1);   // Klinge quer im Loch
    }
    // Pos. 1: Zylinderschacht (17 bis 27, 5 breit)
    drehkoerper([[3.4, 17], [3.4, 17.9], [2.5, 17.9], [2.5, 26], [2.5, 27]], 8, 28, 0);
    ring(2.5, 22, 28, 1);
    ring(2.0, 27, 24, 1);
    // Bodenraster (Typ 2) mit Randabfall
    var R = 15, st = 3.75, teil = 10, gy = -0.6, i2, j2;
    for (i2 = -4; i2 <= 4; i2++) for (j2 = 0; j2 < teil; j2++) {
      var p0 = -R + j2 * (2 * R / teil), p1 = p0 + 2 * R / teil, f = i2 * st;
      var m = (p0 + p1) / 2, g = Math.max(0, 1 - Math.sqrt(f * f + m * m) / (R * 1.15));
      strecke([f, gy, p0], [f, gy, p1], 2, g);
      strecke([p0, gy, f], [p1, gy, f], 2, g);
    }
    S.sort(function (a, b) { return Math.min(a[1], a[4]) - Math.min(b[1], b[4]); });
    return S;
  }

  function projektion(winkel, kipp) {
    var ca = Math.cos(winkel), sa = Math.sin(winkel), ct = Math.cos(kipp), st = Math.sin(kipp);
    return function (x, y, z, aus) {
      y -= MIDY;
      var x1 = x * ca + z * sa, z1 = -x * sa + z * ca;
      var y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;
      var k = SCALE * DIST / (DIST - z2);
      aus[0] = CX + x1 * k; aus[1] = CY - y2 * k; aus[2] = z2;
      return aus;
    };
  }

  /* ---------- Teil 2: Zeichnen im Browser ---------- */
  function start() {
    var bild = document.getElementById('bild');
    var canvas = document.getElementById('canvas');
    if (!bild || !canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var segs = baue(), N = segs.length;
    var weich = window.matchMedia('(prefers-reduced-motion: reduce)');
    var winkel = POSE, tempo = 0, AUTO = 0.2;
    var ziehen = false, zeigerId = null, letztesX = 0, letzteZeit = 0;
    var sichtbar = true, raf = 0, davor = 0;
    var intro = null, introZeit = 0;      // Zeichen-Einblendung: Ebene faehrt von unten nach oben
    var css = { w: 0, h: 0 }, dpr = 1;
    var P0 = [0, 0, 0], P1 = [0, 0, 0];
    var BUCKETS = 5, TYPEN = 3;
    var pfade = [];
    for (var t = 0; t < TYPEN; t++) { pfade.push([]); for (var b = 0; b < BUCKETS; b++) pfade[t].push([]); }
    var BREITE = [1.25, 0.95, 0.8], DAempf = [1, 1, 0.38];

    function groesse() {
      var r = bild.getBoundingClientRect();
      if (!r.width || !r.height) return;
      css.w = r.width; css.h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(css.w * dpr); canvas.height = Math.round(css.h * dpr);
    }
    function zeichne(wi, ebene) {
      if (!css.w) return;
      var eng = css.w / css.h < 0.85;    // schmales Handy-Bild: Ausschnitt enger um das Modell
      var vx = eng ? 100 : 0, vy = eng ? 62 : 20, vw = eng ? 400 : W, vh = eng ? 536 : 600;
      var sk = Math.min(css.w / vw, css.h / vh);
      var ox = (css.w - vw * sk) / 2 - vx * sk, oy = (css.h - vh * sk) / 2 - vy * sk;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr * sk, 0, 0, dpr * sk, dpr * ox, dpr * oy);
      var px = 1 / sk;                    // eine CSS-Pixelbreite in Zeichnungs-Einheiten
      var proj = projektion(wi, TILT);
      var tp, bp, i, a, g, bk;
      for (tp = 0; tp < TYPEN; tp++) for (bp = 0; bp < BUCKETS; bp++) pfade[tp][bp].length = 0;
      for (i = 0; i < N; i++) {
        var s = segs[i], y0 = s[1], y1 = s[4], x0 = s[0], z0 = s[2], x1 = s[3], z1 = s[5];
        if (ebene != null) {
          if (Math.min(y0, y1) > ebene) continue;
          if (Math.max(y0, y1) > ebene) {
            var tt = (ebene - y0) / (y1 - y0);
            if (y1 > y0) { x1 = x0 + (x1 - x0) * tt; z1 = z0 + (z1 - z0) * tt; y1 = ebene; }
            else { var u = (ebene - y1) / (y0 - y1); x0 = x1 + (x0 - x1) * u; z0 = z1 + (z0 - z1) * u; y0 = ebene; }
          }
        }
        proj(x0, y0, z0, P0); proj(x1, y1, z1, P1);
        a = 0.26 + 0.74 * Math.min(1, Math.max(0, ((P0[2] + P1[2]) / 2 + 13) / 26));
        g = a * s[7] * DAempf[s[6]];
        bk = Math.min(BUCKETS - 1, Math.floor(g * BUCKETS));
        var arr = pfade[s[6]][bk];
        arr.push(P0[0], P0[1], P1[0], P1[1]);
      }
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#5fe3ff';
      for (tp = 0; tp < TYPEN; tp++) {
        ctx.lineWidth = BREITE[tp] * px;
        for (bp = 0; bp < BUCKETS; bp++) {
          var L = pfade[tp][bp]; if (!L.length) continue;
          ctx.globalAlpha = Math.min(1, (bp + 0.6) / BUCKETS);
          ctx.beginPath();
          for (var k = 0; k < L.length; k += 4) { ctx.moveTo(L[k], L[k + 1]); ctx.lineTo(L[k + 2], L[k + 3]); }
          ctx.stroke();
        }
      }
      // Mittellinie gestrichelt
      proj(0, -1.5, 0, P0); proj(0, 29.5, 0, P1);
      ctx.globalAlpha = 0.5; ctx.lineWidth = 1 * px; ctx.setLineDash([7 * px, 6 * px]);
      ctx.beginPath(); ctx.moveTo(P0[0], P0[1]); ctx.lineTo(P1[0], P1[1]); ctx.stroke(); ctx.setLineDash([]);
      if (ebene != null) {                // helle Ebene, die den Aufbau anzeigt
        ctx.globalAlpha = 0.85; ctx.strokeStyle = '#d9f9ff'; ctx.lineWidth = 1.5 * px; ctx.beginPath();
        for (var n = 0; n <= 64; n++) {
          proj(10.4 * Math.cos(n / 64 * TAU), ebene, 10.4 * Math.sin(n / 64 * TAU), P0);
          if (n) ctx.lineTo(P0[0], P0[1]); else ctx.moveTo(P0[0], P0[1]);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    function neuZeichnen() { zeichne(winkel, intro != null && intro < 1 ? -1 + 30 * (1 - Math.pow(1 - intro, 3)) : null); }

    function schritt(ts) {
      raf = 0;
      var dt = davor ? Math.min(0.05, (ts - davor) / 1000) : 0.016;
      davor = ts;
      if (intro != null && intro < 1) { introZeit += dt; intro = Math.min(1, introZeit / 1.2); }
      if (!ziehen) { tempo += (AUTO - tempo) * Math.min(1, dt * 1.6); winkel += tempo * dt; }
      neuZeichnen();
      pruefeLauf();
    }
    function pruefeLauf() {
      var soll = sichtbar && !document.hidden && !weich.matches;
      if (soll && !raf) { davor = 0; raf = requestAnimationFrame(schritt); }
      else if (!soll && raf) { cancelAnimationFrame(raf); raf = 0; }
    }

    // Ziehen: waagerecht drehen, senkrechtes Wischen bleibt dem Scrollen (touch-action: pan-y im CSS)
    canvas.addEventListener('pointerdown', function (e) {
      if (ziehen || (e.pointerType === 'mouse' && e.button !== 0)) return;   // zweiter Finger oder rechte Maustaste: ignorieren
      ziehen = true; zeigerId = e.pointerId; letztesX = e.clientX; letzteZeit = e.timeStamp; tempo = 0;
      try { canvas.setPointerCapture(e.pointerId); } catch (x) {}
      canvas.classList.add('zieht');
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!ziehen || e.pointerId !== zeigerId) return;
      var dx = e.clientX - letztesX, dz = Math.max(1, e.timeStamp - letzteZeit);
      winkel += dx * 0.011; tempo = Math.max(-3, Math.min(3, (dx * 0.011) / (dz / 1000)));
      letztesX = e.clientX; letzteZeit = e.timeStamp;
      if (weich.matches) { intro = null; neuZeichnen(); }
    });
    function los(e) { if (e && e.pointerId !== zeigerId) return; ziehen = false; zeigerId = null; canvas.classList.remove('zieht'); }
    canvas.addEventListener('pointerup', los);
    canvas.addEventListener('pointercancel', los);
    canvas.addEventListener('lostpointercapture', los);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { sichtbar = es[0].isIntersecting; pruefeLauf(); }, { threshold: 0.05 }).observe(bild);
    }
    document.addEventListener('visibilitychange', pruefeLauf);
    if (weich.addEventListener) weich.addEventListener('change', function () { winkel = weich.matches ? POSE : winkel; intro = null; neuZeichnen(); pruefeLauf(); });
    if ('ResizeObserver' in window) new ResizeObserver(function () { groesse(); neuZeichnen(); }).observe(bild);
    else window.addEventListener('resize', function () { groesse(); neuZeichnen(); });

    groesse();
    if (!weich.matches) intro = 0;
    neuZeichnen();
    pruefeLauf();

    /* ---------- Kleinigkeiten der Seite ---------- */
    var el = document.querySelectorAll('.zeig');
    if (weich.matches || !('IntersectionObserver' in window)) {
      for (var z = 0; z < el.length; z++) el[z].classList.add('da');
    } else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          var geschw = Array.prototype.filter.call(e.target.parentNode.children, function (k) { return k.classList.contains('zeig'); });
          e.target.style.transitionDelay = Math.min(3, geschw.indexOf(e.target)) * 50 + 'ms';   // kurzer Versatz zwischen Nachbarn
          e.target.classList.add('da'); io.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -8% 0px' });
      for (var y = 0; y < el.length; y++) io.observe(el[y]);
    }
    var knopf = document.querySelector('.cta'), zahl = document.querySelector('.korb__zahl'), n = 0;
    if (knopf && zahl) knopf.addEventListener('click', function () {
      n++; zahl.textContent = n;
      if (!weich.matches && zahl.animate) zahl.animate([{ transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 200, easing: 'cubic-bezier(.23,1,.32,1)' });
    });
  }

  return { W: W, H: H, CX: CX, CY: CY, POSE: POSE, TILT: TILT, SCALE: SCALE, baue: baue, projektion: projektion, start: start };
});
