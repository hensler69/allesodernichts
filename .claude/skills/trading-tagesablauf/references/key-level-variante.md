# Key-Level-Variante (TJR-KL): Key Level sweepen → Orderflow dreht → Rücklauf ins PD-Array → Kerze stößt heraus

Wunsch des Nutzers (28.10.2026, abends): diesen Reel in den Plan aufnehmen. Quelle: Instagram-Reel (Transkript vom
Nutzer eingefügt, ca. 40 Sekunden). Hier steht nur, was im Reel gesagt wird; was dazukommt, ist als **Ergänzung**
gekennzeichnet.

**Einordnung**: Kein fünftes Setup. Der Ablauf ist derselbe wie beim TJR-Setup (Sweep → Wende auf kleinem Zeitrahmen →
Rücklauf → Einstieg), nur mit mehr erlaubten Varianten bei Wende, Rücklauf-Zone und Auslöser. Deshalb läuft es als
**Variante des TJR-Setups** mit der Kennung **TJR-KL**. Seine vier Setups (M, TJR, SB, PV) bleiben. TJR und TJR-KL am
selben Ort zählen als **ein** Setup, nicht als A+.

## Inhalt

1. Die Regeln aus dem Reel
2. Begriffe kurz erklärt
3. Was unklar ist und wie wir es auslegen
4. Ablauf TJR-KL (Short und Long)
5. Pflicht-Bedingungen und Noten
6. Unterschied zum TJR-Setup
7. Risiken
8. Einbau in Morgenplan, Live, Grafik und Journal

## 1. Die Regeln aus dem Reel

1. **Key Levels finden** und einzeichnen: Hochs (bzw. Tiefs) der vorigen Session, Hochs auf 1H und auf 4H.
2. **Auf die Markteröffnung warten.**
3. **Warten, bis eines dieser Key Levels gesweept wird.**
4. **Auf einen kleineren Zeitrahmen gehen** und auf eine **Änderung im Orderflow** warten. Erlaubt sind:
   - eine **inverse FVG** (IFVG),
   - ein **Break of Structure** (BOS),
   - ein **Schluss über bzw. unter der 79-%-Stufe** des Fibonacci (je nach Richtung).
5. Dann eine **Fortsetzungs-Zone** (PD-Array) suchen: **FVG, Equilibrium (50 %), Breaker Block oder Order Block**
   (im Transkript „quarter block“, vermutlich ein Hörfehler für „order block“).
6. **Warten, bis der Kurs in diese Zone läuft**, dann auf eine **Kerze, die aus der Zone in Trade-Richtung
   herausstößt**. Das ist der Einstieg.
7. **Stop** unter dem Tief bzw. über dem Hoch (je nach Richtung), **Ziele** an den vorigen Key Levels.

Keine Angaben im Reel zu: Zeitrahmen-Namen, Mindest-CRV, SMT, Uhrzeiten, Teilgewinnen, Trefferquote.

## 2. Begriffe kurz erklärt

- **Key Level**: ein Hoch oder Tief, an dem viele Stops liegen (Liquidität). Hier: Session-Hoch/-Tief der vorigen
  Session, 1H- und 4H-Swing-Hochs/-Tiefs.
- **Orderflow-Wechsel**: Die kleinen Kerzen zeigen, dass die Richtung gedreht hat.
- **Inverse FVG (IFVG)**: Eine Lücke in die alte Richtung wird von einer Kerze **mit Schluss** durchbrochen. Ab dann
  wirkt sie umgekehrt (z. B. eine bärische Lücke, über der der Kurs schließt, wird zur Unterstützung). Ausführlich in
  `references/fvg-ifvg.md`.
- **BOS**: Schluss jenseits des letzten Swing-Hochs/-Tiefs (wie im TJR-Setup).
- **79-%-Stufe**: Fibonacci-Stufe 0,79 (Obergrenze der OTE-Zone, `references/tradingview-werkzeuge.md`).
- **PD-Array / Fortsetzungs-Zone**: Bereich, in den der Kurs nach der Wende zurückläuft, bevor es weitergeht:
  - **FVG**: die Lücke aus der Wende-Bewegung,
  - **Equilibrium (EQ)**: die 50-%-Mitte der Wende-Bewegung,
  - **Order Block (OB)**: die letzte Gegenkerze vor der Wende-Bewegung (bei Long: letzte rote Kerze vor dem Anstieg),
  - **Breaker Block**: ein Order Block, der durchbrochen wurde und jetzt umgekehrt wirkt (Ergänzung zur Erklärung,
    nicht aus dem Reel).

## 3. Was unklar ist und wie wir es auslegen

- **„Markteröffnung“**: Das Reel sagt nicht, welche. Auslegung (Ergänzung): Sweeps zählen ab der **London- bzw.
  Frankfurt-Eröffnung** (08:00–09:00 MEZ) und ab der **New-York-Eröffnung**. Ein Sweep in der ruhigen Asia-Nacht
  ist kein Auslöser.
- **„79 % extension on the Fibonacci“**: Nicht eindeutig. Auslegung: Fibonacci über das Bein, das den Sweep gemacht
  hat (bei Long: vom letzten Hoch vor dem Abverkauf bis zum Sweep-Tief). Schließt eine Kerze jenseits der Stufe, die
  79 % dieses Beins zurückgeholt hat, gilt das als Wende. Das ist die unsicherste der drei Wende-Arten; BOS und IFVG
  haben Vorrang.
- **Welcher kleine Zeitrahmen**: nicht genannt. Wie beim TJR-Setup: Wende und Zone auf **M5**, Auslöser-Kerze auf M5
  (oder M1, wenn die Zone sehr klein ist).

## 4. Ablauf TJR-KL

Zeitrahmen: Key Levels auf 4H/1H und aus der vorigen Session (30 Min.), Bias Daily/4H, Wende und Zone M5, SMT GBPUSD
15 Min.

**Long** (Sweep eines Tiefs):
1. Key Level (Tief der vorigen Session, 1H-/4H-Tief) liegt im Plan.
2. Nach der Eröffnung sticht der Kurs darunter und schließt (Sweep-Zeitrahmen, mindestens 15 Min.) wieder darüber.
3. Wende auf M5: BOS nach oben (Schluss über dem letzten tieferen Hoch) **oder** Schluss über einer bärischen FVG
   (IFVG) **oder** Schluss über der 79-%-Stufe, jeweils mit kräftiger Kerze.
4. Fortsetzungs-Zone markieren: bullische FVG, 50 % der Wende-Bewegung, Order Block oder Breaker.
5. Der Kurs läuft zurück in diese Zone, ohne auf M5 darunter zu schließen.
6. Auslöser: eine M5-Kerze schließt aus der Zone heraus nach oben (über dem Hoch der Rücklauf-Kerzen in der Zone).
   Einstieg Market beim Schluss.
7. Stop unter dem Sweep-Tief (−1–2 Pips), Ziel knapp vor dem nächsten Key Level oben, mindestens 2R.

**Short**: genau gespiegelt (Sweep eines Hochs, Wende nach unten, Rücklauf in bärische Zone, Kerze stößt nach unten
heraus, Stop über dem Sweep-Hoch, Ziel vor dem nächsten Key Level unten).

## 5. Pflicht-Bedingungen und Noten

| Pflicht | Bedeutung |
|---|---|
| 1. Key Level aus dem Plan gesweept, nach der Eröffnung | Docht jenseits, Schluss zurück |
| 2. Orderflow-Wechsel auf M5 | BOS, IFVG oder 79-%-Schluss, kräftige Kerze, **außerhalb der Sperrzeit** |
| 3. Rücklauf in eine Fortsetzungs-Zone | FVG, EQ, OB oder Breaker, ohne Schluss jenseits |
| 4. Auslöser-Kerze schließt aus der Zone heraus | in Trade-Richtung, M5 |

Dazu der **Risiko-Rahmen** aus SKILL.md (≥ 2R bis knapp vor das nächste Key Level, Stop hinter dem Sweep-Extrem ohne
Liquidität direkt dahinter, Zeit, Tageslimit). Alles erfüllt: **A (TJR-KL)**. SMT, Bias, Seitwärtsphase,
Volumenprofil, Pivots und Termine zählen als **Dafür/Dagegen**. Fehlt ein Pflicht-Punkt: kein TJR-KL-Trade.

## 6. Unterschied zum TJR-Setup

| | TJR | TJR-KL |
|---|---|---|
| Level | HTF-Level aus dem Plan | ausdrücklich: vorige Session, 1H, 4H |
| Wende | nur BOS | BOS, IFVG oder 79-%-Schluss |
| Rücklauf-Zone | nur M5-FVG | FVG, EQ, Order Block, Breaker |
| Auslöser | M1-BOS in der Lücke | Kerze schließt aus der Zone heraus (M5) |
| Ziel | nächste Gegen-Liquidität | vorige Key Levels (dasselbe in anderen Worten) |

Mehr erlaubte Varianten heißen: mehr Gelegenheiten, aber auch mehr schwache. Deshalb gilt: **BOS vor IFVG vor
79 %**, und **FVG/OB vor EQ/Breaker**. Je weiter hinten in dieser Reihenfolge, desto mehr Dafür-Punkte sollte die
Bilanz haben.

## 7. Risiken (zusätzlich zur Prüfliste in SKILL.md)

- **Zu viele Varianten**: Wer bei jeder kleinen Zone „ein PD-Array“ sieht, handelt zu oft. Nur die erste
  Fortsetzungs-Zone nach der Wende zählt.
- **Auslöser-Kerze ohne Kraft**: kleine Kerze aus der Zone heraus = schwach, zählt als Dagegen.
- **Sweep vor der Eröffnung**: zählt nicht (Abschnitt 3).
- **Liquidität hinter dem Stop** (gleiche Tiefs/Hochs knapp hinter dem Sweep-Extrem): Lehre vom 27.10.
- **Kein SMT, Seitwärtsphase, Volumen-Annahme**: die Warnzeichen vom 28.10., als Dagegen deutlich nennen.
- **Ein 40-Sekunden-Reel** belegt keine Trefferquote. Im Journal mit „TJR-KL“ kennzeichnen und nach einigen Wochen
  auswerten, getrennt von TJR.

## 8. Einbau in Morgenplan, Live, Grafik und Journal

- **Morgenplan**: Key Levels gehören in die Zonen-Suche (vorige Session, 1H- und 4H-Hochs/-Tiefs). Bei jeder Zone
  steht, ob dort TJR bzw. TJR-KL möglich ist und welches Key Level das Ziel wäre.
- **Live**: Nach einem Sweep den Status nennen: Sweep ✓/✗ · Wende (welche Art) ✓/✗ · Zone (welche) ✓/✗ ·
  Auslöser-Kerze ✓/✗ · 2R. Bild: EURUSD M5 (bei sehr kleiner Zone zusätzlich M1).
- **Grafik**: Key Level (Linie), Sweep-Extrem, Wende-Level (gestrichelt), Fortsetzungs-Zone (Box), Einstieg/Stop/Ziel.
- **Journal**: „TJR-KL“ plus Art der Wende (BOS/IFVG/79 %) und Art der Zone (FVG/EQ/OB/Breaker), damit sich zeigt,
  welche Kombination für ihn funktioniert.
