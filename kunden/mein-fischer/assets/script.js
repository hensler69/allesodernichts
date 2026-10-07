/* Mein Fischer seit 1832: Bewegung. Parallaxe nur über transform, gebündelt pro Bildschirmbild. */
(() => {
  'use strict';
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)');
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  /* ---------- Kopfzeile wird beim Scrollen zur Glasleiste ---------- */
  const kopf = document.querySelector('[data-kopf]');

  /* ---------- Hero-Video: Pause-Knopf, Rücksicht auf "weniger Bewegung" ---------- */
  const video = document.querySelector('[data-video]');
  const knopf = document.querySelector('[data-video-knopf]');
  function knopfZeigen() {
    if (!video || !knopf) return;
    const pausiert = video.paused;
    knopf.setAttribute('aria-pressed', String(pausiert));
    knopf.setAttribute('aria-label', pausiert ? 'Video abspielen' : 'Video anhalten');
  }
  if (video) {
    if (ruhig.matches) {
      video.removeAttribute('autoplay');
      video.pause();
    } else {
      const versuch = video.play();
      if (versuch && versuch.catch) versuch.catch(() => {}); // Autoplay verweigert: Standbild bleibt sichtbar
    }
    video.addEventListener('play', knopfZeigen);
    video.addEventListener('pause', knopfZeigen);
    knopfZeigen();
    knopf && knopf.addEventListener('click', () => {
      if (video.paused) video.play(); else video.pause();
    });
    // Video außerhalb des Bildes anhalten spart Akku, beim Zurückkommen weiter
    if ('IntersectionObserver' in window) {
      let vomNutzerPausiert = false;
      knopf && knopf.addEventListener('click', () => { vomNutzerPausiert = video.paused; });
      new IntersectionObserver(([e]) => {
        if (ruhig.matches || vomNutzerPausiert) return;
        if (e.isIntersecting) { const p = video.play(); p && p.catch && p.catch(() => {}); } else video.pause();
      }, { threshold: 0.05 }).observe(video);
    }
  }

  /* ---------- Erscheinen beim Scrollen ---------- */
  if ('IntersectionObserver' in window && !ruhig.matches) {
    const io = new IntersectionObserver((eintraege) => {
      eintraege.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('ist-da'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    $$('.zeigen').forEach((el) => io.observe(el));
  } else {
    $$('.zeigen').forEach((el) => el.classList.add('ist-da'));
  }

  /* ---------- Parallaxe in drei Tiefen ----------
     data-tiefe > 0: bewegt sich langsamer als die Seite (liegt hinten)
     data-tiefe < 0: bewegt sich etwas schneller (liegt vorn)
     Im Kopfbereich zählt der Scrollweg, sonst der Abstand zur Bildschirmmitte. */
  const ebenen = $$('[data-tiefe]').map((el) => ({
    el,
    tiefe: parseFloat(el.dataset.tiefe) || 0,
    imHeld: !!el.closest('.held'),
    sichtbar: true,
  }));
  const held = document.querySelector('.held');
  const inhalt = document.querySelector('.held__inhalt');
  let staerke = innerWidth < 760 ? 0.6 : 1; // am Handy sanfter
  let geplant = false;

  if ('IntersectionObserver' in window) {
    const sicht = new IntersectionObserver((eintraege) => {
      eintraege.forEach((e) => { const eb = ebenen.find((x) => x.el === e.target); if (eb) eb.sichtbar = e.isIntersecting; });
    }, { rootMargin: '25% 0px 25% 0px' });
    ebenen.forEach((eb) => sicht.observe(eb.el));
  }

  function bild() {
    geplant = false;
    const y = scrollY;
    if (ruhig.matches) { if (kopf) kopf.classList.toggle('ist-unten', y > 40); return; }
    const hoeheHeld = held ? held.offsetHeight : innerHeight;
    // Erst messen, dann schreiben
    const messungen = ebenen.map((eb) => {
      if (!eb.sichtbar) return null;
      if (eb.imHeld) return y < hoeheHeld * 1.2 ? y * eb.tiefe * staerke : null;
      const r = eb.el.parentElement.getBoundingClientRect();
      const mitte = r.top + r.height / 2 - innerHeight / 2;
      return -mitte * eb.tiefe * staerke;
    });
    if (kopf) kopf.classList.toggle('ist-unten', y > 40);
    ebenen.forEach((eb, n) => {
      const v = messungen[n];
      if (v === null) return;
      eb.el.style.transform = `translate3d(0, ${v.toFixed(1)}px, 0)`;
    });
    if (inhalt && y < hoeheHeld) inhalt.style.opacity = String(Math.max(0, 1 - y / (hoeheHeld * 0.75)).toFixed(3));
  }
  const planen = () => { if (!geplant) { geplant = true; requestAnimationFrame(bild); } };
  addEventListener('scroll', planen, { passive: true });
  addEventListener('resize', () => { staerke = innerWidth < 760 ? 0.6 : 1; planen(); });
  ruhig.addEventListener && ruhig.addEventListener('change', () => {
    if (ruhig.matches) ebenen.forEach((eb) => { eb.el.style.transform = ''; });
    planen();
  });
  bild();
})();
