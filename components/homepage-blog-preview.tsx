"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { fetchWordPressPostsWithLang } from '@/lib/wordpress-i18n'

type WPPost = {
  id: string
  title: string
  slug: string
  uri: string
  date: string
  excerpt?: string
  featuredImage?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null
  categories?: { nodes: { name: string; slug: string }[] }
  author?: { node: { name: string } }
}

interface HomepageBlogPreviewProps {
  className?: string
  locale?: 'it' | 'en'
}

export function HomepageBlogPreview({ className = "", locale = 'it' }: HomepageBlogPreviewProps) {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        
        // Usa il sistema di filtraggio per lingua
        const result = await fetchWordPressPostsWithLang(1, 3, locale)
        
        // Converti i post nel formato WPPost
        const wpPosts: WPPost[] = result.posts.map((p) => ({
          id: String(p.id),
          title: p.title,
          slug: p.slug,
          uri: locale === 'en' ? `/en/blog/${p.slug}` : `/blog/${p.slug}`,
          date: p.date,
          excerpt: p.excerpt?.replace(/<[^>]*>/g, '') ?? '',
          featuredImage: p.featuredImage?.node?.sourceUrl ? {
            node: {
              sourceUrl: p.featuredImage.node.sourceUrl,
              altText: p.featuredImage.node.altText
            }
          } : null,
          categories: { nodes: [] },
          author: { node: { name: p.author?.node?.name || 'Punti Furbi' } }
        }))
        
        setPosts(wpPosts)
        setError(null)
      } catch (err) {
        console.error('Errore nel caricamento dei post per homepage:', err)
        setError('Impossibile caricare gli articoli')
        // Fallback con dati statici
        setPosts([
          {
            id: '1',
            title: 'eSIM Albania 2025: offerte dati economiche e migliori provider',
            slug: 'esim-albania-2025-offerte-dati-economiche-e-migliori-provider',
            uri: '/blog/esim-albania-2025-offerte-dati-economiche-e-migliori-provider',
            date: new Date().toISOString(),
            excerpt: 'Stai programmando una vacanza o un viaggio di lavoro in Albania e vuoi risparmiare sull\'internet? Oggi scegliere una eSIM per l\'Albania è la soluzione più pratica, economica e veloce per connetterti subito appena atterrato.',
            featuredImage: {
              node: {
                sourceUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
                altText: 'Bandiera dell\'Albania con montagne sullo sfondo'
              }
            },
            categories: { nodes: [{ name: 'eSIM', slug: 'esim' }] },
            author: { node: { name: 'Punti Furbi' } }
          },
          {
            id: '2',
            title: 'Migliore eSIM per il Sudafrica 2025: quale scegliere',
            slug: 'migliore-esim-sudafrica-2025',
            uri: '/blog/migliore-esim-sudafrica-2025',
            date: new Date(Date.now() - 86400000).toISOString(), // 1 giorno fa
            excerpt: 'Organizzare un viaggio in Sudafrica significa anche pensare a come restare online senza spendere una fortuna: ecco la guida completa alle migliori eSIM per il Sudafrica.',
            featuredImage: {
              node: {
                sourceUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
                altText: 'Bandiera del Sudafrica con colori vibranti'
              }
            },
            categories: { nodes: [{ name: 'eSIM', slug: 'esim' }] },
            author: { node: { name: 'Punti Furbi' } }
          },
          {
            id: '3',
            title: 'eSIM per il Marocco: tutte le opzioni, costi e migliori provider',
            slug: 'esim-marocco-opzioni-costi-provider',
            uri: '/blog/esim-marocco-opzioni-costi-provider',
            date: new Date(Date.now() - 172800000).toISOString(), // 2 giorni fa
            excerpt: 'Stai organizzando un viaggio in Marocco e vuoi sapere quale SIM usare per avere internet senza spendere una fortuna? Scopri le migliori eSIM per il Marocco.',
            featuredImage: {
              node: {
                sourceUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
                altText: 'Città del Marocco con architettura tradizionale'
              }
            },
            categories: { nodes: [{ name: 'eSIM', slug: 'esim' }] },
            author: { node: { name: 'Punti Furbi' } }
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <section className={`py-16 ${className}`} style={{ backgroundColor: '#fcfaf3' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-green mb-4">
              Ultimi Articoli dal Blog
            </h2>
            <p className="text-xl text-gray-600">
              Consigli e guide per viaggiare al meglio
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error && posts.length === 0) {
    return null // Non mostrare nulla se c'è un errore e non ci sono post
  }

  return (
    <section className={`py-16 ${className}`} style={{ backgroundColor: '#fcfaf3' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-green mb-4">
            {locale === 'en' ? 'Latest Blog Articles' : 'Ultimi Articoli dal Blog'}
          </h2>
          <p className="text-xl text-gray-600">
            {locale === 'en' ? 'Tips and guides to travel better and save money' : 'Consigli e guide per viaggiare al meglio e risparmiare'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <Link href={post.uri}>
                {post.featuredImage?.node?.sourceUrl && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('it-IT')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author?.node?.name || 'Punti Furbi'}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-dark-green mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    {locale === 'en' ? 'Read article' : 'Leggi l\'articolo'}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href={locale === 'en' ? "/en/blog/" : "/blog/"}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {locale === 'en' ? 'View All Articles' : 'Vedi Tutti gli Articoli'}
          </Link>
        </div>
      </div>
    </section>
  )
}
