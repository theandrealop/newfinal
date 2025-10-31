# Aggiornamento Link Affiliati Nomad

## Modifiche Effettuate

### 1. Creato Nuovo File di Mapping
- **File**: `lib/nomad-affiliate-mapping.ts`
- **Descrizione**: Creato un mapping completo dei link affiliati Nomad specifici per paese, simile al sistema già implementato per Holafly, Airalo e Saily.
- **Paesi Supportati**: Oltre 200 paesi con link affiliati targettizzati
- **Funzioni Esportate**:
  - `getNomadAffiliateLink(country?: string)`: Restituisce il link affiliato specifico per il paese o il link generico
  - `hasSpecificNomadLink(country?: string)`: Verifica se esiste un link specifico per il paese
  - `NOMAD_AFFILIATE_MAPPING`: Oggetto con tutti i mapping paese-link
  - `NOMAD_GENERIC_AFFILIATE`: Link generico di fallback

### 2. Aggiornato Componente Tabella Comparazione
- **File**: `components/esim/esim-comparison-table.tsx`
- **Modifiche**:
  - Importata la funzione `getNomadAffiliateLink` dal nuovo file di mapping
  - Aggiornata la funzione `getProviderWebsite` per usare i link specifici per paese di Nomad
  - Ora quando un utente clicca su un'offerta Nomad, viene reindirizzato alla pagina specifica del paese

## Come Funziona

1. Quando un utente visualizza un'offerta Nomad per un determinato paese (es. "Italia"), il sistema:
   - Normalizza il nome del paese (es. "Italia" → "italia")
   - Cerca nel mapping se esiste un link specifico per quel paese
   - Restituisce il link specifico con tutti i parametri affiliati
   - Se il paese non è nel mapping, restituisce il link generico

2. I link includono i parametri di tracking affiliato:
   - `sharedid=` (vuoto per permettere tracking dinamico)
   - `irpid=3417596`
   - `irgwc=1`
   - `afsrc=1`

## Esempi di Link Generati

- **Italia**: `https://www.getnomad.app/italy-eSIM?sharedid=&irpid=3417596&irgwc=1&afsrc=1`
- **Francia**: `https://www.getnomad.app/france-eSIM?sharedid=&irpid=3417596&irgwc=1&afsrc=1`
- **Stati Uniti**: `https://www.getnomad.app/united-states-eSIM?sharedid=&irpid=3417596&irgwc=1&afsrc=1`
- **Tailandia**: `https://www.getnomad.app/thailand-eSIM?sharedid=&irpid=3417596&irgwc=1&afsrc=1`

## Vantaggi

1. **Migliore Esperienza Utente**: Gli utenti vengono reindirizzati direttamente alla pagina del paese di interesse
2. **Tracking Accurato**: Ogni paese ha un link specifico con parametri di tracking per un monitoraggio accurato delle conversioni
3. **Scalabilità**: Facile aggiungere o modificare link per nuovi paesi
4. **Coerenza**: Sistema identico a quello già implementato e funzionante per Holafly, Airalo e Saily

## Note Tecniche

- Il sistema usa la normalizzazione dei nomi dei paesi (lowercase + trattini al posto degli spazi)
- I nomi dei paesi nel database sono in italiano, quindi il mapping usa i nomi italiani
- Il fallback generico garantisce che funzioni sempre anche per paesi non mappati
- I parametri affiliati sono costanti per tutti i link e definiti nella variabile `NOMAD_BASE_PARAMS`
- Il formato URL è `https://www.getnomad.app/[paese]-eSIM` dove `[paese]` è normalizzato in inglese

## Provider con Link Specifici per Paese

Ora il sistema supporta link affiliati specifici per paese per i seguenti provider:
1. **Holafly** - Link targettizzati per ogni paese
2. **Airalo** - Link targettizzati per ogni paese  
3. **Saily** - Link targettizzati per ogni paese
4. **Nomad** - Link targettizzati per ogni paese ✅ NUOVO

## Riepilogo Implementazione Completa

Tutti i principali provider di eSIM ora hanno link affiliati specifici per paese implementati:
- ✅ Holafly (completato)
- ✅ Airalo (completato)
- ✅ Saily (completato)
- ✅ Nomad (completato)

Questo garantisce la migliore esperienza utente e il tracking più accurato delle conversioni per tutti i provider principali!
