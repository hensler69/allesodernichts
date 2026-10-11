/* Erzeugt aus script.js (gleiche Geometrie, gleiche Projektion) zwei Bloecke in demo.html:
   1. <!--POSTER-->: statisches SVG-Standbild fuer Seiten ohne JavaScript (CSS blendet es aus, sobald JS laeuft)
   2. <!--MASSE-->: die gelben Bemassungslinien und Positionspfeile, mit genau passenden Koordinaten
   Aufruf: node poster-erzeugen.js */
const fs = require('fs'), path = require('path');
const m = require('./script.js');
const datei = path.join(__dirname, 'demo.html');
const S = m.baue();
const o = [0, 0, 0];
const r1 = v => Math.round(v * 10) / 10;

// ----- Poster -----
const pr = m.projektion(m.POSE, m.TILT);
const BU = 5, TY = 3, pf = [];
for (let t = 0; t < TY; t++) { pf.push([]); for (let b = 0; b < BU; b++) pf[t].push([]); }
const DA = [1, 1, 0.38];
S.forEach(s => {
  const a = pr(s[0], s[1], s[2], [0, 0, 0]), c = pr(s[3], s[4], s[5], [0, 0, 0]);
  const al = 0.26 + 0.74 * Math.min(1, Math.max(0, ((a[2] + c[2]) / 2 + 13) / 26));
  const bk = Math.min(BU - 1, Math.floor(al * s[7] * DA[s[6]] * BU));
  pf[s[6]][bk].push(`M${r1(a[0])} ${r1(a[1])}L${r1(c[0])} ${r1(c[1])}`);
});
const BR = [1.25, 0.95, 0.8];
let poster = '<svg class="poster" viewBox="0 20 600 600" aria-hidden="true" focusable="false"><g fill="none" stroke="#5fe3ff" stroke-linecap="round">';
for (let t = 0; t < TY; t++) for (let b = 0; b < BU; b++) {
  if (!pf[t][b].length) continue;
  poster += `<path stroke-width="${BR[t]}" stroke-opacity="${Math.min(1, (b + 0.6) / BU).toFixed(2)}" d="${pf[t][b].join('')}"/>`;
}
const ax0 = pr(0, -1.5, 0, [0, 0, 0]), ax1 = pr(0, 29.5, 0, [0, 0, 0]);
poster += `<path stroke-width="1" stroke-opacity=".5" stroke-dasharray="7 6" d="M${r1(ax0[0])} ${r1(ax0[1])}L${r1(ax1[0])} ${r1(ax1[1])}"/></g></svg>`;

// ----- Masse -----
const p0 = m.projektion(0, m.TILT);
const P = (x, y, z) => { p0(x, y, z, o); return [r1(o[0]), r1(o[1])]; };
const obenL = P(-2.5, 27, 0), obenR = P(2.5, 27, 0), obenFern = P(0, 27, -2.5);
let ymin = 1e9, ymax = -1e9;
S.filter(s => s[6] < 2).forEach(s => [[s[0], s[1], s[2]], [s[3], s[4], s[5]]].forEach(p => { p0(p[0], p[1], p[2], o); ymin = Math.min(ymin, o[1]); ymax = Math.max(ymax, o[1]); }));
ymin = r1(ymin); ymax = r1(ymax);
const yd = r1(obenFern[1] - 36), xv = 52, ym = r1((ymin + ymax) / 2);
const a1 = P(2.5, 22, 0), a2 = P(5.6, 12.5, 0), a3 = P(8.8, 5, 0);
const LX = 486;
function leit(p, n, name) {
  return `<g class="m-pos"><circle cx="${p[0]}" cy="${p[1]}" r="3.5"/><path d="M${p[0] + 3.5} ${p[1]}H${LX}"/><text x="${LX + 8}" y="${p[1] - 2}" class="m-pos-t">Pos. ${n}</text><text x="${LX + 8}" y="${p[1] + 14}" class="m-pos-n">${name}</text></g>`;
}
const masse = `<svg class="masse" viewBox="0 20 600 600" aria-hidden="true" focusable="false">
        <defs><marker id="pfeil" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0 1.5L9 5L0 8.5" fill="none" stroke="#ffd166" stroke-width="1.4" stroke-linejoin="round"/></marker></defs>
        <g class="m-konstr"><circle cx="300" cy="322" r="268"/><path d="M300 28V80M300 566V612M20 322H112M488 322H580"/></g>
        <g class="m-ecken"><path d="M14 30h16M22 22v16M570 30h16M578 22v16M14 610h16M22 602v16M570 610h16M578 602v16"/></g>
        <g class="m-gelb">
          <path class="m-hilf" d="M${xv + 10} ${ymin}H${obenL[0] - 10}M${xv + 10} ${ymax}H${P(0, 0, 0)[0] - 64}"/>
          <path class="m-lin" marker-start="url(#pfeil)" marker-end="url(#pfeil)" d="M${xv} ${ymin}V${ymax}"/>
          <rect x="${xv - 36}" y="${ym - 24}" width="72" height="48" class="m-fleck"/>
          <text x="${xv}" y="${ym + 2}" class="m-zahl" text-anchor="middle">27 cm</text>
          <text x="${xv}" y="${ym + 19}" class="m-klein" text-anchor="middle">Höhe</text>
          <path class="m-hilf" d="M${obenL[0]} ${obenL[1] - 6}V${yd - 8}M${obenR[0]} ${obenR[1] - 6}V${yd - 8}"/>
          <path class="m-lin" marker-start="url(#pfeil)" marker-end="url(#pfeil)" d="M${obenL[0]} ${yd}H${obenR[0]}"/>
          <text x="300" y="${yd - 12}" class="m-zahl" text-anchor="middle">Schacht 5 cm</text>
        </g>
        ${leit(a1, 1, 'Schacht')}
        ${leit(a2, 2, 'Einsatz')}
        ${leit(a3, 3, 'Schüssel')}
      </svg>`;

let html = fs.readFileSync(datei, 'utf8');
html = html.replace(/<!--POSTER-->[\s\S]*?<!--\/POSTER-->/, `<!--POSTER-->\n      ${poster}\n      <!--/POSTER-->`);
html = html.replace(/<!--MASSE-->[\s\S]*?<!--\/MASSE-->/, `<!--MASSE-->\n      ${masse}\n      <!--/MASSE-->`);
fs.writeFileSync(datei, html);
console.log('Poster', Math.round(poster.length / 1024) + ' KB', 'Masse', ymin, ymax, 'Pos', a1, a2, a3);
