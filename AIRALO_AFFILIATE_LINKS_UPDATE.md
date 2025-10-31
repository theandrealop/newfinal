# Aggiornamento Link Affiliati Airalo

## Modifiche Effettuate

### 1. Creato Nuovo File di Mapping
- **File**: `lib/airalo-affiliate-mapping.ts`
- **Descrizione**: Creato un mapping completo dei link affiliati Airalo specifici per paese, simile al sistema già implementato per Holafly.
- **Paesi Supportati**: Oltre 200 paesi con link affiliati targettizzati
- **Funzioni Esportate**:
  - `getAiraloAffiliateLink(country?: string)`: Restituisce il link affiliato specifico per il paese o il link generico
  - `hasSpecificAiraloLink(country?: string)`: Verifica se esiste un link specifico per il paese
  - `AIRALO_AFFILIATE_MAPPING`: Oggetto con tutti i mapping paese-link
  - `AIRALO_GENERIC_AFFILIATE`: Link generico di fallback

### 2. Aggiornato Componente Tabella Comparazione
- **File**: `components/esim/esim-comparison-table.tsx`
- **Modifiche**:
  - Importata la funzione `getAiraloAffiliateLink` dal nuovo file di mapping
  - Aggiornata la funzione `getProviderWebsite` per usare i link specifici per paese di Airalo
  - Ora quando un utente clicca su un'offerta Airalo, viene reindirizzato alla pagina specifica del paese

### 3. Aggiornato Metadata Provider
- **File**: `data/provider-metadata.json`
- **Modifiche**:
  - Aggiornato il link generico di Airalo con i parametri affiliati corretti

### 4. Aggiornato Componente Comparazione Provider
- **File**: `components/esim/esim-comparison.tsx`
- **Modifiche**:
  - Aggiornato il link generico di Airalo con i parametri affiliati corretti

## Come Funziona

1. Quando un utente visualizza un'offerta Airalo per un determinato paese (es. "Francia"), il sistema:
   - Normalizza il nome del paese (es. "Francia" → "francia")
   - Cerca nel mapping se esiste un link specifico per quel paese
   - Restituisce il link specifico `https://www.airalo.com/it/france-esim?irgwc=1&afsrc=1&utm_source=impact&utm_medium=affiliate&utm_campaign=Andrea+Loperfido`
   - Se il paese non è nel mapping, restituisce il link generico

2. I link includono i parametri di tracking affiliato:
   - `irgwc=1`
   - `afsrc=1`
   - `utm_source=impact`
   - `utm_medium=affiliate`
   - `utm_campaign=Andrea+Loperfido`

## Esempi di Link Generati

- **Italia**: `https://www.airalo.com/it/italy-esim?irgwc=1&afsrc=1&utm_source=impact&utm_medium=affiliate&utm_campaign=Andrea+Loperfido`
- **Francia**: `https://www.airalo.com/it/france-esim?irgwc=1&afsrc=1&utm_source=impact&utm_medium=affiliate&utm_campaign=Andrea+Loperfido`
- **Stati Uniti**: `https://www.airalo.com/it/united-states-esim?irgwc=1&afsrc=1&utm_source=impact&utm_medium=affiliate&utm_campaign=Andrea+Loperfido`
- **Tailandia**: `https://www.airalo.com/it/thailand-esim?irgwc=1&afsrc=1&utm_source=impact&utm_medium=affiliate&utm_campaign=Andrea+Loperfido`

## Vantaggi

1. **Migliore Esperienza Utente**: Gli utenti vengono reindirizzati direttamente alla pagina del paese di interesse
2. **Tracking Migliore**: Ogni paese ha un link specifico per un tracking più accurato delle conversioni
3. **Scalabilità**: Facile aggiungere o modificare link per nuovi paesi
4. **Coerenza**: Sistema identico a quello già implementato e funzionante per Holafly

## Note Tecniche

- Il sistema usa la normalizzazione dei nomi dei paesi (lowercase + trattini al posto degli spazi)
- I nomi dei paesi nel database sono in italiano, quindi il mapping usa i nomi italiani
- Il fallback generico garantisce che funzioni sempre anche per paesi non mappati
