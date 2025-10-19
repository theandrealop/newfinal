"use client"

import { useState } from "react"
import type { BlogPost } from "@/lib/graphql-api"
import { BlogCard } from "./blog-card"
import { Button } from "@/components/ui/button"
import { fetchGraphQLWithRetry } from "@/lib/fetch-with-retry"

interface BlogListProps {
  initialPosts: BlogPost[]
  hasNextPage: boolean
  endCursor: string | null
  locale?: 'it' | 'en'
}

export function BlogList({
  initialPosts,
  hasNextPage: initialHasNextPage,
  endCursor: initialEndCursor,
  locale = 'it',
}: BlogListProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [endCursor, setEndCursor] = useState(initialEndCursor)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (!hasNextPage || loading) return

    setLoading(true)
    try {
      // Converti il cursor in numero di pagina per la REST API
      const currentPage = endCursor ? parseInt(endCursor) + 1 : 2
      
      // Usa la REST API direttamente
      const WORDPRESS_REST_URL = process.env.NEXT_PUBLIC_WP_REST_ENDPOINT || "https://puntifurbi.wasmer.app/wp-json/wp/v2"
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '12',
        _embed: 'true',
        status: 'publish'
      })
      // Polylang language filter if available
      if (locale === 'en' || locale === 'it') {
        params.append('lang', locale)
      }

      const url = `${WORDPRESS_REST_URL}/posts?${params.toString()}`

      const response = await fetch(url, {
        cache: 'force-cache',
        next: { revalidate: 60, tags: ['posts'] }
      })

      if (!response.ok) {
        throw new Error(`REST API HTTP ${response.status}: ${response.statusText}`)
      }

      const newPostsData = await response.json()
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
      
      if (!Array.isArray(newPostsData) || newPostsData.length === 0) {
        setHasNextPage(false)
        return
      }
      
      // Converti i post nel formato BlogPost
      const newPosts: BlogPost[] = newPostsData.map((wpPost: any) => {
        const categories = wpPost._embedded?.['wp:term']?.filter((term: any) => term.taxonomy === 'category') || []
        const author = wpPost._embedded?.author?.[0] || { name: 'Autore sconosciuto' }
        const featuredImage = wpPost._embedded?.['wp:featuredmedia']?.[0]

        return {
          id: wpPost.id.toString(),
          title: wpPost.title.rendered,
          slug: wpPost.slug,
          excerpt: wpPost.excerpt.rendered.replace(/<[^>]*>/g, ''),
          content: wpPost.content.rendered,
          date: wpPost.date,
          author: {
            node: {
              name: author.name
            }
          },
          categories: {
            nodes: categories.map((cat: any) => ({
              name: cat.name,
              slug: cat.slug
            }))
          },
          tags: {
            nodes: []
          },
          featuredImage: featuredImage ? {
            node: {
              sourceUrl: featuredImage.source_url,
              altText: featuredImage.alt_text || wpPost.title.rendered
            }
          } : undefined
        }
      })
      
      // Sort new posts by date (most recent first)
      const sortedNewPosts = newPosts.sort((a: BlogPost, b: BlogPost) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      
      
      setPosts((prevPosts: BlogPost[]) => {
        const combined = [...prevPosts, ...sortedNewPosts]
        // Re-sort the entire array to maintain order
        return combined.sort((a: BlogPost, b: BlogPost) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
      })
      setHasNextPage(currentPage < totalPages)
      setEndCursor(currentPage < totalPages ? currentPage.toString() : null)
    } catch (error) {
      console.error("💥 BlogList: Errore caricamento più posts:", error)
      
      // Gestione errori specifici per l'utente
      if (error instanceof Error) {
        if (error.message.includes('429') || error.message.includes('rate limit')) {
          console.log("🚫 Rate limiting rilevato, disabilito temporaneamente il load more")
          setHasNextPage(false)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center">
          <Button onClick={loadMore} disabled={loading} variant="outline" size="lg">
            {loading 
              ? (locale === 'en' ? 'Loading...' : 'Caricamento...')
              : (locale === 'en' ? 'Load more posts' : 'Carica altri articoli')}
          </Button>
        </div>
      )}
    </div>
  )
}
