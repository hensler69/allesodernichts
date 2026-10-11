#!/usr/bin/env python3
"""Baut die Design-Galerie: eine einzige, selbständige HTML-Datei mit allen 18 Looks.

Was das Skript tut
  1. Liest die Wertung (bewertung.json) und die 18 Looks (.claude/skills/look-<name>/).
  2. Bettet jede Demo (vorlage/demo.html) vollständig ein: CSS und JavaScript stehen
     in der Seite, die benutzten Schriften als data:-URI, keine Netzanfragen.
  3. Liest aus jeder SKILL.md die Abschnitte Pro, Contra, "Wann der Look passt" und
     "Passt besonders zu / Passt nicht zu" und setzt sie in HTML um.
  4. Schreibt galerie.html. Die Datei läuft offline im Browser, ohne Server.

Aufruf
  python3 galerie_bauen.py                  schreibt in den Standardordner
  python3 galerie_bauen.py ziel.html        schreibt nach ziel.html
  python3 galerie_bauen.py --wertung PFAD   nimmt eine andere bewertung.json

Das Skript ist wiederholbar: gleiche Quellen ergeben immer dieselbe Datei.
Es verändert nichts an den Looks, es liest sie nur.
"""
import argparse
import base64
import html
import json
import os
import re
import sys
from pathlib import Path

SKILLS = Path(__file__).resolve().parents[2]
SCRATCH = Path("/tmp/claude-0/-home-user-allesodernichts/1f1f95f9-9c7a-50e6-acb8-cdf0d5906c89/scratchpad")
STANDARD_AUSGABE = SCRATCH / "galerie" / "galerie.html"
WERTUNG_KANDIDATEN = [
    SCRATCH / "looks" / "_lh" / "bewertung.json",
    SKILLS / "design-vorlagen" / "references" / "bewertung.json",
    SKILLS / "design-vorlagen" / "references" / "bewertung-horta.json",
]

KRITERIEN_TEXT = {
    "Passung": "Passt der Look zu einem Küchengerät für 44,90 Euro? Das zählt dreifach, denn ein Look, der nicht zum Produkt passt, wirkt sofort falsch.",
    "Vertrauen": "Wirkt der Shop seriös und ordentlich? Bei einem unbekannten Shop entscheidet das, ob jemand bezahlt.",
    "Produktwirkung": "Sieht man, was das Gerät kann und wie es aussieht?",
    "Lesbarkeit": "Sind Texte, Preise und Knöpfe leicht zu lesen? Dazu gehört genug Kontrast, also genug Helligkeitsunterschied zwischen Schrift und Grund.",
    "Handy": "Funktioniert die Seite auf dem Handy? Von dort kommen bei einem solchen Shop die meisten Besucher.",
    "Technik": "Wie schnell und stabil läuft die Seite? Grundlage ist Lighthouse (ein Prüfprogramm von Google) und die Layoutverschiebung, also ob die Seite beim Laden hin und her springt.",
    "Aufwand": "Wie viel Arbeit kostet der Look bei jedem neuen Produkt? 5 heißt: wenig Aufwand.",
    "Risiko": "Was kann schiefgehen, zum Beispiel Ruckeln auf schwachen Handys, Dauerbewegung ohne Pause-Knopf oder eine Darstellung, die nicht in jedem Browser gleich ist? 5 heißt: geringes Risiko.",
}
KRITERIEN_KURZ = {
    "Passung": "Passung", "Vertrauen": "Vertrauen", "Produktwirkung": "Produkt",
    "Lesbarkeit": "Lesbarkeit", "Handy": "Handy", "Technik": "Technik",
    "Aufwand": "Aufwand", "Risiko": "Risiko",
}

KURZ = {
    "isometric": "Eine aufgeräumte Küchen-Miniaturwelt aus Blöcken, schräg von oben gezeichnet.",
    "gradient-mesh": "Weiche, mehrfarbige Farbverläufe auf hellem Grund, ruhig und freundlich.",
    "bauhaus": "Kreis, Quadrat und Dreieck in Rot, Gelb und Blau: klar und grafisch wie ein Plakat.",
    "liquid-morph": "Weiche Tropfenformen, die ineinander übergehen, warm und lebendig.",
    "glassmorphism": "Helles, buntes Milchglas (halb durchsichtige Flächen) vor weichen Farbkugeln.",
    "clay-3d": "Aufgeblasene Knetmasse-Formen in Pastellfarben, weich und verspielt.",
    "art-deco": "Gold auf Dunkelgrün wie in den 1920er Jahren, festlich und geordnet.",
    "halftone": "Zweifarbiger Rasterdruck auf Papier, wie ein handgemachtes Plakat.",
    "wireframe-3d": "Blaupause mit einem Gerät aus Drahtgitter, das man drehen kann.",
    "comic-book": "Die Seite als Comicheft mit Bildkästen, Sprechblasen und Knalleffekten.",
    "kinetic-type": "Riesige Schrift, die sich beim Scrollen verändert, dazu Laufbänder.",
    "pixel-art": "8-Bit-Spiel mit Pixelbildern, Dialogkasten und Fortschrittsbalken.",
    "neon-glow": "Leuchtröhren bei Nacht auf fast schwarzem Grund.",
    "holographic": "Schimmernde Regenbogen-Folie auf kühlem Perlmutt-Grund.",
    "retro-vhs": "Videoband-Look der 80er Jahre mit Streifen, Farbversatz und Synthwave-Sonne.",
    "particles": "Dunkles Feld aus treibenden Punkten und Linien, technisch und lebendig.",
    "split-flap": "Fallblatt-Tafel wie im Bahnhof, Titel und Zahlen blättern beim Laden.",
    "ascii-art": "Terminal-Look in Dunkelgrün, das Gerät wird aus Zeichen berechnet.",
}

SKILL_ABSCHNITTE = {
    "pro": "Pro",
    "contra": "Contra",
    "wann": "Wann der Look passt / Wann nicht",
    "passt": "Passt besonders zu",
    "nicht": "Passt nicht zu",
}

URTEIL_ABSAETZE = [
    ("platz", 1, "Platz 1: Isometric (86 von 100).",
     " Die Küchen-Miniaturwelt passt zu einem Küchengerät, wirkt freundlich und ordentlich (wichtig bei einem unbekannten Shop), erklärt das Gerät durch seine Bauteile, ist sehr gut lesbar und technisch makellos (Lighthouse 100 von 100, keine Layoutverschiebung). ",
     "Nachteil:", " Die Szene aus etwa 50 Blöcken muss für jedes neue Produkt neu gebaut werden.", "isometric"),
    ("platz", 2, "Platz 2: Gradient Mesh (81).",
     " Hell, freundlich, sehr gut lesbar, Lighthouse 100, mittlerer Aufwand. ",
     "Nachteil:", " wirkt vertraut statt mutig, die Sterne sind blass.", "gradient-mesh"),
    ("platz", 3, "Platz 3: Bauhaus (81).",
     " Klar, grafisch, der schnellste Look (29 KB), geringster Aufwand der oberen Plätze. ",
     "Nachteil:", " Das Gerät besteht aus Grundformen, ist erkennbar, aber abstrakt.", "bauhaus"),
]
URTEIL_REST = [
    ("Zum Vergleich:", " Der Shop HORTA trägt schon Neo-Brutalism (laut und handfest). Er gehört nach meiner Einschätzung in dieselbe obere Gruppe, ist hier aber nicht mitgemessen."),
    ("Warum die anderen weiter unten stehen:", " Looks wie ASCII Art, Split-Flap, Particles, Retro VHS, Neon Glow und Holographic sehen nicht nach frischer Küche aus und schaffen wenig Vertrauen. Art Deco ist eher festlich und edel. Comic Book und Pixel Art sind eindrucksvoll, wirken für ein Gerät zu 44,90 Euro aber kindlich."),
    ("Das gilt nur für HORTA.", " Für andere Produkte ändert sich die Reihenfolge (zum Beispiel Wireframe 3D für Werkzeug, Neon für Bars und Nachtleben, Art Deco für Geschenke, Pixel Art für Spiele)."),
]
GRENZE = "Grundlage: Bildschirmfotos am PC und Handy, Prüfskript, Lighthouse (nur Chromium, Software ohne Grafikkarte). Keine Tests mit echten Besuchern, kein Test auf echten Handys oder in Safari und Firefox."


def warn(text):
    print("Warnung: " + text, file=sys.stderr)


# --------------------------------------------------------------------------
# Kleiner Markdown-Umsetzer (Absätze, Listen, Code, fett)
# --------------------------------------------------------------------------
def md_inline(text):
    codes = []

    def merke(m):
        codes.append(m.group(1))
        return "\x00%d\x00" % (len(codes) - 1)

    text = re.sub(r"`([^`]+)`", merke, text)
    text = html.escape(text, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    return re.sub(r"\x00(\d+)\x00", lambda m: "<code>" + html.escape(codes[int(m.group(1))], quote=False) + "</code>", text)


def md_html(md):
    """Umsetzung für die Abschnitte der SKILL.md. Tabellen werden weggelassen."""
    zeilen = md.strip("\n").split("\n")
    out = []
    absatz = []
    liste = None  # ("ul"|"ol", [Einträge])
    code = None

    def absatz_zu():
        nonlocal absatz
        if absatz:
            out.append("<p>" + md_inline(" ".join(s.strip() for s in absatz)) + "</p>")
            absatz = []

    def liste_zu():
        nonlocal liste
        if liste:
            art, items = liste
            out.append("<%s>%s</%s>" % (art, "".join("<li>" + md_inline(" ".join(i)) + "</li>" for i in items), art))
            liste = None

    for z in zeilen:
        if code is not None:
            if z.strip().startswith("```"):
                out.append("<pre><code>" + html.escape("\n".join(code), quote=False) + "</code></pre>")
                code = None
            else:
                code.append(z)
            continue
        if z.strip().startswith("```"):
            absatz_zu()
            liste_zu()
            code = []
            continue
        if not z.strip():
            absatz_zu()
            liste_zu()
            continue
        if z.lstrip().startswith("|"):
            continue
        m_ul = re.match(r"^[-*] +(.*)$", z)
        m_ol = re.match(r"^\d+[.)] +(.*)$", z)
        m_h = re.match(r"^#{3,6} +(.*)$", z)
        if m_h:
            absatz_zu()
            liste_zu()
            out.append("<p><strong>" + md_inline(m_h.group(1)) + "</strong></p>")
        elif m_ul or m_ol:
            absatz_zu()
            art = "ul" if m_ul else "ol"
            if liste and liste[0] != art:
                liste_zu()
            if not liste:
                liste = (art, [])
            liste[1].append([(m_ul or m_ol).group(1)])
        elif liste and z[:1] in " \t":
            liste[1][-1].append(z.strip())
        elif liste:
            liste[1][-1].append(z.strip())
        else:
            absatz.append(z)
    absatz_zu()
    liste_zu()
    if code is not None:
        out.append("<pre><code>" + html.escape("\n".join(code), quote=False) + "</code></pre>")
    return "".join(out)


def abschnitt(text, titel):
    m = re.search(r"^## " + re.escape(titel) + r"[ \t]*\n(.*?)(?=^## |\Z)", text, re.S | re.M)
    return m.group(1) if m else None


# --------------------------------------------------------------------------
# Demo einbetten
# --------------------------------------------------------------------------
class Einbetter:
    def __init__(self, ordner, slug):
        self.ordner = ordner
        self.slug = slug
        self.schriften = {}   # Datei -> Bytes (nur benutzte)
        self.meldungen = []

    def font_uri(self, rel):
        pfad = (self.ordner / rel).resolve()
        if not pfad.is_file():
            self.meldungen.append("Schrift fehlt: %s" % rel)
            return None
        if pfad.name not in self.schriften:
            self.schriften[pfad.name] = pfad.read_bytes()
        typ = "font/woff2" if pfad.suffix == ".woff2" else "font/woff"
        return "data:%s;base64,%s" % (typ, base64.b64encode(self.schriften[pfad.name]).decode("ascii"))

    def css(self, text):
        def ersetze(m):
            ziel = m.group(2).strip()
            if ziel.startswith(("data:", "#", "%23")):
                return m.group(0)
            if re.search(r"\.woff2?$", ziel, re.I) and not re.match(r"^(https?:)?//", ziel):
                uri = self.font_uri(ziel)
                return 'url("%s")' % uri if uri else m.group(0)
            self.meldungen.append("CSS verweist auf eine Datei: %s" % ziel)
            return m.group(0)

        text = re.sub(r"url\(\s*([\"']?)([^)\"']+)\1\s*\)", ersetze, text)
        return text.replace("</style", "<\\/style")

    def js(self, text):
        if "<!--" in text:
            self.meldungen.append("Skript enthält <!--")
        return text.replace("</script", "<\\/script")

    def lies(self, rel):
        pfad = self.ordner / rel
        if not pfad.is_file():
            self.meldungen.append("Datei fehlt: %s" % rel)
            return ""
        return pfad.read_text(encoding="utf-8")

    def einbetten(self, quelle):
        # 1. Preload und andere Vorab-Hinweise sowie Favicon-Links entfernen
        quelle = re.sub(r"<link\b[^>]*\brel\s*=\s*[\"']?(?:preload|prefetch|modulepreload|dns-prefetch|preconnect)[\"']?[^>]*>[ \t]*\n?", "", quelle, flags=re.I)
        quelle = re.sub(r"<link\b[^>]*\brel\s*=\s*[\"'](?:shortcut )?icon[\"'][^>]*>[ \t]*\n?", "", quelle, flags=re.I)

        # 2. Stylesheets einsetzen
        def stylesheet(m):
            tag = m.group(0)
            href = re.search(r"href\s*=\s*[\"']([^\"']+)[\"']", tag, re.I)
            if not href:
                return ""
            h = href.group(1)
            if re.match(r"^(https?:)?//", h):
                self.meldungen.append("Externes Stylesheet entfernt: %s" % h)
                return ""
            return "<style>\n" + self.css(self.lies(h)) + "\n</style>"

        quelle = re.sub(r"<link\b[^>]*\brel\s*=\s*[\"']stylesheet[\"'][^>]*>", stylesheet, quelle, flags=re.I)
        if re.search(r"<link\b[^>]*\bhref\s*=\s*[\"'](?!data:)", quelle, re.I):
            self.meldungen.append("Es bleibt ein <link> mit href übrig")

        # 3. Skripte einsetzen. Mit defer: ans Ende des body (läuft nach dem Aufbau der Seite)
        verzoegert = []

        def skript(m):
            attr, inhalt = m.group(1), m.group(2)
            src = re.search(r"\bsrc\s*=\s*[\"']([^\"']+)[\"']", attr, re.I)
            if not src:
                return m.group(0)
            s = src.group(1)
            if re.match(r"^(https?:)?//", s):
                self.meldungen.append("Externes Skript entfernt: %s" % s)
                return ""
            neu = "<script>\n" + self.js(self.lies(s)) + "\n</script>"
            if re.search(r"\bdefer\b", attr, re.I):
                verzoegert.append(neu)
                return ""
            return neu

        quelle = re.sub(r"<script\b([^>]*)>(.*?)</script>", skript, quelle, flags=re.S | re.I)
        if verzoegert:
            i = quelle.lower().rfind("</body>")
            block = "\n".join(verzoegert) + "\n"
            quelle = quelle[:i] + block + quelle[i:] if i >= 0 else quelle + block

        # 4. Verweise auf die Seite selbst werden zu "#" (srcdoc hat keine eigene Adresse)
        quelle = re.sub(r"href\s*=\s*([\"'])(?:\./)?demo\.html\1", 'href="#"', quelle, flags=re.I)

        # 4b. Ohne <base> lösen Verweise wie href="#fragen" gegen die Adresse der Galerie auf und
        #     laden dann die Galerie in den Rahmen (oder werden geblockt). Mit about:srcdoc als
        #     Basis bleiben Anker-Links innerhalb der eingebetteten Seite.
        quelle, n = re.subn(r"(<head\b[^>]*>)", r'\1\n<base href="about:srcdoc">', quelle, count=1, flags=re.I)
        if not n:
            self.meldungen.append("kein <head> gefunden, <base> fehlt")

        # 5. Kontrolle: bleibt irgendwo ein Verweis nach außen?
        for m in re.finditer(r"\b(?:src|href|action|poster)\s*=\s*[\"']([^\"']*)[\"']", quelle, re.I):
            wert = m.group(1)
            if wert and not wert.startswith(("#", "data:", "mailto:", "tel:", "javascript:", "about:srcdoc")):
                self.meldungen.append("Verweis bleibt stehen: %s" % wert[:80])
        if re.search(r"url\(\s*[\"']?(?!data:|#|%23)[^)]*\.(?:png|jpe?g|gif|webp|svg|woff2?)", quelle, re.I):
            self.meldungen.append("Ein url() mit Datei bleibt stehen")
        return quelle


def lies_look(skills, slug):
    ordner = skills / ("look-" + slug)
    demo_pfad = ordner / "vorlage" / "demo.html"
    if not demo_pfad.is_file():
        raise SystemExit("Fehler: %s fehlt." % demo_pfad)
    eb = Einbetter(demo_pfad.parent, slug)
    quelle = demo_pfad.read_text(encoding="utf-8")
    fertig = eb.einbetten(quelle)
    ton = "hell"
    m = re.search(r"<meta\s+name=[\"']theme-color[\"']\s+content=[\"']#([0-9a-fA-F]{6})[\"']", quelle)
    if m:
        r, g, b = [int(m.group(1)[i:i + 2], 16) / 255 for i in (0, 2, 4)]
        lin = [(c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4) for c in (r, g, b)]
        helligkeit = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]
        ton = "hell" if helligkeit > 0.3 else "dunkel"
    else:
        warn("%s: keine theme-color gefunden, gilt als hell." % slug)

    skill_text = (ordner / "SKILL.md").read_text(encoding="utf-8")
    teile = {}
    for schluessel, titel in SKILL_ABSCHNITTE.items():
        roh = abschnitt(skill_text, titel)
        if roh is None:
            warn("%s: Abschnitt '%s' fehlt in der SKILL.md." % (slug, titel))
            teile[schluessel] = "<p>Dazu steht nichts in der SKILL.md.</p>"
        else:
            teile[schluessel] = md_html(roh)
    return {
        "html": fertig,
        "ton": ton,
        "teile": teile,
        "schriften": eb.schriften,
        "meldungen": eb.meldungen,
    }


# --------------------------------------------------------------------------
# Wertung
# --------------------------------------------------------------------------
def de_zahl(x, stellen=2):
    s = ("%." + str(stellen) + "f") % x
    if "." in s:
        s = s.rstrip("0").rstrip(".")
    return s.replace(".", ",")


def messwerte_liste(mw):
    if not mw:
        return []

    def stufe(wert, gut, mittel):
        return "gut" if wert <= gut else ("mittel" if wert <= mittel else "schwach")

    def punktestufe(p):
        return "gut" if p >= 90 else ("mittel" if p >= 50 else "schwach")

    liste = []
    if "bytes_kb" in mw:
        liste.append({"label": "Gewicht der Seite", "wert": "%d KB" % mw["bytes_kb"], "st": "",
                      "erkl": "Datenmenge beim Laden (KB heißt Kilobyte). Weniger ist schneller."})
    if "performance" in mw:
        liste.append({"label": "Lighthouse Leistung", "wert": "%d von 100" % mw["performance"], "st": punktestufe(mw["performance"]),
                      "erkl": "Tempo der Seite. Lighthouse ist ein Prüfprogramm von Google."})
    if "barrierefreiheit" in mw:
        liste.append({"label": "Lighthouse Barrierefreiheit", "wert": "%d von 100" % mw["barrierefreiheit"], "st": punktestufe(mw["barrierefreiheit"]),
                      "erkl": "Bedienbarkeit für alle, etwa mit Vorlesehilfe (Screenreader) und genug Kontrast."})
    if "technik" in mw:
        liste.append({"label": "Lighthouse Technik", "wert": "%d von 100" % mw["technik"], "st": punktestufe(mw["technik"]),
                      "erkl": "Sauber gebaute Seite ohne bekannte technische Fehler."})
    if "cls" in mw:
        liste.append({"label": "Layoutverschiebung (CLS)", "wert": de_zahl(mw["cls"], 3), "st": stufe(mw["cls"], 0.1, 0.25),
                      "erkl": "Wie stark Inhalte beim Laden springen. 0 ist ideal, bis 0,1 gilt als gut."})
    if "lcp_ms" in mw:
        liste.append({"label": "Zeit bis zum größten Bild (LCP)", "wert": de_zahl(mw["lcp_ms"] / 1000, 2) + " s", "st": stufe(mw["lcp_ms"], 2500, 4000),
                      "erkl": "Wann der größte sichtbare Teil der Seite fertig ist (gemessen wie auf einem mittleren Handy)."})
    if "tbt_ms" in mw:
        liste.append({"label": "Blockierzeit (TBT)", "wert": "%d ms" % mw["tbt_ms"], "st": stufe(mw["tbt_ms"], 200, 600),
                      "erkl": "Wie lange die Seite beim Laden nicht auf Eingaben reagiert."})
    if "dom_elemente" in mw:
        liste.append({"label": "Bausteine der Seite", "wert": "%d" % mw["dom_elemente"], "st": "",
                      "erkl": "Anzahl der Elemente im Seitenaufbau (DOM). Mehr Bausteine bedeuten mehr Rechenarbeit."})
    if "a11y_fehler" in mw:
        n = len(mw["a11y_fehler"])
        liste.append({"label": "Gefundene Fehler bei der Bedienbarkeit", "wert": "keine" if n == 0 else str(n), "st": "gut" if n == 0 else "schwach",
                      "erkl": "Automatisch gefundene Probleme für Menschen, die die Seite nicht mit der Maus bedienen oder nicht sehen können."})
    return liste


def finde_wertung(arg):
    kandidaten = []
    if arg:
        kandidaten.append(Path(arg))
    if os.environ.get("GALERIE_WERTUNG"):
        kandidaten.append(Path(os.environ["GALERIE_WERTUNG"]))
    kandidaten += WERTUNG_KANDIDATEN
    for k in kandidaten:
        if k.is_file():
            return k
    raise SystemExit("Fehler: bewertung.json nicht gefunden. Gesucht in:\n  " + "\n  ".join(str(k) for k in kandidaten)
                     + "\nMit --wertung PFAD kann man die Datei angeben.")


# --------------------------------------------------------------------------
# HTML der Galerie (statischer Teil)
# --------------------------------------------------------------------------
def e(s):
    return html.escape(str(s), quote=True)


def note_zelle(k, wert):
    return ('<td class="c-note" data-k="%s"><span class="n n%d">%d<span class="sr"> von 5, %s</span></span></td>'
            % (e(KRITERIEN_KURZ[k]), wert, wert, e(k)))


def baue_kopf():
    return """
<header class="kopf">
  <div class="huelle">
    <p class="kopf__klein">HORTA, elektrischer Gemüseschneider</p>
    <h1>Design-Galerie: 18 Looks für HORTA</h1>
    <p class="lede">Hier siehst du alle 18 Design-Looks (so heißen die Gestaltungsstile) für die Startseite von HORTA. Du kannst jeden Look groß ausprobieren, zwischen PC und Handy umschalten und bis zu drei Looks nebeneinander vergleichen. Alles steckt in dieser einen Datei und funktioniert auch ohne Internet.</p>
    <nav class="sprung" aria-label="Abschnitte dieser Seite">
      <a href="#urteil">Mein Urteil</a>
      <a href="#methode">Wie ich bewertet habe</a>
      <a href="#looks">Alle Looks</a>
      <a href="#vergleich">Vergleich</a>
      <a href="#ablage">Wo die Looks liegen</a>
    </nav>
  </div>
</header>"""


def baue_urteil(looks):
    teile = ['<section class="abschnitt" id="urteil" aria-labelledby="urteil-titel"><div class="huelle">',
             '<h2 id="urteil-titel">Mein Urteil</h2>',
             '<p class="unter">Gewertet wurde für HORTA: ein Küchengerät aus China für 44,90 Euro, mit viel Besuch vom Handy.</p>',
             '<ol class="podium">']
    for _, nr, kopf, text1, nachteil, text2, slug in URTEIL_ABSAETZE:
        teile.append(
            '<li class="platz platz--%d"><p><strong>%s</strong>%s<strong>%s</strong>%s</p>'
            '<button type="button" data-open="%s" class="knopf">%s groß ansehen</button></li>'
            % (nr, e(kopf), e(text1), e(nachteil), e(text2), e(slug), e(next(l["name"] for l in looks if l["slug"] == slug))))
    teile.append("</ol>")
    teile.append('<div class="prosa">')
    for fett, rest in URTEIL_REST:
        teile.append("<p><strong>%s</strong>%s</p>" % (e(fett), e(rest)))
    teile.append("</div>")
    teile.append("""<aside class="erklaer" aria-label="Kurz erklärt">
<h3>Kurz erklärt</h3>
<ul>
<li><strong>Lighthouse</strong> ist ein kostenloses Prüfprogramm von Google. Es gibt einer Seite Punkte von 0 bis 100 für Tempo, Bedienbarkeit und saubere Technik.</li>
<li><strong>Layoutverschiebung</strong> heißt: Die Seite springt beim Laden hin und her, weil etwas später erscheint. 0 ist ideal.</li>
<li><strong>Punkte von 100</strong> sind die gewichteten Noten, umgerechnet auf eine Skala bis 100 (Rechnung unter "Wie ich bewertet habe").</li>
</ul>
</aside>""")
    # Rangliste
    teile.append('<h3 class="tabellen-titel" id="rang-titel">Rangliste aller 18 Looks</h3>')
    teile.append('<p class="unter">Noten von 1 (schwach) bis 5 (sehr gut). Bei Aufwand heißt 5: wenig Aufwand. Bei Risiko heißt 5: geringes Risiko. Ein Klick auf den Namen öffnet die Großansicht.</p>')
    teile.append('<table class="rang-tabelle" aria-labelledby="rang-titel"><thead><tr>'
                 '<th scope="col" class="c-rang">Rang</th><th scope="col" class="c-name">Look</th><th scope="col" class="c-punkte">Punkte</th>')
    kri = looks[0]["kriterien"]
    for k in kri:
        teile.append('<th scope="col" class="kn"><span>%s &times;%d</span></th>' % (e(k["name"]), k["gewicht"]))
    teile.append('<th scope="col" class="c-grund">Begründung</th></tr></thead><tbody>')
    for l in looks:
        r = l["rang"]
        klasse = " platz-%d" % r if r <= 3 else ""
        zeile = ['<tr class="zeile%s" data-slug="%s">' % (klasse, e(l["slug"]))]
        zeile.append('<td class="c-rang"><span class="abz abz--%d" aria-label="Rang %d">%d</span></td>' % (min(r, 4), r, r))
        zeile.append('<th scope="row" class="c-name"><button type="button" class="textknopf" data-open="%s" aria-label="%s groß ansehen">%s</button></th>'
                     % (e(l["slug"]), e(l["name"]), e(l["name"])))
        zeile.append('<td class="c-punkte"><span class="pkt"><b>%d</b> <span class="von">von 100</span></span>'
                     '<span class="balken" aria-hidden="true"><i style="width:%d%%"></i></span></td>' % (l["punkte"], l["punkte"]))
        for k in kri:
            zeile.append(note_zelle(k["name"], l["noten"][k["name"]]))
        zeile.append('<td class="c-grund">%s</td></tr>' % e(l["begruendung"]))
        teile.append("".join(zeile))
    teile.append("</tbody></table></div></section>")
    return "\n".join(teile)


def baue_methode(kriterien, gewichtssumme):
    teile = ['<section class="abschnitt" id="methode" aria-labelledby="methode-titel"><div class="huelle">',
             '<h2 id="methode-titel">Wie ich bewertet habe</h2>',
             '<p class="unter">Jeder Look bekam in acht Kriterien eine Note von 1 bis 5. Manche Kriterien zählen mehr, das nennt man das Gewicht. Aus den gewichteten Noten ergeben sich die Punkte von 100.</p>',
             '<ul class="kriterien">']
    for k in kriterien:
        teile.append('<li><span class="gew" aria-label="Gewicht %d">&times;%d</span><div><h3>%s</h3><p>%s</p></div></li>'
                     % (k["gewicht"], k["gewicht"], e(k["name"]), e(KRITERIEN_TEXT.get(k["name"], ""))))
    teile.append("</ul>")
    teile.append('<p class="rechnung"><strong>Rechnung:</strong> Jede Note mal ihr Gewicht nehmen, alles zusammenzählen, durch %d teilen (so viel wäre bei lauter Fünfen erreicht) und mal 100 nehmen.</p>'
                 % (5 * gewichtssumme))
    teile.append('<div class="grenze"><h3>Die ehrliche Grenze</h3><p>%s</p>'
                 '<p>Chromium ist die Browser-Grundlage von Chrome und Edge. Ein Prüfskript ist ein kleines Programm, das die Seite automatisch auf typische Fehler testet. Die Noten sind also meine Einschätzung und keine Messung bei echten Käufern.</p></div>'
                 % e(GRENZE))
    teile.append("</div></section>")
    return "\n".join(teile)


def baue_karten(looks):
    teile = ['<section class="abschnitt" id="looks" aria-labelledby="looks-titel"><div class="huelle">',
             '<h2 id="looks-titel">Alle 18 Looks</h2>',
             '<p class="unter">Jede Karte zeigt die HORTA-Startseite im jeweiligen Look. Die kleine Vorschau ist nur zum Anschauen. Mit "Groß ansehen" kannst du die Seite wirklich bedienen und scrollen.</p>']
    n_hell = sum(1 for l in looks if l["ton"] == "hell")
    n_dunkel = len(looks) - n_hell
    teile.append("""<div class="werkzeuge" role="group" aria-label="Anzeige der Looks einstellen">
  <div class="wz"><span class="wz__name" id="wz-sort">Sortieren</span>
    <span class="umschalter" role="group" aria-labelledby="wz-sort">
      <button type="button" data-sort="rang" aria-pressed="true">Nach Rang</button>
      <button type="button" data-sort="name" aria-pressed="false">Nach Name</button>
    </span></div>
  <div class="wz"><span class="wz__name" id="wz-filter">Zeigen</span>
    <span class="umschalter" role="group" aria-labelledby="wz-filter">
      <button type="button" data-filter="alle" aria-pressed="true">Alle (%d)</button>
      <button type="button" data-filter="hell" aria-pressed="false">Hell (%d)</button>
      <button type="button" data-filter="dunkel" aria-pressed="false">Dunkel (%d)</button>
    </span></div>
  <div class="wz"><span class="wz__name" id="wz-vorschau">Vorschau für alle</span>
    <span class="umschalter" role="group" aria-labelledby="wz-vorschau">
      <button type="button" data-alle-modus="pc" aria-pressed="true">PC</button>
      <button type="button" data-alle-modus="handy" aria-pressed="false">Handy</button>
    </span></div>
</div>
<p class="status" id="status" role="status" aria-live="polite"></p>
<noscript><p class="hinweis-box">Für die Vorschauen braucht die Galerie JavaScript (kleine Programme im Browser). Die Rangliste oben ist auch ohne sichtbar.</p></noscript>""" % (len(looks), n_hell, n_dunkel))
    teile.append('<ul class="raster" id="raster">')
    for l in looks:
        s = e(l["slug"])
        n = e(l["name"])
        r = l["rang"]
        teile.append(f"""<li class="karte" data-slug="{s}" data-rang="{r}" data-name="{n}" data-ton="{l['ton']}" data-modus="pc">
<article aria-labelledby="kt-{s}">
  <div class="vorschau">
    <span class="platzabz platzabz--{min(r, 4)}">Platz {r}</span>
    <div class="vorschau__bild">
      <span class="vorschau__platzhalter" aria-hidden="true">Vorschau wird geladen</span>
      <iframe sandbox="allow-scripts" tabindex="-1" aria-hidden="true" title=""></iframe>
    </div>
  </div>
  <div class="karte__text">
    <h3 id="kt-{s}">{n}</h3>
    <p class="karte__punkte"><b>{l['punkte']}</b> von 100 Punkten<span class="tag">{'Heller Look' if l['ton'] == 'hell' else 'Dunkler Look'}</span></p>
    <p class="karte__satz">{e(l['kurz'])}</p>
  </div>
  <div class="karte__aktionen">
    <span class="umschalter" role="group" aria-label="Vorschau von {n}">
      <button type="button" data-modus="pc" aria-pressed="true">PC</button>
      <button type="button" data-modus="handy" aria-pressed="false">Handy</button>
    </span>
    <button type="button" class="knopf knopf--haupt" data-open="{s}">Groß ansehen<span class="sr">: {n}</span></button>
    <label class="vgl-wahl"><input type="checkbox" data-vgl="{s}"><span>Zum Vergleich<span class="sr"> wählen: {n}</span></span></label>
  </div>
</article>
</li>""")
    teile.append("</ul></div></section>")
    return "\n".join(teile)


def baue_vergleich():
    return """<section class="abschnitt" id="vergleich" aria-labelledby="vergleich-titel"><div class="huelle">
<h2 id="vergleich-titel" tabindex="-1">Vergleich</h2>
<p class="unter">Wähle bei bis zu drei Karten "Zum Vergleich". Hier stehen sie dann nebeneinander in der Handy-Ansicht (zum Ausprobieren), darunter die Noten und das Pro und Contra.</p>
<p class="leer" id="vergleich-leer">Noch kein Look gewählt. Setze oben bei einer Karte den Haken bei "Zum Vergleich".</p>
<div id="vergleich-inhalt" aria-live="polite"></div>
</div></section>"""


def baue_ablage(slugs):
    items = "".join('<li><code>look-%s</code></li>' % e(s) for s in slugs)
    return f"""<footer class="abschnitt fuss" id="ablage" aria-labelledby="ablage-titel"><div class="huelle">
<h2 id="ablage-titel">Wo die Looks liegen</h2>
<p>Jeder Look ist auch ein eigener Skill (eine Anleitung samt Vorlage, die Claude Code abrufen kann). Sie liegen im Projekt im Ordner <code>.claude/skills</code> und heißen <code>look-</code> plus Name, zum Beispiel <code>look-isometric</code>.</p>
<p>In jedem Skill-Ordner steht <code>vorlage/demo.html</code> (die Seite), <code>vorlage/style.css</code> (das Aussehen), <code>vorlage/script.js</code> (die Bewegung) und <code>SKILL.md</code> (die Anleitung mit Pro und Contra). Der Sammel-Skill <code>design-vorlagen</code> fasst alle Looks zusammen.</p>
<details><summary>Alle 18 Skill-Namen</summary><ul class="skillnamen">{items}</ul></details>
<p>Diese Galerie neu bauen (liest immer den aktuellen Stand der Looks): <code>python3 .claude/skills/design-vorlagen/scripts/galerie_bauen.py</code></p>
</div></footer>"""


def baue_dialog_und_leiste():
    return """
<aside class="vgl-leiste" id="vgl-leiste" aria-label="Vergleichsauswahl" hidden>
  <div class="huelle vgl-leiste__innen">
    <p id="vgl-text" class="vgl-leiste__text"></p>
    <button type="button" class="knopf knopf--haupt" id="vgl-springen">Vergleich ansehen</button>
    <button type="button" class="knopf" id="vgl-leeren">Leeren<span class="sr"> (Auswahl entfernen)</span></button>
  </div>
</aside>

<dialog id="gross" class="gross" aria-labelledby="gross-titel">
  <div class="gross__huelle">
    <div class="gross__kopf">
      <h2 id="gross-titel" tabindex="-1"></h2>
      <button type="button" class="knopf knopf--haupt" id="gross-zu">Schließen<span class="sr"> (Esc)</span></button>
    </div>
    <div class="gross__leiste">
      <span class="umschalter" role="group" aria-label="Bildschirmgröße">
        <button type="button" data-geraet="pc" aria-pressed="true">PC<span class="zahl"> (1280)</span></button>
        <button type="button" data-geraet="tablet" aria-pressed="false">Tablet<span class="zahl"> (820)</span></button>
        <button type="button" data-geraet="handy" aria-pressed="false">Handy<span class="zahl"> (390)</span></button>
      </span>
      <span class="umschalter gross__tabs" role="group" aria-label="Bereich anzeigen">
        <button type="button" data-bereich="ansicht" aria-pressed="true">Ansicht</button>
        <button type="button" data-bereich="beide" class="nur-breit" aria-pressed="false">Beides</button>
        <button type="button" data-bereich="wertung" aria-pressed="false">Wertung</button>
      </span>
      <p class="gross__info" id="gross-info"></p>
    </div>
    <div class="gross__koerper" id="gross-koerper" data-bereich="ansicht">
      <section class="gross__bild" id="gross-bild" aria-label="Die Seite im gewählten Format"><div class="rahmen" id="gross-rahmen"></div></section>
      <aside class="gross__tafel" id="gross-tafel" role="region" aria-label="Wertung, Messwerte, Pro und Contra" tabindex="0"></aside>
    </div>
    <div class="gross__fuss">
      <button type="button" id="gross-zurueck" aria-label="Vorheriger Look">Vorheriger</button>
      <p class="gross__zaehler" id="gross-zaehler"></p>
      <button type="button" id="gross-weiter" aria-label="Nächster Look">Nächster</button>
    </div>
    <p class="sr" id="gross-ansage" role="status" aria-live="polite"></p>
  </div>
</dialog>
"""


# --------------------------------------------------------------------------
# Stil der Galerie
# --------------------------------------------------------------------------
STIL = r"""
:root{
  color-scheme: light dark;
  --bg:#f4f4f1; --flaeche:#ffffff; --flaeche2:#ebebe7; --text:#1a1a1c; --text2:#4b4d55;
  --linie:#d6d6d0; --linie2:#85878f; --akzent:#1a56c4; --akzent-text:#ffffff; --akzent-hell:#e4ecfb;
  --fokus:#1a56c4; --gut:#17652f; --mittel:#8a5a00; --schwach:#a3361a;
  --gold-bg:#fff2c4; --gold-text:#5a4200; --gold-rand:#c99a1b;
  --silber-bg:#e9ecf1; --silber-text:#353a44; --silber-rand:#8f96a3;
  --bronze-bg:#fbe3d0; --bronze-text:#6a3510; --bronze-rand:#c47a3e;
  --radius:12px; --schatten:0 1px 2px rgba(0,0,0,.07),0 4px 14px rgba(0,0,0,.06);
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#111214; --flaeche:#1a1b1e; --flaeche2:#26282c; --text:#ededee; --text2:#b0b2b9;
    --linie:#34363c; --linie2:#7a7d86; --akzent:#8db4ff; --akzent-text:#0a1530; --akzent-hell:#1d2a45;
    --fokus:#8db4ff; --gut:#6ed19a; --mittel:#f0c36a; --schwach:#ff9a72;
    --gold-bg:#3d3210; --gold-text:#ffe9a6; --gold-rand:#b8902a;
    --silber-bg:#2d3138; --silber-text:#dfe3ea; --silber-rand:#7b8392;
    --bronze-bg:#43291a; --bronze-text:#ffd7b8; --bronze-rand:#a8683a;
    --schatten:0 1px 2px rgba(0,0,0,.4),0 4px 14px rgba(0,0,0,.3);
  }
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scrollbar-gutter:stable;background:var(--bg)}
html.dialog-offen{overflow:hidden}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;overflow-wrap:break-word}
body.mit-leiste{padding-bottom:88px}
h1,h2,h3,h4{line-height:1.2;margin:0}
p{margin:0 0 .8em}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.88em;background:var(--flaeche2);padding:.08em .35em;border-radius:5px}
a{color:var(--akzent)}
[hidden]{display:none!important}
.sr{position:absolute!important;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
:focus-visible{outline:3px solid var(--fokus);outline-offset:2px}
.skip{position:absolute;left:8px;top:-60px;background:var(--akzent);color:var(--akzent-text);padding:12px 16px;border-radius:8px;z-index:100}
.skip:focus{top:8px}
.huelle{max-width:1240px;margin:0 auto;padding:0 16px}

/* Knöpfe */
button{font:inherit;color:var(--text);background:var(--flaeche);border:1.5px solid var(--linie2);border-radius:10px;min-height:44px;min-width:44px;padding:8px 14px;cursor:pointer;line-height:1.2}
button:hover{background:var(--flaeche2)}
button[aria-pressed="true"]{background:var(--akzent);border-color:var(--akzent);color:var(--akzent-text);font-weight:600}
button[aria-pressed="true"]:hover{background:var(--akzent)}
button:disabled{opacity:.5;cursor:not-allowed}
.knopf--haupt{background:var(--akzent);border-color:var(--akzent);color:var(--akzent-text);font-weight:600}
.knopf--haupt:hover{background:var(--akzent);filter:brightness(1.1)}
.textknopf{border:0;background:none;padding:6px 2px;text-align:left;color:var(--akzent);font-weight:600;text-decoration:underline;text-underline-offset:3px;min-width:0;border-radius:6px}
.textknopf:hover{background:none;text-decoration-thickness:2px}
.umschalter{display:inline-flex;flex-wrap:wrap;gap:6px;vertical-align:middle}

/* Kopf */
.kopf{padding:40px 0 8px}
.kopf__klein{margin:0 0 8px;color:var(--text2);font-size:.9375rem}
h1{font-size:clamp(1.75rem,1.1rem + 3vw,2.75rem);letter-spacing:-.01em}
.lede{max-width:46rem;margin:14px 0 18px;font-size:1.0625rem;color:var(--text2)}
.sprung{display:flex;flex-wrap:wrap;gap:8px}
.sprung a{display:inline-flex;align-items:center;min-height:44px;padding:6px 14px;border:1.5px solid var(--linie2);border-radius:999px;background:var(--flaeche);color:var(--text);text-decoration:none}
.sprung a:hover{background:var(--flaeche2)}
.abschnitt{margin-top:56px;scroll-margin-top:12px}
h2{font-size:clamp(1.4rem,1.1rem + 1.4vw,1.9rem);margin-bottom:8px}
h3{font-size:1.125rem}
.unter{color:var(--text2);max-width:48rem}

/* Urteil */
.podium{list-style:none;margin:22px 0 0;padding:0;display:grid;gap:16px;grid-template-columns:1fr}
.platz{display:flex;flex-direction:column;gap:12px;justify-content:space-between;padding:18px;border-radius:var(--radius);border:2px solid var(--linie);background:var(--flaeche)}
.platz p{margin:0}
.platz .knopf{align-self:flex-start}
.platz--1{background:var(--gold-bg);color:var(--gold-text);border-color:var(--gold-rand)}
.platz--2{background:var(--silber-bg);color:var(--silber-text);border-color:var(--silber-rand)}
.platz--3{background:var(--bronze-bg);color:var(--bronze-text);border-color:var(--bronze-rand)}
.platz button{color:var(--text)}
.platz button.knopf{background:var(--flaeche)}
.prosa{margin-top:22px;max-width:50rem}
.prosa p{margin-bottom:.9em}
.erklaer{margin-top:20px;padding:16px 18px;border-radius:var(--radius);background:var(--akzent-hell);max-width:50rem}
.erklaer h3{margin-bottom:6px}
.erklaer ul{margin:0;padding-left:1.2em}
.erklaer li{margin:4px 0}
.tabellen-titel{margin-top:36px}

/* Rangliste */
.rang-tabelle{width:100%;margin-top:14px;border-collapse:separate;border-spacing:0;background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--radius);overflow:hidden;font-size:.9375rem}
.rang-tabelle th,.rang-tabelle td{padding:8px 10px;border-bottom:1px solid var(--linie);text-align:left;vertical-align:middle}
.rang-tabelle tbody tr:last-child>*{border-bottom:0}
.rang-tabelle thead th{background:var(--flaeche2);font-weight:600;font-size:.8125rem;vertical-align:bottom}
.rang-tabelle .kn{padding:8px 2px;text-align:center;width:2.9rem}
.rang-tabelle .kn span{display:inline-block;writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;height:9.8em;text-align:left}
.rang-tabelle .c-rang{width:3.4rem}
.rang-tabelle .c-name{width:10.5rem;font-weight:600}
.rang-tabelle .c-punkte{width:8.5rem}
.rang-tabelle .c-note{text-align:center;padding:6px 2px}
.rang-tabelle .c-grund{color:var(--text2);min-width:14rem}
.zeile.platz-1>*{background:var(--gold-bg);color:var(--gold-text)}
.zeile.platz-2>*{background:var(--silber-bg);color:var(--silber-text)}
.zeile.platz-3>*{background:var(--bronze-bg);color:var(--bronze-text)}
.zeile.platz-1 .c-grund,.zeile.platz-2 .c-grund,.zeile.platz-3 .c-grund{color:inherit}
.zeile .textknopf{color:inherit}
.abz{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;border:2px solid var(--linie2);font-weight:700;background:var(--flaeche);color:var(--text)}
.abz--1{background:var(--gold-rand);border-color:var(--gold-rand);color:#1a1200}
.abz--2{background:var(--silber-rand);border-color:var(--silber-rand);color:#101216}
.abz--3{background:var(--bronze-rand);border-color:var(--bronze-rand);color:#1f0e02}
.pkt b{font-size:1.125rem}
.von{font-size:.8125rem;opacity:.85}
.balken{display:block;height:6px;border-radius:3px;background:var(--linie);margin-top:5px;overflow:hidden}
.balken i{display:block;height:100%;background:var(--akzent)}
.n{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;border-radius:8px;font-weight:700;color:var(--text);background:var(--flaeche2)}
.n1{background:var(--flaeche2)}
.n2{background:color-mix(in srgb,var(--akzent) 12%,var(--flaeche))}
.n3{background:color-mix(in srgb,var(--akzent) 24%,var(--flaeche))}
.n4{background:color-mix(in srgb,var(--akzent) 36%,var(--flaeche))}
.n5{background:color-mix(in srgb,var(--akzent) 46%,var(--flaeche))}
.zeile>* .n{color:var(--text)}

/* Rangliste auf schmaleren Bildschirmen: jede Zeile wird ein Block */
@media (max-width:1099px){
  .rang-tabelle,.rang-tabelle tbody{display:block}
  .rang-tabelle thead{display:none}
  .rang-tabelle tr{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px 6px;padding:12px;border-bottom:1px solid var(--linie);align-items:center}
  .rang-tabelle tbody tr:last-child{border-bottom:0}
  .rang-tabelle th,.rang-tabelle td{display:block;padding:0;border:0;width:auto;min-width:0}
  .rang-tabelle .c-rang{grid-column:span 1}
  .rang-tabelle .c-name{grid-column:span 4;width:auto}
  .rang-tabelle .c-punkte{grid-column:span 3;width:auto}
  .rang-tabelle .c-note{grid-column:span 1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 0 0}
  .rang-tabelle .c-note::after{content:attr(data-k);font-size:.75rem;line-height:1.1;text-align:center;overflow-wrap:anywhere}
  .rang-tabelle .c-grund{grid-column:span 8;min-width:0;padding-top:4px}
  .zeile.platz-1,.zeile.platz-2,.zeile.platz-3{border-radius:0}
  .zeile.platz-1>*{background:none}.zeile.platz-2>*{background:none}.zeile.platz-3>*{background:none}
  .zeile.platz-1{background:var(--gold-bg);color:var(--gold-text)}
  .zeile.platz-2{background:var(--silber-bg);color:var(--silber-text)}
  .zeile.platz-3{background:var(--bronze-bg);color:var(--bronze-text)}
}
@media (max-width:599px){
  .rang-tabelle .c-name{grid-column:span 7}
  .rang-tabelle .c-punkte{grid-column:span 8}
  .rang-tabelle .c-note{grid-column:span 2}
  .rang-tabelle .c-grund{grid-column:span 8}
}
@media (min-width:900px){.podium{grid-template-columns:repeat(3,minmax(0,1fr))}}

/* Methode */
.kriterien{list-style:none;margin:20px 0 0;padding:0;display:grid;gap:12px;grid-template-columns:1fr}
.kriterien li{display:flex;gap:14px;align-items:flex-start;padding:14px 16px;background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--radius)}
.kriterien h3{font-size:1.0625rem;margin-bottom:2px}
.kriterien p{margin:0;color:var(--text2)}
.gew{flex:none;display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:44px;border-radius:10px;background:var(--akzent-hell);color:var(--text);font-weight:700}
.rechnung{margin-top:18px;max-width:50rem}
.grenze{margin-top:18px;padding:16px 18px;border-radius:var(--radius);border:2px solid var(--linie2);background:var(--flaeche);max-width:50rem}
.grenze h3{margin-bottom:6px}
.grenze p:last-child{margin-bottom:0;color:var(--text2)}
@media (min-width:800px){.kriterien{grid-template-columns:repeat(2,minmax(0,1fr))}}

/* Werkzeugleiste und Raster */
.werkzeuge{display:flex;flex-wrap:wrap;gap:12px 28px;margin:20px 0 6px;padding:14px 16px;background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--radius)}
.wz{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.wz__name{font-weight:600;font-size:.9375rem}
.status{margin:8px 0 14px;color:var(--text2);font-size:.9375rem;min-height:1.5em}
.hinweis-box{padding:12px 14px;border:1px solid var(--linie2);border-radius:10px;background:var(--flaeche)}
.raster{list-style:none;margin:0;padding:0;display:grid;gap:20px;grid-template-columns:minmax(0,1fr)}
@media (min-width:700px){.raster{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1100px){.raster{grid-template-columns:repeat(3,minmax(0,1fr))}}
.karte>article{height:100%;display:flex;flex-direction:column;background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--radius);overflow:hidden;box-shadow:var(--schatten)}
.karte.gewaehlt>article{border-color:var(--akzent);box-shadow:0 0 0 2px var(--akzent)}
.vorschau{position:relative;background:var(--flaeche2);border-bottom:1px solid var(--linie)}
.vorschau__bild{position:relative;aspect-ratio:16/10;overflow:hidden;cursor:zoom-in}
.vorschau__platzhalter{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--text2);font-size:.9375rem}
.vorschau iframe{position:absolute;left:0;top:0;border:0;transform-origin:0 0;pointer-events:none;background:transparent}
.platzabz{position:absolute;bottom:-16px;left:14px;z-index:2;padding:4px 12px;border-radius:999px;font-weight:700;font-size:.875rem;background:var(--flaeche);color:var(--text);border:2px solid var(--linie2);pointer-events:none}
.platzabz--1{background:var(--gold-bg);color:var(--gold-text);border-color:var(--gold-rand)}
.platzabz--2{background:var(--silber-bg);color:var(--silber-text);border-color:var(--silber-rand)}
.platzabz--3{background:var(--bronze-bg);color:var(--bronze-text);border-color:var(--bronze-rand)}
.karte__text{padding:26px 16px 6px}
.karte__text h3{font-size:1.25rem}
.karte__punkte{margin:6px 0 4px;color:var(--text2);display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px}
.karte__punkte b{color:var(--text);font-size:1.125rem}
.tag{font-size:.8125rem;border:1px solid var(--linie2);border-radius:999px;padding:1px 10px}
.karte__satz{margin:0;color:var(--text2)}
.karte__aktionen{margin-top:auto;padding:10px 16px 16px;display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px}
.vgl-wahl{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 6px;cursor:pointer}
.vgl-wahl input{width:22px;height:22px;margin:0;accent-color:var(--akzent)}
.vgl-wahl input:disabled+span{opacity:.65}
.vgl-wahl input:disabled{cursor:not-allowed}

/* Vergleichsleiste */
.vgl-leiste{position:fixed;left:0;right:0;bottom:0;z-index:20;background:var(--flaeche);border-top:2px solid var(--akzent);padding:10px 0 calc(10px + env(safe-area-inset-bottom));box-shadow:0 -6px 20px rgba(0,0,0,.15)}
.vgl-leiste__innen{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}
.vgl-leiste__text{margin:0;flex:1 1 220px;font-size:.9375rem}
.vgl-leiste__text .lang{display:inline}
@media (max-width:699px){
  .vgl-leiste{padding:8px 0 calc(8px + env(safe-area-inset-bottom))}
  .vgl-leiste__innen{flex-wrap:nowrap;gap:8px}
  .vgl-leiste__text{flex:1 1 auto;min-width:0;font-size:.875rem;line-height:1.25}
  .vgl-leiste__text .lang{display:none}
  .vgl-leiste .knopf{padding:8px 10px;flex:none}
  body.mit-leiste{padding-bottom:72px}
}

/* Vergleich */
.leer{padding:16px;border:1px dashed var(--linie2);border-radius:var(--radius);background:var(--flaeche);color:var(--text2)}
.vgl-raster{display:grid;gap:20px;grid-template-columns:minmax(0,1fr);margin-top:18px}
.vgl-spalte{min-width:0;background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--radius);padding:14px}
.vgl-spalte__kopf{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;margin-bottom:10px}
.vgl-spalte__kopf h3{flex:1 1 auto}
.vgl-spalte__kopf .platzabz{position:static}
.vgl-spalte__knoepfe{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.vgl-rahmen{position:relative;overflow:hidden;border-radius:10px;border:1px solid var(--linie2);background:var(--flaeche2);width:100%}
.vgl-rahmen iframe{position:absolute;left:0;top:0;border:0;transform-origin:0 0;background:transparent}
.vgl-tabelle-huelle{position:relative;margin-top:10px;overflow-x:auto}
.vgl-tabelle{width:100%;border-collapse:collapse;background:var(--flaeche);border:1px solid var(--linie);font-size:.9375rem}
.vgl-tabelle caption{text-align:left;font-weight:700;font-size:1.0625rem;padding:0 0 8px}
.vgl-tabelle th,.vgl-tabelle td{padding:8px 10px;border:1px solid var(--linie);text-align:left;vertical-align:top}
.vgl-tabelle thead th{background:var(--flaeche2)}
.vgl-tabelle tbody th{font-weight:600;background:var(--flaeche)}
.vgl-tabelle td.beste{font-weight:700;background:var(--akzent-hell)}
.vgl-titel{margin-top:26px}
@media (max-width:599px){.vgl-tabelle{font-size:.8125rem}.vgl-tabelle th,.vgl-tabelle td{padding:6px 5px}.vgl-tabelle tbody th{overflow-wrap:anywhere}}
.vgl-tabelle .gew-klein{display:block;font-weight:400;font-size:.8125rem;color:var(--text2)}
.vgl-pc{display:grid;gap:20px;grid-template-columns:minmax(0,1fr);margin-top:22px}
.vgl-pc section{min-width:0;background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--radius);padding:14px 16px}
.vgl-pc h4{font-size:1rem;margin:12px 0 4px}
.vgl-pc h3{margin-bottom:2px}
@media (min-width:900px){
  .vgl-raster,.vgl-pc{grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}
}

/* Listen mit Pro und Contra */
.pc-liste ul,.t-liste ul,.vgl-pc ul{margin:4px 0 10px;padding:0;list-style:none}
.t-liste li,.vgl-pc li{position:relative;margin:6px 0;padding:2px 0 2px 14px;border-left:3px solid var(--linie2)}
.t-pro li,.vgl-pro li{border-left-color:var(--gut)}
.t-contra li,.vgl-contra li{border-left-color:var(--schwach)}

/* Großansicht */
dialog.gross{padding:0;border:0;background:var(--flaeche);color:var(--text);border-radius:14px;width:min(1680px,calc(100vw - 32px));height:calc(100vh - 32px);height:calc(100dvh - 32px);max-width:none;max-height:none;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.5)}
dialog.gross[open]{display:block}
dialog.gross::backdrop{background:rgba(8,8,10,.62)}
.gross__huelle{display:flex;flex-direction:column;width:100%;height:100%;min-height:0}
.gross__kopf{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px;border-bottom:1px solid var(--linie)}
.gross__kopf h2{margin:0;font-size:1.25rem;display:flex;flex-wrap:wrap;align-items:center;gap:8px;outline-offset:4px}
.gross__kopf .platzabz{position:static}
.gross__leiste{display:flex;flex-wrap:wrap;align-items:center;gap:8px 16px;padding:8px 16px;border-bottom:1px solid var(--linie);background:var(--bg)}
.gross__info{margin:0;color:var(--text2);font-size:.875rem;flex:1 1 200px}
.gross__fuss{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 16px;border-top:1px solid var(--linie);background:var(--bg)}
.gross__zaehler{margin:0;color:var(--text2);font-size:.9375rem;text-align:center}
.gross__koerper{flex:1 1 auto;min-height:0;display:grid;grid-template-columns:minmax(0,1fr)}
.gross__bild{position:relative;min-width:0;min-height:0;background:var(--flaeche2);overflow:hidden;display:flex;align-items:center;justify-content:center}
.rahmen{position:relative;overflow:hidden;background:#fff;box-shadow:0 2px 16px rgba(0,0,0,.25)}
.rahmen iframe{position:absolute;left:0;top:0;border:0;transform-origin:0 0;background:#fff}
.gross__tafel{min-height:0;overflow:auto;padding:16px 18px 28px;overscroll-behavior:contain}
.umschalter .nur-breit{display:none}
.gross__koerper[data-bereich="ansicht"] .gross__tafel,.gross__koerper[data-bereich="beide"] .gross__tafel{display:none}
.gross__koerper[data-bereich="wertung"] .gross__bild{display:none}
@media (min-width:1100px){
  .umschalter .nur-breit{display:inline-block}
  .gross__koerper[data-bereich="beide"]{grid-template-columns:minmax(0,1fr) 420px}
  .gross__koerper[data-bereich="beide"] .gross__tafel{display:block;border-left:1px solid var(--linie)}
  .gross__koerper[data-bereich="wertung"] .gross__tafel{width:100%;max-width:780px;margin:0 auto}
}
@media (max-width:700px){
  dialog.gross{width:100vw;height:100vh;height:100dvh;max-width:none;max-height:none;margin:0;border-radius:0}
  .gross__kopf{padding:8px 12px}
  .gross__leiste{padding:8px 12px;gap:8px}
  .gross__fuss{padding:8px 12px}
  .gross__leiste button{padding:8px 10px}
  .gross__leiste{gap:8px 12px}
  .zahl{display:none}
  .gross__zaehler{white-space:nowrap}
  .gross__tafel{padding:14px 14px 28px}
  .gross__info{display:none}
}
.t-titel{margin-bottom:6px}
.t-punkte{font-size:1.0625rem;margin-bottom:10px}
.t-punkte strong{font-size:1.5rem}
.gross__tafel h4{margin:20px 0 6px;font-size:1rem}
.t-noten{width:100%;border-collapse:collapse;font-size:.9375rem}
.t-noten th,.t-noten td{padding:6px 4px;border-bottom:1px solid var(--linie);text-align:left;vertical-align:middle}
.t-noten th{font-weight:600}
.t-noten .gew-klein{display:block;font-weight:400;font-size:.8125rem;color:var(--text2)}
.t-noten .num{white-space:nowrap;text-align:right;color:var(--text2)}
.pips{display:inline-flex;gap:4px}
.pips i{display:block;width:16px;height:10px;border-radius:3px;border:1.5px solid var(--linie2)}
.pips i.an{background:var(--akzent);border-color:var(--akzent)}
.t-mess{margin:0}
.t-mess>div{padding:8px 0;border-bottom:1px solid var(--linie)}
.t-mess dt{font-weight:600;font-size:.9375rem}
.t-mess dd{margin:2px 0 0}
.t-mess .erkl{display:block;color:var(--text2);font-size:.875rem}
.st{font-size:.8125rem;font-weight:600;margin-left:6px;padding:1px 8px;border-radius:999px;border:1.5px solid currentColor}
.st-gut{color:var(--gut)}.st-mittel{color:var(--mittel)}.st-schwach{color:var(--schwach)}
.t-skill{margin-top:20px;color:var(--text2);font-size:.9375rem}

/* Fuß */
.fuss{padding-bottom:56px}
.fuss p{max-width:50rem}
details{margin:12px 0}
summary{cursor:pointer;min-height:44px;display:flex;align-items:center;font-weight:600}
.skillnamen{list-style:none;padding:0;margin:8px 0;display:flex;flex-wrap:wrap;gap:8px}
.skillnamen li{margin:0}

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}
}
@media (forced-colors: active){
  button[aria-pressed="true"]{outline:2px solid Highlight}
}
"""

# --------------------------------------------------------------------------
# Programm der Galerie
# --------------------------------------------------------------------------
SKRIPT = r"""
(function () {
  'use strict';

  function $(s, w) { return (w || document).querySelector(s); }
  function $$(s, w) { return Array.prototype.slice.call((w || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var META = JSON.parse($('#meta-daten').textContent);
  var BY = {};
  META.looks.forEach(function (l) { BY[l.slug] = l; });
  var ALLE = META.looks.map(function (l) { return l.slug; });
  var GERAET = {
    pc: { b: 1280, h: 800, max: 5000 },
    tablet: { b: 820, h: 1180, max: 1180 },
    handy: { b: 390, h: 844, max: 844 }
  };
  var MAX_LIVE = 10;
  var MAX_VGL = 3;
  var demos = null;

  function demoText(slug) {
    if (!demos) { demos = JSON.parse($('#demo-daten').textContent); }
    return demos[slug] || '';
  }
  function keineBewegung() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  // Kleines Skript für bedienbare Ansichten: gibt Esc an die Galerie weiter, damit der Dialog schließt
  var ESC_SKRIPT = '<script>addEventListener("keydown",function(e){if(e.key==="Escape"){setTimeout(function(){parent.postMessage({galerie:"esc"},"*")},0)}})<\/script>';
  function mitEsc(h) {
    var i = h.lastIndexOf('</body>');
    return i < 0 ? h + ESC_SKRIPT : h.slice(0, i) + ESC_SKRIPT + h.slice(i);
  }

  /* ---------- Vorschauen: laden, wenn nah, leeren, wenn fern ---------- */
  var eintraege = new Map();
  var live = new Set();
  var warte = [];
  var laeuft = false;

  function setze(f, b, h, k, x, y) {
    f.style.width = b + 'px';
    f.style.height = h + 'px';
    f.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) scale(' + k.toFixed(4) + ')';
  }
  function fitKarte(s) {
    var w = s.box.clientWidth, h = s.box.clientHeight;
    if (!w || !h) { return; }
    var g = GERAET[s.modus];
    var k = Math.min(w / g.b, h / g.h);
    setze(s.frame, g.b, g.h, k, (w - g.b * k) / 2, (h - g.h * k) / 2);
  }
  function fitVgl(s) {
    var w = s.box.clientWidth;
    if (!w) { return; }
    var k = Math.min(1, w / 390);
    var h = Math.round(844 * k);
    if (s.box.style.height !== h + 'px') { s.box.style.height = h + 'px'; }
    setze(s.frame, 390, 844, k, (w - 390 * k) / 2, 0);
  }
  function passeAn(s) { if (s.art === 'karte') { fitKarte(s); } else { fitVgl(s); } }

  var ro = new ResizeObserver(function (es) {
    window.requestAnimationFrame(function () {
      es.forEach(function (e) { var s = eintraege.get(e.target); if (s) { passeAn(s); } });
    });
  });
  var nah = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var s = eintraege.get(e.target);
      if (!s) { return; }
      s.want = e.isIntersecting;
      if (e.isIntersecting) { plane(s); }
    });
  }, { rootMargin: '250px 0px' });
  var fern = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var s = eintraege.get(e.target);
      if (s && !e.isIntersecting) { s.want = false; leere(s); }
    });
  }, { rootMargin: '800px 0px' });

  function registriere(box, frame, slug, art) {
    var s = { box: box, frame: frame, slug: slug, art: art, modus: 'pc', live: false, want: false, queued: false };
    eintraege.set(box, s);
    ro.observe(box);
    nah.observe(box);
    fern.observe(box);
    passeAn(s);
    return s;
  }
  function entferne(s) {
    nah.unobserve(s.box); fern.unobserve(s.box); ro.unobserve(s.box);
    leere(s);
    eintraege.delete(s.box);
  }
  function neuBeobachten(s) {
    nah.unobserve(s.box); fern.unobserve(s.box);
    nah.observe(s.box); fern.observe(s.box);
  }
  function plane(s) {
    if (s.live || s.queued) { return; }
    s.queued = true;
    warte.push(s);
    if (!laeuft) { laeuft = true; window.setTimeout(arbeite, 0); }
  }
  function arbeite() {
    var s = warte.shift();
    if (!s) { laeuft = false; return; }
    s.queued = false;
    if (s.want && !s.live) { lade(s); }
    window.setTimeout(arbeite, warte.length ? 80 : 0);
  }
  function lade(s) {
    s.frame.srcdoc = s.art === 'karte' ? demoText(s.slug) : mitEsc(demoText(s.slug));
    s.live = true;
    live.add(s);
    s.box.classList.add('geladen');
    var ph = $('.vorschau__platzhalter', s.box);
    if (ph) { ph.hidden = true; }
    begrenze(s);
  }
  function leere(s) {
    if (!s.live) { return; }
    s.frame.removeAttribute('srcdoc');
    s.live = false;
    live.delete(s);
    s.box.classList.remove('geladen');
    var ph = $('.vorschau__platzhalter', s.box);
    if (ph) { ph.hidden = false; }
  }
  function begrenze(neu) {
    if (live.size <= MAX_LIVE) { return; }
    var vh = window.innerHeight, mitte = vh / 2, opfer = null, abstand = -1;
    live.forEach(function (x) {
      if (x === neu) { return; }
      var r = x.box.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh) { return; }
      var d = Math.abs((r.top + r.bottom) / 2 - mitte);
      if (d > abstand) { abstand = d; opfer = x; }
    });
    if (opfer) { opfer.want = false; leere(opfer); }
  }

  /* ---------- Karten ---------- */
  var KARTE = {};
  $$('.karte').forEach(function (li) {
    var slug = li.dataset.slug;
    KARTE[slug] = li;
    var box = $('.vorschau__bild', li);
    li._s = registriere(box, $('iframe', li), slug, 'karte');
  });

  function setzeModus(li, m) {
    li._s.modus = m;
    li.dataset.modus = m;
    $$('.umschalter button', li).forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.modus === m ? 'true' : 'false'); });
    fitKarte(li._s);
  }
  $$('.karte').forEach(function (li) {
    $$('.umschalter button', li).forEach(function (b) {
      b.addEventListener('click', function () { setzeModus(li, b.dataset.modus); });
    });
    $('.vorschau__bild', li).addEventListener('click', function () { oeffneGross(li.dataset.slug, $('[data-open]', li)); });
  });
  $$('[data-alle-modus]').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('[data-alle-modus]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      Object.keys(KARTE).forEach(function (s) { setzeModus(KARTE[s], b.dataset.alleModus); });
    });
  });

  /* ---------- Sortieren und Filtern ---------- */
  var zustand = { sort: 'rang', filter: 'alle' };
  function wende() {
    var reihe = ALLE.slice();
    if (zustand.sort === 'name') {
      reihe.sort(function (a, b) { return BY[a].name.localeCompare(BY[b].name, 'de', { sensitivity: 'base' }); });
    }
    var raster = $('#raster');
    var jetzt = $$('.karte', raster).map(function (li) { return li.dataset.slug; });
    var geaendert = jetzt.join() !== reihe.join();
    if (geaendert) {
      // Beim Verschieben laden iframes neu: vorher leeren, danach neu anstoßen
      Object.keys(KARTE).forEach(function (s) { leere(KARTE[s]._s); });
      reihe.forEach(function (s) { raster.appendChild(KARTE[s]); });
    }
    var n = 0;
    reihe.forEach(function (s) {
      var li = KARTE[s];
      var zeige = zustand.filter === 'alle' || li.dataset.ton === zustand.filter;
      li.hidden = !zeige;
      if (zeige) { n += 1; } else { leere(li._s); }
    });
    window.requestAnimationFrame(function () {
      Object.keys(KARTE).forEach(function (s) { passeAn(KARTE[s]._s); neuBeobachten(KARTE[s]._s); });
    });
    var f = zustand.filter === 'alle' ? 'alle Looks' : (zustand.filter === 'hell' ? 'nur helle Looks' : 'nur dunkle Looks');
    $('#status').textContent = n + ' von ' + ALLE.length + ' Looks sichtbar (' + f + '), sortiert ' + (zustand.sort === 'rang' ? 'nach Rang' : 'nach Name') + '.';
  }
  $$('[data-sort]').forEach(function (b) {
    b.addEventListener('click', function () {
      zustand.sort = b.dataset.sort;
      $$('[data-sort]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      wende();
    });
  });
  $$('[data-filter]').forEach(function (b) {
    b.addEventListener('click', function () {
      zustand.filter = b.dataset.filter;
      $$('[data-filter]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      wende();
    });
  });

  /* ---------- Bausteine für Tafel und Vergleich ---------- */
  function pips(n) {
    var h = '<span class="pips" role="img" aria-label="' + n + ' von 5">';
    for (var i = 1; i <= 5; i += 1) { h += '<i class="' + (i <= n ? 'an' : 'aus') + '"></i>'; }
    return h + '</span>';
  }
  function platzabz(l) { return '<span class="platzabz platzabz--' + Math.min(l.rang, 4) + '">Platz ' + l.rang + '</span>'; }

  function tafelHtml(l) {
    var h = '<h3 class="t-titel">Wertung</h3>';
    h += '<p class="t-punkte"><strong>' + l.punkte + '</strong> von 100 Punkten, Rang ' + l.rang + ' von ' + ALLE.length + '</p>';
    h += '<p>' + esc(l.begruendung) + '</p>';
    h += '<h4>Noten (1 schwach bis 5 sehr gut)</h4><table class="t-noten"><tbody>';
    META.kriterien.forEach(function (k) {
      h += '<tr><th scope="row">' + esc(k.name) + '<span class="gew-klein">Gewicht ' + k.gewicht + '</span></th><td>' + pips(l.noten[k.name]) + '</td><td class="num">' + l.noten[k.name] + ' von 5</td></tr>';
    });
    h += '</tbody></table>';
    h += '<h4>Messwerte</h4><dl class="t-mess">';
    l.mess.forEach(function (m) {
      h += '<div><dt>' + esc(m.label) + '</dt><dd><strong>' + esc(m.wert) + '</strong>' + (m.st ? '<span class="st st-' + m.st + '">' + m.st + '</span>' : '') + '<span class="erkl">' + esc(m.erkl) + '</span></dd></div>';
    });
    h += '</dl>';
    h += '<div class="t-liste t-pro"><h4>Pro</h4>' + l.teile.pro + '</div>';
    h += '<div class="t-liste t-contra"><h4>Contra</h4>' + l.teile.contra + '</div>';
    h += '<h4>Wann der Look passt und wann nicht</h4>' + l.teile.wann;
    h += '<h4>Passt besonders zu</h4>' + l.teile.passt;
    h += '<h4>Passt nicht zu</h4>' + l.teile.nicht;
    h += '<p class="t-skill">Dieser Look ist der Skill <code>' + esc(l.skill) + '</code> (Ordner <code>.claude/skills/' + esc(l.skill) + '</code>).</p>';
    return h;
  }

  /* ---------- Großansicht ---------- */
  var dlg = $('#gross');
  var grossFrame = null, grossSlug = null, grossModus = 'pc', opener = null;
  var grossK = 1;

  function standardModus() { return window.innerWidth < 700 ? 'handy' : (window.innerWidth < 1000 ? 'tablet' : 'pc'); }
  function reihenfolge() {
    var v = $$('.karte').filter(function (li) { return !li.hidden; }).map(function (li) { return li.dataset.slug; });
    return v.indexOf(grossSlug) >= 0 ? v : ALLE;
  }
  function setzeGeraet(m) {
    grossModus = m;
    $$('[data-geraet]', dlg).forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.geraet === m ? 'true' : 'false'); });
    passeGross();
  }
  function setzeBereich(b) {
    $('#gross-koerper').dataset.bereich = b;
    $$('[data-bereich]', $('.gross__tabs')).forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.bereich === b ? 'true' : 'false'); });
    if (b !== 'wertung') { window.requestAnimationFrame(passeGross); } else { $('#gross-info').textContent = ''; }
  }
  var breit = window.matchMedia('(min-width: 1100px)');
  function standardBereich() { return breit.matches ? 'beide' : 'ansicht'; }
  var weiteAenderung = function () {
    var b = $('#gross-koerper').dataset.bereich;
    if (b !== 'wertung') { setzeBereich(standardBereich()); }
  };
  if (breit.addEventListener) { breit.addEventListener('change', weiteAenderung); } else if (breit.addListener) { breit.addListener(weiteAenderung); }
  function passeGross() {
    var bild = $('#gross-bild'), rahmen = $('#gross-rahmen');
    var aw = bild.clientWidth, ah = bild.clientHeight;
    if (!aw || !ah || !grossFrame) { return; }
    var pad = aw < 520 ? 0 : 16;
    var vw = aw - 2 * pad, vh = ah - 2 * pad;
    var g = GERAET[grossModus];
    var b = g.b;
    if (grossModus === 'handy' && vw < b) { b = Math.floor(vw); }
    var k = b > vw ? vw / b : 1;
    var h = Math.max(200, Math.min(g.max, Math.floor(vh / k)));
    rahmen.style.width = Math.round(b * k) + 'px';
    rahmen.style.height = Math.round(h * k) + 'px';
    grossFrame.style.width = b + 'px';
    grossFrame.style.height = h + 'px';
    grossFrame.style.transform = k < 1 ? 'scale(' + k.toFixed(4) + ')' : 'none';
    grossK = k;
    $('#gross-info').textContent = 'Ansicht: ' + b + ' mal ' + h + ' Pixel' + (k < 1 ? ', verkleinert auf ' + Math.round(k * 100) + ' Prozent' : '') + '. Im Rahmen kannst du klicken und scrollen.';
  }
  function zeigeGross(slug) {
    grossSlug = slug;
    var l = BY[slug];
    $('#gross-titel').innerHTML = platzabz(l) + ' <span>' + esc(l.name) + '</span>';
    var tafel = $('#gross-tafel');
    tafel.innerHTML = tafelHtml(l);
    tafel.scrollTop = 0;
    var rahmen = $('#gross-rahmen');
    rahmen.innerHTML = '';
    var f = document.createElement('iframe');
    f.setAttribute('sandbox', 'allow-scripts');
    f.title = 'Die Seite im Look ' + l.name + ', zum Ausprobieren';
    rahmen.appendChild(f);
    grossFrame = f;
    passeGross();
    f.srcdoc = mitEsc(demoText(slug));
    var r = reihenfolge();
    $('#gross-ansage').textContent = 'Look ' + (r.indexOf(slug) + 1) + ' von ' + r.length + ': ' + l.name + ', Rang ' + l.rang + '.';
    $('#gross-zaehler').textContent = 'Look ' + (r.indexOf(slug) + 1) + ' von ' + r.length;
  }
  function oeffneGross(slug, von) {
    opener = von || document.activeElement;
    if (!dlg.open) {
      grossModus = standardModus();
      setzeGeraet(grossModus);
      setzeBereich(standardBereich());
      document.documentElement.classList.add('dialog-offen');
      dlg.showModal();
    }
    zeigeGross(slug);
    $('#gross-titel').focus();
  }
  function schritt(d) {
    var r = reihenfolge();
    var i = r.indexOf(grossSlug);
    zeigeGross(r[(i + d + r.length) % r.length]);
  }
  dlg.addEventListener('close', function () {
    document.documentElement.classList.remove('dialog-offen');
    $('#gross-rahmen').innerHTML = '';
    grossFrame = null;
    if (opener && document.contains(opener)) { opener.focus(); }
    else { var z = $('#looks-titel'); if (z) { z.setAttribute('tabindex', '-1'); z.focus(); } }
    opener = null;
  });
  $('#gross-zu').addEventListener('click', function () { dlg.close(); });
  $('#gross-zurueck').addEventListener('click', function () { schritt(-1); });
  $('#gross-weiter').addEventListener('click', function () { schritt(1); });
  $$('[data-geraet]', dlg).forEach(function (b) { b.addEventListener('click', function () { setzeGeraet(b.dataset.geraet); }); });
  $$('[data-bereich]', $('.gross__tabs')).forEach(function (b) { b.addEventListener('click', function () { setzeBereich(b.dataset.bereich); }); });
  new ResizeObserver(function () { window.requestAnimationFrame(passeGross); }).observe($('#gross-bild'));

  function fokussierbar() {
    return $$('button:not([disabled]), [href], input:not([disabled]), select, textarea, iframe, [tabindex]:not([tabindex="-1"])', dlg).filter(function (x) {
      return x.getClientRects().length > 0;
    });
  }
  dlg.addEventListener('keydown', function (e) {
    var ziel = e.target;
    if (e.key === 'Tab') {
      var f = fokussierbar();
      if (!f.length) { return; }
      var erst = f[0], letzt = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === erst || document.activeElement === $('#gross-titel') || document.activeElement === dlg)) { e.preventDefault(); letzt.focus(); }
      else if (!e.shiftKey && document.activeElement === letzt) { e.preventDefault(); erst.focus(); }
    } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !/^(INPUT|TEXTAREA|SELECT)$/.test(ziel.tagName) && !e.altKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      schritt(e.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  window.addEventListener('message', function (e) {
    if (e.data && e.data.galerie === 'esc' && dlg.open && grossFrame && e.source === grossFrame.contentWindow) { dlg.close(); }
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-open]') : null;
    if (b) { oeffneGross(b.dataset.open, b); }
  });

  /* ---------- Vergleich ---------- */
  var auswahl = [];
  var vglEintraege = [];

  function syncVgl() {
    Object.keys(KARTE).forEach(function (s) {
      var li = KARTE[s];
      var cb = $('input[type=checkbox]', li);
      var an = auswahl.indexOf(s) >= 0;
      cb.checked = an;
      cb.disabled = !an && auswahl.length >= MAX_VGL;
      li.classList.toggle('gewaehlt', an);
    });
    var leiste = $('#vgl-leiste');
    leiste.hidden = auswahl.length === 0;
    document.body.classList.toggle('mit-leiste', auswahl.length > 0);
    if (auswahl.length) {
      $('#vgl-text').innerHTML = auswahl.length + ' von ' + MAX_VGL + '<span class="lang"> Looks</span> gewählt<span class="lang">: ' + auswahl.map(function (s) { return esc(BY[s].name); }).join(', ') + '.' + (auswahl.length >= MAX_VGL ? ' Mehr als drei gehen nicht.' : '') + '</span>';
    }
    renderVergleich();
  }
  function bestes(werte, niedrigGut) {
    var zahlen = werte.filter(function (v) { return typeof v === 'number'; });
    if (zahlen.length < 2) { return null; }
    var ziel = niedrigGut ? Math.min.apply(null, zahlen) : Math.max.apply(null, zahlen);
    if (zahlen.every(function (v) { return v === ziel; })) { return null; }
    return ziel;
  }
  function renderVergleich() {
    vglEintraege.forEach(entferne);
    vglEintraege = [];
    var host = $('#vergleich-inhalt');
    host.innerHTML = '';
    $('#vergleich-leer').hidden = auswahl.length > 0;
    if (!auswahl.length) { return; }
    var looks = auswahl.map(function (s) { return BY[s]; });
    var h = '<div class="vgl-raster" style="--n:' + looks.length + '">';
    looks.forEach(function (l) {
      h += '<div class="vgl-spalte" data-slug="' + l.slug + '"><div class="vgl-spalte__kopf">' + platzabz(l) + '<h3>' + esc(l.name) + '</h3></div>' +
        '<p class="karte__punkte"><b>' + l.punkte + '</b> von 100 Punkten</p>' +
        '<div class="vgl-spalte__knoepfe"><button type="button" class="knopf knopf--haupt" data-open="' + l.slug + '">Groß ansehen<span class="sr">: ' + esc(l.name) + '</span></button>' +
        '<button type="button" data-vgl-weg="' + l.slug + '">Entfernen<span class="sr">: ' + esc(l.name) + '</span></button></div>' +
        '<div class="vgl-rahmen"><span class="vorschau__platzhalter" aria-hidden="true">Handy-Ansicht wird geladen</span><iframe sandbox="allow-scripts" title="Handy-Ansicht im Look ' + esc(l.name) + ', zum Ausprobieren"></iframe></div></div>';
    });
    h += '</div>';

    // Noten
    h += '<h3 class="vgl-titel" id="vgl-tabelle-titel">Noten und Messwerte im Vergleich</h3><p class="unter">Noten von 1 (schwach) bis 5 (sehr gut). Bei Aufwand und Risiko ist 5 gut. Der beste Wert jeder Zeile ist hervorgehoben.</p>';
    h += '<div class="vgl-tabelle-huelle" role="region" aria-labelledby="vgl-tabelle-titel" tabindex="0"><table class="vgl-tabelle"><thead><tr><th scope="col">Kriterium</th>';
    looks.forEach(function (l) { h += '<th scope="col">' + esc(l.name) + '</th>'; });
    h += '</tr></thead><tbody>';
    var zeilen = [];
    zeilen.push({ name: 'Punkte von 100', werte: looks.map(function (l) { return l.punkte; }), text: function (v) { return v; }, sr: ' von 100', niedrig: false });
    META.kriterien.forEach(function (k) {
      zeilen.push({ name: k.name, gew: 'Gewicht ' + k.gewicht, werte: looks.map(function (l) { return l.noten[k.name]; }), text: function (v) { return v; }, sr: ' von 5', niedrig: false });
    });
    zeilen.push({ name: 'Gewicht der Seite', gew: 'weniger ist besser', werte: looks.map(function (l) { return l.messwerte ? l.messwerte.bytes_kb : null; }), text: function (v) { return v + ' KB'; }, sr: '', niedrig: true });
    zeilen.push({ name: 'Lighthouse Leistung', gew: 'bis 100', werte: looks.map(function (l) { return l.messwerte ? l.messwerte.performance : null; }), text: function (v) { return v; }, sr: ' von 100', niedrig: false });
    zeilen.push({ name: 'Layout\u00adverschiebung', gew: 'weniger ist besser', werte: looks.map(function (l) { return l.messwerte ? l.messwerte.cls : null; }), text: function (v) { return String(v).replace('.', ','); }, sr: '', niedrig: true });
    zeilen.forEach(function (z) {
      var best = bestes(z.werte, z.niedrig);
      h += '<tr><th scope="row">' + esc(z.name).replace('Produktwirkung', 'Produkt\u00adwirkung') + (z.gew ? '<span class="gew-klein">' + z.gew + '</span>' : '') + '</th>';
      z.werte.forEach(function (v) {
        var istBest = best !== null && v === best;
        h += '<td' + (istBest ? ' class="beste"' : '') + '>' + (v === null || v === undefined ? 'keine Angabe' : z.text(v) + (z.sr ? '<span class="sr">' + z.sr + '</span>' : '')) + (istBest ? '<span class="sr"> (bester Wert in dieser Zeile)</span>' : '') + '</td>';
      });
      h += '</tr>';
    });
    h += '</tbody></table></div>';

    // Pro und Contra nebeneinander
    h += '<div class="vgl-pc" style="--n:' + looks.length + '">';
    looks.forEach(function (l) {
      h += '<section aria-label="Pro und Contra: ' + esc(l.name) + '"><h3>' + esc(l.name) + '</h3><div class="vgl-pro"><h4>Pro</h4>' + l.teile.pro + '</div><div class="vgl-contra"><h4>Contra</h4>' + l.teile.contra + '</div>' +
        '<h4>Passt besonders zu</h4>' + l.teile.passt + '<h4>Passt nicht zu</h4>' + l.teile.nicht + '</section>';
    });
    h += '</div>';
    host.innerHTML = h;
    $$('.vgl-spalte', host).forEach(function (sp) {
      var box = $('.vgl-rahmen', sp);
      var s = registriere(box, $('iframe', box), sp.dataset.slug, 'vgl');
      vglEintraege.push(s);
    });
    $$('[data-vgl-weg]', host).forEach(function (b) {
      b.addEventListener('click', function () {
        var i = auswahl.indexOf(b.dataset.vglWeg);
        if (i >= 0) { auswahl.splice(i, 1); }
        syncVgl();
        var z = $('#vergleich-titel');
        if (auswahl.length) { var nb = $('[data-vgl-weg]', host); if (nb) { nb.focus(); return; } }
        if (z) { z.focus(); }
      });
    });
  }
  $$('input[data-vgl]').forEach(function (cb) {
    cb.addEventListener('change', function () {
      var s = cb.dataset.vgl, i = auswahl.indexOf(s);
      if (cb.checked && i < 0 && auswahl.length < MAX_VGL) { auswahl.push(s); }
      if (!cb.checked && i >= 0) { auswahl.splice(i, 1); }
      syncVgl();
    });
  });
  $('#vgl-springen').addEventListener('click', function () {
    $('#vergleich').scrollIntoView({ behavior: keineBewegung() ? 'auto' : 'smooth', block: 'start' });
    $('#vergleich-titel').focus({ preventScroll: true });
  });
  $('#vgl-leeren').addEventListener('click', function () { auswahl = []; syncVgl(); });

  wende();
  syncVgl();
  window.__galerie = { fertig: true };
})();
"""

SEITE = r"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Design-Galerie: 18 Looks für HORTA</title>
<meta name="description" content="Alle 18 Design-Looks für die HORTA-Startseite zum Ansehen, Vergleichen und Bewerten, in einer einzigen Datei, auch offline.">
<meta name="color-scheme" content="light dark">
<style>
@@STIL@@
</style>
</head>
<body>
<a class="skip" href="#looks">Direkt zu den Looks</a>
@@KOPF@@
<main>
@@URTEIL@@
@@METHODE@@
@@KARTEN@@
@@VERGLEICH@@
</main>
@@ABLAGE@@
@@DIALOG@@
<script type="application/json" id="meta-daten">@@META@@</script>
<script>
@@SKRIPT@@
</script>
<script type="application/json" id="demo-daten">@@DEMOS@@</script>
</body>
</html>
"""


def json_fuer_script(obj):
    s = json.dumps(obj, ensure_ascii=False, separators=(",", ":"))
    s = s.replace("<!--", "\\u003c!--").replace("</", "<\\/")
    return s


def main():
    ap = argparse.ArgumentParser(description="Baut die Design-Galerie als eine selbständige HTML-Datei.")
    ap.add_argument("ausgabe", nargs="?", default=str(STANDARD_AUSGABE), help="Zieldatei (Standard: %s)" % STANDARD_AUSGABE)
    ap.add_argument("--wertung", help="Pfad zur bewertung.json")
    args = ap.parse_args()

    wertung_pfad = finde_wertung(args.wertung)
    wertung = json.loads(wertung_pfad.read_text(encoding="utf-8"))
    kriterien = [{"name": k, "gewicht": wertung["gewichte"][k]} for k in wertung["kriterien"]]
    gewichtssumme = sum(k["gewicht"] for k in kriterien)

    looks_roh = sorted(wertung["looks"], key=lambda l: l["rang"])
    if len(looks_roh) != 18:
        warn("Die Wertung enthält %d statt 18 Looks." % len(looks_roh))

    looks = []
    demos = {}
    gesamt_schriften = {}
    for l in looks_roh:
        slug = l["slug"]
        info = lies_look(SKILLS, slug)
        for m in info["meldungen"]:
            warn("%s: %s" % (slug, m))
        demos[slug] = info["html"]
        gesamt_schriften.update(info["schriften"])
        # Punkte prüfen: gewichtete Summe geteilt durch Höchstmaß
        rechnung = round(sum(l["noten"][k["name"]] * k["gewicht"] for k in kriterien) / (5 * gewichtssumme) * 100)
        if rechnung != l["punkte"]:
            warn("%s: Punkte laut Datei %d, nachgerechnet %d." % (slug, l["punkte"], rechnung))
        looks.append({
            "slug": slug,
            "name": l["name"],
            "rang": l["rang"],
            "punkte": l["punkte"],
            "noten": l["noten"],
            "begruendung": l["begruendung"],
            "kurz": KURZ.get(slug, ""),
            "ton": info["ton"],
            "skill": "look-" + slug,
            "messwerte": l.get("messwerte"),
            "mess": messwerte_liste(l.get("messwerte")),
            "teile": info["teile"],
            "kriterien": kriterien,
        })
        if slug not in KURZ:
            warn("%s: kein Kurzsatz in KURZ." % slug)

    meta = {"kriterien": kriterien, "looks": [{k: v for k, v in l.items() if k != "kriterien"} for l in looks]}

    seite = SEITE
    teile = {
        "@@STIL@@": STIL,
        "@@KOPF@@": baue_kopf(),
        "@@URTEIL@@": baue_urteil(looks),
        "@@METHODE@@": baue_methode(kriterien, gewichtssumme),
        "@@KARTEN@@": baue_karten(looks),
        "@@VERGLEICH@@": baue_vergleich(),
        "@@ABLAGE@@": baue_ablage([l["slug"] for l in looks]),
        "@@DIALOG@@": baue_dialog_und_leiste(),
        "@@META@@": json_fuer_script(meta),
        "@@SKRIPT@@": SKRIPT,
        "@@DEMOS@@": json_fuer_script(demos),
    }
    for platzhalter, inhalt in teile.items():
        seite = seite.replace(platzhalter, inhalt)

    ziel = Path(args.ausgabe)
    ziel.parent.mkdir(parents=True, exist_ok=True)
    ziel.write_text(seite, encoding="utf-8", newline="\n")

    groesse = ziel.stat().st_size
    print("Galerie geschrieben: %s" % ziel)
    print("Größe: %.2f MB (%d Bytes)" % (groesse / 1048576, groesse))
    print("Demos: %d, davon Text zusammen %.0f KB, Schriften (einmal je Datei gezählt) %.0f KB"
          % (len(demos), sum(len(v.encode("utf-8")) for v in demos.values()) / 1024, sum(len(b) for b in gesamt_schriften.values()) / 1024))
    if groesse > 12 * 1048576:
        warn("Die Datei ist größer als 12 MB.")


if __name__ == "__main__":
    main()
