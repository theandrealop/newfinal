import 'server-only';

type WPImage = { node?: { sourceUrl?: string | null; altText?: string | null } | null };
export type WPPost = {
  id: string;
  title: string;
  slug: string;
  uri: string;
  date: string;
  excerpt?: string;
  featuredImage?: WPImage | null;
  categories?: { nodes: { name: string; slug: string }[] };
  author?: { node: { name: string } };
};

// TEMPORARY: Hardcoded per assicurarsi che usi il dominio corretto
const WP_GRAPHQL_ENDPOINT = "https://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/graphql";
const WP_REST_ENDPOINT = "https://new-punti-furbi-draft-815f04.ingress-florina.ewp.live/wp-json/wp/v2";

async function postJSON(body: unknown, signal?: AbortSignal) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 10_000);
  try {
    const res = await fetch(WP_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: signal ?? ctrl.signal,
      next: { revalidate: 300, tags: ['posts'] }, // 5 minuti di cache
    });
    if (!res.ok) {
      if (res.status === 429) {
        console.log('⚠️ GraphQL rate limited, aspetto prima del fallback...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      throw new Error(`WPGraphQL HTTP ${res.status}`);
    }
    return (await res.json()) as any;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getLatestPosts(limit = 10): Promise<WPPost[]> {
  const query = `query Posts($first:Int!){
    posts(where:{status:PUBLISH}, first:$first){
      nodes{ 
        id 
        title 
        slug
        uri 
        date 
        excerpt 
        featuredImage{node{sourceUrl altText}} 
        categories{nodes{name slug}}
        author{node{name}}
      }
    }
  }`;
  try {
    console.log(`🔍 Fetching ${limit} posts from GraphQL...`);
    const data = await postJSON({ query, variables: { first: limit } });
    if (data?.errors?.length) throw new Error('WPGraphQL errors: ' + JSON.stringify(data.errors));
    const nodes = data?.data?.posts?.nodes ?? [];
    if (!Array.isArray(nodes) || nodes.length === 0) throw new Error('Nessun post pubblicato da GraphQL');
    
    console.log(`✅ GraphQL: ${nodes.length} posts caricati`);
    return nodes as WPPost[];
  } catch (err) {
    const errorMsg = (err as Error).message;
    console.error('[WPGraphQL] fallback REST per errore:', errorMsg);
    
    // Se è rate limiting, aspetta un po' di più prima del fallback
    if (errorMsg.includes('429')) {
      console.log('⏳ Rate limiting rilevato, attendo prima del fallback REST...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    return await getLatestPostsREST(limit);
  }
}

async function getLatestPostsREST(limit = 10): Promise<WPPost[]> {
  const url = `${WP_REST_ENDPOINT}/posts?per_page=${limit}&_fields=id,slug,title,excerpt,date,link,featured_media,author&_embed`;
  console.log(`🔄 Fallback REST: ${url}`);
  
  const res = await fetch(url, { 
    next: { revalidate: 300, tags: ['posts'] } // 5 minuti di cache
  });
  if (!res.ok) throw new Error('WP REST HTTP ' + res.status);
  const posts = await res.json();
  
  console.log(`✅ REST fallback: ${posts.length} posts caricati`);
  return posts.map((p: any) => ({
    id: String(p.id),
    title: p.title?.rendered ?? '',
    slug: p.slug,
    uri: p.link,
    date: p.date,
    excerpt: p.excerpt?.rendered ?? '',
    featuredImage: p._embedded?.['wp:featuredmedia']?.[0] ? {
      node: {
        sourceUrl: p._embedded['wp:featuredmedia'][0].source_url,
        altText: p._embedded['wp:featuredmedia'][0].alt_text
      }
    } : null,
    categories: { nodes: [] }, // REST non fornisce categorie in questo formato
    author: { node: { name: 'Autore sconosciuto' } }
  }));
}

export const revalidate = 60; // App Router
