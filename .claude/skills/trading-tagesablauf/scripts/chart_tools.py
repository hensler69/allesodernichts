#!/usr/bin/env python3
"""Werkzeuge für Chart-Fotos und Screenshots (TradingView, IQ Capital): ablesen, messen, kalibrieren, einzeichnen.

Unterbefehle (alle Pixelangaben im ORIGINALBILD):
  info    BILD                                    Bildgröße
  raster  BILD --box X0 Y0 X1 Y1 [--zoom 3] [--schritt 10] --out DATEI
                                                  vergrößerter Ausschnitt mit Pixel-Lineal zum Ablesen
  linie   BILD --x X0 X1 --y Y0 Y1 [--schritt 3] [--hell]
                                                  waagerechte Linie im Fenster vermessen: y = a + b*x
  kalib   PLAN.json                               Kalibrierung prüfen: Restfehler je Referenz in Pips
  preis   PLAN.json --xy X Y [X Y ...]            Pixel -> Preis
  y       PLAN.json --preis P [P ...] [--x X]     Preis -> Pixel-y
  zeichnen PLAN.json                              Plan (Zonen, Linien, Pfeile, Texte) ins Bild zeichnen

Der Aufbau von PLAN.json steht in references/grafik.md.
"""
import argparse
import json
import math
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ---------------------------------------------------------------------------------------------- Farben
FARBEN = {
    "short": (200, 30, 30), "widerstand": (200, 30, 30),
    "long": (21, 128, 61), "unterstuetzung": (21, 128, 61),
    "neutral": (100, 110, 125), "kein-trade": (100, 110, 125),
    "stop": (150, 20, 20), "ziel": (109, 40, 217), "info": (37, 99, 235),
    "termin": (217, 119, 6), "liquiditaet": (180, 83, 9), "text": (30, 41, 59),
}
INK = (30, 41, 59)
GRAU = (90, 100, 115)
SCHRIFTEN = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans{}.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans{}.ttf",
    "/usr/share/fonts/TTF/DejaVuSans{}.ttf",
    "/Library/Fonts/Arial{}.ttf",
    "C:/Windows/Fonts/arial{}.ttf",
]


def farbe(art):
    if isinstance(art, (list, tuple)):
        return tuple(int(v) for v in art[:3])
    return FARBEN.get(str(art).lower(), FARBEN["info"])


def schrift(groesse, fett=False):
    for muster in SCHRIFTEN:
        for zusatz in (("-Bold", "bd", " Bold") if fett else ("", "-Regular")):
            pfad = muster.format(zusatz)
            if os.path.exists(pfad):
                return ImageFont.truetype(pfad, int(round(groesse)))
    return ImageFont.load_default()


# ---------------------------------------------------------------------------------------------- Messen
def grau(bild):
    a = np.asarray(bild.convert("RGB")).astype(float)
    return a @ np.array([0.299, 0.587, 0.114])


def spalten_y(G, x, y0, y1, hell=False, schwelle=18, band=3):
    """Subpixel-y der dunkelsten (bzw. hellsten) Stelle in Spalte x, Mittel über 3 Spalten; None ohne klaren Strich."""
    prof = G[y0:y1, max(x - 1, 0):x + 2].mean(axis=1)
    if hell:
        prof = 255 - prof
    hg = np.median(prof)
    i = int(np.argmin(prof))
    if hg - prof[i] < schwelle:
        return None
    lo, hi = max(i - band, 0), min(i + band + 1, len(prof))
    w = np.clip(hg - prof[lo:hi], 0, None)
    return y0 + float((np.arange(lo, hi) * w).sum() / w.sum())


def linie_messen(G, xs, y0, y1, hell=False):
    pts = [(x, spalten_y(G, x, y0, y1, hell)) for x in xs]
    pts = np.array([(x, y) for x, y in pts if y is not None])
    if len(pts) < 3:
        return None
    keep = np.ones(len(pts), bool)
    for _ in range(5):
        b, a = np.polyfit(pts[keep, 0], pts[keep, 1], 1)
        r = pts[:, 1] - (a + b * pts[:, 0])
        s = max(np.std(r[keep]), 0.3)
        keep = np.abs(r) < 2.5 * s
        if keep.sum() < 3:
            keep = np.ones(len(pts), bool)
            break
    b, a = np.polyfit(pts[keep, 0], pts[keep, 1], 1)
    sd = float(np.std(pts[keep, 1] - (a + b * pts[keep, 0])))
    return dict(a=float(a), b=float(b), sd=sd, n=int(keep.sum()), von=len(pts))


# ---------------------------------------------------------------------------------------------- Kalibrierung
class Kalibrierung:
    """Preis <-> Pixel aus waagerechten Referenzlinien bekannter Preise.

    Jede Referenz ist eine Gerade y = a + b*x (Fotos sind schräg und perspektivisch). Für ein x werden alle
    Referenzen ausgewertet und y(Preis) mit einem Polynom (Grad 2 ab 4 Referenzen, sonst 1) angepasst.
    """

    def __init__(self, refs, pip=0.0001):
        self.pip = pip
        roh = []
        for r in refs:
            p = float(r["preis"])
            if "a" in r:
                roh.append([p, float(r["a"]), float(r.get("b", 0.0)), True, r])
            else:
                pts = np.array(r["punkte"], float)
                if len(pts) >= 2:
                    b, a = np.polyfit(pts[:, 0], pts[:, 1], 1)
                    roh.append([p, a, b, True, r])
                else:
                    roh.append([p, None, None, False, r])
        mit = [z for z in roh if z[3]]
        for z in roh:
            if not z[3]:
                x0, y0 = z[4]["punkte"][0]
                if mit:
                    ps = np.array([m[0] for m in mit])
                    bs = np.array([m[2] for m in mit])
                    o = np.argsort(ps)
                    b = float(np.interp(z[0], ps[o], bs[o]))
                else:
                    b = 0.0
                z[1], z[2] = y0 - b * x0, b
        self.refs = sorted(roh, key=lambda z: z[0])
        if len(self.refs) < 2:
            raise SystemExit("Kalibrierung braucht mindestens 2 Referenzen mit bekanntem Preis.")
        self.grad = 2 if len(self.refs) >= 4 else 1

    def _koef(self, x, ohne=None):
        ps, ys = [], []
        for i, (p, a, b, _, _) in enumerate(self.refs):
            if i == ohne:
                continue
            ps.append(p)
            ys.append(a + b * x)
        grad = min(self.grad, len(ps) - 1)
        return np.polyfit(np.array(ps), np.array(ys), grad)

    def y(self, preis, x):
        return float(np.polyval(self._koef(x), preis))

    def preis(self, x, y):
        k = self._koef(x)
        ps = np.array([r[0] for r in self.refs])
        span = ps.max() - ps.min()
        gitter = np.linspace(ps.min() - span, ps.max() + span, 20001)
        ys = np.polyval(k, gitter)
        o = np.argsort(ys)
        return float(np.interp(y, ys[o], gitter[o]))

    def px_pro_pip(self, preis, x):
        return abs(self.y(preis + self.pip, x) - self.y(preis, x))

    def pruefen(self):
        zeilen = []
        for i, (p, a, b, _, r) in enumerate(self.refs):
            pts = r.get("punkte")
            x = float(np.mean([q[0] for q in pts])) if pts else float(r.get("x", 0.0))
            y_ist = a + b * x
            rest = (y_ist - self.y(p, x)) / max(self.px_pro_pip(p, x), 1e-9)
            loo = None
            if len(self.refs) > 3:
                k = self._koef(x, ohne=i)
                loo = (y_ist - float(np.polyval(k, p))) / max(self.px_pro_pip(p, x), 1e-9)
            zeilen.append((r.get("name", ""), p, x, y_ist, rest, loo))
        return zeilen


def kalibrierung_aus(plan):
    refs = plan.get("referenzen")
    if not refs:
        return None
    return Kalibrierung(refs, float(plan.get("pip", 0.0001)))


# ---------------------------------------------------------------------------------------------- Zeichnen
class Zeichner:
    def __init__(self, plan, plan_dir):
        self.plan = plan
        pfad = plan["bild"]
        if not os.path.isabs(pfad):
            pfad = os.path.join(plan_dir, pfad)
        self.quelle = Image.open(pfad).convert("RGB")
        W, H = self.quelle.size
        self.box = [int(v) for v in plan.get("ausschnitt", [0, 0, W, H])]
        self.zoom = float(plan.get("zoom", 1.0))
        x0, y0, x1, y1 = self.box
        basis = self.quelle.crop(self.box)
        if self.zoom != 1.0:
            basis = basis.resize((int((x1 - x0) * self.zoom), int((y1 - y0) * self.zoom)), Image.LANCZOS)
        self.basis = basis.convert("RGBA")
        self.ov = Image.new("RGBA", self.basis.size, (0, 0, 0, 0))
        self.d = ImageDraw.Draw(self.ov)
        self.kal = kalibrierung_aus(plan)
        breite = self.basis.size[0] + int(plan.get("rand_rechts", 0))
        self.s = float(plan.get("schrift", 1.0)) * max(15.0, breite / 78.0)
        self.seiten = []

    # Koordinaten -------------------------------------------------------------------------------
    def T(self, x, y):
        return ((x - self.box[0]) * self.zoom, (y - self.box[1]) * self.zoom)

    def yy(self, el, x, schluessel="preis", ys="y"):
        if schluessel in el and el[schluessel] is not None:
            if self.kal is None:
                raise SystemExit(f"Element mit '{schluessel}' braucht 'referenzen' im Plan: {el}")
            return self.kal.y(float(el[schluessel]), x)
        return float(el[ys])

    def punkt(self, p):
        """[x, preis] (mit Kalibrierung) bzw. [x, y] (ohne), oder {"x":..,"preis":..} / {"x":..,"y":..}."""
        if isinstance(p, dict):
            x = float(p["x"])
            y = self.yy(p, x)
        else:
            x, v = float(p[0]), float(p[1])
            y = self.kal.y(v, x) if self.kal is not None else v
        return self.T(x, y)

    # Grundformen -------------------------------------------------------------------------------
    def gestrichelt(self, a, b, col, w, strich=None, luecke=None, alpha=255):
        strich = strich or 3.2 * w + 6
        luecke = luecke or 1.8 * w + 4
        L = math.hypot(b[0] - a[0], b[1] - a[1])
        if L < 1:
            return
        t = 0.0
        while t < L:
            te = min(t + strich, L)
            p0 = (a[0] + (b[0] - a[0]) * t / L, a[1] + (b[1] - a[1]) * t / L)
            p1 = (a[0] + (b[0] - a[0]) * te / L, a[1] + (b[1] - a[1]) * te / L)
            self.d.line([p0, p1], fill=col + (alpha,), width=int(w))
            t = te + luecke

    def linienzug(self, pts, col, w, stil):
        for a, b in zip(pts[:-1], pts[1:]):
            if stil == "durchgezogen":
                self.d.line([a, b], fill=col + (255,), width=int(w))
            elif stil == "gepunktet":
                self.gestrichelt(a, b, col, w, strich=w, luecke=1.6 * w + 2)
            else:
                self.gestrichelt(a, b, col, w)

    def spitze(self, a, b, col, groesse):
        ang = math.atan2(b[1] - a[1], b[0] - a[0])
        self.d.polygon([b, (b[0] - groesse * math.cos(ang - 0.45), b[1] - groesse * math.sin(ang - 0.45)),
                        (b[0] - groesse * math.cos(ang + 0.45), b[1] - groesse * math.sin(ang + 0.45))],
                       fill=col + (255,))

    def badge(self, mitte, text, col, r=None):
        r = r or 0.85 * self.s
        x, y = mitte
        self.d.ellipse([x - r, y - r, x + r, y + r], fill=col + (255,))
        self.d.text((x, y), str(text), font=schrift(1.05 * self.s, True), fill=(255, 255, 255, 255), anchor="mm")

    def kasten(self, d, xy, zeilen, col, anker="lm", fuellung=(255, 255, 255, 240), rand=3):
        """Text-Kasten: erste Zeile fett in Farbe, weitere normal in Tinte."""
        x, y = xy
        fs = [schrift(self.s, True)] + [schrift(0.86 * self.s)] * (len(zeilen) - 1)
        zh = 1.32 * self.s
        breite = max(d.textlength(t, font=f) for t, f in zip(zeilen, fs))
        hoehe = zh * len(zeilen)
        pad = 0.45 * self.s
        if anker[0] == "l":
            lx = x
        elif anker[0] == "r":
            lx = x - breite
        else:
            lx = x - breite / 2
        oy = y - hoehe / 2 if anker[1] == "m" else (y if anker[1] == "t" else y - hoehe)
        d.rounded_rectangle([lx - pad, oy - 0.3 * pad, lx + breite + pad, oy + hoehe + 0.3 * pad],
                            radius=int(0.5 * pad), fill=fuellung, outline=col + (255,) if len(col) == 3 else col,
                            width=rand)
        for i, (t, f) in enumerate(zip(zeilen, fs)):
            c = col if i == 0 else INK
            d.text((lx, oy + zh * (i + 0.5)), t, font=f, fill=(c + (255,)) if len(c) == 3 else c, anchor="lm")
        return lx - pad, oy, lx + breite + pad, oy + hoehe

    # Elemente ----------------------------------------------------------------------------------
    def zone(self, z):
        col = farbe(z.get("art", "info"))
        x0, x1 = float(z["x0"]), float(z["x1"])
        yo0, yo1 = self.yy(z, x0, "oben", "y_oben"), self.yy(z, x1, "oben", "y_oben")
        yu0, yu1 = self.yy(z, x0, "unten", "y_unten"), self.yy(z, x1, "unten", "y_unten")
        poly = [self.T(x0, yo0), self.T(x1, yo1), self.T(x1, yu1), self.T(x0, yu0)]
        self.d.polygon(poly, fill=col + (int(z.get("deckkraft", 55)),))
        w = max(2, int(self.s / 7))
        if z.get("neu"):
            for a, b in zip(poly, poly[1:] + poly[:1]):
                self.gestrichelt(a, b, col, w)
        else:
            self.d.line(poly + [poly[0]], fill=col + (235,), width=w)
        if z.get("titel"):
            xm = (x0 + x1) / 2
            ym = (self.yy(z, xm, "oben", "y_oben") + self.yy(z, xm, "unten", "y_unten")) / 2
            if "titel_x" in z:
                xm = float(z["titel_x"])
            self.d.text(self.T(xm, ym), z["titel"], font=schrift(1.6 * self.s, True), fill=col + (235,), anchor="mm")
        if z.get("text"):
            ym1 = (yo1 + yu1) / 2
            self.seite(self.T(x1, ym1), [z["text"] + ("  (neu)" if z.get("neu") else "")] +
                       ([z["unterzeile"]] if z.get("unterzeile") else []), col, z.get("seite", True), z)

    def linie(self, l):
        col = farbe(l.get("art", "info"))
        x0, x1 = float(l["x0"]), float(l["x1"])
        a, b = self.T(x0, self.yy(l, x0)), self.T(x1, self.yy(l, x1))
        w = int(l.get("breite", max(2, self.s / 7)))
        self.linienzug([a, b], col, w, l.get("stil", "gestrichelt"))
        if l.get("text"):
            zeilen = [l["text"] + ("  (neu)" if l.get("neu") else "")] + ([l["unterzeile"]] if l.get("unterzeile") else [])
            if l.get("seite", False):
                self.seite(b, zeilen, col, True, l)
            else:
                tx = float(l.get("text_x", x1))
                ty = self.yy(l, tx) + float(l.get("text_dy", 0))
                self.kasten(self.d, (self.T(tx, ty)[0] + 0.4 * self.s, self.T(tx, ty)[1]), zeilen, col,
                            anker=l.get("anker", "lm"))

    def pfeil(self, p):
        col = farbe(p.get("art", "info"))
        pts = [self.punkt(q) for q in p["punkte"]]
        w = int(p.get("breite", max(3, self.s / 4.5)))
        self.linienzug(pts, col, w, p.get("stil", "gestrichelt"))
        self.spitze(pts[-2], pts[-1], col, 1.3 * self.s)
        if p.get("badge"):
            bx = p.get("badge_xy")
            pos = self.punkt(bx) if bx else (pts[0][0], pts[0][1] - 1.6 * self.s)
            self.badge(pos, p["badge"], col)

    def ring(self, r):
        col = farbe(r.get("art", "info"))
        x, y = self.punkt(r)
        rad = float(r.get("r", 14)) * self.zoom
        self.d.ellipse([x - rad, y - rad, x + rad, y + rad], outline=col + (255,), width=max(3, int(self.s / 6)))

    def rahmen(self, r):
        col = farbe(r.get("art", "info"))
        x0, x1 = float(r["x0"]), float(r["x1"])
        a = self.T(x0, self.yy(r, x0, "oben", "y_oben"))
        b = self.T(x1, self.yy(r, x1, "unten", "y_unten"))
        self.d.rounded_rectangle([min(a[0], b[0]), min(a[1], b[1]), max(a[0], b[0]), max(a[1], b[1])],
                                 radius=int(0.4 * self.s), outline=col + (255,), width=max(3, int(self.s / 6)))

    def fenster(self, f):
        """Senkrechtes Zeitband (z. B. Sperrzeit um Daten) über die ganze Höhe des Ausschnitts."""
        col = farbe(f.get("art", "termin"))
        a, b = self.T(float(f["x0"]), self.box[1]), self.T(float(f["x1"]), self.box[3])
        self.d.rectangle([min(a[0], b[0]), 0, max(a[0], b[0]), self.basis.size[1]],
                         fill=col + (int(f.get("deckkraft", 45)),))
        if f.get("text"):
            zeilen = f["text"] if isinstance(f["text"], list) else [f["text"]]
            y = float(f["text_y"]) if "text_y" in f else self.box[1] + 0.06 * (self.box[3] - self.box[1])
            self.kasten(self.d, self.T((float(f["x0"]) + float(f["x1"])) / 2, y), zeilen, col, anker="mt")

    def fibo(self, f):
        """Fibonacci wie in TradingView: Stufe 1 = 'von' (Start der Bewegung), Stufe 0 = 'bis' (Ende)."""
        col = farbe(f.get("art", "info"))
        x0, x1 = float(f["x0"]), float(f["x1"])
        stufen = f.get("stufen", [0, 0.5, 0.62, 0.705, 0.79, 1])
        if self.kal is not None and "von" in f:
            von, bis = float(f["von"]), float(f["bis"])
            preis = lambda s: bis + s * (von - bis)
            yy = lambda s, x: self.kal.y(preis(s), x)
        else:
            yv, yb = float(f["y_von"]), float(f["y_bis"])
            preis = None
            yy = lambda s, x: yb + s * (yv - yb)
        if f.get("zone"):
            a, b = f["zone"]
            poly = [self.T(x0, yy(a, x0)), self.T(x1, yy(a, x1)), self.T(x1, yy(b, x1)), self.T(x0, yy(b, x0))]
            self.d.polygon(poly, fill=col + (int(f.get("deckkraft", 40)),))
        fs = schrift(0.72 * self.s)
        for s in stufen:
            a_, b_ = self.T(x0, yy(s, x0)), self.T(x1, yy(s, x1))
            wichtig = s in (0, 0.5, 1)
            self.linienzug([a_, b_], col, max(2, int(self.s / (7 if wichtig else 10))),
                           "durchgezogen" if s in (0, 1) else "gestrichelt")
            name = f"{s:g}".replace(".", ",")
            if preis is not None:
                name += " · " + f"{preis(s):.5f}".replace(".", ",")
            self.d.text((b_[0] + 0.3 * self.s, b_[1]), name, font=fs, fill=col + (255,), anchor="lm")
        if f.get("text"):
            top = min(yy(s, x0) for s in stufen)
            self.d.text(self.T(x0, top), f["text"], font=schrift(0.8 * self.s, True), fill=col + (255,), anchor="lb")

    def text(self, t):
        col = farbe(t.get("art", "text"))
        x = float(t["x"])
        pos = self.T(x, self.yy(t, x))
        if t.get("kasten", True):
            zeilen = t["text"] if isinstance(t["text"], list) else [t["text"]]
            self.kasten(self.d, pos, zeilen, col, anker=t.get("anker", "lm"))
        else:
            f = schrift(float(t.get("groesse", 1.0)) * self.s, t.get("fett", True))
            self.d.text(pos, t["text"], font=f, fill=col + (255,), anchor=t.get("anker", "lm"))

    def seite(self, von, zeilen, col, an_rand, el):
        if an_rand and int(self.plan.get("rand_rechts", 0)) > 0:
            self.seiten.append(dict(von=von, zeilen=zeilen, col=col))
        else:
            self.kasten(self.d, (von[0] + 0.6 * self.s, von[1]), zeilen, col)

    # Zusammensetzen ----------------------------------------------------------------------------
    def fertig(self):
        chart = Image.alpha_composite(self.basis, self.ov).convert("RGB")
        Wc, Hc = chart.size
        rand = int(self.plan.get("rand_rechts", 0))
        kopf = self.plan.get("kopf", [])
        fuss = self.plan.get("fuss", [])
        gesamt_b = Wc + rand
        fk = schrift(1.05 * self.s, True)
        fz = schrift(0.92 * self.s)
        tmp = ImageDraw.Draw(Image.new("RGB", (10, 10)))

        def umbrechen(text, f, breite):
            woerter, zeilen, akt = text.split(), [], ""
            for w in woerter:
                probe = (akt + " " + w).strip()
                if tmp.textlength(probe, font=f) <= breite:
                    akt = probe
                else:
                    if akt:
                        zeilen.append(akt)
                    akt = w
            if akt:
                zeilen.append(akt)
            return zeilen

        rand_px = int(0.9 * self.s)
        kopf_z = []
        for i, t in enumerate(kopf):
            f = fk if i == 0 else fz
            kopf_z += [(z, f, INK if i == 0 else GRAU) for z in umbrechen(t, f, gesamt_b - 2 * rand_px)]
        fuss_z = []
        for i, t in enumerate(fuss):
            f = fz
            c = GRAU if i == len(fuss) - 1 and len(fuss) > 1 else INK
            fuss_z += [(z, f, c) for z in umbrechen(t, f, gesamt_b - 2 * rand_px)]
        zh = 1.4 * self.s
        kh = int(len(kopf_z) * zh + (0.8 * self.s if kopf_z else 0))
        fh = int(len(fuss_z) * zh + (0.9 * self.s if fuss_z else 0))
        out = Image.new("RGB", (gesamt_b, kh + Hc + fh), (255, 255, 255))
        out.paste(chart, (0, kh))
        d = ImageDraw.Draw(out)
        for i, (z, f, c) in enumerate(kopf_z):
            d.text((rand_px, 0.4 * self.s + zh * (i + 0.5)), z, font=f, fill=c, anchor="lm")
        if kopf_z:
            d.line([(0, kh - 2), (gesamt_b, kh - 2)], fill=(203, 213, 225), width=2)
        for i, (z, f, c) in enumerate(fuss_z):
            d.text((rand_px, kh + Hc + 0.45 * self.s + zh * (i + 0.5)), z, font=f, fill=c, anchor="lm")
        # Beschriftungen im rechten Rand, von oben nach unten ohne Überlappung
        if self.seiten:
            lx = Wc + int(0.9 * self.s)
            eintr = sorted(self.seiten, key=lambda e: e["von"][1])
            hoehen = [1.32 * self.s * len(e["zeilen"]) + 0.5 * self.s for e in eintr]
            ziel = [e["von"][1] + kh for e in eintr]
            pos, unten = [], kh + 0.3 * self.s
            for zy, h in zip(ziel, hoehen):
                y = max(zy, unten + h / 2)
                pos.append(y)
                unten = y + h / 2 + 0.25 * self.s
            grenze = kh + Hc - 0.3 * self.s
            for i in range(len(pos) - 1, -1, -1):
                if pos[i] + hoehen[i] / 2 > grenze:
                    pos[i] = grenze - hoehen[i] / 2
                grenze = pos[i] - hoehen[i] / 2 - 0.25 * self.s
            for e, y in zip(eintr, pos):
                vx, vy = e["von"][0], e["von"][1] + kh
                d.line([(vx, vy), (Wc, vy), (lx - 0.5 * self.s, y)], fill=e["col"], width=max(2, int(self.s / 9)))
                self.kasten(d, (lx, y), e["zeilen"], e["col"])
        return out

    def alles(self):
        for f in self.plan.get("zeitfenster", []):
            self.fenster(f)
        for z in self.plan.get("zonen", []):
            self.zone(z)
        for f in self.plan.get("fibos", []):
            self.fibo(f)
        for r in self.plan.get("rahmen", []):
            self.rahmen(r)
        for l in self.plan.get("linien", []):
            self.linie(l)
        for p in self.plan.get("pfeile", []):
            self.pfeil(p)
        for r in self.plan.get("ringe", []):
            self.ring(r)
        for t in self.plan.get("texte", []):
            self.text(t)
        return self.fertig()


# ---------------------------------------------------------------------------------------------- Kommandos
def cmd_info(a):
    im = Image.open(a.bild)
    print(f"{a.bild}: {im.size[0]} x {im.size[1]} Pixel, Modus {im.mode}")


def cmd_raster(a):
    im = Image.open(a.bild).convert("RGB")
    x0, y0, x1, y1 = a.box
    z, st = a.zoom, a.schritt
    c = im.crop((x0, y0, x1, y1)).resize(((x1 - x0) * z, (y1 - y0) * z), Image.LANCZOS)
    d = ImageDraw.Draw(c)
    f = schrift(11)
    for y in range((y0 // st + 1) * st, y1, st):
        gross = y % (5 * st) == 0
        d.line([(0, (y - y0) * z), (30 if gross else 12, (y - y0) * z)], fill=(255, 0, 0) if gross else (255, 150, 150))
        if gross:
            d.text((32, (y - y0) * z - 6), str(y), font=f, fill=(255, 0, 0))
    for x in range((x0 // st + 1) * st, x1, st):
        gross = x % (5 * st) == 0
        d.line([((x - x0) * z, 0), ((x - x0) * z, 30 if gross else 12)], fill=(0, 0, 255) if gross else (150, 150, 255))
        if gross:
            d.text(((x - x0) * z + 2, 32), str(x), font=f, fill=(0, 0, 255))
    c.save(a.out)
    print(f"{a.out}: Ausschnitt x {x0}-{x1}, y {y0}-{y1}, Zoom {z}, Lineal alle {st} px (beschriftet alle {5 * st})")


def cmd_linie(a):
    G = grau(Image.open(a.bild))
    xs = list(range(int(a.x[0]), int(a.x[1]), a.schritt))
    r = linie_messen(G, xs, int(a.y[0]), int(a.y[1]), a.hell)
    if r is None:
        print("Keine klare Linie gefunden (Fenster enger wählen oder --hell versuchen).")
        sys.exit(1)
    xm = (a.x[0] + a.x[1]) / 2
    print(json.dumps({"a": round(r["a"], 3), "b": round(r["b"], 6)}))
    print(f"y(x) = {r['a']:.2f} {r['b']:+.5f}*x | y bei x={xm:.0f}: {r['a'] + r['b'] * xm:.2f} | "
          f"Streuung {r['sd']:.2f} px | Punkte {r['n']}/{r['von']}")


def lade_plan(pfad):
    with open(pfad) as f:
        return json.load(f)


def cmd_kalib(a):
    plan = lade_plan(a.plan)
    kal = kalibrierung_aus(plan)
    if kal is None:
        print("Keine 'referenzen' im Plan.")
        sys.exit(1)
    print(f"Referenzen: {len(kal.refs)}, Polynom Grad {kal.grad}")
    print(f"{'Name':24s} {'Preis':>9s} {'x':>7s} {'y':>8s} {'Rest':>7s} {'ohne':>7s}  (Pips)")
    rs, ls = [], []
    for name, p, x, y, rest, loo in kal.pruefen():
        rs.append(rest)
        if loo is not None:
            ls.append(loo)
        print(f"{name[:24]:24s} {p:9.5f} {x:7.0f} {y:8.1f} {rest:+7.2f} " + (f"{loo:+7.2f}" if loo is not None else "      -"))
    print(f"Restfehler rms {np.sqrt(np.mean(np.square(rs))):.2f} Pip" +
          (f", ohne die jeweilige Referenz rms {np.sqrt(np.mean(np.square(ls))):.2f} Pip (ehrliche Genauigkeit)" if ls else ""))
    xs = [np.mean([q[0] for q in r[4]["punkte"]]) if r[4].get("punkte") else 0 for r in kal.refs]
    xm = float(np.mean(xs)) if xs else 0
    pm = float(np.mean([r[0] for r in kal.refs]))
    print(f"Maßstab bei x={xm:.0f}: {kal.px_pro_pip(pm, xm):.2f} px pro Pip")


def cmd_preis(a):
    kal = kalibrierung_aus(lade_plan(a.plan))
    v = a.xy
    for x, y in zip(v[0::2], v[1::2]):
        print(f"x={x:.0f} y={y:.1f} -> {kal.preis(x, y):.5f}")


def cmd_y(a):
    plan = lade_plan(a.plan)
    kal = kalibrierung_aus(plan)
    for p in a.preis:
        print(f"{p:.5f} -> y={kal.y(p, a.x):.1f} bei x={a.x:.0f}")


def cmd_zeichnen(a):
    plan = lade_plan(a.plan)
    z = Zeichner(plan, os.path.dirname(os.path.abspath(a.plan)))
    out = z.alles()
    ziel = plan.get("ausgabe", os.path.splitext(a.plan)[0] + ".png")
    if not os.path.isabs(ziel):
        ziel = os.path.join(os.path.dirname(os.path.abspath(a.plan)), ziel)
    out.save(ziel, optimize=True)
    print(f"{ziel}: {out.size[0]} x {out.size[1]} Pixel. Jetzt ansehen und prüfen (Überlappungen, Lesbarkeit).")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest="cmd", required=True)
    p = sp.add_parser("info")
    p.add_argument("bild")
    p.set_defaults(f=cmd_info)
    p = sp.add_parser("raster")
    p.add_argument("bild")
    p.add_argument("--box", nargs=4, type=int, required=True)
    p.add_argument("--zoom", type=int, default=3)
    p.add_argument("--schritt", type=int, default=10)
    p.add_argument("--out", required=True)
    p.set_defaults(f=cmd_raster)
    p = sp.add_parser("linie")
    p.add_argument("bild")
    p.add_argument("--x", nargs=2, type=float, required=True)
    p.add_argument("--y", nargs=2, type=float, required=True)
    p.add_argument("--schritt", type=int, default=3)
    p.add_argument("--hell", action="store_true", help="helle Linie auf dunklem Grund")
    p.set_defaults(f=cmd_linie)
    p = sp.add_parser("kalib")
    p.add_argument("plan")
    p.set_defaults(f=cmd_kalib)
    p = sp.add_parser("preis")
    p.add_argument("plan")
    p.add_argument("--xy", nargs="+", type=float, required=True)
    p.set_defaults(f=cmd_preis)
    p = sp.add_parser("y")
    p.add_argument("plan")
    p.add_argument("--preis", nargs="+", type=float, required=True)
    p.add_argument("--x", type=float, default=0.0)
    p.set_defaults(f=cmd_y)
    p = sp.add_parser("zeichnen")
    p.add_argument("plan")
    p.set_defaults(f=cmd_zeichnen)
    a = ap.parse_args()
    a.f(a)


if __name__ == "__main__":
    main()
