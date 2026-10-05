/* HELIA: Bedienung, Warenkorb, Himmel und Kasse. Reines JavaScript ohne Bibliotheken. */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const feinZeiger = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const klemmen = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* ---------- Preise (der Server rechnet in bestellung.php noch einmal selbst) ---------- */
  const EINFUEHRUNG_BIS = Date.UTC(2026, 10, 30, 22, 59, 59); // 30.11.2026, 23:59:59 Uhr deutscher Zeit
  const einfuehrung = Date.now() <= EINFUEHRUNG_BIS;
  const PRODUKTE = {
    einzeln: { name: 'HELIA', info: 'Lichtwecker, 1 Stück', einf: 4990, normal: 5990 },
    set: { name: 'HELIA, 2er-Set', info: '2 Lichtwecker, versandkostenfrei', einf: 8480, normal: 10180 }
  };
  const VERSAND = 490, GRATIS_AB = 5900, MAX_MENGE = 5;
  // Prüfwert (SHA-256) des Newsletter-Codes, damit der Code nicht im Quelltext steht
  const CODE_PRUEFWERT = '8fddf81207d222902430d41d1548c9f85554625f358bab69f62246c5b3d6c827';
  const preis = (id) => (einfuehrung ? PRODUKTE[id].einf : PRODUKTE[id].normal);
  const euro = (cent) => (cent / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

  // Preise auf der Seite eintragen (nach dem 30.11. automatisch der normale Preis)
  $$('[data-preis]').forEach((el) => { el.textContent = euro(preis(el.dataset.preis)); });
  if (!einfuehrung) $$('[data-nur-einfuehrung]').forEach((el) => { el.hidden = true; });

  /* ---------- Speicher (kann im privaten Modus fehlen) ---------- */
  const speicher = {
    lesen(k, std) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : std; } catch { return std; } },
    schreiben(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* egal */ } }
  };

  /* ---------- Warenkorb ---------- */
  let korb = speicher.lesen('helia-korb', { einzeln: 0, set: 0 });
  if (typeof korb !== 'object' || korb === null) korb = { einzeln: 0, set: 0 };
  ['einzeln', 'set'].forEach((k) => { korb[k] = klemmen(parseInt(korb[k], 10) || 0, 0, MAX_MENGE); });

  const korbSumme = () => korb.einzeln * preis('einzeln') + korb.set * preis('set');
  const korbAnzahl = () => korb.einzeln + korb.set;
  const versandFuer = (warenwert) => (warenwert === 0 || warenwert >= GRATIS_AB ? 0 : VERSAND);

  function korbSpeichern() {
    speicher.schreiben('helia-korb', korb);
    korbZeigen();
    document.dispatchEvent(new CustomEvent('korb-geaendert'));
  }

  const dialog = $('#korb');
  // Entfernte Artikel gleiten weg und die Lücke schließt sich weich, statt dass alles springt
  async function wegAnimieren(li) {
    li.style.pointerEvents = 'none';
    if (ruhig || !li.animate) return;
    const kurve = 'cubic-bezier(0.23, 1, 0.32, 1)';
    const abstand = parseFloat(getComputedStyle(li.parentElement).rowGap) || 0;
    await li.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(12px)' }], { duration: 180, easing: kurve, fill: 'forwards' }).finished;
    await li.animate([{ height: li.offsetHeight + 'px', marginBottom: '0px', paddingTop: getComputedStyle(li).paddingTop, paddingBottom: getComputedStyle(li).paddingBottom },
      { height: '0px', marginBottom: -abstand + 'px', paddingTop: '0px', paddingBottom: '0px' }], { duration: 160, easing: kurve, fill: 'forwards' }).finished;
  }
  function korbZeigen() {
    $$('.korb-knopf__zahl').forEach((z) => { z.textContent = korbAnzahl(); });
    $$('.korb-knopf').forEach((b) => b.setAttribute('aria-label', `Warenkorb öffnen, ${korbAnzahl()} Artikel`));
    if (!dialog) return;
    const liste = $('.korb__liste', dialog);
    liste.innerHTML = '';
    const leer = korbAnzahl() === 0;
    $('.korb__leer', dialog).hidden = !leer;
    $('.korb__fuss', dialog).hidden = leer;
    ['einzeln', 'set'].forEach((id) => {
      if (!korb[id]) return;
      const p = PRODUKTE[id];
      const li = document.createElement('li');
      li.className = 'posten';
      li.innerHTML = `<span class="posten__bild" aria-hidden="true"></span>
        <div><div class="posten__name"></div><div class="posten__info"></div>
          <div class="stepper" role="group"><button type="button" data-schritt="-1">−</button><output aria-live="polite"></output><button type="button" data-schritt="1">+</button></div>
          <button type="button" class="entfernen">Entfernen</button></div>
        <div class="posten__preis"></div>`;
      $('.posten__name', li).textContent = p.name;
      $('.posten__info', li).textContent = `${p.info} · je ${euro(preis(id))}`;
      $('output', li).textContent = korb[id];
      $('.stepper', li).setAttribute('aria-label', `Menge ${p.name}`);
      $('[data-schritt="-1"]', li).setAttribute('aria-label', 'Eins weniger');
      $('[data-schritt="1"]', li).setAttribute('aria-label', 'Eins mehr');
      $('.posten__preis', li).textContent = euro(korb[id] * preis(id));
      li.addEventListener('click', async (e) => {
        const s = e.target.closest('[data-schritt]');
        const weg = e.target.closest('.entfernen') || (s && korb[id] + Number(s.dataset.schritt) <= 0);
        if (weg) { await wegAnimieren(li); korb[id] = 0; korbSpeichern(); return; }
        if (s) { korb[id] = klemmen(korb[id] + Number(s.dataset.schritt), 0, MAX_MENGE); korbSpeichern(); }
      });
      liste.appendChild(li);
    });
    const waren = korbSumme(), versand = versandFuer(waren);
    $('[data-feld="zwischensumme"]', dialog).textContent = euro(waren);
    $('[data-feld="versand"]', dialog).textContent = versand ? euro(versand) : 'kostenlos';
    $('[data-feld="gesamt"]', dialog).textContent = euro(waren + versand);
    const fehlt = GRATIS_AB - waren;
    $('.versandtext', dialog).textContent = fehlt > 0
      ? `Noch ${euro(fehlt)} bis zum kostenlosen Versand.`
      : 'Der Versand ist für Sie kostenlos.';
    $('.versandbalken', dialog).style.setProperty('--v', klemmen(waren / GRATIS_AB).toFixed(3));
  }

  function korbOeffnen() {
    if (!dialog) return;
    korbZeigen();
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }
  $$('.korb-knopf').forEach((b) => b.addEventListener('click', korbOeffnen));
  if (dialog) {
    $$('[data-korb-zu]', dialog).forEach((b) => b.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  }

  let toastZeit;
  function toast(text) {
    const t = $('.toast');
    if (!t) return;
    t.textContent = text;
    t.classList.add('ist-da');
    clearTimeout(toastZeit);
    toastZeit = setTimeout(() => t.classList.remove('ist-da'), 2400);
  }

  function hinzufuegen(id, menge) {
    korb[id] = klemmen(korb[id] + menge, 0, MAX_MENGE);
    korbSpeichern();
    $$('.korb-knopf__zahl').forEach((z) => { z.classList.remove('is-hops'); void z.offsetWidth; z.classList.add('is-hops'); });
    korbOeffnen();
  }

  // Angebot: Auswahl und Menge
  const angebot = $('#angebot-form');
  let menge = 1;
  function angebotSumme() {
    if (!angebot) return;
    const id = $('input[name="paket"]:checked', angebot).value;
    $('output', angebot).textContent = menge;
    const feld = $('[data-feld="angebot-summe"]', angebot);
    const neu = euro(menge * preis(id));
    if (feld.textContent !== neu) {
      feld.textContent = neu;
      if (feld.animate) feld.animate(ruhig ? [{ opacity: 0.4 }, { opacity: 1 }] : [{ opacity: 0.3, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 150, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    }
  }
  if (angebot) {
    angebot.addEventListener('change', angebotSumme);
    $$('[data-menge]', angebot).forEach((b) => b.addEventListener('click', () => {
      menge = klemmen(menge + Number(b.dataset.menge), 1, MAX_MENGE);
      angebotSumme();
    }));
    angebot.addEventListener('submit', (e) => {
      e.preventDefault();
      hinzufuegen($('input[name="paket"]:checked', angebot).value, menge);
    });
    angebotSumme();
  }
  $$('[data-hinzu]').forEach((b) => b.addEventListener('click', () => hinzufuegen(b.dataset.hinzu, 1)));
  korbZeigen();

  /* ---------- Menü am Handy ---------- */
  const menueKnopf = $('.menue-knopf'), nav = $('.kopf__nav');
  if (menueKnopf && nav) {
    menueKnopf.addEventListener('click', () => {
      const offen = nav.classList.toggle('ist-offen');
      menueKnopf.setAttribute('aria-expanded', String(offen));
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) { nav.classList.remove('ist-offen'); menueKnopf.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---------- Erscheinen beim Scrollen ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((eintraege) => {
      eintraege.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('ist-da'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    $$('.zeigen, .wachsen').forEach((el) => io.observe(el));

    // Menüpunkt zum aktuellen Abschnitt
    const links = $$('.kopf__nav a[href^="#"]');
    const ziele = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
    const navIo = new IntersectionObserver((eintraege) => {
      eintraege.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ziele.forEach((z) => navIo.observe(z));
  } else {
    $$('.zeigen, .wachsen').forEach((el) => el.classList.add('ist-da'));
  }

  /* ---------- Uhrzeit auf der Lampe im Kopfbereich ---------- */
  const heldZeit = $('.held .zeit');
  function uhr() {
    if (!heldZeit) return;
    const d = new Date();
    heldZeit.textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  uhr();
  setInterval(uhr, 15000);

  /* ---------- Himmel, Stadt, Regen und Sonnenaufgang ---------- */
  const root = document.documentElement;
  const HIMMEL = [
    [0, '#03050d', '#080b1c', '#10142e'],
    [0.3, '#070a20', '#1a1a40', '#33204a'],
    [0.62, '#15142f', '#4a2648', '#a24a3c'],
    [1, '#22203f', '#6e3a52', '#c8683f']
  ];
  const LAMPE = [[0, '#3a1a1c'], [0.15, '#8a1f1f'], [0.35, '#d4472a'], [0.55, '#ff7a3d'], [0.78, '#ffb35c'], [1, '#ffe7c6']];
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mischen = (a, b, t) => {
    const x = hex(a), y = hex(b);
    return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
  };
  function verlauf(tabelle, s, spalte) {
    for (let i = 1; i < tabelle.length; i++) {
      if (s <= tabelle[i][0]) {
        const [a, b] = [tabelle[i - 1], tabelle[i]];
        return mischen(a[spalte], b[spalte], (s - a[0]) / (b[0] - a[0]));
      }
    }
    return tabelle[tabelle.length - 1][spalte];
  }

  const welt = $('.welt');
  const stadt = welt ? $$('.welt__stadt', welt) : [];
  const aufgang = $('.aufgang');
  const aufgangKlebt = aufgang && $('.aufgang__klebt', aufgang);
  const simUhr = aufgang && $('.aufgang__uhr', aufgang);
  const simZeit = aufgang && $('.zeit', aufgang);
  const simSonne = aufgang && $('.symbol--licht', aufgang);
  const simPhasen = aufgang ? $$('.phasen li', aufgang) : [];
  const regler = aufgang && $('#zeitregler');
  const wortweise = $('.wortweise');
  const kaufleiste = $('.kaufleiste');
  const heldKnopf = $('.held [data-hinzu]');
  const angebotTeil = $('#angebot');
  let sonne = 0;
  const maus = { x: 0, y: 0 };


  // Himmel-Werte nur am Hintergrund (.welt) setzen und nur, wenn sie sich ändern.
  // An <html> gesetzt würde jede Änderung die ganze Seite neu berechnen lassen.
  const zuletzt = new Map();
  function setzeWenn(el, name, wert) {
    if (!el) return;
    const k = el;
    let m = zuletzt.get(k);
    if (!m) { m = {}; zuletzt.set(k, m); }
    if (m[name] === wert) return;
    m[name] = wert;
    el.style.setProperty(name, wert);
  }
  let stadtP = 0;
  function stadtSetzen() {
    if (ruhig) return;
    stadt.forEach((el, i) => { el.style.transform = `translate3d(${(maus.x * [-6, -14, -26][i]).toFixed(1)}px, ${(stadtP * [3, 7, 12][i]).toFixed(2)}vh, 0)`; });
  }

  // Himmel weich an einen Zielwert angleichen, damit Wechsel zwischen Simulation und Scrollen nicht springen
  let himmelIst = 0.04, himmelSoll = 0.04, himmelLaeuft = false;
  function himmelZeichnen() {
    setzeWenn(welt, '--sky1', verlauf(HIMMEL, himmelIst, 1));
    setzeWenn(welt, '--sky2', verlauf(HIMMEL, himmelIst, 2));
    setzeWenn(welt, '--sky3', verlauf(HIMMEL, himmelIst, 3));
    setzeWenn(welt, '--sun', himmelIst.toFixed(2));
    sonne = himmelIst;
  }
  function himmelZiel(s) {
    himmelSoll = s;
    if (ruhig) { himmelIst = s; himmelZeichnen(); return; }
    if (himmelLaeuft) return;
    himmelLaeuft = true;
    const schritt = () => {
      himmelIst += (himmelSoll - himmelIst) * 0.1;
      if (Math.abs(himmelSoll - himmelIst) < 0.002) himmelIst = himmelSoll;
      himmelZeichnen();
      if (himmelIst !== himmelSoll) requestAnimationFrame(schritt); else himmelLaeuft = false;
    };
    requestAnimationFrame(schritt);
  }

  // Tag-Nacht-Simulation: Schleife über 20 Sekunden, läuft nur, solange der Abschnitt sichtbar ist
  const PHASEN = [
    { bis: 6 / 20, von: 360, nach: 390, g0: 0, g1: 1, name: 'Sonnenaufgang' },
    { bis: 10 / 20, von: 390, nach: 1320, g0: 1, g1: 1, name: 'Tag' },
    { bis: 16 / 20, von: 1320, nach: 1350, g0: 1, g1: 0, name: 'Sonnenuntergang' },
    { bis: 1, von: 1350, nach: 1800, g0: 0, g1: 0, name: 'Nacht' } // 1800 = 06:00 am nächsten Tag
  ];
  const sim = { pos: ruhig ? 0.3 : 0, sichtbar: false, laeuft: false, haelt: false, angehalten: false, himmel: 0.04, zuletzt: 0, tastenUhr: 0 };
  function simZustand(pos) {
    let start = 0;
    for (let i = 0; i < PHASEN.length; i++) {
      const ph = PHASEN[i];
      if (pos <= ph.bis || i === PHASEN.length - 1) {
        const t = klemmen((pos - start) / (ph.bis - start));
        const minute = Math.round(ph.von + (ph.nach - ph.von) * t) % 1440;
        return { phase: i, name: ph.name, g: ph.g0 + (ph.g1 - ph.g0) * t, zeit: `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}` };
      }
      start = ph.bis;
    }
  }
  function simZeichnen() {
    if (!aufgangKlebt) return;
    const z = simZustand(sim.pos);
    setzeWenn(aufgangKlebt, '--lamp', verlauf(LAMPE, z.g, 1));
    setzeWenn(aufgangKlebt, '--glow', (0.06 + 0.94 * z.g).toFixed(3));
    setzeWenn(aufgangKlebt, '--p', sim.pos.toFixed(3));
    if (simUhr.textContent !== z.zeit) {
      simUhr.textContent = z.zeit;
      if (simZeit) simZeit.textContent = z.zeit;
      regler.setAttribute('aria-valuetext', `${z.zeit} Uhr, ${z.name}`);
    }
    if (!sim.haelt) regler.value = String(Math.round(sim.pos * 1000));
    simPhasen.forEach((li, i) => li.classList.toggle('ist-jetzt', i === z.phase));
    if (simSonne) simSonne.classList.toggle('ist-an', z.g > 0.02);
    sim.himmel = 0.05 + 0.95 * z.g;
    if (sim.sichtbar) himmelZiel(sim.himmel);
  }
  function simSchritt(jetzt) {
    if (!sim.laeuft) return;
    const dt = sim.zuletzt ? Math.min(0.1, (jetzt - sim.zuletzt) / 1000) : 0;
    sim.zuletzt = jetzt;
    if (!sim.haelt && !document.hidden) { sim.pos = (sim.pos + dt / 20) % 1; simZeichnen(); }
    requestAnimationFrame(simSchritt);
  }
  function simStart() {
    if (sim.laeuft || sim.angehalten || !sim.sichtbar) return;
    sim.laeuft = true; sim.zuletzt = 0;
    requestAnimationFrame(simSchritt);
  }
  function simStopp() { sim.laeuft = false; }

  function bild() {
    const y = scrollY;
    const hoehe = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = klemmen(y / hoehe);
    // Erst alles messen, dann alles schreiben (vermeidet erzwungene Zwischen-Layouts)
    const rWort = wortweise && !ruhig ? wortweise.getBoundingClientRect() : null;
    const hk = kaufleiste && heldKnopf ? heldKnopf.getBoundingClientRect() : null;
    const an = kaufleiste && angebotTeil ? angebotTeil.getBoundingClientRect() : null;

    // Sonnenstand für die ganze Seite: vor dem Abschnitt Nacht, darin die Simulation, danach leichte Dämmerung
    let s;
    if (!aufgang) s = 0.12 + p * 0.5;
    else if (sim.sichtbar) s = sim.himmel;
    else {
      const r = aufgang.getBoundingClientRect();
      const oben = r.top + y, unten = r.bottom + y;
      if (r.top > 0) s = 0.04 + 0.12 * klemmen(y / Math.max(1, oben));
      else s = 1 - 0.3 * klemmen((y - unten + innerHeight) / Math.max(1, hoehe - unten + innerHeight));
    }
    himmelZiel(s);

    stadtP = p;
    stadtSetzen();

    // Geschichte: Wort für Wort heller
    if (rWort) {
      const anteil = klemmen((innerHeight * 0.85 - rWort.top) / (rWort.height + innerHeight * 0.35));
      const woerter = wortweise._w || (wortweise._w = $$('.w', wortweise));
      const n = Math.round(anteil * woerter.length);
      woerter.forEach((w, i) => w.classList.toggle('an', i < n));
    }

    // Kaufleiste am Handy: nur wenn der Knopf oben weg ist und das Angebot nicht zu sehen ist
    if (hk) {
      const angebotSichtbar = an && an.top < innerHeight && an.bottom > 0;
      kaufleiste.classList.toggle('ist-da', hk.bottom < 0 && !angebotSichtbar);
    }
  }

  // Wörter für die Geschichte einzeln einpacken
  if (wortweise) {
    const text = wortweise.textContent.trim().split(/\s+/);
    wortweise.textContent = '';
    text.forEach((wort, i) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = wort;
      wortweise.appendChild(span);
      if (i < text.length - 1) wortweise.appendChild(document.createTextNode(' '));
    });
  }


  let wartet = false;
  const planen = () => { if (!wartet) { wartet = true; requestAnimationFrame(() => { wartet = false; bild(); }); } };
  addEventListener('scroll', planen, { passive: true });
  let mausWartet = false;
  if (feinZeiger && !ruhig) addEventListener('pointermove', (e) => {
    maus.x = e.clientX / innerWidth - 0.5; maus.y = e.clientY / innerHeight - 0.5;
    if (!mausWartet) { mausWartet = true; requestAnimationFrame(() => { mausWartet = false; stadtSetzen(); }); }
  }, { passive: true });
  const held = $('.held');
  if (held && feinZeiger && !ruhig) {
    // Kärtchen im Kopfbereich folgen dem Zeiger je nach Tiefe unterschiedlich stark
    const karten = $$('.held__chips .hinweis-chip').map((el) => ({ el, t: parseFloat(getComputedStyle(el).getPropertyValue('--t')) || 20 }));
    held.addEventListener('pointermove', (e) => {
      const px = e.clientX / innerWidth - 0.5, py = e.clientY / innerHeight - 0.5;
      karten.forEach((k) => { k.el.style.translate = `${(px * k.t).toFixed(1)}px ${(py * k.t).toFixed(1)}px`; });
    });
    held.addEventListener('pointerleave', () => karten.forEach((k) => { k.el.style.translate = ''; }));
  }
  addEventListener('resize', planen);
  bild();

  if (aufgang && regler) {
    const knopf = $('#sim-knopf');
    const knopfZeigen = () => { const an = sim.laeuft && !sim.haelt; knopf.textContent = an ? 'Anhalten' : 'Abspielen'; knopf.setAttribute('aria-pressed', String(!an)); };
    if (ruhig) sim.angehalten = true; // kein Selbststart bei "weniger Bewegung"
    simZeichnen(); knopfZeigen();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((ein) => {
        sim.sichtbar = ein[0].isIntersecting;
        if (sim.sichtbar) { simStart(); himmelZiel(sim.himmel); } else { simStopp(); planen(); }
        knopfZeigen();
      }, { threshold: 0.35 }).observe(aufgang);
    }
    // Regler anfassen hält die Schleife an, Loslassen lässt sie an derselben Stelle weiterlaufen
    const halten = () => { clearTimeout(sim.tastenUhr); sim.tastenUhr = 0; sim.haelt = true; knopfZeigen(); };
    const loslassen = () => { sim.haelt = false; sim.zuletzt = 0; knopfZeigen(); };
    regler.addEventListener('pointerdown', halten);
    regler.addEventListener('pointerup', loslassen);
    regler.addEventListener('pointercancel', loslassen);
    regler.addEventListener('input', () => {
      sim.pos = Number(regler.value) / 1000;
      simZeichnen();
      if (!sim.haelt || sim.tastenUhr) { // Tastatur: kein pointerdown, daher kurz halten und später weiterlaufen
        sim.haelt = true; clearTimeout(sim.tastenUhr);
        sim.tastenUhr = setTimeout(() => { sim.tastenUhr = 0; loslassen(); }, 1200);
      }
    });
    knopf.addEventListener('click', () => {
      if (sim.laeuft && !sim.haelt) { sim.angehalten = true; simStopp(); }
      else { sim.angehalten = false; sim.haelt = false; simStart(); }
      knopfZeigen();
    });
  }

  // Regen auf einer Zeichenfläche
  const leinwand = $('.welt__regen');
  if (leinwand && leinwand.getContext) {
    const ctx = leinwand.getContext('2d');
    let tropfen = [], b = 0, h = 0, dpr = 1;
    function groesse() {
      dpr = Math.min(1.5, devicePixelRatio || 1);
      b = innerWidth; h = innerHeight;
      leinwand.width = Math.round(b * dpr); leinwand.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const grob = window.matchMedia('(pointer: coarse)').matches;
      const anzahl = Math.min(grob ? 55 : 110, Math.round((b * h) / (grob ? 30000 : 15000)));
      tropfen = Array.from({ length: anzahl }, () => neu(true));
    }
    function neu(irgendwo) {
      const tiefe = Math.random();
      return { x: Math.random() * (b + 200) - 100, y: irgendwo ? Math.random() * h : -30, l: 8 + tiefe * 18, v: 7 + tiefe * 11, a: 0.03 + tiefe * 0.09 };
    }
    function malen(bewegen, faktor = 1) {
      ctx.clearRect(0, 0, b, h);
      const staerke = 1 - sonne * 0.7;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      for (const t of tropfen) {
        if (bewegen) { t.y += t.v * faktor; t.x += t.v * 0.16 * faktor; if (t.y > h + 20) Object.assign(t, neu(false)); }
        ctx.strokeStyle = `rgba(178,196,235,${(t.a * staerke).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(t.x - t.l * 0.16, t.y - t.l); ctx.stroke();
      }
    }
    groesse();
    addEventListener('resize', groesse);
    if (ruhig) malen(false);
    else {
      // 30 Bilder pro Sekunde genügen für Regen. Bei offenem Fenster (Warenkorb, Bewertung) steht er still,
      // damit die Glasflächen nicht ständig neu weichgezeichnet werden müssen.
      let letztes = 0;
      const schleife = (jetzt) => {
        if (!document.hidden && !document.querySelector('dialog[open]') && jetzt - letztes >= 33) {
          const faktor = letztes ? Math.min(3, (jetzt - letztes) / 16.7) : 1;
          letztes = jetzt;
          malen(true, faktor);
        }
        requestAnimationFrame(schleife);
      };
      requestAnimationFrame(schleife);
    }
  }

  /* ---------- Technik: Kartenstapel ---------- */
  const stapelKarten = $$('.stapel__karte');
  if (stapelKarten.length > 1 && !ruhig) {
    const breit = window.matchMedia('(min-width: 761px)');
    let stapelWartet = false;
    const stapelBild = () => {
      stapelWartet = false;
      if (!breit.matches) { stapelKarten.forEach((k) => { k.style.scale = ''; k.style.filter = ''; }); return; }
      const rects = stapelKarten.map((k) => k.getBoundingClientRect());
      stapelKarten.forEach((k, i) => {
        const naechste = rects[i + 1];
        if (!naechste) return;
        const ziel = 80 + (i + 1) * 22;
        const f = klemmen(1 - (naechste.top - ziel) / Math.max(1, rects[i].height));
        k.style.scale = (1 - 0.05 * f).toFixed(4);
        k.style.filter = f > 0.001 ? `brightness(${(1 - 0.4 * f).toFixed(3)})` : '';
      });
    };
    const stapelPlanen = () => { if (!stapelWartet) { stapelWartet = true; requestAnimationFrame(stapelBild); } };
    addEventListener('scroll', stapelPlanen, { passive: true });
    addEventListener('resize', stapelPlanen);
    stapelBild();
  }

  /* ---------- Display zum Antippen ---------- */
  const DISPLAY = {
    wecker: ['Zwei Weckzeiten', 'Zum Beispiel eine für Werktage und eine fürs Wochenende. Ein Tipp oben auf das Gehäuse schenkt Ihnen 9 Minuten.'],
    licht: ['Sonnenaufgang', 'Das Licht wächst in 10 bis 60 Minuten von Glut zu Tageslicht. Tagsüber dient es als Leselicht in 20 Stufen.'],
    klang: ['12 Klänge', 'Regen, Wellen, Wald, Lagerfeuer, weißes Rauschen und mehr. Lautstärke in 16 Stufen, zum Wecken oder zum Einschlafen.'],
    schlaf: ['Sonnenuntergang', 'Abends dimmt das Licht in 10 bis 60 Minuten herunter, bis es ganz aus ist.'],
    timer: ['Einschlaf-Timer', 'Licht und Klänge schalten sich nach 15, 30, 60 oder 90 Minuten von selbst ab.']
  };
  const display = $('.display');
  if (display) {
    const erkl = $('.display__erklaerung');
    $$('[data-symbol]', display).forEach((b) => b.addEventListener('click', () => {
      $$('[data-symbol]', display).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const [titel, text] = DISPLAY[b.dataset.symbol];
      $('h3', erkl).textContent = titel;
      $('p', erkl).textContent = text;
      erkl.classList.remove('wechsel'); void erkl.offsetWidth; erkl.classList.add('wechsel');
    }));
  }

  /* ---------- Regen probehören (wird im Browser erzeugt, keine Datei) ---------- */
  const hoerKnopf = $('[data-probehoeren]');
  if (hoerKnopf) {
    let ac = null, quelle = null, laut = null;
    const welle = $('.welle');
    hoerKnopf.addEventListener('click', async () => {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { hoerKnopf.textContent = 'Nicht verfügbar'; return; }
      if (quelle) {
        laut.gain.setTargetAtTime(0, ac.currentTime, 0.25);
        const q = quelle; quelle = null;
        setTimeout(() => q.stop(), 900);
        hoerKnopf.setAttribute('aria-pressed', 'false');
        $('span', hoerKnopf).textContent = 'Regen probehören';
        welle && welle.classList.remove('spielt');
        return;
      }
      ac = ac || new AC();
      await ac.resume();
      const dauer = 4, puffer = ac.createBuffer(1, ac.sampleRate * dauer, ac.sampleRate), d = puffer.getChannelData(0);
      let letzte = 0;
      for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; letzte = (letzte + 0.04 * w) / 1.04; d[i] = letzte * 3.2 + w * 0.05; }
      quelle = ac.createBufferSource(); quelle.buffer = puffer; quelle.loop = true;
      const filter = ac.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1400;
      laut = ac.createGain(); laut.gain.value = 0;
      quelle.connect(filter).connect(laut).connect(ac.destination);
      quelle.start();
      laut.gain.setTargetAtTime(0.35, ac.currentTime, 0.6);
      hoerKnopf.setAttribute('aria-pressed', 'true');
      $('span', hoerKnopf).textContent = 'Anhalten';
      welle && welle.classList.add('spielt');
    });
  }

  /* ---------- Abend bis Morgen ---------- */
  const teile = $$('.nacht__teil');
  const fein = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function oeffnen(t) {
    teile.forEach((x) => { x.classList.toggle('ist-offen', x === t); x.setAttribute('aria-expanded', String(x === t)); });
  }
  teile.forEach((t) => {
    t.addEventListener('click', () => oeffnen(t));
    t.addEventListener('focus', () => oeffnen(t));
    if (fein) {
      // Erst nach kurzem Verweilen öffnen, damit Durchziehen der Maus nichts aufklappt
      let warte;
      t.addEventListener('mouseenter', () => { clearTimeout(warte); warte = setTimeout(() => oeffnen(t), 120); });
      t.addEventListener('mouseleave', () => clearTimeout(warte));
    }
  });

  /* ---------- Formulare an PHP schicken ---------- */
  async function senden(form, ziel) {
    const meldung = $('.meldung', form);
    const knopf = $('button[type="submit"]', form);
    meldung.className = 'meldung';
    meldung.textContent = '';
    knopf.disabled = true;
    try {
      const antwort = await fetch(ziel, { method: 'POST', body: new FormData(form), headers: { 'X-Requested-With': 'fetch' } });
      const daten = await antwort.json();
      return daten;
    } catch {
      meldung.classList.add('fehler');
      meldung.textContent = 'Das klappt erst, wenn die Seite online auf einem Server mit PHP liegt.';
      return null;
    } finally {
      knopf.disabled = false;
    }
  }


  /* ---------- 3D: Bühne und Karten kippen mit dem Zeiger ---------- */
  if (feinZeiger && !ruhig) {
    $$('[data-kipp]').forEach((k) => {
      // Kippen direkt per transform, Lichtreflex als eigenes Element: keine vererbten Variablen pro Mausbewegung
      const glanz = document.createElement('span');
      glanz.className = 'kipp-glanz';
      glanz.setAttribute('aria-hidden', 'true');
      k.appendChild(glanz);
      k.addEventListener('pointermove', (e) => {
        const r = k.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        k.classList.add('kippt');
        k.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * 7).toFixed(2)}deg) rotateY(${((x - 0.5) * 7).toFixed(2)}deg)`;
        glanz.style.transform = `translate(${(x * r.width).toFixed(0)}px, ${(y * r.height).toFixed(0)}px)`;
      });
      k.addEventListener('pointerleave', () => { k.classList.remove('kippt'); k.style.transform = ''; });
    });
  }

  /* ---------- 3D-Lampen: ziehen, mit Schwung loslassen, Pfeiltasten, kreisende Kärtchen ---------- */
  $$('[data-dreh]').forEach((l3d, nr) => {
    const objekt = $('.l3d__objekt', l3d);
    const flaechen = $$('.l3d__schirm, .l3d__sockel', l3d).map((el) => ({ el, k: Number(el.style.getPropertyValue('--k')), schirm: el.classList.contains('l3d__schirm') }));
    const chips = $$('.l3d__chip', l3d).map((el) => ({ el, a: Number(el.dataset.winkel), h: Number(el.dataset.hoehe) }));
    let winkel = nr === 0 ? -28 : 24, tempo = 0, zieht = false, letztesX = 0, proben = [], sichtbar = false, zuletzt = performance.now();
    const EIGEN = ruhig ? 0 : (chips.length ? 9 : 7); // Grad pro Sekunde, langsames Eigendrehen
    const RADIUS = 215;
    function zeichnen() {
      objekt.style.transform = `rotateX(-14deg) rotateY(${winkel.toFixed(2)}deg)`;
      flaechen.forEach((f) => {
        const c = Math.cos(((winkel + f.k * 90) * Math.PI) / 180);
        f.el.style.setProperty('--hell', (f.schirm ? 0.72 + 0.32 * Math.max(0, c) : 0.6 + 0.45 * Math.max(0, c)).toFixed(3));
      });
      chips.forEach((c) => {
        // Kärtchen kreisen um die Lampe, schauen aber immer zum Betrachter
        const vorn = Math.cos(((c.a + winkel) * Math.PI) / 180);
        c.el.style.transform = `translateY(${-c.h}px) rotateY(${c.a}deg) translateZ(${RADIUS}px) rotateY(${-(c.a + winkel)}deg) rotateX(14deg)`;
        c.el.style.opacity = (0.25 + 0.75 * Math.max(0, (vorn + 0.35) / 1.35)).toFixed(3);
      });
    }
    function schritt(jetzt) {
      const dt = Math.min(0.05, (jetzt - zuletzt) / 1000);
      zuletzt = jetzt;
      if (!zieht) {
        tempo *= Math.pow(0.04, dt); // Schwung klingt weich aus
        winkel += (tempo + EIGEN) * dt;
        zeichnen();
      }
      if (sichtbar && !document.hidden) requestAnimationFrame(schritt);
    }
    function starten() { zuletzt = performance.now(); requestAnimationFrame(schritt); }
    l3d.addEventListener('pointerdown', (e) => {
      zieht = true; tempo = 0; letztesX = e.clientX; proben = [{ x: e.clientX, t: e.timeStamp }];
      l3d.setPointerCapture(e.pointerId); l3d.classList.add('zieht');
    });
    l3d.addEventListener('pointermove', (e) => {
      if (!zieht) return;
      winkel += (e.clientX - letztesX) * 0.55;
      letztesX = e.clientX;
      proben.push({ x: e.clientX, t: e.timeStamp });
      proben = proben.filter((p) => e.timeStamp - p.t < 100);
      zeichnen();
    });
    const loslassen = () => {
      if (!zieht) return;
      zieht = false; l3d.classList.remove('zieht');
      const a = proben[0], b = proben[proben.length - 1];
      if (a && b && b.t > a.t) tempo = ((b.x - a.x) / (b.t - a.t)) * 1000 * 0.55; // Fingertempo wird zum Drehschwung
      tempo = klemmen(tempo, -900, 900);
      if (sichtbar) starten();
    };
    l3d.addEventListener('pointerup', loslassen);
    l3d.addEventListener('pointercancel', loslassen);
    l3d.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); winkel += e.key === 'ArrowLeft' ? -20 : 20; zeichnen(); }
    });
    zeichnen();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((ein) => {
        const vorher = sichtbar;
        sichtbar = ein[0].isIntersecting;
        if (sichtbar && !vorher) starten();
      }).observe(l3d);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden && sichtbar) starten(); });
  });

  /* ---------- Kopfbereich: die Lampe geht beim Laden auf wie die Sonne ---------- */
  const intro = $('[data-intro]');
  if (intro) {
    const ende = { lamp: '#ffb35c', glow: 0.92 };
    if (ruhig) { intro.style.setProperty('--lamp', ende.lamp); intro.style.setProperty('--glow', ende.glow); }
    else {
      const dauer = 2600, start = performance.now() + 250;
      const lauf = (jetzt) => {
        const t = klemmen((jetzt - start) / dauer);
        const e = 1 - Math.pow(1 - t, 3);
        intro.style.setProperty('--lamp', verlauf(LAMPE, e * 0.8, 1));
        intro.style.setProperty('--glow', (0.04 + 0.88 * e).toFixed(3));
        if (t < 1) requestAnimationFrame(lauf);
      };
      intro.style.setProperty('--glow', '0.04');
      requestAnimationFrame(lauf);
    }
  }

  /* ---------- Zahlen zählen hoch, wenn sie ins Bild kommen ---------- */
  if (!ruhig && 'IntersectionObserver' in window) {
    const zio = new IntersectionObserver((ein) => {
      ein.forEach((e) => {
        if (!e.isIntersecting) return;
        zio.unobserve(e.target);
        const el = e.target, ziel = Number(el.dataset.zaehlen), t0 = performance.now();
        const z = (jetzt) => {
          const t = klemmen((jetzt - t0) / 1100);
          el.textContent = String(Math.round(ziel * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(z);
        };
        requestAnimationFrame(z);
      });
    }, { threshold: 0.6 });
    $$('[data-zaehlen]').forEach((el) => zio.observe(el));
  }

  /* ---------- Bewertungen ---------- */
  const rezDaten = $('#bewertungen-daten');
  if (rezDaten) {
    let alle = [];
    try { alle = JSON.parse(rezDaten.textContent); } catch { alle = []; }
    const geklickt = speicher.lesen('helia-hilfreich', []);
    const STERN = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.5l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/></svg>';
    const DAUMEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 2 2v4h5.5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.3 20H7"/></svg>';
    const sterneHtml = (n) => {
      let h = '';
      for (let i = 1; i <= 5; i++) {
        const voll = Math.min(1, Math.max(0, n - i + 1));
        h += voll >= 0.75 ? STERN : voll >= 0.25
          ? `<span style="position:relative;display:inline-block"><span class="leer">${STERN}</span><span style="position:absolute;inset:0;width:50%;overflow:hidden">${STERN}</span></span>`
          : `<span class="leer">${STERN}</span>`;
      }
      return h;
    };
    const zahl = (n) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const datum = (d) => new Date(d + 'T12:00:00').toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const nurBeispiele = alle.length > 0 && alle.every((r) => r.beispiel);
    const wort = nurBeispiele ? 'Beispielbewertung' : 'Bewertung';
    const schnitt = alle.length ? alle.reduce((a, r) => a + r.sterne, 0) / alle.length : 0;
    let filter = 0, sortierung = 'neu', gezeigt = 4;

    // Zusammenfassung
    $('[data-rez="schnitt"]').textContent = zahl(schnitt);
    $('[data-rez="sterne"]').innerHTML = sterneHtml(schnitt);
    $('[data-rez="sterne"]').setAttribute('aria-label', `${zahl(schnitt)} von 5 Sternen`);
    $('[data-rez="anzahl"]').textContent = `aus ${alle.length} ${wort}${alle.length === 1 ? '' : 'en'}`;
    const kopf = $('[data-rez="kopf"]');
    if (kopf && alle.length) {
      $('[data-rez="sterne-kopf"]').innerHTML = sterneHtml(schnitt);
      $('[data-rez="kopf-text"]').textContent = `${zahl(schnitt)} · ${alle.length} ${wort}${alle.length === 1 ? '' : 'en'}`;
    }
    const vert = $('[data-rez="verteilung"]');
    [5, 4, 3, 2, 1].forEach((n) => {
      const anzahl = alle.filter((r) => r.sterne === n).length;
      const li = document.createElement('li');
      li.innerHTML = `<button type="button" aria-pressed="false"><span>${n} ★</span><span class="spur"><i style="--a:${alle.length ? (anzahl / alle.length).toFixed(3) : 0}"></i></span><span class="wert">${anzahl}</span></button>`;
      const b = $('button', li);
      b.setAttribute('aria-label', `${n} Sterne: ${anzahl}. Filtern`);
      b.addEventListener('click', () => { filter = filter === n ? 0 : n; gezeigt = 4; liste(); });
      vert.appendChild(li);
    });

    function liste() {
      $$('button', vert).forEach((b, i) => b.setAttribute('aria-pressed', String(filter === 5 - i)));
      let r = alle.filter((x) => !filter || x.sterne === filter);
      const f = { neu: (a, b) => b.datum.localeCompare(a.datum), hilfreich: (a, b) => b.hilfreich - a.hilfreich, hoch: (a, b) => b.sterne - a.sterne || b.datum.localeCompare(a.datum), tief: (a, b) => a.sterne - b.sterne || b.datum.localeCompare(a.datum) };
      r = r.slice().sort(f[sortierung]);
      const info = $('[data-rez="info"]');
      info.innerHTML = filter
        ? `${r.length} mit ${filter} Sternen <button type="button">Filter aufheben</button>`
        : `${alle.length} ${wort}${alle.length === 1 ? '' : 'en'}`;
      const auf = $('button', info);
      if (auf) auf.addEventListener('click', () => { filter = 0; liste(); });
      const ul = $('[data-rez="liste"]');
      ul.innerHTML = '';
      if (!r.length) { ul.innerHTML = '<li class="rez__leer glas">Noch keine Bewertungen mit dieser Sternezahl.</li>'; }
      r.slice(0, gezeigt).forEach((x, i) => {
        const li = document.createElement('li');
        li.className = 'rez__karte glas';
        li.style.animationDelay = `${Math.min(i, 5) * 50}ms`;
        const hat = geklickt.includes(x.id);
        li.innerHTML = `<div class="rez__kopf"><span class="sterne" aria-label="${x.sterne} von 5 Sternen">${sterneHtml(x.sterne)}</span><span class="rez__datum"></span></div>
          <h3 class="rez__titel"></h3><p class="rez__text"></p>
          ${x.antwort ? '<div class="rez__antwort"><b>Antwort von HELIA</b><p></p></div>' : ''}
          <div class="rez__fuss"><span class="rez__autor"><span class="rez__avatar" aria-hidden="true"></span><span class="rez__name"></span>
            <span class="marke-klein ${x.beispiel ? 'marke-klein--beispiel">Beispiel' : 'marke-klein--echt">Geprüfter Kauf'}</span></span>
            <button type="button" class="hilfreich" aria-pressed="${hat}">${DAUMEN}<span>Hilfreich (${x.hilfreich + (hat ? 1 : 0)})</span></button></div>`;
        $('.rez__datum', li).textContent = datum(x.datum);
        $('.rez__titel', li).textContent = x.titel;
        $('.rez__text', li).textContent = x.text;
        $('.rez__name', li).textContent = x.name;
        $('.rez__avatar', li).textContent = (x.name || '?').trim().charAt(0).toUpperCase();
        if (x.antwort) $('.rez__antwort p', li).textContent = x.antwort;
        $('.hilfreich', li).addEventListener('click', (e) => {
          const b = e.currentTarget, j = geklickt.indexOf(x.id);
          if (j >= 0) geklickt.splice(j, 1); else geklickt.push(x.id);
          speicher.schreiben('helia-hilfreich', geklickt);
          const an = j < 0;
          b.setAttribute('aria-pressed', String(an));
          $('span', b).textContent = `Hilfreich (${x.hilfreich + (an ? 1 : 0)})`;
        });
        ul.appendChild(li);
      });
      const mehr = $('[data-rez="mehr"]');
      mehr.hidden = r.length <= gezeigt;
    }
    $('[data-rez="mehr"]').addEventListener('click', () => { gezeigt += 4; liste(); });

    // Zitat-Karussell: hebt die besten Bewertungen hervor, bedient mit Pfeilen oder Pfeiltasten
    const zitate = $('[data-zitate]');
    if (zitate) {
      const auswahl = alle.filter((r) => r.sterne >= 4).sort((a, b) => b.hilfreich - a.hilfreich).slice(0, 5);
      const buehne = $('.zitate__buehne', zitate), koepfe = $('.zitate__koepfe', zitate), zahl = $('.zitate__zahl', zitate);
      let jetzt = 0;
      koepfe.innerHTML = auswahl.map((r) => `<span>${(r.name || '?').trim().charAt(0).toUpperCase()}</span>`).join('');
      function zeigen(richtung) {
        const r = auswahl[jetzt];
        if (!r) { zitate.hidden = true; return; }
        const fig = document.createElement('figure');
        fig.className = 'zitat';
        fig.innerHTML = `<blockquote></blockquote><figcaption><span class="sterne" aria-label="${r.sterne} von 5 Sternen">${sterneHtml(r.sterne)}</span><span class="zitat__name"></span><span class="marke-klein ${r.beispiel ? 'marke-klein--beispiel">Beispiel' : 'marke-klein--echt">Geprüfter Kauf'}</span></figcaption>`;
        $('blockquote', fig).textContent = r.text;
        $('.zitat__name', fig).textContent = r.name;
        buehne.replaceChildren(fig);
        if (richtung && !ruhig && fig.animate) fig.animate([{ opacity: 0, transform: `translateX(${richtung * 18}px)` }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
        zahl.textContent = `${jetzt + 1} / ${auswahl.length}`;
        $$('span', koepfe).forEach((k, i) => k.classList.toggle('ist-jetzt', i === jetzt));
      }
      const blaettern = (d) => { jetzt = (jetzt + d + auswahl.length) % auswahl.length; zeigen(d); };
      $('[data-zurueck]', zitate).addEventListener('click', () => blaettern(-1));
      $('[data-weiter]', zitate).addEventListener('click', () => blaettern(1));
      zitate.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); blaettern(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); blaettern(1); }
      });
      zeigen(0);
    }
    $('#rez-sort').addEventListener('change', (e) => { sortierung = e.target.value; liste(); });
    liste();

    // Bewertung schreiben
    const dlg = $('#bewerten'), form = $('#bewerten-form');
    $$('[data-bewerten]').forEach((b) => b.addEventListener('click', () => { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); }));
    $('[data-bewerten-zu]', dlg).addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const m = $('.meldung', form);
      const falsch = $$('input[required], textarea[required]', form).find((f) => (f.type === 'radio' ? !$(`input[name="${f.name}"]:checked`, form) : !f.checkValidity()));
      if (falsch) {
        m.className = 'meldung fehler';
        m.textContent = falsch.type === 'radio' ? 'Bitte wählen Sie 1 bis 5 Sterne.' : falsch.name === 'text' ? 'Bitte schreiben Sie mindestens 20 Zeichen.' : falsch.name === 'einwilligung' ? 'Bitte setzen Sie das Häkchen zur Veröffentlichung.' : 'Bitte füllen Sie alle Felder aus.';
        falsch.focus();
        return;
      }
      const d = await senden(form, 'send.php');
      if (!d) return;
      m.className = 'meldung ' + (d.ok ? 'ok' : 'fehler');
      m.textContent = d.ok ? 'Danke. Wir prüfen Ihre Bewertung anhand der Bestellnummer und veröffentlichen sie danach.' : d.fehler;
      if (d.ok) form.reset();
    });
  }

  // Newsletter
  const brief = $('#newsletter');
  if (brief) {
    brief.addEventListener('submit', async (e) => {
      e.preventDefault();
      const feld = $('input[type="email"]', brief);
      const meldung = $('.meldung', brief);
      if (!feld.checkValidity() || !$('input[name="einwilligung"]', brief).checked) {
        meldung.className = 'meldung fehler';
        meldung.textContent = 'Bitte E-Mail-Adresse eintragen und das Häkchen setzen.';
        feld.setAttribute('aria-invalid', String(!feld.checkValidity()));
        return;
      }
      feld.removeAttribute('aria-invalid');
      const d = await senden(brief, 'send.php');
      if (!d) return;
      meldung.className = 'meldung ' + (d.ok ? 'ok' : 'fehler');
      meldung.textContent = d.ok ? 'Fast geschafft. Bitte bestätigen Sie den Link in der E-Mail, die wir Ihnen gerade geschickt haben.' : d.fehler;
      if (d.ok) brief.reset();
    });
  }

  /* ---------- Kasse ---------- */
  const kasse = $('#kasse-form');
  if (kasse) {
    const seite = $('.kasse__seite');
    let rabatt = false;
    async function pruefwert(text) {
      if (!window.crypto || !crypto.subtle) return '';
      const roh = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text.trim().toUpperCase()));
      return Array.from(new Uint8Array(roh)).map((x) => x.toString(16).padStart(2, '0')).join('');
    }
    function kasseZeigen() {
      const leer = korbAnzahl() === 0;
      $('.leere-kasse').hidden = !leer;
      $('.kasse__raster').hidden = leer;
      if (leer) return;
      const liste = $('.kasse__posten', seite);
      liste.innerHTML = '';
      ['einzeln', 'set'].forEach((id) => {
        if (!korb[id]) return;
        const z = document.createElement('div');
        z.className = 'zeile';
        z.innerHTML = '<span></span><span></span>';
        z.firstChild.textContent = `${korb[id]} × ${PRODUKTE[id].name}`;
        z.lastChild.textContent = euro(korb[id] * preis(id));
        liste.appendChild(z);
      });
      const waren = korbSumme();
      const nachlass = rabatt ? Math.round(waren * 0.1) : 0;
      const versand = versandFuer(waren - nachlass);
      const gesamt = waren - nachlass + versand;
      $('[data-feld="rabatt-zeile"]', seite).hidden = !rabatt;
      $('[data-feld="rabatt"]', seite).textContent = '− ' + euro(nachlass);
      $('[data-feld="versand"]', seite).textContent = versand ? euro(versand) : 'kostenlos';
      $('[data-feld="gesamt"]', seite).textContent = euro(gesamt);
      $('[data-feld="mwst"]', seite).textContent = euro(Math.round(gesamt - gesamt / 1.19));
      $('[data-feld="gesamt-knopf"]').textContent = euro(gesamt);
      $('input[name="einzeln"]', kasse).value = korb.einzeln;
      $('input[name="set"]', kasse).value = korb.set;
    }
    document.addEventListener('korb-geaendert', kasseZeigen);

    const gFeld = $('#gutschein'), gMeldung = $('.gutschein-meldung');
    $('[data-gutschein]').addEventListener('click', async () => {
      const ok = gFeld.value.trim() !== '' && (await pruefwert(gFeld.value)) === CODE_PRUEFWERT;
      rabatt = ok;
      $('input[name="gutschein"]', kasse).value = ok ? gFeld.value.trim().toUpperCase() : '';
      gMeldung.className = 'meldung gutschein-meldung ' + (ok ? 'ok' : 'fehler');
      gMeldung.textContent = ok ? '10 % Rabatt sind abgezogen.' : 'Dieser Code ist leider nicht gültig.';
      kasseZeigen();
    });
    kasseZeigen();

    // Prüft ein Feld und zeigt oder löscht die Fehlermeldung darunter
    function pruefen(f) {
      const gut = f.type === 'radio' ? !!$(`input[name="${f.name}"]:checked`, kasse) : f.checkValidity();
      const gruppe = f.type === 'radio' ? $$(`input[name="${f.name}"]`, kasse) : [f];
      gruppe.forEach((x) => x.setAttribute('aria-invalid', String(!gut)));
      const fehler = f.closest('.feldgruppe') && $('.fehlertext', f.closest('.feldgruppe'));
      if (fehler) fehler.textContent = gut ? '' : (f.dataset.fehler || 'Bitte ausfüllen.');
      return gut;
    }
    // Nach dem ersten Fehler wird beim Tippen sofort neu geprüft
    ['input', 'change'].forEach((ev) => kasse.addEventListener(ev, (e) => {
      if (e.target.matches('input[required], select[required]') && e.target.hasAttribute('aria-invalid')) pruefen(e.target);
    }));

    kasse.addEventListener('submit', async (e) => {
      e.preventDefault();
      let erstesFalsches = null;
      $$('input[required], select[required]', kasse).forEach((f) => {
        if (!pruefen(f) && !erstesFalsches) erstesFalsches = f;
      });
      if (erstesFalsches) { erstesFalsches.focus(); return; }
      const d = await senden(kasse, 'send.php');
      if (!d) return;
      if (d.ok) {
        korb = { einzeln: 0, set: 0 };
        speicher.schreiben('helia-korb', korb);
        location.href = 'danke?nr=' + encodeURIComponent(d.nr);
      } else {
        const m = $('.meldung', kasse);
        m.className = 'meldung fehler';
        m.textContent = d.fehler;
      }
    });
  }

  /* ---------- Danke-Seite ---------- */
  const nrFeld = $('.bestellnr');
  if (nrFeld) {
    const nr = new URLSearchParams(location.search).get('nr') || '';
    if (/^HL-[0-9A-Z-]{6,30}$/.test(nr)) nrFeld.textContent = nr; else nrFeld.parentElement.hidden = true;
    korb = { einzeln: 0, set: 0 };
    speicher.schreiben('helia-korb', korb);
    korbZeigen();
  }

  /* ---------- Vertrag widerrufen ---------- */
  const widerruf = $('#widerruf-form');
  if (widerruf) {
    widerruf.addEventListener('submit', async (e) => {
      e.preventDefault();
      const m = $('.meldung', widerruf);
      const fehlt = $$('input[required]', widerruf).find((f) => !f.checkValidity());
      if (fehlt) { m.className = 'meldung fehler'; m.textContent = 'Bitte Name, E-Mail-Adresse und Bestellnummer angeben.'; fehlt.focus(); return; }
      const d = await senden(widerruf, 'send.php');
      if (!d) return;
      m.className = 'meldung ' + (d.ok ? 'ok' : 'fehler');
      m.textContent = d.ok ? `Ihr Widerruf ist am ${d.zeit} eingegangen. Eine Bestätigung ist per E-Mail unterwegs.` : d.fehler;
      if (d.ok) widerruf.reset();
    });
  }
})();
