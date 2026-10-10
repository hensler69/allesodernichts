/* HORTA, Look Particles
   Drei kleine Teile: Menü (Handy), Warenkorb-Zähler (nur Demo) und das Punktfeld im Hero.
   Alles ist Zugabe. Ohne dieses Skript bleibt die Seite vollständig lesbar. */
(function () {
  'use strict';

  /* ---------- Menü (nur Handy und Tablet, sichtbar durch CSS) ---------- */
  var menue = document.querySelector('.menue');
  var nav = document.getElementById('nav');
  if (menue && nav) {
    var schliessen = function (fokus) {
      nav.classList.remove('offen');
      menue.setAttribute('aria-expanded', 'false');
      if (fokus) menue.focus();
    };
    menue.addEventListener('click', function () {
      var auf = menue.getAttribute('aria-expanded') === 'true';
      nav.classList.toggle('offen', !auf);
      menue.setAttribute('aria-expanded', String(!auf));
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) schliessen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('offen')) schliessen(true);
    });
  }

  /* ---------- Warenkorb-Zähler (Demo, keine echte Bestellung) ---------- */
  var kaufen = document.getElementById('kaufen');
  var zaehler = document.getElementById('korb-zahl');
  if (kaufen && zaehler) {
    var anzahl = 0;
    kaufen.addEventListener('click', function (e) {
      anzahl += 1;
      zaehler.textContent = String(anzahl);
      // Nur bei Maus oder Touch hüpft die Zahl. Ein Klick per Tastatur (detail = 0) bleibt ohne Bewegung.
      if (e.detail > 0) {
        zaehler.classList.remove('is-hops');
        void zaehler.offsetWidth;
        zaehler.classList.add('is-hops');
      }
    });
  }

  /* ---------- Punktfeld ----------
     Ein Canvas liegt hinter dem Hero. Etwa 90 Partikel am PC, etwa 40 am Handy (nach Fläche gerechnet).
     Sie driften langsam, nahe Partikel verbindet eine dünne Linie, der Mauszeiger stößt sie sanft ab.
     Beim Laden sammeln sie sich zu einem Ring mit fünf Löchern (der Kegel-Einsatz) und lösen sich dann ins Feld auf.
     Ruhige Zonen (Text, Figur) dimmen das Feld, damit Text nie auf unruhigen Punkten liegt. */
  var hero = document.getElementById('ueberblick');
  var canvas = document.getElementById('feld');
  var figur = document.getElementById('figur');
  if (!hero || !canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var mqRuhe = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqFein = window.matchMedia('(hover: hover) and (pointer: fine)');

  var SAMMELN = 850;      // Millisekunden bis alle Punkte im Ring sind
  var HALTEN = 550;       // Ring bleibt kurz stehen und dreht sich leicht
  var ZEIGER_R = 130;     // Reichweite des Zeigers in Pixeln
  var FARBEN = ['rgb(182,255,92)', 'rgb(92,255,200)'];
  var LINIE = '182,255,92';
  var PI2 = Math.PI * 2;

  var W = 0, H = 0, dpr = 1;
  var teile = [];
  var zonen = [];
  var ring = null;
  var gruppen = [];       // Formen des Rings: [Start, Anzahl] je Außenring und Loch
  var slotTeil = [];      // Platz im Ring -> Partikel
  var phase = 2;          // 0 sammeln, 1 halten, 2 frei
  var tPhase = 0, tFrei = 0;
  var laeuft = false, sichtbar = true, angehalten = false, reduziert = mqRuhe.matches;
  var zeiger = null, zg = null, rafId = 0, letzte = 0, letzteRaf = 0;   // zg: geglätteter Zeiger
  var guete = 1, emaDt = 16, bilder = 0;
  var stapel = [[], [], [], []];
  var STUFEN = [0.1, 0.19, 0.29, 0.4];

  function klein() { return W < 700; }

  function zahl() {
    var n = Math.round(W * H / 10500);
    n = Math.max(40, Math.min(90, n));
    return Math.max(24, Math.round(n * guete));
  }

  function masse() {
    var r = hero.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    // Pixel-Budget: höchstens 2-fache Dichte und höchstens etwa 1,6 Megapixel, damit große Bildschirme nicht ins Stocken kommen
    dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(1600000 / (W * H)));
    dpr = Math.max(1, dpr);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function zonenMessen() {
    var hr = hero.getBoundingClientRect();
    zonen = [];
    var ruhige = hero.querySelectorAll('.ruhig');
    for (var i = 0; i < ruhige.length; i++) {
      var b = ruhige[i].getBoundingClientRect();
      zonen.push({ l: b.left - hr.left, t: b.top - hr.top, r: b.right - hr.left, b: b.bottom - hr.top, min: 0.14, rand: 56, art: 'text' });
    }
    ring = null;
    if (figur) {
      var f = figur.getBoundingClientRect();
      if (f.width > 0 && f.height > 0) {
        zonen.push({ l: f.left - hr.left, t: f.top - hr.top, r: f.right - hr.left, b: f.bottom - hr.top, min: 0.42, rand: 36, art: 'figur' });
        ring = { x: (f.left + f.right) / 2 - hr.left, y: (f.top + f.bottom) / 2 - hr.top, r: Math.min(f.width, f.height) * 0.34 };
      }
    }
  }

  /* Faktor 0.14 bis 1: wie sichtbar das Feld an dieser Stelle sein darf */
  function faktor(x, y) {
    var f = 1;
    // die Figur dimmt das Feld erst, wenn der Ring sich aufgelöst hat
    var fz = phase < 2 ? 0 : Math.min(1, tFrei / 900);
    for (var i = 0; i < zonen.length; i++) {
      var z = zonen[i];
      var dx = Math.max(z.l - x, 0, x - z.r);
      var dy = Math.max(z.t - y, 0, y - z.b);
      var d = Math.sqrt(dx * dx + dy * dy);
      var k = d >= z.rand ? 1 : d / z.rand;
      k = k * k * (3 - 2 * k);
      var mn = z.art === 'figur' ? 1 - (1 - z.min) * fz : z.min;
      var v = mn + (1 - mn) * k;
      if (v < f) f = v;
    }
    return f;
  }

  /* Ziele des Rings: zwei Außenringe, fünf Löcher, eine Nabe. Summe ist immer genau n. */
  function ringZiele(n, cx, cy, R) {
    var z = [], gr = [];
    var loch = Math.max(4, Math.floor(n * 0.075));
    var aussen = n - 5 * loch - 1;
    var a1 = Math.ceil(aussen * 0.6), a2 = aussen - a1;
    var kreis = function (m, r, x0, y0, w0) {
      gr.push([z.length, m]);
      for (var i = 0; i < m; i++) z.push([x0 + r * Math.cos(w0 + i * PI2 / m), y0 + r * Math.sin(w0 + i * PI2 / m)]);
    };
    kreis(a1, R, cx, cy, -Math.PI / 2);
    kreis(a2, R * 0.84, cx, cy, -Math.PI / 2 + Math.PI / Math.max(1, a2));
    for (var k = 0; k < 5; k++) {
      var w = -Math.PI / 2 + k * PI2 / 5;
      kreis(loch, R * 0.2, cx + R * 0.52 * Math.cos(w), cy + R * 0.52 * Math.sin(w), 0);
    }
    z.push([cx, cy]);
    return { pts: z, gruppen: gr };
  }

  function mischen(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
  }

  function erzeugen(n, mitRing) {
    teile = [];
    gruppen = [];
    slotTeil = [];
    var sk = klein() ? 0.75 : 1;
    var ziele = null, reihe = null;
    if (mitRing && ring) {
      var rz = ringZiele(n, ring.x, ring.y, ring.r);
      ziele = rz.pts;
      gruppen = rz.gruppen;
      reihe = [];
      for (var z = 0; z < n; z++) reihe.push(z);
      mischen(reihe);
    }
    for (var i = 0; i < n; i++) {
      // gleichmäßig streuen: bester von fünf Zufallspunkten
      var bx = 0, by = 0, bd = -1;
      for (var c = 0; c < 5; c++) {
        var x = Math.random() * W, y = Math.random() * H, md = 1e9;
        for (var j = 0; j < teile.length; j++) {
          var dx = teile[j].x - x, dy = teile[j].y - y, d2 = dx * dx + dy * dy;
          if (d2 < md) md = d2;
        }
        if (md > bd) { bd = md; bx = x; by = y; }
      }
      var w = Math.random() * PI2, v = (8 + Math.random() * 14) * sk;
      var p = {
        x: bx, y: by, vx: Math.cos(w) * v, vy: Math.sin(w) * v, bx: 0, by: 0,
        r: (1.4 + Math.random() * 1.6) * (klein() ? 0.85 : 1),
        c: Math.random() < 0.6 ? 0 : 1, h: Math.random(), f: 1,
        sx: bx, sy: by, tx: bx, ty: by, zi: -1
      };
      if (ziele) { p.zi = reihe[i]; p.tx = ziele[p.zi][0]; p.ty = ziele[p.zi][1]; slotTeil[p.zi] = p; }
      teile.push(p);
    }
  }

  function freigeben() {
    var cx = ring ? ring.x : W / 2, cy = ring ? ring.y : H / 2;
    for (var i = 0; i < teile.length; i++) {
      var p = teile[i];
      var dx = p.x - cx, dy = p.y - cy, l = Math.sqrt(dx * dx + dy * dy) || 1;
      var s = 120 + Math.random() * 170;
      p.bx = dx / l * s; p.by = dy / l * s;
    }
  }

  function schritt(dt) {
    var i, p;
    if (phase === 0) {
      tPhase += dt * 1000;
      var k = Math.min(1, tPhase / SAMMELN);
      var e = 1 - Math.pow(1 - k, 4);
      for (i = 0; i < teile.length; i++) {
        p = teile[i];
        p.x = p.sx + (p.tx - p.sx) * e;
        p.y = p.sy + (p.ty - p.sy) * e;
      }
      if (k >= 1) phase = 1;
      return;
    }
    if (phase === 1) {
      tPhase += dt * 1000;
      var k2 = Math.min(1, (tPhase - SAMMELN) / HALTEN);
      var w = k2 * 0.5, cs = Math.cos(w), sn = Math.sin(w);
      for (i = 0; i < teile.length; i++) {
        p = teile[i];
        var rx = p.tx - ring.x, ry = p.ty - ring.y;
        p.x = ring.x + rx * cs - ry * sn;
        p.y = ring.y + rx * sn + ry * cs;
      }
      if (k2 >= 1) { freigeben(); phase = 2; tFrei = 0; }
      return;
    }
    tFrei += dt * 1000;
    if (gruppen.length && tFrei > 450) { gruppen = []; slotTeil = []; }
    var zerfall = Math.exp(-2.2 * dt);
    var zr2 = ZEIGER_R * ZEIGER_R;
    // Der Zeiger wird weich nachgeführt, so springt der Abstoß nicht
    if (zeiger) {
      if (!zg) zg = { x: zeiger.x, y: zeiger.y };
      else { var kz = 1 - Math.exp(-16 * dt); zg.x += (zeiger.x - zg.x) * kz; zg.y += (zeiger.y - zg.y) * kz; }
    } else zg = null;
    for (i = 0; i < teile.length; i++) {
      p = teile[i];
      if (zg) {
        var dx = p.x - zg.x, dy = p.y - zg.y, d2 = dx * dx + dy * dy;
        if (d2 < zr2 && d2 > 0.01) {
          var d = Math.sqrt(d2), s = 1 - d / ZEIGER_R, kraft = s * s * 640 * dt;
          p.bx += dx / d * kraft; p.by += dy / d * kraft;
          var bl = Math.sqrt(p.bx * p.bx + p.by * p.by);
          if (bl > 220) { p.bx *= 220 / bl; p.by *= 220 / bl; }
        }
      }
      p.x += (p.vx + p.bx) * dt;
      p.y += (p.vy + p.by) * dt;
      p.bx *= zerfall; p.by *= zerfall;
      if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); p.bx = Math.abs(p.bx); }
      else if (p.x > W) { p.x = W; p.vx = -Math.abs(p.vx); p.bx = -Math.abs(p.bx); }
      if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); p.by = Math.abs(p.by); }
      else if (p.y > H) { p.y = H; p.vy = -Math.abs(p.vy); p.by = -Math.abs(p.by); }
    }
  }

  function zeichne() {
    ctx.clearRect(0, 0, W, H);
    var n = teile.length, i, j, p, q;
    var basis = klein() ? 92 : 124;
    var linkD = phase < 2 ? 0 : basis * Math.min(1, tFrei / 1000);
    if (reduziert) linkD = basis;
    var l2 = linkD * linkD;
    for (i = 0; i < n; i++) { p = teile[i]; p.f = faktor(p.x, p.y); }
    for (i = 0; i < 4; i++) stapel[i].length = 0;
    for (i = 0; i < n && linkD > 1; i++) {
      p = teile[i];
      for (j = i + 1; j < n; j++) {
        q = teile[j];
        var dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
        if (d2 >= l2) continue;
        var a = (1 - Math.sqrt(d2) / linkD) * Math.min(p.f, q.f);
        var s = Math.min(3, Math.floor(a * 4.2));
        var arr = stapel[s];
        arr.push(p.x, p.y, q.x, q.y);
      }
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(' + LINIE + ')';
    for (i = 0; i < 4; i++) {
      var li = stapel[i];
      if (!li.length) continue;
      ctx.globalAlpha = STUFEN[i];
      ctx.beginPath();
      for (j = 0; j < li.length; j += 4) { ctx.moveTo(li[j], li[j + 1]); ctx.lineTo(li[j + 2], li[j + 3]); }
      ctx.stroke();
    }
    // Ring mit fünf Löchern: Linien zwischen den Nachbarn, erst wenn die Punkte angekommen sind, dann schnell ausgeblendet
    var ringA = 0;
    if (gruppen.length) {
      if (phase === 0) { var kk = Math.min(1, tPhase / SAMMELN); ringA = Math.pow(1 - Math.pow(1 - kk, 4), 3); }
      else if (phase === 1) ringA = 1;
      else ringA = Math.max(0, 1 - tFrei / 400);
    }
    if (ringA > 0.01) {
      ctx.globalAlpha = 0.75 * ringA;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (i = 0; i < gruppen.length; i++) {
        var g = gruppen[i];
        for (j = 0; j < g[1]; j++) {
          p = slotTeil[g[0] + j]; q = slotTeil[g[0] + (j + 1) % g[1]];
          if (p && q) { ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); }
        }
      }
      ctx.stroke();
      ctx.lineWidth = 1;
    }
    for (i = 0; i < n; i++) {
      p = teile[i];
      ctx.globalAlpha = (0.55 + 0.4 * p.h) * p.f;
      ctx.fillStyle = FARBEN[p.c];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, PI2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* Wenn das Gerät nicht mitkommt (Durchschnitt über 30 ms pro Bild), wird das Feld um ein Viertel kleiner. */
  function gueteKontrolle(dt) {
    if (phase < 2) return;
    emaDt = emaDt * 0.95 + dt * 1000 * 0.05;
    bilder += 1;
    if (bilder > 90 && emaDt > 30 && teile.length > 24) {
      guete *= 0.75;
      teile.length = Math.max(24, Math.floor(teile.length * 0.75));
      bilder = 0; emaDt = 16;
    }
  }

  function schleife(ts) {
    rafId = 0;
    if (!laeuft) return;
    // Rohabstand der Bildschirmbilder: dient nur der Gütekontrolle (kommt das Gerät nicht mit, wird das Feld kleiner)
    var roh = Math.min(0.1, Math.max(0.001, (ts - letzteRaf) / 1000));
    letzteRaf = ts;
    gueteKontrolle(roh);
    // Im ruhigen Feld genügen 30 Bilder pro Sekunde (die Punkte driften nur langsam). Ring und Auflösung laufen mit voller Rate.
    if (phase === 2 && tFrei > 1600 && ts - letzte < 28) { rafId = window.requestAnimationFrame(schleife); return; }
    var dt = Math.min(0.05, Math.max(0.001, (ts - letzte) / 1000));
    letzte = ts;
    schritt(dt);
    zeichne();
    rafId = window.requestAnimationFrame(schleife);
  }

  function starten() {
    if (laeuft || reduziert || !sichtbar || document.hidden) return;
    laeuft = true;
    letzte = letzteRaf = performance.now();
    rafId = window.requestAnimationFrame(schleife);
  }

  function stoppen() {
    laeuft = false;
    if (rafId) { window.cancelAnimationFrame(rafId); rafId = 0; }
  }

  /* Größe geändert: Positionen mitskalieren, Zahl anpassen. Bei reduzierter Bewegung neues Standbild.
     Läuft gerade der Ring, bleibt die Einleitung erhalten und der Ring zieht zur neuen Mitte. */
  function neuMessen() {
    var altW = W, altH = H;
    var r = hero.getBoundingClientRect();
    var gleich = Math.abs(Math.round(r.width) - altW) < 1 && Math.abs(Math.round(r.height) - altH) < 1;
    if (!gleich) masse();
    zonenMessen();
    if (reduziert) { if (!gleich || !teile.length) erzeugen(zahl(), false); phase = 2; zeichne(); return; }
    if (!gleich && altW > 1 && altH > 1) {
      for (var i = 0; i < teile.length; i++) {
        var p = teile[i];
        p.x *= W / altW; p.y *= H / altH; p.sx *= W / altW; p.sy *= H / altH;
      }
    }
    if (phase < 2 && ring) {
      var ziele = ringZiele(teile.length, ring.x, ring.y, ring.r).pts;
      for (var k = 0; k < teile.length; k++) {
        if (teile[k].zi >= 0) { teile[k].tx = ziele[teile[k].zi][0]; teile[k].ty = ziele[teile[k].zi][1]; }
      }
    } else if (phase < 2) { phase = 2; tFrei = 900; }
    var soll = zahl();
    if (phase === 2 && Math.abs(soll - teile.length) > soll * 0.25) erzeugen(soll, false);
    if (!laeuft) zeichne();
  }

  function einstellen(mitEinleitung) {
    reduziert = mqRuhe.matches || angehalten;
    stoppen();
    masse();
    zonenMessen();
    var n = zahl();
    if (reduziert) {
      erzeugen(n, false);
      phase = 2;
      zeichne();            // ein Standbild, keine Schleife
    } else {
      erzeugen(n, !!mitEinleitung);
      phase = (mitEinleitung && ring) ? 0 : 2;
      tPhase = 0; tFrei = 1600;
      zeichne();
      starten();
    }
  }

  var wartet = 0;
  function verzoegert() {
    window.clearTimeout(wartet);
    wartet = window.setTimeout(neuMessen, 120);
  }

  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(verzoegert);
    ro.observe(hero);
    var teil = hero.querySelectorAll('.ruhig');
    for (var t = 0; t < teil.length; t++) ro.observe(teil[t]);
    if (figur) ro.observe(figur);
  } else {
    window.addEventListener('resize', verzoegert);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (eintraege) {
      sichtbar = eintraege[eintraege.length - 1].isIntersecting;
      if (sichtbar) starten(); else stoppen();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', function () { if (document.hidden) stoppen(); else starten(); });

  hero.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' || !mqFein.matches) return;
    var b = hero.getBoundingClientRect();
    zeiger = { x: e.clientX - b.left, y: e.clientY - b.top };
  });
  hero.addEventListener('pointerleave', function () { zeiger = null; });

  var wechsel = function () { einstellen(false); };
  if (mqRuhe.addEventListener) mqRuhe.addEventListener('change', wechsel); else if (mqRuhe.addListener) mqRuhe.addListener(wechsel);

  /* Pausenknopf: hält Feld und Figur an (Standbild an Ort und Stelle) und setzt sie fort */
  var pause = document.querySelector('.bewegung');
  if (pause) {
    pause.addEventListener('click', function () {
      angehalten = !angehalten;
      reduziert = mqRuhe.matches || angehalten;
      document.documentElement.classList.toggle('ruhe', angehalten);
      pause.setAttribute('aria-label', angehalten ? 'Hintergrundbewegung starten' : 'Hintergrundbewegung anhalten');
      if (phase < 2) { phase = 2; tFrei = 1600; gruppen = []; slotTeil = []; }
      if (reduziert) { stoppen(); zeichne(); } else { starten(); }
    });
  }

  einstellen(true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(verzoegert);
})();
