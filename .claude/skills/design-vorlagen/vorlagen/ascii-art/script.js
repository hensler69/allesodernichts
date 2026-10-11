/* Look ASCII Art: Das Hero-Bild wird auf eine unsichtbare Zeichenfläche (Canvas) gemalt, jede Zeichenzelle
   wird in ein Zeichen aus RAMPE umgerechnet (dunkel = Leerzeichen, hell = @) und im <pre> gezeigt.
   Ohne JavaScript steht ein fertiges Standbild im HTML. */
(function () {
  'use strict';

  var RAMPE = ' .:-=+*#%@';     // von dunkel nach hell
  var UNTER = 3;                // Messpunkte je Zeichenzelle und Richtung (glättet die Kanten)
  var ZELLE_B = 0.6;            // Breite einer Zelle in em (JetBrains Mono ist 0,6 em breit, Zeilenhöhe 1 em)
  var REF_B = 72, REF_H = 42;   // Bezugsraster: so viele Spalten und Zeilen hat die Szene am PC
  var MAX_FPS = 12;
  var DAUER = 15;               // Sekunden je Durchlauf (Gemüse fällt, Schüssel füllt sich, blendet aus)
  var STAND_T = 9.3;            // Zeitpunkt des Standbilds (reduzierte Bewegung, ohne JavaScript)

  // ---------- Warenkorb-Zähler (nur kleine Rückmeldung) ----------
  var kauf = document.querySelector('[data-kaufen]');
  var zaehler = document.querySelector('[data-zaehler]');
  if (kauf && zaehler) {
    kauf.addEventListener('click', function (e) {
      zaehler.textContent = String((parseInt(zaehler.textContent, 10) || 0) + 1);
      // kleines Hüpfen des Zählers nur bei Maus oder Fingertipp (detail > 0), nie bei Tastatur
      if (e.detail > 0) {
        zaehler.classList.remove('hupf');
        void zaehler.offsetWidth;
        zaehler.classList.add('hupf');
      }
    });
    zaehler.addEventListener('animationend', function () { zaehler.classList.remove('hupf'); });
  }

  var pre = document.querySelector('[data-szene]');
  if (!pre) return;
  var flaeche = pre.parentElement;
  var figur = pre.closest('figure') || flaeche;
  var reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var cv = document.createElement('canvas');
  var cx = cv.getContext('2d', { willReadFrequently: true });
  if (!cx) return;

  var spalten = 0, zeilen = 0;

  function raster() {
    // Handy: kleineres Raster, damit die Zeichen groß genug zum Lesen bleiben
    var klein = flaeche.clientWidth < 460;
    var s = klein ? 48 : REF_B;
    var z = klein ? 26 : REF_H;
    if (s !== spalten || z !== zeilen) {
      spalten = s; zeilen = z;
      cv.width = spalten * UNTER; cv.height = zeilen * UNTER;
      pre.style.setProperty('--spalten', String(spalten));
    }
  }

  // ---------- kleine Helfer ----------
  function grau(v) {
    var n = Math.max(0, Math.min(255, Math.round(v * 255)));
    return 'rgb(' + n + ',' + n + ',' + n + ')';
  }
  function verlauf(x0, y0, x1, y1, stufen) {
    var g = cx.createLinearGradient(x0, y0, x1, y1);
    for (var i = 0; i < stufen.length; i++) g.addColorStop(stufen[i][0], grau(stufen[i][1]));
    return g;
  }
  function rund(x, y, w, h, r) {
    cx.beginPath();
    cx.moveTo(x + r, y);
    cx.arcTo(x + w, y, x + w, y + h, r);
    cx.arcTo(x + w, y + h, x, y + h, r);
    cx.arcTo(x, y + h, x, y, r);
    cx.arcTo(x, y, x + w, y, r);
    cx.closePath();
  }
  function ellipse(x, y, rx, ry, rot) {
    cx.beginPath();
    cx.ellipse(x, y, rx, ry, rot || 0, 0, Math.PI * 2);
  }
  // feste Zufallsfolge, damit jedes Bild zu jedem Zeitpunkt gleich aussieht
  function zufall(seed) {
    var a = seed >>> 0;
    return function () {
      a += 0x6D2B79F5;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---------- Plätze im Haufen: unten zuerst ----------
  var BOWL_X = 27.5, BOWL_Y = 35, BOWL_RX = 12, BOWL_RY = 2.3;
  var PLAETZE = (function () {
    var r = zufall(7), liste = [];
    var reihen = [
      { y: 34.6, n: 8, x0: 19.2, x1: 35.8 },
      { y: 33.1, n: 7, x0: 20.4, x1: 34.6 },
      { y: 31.7, n: 5, x0: 22.0, x1: 33.0 },
      { y: 30.4, n: 3, x0: 24.0, x1: 31.0 },
      { y: 29.2, n: 1, x0: 27.5, x1: 27.5 }
    ];
    reihen.forEach(function (re) {
      for (var i = 0; i < re.n; i++) {
        var f = re.n === 1 ? 0 : i / (re.n - 1);
        liste.push({
          x: re.x0 + (re.x1 - re.x0) * f + (r() - 0.5) * 0.8,
          y: re.y + (r() - 0.5) * 0.6,
          typ: Math.floor(r() * 3),
          rot: r() * Math.PI,
          kipp: 0.45 + r() * 0.4
        });
      }
    });
    return liste;
  })();

  var SPAWN = 0.5;    // alle 0,5 s ein neues Stück
  var FLUG = 0.8;     // Fallzeit
  var AUS_X = 24, AUS_Y = 23.4;

  function stueck(typ, x, y, rot, kipp, hell) {
    cx.save();
    cx.translate(x, y);
    cx.rotate(rot);
    if (typ === 2) {
      // Karottenstreifen
      rund(-1.9, -0.45, 3.8, 0.9, 0.45);
      cx.fillStyle = grau(0.78 * hell);
      cx.fill();
      cx.fillStyle = grau(0.45 * hell);
      cx.fillRect(-0.5, -0.45, 0.35, 0.9);
      cx.fillRect(0.8, -0.45, 0.35, 0.9);
    } else {
      var r = typ === 0 ? 1.55 : 1.4;
      var a = typ === 0 ? 0.95 : 0.62;     // Gurke hell, Tomate dunkler
      var b = typ === 0 ? 0.5 : 0.86;      // Innenring
      ellipse(0, 0, r, r * kipp);
      cx.fillStyle = grau(a * hell);
      cx.fill();
      ellipse(0, 0, r * 0.62, r * kipp * 0.62);
      cx.fillStyle = grau(b * hell);
      cx.fill();
      ellipse(0, 0, r * 0.2, r * kipp * 0.2);
      cx.fillStyle = grau(a * 0.7 * hell);
      cx.fill();
    }
    cx.restore();
  }

  // ---------- Szene malen (t in Sekunden) ----------
  function malen(t) {
    var W = spalten * UNTER, H = zeilen * UNTER;
    var k = spalten / REF_B;                      // Maßstab gegenüber dem Bezugsraster
    var sx = UNTER * k / ZELLE_B, sy = UNTER * k; // Bildpunkte je em
    var oy = zeilen / k - REF_H;                  // Handy: oben leere Zeilen abschneiden, unten bündig
    cx.setTransform(1, 0, 0, 1, 0, 0);
    cx.fillStyle = '#000';
    cx.fillRect(0, 0, W, H);
    cx.setTransform(sx, 0, 0, sy, 0, oy * sy);

    var tz = t % DAUER;
    var laeuft = Math.min(tz, 12.4);              // Maschine steht still, wenn alles gefallen ist
    var blende = tz > DAUER - 1 ? Math.max(0, DAUER - tz) : 1;

    // Arbeitsplatte und Schatten
    cx.fillStyle = verlauf(0, 40.4, 0, 42, [[0, 0.55], [1, 0.12]]);
    cx.fillRect(0, 40.6, 43.2, 1.4);
    ellipse(26, 40.2, 17, 1.0);
    cx.fillStyle = grau(0.2);
    cx.fill();

    // Standfuß und Säule
    rund(1.5, 36.6, 14.5, 3.4, 1.2);
    cx.fillStyle = verlauf(0, 36.6, 0, 40, [[0, 0.9], [1, 0.32]]);
    cx.fill();
    rund(3.5, 15, 8, 23, 1.8);
    cx.fillStyle = verlauf(3.5, 0, 11.5, 0, [[0, 0.3], [0.28, 0.92], [0.62, 0.55], [1, 0.18]]);
    cx.fill();
    // Drehknopf mit Rasten
    ellipse(7.5, 24.5, 2.1, 2.1);
    cx.fillStyle = grau(0.12);
    cx.fill();
    cx.lineWidth = 0.4;
    cx.strokeStyle = grau(0.98);
    cx.stroke();
    cx.beginPath();
    cx.moveTo(7.5, 24.5);
    cx.lineTo(8.7, 23.2);
    cx.lineWidth = 0.45;
    cx.stroke();
    for (var i = 0; i < 3; i++) {
      ellipse(7.5, 29.2 + i * 2.1, 0.4, 0.4);
      cx.fillStyle = grau(0.12);
      cx.fill();
    }

    // Kegel-Einsatz (Messerwalze) mit wandernden Rillen
    cx.save();
    cx.beginPath();
    cx.moveTo(17, 15.5);
    cx.lineTo(31, 15.5);
    cx.lineTo(27, 22.6);
    cx.lineTo(21, 22.6);
    cx.closePath();
    cx.fillStyle = verlauf(17, 0, 31, 0, [[0, 0.28], [0.35, 0.96], [0.7, 0.6], [1, 0.32]]);
    cx.fill();
    cx.clip();
    cx.strokeStyle = grau(0.04);
    cx.lineWidth = 0.55;
    var abstand = 1.6, ph = (laeuft * 2.2) % abstand;
    for (var j = -1; j < 6; j++) {
      var yy = 15.2 + j * abstand + ph;
      var bre = 7 - (yy - 15.5) * 0.52;            // Breite folgt dem Kegel
      cx.beginPath();
      cx.ellipse(24, yy, Math.max(1, bre), 0.5, 0, 0, Math.PI);
      cx.stroke();
    }
    cx.restore();
    // Ausgang
    ellipse(24, 22.7, 3, 0.6);
    cx.fillStyle = grau(0.04);
    cx.fill();
    cx.lineWidth = 0.28;
    cx.strokeStyle = grau(0.75);
    cx.stroke();

    // Kopf (Motorgehäuse) über Säule und Kegel
    rund(3, 8, 28, 7.6, 3.2);
    cx.fillStyle = verlauf(0, 8, 0, 15.6, [[0, 0.98], [0.45, 0.7], [1, 0.22]]);
    cx.fill();
    cx.beginPath();
    cx.moveTo(6.5, 9.4);
    cx.lineTo(28.5, 9.4);
    cx.lineWidth = 0.35;
    cx.strokeStyle = grau(1);
    cx.stroke();
    // Lüftungsschlitze
    cx.strokeStyle = grau(0.12);
    cx.lineWidth = 0.3;
    for (var s = 0; s < 4; s++) {
      cx.beginPath();
      cx.moveTo(7 + s * 1.5, 12.2);
      cx.lineTo(7 + s * 1.5, 14.2);
      cx.stroke();
    }

    // Schacht oben mit Gurke
    cx.fillStyle = verlauf(20, 0, 28, 0, [[0, 0.42], [0.3, 0.96], [0.7, 0.66], [1, 0.3]]);
    cx.fillRect(20, 5.6, 8, 3.4);
    ellipse(24, 5.6, 4, 0.85);
    cx.fillStyle = grau(0.08);
    cx.fill();
    cx.lineWidth = 0.34;
    cx.strokeStyle = grau(0.98);
    cx.stroke();
    cx.save();
    cx.translate(23.6, 5.4);
    cx.rotate(-0.12);
    rund(-1.1, -2.4, 2.2, 4.6, 1.0);
    cx.fillStyle = verlauf(-1.1, 0, 1.1, 0, [[0, 0.5], [0.4, 0.92], [1, 0.45]]);
    cx.fill();
    cx.restore();

    // Schüssel: Körper, Innenraum, Gemüse, vordere Lippe
    cx.beginPath();
    cx.moveTo(BOWL_X - BOWL_RX, BOWL_Y);
    cx.bezierCurveTo(BOWL_X - BOWL_RX, BOWL_Y + 3.8, BOWL_X - 8, 40.7, BOWL_X - 4, 40.7);
    cx.lineTo(BOWL_X + 4, 40.7);
    cx.bezierCurveTo(BOWL_X + 8, 40.7, BOWL_X + BOWL_RX, BOWL_Y + 3.8, BOWL_X + BOWL_RX, BOWL_Y);
    cx.closePath();
    cx.fillStyle = verlauf(BOWL_X - BOWL_RX, 0, BOWL_X + BOWL_RX, 0, [[0, 0.3], [0.3, 0.88], [0.62, 0.56], [1, 0.2]]);
    cx.fill();
    ellipse(BOWL_X, BOWL_Y, BOWL_RX, BOWL_RY);
    cx.fillStyle = grau(0.06);
    cx.fill();
    cx.lineWidth = 0.4;
    cx.strokeStyle = grau(0.97);
    cx.stroke();

    // Gemüse: nur oberhalb der vorderen Schüssellippe zeichnen
    cx.save();
    cx.beginPath();
    cx.moveTo(BOWL_X - BOWL_RX, -10);
    cx.lineTo(BOWL_X + BOWL_RX, -10);
    cx.lineTo(BOWL_X + BOWL_RX, BOWL_Y);
    cx.ellipse(BOWL_X, BOWL_Y, BOWL_RX, BOWL_RY, 0, 0, Math.PI, false);
    cx.closePath();
    cx.clip();
    for (var n = 0; n < PLAETZE.length; n++) {
      var ab = n * SPAWN;
      var tau = (tz - ab) / FLUG;
      if (tau < 0) break;
      var p = PLAETZE[n], px, py, rot, kipp;
      if (tau >= 1) {
        px = p.x; py = p.y; rot = p.rot; kipp = p.kipp;
      } else {
        var e = tau * tau;                          // freier Fall
        px = AUS_X + (p.x - AUS_X) * tau;
        py = AUS_Y + (p.y - AUS_Y) * e;
        rot = p.rot + tau * 5;
        kipp = 0.35 + 0.65 * Math.abs(Math.cos(tau * 4 + n));
      }
      cx.globalAlpha = blende;
      stueck(p.typ, px, py, rot, kipp, 1);
      cx.globalAlpha = 1;
    }
    cx.restore();
    // vordere Lippe über dem Gemüse
    cx.beginPath();
    cx.ellipse(BOWL_X, BOWL_Y, BOWL_RX, BOWL_RY, 0, 0, Math.PI, false);
    cx.lineWidth = 0.5;
    cx.strokeStyle = grau(0.97);
    cx.stroke();
  }

  // ---------- in Zeichen umrechnen ----------
  function umrechnen() {
    var W = spalten * UNTER, H = zeilen * UNTER;
    var d = cx.getImageData(0, 0, W, H).data;
    var teiler = UNTER * UNTER * 255;
    var zeilenText = new Array(zeilen);
    for (var r = 0; r < zeilen; r++) {
      var zeile = '';
      for (var c = 0; c < spalten; c++) {
        var summe = 0;
        for (var yy = 0; yy < UNTER; yy++) {
          var basis = ((r * UNTER + yy) * W + c * UNTER) * 4;
          for (var xx = 0; xx < UNTER; xx++) summe += d[basis + xx * 4];
        }
        var v = summe / teiler;
        var idx = Math.min(RAMPE.length - 1, Math.floor(Math.pow(v, 0.9) * RAMPE.length));
        zeile += RAMPE.charAt(idx);
      }
      zeilenText[r] = zeile.replace(/\s+$/, '');
    }
    return zeilenText.join('\n');
  }

  function zeigen(t) {
    raster();
    malen(t);
    pre.textContent = umrechnen();
  }

  // ---------- Ablauf ----------
  var start = performance.now();
  var VORLAUF = 5.5;           // beim Laden schon ein paar Stücke in der Schüssel
  var sichtbar = true, timer = 0, aktiv = false;

  function jetzt() { return (performance.now() - start) / 1000 + VORLAUF; }

  function bild() {
    timer = 0;
    if (!soll()) { aktiv = false; return; }
    zeigen(jetzt());
    planen();
  }
  function planen() {
    // höchstens MAX_FPS Bilder pro Sekunde: erst warten, dann im nächsten Anzeigebild malen
    timer = window.setTimeout(function () { window.requestAnimationFrame(bild); }, 1000 / MAX_FPS - 8);
  }
  function soll() { return !reduziert && sichtbar && !document.hidden; }
  function anstossen() {
    if (!aktiv && soll()) { aktiv = true; planen(); }
  }

  if (reduziert) {
    zeigen(STAND_T);
  } else {
    zeigen(jetzt());
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (eintraege) {
        sichtbar = eintraege[0].isIntersecting;
        if (sichtbar) anstossen();
      }).observe(figur);
    }
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) anstossen();
    });
    anstossen();
  }

  // Raster neu wählen, wenn sich die Breite ändert (Drehen, Fenster ziehen)
  if ('ResizeObserver' in window) {
    var letzteBreite = flaeche.clientWidth;
    new ResizeObserver(function () {
      var b = flaeche.clientWidth;
      if ((b < 460) !== (letzteBreite < 460)) {
        letzteBreite = b;
        zeigen(reduziert ? STAND_T : jetzt());
      }
    }).observe(flaeche);
  }
})();
