// Prüft alle Seiten eines Shops auf PC, Handy und Tablet: Statuscode, seitliches Überlaufen,
// genau eine h1, Fehler in der Browser-Konsole, fehlgeschlagene Anfragen. Macht Bildschirmfotos vom Handy.
//
// Aufruf: NODE_PATH=/opt/node22/lib/node_modules node seiten_test.js \
//   --basis http://127.0.0.1:8092 --seiten "/,/kasse,/danke?nr=XX-20260101-ABC123,/impressum" \
//   --korb "shopname-korb={\"einzeln\":1}" --aus /pfad/zum/scratchpad
// Chromium: Pfad über CHROME=..., sonst /opt/pw-browsers/chromium-*/chrome-linux/chrome
const { chromium } = require('playwright');
const fs = require('fs');
const arg = (n, std) => { const i = process.argv.indexOf('--' + n); return i > 0 ? process.argv[i + 1] : std; };
const BASIS = arg('basis', 'http://127.0.0.1:8092');
const SEITEN = arg('seiten', '/').split(',');
const KORB = arg('korb', '');
const AUS = arg('aus', '/tmp/');
function chrome() {
  if (process.env.CHROME) return process.env.CHROME;
  try { const d = fs.readdirSync('/opt/pw-browsers').find((x) => x.startsWith('chromium-')); if (d) return `/opt/pw-browsers/${d}/chrome-linux/chrome`; } catch (e) {}
  return undefined;
}
(async () => {
  const b = await chromium.launch({ executablePath: chrome() });
  let probleme = 0;
  for (const [name, vp, mobil] of [['pc', { width: 1440, height: 900 }, false], ['handy', { width: 390, height: 844 }, true], ['tablet', { width: 820, height: 1100 }, false]]) {
    const ctx = await b.newContext({ viewport: vp, isMobile: mobil, hasTouch: mobil });
    if (KORB) {
      const [k, v] = [KORB.slice(0, KORB.indexOf('=')), KORB.slice(KORB.indexOf('=') + 1)];
      await ctx.addInitScript(([k, v]) => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, v); } catch (e) {} }, [k, v]);
    }
    const p = await ctx.newPage();
    const fehler = [];
    p.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
    p.on('pageerror', (e) => fehler.push('SKRIPTFEHLER ' + e.message));
    p.on('requestfailed', (r) => fehler.push('ANFRAGE FEHLGESCHLAGEN ' + r.url()));
    for (const s of SEITEN) {
      const r = await p.goto(BASIS + s, { waitUntil: 'networkidle' });
      await p.waitForTimeout(400);
      // Ganz durchscrollen, damit Scroll-Effekte und spät eingeblendete Teile mitgeprüft werden
      await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 50)); } });
      const o = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h1: document.querySelectorAll('h1').length }));
      const schlecht = r.status() !== 200 || o.sw > o.cw || o.h1 !== 1;
      if (schlecht) probleme++;
      console.log(name.padEnd(6), s.padEnd(28), r.status(), `breite ${o.sw}/${o.cw}`, `h1=${o.h1}`, schlecht ? '  <-- PRÜFEN' : '');
      if (name === 'handy') { await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.screenshot({ path: `${AUS}/test-handy-${s.split('?')[0].replace(/\//g, '') || 'start'}.png` }); }
    }
    console.log(name, 'Konsolenfehler:', JSON.stringify(fehler));
    probleme += fehler.length;
    await ctx.close();
  }
  await b.close();
  console.log(probleme ? `${probleme} Probleme gefunden.` : 'Alles in Ordnung.');
  process.exit(probleme ? 1 : 0);
})();
