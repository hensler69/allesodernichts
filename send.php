<?php
// Kontaktformular: nimmt die Eingaben entgegen und schickt sie per E-Mail an den Betreiber.
// Läuft auf normalem PHP-Hosting, braucht keine Zusatzprogramme.

declare(strict_types=1);

// ---- Einstellungen -------------------------------------------------------
const EMPFAENGER       = 'mh21manuel@icloud.com'; // Hierhin gehen die Anfragen
const MAX_ANFRAGEN     = 3;    // so viele Nachrichten pro Zeitfenster und Absender
const ZEITFENSTER_SEK  = 600;  // Zeitfenster: 10 Minuten
const WEITERLEITUNG    = '/';  // Zielseite, wenn JavaScript im Browser aus ist

header('X-Content-Type-Options: nosniff');

// ---- Hilfsfunktionen -----------------------------------------------------

// Antwort als JSON (für das Formular mit JavaScript) oder als Weiterleitung (ohne JavaScript)
function antworten(int $code, string $status, string $fehler = ''): void
{
    $will_json = (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch');
    if ($will_json) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $status === 'ok', 'fehler' => $fehler], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: ' . WEITERLEITUNG . '?status=' . $status . '#kontakt', true, 303);
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

// Nachrichtentext: Zeilenumbrüche bleiben erlaubt, andere Steuerzeichen fliegen raus
function text_bereinigen(string $wert, int $max): string
{
    if (!mb_check_encoding($wert, 'UTF-8')) {
        return '';
    }
    $wert = str_replace(["\r\n", "\r"], "\n", $wert);
    $wert = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $wert) ?? '';
    return mb_substr(trim($wert), 0, $max);
}

// Ratenbegrenzung: pro Absender nur MAX_ANFRAGEN je Zeitfenster.
// Gespeichert wird nur ein nicht rückrechenbarer Prüfwert, nie die IP selbst.
function zu_viele_anfragen(): bool
{
    $ordner = rtrim(sys_get_temp_dir(), '/\\') . '/formular-bremse';
    if (!is_dir($ordner)) {
        @mkdir($ordner, 0700, true);
    }
    $jetzt = time();
    $schluessel = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unbekannt') . '|' . __FILE__);
    $datei = $ordner . '/' . $schluessel;

    // Ab und zu alte Dateien aufräumen
    if (random_int(1, 50) === 1) {
        foreach (glob($ordner . '/*') ?: [] as $alt) {
            if (is_file($alt) && $jetzt - (int) filemtime($alt) > ZEITFENSTER_SEK) {
                @unlink($alt);
            }
        }
    }

    $fp = @fopen($datei, 'c+');
    if ($fp === false) {
        return false; // Wenn der Speicher nicht geht, lieber die Mail durchlassen
    }
    flock($fp, LOCK_EX);
    $inhalt = stream_get_contents($fp);
    $zeiten = array_filter(
        array_map('intval', $inhalt === false || $inhalt === '' ? [] : explode(',', $inhalt)),
        static fn (int $t): bool => $jetzt - $t < ZEITFENSTER_SEK
    );
    $gesperrt = count($zeiten) >= MAX_ANFRAGEN;
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

// ---- Ablauf --------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Nur POST erlaubt.');
}

// Anfragen von fremden Seiten ablehnen
$host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
$herkunft = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($herkunft !== '' && strtolower((string) parse_url($herkunft, PHP_URL_HOST)) !== preg_replace('/:\d+$/', '', $host)) {
    antworten(403, 'fehler', 'Anfrage nicht erlaubt.');
}

// Unsichtbarer Spamschutz (Honeypot): Menschen sehen das Feld nicht, Spam-Programme füllen es aus.
// Dem Programm wird trotzdem "alles gut" gemeldet, damit es nicht dazulernt.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    antworten(200, 'ok');
}

// Eingaben bereinigen
$name     = kopfzeile_bereinigen((string) ($_POST['name'] ?? ''), 100);
$email    = kopfzeile_bereinigen((string) ($_POST['email'] ?? ''), 150);
$thema    = kopfzeile_bereinigen((string) ($_POST['thema'] ?? ''), 60);
$nachricht = text_bereinigen((string) ($_POST['nachricht'] ?? ''), 4000);
$zugestimmt = ($_POST['datenschutz'] ?? '') === 'ja';

$erlaubte_themen = ['Noch offen', 'Vorsorge und Absicherung', 'Haus, Auto und Alltag', 'Beruf und Gewerbe'];
if (!in_array($thema, $erlaubte_themen, true)) {
    $thema = 'Noch offen';
}

// Prüfen
if ($name === '' || $nachricht === '' || !$zugestimmt) {
    antworten(422, 'fehler', 'Bitte füllen Sie alle Felder aus und setzen Sie das Häkchen.');
}
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    antworten(422, 'fehler', 'Bitte prüfen Sie Ihre E-Mail-Adresse.');
}

// Ratenbegrenzung
if (zu_viele_anfragen()) {
    antworten(429, 'zuoft', 'Zu viele Nachrichten in kurzer Zeit.');
}

// Mail zusammenbauen. In Kopfzeilen kommt nur Bereinigtes oder Festes.
$absender_domain = preg_replace('/[^a-z0-9.\-]/', '', preg_replace('/^www\./', '', preg_replace('/:\d+$/', '', $host)) ?? '') ?? '';
if ($absender_domain === '' || strpos($absender_domain, '.') === false) {
    $absender_domain = 'example.de';
}
$betreff = 'Neue Anfrage über die Website: ' . $name;
$betreff_kodiert = mb_encode_mimeheader(kopfzeile_bereinigen($betreff, 200), 'UTF-8', 'B', "\r\n");

$text  = "Neue Anfrage über das Kontaktformular\n";
$text .= "--------------------------------------\n";
$text .= "Name:   " . $name . "\n";
$text .= "E-Mail: " . $email . "\n";
$text .= "Thema:  " . $thema . "\n\n";
$text .= "Nachricht:\n" . $nachricht . "\n\n";
$text .= "--------------------------------------\n";
$text .= "Gesendet am " . date('d.m.Y, H:i') . " Uhr. Zum Antworten einfach auf diese Mail antworten.\n";

$kopfzeilen = [
    'From'                      => 'Webformular <formular@' . $absender_domain . '>',
    'Reply-To'                  => $email, // geprüfte Adresse, enthält keine Zeilenumbrüche
    'MIME-Version'              => '1.0',
    'Content-Type'              => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];

$gesendet = mail(EMPFAENGER, $betreff_kodiert, $text, $kopfzeilen);

if ($gesendet) {
    antworten(200, 'ok');
}
antworten(500, 'fehler', 'Die Nachricht konnte nicht gesendet werden. Bitte schreiben Sie direkt per E-Mail.');
