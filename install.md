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

# 🛠️ FlatArchive Installation and Configuration Guide

The following guide describes how to run the **FlatArchive** application in a local environment (Node.js) and on a production web server (PHP).

---

## 💻 Section 1: Local Setup (Node.js)

This approach is ideal for local testing, creating entries on your own computer, or working without a PHP server.

### Step 1: Requirements
* Installed **Node.js** environment (version 14 or newer).

### Step 2: Preparing Files
1. Download or clone the repository to your local drive.
2. Prepare the folder structure for notes and attachments:
   * Articles: `content/YYYY/MM/DD/YYYYMMDD.md`
   * Media: `media/YYYY/MM/DD/file.jpg`

### Step 3: Generating the `index.json` File
Open the terminal (Command Prompt / PowerShell / Terminal) in the main project directory and run the command:

```bash
node generuj-indeks.js

```

The script will scan the `content/` and `media/` directories, then generate an updated `index.json` file.

### Step 4: Running in the Browser

Open the `index.html` file directly in your web browser or use a simple local server (e.g., the *Live Server* extension in VS Code, or open a console in the main directory and run `python -m http.server 8000`, then enter `localhost:8000` as the address in your browser).

---

## 🌐 Section 2: Web Server Setup (PHP)

This approach enables convenient management on a hosting server and index regeneration with a single click right from the browser.

### Step 1: Requirements

* Web server with **PHP 7.4+** support (e.g., Apache, Nginx).

### Step 2: Upload Files to the Server

Upload the project files via FTP to your chosen directory (e.g., `public_html/ARCH/`):

* `index.html`
* `style.css`
* `app.js`
* `generuj-indeks.php`
* `welcome.md`
* Directories: `content/` and `media/`

### Step 3: Configuring the Authentication Password (`config.php`)

To protect the PHP script from unauthorized execution by third parties or web bots, you need to create a configuration file with your own authorization key:

1. In the root directory on the server, create a file named **`config.php`**.
2. Enter your secret password inside it:

```php
<?php
// Your secret authorization key for the JSON generator
define('API_JSONCREATE_KEY', 'MySuperSecretPassword123');

```

> ⚠️ **Important:** The `config.php` file is executed server-side, meaning your password is not visible to visitors or exposed in HTML/JS source code.

### Step 4: Using the Generator on the Website

1. Access your website in a browser (e.g., `https://your-domain.com/ARCH/`).
2. Click the blue button at the bottom of the sidebar: **🔄 Rebuild Index (JSON)**.
3. In the prompt dialog that appears, enter the password defined earlier in `config.php` (e.g., `MySuperSecretPassword123`).
4. Upon successful authentication, the PHP script will regenerate the `index.json` file, and the interface will immediately refresh the navigation tree.

```

```
