# Rechtliche Pflichtteile für einen Shop in Deutschland

Stand der Recherche: Oktober 2026. Das ist keine Rechtsberatung. Vor einem echten Start die Rechtstexte
prüfen lassen (Anwalt oder ein Rechtstexte-Dienst wie Händlerbund oder IT-Recht Kanzlei) und das dem Nutzer
auch so sagen. Wenn etwas unsicher wirkt oder neuer als Juni 2026 sein könnte: per Websuche nachprüfen.

## Inhalt
1. Preise und Rabatte
2. Bestellvorgang und Kasse
3. Widerruf und Widerrufsbutton
4. Impressum und Streitbeilegung
5. Datenschutz und Speicher im Browser
6. Produktpflichten (GPSR, Elektro, Verpackung, Branchen)
7. Werbung, Bewertungen, Knappheit
8. Barrierefreiheit
9. Markenname
10. Offene Punkte vor einem echten Start

## 1. Preise und Rabatte (PAngV)
- Gesamtpreis inkl. MwSt. direkt am Preis, dazu "zzgl. Versand" mit Link auf die Versandseite (oder "versandkostenfrei").
- Grundpreis (Preis pro kg, l, m, m²) ist Pflicht, wenn Ware nach Gewicht, Volumen, Länge oder Fläche verkauft wird
  (Kosmetik, Lebensmittel, Stoffe). Bei Stückware wie einem Gerät nicht.
- Streichpreise: Bei jeder beworbenen Preissenkung muss der niedrigste Preis der letzten 30 Tage als Bezugspreis
  genannt werden (§ 11 PAngV). Ein neuer Shop hat keinen Vorpreis, also KEIN Streichpreis.
  Ein UVP-Vergleich bei einer Eigenmarke ist irreführend (Fehler, den wir anfangs gemacht haben).
- Erlaubt und bewährt: Einführungspreis mit festem Enddatum und genanntem Folgepreis
  ("Einführungspreis bis 30.11.2026, danach 59,90 €"). Datum einhalten, danach wirklich den genannten Preis nehmen.
  Im Code: Preiswechsel automatisch nach Datum (Browser und Server, Zeitzone Europe/Berlin).
- Set-Preis mit ehrlichem Vergleich zum eigenen aktuellen Einzelpreis ("15 % günstiger als zwei einzeln") ist zulässig.
- Gutschein für Newsletter: Bedingungen klar nennen (einmalig, Höhe, nicht mit anderen kombinierbar), Anmeldung nur mit
  Bestätigungslink (Double-Opt-in), Abmeldung jederzeit. Der Server prüft den Code, nicht nur der Browser.
- Versandkosten und "kostenlos ab" auf Versandseite, im Warenkorb und in der Kasse identisch.

## 2. Bestellvorgang und Kasse (BGB §§ 312i, 312j)
- Zahlungsarten und Lieferbeschränkungen spätestens beim Beginn des Bestellvorgangs (Warenkorb, Fakten im Angebot).
- Unmittelbar über dem Bestellknopf: Produkt mit wesentlichen Eigenschaften, Menge, Gesamtpreis, Versandkosten, Lieferzeit.
- Der Bestellknopf heißt "zahlungspflichtig bestellen" (oder eine ebenso eindeutige Formulierung).
- Eingaben vor dem Absenden korrigierbar. AGB und Widerrufsbelehrung in der Kasse verlinkt.
- Bestellbestätigung sofort per Mail, darin Vertragsinhalt, AGB-Hinweis und Widerrufsbelehrung.
- Lieferzeit konkret ("2 bis 4 Werktage"), nicht "schnell".
- Preise rechnet der Server neu (send.php), nie dem Browser vertrauen. Bestellnummern eindeutig (PRÄFIX-JJJJMMTT-ZUFALL).
- Zahlungsanbieter (PayPal, Klarna) brauchen Händlerverträge. Bis dahin geht die Bestellung per Mail ein, das im
  Entwurf klar sagen.

## 3. Widerruf und Widerrufsbutton
- Widerrufsbelehrung (14 Tage) mit Muster-Widerrufsformular als eigene Seite, Rücksendekosten-Regel nennen.
- Seit 19.06.2026 Pflicht: elektronische Widerrufsfunktion. Umsetzung in der Referenz:
  - in der Fußzeile jeder Seite der Link "Vertrag widerrufen", gut sichtbar,
  - Seite `/widerrufen` mit Formular (Name, Mail, Bestellnummer, optional Datum und Artikel),
  - Knopf "Widerruf bestätigen",
  - sofortige Eingangsbestätigung per Mail mit Datum und Uhrzeit des Eingangs und Anzeige auf der Seite.
- Gesetzliche Mängelrechte erwähnen. Das Wort "Garantie" nur, wenn es eine echte Garantie mit allen Angaben gibt.

## 4. Impressum und Streitbeilegung
- Impressum nach § 5 DDG (früher TMG): Firma, Anschrift, Vertretungsberechtigte, Mail plus schneller zweiter Kontaktweg,
  Registergericht und Nummer, USt-IdNr. In einem Entwurf erfundene Angaben deutlich als Platzhalter markieren.
- Die EU-Plattform zur Online-Streitbeilegung (OS-Plattform) ist abgeschaltet: KEIN Link mehr darauf.
- Hinweis zur Verbraucherschlichtung (VSBG): Pflicht ab mehr als 10 Beschäftigten, üblich ist ein kurzer Satz, ob man teilnimmt.

## 5. Datenschutz und Speicher im Browser
- Datenschutzerklärung mit: Verantwortlicher, Hosting und Server-Protokolle, Bestellung, Kontakt per Mail,
  Newsletter (Double-Opt-in), Bewertungen, Zahlungsanbieter, Rechte der Betroffenen, Aufsichtsbehörde.
- Speicher im Browser (Local Storage) ohne Einwilligung nur für Dinge, die der Besucher selbst will und braucht
  (Warenkorb, eine selbst eingestellte Weckzeit, "hilfreich"-Markierung). Jeden Schlüssel in der Datenschutzerklärung nennen.
  Kein Besuchs-Tracking, keine Zeitstempel "zuletzt da" ohne Einwilligung (§ 25 TDDDG).
- Keine externen Schriften, Skripte, Karten oder Videos. Dann braucht der Shop kein Cookie-Banner.
  Kommen Analyse oder Zahlungs-Skripte dazu, ist eine Einwilligung nötig.

## 6. Produktpflichten
- Produktsicherheit (GPSR, VO (EU) 2023/988): im Angebot Herstellername, Post- und Mailadresse, falls Hersteller außerhalb der EU
  die verantwortliche Person in der EU, Produkt-Kennung (Typ, Modell), Bild, Warn- und Sicherheitshinweise auf Deutsch.
  In der Referenz: Karte "Produktsicherheit" im Technik-Stapel.
- Elektrogeräte: Registrierung bei der Stiftung EAR (WEEE-Nummer), Rücknahme-Hinweise, CE-Kennzeichnung, Anleitung auf Deutsch.
  Batterien und Akkus: Hinweise nach Batterierecht.
- Ware direkt aus China (zum Beispiel AliExpress, Dropshipping): Wer in die EU einführt, gilt als Hersteller (ElektroG,
  Batterierecht, Verpackung). Lieferzeit ehrlich nennen (Kopfbereich, Warenkorb, Kasse über dem Knopf, Bestellmail,
  Versandseite, AGB). Seit 01.07.2026 gilt auf Kleinsendungen aus Drittstaaten eine Zollpauschale von 3 €
  (Verordnung (EU) 2026/382): Zoll und Einfuhrumsatzsteuer selbst tragen und "an der Haustür nichts extra" sagen.
  Datenschutz: Weitergabe der Lieferadresse an den Lieferanten im Drittland nach Art. 49 Abs. 1 lit. b DSGVO nennen.
  Rücksendeadresse in Deutschland angeben. Lebensmittelkontakt (VO (EG) 1935/2004) und EU-Stecker vom Lieferanten
  schriftlich bestätigen lassen. Leistungsangaben wie "800 W" nur als "laut Hersteller", bis sie geprüft sind.
- Verpackungen: Registrierung im Verpackungsregister LUCID und Beteiligung an einem dualen System VOR dem ersten Verkauf.
- Branchen mit eigenen Regeln prüfen: Kosmetik (Inhaltsstoffe, verantwortliche Person), Lebensmittel (LMIV), Textil (Faserangaben),
  Spielzeug (Warnhinweise), Medizinprodukte (nicht ohne Fachberatung).
- Keine Heil- oder Gesundheitsversprechen für Produkte, die kein Medizinprodukt sind (Heilmittelwerbegesetz).
  Beispiel Lichtwecker: "sanft wach werden" ja, "hilft gegen Winterdepression" nein. Produkte, deren Verkauf von solchen
  Versprechen lebt (LED-Masken, Nahrungsergänzung), haben ein hohes Abmahnrisiko und werden nicht empfohlen.

## 7. Werbung, Bewertungen, Knappheit (UWG)
- Bewertungen: Hinweis, ob und wie die Echtheit geprüft wird (§ 5b Abs. 3 UWG), in der Referenz "So prüfen wir Bewertungen":
  nur mit Bestellnummer, alle Sterne gleich behandelt, Texte nicht geändert.
- Erfundene oder gekaufte Bewertungen als echt sind verboten (UWG Anhang Nr. 23b und 23c). Im Entwurf dürfen Beispiele stehen,
  dann sichtbar als "Beispiel" markiert, mit Entwurfshinweis, und KEIN aggregateRating im JSON-LD. Vor dem Start löschen.
- Keine falsche Knappheit ("nur noch 3 da", wenn es nicht stimmt) und keine Countdowns ohne echten Grund (UWG Anhang Nr. 7).
- "Testsieger", "Bestseller", "Nr. 1" nur mit Beleg.

## 8. Barrierefreiheit
Das Barrierefreiheitsstärkungsgesetz (BFSG) gilt seit 28.06.2025 auch für Onlineshops an Verbraucher. Ausgenommen sind
Kleinstunternehmen (unter 10 Beschäftigte und höchstens 2 Mio. € Umsatz oder Bilanz). Trotzdem immer so bauen:
Tastaturbedienung mit sichtbarem Fokus, Alt-Texte, Kontrast, Beschriftungen an allen Feldern, `prefers-reduced-motion`,
`prefers-reduced-transparency`, `prefers-contrast`, und ein Anhalten-Knopf für alles, was sich länger als 5 Sekunden
von selbst bewegt (WCAG 2.2.2).

## 9. Markenname
- Vor der Wahl: Websuche nach dem Namen plus Produktart. Ähnlich klingende Namen in derselben Warengruppe sind tabu
  (Beispiel: "Solune" verworfen, weil es den Lichtwecker "SOLUNA" gibt).
- Vor echter Nutzung im Register prüfen lassen: DPMA (Deutschland), EUIPO (EU), WIPO (international), passende Nizza-Klassen.
- Domain-Verfügbarkeit prüfen. Im Entwurf `<name>.example` verwenden.

## 10. Offene Punkte vor einem echten Start (für die Übergabe)
- echte Firmen- und Herstellerdaten statt Platzhalter, Rechtstexte prüfen lassen
- echtes Produktfoto mit Nutzungsrecht statt Fremdbild, Vorschaubild prüfen
- Händlerverträge Zahlungsanbieter, Bestellmails testen
- WEEE, LUCID, CE und weitere Produktpflichten erledigt
- Markenprüfung des Namens
- Beispiel-Bewertungen löschen
- `GEHEIMNIS` in send.php durch langen Zufallstext ersetzen, Domain eintragen
- `noindex`, `robots.txt`-Sperre und Entwurfsleiste entfernen, Sperre in der Wurzel-.htaccess aufheben
- Hosting mit PHP-Mailversand testen (Bestellung, Widerruf, Newsletter-Bestätigung)
