# Produkt, Preise und Name

## Recherche: welches Produkt?
Nur nötig, wenn der Nutzer noch kein Produkt hat ("winning product", "durchforste Trends").
1. Websuche (mehrere Suchen in einer Runde): aktuelle Nischen- und Trendprodukte, Suchvolumen-Trends (zum Beispiel
   Google Trends, Exploding Topics, Berichte von Shopify oder Statista), Marktwachstum in Deutschland, Preisband bei
   Amazon, Otto und Fachhändlern.
2. Drei bis fünf Kandidaten in einer kleinen Tabelle bewerten:
   | Produkt | Nachfrage (Beleg) | Preisband DE | Marge möglich | Rechtsrisiko | Zeigbarkeit auf der Seite |
3. Rechtsrisiko ernst nehmen (siehe `recht-de.md`, Abschnitt 6): Produkte, die nur mit Gesundheitsversprechen verkauft werden,
   abwählen. Elektro geht, braucht aber WEEE und CE.
4. "Zeigbarkeit": Ein Produkt, das man auf der Seite erlebbar machen kann (Licht, Klang, Bewegung, Zeit), trägt eine
   animierte Seite viel besser. Beim Lichtwecker war das die Tag-Nacht-Simulation.
5. Empfehlung zuerst, mit Quellen. Dann über das Auswahl-Widget fragen.

Beispiel aus dem HELIA-Projekt: Lichtwecker (stark wachsende Suchen, Schlaftechnik-Markt DE wächst jährlich zweistellig,
Preise 27 bis 190 €). LED-Masken wurden wegen Abmahnrisiko (Heilmittelwerbegesetz) verworfen.

## Preise
- Preisband aus der Recherche nehmen und in der oberen Mitte einsteigen: wertig, aber nicht teurer als Markenware.
  Preise auf ,90 oder ,99 enden lassen.
- Bewährtes Paket (für die meisten Geräte und Geschenkartikel passend):
  - Einzelpreis als Einführungspreis mit Enddatum, danach ein genannter Normalpreis (etwa 20 % höher).
  - 2er-Set mit ehrlichem Vergleich zum Einzelpreis (etwa 15 % günstiger), Versand dafür kostenlos.
    Gibt einen guten Grund ("für zwei Zimmer oder zum Verschenken").
  - Versand 4,90 €, kostenlos ab einer Schwelle knapp über dem Einzelpreis (bei 49,90 € zum Beispiel ab 59 €).
    Der Warenkorb zeigt "Noch X € bis zum kostenlosen Versand".
  - Newsletter-Gutschein 10 % nach bestätigter Anmeldung.
  - Höchstmenge pro Bestellung (zum Beispiel 5), im Browser und auf dem Server.
- Nichts davon mit Streichpreis, Fake-Countdown oder "nur heute" (siehe `recht-de.md`).
- Preise stehen an drei Stellen und müssen gleich sein: `assets/script.js` (PRODUKTE), `send.php` (PREIS_EINF, PREIS_NORMAL),
  Texte und JSON-LD in den Generator-Dateien. Nach jeder Preisänderung alle drei prüfen.

## Name
Ein guter Shop-Name ist kurz (4 bis 6 Buchstaben), leicht auszusprechen, hat eine Bedeutung, die zum Gefühl des Produkts
passt, und ist nicht beschreibend-gewöhnlich. "DÄMMER" klang dem Nutzer "zu 0815", "HELIA" (griechisch helios, Sonne)
passte. So vorgehen:
1. Fünf bis acht Vorschläge aus Bildern rund um die Wirkung des Produkts (Licht, Ruhe, Wärme, Klang ...), aus Latein,
   Griechisch, Skandinavisch, Kunstwörtern. Keine Umlaute im Namen, wenn er auch als Domain dienen soll.
2. Jeden Vorschlag per Websuche gegen bestehende Produkte derselben Art prüfen. Ähnlicher Klang in derselben Warengruppe
   fällt raus.
3. Zwei bis drei Favoriten mit Bedeutung und Ergebnis der Prüfung vorstellen, Empfehlung zuerst.
4. Nach der Wahl überall umbenennen: Ordner, Titel, Texte, JSON-LD, Firma (erfunden: "<Name> GmbH"), Modell (zum Beispiel
   HL-1), Bestellnummer-Präfix, Speicher-Schlüssel im Browser (`<name>-korb`), Domain `<name>.example`, Logo, Favicon,
   Vorschaubild, Notizen.
5. Hinweis an den Nutzer: vor echter Nutzung beim DPMA und EUIPO prüfen lassen.
