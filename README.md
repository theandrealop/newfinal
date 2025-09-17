# Punti Furbi - Next.js + WordPress Headless

## Headless WP: Contenuti

### Configurazione

Il sito utilizza WordPress come CMS headless tramite GraphQL (WPGraphQL) con fallback REST API.

#### Variabili Ambiente

Copia `.env.example` in `.env.local` e configura:

```bash
# WordPress GraphQL Configuration
WP_GRAPHQL_ENDPOINT=http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/graphql
WP_REST_ENDPOINT=http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/wp-json/wp/v2

# Public variables (available on client-side)
NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT=http://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/graphql
NEXT_PUBLIC_SITE_URL=https://puntifurbi.com
```

### Sistema di Fetch

- **GraphQL primario**: `lib/wp.ts` - Client robusto con retry e timeout
- **Fallback REST**: Se GraphQL fallisce, usa automaticamente REST API
- **ISR**: Cache di 60 secondi con tag `posts`
- **Cache busting**: Evita cache di errori dopo purge

### Health Check

Verifica lo stato dei contenuti:

```bash
# Health check
curl https://puntifurbi.com/api/health/content

# Revalidate cache
curl -X POST https://puntifurbi.com/api/revalidate
```

### Comandi Utili

```bash
# Test GraphQL
curl -sS "$WP_GRAPHQL_ENDPOINT" -H 'Content-Type: application/json' \
  --data '{"query":"{posts(first:3,where:{status:PUBLISH}){nodes{title uri}}}"}' | jq

# Test REST fallback
curl -sS "$WP_REST_ENDPOINT/posts?per_page=3&_fields=title,link" | jq

# Revalidate
curl -X POST https://puntifurbi.com/api/revalidate

# Health
curl https://puntifurbi.com/api/health/content
```

### Troubleshooting

1. **Nessun post visibile**: Verifica che WPGraphQL sia attivo e i post siano PUBLISH
2. **Errori GraphQL**: Controlla `/api/health/content` per diagnostica
3. **Cache stale**: Usa `/api/revalidate` per forzare aggiornamento
4. **Rate limiting**: Il sistema ha retry automatico con exponential backoff

### Deploy

1. Imposta le variabili ambiente in Vercel
2. Deploy automatico su push
3. Verifica con health check post-deploy
4. Se necessario, revalidate cache manualmente

### Architettura

```
app/blog/page.tsx (Server Component)
├── lib/wp.ts (Client robusto)
│   ├── GraphQL fetch con retry
│   └── REST fallback
├── components/blog-page-client.tsx (Client Component)
└── components/blog-list.tsx (Load more)
```

### Criteri di Accettazione

- ✅ Home/blog mostra ≥ 6 post reali da WordPress
- ✅ `/api/health/content` restituisce `{ ok: true, count >= 1 }`
- ✅ Revalidate aggiorna contenuti entro 60s
- ✅ Fallback REST se GraphQL è giù
- ✅ Cache ISR funzionante
