<?php
// Zentrale Annahmestelle des Shops: Bestellung, Newsletter-Anmeldung (mit Bestätigung) und Online-Widerruf.
// Läuft auf normalem PHP-Hosting, braucht keine Zusatzprogramme.
//
// Schutzmaßnahmen: unsichtbares Honeypot-Feld, Ratenbegrenzung, Herkunftsprüfung,
// Zeilenumbrüche und Steuerzeichen werden aus allem entfernt, was in Mail-Kopfzeilen landet,
// Preise werden hier noch einmal vom Server berechnet.

declare(strict_types=1);
date_default_timezone_set('Europe/Berlin');
header('X-Content-Type-Options: nosniff');

// ---- Einstellungen -------------------------------------------------------
const SHOP_MAIL      = 'mh21manuel@icloud.com';  // Hierhin gehen Bestellungen, Widerrufe und Meldungen
const SHOP_NAME      = 'HELIA';
const GEHEIMNIS      = 'VOR-DER-VEROEFFENTLICHUNG-DURCH-EINEN-LANGEN-ZUFALLSTEXT-ERSETZEN'; // signiert Bestätigungslinks
const GUTSCHEIN_CODE = 'SONNE10';
const GUTSCHEIN_PROZ = 10;
const PREIS_EINF     = ['einzeln' => 4990, 'set' => 8480];   // in Cent
const PREIS_NORMAL   = ['einzeln' => 5990, 'set' => 10180];
const EINFUEHRUNG_BIS = '2026-11-30 23:59:59';
const VERSAND        = 490;
const GRATIS_AB      = 5900;
const MAX_MENGE      = 5;
const LIMITS         = ['bestellung' => 5, 'newsletter' => 3, 'widerruf' => 3, 'bewertung' => 3]; // pro Zeitfenster
const ZEITFENSTER    = 600;
const LINK_GUELTIG   = 172800; // Bestätigungslink 48 Stunden

// ---- Hilfsfunktionen -----------------------------------------------------

function wills_json(): bool
{
    return (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch');
}

// Antwort als JSON (Formular mit JavaScript) oder als Weiterleitung (ohne JavaScript)
function antworten(int $code, bool $ok, string $fehler = '', array $extra = [], string $ziel = '/'): void
{
    if (wills_json()) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array_merge(['ok' => $ok, 'fehler' => $fehler], $extra), JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: ' . $ziel . ($ok ? '' : '?status=fehler'), true, 303);
    }
    exit;
}

// Entfernt Zeilenumbrüche und alle Steuerzeichen. Pflicht für alles, was in Mail-Kopfzeilen landet.
function kopfzeile_bereinigen(string $wert, int $max = 150): string
{
    if (!mb_check_encoding($wert, 'UTF-8')) {
        return '';
    }
    $wert = preg_replace('/[\x00-\x1F\x7F\x{0085}\x{2028}\x{2029}]+/u', ' ', $wert) ?? '';
    return mb_substr(trim($wert), 0, $max);
}

function mailadresse(string $roh): string
{
    $m = kopfzeile_bereinigen($roh, 150);
    if (filter_var($m, FILTER_VALIDATE_EMAIL) === false || preg_match('/[\s,;<>"]/', $m)) {
        return '';
    }
    return $m;
}

function host(): string
{
    $h = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    return preg_replace('/[^a-z0-9.\-:]/', '', $h) ?? '';
}

function absender_domain(): string
{
    $d = preg_replace('/^www\./', '', preg_replace('/:\d+$/', '', host()) ?? '') ?? '';
    return ($d === '' || strpos($d, '.') === false) ? 'example.de' : $d;
}

function schicken(string $an, string $betreff, string $text, string $antwort_an = ''): bool
{
    $betreff_kodiert = mb_encode_mimeheader(kopfzeile_bereinigen($betreff, 200), 'UTF-8', 'B', "\r\n");
    $kopf = [
        'From'                      => mb_encode_mimeheader(SHOP_NAME, 'UTF-8', 'B', "\r\n") . ' <shop@' . absender_domain() . '>',
        'MIME-Version'              => '1.0',
        'Content-Type'              => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => '8bit',
    ];
    if ($antwort_an !== '') {
        $kopf['Reply-To'] = $antwort_an; // geprüfte Adresse ohne Zeilenumbrüche
    }
    return mail($an, $betreff_kodiert, $text, $kopf);
}

// Ratenbegrenzung pro Absender und Formularart. Gespeichert wird nur ein nicht rückrechenbarer Prüfwert.
function zu_viele_anfragen(string $art): bool
{
    $ordner = rtrim(sys_get_temp_dir(), '/\\') . '/shop-bremse';
    if (!is_dir($ordner)) {
        @mkdir($ordner, 0700, true);
    }
    $jetzt = time();
    $datei = $ordner . '/' . hash('sha256', $art . '|' . ($_SERVER['REMOTE_ADDR'] ?? 'unbekannt') . '|' . __FILE__);

    if (random_int(1, 50) === 1) {
        foreach (glob($ordner . '/*') ?: [] as $alt) {
            if (is_file($alt) && $jetzt - (int) filemtime($alt) > ZEITFENSTER) {
                @unlink($alt);
            }
        }
    }
    $fp = @fopen($datei, 'c+');
    if ($fp === false) {
        return false;
    }
    flock($fp, LOCK_EX);
    $inhalt = stream_get_contents($fp);
    $zeiten = array_filter(
        array_map('intval', $inhalt === false || $inhalt === '' ? [] : explode(',', $inhalt)),
        static fn (int $t): bool => $jetzt - $t < ZEITFENSTER
    );
    $gesperrt = count($zeiten) >= (LIMITS[$art] ?? 3);
    if (!$gesperrt) {
        $zeiten[] = $jetzt;
    }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, implode(',', $zeiten));
    flock($fp, LOCK_UN);
    fclose($fp);
    return $gesperrt;
}

function euro(int $cent): string
{
    return number_format($cent / 100, 2, ',', '.') . ' €';
}

function signatur(string $mail, int $zeit): string
{
    return hash_hmac('sha256', strtolower($mail) . '|' . $zeit, GEHEIMNIS);
}

// ---- Bestätigungslink des Newsletters (GET) --------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET' && ($_GET['a'] ?? '') === 'bestaetigen') {
    $mail = mailadresse((string) ($_GET['e'] ?? ''));
    $zeit = (int) ($_GET['t'] ?? 0);
    $sig  = (string) ($_GET['s'] ?? '');
    $gueltig = $mail !== '' && $zeit > 0 && time() - $zeit < LINK_GUELTIG
        && hash_equals(signatur($mail, $zeit), $sig);
    if (!$gueltig) {
        http_response_code(400);
        header('Content-Type: text/plain; charset=utf-8');
        exit('Dieser Link ist ungültig oder abgelaufen. Bitte melden Sie sich erneut an.');
    }
    schicken($mail, 'Ihr Gutschein von ' . SHOP_NAME,
        "Vielen Dank, Ihre Anmeldung ist bestätigt.\n\n"
        . "Ihr Gutschein über " . GUTSCHEIN_PROZ . " % auf Ihre nächste Bestellung: " . GUTSCHEIN_CODE . "\n"
        . "Geben Sie ihn an der Kasse unter \"Gutscheincode\" ein.\n\n"
        . "Sie können den Newsletter jederzeit abbestellen: Antworten Sie einfach auf diese Mail.\n");
    schicken(SHOP_MAIL, 'Neue bestätigte Newsletter-Anmeldung', "Bestätigt am " . date('d.m.Y, H:i:s') . " Uhr: " . $mail . "\n");
    header('Location: /newsletter-bestaetigt', true, 303);
    exit;
}

// ---- Ab hier nur noch POST -------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Nur POST erlaubt.');
}

// Anfragen von fremden Seiten ablehnen
$herkunft = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($herkunft !== '' && strtolower((string) parse_url($herkunft, PHP_URL_HOST)) !== preg_replace('/:\d+$/', '', host())) {
    antworten(403, false, 'Anfrage nicht erlaubt.');
}

$art = (string) ($_POST['art'] ?? '');
if (!isset(LIMITS[$art])) {
    antworten(400, false, 'Unbekannte Anfrage.');
}

// Honeypot: Menschen sehen das Feld nicht, Spam-Programme füllen es aus. Dem Programm wird "alles gut" gemeldet.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    antworten(200, true, '', $art === 'bestellung' ? ['nr' => 'HL-00000000-000000'] : ['zeit' => date('d.m.Y, H:i:s') . ' Uhr']);
}

if (zu_viele_anfragen($art)) {
    antworten(429, false, 'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in ein paar Minuten noch einmal.');
}

// ---- Newsletter ----------------------------------------------------------

if ($art === 'newsletter') {
    $mail = mailadresse((string) ($_POST['email'] ?? ''));
    if ($mail === '' || ($_POST['einwilligung'] ?? '') !== 'ja') {
        antworten(422, false, 'Bitte E-Mail-Adresse eintragen und das Häkchen setzen.');
    }
    $zeit = time();
    $link = 'https://' . host() . '/send.php?a=bestaetigen&e=' . rawurlencode($mail) . '&t=' . $zeit . '&s=' . signatur($mail, $zeit);
    $ok = schicken($mail, 'Bitte bestätigen Sie Ihre Anmeldung bei ' . SHOP_NAME,
        "Hallo,\n\nSie (oder jemand mit Ihrer Adresse) haben sich für den Newsletter von " . SHOP_NAME . " angemeldet.\n"
        . "Bitte bestätigen Sie die Anmeldung mit diesem Link (48 Stunden gültig):\n\n" . $link . "\n\n"
        . "Danach schicken wir Ihnen Ihren Gutschein. Wenn Sie sich nicht angemeldet haben, ignorieren Sie diese Mail einfach.\n");
    $ok ? antworten(200, true) : antworten(500, false, 'Die Mail konnte nicht gesendet werden. Bitte versuchen Sie es später noch einmal.');
}

// ---- Bewertung -----------------------------------------------------------
// Bewertungen gehen nur zur Prüfung an den Shop. Veröffentlicht wird erst, wenn die Bestellnummer stimmt.

if ($art === 'bewertung') {
    $sterne = (int) ($_POST['sterne'] ?? 0);
    $titel  = kopfzeile_bereinigen((string) ($_POST['titel'] ?? ''), 80);
    $name   = kopfzeile_bereinigen((string) ($_POST['name'] ?? ''), 40);
    $mail   = mailadresse((string) ($_POST['email'] ?? ''));
    $nr     = strtoupper(kopfzeile_bereinigen((string) ($_POST['bestellnr'] ?? ''), 30));
    $roh    = (string) ($_POST['text'] ?? '');
    $text   = mb_check_encoding($roh, 'UTF-8') ? mb_substr(trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', str_replace(["\r\n", "\r"], "\n", $roh)) ?? ''), 0, 1500) : '';
    if ($sterne < 1 || $sterne > 5 || $titel === '' || $name === '' || $mail === '' || mb_strlen($text) < 20) {
        antworten(422, false, 'Bitte füllen Sie alle Felder aus (mindestens 20 Zeichen Text).');
    }
    if (!preg_match('/^HL-[0-9]{8}-[0-9A-F]{6}$/', $nr)) {
        antworten(422, false, 'Bitte geben Sie die Bestellnummer aus Ihrer Bestätigungsmail an, zum Beispiel HL-20261005-ABC123.');
    }
    if (($_POST['einwilligung'] ?? '') !== 'ja') {
        antworten(422, false, 'Bitte setzen Sie das Häkchen zur Veröffentlichung.');
    }
    $ok = schicken(SHOP_MAIL, 'Neue Bewertung zur Prüfung: ' . $sterne . ' Sterne',
        "NEUE BEWERTUNG (noch nicht veröffentlicht)\n\nSterne: $sterne von 5\nÜberschrift: $titel\nName: $name\nE-Mail: $mail\nBestellnummer: $nr\n"
        . "Eingegangen am " . date('d.m.Y, H:i:s') . " Uhr\n\nText:\n$text\n\n"
        . "Bitte Bestellnummer prüfen. Erst danach in index.html im Block bewertungen-daten eintragen (beispiel: false).\n", $mail);
    $ok ? antworten(200, true) : antworten(500, false, 'Die Bewertung konnte nicht gesendet werden. Bitte versuchen Sie es später noch einmal.');
}

// ---- Widerruf ------------------------------------------------------------

if ($art === 'widerruf') {
    $name  = kopfzeile_bereinigen((string) ($_POST['name'] ?? ''), 100);
    $mail  = mailadresse((string) ($_POST['email'] ?? ''));
    $nr    = kopfzeile_bereinigen((string) ($_POST['bestellnr'] ?? ''), 60);
    $ware  = kopfzeile_bereinigen((string) ($_POST['ware'] ?? ''), 120);
    if ($name === '' || $mail === '' || $nr === '') {
        antworten(422, false, 'Bitte Name, E-Mail-Adresse und Bestellnummer angeben.');
    }
    $zeitpunkt = date('d.m.Y, H:i:s') . ' Uhr';
    $text = "Hiermit erklärt $name den Widerruf des Vertrags.\n\nBestellung: $nr\nWare: " . ($ware !== '' ? $ware : 'alle Waren dieser Bestellung') . "\nEingegangen am: $zeitpunkt\n";
    $a = schicken($mail, 'Eingang Ihres Widerrufs', "Guten Tag $name,\n\nwir bestätigen den Eingang Ihres Widerrufs.\n\n" . $text . "\nWir melden uns mit den nächsten Schritten.\n");
    $b = schicken(SHOP_MAIL, 'Widerruf: ' . $nr, "WIDERRUF\n\n" . $text . "E-Mail: $mail\n", $mail);
    ($a || $b) ? antworten(200, true, '', ['zeit' => $zeitpunkt]) : antworten(500, false, 'Der Widerruf konnte nicht gesendet werden. Bitte schreiben Sie uns direkt per E-Mail.');
}

// ---- Bestellung ----------------------------------------------------------

$vorname  = kopfzeile_bereinigen((string) ($_POST['vorname'] ?? ''), 60);
$nachname = kopfzeile_bereinigen((string) ($_POST['nachname'] ?? ''), 60);
$strasse  = kopfzeile_bereinigen((string) ($_POST['strasse'] ?? ''), 100);
$plz      = kopfzeile_bereinigen((string) ($_POST['plz'] ?? ''), 5);
$ort      = kopfzeile_bereinigen((string) ($_POST['ort'] ?? ''), 60);
$mail     = mailadresse((string) ($_POST['email'] ?? ''));
$zahlart  = (string) ($_POST['zahlart'] ?? '');
$menge    = [
    'einzeln' => max(0, min(MAX_MENGE, (int) ($_POST['einzeln'] ?? 0))),
    'set'     => max(0, min(MAX_MENGE, (int) ($_POST['set'] ?? 0))),
];

if ($vorname === '' || $nachname === '' || $strasse === '' || $ort === '' || !preg_match('/^[0-9]{5}$/', $plz)) {
    antworten(422, false, 'Bitte füllen Sie die Lieferadresse vollständig aus.');
}
if ($mail === '') {
    antworten(422, false, 'Bitte prüfen Sie Ihre E-Mail-Adresse.');
}
if (!in_array($zahlart, ['PayPal', 'Klarna'], true)) {
    antworten(422, false, 'Bitte wählen Sie eine Zahlungsart.');
}
if (($_POST['agb'] ?? '') !== 'ja') {
    antworten(422, false, 'Bitte bestätigen Sie die AGB und die Widerrufsbelehrung.');
}
if ($menge['einzeln'] + $menge['set'] === 0) {
    antworten(422, false, 'Ihr Warenkorb ist leer.');
}

// Preise rechnet der Server selbst. Was der Browser schickt, zählt nur als Menge.
$einfuehrung = time() <= strtotime(EINFUEHRUNG_BIS);
$preise = $einfuehrung ? PREIS_EINF : PREIS_NORMAL;
$waren = $menge['einzeln'] * $preise['einzeln'] + $menge['set'] * $preise['set'];
$gutschein_ok = strtoupper(trim((string) ($_POST['gutschein'] ?? ''))) === GUTSCHEIN_CODE;
$nachlass = $gutschein_ok ? (int) round($waren * GUTSCHEIN_PROZ / 100) : 0;
$versand = ($waren - $nachlass) >= GRATIS_AB ? 0 : VERSAND;
$gesamt = $waren - $nachlass + $versand;
$mwst = (int) round($gesamt - $gesamt / 1.19);

$nr = 'HL-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));

$zeilen = '';
if ($menge['einzeln'] > 0) {
    $zeilen .= $menge['einzeln'] . ' x HELIA (je ' . euro($preise['einzeln']) . ") = " . euro($menge['einzeln'] * $preise['einzeln']) . "\n";
}
if ($menge['set'] > 0) {
    $zeilen .= $menge['set'] . ' x HELIA 2er-Set (je ' . euro($preise['set']) . ") = " . euro($menge['set'] * $preise['set']) . "\n";
}
$summe  = $zeilen;
$summe .= $nachlass > 0 ? 'Gutschein ' . GUTSCHEIN_CODE . ': -' . euro($nachlass) . "\n" : '';
$summe .= 'Versand: ' . ($versand > 0 ? euro($versand) : 'kostenlos') . "\n";
$summe .= 'Gesamt inkl. 19 % MwSt.: ' . euro($gesamt) . ' (darin MwSt. ' . euro($mwst) . ")\n";
$adresse = "$vorname $nachname\n$strasse\n$plz $ort\nDeutschland";

$kunde = schicken($mail, 'Eingang Ihrer Bestellung ' . $nr,
    "Guten Tag $vorname $nachname,\n\nvielen Dank für Ihre Bestellung bei " . SHOP_NAME . ". Wir haben sie erhalten.\n"
    . "Diese Mail ist noch keine Annahme Ihrer Bestellung. Der Vertrag kommt zustande, sobald wir den Versand bestätigen.\n\n"
    . "Bestellnummer: $nr\nZahlungsart: $zahlart (den Zahlungslink schicken wir Ihnen separat)\n\n"
    . "Ihre Bestellung\n---------------\n$summe\nLieferadresse\n-------------\n$adresse\n\n"
    . "Allgemeine Geschäftsbedingungen: https://" . host() . "/agb\n"
    . "Widerrufsbelehrung und Muster-Widerrufsformular: https://" . host() . "/widerrufsbelehrung\n"
    . "Online widerrufen: https://" . host() . "/widerrufen\n");
$shop = schicken(SHOP_MAIL, 'Neue Bestellung ' . $nr,
    "NEUE BESTELLUNG $nr\nEingegangen am " . date('d.m.Y, H:i:s') . " Uhr\n\n$summe\nZahlungsart: $zahlart\nE-Mail: $mail\n\n$adresse\n", $mail);

($kunde || $shop)
    ? antworten(200, true, '', ['nr' => $nr], '/danke?nr=' . rawurlencode($nr))
    : antworten(500, false, 'Die Bestellung konnte nicht gesendet werden. Bitte schreiben Sie uns direkt per E-Mail.');
