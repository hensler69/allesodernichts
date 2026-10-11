#!/usr/bin/env python3
"""Lighthouse (mobil) für Look-Demos und Shop-Seiten (portable Fassung).

Aufruf:
  python3 messen.py <slug-oder-URL> [<slug-oder-URL> ...]

  messen.py bauhaus isometric                      misst http://localhost:8101/look-<slug>/vorlage/demo.html
  messen.py http://localhost:8101/shops/horta/     misst eine Adresse (Name der Messung wird aus der Adresse gebildet)

Ergebnis: <ausgabe>/_lh/<name>.json (voller Lighthouse-Bericht) und <ausgabe>/_lh/ergebnis.json
(Kurzwerte aller bisherigen Messungen: Leistung, Barrierefreiheit, Technik, LCP, Blockierzeit,
Layoutverschiebung CLS, Gewicht, Anzahl Elemente). Im Gewicht (bytes_kb) sind die Schriften enthalten.

Einstellungen über Umgebungsvariablen (alle optional):
  LOOKS_SERVER   Adresse des Testservers, Standard http://localhost:8101
                 (Wurzel .claude/skills, Start: cd .claude/skills && python3 -m http.server 8101)
  LOOKS_AUSGABE  Ausgabeordner, Standard ./pruefung (dieselbe Variable wie bei pruefen.js)
  LIGHTHOUSE     Pfad zum Programm lighthouse, Standard "lighthouse" aus dem PATH
  CHROME_PATH    Pfad zum Chromium-Programm, Standard /opt/pw-browsers/chromium-1194/chrome-linux/chrome
"""
import json
import os
import re
import shutil
import subprocess
import sys

SERVER = os.environ.get("LOOKS_SERVER", "http://localhost:8101").rstrip("/")
AUSGABE = os.environ.get("LOOKS_AUSGABE") or os.path.join(os.getcwd(), "pruefung")
OUT = os.path.join(AUSGABE, "_lh")
CHROME_STANDARD = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
LH = os.environ.get("LIGHTHOUSE") or shutil.which("lighthouse")


def name_und_url(arg):
    if re.match(r"^https?://", arg, re.I):
        m = re.search(r"/look-([a-z0-9-]+)/", arg, re.I)
        if m:
            return m.group(1), arg
        name = re.sub(r"[^a-z0-9]+", "-", re.sub(r"^https?://", "", arg, flags=re.I), flags=re.I).strip("-")[:60]
        return name or "seite", arg
    return arg, f"{SERVER}/look-{arg}/vorlage/demo.html"


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    if not LH or not (os.path.exists(LH) or shutil.which(LH)):
        print("Lighthouse nicht gefunden. Pfad in der Umgebungsvariable LIGHTHOUSE angeben "
              "oder lighthouse in den PATH legen (npm install lighthouse).")
        sys.exit(2)
    os.makedirs(OUT, exist_ok=True)
    env = dict(os.environ)
    if "CHROME_PATH" not in env and os.path.exists(CHROME_STANDARD):
        env["CHROME_PATH"] = CHROME_STANDARD
    ergebnis_pfad = os.path.join(OUT, "ergebnis.json")
    ergebnis = json.load(open(ergebnis_pfad)) if os.path.exists(ergebnis_pfad) else {}
    for arg in sys.argv[1:]:
        slug, url = name_und_url(arg)
        datei = os.path.join(OUT, f"{slug}.json")
        try:
            r = subprocess.run([LH, url, "--output=json", f"--output-path={datei}", "--quiet",
                                "--only-categories=performance,accessibility,best-practices",
                                "--chrome-flags=--headless=new --no-sandbox --disable-gpu"],
                               env=env, capture_output=True, text=True, timeout=240)
        except subprocess.TimeoutExpired:
            ergebnis[slug] = {"fehler": "Zeitüberschreitung nach 240 s"}
            print(slug, "FEHLER (Zeit)", flush=True)
            continue
        if not os.path.exists(datei):
            ergebnis[slug] = {"fehler": (r.stderr or r.stdout)[-300:]}
            print(slug, "FEHLER", ergebnis[slug]["fehler"], flush=True)
            continue
        d = json.load(open(datei))
        c = d["categories"]
        a = d["audits"]
        ergebnis[slug] = {
            "performance": round(c["performance"]["score"] * 100),
            "barrierefreiheit": round(c["accessibility"]["score"] * 100),
            "technik": round(c["best-practices"]["score"] * 100),
            "lcp_ms": round(a["largest-contentful-paint"]["numericValue"]),
            "tbt_ms": round(a["total-blocking-time"]["numericValue"]),
            "cls": round(a["cumulative-layout-shift"]["numericValue"], 3),
            "bytes_kb": round(a["total-byte-weight"]["numericValue"] / 1024),
            "dom_elemente": round(a["dom-size"]["numericValue"]),
            "a11y_fehler": [x for x, v in a.items() if v.get("score") == 0 and v.get("scoreDisplayMode") == "binary" and x in c["accessibility"]["auditRefs"].__repr__()][:6],
        }
        e = ergebnis[slug]
        print(slug, e["performance"], e["barrierefreiheit"], e["technik"],
              f"(LCP {e['lcp_ms']} ms, CLS {e['cls']}, {e['bytes_kb']} KB)", flush=True)
        # frisch laden und nur diesen Eintrag ergänzen (mehrere Läufe gleichzeitig möglich)
        aktuell = json.load(open(ergebnis_pfad)) if os.path.exists(ergebnis_pfad) else {}
        aktuell[slug] = ergebnis[slug]
        json.dump(aktuell, open(ergebnis_pfad, "w"), ensure_ascii=False, indent=1)
    print("Ergebnisse: " + ergebnis_pfad + "  (Reihenfolge der Zahlen: Leistung, Barrierefreiheit, Technik)")


if __name__ == "__main__":
    main()
