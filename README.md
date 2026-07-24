# 📂 FlatArchive

> **Minimalistyczne, bezbazowe (NoDB / Flat-File) archiwum wiadomości, artykułów i notatek w formacie Markdown z wbudowaną wyszukiwarką w czasie rzeczywistym.**

---

## 🌟 O projekcie

**FlatArchive** powstało jako prosta i odporna na upływ czasu alternatywa dla przeładowanych frameworkami i bazami danych systemów zarządzania wiedzą.

Aplikacja umożliwia organizowanie i wsteczne datowanie (*backdating*) artykułów w czystej strukturze plików `.md`. Brak tradycyjnej bazy danych (NoDB) oznacza zerowe koszty utrzymania, szybkie przenoszenie zasobów oraz gwarancję, że notatki odczytasz na każdym sprzęcie nawet za kilkanaście lat.

---

## ✨ Kluczowe funkcje

* 📁 **Struktura Flat-File:** Brak bazy danych – cała wiedza leży w zwykłych plikach tekstowych Markdown.
* 🌳 **Automatyczne drzewo nawigacji:** Boczny panel dynamicznie generuje rozwijaną hierarchię (`Rok -> Miesiąc -> Dzień`).
* 🔍 **Wyszukiwarka w czasie rzeczywistym:** Szybki indeks `index.json` pozwala w ułamku sekundy przeszukiwać tytuły i treść wpisów.
* ⚓ **Precyzyjne kotwice (Deep Linking):** Kliknięcie wyniku w wyszukiwarce nie tylko otwiera właściwy dzień, ale też płynnie przewija stronę do konkretnego artykułu.
* 🎨 **Czysty UI:** Responsywny, przejrzysty interfejs skupiony na czytelności tekstu.

---

## 📐 Struktura katalogów

Pliki `.md` z notatkami oraz załączniki przechowywane są według czytelnego schematu dat:

```text
FlatArchive/
├── index.html          # Główny szablon aplikacji
├── style.css           # Style wizualne
├── app.js              # Dynamiczne ładowanie treści i obsługa UI
├── generuj-indeks.php  # Skrypt PHP generujący indeks na serwerze (z autoryzacją)
├── generuj-indeks.js   # Skrypt Node.js generujący indeks lokalnie
├── config.example.php  # Szablon pliku konfiguracyjnego (z tajnym kluczem)
├── index.json          # Baza indeksowa dla wyszukiwarki (generowana auto)
├── welcome.md          # Strona powitalna
├── content/            # Folder z artykułami Markdown
│   └── YYYY/
│       └── MM/
│           └── DD/
│               └── YYYYMMDD.md
└── media/              # Folder z załącznikami (obrazki, wideo, PDF)
    └── YYYY/
        └── MM/
            └── DD/
                ├── zdjecie.jpg
                ├── wideo.mp4
                └── dokument.pdf

---
```

# 📂 FlatArchive

> **A minimalist, databaseless (NoDB / Flat-File) archive for messages, articles, and notes in Markdown format, featuring a built-in real-time search engine.**



## 🌟 About the Project

**FlatArchive** was created as a simple, future-proof alternative to knowledge management systems overloaded with heavy frameworks and databases.

The application allows you to organize and backdate articles in a clean `.md` file structure. The absence of a traditional database (NoDB) translates to zero maintenance costs, lightning-fast asset portability, and a guarantee that your notes will remain readable on any device even decades from now.

---

## ✨ Key Features

* 📁 **Flat-File Architecture:** No database required – all knowledge is stored in plain text Markdown files.
* 🌳 **Automated Navigation Tree:** The sidebar dynamically generates an expandable hierarchy (`Year -> Month -> Day`).
* 🔍 **Real-Time Search:** A lightweight `index.json` allows searching through entry titles and content in a fraction of a second.
* ⚓ **Deep Linking:** Clicking a search result not only opens the selected day but also smoothly scrolls down to the specific article.
* 🎨 **Clean UI:** A responsive, uncluttered interface focused on content readability.

---

## 📐 Directory Structure

Markdown notes (`.md`) and media attachments are stored according to a clean date-based scheme:

```text
FlatArchive/
├── index.html          # Main application template
├── style.css           # Visual styles
├── app.js              # Dynamic content loading and UI logic
├── generuj-indeks.php  # Server-side PHP index generator (with authentication)
├── generuj-indeks.js   # Local Node.js index generator
├── config.example.php  # Configuration template (with secret key)
├── index.json          # Search index database (auto-generated)
├── welcome.md          # Welcome page
├── content/            # Directory containing Markdown articles
│   └── YYYY/
│       └── MM/
│           └── DD/
│               └── YYYYMMDD.md
└── media/              # Directory containing attachments (images, videos, PDFs)
    └── YYYY/
        └── MM/
            └── DD/
                ├── photo.jpg
                ├── video.mp4
                └── document.pdf

