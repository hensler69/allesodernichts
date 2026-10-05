#!/bin/bash
# Startet den PHP-Testserver für einen Shop-Ordner. Mails landen in einer Textdatei statt im Postfach.
# Aufruf:  bash server_starten.sh <shop-ordner> [port] [arbeitsordner]
# Beispiel: bash server_starten.sh shops/neu 8092 "$SCRATCH"
# Achtung: Prozesse nie mit "pkill -f <muster>" beenden, das Muster trifft auch die eigene Shell.
set -e
SHOP="$(cd "$1" && pwd)"; PORT="${2:-8092}"; ARBEIT="${3:-/tmp}"
HIER="$(cd "$(dirname "$0")" && pwd)"
cat > "$ARBEIT/fakemail.sh" <<EOS
#!/bin/bash
cat >> "$ARBEIT/mails.txt"
echo "=====MAILEND=====" >> "$ARBEIT/mails.txt"
EOS
chmod +x "$ARBEIT/fakemail.sh"
if curl -s -o /dev/null "http://127.0.0.1:$PORT/"; then echo "Port $PORT ist schon belegt (Server läuft?)"; exit 0; fi
(nohup php -d sendmail_path="$ARBEIT/fakemail.sh" -S "127.0.0.1:$PORT" -t "$SHOP" "$HIER/router.php" > "$ARBEIT/php.log" 2>&1 &)
for i in $(seq 1 20); do curl -s -o /dev/null "http://127.0.0.1:$PORT/" && break; sleep 0.3; done
echo "Server: http://127.0.0.1:$PORT/  (Mails: $ARBEIT/mails.txt, Log: $ARBEIT/php.log)"
