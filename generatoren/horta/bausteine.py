import os
# Gemeinsame Bausteine für alle HORTA-Seiten
DOMAIN = "https://www.horta.example"
OUT = os.environ.get("SHOP_ZIEL", "./shop/").rstrip("/") + "/"  # Zielordner per Umgebungsvariable SHOP_ZIEL
NAME = "HORTA"
FIRMA = "Horta Küche GmbH"
MAIL = "kontakt@horta.example"
LIEFERZEIT = "8 bis 15 Werktage"

ICON = {
    "korb": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    "menue": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path class="m1" d="M4 9h16"/><path class="m2" d="M4 15h16"/></svg>',
    "zu": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    "knopf": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 3v8"/><path d="M7.5 6.2a7 7 0 1 0 9 0"/></svg>',
    "motor": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/></svg>',
    "schacht": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3h8v12H8z"/><path d="M12 15v6M9 18l3 3 3-3"/></svg>',
    "funkeln": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>',
    "sauber": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5c3.2 4 5 6.9 5 9.4a5 5 0 0 1-10 0c0-2.5 1.8-5.4 5-9.4z"/><path d="M9.6 13.6a2.5 2.5 0 0 0 2.4 2.2"/></svg>',
}

STERN = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.5l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/></svg>'
DAUMEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 2 2v4h5.5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.3 20H7"/></svg>'
DREHEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 4 0 0 0 18 0M21 12a9 4 0 0 0-14-3.3"/><path d="M8.5 5.5L7 8.7l3.4.7"/></svg>'

# Die fünf Einsätze: Kennung, Name, kurze Erklärung
EINSAETZE = [
    ("duenn", "Dünne Scheiben", "Für Gurkensalat, Radieschen und Kartoffelchips aus dem Ofen."),
    ("dick", "Dicke Scheiben", "Für Gratin, Bratkartoffeln und Gemüse aus der Pfanne."),
    ("grob", "Grob raspeln", "Für Möhrensalat, Rösti und geriebenen Gouda."),
    ("fein", "Fein raspeln", "Für Krautsalat, Rotkohl und Rohkost für Kinder."),
    ("reibe", "Feine Reibe", "Für Parmesan, Nüsse und Schokolade."),
]


def kegel_icon(art, gross=False):
    # Kleiner gezeichneter Kegel-Einsatz: Form gleich, die Schneide verrät die Art
    marken = {
        "duenn": '<path d="M13 9.5h10" stroke="#1e2b22" stroke-width="1.2" stroke-linecap="round"/>',
        "dick": '<path d="M12.5 9.2h11" stroke="#1e2b22" stroke-width="2.4" stroke-linecap="round"/>',
        "grob": "".join(f'<circle cx="{x}" cy="{y}" r="1.5" fill="#1e2b22"/>' for x, y in ((13, 9), (18, 9), (23, 9), (15.5, 13), (20.5, 13), (13.5, 17), (18, 17), (22.5, 17))),
        "fein": "".join(f'<circle cx="{x}" cy="{y}" r=".9" fill="#1e2b22"/>' for x, y in ((12.5, 8), (15.5, 8), (18.5, 8), (21.5, 8), (24.5, 8), (14, 11), (17, 11), (20, 11), (23, 11), (12.8, 14), (15.8, 14), (18.8, 14), (21.8, 14), (14.2, 17), (17.2, 17), (20.2, 17), (23.2, 17))),
        "reibe": "".join(f'<circle cx="{12 + (i % 7) * 2.1 + (1 if (i // 7) % 2 else 0):.1f}" cy="{7.5 + (i // 7) * 2.2:.1f}" r=".55" fill="#1e2b22"/>' for i in range(35)),
    }
    groesse = ' width="56" height="56"' if gross else ""
    return (f'<svg class="kegel" viewBox="0 0 36 30"{groesse} aria-hidden="true"><defs><linearGradient id="kg-{art}{"-g" if gross else ""}" x1="0" x2="1">'
            '<stop offset="0" stop-color="#8f9895"/><stop offset=".35" stop-color="#eef1f0"/><stop offset="1" stop-color="#8a928f"/></linearGradient></defs>'
            f'<path d="M10 5h16l3 17H7z" fill="url(#kg-{art}{"-g" if gross else ""})"/>'
            '<path d="M5.5 22h25a1.5 1.5 0 0 1 1.5 1.5V26H4v-2.5A1.5 1.5 0 0 1 5.5 22z" fill="#25292a"/>'
            f'{marken[art]}</svg>')


def geraet_3d(hinweis=True, label="3D-Modell des Gemüseschneiders HORTA. Zum Drehen ziehen oder Pfeiltasten nutzen."):
    # Das Gerät als 3D-Modell aus CSS-Flächen: Edelstahl-Mantel aus 16 Flächen, Deckel mit Startknopf,
    # seitlich die durchsichtige Trommel mit Kegel-Einsatz und darüber der Einfüllschacht mit Stopfer und Gurke
    mantel = "".join(f'<i class="g3d__mantel" style="--k:{k}"></i>' for k in range(16))
    kegel = "".join(f'<i class="g3d__kegel" style="--k:{k}"></i>' for k in range(8))
    trommel = "".join(f'<i class="g3d__trommel" style="--k:{k}"></i>' for k in range(10))
    # Schacht und Gurke: vier Seiten, vorn und hinten breiter als links und rechts
    schacht = "".join(f'<i class="g3d__schacht g3d__schacht--{s}"></i>' for s in ("v", "r", "h", "l"))
    gurke = "".join(f'<i class="g3d__gurke g3d__gurke--{s}"></i>' for s in ("v", "r", "h", "l")) + '<i class="g3d__gurke g3d__gurke--oben"></i>'
    html = (f'<div class="g3d" data-dreh tabindex="0" role="img" aria-label="{label}">'
            '<div class="g3d__licht"></div>'
            '<div class="g3d__buehne"><div class="g3d__skala"><div class="g3d__objekt">'
            '<i class="g3d__schatten"></i>' + mantel + '<i class="g3d__deckel"></i>'
            '<div class="g3d__arm"><i class="g3d__anschluss"></i>' + kegel + trommel +
            '<i class="g3d__auslass"></i>' + gurke + schacht + '<i class="g3d__stopfer"></i></div>'
            '</div></div></div></div>')
    if hinweis:
        html += f'<p class="dreh-hinweis">{DREHEN}Zum Drehen ziehen</p>'
    return html


# Logo: eine Gurkenscheibe von oben
LOGO_MARK = ('<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="#3a7a3a"/><circle cx="24" cy="24" r="17.5" fill="#dcebbf"/>'
             '<circle cx="24" cy="24" r="9.5" fill="#eef5dc"/>'
             + "".join(f'<ellipse cx="24" cy="18.2" rx="1.5" ry="2.6" fill="#9fc27e" transform="rotate({w} 24 24)"/>' for w in range(0, 360, 60)) +
             '</svg>')


MUSTER_DEFS = """<linearGradient id="{p}-glas" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset=".5" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".38"/></linearGradient>
<pattern id="{p}-m-scheibe" width="44" height="22" patternUnits="userSpaceOnUse"><g fill="none" stroke-width="1.2"><ellipse cx="8" cy="6" rx="7" ry="2.6" stroke="#fff" stroke-opacity=".5" transform="rotate(-8 8 6)"/><ellipse cx="27" cy="12" rx="8" ry="3" stroke="#fff" stroke-opacity=".42" transform="rotate(10 27 12)"/><ellipse cx="38" cy="3" rx="6" ry="2.2" stroke="#000" stroke-opacity=".12"/><ellipse cx="14" cy="17" rx="7.5" ry="2.8" stroke="#000" stroke-opacity=".1" transform="rotate(6 14 17)"/><ellipse cx="36" cy="19" rx="5.5" ry="2" stroke="#fff" stroke-opacity=".36" transform="rotate(-14 36 19)"/></g></pattern>
<pattern id="{p}-m-streifen" width="38" height="22" patternUnits="userSpaceOnUse"><g fill="none" stroke-linecap="round" stroke-width="1.5"><path d="M2 8q5-4 11-3" stroke="#fff" stroke-opacity=".45"/><path d="M17 15q4 3 10 1" stroke="#fff" stroke-opacity=".38"/><path d="M27 5q4-3 9 0" stroke="#000" stroke-opacity=".13"/><path d="M6 19q3-4 8-5" stroke="#000" stroke-opacity=".11"/><path d="M22 10l7-5" stroke="#fff" stroke-opacity=".32"/><path d="M31 18q3-3 6-2" stroke="#fff" stroke-opacity=".4"/></g></pattern>
<pattern id="{p}-m-krumen" width="26" height="16" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.3" fill="#fff" fill-opacity=".45"/><circle cx="11" cy="9" r="1" fill="#000" fill-opacity=".14"/><circle cx="19" cy="4" r="1.5" fill="#fff" fill-opacity=".35"/><circle cx="7" cy="13" r="1.1" fill="#fff" fill-opacity=".4"/><circle cx="22" cy="12" r="1.2" fill="#000" fill-opacity=".12"/><circle cx="15" cy="15" r=".9" fill="#fff" fill-opacity=".38"/></pattern>
<clipPath id="{p}-schale"><path d="M30 470V380H270V470Q262 557 150 557Q38 557 30 470Z"/></clipPath>
<filter id="{p}-weich" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="5"/></filter>"""


def lage_kante(i):
    # Unebene Oberkante: in der Mitte gewölbt, mit kleinen festen Buckeln (gleiche Werte wie in script.js)
    y0 = 548 - (i + 1) * 16
    buckel = [0, 3, -2, 4, -1, 3, 0, -3, 2]
    pkt = []
    for k, x in enumerate(range(24, 277, 31)):
        t = (x - 150) / 126
        pkt.append((x, y0 - 26 * (1 - t * t) - buckel[(k + i) % 9]))
    d = f"M{pkt[0][0]} {pkt[0][1]:.0f}"
    for (x1, y1), (x2, y2) in zip(pkt, pkt[1:]):
        d += f" Q{x1 + 15.5:.0f} {(y1 + y2) / 2 - 3:.0f} {x2} {y2:.0f}"
    return d + " L276 600 L24 600 Z"


def lage_svg(p, i, farbe, muster):
    # Eine Schicht in der Schüssel; die Füllung reicht bis unter den Boden, die Schale schneidet sie zu
    d = lage_kante(i)
    return f'<g class="lage" style="--n:{i}"><path d="{d}" fill="{farbe}"/><path d="{d}" fill="url(#{p}-m-{muster})"/></g>'


def schale_teile(p, lagen, fallend=False):
    # Glasschüssel mit Schichten von unten nach oben; die höchste Schicht wird zuerst gezeichnet
    inhalt = "".join(lage_svg(p, i, f, m) for i, (f, m) in reversed(list(enumerate(lagen))))
    return (f'<ellipse cx="150" cy="560" rx="118" ry="7" fill="#1e2b22" opacity=".12" filter="url(#{p}-weich)"/>'
            f'<ellipse cx="150" cy="470" rx="119" ry="14" fill="none" stroke="#8ea096" stroke-opacity=".45" stroke-width="1.6"/>'
            f'<g clip-path="url(#{p}-schale)"><g class="lagen">{inhalt}</g></g>'
            + ('<g class="fallend"></g>' if fallend else '') +
            f'<path d="M30 470Q38 557 150 557Q262 557 270 470" fill="url(#{p}-glas)" stroke="#8ea096" stroke-opacity=".6" stroke-width="2"/>'
            '<path d="M30 470A120 14 0 0 0 270 470" fill="none" stroke="#8ea096" stroke-opacity=".7" stroke-width="2"/>'
            '<path d="M50 488Q60 534 108 546" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="4" stroke-linecap="round"/>')


# Standard-Salat für Abschied und Danke-Seite: Gurke in Scheiben, Karotte grob, Rotkohl fein
SALAT = [("#9cc46e", "scheibe"), ("#ee8a2a", "streifen"), ("#8e3a80", "streifen"), ("#9cc46e", "scheibe")]


def schale_svg(p, label, lagen=SALAT, extra=""):
    return (f'<svg class="schale" data-p="{p}" viewBox="14 372 272 204" role="img" aria-label="{label}"{extra}><defs>{MUSTER_DEFS.replace("{p}", p)}</defs>'
            + schale_teile(p, lagen) + '</svg>')


def geraet_svg(p, label="Zeichnung: der Gemüseschneider HORTA von der Seite, darunter eine Glasschüssel", probier=False, lagen=(), extra=""):
    # Seitenansicht zum Ausprobieren: Edelstahl-Gehäuse rechts, Trommel mit Kegel nach links,
    # Einfüllschacht mit Stopfer oben, Glasschüssel unter dem Auslass.
    knopf = ' data-knopf-oben' if probier else ''
    s = f'''<svg class="geraet" data-p="{p}" viewBox="0 0 520 590" role="img" aria-label="{label}"{extra}>
<defs>
{MUSTER_DEFS.replace("{p}", p)}
<linearGradient id="{p}-stahl" x1="0" x2="1"><stop offset="0" stop-color="#7f8885"/><stop offset=".16" stop-color="#c9cfcc"/><stop offset=".3" stop-color="#f3f5f4"/><stop offset=".46" stop-color="#b9c0bd"/><stop offset=".78" stop-color="#8c9491"/><stop offset="1" stop-color="#a7aeab"/></linearGradient>
<linearGradient id="{p}-kegel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1f0"/><stop offset=".55" stop-color="#b3bbb8"/><stop offset="1" stop-color="#858d8a"/></linearGradient>
<pattern id="{p}-gebuerstet" width="4" height="10" patternUnits="userSpaceOnUse"><path d="M1 0v10" stroke="#fff" stroke-opacity=".07"/></pattern>
<pattern id="{p}-loch" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2.1"/><circle cx="9" cy="9" r="2.1"/></pattern>
<clipPath id="{p}-kegelform"><path d="M320 320L178 308Q166 350 178 392L320 380Z"/></clipPath>
<clipPath id="{p}-schachtinnen"><rect x="204" y="0" width="56" height="306"/></clipPath>
</defs>
<ellipse cx="398" cy="561" rx="104" ry="7" fill="#1e2b22" opacity=".16" filter="url(#{p}-weich)"/>
{schale_teile(p, lagen, fallend=True)}
<path d="M306 548L333 214Q335 198 352 198H448Q465 198 467 214L494 548Z" fill="url(#{p}-stahl)"/>
<path d="M306 548L333 214Q335 198 352 198H448Q465 198 467 214L494 548Z" fill="url(#{p}-gebuerstet)"/>
<path d="M356 214H368L352 532H337Z" fill="#fff" opacity=".42"/>
<path d="M333 214Q335 198 352 198H448Q465 198 467 214L468.1 228H331.9Z" fill="#232726"/>
<path d="M307.3 532H492.7L496 548Q496 558 486 558H314Q304 558 304 548Z" fill="#232726"/>
<g class="knopf-oben"{knopf}><ellipse cx="400" cy="199" rx="62" ry="7" fill="#1b1e1d"/><ellipse class="knopf-oben__kappe" cx="400" cy="196" rx="24" ry="5" fill="#3d4240"/><ellipse cx="396" cy="194.6" rx="10" ry="1.6" fill="#fff" opacity=".35"/></g>
<ellipse cx="324" cy="350" rx="13" ry="57" fill="#1d201f"/>
<path d="M320 320L178 308Q166 350 178 392L320 380Z" fill="url(#{p}-kegel)"/>
<g clip-path="url(#{p}-kegelform)" fill="#3a3f3d" opacity=".8"><rect class="kegel-loecher" x="172" y="284" width="156" height="132" fill="url(#{p}-loch)"/></g>
<ellipse cx="178" cy="350" rx="9" ry="42" fill="#2a2e2c" stroke="#d3d9d6" stroke-width="2"/>
<rect x="160" y="300" width="170" height="100" rx="26" fill="url(#{p}-glas)" stroke="#8ea096" stroke-opacity=".55" stroke-width="1.6"/>
<path d="M178 309H316" stroke="#fff" stroke-opacity=".8" stroke-width="3" stroke-linecap="round"/>
<path d="M160 330Q130 338 128 374L136 418Q152 428 176 422V398Q160 396 160 380Z" fill="url(#{p}-glas)" stroke="#8ea096" stroke-opacity=".55" stroke-width="1.6"/>
<g clip-path="url(#{p}-schachtinnen)">
<g class="zutat"><rect class="zutat__koerper" x="210" y="140" width="44" height="152" rx="12" fill="#4f8a3b"/><rect x="216" y="148" width="8" height="134" rx="4" fill="#fff" opacity=".22"/></g>
</g>
<rect x="200" y="96" width="64" height="210" rx="6" fill="url(#{p}-glas)" stroke="#8ea096" stroke-opacity=".6" stroke-width="1.6"/>
<path d="M206 104V296" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>
<g class="stopfer"><rect x="208" y="40" width="48" height="98" rx="5" fill="#f7f9f8" fill-opacity=".86" stroke="#8ea096" stroke-opacity=".6" stroke-width="1.4"/><rect x="194" y="30" width="76" height="13" rx="6.5" fill="#f2f5f3" stroke="#8ea096" stroke-opacity=".6" stroke-width="1.4"/></g>
<rect x="192" y="90" width="80" height="10" rx="4" fill="#fff" fill-opacity=".75" stroke="#8ea096" stroke-opacity=".6" stroke-width="1.4"/>
</svg>'''
    return s


def head(titel, beschreibung, pfad="/", ld=""):
    return f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{titel}</title>
<meta name="description" content="{beschreibung}">
<meta name="theme-color" content="#f6f2e8">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="{DOMAIN}{pfad}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/Fraunces-SemiBold.woff2" as="font" type="font/woff2" crossorigin>
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="{NAME}">
<meta property="og:title" content="{titel}">
<meta property="og:description" content="{beschreibung}">
<meta property="og:url" content="{DOMAIN}{pfad}">
<meta property="og:image" content="{DOMAIN}/assets/og-image.jpg">
<meta property="og:image:alt" content="Gezeichneter Gemüseschneider HORTA aus Edelstahl, daneben eine Glasschüssel mit geschnittenem Gemüse">
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
  <div class="welt__blatt"><img src="/assets/img/blattschatten.svg" alt="" width="900" height="760"></div>
  <div class="welt__beet welt__beet--fern"><img src="/assets/img/beet-fern.svg" alt="" width="1600" height="420"></div>
  <div class="welt__beet welt__beet--mitte"><img src="/assets/img/beet-mitte.svg" alt="" width="1600" height="420"></div>
  <div class="welt__beet welt__beet--nah"><img src="/assets/img/beet-nah.svg" alt="" width="1600" height="420"></div>
  <div class="welt__schleier"></div>
</div>
'''

ENTWURF = '<div class="entwurf" role="note">Entwurf: Alle Firmen-, Hersteller- und Technikangaben sowie alle Bewertungen sind erfunden. Das Produktfoto stammt vom Lieferanten und muss vor einer Veröffentlichung ersetzt oder schriftlich freigegeben werden.</div>\n'


def kopf(voll=True):
    if voll:
        return f'''<header class="kopf"><div class="kopf__innen">
  <a class="logo" href="/" aria-label="HORTA, zur Startseite">{LOGO_MARK}<span>{NAME}</span></a>
  <nav class="kopf__nav" id="hauptmenue" aria-label="Hauptmenü">
    <a href="#ueberblick">Überblick</a>
    <a href="#probieren">Probieren</a>
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
  <a class="logo" href="/" aria-label="HORTA, zur Startseite">{LOGO_MARK}<span>{NAME}</span></a>
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
    <div class="korb__leer" hidden><strong>Noch leer.</strong>Der Gemüseschneider wartet auf der Startseite.</div>
    <div class="korb__fuss" hidden>
      <div class="versandbalken" aria-hidden="true"><i></i></div>
      <p class="versandtext"></p>
      <div class="zeile"><span>Zwischensumme</span><span data-feld="zwischensumme"></span></div>
      <div class="zeile"><span>Versand</span><span data-feld="versand"></span></div>
      <div class="zeile zeile--gesamt"><span>Gesamt inkl. MwSt.</span><span data-feld="gesamt"></span></div>
      <a class="knopf knopf--breit" href="/kasse">Zur Kasse</a>
      <p class="kleingedruckt">Lieferzeit aus China: {LIEFERZEIT}. Zoll und Einfuhrabgaben sind enthalten. Zahlung mit PayPal oder Klarna. Ein Gutschein wird an der Kasse eingelöst.</p>
    </div>
  </div>
</dialog>
'''

FUSS = f'''<footer class="fuss">
  <div class="fuss__innen">
    <div class="brief">
      <h2>Ein Rezept, <span class="leucht">frisch geschnitten.</span></h2>
      <p>Alle paar Wochen eine kurze Mail mit einem Rezept für Gemüse der Saison. Als Dank für die Anmeldung gibt es 10 % Gutschein auf Ihre Bestellung.</p>
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
    <p>Alle Preise in Euro inkl. 19 % Mehrwertsteuer, zzgl. Versandkosten, soweit nicht anders angegeben. Elektrogeräte gehören nicht in den Hausmüll. Altgeräte geben Sie bei einer Sammelstelle oder beim Händler ab.</p>
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
