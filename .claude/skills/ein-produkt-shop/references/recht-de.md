# Rechtliche Pflichtteile für einen Shop in Deutschland

Stand der Recherche: Oktober 2026, am 14.10.2026 nachgeprüft (Widerrufsfunktion, EU-Gewährleistungshinweis, UWG-Novelle,
Verpackung, Produkthaftung; Quellen waren Kammern, Kanzleien und Verbände, nicht die Gesetzestexte selbst). Das ist keine Rechtsberatung. Vor einem echten Start die Rechtstexte
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
- Seit 27.09.2026 Pflicht für alle Händler, die Waren an Verbraucher verkaufen: der harmonisierte EU-Gewährleistungshinweis
  (Label mit QR-Code zum Portal "Ihr Europa"; Richtlinie (EU) 2024/825, Durchführungsverordnung (EU) 2025/1960, Anhang I,
  in Deutschland über Art. 246a EGBGB). Nach den Fachquellen (IHK, Kanzleien): farbig, hervorgehoben und direkt in der
  Produktdarstellung, nicht nur in Fußzeile oder AGB; Wortlaut, Farben und Schrift sind fest und dürfen nicht verändert werden;
  empfohlen auch im Bestellabschluss und in der Bestätigungsmail. Er ergänzt den Satz zu den gesetzlichen Mängelrechten, ersetzt
  ihn nicht. Das Garantielabel (GARAN) nur, wenn der Hersteller eine kostenlose Haltbarkeitsgarantie über 2 Jahre für die ganze
  Ware gibt. Die offizielle Datei (Anhang I, Sprachfassung wählen) oder die fertige Einbindung eines Rechtstexte-Dienstes
  nehmen, nicht nachzeichnen. STAND: HELIA, HORTA und die Referenz haben ihn noch NICHT, das ist vor jedem echten Start offen.

## 3. Widerruf und Widerrufsbutton
- Widerrufsbelehrung (14 Tage) mit Muster-Widerrufsformular als eigene Seite, Rücksendekosten-Regel nennen.
- Seit 19.06.2026 Pflicht: elektronische Widerrufsfunktion. Umsetzung in der Referenz:
  - in der Fußzeile jeder Seite der Link "Vertrag widerrufen", gut sichtbar,
  - Seite `/widerrufen` mit Formular (Name, Mail, Bestellnummer, optional Datum und Artikel),
  - Knopf "Widerruf bestätigen",
  - sofortige Eingangsbestätigung per Mail mit Datum und Uhrzeit des Eingangs und Anzeige auf der Seite.
- Rechtsgrundlage ist § 356a BGB. Nach den Fachquellen darf die Funktion verlangen: Name, Angaben zur Identifizierung des Vertrags
  (auch nur eines Teils davon) und den elektronischen Weg für die Eingangsbestätigung, keine Gründe. Die Knöpfe heißen "Vertrag
  widerrufen" und "Widerruf bestätigen" (oder gleichwertig), die Funktion muss während der ganzen Widerrufsfrist ständig
  erreichbar sein, die Bestätigung kommt unverzüglich auf einem dauerhaften Datenträger (Mail). Das Feld "Welche Ware?" der Referenz
  ist freiwillig und dient der Kennzeichnung eines Teils des Vertrags, im Zweifel beim Anwalt-Check ansprechen.
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
  Seit 12.08.2026 gilt die EU-Verpackungsverordnung (EU) 2025/40 (PPWR). LUCID bleibt, das Gesetz VerpackDG ergänzt das VerpackG,
  und laut Zentraler Stelle Verpackungsregister verschiebt sich die Verantwortung für Eigenmarken und Importe stärker auf den
  Handel. Die Fristen zur Umstellung sind in den Quellen widersprüchlich: bei der Zentralen Stelle und beim dualen System nachfragen.
- Produkthaftung: Die neue EU-Produkthaftungsrichtlinie (EU) 2024/2853 muss bis 09.12.2026 umgesetzt sein, das deutsche Gesetz ist
  im Verfahren (BT-Drs. 21/4297, Beschlussempfehlung des Rechtsausschusses vom 07.10.2026, der Stand danach ist nicht geprüft).
  Haftung ohne Verschulden, Software zählt als Produkt, Importeure und Fulfilment-Dienstleister können mithaften. Eine
  Betriebshaftpflicht mit Produkthaftpflicht empfehlen und dem Versicherer den Direktimport aus einem Drittland nennen.
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
- Seit 27.09.2026 (Drittes Gesetz zur Änderung des UWG, setzt die Richtlinie (EU) 2024/825 um): Allgemeine Umweltaussagen wie
  "umweltfreundlich" nur mit anerkannter hervorragender Umweltleistung, "klimaneutral" auf Basis von Kompensation ist verboten,
  eigene Nachhaltigkeitssiegel ohne unabhängige Zertifizierung sind verboten, Aussagen zu Haltbarkeit, Reparierbarkeit und Updates
  nur mit Beleg. In HELIA und HORTA steht nichts davon (Textsuche am 14.10.2026), bei neuen Texten prüfen.

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
- EU-Gewährleistungshinweis einbauen (Abschnitt 2), offizielle Datei besorgen
- Produktunterlagen vom Lieferanten schriftlich (Go oder No-Go vor allen Registrierungen): EU-Konformitätserklärung (CE) mit
  Prüfberichten, Name und Anschrift von Hersteller und verantwortlicher Person in der EU, WEEE-Nummer oder Bevollmächtigter,
  Verpackungslizenz, Konformitätserklärung für den Lebensmittelkontakt, Anleitung auf Deutsch, Nutzungsrecht für Fotos,
  Lieferbedingungen (wer zahlt Zoll und Einfuhrumsatzsteuer, IOSS, echte Lieferzeit)
- Muster bestellen: eigene Fotos, Typenschild, Stecker und Leistung prüfen, jede Werbeaussage belegen
- Eigenmarke bedeutet Herstellerpflichten (technische Unterlagen, Konformitätserklärung auf den eigenen Namen). Entscheiden, ob der
  Shop als Händler einer fremden Marke oder mit eigener Marke auftritt
- Firma anmelden, Finanzamt, Steuerberater (Direktlieferung aus Drittland, Einfuhrumsatzsteuer), Impressum mit ladungsfähiger
  Anschrift (ein Postfach reicht nicht), Versicherung (Betriebs- und Produkthaftpflicht), Rechtstexte-Dienst mit Abmahnschutz
  oder Anwalt-Check des fertigen Shops
- Zahlung anbinden oder auf ein Shopsystem wechseln, Testbestellungen auf dem echten Server
- Plan für Abmahnungen: nie ignorieren, die vorformulierte Unterlassungserklärung nicht ohne Anwalt unterschreiben, Fristen beachten
