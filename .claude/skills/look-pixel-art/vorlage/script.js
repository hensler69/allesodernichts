/* HORTA, Look "Pixel Art".
   1. Setzt Zeichenkarten (Strings, ein Zeichen = ein Pixel) in SVG um.
   2. Startet drei Effekte, jeder genau einmal, sobald er sichtbar wird: fallendes Gemuese,
      Schreibmaschine im Dialogkasten, Lieferzeit-Balken.
   3. Zaehlt den Warenkorb hoch.
   Ohne dieses Skript bleibt der gesamte Text sichtbar. Bei reduzierter Bewegung gibt es nur Standbilder. */
(function () {
  'use strict';

  /* PICO-8-Palette: jedes Zeichen einer Zeichenkarte ist eine Hex-Ziffer 0 bis f. Punkt = durchsichtig. */
  var PAL = {
    '0': '#000000', '1': '#1d2b53', '2': '#7e2553', '3': '#008751',
    '4': '#ab5236', '5': '#5f574f', '6': '#c2c3c7', '7': '#fff1e8',
    '8': '#ff004d', '9': '#ffa300', 'a': '#ffec27', 'b': '#00e436',
    'c': '#29adff', 'd': '#83769c', 'e': '#ff77a8', 'f': '#ffccaa'
  };

  /* Zeichenkarten. Ein Zeichen = ein Pixel, Zeichen = Farbe der Palette oben, Punkt = durchsichtig. */
  var KARTEN = {
    stern: [
      ".....9.....",
      "....f99....",
      "....f999...",
      "99ff9999999",
      ".9f9999994.",
      "..99999994.",
      "..9999994..",
      ".99999994..",
      ".9999.9994.",
      ".999...994."
    ],
    stern_leer: [
      ".....d.....",
      "....ddd....",
      "....dddd...",
      "ddddddddddd",
      ".ddddddddd.",
      "..dddddddd.",
      "..ddddddd..",
      ".dddddddd..",
      ".dddd.dddd.",
      ".ddd...ddd."
    ],
    muenze: [
      "...44499444...",
      "..4999999994..",
      ".499ff9999994.",
      "499f9999999994",
      "49ff9444499994",
      "49f99499999994",
      "99999444999999",
      "99999499999999",
      "49999444499994",
      "49999999999494",
      "49999999994494",
      ".499999994494.",
      "..4999994994..",
      "...44499444..."
    ],
    tomate: [
      "......00......",
      "....00b300....",
      "...0b033bb0...",
      "..0bbbbb8bb0..",
      ".0888e8888880.",
      "0888e888888880",
      "088e8888888880",
      "088e8888888880",
      "08888888888880",
      "08888888888880",
      "08888888888280",
      ".088888888820.",
      "..0888888220..",
      "...000882020.."
    ],
    t_scheibe: [
      "2888882",
      "8e8e888",
      "8888e88",
      "8e8888e",
      "88e8888",
      "8888e88",
      "2888882"
    ],
    g_scheibe: [
      ".33333.",
      "3bbbbb3",
      "3bfbfb3",
      "3bbfbb3",
      "3bfbfb3",
      "3bbbbb3",
      ".33333."
    ],
    k_streifen: [
      ".9f",
      "99f",
      "9f9",
      "99.",
      "4f9",
      "9.9",
      ".9."
    ],
    kohl_stueck: [
      ".7bb7.",
      "7bb77b",
      "b7bbb7",
      "7bb7b3",
      ".3bb3."
    ],
    karotte: [
      ".....0.....",
      "....0b0....",
      "...0bbb0...",
      "..0b030b0..",
      "..0bb3bb0..",
      "...00300...",
      "..0033300..",
      ".0f9999940.",
      ".0f9999940.",
      ".0f9999940.",
      ".0f999940..",
      ".0f499940..",
      ".0f999940..",
      "..0f99940..",
      "..0f49940..",
      "..0f99940..",
      "..0f9940...",
      "..0f4940...",
      "..0f9940...",
      "...0f990...",
      "...0f490...",
      "...0f990...",
      "...0990....",
      "...0990....",
      "...0990....",
      "....00....."
    ],
    gurke: [
      "....000000000000000000....",
      "..0033333333333333333300..",
      ".033bbbbbbbbbbbbbbbbb3330.",
      ".03bbbbbbbbbbbbbbbb333330.",
      "04333333333333333333333340",
      "043333b33b33b33b33b33b3340",
      "0433333b33b33b33b33b33b340",
      ".033333333333333333333330.",
      ".033033303330333033303330.",
      "..0033333333333333333300..",
      "....000000000000000000...."
    ],
    kohl: [
      "....0003000....",
      "...0333b3330...",
      "..0377bbbbb30..",
      ".0377bbbbbbb30.",
      "0377bbb3bbbbb30",
      "03bb3bb3bb3bb30",
      "03bbb3b3b3bbb30",
      "3bbbbb3b3bbbbb3",
      "03bbbbb3bbbbb30",
      "03bb33b3b33b330",
      "03bbbb333bbb330",
      ".03bbbb3bbb330.",
      "..03bbb3bb330..",
      "...033333330...",
      "....0003000...."
    ],
    kegel: [
      "..................",
      "..00000000000000..",
      ".0bbbbbbbbbbbbbb0.",
      ".0bbbbbbbbbbbbbb0.",
      ".0776666666666dd0.",
      "..077666666666dd0.",
      "..077666666666dd0.",
      "..07765566666dd0..",
      "...0776666556dd0..",
      "...0776655666dd0..",
      "...077666666dd0...",
      "...0776556655d0...",
      "....07766666dd0...",
      "....0776655dd0....",
      "....0776666dd0....",
      ".....077556dd0....",
      ".....07766dd0.....",
      ".....07766dd0.....",
      "......000000......",
      ".................."
    ],
    knopf: [
      "..................",
      "..................",
      "......000000......",
      "....00bbbbbb00....",
      "...0bbb77bbbbb0...",
      "...0bb7bbbbbbb0...",
      "..03bb7bbbbbbb30..",
      "..03bbbbbbbbbb30..",
      ".003bbbbbbbbbb300.",
      "0773bbbbbbbbbb3770",
      "066633bbbbbb336660",
      "066663333333366660",
      "066666333333666660",
      "066666666666666660",
      "066666666666666660",
      "0dddddddddddddddd0",
      "0dddddddddddddddd0",
      ".0000000000000000."
    ],
    schacht: [
      "....0000000000....",
      "...03bbbbbbbb30...",
      "...03bbbbbbbb30...",
      "...033333333330...",
      "...03bbb3333330...",
      "...03bbb3333330...",
      "..003bbb33333300..",
      ".0773bbb333333770.",
      ".0663bbb333333dd0.",
      ".0663000000003dd0.",
      ".0663000000003dd0.",
      ".0663333333333dd0.",
      ".0663333333333dd0.",
      ".06666666666dddd0.",
      ".06666666666dddd0.",
      ".06666666666dddd0.",
      ".06666666666dddd0.",
      ".06666666666dddd0.",
      ".06666666666dddd0.",
      "..00000000000000.."
    ],
    paket: [
      ".000000000000000000.",
      "0ffffffffffffffffff0",
      "09999999ffff99999990",
      "09999999ffff99999990",
      "0fffffff7777fffffff0",
      "0fffffff7777fffffff0",
      "0fffffff7777fffffff0",
      "0fffffff7777ff7777f0",
      "0fffffff7777ff7447f0",
      "0fffffff7777ff7777f0",
      "0fffffff7777ff7447f0",
      "0fffffff7777fffffff0",
      "0fffffff7777fffffff0",
      "04444444777744444440",
      "04444444777744444440",
      "04444444777744444440",
      ".000000000000000000."
    ],
    blatt: [
      "......000..",
      "....00bbb0.",
      "...0bbbb3b0",
      "..0bbbb33b0",
      ".0bbbb33b0.",
      ".0bbb33bb0.",
      "0bbb33bb0..",
      "03b33bb0...",
      ".030000....",
      "030........",
      ".0........."
    ],
    anna: [
      "....000000....",
      "...04444440...",
      "..0444444440..",
      "..0444444440..",
      "..0444444440..",
      "..0444444440..",
      ".0f44ffff44f0.",
      ".0f440ff044f0.",
      ".0ffffffffff0.",
      ".0ffffffffff0.",
      "..0fff88fff0..",
      "..0ffffffff0..",
      "...0ffffff0...",
      "....000000....",
      ".............."
    ],
    jens: [
      "..............",
      "...00000000...",
      "..0555555550..",
      "..0555555550..",
      ".055555555550.",
      ".055ffffff550.",
      ".055ffffff550.",
      ".0fff0ff0fff0.",
      ".0ffffffffff0.",
      ".0ffffffffff0.",
      "..0f558855f0..",
      "..0f555555f0..",
      "...0ffffff0...",
      "....000000....",
      ".............."
    ],
    sabine: [
      "..............",
      "..0000000000..",
      ".099999999990.",
      ".099999999990.",
      "09999999999990",
      "09999999999990",
      "0999ffffff9990",
      "0999f0ff0f9990",
      "0999ffffff9990",
      "0999ffffff9990",
      "0999ff88ff9990",
      "0999ffffff9990",
      ".000ffffff000.",
      "....000000....",
      ".............."
    ],
    schuessel_hinten: [
      "...........11111111111111111111...........",
      ".....11111111111000000000011111111111.....",
      "..11100000000000000000000000000000000111..",
      "110000000000000000000000000000000000000011",
      "110000000000000000000000000000000000000011",
      "..11100000000000000000000000000000000111..",
      ".....11111111111000000000011111111111.....",
      "...........11111111111111111111...........",
      "..........................................",
      "..........................................",
      "..........................................",
      "..........................................",
      "..........................................",
      "..........................................",
      "..........................................",
      "..........................................",
      ".........................................."
    ],
    schuessel_vorn: [
      "..........................................",
      "..........................................",
      "..........................................",
      "000000000000000000000000000000000000000000",
      "777777777777777777777777777777777777777777",
      "777777777777777777777777777777777777777777",
      "076666666666666666666666666666666666666610",
      "077ccccccccccccccccccccccccccccccccccc110.",
      ".077cccccccccccccccccccccccccccccccccc110.",
      ".077cc777777777777777777777777777777c110..",
      "..077ccccccccccccccccccccccccccccccc1110..",
      "..077cccccccccccccccccccccccccccccc1110...",
      "...07cccccccccccccccccccccccccccccc1110...",
      "...07ccccccccccccccccccccccccccccc1110....",
      "....07cccccccccccccccccccccccccccc1110....",
      "....07cccccccccccccccccccccccccccc1110....",
      "....07cccc1111111111111111111111c1110....."
    ],
    geraet: [
      "............................................................................",
      "............................................................................",
      "............................................................................",
      "............................................................................",
      "............................................................................",
      "............................................................................",
      "............................................................................",
      "..........................000..................000..........................",
      ".........................0777..................7770.........................",
      ".........................0777..................7770.........................",
      ".........................0777..................ddd0.........................",
      ".........................0777..................ddd0.........................",
      ".........................0777..................ddd0.........................",
      ".........................0777..................ddd0.........................",
      ".........................0777ddddddddddddddddddddd0.........................",
      ".........................0777666666666666666666ddd0.........................",
      ".........................0777666666666666666666ddd0.........................",
      ".........................0777666666666666666666ddd0.........................",
      ".........................0777ddddddddddddddddddddd0.........................",
      ".........................0777666666666666666666ddd0.........................",
      "................0000000000777666666666666666666ddd00000000000000000000......",
      "..............007777777777777666666666666666666ddd777777777777777777770.....",
      ".............07777777777777777777777777777777777777777777777777777777770....",
      "....000000000077777777777777777777777777777777777777777777777777777777770...",
      "...0666666666666666666666666666666666666666666666666666666666666666666dd0...",
      "...0677666666666666666666666666666666666666666666666666666666666666666dd0...",
      "...0677666666666666666666600000000000000000000000000666666666666666666dd0...",
      "...0677666666666666666666601111111111111111111111111666666666666666666dd0...",
      "...0677666666666666666666601777777777777777777777711666666666666666666dd0...",
      "...0677666666666666666666601bbbbbbbbbbbbbbbbbbbbbb11666666bbbb66666666dd0...",
      "...06776666666666666666666011776666666666666666dd111666666b7bb66666666dd0...",
      "...06776666666666666666666011177666666666666666dd111666666bbbb66666666dd0...",
      "...0677666666666666666666601111775566666666556dd1111666666bbbb66666666dd0...",
      "...067766666666666666666660111177666665566666dd11111666666666666666666dd0...",
      "...06776666666666666666666011111776666666666dd111111666666666666666666dd0...",
      "...06776666666666666666666011111177556666666dd1111116666bbbbbb55555566dd0...",
      "...0677666666666666666666601111111776666655dd11111116666bbbbbb55555566dd0...",
      "...067766666666666666666660111111177666666dd11111111666666666666666666dd0...",
      "...06776666666666666666666011111111776655dd111111111666666666666666666dd0...",
      "...06776666666666666666666011111111177666dd111111111666666666666666666dd0...",
      "...06776666666dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd0...",
      "...06776666666dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd0...",
      "...06776666666ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd0....",
      "...06776666666ddd000000000000000000000000000000000dddddddddddddddddddddd0...",
      "...06776666666ddd0...............................0dddddddddddddddddddddd0...",
      "...06776666666ddd0................................0055555555555555555500....",
      "...06776666666ddd0.................................05555555555555555550.....",
      "...06776666666ddd0..................................000000000000000000......",
      "...06776666666ddd0...................................0000000000000000.......",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776ddddd6ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776ddddd6ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776ddddd6ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776ddddd6ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...06776666666ddd0..........................................................",
      "...0ddddddddddddd0..........................................................",
      "..00ddddddddddddd000000000000000000000000000................................",
      ".07777777777777777777777777777777777777777770...............................",
      ".06666666666666666666666666666666666666666660...............................",
      ".066666663bb366666666666666666666666666666660...............................",
      ".06655553b7bb3555555555555555555555cccc555660...............................",
      ".0665555b7bbbb555550b0b0b0b0b005555c7cc555660...............................",
      ".06655553bbbb3555550000000000005555cccc555660...............................",
      ".06655553bbbb3555555555555555555555cccc555660...............................",
      ".06666666333366666666666666666666666666666660...............................",
      ".0dddddddddddddddddddddddddddddddddddddddddd0...............................",
      ".0555dddddddddddddddddddddddddddddddddddd5550...............................",
      "..000000000000000000000000000000000000000000................................",
      "............................................................................"
    ],
    platte: [
      "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      "9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
      "9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
      "2444444444424444444444244444444442444444444424444444444244444444442444444444424444444444",
      "2444444444424444444444244444444442444444444424444444444244444444442444444444424444444444",
      "2444444444424444444444244444444442444444444424444444444244444444442444444444424444444444",
      "2444444444424444444444244444444442444444444424444444444244444444442444444444424444444444",
      "2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"
    ]
  };

  var reduziert = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Zeichenkarte in SVG-Pfade umsetzen: pro Farbe ein Pfad aus Rechtecken ---------- */
  function pfade(zeilen) {
    var d = {}, out = '', y, x, e, c, z, k;
    for (y = 0; y < zeilen.length; y++) {
      z = zeilen[y]; x = 0;
      while (x < z.length) {
        c = z.charAt(x);
        if (c === '.') { x++; continue; }
        e = x;
        while (e < z.length && z.charAt(e) === c) e++;
        d[c] = (d[c] || '') + 'M' + x + ' ' + y + 'h' + (e - x) + 'v1h-' + (e - x) + 'z';
        x = e;
      }
    }
    for (k in d) out += '<path fill="' + PAL[k] + '" d="' + d[k] + '"/>';
    return out;
  }
  function teil(name, x, y) {
    return '<g transform="translate(' + x + ' ' + y + ')">' + pfade(KARTEN[name]) + '</g>';
  }
  function svg(w, h, inhalt) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w * 4 + '" height="' + h * 4 +
      '" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + inhalt + '</svg>';
  }
  function groesse(name) { return [KARTEN[name][0].length, KARTEN[name].length]; }

  /* ---------- einzelne Sprites: <span class="sprite" data-sprite="tomate"> ---------- */
  function sprites() {
    var el = document.querySelectorAll('[data-sprite]'), i, n, g;
    for (i = 0; i < el.length; i++) {
      n = el[i].getAttribute('data-sprite');
      if (!KARTEN[n]) continue;
      g = groesse(n);
      el[i].style.setProperty('--w', g[0]);
      el[i].style.setProperty('--h', g[1]);
      el[i].innerHTML = svg(g[0], g[1], teil(n, 0, 0));
    }
  }

  /* ---------- Sterne: 4,6 = vier volle Sterne und ein Stern, der zu etwa 60 % gefuellt ist ---------- */
  function stern(anteil) {
    var voll = KARTEN.stern, leer = KARTEN.stern_leer;
    if (anteil >= 1) return voll;
    if (anteil <= 0) return leer;
    var n = Math.round(anteil * voll[0].length), r = [], y;
    for (y = 0; y < voll.length; y++) r.push(voll[y].slice(0, n) + leer[y].slice(n));
    return r;
  }
  function sterne() {
    var el = document.querySelectorAll('[data-sterne]'), i, j, v, a, h, w = KARTEN.stern[0].length, hh = KARTEN.stern.length;
    for (i = 0; i < el.length; i++) {
      v = parseFloat(el[i].getAttribute('data-sterne')); h = '';
      for (j = 0; j < 5; j++) {
        a = Math.max(0, Math.min(1, v - j));
        h += '<g transform="translate(' + j * (w + 2) + ' 0)">' + pfade(stern(a)) + '</g>';
      }
      el[i].style.setProperty('--w', 5 * w + 8);
      el[i].style.setProperty('--h', hh);
      el[i].innerHTML = svg(5 * w + 8, hh, h);
    }
  }

  /* ---------- Hero-Szene: Geraet, Schacht mit Karotte, Kegel-Einsatz, Schuessel, fallende Stuecke ---------- */
  /* Ruhepositionen der Stuecke in der Schuessel: [Karte, x, y]. Fallende Stuecke bekommen zusaetzlich
     die Fallhoehe d (Vielfaches von 12, damit jeder der 12 Schritte ganze Pixel springt) und die Startverzoegerung i in Bildern. */
  var RUHE = [
    ['t_scheibe', 46, 63], ['kohl_stueck', 53, 65], ['g_scheibe', 74, 63], ['k_streifen', 69, 65], ['t_scheibe', 79, 64],
    ['g_scheibe', 49, 58], ['k_streifen', 72, 58], ['kohl_stueck', 77, 58], ['t_scheibe', 62, 66]
  ];
  var FALL = [
    ['t_scheibe', 52, 62, 24, 0], ['g_scheibe', 59, 62, 24, 2], ['kohl_stueck', 66, 63, 24, 4],
    ['g_scheibe', 55, 56, 24, 1], ['t_scheibe', 62, 56, 24, 3], ['k_streifen', 58, 52, 24, 5],
    ['k_streifen', 52, 57, 12, 6]
  ];
  var STERNE_HINTEN = [[70, 6, '7'], [80, 12, 'd'], [62, 10, 'd'], [84, 28, '7'], [74, 20, 'd'], [8, 8, 'd'], [16, 14, '7'],
    [4, 24, 'd'], [22, 4, 'd'], [84, 48, 'd'], [66, 30, 'd'], [58, 2, '7']];

  function szene(el) {
    if (el.querySelector('svg')) return;           /* statische Kopie im HTML (fuer Seiten ohne Skript) bleibt stehen */
    var h = '', i, s, f;
    h += '<g class="s-stern">';
    for (i = 0; i < STERNE_HINTEN.length; i++) {
      s = STERNE_HINTEN[i];
      h += '<rect x="' + s[0] + '" y="' + s[1] + '" width="1" height="1" fill="' + PAL[s[2]] + '"/>';
    }
    h += '</g>';
    h += teil('platte', 0, 82);
    h += teil('schuessel_hinten', 44, 65);
    for (i = 0; i < RUHE.length; i++) h += teil(RUHE[i][0], RUHE[i][1], RUHE[i][2]);
    h += '<g class="s-karotte">' + teil('karotte', 32, 0) + '</g>';
    h += '<g class="s-stuecke">';
    for (i = 0; i < FALL.length; i++) {
      f = FALL[i];
      h += '<g class="stueck" style="--d:' + f[3] + 'px;--i:' + f[4] + '">' + teil(f[0], f[1], f[2]) + '</g>';
    }
    h += '</g>';
    h += '<g class="s-geraet">' + teil('geraet', 0, 1) + '</g>';
    h += teil('tomate', 19, 57) + teil('kohl', 29, 56);
    h += teil('schuessel_vorn', 44, 65);
    el.insertAdjacentHTML('afterbegin',
      '<svg class="szene__bild" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 90" width="352" height="360" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + h + '</svg>');
  }

  /* ---------- Effekte genau einmal starten, wenn das Element sichtbar wird ---------- */
  function beiSicht(el, fn, schwelle) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (eintraege) {
      for (var i = 0; i < eintraege.length; i++) {
        if (eintraege[i].isIntersecting) { io.disconnect(); fn(); break; }
      }
    }, { threshold: schwelle || 0.35 });
    io.observe(el);
  }

  /* Schreibmaschine: Der volle Text bleibt fuer Vorlesegeraete im Original-Absatz (nur unsichtbar gemacht).
     Darueber tippt ein Doppelgaenger (aria-hidden). Der noch nicht getippte Rest ist unsichtbar, nimmt aber Platz ein. */
  function schreibmaschine(p) {
    var voll = p.textContent.replace(/\s+/g, ' ').trim();
    var kopie = document.createElement('p');
    var a = document.createElement('span'), b = document.createElement('span');
    kopie.className = p.className + ' tipp';
    kopie.setAttribute('aria-hidden', 'true');
    b.className = 'tipp__rest';
    b.textContent = voll;
    kopie.appendChild(a); kopie.appendChild(b);
    p.classList.add('nur-vorlesen');
    p.parentNode.insertBefore(kopie, p);
    beiSicht(kopie, function () {
      var t0 = 0, takt = 16, zuletzt = -1;         /* 16 ms je Zeichen, rund 2,6 s fuer den ganzen Text */
      function schritt(t) {
        if (!t0) t0 = t;
        var n = Math.min(voll.length, Math.floor((t - t0) / takt));
        if (n !== zuletzt) {                       /* nur schreiben, wenn ein Zeichen dazukam */
          a.textContent = voll.slice(0, n);
          b.textContent = voll.slice(n);
          zuletzt = n;
        }
        if (n < voll.length) requestAnimationFrame(schritt);
        else kopie.classList.add('fertig');
      }
      requestAnimationFrame(schritt);
    }, 0.5);
  }

  /* ---------- Start ---------- */
  sprites();
  sterne();
  var sz = document.querySelectorAll('[data-szene]'), i;
  for (i = 0; i < sz.length; i++) szene(sz[i]);

  if (!reduziert) {
    for (i = 0; i < sz.length; i++) {
      (function (el) {
        el.classList.add('bereit');
        beiSicht(el, function () { el.classList.add('laeuft'); }, 0.3);
      })(sz[i]);
    }
    var tp = document.querySelector('[data-tipp]');
    if (tp) schreibmaschine(tp);
    var bk = document.querySelector('[data-balken]');
    if (bk) {
      bk.classList.add('bereit');
      beiSicht(bk, function () { bk.classList.add('laeuft'); }, 0.5);
    }
    /* Tab verdeckt: CSS-Animationen anhalten */
    document.addEventListener('visibilitychange', function () {
      document.documentElement.classList.toggle('pause', document.hidden);
    });
  }

  /* ---------- Warenkorb-Zaehler (nur Vorschau, keine echte Bestellung) ---------- */
  var zahl = document.getElementById('korb-zahl'), status = document.getElementById('korb-status'), n = 0;
  var knoepfe = document.querySelectorAll('.cta');
  for (i = 0; i < knoepfe.length; i++) {
    knoepfe[i].addEventListener('click', function (e) {
      n++;
      if (zahl) zahl.textContent = n;
      if (status) status.textContent = n + (n === 1 ? ' Artikel' : ' Artikel') + ' im Warenkorb';
      /* e.detail ist 0 bei Tastatur: dort nichts animieren */
      if (zahl && !reduziert && e.detail > 0) {
        zahl.classList.remove('plopp');
        void zahl.offsetWidth;
        zahl.classList.add('plopp');
      }
    });
  }
}());
