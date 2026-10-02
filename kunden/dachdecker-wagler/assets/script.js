// Einfaches JavaScript, kein Framework. Alles hier ist Zusatz: Ohne JavaScript bleibt die Seite les- und nutzbar.

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  // ---------- Sanftes Einblenden beim Scrollen ----------
  var reveals = $$(".reveal");
  if (reveals.length) {
    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  // ---------- Scroll: Fortschrittsbalken, Kopfzeile, Parallaxe, Ablauf ----------
  var header = $(".site-header");
  var progressBar = $(".progress");
  var hero = $(".hero");
  var steps = $(".steps");
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset;
    var vh = window.innerHeight;
    if (header) header.classList.toggle("is-scrolled", y > 10);
    if (progressBar) {
      var max = document.documentElement.scrollHeight - vh;
      progressBar.style.setProperty("--progress", max > 0 ? clamp(y / max, 0, 1).toFixed(4) : 0);
    }
    if (hero && !reduceMotion) hero.style.setProperty("--sy", clamp(y / (hero.offsetHeight + 200), 0, 1).toFixed(4));
    if (steps) {
      var r = steps.getBoundingClientRect();
      steps.style.setProperty("--p", clamp((vh * 0.72 - r.top) / r.height, 0, 1).toFixed(4));
      $$(".step", steps).forEach(function (s) {
        s.classList.toggle("is-active", s.getBoundingClientRect().top < vh * 0.74);
      });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // ---------- Tiefe: 3D-Neigung und Glanz folgen der Maus ----------
  if (finePointer && !reduceMotion) {
    $$("[data-tilt]").forEach(function (el) {
      var max = parseFloat(el.getAttribute("data-tilt")) || 6;
      var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
      function frame() {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
        el.style.setProperty("--rx", (-cy * max).toFixed(2) + "deg");
        el.style.setProperty("--ry", (cx * max).toFixed(2) + "deg");
        el.style.setProperty("--mx", cx.toFixed(3));
        el.style.setProperty("--my", cy.toFixed(3));
        if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) {
          window.requestAnimationFrame(frame);
        } else { running = false; }
      }
      function run() { if (!running) { running = true; window.requestAnimationFrame(frame); } }
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        tx = (px - 0.5) * 2; ty = (py - 0.5) * 2;
        el.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
        el.style.setProperty("--glow", "1");
        el.style.setProperty("--s", el.hasAttribute("data-lift") ? "1.015" : "1");
        run();
      });
      el.addEventListener("pointerleave", function () {
        tx = 0; ty = 0;
        el.style.setProperty("--glow", "0");
        el.style.setProperty("--s", "1");
        run();
      });
    });

    // Der Hauptknopf wird leicht vom Mauszeiger angezogen
    var magnets = $$("[data-magnet]");
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      magnets.forEach(function (b) {
        var r = b.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var near = Math.hypot(dx, dy) < Math.max(r.width, 160);
        b.style.transform = near ? "translate(" + (dx * 0.14).toFixed(1) + "px," + (dy * 0.22).toFixed(1) + "px)" : "";
      });
    }, { passive: true });
  }

  // ---------- Hinweis-Meldung ----------
  var toastEl = $("#toast"), toastTimer = null;
  function toast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add("is-on");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toastEl.classList.remove("is-on"); }, 2200);
  }

  // ---------- Hell und dunkel umschalten ----------
  var modeBtn = $("#theme-toggle");
  var rootEl = document.documentElement;
  function syncMode() {
    var dark = rootEl.getAttribute("data-mode") === "dark";
    if (modeBtn) {
      modeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
      modeBtn.setAttribute("aria-label", dark ? "Helle Darstellung einschalten" : "Dunkle Darstellung einschalten");
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#101417" : "#efe3cf");
  }
  syncMode();
  if (modeBtn) modeBtn.addEventListener("click", function () {
    var dark = rootEl.getAttribute("data-mode") !== "dark";
    rootEl.classList.add("mode-switching");
    rootEl.setAttribute("data-mode", dark ? "dark" : "light");
    try { localStorage.setItem("mode", dark ? "dark" : "light"); } catch (e) {}
    syncMode();
    window.setTimeout(function () { rootEl.classList.remove("mode-switching"); }, 600);
  });

  // ---------- Menü zeigt den aktuellen Abschnitt ----------
  var navLinks = $$(".nav a[href^='#']");
  if (navLinks.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) { var s = document.getElementById(a.getAttribute("href").slice(1)); if (s) spy.observe(s); });
    var heroEl = $(".hero");
    if (heroEl) new IntersectionObserver(function (en) { if (en[0].isIntersecting) navLinks.forEach(function (a) { a.classList.remove("is-current"); }); }, { rootMargin: "-45% 0px -50% 0px" }).observe(heroEl);
  }

  // ---------- Nach oben ----------
  var toTop = $("#to-top");
  if (toTop) {
    window.addEventListener("scroll", function () { toTop.classList.toggle("is-on", window.pageYOffset > 900); }, { passive: true });
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  }

  // ---------- Kopfbereich: Licht folgt dem Mauszeiger ----------
  var heroEl2 = $(".hero");
  if (heroEl2 && finePointer && !reduceMotion) {
    heroEl2.addEventListener("pointermove", function (e) {
      var r = heroEl2.getBoundingClientRect();
      heroEl2.style.setProperty("--hx", (e.clientX - r.left) + "px");
      heroEl2.style.setProperty("--hy", (e.clientY - r.top) + "px");
      heroEl2.style.setProperty("--hglow", "1");
    });
    heroEl2.addEventListener("pointerleave", function () { heroEl2.style.setProperty("--hglow", "0"); });
  }

  // ---------- E-Mail-Adresse kopieren ----------
  var copyBtn = $("#copy-mail");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var addr = copyBtn.getAttribute("data-copy");
    var done = function () { toast("E-Mail-Adresse kopiert"); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(addr).then(done, function () { toast(addr); });
    else toast(addr);
  });

  // ---------- Formular vorbefüllen (von Check und Detail-Fenster) ----------
  var form = $("#kontaktformular");
  var lastAuto = "";
  function prefill(area, text) {
    if (!form) return;
    var select = $("#thema");
    if (select) {
      var has = $$("option", select).some(function (o) { return o.value === area; });
      select.value = has ? area : "Noch offen";
    }
    var msg = $("#nachricht");
    if (msg && (msg.value.trim() === "" || msg.value === lastAuto)) {
      msg.value = text;
      lastAuto = text;
    }
  }

  // ---------- Bedarfs-Check ----------
  var topics = [
    { id: "ziegel", label: "Lose oder kaputte Ziegel", icon: "i-roof", tone: "coral", area: "Reparatur",
      text: "Einzelne Ziegel lassen sich oft ersetzen. Wir sehen nach, ob es bei einer Reparatur bleibt." },
    { id: "feucht", label: "Feuchte Stellen unterm Dach", icon: "i-drop", tone: "emerald", area: "Reparatur",
      text: "Wasser sucht sich Wege. Wir suchen die Ursache, bevor der Schaden größer wird." },
    { id: "sturm", label: "Schaden nach dem Sturm", icon: "i-wind", tone: "coral", area: "Reparatur",
      text: "Wir sehen uns den Schaden an und sagen Ihnen, was zuerst zu tun ist." },
    { id: "alt", label: "Das Dach ist in die Jahre gekommen", icon: "i-clock", tone: "honey", area: "Dachsanierung",
      text: "Wir prüfen, ob eine Sanierung reicht oder eine neue Eindeckung sinnvoll ist." },
    { id: "neu", label: "Neues Dach geplant", icon: "i-house", tone: "coral", area: "Neueindeckung",
      text: "Von der Lattung bis zum letzten Ziegel: Wir besprechen, was für Ihr Haus passt." },
    { id: "flach", label: "Flachdach undicht", icon: "i-flat", tone: "emerald", area: "Flachdach",
      text: "Bei Flachdächern kommt es auf die Abdichtung an. Wir suchen die undichte Stelle." },
    { id: "fenster", label: "Mehr Licht unterm Dach", icon: "i-window", tone: "honey", area: "Dachfenster",
      text: "Ein Dachfenster bringt Tageslicht in den Dachraum. Wir beraten, was bei Ihrem Dach geht." }
  ];
  var chipsEl = $("#chips");
  var resultEl = $("#check-result");
  var goEl = $("#check-go");
  if (chipsEl && resultEl) {
    var selected = [];
    var svg = function (id) { return '<svg class="icon" aria-hidden="true"><use href="#' + id + '"/></svg>'; };
    topics.forEach(function (t) {
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip chip--" + t.tone;
      b.setAttribute("aria-pressed", "false");
      b.innerHTML = svg(t.icon) + "<span></span>";
      b.lastChild.textContent = t.label;
      b.addEventListener("click", function () {
        var i = selected.indexOf(t.id);
        if (i === -1) selected.push(t.id); else selected.splice(i, 1);
        b.setAttribute("aria-pressed", i === -1 ? "true" : "false");
        renderResult();
      });
      li.appendChild(b);
      chipsEl.appendChild(li);
    });

    function renderResult() {
      resultEl.innerHTML = "";
      var chosen = topics.filter(function (t) { return selected.indexOf(t.id) !== -1; });
      if (goEl) goEl.hidden = chosen.length === 0;
      var rb = $("#check-reset"); if (rb) rb.hidden = chosen.length === 0;
      if (!chosen.length) {
        var p = document.createElement("p");
        p.className = "check__hint";
        p.textContent = "Tippen Sie an, was auf Sie zutrifft. Sie sehen sofort, worüber wir sprechen würden.";
        resultEl.appendChild(p);
        return;
      }
      var ul = document.createElement("ul");
      ul.className = "result-list";
      chosen.forEach(function (t, i) {
        var li = document.createElement("li");
        li.className = "result";
        li.style.setProperty("--i", i);
        li.style.setProperty("--c", "var(--" + (t.tone === "emerald" ? "emerald" : t.tone) + ")");
        var h = document.createElement("h3"); h.textContent = t.label;
        var d = document.createElement("p"); d.textContent = t.text;
        var box = document.createElement("div"); box.appendChild(h); box.appendChild(d);
        li.appendChild(box);
        ul.appendChild(li);
      });
      resultEl.appendChild(ul);
    }
    renderResult();

    var resetBtn = $("#check-reset");
    if (resetBtn) resetBtn.addEventListener("click", function () {
      selected = [];
      $$(".chip", chipsEl).forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      renderResult();
    });
    var go = $("#check-cta");
    if (go) go.addEventListener("click", function () {
      var chosen = topics.filter(function (t) { return selected.indexOf(t.id) !== -1; });
      var areas = chosen.map(function (t) { return t.area; }).filter(function (a, i, arr) { return arr.indexOf(a) === i; });
      prefill(areas.length === 1 ? areas[0] : "Noch offen",
        "Hallo,\nich interessiere mich für folgende Themen: " + chosen.map(function (t) { return t.label; }).join(", ") + ".\n");
    });
  }

  // ---------- Detail-Fenster (Sheet) zu jeder Kachel ----------
  var sheetData = {
    neu: { tag: "Neueindeckung", tone: "coral", title: "Neueindeckung",
      intro: "Die alte Eindeckung kommt herunter, das Dach bekommt eine neue Haut aus Latten, Unterspannbahn und Ziegeln.",
      items: ["Alte Eindeckung abtragen", "Lattung prüfen und erneuern", "Unterspannbahn verlegen", "Neue Ziegel eindecken", "First, Grate und Anschlüsse"] },
    sanierung: { tag: "Dachsanierung", tone: "emerald", title: "Dachsanierung",
      intro: "Wir bessern aus, dämmen nach und erneuern, was nicht mehr hält, ohne gleich alles abzureißen.",
      items: ["Zustand des Daches aufnehmen", "Dämmung verbessern", "Unterdach erneuern", "Schadstellen ausbessern", "Anschlüsse abdichten"] },
    reparatur: { tag: "Reparatur", tone: "honey", title: "Reparatur",
      intro: "Lose Ziegel, undichte Stellen, Sturmschäden. Kleine Schäden werden schnell groß, wenn sie liegen bleiben.",
      items: ["Ziegel ersetzen", "Undichte Stellen suchen", "Sturmschäden sichern", "Anschlüsse nachdichten", "Moos und Bewuchs entfernen"] },
    flach: { tag: "Flachdach", tone: "coral", title: "Flachdach",
      intro: "Bei Flachdächern entscheiden die Details: Abdichtung, Gefälle und Anschlüsse.",
      items: ["Abdichtung prüfen", "Neue Dachbahnen verlegen", "Gefälle und Ablauf kontrollieren", "Randanschlüsse", "Kleine Schäden ausbessern"] },
    fenster: { tag: "Dachfenster", tone: "honey", title: "Dachfenster",
      intro: "Mehr Licht unterm Dach: Wir bauen Fenster ein oder tauschen alte aus.",
      items: ["Neues Dachfenster einbauen", "Altes Fenster austauschen", "Einbau und Anschluss abdichten", "Dach öffnen und wieder schließen"] }
  };
  var areaByTile = { neu: "Neueindeckung", sanierung: "Dachsanierung", reparatur: "Reparatur", flach: "Flachdach", fenster: "Dachfenster" };
  var sheet = $("#sheet");
  if (sheet && typeof sheet.showModal === "function") {
    var panel = $(".sheet__panel", sheet);
    var current = null;
    var closing = false;

    function fill(key) {
      var d = sheetData[key];
      current = key;
      var tag = $("#sheet-tag", sheet);
      tag.textContent = d.tag;
      tag.style.setProperty("--c", "var(--" + d.tone + ")");
      tag.style.setProperty("--t", d.tone === "honey" ? "var(--night)" : "#fff");
      $("#sheet-title", sheet).textContent = d.title;
      $("#sheet-intro", sheet).textContent = d.intro;
      var ul = $("#sheet-list", sheet);
      ul.innerHTML = "";
      d.items.forEach(function (text, i) {
        var li = document.createElement("li");
        li.style.setProperty("--i", i);
        li.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span></span>';
        li.lastChild.textContent = text;
        ul.appendChild(li);
      });
    }
    function openSheet(key) {
      if (sheet.open) return;
      fill(key);
      closing = false;
      panel.style.removeProperty("--drag");
      document.documentElement.classList.add("sheet-open");
      sheet.showModal();
      window.requestAnimationFrame(function () { window.requestAnimationFrame(function () { sheet.classList.add("is-open"); }); });
    }
    function closeSheet(after) {
      if (!sheet.open || closing) return;
      closing = true;
      sheet.classList.remove("is-open");
      window.setTimeout(function () {
        sheet.classList.remove("is-dragging");
        sheet.close();
        document.documentElement.classList.remove("sheet-open");
        closing = false;
        if (after) after();
      }, reduceMotion ? 0 : 380);
    }
    $$("[data-sheet]").forEach(function (btn) {
      btn.addEventListener("click", function () { openSheet(btn.getAttribute("data-sheet")); });
    });
    $(".sheet__close", sheet).addEventListener("click", function () { closeSheet(); });
    sheet.addEventListener("click", function (e) { if (e.target === sheet) closeSheet(); });
    sheet.addEventListener("cancel", function (e) { e.preventDefault(); closeSheet(); });
    $("#sheet-cta", sheet).addEventListener("click", function () {
      var d = sheetData[current];
      closeSheet(function () {
        prefill(areaByTile[current], "Hallo,\nich interessiere mich für: " + d.title + ".\n");
        var k = $("#kontakt");
        if (k) k.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      });
    });

    // Auf dem Handy: Fenster mit dem Finger nach unten wegziehen (folgt dem Finger 1:1)
    var drag = null;
    panel.addEventListener("pointerdown", function (e) {
      if (window.innerWidth >= 760 || e.target.closest("button, a")) return;
      if (e.clientY - panel.getBoundingClientRect().top > 110) return;
      drag = { y: e.clientY, last: e.clientY, t: performance.now(), v: 0, id: e.pointerId };
      panel.setPointerCapture(e.pointerId);
      sheet.classList.add("is-dragging");
    });
    panel.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dy = e.clientY - drag.y;
      var now = performance.now();
      drag.v = (e.clientY - drag.last) / Math.max(1, now - drag.t);
      drag.last = e.clientY; drag.t = now;
      var shown = dy > 0 ? dy : dy * 0.25 / (1 + Math.abs(dy) / 200);
      panel.style.setProperty("--drag", shown.toFixed(1) + "px");
    });
    function endDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dy = e.clientY - drag.y;
      var projected = dy + drag.v * 120; // Schwung beim Loslassen wird mitgerechnet
      drag = null;
      sheet.classList.remove("is-dragging");
      if (projected > 170) { closeSheet(); } else { panel.style.setProperty("--drag", "0px"); }
    }
    panel.addEventListener("pointerup", endDrag);
    panel.addEventListener("pointercancel", endDrag);
  } else {
    // Alter Browser ohne <dialog>: Kacheln führen direkt zum Formular
    $$("[data-sheet]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        prefill(areaByTile[btn.getAttribute("data-sheet")], "");
        var k = $("#kontakt"); if (k) k.scrollIntoView();
      });
    });
  }

  // ---------- Dachaufbau (interaktiv) ----------
  var layersSvg = $("#layers");
  if (layersSvg) {
    var layerData = [
      { n: "Dachziegel", c: "#c9482b", t: "Die Eindeckung", d: "Die Ziegel schützen vor Regen, Wind und Sonne. Hier zeigen sich Sturmschäden und Moos zuerst.", works: ["Reparatur", "Neueindeckung", "Dachsanierung"] },
      { n: "Lattung", c: "#c89a5a", t: "Lattung und Konterlattung", d: "Die Latten tragen die Ziegel und lassen Luft unter der Eindeckung zirkulieren.", works: ["Neueindeckung", "Dachsanierung"] },
      { n: "Unterspannbahn", c: "#6d8aa0", t: "Die zweite Schutzschicht", d: "Sie leitet Wasser ab, das trotzdem unter die Ziegel gelangt. Flachdächer haben stattdessen eine eigene Abdichtung.", works: ["Neueindeckung", "Dachsanierung", "Reparatur", "Flachdach"] },
      { n: "Sparren und Dämmung", c: "#d9a93a", t: "Das tragende Gerüst", d: "Die Sparren tragen das Dach. Dazwischen sitzt die Dämmung, die Wärme im Haus hält.", works: ["Dachsanierung", "Dachfenster"] },
      { n: "Dampfbremse", c: "#8d99a2", t: "Dampfbremse und Innenausbau", d: "Die Dampfbremse hält feuchte Raumluft aus der Dämmung fern. Innen schließt die Verkleidung den Raum ab.", works: ["Dachsanierung", "Dachfenster"] }
    ];
    var slabs = $$(".slab", layersSvg), ltabs = $$(".ltab"), panelEl = $("#roof-panel");
    var linkEl = $(".link", layersSvg), roofHint = $("#roof-hint");
    if (roofHint) roofHint.textContent = finePointer
      ? "Fahren Sie mit der Maus über eine Schicht. Dann sehen Sie, wofür sie da ist und welche Arbeiten dazugehören."
      : "Tippen Sie auf eine Schicht. Dann sehen Sie, wofür sie da ist und welche Arbeiten dazugehören.";
    function showLayer(i) {
      var d = layerData[i];
      slabs.forEach(function (s, k) { s.classList.toggle("is-active", k === i); s.setAttribute("aria-pressed", k === i ? "true" : "false"); });
      ltabs.forEach(function (t, k) { t.setAttribute("aria-pressed", k === i ? "true" : "false"); });
      layersSvg.classList.add("has-active");
      panelEl.innerHTML = "";
      var box = document.createElement("div"); box.className = "swap";
      var tag = document.createElement("span"); tag.className = "tag"; tag.textContent = "Schicht " + (i + 1) + " von 5";
      tag.style.setProperty("--c", d.c); tag.style.setProperty("--t", i === 0 || i === 2 || i === 4 ? "#fff" : "#14181c");
      var h = document.createElement("h3"); h.textContent = d.t;
      var p = document.createElement("p"); p.textContent = d.d;
      var sm = document.createElement("p"); sm.className = "small"; sm.textContent = "Dazu gehören diese Leistungen";
      var ul = document.createElement("ul"); ul.className = "works";
      d.works.forEach(function (w, k) {
        var li = document.createElement("li"), b = document.createElement("button");
        b.type = "button"; b.className = "work"; b.style.setProperty("--c", d.c); b.style.setProperty("--i", k);
        b.innerHTML = "<span></span><svg class=\"icon\" aria-hidden=\"true\"><use href=\"#i-arrow\"/></svg>"; b.firstChild.textContent = w;
        b.addEventListener("click", function () {
          prefill(w, "Hallo,\nich interessiere mich für: " + w + " (Schicht: " + d.n + ").\n");
          var kk = $("#kontakt"); if (kk) kk.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        });
        li.appendChild(b); ul.appendChild(li);
      });
      [tag, h, p, sm, ul].forEach(function (x) { box.appendChild(x); });
      panelEl.appendChild(box);
      if (linkEl) {
        var yc = 10 + i * 100 + 65 + 13 - 18;
        linkEl.setAttribute("d", "M580 " + yc + " C612 " + yc + " 612 70 640 70");
        linkEl.setAttribute("stroke", d.c);
        var len = Math.ceil(linkEl.getTotalLength()) + 2;
        linkEl.style.setProperty("--len", len);
        linkEl.classList.remove("is-on"); void linkEl.getBoundingClientRect(); linkEl.classList.add("is-on");
      }
    }
    slabs.forEach(function (s, i) {
      s.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") showLayer(i); });
      s.addEventListener("click", function () { showLayer(i); });
      s.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showLayer(i); } });
    });
    ltabs.forEach(function (t, i) { t.addEventListener("click", function () { showLayer(i); }); });
  }

  // ---------- Referenzen: Filter und Großansicht ----------
  var projs = $$(".proj");
  if (projs.length) {
    var fchips = $$(".filter .chip");
    fchips.forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-k");
        fchips.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        projs.forEach(function (p, n) {
          var hide = k !== "alle" && p.getAttribute("data-k") !== k;
          p.classList.toggle("is-hidden", hide);
          if (!hide) { p.style.animation = "none"; void p.offsetWidth; p.style.animation = ""; p.style.setProperty("--i", n % 6); }
        });
      });
    });
    var lb = $("#lightbox");
    if (lb && typeof lb.showModal === "function") {
      var lbImg = $("#lb-img"), lbT = $("#lb-t"), lbK = $("#lb-k"), pos = 0, lbClosing = false;
      var vis = function () { return projs.filter(function (p) { return !p.classList.contains("is-hidden"); }); };
      var fillLb = function (p) {
        var im = $("img", p); lbImg.src = im.getAttribute("src"); lbImg.alt = im.getAttribute("alt");
        lbT.textContent = p.getAttribute("data-t"); lbK.textContent = p.getAttribute("data-k") + " · Beispielprojekt, gezeichnet";
      };
      var step = function (d) { var l = vis(); pos = (pos + d + l.length) % l.length; fillLb(l[pos]); };
      var closeLb = function () {
        if (!lb.open || lbClosing) return; lbClosing = true; lb.classList.remove("is-open");
        window.setTimeout(function () { lb.close(); lbClosing = false; document.documentElement.classList.remove("sheet-open"); }, reduceMotion ? 0 : 320);
      };
      projs.forEach(function (p) {
        p.addEventListener("click", function () {
          var l = vis(); pos = l.indexOf(p); fillLb(p); lbClosing = false;
          document.documentElement.classList.add("sheet-open"); lb.showModal();
          window.requestAnimationFrame(function () { window.requestAnimationFrame(function () { lb.classList.add("is-open"); }); });
        });
      });
      $(".lb__prev", lb).addEventListener("click", function () { step(-1); });
      $(".lb__next", lb).addEventListener("click", function () { step(1); });
      $(".lb__close", lb).addEventListener("click", closeLb);
      lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
      lb.addEventListener("cancel", function (e) { e.preventDefault(); closeLb(); });
      lb.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });
    }
  }

  // ---------- Kontaktformular: Senden ohne Seitenwechsel ----------
  if (form) {
    var status = $("#form-status");
    var button = $("button[type=submit]", form);
    var show = function (text, ok) { status.textContent = text; status.className = "form__status " + (ok ? "is-ok" : "is-error"); };
    var msgEl = $("#nachricht"), countEl = $("#count");
    var updateCount = function () { if (msgEl && countEl) countEl.textContent = msgEl.value.length + " / 4000"; };
    if (msgEl) { msgEl.addEventListener("input", updateCount); updateCount(); }
    var check = function (el, errId, ok, text) {
      var err = $("#" + errId);
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (err) { err.hidden = ok; err.textContent = ok ? "" : text; }
      return ok;
    };
    var emailEl = $("#email"), nameEl = $("#name");
    if (emailEl) emailEl.addEventListener("blur", function () { if (emailEl.value) check(emailEl, "err-email", emailEl.checkValidity(), "Bitte prüfen Sie die E-Mail-Adresse."); });
    if (emailEl) emailEl.addEventListener("input", function () { if (emailEl.getAttribute("aria-invalid") === "true") check(emailEl, "err-email", emailEl.checkValidity(), "Bitte prüfen Sie die E-Mail-Adresse."); });
    if (nameEl) nameEl.addEventListener("blur", function () { if (nameEl.value.trim() === "" && nameEl.dataset.touched) check(nameEl, "err-name", false, "Bitte tragen Sie Ihren Namen ein."); else if (nameEl.value.trim() !== "") check(nameEl, "err-name", true, ""); });
    if (nameEl) nameEl.addEventListener("input", function () { nameEl.dataset.touched = "1"; });
    var burst = function () {
      var box = $(".confetti", form);
      if (!box || reduceMotion) return;
      box.innerHTML = "";
      var colors = ["#c9482b", "#d98a4a", "#3a4650", "#ecb98a", "#9c3220"];
      for (var n = 0; n < 34; n++) {
        var p = document.createElement("i");
        p.style.left = (Math.random() * 100).toFixed(1) + "%";
        p.style.background = colors[n % colors.length];
        p.style.setProperty("--x", ((Math.random() - 0.5) * 140).toFixed(0) + "px");
        p.style.setProperty("--r", ((Math.random() - 0.5) * 900).toFixed(0) + "deg");
        p.style.setProperty("--d", (Math.random() * 0.4).toFixed(2) + "s");
        box.appendChild(p);
      }
    };
    var again = $("#sent-again");
    if (again) again.addEventListener("click", function () { form.classList.remove("is-sent"); status.textContent = ""; });

    var param = new URLSearchParams(window.location.search).get("status");
    if (param === "ok") form.classList.add("is-sent");
    if (param === "fehler") show("Das hat leider nicht geklappt. Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.", false);
    if (param === "zuoft") show("Sie haben gerade schon Nachrichten gesendet. Bitte versuchen Sie es in ein paar Minuten noch einmal.", false);

    form.addEventListener("submit", function (event) {
      if (!window.fetch) return; // alter Browser: normales Absenden
      event.preventDefault();
      if (!form.checkValidity()) {
        if (emailEl && !emailEl.checkValidity()) check(emailEl, "err-email", false, "Bitte prüfen Sie die E-Mail-Adresse.");
        if (nameEl && nameEl.value.trim() === "") check(nameEl, "err-name", false, "Bitte tragen Sie Ihren Namen ein.");
        form.reportValidity(); return;
      }
      button.disabled = true;
      show("Wird gesendet …", true);
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { "X-Requested-With": "fetch", "Accept": "application/json" } })
        .then(function (res) { return res.json().then(function (data) { return { res: res, data: data }; }); })
        .then(function (r) {
          if (r.res.ok && r.data.ok) { status.textContent = ""; form.reset(); lastAuto = ""; updateCount(); form.classList.add("is-sent"); burst(); }
          else if (r.res.status === 429) { show("Sie haben gerade schon Nachrichten gesendet. Bitte versuchen Sie es in ein paar Minuten noch einmal.", false); }
          else { show(r.data.fehler || "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.", false); }
        })
        .catch(function () { show("Das hat leider nicht geklappt. Bitte versuchen Sie es später erneut oder schreiben Sie direkt per E-Mail.", false); })
        .then(function () { button.disabled = false; });
    });
  }
})();
