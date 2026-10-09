/* HORTA: Bedienung, Warenkorb, Probierstand und Kasse. Reines JavaScript ohne Bibliotheken. */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const feinZeiger = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const klemmen = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const KURVE = 'cubic-bezier(0.23, 1, 0.32, 1)';

  /* ---------- Preise (der Server rechnet in send.php noch einmal selbst) ---------- */
  const EINFUEHRUNG_BIS = Date.UTC(2026, 10, 30, 22, 59, 59); // 30.11.2026, 23:59:59 Uhr deutscher Zeit
  const einfuehrung = Date.now() <= EINFUEHRUNG_BIS;
  const PRODUKTE = {
    einzeln: { name: 'HORTA', info: 'Gemüseschneider, 1 Stück', einf: 4490, normal: 5490 },
    set: { name: 'HORTA, 2er-Set', info: '2 Gemüseschneider, versandkostenfrei', einf: 7590, normal: 9290 }
  };
  const VERSAND = 490, GRATIS_AB = 4900, MAX_MENGE = 5;
  // Prüfwert (SHA-256) des Newsletter-Codes, damit der Code nicht im Quelltext steht
  const CODE_PRUEFWERT = 'b22e1a37a871f40bdb4976043a71376005875f6e0040be9919a84c4afe39a746';
  const preis = (id) => (einfuehrung ? PRODUKTE[id].einf : PRODUKTE[id].normal);
  const euro = (cent) => (cent / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

  // Preise auf der Seite eintragen (nach dem 30.11. automatisch der normale Preis)
  $$('[data-preis]').forEach((el) => { el.textContent = euro(preis(el.dataset.preis)); });
  if (!einfuehrung) $$('[data-nur-einfuehrung]').forEach((el) => { el.hidden = true; });

  /* ---------- Speicher (kann im privaten Modus fehlen) ---------- */
  const speicher = {
    lesen(k, std) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : std; } catch { return std; } },
    schreiben(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* egal */ } },
    loeschen(k) { try { localStorage.removeItem(k); } catch { /* egal */ } }
  };

  /* ---------- Warenkorb ---------- */
  let korb = speicher.lesen('horta-korb', { einzeln: 0, set: 0 });
  if (typeof korb !== 'object' || korb === null) korb = { einzeln: 0, set: 0 };
  ['einzeln', 'set'].forEach((k) => { korb[k] = klemmen(parseInt(korb[k], 10) || 0, 0, MAX_MENGE); });

  const korbSumme = () => korb.einzeln * preis('einzeln') + korb.set * preis('set');
  const korbAnzahl = () => korb.einzeln + korb.set;
  const versandFuer = (warenwert) => (warenwert === 0 || warenwert >= GRATIS_AB ? 0 : VERSAND);

  function korbSpeichern() {
    speicher.schreiben('horta-korb', korb);
    korbZeigen();
    document.dispatchEvent(new CustomEvent('korb-geaendert'));
  }

  const dialog = $('#korb');
  // Entfernte Artikel gleiten weg und die Lücke schließt sich weich, statt dass alles springt
  async function wegAnimieren(li) {
    li.style.pointerEvents = 'none';
    if (ruhig || !li.animate) return;
    const abstand = parseFloat(getComputedStyle(li.parentElement).rowGap) || 0;
    await li.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(12px)' }], { duration: 180, easing: KURVE, fill: 'forwards' }).finished;
    await li.animate([{ height: li.offsetHeight + 'px', marginBottom: '0px', paddingTop: getComputedStyle(li).paddingTop, paddingBottom: getComputedStyle(li).paddingBottom },
      { height: '0px', marginBottom: -abstand + 'px', paddingTop: '0px', paddingBottom: '0px' }], { duration: 160, easing: KURVE, fill: 'forwards' }).finished;
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
    $$('[data-menge]', angebot).forEach((b) => { b.disabled = Number(b.dataset.menge) < 0 ? menge <= 1 : menge >= MAX_MENGE; });
    const feld = $('[data-feld="angebot-summe"]', angebot);
    const neu = euro(menge * preis(id));
    if (feld.textContent !== neu) {
      feld.textContent = neu;
      if (feld.animate) feld.animate(ruhig ? [{ opacity: 0.4 }, { opacity: 1 }] : [{ opacity: 0.3, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 150, easing: KURVE });
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

  /* ---------- Himmel, Beet und Abschied ---------- */
  // Licht über den Tag: oben frischer Morgen, unten warmer Abend am gedeckten Tisch
  const HIMMEL = [
    [0, '#fbf8f1', '#f6f2e8', '#ebf1e1'],
    [0.5, '#fdfaf3', '#f7f3ea', '#eef3e4'],
    [1, '#fdf0dc', '#f8e2c6', '#efcda3']
  ];
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
  const beete = welt ? $$('.welt__beet', welt) : [];
  const wortweise = $('.wortweise');
  const kaufleiste = $('.kaufleiste');
  const heldKnopf = $('.held [data-hinzu]');
  const angebotTeil = $('#angebot');
  const abschied = $('.abschied');
  const maus = { x: 0, y: 0 };

  // Werte nur am Hintergrund (.welt) setzen und nur, wenn sie sich ändern.
  // An <html> gesetzt würde jede Änderung die ganze Seite neu berechnen lassen.
  const zuletzt = new Map();
  function setzeWenn(el, name, wert) {
    if (!el) return;
    let m = zuletzt.get(el);
    if (!m) { m = {}; zuletzt.set(el, m); }
    if (m[name] === wert) return;
    m[name] = wert;
    el.style.setProperty(name, wert);
  }
  let beetP = 0;
  function beetSetzen() {
    if (ruhig) return;
    beete.forEach((el, i) => { el.style.transform = `translate3d(${(maus.x * [-6, -14, -24][i]).toFixed(1)}px, ${(beetP * [2, 5, 9][i]).toFixed(2)}vh, 0)`; });
  }

  // Himmel weich an einen Zielwert angleichen, damit nichts springt
  let himmelIst = 0.1, himmelSoll = 0.1, himmelLaeuft = false;
  function himmelZeichnen() {
    setzeWenn(welt, '--sky1', verlauf(HIMMEL, himmelIst, 1));
    setzeWenn(welt, '--sky2', verlauf(HIMMEL, himmelIst, 2));
    setzeWenn(welt, '--sky3', verlauf(HIMMEL, himmelIst, 3));
    setzeWenn(welt, '--sun', himmelIst.toFixed(2));
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

  function bild() {
    const y = scrollY;
    const hoehe = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = klemmen(y / hoehe);
    // Erst alles messen, dann alles schreiben (vermeidet erzwungene Zwischen-Layouts)
    const rWort = wortweise && !ruhig ? wortweise.getBoundingClientRect() : null;
    const hk = kaufleiste && heldKnopf ? heldKnopf.getBoundingClientRect() : null;
    const an = kaufleiste && angebotTeil ? angebotTeil.getBoundingClientRect() : null;
    const rAb = abschied ? abschied.getBoundingClientRect() : null;

    let s = 0.1 + 0.4 * p;
    // Abschied: am Ende der Seite wird das Licht warm wie an einem Sommerabend
    if (rAb) {
      const unter = ruhig ? 0.7 : klemmen((innerHeight - rAb.top) / Math.max(1, rAb.height));
      setzeWenn(abschied, '--unter', unter.toFixed(3));
      s += (1 - s) * klemmen(unter * 1.1);
    }
    himmelZiel(s);

    beetP = p;
    beetSetzen();

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
    if (!mausWartet) { mausWartet = true; requestAnimationFrame(() => { mausWartet = false; beetSetzen(); }); }
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

  /* ---------- Probierstand: Zutat und Einsatz wählen, schneiden, die Schüssel füllt sich ---------- */
  const ZUTATEN = {
    gurke: { name: 'Gurke', farbe: '#4f8a3b', innen: '#d9eab8', lage: '#9cc46e' },
    karotte: { name: 'Karotte', farbe: '#ee8a2a', innen: '#f6b36a', lage: '#ee8a2a' },
    kartoffel: { name: 'Kartoffel', farbe: '#e3c67c', innen: '#f3e2ae', lage: '#ecd594' },
    rotkohl: { name: 'Rotkohl', farbe: '#7b2f70', innen: '#c98bbd', lage: '#8e3a80' },
    kaese: { name: 'Käse', farbe: '#f0cf6a', innen: '#f8e3a0', lage: '#f2d77a' },
    nuss: { name: 'Nüsse', farbe: '#8a5a33', innen: '#c08a5a', lage: '#9a6a40' }
  };
  const EINSATZ = {
    duenn: { name: 'dünne Scheiben', muster: 'scheibe' },
    dick: { name: 'dicke Scheiben', muster: 'scheibe' },
    grob: { name: 'grob geraspelt', muster: 'streifen' },
    fein: { name: 'fein geraspelt', muster: 'streifen' },
    reibe: { name: 'fein gerieben', muster: 'krumen' }
  };
  const TIPPS = {
    'gurke-duenn': 'Gurkensalat mit Dill und Joghurt.',
    'gurke-dick': 'Gurkenscheiben für die Rohkostplatte.',
    'gurke-grob': 'Tzatziki: Gurke raspeln, ausdrücken, mit Joghurt und Knoblauch mischen.',
    'gurke-fein': 'Fein geraspelt für ein kühles Tzatziki.',
    'gurke-reibe': 'Für Gurke ist die feine Reibe zu fein. Besser: dünne Scheiben.',
    'karotte-duenn': 'Karottenscheiben für Suppe oder Gemüsepfanne.',
    'karotte-dick': 'Dicke Scheiben zum Dünsten mit etwas Butter.',
    'karotte-grob': 'Möhrensalat mit Apfel und Zitrone.',
    'karotte-fein': 'Fein geraspelt für Karottenkuchen.',
    'karotte-reibe': 'Für Karotten ist die feine Reibe zu fein. Besser: grob raspeln.',
    'kartoffel-duenn': 'Hauchdünne Kartoffelchips aus dem Ofen.',
    'kartoffel-dick': 'Kartoffelgratin mit Sahne und Muskat.',
    'kartoffel-grob': 'Rösti: raspeln, ausdrücken, goldbraun braten.',
    'kartoffel-fein': 'Reibekuchen mit einer Zwiebel und etwas Ei.',
    'kartoffel-reibe': 'Für Kartoffeln ist die feine Reibe zu fein. Besser: fein raspeln.',
    'rotkohl-duenn': 'Dünne Streifen für einen bunten Wintersalat.',
    'rotkohl-dick': 'Grobe Stücke zum Schmoren mit Apfel.',
    'rotkohl-grob': 'Rotkohlsalat mit Walnüssen und Orange.',
    'rotkohl-fein': 'Feiner Krautsalat mit Essig und Öl.',
    'rotkohl-reibe': 'Für Kohl ist die feine Reibe zu fein. Besser: fein raspeln.',
    'kaese-duenn': 'Käsescheiben fürs Abendbrot, am besten aus festem Käse.',
    'kaese-dick': 'Dicke Käsescheiben zum Überbacken.',
    'kaese-grob': 'Geriebener Gouda für Auflauf und Pizza.',
    'kaese-fein': 'Feiner Käse für Pasta und Suppe.',
    'kaese-reibe': 'Frischer Parmesan über die Pasta.',
    'nuss-duenn': 'Für Nüsse passt die feine Reibe besser.',
    'nuss-dick': 'Für Nüsse passt die feine Reibe besser.',
    'nuss-grob': 'Grob geraspelte Nüsse für Müsli und Salat.',
    'nuss-fein': 'Fein geraspelte Nüsse für den Kuchenteig.',
    'nuss-reibe': 'Gemahlene Walnüsse für Kuchen und Plätzchen.'
  };
  const MAX_LAGEN = 6;
  const NS = 'http://www.w3.org/2000/svg';
  const STANDARD_SALAT = [{ z: 'gurke', e: 'duenn' }, { z: 'karotte', e: 'grob' }, { z: 'rotkohl', e: 'fein' }, { z: 'gurke', e: 'duenn' }];
  let schuessel = speicher.lesen('horta-schuessel', []);
  if (!Array.isArray(schuessel)) schuessel = [];
  schuessel = schuessel.filter((x) => x && ZUTATEN[x.z] && EINSATZ[x.e]).slice(0, MAX_LAGEN);

  // Eine Schicht in einer Schüssel; die höchste Schicht steht vorn im Code, die tieferen decken sie unten ab
  // Unebene Oberkante: in der Mitte gewölbt, mit kleinen festen Buckeln (gleiche Werte wie im Generator)
  const BUCKEL = [0, 3, -2, 4, -1, 3, 0, -3, 2];
  const lageOben = (i) => 548 - (i + 1) * 16 - 26;
  function lageKante(i) {
    const y0 = 548 - (i + 1) * 16, pkt = [];
    for (let k = 0, x = 24; x <= 276; k++, x += 31) { const t = (x - 150) / 126; pkt.push([x, y0 - 26 * (1 - t * t) - BUCKEL[(k + i) % 9]]); }
    let d = `M${pkt[0][0]} ${Math.round(pkt[0][1])}`;
    for (let k = 1; k < pkt.length; k++) {
      const [x1, y1] = pkt[k - 1], [x2, y2] = pkt[k];
      d += ` Q${Math.round(x1 + 15.5)} ${Math.round((y1 + y2) / 2 - 3)} ${x2} ${Math.round(y2)}`;
    }
    return d + ' L276 600 L24 600 Z';
  }
  function lageHtml(p, i, x) {
    const d = lageKante(i);
    return `<g class="lage" style="--n:${i}"><path d="${d}" fill="${ZUTATEN[x.z].lage}"/><path d="${d}" fill="url(#${p}-m-${EINSATZ[x.e].muster})"/></g>`;
  }
  function schaleFuellen(svg, liste) {
    const g = svg && $('.lagen', svg);
    if (!g) return;
    g.innerHTML = liste.map((x, i) => lageHtml(svg.dataset.p, i, x)).reverse().join('');
  }
  const namenListe = (liste) => {
    const namen = [...new Set(liste.map((x) => ZUTATEN[x.z].name))];
    return namen.length < 2 ? namen.join('') : `${namen.slice(0, -1).join(', ')} und ${namen[namen.length - 1]}`;
  };

  // Abschied: zeigt Ihren eigenen Salat, sobald Sie im Probierstand etwas geschnitten haben
  const salatSatz = $('[data-salat-satz]');
  const salatSatzStandard = salatSatz ? salatSatz.innerHTML : '';
  function abschiedSalat() {
    const schale = $('.abschied .schale');
    schaleFuellen(schale, schuessel.length ? schuessel : STANDARD_SALAT);
    if (!salatSatz) return;
    if (!schuessel.length) { salatSatz.innerHTML = salatSatzStandard; return; }
    salatSatz.textContent = '';
    salatSatz.append('Ihr Salat aus ');
    const b = document.createElement('b');
    b.textContent = namenListe(schuessel);
    salatSatz.append(b, ' ist geschnitten. Jetzt fehlt nur noch das Dressing.');
  }
  abschiedSalat();

  const probier = $('#probieren');
  if (probier) {
    const svg = $('.geraet', probier);
    const P = svg.dataset.p;
    const zutatEl = $('.zutat', svg), stopfer = $('.stopfer', svg), fallend = $('.fallend', svg);
    const knopf = $('[data-schneiden]', probier), leeren = $('[data-leeren]', probier);
    const tipp = $('[data-tipp]', probier), liste = $('[data-salat-liste]', probier);
    let laeuft = false;
    const wahl = () => ({ z: $('input[name="zutat"]:checked', probier).value, e: $('input[name="einsatz"]:checked', probier).value });

    function tippZeigen(text) {
      const { z, e } = wahl();
      tipp.textContent = '';
      if (text) { tipp.textContent = text; return; }
      const b = document.createElement('b');
      b.textContent = `${ZUTATEN[z].name}, ${EINSATZ[e].name}:`;
      tipp.append(b, ' ' + TIPPS[`${z}-${e}`]);
    }
    function listeZeigen() {
      liste.textContent = schuessel.length ? namenListe(schuessel) : 'noch nichts';
      leeren.hidden = !schuessel.length;
    }
    function zutatZeigen() {
      svg.style.setProperty('--zutat', ZUTATEN[wahl().z].farbe);
    }
    probier.addEventListener('change', () => { if (!laeuft) { zutatZeigen(); tippZeigen(); } });

    // Ein Stück fällt aus dem Auslass in die Schüssel
    function stueck(z, e, ziel) {
      const x0 = 132 + Math.random() * 40, y0 = 412;
      const x1 = klemmen(x0 + (Math.random() - 0.5) * 120, 56, 244), y1 = ziel + Math.random() * 12;
      let el;
      if (EINSATZ[e].muster === 'scheibe') {
        el = document.createElementNS(NS, 'ellipse');
        el.setAttribute('rx', e === 'dick' ? 9 : 8);
        el.setAttribute('ry', e === 'dick' ? 4 : 2.2);
        el.setAttribute('fill', z === 'gurke' ? ZUTATEN[z].innen : ZUTATEN[z].farbe);
        el.setAttribute('stroke', ZUTATEN[z].farbe);
        el.setAttribute('stroke-width', z === 'gurke' ? 1.6 : 0);
      } else if (EINSATZ[e].muster === 'streifen') {
        el = document.createElementNS(NS, 'path');
        const l = e === 'grob' ? 16 : 11;
        el.setAttribute('d', `M${-l / 2} 0 Q0 ${-3 + Math.random() * 6} ${l / 2} 0`);
        el.setAttribute('fill', 'none');
        el.setAttribute('stroke', Math.random() < 0.3 ? ZUTATEN[z].innen : ZUTATEN[z].farbe);
        el.setAttribute('stroke-width', e === 'grob' ? 3 : 1.8);
        el.setAttribute('stroke-linecap', 'round');
      } else {
        el = document.createElementNS(NS, 'circle');
        el.setAttribute('r', (1.4 + Math.random()).toFixed(1));
        el.setAttribute('fill', Math.random() < 0.3 ? ZUTATEN[z].innen : ZUTATEN[z].farbe);
      }
      el.setAttribute('class', 'stueck');
      fallend.appendChild(el);
      const dreh = (Math.random() - 0.5) * 540;
      const a = el.animate([
        { transform: `translate(${x0}px, ${y0}px) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${x1}px, ${y1}px) rotate(${dreh}deg)`, opacity: 1, offset: 0.92 },
        { transform: `translate(${x1}px, ${y1 + 2}px) rotate(${dreh}deg)`, opacity: 0 }
      ], { duration: 560 + Math.random() * 260, easing: 'cubic-bezier(0.45, 0, 0.9, 0.6)' });
      a.onfinish = () => el.remove();
    }

    async function schneiden() {
      if (laeuft) return;
      const x = wahl();
      if (schuessel.length >= MAX_LAGEN) { tippZeigen('Die Schüssel ist voll. Zeit für das Dressing. Mit „Schüssel leeren“ fangen Sie neu an.'); return; }
      laeuft = true;
      knopf.disabled = true;
      tippZeigen();
      const i = schuessel.length;
      $('.lagen', svg).insertAdjacentHTML('afterbegin', lageHtml(P, i, x));
      const lage = $('.lagen .lage', svg);
      if (!ruhig && svg.animate) {
        const dauer = 1900;
        svg.classList.add('laeuft');
        const unten = { duration: dauer, easing: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)', fill: 'forwards' };
        const az = zutatEl.animate([{ transform: 'translateY(0px)' }, { transform: 'translateY(172px)' }], unten);
        const as = stopfer.animate([{ transform: 'translateY(0px)' }, { transform: 'translateY(156px)' }], unten);
        lage.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: dauer - 300, delay: 450, easing: 'cubic-bezier(0.33, 0, 0.3, 1)', fill: 'backwards' });
        const ziel = lageOben(i) + 6;
        const uhren = [];
        for (let n = 0; n < 30; n++) uhren.push(setTimeout(() => stueck(x.z, x.e, ziel), 260 + n * 52 + Math.random() * 30));
        await az.finished;
        svg.classList.remove('laeuft');
        // Stopfer fährt zurück, ein neues Stück liegt im Schacht
        as.cancel();
        stopfer.animate([{ transform: 'translateY(156px)' }, { transform: 'translateY(0px)' }], { duration: 320, easing: KURVE });
        az.cancel();
        zutatEl.animate([{ opacity: 0, transform: 'translateY(-14px)' }, { opacity: 1, transform: 'none' }], { duration: 380, delay: 120, easing: KURVE, fill: 'backwards' });
      }
      schuessel.push(x);
      speicher.schreiben('horta-schuessel', schuessel);
      listeZeigen();
      abschiedSalat();
      knopf.disabled = false;
      laeuft = false;
    }
    knopf.addEventListener('click', schneiden);
    const obenKnopf = $('[data-knopf-oben]', svg);
    if (obenKnopf) obenKnopf.addEventListener('click', schneiden);
    leeren.addEventListener('click', () => {
      if (laeuft) return;
      schuessel = [];
      speicher.loeschen('horta-schuessel');
      const lagen = $$('.lagen .lage', svg);
      if (!ruhig && lagen.length && lagen[0].animate) {
        lagen.forEach((l) => l.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: KURVE, fill: 'forwards' }).finished.then(() => l.remove()));
      } else lagen.forEach((l) => l.remove());
      listeZeigen();
      tippZeigen();
      abschiedSalat();
      knopf.focus();
    });
    schaleFuellen(svg, schuessel);
    zutatZeigen();
    tippZeigen();
    listeZeigen();
  }

  /* ---------- Begrüßung passend zur Tageszeit ---------- */
  const gruss = $('[data-gruss]');
  if (gruss) {
    const h = new Date().getHours();
    let text = h >= 5 && h < 11 ? 'Guten Morgen. Hier ist HORTA.' : h >= 11 && h < 17 ? 'Guten Tag. Hier ist HORTA.' : h >= 17 && h < 23 ? 'Guten Abend. Hier ist HORTA.' : 'Noch wach? Hier ist HORTA.';
    if (schuessel.length) text = 'Schön, dass Sie wieder da sind.';
    else if (korbAnzahl() > 0) text = 'Willkommen zurück.';
    gruss.textContent = text;
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
        k.style.filter = f > 0.001 ? `brightness(${(1 - 0.12 * f).toFixed(3)})` : '';
      });
    };
    const stapelPlanen = () => { if (!stapelWartet) { stapelWartet = true; requestAnimationFrame(stapelBild); } };
    addEventListener('scroll', stapelPlanen, { passive: true });
    addEventListener('resize', stapelPlanen);
    stapelBild();
  }

  /* ---------- Die fünf Einsätze zum Antippen ---------- */
  const EINSATZ_INFO = {
    duenn: ['Dünne Scheiben', 'Für Gurkensalat, Radieschen und Kartoffelchips aus dem Ofen.', 'Gurke, Radieschen, Kartoffel'],
    dick: ['Dicke Scheiben', 'Für Gratin, Bratkartoffeln und Gemüse aus der Pfanne.', 'Kartoffel, Zucchini, Karotte'],
    grob: ['Grob raspeln', 'Für Möhrensalat, Rösti und geriebenen Gouda.', 'Karotte, Kartoffel, Gouda'],
    fein: ['Fein raspeln', 'Für Krautsalat, Rotkohl und Rohkost für Kinder.', 'Weißkohl, Rotkohl, Karotte'],
    reibe: ['Feine Reibe', 'Für Parmesan, Nüsse und Schokolade.', 'Parmesan, Walnüsse, Schokolade']
  };
  const leiste = $('.einsatz-leiste');
  if (leiste) {
    const erkl = $('.einsatz__erklaerung');
    $$('[data-einsatz]', leiste).forEach((b) => b.addEventListener('click', () => {
      $$('[data-einsatz]', leiste).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const [name, text, passt] = EINSATZ_INFO[b.dataset.einsatz];
      $('[data-einsatz-name]', erkl).textContent = name;
      $('[data-einsatz-text]', erkl).textContent = text;
      $('[data-einsatz-passt]', erkl).textContent = passt;
      erkl.classList.remove('wechsel'); void erkl.offsetWidth; erkl.classList.add('wechsel');
    }));
  }

  /* ---------- Vom Markt bis auf den Teller ---------- */
  const teile = $$('.schritt');
  function oeffnen(t) {
    teile.forEach((x) => { x.classList.toggle('ist-offen', x === t); x.setAttribute('aria-expanded', String(x === t)); });
  }
  teile.forEach((t) => {
    t.addEventListener('click', () => oeffnen(t));
    t.addEventListener('focus', () => oeffnen(t));
    if (feinZeiger) {
      // Erst nach kurzem Verweilen öffnen, damit Durchziehen der Maus nichts aufklappt
      let warte;
      t.addEventListener('mouseenter', () => { clearTimeout(warte); warte = setTimeout(() => oeffnen(t), 120); });
      t.addEventListener('mouseleave', () => clearTimeout(warte));
    }
  });

  // Betrag nur bei Änderung setzen und dann kurz weich aufblenden
  function weichSetzen(el, text) {
    if (el.textContent === text) return;
    const vorher = el.textContent;
    el.textContent = text;
    if (vorher && el.animate) el.animate(ruhig ? [{ opacity: 0.4 }, { opacity: 1 }] : [{ opacity: 0.3, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 150, easing: KURVE });
  }

  // Neue Meldungen unter Formularen sanft einblenden, Fehler mit kurzem Zucken
  $$('.meldung').forEach((m) => new MutationObserver(() => {
    if (!m.textContent.trim() || !m.animate) return;
    m.animate(ruhig ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 180, easing: KURVE });
    if (!ruhig && m.classList.contains('fehler')) m.animate([{ translate: '0' }, { translate: '-3px' }, { translate: '3px' }, { translate: '-3px' }, { translate: '3px' }, { translate: '0' }], { duration: 240, easing: 'ease-in-out' });
  }).observe(m, { childList: true, characterData: true, subtree: true }));

  /* ---------- Formulare an PHP schicken ---------- */
  async function senden(form, ziel) {
    const meldung = $('.meldung', form);
    const knopf = $('button[type="submit"]', form);
    meldung.className = 'meldung';
    meldung.textContent = '';
    knopf.disabled = true;
    const knopfText = knopf.textContent;
    const sendeUhr = setTimeout(() => { knopf.classList.add('sendet'); knopf.setAttribute('aria-busy', 'true'); knopf.textContent = 'Wird gesendet'; }, 150);
    try {
      const antwort = await fetch(ziel, { method: 'POST', body: new FormData(form), headers: { 'X-Requested-With': 'fetch' } });
      const daten = await antwort.json();
      return daten;
    } catch {
      meldung.classList.add('fehler');
      meldung.textContent = 'Das klappt erst, wenn die Seite online auf einem Server mit PHP liegt.';
      return null;
    } finally {
      clearTimeout(sendeUhr);
      if (knopf.classList.contains('sendet')) { knopf.classList.remove('sendet'); knopf.removeAttribute('aria-busy'); knopf.textContent = knopfText; }
      knopf.disabled = false;
    }
  }

  /* ---------- 3D: Karten kippen mit dem Zeiger ---------- */
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

  /* ---------- 3D-Gerät: ziehen, mit Schwung loslassen, Pfeiltasten, beim Laden hereindrehen ---------- */
  $$('[data-dreh]').forEach((g3d) => {
    const objekt = $('.g3d__objekt', g3d);
    const mantel = $$('.g3d__mantel', g3d).map((el) => ({ el, k: Number(el.style.getPropertyValue('--k')) }));
    const kegel = $$('.g3d__kegel', g3d).map((el) => ({ el, k: Number(el.style.getPropertyValue('--k')) }));
    const START = -30;
    let winkel = START, tempo = 0, zieht = false, letztesX = 0, proben = [], sichtbar = false, zuletzt = performance.now();
    // Beim ersten Laden dreht sich das Gerät von der Seite herein und kommt vorn zur Ruhe
    let intro = !ruhig && !!g3d.closest('[data-intro]');
    const introStart = performance.now() + 250;
    if (intro) winkel = START - 150;
    const EIGEN = ruhig ? 0 : 7; // Grad pro Sekunde, langsames Eigendrehen
    const rad = Math.PI / 180;
    function zeichnen() {
      objekt.style.transform = `rotateX(-16deg) rotateY(${winkel.toFixed(2)}deg)`;
      // Edelstahl: matte Grundhelligkeit, ein schmaler Glanzstreifen von links vorn, schwaches Randlicht rechts
      mantel.forEach((f) => {
        const a = (winkel + f.k * 22.5) * rad;
        const glanz = Math.pow(Math.max(0, Math.cos(a + 0.35)), 26);
        const rand = Math.pow(Math.max(0, Math.cos(a - 1.25)), 6);
        f.el.style.setProperty('--hell', (0.52 + 0.4 * Math.max(0, Math.cos(a)) + 0.6 * glanz + 0.15 * rand).toFixed(3));
      });
      kegel.forEach((f) => {
        const t = f.k * 45 * rad;
        const vorn = Math.cos(t) * Math.cos(winkel * rad), oben = Math.sin(t);
        f.el.style.setProperty('--hell', (0.55 + 0.4 * Math.max(0, vorn) + 0.3 * Math.max(0, oben)).toFixed(3));
      });
    }
    function schritt(jetzt) {
      const dt = Math.min(0.05, (jetzt - zuletzt) / 1000);
      zuletzt = jetzt;
      if (intro && !zieht) {
        const t = klemmen((jetzt - introStart) / 1800);
        winkel = START - 150 * Math.pow(1 - t, 3);
        if (t >= 1) intro = false;
        zeichnen();
      } else if (!zieht) {
        tempo *= Math.pow(0.04, dt); // Schwung klingt weich aus
        winkel += (tempo + EIGEN) * dt;
        zeichnen();
      }
      if (sichtbar && !document.hidden) requestAnimationFrame(schritt);
    }
    function starten() { zuletzt = performance.now(); requestAnimationFrame(schritt); }
    // Das Gerät ist ein Drehobjekt, kein Text: nichts markieren, nichts herausziehen
    g3d.addEventListener('dragstart', (e) => e.preventDefault());
    g3d.addEventListener('selectstart', (e) => e.preventDefault());
    g3d.addEventListener('pointerdown', (e) => {
      if (zieht || (e.pointerType === 'mouse' && e.button !== 0)) return;
      e.preventDefault();
      const auswahl = window.getSelection && window.getSelection();
      if (auswahl && !auswahl.isCollapsed) auswahl.removeAllRanges();
      if (document.activeElement !== g3d && g3d.tabIndex >= 0) g3d.focus({ preventScroll: true });
      intro = false;
      zieht = true; tempo = 0; letztesX = e.clientX; proben = [{ x: e.clientX, t: e.timeStamp }];
      g3d.setPointerCapture(e.pointerId); g3d.classList.add('zieht');
    });
    g3d.addEventListener('pointermove', (e) => {
      if (!zieht) return;
      winkel += (e.clientX - letztesX) * 0.55;
      letztesX = e.clientX;
      proben.push({ x: e.clientX, t: e.timeStamp });
      proben = proben.filter((p) => e.timeStamp - p.t < 100);
      zeichnen();
    });
    const loslassen = () => {
      if (!zieht) return;
      zieht = false; g3d.classList.remove('zieht');
      const a = proben[0], b = proben[proben.length - 1];
      if (a && b && b.t > a.t) tempo = ((b.x - a.x) / (b.t - a.t)) * 1000 * 0.55; // Fingertempo wird zum Drehschwung
      tempo = klemmen(tempo, -900, 900);
      if (sichtbar) starten();
    };
    g3d.addEventListener('pointerup', loslassen);
    g3d.addEventListener('pointercancel', loslassen);
    g3d.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); intro = false; winkel += e.key === 'ArrowLeft' ? -20 : 20; zeichnen(); }
    });
    zeichnen();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((ein) => {
        const vorher = sichtbar;
        sichtbar = ein[0].isIntersecting;
        if (sichtbar && !vorher) starten();
      }).observe(g3d);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden && sichtbar) starten(); });
  });

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
    const geklickt = speicher.lesen('horta-hilfreich', []);
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
    $('[data-rez="sterne"]').setAttribute('role', 'img');
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
      // Sichtbarer Text und vorgelesener Name stimmen überein: "5 Sterne 24", gedrückt = Filter aktiv
      li.innerHTML = `<button type="button" aria-pressed="false"><span>${n} <span aria-hidden="true">★</span><span class="sr">Sterne</span></span><span class="spur" aria-hidden="true"><i style="--a:${alle.length ? (anzahl / alle.length).toFixed(3) : 0}"></i></span><span class="wert">${anzahl}</span></button>`;
      const b = $('button', li);
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
        li.innerHTML = `<div class="rez__kopf"><span class="sterne" role="img" aria-label="${x.sterne} von 5 Sternen">${sterneHtml(x.sterne)}</span><span class="rez__datum"></span></div>
          <h3 class="rez__titel"></h3><p class="rez__text"></p>
          ${x.antwort ? '<div class="rez__antwort"><b>Antwort von HORTA</b><p></p></div>' : ''}
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
          speicher.schreiben('horta-hilfreich', geklickt);
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

    // Zitat-Karussell: hebt die hilfreichsten Bewertungen hervor, bedient mit Pfeilen oder Pfeiltasten
    const zitate = $('[data-zitate]');
    if (zitate) {
      const auswahl = alle.filter((r) => r.sterne >= 4).sort((a, b) => b.hilfreich - a.hilfreich).slice(0, 5);
      const buehne = $('.zitate__buehne', zitate), koepfe = $('.zitate__koepfe', zitate), zaehler = $('.zitate__zahl', zitate);
      let jetzt = 0;
      koepfe.innerHTML = auswahl.map((r) => `<span>${(r.name || '?').trim().charAt(0).toUpperCase()}</span>`).join('');
      function zeigen(richtung) {
        const r = auswahl[jetzt];
        if (!r) { zitate.hidden = true; return; }
        const fig = document.createElement('figure');
        fig.className = 'zitat';
        fig.innerHTML = `<blockquote></blockquote><figcaption><span class="sterne" role="img" aria-label="${r.sterne} von 5 Sternen">${sterneHtml(r.sterne)}</span><span class="zitat__name"></span><span class="marke-klein ${r.beispiel ? 'marke-klein--beispiel">Beispiel' : 'marke-klein--echt">Geprüfter Kauf'}</span></figcaption>`;
        $('blockquote', fig).textContent = r.text;
        $('.zitat__name', fig).textContent = r.name;
        buehne.replaceChildren(fig);
        if (richtung && !ruhig && fig.animate) fig.animate([{ opacity: 0, transform: `translateX(${richtung * 18}px)` }, { opacity: 1, transform: 'none' }], { duration: 320, easing: KURVE });
        zaehler.textContent = `${jetzt + 1} / ${auswahl.length}`;
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
      const kurz = [];
      ['einzeln', 'set'].forEach((id) => {
        if (!korb[id]) return;
        const z = document.createElement('div');
        z.className = 'zeile';
        z.innerHTML = '<span></span><span></span>';
        z.firstChild.textContent = `${korb[id]} × ${PRODUKTE[id].name}`;
        z.lastChild.textContent = euro(korb[id] * preis(id));
        liste.appendChild(z);
        kurz.push(`${korb[id]} × ${id === 'set' ? '2er-Set ' : ''}HORTA Gemüseschneider HT-5`);
      });
      // Unmittelbar über dem Bestellknopf: Ware mit ihren wichtigsten Eigenschaften
      $('[data-feld="bestell-kurz"]', kasse).textContent = `Sie bestellen: ${kurz.join(', ')}. Elektrischer Gemüseschneider, 800 W laut Hersteller, 5 Einsätze aus Edelstahl, Euro-Stecker.`;
      const waren = korbSumme();
      const nachlass = rabatt ? Math.round(waren * 0.1) : 0;
      const versand = versandFuer(waren - nachlass);
      const gesamt = waren - nachlass + versand;
      $('[data-feld="rabatt-zeile"]', seite).hidden = !rabatt;
      $('[data-feld="rabatt"]', seite).textContent = '− ' + euro(nachlass);
      $('[data-feld="versand"]', seite).textContent = versand ? euro(versand) : 'kostenlos';
      weichSetzen($('[data-feld="gesamt"]', seite), euro(gesamt));
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
        speicher.schreiben('horta-korb', korb);
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
    if (/^HT-[0-9A-Z-]{6,30}$/.test(nr)) nrFeld.textContent = nr; else nrFeld.parentElement.hidden = true;
    korb = { einzeln: 0, set: 0 };
    speicher.schreiben('horta-korb', korb);
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
