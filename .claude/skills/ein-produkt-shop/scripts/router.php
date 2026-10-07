<?php
// Router für den PHP-Testserver: bildet die sauberen Adressen der .htaccess nach (/kasse -> kasse.html).
$p = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$root = $_SERVER['DOCUMENT_ROOT'];
if ($p === '/') { readfile("$root/index.html"); return true; }
if (file_exists("$root$p") && !is_dir("$root$p")) { return false; }
if (file_exists("$root$p.html")) { header('Content-Type: text/html; charset=utf-8'); readfile("$root$p.html"); return true; }
http_response_code(404); echo "404";
