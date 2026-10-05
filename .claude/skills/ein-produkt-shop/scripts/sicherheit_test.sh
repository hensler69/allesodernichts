#!/bin/bash
# Prüft send.php auf dem lokalen Testserver: fremde Herkunft, Honeypot, eingeschleuste Mail-Kopfzeilen,
# Preis-Manipulation, Ratenbegrenzung. Mails landen in <arbeitsordner>/mails.txt (siehe server_starten.sh).
# Aufruf: bash sicherheit_test.sh [basis-url] [arbeitsordner]
# Passt zur Referenz-send.php (Felder vorname, nachname, strasse, plz, ort, email, zahlart, agb, einzeln, set).
# Bei anderen Feldnamen oder Zahlarten die Aufrufe unten anpassen.
B="${1:-http://127.0.0.1:8092}"; A="${2:-/tmp}"; M="$A/mails.txt"
rm -rf "$(php -r 'echo sys_get_temp_dir();')/shop-bremse"   # Ratenbegrenzung für den Test zurücksetzen (nur lokal!)
: > "$M"
post() { curl -s -o /dev/null -w "%{http_code}" -H "X-Requested-With: fetch" "$@" "$B/send.php"; }
ok=0; schlecht=0
pruef() { if [ "$2" = "$3" ]; then echo "OK      $1 ($2)"; ok=$((ok+1)); else echo "FEHLER  $1: erwartet $3, bekommen $2"; schlecht=$((schlecht+1)); fi; }

pruef "Fremde Herkunft wird abgelehnt" "$(post -H 'Origin: https://boese.example' -d art=newsletter -d email=a@example.com -d einwilligung=ja)" 403
pruef "Honeypot meldet Erfolg, schickt aber nichts" "$(post -d art=newsletter -d website=spam -d email=a@example.com -d einwilligung=ja)" 200
[ -s "$M" ] && { echo "FEHLER  Honeypot hat trotzdem eine Mail verschickt"; schlecht=$((schlecht+1)); } || { echo "OK      keine Mail beim Honeypot"; ok=$((ok+1)); }
pruef "Mailadresse mit Zeilenumbruch wird abgelehnt" "$(post -d art=newsletter --data-urlencode $'email=a@example.com\r\nBcc: opfer@example.com' -d einwilligung=ja)" 422
pruef "Bestellung mit Kopfzeilen-Versuch im Namen und gefälschtem Preis" "$(post -d art=bestellung --data-urlencode $'vorname=Eva\r\nBcc: opfer@example.com' -d nachname=Test -d 'strasse=Weg 1' -d plz=04109 -d ort=Leipzig -d email=eva@example.com -d zahlart=PayPal -d agb=ja -d einzeln=1 -d preis=1 -d gesamt=0,01)" 200
if grep -qi "^Bcc:" "$M"; then echo "FEHLER  eingeschleuste Bcc-Kopfzeile in der Mail"; schlecht=$((schlecht+1)); else echo "OK      keine eingeschleuste Kopfzeile"; ok=$((ok+1)); fi
grep -q "0,01" "$M" && { echo "FEHLER  gefälschter Preis landet in der Mail"; schlecht=$((schlecht+1)); } || { echo "OK      Server rechnet den Preis selbst: $(grep -m1 'Gesamt' "$M")"; ok=$((ok+1)); }
pruef "Leere Bestellung wird abgelehnt" "$(post -d art=bestellung -d vorname=Eva -d nachname=Test -d 'strasse=Weg 1' -d plz=04109 -d ort=Leipzig -d email=eva@example.com -d zahlart=PayPal -d agb=ja)" 422
letzter=""
for i in 1 2 3 4 5 6; do letzter="$(post -d art=widerruf -d name=Eva -d email=eva@example.com -d bestellnr=XX-1)"; done
pruef "Ratenbegrenzung greift" "$letzter" 429
echo "$ok bestanden, $schlecht Fehler."
[ "$schlecht" = 0 ]
