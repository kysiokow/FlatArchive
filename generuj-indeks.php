<?php
// Wyłączenie cache
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
// Ustawienie strefy czasowej i kodowania
date_default_timezone_set('Europe/Warsaw');

// Wczytanie pliku konfiguracyjnego
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
} else {
    define('API_JSONCREATE_KEY', '');
}

// Sprawdzenie klucza bezpieczeństwa
if (defined('API_JSONCREATE_KEY') && API_JSONCREATE_KEY !== '') {
    $pobranyKlucz = $_GET['key'] ?? '';
    if ($pobranyKlucz !== API_JSONCREATE_KEY) {
        http_response_code(403);
        echo "Brak dostępu";
        exit;
    }
}

header('Content-Type: text/html; charset=utf-8');

$contentDir = __DIR__ . '/content';
$mediaDir   = __DIR__ . '/media';
$outputFile = __DIR__ . '/index.json';

// 1. Funkcja szukająca załączników w folderze media dla danej daty
// 1. Funkcja generująca same LINKI do załączników w folderze media
function pobierzZalaczniki($rok, $miesiac, $dzien, $mediaDir) {
    $mediaPath = $mediaDir . '/' . $rok . '/' . $miesiac . '/' . $dzien;
    if (!is_dir($mediaPath)) {
        return '';
    }

    $pliki = array_diff(scandir($mediaPath), array('.', '..'));
    if (empty($pliki)) {
        return '';
    }

    $htmlZalacznikow = "\n\n---\n### 📎 Załączniki i Media\n<div class=\"media-attachments\">\n<ul>\n";

    foreach ($pliki as $plik) {
        $ext = strtolower(pathinfo($plik, PATHINFO_EXTENSION));
        $relSciezka = "media/$rok/$miesiac/$dzien/$plik";

        // Dopasowanie ikony do typu pliku dla czytelności
        if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
            $ikona = '🖼️';
        } elseif (in_array($ext, ['mp4', 'webm', 'ogg'])) {
            $ikona = '🎬';
        } elseif ($ext === 'pdf') {
            $ikona = '📄';
        } else {
            $ikona = '📁';
        }

        // Generujemy czysty link z otwartością w nowej karcie (target="_blank")
        $htmlZalacznikow .= "  <li>$ikona <a href=\"$relSciezka\" target=\"_blank\">$plik</a></li>\n";
    }

    $htmlZalacznikow .= "</ul>\n</div>";
    return $htmlZalacznikow;
}

// 2. Funkcja do rekurencyjnego wyszukiwania plików .md
function pobierzPlikiMarkdown($dirPath, &$arrayOfFiles = array()) {
    if (!is_dir($dirPath)) return $arrayOfFiles;
    
    $files = array_diff(scandir($dirPath), array('.', '..'));

    foreach ($files as $file) {
        $fullPath = $dirPath . '/' . $file;
        if (is_dir($fullPath)) {
            pobierzPlikiMarkdown($fullPath, $arrayOfFiles);
        } elseif (substr($file, -3) === '.md') {
            $arrayOfFiles[] = $fullPath;
        }
    }

    return $arrayOfFiles;
}

// 3. Parsowanie pojedynczego pliku .md
function parsujPlikMarkdown($filePath, $mediaDir) {
    $rawText = file_get_contents($filePath);
    $lines = explode("\n", $rawText);

    $dataWpisu = '';
    $dzisiejszeArtykuly = array();
    $aktualnyArtykul = null;

    foreach ($lines as $line) {
        $trimmed = trim($line);

        if (strpos($trimmed, '# ') === 0 && empty($dataWpisu)) {
            $dataWpisu = trim(substr($trimmed, 2));
        } elseif (strpos($trimmed, '## ') === 0) {
            if ($aktualnyArtykul !== null) {
                $dzisiejszeArtykuly[] = $aktualnyArtykul;
            }

            $tytul = trim(substr($trimmed, 3));
            
            // Generowanie sługa/kotwicy dla polskich znaków
            $slug = mb_strtolower($tytul, 'UTF-8');
            $slug = preg_replace('/[^\w\x{0400}-\x{04FF}]+/u', '-', $slug);
            $kotwica = '#' . trim($slug, '-');

            $aktualnyArtykul = array(
                'data' => $dataWpisu,
                'tytul' => $tytul,
                'kotwica' => $kotwica,
                'tresc' => ''
            );
        } elseif ($aktualnyArtykul !== null) {
            $aktualnyArtykul['tresc'] .= $line . ' ';
        }
    }

    if ($aktualnyArtykul !== null) {
        $dzisiejszeArtykuly[] = $aktualnyArtykul;
    }

    // Doklejanie załączników z media/ do ostatniego wpisu przetworzonego z tego dnia
    if (!empty($dataWpisu) && count($dzisiejszeArtykuly) > 0) {
        $daty = explode('-', $dataWpisu);
        if (count($daty) === 3) {
            list($rok, $miesiac, $dzien) = $daty;
            $doklejkaMedia = pobierzZalaczniki($rok, $miesiac, $dzien, $mediaDir);
            if (!empty($doklejkaMedia)) {
                $dzisiejszeArtykuly[count($dzisiejszeArtykuly) - 1]['tresc'] .= $doklejkaMedia;
            }
        }
    }

    // Czyszczenie nadmiarowych spacji
    foreach ($dzisiejszeArtykuly as &$art) {
        $art['tresc'] = trim(preg_replace('/\s+/', ' ', $art['tresc']));
    }

    return $dzisiejszeArtykuly;
}

// 4. Główna funkcja generująca
function generujIndeks($contentDir, $mediaDir, $outputFile) {
    $pliki = pobierzPlikiMarkdown($contentDir);
    $calyIndeks = array();

    foreach ($pliki as $plik) {
        $wpisy = parsujPlikMarkdown($plik, $mediaDir);
        $calyIndeks = array_merge($calyIndeks, $wpisy);
    }

    // Sortowanie wpisów od najnowszych
    usort($calyIndeks, function($a, $b) {
        return strcmp($b['data'], $a['data']);
    });

    // Zapis do JSON z ładnym formatowaniem i UTF-8
    $json = json_encode($calyIndeks, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    file_put_contents($outputFile, $json);

    echo "✅ Indeks JSON został pomyślnie wygenerowany! Zaktualizowano " . count($calyIndeks) . " artykułów.\n";
}

// Uruchomienie skryptu
generujIndeks($contentDir, $mediaDir, $outputFile);