import { fetchGraphQLWithRetry, getFallbackBlogData } from './fetch-with-retry'
import { 
  getPostsFromREST, 
  getPostBySlugFromREST, 
  getRelatedPostsFromREST 
} from './wordpress-rest-api'

const WORDPRESS_API_URL = process.env.WP_GRAPHQL_ENDPOINT || "https://puntifurbi.wasmer.app/graphql"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  author: {
    node: {
      name: string
    }
  }
  categories: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  tags: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
}

export interface BlogPostsResponse {
  posts: {
    nodes: BlogPost[]
  }
}

export interface SinglePostResponse {
  post: BlogPost
}

// --- types --------------------------------------------------------------
export interface PaginatedPostsResult {
  posts: BlogPost[]
  hasNextPage: boolean
  endCursor: string | null
}

// --- new util -----------------------------------------------------------
/**
 * Fetches a paginated list of published posts using REST API as primary method
 */
export async function getAllPosts(first = 10, after?: string): Promise<PaginatedPostsResult> {
  try {
    console.log("🚀 getAllPosts: Iniziando fetch con REST API...")
    
    // Convert GraphQL cursor to page number for REST API
    const page = after ? parseInt(after) + 1 : 1
    
    const result = await getPostsFromREST(page, first)
    
    console.log(`✅ getAllPosts: ${result.posts.length} posts caricati con successo via REST API`)
    return {
      posts: result.posts,
      hasNextPage: result.hasNextPage,
      endCursor: result.hasNextPage ? page.toString() : null,
    }
  } catch (error) {
    console.error("💥 getAllPosts: Errore REST API, provando GraphQL fallback:", error)
    
    // Fallback to GraphQL
    const query = `
      query GetAllPosts($first: Int!, $after: String) {
        posts(first: $first, after: $after, where: { status: PUBLISH }) {
          nodes {
            id
            title
            slug
            excerpt
            date
            author { node { name } }
            categories { nodes { name slug } }
            featuredImage { node { sourceUrl altText } }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `

    try {
      const data = await fetchGraphQLWithRetry(WORDPRESS_API_URL, query, { first, after })
      
      if (!data || !data.posts) {
        console.warn("⚠️ GraphQL fallback failed, usando dati statici")
        const fallbackData = getFallbackBlogData()
        return {
          posts: fallbackData.posts.nodes,
          hasNextPage: fallbackData.posts.pageInfo.hasNextPage,
          endCursor: fallbackData.posts.pageInfo.endCursor,
        }
      }

      const posts = (data.posts.nodes || []).sort((a: BlogPost, b: BlogPost) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

      return {
        posts,
        hasNextPage: data.posts.pageInfo?.hasNextPage || false,
        endCursor: data.posts.pageInfo?.endCursor || null,
      }
    } catch (graphqlError) {
      console.error("💥 getAllPosts: Anche GraphQL fallback fallito, usando dati statici:", graphqlError)
      const fallbackData = getFallbackBlogData()
      return {
        posts: fallbackData.posts.nodes,
        hasNextPage: false,
        endCursor: null,
      }
    }
  }
}

// Deprecata: ora usiamo fetchGraphQLWithRetry
async function fetchGraphQL(query: string, variables: any = {}) {
  console.log("⚠️ DEPRECATO: Uso fetchGraphQLWithRetry invece di fetchGraphQL")
  return await fetchGraphQLWithRetry(WORDPRESS_API_URL, query, variables)
}

export async function getBlogPosts(first = 10): Promise<BlogPost[]> {
  try {
    console.log("🚀 getBlogPosts: Iniziando fetch con REST API...")
    const result = await getPostsFromREST(1, first)
    
    console.log(`✅ getBlogPosts: ${result.posts.length} posts caricati con successo via REST API`)
    return result.posts
  } catch (error) {
    console.error("💥 getBlogPosts: Errore REST API, provando GraphQL fallback:", error)
    
    // Fallback to GraphQL
    const query = `
      query GetPosts($first: Int!) {
        posts(first: $first, where: { status: PUBLISH }) {
          nodes {
            id
            title
            slug
            excerpt
            date
            author {
              node {
                name
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `

    try {
      const data = await fetchGraphQLWithRetry(WORDPRESS_API_URL, query, { first })
      
      if (!data?.posts?.nodes) {
        console.warn("⚠️ getBlogPosts: GraphQL fallback failed, usando dati statici")
        const fallbackData = getFallbackBlogData()
        return fallbackData.posts.nodes
      }
      
      const posts = data.posts.nodes.sort((a: BlogPost, b: BlogPost) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      
      return posts
    } catch (graphqlError) {
      console.error("💥 getBlogPosts: Anche GraphQL fallback fallito, usando dati statici:", graphqlError)
      const fallbackData = getFallbackBlogData()
      return fallbackData.posts.nodes
    }
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`🚀 getPostBySlug: Caricando post "${slug}" con REST API...`)
    const post = await getPostBySlugFromREST(slug)
    
    if (post) {
      console.log(`✅ getPostBySlug: Post "${slug}" caricato con successo via REST API`)
      return post
    }
    
    console.warn(`⚠️ getPostBySlug: Post "${slug}" non trovato via REST API, provando GraphQL...`)
  } catch (error) {
    console.error(`💥 getPostBySlug: Errore REST API per "${slug}", provando GraphQL:`, error)
  }

  // Fallback to GraphQL
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        excerpt
        content
        date
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `

  try {
    const data = await fetchGraphQLWithRetry(WORDPRESS_API_URL, query, { slug })
    
    if (data?.post) {
      console.log(`✅ getPostBySlug: Post "${slug}" caricato con successo via GraphQL`)
      return data.post
    }
    
    console.warn(`⚠️ getPostBySlug: Post "${slug}" non trovato`)
    return null
  } catch (error) {
    console.error(`💥 getPostBySlug: Errore caricamento post "${slug}":`, error)
    return null
  }
}

export async function getRelatedPosts(categories: any[]): Promise<any[]> {
  // Se non ci sono categorie, restituisci array vuoto
  if (!categories || categories.length === 0) {
    return []
  }

  // Estrai gli ID delle categorie
  const categoryIds = categories.map(cat => cat.id || cat.databaseId).filter(Boolean)
  
  if (categoryIds.length === 0) {
    return []
  }

  try {
    console.log('🚀 getRelatedPosts: Caricando post correlati con REST API per categoria:', categoryIds[0])
    const posts = await getRelatedPostsFromREST(categoryIds[0])
    
    if (posts.length > 0) {
      console.log('✅ getRelatedPosts: Post correlati trovati via REST API:', posts.length)
      return posts
    }
    
    console.log('⚠️ getRelatedPosts: Nessun post correlato trovato via REST API, provando GraphQL...')
  } catch (error) {
    console.error('💥 getRelatedPosts: Errore REST API, provando GraphQL:', error)
  }

  // Fallback to GraphQL
  const query = `
    query GetRelatedPosts($categoryId: ID!) {
      category(id: $categoryId) {
        posts(first: 5) {
          nodes {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `

  try {
    const variables = {
      categoryId: categoryIds[0]
    }

    const data = await fetchGraphQLWithRetry(WORDPRESS_API_URL, query, variables)
    
    if (data?.category?.posts?.nodes) {
      console.log('✅ getRelatedPosts: Post correlati trovati via GraphQL:', data.category.posts.nodes.length)
      return data.category.posts.nodes
    }
    
    console.log('⚠️ getRelatedPosts: Nessun post correlato trovato')
    return []
  } catch (error) {
    console.error('💥 getRelatedPosts: Errore caricamento post correlati:', error)
    return []
  }
}

// --- eSIM specific functions ---

/**
 * Fetches eSIM articles from WordPress category using REST API
 */
export async function fetchEsimArticles(): Promise<any[]> {
  try {
    console.log("🚀 fetchEsimArticles: Caricando articoli eSIM con REST API...")
    const result = await getPostsFromREST(1, 6, 'esim')
    
    console.log(`✅ fetchEsimArticles: ${result.posts.length} articoli eSIM caricati via REST API`)
    return result.posts
  } catch (error) {
    console.error("💥 fetchEsimArticles: Errore REST API, provando GraphQL fallback:", error)
    
    // Fallback to GraphQL
    const query = `
      query GetEsimArticles {
        posts(
          first: 6,
          where: { 
            status: PUBLISH,
            categoryName: "esim"
          }
        ) {
          nodes {
            id
            title
            slug
            excerpt
            date
            author {
              node {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `

    try {
      const data = await fetchGraphQLWithRetry(WORDPRESS_API_URL, query)
      
      if (data?.posts?.nodes) {
        const articles = data.posts.nodes.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        
        console.log(`✅ fetchEsimArticles: ${articles.length} articoli eSIM caricati via GraphQL`)
        return articles
      }
      
      console.warn("⚠️ fetchEsimArticles: Nessun articolo eSIM trovato")
      return []
    } catch (graphqlError) {
      console.error("💥 fetchEsimArticles: Anche GraphQL fallback fallito:", graphqlError)
      return []
    }
  }
}

/**
 * Fetches eSIM guides from WordPress category using REST API
 */
export async function fetchEsimGuides(): Promise<any[]> {
  try {
    console.log("🚀 fetchEsimGuides: Caricando guide eSIM con REST API...")
    // Per ora usiamo la stessa logica degli articoli eSIM, 
    // in futuro possiamo implementare filtri per tag specifici
    const result = await getPostsFromREST(1, 3, 'esim')
    
    console.log(`✅ fetchEsimGuides: ${result.posts.length} guide eSIM caricate via REST API`)
    return result.posts
  } catch (error) {
    console.error("💥 fetchEsimGuides: Errore REST API, provando GraphQL fallback:", error)
    
    // Fallback to GraphQL
    const query = `
      query GetEsimGuides {
        posts(
          first: 3,
          where: { 
            status: PUBLISH,
            categoryName: "esim",
            tagSlugAnd: ["guida"]
          }
        ) {
          nodes {
            id
            title
            slug
            excerpt
            date
            author {
              node {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `

    try {
      const data = await fetchGraphQLWithRetry(WORDPRESS_API_URL, query)
      
      if (data?.posts?.nodes) {
        const guides = data.posts.nodes.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        
        console.log(`✅ fetchEsimGuides: ${guides.length} guide eSIM caricate via GraphQL`)
        return guides
      }
      
      console.warn("⚠️ fetchEsimGuides: Nessuna guida eSIM trovata")
      return []
    } catch (graphqlError) {
      console.error("💥 fetchEsimGuides: Anche GraphQL fallback fallito:", graphqlError)
      return []
    }
  }
}
