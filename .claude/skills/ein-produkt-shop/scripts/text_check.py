#!/usr/bin/env python3
"""Automatischer Teil des CHECK für einen statischen Shop-Ordner.

Aufruf:  python3 text_check.py <shop-ordner> [--kauftext "In den Warenkorb"]

Prüft Texte (verbotene Floskeln, Gedankenstriche), Technik (Titel, Beschreibung,
Canonical, OG/Twitter, Favicon, lang, eine h1, interne Links, externe Schriften,
verbotene Schriften), Bilder (Alt-Texte) und send.php (Honeypot, Kopfzeilen-Bereinigung,
Ratenbegrenzung). Gibt am Ende eine Liste der Funde aus. Exit-Code 1, wenn etwas gefunden wurde.
Was sich nicht maschinell beurteilen lässt (Werbesprache, Bildausschnitte, Wirkung), prüft
der Mensch bzw. das Modell selbst.
"""
import glob
import os
import re
import sys
from html.parser import HTMLParser

VERBOTEN = ["innovativ", "nahtlos", "maßgeschneidert", "massgeschneidert", "ganzheitlich",
            "revolutionär", "revolutionaer", "einzigartig", "leidenschaft"]
STRICHE = ["–", "—"]
EXTERNE_SCHRIFT = ["fonts.googleapis", "fonts.gstatic", "use.typekit", "fonts.bunny", "fontshare.com"]
VERBOTENE_SCHRIFT = re.compile(r"font-family\s*:[^;}]*\b(Inter|Roboto|Arial|Open Sans)\b", re.I)


class Seite(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta, self.links, self.imgs, self.hrefs, self.ids = {}, [], [], [], set()
        self.h1 = 0
        self.lang = None
        self.title = ""
        self._in_title = self._in_skript = False
        self.text = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            k = a.get("name") or a.get("property")
            if k:
                self.meta[k] = a.get("content", "")
        elif tag == "link":
            self.links.append(a)
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "a" and "href" in a:
            self.hrefs.append(a)
        elif tag == "h1":
            self.h1 += 1
        elif tag in ("script", "style"):
            self._in_skript = True

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        if tag in ("script", "style"):
            self._in_skript = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if not self._in_skript:
            self.text.append(data)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    root = sys.argv[1].rstrip("/")
    funde, hinweise = [], []
    html_dateien = sorted(glob.glob(os.path.join(root, "*.html")))
    alle_text = html_dateien + glob.glob(os.path.join(root, "assets", "*.js")) + \
        glob.glob(os.path.join(root, "assets", "*.css")) + glob.glob(os.path.join(root, "*.txt"))
    seiten = {}
    for f in html_dateien:
        p = Seite()
        p.feed(open(f, encoding="utf-8").read())
        seiten[os.path.basename(f)] = p

    # 1. Texte
    for f in alle_text:
        t = open(f, encoding="utf-8").read()
        name = os.path.relpath(f, root)
        low = t.lower()
        for w in VERBOTEN:
            if w in low:
                funde.append(f"Texte: verbotenes Wort '{w}' in {name}")
        for s in STRICHE:
            n = t.count(s)
            if n:
                funde.append(f"Texte: {n} Gedankenstrich(e) {repr(s)} in {name}")

    # 2. Technik
    for name, p in seiten.items():
        if p.lang != "de":
            funde.append(f"Technik: {name} ohne <html lang=\"de\">")
        if not p.title.strip():
            funde.append(f"Technik: {name} ohne <title>")
        if not p.meta.get("description"):
            funde.append(f"Technik: {name} ohne Meta-Beschreibung")
        rels = {l.get("rel", "") for l in p.links}
        if "canonical" not in rels:
            funde.append(f"Technik: {name} ohne Canonical-Link")
        if not any("icon" in r for r in rels):
            funde.append(f"Technik: {name} ohne Favicon")
        for k in ("og:title", "og:description", "og:image", "og:url", "twitter:card"):
            if k not in p.meta:
                funde.append(f"Technik: {name} ohne {k}")
        if p.h1 != 1:
            funde.append(f"Technik: {name} hat {p.h1} h1-Überschriften (soll 1)")
        for a in p.hrefs:
            h = a["href"]
            if h.startswith(("http", "mailto:", "tel:", "javascript:")):
                continue
            if h.startswith("#"):
                if len(h) > 1 and h[1:] not in p.ids:
                    funde.append(f"Technik: {name} Sprungmarke {h} ohne Ziel")
                continue
            pfad = h.split("#")[0].split("?")[0]
            if not pfad or pfad == "/":
                ziel_anker = h.split("#")[1] if "#" in h else ""
                if ziel_anker and "index.html" in seiten and ziel_anker not in seiten["index.html"].ids:
                    funde.append(f"Technik: {name} Link {h} ohne Ziel auf der Startseite")
                continue
            if pfad.endswith(".html"):
                funde.append(f"Technik: {name} Link {h} mit .html-Endung (saubere Adresse verwenden)")
            ziel = os.path.join(root, pfad.lstrip("/"))
            if not (os.path.exists(ziel) or os.path.exists(ziel + ".html")):
                funde.append(f"Technik: {name} Link {h} führt ins Leere")
    for name, p in seiten.items():
        for a in p.hrefs:
            if a.get("href") == "/" and a.get("aria-label") not in (None, "Zur Startseite"):
                funde.append(f"Technik: {name} Logo-Link mit aria-label '{a.get('aria-label')}' statt 'Zur Startseite'")
    for f in glob.glob(os.path.join(root, "**", "*.*"), recursive=True):
        if f.endswith((".html", ".css", ".js")):
            t = open(f, encoding="utf-8").read()
            for e in EXTERNE_SCHRIFT:
                if e in t:
                    funde.append(f"Technik: externe Schrift ({e}) in {os.path.relpath(f, root)}")
            if f.endswith(".css") and VERBOTENE_SCHRIFT.search(t):
                funde.append(f"Technik: verbotene Schrift in {os.path.relpath(f, root)}: {VERBOTENE_SCHRIFT.search(t).group(1)}")
    if not glob.glob(os.path.join(root, "assets", "fonts", "*.woff2")):
        funde.append("Technik: keine selbst gehosteten Schriften in assets/fonts/")

    # 3. Bilder
    for name, p in seiten.items():
        for i in p.imgs:
            if "alt" not in i:
                funde.append(f"Bilder: {name} Bild {i.get('src')} ohne alt")
            src = i.get("src", "")
            if src.startswith("/") and not os.path.exists(os.path.join(root, src.lstrip("/"))):
                funde.append(f"Bilder: {name} Bild {src} fehlt")
        og = p.meta.get("og:image", "")
        if og and "/assets/" in og:
            lokal = os.path.join(root, og[og.index("/assets/") + 1:])
            if not os.path.exists(lokal):
                funde.append(f"Bilder: Vorschaubild {og} fehlt lokal")
    for f in glob.glob(os.path.join(root, "assets", "**", "*.*"), recursive=True):
        if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")) and os.path.getsize(f) > 400_000:
            funde.append(f"Bilder: {os.path.relpath(f, root)} ist {os.path.getsize(f)//1000} KB groß (Webgröße?)")

    # 5. Formularsicherheit (Heuristik, ersetzt nicht das Lesen des Skripts)
    php = os.path.join(root, "send.php")
    if os.path.exists(php):
        t = open(php, encoding="utf-8").read()
        if "website" not in t and "honig" not in t.lower():
            funde.append("Formular: kein Honeypot-Feld in send.php erkennbar")
        if not re.search(r"\\x00-\\x1F", t):
            funde.append("Formular: keine Bereinigung von Steuerzeichen/Zeilenumbrüchen erkennbar")
        if "LIMIT" not in t.upper() or "ZEITFENSTER" not in t.upper():
            funde.append("Formular: keine Ratenbegrenzung erkennbar")
        if "VOR-DER-VEROEFFENTLICHUNG" in t:
            hinweise.append("GEHEIMNIS in send.php vor der Veröffentlichung ersetzen")
    else:
        funde.append("Formular: send.php fehlt")

    # Kaufknöpfe zählen (eine Handlungsaufforderung: alle Hauptknöpfe tragen dieselbe Aktion)
    if "index.html" in seiten:
        t = open(os.path.join(root, "index.html"), encoding="utf-8").read()
        t = re.sub(r"<dialog.*?</dialog>", "", t, flags=re.S)  # Knöpfe im Warenkorb gehören zum selben Kaufweg
        knoepfe = re.findall(r'<(?:a|button)[^>]*class="knopf[^"]*"[^>]*>(.*?)</(?:a|button)>', t, re.S)
        texte = sorted({re.sub(r"<[^>]+>", "", k).strip() for k in knoepfe})
        print("Hauptknöpfe auf der Startseite:", texte)
        if len(texte) > 1:
            funde.append(f"Ansicht: mehrere verschiedene Hauptknöpfe {texte} (nur EINE Handlungsaufforderung)")

    print(f"\n{len(seiten)} Seiten geprüft.")
    for h in hinweise:
        print("Hinweis:", h)
    funde = list(dict.fromkeys(funde))  # doppelte Meldungen nur einmal
    if funde:
        print(f"{len(funde)} Funde:")
        for f in funde:
            print(" -", f)
        sys.exit(1)
    print("Keine Funde.")


if __name__ == "__main__":
    main()
