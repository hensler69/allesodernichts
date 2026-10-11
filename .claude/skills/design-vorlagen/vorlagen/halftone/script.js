/* Look Halftone: drei kleine Aufgaben.
   1. Menü am Handy (ohne Skript steht die Navigation einfach unter dem Logo).
   2. Warenkorb-Zähler (nur Demo).
   3. Hero-Bild: eine unsichtbare Zeichnung wird EINMAL beim Laden in Rasterpunkte umgerechnet.
      Zwei Druckplatten (Rosa 15 Grad, Blau 45 Grad), Radius = Dichte der Farbe. Kein Dauerlauf, keine Schleife. */
(function () {
  'use strict';
  var d = document, wurzel = d.documentElement;

  /* ---------- 1. Menü ---------- */
  var mb = d.querySelector('.menue'), nav = d.getElementById('nav');
  if (mb && nav) {
    mb.hidden = false;
    wurzel.classList.add('menu-an');
    var zu = function () { nav.classList.remove('offen'); mb.setAttribute('aria-expanded', 'false'); };
    mb.addEventListener('click', function () {
      var auf = mb.getAttribute('aria-expanded') === 'true';
      nav.classList.toggle('offen', !auf);
      mb.setAttribute('aria-expanded', String(!auf));
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) zu(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('offen')) { zu(); mb.focus(); } });
  }

  /* ---------- 2. Warenkorb-Zähler (Demo) ---------- */
  var zahl = d.getElementById('korb-zahl'), cta = d.querySelector('.cta'), anzahl = 0;
  if (zahl && cta) cta.addEventListener('click', function (e) {
    anzahl += 1; zahl.textContent = anzahl;
    /* Hüpfer nur bei Maus oder Touch (detail > 0), nie bei Tastatur */
    if (e.detail > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      zahl.classList.add('hupf');
      setTimeout(function () { zahl.classList.remove('hupf'); }, 120);
    }
  });

  /* ---------- 3. Hero-Bild ---------- */
  var bild = d.getElementById('bild'), raum = d.getElementById('bildraum');
  if (!bild || !raum) return;
  var cR = raum.querySelector('.ebene--rosa'), cB = raum.querySelector('.ebene--blau');
  var ROSA = '#ff4f8b', BLAU = '#2d5bff', PI2 = Math.PI * 2;
  var gebaut = { w: 0, h: 0 };

  /* Pfade: jede Funktion legt eine Form auf den Zeichenstift */
  function kreis(x, y, r) { return function (c) { c.arc(x, y, r, 0, PI2); }; }
  function oval(x, y, rx, ry, w) { return function (c) { c.ellipse(x, y, rx, ry, w || 0, 0, PI2); }; }
  function rund(x, y, w, h, r) {
    return function (c) {
      c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
    };
  }

  /* Dichte einer Farbe: Zahl 0..1 oder Verlauf. Gezeichnet wird mit schwarzer Deckkraft (Alpha = Dichte). */
  function dichte(c, spec) {
    if (typeof spec === 'number') return 'rgba(0,0,0,' + spec + ')';
    var g;
    if (spec.l) g = c.createLinearGradient(spec.l[0], spec.l[1], spec.l[2], spec.l[3]);
    else if (spec.r) g = c.createRadialGradient(spec.r[0], spec.r[1], spec.r[2], spec.r[3], spec.r[4], spec.r[5]);
    else if (c.createConicGradient) g = c.createConicGradient(spec.k[0], spec.k[1], spec.k[2]);
    else g = c.createLinearGradient(spec.k[1] - 120, spec.k[2], spec.k[1] + 120, spec.k[2]);
    for (var i = 0; i < spec.s.length; i++) g.addColorStop(spec.s[i][0], 'rgba(0,0,0,' + spec.s[i][1] + ')');
    return g;
  }

  function platte(w, h) {
    var c = d.createElement('canvas');
    c.width = w; c.height = h;
    return { c: c, x: c.getContext('2d', { willReadFrequently: true }) };
  }

  /* Die Zeichnung (600 x 600 Einheiten). R = Platte Rosa, B = Platte Blau.
     teil(): erst die Stelle auf beiden Platten freiräumen (Papier), dann Dichte für Rosa und Blau auftragen.
     Mit ueberdruck = true wird nichts freigeräumt, die Farbe liegt über dem Darunterliegenden (wird Violett). */
  function szene(R, B, s, x0, y0) {
    var platten = [R, B], i;
    for (i = 0; i < 2; i++) { platten[i].setTransform(1, 0, 0, 1, 0, 0); platten[i].clearRect(0, 0, 5000, 5000); platten[i].setTransform(s, 0, 0, s, -x0 * s, -y0 * s); }

    function teil(pfad, fr, fb, ueberdruck) {
      var fs = [fr, fb];
      for (var k = 0; k < 2; k++) {
        var c = platten[k];
        if (!ueberdruck) {
          c.save(); c.globalCompositeOperation = 'destination-out'; c.beginPath(); pfad(c); c.fillStyle = '#000'; c.fill(); c.restore();
        }
        if (fs[k]) { c.beginPath(); pfad(c); c.fillStyle = dichte(c, fs[k]); c.fill(); }
      }
    }
    function rille(x, y, r, breite) {
      for (var k = 0; k < 2; k++) {
        var c = platten[k];
        c.save(); c.globalCompositeOperation = 'destination-out'; c.lineWidth = breite; c.beginPath(); c.arc(x, y, r, 0, PI2); c.stroke(); c.restore();
      }
    }
    function bogenRille(breite) {
      for (var k = 0; k < 2; k++) {
        var c = platten[k];
        c.save(); c.globalCompositeOperation = 'destination-out'; c.lineWidth = breite; c.beginPath(); c.ellipse(300, 506, 232, 36, 0, 0, Math.PI); c.stroke(); c.restore();
      }
    }
    /* Gemüsescheibe mit Ring und Kernen */
    function scheibe(x, y, r, dr, db, kerne) {
      teil(kreis(x, y, r), dr, db);
      rille(x, y, r * 0.6, Math.max(5, r * 0.17));
      if (kerne) for (var k = 0; k < 5; k++) {
        var a = k * PI2 / 5 + 0.4;
        teil(kreis(x + Math.cos(a) * r * 0.3, y + Math.sin(a) * r * 0.3, Math.max(3, r * 0.1)), 0, 0);
      }
    }
    function stab(x, y, laenge, breite, winkel, dr, db) {
      teil(function (c) {
        c.save(); c.translate(x, y); c.rotate(winkel * Math.PI / 180);
        rund(-laenge / 2, -breite / 2, laenge, breite, breite / 2)(c);
        c.restore();
      }, dr, db);
    }

    /* 1. Hintergrund: rosa Scheibe mit Punktverlauf, blauer Tischschatten */
    teil(kreis(300, 316, 268), { l: [90, 70, 520, 560], s: [[0, 0.03], [0.5, 0.2], [1, 0.55]] }, null, true);
    teil(oval(300, 574, 240, 20), null, { l: [60, 0, 540, 0], s: [[0, 0], [0.25, 0.6], [0.75, 0.6], [1, 0]] }, true);

    /* 2. Einfülltrichter mit Stößel */
    teil(function (c) { c.moveTo(220, 52); c.lineTo(380, 52); c.lineTo(350, 176); c.lineTo(250, 176); c.closePath(); },
      { l: [220, 0, 380, 0], s: [[0, 0], [0.7, 0.05], [1, 0.45]] }, { l: [220, 0, 380, 0], s: [[0, 0.2], [0.5, 0.55], [1, 0.95]] });
    teil(oval(300, 54, 80, 13), 0.9, 1);
    teil(rund(262, 14, 76, 104, 10), { l: [262, 0, 338, 0], s: [[0, 0.7], [1, 1]] }, 0.1);
    teil(rund(246, 4, 108, 22, 11), 0.95, 1);

    /* 3. Gehäuse: dunkler Block mit Lichtkante und Schaltknopf */
    teil(rund(160, 160, 280, 306, 30), { l: [160, 0, 440, 0], s: [[0, 0.12], [0.6, 0.25], [1, 0.55]] }, { l: [160, 0, 440, 0], s: [[0, 0.8], [0.5, 0.88], [1, 0.98]] });
    teil(rund(178, 190, 14, 246, 7), 0, 0);
    teil(kreis(394, 428, 28), 0, 0);
    teil(kreis(394, 428, 19), 0.95, 0.05);

    /* 4. Kegel-Einsatz: heller Kragen, dunkler Ring, Scheibe mit Glanz, fünf große Löcher, Nabe */
    var my = 304;
    teil(kreis(300, my, 126), 0.04, 0.02);
    teil(kreis(300, my, 114), 0.9, 1);
    teil(kreis(300, my, 104), 0, 0);
    teil(kreis(300, my, 100),
      { r: [300, my, 0, 300, my, 100], s: [[0, 0.75], [0.3, 0.4], [1, 0.05]] },
      { r: [300, my, 0, 300, my, 100], s: [[0, 0.3], [0.6, 0.05], [1, 0]] });
    teil(kreis(300, my, 100),
      { k: [-0.55, 300, my], s: [[0, 0], [0.12, 0.4], [0.26, 0], [0.42, 0.35], [0.55, 0], [0.72, 0.4], [0.86, 0.05], [1, 0]] }, 0, true);
    for (i = 0; i < 5; i++) {
      var a = -Math.PI / 2 + i * PI2 / 5, hx = 300 + Math.cos(a) * 62, hy = my + Math.sin(a) * 62;
      teil(oval(hx, hy, 28, 15, a), 0.95, 1);
      teil(oval(hx + Math.cos(a) * 4, hy + Math.sin(a) * 4, 14, 5.5, a), 0, 0.45);
    }
    teil(kreis(300, my, 22), 0.9, 1);
    teil(kreis(300, my, 8), 0, 0);

    /* 5. Schüssel: Innenraum, Gemüse, Vorderwand */
    teil(oval(300, 506, 232, 36), { l: [68, 0, 532, 0], s: [[0, 0.95], [0.5, 0.8], [1, 0.95]] }, 0.5);
    stab(300, 452, 110, 20, -22, 0.55, 0.55);
    stab(224, 450, 100, 20, 24, 0.55, 0.55);
    stab(378, 448, 100, 20, -50, 0.55, 0.55);
    scheibe(296, 466, 46, { l: [260, 430, 340, 510], s: [[0, 0.75], [1, 0.98]] }, 0.1, true);
    scheibe(200, 480, 40, 0.0, 0.88, true);
    scheibe(394, 480, 40, 0.0, 0.88, true);
    scheibe(142, 506, 34, 0.95, 0.0, true);
    scheibe(458, 508, 34, 0.95, 0.0, true);
    scheibe(246, 512, 34, 0.55, 0.55, true);
    scheibe(350, 514, 34, 0.55, 0.55, true);
    teil(function (c) { c.ellipse(300, 506, 232, 36, 0, Math.PI, 0, true); c.bezierCurveTo(532, 586, 430, 598, 300, 598); c.bezierCurveTo(170, 598, 68, 586, 68, 506); c.closePath(); },
      { l: [68, 0, 532, 0], s: [[0, 0.22], [0.45, 0.62], [1, 0.95]] },
      { l: [0, 520, 0, 598], s: [[0, 0.3], [1, 0.6]] });
    bogenRille(5);
    teil(function (c) { c.moveTo(92, 546); c.quadraticCurveTo(112, 584, 186, 592); c.lineTo(192, 580); c.quadraticCurveTo(138, 574, 114, 542); c.closePath(); }, 0, 0);

    /* 6. Fliegende Stücke */
    scheibe(100, 170, 20, 0.9, 0.0, false);
    scheibe(504, 196, 24, 0.0, 0.85, false);
    scheibe(540, 340, 14, 0.6, 0.6, false);
    scheibe(70, 330, 16, 0.0, 0.85, false);
  }

  /* Aus einer Platte Punkte machen: Gitter um den Winkel gedreht, Radius nach Dichte */
  var VERSATZ = [[0, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]];
  function messen(daten, w, h, x, y, versatz) {
    var summe = 0;
    for (var k = 0; k < 5; k++) {
      var xi = Math.round(x + VERSATZ[k][0] * versatz), yi = Math.round(y + VERSATZ[k][1] * versatz);
      if (xi >= 0 && yi >= 0 && xi < w && yi < h) summe += daten[(yi * w + xi) * 4 + 3];
    }
    return summe / 1275;
  }
  function punkte(leinwand, p, w, h, dpr, raster, winkel, farbe) {
    leinwand.width = Math.round(w * dpr); leinwand.height = Math.round(h * dpr);
    leinwand.style.width = w + 'px'; leinwand.style.height = h + 'px';
    var c = leinwand.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);
    var daten = p.x.getImageData(0, 0, w, h).data;
    var t = winkel * Math.PI / 180, co = Math.cos(t), si = Math.sin(t);
    var n = Math.ceil(Math.sqrt(w * w + h * h) / raster / 2) + 2;
    var cx = w / 2, cy = h / 2;
    c.fillStyle = farbe; c.beginPath();
    for (var i = -n; i <= n; i++) {
      for (var j = -n; j <= n; j++) {
        var x = cx + (i * co - j * si) * raster, y = cy + (i * si + j * co) * raster;
        if (x < -raster || y < -raster || x > w + raster || y > h + raster) continue;
        var dd = messen(daten, w, h, x, y, raster * 0.22);
        if (dd < 0.04) continue;
        var r = raster * (0.56 * Math.sqrt(dd) + 0.16 * dd * dd * dd);   /* Punktzuwachs wie im echten Druck */
        if (r < 0.45) continue;
        c.moveTo(x + r, y); c.arc(x, y, r, 0, PI2);
      }
    }
    c.fill();
  }

  function bauen() {
    var w = Math.round(raum.clientWidth), h = Math.round(raum.clientHeight);
    if (!w || !h) return false;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);   /* nie über 2-fache Dichte */
    var hoch = h / w > 0.9;                                /* PC: quadratisch, ganze Szene. Handy: breiter Ausschnitt */
    var raster = hoch ? 6.5 : 7.5;                         /* Handy: gröberes Raster */
    var s = hoch ? w / 600 : w / 500;
    var x0 = hoch ? 0 : 50, y0 = hoch ? Math.max(0, 600 - h / s) : 560 - h / s;
    var pR = platte(w, h), pB = platte(w, h);
    szene(pR.x, pB.x, s, x0, y0);
    punkte(cR, pR, w, h, dpr, raster, 15, ROSA);
    punkte(cB, pB, w, h, dpr, raster, 45, BLAU);
    gebaut.w = w; gebaut.h = h;
    return true;
  }

  try {
    if (bauen()) {
      void raum.offsetWidth;                       /* Ausgangszustand festschreiben, dann Übergang auslösen */
      bild.classList.add('fertig');
    } else bild.classList.add('fehler');
  } catch (e) { bild.classList.add('fehler'); }

  /* Neu bauen nur bei echter Größenänderung (Drehen, Fenster), nicht laufend */
  var warte = 0;
  window.addEventListener('resize', function () {
    clearTimeout(warte);
    warte = setTimeout(function () {
      var w = Math.round(raum.clientWidth), h = Math.round(raum.clientHeight);
      if (w !== gebaut.w || h !== gebaut.h) { try { bauen(); } catch (e) {} }
    }, 200);
  });
})();
