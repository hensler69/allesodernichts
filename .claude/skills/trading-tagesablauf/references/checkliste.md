# Kompakt-Checkliste: alle drei Modelle

Von oben nach unten abhaken. **Gilt für das Grundmodell (M). Ein Punkt offen = kein M-Trade**, aber vielleicht ein anderes Setup (SB, PV, TJR) mit eigenen Bedingungen. Punkt 6 (Risiko) gilt für jedes Setup. Bullisch formuliert, bärisch gilt alles spiegelverkehrt. Verweise: L1 Continuation, L2 GXT, L3 TTrades, die Zahl ist der Abschnitt im Leitfaden.

## Vor dem Trade

### 1 · Rahmen und Richtung (Daily / 4H)

- [ ] **Daily-Bias?** Schluss jenseits des Vortags = Fortsetzung, Sweep + Schluss zurück = Umkehr. (L3·3)
- [ ] **Key Level + Ziel markiert?** Level: Gap oder altes Hoch/Tief. Ziel: Gegenseite der Range. (L1·1, L2·1)

### 2 · Umkehr bestätigt (Daily / 4H, dann H1)

- [ ] **Swing bestätigt?** C2-Schluss, C2 Reversal in Expansion oder C3-Schluss über C2-Eröffnung. (L1·3, L2·2)
- [ ] **Keine roten Flaggen?** Failure Swings, Seitwärtsphase im Level, kein SMT, riesiger Docht. (L1·4, L1·5)
- [ ] **H1-CISD in der Umkehrkerze (C2)?** Schluss über die Eröffnung der gegenläufigen Serie. (L3·4)

### 3 · Ort für den Einstieg (Gap / POI)

- [ ] **EQ der vorigen Kerze markiert?** Reversal-Kerze: nur den Docht, sonst die ganze Kerze. (L1·6, L2·3)
- [ ] **Gap/POI in der richtigen Hälfte?** Bullisch oben, nahe der Eröffnung der neuen Kerze. (L1·6, L3·5)
- [ ] **Gap eine Zeitrahmen-Stufe kleiner?** W→D, D→4H, 4H→1H/30m, 1H/30m→3m/5m. (L2·4)
- [ ] **Erst gegen die Richtung ins Gap** (Protraktion), dort Sweep und Schluss in Bias-Richtung. (L2·4, L3·5)

### 4 · Filter im Gap (mindestens 1 SMT-Stufe)

- [ ] **SMT im Gap?** SMT Fill, PSP, Continuation-PSP oder Strength Switch (Nachzügler handeln). (L1·9, L2·7)

### 5 · Einstieg (1 bis 5 Minuten)

- [ ] **V-Form mit CSD/CISD und neuem Gap?** Tief im POI, kein SMT mehr nötig (N-1-Regel). (L1·7, L2·6, L3·6)
- [ ] **Einstieg festgelegt?** CSD-Schluss (aggressiv), Gap-Retest oder Order-Block-Retest (Limit). (L2·6)

### 6 · Risiko (vor dem Klick)

- [ ] **Stop** hinter Invalidierung bzw. geschütztem Tief (nicht zu eng), **Ziel** ≥ 2R oder HTF-Ziel. (L2·8, L3·6)
- [ ] **Ziel-Liquidität noch offen?** Kurzfristige Hochs/Tiefs in Zielrichtung sind noch nicht geholt. (L2·8, L3·7)
- [ ] **Positionsgröße** zum festen Risiko berechnet (Ergänzung, nicht aus den Videos: oft 0,5–1 %).

### 7 · TJR-Setup (eigenständig, beide Richtungen)

- [ ] **HTF-Sweep** eines Levels aus dem Plan, Schluss zurück? (1H/30 Min.)
- [ ] **M5-BOS** in Gegenrichtung zum Sweep, kräftige Kerze, außerhalb der Sperrzeit?
- [ ] **M5-FVG** entstanden und vom Kurs wieder angelaufen, ohne M5-Schluss jenseits der Lücke?
- [ ] **M1-BOS** innerhalb der Lücke = Einstieg. Risiko (Punkt 6) erfüllt → A. SMT, Bias usw. als Dafür/Dagegen zählen.
- [ ] Variante **TJR-KL**: Key Level (vorige Session/1H/4H) nach der Eröffnung gesweept? Wende per BOS, IFVG oder 79-%-Schluss? Rücklauf in FVG/EQ/OB/Breaker? M5-Kerze schließt aus der Zone heraus? (`references/key-level-variante.md`)
- [ ] Variante **TJR-IF**: Sweep vorher? Bärische FVG (Long) mit M5-**Körper** darüber geschlossen = IFVG, kräftig, außerhalb der Sperrzeit? Ziel (offensichtliche Liquidität) festgelegt und ≥ 2R mit Stop unter der IFVG? Keine gleichen Tiefs direkt unter dem Stop? Limit an der IFVG-Kante, löschen bei Körper-Schluss zurück durch die IFVG. (`references/fvg-ifvg.md`)
- [ ] Nachzügler **TJR-FE**: Sweep und Wende schon bestätigt? Erste/zweite M5-FVG in Trend-Richtung angelaufen? M1 tieferes Hoch + tieferes Tief (Long: höheres Tief + höheres Hoch) in der Lücke? Noch ≥ 2R? (`references/fvg-ifvg.md`)

### 8 · SPX500 / NAS100 (je eigene Strategie: `references/strategie-spx500.md`, `references/strategie-nas100.md`)

- [ ] **ORB**: Spanne = erste 15-Min.-Kerze ab 09:30 NY (15:30 MEZ)? 1-Min.-**Körper** außerhalb (Docht = kein Ausbruch)? Retest berührt die Kante? Rejection (Morning Star/Engulfing/Docht/Konsolidierung) und Schluss wieder außerhalb?
- [ ] Stop unter dem Rejection-Tief plus Spread (SPX500 0,55, NAS100 1,89 Punkte), Ziel vor der Liquidität (SPX500 ca. 20–25 Punkte, NAS100 ca. 0,3 %), ≥ 2R, Units mit `rechner.py --markt … --pipwert …`?
- [ ] **Fehlausbruch** an der Kante = Sweep → TJR-Familie in die Gegenrichtung prüfen, nie beide Richtungen.

## Während des Trades

- [ ] Hält die Invalidierung bzw. das geschützte Tief? Sonst greift der Stop, nie weiter weg setzen. (L1·3, L3·6)
- [ ] Bleibt es expansiv? Flache Rücksetzer, neue Gaps, kein Schluss durchs Gap oder unter EQ. (L1·6, L2·3)
- [ ] **Gegen-IFVG?** FVG in Trade-Richtung mit Körper durchbrochen = Warnzeichen: Stop bleibt, ab 1R im Plus Breakeven. Bei TJR-IF: Körper-Schluss zurück durch die IFVG = Idee ungültig. (`references/fvg-ifvg.md`)
- [ ] Kleine gegenläufige Hochs/Tiefs sind Rücksetzer (Failure Swings): nicht rausschütteln lassen. (L1·8, L2·8)
- [ ] Führender Markt am Ziel? Gewinnmitnahme prüfen, danach neue Preisphase erwarten. (L2·8)
- [ ] Break-even und Teilgewinne nur nach fester Regel. Keine Regeln im Trade ändern. (L2·8)

## Nach dem Trade

- [ ] Screenshots (Daily, H1, Einstieg) gespeichert. Im Journal: Modell, SMT-Sequenz, Ergebnis in R.
- [ ] Alle Regeln eingehalten? Wenn nein: welche und warum?
