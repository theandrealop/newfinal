"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpDown, ExternalLink, Star, TrendingDown, Copy, Check, Tag } from 'lucide-react'
import { esimService } from '@/lib/esim-service'
import { EsimOffer, EsimFilter, SortOption, SortOrder } from '@/types/esim'
import { EsimModernFilters } from './esim-modern-filters'
import { CurrencySelector } from './currency-selector'
import { useCurrency } from '@/hooks/use-currency'
import { useTranslations } from 'next-intl'
import { useCountryTranslation } from '@/lib/country-translations'
import { getHolaflyAffiliateLink } from '@/lib/holafly-affiliate-mapping'
import { getAiraloAffiliateLink } from '@/lib/airalo-affiliate-mapping'
import { getSailyAffiliateLink } from '@/lib/saily-affiliate-mapping'
import { getNomadAffiliateLink } from '@/lib/nomad-affiliate-mapping'
import { getGoMoWorldAffiliateLink } from '@/lib/gomoworld-affiliate-mapping'
import { getYesimAffiliateLink } from '@/lib/yesim-affiliate-mapping'

export function EsimComparisonTable() {
  const t = useTranslations('ESim.results')
  const translateCountry = useCountryTranslation()
  const { formatPrice, getCurrencySymbol } = useCurrency()
  const [offers, setOffers] = useState<EsimOffer[]>([])
  const [filters, setFilters] = useState<EsimFilter>({})
  const [sortBy, setSortBy] = useState<SortOption>('prezzo')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [copiedCodes, setCopiedCodes] = useState<Set<string>>(new Set())
  const [hasSearched, setHasSearched] = useState(false)

  // Ascolta i cambiamenti dei filtri dal componente principale
  useEffect(() => {
    const handleFiltersChanged = (event: CustomEvent) => {
      const newFilters = event.detail as EsimFilter
      console.log('Filtri ricevuti nella tabella:', newFilters)

      // Applica i filtri direttamente
      setHasSearched(true)

      // Applica i filtri base
      const filteredOffers = esimService.filterOffers(newFilters)
      const sortedOffers = sortOffers(filteredOffers, sortBy, sortOrder)
      setOffers(sortedOffers)
      setFilters(newFilters)
    }

    // Ascolta l'evento custom
    window.addEventListener('esimFiltersChanged', handleFiltersChanged as EventListener)

    // Non caricare automaticamente i filtri dal localStorage all'avvio
    // L'utente deve premere "Confronta eSIM" per vedere i risultati

    return () => {
      window.removeEventListener('esimFiltersChanged', handleFiltersChanged as EventListener)
    }
  }, [sortBy, sortOrder])


  const sortOffers = (offers: EsimOffer[], sortBy: SortOption, order: SortOrder) => {
    return [...offers].sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'prezzo':
          comparison = a.prezzo - b.prezzo
          break
        case 'dati':
          // Ordina per quantità di dati (GB) - Maggiore GB prima
          const getGbValue = (gb: any): number => {
            if (typeof gb === 'number') return gb
            if (typeof gb === 'string') {
              if (gb.toLowerCase().includes('unlimited') || gb.toLowerCase().includes('illimitati')) {
                return Infinity // Illimitati = infinito
              }
              const parsed = parseFloat(gb.replace(/[^\d.]/g, ''))
              return isNaN(parsed) ? 0 : parsed
            }
            return 0
          }
          
          const aGb = getGbValue(a.gb)
          const bGb = getGbValue(b.gb)
          comparison = bGb - aGb // Ordine decrescente: più GB prima
          break
        case 'validita':
          // Ordina per durata - Validità più lunga prima
          comparison = b.durata - a.durata // Ordine decrescente: durata più lunga prima
          break
        case 'prezzo-per-gb':
          // Calcola il rapporto prezzo/GB
          const aPricePerGB = typeof a.gb === 'number' && a.gb > 0 ? a.prezzo / a.gb : Infinity
          const bPricePerGB = typeof b.gb === 'number' && b.gb > 0 ? b.prezzo / b.gb : Infinity
          comparison = aPricePerGB - bPricePerGB
          break
        case 'provider':
          comparison = a.provider.localeCompare(b.provider)
          break
        default:
          comparison = a.prezzo - b.prezzo
      }
      return order === 'asc' ? comparison : -comparison
    })
  }

  const handleSortChange = (newSortBy: SortOption, newSortOrder: SortOrder) => {
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
    
    // Riorganizza le offerte con il nuovo ordinamento
    const sortedOffers = sortOffers(offers, newSortBy, newSortOrder)
    setOffers(sortedOffers)
  }

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

  // Mappa dei link alle recensioni per provider
  const getReviewLink = (provider: string) => {
    const reviewLinks: Record<string, string> = {
      'Saily': 'https://puntifurbi.com/blog/recensione-saily-2025-opinioni-reali-sul-servizio-esim-di-nordvpn-e-confronto-prezzi/',
      'Holafly': 'https://puntifurbi.com/blog/la-mia-opinione-sulla-esim-holafly-ne-vale-davvero-la-pena/'
    }
    return reviewLinks[provider] || null
  }

  const getProviderWebsite = (provider: string, country?: string) => {
    // Special handling for Holafly to use country-specific affiliate links
    if (provider.toLowerCase() === 'holafly') {
      return getHolaflyAffiliateLink(country);
    }

    // Special handling for Airalo to use country-specific affiliate links
    if (provider.toLowerCase() === 'airalo') {
      return getAiraloAffiliateLink(country);
    }

    // Special handling for Saily to use country-specific affiliate links
    if (provider.toLowerCase() === 'saily') {
      return getSailyAffiliateLink(country);
    }

    // Special handling for Nomad to use country-specific affiliate links
    if (provider.toLowerCase() === 'nomad') {
      return getNomadAffiliateLink(country);
    }

    // Special handling for GoMoWorld to use country-specific affiliate links
    if (provider.toLowerCase() === 'gomoworld') {
      return getGoMoWorldAffiliateLink(country);
    }

    // Special handling for Yesim to use country-specific affiliate links
    if (provider.toLowerCase() === 'yesim') {
      return getYesimAffiliateLink(country);
    }

    const websites: Record<string, string> = {
      'Airalo': 'https://finanza.me/airalo', // Fallback for generic Airalo
      'Holafly': 'https://esim.holafly.com/it/?discount=FINANZAPERSONALE&utm_source=affiliate&utm_medium=Andrea%20Loperfido&utm_campaign=3417596&irgwc=1&tw_source=impact&tw_campaign=3417596&tw_term=2006335', // Fallback for generic Holafly
      'Saily': 'https://finanza.me/saily', // Fallback for generic Saily
      'Nomad': 'https://finanza.me/nomad', // Fallback for generic Nomad
      'GoMoWorld': 'https://finanza.me/gomoworld', // Fallback for generic GoMoWorld
      'YeSim': 'https://finanza.me/yesim', // Fallback for generic Yesim
      'Yesim': 'https://finanza.me/yesim', // Fallback for generic Yesim
      'Ubigi': 'https://finanza.me/ubigi',
      'GigSky': 'https://finanza.me/gigsky',
      'Jetpac': 'https://finanza.me/mobimatter',
      'eSIM4Travel': 'https://finanza.me/esim4travel',
      'Maya': 'https://finanza.me/mobimatter',
      'aloSIM': 'https://finanza.me/mobimatter',
      'SimOptions': 'https://finanza.me/simoptions',
      'Sim Local': 'https://simlocal.com',
      'Roamless': 'https://finanza.me/mobimatter',
      'Menalink': 'https://menalink.com',
      'Firsty': 'https://finanza.me/firsty',
      'eSIMGo': 'https://finanza.me/mobimatter',
      '3': 'https://finanza.me/mobimatter',
      'dtac': 'https://finanza.me/mobimatter',
      'IIJ': 'https://finanza.me/mobimatter',
      'NextLink': 'https://finanza.me/mobimatter',
      'RoamVault': 'https://finanza.me/mobimatter',
      'Sparks': 'https://finanza.me/mobimatter',
      'TSimTech': 'https://finanza.me/mobimatter'
    }
    return websites[provider] || '#'
  }

  // Funzioni per il codice promozionale HolaFly
  const isHolaflyOffer = (provider: string) => {
    return provider.toLowerCase().includes('holafly')
  }

  const getDiscountedPrice = (originalPrice: number) => {
    return originalPrice * 0.95 // 5% di sconto
  }

  const copyPromoCode = async (offerId: string) => {
    try {
      await navigator.clipboard.writeText('FINANZAPERSONALE')
      setCopiedCodes(prev => new Set(prev).add(offerId))
      setTimeout(() => {
        setCopiedCodes(prev => {
          const newSet = new Set(prev)
          newSet.delete(offerId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Errore nella copia:', err)
    }
  }



  const isCheapest = (offer: EsimOffer) => {
    const countryOffers = offers.filter(o => o.paese === offer.paese)
    return countryOffers.length > 0 && offer.prezzo === Math.min(...countryOffers.map(o => o.prezzo))
  }


  return (
    <div className="space-y-6">
      {/* Risultati a CARD - Mostra solo se l'utente ha fatto una ricerca */}
      {hasSearched && (
        <Card data-esim-results>
          <CardHeader>
            <CardTitle>
              {t('title', { count: offers.length })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Controlli di ordinamento e valuta */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <EsimModernFilters 
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
              <CurrencySelector />
            </div>
          {offers.length > 0 ? (
            <div className="space-y-6">
              {offers.map((offer, index) => {
                return (
                  <div
                    key={`${offer.provider}-${offer.paese}-${offer.durata}-${offer.gb}-${index}`}
                    className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Left: Provider + info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={getProviderLogo(offer.provider)} alt={offer.provider} className="w-8 h-8 object-contain" />
                          <div>
                            <div className="font-bold text-gray-900">{offer.provider}</div>
                            <div className="text-xs text-gray-500">{translateCountry(offer.paese)}</div>
                            {getReviewLink(offer.provider) && (
                              <a 
                                href={getReviewLink(offer.provider)!} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="link-recensione-dettaglio"
                              >
                                {t('readReview')}
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-sm text-gray-700">
                          <div>
                            <div className="text-xs text-gray-500">{t('totalData')}</div>
                            <div className="font-semibold">{typeof offer.gb === 'string' ? (offer.gb.toLowerCase().includes('illimitati') ? t('unlimited') : offer.gb) : `${offer.gb} GB`}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">{t('validFor')}</div>
                            <div className="font-semibold">{offer.durata} {t('days')}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">{t('planType')}</div>
                            <div className="font-semibold">{t('dataOnly')}</div>
                          </div>
                        </div>
                      </div>

                      {/* Right: price and CTA */}
                      <div className="w-full md:w-80">
                        {isHolaflyOffer(offer.provider) ? (
                          <div className="space-y-3">
                            {/* Codice promozionale HolaFly */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Tag className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">
                                  Ottieni uno sconto del 5% con questo codice.
                                </span>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600 line-through">€ {offer.prezzo.toFixed(2)}</span>
                                <span className="text-lg font-bold text-gray-900">€ {getDiscountedPrice(offer.prezzo).toFixed(2)}</span>
                              </div>
                              {typeof offer.gb === 'number' && offer.gb > 0 && (
                                <div className="text-xs text-gray-500 text-right">
                                  €{(getDiscountedPrice(offer.prezzo) / offer.gb).toFixed(2)} per GB
                                </div>
                              )}
                              <div className="flex items-center justify-between bg-white border border-gray-200 rounded px-3 py-2">
                                <span className="font-mono text-sm font-medium">FINANZAPERSONALE</span>
                                <button
                                  onClick={() => copyPromoCode(`${offer.provider}-${offer.paese}-${index}`)}
                                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                                >
                                  {copiedCodes.has(`${offer.provider}-${offer.paese}-${index}`) ? (
                                    <span className="flex items-center gap-1">
                                      <Check className="w-3 h-3" />
                                      Copiato
                                    </span>
                                  ) : (
                                    'Copia'
                                  )}
                                </button>
                              </div>
                            </div>
                            
                            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={() => window.open(getProviderWebsite(offer.provider, offer.paese), '_blank')}>
                              Vai a {offer.provider}
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="rounded-lg border bg-slate-50 p-3">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">{t('price')}</div>
                                <div className="text-xl font-bold text-gray-900">{formatPrice(offer.prezzo)}</div>
                              </div>
                              {typeof offer.gb === 'number' && offer.gb > 0 && (
                                <div className="mt-2 text-xs text-gray-500">
                                  {formatPrice(offer.prezzo / offer.gb)} per GB
                                </div>
                              )}
                            </div>

                            <Button className="w-full bg-[#03464b] hover:bg-[#02363a] text-white" onClick={() => window.open(getProviderWebsite(offer.provider, offer.paese), '_blank')}>
                              {t('goTo')} {offer.provider}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('noOffersFound')}</p>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem('esimFilters')
                  setHasSearched(false)
                  setOffers([])
                  setFilters({})
                }}
                className="mt-4"
              >
                {t('removeFilters')}
              </Button>
            </div>
          )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
