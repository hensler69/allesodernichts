#!/usr/bin/env python3
"""Risiko-Rechner für einen Trade: Pips, R, Lots, Dollar, IQ-Ticks und der schlechteste Einstieg für 2R.

Beispiele:
  python rechner.py --einstieg 1.11472 --stop 1.11570 --ziel 1.11160
  python rechner.py --einstieg 1.1147 --stop 1.1157 --ziel 1.1116 --risiko 250
  python rechner.py --einstieg 1.1147 --stop 1.1157 --ziel 1.1116 --lots 2.5
  python rechner.py --stop 1.1157 --ziel 1.1116            (nur: ab welchem Einstieg sind es 2R?)
  python rechner.py --einstieg 1.1147 --stop 1.1157 --ziel 1.1110 --teile 3
                                          (Teilgewinne: drei Positionen mit Ziel 1R, 2R und dem Endziel)
  python rechner.py --markt MES --einstieg 6850.25 --stop 6842.50 --ziel 6872.25
                                          (Index-Futures ES/MES/NQ/MNQ: Punkte, Ticks 0,25, ganze Kontrakte)
  python rechner.py --markt SPX500 --einstieg 7728.40 --stop 7720.20 --ziel 7750.40
                                          (Index-CFDs bei IQ: Punkte, IQ-Tick 0,01, 1 Unit = 10 $ pro Punkt)

Richtung ergibt sich aus Stop und Ziel (Stop über dem Ziel = Short). Standard: EURUSD-artige Paare
(1 Pip = 0,0001, 10 $ pro Pip und Lot, 1 IQ-Tick = 0,00001). Für andere Märkte --pip und --pipwert setzen.
--markt ES|MES|NQ|MNQ setzt die CME-Werte (1 Punkt = 50/5/20/2 $, Tick 0,25) und rechnet ganze Kontrakte.
--markt SPX500|NAS100 (CFDs bei IQ Capital) rechnet in Punkten mit IQ-Tick 0,01 und 10 $ pro Punkt und Unit
(gemessen im IQ-Order-Panel am 29.10.2026: 0,5 Units, Stop 10 Punkte = 50 $ Risiko).
"""
import argparse
import math

# CME-Index-Futures: $ pro Punkt und Kontrakt, Tick 0,25 Punkte
MAERKTE = {"ES": 50.0, "MES": 5.0, "NQ": 20.0, "MNQ": 2.0}
# Index-CFDs bei IQ Capital: IQ-Tick 0,01 Punkte, $ pro Punkt und Unit (IQ-Order-Panel, 29.10.2026)
CFDS = {"SPX500": 10.0, "NAS100": 10.0}


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
    ap.add_argument("--pipwert", type=float, help="$ pro Pip und Lot (EURUSD: 10); bei CFDs $ pro Punkt und Unit")
    ap.add_argument("--tick", type=float, default=0.00001, help="Tickgröße der Plattform (IQ: 0,00001)")
    ap.add_argument("--teile", type=int, choices=[3], help="3 = Position dritteln: Ziele 1R, 2R und --ziel")
    ap.add_argument("--markt", choices=sorted(MAERKTE) + sorted(CFDS),
                    help="Index-Future (ES, MES, NQ, MNQ) oder Index-CFD bei IQ (SPX500, NAS100) statt Forex")
    a = ap.parse_args()
    a.einheit, a.groesse, a.stellen = "Pips", "Lots", 5
    a.futures = a.markt in MAERKTE
    if a.futures:
        a.pip, a.pipwert, a.tick = 1.0, MAERKTE[a.markt], 0.25
        a.einheit, a.groesse, a.stellen = "Punkte", f"Kontrakte {a.markt}", 2
    elif a.markt:
        if a.pipwert is None:
            a.pipwert = CFDS[a.markt]
        a.pip, a.tick = 1.0, 0.01
        a.einheit, a.groesse, a.stellen = "Punkte", f"Units {a.markt}", 2
    if a.pipwert is None:
        a.pipwert = 10.0

    short = a.stop > a.ziel
    richtung = "Short" if short else "Long"
    grenze = (a.min_r * a.stop + a.ziel) / (a.min_r + 1)
    print(f"Richtung: {richtung}")
    if short:
        print(f"Für mindestens {a.min_r:g}R muss der Einstieg bei {fmt(grenze, a.stellen)} oder HÖHER liegen.")
    else:
        print(f"Für mindestens {a.min_r:g}R muss der Einstieg bei {fmt(grenze, a.stellen)} oder TIEFER liegen.")
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
    elif a.futures:
        lots = math.floor(a.risiko / (stop_pips * a.pipwert))
    else:
        lots = math.floor(a.risiko / (stop_pips * a.pipwert) * 100) / 100
    risiko = lots * stop_pips * a.pipwert
    gewinn = lots * ziel_pips * a.pipwert
    ein_r = e - stop_pips * a.pip if short else e + stop_pips * a.pip
    n = a.stellen
    print(f"Einstieg {fmt(e, n)} | Stop {fmt(a.stop, n)} | Ziel {fmt(a.ziel, n)}")
    print(f"Stop-Abstand: {de(stop_pips, 2 if a.markt else 1)} {a.einheit} = {round(stop_pips * a.pip / a.tick)} Ticks")
    print(f"Ziel-Abstand: {de(ziel_pips, 2 if a.markt else 1)} {a.einheit} = {round(ziel_pips * a.pip / a.tick)} Ticks")
    print(f"CRV: {de(r, 2)}R " + ("(ok)" if r >= a.min_r - 1e-9 else f"(UNTER {a.min_r:g}R, kein Trade nach den Regeln)"))
    if a.futures and lots < 1:
        print(f"Positionsgröße: 0 Kontrakte. 1 {a.markt} riskiert hier {de(stop_pips * a.pipwert, 2)} $, mehr als "
              f"{a.risiko:.0f} $. Kleineren Kontrakt (MES/MNQ) nehmen oder: Lass es.")
        return
    print(f"Positionsgröße: {de(lots, 0 if a.futures else 2)} {a.groesse}"
          + ("" if a.lots else f" (für {a.risiko:.0f} $ Risiko, abgerundet)"))
    print(f"Risiko bis Stop: {de(risiko, 2)} $ | Gewinn bis Ziel: {de(gewinn, 2)} $")
    print(f"1R im Plus erreicht bei: {fmt(ein_r, n)} (Breakeven-Regel)")
    if a.futures:
        print(f"Order-Eingabe (mit Punkt tippen): Menge {lots:.0f} | Stop {a.stop:.2f} | Ziel {a.ziel:.2f} | "
              "Stop und Ziel als OCO-Bracket an die Order hängen")
        if a.teile:
            teilgewinne(a, e, short, stop_pips, r, lots)
        return
    # Plattform-Felder erwarten Punkt statt Komma
    print(f"IQ-Eingabe (mit Punkt tippen): Units {lots:.2f} | Stop loss {a.stop:.{n}f} bzw. "
          f"{round(stop_pips * a.pip / a.tick)} ticks | Take profit {a.ziel:.{n}f} bzw. "
          f"{round(ziel_pips * a.pip / a.tick)} ticks | beide Schalter einschalten")
    if a.teile:
        teilgewinne(a, e, short, stop_pips, r, lots)


def teilgewinne(a, e, short, stop_pips, r_end, lots):
    """Position in drei gleiche Teile mit eigenem Ziel (1R, 2R, Endziel); alle mit demselben Stop."""
    print()
    print("Teilgewinne (3 Teile, jeder mit demselben Stop):")
    if r_end < 2 + 1e-9:
        print("  Das Endziel liegt nicht über 2R. Teilgewinne passen hier nicht, nur ein Ziel verwenden.")
        return
    teil = math.floor(lots / 3) if a.futures else math.floor(lots / 3 * 100) / 100
    if teil < (1 if a.futures else 0.01):
        print("  Position zu klein zum Dritteln.")
        return
    schritt = stop_pips * a.pip
    ziele = [(1.0, e - schritt if short else e + schritt), (2.0, e - 2 * schritt if short else e + 2 * schritt),
             (r_end, a.ziel)]
    for i, (rr, z) in enumerate(ziele, 1):
        ticks = round(rr * stop_pips * a.pip / a.tick)
        print(f"  Teil {i}: {de(teil, 0 if a.futures else 2)} {a.groesse} | Ziel {fmt(z, a.stellen)} ({de(rr, 2)}R, {ticks} ticks) | "
              f"Gewinn {de(teil * rr * stop_pips * a.pipwert, 2)} $")
    schnitt = (1 + 2 + r_end) / 3
    print(f"  Zusammen {de(3 * teil, 0 if a.futures else 2)} {a.groesse}, Risiko {de(3 * teil * stop_pips * a.pipwert, 2)} $, "
          f"im Schnitt {de(schnitt, 2)}R, wenn alle Ziele kommen")
    if schnitt < a.min_r - 1e-9:
        print(f"  Schnitt unter {a.min_r:g}R: Endziel weiter weg wählen oder nur ein Ziel nehmen.")
    print(f"  Nach Teil 1 (1R): Stop der beiden übrigen Teile auf den Einstieg {fmt(e, a.stellen)} ziehen.")
    if not a.futures:
        print("  IQ: drei getrennte Orders mit je eigenem Take profit, beide Schalter jeweils an.")


if __name__ == "__main__":
    main()
