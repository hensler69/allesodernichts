/* DÄMMER: Bedienung, Warenkorb, Himmel und Kasse. Reines JavaScript ohne Bibliotheken. */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemmen = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* ---------- Preise (der Server rechnet in bestellung.php noch einmal selbst) ---------- */
  const EINFUEHRUNG_BIS = Date.UTC(2026, 10, 30, 22, 59, 59); // 30.11.2026, 23:59:59 Uhr deutscher Zeit
  const einfuehrung = Date.now() <= EINFUEHRUNG_BIS;
  const PRODUKTE = {
    einzeln: { name: 'DÄMMER Eins', info: 'Lichtwecker, 1 Stück', einf: 4990, normal: 5990 },
    set: { name: 'DÄMMER Eins, 2er-Set', info: '2 Lichtwecker, versandkostenfrei', einf: 8480, normal: 10180 }
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
  let korb = speicher.lesen('daemmer-korb', { einzeln: 0, set: 0 });
  if (typeof korb !== 'object' || korb === null) korb = { einzeln: 0, set: 0 };
  ['einzeln', 'set'].forEach((k) => { korb[k] = klemmen(parseInt(korb[k], 10) || 0, 0, MAX_MENGE); });

  const korbSumme = () => korb.einzeln * preis('einzeln') + korb.set * preis('set');
  const korbAnzahl = () => korb.einzeln + korb.set;
  const versandFuer = (warenwert) => (warenwert === 0 || warenwert >= GRATIS_AB ? 0 : VERSAND);

  function korbSpeichern() {
    speicher.schreiben('daemmer-korb', korb);
    korbZeigen();
    document.dispatchEvent(new CustomEvent('korb-geaendert'));
  }

  const dialog = $('#korb');
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
      li.addEventListener('click', (e) => {
        const s = e.target.closest('[data-schritt]');
        if (s) { korb[id] = klemmen(korb[id] + Number(s.dataset.schritt), 0, MAX_MENGE); korbSpeichern(); }
        if (e.target.closest('.entfernen')) { korb[id] = 0; korbSpeichern(); }
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
    $('[data-feld="angebot-summe"]', angebot).textContent = euro(menge * preis(id));
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
  const heldZeit = $('.held .lampe .zeit');
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
    [0, '#04060e', '#0a0d1c', '#14132a'],
    [0.3, '#090b20', '#22193c', '#3e2140'],
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
  const simZeit = aufgang && $('.lampe .zeit', aufgang);
  const simSonne = aufgang && $('.lampe .symbol--licht', aufgang);
  const simPhasen = aufgang ? $$('.phasen li', aufgang) : [];
  const regler = aufgang && $('#zeitregler');
  const wortweise = $('.wortweise');
  const kaufleiste = $('.kaufleiste');
  const heldKnopf = $('.held [data-hinzu]');
  const angebotTeil = $('#angebot');
  let sonne = 0;

  function aufgangFortschritt() {
    if (!aufgang) return { q: 0, r: null };
    const r = aufgang.getBoundingClientRect();
    const weg = Math.max(1, r.height - innerHeight);
    return { q: klemmen(-r.top / weg), r };
  }

  function bild() {
    const y = scrollY;
    const hoehe = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = klemmen(y / hoehe);
    const a = aufgangFortschritt();

    // Sonnenstand für die ganze Seite: vor dem Aufgang Nacht, darin Aufgang, danach leichte Dämmerung
    let s;
    if (!aufgang) s = 0.12 + p * 0.5;
    else {
      const start = a.r.top + y, ende = start + aufgang.offsetHeight - innerHeight;
      if (y < start) s = 0.04 + 0.12 * klemmen(y / Math.max(1, start));
      else if (y <= ende) s = 0.16 + 0.84 * a.q;
      else s = 1 - 0.3 * klemmen((y - ende) / Math.max(1, hoehe - ende));
    }
    sonne = s;
    root.style.setProperty('--sky1', verlauf(HIMMEL, s, 1));
    root.style.setProperty('--sky2', verlauf(HIMMEL, s, 2));
    root.style.setProperty('--sky3', verlauf(HIMMEL, s, 3));
    root.style.setProperty('--sun', s.toFixed(3));

    // Stadt sinkt langsam, je weiter man scrollt: man steigt der Sonne entgegen
    if (!ruhig) stadt.forEach((el, i) => { el.style.transform = `translate3d(0, ${(p * [3, 7, 12][i]).toFixed(2)}vh, 0)`; });

    // Sonnenaufgang im angehefteten Abschnitt
    if (aufgang && aufgangKlebt) {
      const q = a.q;
      aufgangKlebt.style.setProperty('--lamp', verlauf(LAMPE, q, 1));
      aufgangKlebt.style.setProperty('--glow', (0.06 + 0.94 * klemmen(q / 0.6)).toFixed(3));
      aufgangKlebt.style.setProperty('--p', q.toFixed(3));
      const min = Math.round(q * 30);
      const t = `06:${String(min).padStart(2, '0')}`;
      if (simUhr.textContent !== t) {
        simUhr.textContent = t;
        if (simZeit) simZeit.textContent = t;
        if (regler && document.activeElement !== regler) regler.value = String(min);
        regler && regler.setAttribute('aria-valuetext', `${t} Uhr`);
      }
      const phase = q < 0.33 ? 0 : q < 0.66 ? 1 : q < 0.97 ? 2 : 3;
      simPhasen.forEach((li, i) => li.classList.toggle('ist-jetzt', i === phase));
      if (simSonne) simSonne.classList.toggle('ist-an', q > 0.02);
    }

    // Geschichte: Wort für Wort heller
    if (wortweise && !ruhig) {
      const r = wortweise.getBoundingClientRect();
      const anteil = klemmen((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35));
      const woerter = wortweise._w || (wortweise._w = $$('.w', wortweise));
      const n = Math.round(anteil * woerter.length);
      woerter.forEach((w, i) => w.classList.toggle('an', i < n));
    }

    // Kaufleiste am Handy: nur wenn der Knopf oben weg ist und das Angebot nicht zu sehen ist
    if (kaufleiste && heldKnopf) {
      const hk = heldKnopf.getBoundingClientRect();
      const an = angebotTeil ? angebotTeil.getBoundingClientRect() : null;
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

  // Zeitregler: spult den Sonnenaufgang vor, indem er an die passende Stelle scrollt
  if (regler && aufgang) {
    regler.addEventListener('input', () => {
      const weg = aufgang.offsetHeight - innerHeight;
      const oben = aufgang.getBoundingClientRect().top + scrollY;
      window.scrollTo({ top: oben + (Number(regler.value) / 30) * weg, behavior: 'instant' });
    });
  }

  let wartet = false;
  const planen = () => { if (!wartet) { wartet = true; requestAnimationFrame(() => { wartet = false; bild(); }); } };
  addEventListener('scroll', planen, { passive: true });
  addEventListener('resize', planen);
  bild();

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
      const anzahl = Math.min(240, Math.round((b * h) / 7000));
      tropfen = Array.from({ length: anzahl }, () => neu(true));
    }
    function neu(irgendwo) {
      const tiefe = Math.random();
      return { x: Math.random() * (b + 200) - 100, y: irgendwo ? Math.random() * h : -30, l: 8 + tiefe * 18, v: 7 + tiefe * 11, a: 0.05 + tiefe * 0.16 };
    }
    function malen(bewegen) {
      ctx.clearRect(0, 0, b, h);
      const staerke = 1 - sonne * 0.6;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      for (const t of tropfen) {
        if (bewegen) { t.y += t.v; t.x += t.v * 0.16; if (t.y > h + 20) Object.assign(t, neu(false)); }
        ctx.strokeStyle = `rgba(178,196,235,${(t.a * staerke).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(t.x - t.l * 0.16, t.y - t.l); ctx.stroke();
      }
    }
    groesse();
    addEventListener('resize', groesse);
    if (ruhig) malen(false);
    else {
      const schleife = () => { if (!document.hidden) malen(true); requestAnimationFrame(schleife); };
      requestAnimationFrame(schleife);
    }
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
    if (fein) t.addEventListener('mouseenter', () => oeffnen(t));
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
        speicher.schreiben('daemmer-korb', korb);
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
    if (/^DM-[0-9A-Z-]{6,30}$/.test(nr)) nrFeld.textContent = nr; else nrFeld.parentElement.hidden = true;
    korb = { einzeln: 0, set: 0 };
    speicher.schreiben('daemmer-korb', korb);
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
