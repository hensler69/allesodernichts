# 011: Tag-Nacht-Simulation als Schleife statt Scroll-Steuerung

- Stand: Commit `98eb9a2` · Art: Neue Bewegung (Wunsch des Auftraggebers) · Status: OFFEN
- Dateien: `shops/helia/index.html` (Abschnitt `<section class="aufgang">`), `shops/helia/assets/script.js`, `shops/helia/assets/style.css`
- Hinweis: `index.html` wird im Projekt mit einem Python-Generator erzeugt, der nicht im Repository liegt. Wer den Generator nutzt,
  muss die HTML-Änderung aus Schritt 1 dort ebenfalls eintragen, sonst wird sie beim nächsten Erzeugen überschrieben.

## Wunsch (wörtlich übersetzt in Verhalten)
1. Die Simulation startet automatisch, sobald der Abschnitt mit der Lampe im Bild ist, und stoppt, wenn man wegscrollt.
   Kommt man zurück, läuft sie an derselben Stelle weiter.
2. Sie ist eine Schleife über einen ganzen Tag: Sonnenaufgang, Tag, Sonnenuntergang, Nacht, wieder Sonnenaufgang.
3. Der Regler bleibt bedienbar. Sobald man ihn anfasst, hält die Schleife an, und der Regler bestimmt die Uhrzeit.
4. Lässt man den Regler los, läuft die Schleife an genau dieser Stelle weiter.

## Heutiger Stand (wird ersetzt)
Der Abschnitt ist 340vh hoch und angeheftet (`position:sticky`). Die Scrollposition bestimmt die Uhrzeit 06:00 bis 06:30.
Der Regler (`#zeitregler`, 0 bis 30) scrollt die Seite an die passende Stelle (script.js etwa Zeilen 346–352).
Die Berechnung steckt in `bild()` (script.js etwa Zeilen 299–316) und `aufgangFortschritt()` (Zeilen 245–250).

## Zielwerte
- Eine Schleife dauert **20 Sekunden**. Abschnitte (Sekunden innerhalb der Schleife, Uhrzeit, Licht `g` von 0 bis 1):
  | Sekunden | Phase | Uhrzeit | Licht g |
  |---|---|---|---|
  | 0 bis 6 | Sonnenaufgang | 06:00 bis 06:30 | 0 bis 1 |
  | 6 bis 10 | Tag | 06:30 bis 22:00 | 1 |
  | 10 bis 16 | Sonnenuntergang | 22:00 bis 22:30 | 1 bis 0 |
  | 16 bis 20 | Nacht | 22:30 bis 06:00 | 0 |
  Innerhalb jeder Phase laufen Uhrzeit und Licht linear. Die Uhr springt nicht: 22:30 bis 06:00 läuft über Mitternacht weiter.
- Lampe: `--lamp = verlauf(LAMPE, g, 1)`, `--glow = 0.06 + 0.94 * g` (dieselbe Abbildung wie heute).
- Seitenhimmel: Solange die Simulation läuft, folgt der Himmel `0.05 + 0.95 * g`. Wechsel zwischen Simulation und Scroll-Himmel
  werden weich angeglichen (pro Bild 10 % des Abstands, also eine exponentielle Annäherung), damit nichts springt.
- Start, wenn mindestens 35 % des Abschnitts sichtbar sind (IntersectionObserver `threshold: 0.35`). Stopp darunter.
- Regler: Wertebereich 0 bis 1000 (Schleifenposition). Tastatur: Nach der letzten Pfeiltaste läuft die Schleife 1200 ms später weiter.
- Barrierefreiheit (WCAG 2.2.2, sich bewegende Inhalte länger als 5 Sekunden brauchen eine Pause-Möglichkeit): ein Knopf
  "Anhalten" bzw. "Abspielen". Hat der Besucher selbst angehalten, startet die Schleife beim Hineinscrollen NICHT von allein.
- "Weniger Bewegung" (`prefers-reduced-motion: reduce`): kein Selbststart. Ruhestand bei Position 0,3 (06:30, volles Licht).
  Regler und Abspielen-Knopf funktionieren trotzdem (vom Besucher ausgelöst).

## Schritte

### 1. HTML (`index.html`, im `<div class="aufgang__text glas">`)
Ersetze Marke, Überschrift, Absatz, Phasenliste und Regler durch:
```html
<span class="marke">Tag und Nacht</span>
<h2 id="a-titel">Ein ganzer Tag, <span class="leucht">in zwanzig Sekunden.</span></h2>
<p>Die Simulation läuft von selbst, sobald Sie hier sind. Ziehen Sie den Regler, um selbst durch den Tag zu gehen.</p>
<div class="aufgang__uhr" aria-hidden="true">06:00</div>
<ol class="phasen">
  <li><span>06:00</span><span>Sonnenaufgang</span></li>
  <li><span>06:30</span><span>Tag, volles Licht</span></li>
  <li><span>22:00</span><span>Sonnenuntergang</span></li>
  <li><span>22:30</span><span>Nacht, alles aus</span></li>
</ol>
<div class="regler">
  <div class="sim-steuerung">
    <label for="zeitregler">Uhrzeit der Simulation</label>
    <button class="leise-knopf sim-knopf" type="button" id="sim-knopf" aria-pressed="false">Anhalten</button>
  </div>
  <input id="zeitregler" type="range" min="0" max="1000" step="1" value="0" aria-valuetext="06:00 Uhr, Sonnenaufgang">
</div>
```
Der Rest des Abschnitts (Lampe, `aufgang__fortschritt`, Hinweis auf Bildschirmfarben) bleibt.

### 2. CSS (`style.css`)
- `.aufgang{position:relative;height:340vh;margin-top:var(--s8)}` ändern zu `.aufgang{position:relative;margin-top:var(--s8)}`.
- In `.aufgang__klebt{...}` `position:sticky;top:56px;height:calc(100vh - 56px);height:calc(100svh - 56px);` ersetzen durch
  `position:relative;min-height:calc(100svh - 56px);`.
- Im Block `@media (max-width:760px)`: `.aufgang{height:300vh;margin-top:var(--s7)}` ändern zu `.aufgang{margin-top:var(--s7)}`,
  und in `.aufgang__klebt{top:52px;height:calc(100svh - 52px);...}` `top:52px;height:calc(100svh - 52px);` ersetzen durch `min-height:0;`.
  Im selben Block die Zeile `.regler label,.hinweis-bildschirm{display:none}` ändern zu `.hinweis-bildschirm{display:none}`.
- Neu ergänzen:
```css
.sim-steuerung{display:flex;align-items:center;justify-content:space-between;gap:var(--s2)}
.sim-knopf{padding:.4rem .85rem;font-size:.82rem}
```

### 3. JavaScript (`script.js`)
a) In `bild()` den Block `// Sonnenaufgang im angehefteten Abschnitt` (if-Block mit `aufgangKlebt`) **komplett löschen**.
b) Die Funktion `aufgangFortschritt()` und ihren Aufruf löschen. Den Sonnenstand in `bild()` ersetzen durch:
```js
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
```
und die vier `setzeWenn(welt, '--sky…'/'--sun', …)`-Zeilen in `bild()` entfernen (sie wandern in `himmelZiel`).
c) Den Block `// Zeitregler: spult den Sonnenaufgang vor …` (Listener auf `regler`, der `window.scrollTo` aufruft) löschen.
d) Vor `function bild()` einfügen (nutzt die vorhandenen `setzeWenn`, `verlauf`, `HIMMEL`, `LAMPE`, `klemmen`, `ruhig`, `$`, `$$`):
```js
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

// Tag-Nacht-Simulation: Schleife über 20 Sekunden, startet nur im sichtbaren Abschnitt
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
```
e) Nach `bild();` (dem ersten Aufruf) einfügen:
```js
if (aufgang && regler) {
  const knopf = $('#sim-knopf');
  const knopfZeigen = () => { const an = sim.laeuft && !sim.haelt; knopf.textContent = an ? 'Anhalten' : 'Abspielen'; knopf.setAttribute('aria-pressed', String(!an)); };
  if (ruhig) sim.angehalten = true; // kein Selbststart bei "weniger Bewegung"
  simZeichnen(); knopfZeigen();
  new IntersectionObserver((ein) => {
    sim.sichtbar = ein[0].isIntersecting;
    if (sim.sichtbar) { simStart(); himmelZiel(sim.himmel); } else { simStopp(); planen(); }
    knopfZeigen();
  }, { threshold: 0.35 }).observe(aufgang);
  // Regler anfassen hält die Schleife an, Loslassen lässt sie an derselben Stelle weiterlaufen
  const halten = () => { sim.haelt = true; knopfZeigen(); };
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
  regler.addEventListener('pointerdown', () => { clearTimeout(sim.tastenUhr); sim.tastenUhr = 0; });
  knopf.addEventListener('click', () => {
    if (sim.laeuft && !sim.haelt) { sim.angehalten = true; simStopp(); }
    else { sim.angehalten = false; sim.haelt = false; simStart(); }
    knopfZeigen();
  });
}
```

## Grenzen
- Nur der Abschnitt "aufgang" und der Seitenhimmel ändern sich. Die 3D-Lampe (Drehen per Ziehen, Eigendrehung) bleibt unverändert.
- Keine neuen Farben. `LAMPE`- und `HIMMEL`-Tabellen bleiben.
- Die Zeitleiste "Vom Abend bis zum Morgen" (`.nacht`) ist NICHT gemeint und bleibt.

## Prüfen
1. `node --check shops/helia/assets/script.js` ohne Fehler.
2. Startseite öffnen, langsam zum Abschnitt "Tag und Nacht" scrollen: Erst wenn etwa ein Drittel sichtbar ist, startet die Schleife.
   Uhr läuft 06:00 bis 06:30 (Lampe glimmt auf), Tag, 22:00 bis 22:30 (Lampe dimmt), Nacht über Mitternacht, wieder 06:00.
   Eine Runde dauert 20 Sekunden.
3. Wegscrollen: Uhr bleibt stehen. Zurückscrollen: läuft an derselben Stelle weiter.
4. Regler ziehen: Schleife steht, Uhr und Lampe folgen dem Regler. Loslassen: läuft ab dieser Uhrzeit weiter.
5. Tastatur: Regler fokussieren, Pfeiltasten: Uhr springt, nach etwa 1,2 Sekunden ohne Taste läuft sie weiter.
6. Knopf "Anhalten": Schleife steht, Knopf heißt "Abspielen". Weg- und zurückscrollen: bleibt angehalten. "Abspielen": läuft weiter.
7. Betriebssystem auf "weniger Bewegung": nichts startet von allein, Lampe zeigt 06:30 mit vollem Licht, Regler funktioniert.
8. Seitenhimmel: beim Hineinscrollen gleitet er in die Farbe der Simulation, beim Herausscrollen zurück. Kein harter Sprung.
9. Gefühlsprobe: In den Entwicklerwerkzeugen unter "Animations" ist nichts zu sehen (alles läuft per requestAnimationFrame).
   Stattdessen den Bildschirm 20 Sekunden aufnehmen und auf Ruckler beim Phasenwechsel achten (06:30 und 22:30).
