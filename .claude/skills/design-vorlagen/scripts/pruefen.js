// Prüfskript für Look-Demos und Shop-Seiten (portable Fassung).
//
// Aufruf (im Ordner der Projektwurzel oder irgendwo sonst):
//   NODE_PATH=/opt/node22/lib/node_modules node pruefen.js <slug-oder-URL> [url-oder-name]
//
//   pruefen.js bauhaus                      prüft http://localhost:8101/look-bauhaus/vorlage/demo.html
//   pruefen.js bauhaus http://host/seite    prüft die genannte Adresse, Bilder landen unter dem Namen "bauhaus"
//   pruefen.js http://host/shops/horta/     prüft eine Adresse, der Ordnername wird aus der Adresse gebildet
//   pruefen.js http://host/seite meinname   prüft eine Adresse, Bilder landen unter dem Namen "meinname"
//
// Einstellungen über Umgebungsvariablen (alle optional):
//   LOOKS_SERVER   Adresse des Testservers, Standard http://localhost:8101
//                  (Wurzel .claude/skills, Start: cd .claude/skills && python3 -m http.server 8101)
//   LOOKS_AUSGABE  Ordner für Bildschirmfotos und pruefung.json, Standard ./pruefung (darin ein Unterordner je Name)
//   CHROME_PATH    Pfad zum Chromium-Programm, Standard /opt/pw-browsers/chromium-1194/chrome-linux/chrome
//                  (gibt es die Datei nicht, nimmt Playwright sein eigenes Chromium)
//   NODE_PATH      Ordner mit dem Paket playwright, falls es nicht gefunden wird
const fs = require('fs'), path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); }
catch (e) {
  try { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
  catch (e2) { console.error('Das Paket "playwright" fehlt. Aufruf mit NODE_PATH=/opt/node22/lib/node_modules node pruefen.js <slug>'); process.exit(2); }
}
const arg1 = process.argv[2], arg2 = process.argv[3];
if (!arg1) { console.error('Aufruf: node pruefen.js <slug-oder-URL> [url-oder-name]'); process.exit(2); }
const SERVER = (process.env.LOOKS_SERVER || 'http://localhost:8101').replace(/\/+$/, '');
const istUrl = /^https?:\/\//i.test(arg1);
const aus = u => { const m = u.match(/\/look-([a-z0-9-]+)\//i); if (m) return m[1]; return u.replace(/^https?:\/\//i, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'seite'; };
const slug = istUrl ? (arg2 || aus(arg1)) : arg1;
const url = istUrl ? arg1 : (arg2 || `${SERVER}/look-${slug}/vorlage/demo.html`);
const out = path.join(process.env.LOOKS_AUSGABE || path.join(process.cwd(), 'pruefung'), slug);
fs.mkdirSync(out, { recursive: true });
const ORIGIN = new URL(url).origin;
const CHROME_STANDARD = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const CHROME = process.env.CHROME_PATH || (fs.existsSync(CHROME_STANDARD) ? CHROME_STANDARD : null);
const VERBOTEN_SRC = 'innovativ|nahtlos|maßgeschneidert|ganzheitlich|revolutionär|einzigartig|leidenschaft';
const VERBOTEN = /innovativ|nahtlos|maßgeschneidert|ganzheitlich|revolutionär|einzigartig|leidenschaft/i;
const RAF_ZAEHLER = `(()=>{window.__raf=0;const o=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=cb=>{window.__raf++;return o(cb)}})()`;

async function lauf(browser, name, w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: !!opts.mobil, hasTouch: !!opts.mobil, reducedMotion: opts.reduziert ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage();
  const r = { fehler: [], bytes: 0, schriftBytes: 0, anfragen: 0, extern: [] };
  await p.addInitScript(RAF_ZAEHLER);
  p.on('pageerror', e => r.fehler.push(`${name}: ${e.message}`));
  p.on('console', m => { if (m.type() === 'error') r.fehler.push(`${name}: ${m.text().slice(0, 160)}`); });
  p.on('response', async resp => {
    try {
      const u = resp.url(); r.anfragen++;
      if (!u.startsWith(ORIGIN)) { r.extern.push(u.slice(0, 100)); return; }
      const b = await resp.body(); const n = b.length;
      if (/\.woff2?(\?|$)/.test(u)) r.schriftBytes += n; else r.bytes += n;
      if (resp.status() >= 400) r.fehler.push(`${name}: HTTP ${resp.status()} ${u.slice(0, 100)}`);
    } catch (e) {}
  });
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForTimeout(2200);
  r.raf_pro_s = null;
  const r0 = await p.evaluate(() => window.__raf); await p.waitForTimeout(1500);
  const r1 = await p.evaluate(() => window.__raf); r.raf_pro_s = Math.round((r1 - r0) / 1.5);
  r.endlos_css_animationen = await p.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.getComputedTiming().iterations === Infinity && a.playState === 'running').length);
  r.ueberlauf = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  r.hoehe = await p.evaluate(() => document.documentElement.scrollHeight);
  if (!opts.reduziert || name === 'desktop-reduziert') {
    await p.screenshot({ path: `${out}/${name}-1.png`.replace('-reduziert-1', '-reduziert') });
  }
  if (!opts.reduziert) {
    const schritte = opts.schritte || 0;
    for (let i = 1; i <= schritte; i++) {
      await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), Math.min(i * h * 0.9, Math.max(0, r.hoehe - h)));
      await p.waitForTimeout(900);
      await p.screenshot({ path: `${out}/${name}-${i + 1}.png` });
    }
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await p.waitForTimeout(300);
    // alles einblenden lassen für das Gesamtbild
    for (let y = 0; y < r.hoehe; y += h * 0.7) { await p.evaluate(v => window.scrollTo({ top: v, behavior: 'instant' }), y); await p.waitForTimeout(120); }
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(400);
    await p.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
  }
  if (!opts.nurMessen) {
    r.inhalt = await p.evaluate((vsrc) => {
      const t = document.body.innerText;
      const sicht = el => { const b = el.getBoundingClientRect(); const s = getComputedStyle(el); return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
      const ctaExakt = [...document.querySelectorAll('a,button,[role=button]')].filter(e => e.textContent.trim().replace(/\s+/g, ' ').toLowerCase() === 'in den warenkorb');
      const logo = document.querySelector('a[aria-label*="zur Startseite"]');
      const klein = [...document.querySelectorAll('button, .cta, nav a')].filter(sicht).map(e => { const b = e.getBoundingClientRect(); return { t: e.textContent.trim().slice(0, 20), w: Math.round(b.width), h: Math.round(b.height) }; }).filter(x => x.h < 40 || x.w < 40);
      const hs = [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName);
      const first = el => (getComputedStyle(el).fontFamily.split(',')[0] || '').replace(/["']/g, '').trim();
      return {
        lang: document.documentElement.lang, viewport: !!document.querySelector('meta[name=viewport]'), titel: document.title,
        kaufknoepfe: ctaExakt.length, kaufknopfSichtbar: ctaExakt.filter(sicht).length,
        logoLabel: logo ? logo.getAttribute('aria-label') : null,
        navHome: [...document.querySelectorAll('nav a')].some(a => /^home$/i.test(a.textContent.trim())),
        gedankenstrich: (t.match(/[–—]/g) || []).length + (document.documentElement.outerHTML.match(/[–—]/g) || []).length,
        verbotene: (t.match(new RegExp(vsrc, 'ig')) || []),
        h1: hs.filter(x => x === 'H1').length, ueberschriften: hs.join(','),
        schriftH1: first(document.querySelector('h1')), schriftText: first(document.body),
        schriftGeladen: { h1: document.fonts.check(`16px "${first(document.querySelector('h1'))}"`), body: document.fonts.check(`16px "${first(document.body)}"`) },
        kleineZiele: klein.slice(0, 6), textlaenge: t.length, bildersrc: [...document.images].length,
      };
    }, VERBOTEN_SRC).catch(e => ({ fehlerInhalt: e.message }));
  }
  await ctx.close();
  return r;
}

(async () => {
  const b = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
  const res = { slug, url, desktop: null, tablet: null, mobil: null, reduziert: null, harte_fehler: [], hinweise: [] };
  res.desktop = await lauf(b, 'desktop', 1280, 800, { schritte: 2 });
  res.tablet = await lauf(b, 'tablet', 820, 1100, { schritte: 0 });
  res.mobil = await lauf(b, 'mobil', 390, 844, { mobil: true, schritte: 2 });
  res.reduziert = await lauf(b, 'desktop-reduziert', 1280, 800, { reduziert: true, nurMessen: true });
  await b.close();

  const H = res.harte_fehler, I = res.hinweise;
  for (const k of ['desktop', 'tablet', 'mobil']) {
    const r = res[k];
    r.fehler.forEach(f => H.push('Konsole/Netz: ' + f));
    r.extern.forEach(u => H.push(`${k}: externe Anfrage ${u}`));
    if (r.ueberlauf.sw > r.ueberlauf.cw) H.push(`${k}: waagerechter Überlauf ${r.ueberlauf.sw} > ${r.ueberlauf.cw}`);
  }
  const c = res.desktop.inhalt || {};
  if (c.fehlerInhalt) H.push('Inhaltsprüfung: ' + c.fehlerInhalt);
  if (c.lang !== 'de') H.push('html lang ist nicht "de"');
  if (!c.viewport) H.push('viewport-Meta fehlt');
  if (c.kaufknoepfe !== 1) H.push(`Kaufknöpfe "In den Warenkorb": ${c.kaufknoepfe} (soll 1 sein)`);
  if (!c.logoLabel || !/zur Startseite/.test(c.logoLabel)) H.push('Logo-Link ohne aria-label "…zur Startseite"');
  if (c.navHome) H.push('Navigation enthält "Home"');
  if (c.gedankenstrich) H.push(`Gedankenstriche gefunden: ${c.gedankenstrich}`);
  if (c.verbotene && c.verbotene.length) H.push('verbotene Wörter: ' + c.verbotene.join(', '));
  if (c.h1 !== 1) H.push(`Anzahl h1: ${c.h1} (soll 1 sein)`);
  if (c.schriftGeladen && (!c.schriftGeladen.h1 || !c.schriftGeladen.body)) H.push(`Schrift nicht geladen: ${JSON.stringify(c.schriftGeladen)} (${c.schriftH1} / ${c.schriftText})`);
  const kb = Math.round(res.desktop.bytes / 1024);
  if (kb > 250) H.push(`Gewicht ohne Schriften ${kb} KB (Grenze 250 KB)`);
  const z = res.reduziert;
  if (z.endlos_css_animationen > 0) H.push(`reduzierte Bewegung: ${z.endlos_css_animationen} Endlos-CSS-Animationen laufen weiter`);
  if (z.raf_pro_s > 5) H.push(`reduzierte Bewegung: ${z.raf_pro_s} rAF-Aufrufe pro Sekunde (soll ~0 sein)`);
  const m = res.mobil.inhalt || {};
  if ((m.kleineZiele || []).length) I.push('kleine Touch-Ziele (<40 px) am Handy: ' + JSON.stringify(m.kleineZiele));
  I.push(`Gewicht ohne Schriften ${kb} KB, Schriften ${Math.round(res.desktop.schriftBytes / 1024)} KB, Anfragen ${res.desktop.anfragen}`);
  I.push(`rAF pro Sekunde normal ${res.desktop.raf_pro_s}, Endlos-CSS-Animationen normal ${res.desktop.endlos_css_animationen}`);
  I.push(`Höhe Seite: PC ${res.desktop.hoehe} px, Handy ${res.mobil.hoehe} px`);
  fs.writeFileSync(`${out}/pruefung.json`, JSON.stringify(res, null, 2));
  console.log(`== ${slug} ==`);
  I.forEach(x => console.log('  info: ' + x));
  if (H.length) { console.log('HARTE FEHLER:'); H.forEach(x => console.log('  - ' + x)); }
  else console.log('ALLE HARTEN PRÜFUNGEN BESTANDEN');
  console.log('Bilder: ' + out);
})();
