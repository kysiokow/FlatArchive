# 📂 FlatArchive

> **Minimalistyczne, bezbazowe (NoDB / Flat-File) archiwum wiadomości, artykułów i notatek w formacie Markdown z wbudowaną wyszukiwarką w czasie rzeczywistym.**

---

## 🌟 O projekcie

**FlatArchive** powstało jako prosta i odporna na upływ czasu alternatywa dla przeładowanych frameworkami i bazami danych systemów zarządzania wiedzą. 

Aplikacja umożliwia organizowanie i wsteczne datowanie (*backdating*) artykułów w czystej strukturze plików `.md`. Brak tradycyjnej bazy danych (NoDB) oznacza zerowe koszty utrzymania, szybkie przenoszenie zasobów oraz gwarancję, że notatki odczytasz na każdym sprzęcie nawet za kilkanaście lat.

---

## ✨ Kluczowe funkcje

* 📁 **Struktura Flat-File:** Brak bazy danych – cała wiedza leży w zwykłych plikach tekstowych Markdown.
* 🌳 **Automatyczne drzewo nawigacji:** Boczny panel dynamicznie generuje rozwijaną hierarchię `Rok -> Miesiąc -> Dzień`.
* 🔍 **Wyszukiwarka w czasie rzeczywistym:** Szybki indeks `index.json` pozwala w ułamku sekundy przeszukiwać tytuły i treść wpisów.
* ⚓ **Precyzyjne kotwice (Deep Linking):** Kliknięcie wyniku w wyszukiwarce nie tylko otwiera właściwy dzień, ale też płynnie przewija stronę do konkretnego artykułu.
* 🎨 **Czysty UI:** Responsywny, przejrzysty interfejs skupiony na czytelności tekstu.

---

## 📐 Struktura katalogów

Pliki `.md` z notatkami przechowywane są według czytelnego schematu dat:

```text
FlatArchive/
├── index.html            # Główny szablon aplikacji
├── style.css             # Style wizualne
├── app.js                # Dynamiczne ładowanie treści i obsługa UI
├── generuj-indeks.js     # Skrypt Node.js generujący indeks wyszukiwania
├── index.json            # Baza indeksowa dla wyszukiwarki (generowana auto)
├── welcome.md            # Strona powitalna
└── content/              # Folder z artykułami
    └── YYYY/
        └── MM/
            └── DD/
                └── YYYYMMDD.md
