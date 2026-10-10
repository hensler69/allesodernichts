/* Look: Isometric. Die Szenen entstehen aus einer kleinen Hilfsfunktion box(). Ohne JS bleibt der Text lesbar, nur die Zeichnungen fehlen. */
(function () {
  'use strict';
  var wurzel = document.documentElement;

  /* ---------- 1. Isometrie ----------
     x läuft nach rechts unten, y nach links unten, z nach oben (30 Grad zur Waagerechten).
     Jede Farbe hat drei Tonstufen: [oben hell, links mittel, rechts dunkel]. */
  var C = 0.8660254, H = 0.5, S = 20;
  var TON = {
    salbei:   ['#d4ecca', '#bfe3b4', '#93c585'],
    pfirsich: ['#ffddc7', '#ffc9a8', '#e3a283'],
    karotte:  ['#ffd2b8', '#f2b08a', '#d4916f'],
    blau:     ['#cddfff', '#a9c8ff', '#7aa0e0'],
    nacht:    ['#3d4d46', '#2c3a34', '#1c2622'],
    stahl:    ['#f1f4f2', '#d3dad6', '#a6b1ab'],
    stahl2:   ['#e2e8e5', '#c3ccc7', '#929e98'],
    papier:   ['#fffdf8', '#ece5d3', '#d4c9ae'],
    glas:     ['#eaf2ff', '#cfe0ff', '#b3cdf5']
  };

  var ctx = null;                       // die Szene, die gerade gebaut wird
  function neu() { ctx = { teile: [], n: 0, min: [1e9, 1e9], max: [-1e9, -1e9] }; }

  function pt(x, y, z) {
    var px = (x - y) * C * S, py = (x + y) * H * S - z * S;
    if (px < ctx.min[0]) ctx.min[0] = px;
    if (py < ctx.min[1]) ctx.min[1] = py;
    if (px > ctx.max[0]) ctx.max[0] = px;
    if (py > ctx.max[1]) ctx.max[1] = py;
    return px.toFixed(1) + ',' + py.toFixed(1);
  }
  function poly(punkte, fuell, rand, extra) {
    return '<polygon points="' + punkte.join(' ') + '" fill="' + fuell + '" stroke="' + rand + '"' + (extra || '') + '/>';
  }

  /* box(x, y, z, breite, tiefe, hoehe, farbe): ein Quader aus drei Flächen (oben hell, links mittel, rechts dunkel).
     Optionen: glas (durchscheinend), offen (Glas ohne Deckfläche). */
  function box(x, y, z, breite, tiefe, hoehe, farbe, opt) {
    var o = opt || {};
    var a = pt(x, y, z + hoehe), b = pt(x + breite, y, z + hoehe), c = pt(x + breite, y + tiefe, z + hoehe), e = pt(x, y + tiefe, z + hoehe);
    var f = pt(x, y + tiefe, z), g = pt(x + breite, y + tiefe, z), i = pt(x + breite, y, z);
    var s;
    if (o.glas) {
      var kante = ' stroke-opacity=".85" stroke-width="1.3" stroke-linejoin="round"';
      s = (o.offen
            ? '<polygon points="' + [a, b, c, e].join(' ') + '" fill="none" stroke="#fff"' + kante + '/>'
            : poly([a, b, c, e], farbe[0], '#fff', ' fill-opacity=".6"' + kante)) +
          poly([e, c, g, f], farbe[1], '#fff', ' fill-opacity=".5"' + kante) +
          poly([b, c, g, i], farbe[2], '#fff', ' fill-opacity=".45"' + kante);
    } else {
      s = poly([a, b, c, e], farbe[0], farbe[0], ' stroke-width=".8" stroke-linejoin="round"') +
          poly([e, c, g, f], farbe[1], farbe[1], ' stroke-width=".8" stroke-linejoin="round"') +
          poly([b, c, g, i], farbe[2], farbe[2], ' stroke-width=".8" stroke-linejoin="round"');
    }
    ctx.teile.push({ i: ctx.n++, k: '', s: s });
  }
  /* flach(): flache Fläche auf dem Boden, zum Beispiel ein weicher Schatten. Blendet nur ein, fällt nicht. */
  function flach(x, y, z, breite, tiefe, farbe, deckkraft) {
    var s = '<polygon points="' + [pt(x, y, z), pt(x + breite, y, z), pt(x + breite, y + tiefe, z), pt(x, y + tiefe, z)].join(' ') +
            '" fill="' + farbe + '" fill-opacity="' + deckkraft + '"/>';
    ctx.teile.push({ i: ctx.n, k: ' schatten', s: s });
  }
  /* linie(): dünne Linie, gehört zum zuletzt gesetzten Block */
  function linie(x1, y1, z1, x2, y2, z2, farbe, dicke) {
    var l = ctx.teile[ctx.teile.length - 1];
    l.s += '<polyline points="' + pt(x1, y1, z1) + ' ' + pt(x2, y2, z2) + '" fill="none" stroke="' + farbe + '" stroke-width="' + (dicke || 1.5) + '" stroke-linecap="round"/>';
  }
  /* reihe(): mehrere Blöcke von hinten nach vorn sortiert setzen */
  function reihe(liste) {
    liste.slice().sort(function (p, q) {
      return (p[0] + p[3] / 2 + p[1] + p[4] / 2 + p[2] + p[5] / 2) - (q[0] + q[3] / 2 + q[1] + q[4] / 2 + q[2] + q[5] / 2);
    }).forEach(function (b) { box(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]); });
  }

  /* ---------- 2. Szenen ---------- */

  // Hero: Küchenarbeitsplatte mit Gerät, Schüssel, Einsätzen, Brett und Pflanze
  function szeneHero() {
    flach(-0.8, -0.8, -3.2, 13.6, 11.6, '#23302b', 0.1);
    // Unterschrank und Platte
    box(0.4, 0.4, -3.2, 11.2, 9.2, 3.2, TON.blau);
    linie(6.0, 9.6, -0.15, 6.0, 9.6, -3.05, TON.blau[2], 1.6);
    linie(11.6, 5.0, -0.15, 11.6, 5.0, -3.05, TON.blau[2], 1.6);
    box(5.1, 9.6, -1.9, 0.5, 0.22, 1.3, TON.papier);
    box(6.4, 9.6, -1.9, 0.5, 0.22, 1.3, TON.papier);
    box(11.6, 4.1, -1.9, 0.22, 0.5, 1.3, TON.papier);
    box(0, 0, 0, 12, 10, 1, TON.pfirsich);
    // Schatten auf der Platte
    flach(6.4, 1.0, 1, 5.6, 4.6, '#23302b', 0.12);
    flach(6.1, 6.0, 1, 5.6, 4.3, '#23302b', 0.1);
    flach(0.6, 5.4, 1, 5.4, 4.0, '#23302b', 0.09);
    flach(2.4, 0.8, 1, 3.4, 3.2, '#23302b', 0.09);
    flach(0.7, 0.7, 1, 2.2, 2.2, '#23302b', 0.08);
    // Pflanze im Topf, hinten links
    box(0.9, 0.9, 1, 1.6, 1.6, 1.2, TON.papier);
    box(1.0, 1.0, 2.2, 1.4, 1.4, 0.9, TON.salbei);
    box(1.25, 1.25, 3.1, 0.9, 0.9, 0.8, TON.salbei);
    // Fünf Einsätze, gestapelt
    for (var i = 0; i < 5; i++) {
      var w = 3.0 - i * 0.5, o = (3.0 - w) / 2;
      box(2.7 + o, 1.0 + o, 1 + i * 0.36, w, w, 0.36, i % 2 ? TON.stahl2 : TON.stahl);
    }
    // Brett mit Würfeln, vorn links
    box(0.8, 5.6, 1, 4.4, 3.4, 0.3, TON.blau);
    reihe([
      [1.3, 6.1, 1.3, 0.9, 0.9, 0.9, TON.salbei],
      [2.6, 6.5, 1.3, 0.9, 0.9, 0.9, TON.karotte],
      [3.8, 6.0, 1.3, 0.9, 0.9, 0.9, TON.salbei],
      [1.8, 7.6, 1.3, 0.9, 0.9, 0.9, TON.papier],
      [3.2, 7.7, 1.3, 0.9, 0.9, 0.9, TON.karotte],
      [1.3, 6.1, 2.2, 0.9, 0.9, 0.9, TON.karotte]
    ]);
    // Gerät: Sockel, Gürtel, Knopf
    box(6.5, 1.2, 1, 4.5, 4.0, 4.6, TON.nacht);
    box(6.42, 1.12, 1.55, 4.66, 4.16, 0.45, TON.salbei);
    box(11.0, 2.5, 3.1, 0.32, 1.4, 1.4, TON.papier);
    // Schacht mit Gurke, Stopfer
    box(8.15, 2.6, 5.6, 1.2, 1.2, 3.6, TON.salbei);
    box(7.65, 2.1, 5.6, 2.2, 2.2, 3.0, TON.glas, { glas: true, offen: true });
    box(8.05, 2.5, 9.25, 1.4, 1.4, 0.9, TON.nacht);
    box(8.35, 2.8, 10.15, 0.8, 0.8, 0.5, TON.stahl);
    // Schüssel hinten, Füllung
    box(6.4, 6.2, 1, 4.4, 3.4, 0.35, TON.papier);
    box(6.4, 6.2, 1.35, 4.4, 0.35, 1.1, TON.papier);
    box(6.4, 6.55, 1.35, 0.35, 2.7, 1.1, TON.papier);
    reihe([
      [7.0, 6.8, 1.35, 0.8, 0.8, 0.8, TON.salbei],
      [8.0, 6.8, 1.35, 0.8, 0.8, 0.8, TON.karotte],
      [9.1, 6.9, 1.35, 0.8, 0.8, 0.8, TON.salbei],
      [7.1, 7.8, 1.35, 0.8, 0.8, 0.8, TON.karotte],
      [8.2, 7.8, 1.35, 0.8, 0.8, 0.8, TON.papier],
      [9.3, 7.9, 1.35, 0.8, 0.8, 0.8, TON.karotte],
      [7.5, 7.3, 2.15, 0.8, 0.8, 0.8, TON.salbei],
      [8.7, 7.4, 2.15, 0.8, 0.8, 0.8, TON.papier],
      [8.0, 8.3, 2.15, 0.8, 0.8, 0.8, TON.salbei]
    ]);
    // Kegel-Einsatz: drei Stufen
    box(7.05, 5.2, 2.9, 3.4, 0.7, 2.2, TON.stahl);
    box(7.35, 5.9, 3.2, 2.8, 0.7, 1.6, TON.stahl2);
    box(7.65, 6.6, 3.5, 2.2, 0.7, 1.0, TON.stahl);
    box(7.95, 7.3, 3.7, 1.6, 0.18, 0.6, TON.nacht);
    // fallende Würfel
    reihe([
      [7.7, 6.2, 2.55, 0.5, 0.5, 0.5, TON.salbei],
      [8.8, 6.8, 2.25, 0.45, 0.45, 0.45, TON.karotte],
      [9.4, 6.3, 2.7, 0.4, 0.4, 0.4, TON.salbei]
    ]);
    // Schüssel vorn
    box(6.4, 9.25, 1.35, 4.4, 0.35, 1.1, TON.papier);
    box(10.45, 6.55, 1.35, 0.35, 2.7, 1.1, TON.papier);
  }

  var ICONS = {
    // Funktionskarten
    schneiden: function () {
      box(0, 0, 0, 6.6, 3.2, 0.5, TON.stahl);
      for (var i = 0; i < 5; i++) box(0.5 + i * 1.15, 0.5 + (i % 2) * 0.2, 0.5, 0.7, 2.2, 2.2, TON.salbei);
    },
    raspeln: function () {
      box(0, 0, 0, 5.6, 3.6, 0.45, TON.stahl);
      for (var j = 0; j < 4; j++) box(0.6, 0.45 + j * 0.7, 0.45, 4.4, 0.55, 0.55, TON.karotte);
      for (var k = 0; k < 3; k++) box(0.9, 0.8 + k * 0.7, 1.0, 3.8, 0.55, 0.55, TON.karotte);
      box(1.2, 1.15, 1.55, 3.2, 0.55, 0.55, TON.karotte);
      box(1.2, 1.85, 1.55, 3.2, 0.55, 0.55, TON.karotte);
    },
    reiben: function () {
      box(0, 0, 0, 5.2, 5.2, 0.45, TON.stahl);
      var l = [], a, b;
      for (a = 0; a < 3; a++) for (b = 0; b < 3; b++) l.push([0.7 + a * 1.2, 0.7 + b * 1.2, 0.45, 1.1, 1.1, 0.8, (a + b) % 3 === 0 ? TON.papier : ((a + b) % 3 === 1 ? TON.karotte : TON.salbei)]);
      for (a = 0; a < 2; a++) for (b = 0; b < 2; b++) l.push([1.3 + a * 1.2, 1.3 + b * 1.2, 1.25, 1.1, 1.1, 0.8, (a + b) % 2 ? TON.salbei : TON.papier]);
      l.push([1.9, 1.9, 2.05, 1.1, 1.1, 0.8, TON.karotte]);
      reihe(l);
    },
    schacht: function () {
      box(0, 0, 0, 5.2, 5.2, 0.45, TON.stahl);
      box(1.1, 1.0, 0.45, 1.0, 1.0, 3.9, TON.salbei);
      box(2.6, 2.3, 0.45, 1.5, 1.5, 1.5, TON.karotte);
      box(0.6, 0.6, 0.45, 3.9, 3.6, 3.2, TON.glas, { glas: true, offen: true });
    },
    // Zahlenleiste
    z5: function () {
      for (var i = 0; i < 5; i++) { var w = 3.6 - i * 0.55, o = (3.6 - w) / 2; box(o, o, i * 0.5, w, w, 0.5, i % 2 ? TON.stahl2 : TON.stahl); }
    },
    z800: function () {
      box(0, 0, 0, 3.4, 3.4, 2.2, TON.nacht);
      box(0, 0, 0.7, 3.4, 3.4, 0.4, TON.salbei);
      box(0.7, 0.7, 2.2, 2.0, 2.0, 0.2, TON.stahl);
      box(1.0, 1.0, 2.4, 1.4, 1.4, 2.2, TON.salbei);
      box(0.7, 0.7, 2.4, 2.0, 2.0, 1.8, TON.glas, { glas: true, offen: true });
    },
    z27: function () {
      box(0, 0, 0, 3.0, 3.0, 3.4, TON.nacht);
      box(0, 0, 0.7, 3.0, 3.0, 0.4, TON.salbei);
      box(-0.8, -0.8, 4.6, 4.6, 4.6, 1.2, TON.blau);
    },
    z815: function () {
      box(0, 0, 0, 3.8, 3.8, 2.8, TON.papier);
      box(1.4, -0.05, -0.05, 1.0, 3.9, 2.9, TON.blau);
      box(4.2, 1.0, 0, 2.2, 2.2, 1.5, TON.blau);
      box(4.9, 0.95, -0.05, 0.8, 2.3, 1.6, TON.papier);
    },
    // Ablauf
    s1: function () {
      box(0, 0, 0, 4.4, 4.4, 0.7, TON.nacht);
      box(0.3, 0.3, 0.7, 3.8, 3.8, 0.9, TON.stahl);
      box(0.8, 0.8, 1.6, 2.8, 2.8, 0.9, TON.stahl2);
      box(1.3, 1.3, 2.5, 1.8, 1.8, 0.9, TON.stahl);
      box(1.7, 1.7, 3.4, 1.0, 1.0, 0.5, TON.nacht);
    },
    s2: function () {
      box(0, 0, 0, 4.6, 4.6, 1.4, TON.nacht);
      box(1.7, 1.7, 1.4, 1.2, 1.2, 3.4, TON.salbei);
      box(1.2, 1.2, 1.4, 2.2, 2.2, 2.4, TON.glas, { glas: true, offen: true });
      box(1.3, 1.3, 5.2, 2.0, 2.0, 0.5, TON.nacht);
    },
    s3: function () {
      box(0, 0, 0, 3.0, 3.0, 2.0, TON.nacht);
      box(0.8, 0.8, 2.0, 1.4, 1.4, 0.6, TON.papier);
      box(0, 3.4, 0, 3.4, 0.3, 0.3, TON.papier);
      box(3.4, 3.4, 0, 3.4, 3.4, 0.35, TON.papier);
      box(3.4, 3.4, 0.35, 3.4, 0.3, 0.9, TON.papier);
      box(3.4, 3.7, 0.35, 0.3, 3.1, 0.9, TON.papier);
      reihe([
        [3.9, 3.9, 0.35, 0.8, 0.8, 0.8, TON.salbei],
        [4.9, 3.95, 0.35, 0.8, 0.8, 0.8, TON.karotte],
        [4.3, 4.9, 0.35, 0.8, 0.8, 0.8, TON.salbei],
        [5.4, 5.0, 0.35, 0.8, 0.8, 0.8, TON.papier],
        [4.4, 4.3, 1.15, 0.8, 0.8, 0.8, TON.karotte]
      ]);
      box(3.4, 6.5, 0.35, 3.4, 0.3, 0.9, TON.papier);
      box(6.5, 3.7, 0.35, 0.3, 3.1, 0.9, TON.papier);
    },
    paket: function () {
      box(0, 0, 0, 4.6, 4.6, 3.0, TON.papier);
      box(1.8, -0.05, -0.05, 1.0, 4.7, 3.1, TON.blau);
      box(0.9, 0.9, 3.0, 2.4, 2.4, 1.4, TON.salbei);
      box(1.7, 0.85, 2.95, 0.8, 2.5, 1.5, TON.papier);
      box(5.0, 1.2, 0, 2.8, 2.8, 1.8, TON.blau);
      box(5.9, 1.15, -0.05, 0.9, 2.9, 1.9, TON.papier);
    }
  };
  ICONS.szene = szeneHero;

  /* ---------- 3. In die Seite setzen ---------- */
  function bauen(el) {
    var name = el.getAttribute('data-iso'), f = ICONS[name];
    if (!f) return;
    neu();
    f();
    var pad = name === 'szene' ? 14 : 8;
    var x0 = ctx.min[0] - pad, y0 = ctx.min[1] - pad, b = ctx.max[0] - ctx.min[0] + 2 * pad, h = ctx.max[1] - ctx.min[1] + 2 * pad;
    el.setAttribute('viewBox', x0.toFixed(1) + ' ' + y0.toFixed(1) + ' ' + b.toFixed(1) + ' ' + h.toFixed(1));
    el.innerHTML = ctx.teile.map(function (t) {
      return '<g class="blk' + t.k + '" style="--i:' + t.i + '">' + t.s + '</g>';
    }).join('');
    ctx = null;
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-iso]'), bauen);

  /* ---------- 4. Einblenden beim Scrollen ---------- */
  var zeigen = document.querySelectorAll('.zeig');
  if ('IntersectionObserver' in window) {
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('da'); beobachter.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(zeigen, function (el) { beobachter.observe(el); });
  } else {
    Array.prototype.forEach.call(zeigen, function (el) { el.classList.add('da'); });
  }

  /* ---------- 5. Kaufknopf zählt im Beispiel nur den Zähler hoch ---------- */
  var zaehler = document.querySelector('[data-zaehler]');
  var knopf = document.querySelector('[data-kaufen]');
  if (zaehler && knopf) {
    knopf.addEventListener('click', function () {
      zaehler.textContent = String((parseInt(zaehler.textContent, 10) || 0) + 1);
    });
  }
})();
