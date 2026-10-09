import json
from bausteine import *

LD = '''<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Product","name":"HORTA Gemüseschneider HT-5","description":"Elektrischer Gemüseschneider mit fünf Einsätzen aus Edelstahl für Scheiben, Raspeln und feines Reiben.","image":["https://www.horta.example/assets/og-image.jpg"],"brand":{"@type":"Brand","name":"HORTA"},"model":"HT-5","offers":{"@type":"Offer","url":"https://www.horta.example/","priceCurrency":"EUR","price":"44.90","priceValidUntil":"2026-11-30","availability":"https://schema.org/InStock","itemCondition":"https://schema.org/NewCondition","shippingDetails":{"@type":"OfferShippingDetails","shippingRate":{"@type":"MonetaryAmount","value":"4.90","currency":"EUR"},"shippingDestination":{"@type":"DefinedRegion","addressCountry":"DE"},"deliveryTime":{"@type":"ShippingDeliveryTime","handlingTime":{"@type":"QuantitativeValue","minValue":1,"maxValue":2,"unitCode":"DAY"},"transitTime":{"@type":"QuantitativeValue","minValue":7,"maxValue":13,"unitCode":"DAY"}}}}}
</script>'''

html = head("HORTA: elektrischer Gemüseschneider mit 5 Einsätzen",
            "HORTA schneidet, raspelt und reibt Gemüse, Käse und Nüsse auf Knopfdruck. Fünf Einsätze aus Edelstahl, alles fällt direkt in die Schüssel.", "/", LD)
html += WELT + ENTWURF + kopf(True) + '<main id="inhalt">\n'

KREIS = [("5 Einsätze", "Scheiben, Raspeln, Reibe"), ("Edelstahl", "Gehäuse und Klingen"), ("Ohne Brett", "direkt in die Schüssel")]
chips = "".join(f'<div class="hinweis-chip"><b>{t}</b><span>{x}</span></div>' for t, x in KREIS)

# ---------- Aufmerksamkeit ----------
html += f'''
<section class="held" aria-labelledby="titel">
  <div class="held__text">
    <span class="marke held__an" style="--i:0" data-gruss>HORTA Gemüseschneider</span>
    <h1 id="titel"><span class="held__an" style="--i:1">Weniger schnippeln.</span> <span class="held__an" style="--i:2">Mehr <span class="leucht">Salat.</span></span></h1>
    <p class="held__unter held__an" style="--i:3">HORTA schneidet, raspelt und reibt auf Knopfdruck. Fünf Einsätze aus Edelstahl, ein breiter Schacht, und alles fällt direkt in Ihre Schüssel.</p>
    <a class="held__sterne held__an" style="--i:4" href="#bewertungen" data-rez="kopf"><span class="sterne" data-rez="sterne-kopf"></span><span data-rez="kopf-text">Bewertungen ansehen</span></a>
    <div class="held__kauf held__an" style="--i:5">
      <div class="preis">
        <span class="preis__betrag" data-preis="einzeln">44,90 €</span>
        <span class="preis__info" data-nur-einfuehrung>Einführungspreis bis 30.11.2026, danach 54,90 €</span>
        <a class="preis__klein" href="/versand-und-zahlung">inkl. 19 % MwSt., zzgl. 4,90 € Versand, Lieferzeit {LIEFERZEIT}</a>
      </div>
      <button class="knopf knopf--gross" type="button" data-hinzu="einzeln">{ICON["korb"]}In den Warenkorb</button>
    </div>
  </div>
  <div class="held__geraet" data-intro>
    {geraet_3d()}
    <div class="held__chips" aria-hidden="true">{chips}</div>
  </div>
  <div class="chips-mobil" aria-hidden="true">{chips}</div>
</section>
'''

# ---------- Interesse: Laufband ----------
WORTE = ["Gurkensalat", "Möhrenrohkost", "Krautsalat", "Rösti", "Kartoffelgratin", "Parmesan", "Zucchinipuffer", "Rotkohlsalat"]
spur = "".join(f'<span class="laufband__wort{" laufband__wort--voll" if i % 3 == 0 else ""}">{w}</span><i class="laufband__punkt"></i>' for i, w in enumerate(WORTE))
html += f'''
<div class="laufband" aria-hidden="true"><div class="laufband__spur"><div class="laufband__gruppe">{spur}</div><div class="laufband__gruppe">{spur}</div></div></div>
'''

# ---------- Interesse: Überblick ----------
html += '''
<section class="kapitel" id="ueberblick" aria-labelledby="u-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="u-titel">Alles, was ein Salat braucht.</h2>
  </div>
  <div class="blick">
    <div data-kipp class="blick__kachel glas zeigen"><span class="blick__zahl" data-zaehlen="5">5</span><span class="blick__text">Einsätze für Scheiben, Raspeln und feines Reiben</span></div>
    <div data-kipp class="blick__kachel glas zeigen" style="--d:60ms"><span class="blick__zahl"><span data-zaehlen="800">800</span><small>Watt</small></span><span class="blick__text">Motorleistung laut Hersteller</span></div>
    <div data-kipp class="blick__kachel glas zeigen" style="--d:120ms"><span class="blick__zahl"><span data-zaehlen="5">5</span><small>cm</small></span><span class="blick__text">breiter Einfüllschacht mit Stopfer</span></div>
    <div data-kipp class="blick__kachel glas zeigen" style="--d:180ms"><span class="blick__zahl"><span data-zaehlen="27">27</span><small>cm</small></span><span class="blick__text">hoch mit Schacht, Standfläche 17,5&nbsp;cm</span></div>
  </div>
</section>
'''

# ---------- Interesse: Geschichte ----------
html += '''
<section class="kapitel geschichte" aria-labelledby="g-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="g-titel">Gemüse rein.<span class="pille" aria-hidden="true"></span>Salat raus.</h2>
  </div>
  <p class="wortweise">Die meisten Salate scheitern nicht am Rezept, sondern am Schnippeln. Brett raus, Messer raus, Karotten raspeln, bis die Finger orange sind. HORTA macht daraus einen Handgriff: Einsatz wählen, Gemüse in den Schacht, oben drücken. Was unten herauskommt, landet direkt in Ihrer Schüssel.</p>
</section>
'''

# ---------- Verlangen: Probierstand ----------
ZUTATEN = [("gurke", "Gurke", "#4f8a3b"), ("karotte", "Karotte", "#ee8a2a"), ("kartoffel", "Kartoffel", "#e3c67c"),
           ("rotkohl", "Rotkohl", "#7b2f70"), ("kaese", "Käse", "#f0cf6a"), ("nuss", "Nüsse", "#8a5a33")]
zutaten = "".join(f'<label class="wahlchip"><input type="radio" name="zutat" value="{k}"{" checked" if k == "gurke" else ""}><span class="wahlchip__punkt" style="--f:{f}"></span>{n}</label>' for k, n, f in ZUTATEN)
einsaetze = "".join(f'<label class="wahlchip"><input type="radio" name="einsatz" value="{k}"{" checked" if k == "duenn" else ""}>{kegel_icon(k)}{n}</label>' for k, n, _ in EINSAETZE)
html += f'''
<section class="probier" id="probieren" aria-labelledby="p-titel">
  <div class="probier__innen">
    <div class="probier__text glas zeigen">
      <h2 id="p-titel">Probieren Sie es aus. <span class="leucht">Ganz ohne Abwasch.</span></h2>
      <p>Wählen Sie eine Zutat und einen Einsatz. Dann drücken Sie auf „Schneiden“, so wie oben auf den Knopf am Gerät.</p>
      <fieldset class="waehler"><legend>Zutat</legend><div class="waehler__reihe">{zutaten}</div></fieldset>
      <fieldset class="waehler waehler--einsatz"><legend>Einsatz</legend><div class="waehler__reihe">{einsaetze}</div></fieldset>
      <div class="probier__steuer">
        <button class="leise-knopf leise-knopf--gruen" type="button" data-schneiden>{ICON["knopf"]}Schneiden</button>
        <button class="text-knopf" type="button" data-leeren>Schüssel leeren</button>
      </div>
      <p class="probier__tipp" aria-live="polite" data-tipp><b>Gurke, dünne Scheiben:</b> Gurkensalat mit Dill und Joghurt.</p>
      <p class="probier__schuessel">In Ihrer Schüssel: <span data-salat-liste>noch nichts</span></p>
      <p class="hinweis-bildschirm">Vereinfachte Zeichnung. Große Stücke wie Kohl vorher grob teilen.</p>
    </div>
    <div class="probier__geraet">{geraet_svg("p", "Zeichnung zum Ausprobieren: HORTA von der Seite, das Gemüse fällt geschnitten in die Glasschüssel", probier=True)}</div>
  </div>
</section>
'''

# ---------- Verlangen: Funktionen ----------
leiste = "".join(f'<button type="button" data-einsatz="{k}" aria-pressed="{"true" if i == 0 else "false"}">{kegel_icon(k, gross=True)}<span>{n}</span></button>' for i, (k, n, _) in enumerate(EINSAETZE))
html += f'''
<section class="kapitel" id="funktionen" aria-labelledby="f-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="f-titel">Fünf Einsätze. <span class="leucht">Ein Handgriff.</span></h2>
    <p>Jeder Einsatz ist ein Kegel aus Edelstahl. Sie stecken ihn in die Trommel, und HORTA weiß, was zu tun ist.</p>
  </div>
  <div class="bento">
    <article data-kipp class="kachel kachel--einsaetze glas zeigen">
      <h3>Tippen Sie auf einen Einsatz.</h3>
      <div class="einsatz-leiste" role="group" aria-label="Die fünf Einsätze">{leiste}</div>
      <div class="einsatz__erklaerung" aria-live="polite">
        <p><b data-einsatz-name>{EINSAETZE[0][1]}</b></p>
        <p data-einsatz-text>{EINSAETZE[0][2]}</p>
        <p class="einsatz__passt">Passt zu: <b data-einsatz-passt>Gurke, Radieschen, Kartoffel</b></p>
      </div>
    </article>
    <article data-kipp class="kachel glas zeigen" style="--d:80ms">
      <div class="kachel__symbol">{ICON["knopf"]}</div>
      <h3>Oben drücken.</h3>
      <p>Der Startknopf sitzt auf dem Deckel. Drücken, mit dem Stopfer nachschieben, fertig.</p>
    </article>
    <article data-kipp class="kachel glas zeigen" style="--d:140ms">
      <div class="kachel__symbol">{ICON["motor"]}</div>
      <p class="gross">800<small>Watt</small></p>
      <p>Motorleistung laut Hersteller. Gedacht für Festes wie Karotten, Kartoffeln und Parmesan.</p>
    </article>
    <article data-kipp class="kachel glas zeigen" style="--d:200ms">
      <div class="kachel__symbol">{ICON["schacht"]}</div>
      <h3>Breiter Schacht.</h3>
      <p>Etwa 5 cm breit. Gurken und Karotten passen oft im Ganzen hinein, der Stopfer schiebt nach.</p>
    </article>
    <article data-kipp class="kachel glas zeigen" style="--d:260ms">
      <div class="kachel__symbol">{ICON["sauber"]}</div>
      <h3>Schnell wieder sauber.</h3>
      <p>Einsatz, Trommel und Schacht nehmen Sie ab und spülen sie unter dem Wasserhahn ab.</p>
    </article>
  </div>
</section>
'''

# ---------- Verlangen: Vom Markt bis auf den Teller ----------
SCHRITTE = [
    ("Waschen", "Gemüse waschen, Enden abschneiden, Großes wie Kohl grob teilen.", "linear-gradient(160deg,#eef5e6,#c9dfb6)", ICON["sauber"]),
    ("Einsatz wählen", "Kegel aufstecken, Trommel ansetzen und mit einer Drehung einrasten.", "linear-gradient(160deg,#f3f1ea,#d3d9d5)", kegel_icon("grob")),
    ("Einfüllen", "Gemüse in den Schacht legen und den Stopfer aufsetzen.", "linear-gradient(160deg,#fcefdf,#f3c38f)", ICON["schacht"]),
    ("Drücken", "Oben auf den Knopf drücken und mit dem Stopfer leicht nachschieben. Alles fällt in die Schüssel.", "linear-gradient(160deg,#fbeae4,#eeb39c)", ICON["knopf"]),
    ("Abspülen", "Stecker ziehen, Teile abnehmen, kurz abspülen. Das Gehäuse nur feucht abwischen.", "linear-gradient(160deg,#f1f6ec,#d3e4c6)", ICON["funkeln"]),
]
html += '''
<section class="kapitel" aria-labelledby="n-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="n-titel">Vom Markt <span class="leucht">bis auf den Teller.</span></h2>
  </div>
  <div class="schritte zeigen" role="group" aria-label="Der Ablauf in fünf Schritten">
'''
for i, (titel, text, bg, bild) in enumerate(SCHRITTE):
    offen = i == 0
    html += (f'    <button class="schritt{" ist-offen" if offen else ""}" type="button" aria-expanded="{"true" if offen else "false"}" style="--bg:{bg}">'
             f'<span class="schritt__bild" aria-hidden="true">{bild}</span>'
             f'<span class="schritt__inhalt"><span class="schritt__nr">Schritt {i + 1}</span><span class="schritt__titel">{titel}</span><span class="schritt__text">{text}</span></span></button>\n')
html += '  </div>\n</section>\n'

# ---------- Verlangen: Technik ----------
daten = [("Modell", "HORTA, HT-5"), ("Leistung", "800 W laut Hersteller"), ("Strom", "230 V, 50 Hz, Euro-Stecker"),
         ("Höhe", "ca. 27 cm mit Schacht, Gehäuse 18,5 cm"), ("Standfläche", "ca. 17,5 cm Durchmesser"),
         ("Einfüllschacht", "ca. 5 cm breit, mit Stopfer"), ("Einsätze", "5 Kegel, Klingen aus Edelstahl"),
         ("Gehäuse", "Edelstahl"), ("Schacht und Trommel", "Kunststoff, durchsichtig"), ("Bedienung", "Druckknopf auf dem Deckel")]
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
        <li>HORTA Grundgerät mit Motor</li>
        <li>5 Kegel-Einsätze aus Edelstahl</li>
        <li>Trommel mit Einfüllschacht</li>
        <li>Stopfer</li>
        <li>Bedienungsanleitung auf Deutsch</li>
        <li>Sicherheitshinweise</li>
      </ul>
    </div>
    <div class="stapel__karte glas gpsr">
      <h3>Produktsicherheit</h3>
      <p><strong>Hersteller:</strong> <span class="platzhalter">Beispiel Küchengeräte (Ningbo) Co., Ltd., Beispielstraße 8, Ningbo, China (fiktiv)</span></p>
      <p><strong>Verantwortliche Person in der EU:</strong> <span class="platzhalter">{FIRMA}, Beispielstraße 1, 00000 Musterstadt, {MAIL} (fiktiv)</span></p>
      <p><strong>Produkt:</strong> HORTA, Modell HT-5. Die Chargennummer steht auf dem Typenschild unter dem Gerät.</p>
      <p><strong>Lebensmittelkontakt:</strong> <span class="platzhalter">Alle Teile, die Lebensmittel berühren, sind nach Verordnung (EG) Nr. 1935/2004 dafür geeignet. Nachweis: Konformitätserklärung des Herstellers (vor dem Start anfordern).</span></p>
      <div class="warnung">
        <strong>Sicherheitshinweise</strong>
        <ul>
          <li>Die Klingen sind sehr scharf. Einsätze nur am Rand anfassen.</li>
          <li>Gemüse nur mit dem Stopfer nachschieben, nie mit den Fingern.</li>
          <li>Vor dem Wechseln der Einsätze und vor dem Reinigen den Netzstecker ziehen.</li>
          <li>Das Gerät ist nicht für Kinder bestimmt. Gerät und Kabel außer Reichweite von Kindern aufbewahren.</li>
          <li>Das Gehäuse mit dem Motor nie in Wasser tauchen.</li>
        </ul>
      </div>
    </div>
  </div>
</section>
'''

# ---------- Verlangen: Bewertungen (erfundene Beispiele, vor dem Start löschen) ----------
R = [
    (5, "Möhrensalat ohne orange Finger", "Früher habe ich Karotten mit der Handreibe geraspelt und mir regelmäßig die Fingerknöchel gleich mit. Jetzt kommen die Karotten oben rein und unten kommt Möhrensalat raus. Meine Kinder essen ihn plötzlich freiwillig.", "Sandra P.", "2026-10-06", 31),
    (5, "Krautsalat wie beim Griechen", "Mit dem feinen Raspeleinsatz wird der Weißkohl so fein, wie ich es von Hand nie hinbekomme. Den Kohl muss man vorher in Viertel schneiden, dann passt er gut in den Schacht.", "Murat Y.", "2026-10-03", 27),
    (4, "Sehr gut, Kohl vorher teilen", "Funktioniert prima. Einen ganzen Kohlkopf muss man vorher in Stücke schneiden, sonst passt er nicht in den Schacht. Steht aber auch so in der Anleitung.", "Bernd A.", "2026-10-01", 12),
    (5, "Rösti am Sonntag", "Grob raspeln, ausdrücken, ab in die Pfanne. Kartoffeln für vier Personen sind schnell durch. Das Gerät steht seitdem auf der Arbeitsplatte und nicht mehr im Schrank.", "Heike L.", "2026-09-29", 22),
    (5, "Parmesan frisch über die Pasta", "Die feine Reibe macht aus einem Stück Parmesan einen kleinen Berg. Geht auch mit Walnüssen für den Kuchen.", "Giulia R.", "2026-09-27", 9),
    (3, "Lieferzeit war mir zu lang", "Das Gerät ist gut, aber 14 Tage Lieferzeit sind mir zu lang. Ich hätte es gern zum Wochenende gehabt.", "Kerstin B.", "2026-09-25", 8, "Danke für Ihre ehrliche Rückmeldung. Wir versenden direkt aus China und nennen die Lieferzeit deshalb schon vor dem Kauf."),
    (5, "Gut zu reinigen", "Einsatz abziehen, Trommel abnehmen, unter dem Wasserhahn mit einer Spülbürste ausbürsten. Ich hatte mehr Arbeit erwartet.", "Peter H.", "2026-09-23", 14),
    (5, "Gurkensalat wie bei Oma", "Hauchdünne Gurkenscheiben, alle gleich dick. Meine Mutter wollte wissen, wo ich so gut schneiden gelernt habe.", "Nina W.", "2026-09-20", 25),
    (4, "Reibe braucht eine Bürste", "Die feine Reibe muss man mit einer Bürste säubern, sonst bleibt Käse in den Löchern. Sonst alles super.", "Svenja K.", "2026-09-18", 11, "Danke für den Tipp. Am leichtesten geht es, wenn Sie den Einsatz direkt nach dem Reiben unter warmes Wasser halten."),
    (5, "Stabil und standfest", "Das Gehäuse ist aus Metall und wackelt nicht, auch bei harten Karotten nicht. Es steht sicher auf der Arbeitsplatte.", "Andreas K.", "2026-09-16", 7),
    (5, "Meal Prep am Sonntag", "Ich schneide jeden Sonntag Gemüse für die ganze Woche. Zucchini, Karotten, Rotkohl. Früher stand ich dafür ewig am Brett.", "Jan S.", "2026-09-14", 16),
    (4, "Lieferung hat gedauert", "Das Paket kam nach 13 Werktagen. Das stand vorher auf der Seite, also kein Grund zur Klage. Das Gerät selbst ist gut.", "Holger S.", "2026-09-12", 10),
    (5, "Ideal für Rohkost", "Wir essen viel Rohkost. Rote Bete, Kohlrabi, Apfel. Alles klappt mit dem groben Einsatz.", "Claudia B.", "2026-09-10", 6),
    (5, "Darf stehen bleiben", "Sieht in Edelstahl richtig ordentlich aus. Die durchsichtige Trommel ist praktisch, weil man sieht, was passiert.", "Lukas F.", "2026-09-08", 5),
    (5, "Geschenk für meinen Vater", "Mein Vater kommt mit der Handreibe nicht mehr gut zurecht. Mit HORTA drückt er oben auf den Knopf und schiebt mit dem Stopfer nach. Er hat sich sehr gefreut.", "Daniela F.", "2026-09-06", 13),
    (4, "Beim Raspeln recht laut", "Beim Raspeln ist er recht laut, aber das dauert ja nicht lange. Ergebnis und Verarbeitung sind gut.", "Uwe D.", "2026-09-04", 6),
    (5, "Kartoffelgratin", "Dicke Scheiben, alle gleich, alles gart gleichmäßig. Das war mit dem Messer nie so.", "Monika D.", "2026-09-02", 8),
    (5, "Schokoraspel für den Kuchen", "Die feine Reibe nehme ich für Zartbitterschokolade auf dem Kuchen. Klappt am besten, wenn die Schokolade kalt ist.", "Emma T.", "2026-08-30", 4),
    (3, "Weicher Käse verklebt", "Junger Gouda verklebt die Reibe. Mit Parmesan klappt es gut.", "Stefan O.", "2026-08-28", 9, "Danke. Weicheren Käse vorher 20 Minuten ins Gefrierfach legen, dann lässt er sich besser raspeln."),
    (5, "Schnell aufgebaut", "Auspacken, Einsatz rein, Trommel einrasten, fertig. Die deutsche Anleitung ist kurz und verständlich.", "Frank M.", "2026-08-26", 6),
    (5, "Krautsalat für das Grillfest", "Zwei Köpfe Weißkohl für zwanzig Leute. Ohne HORTA hätte ich mich das nicht getraut.", "Thomas G.", "2026-08-23", 12),
    (4, "Kleines Reststück", "Am Ende bleibt ein kleines Stück Gemüse übrig, das nicht mehr erfasst wird. Das esse ich dann einfach.", "Tanja F.", "2026-08-21", 5),
    (5, "Passt in unsere kleine Küche", "Wir haben wenig Platz. Das Gerät braucht kaum Stellfläche und passt unter den Hängeschrank.", "Sophie N.", "2026-08-19", 7),
    (5, "Zucchinipuffer", "Zucchini grob raspeln, salzen, ausdrücken. Die Puffer gibt es bei uns jetzt jede Woche.", "Katrin O.", "2026-08-16", 6),
    (4, "Für zwei fast zu groß", "Für unseren Zwei-Personen-Haushalt fast schon zu groß, aber wenn Gäste kommen, ist es super.", "Markus L.", "2026-08-14", 3),
    (5, "Rotkohl ohne lila Hände", "Rotkohl fein raspeln war immer eine Sauerei. Jetzt landet alles in der Schüssel und meine Hände bleiben sauber.", "Julia E.", "2026-08-12", 19),
    (5, "Wie auf den Bildern", "Genau wie auf den Bildern. Die Einsätze sitzen fest, nichts klappert.", "Dennis V.", "2026-08-09", 4),
    (4, "Gute Verarbeitung", "Der Edelstahl wirkt hochwertig. Der Kunststoff der Trommel ist etwas dünner, als ich dachte, hält aber bisher.", "Petra G.", "2026-08-07", 6),
    (5, "Reibekuchen wie früher", "Kartoffeln mit dem feinen Einsatz, dazu eine Zwiebel. Reibekuchen wie auf dem Weihnachtsmarkt.", "Renate J.", "2026-08-05", 8),
    (4, "Tomaten gehen nicht", "Wer Tomaten schneiden will, ist hier falsch. Für alles Feste aber top.", "Ralf W.", "2026-08-02", 7, "Danke, das stimmt. Für weiches Obst und Gemüse ist HORTA nicht gedacht. Das haben wir in den Fragen ergänzt."),
    (5, "Mittags eine Bowl", "Ich esse mittags fast jeden Tag eine Bowl. Karotte, Rotkohl und Gurke sind schnell geschnitten.", "Mia H.", "2026-07-30", 5),
    (5, "Schafft auch Rote Bete", "Auch harte Rote Bete schafft er ohne Murren. Am besten mit Handschuhen einfüllen, die Farbe geht ja überall hin.", "Oliver P.", "2026-07-27", 6),
    (3, "Stopfer könnte länger sein", "Das letzte Stück Karotte bekomme ich nicht ganz durch. Sonst in Ordnung.", "Anja R.", "2026-07-24", 4),
    (5, "Alles im Karton", "Fünf Einsätze, Stopfer, Trommel, alles da. Die Einsätze bewahre ich in einer Dose auf.", "Laura Z.", "2026-07-20", 3),
    (4, "Ordentlich", "Macht, was er soll. Ein Fach für die Einsätze hätte ich mir gewünscht.", "Ines M.", "2026-07-16", 4),
    (5, "Besser als der Aufsatz meiner Küchenmaschine", "Der Aufsatz meiner Küchenmaschine war umständlich. Hier ist alles in einem Gerät und schnell sauber.", "Michael R.", "2026-07-11", 10),
]
bew = []
for i, r in enumerate(R, 1):
    e = {"id": i, "sterne": r[0], "titel": r[1], "text": r[2], "name": r[3], "datum": r[4], "hilfreich": r[5], "beispiel": True}
    if len(r) > 6:
        e["antwort"] = r[6]
    bew.append(e)
bew_json = json.dumps(bew, ensure_ascii=False, indent=1)

html += '''
<section class="kapitel" id="bewertungen" aria-labelledby="r-titel">
  <div class="kapitel__kopf zeigen">
    <h2 id="r-titel">Was Käufer über HORTA sagen.</h2>
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
''' + bew_json + '''
  </script>
</section>
'''

# ---------- Handlung: Angebot ----------
html += f'''
<section class="kapitel" id="angebot" aria-labelledby="o-titel">
  <div class="angebot">
    <div class="angebot__bild glas wachsen">
      <span class="foto-hinweis">Entwurf: Foto vom Lieferanten</span>
      <img src="/assets/img/produkt-entwurf.jpg" width="370" height="440" loading="lazy" data-skala alt="HORTA aus Edelstahl mit durchsichtigem Schacht, aus der Trommel fallen geraspelte Zucchini in eine Glasschüssel">
    </div>
    <div class="glas angebot__box zeigen">
      <h2 id="o-titel">Ihr Salat <span class="leucht">wartet schon.</span></h2>
      <form id="angebot-form" action="/kasse" method="get">
        <fieldset class="wahl">
          <legend>Paket</legend>
          <label class="option">
            <input type="radio" name="paket" value="einzeln" checked>
            <span class="option__punkt"></span>
            <span class="option__name">Ein HORTA</span>
            <span class="option__preis"><span data-preis="einzeln">44,90 €</span><small data-nur-einfuehrung>bis 30.11.2026</small></span>
            <span class="option__zusatz">Plus 4,90 € Versand</span>
          </label>
          <label class="option">
            <input type="radio" name="paket" value="set">
            <span class="option__punkt"></span>
            <span class="option__name">2er-Set</span>
            <span class="option__preis"><span data-preis="set">75,90 €</span><small>15 % günstiger als zwei einzeln</small></span>
            <span class="option__zusatz">Eins für Sie, eins zum Verschenken. Versand kostenlos.</span>
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
        <div class="summe"><span>Summe inkl. MwSt.</span><strong data-feld="angebot-summe">44,90 €</strong></div>
        <button class="knopf knopf--gross knopf--breit" type="submit">{ICON["korb"]}In den Warenkorb</button>
        <div class="fakten">
          <div><b>Versand</b><span>aus China, {LIEFERZEIT}, Zoll inklusive</span></div>
          <div><b>Zahlung</b><span>PayPal, Klarna</span></div>
          <div><b>Ab 49 €</b><span>Versand kostenlos</span></div>
        </div>
        <p class="kleingedruckt" style="margin-top:1rem">Einführungspreis bis 30.11.2026, danach 54,90 € je Gerät (Set: 92,90 €). Preise inkl. 19 % MwSt. Zoll und Einfuhrabgaben sind enthalten. Informationen zum Widerruf finden Sie in der <a href="/widerrufsbelehrung">Widerrufsbelehrung</a>.</p>
      </form>
    </div>
  </div>
</section>
'''

# ---------- Fragen ----------
einsatz_liste = "".join(f"<li><b>{n}:</b> {t[4:] if t.startswith('Für ') else t}</li>" for _, n, t in EINSAETZE)
fragen = [
    ("Was kann ich mit HORTA schneiden?", "Alles, was fest ist: Gurke, Karotte, Zucchini, Kartoffel, Rote Bete, Kohl, Kohlrabi und Apfel, dazu Hartkäse, Nüsse und Schokolade. Weiches wie Tomaten oder reife Bananen und auch Fleisch sind nicht geeignet."),
    ("Welchen Einsatz nehme ich wofür?", f"<ul class=\"liste\">{einsatz_liste}</ul>"),
    ("Muss ich das Gemüse vorher klein schneiden?", "Der Einfüllschacht ist etwa 5 cm breit. Gurke, Karotte und Zucchini passen meist im Ganzen oder halbiert hinein. Kohl, große Kartoffeln und Rote Bete teilen Sie vorher in passende Stücke."),
    ("Wie reinige ich das Gerät?", "Ziehen Sie zuerst den Netzstecker. Einsatz, Trommel, Schacht und Stopfer lassen sich abnehmen und unter fließendem Wasser mit einer Spülbürste reinigen. Das Gehäuse mit dem Motor nur feucht abwischen und nie in Wasser tauchen. Ob einzelne Teile in die Spülmaschine dürfen, steht in der Anleitung."),
    ("Passt der Stecker in deutsche Steckdosen?", "Ja. HORTA hat einen Euro-Stecker und läuft mit 230 Volt."),
    ("Wie lange dauert die Lieferung?", f"Wir versenden direkt aus China. Die Lieferung dauert in der Regel {LIEFERZEIT}. Zoll und Einfuhrabgaben sind im Preis enthalten, an der Haustür zahlen Sie nichts extra. Der Versand kostet 4,90 €, ab 49 € Bestellwert ist er kostenlos."),
    ("Kann ich die Bestellung widerrufen?", "Als Verbraucher haben Sie ein gesetzliches Widerrufsrecht von 14 Tagen. Die Rücksendung geht an eine Adresse in Deutschland, nicht nach China. Die Einzelheiten stehen in der <a href=\"/widerrufsbelehrung\">Widerrufsbelehrung</a>. Den Widerruf können Sie auch online über die Seite <a href=\"/widerrufen\">Vertrag widerrufen</a> erklären."),
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
    inhalt = a if a.startswith("<ul") else f"<p>{a}</p>"
    html += f'    <details class="frage"><summary>{q}<i aria-hidden="true"></i></summary><div class="frage__antwort">{inhalt}</div></details>\n'
html += '  </div>\n</section>\n'

# ---------- Abschied: der Tisch ist gedeckt ----------
html += f'''
<section class="abschied" aria-labelledby="gn-titel">
  <div class="abschied__szene" aria-hidden="true"><i class="abschied__licht"></i><i class="abschied__tisch"></i>
    <div class="abschied__schale">{schale_svg("a", "Glasschüssel mit Salat")}</div>
  </div>
  <div class="abschied__text">
    <span class="marke">Bis zum nächsten Salat</span>
    <h2 id="gn-titel">Der Tisch ist gedeckt. <span class="leucht">Guten Appetit.</span></h2>
    <p data-salat-satz>Ein Salat aus <b>Gurke, Karotte und Rotkohl</b> ist mit HORTA schnell geschnitten. Jetzt fehlt nur noch das Dressing.</p>
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
    <div class="feldgruppe"><label for="bw-nr">Bestellnummer, zur Prüfung (wird nicht angezeigt)</label><input class="feld" id="bw-nr" name="bestellnr" type="text" maxlength="30" placeholder="HT-20261005-ABC123" required></div>
    <label class="haken"><input type="checkbox" name="einwilligung" value="ja" required><span>Ich bin einverstanden, dass meine Bewertung mit dem angegebenen Namen auf dieser Seite erscheint. Mehr dazu in der <a href="/datenschutz">Datenschutzerklärung</a>.</span></label>
    <button class="leise-knopf" type="submit">Bewertung senden</button>
    <p class="meldung" role="status" aria-live="polite"></p>
  </form>
</dialog>
'''

html += '''<div class="kaufleiste" role="region" aria-label="Schnellkauf">
  <div><b data-preis="einzeln">44,90 €</b><small>inkl. MwSt.</small></div>
  <button class="knopf" type="button" data-hinzu="einzeln">In den Warenkorb</button>
</div>
'''
html += SKRIPT
seite("index.html", html)
