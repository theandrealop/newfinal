"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'
import { fetchEsimArticles } from '@/lib/graphql-api'

interface EsimArticle {
  id: string
  title: string
  excerpt: string
  slug: string
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
  featuredImage: {
    node: {
      sourceUrl: string
      altText?: string
    }
  }
}

const fallbackArticles: EsimArticle[] = [
  {
    id: '1',
    title: 'Airalo vs Holafly: Qual è la eSIM Migliore del 2025?',
    excerpt: 'Confronto dettagliato tra i due principali provider eSIM. Scopri quale scegliere per i tuoi viaggi con test reali e opinioni aggiornate.',
    slug: 'airalo-vs-holafly-qual-e-la-esim-migliore-del-2025-guida-completa-con-test-e-opinioni-reali-aggiornata',
    date: '2025-01-15T00:00:00Z',
    author: {
      node: {
        name: 'Redazione Punti Furbi'
      }
    },
    categories: {
      nodes: [
        {
          name: 'eSIM',
          slug: 'esim'
        }
      ]
    },
    featuredImage: { 
      node: { 
        sourceUrl: 'https://puntifurbi.wasmer.app/wp-content/uploads/2025/08/holafly-vs-airalo.png',
        altText: 'Confronto Airalo vs Holafly eSIM'
      } 
    }
  },
  {
    id: '2',
    title: 'Saily eSIM Recensione Completa 2025',
    excerpt: 'Tutto quello che devi sapere su Saily eSIM: prezzi, copertura, velocità e opinioni reali degli utenti.',
    slug: 'saily-esim-recensione-completa-2025',
    date: '2025-01-10T00:00:00Z',
    author: {
      node: {
        name: 'Redazione Punti Furbi'
      }
    },
    categories: {
      nodes: [
        {
          name: 'eSIM',
          slug: 'esim'
        }
      ]
    },
    featuredImage: { 
      node: { 
        sourceUrl: 'https://puntifurbi.wasmer.app/wp-content/uploads/2025/08/saily-esim-recensione.png',
        altText: 'Saily eSIM Recensione'
      } 
    }
  },
  {
    id: '3',
    title: 'Ubigi eSIM: Guida Completa e Recensione',
    excerpt: 'Scopri tutto su Ubigi eSIM: vantaggi, svantaggi, prezzi e come attivarla per i tuoi viaggi.',
    slug: 'ubigi-esim-guida-completa-recensione',
    date: '2025-01-05T00:00:00Z',
    author: {
      node: {
        name: 'Redazione Punti Furbi'
      }
    },
    categories: {
      nodes: [
        {
          name: 'eSIM',
          slug: 'esim'
        }
      ]
    },
    featuredImage: { 
      node: { 
        sourceUrl: 'https://puntifurbi.wasmer.app/wp-content/uploads/2025/08/ubigi-esim-recensione.png',
        altText: 'Ubigi eSIM Recensione'
      } 
    }
  },
  {
    id: '4',
    title: 'Nomad eSIM: Recensione e Confronto 2025',
    excerpt: 'Analisi approfondita di Nomad eSIM: copertura globale, prezzi competitivi e esperienze reali.',
    slug: 'nomad-esim-recensione-confronto-2025',
    date: '2024-12-28T00:00:00Z',
    author: {
      node: {
        name: 'Redazione Punti Furbi'
      }
    },
    categories: {
      nodes: [
        {
          name: 'eSIM',
          slug: 'esim'
        }
      ]
    },
    featuredImage: { 
      node: { 
        sourceUrl: 'https://puntifurbi.wasmer.app/wp-content/uploads/2025/08/nomad-esim-recensione.png',
        altText: 'Nomad eSIM Recensione'
      } 
    }
  },
  {
    id: '5',
    title: 'Come Scegliere la Migliore eSIM per Viaggiare',
    excerpt: 'Guida completa per scegliere l\'eSIM perfetta: fattori da considerare, confronti e consigli pratici.',
    slug: 'come-scegliere-migliore-esim-viaggiare',
    date: '2024-12-20T00:00:00Z',
    author: {
      node: {
        name: 'Redazione Punti Furbi'
      }
    },
    categories: {
      nodes: [
        {
          name: 'eSIM',
          slug: 'esim'
        }
      ]
    },
    featuredImage: { 
      node: { 
        sourceUrl: 'https://puntifurbi.wasmer.app/wp-content/uploads/2025/08/come-scegliere-esim.png',
        altText: 'Come scegliere eSIM'
      } 
    }
  },
  {
    id: '6',
    title: 'eSIM vs SIM Fisica: Quale Scegliere nel 2025?',
    excerpt: 'Confronto dettagliato tra eSIM e SIM tradizionali: vantaggi, svantaggi e quando usare ciascuna.',
    slug: 'esim-vs-sim-fisica-quale-scegliere-2025',
    date: '2024-12-15T00:00:00Z',
    author: {
      node: {
        name: 'Redazione Punti Furbi'
      }
    },
    categories: {
      nodes: [
        {
          name: 'eSIM',
          slug: 'esim'
        }
      ]
    },
    featuredImage: { 
      node: { 
        sourceUrl: 'https://puntifurbi.wasmer.app/wp-content/uploads/2025/08/esim-vs-sim-fisica.png',
        altText: 'eSIM vs SIM Fisica'
      } 
    }
  }
]

export function EsimReviews() {
  const [articles, setArticles] = useState<EsimArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEsimArticles = async () => {
      try {
        // Prova prima con la REST API
        const esimArticles = await fetchEsimArticles()
        if (esimArticles && esimArticles.length > 0) {
          setArticles(esimArticles)
        } else {
          // Fallback: usa contenuti di esempio se il fetch fallisce
          setArticles(fallbackArticles)
        }
      } catch (error) {
        console.error('Errore nel caricamento degli articoli eSIM:', error)
        // Fallback: mostra articoli di esempio se il fetch fallisce
        setArticles(fallbackArticles)
      } finally {
        setLoading(false)
      }
    }

    loadEsimArticles()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Recensioni e confronti approfonditi
              </h2>
              <p className="text-lg text-gray-600">
                Caricamento articoli eSIM...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Recensioni e confronti approfonditi
            </h2>
            <p className="text-lg text-gray-600">
              Articoli dettagliati sui principali provider eSIM con test reali e opinioni aggiornate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    {article.featuredImage?.node?.sourceUrl ? (
                      <img
                        src={article.featuredImage.node.sourceUrl}
                        alt={article.featuredImage.node.altText || article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">📱</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      eSIM
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author.node.name}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                  >
                    Leggi articolo
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('/blog', '_blank')}
            >
              Vedi tutti gli articoli eSIM
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
