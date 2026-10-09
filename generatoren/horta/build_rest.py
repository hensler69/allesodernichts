from bausteine import *

HONIG = '<div class="honig-feld" aria-hidden="true"><label>Bitte leer lassen<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>'


def feld(id_, label, name, fehler, typ="text", auto="", extra="", voll=False, pflicht=True):
    auto_attr = f' autocomplete="{auto}"' if auto else ""
    pflicht_attr = " required" if pflicht else ""
    klasse = " voll" if voll else ""
    return (f'<div class="feldgruppe{klasse}"><label for="{id_}">{label}</label>'
            f'<input class="feld" id="{id_}" name="{name}" type="{typ}"{auto_attr}{pflicht_attr} data-fehler="{fehler}"{extra}>'
            f'<div class="fehlertext" aria-live="polite"></div></div>')


# ---------------- Kasse ----------------
k = head("Kasse | HORTA", "Ihre Bestellung bei HORTA prüfen und zahlungspflichtig abschicken.", "/kasse") + WELT + ENTWURF + kopf(False)
k += f'''<main id="inhalt" class="kasse">
<h1>Kasse</h1>
<div class="leere-kasse glas" hidden><p><strong>Ihr Warenkorb ist leer.</strong></p><p><a class="knopf" href="/">Zurück zum Gemüseschneider</a></p></div>
<div class="kasse__raster" hidden>
  <form id="kasse-form" class="glas kasse__form" action="/send.php" method="post" novalidate>
    <input type="hidden" name="art" value="bestellung">
    <input type="hidden" name="einzeln" value="0">
    <input type="hidden" name="set" value="0">
    <input type="hidden" name="gutschein" value="">
    {HONIG}
    <fieldset>
      <legend>Lieferadresse</legend>
      <div class="felder">
        {feld("vorname", "Vorname", "vorname", "Bitte Vornamen eingeben.", auto="given-name")}
        {feld("nachname", "Nachname", "nachname", "Bitte Nachnamen eingeben.", auto="family-name")}
        {feld("strasse", "Straße und Hausnummer", "strasse", "Bitte Straße und Hausnummer eingeben.", auto="street-address", voll=True)}
        {feld("plz", "Postleitzahl", "plz", "Bitte eine fünfstellige Postleitzahl eingeben.", auto="postal-code", extra=' inputmode="numeric" pattern="[0-9]{5}" maxlength="5"')}
        {feld("ort", "Ort", "ort", "Bitte Ort eingeben.", auto="address-level2")}
        <div class="feldgruppe voll"><label for="land">Land</label><select class="feld" id="land" name="land"><option>Deutschland</option></select></div>
        {feld("email", "E-Mail-Adresse für die Bestätigung", "email", "Bitte eine gültige E-Mail-Adresse eingeben.", typ="email", auto="email", voll=True)}
      </div>
    </fieldset>
    <fieldset>
      <legend>Zahlungsart</legend>
      <div class="feldgruppe">
        <div class="zahlart" role="radiogroup" aria-label="Zahlungsart">
          <label class="option"><input type="radio" name="zahlart" value="PayPal" required data-fehler="Bitte eine Zahlungsart wählen."><span class="option__punkt"></span><span class="option__name">PayPal</span><span></span><span class="option__zusatz">Sie erhalten nach der Bestellung den Zahlungslink per E-Mail.</span></label>
          <label class="option"><input type="radio" name="zahlart" value="Klarna" required data-fehler="Bitte eine Zahlungsart wählen."><span class="option__punkt"></span><span class="option__name">Klarna</span><span></span><span class="option__zusatz">Sie erhalten nach der Bestellung den Zahlungslink per E-Mail.</span></label>
        </div>
        <div class="fehlertext" aria-live="polite"></div>
      </div>
    </fieldset>
    <fieldset>
      <legend>Zum Schluss</legend>
      <div class="feldgruppe">
        <label class="haken"><input type="checkbox" name="agb" value="ja" required data-fehler="Bitte bestätigen Sie die AGB und die Widerrufsbelehrung."><span>Ich habe die <a href="/agb" target="_blank" rel="noopener">AGB</a> und die <a href="/widerrufsbelehrung" target="_blank" rel="noopener">Widerrufsbelehrung</a> gelesen und bin einverstanden.</span></label>
        <div class="fehlertext" aria-live="polite"></div>
      </div>
      <p class="rechtliches">Mit Ihrer Bestellung geben Sie ein verbindliches Angebot ab und verpflichten sich zur Zahlung. Wir verarbeiten Ihre Daten gemäß der <a href="/datenschutz">Datenschutzerklärung</a>.</p>
    </fieldset>
    <p class="rechtliches" data-feld="bestell-kurz"></p>
    <p class="rechtliches">Lieferzeit: {LIEFERZEIT} ab Zahlungseingang, Versand direkt aus China. Zoll und Einfuhrabgaben sind enthalten.</p>
    <div class="summe"><span>Gesamtbetrag inkl. MwSt.</span><strong data-feld="gesamt-knopf">0,00 €</strong></div>
    <button class="knopf knopf--gross knopf--breit" type="submit">zahlungspflichtig bestellen</button>
    <p class="meldung" role="status" aria-live="polite"></p>
  </form>
  <aside class="glas kasse__seite" aria-label="Ihre Bestellung">
    <h2>Ihre Bestellung</h2>
    <div class="kasse__posten"></div>
    <div class="gutschein">
      <label class="sr" for="gutschein">Gutscheincode</label>
      <input class="feld" id="gutschein" type="text" placeholder="Gutscheincode" autocomplete="off">
      <button class="leise-knopf" type="button" data-gutschein>Einlösen</button>
    </div>
    <p class="meldung gutschein-meldung" role="status" aria-live="polite"></p>
    <div class="zeile" data-feld="rabatt-zeile" hidden><span>Gutschein</span><span data-feld="rabatt"></span></div>
    <div class="zeile"><span>Versand</span><span data-feld="versand"></span></div>
    <div class="zeile zeile--gesamt"><span>Gesamt</span><span data-feld="gesamt"></span></div>
    <div class="zeile kleingedruckt"><span>darin 19 % MwSt.</span><span data-feld="mwst"></span></div>
    <div class="merkmale"><strong>Entwurf:</strong> PayPal und Klarna sind noch nicht angeschlossen. Die Bestellung geht per E-Mail ein, der Zahlungslink folgt danach.</div>
    <p class="kleingedruckt"><a href="/versand-und-zahlung">Versand und Zahlung</a></p>
  </aside>
</div>
</main>
''' + SKRIPT
seite("kasse.html", k)

# ---------------- Danke ----------------
d = head("Danke für Ihre Bestellung | HORTA", "Ihre Bestellung bei HORTA ist eingegangen.", "/danke") + WELT + ENTWURF + kopf(False)
d += f'''<main id="inhalt" class="danke">
{geraet_svg("d", "Zeichnung: HORTA mit einer Glasschüssel voller Salat", lagen=SALAT, extra=' data-intro-lagen')}
<h1 class="held__an" style="--i:1">Danke. <span class="leucht">Der Salat kann kommen.</span></h1>
<p class="held__an" style="--i:2">Ihre Bestellung ist bei uns eingegangen. Eine Bestätigung ist per E-Mail unterwegs. Sie ist noch keine Annahme der Bestellung. Der Vertrag kommt zustande, sobald wir den Versand bestätigen.</p>
<p class="held__an" style="--i:3">Ihr Paket kommt direkt aus China. Die Lieferzeit beträgt in der Regel {LIEFERZEIT}. Sobald es unterwegs ist, schicken wir Ihnen die Sendungsnummer.</p>
<p class="held__an" style="--i:4">Ihre Bestellnummer: <span class="bestellnr">HT-0</span></p>
<p class="held__an" style="--i:5"><a class="leise-knopf" href="/">Zurück zur Startseite</a></p>
</main>
''' + SKRIPT
seite("danke.html", d)

# ---------------- Vertrag widerrufen ----------------
textseite("widerrufen.html", "/widerrufen", "Vertrag widerrufen", "Online-Widerruf: Erklären Sie hier den Widerruf Ihres Vertrags mit HORTA.", "Vertrag widerrufen", f'''
<p>Verbraucher können Verträge mit uns innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen. Füllen Sie das Formular aus und klicken Sie auf „Widerruf bestätigen“. Danach erhalten Sie sofort eine Bestätigung mit Datum und Uhrzeit per E-Mail.</p>
<p>Die Einzelheiten stehen in der <a href="/widerrufsbelehrung">Widerrufsbelehrung</a>.</p>
<form id="widerruf-form" class="glas formular" action="/send.php" method="post" novalidate>
  <input type="hidden" name="art" value="widerruf">
  {HONIG}
  <div class="feldgruppe"><label for="w-name">Ihr Name</label><input class="feld" id="w-name" name="name" type="text" autocomplete="name" required></div>
  <div class="feldgruppe"><label for="w-mail">Ihre E-Mail-Adresse</label><input class="feld" id="w-mail" name="email" type="email" autocomplete="email" required></div>
  <div class="feldgruppe"><label for="w-nr">Bestellnummer (aus der Bestätigungsmail) oder Bestelldatum</label><input class="feld" id="w-nr" name="bestellnr" type="text" maxlength="60" required></div>
  <div class="feldgruppe"><label for="w-art">Welche Ware betrifft der Widerruf? (freiwillig)</label><input class="feld" id="w-art" name="ware" type="text" maxlength="120" placeholder="Zum Beispiel: 1 × HORTA"></div>
  <button class="knopf" type="submit">Widerruf bestätigen</button>
  <p class="meldung" role="status" aria-live="polite"></p>
</form>
''')

# ---------------- Impressum ----------------
textseite("impressum.html", "/impressum", "Impressum", "Impressum des Online-Shops HORTA (Entwurf mit erfundenen Angaben).", "Impressum", '''
<p class="glas" style="padding:1.2rem 1.6rem"><strong>Entwurf.</strong> Alle Angaben auf dieser Seite sind erfunden. Vor einer Veröffentlichung müssen sie durch die echten Angaben des Betreibers ersetzt und rechtlich geprüft werden.</p>
<h2>Angaben gemäß § 5 DDG</h2>
<p><span class="platzhalter">Horta Küche GmbH</span><br><span class="platzhalter">Beispielstraße 1</span><br><span class="platzhalter">00000 Musterstadt</span></p>
<p>Vertreten durch die Geschäftsführung: <span class="platzhalter">Max Mustermann</span></p>
<h2>Kontakt</h2>
<p>E-Mail: <span class="platzhalter">kontakt@horta.example</span><br>Telefon: <span class="platzhalter">0000 000 000 0</span></p>
<h2>Registereintrag</h2>
<p>Handelsregister: <span class="platzhalter">Amtsgericht Musterstadt, HRB 00000</span><br>Umsatzsteuer-Identifikationsnummer nach § 27a UStG: <span class="platzhalter">DE000000000</span></p>
<h2>Verbraucherstreitbeilegung</h2>
<p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>Elektro- und Verpackungsrecht</h2>
<p>Registrierung bei der Stiftung ear (WEEE-Reg.-Nr.): <span class="platzhalter">DE 00000000</span><br>Registrierung im Verpackungsregister LUCID: <span class="platzhalter">DE0000000000000</span></p>
<h2>Verantwortlich für den Inhalt</h2>
<p><span class="platzhalter">Max Mustermann</span>, Anschrift wie oben.</p>
''')

# ---------------- Datenschutz ----------------
textseite("datenschutz.html", "/datenschutz", "Datenschutz", "Datenschutzerklärung des Online-Shops HORTA (Entwurf).", "Datenschutz", '''
<p class="glas" style="padding:1.2rem 1.6rem"><strong>Entwurf.</strong> Dieser Text ist eine Arbeitsgrundlage und muss vor einer Veröffentlichung an die tatsächlichen Dienste angepasst und rechtlich geprüft werden.</p>
<h2>Verantwortlicher</h2>
<p><span class="platzhalter">Horta Küche GmbH, Beispielstraße 1, 00000 Musterstadt</span>, E-Mail: <span class="platzhalter">kontakt@horta.example</span></p>
<h2>Hosting und Server-Protokolle</h2>
<p>Diese Seite wird bei <span class="platzhalter">[Hosting-Anbieter eintragen]</span> betrieben. Beim Aufruf speichert der Server kurzzeitig technische Daten, zum Beispiel die IP-Adresse, Datum, Uhrzeit und die aufgerufene Seite. Das ist für den sicheren Betrieb erforderlich (Art. 6 Abs. 1 lit. f DSGVO).</p>
<h2>Schriften, Cookies und Tracking</h2>
<p>Alle Schriften liegen auf unserem eigenen Server. Es werden keine Daten an Schriftendienste übertragen. Wir setzen keine Werbe- und keine Analyse-Cookies ein.</p>
<p>Ihr Warenkorb wird im lokalen Speicher Ihres Browsers abgelegt (Local Storage), damit er beim Neuladen erhalten bleibt. Diese Daten verlassen Ihr Gerät nicht. Die Speicherung ist für den Bestellvorgang erforderlich.</p>
<p>Wenn Sie auf der Startseite im Probierstand Zutaten in die Schüssel schneiden, merkt sich Ihr Browser diese Auswahl ebenfalls im lokalen Speicher, damit Ihre Schüssel beim nächsten Besuch wieder da ist. Auch diese Angabe verlässt Ihr Gerät nicht. Sie löschen sie mit „Schüssel leeren“ oder über die Einstellungen Ihres Browsers.</p>
<h2>Bestellung</h2>
<p>Für Ihre Bestellung verarbeiten wir Name, Anschrift, E-Mail-Adresse, bestellte Ware und gewählte Zahlungsart. Rechtsgrundlage ist die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO). Daten, die handels- und steuerrechtlich aufbewahrt werden müssen, speichern wir bis zum Ablauf der Fristen (Art. 6 Abs. 1 lit. c DSGVO).</p>
<h2>Versand und Zahlung</h2>
<p>Wir versenden direkt aus China. Zur Lieferung geben wir Name und Lieferanschrift an unseren Lieferanten <span class="platzhalter">[Lieferant in China eintragen]</span> und an das beauftragte Versandunternehmen weiter. Die Übermittlung in ein Land außerhalb der EU ist zur Erfüllung des Kaufvertrags erforderlich (Art. 49 Abs. 1 lit. b DSGVO). Bei Zahlung per PayPal oder Klarna erhalten die Anbieter die für die Zahlung nötigen Daten. Es gelten deren Datenschutzerklärungen.</p>
<h2>Newsletter</h2>
<p>Wenn Sie sich anmelden, schicken wir Ihnen zuerst eine Mail mit einem Bestätigungslink (Double-Opt-in). Erst nach Ihrer Bestätigung erhalten Sie den Gutschein und den Newsletter. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können sie jederzeit widerrufen, zum Beispiel per Mail an uns oder über den Abmeldelink.</p>
<h2>Bewertungen</h2>
<p>Wenn Sie eine Bewertung schreiben, verarbeiten wir Sterne, Überschrift, Text, Namen, E-Mail-Adresse und Bestellnummer. Die E-Mail-Adresse und die Bestellnummer nutzen wir nur, um zu prüfen, ob Sie bei uns gekauft haben, und für Rückfragen. Veröffentlicht werden nur Sterne, Überschrift, Text, der angegebene Name und das Datum. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit widerrufen können. Dann löschen wir die Bewertung.</p>
<p>Ob Sie eine Bewertung als hilfreich markiert haben, speichern wir nur im lokalen Speicher Ihres Browsers. Diese Angabe verlässt Ihr Gerät nicht.</p>
<h2>Widerruf per Formular</h2>
<p>Beim Online-Widerruf verarbeiten wir Name, E-Mail-Adresse, Bestellnummer und den Zeitpunkt Ihrer Erklärung, um den Widerruf zu bestätigen und abzuwickeln.</p>
<h2>Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Sächsischen Datenschutz- und Transparenzbeauftragten.</p>
''')

# ---------------- AGB ----------------
textseite("agb.html", "/agb", "AGB", "Allgemeine Geschäftsbedingungen des Online-Shops HORTA (Entwurf).", "Allgemeine Geschäftsbedingungen", f'''
<p class="glas" style="padding:1.2rem 1.6rem"><strong>Entwurf.</strong> Muster für einen Einzelhändler mit einem Produkt. Vor der Veröffentlichung rechtlich prüfen lassen.</p>
<h2>1. Geltung</h2>
<p>Diese Bedingungen gelten für alle Bestellungen von Verbrauchern im Online-Shop der <span class="platzhalter">Horta Küche GmbH</span>. Wir liefern nur nach Deutschland.</p>
<h2>2. Vertragsschluss</h2>
<p>Die Darstellung der Ware ist kein verbindliches Angebot. Mit dem Klick auf „zahlungspflichtig bestellen“ geben Sie ein verbindliches Angebot ab. Die Bestätigungsmail über den Eingang der Bestellung ist noch keine Annahme. Der Vertrag kommt zustande, wenn wir die Annahme erklären oder die Ware versenden und dies per E-Mail bestätigen.</p>
<h2>3. Preise und Versandkosten</h2>
<p>Alle Preise sind Endpreise in Euro und enthalten die gesetzliche Mehrwertsteuer. Dazu kommen Versandkosten von 4,90 €. Ab einem Warenwert von 49,00 € liefern wir versandkostenfrei. Zölle und Einfuhrabgaben tragen wir. Der Einführungspreis gilt bis zum 30.11.2026.</p>
<h2>4. Zahlung</h2>
<p>Sie können mit PayPal oder Klarna bezahlen. Es gelten zusätzlich die Bedingungen des jeweiligen Zahlungsanbieters.</p>
<h2>5. Lieferung</h2>
<p>Die Lieferung erfolgt direkt aus China an die angegebene Lieferadresse in Deutschland. Die Lieferzeit beträgt in der Regel {LIEFERZEIT} nach Vertragsschluss und Zahlungseingang.</p>
<h2>6. Eigentumsvorbehalt</h2>
<p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
<h2>7. Mängelrechte</h2>
<p>Es gelten die gesetzlichen Mängelrechte.</p>
<h2>8. Haftung</h2>
<p>Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper und Gesundheit. Bei einfacher Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten und nur für den vorhersehbaren, typischen Schaden. Das Produkthaftungsgesetz bleibt unberührt.</p>
<h2>9. Streitbeilegung</h2>
<p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>10. Schlussbestimmungen</h2>
<p>Es gilt deutsches Recht. Zwingende Verbraucherschutzvorschriften des Staates, in dem Sie Ihren gewöhnlichen Aufenthalt haben, bleiben unberührt. Text der Vertragsbedingungen: Wir speichern den Vertragstext nicht für Sie. Sie können diese Seite ausdrucken oder speichern.</p>
''')

# ---------------- Widerrufsbelehrung ----------------
textseite("widerrufsbelehrung.html", "/widerrufsbelehrung", "Widerrufsbelehrung", "Widerrufsbelehrung und Muster-Widerrufsformular des Online-Shops HORTA (Entwurf).", "Widerrufsbelehrung", '''
<p class="glas" style="padding:1.2rem 1.6rem"><strong>Entwurf.</strong> Die Belehrung folgt dem gesetzlichen Muster. Firmenangaben sind erfunden.</p>
<h2>Widerrufsrecht</h2>
<p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat. Bei mehreren Waren in einer Bestellung, die getrennt geliefert werden, beginnt die Frist mit dem Erhalt der letzten Ware.</p>
<p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (<span class="platzhalter">Horta Küche GmbH, Beispielstraße 1, 00000 Musterstadt, kontakt@horta.example</span>) mittels einer eindeutigen Erklärung (zum Beispiel ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Sie können den Widerruf auch online über die Seite <a href="/widerrufen">Vertrag widerrufen</a> erklären.</p>
<p>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
<h2>Folgen des Widerrufs</h2>
<p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart. Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.</p>
<p>Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an <span class="platzhalter">Horta Küche GmbH, Rücksendungen, Beispielstraße 1, 00000 Musterstadt</span> zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden. Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.</p>
<p>Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zum Prüfen der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.</p>
<h2>Muster-Widerrufsformular</h2>
<div class="glas">
<p>(Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
<p>An <span class="platzhalter">Horta Küche GmbH, Beispielstraße 1, 00000 Musterstadt, kontakt@horta.example</span>:</p>
<p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistung (*):</p>
<p>Bestellt am (*) / erhalten am (*):</p>
<p>Name des/der Verbraucher(s):</p>
<p>Anschrift des/der Verbraucher(s):</p>
<p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
<p>Datum:</p>
<p>(*) Unzutreffendes streichen.</p>
</div>
''')

# ---------------- Versand und Zahlung ----------------
textseite("versand-und-zahlung.html", "/versand-und-zahlung", "Versand und Zahlung", "Lieferzeit aus China, Versandkosten, Zoll und Zahlungsarten bei HORTA.", "Versand und Zahlung", f'''
<h2>Lieferung</h2>
<p>Wir versenden direkt aus China an Ihre Adresse in Deutschland. Die Lieferzeit beträgt in der Regel {LIEFERZEIT}. Sobald das Paket unterwegs ist, erhalten Sie die Sendungsnummer per E-Mail.</p>
<h2>Zoll und Steuern</h2>
<p>Zoll und Einfuhrumsatzsteuer übernehmen wir. Unsere Preise enthalten bereits 19 % Mehrwertsteuer. An der Haustür zahlen Sie nichts extra.</p>
<h2>Versandkosten</h2>
<p>Der Versand kostet 4,90 € je Bestellung. Ab einem Warenwert von 49,00 € liefern wir versandkostenfrei. Das 2er-Set wird daher immer kostenlos versandt.</p>
<h2>Rücksendung</h2>
<p>Rücksendungen schicken Sie an unsere Adresse in Deutschland, nicht nach China. Die Adresse steht in der <a href="/widerrufsbelehrung">Widerrufsbelehrung</a>.</p>
<h2>Zahlungsarten</h2>
<p>Sie können mit PayPal oder Klarna bezahlen. Nach Ihrer Bestellung erhalten Sie per E-Mail den Zahlungslink.</p>
<h2>Gutschein</h2>
<p>Den Gutschein über 10 % erhalten Sie nach der Bestätigung Ihrer Newsletter-Anmeldung. Er gilt für eine Bestellung und lässt sich nicht mit anderen Gutscheinen verbinden.</p>
<h2>Einführungspreis</h2>
<p>Der Preis von 44,90 € je Gerät gilt bis zum 30.11.2026. Ab dem 01.12.2026 kostet ein Gerät 54,90 € und das 2er-Set 92,90 €.</p>
''')

# ---------------- Newsletter bestätigt ----------------
textseite("newsletter-bestaetigt.html", "/newsletter-bestaetigt", "Anmeldung bestätigt", "Ihre Newsletter-Anmeldung bei HORTA ist bestätigt.", "Anmeldung bestätigt", '''
<p>Danke. Ihre Adresse ist bestätigt. Ihren Gutschein über 10 % haben wir Ihnen per E-Mail geschickt.</p>
<p><a class="leise-knopf" href="/">Zurück zur Startseite</a></p>
''')
