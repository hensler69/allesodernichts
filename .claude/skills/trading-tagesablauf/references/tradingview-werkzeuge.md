# TradingView-Werkzeuge: Fibonacci, VWAP, Volumenprofil und Co.

Wunsch des Nutzers (27.10.2026): Werkzeuge aus TradingView einbeziehen und nutzen, wenn es sinnvoll ist, zum Beispiel
Volumenprofil, Fibonacci und VWAP.

## Inhalt

1. Grundregel
2. Was in seinem TradingView-Plan geht
3. Fibonacci (kostenlos, am nützlichsten)
4. VWAP
5. Volumenprofil
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
  (Basic). Laut Vergleichsseiten erlaubt Basic **2 Indikatoren pro Chart**, und das **Volumenprofil gibt es erst ab
  dem Essential-Plan**. Vor einer Empfehlung kurz nachfragen bzw. auf TradingViews Preisseite verweisen; die Angaben
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

## 5. Volumenprofil

**Was**: Wie viel an welchem Preis gehandelt wurde. Ergänzung, nicht aus den Videos.
- **POC** (Point of Control): Preis mit dem meisten Volumen. Wirkt oft wie ein Magnet und ist damit ein Ziel.
- **Value Area** (ca. 70 % des Volumens) mit **VAH** und **VAL**: Ränder, an denen der Kurs oft reagiert.
- **LVN** (dünne Stellen): Dort lief der Kurs schnell durch. Sie fallen oft mit FVGs zusammen. FVG plus LVN ist eine
  saubere Zone, durch die der Kurs auch schnell wieder läuft.
- **HVN** (dicke Stellen): Dort pendelt der Kurs gern seitwärts. Das passt zur Regel „Seitwärtsphase heißt abwarten“.

**Varianten**: Fixed Range (Bereich selbst wählen, z. B. von Sweep zu Sweep), Visible Range (sichtbarer Bereich),
Session-Profil. **Laut Vergleichsseiten nicht im kostenlosen Plan.** Nur nutzen, wenn er es im Bild hat.

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
