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

  // ---------- Kontaktformular: Senden ohne Seitenwechsel ----------
  if (form) {
    var status = $("#form-status");
    var button = $("button[type=submit]", form);
    var show = function (text, ok) { status.textContent = text; status.className = "form__status " + (ok ? "is-ok" : "is-error"); };
    var again = $("#sent-again");
    if (again) again.addEventListener("click", function () { form.classList.remove("is-sent"); status.textContent = ""; });

    var param = new URLSearchParams(window.location.search).get("status");
    if (param === "ok") form.classList.add("is-sent");
    if (param === "fehler") show("Das hat leider nicht geklappt. Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.", false);
    if (param === "zuoft") show("Sie haben gerade schon Nachrichten gesendet. Bitte versuchen Sie es in ein paar Minuten noch einmal.", false);

    form.addEventListener("submit", function (event) {
      if (!window.fetch) return; // alter Browser: normales Absenden
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      button.disabled = true;
      show("Wird gesendet …", true);
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { "X-Requested-With": "fetch", "Accept": "application/json" } })
        .then(function (res) { return res.json().then(function (data) { return { res: res, data: data }; }); })
        .then(function (r) {
          if (r.res.ok && r.data.ok) { status.textContent = ""; form.reset(); lastAuto = ""; form.classList.add("is-sent"); }
          else if (r.res.status === 429) { show("Sie haben gerade schon Nachrichten gesendet. Bitte versuchen Sie es in ein paar Minuten noch einmal.", false); }
          else { show(r.data.fehler || "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.", false); }
        })
        .catch(function () { show("Das hat leider nicht geklappt. Bitte versuchen Sie es später erneut oder schreiben Sie direkt per E-Mail.", false); })
        .then(function () { button.disabled = false; });
    });
  }
})();
