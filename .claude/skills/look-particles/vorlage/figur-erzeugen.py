#!/usr/bin/env python3
"""Zeichnet die Hero-Figur (Gerät mit Kegel-Einsatz und Schüssel mit Gemüse) als Punkt-Linien-Grafik.

Aufruf:  python3 figur-erzeugen.py > figur-teil.html
Ausgabe: ein SVG-Teil (<g>-Gruppen) für 600 x 560 Einheiten, bereit zum Einsetzen in <defs><g id="fig-inhalt">.
Arbeitsweise: Jede Form (Kreis, Rechteck, Linie) wird als dichte Kontur beschrieben und danach in gleichen Abständen
abgetastet. Aus den Abtastpunkten werden Knoten (Kreise). Entlang der Kontur verbindet je eine Linie zwei Nachbarn,
dazu kommen kurze Querlinien zwischen Formen, die nah beieinander liegen (das Netz).
Anpassen: ABSTAND (Punktabstand), die Formen in baue(), SEED (anderes Streumuster).
"""
import math
import random

SEED = 7
ABSTAND = 15          # Punktabstand entlang großer Konturen
NETZ_REICHWEITE = 40  # Querlinien nur zwischen Knoten, die näher beieinander liegen
rnd = random.Random(SEED)


def kreis(cx, cy, r, von=0.0, bis=2 * math.pi, n=400):
    return [(cx + r * math.cos(von + (bis - von) * i / n), cy + r * math.sin(von + (bis - von) * i / n)) for i in range(n + 1)]


def ellipse(cx, cy, rx, ry, von=0.0, bis=2 * math.pi, n=400):
    return [(cx + rx * math.cos(von + (bis - von) * i / n), cy + ry * math.sin(von + (bis - von) * i / n)) for i in range(n + 1)]


def linie(p, q, n=200):
    return [(p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n) for i in range(n + 1)]


def rechteck_rund(x0, y0, x1, y1, r):
    pts = []
    pts += linie((x0 + r, y0), (x1 - r, y0), 60)
    pts += kreis(x1 - r, y0 + r, r, -math.pi / 2, 0, 20)
    pts += linie((x1, y0 + r), (x1, y1 - r), 60)
    pts += kreis(x1 - r, y1 - r, r, 0, math.pi / 2, 20)
    pts += linie((x1 - r, y1), (x0 + r, y1), 60)
    pts += kreis(x0 + r, y1 - r, r, math.pi / 2, math.pi, 20)
    pts += linie((x0, y1 - r), (x0, y0 + r), 60)
    pts += kreis(x0 + r, y0 + r, r, math.pi, 1.5 * math.pi, 20)
    return pts


def laenge(pts):
    return sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1))


def abtasten(pts, schritt, geschlossen, mindest=3):
    """Gleichmäßig verteilte Punkte entlang einer Kontur."""
    gesamt = laenge(pts)
    n = max(mindest, round(gesamt / schritt))
    ziele = [gesamt * i / (n if not geschlossen else n) for i in range(n if geschlossen else n + 1)]
    erg, acc, j = [], 0.0, 0
    for z in ziele:
        while j < len(pts) - 2 and acc + math.dist(pts[j], pts[j + 1]) < z:
            acc += math.dist(pts[j], pts[j + 1])
            j += 1
        seg = math.dist(pts[j], pts[j + 1]) or 1
        t = max(0.0, min(1.0, (z - acc) / seg))
        erg.append((pts[j][0] + (pts[j + 1][0] - pts[j][0]) * t, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * t))
    return erg


def baue():
    formen = []  # (kontur, geschlossen, farbe, schritt)
    # Stopfer und Schacht
    formen.append((rechteck_rund(276, 20, 324, 44, 8), True, "k", 14))
    formen.append((linie((288, 44), (288, 92)), False, "k", 16))
    formen.append((linie((312, 44), (312, 92)), False, "k", 16))
    formen.append((ellipse(300, 86, 50, 10), True, "k", 14))
    formen.append((linie((250, 86), (250, 208)), False, "k", ABSTAND))
    formen.append((linie((350, 86), (350, 208)), False, "k", ABSTAND))
    # Gehäuse und Kegel-Einsatz (Scheibe mit fünf Löchern)
    formen.append((kreis(300, 268, 78), True, "k", ABSTAND))
    formen.append((kreis(300, 268, 58), True, "k", ABSTAND))
    for i in range(5):
        w = -math.pi / 2 + i * 2 * math.pi / 5
        formen.append((kreis(300 + 33 * math.cos(w), 268 + 33 * math.sin(w), 11), True, "m", 14))
    # Motorblock rechts
    formen.append((rechteck_rund(396, 150, 474, 372, 16), True, "k", ABSTAND))
    formen.append((linie((371, 236), (396, 236)), False, "k", 12))
    formen.append((linie((371, 300), (396, 300)), False, "k", 12))
    formen.append((kreis(435, 196, 14), True, "m", 14))
    # Schüssel
    formen.append((ellipse(300, 440, 135, 20), True, "k", ABSTAND))
    formen.append((ellipse(300, 440, 135, 90, 0.0, math.pi), False, "k", ABSTAND))
    formen.append((linie((90, 540), (510, 540)), False, "m", 42))
    return formen


def main():
    formen = baue()
    knoten = []   # (x, y, farbe, formindex)
    kanten = []   # (i, j, art)  art: 'k' Kontur, 'n' Netz
    for fi, (kontur, geschl, farbe, schritt) in enumerate(formen):
        pts = abtasten(kontur, schritt, geschl)
        start = len(knoten)
        for p in pts:
            knoten.append((p[0], p[1], farbe, fi))
        for a in range(len(pts) - 1):
            kanten.append((start + a, start + a + 1, "k"))
        if geschl and len(pts) > 2:
            kanten.append((start + len(pts) - 1, start, "k"))
    # einzelne Knoten: Nabe, Knöpfe
    for p in [(300, 268), (435, 252), (435, 280), (435, 308)]:
        knoten.append((p[0], p[1], "m", -1))
    # Netz: je Knoten höchstens zwei Querlinien zu anderen Formen
    vorhanden = {(min(a, b), max(a, b)) for a, b, _ in kanten}
    for i, (x, y, f, fi) in enumerate(knoten):
        nah = sorted(((math.dist((x, y), (k[0], k[1])), j) for j, k in enumerate(knoten) if j != i and k[3] != fi), key=lambda t: t[0])
        zaehler = 0
        for d, j in nah:
            if d > NETZ_REICHWEITE or zaehler >= 2:
                break
            if (min(i, j), max(i, j)) in vorhanden:
                continue
            vorhanden.add((min(i, j), max(i, j)))
            kanten.append((i, j, "n"))
            zaehler += 1
    # Speichen von der Nabe zu den fünf Löchern
    nabe = len(knoten) - 4
    for i in range(5):
        w = -math.pi / 2 + i * 2 * math.pi / 5
        ziel = (300 + 22 * math.cos(w), 268 + 22 * math.sin(w))
        j = min((j for j, k in enumerate(knoten) if k[3] >= 0 and k[2] == "m"), key=lambda j: math.dist((knoten[j][0], knoten[j][1]), ziel))
        kanten.append((nabe, j, "n"))
    # Knöpfe am Motorblock verbinden
    for a in range(len(knoten) - 3, len(knoten)):
        kanten.append((a - 1 if a > len(knoten) - 3 else a, a, "k")) if a > len(knoten) - 3 else None

    def zahl(v):
        return ("%.1f" % v).rstrip("0").rstrip(".")

    def pfad(art):
        teile = []
        for a, b, t in kanten:
            if t == art:
                teile.append("M%s %sL%s %s" % (zahl(knoten[a][0]), zahl(knoten[a][1]), zahl(knoten[b][0]), zahl(knoten[b][1])))
        return "".join(teile)

    ausgabe = []
    ausgabe.append('<path class="fig-netz" d="%s"/>' % pfad("n"))
    ausgabe.append('<path class="fig-linien" d="%s"/>' % pfad("k"))
    for farbe, klasse in (("k", "fig-knoten"), ("m", "fig-knoten fig-knoten--mint")):
        kreise = "".join('<circle cx="%s" cy="%s" r="%s"/>' % (zahl(x), zahl(y), "3" if farbe == "k" else "2.6") for x, y, f, fi in knoten if f == farbe)
        ausgabe.append('<g class="%s">%s</g>' % (klasse, kreise))

    # Gemüsestücke im Haufen über der Schüssel (Ringe, Scheiben mit Mittelpunkt und Punkte), kein Überlappen
    stuecke = []
    versuche = 0
    while len(stuecke) < 24 and versuche < 6000:
        versuche += 1
        x = 300 + rnd.uniform(-104, 104)
        y = 436 - rnd.uniform(0, 50)
        if ((x - 300) / 104) ** 2 + ((y - 436) / 50) ** 2 > 1:
            continue
        r = rnd.choice([6, 7, 8, 9, 10, 11])
        if all(math.dist((x, y), (sx, sy)) > r + sr + 2.5 for sx, sy, sr, _ in stuecke):
            stuecke.append((x, y, r, rnd.random()))
    ringe, punkte = [], []
    for x, y, r, w in stuecke:
        if w < 0.66:
            ringe.append('<circle cx="%s" cy="%s" r="%s"/>' % (zahl(x), zahl(y), r))
            if r >= 8:
                ringe.append('<circle cx="%s" cy="%s" r="%s"/>' % (zahl(x), zahl(y), zahl(r * 0.45)))
            punkte.append('<circle cx="%s" cy="%s" r="1.8"/>' % (zahl(x), zahl(y)))
        else:
            punkte.append('<circle cx="%s" cy="%s" r="%s"/>' % (zahl(x), zahl(y), zahl(r * 0.42 + 1.2)))
    ausgabe.append('<g class="fig-gemuese">%s</g>' % "".join(ringe))
    ausgabe.append('<g class="fig-gemuese-punkte">%s</g>' % "".join(punkte))

    # fallende Stücke unter dem Gehäuse (Standbild: Punkte in einer Reihe, im Betrieb laufen sie nach unten)
    fall = []
    for i, (dx, r) in enumerate([(-6, 3.4), (7, 2.8), (-2, 3.8), (5, 2.6), (-8, 3.0)]):
        fall.append('<circle style="--i:%d" cx="%s" cy="%s" r="%s"/>' % (i, zahl(300 + dx), zahl(354 + i * 9), r))
    ausgabe.append('<g class="fig-fall">%s</g>' % "".join(fall))

    # freie Streupunkte um die Figur (lösen sich aus dem Gerät)
    streu = []
    versuche = 0
    while len(streu) < 22 and versuche < 4000:
        versuche += 1
        x, y = rnd.uniform(30, 570), rnd.uniform(14, 540)
        if min(math.dist((x, y), (k[0], k[1])) for k in knoten) < 34:
            continue
        if any(math.dist((x, y), s) < 40 for s in streu):
            continue
        streu.append((x, y))
    ausgabe.append('<g class="fig-streu">%s</g>' % "".join('<circle cx="%s" cy="%s" r="%s"/>' % (zahl(x), zahl(y), rnd.choice(["1.4", "1.8", "2.2"])) for x, y in streu))
    print("\n".join(ausgabe))


if __name__ == "__main__":
    main()
