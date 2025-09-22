# Guida alla Gestione dei Loghi Provider eSIM

## 📁 Posizione dei File
Tutti i loghi dei provider si trovano in: `public/images/providers/`

## 🖼️ Formato Richiesto
- **Formato**: PNG
- **Dimensioni**: 400x400 pixel (consigliato)
- **Sfondo**: Bianco o trasparente
- **Qualità**: Alta risoluzione per una migliore visualizzazione

## 📋 Provider Supportati

### Provider Principali
- `airalo-logo.png` - Airalo
- `holafly-logo.png` - Holafly  
- `saily-logo.png` - Saily
- `ubigi-logo.png` - Ubigi
- `nomad-logo.png` - Nomad
- `yesim-logo.png` - Yesim

### Provider Aggiuntivi
- `jetpac-logo.png` - Jetpac
- `esim4travel-logo.png` - eSIM4Travel
- `maya-logo.png` - Maya
- `alosim-logo.png` - aloSIM
- `simlocal-logo.png` - Sim Local
- `roamless-logo.png` - Roamless
- `menalink-logo.png` - Menalink

### Logo di Default
- `default-logo.png` - Logo utilizzato per provider non trovati

## 🔄 Come Sostituire un Logo

### 1. Prepara il Nuovo Logo
- Converti il logo in formato PNG
- Assicurati che abbia dimensioni 400x400 pixel
- Mantieni uno sfondo bianco o trasparente
- Salva con il nome corretto (es. `airalo-logo.png`)

### 2. Sostituisci il File
- Sostituisci il file esistente nella cartella `public/images/providers/`
- Mantieni lo stesso nome del file
- Il sistema aggiornerà automaticamente il logo in tutte le sezioni

### 3. Verifica
- Ricarica la pagina per vedere il nuovo logo
- Controlla che appaia correttamente in tutte le sezioni del sito

## 🆕 Come Aggiungere un Nuovo Provider

### 1. Aggiungi il Logo
- Crea il file PNG del logo
- Salvalo come `nomeprovider-logo.png` nella cartella providers

### 2. Aggiorna il Codice
- Modifica `components/esim/esim-comparison-table.tsx`
- Aggiungi il mapping nel `getProviderLogo()`:
```typescript
const logos: Record<string, string> = {
  // ... altri provider
  'Nuovo Provider': '/images/providers/nomeprovider-logo.png',
}
```

### 3. Aggiorna Altri File (se necessario)
- Modifica `components/esim/esim-comparison.tsx` se il provider deve apparire nella sezione confronto
- Aggiungi i dati del provider nell'array `providers`

## ⚡ Ridimensionamento Automatico
Il sistema ridimensiona automaticamente i loghi tramite CSS:
- **Non devi preoccuparti delle dimensioni finali**
- Il browser si occupa del ridimensionamento
- Mantieni solo le proporzioni corrette
- Usa sempre PNG per la migliore qualità

## 🎨 Best Practices
- **Qualità**: Usa sempre immagini ad alta risoluzione
- **Sfondo**: Preferisci sfondi bianchi o trasparenti
- **Proporzioni**: Mantieni proporzioni quadrate (1:1)
- **Dimensioni**: 400x400 pixel è la dimensione ottimale
- **Formato**: PNG per la migliore qualità e trasparenza

## 🔧 Risoluzione Problemi

### Logo Non Appare
- Verifica che il file esista nella cartella corretta
- Controlla che il nome del file sia esatto
- Assicurati che il formato sia PNG

### Logo Sfocato
- Usa un'immagine con risoluzione più alta
- Verifica che l'immagine originale sia di buona qualità
- Evita di ingrandire immagini piccole

### Logo Storto
- Assicurati che l'immagine sia quadrata (1:1)
- Verifica che non ci siano distorsioni nell'originale
- Usa un editor di immagini per correggere le proporzioni

## 📝 Note Importanti
- I loghi vengono utilizzati in più sezioni del sito
- Le modifiche si applicano automaticamente a tutte le sezioni
- Mantieni sempre una copia di backup dei loghi originali
- Testa sempre le modifiche in un ambiente di sviluppo prima del deploy
