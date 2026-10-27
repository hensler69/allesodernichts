#!/usr/bin/env python3
"""Risiko-Rechner für einen Trade: Pips, R, Lots, Dollar, IQ-Ticks und der schlechteste Einstieg für 2R.

Beispiele:
  python rechner.py --einstieg 1.11472 --stop 1.11570 --ziel 1.11160
  python rechner.py --einstieg 1.1147 --stop 1.1157 --ziel 1.1116 --risiko 250
  python rechner.py --einstieg 1.1147 --stop 1.1157 --ziel 1.1116 --lots 2.5
  python rechner.py --stop 1.1157 --ziel 1.1116            (nur: ab welchem Einstieg sind es 2R?)

Richtung ergibt sich aus Stop und Ziel (Stop über dem Ziel = Short). Standard: EURUSD-artige Paare
(1 Pip = 0,0001, 10 $ pro Pip und Lot, 1 IQ-Tick = 0,00001). Für andere Märkte --pip und --pipwert setzen.
"""
import argparse
import math


def fmt(x, n=5):
    return f"{x:.{n}f}".replace(".", ",")


def de(x, n=1):
    return f"{x:.{n}f}".replace(".", ",")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--einstieg", type=float)
    ap.add_argument("--stop", type=float, required=True)
    ap.add_argument("--ziel", type=float, required=True)
    ap.add_argument("--risiko", type=float, default=250.0, help="Risiko in $ (Standard 250)")
    ap.add_argument("--lots", type=float, help="feste Positionsgröße statt Risiko")
    ap.add_argument("--min-r", type=float, default=2.0, help="Mindest-CRV (Standard 2)")
    ap.add_argument("--pip", type=float, default=0.0001)
    ap.add_argument("--pipwert", type=float, default=10.0, help="$ pro Pip und Lot (EURUSD: 10)")
    ap.add_argument("--tick", type=float, default=0.00001, help="Tickgröße der Plattform (IQ: 0,00001)")
    a = ap.parse_args()

    short = a.stop > a.ziel
    richtung = "Short" if short else "Long"
    grenze = (a.min_r * a.stop + a.ziel) / (a.min_r + 1)
    print(f"Richtung: {richtung}")
    if short:
        print(f"Für mindestens {a.min_r:g}R muss der Einstieg bei {fmt(grenze)} oder HÖHER liegen.")
    else:
        print(f"Für mindestens {a.min_r:g}R muss der Einstieg bei {fmt(grenze)} oder TIEFER liegen.")
    if a.einstieg is None:
        return

    e = a.einstieg
    if short and not (a.ziel < e < a.stop) or (not short and not (a.stop < e < a.ziel)):
        print("Achtung: Der Einstieg liegt nicht zwischen Stop und Ziel. Werte prüfen.")
        return
    stop_pips = abs(a.stop - e) / a.pip
    ziel_pips = abs(e - a.ziel) / a.pip
    r = ziel_pips / stop_pips
    if a.lots:
        lots = a.lots
    else:
        lots = math.floor(a.risiko / (stop_pips * a.pipwert) * 100) / 100
    risiko = lots * stop_pips * a.pipwert
    gewinn = lots * ziel_pips * a.pipwert
    ein_r = e - stop_pips * a.pip if short else e + stop_pips * a.pip
    print(f"Einstieg {fmt(e)} | Stop {fmt(a.stop)} | Ziel {fmt(a.ziel)}")
    print(f"Stop-Abstand: {de(stop_pips)} Pips = {round(stop_pips * a.pip / a.tick)} Ticks")
    print(f"Ziel-Abstand: {de(ziel_pips)} Pips = {round(ziel_pips * a.pip / a.tick)} Ticks")
    print(f"CRV: {de(r, 2)}R " + ("(ok)" if r >= a.min_r - 1e-9 else f"(UNTER {a.min_r:g}R, kein Trade nach den Regeln)"))
    print(f"Positionsgröße: {de(lots, 2)} Lots" + ("" if a.lots else f" (für {a.risiko:.0f} $ Risiko, abgerundet)"))
    print(f"Risiko bis Stop: {de(risiko, 2)} $ | Gewinn bis Ziel: {de(gewinn, 2)} $")
    print(f"1R im Plus erreicht bei: {fmt(ein_r)} (Breakeven-Regel)")
    # Plattform-Felder erwarten Punkt statt Komma
    print(f"IQ-Eingabe (mit Punkt tippen): Units {lots:.2f} | Stop loss {a.stop:.5f} bzw. "
          f"{round(stop_pips * a.pip / a.tick)} ticks | Take profit {a.ziel:.5f} bzw. "
          f"{round(ziel_pips * a.pip / a.tick)} ticks | beide Schalter einschalten")


if __name__ == "__main__":
    main()
