import os
# Gemeinsame Bausteine für alle HELIA-Seiten
DOMAIN = "https://www.helia.example"
OUT = os.environ.get("SHOP_ZIEL", "./shop/").rstrip("/") + "/"  # Zielordner per Umgebungsvariable SHOP_ZIEL
NAME = "HELIA"
FIRMA = "Helia Licht GmbH"
MAIL = "kontakt@helia.example"

ICON = {
    "korb": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    "menue": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path class="m1" d="M4 9h16"/><path class="m2" d="M4 15h16"/></svg>',
    "zu": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    "wecker": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 17h12l-1.5-2.2V10a4.5 4.5 0 0 0-9 0v4.8z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    "licht": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/></svg>',
    "klang": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>',
    "schlaf": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/></svg>',
    "timer": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 1.5M9.5 3h5"/></svg>',
}

STERN = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.5l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/></svg>'
DAUMEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 2 2v4h5.5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.3 20H7"/></svg>'
DREHEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 4 0 0 0 18 0M21 12a9 4 0 0 0-14-3.3"/><path d="M8.5 5.5L7 8.7l3.4.7"/></svg>'


def lampe_3d(zeit="06:00", chips=None, hinweis=True, label="3D-Modell des Lichtweckers HELIA. Zum Drehen ziehen oder Pfeiltasten nutzen."):
    # Die Lampe als echtes 3D-Modell aus CSS-Flächen: vier Schirmseiten, Deckel, Sockel mit Display,
    # dazu ein Lichtteppich am Boden und auf Wunsch Kärtchen, die im Raum um die Lampe kreisen
    schirm = "".join(f'<i class="l3d__schirm" style="--k:{k}"></i>' for k in range(4))
    display = ('<span class="l3d__display"><span class="zeit">' + zeit + '</span></span>'
               '<span class="l3d__symbole"><b></b><b class="symbol--licht"></b><b></b><b></b><b></b></span>')
    sockel = "".join(f'<i class="l3d__sockel" style="--k:{k}">{display if k == 0 else ""}</i>' for k in range(4))
    kreis = ""
    for (titel, text, winkel, hoehe) in (chips or []):
        kreis += f'<div class="l3d__chip" data-winkel="{winkel}" data-hoehe="{hoehe}" aria-hidden="true"><b>{titel}</b><span>{text}</span></div>'
    html = (f'<div class="l3d" data-dreh tabindex="0" role="img" aria-label="{label}">'
            '<div class="lampe__halo"></div><div class="l3d__boden"></div>'
            '<div class="l3d__buehne"><div class="l3d__skala"><div class="l3d__objekt">'
            '<i class="l3d__pool"></i><i class="l3d__ring"></i>' + sockel + schirm + '<i class="l3d__deckel"></i>' + kreis +
            '</div></div></div></div>')
    if hinweis:
        html += f'<p class="dreh-hinweis">{DREHEN}Zum Drehen ziehen</p>'
    return html


# Logo: aufgehende Sonne über einer Horizontlinie
LOGO_MARK = '<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc27a"/><stop offset="1" stop-color="#ff7a59"/></linearGradient></defs><path d="M10 30a14 14 0 0 1 28 0Z" fill="url(#lg)"/><rect x="5" y="33" width="38" height="3" rx="1.5" fill="#59e3e0"/></svg>'


def lampe_svg(p, zeit="06:30", label="Gezeichneter Lichtwecker mit leuchtendem Stoffschirm und Display"):
    # Glatte Flächen statt Stoffraster, damit nichts flimmert oder pixelig wirkt
    s = '''<div class="lampe"><div class="lampe__halo"></div>
<svg viewBox="0 0 320 470" role="img" aria-label="{label}">
<defs>
<linearGradient id="{p}-seite" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".4"/><stop offset=".28" stop-color="#000" stop-opacity="0"/><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".44"/></linearGradient>
<linearGradient id="{p}-hoehe" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".4" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".08"/></linearGradient>
<radialGradient id="{p}-kern" cx=".5" cy=".64" r=".62"><stop offset="0" stop-color="#fff" stop-opacity=".82"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="{p}-sockel" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ece8e2"/><stop offset="1" stop-color="#bdb7ad"/></linearGradient>
<linearGradient id="{p}-deckel" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f0ece6"/><stop offset="1" stop-color="#cfc9c1"/></linearGradient>
<filter id="{p}-weich" x="-20%" y="-80%" width="140%" height="260%"><feGaussianBlur stdDeviation="10"/></filter>
</defs>
<ellipse class="tisch-licht" cx="160" cy="440" rx="150" ry="14" filter="url(#{p}-weich)"/>
<path class="licht" d="M72 74H248Q256 74 258 84L276 322Q277 330 268 330H52Q43 330 44 322L62 84Q64 74 72 74Z"/>
<path d="M72 74H248Q256 74 258 84L276 322Q277 330 268 330H52Q43 330 44 322L62 84Q64 74 72 74Z" fill="url(#{p}-hoehe)"/>
<path d="M72 74H248Q256 74 258 84L276 322Q277 330 268 330H52Q43 330 44 322L62 84Q64 74 72 74Z" fill="url(#{p}-seite)"/>
<path class="kern" d="M72 74H248Q256 74 258 84L276 322Q277 330 268 330H52Q43 330 44 322L62 84Q64 74 72 74Z" fill="url(#{p}-kern)"/>
<rect x="60" y="52" width="200" height="28" rx="12" fill="url(#{p}-deckel)"/>
<g stroke="#a39d94" stroke-width="2.4" stroke-linecap="round"><path d="M110 62H210M118 70H202"/></g>
<rect x="40" y="326" width="240" height="104" rx="28" fill="url(#{p}-sockel)"/>
<rect x="66" y="342" width="188" height="52" rx="12" fill="#16141b"/>
<text class="zeit zeit-glanz" x="160" y="381" text-anchor="middle">{zeit}</text>
<g transform="translate(0 410)">
<path class="symbol" transform="translate(82 0)" d="M-5 4h10l-1.4-2v-4a3.6 3.6 0 0 0-7.2 0v4z"/>
<g class="symbol symbol--licht" transform="translate(121 0)"><circle r="3.4"/><circle r="6.6" fill="none" stroke="#fff4e2" stroke-width="1.4" stroke-dasharray="2 2.6" stroke-linecap="round"/></g>
<g class="symbol" transform="translate(160 0)"><circle cx="-2" cy="3" r="2.4"/><rect x=".2" y="-5" width="1.6" height="8" rx=".8"/></g>
<path class="symbol" transform="translate(199 0)" d="M3.6 2.2A5 5 0 0 1-2.2-3.6a5 5 0 1 0 5.8 5.8z"/>
<g class="symbol" transform="translate(238 0)"><circle r="5.2" fill="none" stroke="#fff4e2" stroke-width="1.4"/><path d="M0 -2.6V0l2 1.4" stroke="#fff4e2" stroke-width="1.2" fill="none" stroke-linecap="round"/></g>
</g>
</svg></div>'''
    return s.replace("{p}", p).replace("{zeit}", zeit).replace("{label}", label)


def head(titel, beschreibung, pfad="/", ld=""):
    return f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{titel}</title>
<meta name="description" content="{beschreibung}">
<meta name="theme-color" content="#0a0d1c">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="{DOMAIN}{pfad}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/InstrumentSans-Bold.woff2" as="font" type="font/woff2" crossorigin>
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="{NAME}">
<meta property="og:title" content="{titel}">
<meta property="og:description" content="{beschreibung}">
<meta property="og:url" content="{DOMAIN}{pfad}">
<meta property="og:image" content="{DOMAIN}/assets/og-image.jpg">
<meta property="og:image:alt" content="Lichtwecker HELIA mit warm leuchtendem Schirm vor einer nächtlichen Stadt">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{titel}">
<meta name="twitter:description" content="{beschreibung}">
<meta name="twitter:image" content="{DOMAIN}/assets/og-image.jpg">
<link rel="stylesheet" href="/assets/style.css">
{ld}
</head>
<body>
<a class="springen" href="#inhalt">Zum Inhalt springen</a>
'''


WELT = '''<div class="welt" aria-hidden="true">
  <div class="welt__sonne"></div>
  <div class="welt__aura welt__aura--a"></div>
  <div class="welt__aura welt__aura--b"></div>
  <div class="welt__stadt welt__stadt--fern"><img src="/assets/img/stadt-fern.svg" alt="" width="1600" height="520"></div>
  <div class="welt__aura welt__aura--c"></div>
  <div class="welt__stadt welt__stadt--mitte"><img src="/assets/img/stadt-mitte.svg" alt="" width="1600" height="520"></div>
  <div class="welt__stadt welt__stadt--nah"><img src="/assets/img/stadt-nah.svg" alt="" width="1600" height="520"></div>
  <div class="welt__nebel welt__nebel--2"></div>
  <div class="welt__nebel"></div>
  <canvas class="welt__regen"></canvas>
  <div class="welt__schleier"></div>
</div>
'''

ENTWURF = '<div class="entwurf" role="note">Entwurf: Alle Firmen-, Hersteller- und Technikangaben sind erfunden. Das Produktbild stammt aus fremder Quelle und muss vor einer Veröffentlichung ersetzt werden.</div>\n'


def kopf(voll=True):
    if voll:
        return f'''<header class="kopf"><div class="kopf__innen">
  <a class="logo" href="/" aria-label="Zur Startseite">{LOGO_MARK}<span>{NAME}</span></a>
  <nav class="kopf__nav" id="hauptmenue" aria-label="Hauptmenü">
    <a href="#ueberblick">Überblick</a>
    <a href="#aufgang">Tag und Nacht</a>
    <a href="#funktionen">Funktionen</a>
    <a href="#technik">Technik</a>
    <a href="#bewertungen">Bewertungen</a>
    <a href="#fragen">Fragen</a>
  </nav>
  <div class="kopf__rechts">
    <button class="korb-knopf" type="button" aria-label="Warenkorb öffnen, 0 Artikel">{ICON["korb"]}<span class="korb-knopf__text">Warenkorb</span><span class="korb-knopf__zahl">0</span></button>
    <button class="menue-knopf" type="button" aria-label="Menü" aria-expanded="false" aria-controls="hauptmenue">{ICON["menue"]}</button>
  </div>
</div></header>
'''
    return f'''<header class="kopf kopf--schlicht"><div class="kopf__innen">
  <a class="logo" href="/" aria-label="Zur Startseite">{LOGO_MARK}<span>{NAME}</span></a>
  <span></span>
  <div class="kopf__rechts"><a class="kopf__zurueck" href="/">Zurück zum Shop</a></div>
</div></header>
'''


KORB = f'''<dialog id="korb" class="korb" aria-labelledby="korb-titel">
  <div class="korb__innen">
    <div class="korb__kopf">
      <h2 id="korb-titel">Warenkorb</h2>
      <button class="zu" type="button" data-korb-zu aria-label="Warenkorb schließen">{ICON["zu"]}</button>
    </div>
    <ul class="korb__liste"></ul>
    <div class="korb__leer" hidden><strong>Noch leer.</strong>Der Lichtwecker wartet auf der Startseite.</div>
    <div class="korb__fuss" hidden>
      <div class="versandbalken" aria-hidden="true"><i></i></div>
      <p class="versandtext"></p>
      <div class="zeile"><span>Zwischensumme</span><span data-feld="zwischensumme"></span></div>
      <div class="zeile"><span>Versand (DHL)</span><span data-feld="versand"></span></div>
      <div class="zeile zeile--gesamt"><span>Gesamt inkl. MwSt.</span><span data-feld="gesamt"></span></div>
      <a class="knopf knopf--breit" href="/kasse">Zur Kasse</a>
      <p class="kleingedruckt">Alle Preise inkl. 19 % MwSt. Ein Gutschein wird an der Kasse eingelöst.</p>
    </div>
  </div>
</dialog>
'''

FUSS = f'''<footer class="fuss">
  <div class="fuss__innen">
    <div class="brief">
      <h2>Ein Brief vor <span class="leucht">Sonnenaufgang.</span></h2>
      <p>Alle paar Wochen eine kurze Mail zu Schlaf und Licht. Als Dank für die Anmeldung gibt es 10 % Gutschein auf Ihre Bestellung.</p>
      <form id="newsletter" action="/send.php" method="post" novalidate>
        <input type="hidden" name="art" value="newsletter">
        <div class="honig-feld" aria-hidden="true"><label>Bitte leer lassen<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="brief__zeile">
          <label class="sr" for="nl-mail">E-Mail-Adresse</label>
          <input class="feld" id="nl-mail" type="email" name="email" placeholder="ihre@adresse.de" autocomplete="email" required>
          <button class="leise-knopf" type="submit">Anmelden</button>
        </div>
        <label class="haken"><input type="checkbox" name="einwilligung" value="ja" required><span>Ich möchte den Newsletter erhalten. Ich bekomme zuerst eine Mail, in der ich meine Adresse bestätige. Abmelden kann ich mich jederzeit. Mehr dazu in der <a href="/datenschutz">Datenschutzerklärung</a>.</span></label>
        <p class="meldung" role="status" aria-live="polite"></p>
      </form>
    </div>
    <div class="fuss__links">
      <div>
        <span class="marke marke--still">Rechtliches</span>
        <ul>
          <li><a href="/impressum">Impressum</a></li>
          <li><a href="/datenschutz">Datenschutz</a></li>
          <li><a href="/agb">AGB</a></li>
          <li><a href="/widerrufsbelehrung">Widerrufsbelehrung</a></li>
          <li><a href="/versand-und-zahlung">Versand und Zahlung</a></li>
        </ul>
      </div>
      <div>
        <span class="marke marke--still">Hilfe</span>
        <ul>
          <li><a href="/#fragen">Häufige Fragen</a></li>
          <li><a href="mailto:{MAIL}">{MAIL}</a></li>
        </ul>
        <a class="leise-knopf widerruf-knopf" href="/widerrufen">Vertrag widerrufen</a>
      </div>
    </div>
  </div>
  <div class="fuss__unten">
    <p>Alle Preise in Euro inkl. 19 % Mehrwertsteuer, zzgl. Versandkosten, soweit nicht anders angegeben. Dieses Gerät gehört nicht in den Hausmüll. Altgeräte geben Sie bei einer Sammelstelle oder beim Händler ab.</p>
    <p>&copy; 2026 {FIRMA} (fiktiv)</p>
  </div>
</footer>
'''

SKRIPT = '<script src="/assets/script.js" defer></script>\n</body>\n</html>\n'


def seite(dateiname, inhalt):
    open(OUT + dateiname, "w", encoding="utf-8").write(inhalt)
    print(dateiname, len(inhalt))


def textseite(dateiname, pfad, titel, beschreibung, h1, body):
    html = head(titel + " | " + NAME, beschreibung, pfad) + WELT + ENTWURF + kopf(False)
    html += f'<main id="inhalt" class="textseite">\n<h1>{h1}</h1>\n{body}\n</main>\n' + SKRIPT
    seite(dateiname, html)
