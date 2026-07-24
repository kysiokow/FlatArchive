// Stan aplikacji
let indeksSzukania = [];

// Słownik z nazwami miesięcy oraz dopasowanymi, wesołymi ikonkami
const MIESIACE_INFO = {
  '01': { nazwa: 'Styczeń', ikonka: '❄️' },
  '02': { nazwa: 'Luty', ikonka: '☃️' },
  '03': { nazwa: 'Marzec', ikonka: '🌱' },
  '04': { nazwa: 'Kwiecień', ikonka: '🌷' },
  '05': { nazwa: 'Maj', ikonka: '🌸' },
  '06': { nazwa: 'Czerwiec', ikonka: '☀️' },
  '07': { nazwa: 'Lipiec', ikonka: '🏖️' },
  '08': { nazwa: 'Sierpień', ikonka: '🌻' },
  '09': { nazwa: 'Wrzesień', ikonka: '🍂' },
  '10': { nazwa: 'Październik', ikonka: '🎃' },
  '11': { nazwa: 'Listopad', ikonka: '🍁' },
  '12': { nazwa: 'Grudzień', ikonka: '🎄' }
};

// 1. Inicjalizacja
document.addEventListener('DOMContentLoaded', async () => {
  await wczytajIndeks();
  zbudujMenuZIndeksu();
  await wczytajPowitanie();
});

// Pomocnicza funkcja do bezpiecznego parsowania Markdown na HTML
function parsujMarkdown(textMarkdown) {
  const przetworzonyMarkdown = textMarkdown.replace(/^## (.*$)/gim, (match, tytul) => {
    const slug = tytul
      .toLowerCase()
      .trim()
      .replace(/[^\w\u0400-\u04FF]+/g, '-');
    return `<h2 id="${slug}">${tytul}</h2>`;
  });

  const html = marked.parse(przetworzonyMarkdown);
  return typeof html === 'string' ? html : String(html);
}

// 2. Ładowanie indeksu przeszukiwania (index.json)
async function wczytajIndeks() {
  try {
    const response = await fetch('index.json');
    if (response.ok) {
      indeksSzukania = await response.json();
    }
  } catch (e) {
    console.warn('Nie udało się wczytać index.json. Wyszukiwarka niedostępna.');
  }
}

// 3. Automatyczna budowa drzewka menu na podstawie indeksu
function zbudujMenuZIndeksu() {
  const treeContainer = document.getElementById('menu-tree');
  if (!indeksSzukania.length) {
    treeContainer.innerHTML = '<p style="font-size:0.8rem; color:#888;">Brak indeksu wpisów</p>';
    return;
  }

  const unikalneDaty = [...new Set(indeksSzukania.map(item => item.data))].sort().reverse();
  
  const struktura = {};
  unikalneDaty.forEach(dataStr => {
    const [rok, miesiac, dzien] = dataStr.split('-');
    if (!struktura[rok]) struktura[rok] = {};
    if (!struktura[rok][miesiac]) struktura[rok][miesiac] = [];
    struktura[rok][miesiac].push(dzien);
  });

  let html = '';
  for (const rok in struktura) {
    html += `<details class="tree-year">`;
    html += `  <summary>📁 ${rok}</summary>`;
    
    for (const miesiac in struktura[rok]) {
      const info = MIESIACE_INFO[miesiac] || { nazwa: `Miesiąc ${miesiac}`, ikonka: '🗓️' };
      
      html += `<details class="tree-month">`;
      html += `  <summary>${info.ikonka} ${info.nazwa}</summary>`;
      
      struktura[rok][miesiac].forEach(dzien => {
        const fullDate = `${rok}-${miesiac}-${dzien}`;
        html += `<a href="#" class="tree-day" onclick="otworzDzien('${fullDate}'); return false;">• Dzień ${dzien}</a>`;
      });
      
      html += `</details>`;
    }
    html += `</details>`;
  }
  
  treeContainer.innerHTML = html;
}

// 4. Pobieranie i wyświetlanie pliku .md dla wybranego dnia
async function otworzDzien(dataStr) {
  const [rok, miesiac, dzien] = dataStr.split('-');
  const sciezka = `content/${rok}/${miesiac}/${dzien}/${rok}${miesiac}${dzien}.md`;
  const container = document.getElementById('articles-container');

  try {
    const response = await fetch(sciezka);
    if (!response.ok) throw new Error();
    let textMarkdown = await response.text();

    // 1. Pobieramy wszystkie wpisy z tego dnia z pliku JSON
    const wpisyZDnia = indeksSzukania.filter(item => item.data === dataStr);
    
    // 2. Szukamy sekcji załączników w DOWOLNYM artykule z tego dnia
    let mediaHtml = '';
    for (const wpis of wpisyZDnia) {
      const match = wpis.tresc.match(/<div class="media-attachments">[\s\S]*<\/div>/);
      if (match) {
        mediaHtml = '\n\n---\n### 📎 Załączniki i Media\n' + match[0];
        break; // Znaleźliśmy załączniki dla tego dnia, kończymy szukanie
      }
    }

    // 3. Renderujemy treść pliku .md i doklejamy załączniki na samym dole strony
    container.innerHTML = parsujMarkdown(textMarkdown + mediaHtml);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    container.innerHTML = `<p style="color:red;">Błąd: Brak pliku pod ścieżką <code>${sciezka}</code></p>`;
  }
}
// 5. Wczytywanie ekranu powitalnego (welcome.md)
async function wczytajPowitanie() {
  const container = document.getElementById('articles-container');
  try {
    const response = await fetch('welcome.md');
    if (!response.ok) throw new Error();
    const textMarkdown = await response.text();
    container.innerHTML = parsujMarkdown(textMarkdown);
  } catch (err) {
    container.innerHTML = `<h1>Witaj w Archiwum</h1><p>Wybierz wpis z menu po lewej stronie.</p>`;
  }
}

// 6. Logika Wyszukiwarki
function obslugawyszukiwania(fraza) {
  const resultsDiv = document.getElementById('search-results');
  
  if (!fraza || fraza.trim().length < 2) {
    resultsDiv.style.display = 'none';
    return;
  }

  const query = fraza.toLowerCase();
  const dopasowania = indeksSzukania.filter(item => 
    item.tytul.toLowerCase().includes(query) || 
    item.tresc.toLowerCase().includes(query)
  );

  if (dopasowania.length === 0) {
    resultsDiv.innerHTML = '<div style="padding: 10px; color: #888; font-size:0.85rem;">Brak wyników</div>';
  } else {
    resultsDiv.innerHTML = dopasowania.map(item => `
      <div class="search-item" onclick="przejdzDoWyniku('${item.data}', '${item.kotwica}')">
        <div class="search-title">${item.tytul}</div>
        <div class="search-date">🗓️ ${item.data}</div>
      </div>
    `).join('');
  }
  
  resultsDiv.style.display = 'block';
}

// 7. Nawigacja prosto do konkretnego artykułu na stronie
async function przejdzDoWyniku(dataStr, kotwica) {
  document.getElementById('search-results').style.display = 'none';
  document.getElementById('search-input').value = '';
  
  await otworzDzien(dataStr);

  if (kotwica) {
    setTimeout(() => {
      const el = document.querySelector(kotwica);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }
}

// 8. Ręczne wywołanie generatora PHP z autoryzacją kluczem
async function uruchomGenerowanieIndeksu() {
  // 1. Pyta o klucz z pliku config.php
  const tajnyKlucz = prompt("Podaj klucz autoryzacyjny do przeliczenia indeksu:");
  
  // Jeśli kliknięto 'Anuluj' lub nic nie wpisano - przerywamy
  if (!tajnyKlucz) return;

  const btn = document.getElementById('btn-reindex');
  const statusDiv = document.getElementById('reindex-status');
  
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.innerText = '⏳ Generowanie...';
  statusDiv.innerText = '';

  try {
    // 2. Wysyłamy klucz jako parametr ?key= w zapytaniu URL
    const response = await fetch('generuj-indeks.php?key=' + encodeURIComponent(tajnyKlucz));
    
    if (response.ok) {
      statusDiv.style.color = '#16a34a';
      statusDiv.innerText = '✅ Indeks zaktualizowany!';
      // Wczytujemy na nowo plik JSON oraz przebudowujemy menu
      await wczytajIndeks();
      zbudujMenuZIndeksu();
    } else if (response.status === 403) {
      statusDiv.style.color = '#dc2626';
      statusDiv.innerText = '❌ Błędny klucz!';
    } else {
      statusDiv.style.color = '#dc2626';
      statusDiv.innerText = '❌ Błąd serwera PHP';
    }
  } catch (err) {
    statusDiv.style.color = '#dc2626';
    statusDiv.innerText = '❌ Nie udało się połączyć';
  } finally {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.innerText = '🔄 Przelicz indeks (JSON)';
    
    // Status znika po 4 sekundach
    setTimeout(() => {
      statusDiv.innerText = '';
    }, 4000);
  }
}