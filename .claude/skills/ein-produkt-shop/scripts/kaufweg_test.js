// Spielt den ganzen Kaufweg der Referenz durch: Angebot wählen, Warenkorb, Kasse mit Fehlern, Gutschein,
// Bestellung, Danke-Seite, Online-Widerruf, Newsletter. Macht Bildschirmfotos (kauf-*.png).
// Passt zu den Selektoren der Referenz (#angebot-form, #korb, #kasse-form, #widerruf-form, #newsletter).
// Aufruf: NODE_PATH=/opt/node22/lib/node_modules node kaufweg_test.js --basis http://127.0.0.1:8092 \
//   --code SONNE10 --korb helia-korb --zahlart Klarna --nr XX-20260101-ABC123 --aus /pfad/scratchpad
// Vorher die Ratenbegrenzung leeren, sonst kommt bei vielen Läufen 429 (siehe sicherheit_test.sh).
const { chromium } = require('playwright');
const fs = require('fs');
const arg = (n, std) => { const i = process.argv.indexOf('--' + n); return i > 0 ? process.argv[i + 1] : std; };
const B = arg('basis', 'http://127.0.0.1:8092'), CODE = arg('code', ''), KORB = arg('korb', ''), ZAHL = arg('zahlart', 'PayPal');
const NR = arg('nr', 'XX-20260101-ABC123'), AUS = arg('aus', '/tmp');
const chrome = () => { try { const d = fs.readdirSync('/opt/pw-browsers').find((x) => x.startsWith('chromium-')); return d ? `/opt/pw-browsers/${d}/chrome-linux/chrome` : undefined; } catch (e) { return undefined; } };
const zeig = (...a) => console.log(...a);
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || chrome() });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const fehler = []; p.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); }); p.on('pageerror', (e) => fehler.push('SKRIPTFEHLER ' + e.message));
  const zu = async (sel) => { await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center', behavior: 'instant' }), sel); await p.waitForTimeout(600); };
  await p.goto(B + '/', { waitUntil: 'networkidle' });
  // Angebot: Optionen sind versteckte Radio-Knöpfe, deshalb das Label anklicken
  await zu('#angebot');
  const optionen = await p.$$eval('#angebot-form input[name="paket"]', (e) => e.map((x) => x.value));
  for (const o of optionen) { await p.click(`label.option:has(input[value="${o}"])`); zeig('Summe', o, await p.textContent('[data-feld="angebot-summe"]')); }
  await p.click(`label.option:has(input[value="${optionen[0]}"])`);
  await p.click('[data-menge="1"]'); zeig('Summe Menge 2:', await p.textContent('[data-feld="angebot-summe"]')); await p.click('[data-menge="-1"]');
  await p.click('#angebot-form button[type="submit"]'); await p.waitForTimeout(800);
  zeig('Warenkorb offen:', await p.$eval('#korb', (d) => d.open), '| gesamt', await p.textContent('#korb [data-feld="gesamt"]'), '| Versand', await p.textContent('#korb [data-feld="versand"]'));
  await p.screenshot({ path: `${AUS}/kauf-korb.png` });
  await p.click('#korb a.knopf'); await p.waitForLoadState('networkidle'); await p.waitForTimeout(600);
  await p.click('#kasse-form button[type="submit"]'); await p.waitForTimeout(300);
  zeig('Fehlermeldungen bei leerer Kasse:', await p.$$eval('.fehlertext', (e) => e.map((x) => x.textContent).filter(Boolean).length));
  if (CODE) {
    await p.fill('#gutschein', 'falsch'); await p.click('[data-gutschein]'); await p.waitForTimeout(200); zeig('Falscher Code:', await p.textContent('.gutschein-meldung'));
    await p.fill('#gutschein', CODE.toLowerCase()); await p.click('[data-gutschein]'); await p.waitForTimeout(300); zeig('Richtiger Code:', await p.textContent('.gutschein-meldung'));
  }
  zeig('Kasse gesamt:', await p.textContent('.kasse__seite [data-feld="gesamt"]'), '| Knopftext:', (await p.textContent('#kasse-form button[type="submit"]')).trim());
  await p.fill('#vorname', 'Erika'); await p.fill('#nachname', 'Beispiel'); await p.fill('#strasse', 'Teststraße 5'); await p.fill('#plz', '04109'); await p.fill('#ort', 'Leipzig'); await p.fill('#email', 'erika@example.com');
  await p.click(`label.option:has(input[value="${ZAHL}"])`); await p.check('input[name="agb"]');
  await p.screenshot({ path: `${AUS}/kauf-kasse.png`, fullPage: true });
  await p.click('#kasse-form button[type="submit"]');
  await p.waitForURL('**/danke**', { timeout: 8000 }); await p.waitForTimeout(600);
  zeig('Danke-Seite:', p.url());
  if (KORB) zeig('Warenkorb danach:', await p.evaluate((k) => localStorage.getItem(k), KORB));
  await p.screenshot({ path: `${AUS}/kauf-danke.png` });
  await p.goto(B + '/widerrufen', { waitUntil: 'networkidle' });
  await p.click('#widerruf-form button[type="submit"]'); await p.waitForTimeout(200); zeig('Widerruf leer:', await p.textContent('#widerruf-form .meldung'));
  await p.fill('#w-name', 'Erika Beispiel'); await p.fill('#w-mail', 'erika@example.com'); await p.fill('#w-nr', NR);
  await p.click('#widerruf-form button[type="submit"]'); await p.waitForTimeout(900); zeig('Widerruf:', await p.textContent('#widerruf-form .meldung'));
  await p.goto(B + '/', { waitUntil: 'networkidle' }); await zu('.fuss');
  await p.fill('#nl-mail', 'leser@example.com'); await p.check('#newsletter input[name="einwilligung"]');
  await p.click('#newsletter button[type="submit"]'); await p.waitForTimeout(900); zeig('Newsletter:', await p.textContent('#newsletter .meldung'));
  zeig('Konsolenfehler:', JSON.stringify(fehler));
  await b.close();
})();
