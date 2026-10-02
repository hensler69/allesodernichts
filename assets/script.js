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
    if (meta) meta.setAttribute("content", dark ? "#150e0a" : "#f4e6cf");
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
    { id: "familie", label: "Familie absichern", icon: "i-family", tone: "emerald", area: "Vorsorge und Absicherung",
      text: "Was passiert, wenn Ihr Einkommen ausfällt? Ich zeige Ihnen, was Ihre Familie dann braucht." },
    { id: "alter", label: "Fürs Alter vorsorgen", icon: "i-clock", tone: "honey", area: "Vorsorge und Absicherung",
      text: "Wie viel bleibt im Alter übrig? Ich rechne zuerst die Lücke aus, bevor wir über Produkte sprechen." },
    { id: "wohnen", label: "Wohnung oder Haus", icon: "i-house", tone: "coral", area: "Haus, Auto und Alltag",
      text: "Hausrat, Haftpflicht und Gebäude. Ich prüfe, was im Schadenfall wirklich gedeckt ist." },
    { id: "auto", label: "Auto", icon: "i-car", tone: "emerald", area: "Haus, Auto und Alltag",
      text: "Kfz-Versicherung und Zubehör. Ich schaue, ob Leistung und Preis noch zu Ihnen passen." },
    { id: "selbst", label: "Ich bin selbstständig", icon: "i-brief", tone: "honey", area: "Beruf und Gewerbe",
      text: "Betriebshaftpflicht, Inhalt und Ausfall. Damit ein Schaden nicht gleich Ihre ganze Arbeit gefährdet." },
    { id: "pruefen", label: "Bestehende Verträge prüfen", icon: "i-doc", tone: "coral", area: "Noch offen",
      text: "Ich sehe durch, was Sie haben, und zeige Ihnen, wo Sie doppelt zahlen oder etwas fehlt." }
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
    vorsorge: { tag: "Vorsorge und Absicherung", tone: "emerald", title: "Vorsorge und Absicherung",
      intro: "Ich rechne zuerst, was bei Krankheit, Unfall oder im Alter fehlen würde. Danach entscheiden wir, was dazu passt.",
      items: ["Altersvorsorge und Rente", "Berufsunfähigkeit", "Absicherung der Familie", "Unfallschutz"] },
    alltag: { tag: "Haus, Auto und Alltag", tone: "coral", title: "Haus, Auto und Alltag",
      intro: "Der Schutz, den man im Alltag braucht. Ich prüfe, ob er noch zu Ihrem Leben passt und ob Sie irgendwo doppelt zahlen.",
      items: ["Hausrat und Gebäude", "Privathaftpflicht", "Kfz-Versicherung", "Rechtsschutz"] },
    beruf: { tag: "Beruf und Gewerbe", tone: "honey", title: "Beruf und Gewerbe",
      intro: "Für Selbstständige und kleine Betriebe. Damit ein Schaden nicht gleich Ihre ganze Arbeit gefährdet.",
      items: ["Betriebshaftpflicht", "Inhalt und Ausstattung", "Ausfall und Betriebsunterbrechung", "Berufsunfähigkeit für Selbstständige"] },
    vertraege: { tag: "Vertragscheck", tone: "emerald", title: "Ihre bestehenden Verträge",
      intro: "Sie haben schon einen Stapel Papier? Ich sehe ihn mit Ihnen durch und sage Ihnen ehrlich, was bleiben kann.",
      items: ["Wo Sie doppelt abgesichert sind", "Wo etwas fehlt", "Laufzeiten und Kündigungsfristen", "Ob Preis und Leistung zusammenpassen"] }
  };
  var areaByTile = { vorsorge: "Vorsorge und Absicherung", alltag: "Haus, Auto und Alltag", beruf: "Beruf und Gewerbe", vertraege: "Noch offen" };
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
      tag.style.setProperty("--t", d.tone === "emerald" ? "#fff" : "var(--night)");
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

  // ---------- Versicherungsbaum (Wurzelprinzip) ----------
  var tree = $("#tree");
  if (tree) {
    var logo = $("#tree-logo");
    var stage = $(".tree__stage", tree);
    var list = $(".tree__branches", tree);
    var rootsSvg = $(".tree__roots", tree);
    var branches = $$(".branch", tree);
    var wide = window.matchMedia("(min-width: 1000px)");
    var hintEl = $("#tree-hint");
    var closeTimer = null;
    var hoverTimer = null;
    var NS = "http://www.w3.org/2000/svg";
    if (hintEl) {
      hintEl.textContent = finePointer
        ? "Fahren Sie mit der Maus über das Logo. Dann wachsen die Sparten heraus, und unter jeder Sparte die einzelnen Versicherungen."
        : "Tippen Sie auf das Logo. Dann wachsen die Sparten heraus, und unter jeder Sparte die einzelnen Versicherungen.";
    }

    function layoutRoots() {
      rootsSvg.innerHTML = "";
      if (!wide.matches) return;
      var w = tree.offsetWidth, h = tree.offsetHeight;
      rootsSvg.setAttribute("viewBox", "0 0 " + w + " " + h);
      var x0 = logo.offsetLeft + logo.offsetWidth / 2;
      var y0 = logo.offsetTop + logo.offsetHeight + 2;
      branches.forEach(function (li, i) {
        var x = stage.offsetLeft + list.offsetLeft + li.offsetLeft + li.offsetWidth / 2;
        var y = stage.offsetTop + list.offsetTop + li.offsetTop;
        var dy = y - y0;
        var paths = [
          { d: "M" + x0 + " " + y0 + " C" + x0 + " " + (y0 + dy * 0.6) + " " + x + " " + (y - dy * 0.55) + " " + x + " " + y, cls: "root" },
          { d: "M" + (x0 + (i - 2.5) * 5) + " " + (y0 + 8) + " C" + (x0 + (x - x0) * 0.25) + " " + (y0 + dy * 0.45) + " " + (x + (i % 2 ? -18 : 18)) + " " + (y - dy * 0.3) + " " + x + " " + (y - 3), cls: "root root--thin" }
        ];
        paths.forEach(function (pd) {
          var p = document.createElementNS(NS, "path");
          p.setAttribute("d", pd.d);
          p.setAttribute("class", pd.cls);
          p.setAttribute("data-i", i);
          p.style.setProperty("--i", i);
          p.style.setProperty("--rc", window.getComputedStyle(li).getPropertyValue("--lc").trim());
          rootsSvg.appendChild(p);
          var len = Math.ceil(p.getTotalLength()) + 2;
          p.style.setProperty("--len", len);
        });
        if (li.classList.contains("is-open")) markHot(i, true);
      });
    }
    function markHot(i, on) {
      $$('.root[data-i="' + i + '"]', rootsSvg).forEach(function (p) { p.classList.toggle("is-hot", on); });
    }
    function setBranch(li, on) {
      li.classList.toggle("is-open", on);
      $(".branch__head", li).setAttribute("aria-expanded", on ? "true" : "false");
      markHot(branches.indexOf(li), on);
    }
    function openOnly(li) { branches.forEach(function (b) { setBranch(b, b === li); }); }
    function setOpen(on) {
      if (on === tree.classList.contains("is-open")) return;
      tree.classList.toggle("is-open", on);
      logo.setAttribute("aria-expanded", on ? "true" : "false");
      if (on) {
        layoutRoots();
        void rootsSvg.getBoundingClientRect();
        window.requestAnimationFrame(function () { rootsSvg.classList.add("is-drawn"); });
      } else {
        rootsSvg.classList.remove("is-drawn");
        branches.forEach(function (b) { setBranch(b, false); });
      }
    }

    logo.addEventListener("pointerenter", function (e) {
      if (e.pointerType !== "mouse") return;
      window.clearTimeout(closeTimer);
      setOpen(true);
    });
    tree.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") window.clearTimeout(closeTimer); });
    tree.addEventListener("pointerleave", function (e) {
      if (e.pointerType !== "mouse") return;
      window.clearTimeout(hoverTimer);
      closeTimer = window.setTimeout(function () { setOpen(false); }, 800);
    });
    logo.addEventListener("click", function (e) {
      if (e.pointerType === "mouse") setOpen(true);
      else setOpen(!tree.classList.contains("is-open"));
    });
    branches.forEach(function (li) {
      var head = $(".branch__head", li);
      head.addEventListener("pointerenter", function (e) {
        if (e.pointerType !== "mouse") return;
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(function () { openOnly(li); }, 90);
      });
      head.addEventListener("pointerleave", function () { window.clearTimeout(hoverTimer); });
      head.addEventListener("click", function (e) {
        if (e.pointerType === "mouse") { openOnly(li); return; }
        if (li.classList.contains("is-open")) setBranch(li, false); else openOnly(li);
      });
      head.addEventListener("focus", function () { if (head.matches(":focus-visible")) openOnly(li); });
    });
    tree.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && tree.classList.contains("is-open")) { setOpen(false); logo.focus(); }
    });
    $$(".sub__item", tree).forEach(function (btn) {
      btn.addEventListener("click", function () {
        prefill(btn.getAttribute("data-area"), "Hallo,\nich interessiere mich für: " + btn.getAttribute("data-item") + " (" + btn.getAttribute("data-sparte") + ").\n");
        var k = $("#kontakt");
        if (k) k.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
    var relayout = function () { if (tree.classList.contains("is-open")) layoutRoots(); };
    window.addEventListener("resize", relayout);
    if (wide.addEventListener) wide.addEventListener("change", relayout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
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
      var colors = ["#ffad1f", "#ff5a2b", "#1f6a4a", "#ffd27a", "#b92f10"];
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
