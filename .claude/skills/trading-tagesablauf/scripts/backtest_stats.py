#!/usr/bin/env python3
"""Auswertung eines Backtest-Journals (Markdown-Tabelle, Format in references/backtest-training.md, Abschnitt 7).

Beispiel:
  python backtest_stats.py notes/backtest-ttfm-scalp.md
  python backtest_stats.py notes/backtest-ttfm-scalp.md --stufe 3

Gezählt werden nur Fälle mit Trade = ja und einem Ergebnis in R. Fälle mit dem Fehler „zukunft“ zählen nicht.
"""
import argparse
import re
from collections import Counter


def de(x, n=2):
    return f"{x:+.{n}f}".replace(".", ",") if x is not None else "–"


def zahl(s):
    s = s.strip().replace("R", "").replace("−", "-").replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def zeilen_lesen(pfad):
    kopf, zeilen = None, []
    for line in open(pfad, encoding="utf-8"):
        line = line.strip()
        if not line.startswith("|"):
            continue
        zellen = [z.strip() for z in line.strip("|").split("|")]
        if all(re.fullmatch(r":?-+:?", z) for z in zellen if z):
            continue
        if kopf is None and "Ergebnis R" in zellen:
            kopf = zellen
            continue
        if kopf and len(zellen) == len(kopf):
            zeilen.append(dict(zip(kopf, zellen)))
    return zeilen


def auswerten(fälle, titel):
    trades = [f for f in fälle if f.get("Trade", "").lower() == "ja" and zahl(f.get("Ergebnis R", "")) is not None]
    rs = [zahl(f["Ergebnis R"]) for f in trades]
    gew = [r for r in rs if r > 0]
    ver = [r for r in rs if r < 0]
    serie = laengste = 0
    for r in rs:
        serie = serie + 1 if r < 0 else 0
        laengste = max(laengste, serie)
    konform = [f for f in fälle if f.get("Regelkonform", "").lower() == "ja"]
    print(f"== {titel} ==")
    print(f"Fälle: {len(fälle)} | Trades: {len(trades)} | kein Trade: {len(fälle) - len(trades)}")
    if trades:
        print(f"Trefferquote: {100 * len(gew) / len(trades):.0f} % ({len(gew)} Gewinner, {len(ver)} Verlierer, "
              f"{len(rs) - len(gew) - len(ver)} Breakeven)")
        print(f"Ø Gewinner {de(sum(gew) / len(gew) if gew else None)}R | Ø Verlierer {de(sum(ver) / len(ver) if ver else None)}R"
              f" | Summe {de(sum(rs))}R | Erwartungswert {de(sum(rs) / len(rs))}R pro Trade")
        print(f"Längste Verlustserie: {laengste}")
    if fälle:
        print(f"Regeltreue: {100 * len(konform) / len(fälle):.0f} %")
    fehler = Counter(k.strip() for f in fälle for k in f.get("Fehler", "").split(",") if k.strip() not in ("", "-"))
    if fehler:
        print("Häufigste Fehler: " + ", ".join(f"{k} {n}×" for k, n in fehler.most_common()))
    pkt = [zahl(f.get("Punkte", "")) for f in fälle if zahl(f.get("Punkte", "")) is not None]
    if pkt:
        print(f"Ø Punkte je Fall: {sum(pkt) / len(pkt):.1f} von 8".replace(".", ","))
    print()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("journal")
    ap.add_argument("--stufe", help="nur diese Lernstufe auswerten (Spalte „Stufe“)")
    a = ap.parse_args()
    fälle = zeilen_lesen(a.journal)
    fälle = [f for f in fälle if "zukunft" not in f.get("Fehler", "")]
    if a.stufe:
        fälle = [f for f in fälle if f.get("Stufe", "").strip() == a.stufe]
    if not fälle:
        print("Noch keine Fälle im Journal.")
        return
    auswerten(fälle, "Alle Fälle" + (f" (Stufe {a.stufe})" if a.stufe else ""))
    for spalte in ("Session", "Variante"):
        werte = sorted({f.get(spalte, "").strip() for f in fälle if f.get(spalte, "").strip() not in ("", "-")})
        for v in werte:
            auswerten([f for f in fälle if f.get(spalte, "").strip() == v], f"{spalte} {v}")


if __name__ == "__main__":
    main()
