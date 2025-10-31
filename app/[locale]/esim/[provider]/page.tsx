import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Star, TrendingDown, Copy, Check, Tag } from 'lucide-react'
import { esimService } from '@/lib/esim-service'
import { EsimOffer } from '@/types/esim'
import Link from 'next/link'
import { getHolaflyAffiliateLink } from '@/lib/holafly-affiliate-mapping'

interface ProviderPageProps {
  params: {
    provider: string
    locale: string
  }
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { provider } = params
  
  // Decodifica il nome del provider (es. "holafly" -> "Holafly")
  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1)
  
  // Ottieni le offerte per questo provider
  const offers = esimService.getOffersByProvider(providerName)
  
  if (offers.length === 0) {
    notFound()
  }

  // Ottieni informazioni sul provider
  const providerInfo = esimService.getProviderInfo(providerName)
  
  // Raggruppa le offerte per paese
  const offersByCountry = offers.reduce((acc, offer) => {
    if (!acc[offer.paese]) {
      acc[offer.paese] = []
    }
    acc[offer.paese].push(offer)
    return acc
  }, {} as Record<string, EsimOffer[]>)

  const getProviderLogo = (provider: string) => {
    const logos: Record<string, string> = {
      'Airalo': '/images/providers/airalo-logo.png',
      'Holafly': '/images/providers/holafly-logo.png',
      'Saily': '/images/providers/saily-logo.png',
      'Ubigi': '/images/providers/ubigi-logo.png',
      'Nomad': '/images/providers/nomad-logo.png',
      'Jetpac': '/images/providers/jetpac-logo.png',
      'eSIM4Travel': '/images/providers/esim4travel-logo.png',
      'Maya': '/images/providers/maya-logo.png',
      'aloSIM': '/images/providers/alosim-logo.png',
      'Sim Local': '/images/providers/simlocal-logo.png',
      'Roamless': '/images/providers/roamless-logo.png',
      'Menalink': '/images/providers/menalink-logo.png',
      'GoMoWorld': '/images/providers/gomoworld-logo.png',
      'YeSim': '/images/providers/yesim-logo.png',
      'Yesim': '/images/providers/yesim-logo.png',
      'Firsty': '/images/providers/default-logo.png',
      'eSIMGo': '/images/providers/esimgo-logo.png',
      '3': '/images/providers/3-logo.png',
      'dtac': '/images/providers/dtac-logo.png',
      'IIJ': '/images/providers/iij-logo.png',
      'NextLink': '/images/providers/nextlink-logo.png',
      'RoamVault': '/images/providers/roamvault-logo.png',
      'Sparks': '/images/providers/sparks-logo.png',
      'TSimTech': '/images/providers/tsimtech-logo.png'
    }
    return logos[provider] || '/images/providers/default-logo.png'
  }

  const getProviderWebsite = (provider: string, country?: string) => {
    // Special handling for Holafly to use country-specific affiliate links
    if (provider.toLowerCase() === 'holafly') {
      return getHolaflyAffiliateLink(country);
    }

    const websites: Record<string, string> = {
      'Airalo': 'https://finanza.me/airalo',
      'Holafly': 'https://esim.holafly.com/it/?discount=FINANZAPERSONALE&utm_source=affiliate&utm_medium=Andrea%20Loperfido&utm_campaign=3417596&irgwc=1&tw_source=impact&tw_campaign=3417596&tw_term=2006335', // Fallback for generic Holafly
      'Saily': 'https://finanza.me/saily',
      'Ubigi': 'https://finanza.me/ubigi',
      'Nomad': 'https://finanza.me/nomad',
      'Jetpac': 'https://finanza.me/jetpac',
      'eSIM4Travel': 'https://finanza.me/esim4travel',
      'Maya': 'https://finanza.me/maya',
      'aloSIM': 'https://finanza.me/alosim',
      'Sim Local': 'https://finanza.me/simlocal',
      'Roamless': 'https://finanza.me/roamless',
      'Menalink': 'https://finanza.me/menalink',
      'GoMoWorld': 'https://finanza.me/gomoworld',
      'YeSim': 'https://finanza.me/yesim',
      'Yesim': 'https://finanza.me/yesim',
      'Firsty': 'https://finanza.me/firsty',
      'eSIMGo': 'https://finanza.me/esimgo',
      '3': 'https://finanza.me/3',
      'dtac': 'https://finanza.me/dtac',
      'IIJ': 'https://finanza.me/iij',
      'NextLink': 'https://finanza.me/nextlink',
      'RoamVault': 'https://finanza.me/roamvault',
      'Sparks': 'https://finanza.me/sparks',
      'TSimTech': 'https://finanza.me/tsimtech'
    }
    return websites[provider] || '#'
  }

  const getReviewLink = (provider: string) => {
    const reviewLinks: Record<string, string> = {
      'Saily': 'https://puntifurbi.com/blog/recensione-saily-2025-opinioni-reali-sul-servizio-esim-di-nordvpn-e-confronto-prezzi/',
      'Holafly': 'https://puntifurbi.com/blog/la-mia-opinione-sulla-esim-holafly-ne-vale-davvero-la-pena/'
    }
    return reviewLinks[provider] || null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={getProviderLogo(providerName)} 
              alt={providerName} 
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{providerName}</h1>
              <p className="text-gray-600">Tutte le offerte eSIM disponibili</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href={getProviderWebsite(providerName)}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visita il sito ufficiale
              </Button>
            </Link>
            
            {getReviewLink(providerName) && (
              <Link href={getReviewLink(providerName)!}>
                <Button variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Leggi la recensione
                </Button>
              </Link>
            )}
            
            <Link href="/esim">
              <Button variant="outline">
                <TrendingDown className="w-4 h-4 mr-2" />
                Confronta con altri provider
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistiche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{offers.length}</div>
              <div className="text-sm text-gray-600">Offerte totali</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{Object.keys(offersByCountry).length}</div>
              <div className="text-sm text-gray-600">Paesi disponibili</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">
                €{Math.min(...offers.map(o => o.prezzo)).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Prezzo più basso</div>
            </CardContent>
          </Card>
        </div>

        {/* Offerte per paese */}
        <div className="space-y-6">
          {Object.entries(offersByCountry).map(([country, countryOffers]) => (
            <Card key={country}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🇺🇸</span>
                  {country}
                  <Badge variant="secondary">{countryOffers.length} offerte</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {countryOffers.map((offer, index) => (
                    <div
                      key={`${offer.paese}-${offer.durata}-${offer.gb}-${index}`}
                      className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-xs text-gray-500">Dati totali</div>
                              <div className="font-semibold">
                                {typeof offer.gb === 'string' ? offer.gb : `${offer.gb} GB`}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Valido per</div>
                              <div className="font-semibold">{offer.durata} giorni</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Prezzo</div>
                              <div className="font-semibold text-lg">€{offer.prezzo.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <Link href={getProviderWebsite(providerName)}>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                              Acquista
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
