"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'
import { fetchEsimGuides } from '@/lib/graphql-api'

interface EsimGuide {
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

const fallbackGuides: EsimGuide[] = [
  {
    id: '1',
    title: 'Guida Completa alle eSIM: Come Funzionano e Come Attivarle',
    excerpt: 'Tutto quello che devi sapere sulle eSIM: dalla teoria alla pratica, come attivarle e usarle nei tuoi viaggi.',
    slug: 'guida-completa-esim-come-funzionano-attivarle',
    date: '2025-01-12T00:00:00Z',
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
        sourceUrl: 'https://punti-furbi-815f04.ingress-daribow.ewp.live/wp-content/uploads/2025/08/guida-completa-esim.png',
        altText: 'Guida Completa eSIM'
      } 
    }
  },
  {
    id: '2',
    title: 'Migliori eSIM per Europa: Confronto Prezzi e Copertura 2025',
    excerpt: 'Le migliori eSIM per viaggiare in Europa: confronto prezzi, copertura e consigli per ogni destinazione.',
    slug: 'migliori-esim-europa-confronto-prezzi-copertura-2025',
    date: '2025-01-08T00:00:00Z',
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
        sourceUrl: 'https://punti-furbi-815f04.ingress-daribow.ewp.live/wp-content/uploads/2025/08/esim-europa.png',
        altText: 'eSIM Europa'
      } 
    }
  },
  {
    id: '3',
    title: 'eSIM per Asia: Le Migliori Opzioni per Viaggiare nel 2025',
    excerpt: 'Scopri le migliori eSIM per l\'Asia: Giappone, Corea, Thailandia e altri paesi con copertura e prezzi.',
    slug: 'esim-asia-migliori-opzioni-viaggiare-2025',
    date: '2025-01-03T00:00:00Z',
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
        sourceUrl: 'https://punti-furbi-815f04.ingress-daribow.ewp.live/wp-content/uploads/2025/08/esim-asia.png',
        altText: 'eSIM Asia'
      } 
    }
  },
  {
    id: '4',
    title: 'Come Risparmiare con le eSIM: Trucchi e Consigli',
    excerpt: 'Trucchi e consigli per risparmiare sui costi delle eSIM: quando acquistare, come confrontare e ottimizzare.',
    slug: 'come-risparmiare-esim-trucchi-consigli',
    date: '2024-12-25T00:00:00Z',
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
        sourceUrl: 'https://punti-furbi-815f04.ingress-daribow.ewp.live/wp-content/uploads/2025/08/risparmiare-esim.png',
        altText: 'Risparmiare con eSIM'
      } 
    }
  },
  {
    id: '5',
    title: 'eSIM per Business: Soluzioni per Viaggi di Lavoro',
    excerpt: 'Le migliori eSIM per viaggi di business: affidabilità, supporto e soluzioni per professionisti.',
    slug: 'esim-business-soluzioni-viaggi-lavoro',
    date: '2024-12-18T00:00:00Z',
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
        sourceUrl: 'https://punti-furbi-815f04.ingress-daribow.ewp.live/wp-content/uploads/2025/08/esim-business.png',
        altText: 'eSIM Business'
      } 
    }
  },
  {
    id: '6',
    title: 'Troubleshooting eSIM: Risolvere Problemi Comuni',
    excerpt: 'Guida alla risoluzione dei problemi più comuni con le eSIM: attivazione, connessione e supporto.',
    slug: 'troubleshooting-esim-risolvere-problemi-comuni',
    date: '2024-12-10T00:00:00Z',
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
        sourceUrl: 'https://punti-furbi-815f04.ingress-daribow.ewp.live/wp-content/uploads/2025/08/troubleshooting-esim.png',
        altText: 'Troubleshooting eSIM'
      } 
    }
  }
]

export function EsimRelatedGuides() {
  const [guides, setGuides] = useState<EsimGuide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEsimGuides = async () => {
      try {
        // Temporaneamente disabilito il fetch GraphQL per evitare errori
        // const esimGuides = await fetchEsimGuides()
        // setGuides(esimGuides)
        
        // Usa contenuti di fallback
        setGuides(fallbackGuides)
      } catch (error) {
        console.error('Errore nel caricamento delle guide eSIM:', error)
        // Fallback: mostra guide di esempio se il fetch fallisce
        setGuides(fallbackGuides)
      } finally {
        setLoading(false)
      }
    }

    loadEsimGuides()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Guide correlate
              </h2>
              <p className="text-lg text-gray-600">
                Caricamento guide eSIM...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Guide correlate
            </h2>
            <p className="text-lg text-gray-600">
              Articoli e guide utili per approfondire il mondo delle eSIM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    {guide.featuredImage?.node?.sourceUrl ? (
                      <img
                        src={guide.featuredImage.node.sourceUrl}
                        alt={guide.featuredImage.node.altText || guide.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">📚</span>
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
                    {guide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(guide.date).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {guide.author.node.name}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(`/blog/${guide.slug}`, '_blank')}
                  >
                    Leggi guida
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
              Vedi tutte le guide eSIM
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
