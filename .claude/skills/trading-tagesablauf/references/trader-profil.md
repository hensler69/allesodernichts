# Trader-Profil: wie der Nutzer handelt und was ihm wichtig ist

Gesammelt aus dem Chatverlauf vom 24.–27.10.2026 (Leitfäden, Live-Sessions am 26. und 27.10.). Bei neuen Erkenntnissen
in den Tagesnotizen (`notes/`) gelten die neueren Angaben.

## Inhalt

1. Markt, Zeiten, Chart-Einstellungen
2. Wie er handelt (Modell)
3. Konto und Plattform IQ Capital
4. Risiko- und Tagesregeln
5. Was ihm wichtig ist (Kommunikation)
6. Lehren aus echten Trades
7. Verlauf

## 1. Markt, Zeiten, Chart-Einstellungen

- **Hauptmarkt EURUSD** (TradingView, Datenquelle OANDA). **SMT-Partner GBPUSD**, ebenfalls OANDA, auf 15 Minuten.
  Watchlist „Rote Liste“: GBPUSD, EURUSD, USDJPY, XAUUSD, SPX, NQ1!. Andere Märkte nur, wenn er sie schickt.
- **Handelszeit**: Daytrader. Erste Fotos ab ca. 09:15 Uhr Berliner Zeit (Frankfurt/London-Eröffnung), aktiv bis etwa
  15–16 Uhr (New-York-Vormittag). Er sitzt oft im Büro und schreibt zwischendurch auch vom Handy.
- **Bilder**: meist Handyfotos vom Bildschirm (schräg, mit Moiré, manchmal ohne Preisachse oder Kopfzeile), dazu
  Handy-Screenshots der IQ-Website. Für genaue Werte um Screenshots bitten.
- **Chart-Zeitzone wechselt**: am 26.10. Berliner Zeit, am 27.10. New York (Uhr unten rechts „UTC-4“). Immer die
  Uhr am Chart lesen. Zeitumstellung: Europa am letzten Sonntag im Oktober, USA am ersten Sonntag im November. In der
  Woche dazwischen liegt New York nur 5 statt 6 Stunden hinter Berlin (2026: 26.–31.10.).
- **Indikator „TJR-Style Sessions (Clean Lines + Following Labels)“**: farbige Hintergründe je Session (Asien,
  London, New York) und Linien mit Beschriftung „Asia High/Low“, „London High/Low“, „New York High/Low“. Dazu grüne
  Linien für offene alte Hochs/Tiefs (z. B. „11 Day Low“), die der Kurs noch nicht wieder erreicht hat.
- **Weitere Indikatoren im Chart**: „BB %b – RSI – Stoch“ (Unterfenster). Für das Pivot-Setup (PV) relevant: Stochastic
  RSI und gleitende Durchschnitte 20/50/200 auf 15 Min. (`references/pivot-setup.md`, Abschnitt 6).
- **Volumenprofil-Werkzeuge**: „Fixed Range Volume Profile“ und „Anchored Volume Profile“ (verankert) hat er in der
  Zeichenleiste. Wunsch vom 28.10.: in Analyse und Ausführung nutzen, wo es sich anbietet und sinnvoll ist
  (`references/tradingview-werkzeuge.md`, Abschnitt 5).
- **Empfohlener zweiter Indikator**: ein FVG-Indikator mit Zeitrahmen-Option (z. B. „Fair Value Gap [LuxAlgo]“).
  Ob er ihn nutzt, ist offen. SMT vergleicht er selbst mit GBPUSD im zweiten Tab.
- **Seine eigenen Zeichnungen**: Rechtecke mit orangem Rand und roter Schrift, z. B. „Short 1 Rücksetzer
  Bestätigung“, „Short 2 falls 1 bricht“, „Resistance 13.10“, „Resistance EQ Highs“, „Resistance FVG Montag“,
  „Support Tief 14.10“ und grüner Text „Liq sweep + close drüber=long, Bestätigung M5, SMT, SL unter Wig, Ziel 1,1140“.
  Gestrichelte orange Linien nutzt er für die CISD-Linie und für wichtige Hochs. **Seine Namen übernehmen**
  (Short 1, Short 2, Long 1 …), damit Bild und Text zu seinem Chart passen.

## 2. Wie er handelt (Modell)

Grundlage sind die drei Leitfäden (L1 Continuation, L2 GXT, L3 TTrades) und die Kompakt-Checkliste. Sein Ablauf in der
Praxis:

1. **Bias** über die Tagesschlüsse (L3·3): z. B. Montag schloss unter dem Freitagstief, also bärische Fortsetzung.
2. **Zonen** aus FVGs (IRL) und alten Hochs/Tiefs (ERL), Session-Hochs/-Tiefs, gebrochene Unterstützung als neuer
   Widerstand (Rollenwechsel).
3. **Rücksetzer in die Zone**, dort **Sweep** von Liquidität (gleiche Hochs/Tiefs, Session-Hoch/-Tief).
4. **SMT** mit GBPUSD auf 15 Minuten (ein Markt macht ein neues Hoch/Tief, der andere nicht; oder PSP).
5. **CISD auf M5**: Schluss jenseits der Eröffnung der Kerzenserie, die das letzte Extrem gemacht hat. Die Linie
   wandert mit, wenn ein neues Extrem entsteht.
6. **Einstieg** Market beim CISD-Schluss oder Limit beim Rücklauf in die neue M5-Lücke (L2·6, Einstieg 2).
7. **Stop** hinter dem Sweep-Extrem bzw. hinter der ganzen Zone, **Ziel** die nächste Gegen-Liquidität, mindestens 2R.

Typische Fragen von ihm: „wann long, wann short?“, „ist das ein gutes Setup?“, „ist das schon interessant?“,
„welches Hoch meinst du?“, „welche 30-Min-Kerze und wann?“, „was genau muss ich bei GBPUSD prüfen?“.

## 3. Konto und Plattform IQ Capital

- Prop-Firma **IQ Capital**, **50K-Konto**, Plattform „VolumetricaFX“ (Website, mit eingebautem TradingView-Chart).
  Kopfleiste: **Eq** = Kontostand, **DPL** = Tagesergebnis, **MD** = Verlustgrenze (47.000 $), **OPL** = offener
  Gewinn/Verlust. **Puffer = Eq − MD** (nach dem Verlust am 27.10. ca. 2.700 $). Den Puffer bei jeder
  Risikoplanung nennen.
- **Order-Panel**: Reiter Market, Limit, Stop, Stop Limit. **„Units“ zählt in Lots** (1 Lot = 100.000 Einheiten).
  Am 27.10. wurde 333333.33 eingetippt und abgelehnt („Margin not enough … 742 Mio. $“). Richtig war 3.33.
- **Exits**: „Take profit“ und „Stop loss“ in **ticks** (1 Tick = 0,00001 = 0,1 Pip), jeweils mit **Schalter**, der
  eingeschaltet sein muss. Über das kleine Menü lässt sich auf Preis umstellen, das ist sicherer.
- **Linien im Chart**: Position rot („−2.5 | +102.50 | ×“), Stop orange, Ziel grün. Die Beschriftung „−0.00 USD“
  bzw. „+0.01 USD“ an Stop und Ziel ist ein **Anzeigefehler** (die Plattform rechnet dort ohne Kontraktgröße). Das
  echte Risiko immer selbst rechnen (`scripts/rechner.py`).
- **Gefahren**: das Symbol **⇅** an der Positionslinie dreht die Position um (aus Short wird Long). **×** schließt
  die Position bzw. löscht Stop oder Ziel. Ein erneuter Klick auf „Sell“/„Buy“ öffnet eine **zweite Position**,
  ohne Stop, wenn die Schalter aus sind. Keinen zusätzlichen Stop über den Reiter „Stop“ anlegen: das ist eine neue
  Order und kann nach dem Stop-out eine Gegenposition eröffnen.
- **Am Handy** (Website im Browser) lassen sich Stop- und Ziel-Linie mit dem Finger ziehen. Er hat am 27.10. so das
  Ziel gesetzt. Tipp: vorher auf 5m stellen, dann liegen die Linien weiter auseinander.
- **Kosten**: EURUSD 10 $ pro Pip und Lot. Das Tagesergebnis −286,38 $ passte exakt zu 3,33 Lots × 8,6 Pips, also
  war keine Kommission sichtbar. Die Regeln von IQ Capital zum Halten über Nacht und zum Handeln um Nachrichten
  sind noch nicht geprüft. Darauf hinweisen, wenn es relevant wird.

## 4. Risiko- und Tagesregeln

Diese Regeln sind mit ihm besprochen und von ihm umgesetzt worden. Er kann sie jederzeit ändern, dann gelten seine
neuen Werte (in den Notizen festhalten).

- **Risiko pro Trade ca. 250 $** (≈ 0,5 % des 50K-Kontos). Lots = Risiko ÷ (Stop-Pips × 10), abgerundet.
- **Mindestens 2R**. Einstieg nur in einer Zone, nie in der Mitte zwischen zwei Zonen.
- **Höchstens 2 Verluste am Tag**, dann Schluss. Nach einem Verlust 15–30 Minuten Pause, kein Rache-Trade.
- **Sperrzeiten**: ca. 15 Minuten vor bis 15 Minuten nach wichtigen US-Daten keine neuen Einstiege. Läuft ein
  Trade im Plus (ab 1R), vor den Daten den Stop auf den Einstieg ziehen (feste Breakeven-Regel), sonst nicht
  anfassen.
- **Stop nie vergrößern**. Breakeven und Teilgewinne nur nach vorher festgelegter Regel (L2·8).
- **Zeitlimit**: Ein Daytrade wird bis ca. 21:30 Uhr Berliner Zeit entschieden (Tageswechsel um 17:00 New York:
  Swap, kurz breite Spreads). Über Nacht nur im Plus mit Stop auf dem Einstieg. Vor Notenbank-Entscheiden (Fed, EZB)
  keine offenen Trades.
- **Pflicht seit dem 27.10.**: Vor dem Einstieg muss das Level bzw. müssen die gleichen Hochs/Tiefs gesweept sein.
  Der Stop gehört hinter die ganze Zone, nicht knapp hinter gleiche Hochs. Eine Seitwärtsphase im Level und die
  Stunde vor wichtigen Daten ohne Sweep heißen: abwarten.

## 5. Was ihm wichtig ist (Kommunikation)

- **Deutsch, einfach, kurz.** Fachbegriffe beim ersten Mal kurz erklären (er fragte „was ist m5 und smt“).
- **Grafisch**: „zeichne das bitte verständlich ein“. Er will Zonen, Pfeile und Werte direkt in seinem Chart sehen.
- **Konkret**: welches Hoch, welche Kerze, welche Uhrzeit (Chartzeit und Berliner Zeit), welcher Preis. Unklare
  Angaben fragt er nach („welche 30min kerze meinst du und wann“).
- **Zeitrahmen immer nennen**: auf welchem Timeframe geschaut und eingezeichnet wird und warum (sein ausdrücklicher
  Wunsch vom 27.10.).
- **„Lass es“ klar sagen** (Wunsch vom 28.10.): Wenn kein Setup in seinen eigenen Pflicht-Punkten sauber erfüllt
  ist, in der ersten Zeile „Lass es.“ mit Grund, keine B-Setups mit Einstiegswerten.
- **Setups einzeln und kombiniert** (Wunsch vom 28.10., Nachtrag): M, SB, PV und TJR stehen jeweils für sich und
  gelten als A, wenn ihre eigenen Bedingungen und der Risiko-Rahmen erfüllt sind. Treffen sie zusammen: A+. Immer
  zeigen, was dafür und was dagegen spricht, mit Anzahl.
- **Alle Risiken auflisten** bei jeder Option (sein ausdrücklicher Wunsch).
- **Schnell, wenn es eilt** („schnell“): zuerst die eine Sache, die jetzt zählt, dann Details.
- **Plattform-Hilfe Schritt für Schritt** (IQ Capital, auch am Handy): genau welches Feld, welcher Schalter, was
  nicht anklicken.
- **Aus Fehlern lernen**: „warum wurde der SL getroffen?“, „gab es eine Warnung?“. Ehrlich antworten, Warnzeichen
  konkret benennen, auch eigene Fehler in der Beratung zugeben.
- **Qualität**: „sauber und lupenrein, lückenlos“. Lieber einmal genau als dreimal ungefähr.
- **Journal**: Er trägt Trades ins Journal ein und möchte Vorlagen mit den echten Werten (`references/journal.md`).

## 6. Lehren aus echten Trades

- **27.10., Trade 1 (−1R)**: Short in der Zone „Short 1“ (altes Tief 13.10. + 15-Min-FVG), Einstieg nach knappem SMT
  und kleiner M5-CISD. Der Stop lag 2 Pips über **gleich hohen Hochs** (1,1150–1,1151) und noch in der Zone, das
  Level selbst (1,1153) war nie gesweept, der Kurs lief über 2 Stunden seitwärts, und die US-Daten standen 50 Minuten
  bevor. Kurz vor den Daten wurden die Hochs gesweept, Stop getroffen, danach die Wende. **Warnzeichen**: gleiche
  Hochs hinter dem Stop, kein Sweep („Failure to manipulate“, L1·4), Seitwärtsphase statt V-Form (L1·5), Driver noch
  offen (L2·8), schwaches SMT, CISD ohne Displacement.
- **27.10., Trade 2**: nach dem Sweep (Hoch 1,11545), SMT (GBPUSD tiefere Hochs, EURUSD minimal höheres Hoch) und
  M5-CISD (Schluss 1,11472 unter 1,11495): Einstieg 1,11472, Stop 1,11570 über der ganzen Zone, Ziel 1,11160 (≈ 3,2R,
  2,5 Lots, 245 $ Risiko). So soll ein Einstieg aussehen.
- **28.10., Short A (≈ −482 $, ≈ −1,9R bei 250 $ Regel-Risiko)**: Short 5,74 Lots ab 1,11327 nach Sweep des
  Asia-Hochs (Hochs 1,11366/1,11369), SMT (GBPUSD unter London-Hoch) und M5-CISD; Stop 1,11411 über gleichen Hochs und
  Zone. Der Kurs lief weiter in Short 1 (1,1143). **Warnzeichen**: großes Ziel (11-Tage-Tief) schon morgens erreicht,
  Rücksetzer suchte die nächste höhere Zone; über 1,5 Std. Seitwärtsphase in der Zone, verankertes Volumenprofil
  zeigte Annahme (VAH stieg 1,1127 → 1,1133); CISD in der Sperrzeit und ohne Displacement (am 27.10. galt eine CISD in
  der Sperrzeit nicht, hier wurde sie fälschlich gezählt); SMT vom Pfund getrieben (Haushalt); Lots fast doppelt so
  groß wie berechnet. Gut: Stop nicht verschoben, Ziel vor den Support gezogen.
- **26.10.**: Szenario A (Short aus der FVG-Box 1,1212–1,1215 nach Abpraller, Ziel Asia-Tief/PDL) ist aufgegangen.
- **Messfehler, die passiert sind**: Bildgröße falsch angenommen; Kerzen-Uhrzeit um eine Kerze verzählt; ICE-Daten
  (4 Nachkommastellen) mit OANDA (5) verglichen. Siehe `references/messung.md`.

## 7. Verlauf

- 24.10.: drei Leitfäden als PDF und die Kompakt-Checkliste erstellt (Inhalte in `references/`).
- 26.10.: erste Live-Session EURUSD 15 Min. (FVG-Box, Asia-Tief, Freitagstief, Szenarien A/B).
- 27.10.: Vorbereitung mit Termin-Check (Fed Mi 28.10. 19:00, EZB Do 29.10. 14:15), Zonen, zwei Shorts (siehe oben).
- 28.10.: TJR-Setup (HTF-Sweep → M5-BOS → M5-FVG gefüllt → M1-BOS) aufgenommen, Short und Long; danach alle Setups eigenständig gemacht (A je Setup, A+ bei Kombination,
  Dafür/Dagegen-Bilanz)
  (`references/tjr-setup.md`).
- 28.10. (abends): Key-Level-Reel als Variante TJR-KL aufgenommen, kein fünftes Setup (`references/key-level-variante.md`).
- 28.10. (abends): FVG-Nachzügler-Einstieg (TJR-FE) aus einem Video-Auszug aufgenommen, nur wenn es sich anbietet.
- 28.10. (abends): IFVG-Video als Variante TJR-IF aufgenommen (Körper-Schluss durch FVG → Ziel festlegen → Rücklauf in
  die IFVG = Einstieg, Stop hinter der IFVG), jeden Morgen und live, vor und während des Trades; Gegen-IFVG im
  offenen Trade = Warnzeichen (`references/fvg-ifvg.md`).
- 29.10.: Er handelt auch die Index-CFDs **SPX500** und **NAS100** bei IQ Capital (Spread ca. 0,55 bzw. 1,89 Punkte,
  IQ-Tick 0,01). Wunsch: zwei getrennte Strategien (`references/strategie-spx500.md`, `references/strategie-nas100.md`,
  je ORB aus einem Video plus TJR-Familie), ausgelöst über „Guten Morgen, heute …“. Offen: $ pro Punkt und Unit.
- 28.10.: Screenshot-Protokoll mit Uhrzeitplan; nur noch vier Setups (M, TJR, SB, PV), Handbuch nur Konfluenz.
