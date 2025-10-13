const fs = require('fs');
const path = require('path');

// Leggi il file JSON
const filePath = path.join(__dirname, '../data/esim-offers.json');
const offers = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(`Offerte originali: ${offers.length}`);

// Funzione per creare una chiave unica per ogni offerta
function createKey(offer) {
  return `${offer.paese}-${offer.provider}-${offer.durata}-${offer.gb}-${offer.prezzo}`;
}

// Rimuovi duplicati mantenendo solo la prima occorrenza
const seen = new Set();
const uniqueOffers = offers.filter(offer => {
  const key = createKey(offer);
  if (seen.has(key)) {
    console.log(`Rimosso duplicato: ${key}`);
    return false;
  }
  seen.add(key);
  return true;
});

console.log(`Offerte dopo rimozione duplicati: ${uniqueOffers.length}`);
console.log(`Duplicati rimossi: ${offers.length - uniqueOffers.length}`);

// Ordina le offerte per paese, provider, durata, GB e prezzo
uniqueOffers.sort((a, b) => {
  if (a.paese !== b.paese) return a.paese.localeCompare(b.paese);
  if (a.provider !== b.provider) return a.provider.localeCompare(b.provider);
  if (a.durata !== b.durata) return a.durata - b.durata;
  if (a.gb !== b.gb) {
    // Gestisci il caso di "Illimitati" vs numeri
    if (typeof a.gb === 'string' && typeof b.gb === 'number') return 1;
    if (typeof a.gb === 'number' && typeof b.gb === 'string') return -1;
    if (typeof a.gb === 'number' && typeof b.gb === 'number') return a.gb - b.gb;
    return a.gb.localeCompare(b.gb);
  }
  return a.prezzo - b.prezzo;
});

// Scrivi il file aggiornato
fs.writeFileSync(filePath, JSON.stringify(uniqueOffers, null, 2));

console.log('File aggiornato con successo!');

// Mostra statistiche per paese
const statsByCountry = {};
uniqueOffers.forEach(offer => {
  if (!statsByCountry[offer.paese]) {
    statsByCountry[offer.paese] = 0;
  }
  statsByCountry[offer.paese]++;
});

console.log('\nStatistiche per paese:');
Object.entries(statsByCountry)
  .sort(([,a], [,b]) => b - a)
  .forEach(([country, count]) => {
    console.log(`${country}: ${count} offerte`);
  });
