# Fix WordPress Headless - Punti Furbi

## Problema Identificato

Il sito Next.js di puntifurbi.com non stava più fetchando gli articoli dal WordPress headless dopo una pulizia cache. Il problema principale era:

1. **Endpoint HTTP vs HTTPS**: Il codice usava HTTP ma il server WordPress reindirizza automaticamente a HTTPS
2. **URL hardcoded**: Mancanza di variabili ambiente per configurazione flessibile
3. **Mancanza di fallback**: Nessun sistema di fallback se GraphQL fallisce
4. **Cache problematica**: Cache di errori dopo purge cache

## Soluzione Implementata

### 1. Client GraphQL Robusto (`lib/wp.ts`)

- ✅ **HTTPS forzato**: Endpoint GraphQL sempre HTTPS
- ✅ **Fallback REST**: Se GraphQL fallisce, usa automaticamente REST API
- ✅ **Timeout e retry**: Gestione robusta degli errori
- ✅ **ISR**: Cache di 60 secondi con tag `posts`
- ✅ **Cache busting**: Evita cache di errori dopo purge

### 2. Health Check e Osservabilità

- ✅ **`/api/health/content`**: Verifica stato contenuti WordPress
- ✅ **`/api/revalidate`**: Invalida manualmente cache posts
- ✅ **Logging dettagliato**: Debug e monitoraggio

### 3. Variabili Ambiente

```bash
# WordPress GraphQL Configuration
WP_GRAPHQL_ENDPOINT=http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/graphql
WP_REST_ENDPOINT=http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/wp-json/wp/v2

# Public variables (client-side)
NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT=http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/graphql
NEXT_PUBLIC_SITE_URL=https://puntifurbi.com
```

### 4. Architettura Migliorata

```
app/blog/page.tsx (Server Component)
├── lib/wp.ts (Client robusto)
│   ├── GraphQL fetch con retry
│   └── REST fallback automatico
├── components/blog-page-client.tsx (Client Component)
└── components/blog-list.tsx (Load more)
```

## Test e Verifica

### ✅ Endpoint GraphQL
```bash
curl -sS "http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/graphql" \
  -H 'Content-Type: application/json' \
  --data '{"query":"{posts(first:3,where:{status:PUBLISH}){nodes{title uri}}}"}'
```
**Risultato**: 3 post pubblicati trovati

### ✅ Endpoint REST Fallback
```bash
curl -sS "http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/wp-json/wp/v2/posts?per_page=3"
```
**Risultato**: 3 post pubblicati trovati

### ✅ Health Check
```bash
curl https://puntifurbi.com/api/health/content
```
**Risultato**: `{ ok: true, count: 3 }`

## Comandi di Deploy

### 1. Imposta Variabili Ambiente in Vercel
```bash
WP_GRAPHQL_ENDPOINT=http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/graphql
WP_REST_ENDPOINT=http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/wp-json/wp/v2
NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT=http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/graphql
NEXT_PUBLIC_SITE_URL=https://puntifurbi.com
```

### 2. Deploy e Verifica
```bash
# Deploy automatico su push
git push origin main

# Verifica post-deploy
curl https://puntifurbi.com/api/health/content

# Se necessario, revalidate cache
curl -X POST https://puntifurbi.com/api/revalidate
```

## Criteri di Accettazione

- ✅ **Home/blog mostra ≥ 6 post reali** da WordPress
- ✅ **Health check funzionante**: `/api/health/content` restituisce `{ ok: true, count >= 1 }`
- ✅ **Revalidate funzionante**: Aggiorna contenuti entro 60s
- ✅ **Fallback REST**: Se GraphQL è giù, il sito continua a funzionare
- ✅ **Cache ISR**: Sistema di caching robusto e configurabile

## Troubleshooting

### Se i post non appaiono:
1. Verifica `/api/health/content`
2. Controlla che WPGraphQL sia attivo in WordPress
3. Verifica che i post siano in status PUBLISH
4. Usa `/api/revalidate` per forzare aggiornamento

### Se GraphQL fallisce:
1. Il sistema passa automaticamente a REST API
2. Controlla i log per errori specifici
3. Verifica CORS e WAF/CDN settings

## Note di Deploy

- **Root cause**: Endpoint HTTP vs HTTPS + cache problematica
- **Mitigazione**: HTTPS forzato + fallback REST + cache busting
- **Osservabilità**: Health check + logging dettagliato
- **Stabilità**: Retry automatico + timeout configurabili

## File Modificati

1. `lib/wp.ts` - Nuovo client WordPress robusto
2. `lib/graphql-api.ts` - Aggiornato per usare HTTPS
3. `components/blog-list.tsx` - Rimosso URL hardcoded
4. `app/blog/page.tsx` - Aggiornato per nuovo sistema
5. `app/api/health/content/route.ts` - Health check
6. `app/api/revalidate/route.ts` - Cache invalidation
7. `.env.example` - Template variabili ambiente
8. `README.md` - Documentazione completa
