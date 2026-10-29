#!/usr/bin/env python3
"""Tägliche Floor-Pivots (Standard/Traditional) aus Hoch, Tief und Schluss des Vortags.

Beispiele:
  python pivots.py --hoch 1.11780 --tief 1.11220 --schluss 1.11270
  python pivots.py --hoch 1.11780 --tief 1.11220 --schluss 1.11270 --kurs 1.11450
  python pivots.py --hoch 1.1178 --tief 1.1122 --schluss 1.1127 --zonen "Short 1=1.1142-1.1155,Support 1=1.1134-1.1139"

Die Vortageskerze ist die OANDA-Tageskerze (17:00 bis 17:00 New York), also dieselbe, die er im Tageschart sieht.
Formeln (wie Babypips und TradingView „Pivot Points Standard“, Typ Traditional):
  P = (H + L + C) / 3
  R1 = 2P - L      S1 = 2P - H
  R2 = P + (H - L) S2 = P - (H - L)
  R3 = H + 2(P - L) S3 = L - 2(H - P)
Jede Linie wird als schmale Zone (Standard ±2 Pips) behandelt, weil der Kurs laut Video nur „in der Nähe“ reagieren muss.
Mit --zonen prüft das Skript, welche Pivots auf seinen Zonen liegen (Konfluenz, Toleranz Standard 3 Pips).
"""
import argparse


def fmt(x, n=5):
    return f"{x:.{n}f}".replace(".", ",")


def de(x, n=1):
    return f"{x:.{n}f}".replace(".", ",")


def pivots(h, l, c):
    p = (h + l + c) / 3
    return [
        ("R3", h + 2 * (p - l)),
        ("R2", p + (h - l)),
        ("R1", 2 * p - l),
        ("P", p),
        ("S1", 2 * p - h),
        ("S2", p - (h - l)),
        ("S3", l - 2 * (h - p)),
    ]


def zonen_lesen(text):
    out = []
    for teil in text.split(","):
        teil = teil.strip()
        if not teil:
            continue
        name, _, bereich = teil.rpartition("=")
        a, _, b = bereich.partition("-")
        lo, hi = sorted([float(a), float(b or a)])
        out.append((name.strip() or bereich, lo, hi))
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--hoch", type=float, required=True, help="Hoch der Vortageskerze")
    ap.add_argument("--tief", type=float, required=True, help="Tief der Vortageskerze")
    ap.add_argument("--schluss", type=float, required=True, help="Schluss der Vortageskerze")
    ap.add_argument("--kurs", type=float, help="aktueller Kurs: Abstand zu jedem Pivot")
    ap.add_argument("--zonen", help='seine Zonen, z. B. "Short 1=1.1142-1.1155,Long 1=1.1117-1.1120"')
    ap.add_argument("--band", type=float, default=2.0, help="Breite der Pivot-Zone je Seite in Pips (Standard 2)")
    ap.add_argument("--toleranz", type=float, default=3.0, help="Abstand in Pips, ab dem ein Pivot als Konfluenz zählt")
    ap.add_argument("--pip", type=float, default=0.0001)
    a = ap.parse_args()

    if not (a.tief <= a.schluss <= a.hoch):
        print("Achtung: Der Schluss liegt nicht zwischen Tief und Hoch. Werte prüfen.")
        return
    zonen = zonen_lesen(a.zonen) if a.zonen else []
    n = 2 if a.pip >= 0.01 else 5  # Indizes (--pip 1) mit 2 Nachkommastellen
    spanne = (a.hoch - a.tief) / a.pip
    print(f"Vortag: Hoch {fmt(a.hoch, n)} | Tief {fmt(a.tief, n)} | Schluss {fmt(a.schluss, n)} | Spanne {de(spanne)} "
          + ("Punkte" if n == 2 else "Pips"))
    einheit = "Punkte" if n == 2 else "Pips"
    print(f"Pivot-Zonen (±{de(a.band)} {einheit}):")
    for name, wert in pivots(a.hoch, a.tief, a.schluss):
        zeile = f"  {name:>2}: {fmt(wert, n)}  (Zone {fmt(wert - a.band * a.pip, n)}–{fmt(wert + a.band * a.pip, n)})"
        if a.kurs is not None:
            abstand = (wert - a.kurs) / a.pip
            zeile += f"  | {de(abs(abstand))} {einheit} {'über' if abstand > 0 else 'unter'} dem Kurs"
        treffer = []
        for zname, lo, hi in zonen:
            if lo - a.toleranz * a.pip <= wert <= hi + a.toleranz * a.pip:
                treffer.append(zname)
        if treffer:
            zeile += "  | KONFLUENZ mit " + ", ".join(treffer)
        print(zeile)
    if zonen:
        print(f"Konfluenz = Pivot liegt in der Zone oder höchstens {de(a.toleranz)} {einheit} daneben.")
    print("TradingView-Eingabe (mit Punkt): " + " | ".join(f"{name} {w:.{n}f}" for name, w in pivots(a.hoch, a.tief, a.schluss)))


if __name__ == "__main__":
    main()
