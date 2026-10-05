from bausteine import *

LD = '''<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Product","name":"HELIA Lichtwecker","description":"Lichtwecker mit Sonnenaufgang, 12 Klängen, zwei Weckzeiten und Einschlaf-Timer.","image":["https://www.helia.example/assets/og-image.jpg"],"brand":{"@type":"Brand","name":"HELIA"},"offers":{"@type":"Offer","url":"https://www.helia.example/","priceCurrency":"EUR","price":"49.90","priceValidUntil":"2026-11-30","availability":"https://schema.org/InStock","itemCondition":"https://schema.org/NewCondition"}}
</script>'''

FOTO = '<img src="/assets/img/produkt-entwurf.jpg" width="361" height="537" alt="{alt}">'

html = head("HELIA: Lichtwecker mit Sonnenaufgang",
            "HELIA weckt Sie mit einem Sonnenaufgang im Zimmer. Lichtwecker mit 12 Klängen, zwei Weckzeiten und Einschlaf-Timer.", "/", LD)
html += WELT + ENTWURF + kopf(True) + '<main id="inhalt">\n'

KREIS = [("Glut bis Gold", "in 10 bis 60 Minuten", 0, 150), ("Sonnenuntergang", "dimmt abends aus", 120, 60), ("Kein Handy", "am Bett nötig", 240, 205)]
chips = "".join(f'<div class="hinweis-chip"><b>{t}</b><span>{x}</span></div>' for t, x, _, _ in KREIS)

# ---------- Aufmerksamkeit ----------
html += f'''
<section class="held" aria-labelledby="titel">
  <div class="held__text">
    <span class="marke held__an" style="--i:0" data-gruss>HELIA Lichtwecker</span>
    <h1 id="titel"><span class="held__an" style="--i:1">Draußen grau.</span> <span class="held__an" style="--i:2">Drinnen <span class="leucht">Sonne.</span></span></h1>
    <p class="held__unter held__an" style="--i:3">HELIA lässt in Ihrem Zimmer die Sonne aufgehen. Eine halbe Stunde vor dem Wecken wächst das Licht von Glut zu Gold.</p>
    <a class="held__sterne held__an" style="--i:4" href="#bewertungen" data-rez="kopf"><span class="sterne" data-rez="sterne-kopf"></span><span data-rez="kopf-text">Bewertungen ansehen</span></a>
    <div class="held__kauf held__an" style="--i:5">
      <div class="preis">
        <span class="preis__betrag" data-preis="einzeln">49,90 €</span>
        <span class="preis__info" data-nur-einfuehrung>Einführungspreis bis 30.11.2026, danach 59,90 €</span>
        <a class="preis__klein" href="/versand-und-zahlung">inkl. 19 % MwSt., zzgl. 4,90 € Versand</a>
      </div>
      <button class="knopf knopf--gross" type="button" data-hinzu="einzeln">{ICON["korb"]}In den Warenkorb</button>
    </div>
  </div>
  <div class="held__lampe" data-intro>
    {lampe_3d("06:30")}
    <div class="held__chips" aria-hidden="true">{chips}</div>
  </div>
  <div class="chips-mobil" aria-hidden="true">{chips}</div>
</section>
'''

# ---------- Interesse: Laufband ----------
WORTE = ["Sonnenaufgang", "Sonnenuntergang", "Zwölf Klänge", "Zwei Weckzeiten", "Kein Handy am Bett", "Ohne App"]
spur = "".join(f'<span class="laufband__wort{" laufband__wort--voll" if i % 3 == 0 else ""}">{w}</span><i class="laufband__punkt"></i>' for i, w in enumerate(WORTE))
html += f'''
<div class="laufband" aria-hidden="true"><div class="laufband__spur"><div class="laufband__gruppe">{spur}</div><div class="laufband__gruppe">{spur}</div></div></div>
'''

# ---------- Interesse: Überblick ----------
html += '''
<section class="kapitel" id="ueberblick" aria-labelledby="u-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="u-titel">Alles, was ein Morgen braucht.</h2>
  </div>
  <div class="blick">
    <div data-kipp class="blick__kachel glas zeigen"><span class="blick__zahl"><span data-zaehlen="30">30</span><small>Min</small></span><span class="blick__text">Sonnenaufgang, von 10 bis 60 Minuten einstellbar</span></div>
    <div data-kipp class="blick__kachel glas zeigen" style="--d:60ms"><span class="blick__zahl" data-zaehlen="12">12</span><span class="blick__text">Klänge, von Regen bis Lagerfeuer</span></div>
    <div data-kipp class="blick__kachel glas zeigen" style="--d:120ms"><span class="blick__zahl" data-zaehlen="2">2</span><span class="blick__text">Weckzeiten, etwa für Woche und Wochenende</span></div>
    <div data-kipp class="blick__kachel glas zeigen" style="--d:180ms"><span class="blick__zahl" data-zaehlen="20">20</span><span class="blick__text">Helligkeitsstufen für das Leselicht</span></div>
  </div>
</section>
'''

# ---------- Interesse: Geschichte ----------
html += '''
<section class="kapitel geschichte" aria-labelledby="g-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="g-titel">Irgendwo über den Wolken<span class="pille" aria-hidden="true"></span>geht sie noch auf.</h2>
  </div>
  <p class="wortweise">Die meisten Morgen beginnen heute mit einem Schrei aus dem Telefon. Dunkel, laut, zu früh. HELIA dreht das um. Eine halbe Stunde vor dem Aufstehen glimmt die Lampe auf, erst rot wie Glut, dann orange, dann gold. Sie wachen auf, weil es hell wird, und nicht, weil jemand schreit.</p>
</section>
'''

# ---------- Interesse: Sonnenaufgang zum Ausprobieren ----------
html += f'''
<section class="aufgang" id="aufgang" aria-labelledby="a-titel">
  <div class="aufgang__klebt">
    <div class="aufgang__text glas">
      <h2 id="a-titel">Ein ganzer Tag, <span class="leucht">in zwanzig Sekunden.</span></h2>
      <p>Die Simulation läuft von selbst, sobald Sie hier sind. Ziehen Sie den Regler, um selbst durch den Tag zu gehen.</p>
      <div class="aufgang__uhr" aria-hidden="true">06:00</div>
      <ol class="phasen">
        <li><span data-weck-start>06:00</span><span>Sonnenaufgang</span></li>
        <li><span data-weckzeit>06:30</span><span>Weckzeit, volles Licht</span></li>
        <li><span>22:00</span><span>Sonnenuntergang</span></li>
        <li><span>22:30</span><span>Nacht, alles aus</span></li>
      </ol>
      <div class="weckzeit">
        <span id="wz-titel">Ihre Weckzeit</span>
        <div class="stepper" role="group" aria-labelledby="wz-titel">
          <button type="button" data-weck="-15" aria-label="15 Minuten früher">&minus;</button>
          <output aria-live="polite" data-weckzeit>06:30</output>
          <button type="button" data-weck="15" aria-label="15 Minuten später">+</button>
        </div>
      </div>
      <div class="regler">
        <div class="sim-steuerung">
          <label for="zeitregler">Uhrzeit der Simulation</label>
          <button class="leise-knopf sim-knopf" type="button" id="sim-knopf" aria-pressed="false">Anhalten</button>
        </div>
        <input id="zeitregler" type="range" min="0" max="1000" step="1" value="0" aria-valuetext="06:00 Uhr, Sonnenaufgang">
      </div>
      <p class="hinweis-bildschirm">Die Farben auf Ihrem Bildschirm können von der echten Lampe abweichen.</p>
    </div>
    <div class="aufgang__lampe">{lampe_3d("06:00")}</div>
    <div class="aufgang__fortschritt" aria-hidden="true"><i></i></div>
  </div>
</section>
'''

# ---------- Verlangen: Funktionen ----------
html += f'''
<section class="kapitel" id="funktionen" aria-labelledby="f-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="f-titel">Fünf Symbole. Mehr braucht ein Morgen nicht.</h2>
    <p>Tippen Sie auf das Display und sehen Sie, was jedes Symbol kann.</p>
  </div>
  <div class="bento">
    <article data-kipp class="kachel kachel--display glas zeigen">
      <div class="display">
        <div class="display__glas">
          <div class="display__zeit"><small>AM</small>10:36</div>
          <div class="display__symbole" role="group" aria-label="Funktionen des Displays">
            <button type="button" data-symbol="wecker" aria-pressed="false">{ICON["wecker"]}<span>Wecker</span></button>
            <button type="button" data-symbol="licht" aria-pressed="true">{ICON["licht"]}<span>Licht</span></button>
            <button type="button" data-symbol="klang" aria-pressed="false">{ICON["klang"]}<span>Klang</span></button>
            <button type="button" data-symbol="schlaf" aria-pressed="false">{ICON["schlaf"]}<span>Schlaf</span></button>
            <button type="button" data-symbol="timer" aria-pressed="false">{ICON["timer"]}<span>Timer</span></button>
          </div>
        </div>
      </div>
      <div class="display__erklaerung" aria-live="polite">
        <h3>Sonnenaufgang</h3>
        <p>Das Licht wächst in 10 bis 60 Minuten von Glut zu Tageslicht. Tagsüber dient es als Leselicht in 20 Stufen.</p>
      </div>
    </article>
    <article data-kipp class="kachel kachel--abend glas zeigen" style="--d:80ms">
      <div>
        <h3>Der Abend fährt herunter.</h3>
        <p>Das Licht dimmt in bis zu 60 Minuten aus. Sie müssen nichts mehr anfassen und nichts mehr suchen.</p>
      </div>
      <div class="untergang" data-skala aria-hidden="true"></div>
    </article>
    <article data-kipp class="kachel kachel--klang glas zeigen" style="--d:140ms">
      <div class="welle" aria-hidden="true">{"".join("<i></i>" for _ in range(14))}</div>
      <h3>Zwölf Klänge</h3>
      <p>Regen, Wellen, Wald, Lagerfeuer und mehr.</p>
      <p style="margin-top:1rem"><button class="leise-knopf" type="button" data-probehoeren aria-pressed="false">{ICON["klang"].replace('<svg ', '<svg width="16" height="16" ')}<span>Regen probehören</span></button></p>
    </article>
    <article data-kipp class="kachel kachel--ruhe glas zeigen" style="--d:200ms">
      <p class="gross">Kein Handy am Bett.</p>
      <p>Zwei Weckzeiten, Einschlaf-Timer und Leselicht. Das Telefon darf im Flur bleiben.</p>
    </article>
  </div>
</section>
'''

# ---------- Verlangen: Abend bis Morgen ----------
html += '''
<section class="kapitel" aria-labelledby="n-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="n-titel">Vom Abend <span class="leucht">bis zum Morgen.</span></h2>
  </div>
  <div class="nacht zeigen" role="group" aria-label="Der Ablauf einer Nacht">
    <button class="nacht__teil ist-offen" type="button" aria-expanded="true" style="--bg:linear-gradient(160deg,#3a2150,#9a3f4f 68%,#e0743f)">
      <span class="nacht__inhalt"><span class="nacht__zeit">22:30</span><span class="nacht__titel">Sonnenuntergang</span><span class="nacht__text">Das Licht dimmt langsam herunter, bis nur noch ein Glimmen bleibt.</span></span>
    </button>
    <button class="nacht__teil" type="button" aria-expanded="false" style="--bg:linear-gradient(160deg,#0f1638,#1f3358)">
      <span class="nacht__inhalt"><span class="nacht__zeit">23:00</span><span class="nacht__titel">Klänge</span><span class="nacht__text">Regen oder Wellen laufen leise, bis der Timer sie ausschaltet.</span></span>
    </button>
    <button class="nacht__teil" type="button" aria-expanded="false" style="--bg:linear-gradient(160deg,#04050c,#0d1024)">
      <span class="nacht__mond" style="background:radial-gradient(circle at 35% 35%,#f4f1ff,#9a96b8 70%);box-shadow:0 0 40px rgba(180,176,230,.35)"></span>
      <span class="nacht__inhalt"><span class="nacht__zeit">03:00</span><span class="nacht__titel">Stille</span><span class="nacht__text">Alles ist aus. Nur die Uhr glimmt, gedimmt auf das Mindeste.</span></span>
    </button>
    <button class="nacht__teil" type="button" aria-expanded="false" style="--bg:linear-gradient(160deg,#5b2a4a,#d0663f 62%,#ffd9a0)">
      <span class="nacht__inhalt"><span class="nacht__zeit">06:30</span><span class="nacht__titel">Sonnenaufgang</span><span class="nacht__text">Das Licht ist da, bevor der Wecker es sein muss.</span></span>
    </button>
  </div>
</section>
'''

# ---------- Verlangen: Technik ----------
daten = [("Modell", "HELIA, HL-1"), ("Maße", "ca. 12 × 12 × 19,5 cm"), ("Gewicht", "ca. 480 g"),
         ("Licht", "Warmweiß bis Tageslicht, dimmbar"), ("Sonnenaufgang", "10 bis 60 Minuten"),
         ("Klänge", "12, Lautstärke in 16 Stufen"), ("Weckzeiten", "2, mit Schlummerfunktion"),
         ("Display", "Uhrzeit, in 3 Stufen dimmbar"), ("Strom", "USB-C, Netzteil liegt bei"),
         ("Material", "Stoffschirm, Kunststoffsockel")]
reihen = "\n".join(f'        <div class="reihe"><dt>{a}</dt><dd>{b}</dd></div>' for a, b in daten)
html += f'''
<section class="kapitel" id="technik" aria-labelledby="t-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="t-titel">Die Zahlen zum Gerät.</h2>
    <p>Alle Angaben sind Platzhalter, bis der Lieferant sie bestätigt hat.</p>
  </div>
  <div class="stapel">
  <div class="stapel__karte datenblatt glas">
    <dl>
{reihen}
    </dl>
  </div>
    <div class="stapel__karte glas karton">
      <h3>Im Karton</h3>
      <ul class="liste">
        <li>HELIA Lichtwecker</li>
        <li>USB-C-Netzteil mit Kabel</li>
        <li>Kurzanleitung auf Deutsch</li>
        <li>Sicherheitshinweise</li>
      </ul>
    </div>
    <div class="stapel__karte glas gpsr">
      <h3>Produktsicherheit</h3>
      <p><strong>Hersteller:</strong> <span class="platzhalter">Lumenwerk Shenzhen Co., Ltd., Beispielgasse 12, Shenzhen, China (fiktiv)</span></p>
      <p><strong>Verantwortliche Person in der EU:</strong> <span class="platzhalter">{FIRMA}, Beispielstraße 1, 00000 Musterstadt (fiktiv)</span></p>
      <p><strong>Produkt:</strong> HELIA, Modell HL-1. Die Chargennummer steht auf dem Typenschild.</p>
      <div class="warnung">
        <strong>Sicherheitshinweise</strong>
        <ul>
          <li>Nur mit dem mitgelieferten Netzteil betreiben.</li>
          <li>Schirm und Lüftungsöffnungen nicht abdecken.</li>
          <li>Nicht für Kinder unter 3 Jahren geeignet. Kleinteile.</li>
          <li>Bei lichtempfindlichen Erkrankungen vor der Nutzung ärztlichen Rat einholen.</li>
        </ul>
      </div>
    </div>
  </div>
</section>
'''


# ---------- Verlangen: Bewertungen ----------
html += '''
<section class="kapitel" id="bewertungen" aria-labelledby="r-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="r-titel">Was Käufer über HELIA sagen.</h2>
  </div>
  <p class="entwurf-hinweis" role="note"><strong>Entwurf:</strong> Die Bewertungen unten sind erfundene Beispiele und zeigen nur die Gestaltung. Vor dem Start löschen. Echte Bewertungen kommen über das Formular „Bewertung schreiben“.</p>
  <div class="zitate glas" data-zitate role="region" aria-roledescription="Karussell" aria-label="Ausgewählte Bewertungen">
    <div class="zitate__buehne" aria-live="polite"></div>
    <div class="zitate__steuer">
      <div class="zitate__koepfe" aria-hidden="true"></div>
      <div class="zitate__pfeile">
        <button class="zitate__pfeil" type="button" data-zurueck aria-label="Vorherige Bewertung"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>
        <span class="zitate__zahl"></span>
        <button class="zitate__pfeil" type="button" data-weiter aria-label="Nächste Bewertung"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
      </div>
    </div>
  </div>
  <div class="rez">
    <aside class="rez__summe glas" data-kipp aria-label="Zusammenfassung der Bewertungen">
      <div class="rez__schnitt">
        <span class="rez__zahl" data-rez="schnitt">0,0</span>
        <div><span class="sterne" data-rez="sterne" style="--st:22px"></span><div class="rez__anzahl" data-rez="anzahl"></div></div>
      </div>
      <ul class="verteilung" data-rez="verteilung" aria-label="Nach Sternen filtern"></ul>
      <button class="leise-knopf" type="button" data-bewerten>Bewertung schreiben</button>
      <details class="pruef"><summary>So prüfen wir Bewertungen</summary><p>Wir veröffentlichen nur Bewertungen, die mit einer gültigen Bestellnummer bei uns eingehen. Gute und schlechte Bewertungen erscheinen gleichermaßen. Wir kürzen oder ändern keine Texte und bezahlen nicht für Bewertungen.</p></details>
    </aside>
    <div>
      <div class="rez__werkzeug">
        <p class="rez__info" data-rez="info" aria-live="polite"></p>
        <label class="sr" for="rez-sort">Bewertungen sortieren</label>
        <select id="rez-sort" class="auswahl">
          <option value="neu">Neueste zuerst</option>
          <option value="hilfreich">Hilfreichste zuerst</option>
          <option value="hoch">Beste zuerst</option>
          <option value="tief">Kritischste zuerst</option>
        </select>
      </div>
      <ul class="rez__liste" data-rez="liste"></ul>
      <div class="rez__mehr"><button class="leise-knopf" type="button" data-rez="mehr">Weitere Bewertungen anzeigen</button></div>
    </div>
  </div>
  <script type="application/json" id="bewertungen-daten">
[
 {
  "id": 1,
  "sterne": 5,
  "titel": "Ich wache nicht mehr erschrocken auf",
  "text": "Früher hat mich der Handywecker jeden Morgen aus dem Tiefschlaf gerissen. Jetzt ist es schon hell, wenn der leise Ton kommt. Der Sonnenaufgang über 30 Minuten ist für mich genau richtig.",
  "name": "Lena K.",
  "datum": "2026-09-29",
  "hilfreich": 14,
  "beispiel": true
 },
 {
  "id": 2,
  "sterne": 5,
  "titel": "Warmes Licht, kein kaltes Blau",
  "text": "Ich hatte Angst vor grellem LED-Licht. Das Licht ist aber angenehm warm und am Ende hell genug zum Lesen. Der Stoffschirm sieht auch ausgeschaltet gut aus.",
  "name": "Tobias R.",
  "datum": "2026-09-24",
  "hilfreich": 9,
  "beispiel": true
 },
 {
  "id": 3,
  "sterne": 5,
  "titel": "Abends der eigentliche Gewinn",
  "text": "Den Sonnenuntergang nutze ich jeden Abend mit Regenrauschen. Nach 30 Minuten ist alles aus, ich muss nichts mehr anfassen.",
  "name": "Aylin D.",
  "datum": "2026-09-18",
  "hilfreich": 6,
  "beispiel": true
 },
 {
  "id": 4,
  "sterne": 4,
  "titel": "Schön, Display könnte dunkler sein",
  "text": "Alles prima, nur auf der niedrigsten Stufe ist mir das Display nachts noch etwas zu hell. Ich habe es zur Wand gedreht.",
  "name": "Mira S.",
  "datum": "2026-09-12",
  "hilfreich": 11,
  "beispiel": true,
  "antwort": "Danke für den Hinweis. Die dunkelste der drei Stufen erreichen Sie mit zweimal Tippen auf den Deckel. Wir geben Ihre Rückmeldung an die Entwicklung weiter."
 },
 {
  "id": 5,
  "sterne": 4,
  "titel": "Gutes Geschenk",
  "text": "Für meine Schwester gekauft, die im Schichtdienst arbeitet. Die zwei Weckzeiten sind praktisch. Die Anleitung hätte etwas ausführlicher sein dürfen.",
  "name": "Jonas W.",
  "datum": "2026-09-05",
  "hilfreich": 4,
  "beispiel": true
 },
 {
  "id": 6,
  "sterne": 3,
  "titel": "Klänge okay, Lautsprecher klein",
  "text": "Für Regen und Wellen reicht der Lautsprecher. Musik würde ich darüber nicht hören. Das Licht selbst ist sehr schön.",
  "name": "Petra M.",
  "datum": "2026-08-28",
  "hilfreich": 7,
  "beispiel": true
 },
 {
  "id": 7,
  "sterne": 2,
  "titel": "Karton kam eingedrückt an",
  "text": "Das Gerät funktioniert, aber der Karton war beschädigt und der Deckel hatte einen Kratzer.",
  "name": "Sven B.",
  "datum": "2026-08-20",
  "hilfreich": 3,
  "beispiel": true,
  "antwort": "Das tut uns leid. Wir haben Ihnen einen neuen Deckel geschickt und die Verpackung beim Lieferanten verstärken lassen."
 }
]
  </script>
</section>
'''

# ---------- Handlung: Angebot ----------
html += f'''
<section class="kapitel" id="angebot" aria-labelledby="o-titel">
  <div class="angebot">
    <div class="angebot__bild glas wachsen">
      <div class="lampe lampe--foto" data-skala>
        <div class="lampe__halo"></div>
        {FOTO.replace("{alt}", "HELIA: Lichtwecker mit leuchtendem Schirm, von vorn")}
      </div>
    </div>
    <div class="glas angebot__box zeigen">
      <h2 id="o-titel">Holen Sie sich <span class="leucht">den Morgen zurück.</span></h2>
      <form id="angebot-form" action="/kasse" method="get">
        <fieldset class="wahl">
          <legend>Paket</legend>
          <label class="option">
            <input type="radio" name="paket" value="einzeln" checked>
            <span class="option__punkt"></span>
            <span class="option__name">Ein Lichtwecker</span>
            <span class="option__preis"><span data-preis="einzeln">49,90 €</span><small data-nur-einfuehrung>bis 30.11.2026</small></span>
            <span class="option__zusatz">Plus 4,90 € Versand</span>
          </label>
          <label class="option">
            <input type="radio" name="paket" value="set">
            <span class="option__punkt"></span>
            <span class="option__name">2er-Set</span>
            <span class="option__preis"><span data-preis="set">84,80 €</span><small>15 % günstiger als zwei einzeln</small></span>
            <span class="option__zusatz">Für zwei Zimmer oder zum Verschenken. Versand kostenlos.</span>
          </label>
        </fieldset>
        <div class="menge">
          <span>Menge</span>
          <div class="stepper" role="group" aria-label="Menge wählen">
            <button type="button" data-menge="-1" aria-label="Eins weniger">&minus;</button>
            <output aria-live="polite">1</output>
            <button type="button" data-menge="1" aria-label="Eins mehr">+</button>
          </div>
        </div>
        <div class="summe"><span>Summe inkl. MwSt.</span><strong data-feld="angebot-summe">49,90 €</strong></div>
        <button class="knopf knopf--gross knopf--breit" type="submit">{ICON["korb"]}In den Warenkorb</button>
        <div class="fakten">
          <div><b>Versand</b><span>DHL, 2 bis 4 Werktage</span></div>
          <div><b>Zahlung</b><span>PayPal, Klarna</span></div>
          <div><b>Ab 59 €</b><span>Versand kostenlos</span></div>
        </div>
        <p class="kleingedruckt" style="margin-top:1rem">Einführungspreis bis 30.11.2026, danach 59,90 € je Gerät (Set: 101,80 €). Preise inkl. 19 % MwSt. Informationen zum Widerruf finden Sie in der <a href="/widerrufsbelehrung">Widerrufsbelehrung</a>.</p>
      </form>
    </div>
  </div>
</section>
'''

# ---------- Fragen ----------
fragen = [
    ("Wie lange dauert der Sonnenaufgang?", "Sie stellen 10 bis 60 Minuten ein. Am Ende ist das Licht so hell, wie Sie es eingestellt haben."),
    ("Brauche ich ein Handy oder eine App?", "Nein. Alles wird am Gerät eingestellt. Es gibt keine App und kein Konto."),
    ("Kann ich für das Wochenende eine andere Weckzeit einstellen?", "Ja. HELIA hat zwei Weckzeiten, zum Beispiel eine für die Woche und eine fürs Wochenende."),
    ("Wie schnell kommt das Paket?", "Wir versenden mit DHL. Die Lieferung dauert in Deutschland meist 2 bis 4 Werktage. Der Versand kostet 4,90 €, ab 59 € Bestellwert ist er kostenlos."),
    ("Kann ich die Bestellung widerrufen?", "Als Verbraucher haben Sie ein gesetzliches Widerrufsrecht von 14 Tagen. Die Einzelheiten stehen in der <a href=\"/widerrufsbelehrung\">Widerrufsbelehrung</a>. Den Widerruf können Sie auch online über die Seite <a href=\"/widerrufen\">Vertrag widerrufen</a> erklären."),
    ("Was gilt, wenn das Gerät nicht funktioniert?", f"Es gelten die gesetzlichen Mängelrechte. Schreiben Sie uns an <a href=\"mailto:{MAIL}\">{MAIL}</a>, wir kümmern uns darum."),
]
html += '''
<section class="kapitel" id="fragen" aria-labelledby="q-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="q-titel">Was Sie vor dem Kauf wissen möchten.</h2>
  </div>
  <div class="fragen glas zeigen">
'''
for q, a in fragen:
    html += f'    <details class="frage"><summary>{q}<i aria-hidden="true"></i></summary><div class="frage__antwort"><p>{a}</p></div></details>\n'
html += '  </div>\n</section>\n'

# ---------- Abschied: die Seite endet mit einem Sonnenuntergang ----------
html += '''
<section class="abschied" aria-labelledby="gn-titel">
  <div class="abschied__himmel" aria-hidden="true"><i class="abschied__sonne"></i><i class="abschied__wasser"></i></div>
  <div class="abschied__text">
    <span class="marke">Bis morgen früh</span>
    <h2 id="gn-titel">Schlafen Sie gut. <span class="leucht">Der Morgen kommt sanft.</span></h2>
    <p>Klingelt Ihr Wecker um <b data-weckzeit>06:30</b>, wird es mit HELIA schon ab <b data-weck-start>06:00</b> langsam hell. Ganz ohne Schreck.</p>
  </div>
</section>
</main>
'''

html += FUSS + KORB

STERNE_WAHL = "".join(f'<input type="radio" id="bw-s{n}" name="sterne" value="{n}" required><label for="bw-s{n}" title="{n} von 5 Sternen"><span class="sr">{n} von 5 Sternen</span>{STERN}</label>' for n in range(5, 0, -1))
html += f'''<dialog class="bewerten" id="bewerten" aria-labelledby="bw-titel">
  <form id="bewerten-form" action="/send.php" method="post" novalidate>
    <input type="hidden" name="art" value="bewertung">
    <div class="honig-feld" aria-hidden="true"><label>Bitte leer lassen<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="bewerten__kopf"><h2 id="bw-titel">Bewertung schreiben</h2><button class="zu" type="button" data-bewerten-zu aria-label="Schließen">{ICON["zu"]}</button></div>
    <fieldset class="feldgruppe" style="border:0;padding:0;margin:0"><legend>Wie viele Sterne geben Sie?</legend><div class="sterne-wahl">{STERNE_WAHL}</div></fieldset>
    <div class="feldgruppe"><label for="bw-titel-feld">Überschrift</label><input class="feld" id="bw-titel-feld" name="titel" type="text" maxlength="80" required></div>
    <div class="feldgruppe"><label for="bw-text">Ihre Erfahrung</label><textarea class="feld" id="bw-text" name="text" minlength="20" maxlength="1500" required></textarea></div>
    <div class="felder">
      <div class="feldgruppe"><label for="bw-name">Name (wird angezeigt)</label><input class="feld" id="bw-name" name="name" type="text" maxlength="40" autocomplete="given-name" required></div>
      <div class="feldgruppe"><label for="bw-mail">E-Mail (wird nicht angezeigt)</label><input class="feld" id="bw-mail" name="email" type="email" autocomplete="email" required></div>
    </div>
    <div class="feldgruppe"><label for="bw-nr">Bestellnummer, zur Prüfung (wird nicht angezeigt)</label><input class="feld" id="bw-nr" name="bestellnr" type="text" maxlength="30" placeholder="HL-20261005-ABC123" required></div>
    <label class="haken"><input type="checkbox" name="einwilligung" value="ja" required><span>Ich bin einverstanden, dass meine Bewertung mit dem angegebenen Namen auf dieser Seite erscheint. Mehr dazu in der <a href="/datenschutz">Datenschutzerklärung</a>.</span></label>
    <button class="leise-knopf" type="submit">Bewertung senden</button>
    <p class="meldung" role="status" aria-live="polite"></p>
  </form>
</dialog>
'''

html += '''<div class="kaufleiste" role="region" aria-label="Schnellkauf">
  <div><b data-preis="einzeln">49,90 €</b><small>inkl. MwSt.</small></div>
  <button class="knopf" type="button" data-hinzu="einzeln">In den Warenkorb</button>
</div>
'''
html += SKRIPT
seite("index.html", html)
