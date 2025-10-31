# Aggiornamento Link Affiliati Saily

## Modifiche Effettuate

### 1. Creato Nuovo File di Mapping
- **File**: `lib/saily-affiliate-mapping.ts`
- **Descrizione**: Creato un mapping completo dei link affiliati Saily specifici per paese, simile al sistema già implementato per Holafly e Airalo.
- **Paesi Supportati**: Oltre 200 paesi con link affiliati targettizzati
- **Funzioni Esportate**:
  - `getSailyAffiliateLink(country?: string)`: Restituisce il link affiliato specifico per il paese o il link generico
  - `hasSpecificSailyLink(country?: string)`: Verifica se esiste un link specifico per il paese
  - `SAILY_AFFILIATE_MAPPING`: Oggetto con tutti i mapping paese-link
  - `SAILY_GENERIC_AFFILIATE`: Link generico di fallback

### 2. Aggiornato Componente Tabella Comparazione
- **File**: `components/esim/esim-comparison-table.tsx`
- **Modifiche**:
  - Importata la funzione `getSailyAffiliateLink` dal nuovo file di mapping
  - Aggiornata la funzione `getProviderWebsite` per usare i link specifici per paese di Saily
  - Ora quando un utente clicca su un'offerta Saily, viene reindirizzato alla pagina specifica del paese

## Come Funziona

1. Quando un utente visualizza un'offerta Saily per un determinato paese (es. "Italia"), il sistema:
   - Normalizza il nome del paese (es. "Italia" → "italia")
   - Cerca nel mapping se esiste un link specifico per quel paese
   - Restituisce il link specifico con tutti i parametri affiliati
   - Se il paese non è nel mapping, restituisce il link generico

2. I link includono i parametri di tracking affiliato completi:
   - `utm_source=9135`
   - `utm_medium=affiliate`
   - `utm_campaign=101`
   - `aff_transaction_id=1021692cf327c046146e4cb09ae67a`
   - `aff_offer_id=101`
   - `aff_id=9135`
   - `url=[paese-specifico-encoded]`

## Esempi di Link Generati

- **Italia**: `https://saily.com/it/esim-italy/?utm_source=9135&utm_medium=affiliate&utm_campaign=101&aff_transaction_id=1021692cf327c046146e4cb09ae67a&aff_sub=&aff_offer_id=101&aff_id=9135&url=https%3A%2F%2Fsaily.com%2Fit%2Fesim-italy%2F&utm_content=&params%5Bho_asub1%5D=`
- **Francia**: `https://saily.com/it/esim-france/?utm_source=9135&utm_medium=affiliate&utm_campaign=101&aff_transaction_id=1021692cf327c046146e4cb09ae67a&aff_sub=&aff_offer_id=101&aff_id=9135&url=https%3A%2F%2Fsaily.com%2Fit%2Fesim-france%2F&utm_content=&params%5Bho_asub1%5D=`
- **Stati Uniti**: `https://saily.com/it/esim-united-states/?utm_source=9135&utm_medium=affiliate&utm_campaign=101&aff_transaction_id=1021692cf327c046146e4cb09ae67a&aff_sub=&aff_offer_id=101&aff_id=9135&url=https%3A%2F%2Fsaily.com%2Fit%2Fesim-united-states%2F&utm_content=&params%5Bho_asub1%5D=`
- **Tailandia**: `https://saily.com/it/esim-thailand/?utm_source=9135&utm_medium=affiliate&utm_campaign=101&aff_transaction_id=1021692cf327c046146e4cb09ae67a&aff_sub=&aff_offer_id=101&aff_id=9135&url=https%3A%2F%2Fsaily.com%2Fit%2Fesim-thailand%2F&utm_content=&params%5Bho_asub1%5D=`

## Vantaggi

1. **Migliore Esperienza Utente**: Gli utenti vengono reindirizzati direttamente alla pagina del paese di interesse
2. **Tracking Completo**: Ogni paese ha un link specifico con parametri di tracking dettagliati per un monitoraggio accurato delle conversioni
3. **Scalabilità**: Facile aggiungere o modificare link per nuovi paesi
4. **Coerenza**: Sistema identico a quello già implementato e funzionante per Holafly e Airalo

## Note Tecniche

- Il sistema usa la normalizzazione dei nomi dei paesi (lowercase + trattini al posto degli spazi)
- I nomi dei paesi nel database sono in italiano, quindi il mapping usa i nomi italiani
- Il fallback generico garantisce che funzioni sempre anche per paesi non mappati
- I parametri affiliati sono costanti per tutti i link e definiti nella variabile `SAILY_BASE_PARAMS`

## Provider con Link Specifici per Paese

Ora il sistema supporta link affiliati specifici per paese per i seguenti provider:
1. **Holafly** - Link targettizzati per ogni paese
2. **Airalo** - Link targettizzati per ogni paese  
3. **Saily** - Link targettizzati per ogni paese ✅ NUOVO
