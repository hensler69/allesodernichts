#!/usr/bin/env python3
"""Baut aus einem Shop-Ordner EINE HTML-Datei für die private Vorschau (Artifact).

Aufruf:  python3 vorschau_bauen.py <shop-ordner> <ausgabe.html> [Titel]

- CSS, Schriften (woff2) und Bilder werden eingebettet (base64), es gibt keine externen Dateien.
- Jede Unterseite wird eine "Ansicht": /kasse wird zu #kasse, umgeschaltet über die Adresse nach dem #.
- Erwartet den Aufbau der Referenz: Startseite index.html mit genau einem <main ...>...</main>,
  davor gemeinsame Teile (Hintergrund, Kopfzeile), danach Fußzeile, Dialoge und am Ende
  <script src="/assets/script.js" defer></script>. Formulare senden in der Vorschau nicht (kein PHP).
"""
import base64
import glob
import os
import re
import sys

if len(sys.argv) < 3:
    print(__doc__)
    sys.exit(2)
R = sys.argv[1].rstrip("/") + "/"
AUS = sys.argv[2]
TITEL = sys.argv[3] if len(sys.argv) > 3 else "Shop-Vorschau"

rd = lambda p: open(R + p, encoding="utf-8").read()
b64 = lambda p: base64.b64encode(open(R + p, "rb").read()).decode()
MIME = {".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp"}

css = rd("assets/style.css")
css = re.sub(r'url\("?fonts/([^")]+\.woff2)"?\)',
             lambda m: 'url("data:font/woff2;base64,%s")' % b64("assets/fonts/" + m.group(1)), css)
css += "\n.vorschau-hinweis{position:relative;z-index:60;background:#111;color:#ddd;font:400 .78rem/1.5 system-ui,sans-serif;padding:.5rem 1rem;text-align:center}\n"

ansichten = sorted(os.path.basename(f)[:-5] for f in glob.glob(R + "*.html") if not f.endswith("index.html"))


def bilder_einbetten(h):
    def ersetzen(m):
        pfad = m.group(2)
        if not os.path.exists(R + pfad):
            return m.group(0)
        return '%s="data:%s;base64,%s"' % (m.group(1), MIME.get(os.path.splitext(pfad)[1].lower(), "application/octet-stream"), b64(pfad))
    return re.sub(r'(src|href)="/(assets/img/[^"]+)"', ersetzen, h)


def links_umbiegen(h):
    h = h.replace('href="/"', 'href="#start"').replace('href="/#', 'href="#')
    for v in ansichten:
        h = re.sub(r'href="/%s(\?[^"]*)?"' % re.escape(v), 'href="#%s"' % v, h)
    return bilder_einbetten(h)


def main_von(s):
    i = s.index("<main")
    return s[i:s.index("</main>", i) + 7]


idx = rd("index.html")
body = idx[idx.index("<body"):]
body = body[body.index(">") + 1:]
vor_main = body[:body.index("<main")]
nach_main = body[body.index("</main>") + 7:]
nach_main = re.sub(r"<script[^>]*src=[^>]*></script>", "", nach_main)
nach_main = nach_main.replace("</body>", "").replace("</html>", "")

start = links_umbiegen(main_von(idx))
k0 = re.search(r'<main[^>]*class="([^"]*)"', start)
teile = [re.sub(r"<main[^>]*>", '<main id="ansicht-start" class="%s ansicht">' % (k0.group(1) if k0 else ""), start, count=1)]
for v in ansichten:
    m = links_umbiegen(main_von(rd(v + ".html")))
    def neues_main(mm, v=v):
        klasse = re.search(r'class="([^"]*)"', mm.group(1))  # eigene Klassen der Seite behalten
        return '<main id="ansicht-%s" class="%s ansicht" hidden>' % (v, klasse.group(1) if klasse else "")
    m = re.sub(r"<main([^>]*)>", neues_main, m, count=1)
    teile.append(m)

js = rd("assets/script.js")
umschalter = """
  // Vorschau: Unterseiten als Ansichten, umgeschaltet über die Adresse nach dem #
  const ANSICHTEN = %s;
  function zeigen() {
    const h = (location.hash || '').slice(1);
    const v = ANSICHTEN.indexOf(h) >= 0 ? h : 'start';
    document.querySelectorAll('main.ansicht').forEach((m) => { m.hidden = m.id !== 'ansicht-' + v; });
    const ziel = v === 'start' && h && h !== 'start' ? document.getElementById(h) : null;
    if (ziel) ziel.scrollIntoView(); else scrollTo(0, 0);
    dispatchEvent(new Event('scroll'));
  }
  addEventListener('hashchange', zeigen);
  zeigen();
})();
""" % repr(ansichten)
k = js.rindex("})();")
js = js[:k] + umschalter

aus = f"""<title>{TITEL}</title>
<style>
{css}
</style>
{links_umbiegen(vor_main)}
<div class="vorschau-hinweis" role="note">Vorschau: Bestellung und Formulare senden erst, wenn der Shop online liegt.</div>
{chr(10).join(teile)}
{links_umbiegen(nach_main)}
<script>
{js}
</script>
"""
open(AUS, "w", encoding="utf-8").write(aus)
print(f"{AUS}: {len(aus)//1000} KB, Ansichten: start, {', '.join(ansichten)}")
print("Danach im Browser testen (Konsolenfehler?), dann mit dem Artifact-Werkzeug veröffentlichen.")
