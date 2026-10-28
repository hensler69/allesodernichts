# TradingView-Werkzeuge: Fibonacci, VWAP, Volumenprofil und Co.

Wunsch des Nutzers (27.10.2026): Werkzeuge aus TradingView einbeziehen und nutzen, wenn es sinnvoll ist, zum Beispiel
Volumenprofil, Fibonacci und VWAP.

## Inhalt

1. Grundregel
2. Was in seinem TradingView-Plan geht
3. Fibonacci (kostenlos, am nützlichsten)
4. VWAP
5. Volumenprofil: Fixed Range und verankert
6. Weitere nützliche Werkzeuge
7. Lesen, einzeichnen, erklären

## 1. Grundregel

- **Seine Leitfäden (L1–L3) und die Checkliste bleiben das Modell.** Ein Werkzeug ist eine **Zusatzbestätigung**
  (Konfluenz) oder eine Messhilfe, kein eigenes Signal. Fehlt ein Checklisten-Punkt (Sweep, SMT, CISD, 2R), macht
  auch ein perfektes Fibonacci-Level daraus keinen Trade.
- **Kennzeichnen, woher etwas stammt.** Aus den Leitfäden: EQ = 50 % einer Kerze oder Spanne (L1·6, L2·3) und die
  −1-Standardabweichung des Manipulationsbeins als Ziel (L3·6). Alles andere (OTE, Premium/Discount, VWAP,
  Volumenprofil) ist „Ergänzung, nicht aus den Videos“.
- **Nur, wenn es etwas bringt.** Lieber ein Werkzeug mit klarer Aussage als viele Linien. Ein Werkzeug ist sinnvoll,
  wenn es eine Zone bestätigt oder schärft (z. B. FVG liegt genau bei Fib 62–79 %), ein Ziel liefert oder eine Frage
  entscheidet (Premium oder Discount?).
- **Genau angeben, wie es angelegt ist**: Zeitrahmen, Ankerpunkte mit Preis und Uhrzeit (Chartzeit und Berlin),
  Einstellungen. So kann er es exakt nachzeichnen und morgen wiederholen.

## 2. Was in seinem TradingView-Plan geht

- In seinen Fotos ist oben rechts ein „Upgrade“-Knopf zu sehen, also nutzt er vermutlich den kostenlosen Plan
  (Basic). Laut Vergleichsseiten erlaubt Basic **2 Indikatoren pro Chart**. Die Volumenprofil-Zeichenwerkzeuge
  (Fixed Range, verankert) hat er in seiner Werkzeugleiste (28.10.), sie belegen keinen Indikator-Platz. Das
  Volumenprofil **als Indikator** (Session- bzw. Visible-Range-Profil) gibt es laut Vergleichsseiten erst ab
  dem Essential-Plan. Vor einer Empfehlung kurz nachfragen bzw. auf TradingViews Preisseite verweisen; die Angaben
  ändern sich.
- Einen Platz belegt der Indikator „TJR-Style Sessions“. Der zweite Platz ist frei für **entweder** einen
  FVG-Indikator (passt am besten zu seinen Leitfäden, Lücken = IRL) **oder** VWAP. Er entscheidet. Ihn nicht zum
  Kauf eines Abos drängen.
- **Zeichenwerkzeuge zählen nicht als Indikator**: Fibonacci, Rechteck, Linien, Long-/Short-Position, Messen. Die
  gehen immer.
- **Volumen bei Forex**: Für EURUSD gibt es kein zentrales Börsenvolumen. TradingView zeigt bei OANDA Tick-Volumen
  (Anzahl der Kursänderungen). VWAP und Volumenprofil sind bei Forex deshalb nur Näherungen. Im IQ-Chart steht
  „Volume 0“, dort gehen sie gar nicht, also immer im TradingView-Chart mit OANDA-Daten.

## 3. Fibonacci (kostenlos, am nützlichsten)

**Wofür, passend zu seinem Modell:**
- **EQ (0,5)**: die Mitte einer Kerze oder Spanne. Die Leitfäden nutzen sie als Filter und erste Invalidierung
  (L1·6, L2·3): Expansionen machen keine tiefen Rücksetzer, ein Schluss jenseits von EQ ist ein Warnzeichen. Mit dem
  Fib-Werkzeug liegt die 0,5 exakt.
- **Premium und Discount** (Ergänzung): Über 50 % der aktuellen Spanne ist „teuer“ (dort Shorts suchen), darunter
  „billig“ (dort Longs suchen). Gute schnelle Prüfung, ob eine Zone auf der richtigen Seite liegt.
- **OTE 0,62–0,79** (Ergänzung, ICT): typische Rücksetzer-Zone für den Einstieg in Richtung der Bewegung. Stark, wenn
  dort auch eine FVG oder ein altes Hoch/Tief liegt.
- **−1-Standardabweichung als Ziel** (L3·6): Das Manipulationsbein (vom Hoch vor dem Sweep bis zum Sweep-Tief,
  bärisch gespiegelt) wird noch einmal jenseits des Startpunkts abgetragen. Mit dem Fib-Werkzeug: erst auf das
  Sweep-Extrem klicken, dann auf den Start des Beins. Die 1 muss am Sweep-Extrem liegen, die 0 am Start des Beins,
  dann liegt −1 am Ziel. −2 ist das erweiterte Ziel.

**So legt er es an** (Schritt für Schritt geben):
1. Links in der Werkzeugleiste das Fibonacci-Symbol wählen, dann „Fib Retracement“ (Tastenkürzel Alt + F).
2. Für eine **Abwärtsbewegung** zuerst auf das **Hoch**, dann auf das **Tief** klicken. Für eine Aufwärtsbewegung
   umgekehrt. Danach prüfen: Die 0 muss am Ende der Bewegung liegen. Wenn nicht, in den Einstellungen „Umkehren“
   anhaken.
3. Einstellungen (Zahnrad) → Stufen: nur 0; 0,5; 0,62; 0,705; 0,79; 1; −1; −2 anhaken, Preise anzeigen.
4. Dochte als Anker nehmen (nicht Kerzenkörper), auf dem Zeitrahmen, auf dem die Bewegung entstanden ist (meist
   30 Min. oder 15 Min.).

**Welche Bewegung?** Die letzte deutliche Bewegung (Displacement), die die Zone erzeugt hat, z. B. der
London-Abverkauf von Asia-Hoch bis London-Tief, oder die Spanne des Vortags (PDH bis PDL) für Premium/Discount.

## 4. VWAP

**Was**: der volumengewichtete Durchschnittspreis seit dem Anker (z. B. Session-Beginn). Großteilnehmer nutzen ihn
als fairen Tagespreis. Alles hier ist Ergänzung, nicht aus den Videos.

**Wofür:**
- **Tagesrichtung prüfen**: Bei bärischem Plan passt es, wenn der Kurs unter dem VWAP läuft. Läuft er klar darüber,
  ist das ein Risiko für Shorts.
- **Zusatzbestätigung an der Zone**: Lehnt der Kurs am VWAP ab, der gleichzeitig in seiner Widerstandszone liegt, ist
  die Zone stärker.
- **Anchored VWAP** (verankerter VWAP) ab der London-Eröffnung oder ab dem Sweep-Hoch: Rücktests wirken oft als
  Widerstand bzw. Unterstützung.
- **Bänder** (±1 und ±2 Standardabweichungen): weit entfernte Bänder zeigen überdehnte Bewegungen. Als Ziel nur, wenn
  es zu einer Liquiditätszone passt.

**Einrichten**: Indikatoren → „VWAP“ (Volume Weighted Average Price), Anker „Session“. Kostet einen
Indikator-Platz. Anchored VWAP gibt es als Zeichenwerkzeug: Ankerkerze anklicken.

## 5. Volumenprofil: Fixed Range und verankert (fester Teil seiner Analyse)

Wunsch des Nutzers (28.10.2026): Bei der Analyse **und** bei der Ausführung auch mit den beiden
Volumenprofil-Zeichenwerkzeugen aus TradingView arbeiten, **wo es sich anbietet und sinnvoll ist** (nicht bei jedem
Bild, sondern wenn ein Profil eine Zone, einen Stop, ein Ziel oder eine offene Frage klärt): **Fixed Range Volume Profile** (deutsch etwa „Volumenprofil
mit festem Bereich“) und **Anchored Volume Profile** („verankertes Volumenprofil“, sein „Volumenanker“). Beide liegen in
seiner Zeichen-Werkzeugleiste, er kann sie also nutzen. Sie sind eine Ergänzung, nicht aus den Videos: Sie bestätigen
oder schwächen eine Zone und helfen bei Stop, Ziel und Breakeven, ersetzen aber nie Sweep, SMT und CISD.

### Begriffe (beim ersten Mal kurz erklären)

- **POC** (Point of Control): Preis mit dem meisten Volumen im Bereich. Fairer Preis, wirkt wie ein Magnet und
  bremst. Ein guter Zielpunkt und eine typische Rücklauf-Zone.
- **Value Area** (VA, ca. 70 % des Volumens) mit Oberkante **VAH** und Unterkante **VAL**. An den Rändern reagiert der
  Kurs oft. Im Inneren läuft er gern seitwärts.
- **HVN** (dicke Stelle, viel Volumen): Dort pendelt der Kurs, Bewegungen werden langsam. Passt zu „Seitwärtsphase
  heißt abwarten“ (L1·5).
- **LVN** (dünne Stelle, wenig Volumen): Dort lief der Kurs schnell durch und läuft oft wieder schnell durch. Fällt
  oft mit einer FVG zusammen. FVG plus LVN ist eine saubere Zone.
- Bei Forex ist das **Tick-Volumen** (Anzahl Kursänderungen, OANDA). Es bildet die Aktivität gut ab, ist aber kein
  echtes Börsenvolumen. Immer im TradingView-Chart mit OANDA-Daten, nicht im IQ-Chart (dort „Volume 0“).

### Fixed Range Volume Profile (FRVP): Volumen in einem Bereich, den er festlegt

Anlegen: Werkzeug wählen, auf die **erste** Kerze des Bereichs klicken, dann auf die **letzte**. Das Profil erscheint
links bzw. rechts an den Kerzen.

Welche Bereiche zu seinem Modell passen (Zeitrahmen 30 Min. oder 15 Min.):
1. **Das letzte Displacement-Bein**, also die Bewegung, aus der die Zone stammt (z. B. Hoch vor dem Abverkauf bis
   Sweep-Tief). POC und LVNs dieses Beins zeigen, wo ein Rücksetzer auf Widerstand trifft. Liegt seine Short-Zone
   auf dem POC oder an der VAH dieses Beins, ist sie stärker.
2. **Der Vortag** (Tageswechsel 17:00 New York bis 17:00 New York): POC, VAH, VAL des Vortags sind Tageszonen wie
   PDH/PDL. Eröffnet der Kurs außerhalb der Vortages-Value-Area und läuft nicht zurück, spricht das für Fortsetzung;
   läuft er zurück hinein, wird oft die ganze Value Area durchlaufen (Ergänzung, „80-%-Regel“, nicht aus den Videos).
3. **Die Seitwärtsspanne** (Asia-Spanne, Spanne vor wichtigen Daten, Spanne vor der Fed): Der POC zeigt die Mitte, die
   Ränder sind die Liquidität für den Ausbruch oder den Sweep.
4. **Mehrtägiger Bereich** (z. B. seit dem letzten großen Hoch): HVN und LVN als große Zonen und Ziele.

### Anchored Volume Profile (verankert): Volumen ab einem Ereignis bis jetzt

Anlegen: Werkzeug wählen und **eine** Ankerkerze anklicken. Das Profil wächst mit jeder neuen Kerze mit.

Sinnvolle Anker für ihn:
- **Das Sweep-Extrem** (z. B. das Tief des Liquiditätsgriffs): Baut sich das Volumen über dem Sweep-Tief auf und
  wandert der POC nach oben, akzeptiert der Markt höhere Preise. Das stützt die Umkehr.
- **Die London- oder New-York-Eröffnung**: Wo hat die Session ihr Volumen? Läuft der Kurs vom POC weg, ist es eine
  echte Bewegung. Pendelt er um den POC, ist es Seitwärtsphase.
- **Die Daten- oder Notenbank-Kerze**: zeigt, ob der Spike angenommen (Volumen baut sich dort auf) oder abgelehnt
  wurde (POC bleibt auf der alten Seite). Passt zu Szenario 1 und 2 in `references/wirtschaftstermine.md`.
- **Der Einstieg** eines laufenden Trades: Wandert der POC in Trade-Richtung mit, läuft der Trade gesund.

Verwechslungsgefahr: Der **verankerte VWAP** (Anchored VWAP, Abschnitt 4) ist ein anderes Werkzeug mit nur einer
Linie (Durchschnittspreis ab dem Anker). Meint er den, gelten dieselben Anker.

### In der Analyse (Morgenplan und neue Zonen)

- Zu jeder Zone prüfen: Liegt dort ein POC, eine VAH/VAL oder ein LVN eines passenden Profils? Das in die
  Zonen-Tabelle schreiben („+ POC Abverkaufs-Bein“, Ergänzung).
- Zonen ohne Volumen-Bezug sind nicht falsch, aber eine Zone mit FVG + altem Hoch/Tief + POC/VAH ist die stärkere.
- HVN direkt in der Mitte zwischen zwei Zonen bestätigt die Kein-Trade-Mitte.
- Wenn es sich anbietet (klares Displacement-Bein, Vortag mit deutlicher Spanne, Seitwärtsphase vor Daten), ihn
  morgens um ein bis zwei Profile bitten, mit genauen Ankern (Kerze, Uhrzeit Chartzeit und Berlin, Preis):
  meist FRVP über das letzte Displacement-Bein und FRVP über den Vortag. Lieber zwei klare als fünf Profile.

### Bei der Ausführung (Einstieg, Stop, Ziel, Management)

- **Einstieg**: Bevorzugt dort, wo die CISD-Lücke (M5) auf einem LVN oder an der VA-Kante liegt. Liegt der Einstieg
  mitten in einem HVN, ist ein zähes Hin und Her wahrscheinlich: ins Risiko schreiben.
- **Stop**: hinter das Sweep-Extrem **und** hinter den nächsten HVN bzw. die VA-Kante, nicht mitten in einen HVN
  (dort pendelt der Kurs und holt Stops). Weiterhin mit `scripts/rechner.py` die Lots anpassen.
- **Ziel**: der nächste POC oder die gegenüberliegende VA-Kante, wenn sie vor der Gegen-Liquidität liegt. Wie bei
  Zonen knapp **vor** den POC legen. Liegt zwischen Einstieg und Ziel ein dicker HVN, ist dort die Teilgewinn- bzw.
  Breakeven-Marke (nur nach fester Regel, L2·8).
- **Weg zum Ziel**: Läuft der Weg durch LVNs, ist ein schneller Lauf wahrscheinlich. Durch HVNs eher langsam, dann
  ist das Zeitfenster (Daten, Fed, Tageswechsel) ein Risiko.
- **Im Trade**: verankertes Profil ab dem Einstieg bzw. Sweep. Kippt der POC gegen den Trade und hält der Kurs auf der
  falschen Seite, ist das ein Warnzeichen (kein Grund, den Stop zu vergrößern; nur die feste Breakeven-Regel zählt).

### Lesen aus seinen Bildern

- Volumenprofile **nicht** aus einem Foto berechnen (keine Volumendaten). Er zeichnet sie, du liest sie ab: POC-Linie,
  VAH/VAL (Ränder der hellen Value Area), dicke und dünne Stellen. Messung wie andere Linien (`references/messung.md`).
- Im Text immer sagen, welches Profil (FRVP oder verankert), welcher Anker bzw. Bereich, welcher Zeitrahmen.
- Empfohlene Einstellungen, damit die Bilder vergleichbar bleiben: Zeilen-Layout „Anzahl Zeilen“ 24 (bei kurzen
  Bereichen) bis 50, Value Area 70 %, „Aufwärts/Abwärts-Volumen“ an, POC und Value-Area-Linien anzeigen, „POC
  verlängern“ an, Breite ca. 30 %.
- Fehlt im Bild ein Profil, das eine Entscheidung klären würde, kurz darum bitten (mit Anker). Fehlt es nur als
  Zusatz, ohne Profil weiterarbeiten.

## 6. Weitere nützliche Werkzeuge (kostenlos)

- **Long-/Short-Position** (Zeichenwerkzeug): Einstieg, Stop und Ziel ziehen, das Werkzeug zeigt R. Mit Kontogröße
  und Risiko in den Einstellungen zeigt es auch die Positionsgröße. Ideal zum Gegenprüfen von `scripts/rechner.py`.
- **Alarme**: an der CISD-Linie oder an einer Zonengrenze, Auslöser „Einmal pro Balkenschluss“, damit nur ein
  Kerzenschluss meldet, kein Docht. Spart Fotos und Nerven.
- **Rechteck** für Zonen (macht er schon), **Preisbereich/Messen** für Pips und Zeit.
- **Zeitzone des Charts** (unten rechts): einheitlich wählen, sonst stimmen die Uhrzeiten zwischen Bildern nicht.
- **RSI, EMA, MACD** stehen in seinem Handbuch (H3, `references/handbuch-setups.md`), nicht in den Leitfäden.
  Lies sie ab, wenn er sie im Chart hat (z. B. bärische RSI-Divergenz am Sweep-Hoch als Zusatz), aber empfiehl
  sie nicht extra: Sie belegen Indikator-Plätze, und Sweep, SMT und CISD bleiben die Bestätigung.

## 7. Lesen, einzeichnen, erklären

- **Sichtbar im Bild?** VWAP-Linie, Profil oder Fib-Stufen ablesen wie andere Linien (`references/messung.md`) und in
  die Zonen-Tabelle aufnehmen, mit dem Vermerk „Ergänzung“.
- **Selbst einzeichnen**: Fibonacci mit `chart_tools.py` (Element `fibos`, siehe `references/grafik.md`), aus
  gemessenen Hochs und Tiefs. VWAP und Volumenprofil **nicht** aus einem Foto berechnen, denn dafür fehlen die
  Volumendaten. Dann schreibst du ihm, wie er sie einblendet, und wertest das nächste Bild aus.
- **In jeder Option**, die ein Werkzeug nutzt, kurz sagen, was es beiträgt („FVG liegt bei Fib 0,62–0,705, also im
  OTE-Bereich: zusätzliche Bestätigung, Ergänzung“), und als Risiko nennen, wenn ein Werkzeug dagegen spricht (z. B.
  Kurs über dem VWAP bei einem Short).
