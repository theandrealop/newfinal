import { BlogPost } from './graphql-api'

// Interfaccia per la risposta della REST API WordPress
interface WPRestPost {
  id: number
  date: string
  date_gmt: string
  guid: {
    rendered: string
  }
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  sticky: boolean
  template: string
  format: string
  meta: {
    footnotes: string
  }
  categories: number[]
  tags: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      date: string
      slug: string
      type: string
      link: string
      title: {
        rendered: string
      }
      author: number
      source_url: string
      alt_text: string
      caption: {
        rendered: string
      }
      description: {
        rendered: string
      }
    }>
    'wp:term'?: Array<{
      id: number
      link: string
      name: string
      slug: string
      taxonomy: string
    }>
    author?: Array<{
      id: number
      name: string
      url: string
      description: string
      link: string
      slug: string
    }>
  }
}

// Interfaccia per la risposta della REST API con embed
interface WPRestResponse {
  posts: WPRestPost[]
  totalPages: number
  totalPosts: number
}

const WORDPRESS_REST_URL = "https://puntifurbi.wasmer.app/wp-json/wp/v2"

/**
 * Converte un post della REST API in formato BlogPost
 */
function convertWPRestPostToBlogPost(wpPost: WPRestPost): BlogPost {
  // Estrai le categorie e i tag dall'embed
  const categories = wpPost._embedded?.['wp:term']?.filter(term => term.taxonomy === 'category') || []
  const tags = wpPost._embedded?.['wp:term']?.filter(term => term.taxonomy === 'post_tag') || []
  const author = wpPost._embedded?.author?.[0] || { name: 'Autore sconosciuto' }
  const featuredImage = wpPost._embedded?.['wp:featuredmedia']?.[0]

  return {
    id: wpPost.id.toString(),
    title: wpPost.title.rendered,
    slug: wpPost.slug,
    excerpt: wpPost.excerpt.rendered.replace(/<[^>]*>/g, ''), // Rimuovi HTML tags
    content: wpPost.content.rendered,
    date: wpPost.date,
    author: {
      node: {
        name: author.name
      }
    },
    categories: {
      nodes: categories.map(cat => ({
        name: cat.name,
        slug: cat.slug
      }))
    },
    tags: {
      nodes: tags.map(tag => ({
        name: tag.name,
        slug: tag.slug
      }))
    },
    featuredImage: featuredImage ? {
      node: {
        sourceUrl: featuredImage.source_url?.replace('http://', 'https://'),
        altText: featuredImage.alt_text || wpPost.title.rendered
      }
    } : undefined
  }
}

/**
 * Recupera i post utilizzando la REST API WordPress
 */
export async function getPostsFromREST(
  page = 1, 
  perPage = 10, 
  category?: string,
  search?: string,
  lang?: string
): Promise<{ posts: BlogPost[], hasNextPage: boolean, totalPages: number }> {
  try {
    
    // Costruisci l'URL con parametri
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      _embed: 'true', // Include dati embedded (categorie, tags, immagini, autore)
      status: 'publish'
    })

    if (category) {
      // Prima recupera l'ID della categoria
      const categoryResponse = await fetch(`${WORDPRESS_REST_URL}/categories?slug=${category}`)
      if (categoryResponse.ok) {
        const categories = await categoryResponse.json()
        if (categories.length > 0) {
          params.append('categories', categories[0].id.toString())
        }
      }
    }

    if (search) {
      params.append('search', search)
    }

    if (lang) {
      params.append('lang', lang) // Polylang language parameter
    }

    const url = `${WORDPRESS_REST_URL}/posts?${params.toString()}`

    const response = await fetch(url, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`REST API HTTP ${response.status}: ${response.statusText}`)
    }

    const posts: WPRestPost[] = await response.json()
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0')


    // Converti i post nel formato BlogPost
    const blogPosts = posts.map(convertWPRestPostToBlogPost)

    return {
      posts: blogPosts,
      hasNextPage: page < totalPages,
      totalPages
    }
  } catch (error) {
    throw error
  }
}

/**
 * Recupera un singolo post per slug utilizzando la REST API
 */
export async function getPostBySlugFromREST(slug: string, lang?: string): Promise<BlogPost | null> {
  try {
    
    const params = new URLSearchParams({
      slug: slug,
      _embed: 'true'
    })

    if (lang) {
      params.append('lang', lang) // Polylang language parameter
    }

    const url = `${WORDPRESS_REST_URL}/posts?${params.toString()}`
    const response = await fetch(url, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`REST API HTTP ${response.status}: ${response.statusText}`)
    }

    const posts: WPRestPost[] = await response.json()
    
    if (posts.length === 0) {
      return null
    }

    const blogPost = convertWPRestPostToBlogPost(posts[0])
    return blogPost
  } catch (error) {
    return null
  }
}

/**
 * Recupera le categorie utilizzando la REST API
 */
export async function getCategoriesFromREST(): Promise<Array<{ id: number, name: string, slug: string }>> {
  try {
    
    const url = `${WORDPRESS_REST_URL}/categories?per_page=100`
    const response = await fetch(url, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`REST API HTTP ${response.status}: ${response.statusText}`)
    }

    const categories = await response.json()
    
    return categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug
    }))
  } catch (error) {
    return []
  }
}

/**
 * Recupera i post correlati per categoria utilizzando la REST API
 */
export async function getRelatedPostsFromREST(categoryId: number, excludePostId?: string): Promise<BlogPost[]> {
  try {
    
    const params = new URLSearchParams({
      categories: categoryId.toString(),
      per_page: '5',
      _embed: 'true',
      status: 'publish'
    })

    if (excludePostId) {
      params.append('exclude', excludePostId)
    }

    const url = `${WORDPRESS_REST_URL}/posts?${params.toString()}`
    const response = await fetch(url, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`REST API HTTP ${response.status}: ${response.statusText}`)
    }

    const posts: WPRestPost[] = await response.json()
    const blogPosts = posts.map(convertWPRestPostToBlogPost)
    
    return blogPosts
  } catch (error) {
    return []
  }
}
