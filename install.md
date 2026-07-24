# 🛠️ Instrukcja Instalacji i Konfiguracji FlatArchive

Poniższy przewodnik opisuje, jak uruchomić aplikację **FlatArchive** w środowisku lokalnym (Node.js) oraz na produkcyjnym serwerze WWW (PHP).

---

## 💻 Dział 1: Uruchomienie lokalne (Node.js)

To podejście jest idealne do lokalnego testowania, tworzenia wpisów na własnym komputerze lub pracy bez serwera PHP.

### Krok 1: Wymagania
* Zainstalowane środowisko **Node.js** (wersja 14 lub nowsza).

### Krok 2: Przygotowanie plików
1. Pobierz lub sklonuj repozytorium na swój dysk.
2. Przygotuj strukturę folderów dla notatek i załączników:
   * Artykuły: `content/YYYY/MM/DD/YYYYMMDD.md`
   * Media: `media/YYYY/MM/DD/plik.jpg`

### Krok 3: Generowanie pliku `index.json`
Otwórz terminal (Command Prompt / PowerShell / Terminal) w głównym katalogu projektu i wykonaj polecenie:

```bash
node generuj-indeks.js

```

Skrypt przeskanuje foldery `content/` oraz `media/`, po czym wygeneruje zaktualizowany plik `index.json`.

### Krok 4: Uruchomienie w przeglądarce

Otwórz plik `index.html` bezpośrednio w przeglądarce internetowej lub użyj prostego serwera lokalnego (np. rozszerzenia *Live Server* w VS Code, lub wpisz w zkonsoli w katalogu main : python -m http.server 8000,a w przegladarce jako adres podaj localhost).

---

## 🌐 Dział 2: Uruchomienie na serwerze WWW (PHP)

To podejście umożliwia wygodną pracę na serwerze hostingowym i regenerację indeksu jednym kliknięciem z poziomu przeglądarki.

### Krok 1: Wymagania

* Serwer WWW z obsługą **PHP 7.4+** (np. OpenHost, LH, CyberFolks itp.).

### Krok 2: Wrzuć pliki na serwer

Przesłij pliki projektu na serwer FTP do wybranego katalogu (np. `public_html/ARCH/`):

* `index.html`
* `style.css`
* `app.js`
* `generuj-indeks.php`
* `welcome.md`
* Katalogi `content/` oraz `media/`

### Krok 3: Konfiguracja hasła autoryzacyjnego (`config.php`)

Aby zabezpieczyć skrypt PHP przed niepowołanym wywołaniem przez osoby trzecie lub boty, musisz utworzyć plik konfiguracyjny z własnym kluczem autoryzacji:

1. W głównym katalogu na serwerze utwórz plik o nazwie **`config.php`** .
2. Wpisz w nim swoje tajne hasło:

```php
<?php
// Twój tajny klucz autoryzacji dla generatora JSON
define('API_JSONCREATE_KEY', 'MojeSuperTajneHaslo123');

```

> ⚠️ **Ważne:** Plik `config.php` jest wykonywany po stronie serwera, co oznacza, że Twoje hasło nie jest widoczne dla czytelników strony ani w kodzie źródłowym HTML/JS.

### Krok 4: Używanie generatora na stronie

1. Wejdź na swoją stronę w przeglądarce (np. `https://twoja-domena.pl/ARCH/`).
2. Kliknij niebieski przycisk na dole panelu bocznego: **🔄 Przelicz indeks (JSON)**.
3. W oknie dialogowym, które się pojawi, wpisz hasło zdefiniowane wcześniej w pliku `config.php` (np. `MojeSuperTajneHaslo123`).
4. Po poprawnej weryfikacji skrypt PHP wygeneruje plik `index.json`, a interfejs natychmiast odświeży drzewo nawigacji.

```

```
