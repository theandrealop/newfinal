# Pagina eSIM - Punti Furbi

Questa pagina fornisce un comparatore completo di offerte eSIM per viaggiatori, con filtri avanzati e confronti dettagliati.

## Funzionalità

- **Comparatore dinamico**: Confronta offerte eSIM da diversi provider
- **Filtri avanzati**: Paese, durata, dati, 5G, hotspot, eKYC, topup
- **Ordinamento**: Per voto, prezzo, dati, valore, copertura
- **Responsive**: Ottimizzato per desktop e mobile
- **Deep linking**: URL con filtri per condivisione
- **SEO ottimizzato**: Metadati, schema.org, breadcrumb

## Struttura dei dati

### Offerte eSIM (`data/esim-offers.json`)

```json
{
  "id": "unique-id",
  "providerId": "airalo",
  "countryCode": "ID",
  "countryName": "Indonesia",
  "planName": "Bali 20 GB",
  "dataGB": 20,
  "durationKey": "1-2w",
  "durationDays": 14,
  "priceEUR": 24.99,
  "network": "Telkomsel/XL",
  "fiveG": true,
  "hotspot": true,
  "eKYC": "none",
  "refundPolicy": "Rimborso entro 7 giorni",
  "topup": true,
  "link": "https://example.com/offer",
  "rating": {
    "overall": 8.7,
    "coverage": 8.5,
    "valueForMoney": 9.1,
    "speed": 8.2
  },
  "notes": ["Attivazione istantanea"],
  "updatedAt": "2025-01-20T12:00:00Z"
}
```

### Paesi (`data/countries.json`)

```json
{
  "code": "ID",
  "name": "Indonesia",
  "aliases": ["Bali", "Giacarta", "Jakarta"]
}
```

### Provider (`data/provider-metadata.json`)

```json
{
  "id": "airalo",
  "name": "Airalo",
  "logo": "/images/providers/airalo-logo.png",
  "description": "Descrizione del provider",
  "website": "https://airalo.com"
}
```

## Aggiornamento dei dati

### 1. Aggiornamento manuale

1. Modifica i file JSON nella cartella `data/`
2. Esegui la validazione: `npm run build:esim-data`
3. Riavvia il server di sviluppo: `npm run dev`

### 2. Integrazione API (futuro)

Il sistema è progettato per supportare l'integrazione con API esterne:

```typescript
// lib/esim-adapters.ts (da implementare)
export async function fetchAiraloOffers(): Promise<EsimOffer[]> {
  // Implementazione API Airalo
}

export async function fetchHolaflyOffers(): Promise<EsimOffer[]> {
  // Implementazione API Holafly
}
```

### 3. Script di validazione

```bash
npm run build:esim-data
```

Lo script valida:
- Schema dei dati
- Tipi di dati
- Campi obbligatori
- Date valide
- Statistiche generali

## Componenti

### `EsimHero`
Sezione hero con titolo, statistiche e vantaggi degli eSIM.

### `EsimFilterBar`
Barra filtri con:
- Ricerca paese con autocomplete
- Selezione durata e dati
- Filtri avanzati (5G, hotspot, eKYC, topup)
- Pulsante "Confronta eSIM"

### `EsimResults`
Visualizzazione risultati con:
- Tabella desktop responsive
- Card mobile
- Ordinamento dinamico
- Rating con stelle
- Badge per caratteristiche
- CTA per acquisto

### `EsimMethodology`
Spiegazione trasparente della metodologia di valutazione.

### `EsimFAQ`
FAQ complete con accordion.

## Routing e URL

La pagina supporta deep linking con parametri URL:

```
/esim?country=Indonesia&duration=1-2w&dataTier=20gbplus&fiveG=true
```

Parametri supportati:
- `country`: Nome paese
- `duration`: 1-7d, 1-2w, 1m, 2-3m
- `dataTier`: 1gbplus, 5gbplus, 10gbplus, 20gbplus, 50gbplus, unlimited
- `fiveG`: true/false
- `hotspot`: true/false
- `eKYC`: none, passport, id
- `topup`: true/false

## SEO e Metadati

- Title: "eSIM: confronta e risparmia | Punti Furbi"
- Description: Descrizione completa del comparatore
- Keywords: eSIM, sim virtuale, internet viaggio, dati roaming
- Open Graph e Twitter Cards
- Schema.org FAQPage per le FAQ
- Breadcrumb navigation

## Performance

- Lazy loading dei componenti
- Debounce sulla ricerca paesi
- Skeleton loading per i risultati
- Ottimizzazione immagini
- Code splitting automatico

## Accessibilità

- Focus states visibili
- Navigazione da tastiera
- ARIA labels sui controlli
- Contrasto AA
- Screen reader friendly

## Tracciamento

Struttura eventi per analytics:

```typescript
// Eventi tracciati
'esim_filter_applied' // Filtri applicati
'esim_sort_changed'   // Cambio ordinamento
'esim_offer_click'    // Click su offerta
```

## Manutenzione

### Aggiornamento prezzi
1. Modifica `priceEUR` nelle offerte
2. Aggiorna `updatedAt` con data corrente
3. Esegui validazione

### Aggiunta nuovi provider
1. Aggiungi metadati in `provider-metadata.json`
2. Aggiungi offerte in `esim-offers.json`
3. Valida con `npm run build:esim-data`

### Aggiunta nuovi paesi
1. Aggiungi in `countries.json` con alias
2. Aggiungi offerte corrispondenti
3. Testa la ricerca

## Troubleshooting

### Problemi comuni

1. **Validazione fallita**: Controlla schema dati con `npm run build:esim-data`
2. **Ricerca paesi non funziona**: Verifica alias in `countries.json`
3. **Filtri non si applicano**: Controlla console per errori JavaScript
4. **Performance lenta**: Verifica numero offerte e ottimizza query

### Debug

```bash
# Validazione dati
npm run build:esim-data

# Build di test
npm run build:test

# Lint
npm run lint
```

## Roadmap

- [ ] Integrazione API reali
- [ ] Sistema di notifiche prezzi
- [ ] Recensioni utenti
- [ ] Confronto storico prezzi
- [ ] App mobile
- [ ] Integrazione con sistemi di prenotazione
