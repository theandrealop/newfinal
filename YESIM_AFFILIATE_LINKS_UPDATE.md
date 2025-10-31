# Aggiornamento Link Affiliati Yesim

## Modifiche Effettuate

### 1. Creato Nuovo File di Mapping
- **File**: `lib/yesim-affiliate-mapping.ts`
- **Descrizione**: Creato un mapping completo dei link affiliati Yesim specifici per paese, simile al sistema già implementato per gli altri provider.
- **Paesi Supportati**: Oltre 200 paesi con link affiliati targettizzati
- **Funzioni Esportate**:
  - `getYesimAffiliateLink(country?: string)`: Restituisce il link affiliato specifico per il paese o il link generico
  - `hasSpecificYesimLink(country?: string)`: Verifica se esiste un link specifico per il paese
  - `YESIM_AFFILIATE_MAPPING`: Oggetto con tutti i mapping paese-link
  - `YESIM_GENERIC_AFFILIATE`: Link generico di fallback

### 2. Aggiornato Componente Tabella Comparazione
- **File**: `components/esim/esim-comparison-table.tsx`
- **Modifiche**:
  - Importata la funzione `getYesimAffiliateLink` dal nuovo file di mapping
  - Aggiornata la funzione `getProviderWebsite` per usare i link specifici per paese di Yesim
  - Ora quando un utente clicca su un'offerta Yesim, viene reindirizzato alla pagina specifica del paese

## Come Funziona

1. Quando un utente visualizza un'offerta Yesim per un determinato paese (es. "Italia"), il sistema:
   - Normalizza il nome del paese (es. "Italia" → "italia")
   - Cerca nel mapping se esiste un link specifico per quel paese
   - Restituisce il link specifico con tutti i parametri affiliati
   - Se il paese non è nel mapping, restituisce il link generico

2. I link includono i parametri di tracking affiliato:
   - `partner_id=1639`

## Esempi di Link Generati

- **Italia**: `https://yesim.app/country/italy/?partner_id=1639`
- **Francia**: `https://yesim.app/country/france/?partner_id=1639`
- **Stati Uniti**: `https://yesim.app/country/united-states/?partner_id=1639`
- **Tailandia**: `https://yesim.app/country/thailand/?partner_id=1639`
- **Giappone**: `https://yesim.app/country/japan/?partner_id=1639`

## Vantaggi

1. **Migliore Esperienza Utente**: Gli utenti vengono reindirizzati direttamente alla pagina del paese di interesse
2. **Tracking Accurato**: Ogni paese ha un link specifico con parametri di tracking per un monitoraggio accurato delle conversioni
3. **Scalabilità**: Facile aggiungere o modificare link per nuovi paesi
4. **Coerenza**: Sistema identico a quello già implementato e funzionante per gli altri provider

## Note Tecniche

- Il sistema usa la normalizzazione dei nomi dei paesi (lowercase)
- I nomi dei paesi nel database sono in italiano, quindi il mapping supporta sia i nomi italiani che inglesi
- Il fallback generico garantisce che funzioni sempre anche per paesi non mappati
- Il parametro affiliato è costante per tutti i link e definito nella variabile `YESIM_BASE_PARAMS`
- Il formato URL è `https://yesim.app/country/[paese]/` dove `[paese]` usa i trattini al posto degli spazi (es. united-states, saudi-arabia)

## Provider con Link Specifici per Paese

Ora il sistema supporta link affiliati specifici per paese per i seguenti provider:
1. **Holafly** - Link targettizzati per ogni paese
2. **Airalo** - Link targettizzati per ogni paese  
3. **Saily** - Link targettizzati per ogni paese
4. **Nomad** - Link targettizzati per ogni paese
5. **GoMoWorld** - Link targettizzati per ogni paese
6. **Yesim** - Link targettizzati per ogni paese ✅ NUOVO

## Riepilogo Implementazione Completa

Tutti i principali provider di eSIM ora hanno link affiliati specifici per paese implementati:
- ✅ Holafly (completato)
- ✅ Airalo (completato)
- ✅ Saily (completato)
- ✅ Nomad (completato)
- ✅ GoMoWorld (completato)
- ✅ Yesim (completato)

Questo garantisce la migliore esperienza utente e il tracking più accurato delle conversioni per tutti i provider principali!

## Sistema di Routing Completo

Il sistema ora gestisce automaticamente **6 provider** con link specifici per oltre 200 paesi ciascuno, fornendo:
- **1200+ link affiliati specifici** totali
- **Tracking granulare** per paese e provider
- **Esperienza utente ottimale** con reindirizzamento diretto
- **Manutenibilità** tramite file di mapping separati per ogni provider
- **Scalabilità** per aggiungere facilmente nuovi provider o paesi

## Caratteristiche Distintive Yesim

- **Struttura URL pulita**: Usa il formato `/country/[paese]/` molto leggibile
- **Partner ID semplice**: Un solo parametro di tracking (`partner_id=1639`)
- **Supporto bilingue**: Il mapping include sia i nomi italiani che inglesi dei paesi per massima compatibilità
- **200+ paesi**: Copertura completa di tutti i paesi serviti da Yesim

## Prossimi Passi

Con 6 provider principali ora completamente integrati, il sistema è pronto per:
- Monitorare le conversioni specifiche per paese e provider
- Ottimizzare le offerte basandosi sui dati di click-through
- Aggiungere facilmente nuovi provider seguendo lo stesso pattern
- Scalare a centinaia di paesi senza problemi di manutenzione
