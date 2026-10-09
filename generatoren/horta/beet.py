import math
import os
import random
# Weiche Gemüsebeet-Silhouetten für den Hintergrund (Salatköpfe, Lauch, Möhrengrün, Kräuter),
# ein Blattschatten wie von einer Küchenpflanze am Fenster und das Favicon (Gurkenscheibe).
OUT = os.path.join(os.environ.get("SHOP_ZIEL", "./shop/"), "assets/img/")
W, H = 1600, 420


def salat(r, x, boden, s):
    teile = []
    for _ in range(7):
        dx = r.uniform(-.55, .55) * s
        dy = r.uniform(.25, .75) * s
        rx = r.uniform(.32, .5) * s
        teile.append(f'<ellipse cx="{x + dx:.0f}" cy="{boden - dy:.0f}" rx="{rx:.0f}" ry="{rx * .8:.0f}"/>')
    return "".join(teile)


def lauch(r, x, boden, h):
    teile = []
    for k in range(r.randint(3, 5)):
        neig = r.uniform(-.5, .5)
        hh = h * r.uniform(.7, 1)
        ex, ey = x + neig * hh * .6, boden - hh
        teile.append(f'<path d="M{x} {boden}Q{x + neig * hh * .1:.0f} {boden - hh * .55:.0f} {ex:.0f} {ey:.0f}" fill="none" stroke-width="{r.uniform(7, 11):.1f}" stroke-linecap="round"/>')
    return "".join(teile)


def moehre(r, x, boden, h):
    teile = []
    for k in range(r.randint(5, 7)):
        w = math.radians(r.uniform(-38, 38))
        hh = h * r.uniform(.6, 1)
        ex, ey = x + math.sin(w) * hh, boden - math.cos(w) * hh
        teile.append(f'<path d="M{x} {boden}Q{x + math.sin(w) * hh * .3:.0f} {boden - hh * .6:.0f} {ex:.0f} {ey:.0f}" fill="none" stroke-width="2.6" stroke-linecap="round"/>')
        for j in range(4):
            teile.append(f'<circle cx="{ex + r.uniform(-9, 9):.0f}" cy="{ey + r.uniform(-7, 9):.0f}" r="{r.uniform(4, 7):.1f}"/>')
    return "".join(teile)


def kraut(r, x, boden, s):
    teile = []
    for k in range(9):
        w = r.uniform(-70, 70)
        d = r.uniform(.2, .8) * s
        cx, cy = x + math.sin(math.radians(w)) * d, boden - math.cos(math.radians(w)) * d * 1.1
        teile.append(f'<ellipse cx="{cx:.0f}" cy="{cy:.0f}" rx="{s * .2:.0f}" ry="{s * .12:.0f}" transform="rotate({w + 90:.0f} {cx:.0f} {cy:.0f})"/>')
    return "".join(teile)


def ebene(name, seed, farbe, hoehe, dichte):
    r = random.Random(seed)
    boden = H - 26
    teile = []
    x = -40
    while x < W + 60:
        art = r.random()
        if art < .3:
            teile.append(salat(r, x, boden, hoehe * r.uniform(.5, .75)))
        elif art < .5:
            teile.append(lauch(r, x, boden, hoehe * r.uniform(.9, 1.25)))
        elif art < .75:
            teile.append(moehre(r, x, boden, hoehe * r.uniform(.6, .9)))
        else:
            teile.append(kraut(r, x, boden, hoehe * r.uniform(.45, .65)))
        x += int(r.uniform(.55, 1.05) * dichte)
    huegel = f'M0 {H}V{boden + 4}' + "".join(f'Q{i * 200 + 100} {boden - r.uniform(2, 14):.0f} {(i + 1) * 200} {boden + r.uniform(-2, 6):.0f}' for i in range(8)) + f'V{H}Z'
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice">'
           f'<g fill="{farbe}" stroke="{farbe}">{"".join(teile)}<path d="{huegel}" stroke="none"/></g></svg>')
    open(OUT + name, "w").write(svg)
    print(name, len(svg))


ebene("beet-fern.svg", 5, "#dde8d0", 260, 120)
ebene("beet-mitte.svg", 17, "#cddfbf", 190, 150)
ebene("beet-nah.svg", 29, "#bcd3ab", 130, 170)

# Blattschatten: Zweige hängen von oben rechts ins Bild
r = random.Random(3)
blaetter = []
for zweig in range(6):
    x0, y0 = 380 + zweig * 100 + r.uniform(-30, 30), -10
    laenge = r.uniform(380, 620)
    neig = r.uniform(-.6, -.15)
    punkte = []
    for i in range(9):
        t = i / 8
        x = x0 + neig * laenge * t * t
        y = y0 + laenge * t
        punkte.append((x, y))
    d = "M" + " L".join(f"{x:.0f} {y:.0f}" for x, y in punkte)
    blaetter.append(f'<path d="{d}" fill="none" stroke-width="4" stroke-linecap="round"/>')
    for i, (x, y) in enumerate(punkte[1:], 1):
        for seite in (-1, 1):
            if r.random() < .15:
                continue
            g = r.uniform(58, 96) * (1 - i / 16)
            w = seite * r.uniform(35, 70) + 180
            blaetter.append(f'<path transform="translate({x:.0f} {y:.0f}) rotate({w:.0f})" d="M0 0C{g * .45:.0f} {g * .2:.0f} {g * .5:.0f} {g * .8:.0f} 0 {g:.0f}C{-g * .5:.0f} {g * .8:.0f} {-g * .45:.0f} {g * .2:.0f} 0 0Z" stroke="none"/>')
svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 760">'
       f'<g fill="#2f4a33" stroke="#2f4a33">{"".join(blaetter)}</g></svg>')
open(OUT + "blattschatten.svg", "w").write(svg)
print("blattschatten.svg", len(svg))

kerne = "".join(f'<ellipse cx="32" cy="23.5" rx="2" ry="3.4" fill="#9fc27e" transform="rotate({w} 32 32)"/>' for w in range(0, 360, 60))
fav = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#f6f2e8"/>'
       '<circle cx="32" cy="32" r="26" fill="#3a7a3a"/><circle cx="32" cy="32" r="21.5" fill="#dcebbf"/><circle cx="32" cy="32" r="12" fill="#eef5dc"/>'
       f'{kerne}</svg>')
open(OUT + "../favicon.svg", "w").write(fav)
