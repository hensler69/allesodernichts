// Einfaches JavaScript: sanftes Einblenden und Kontaktformular

// Sanftes Einblenden beim Scrollen
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  items.forEach(function (el) { observer.observe(el); });
})();

// Kontaktformular: Senden ohne Seitenwechsel
(function () {
  var form = document.getElementById("kontaktformular");
  if (!form) return;
  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");

  function show(text, ok) {
    status.textContent = text;
    status.className = "form__status " + (ok ? "is-ok" : "is-error");
  }

  // Rückmeldung, falls das Formular ohne JavaScript abgeschickt wurde
  var param = new URLSearchParams(window.location.search).get("status");
  if (param === "ok") show("Danke, Ihre Nachricht ist angekommen. Ich melde mich bei Ihnen.", true);
  if (param === "fehler") show("Das hat leider nicht geklappt. Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.", false);
  if (param === "zuoft") show("Sie haben gerade schon Nachrichten gesendet. Bitte versuchen Sie es in ein paar Minuten noch einmal.", false);

  form.addEventListener("submit", function (event) {
    if (!window.fetch) return; // alter Browser: normales Absenden
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    button.disabled = true;
    show("Wird gesendet …", true);
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "X-Requested-With": "fetch", "Accept": "application/json" }
    })
      .then(function (res) { return res.json().then(function (data) { return { res: res, data: data }; }); })
      .then(function (r) {
        if (r.res.ok && r.data.ok) {
          show("Danke, Ihre Nachricht ist angekommen. Ich melde mich bei Ihnen.", true);
          form.reset();
        } else if (r.res.status === 429) {
          show("Sie haben gerade schon Nachrichten gesendet. Bitte versuchen Sie es in ein paar Minuten noch einmal.", false);
        } else {
          show(r.data.fehler || "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.", false);
        }
      })
      .catch(function () {
        show("Das hat leider nicht geklappt. Bitte versuchen Sie es später erneut oder schreiben Sie direkt per E-Mail.", false);
      })
      .then(function () { button.disabled = false; });
  });
})();
