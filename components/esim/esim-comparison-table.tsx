"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpDown, ExternalLink, Star, TrendingDown, Copy, Check, Tag } from 'lucide-react'
import { esimService } from '@/lib/esim-service'
import { EsimOffer, EsimFilter } from '@/types/esim'

export function EsimComparisonTable() {
  const [offers, setOffers] = useState<EsimOffer[]>([])
  const [filters, setFilters] = useState<EsimFilter>({})
  const [sortBy, setSortBy] = useState<'prezzo' | 'durata' | 'gb'>('prezzo')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [copiedCodes, setCopiedCodes] = useState<Set<string>>(new Set())
  const [hasSearched, setHasSearched] = useState(false)

  // Ascolta i cambiamenti dei filtri dal componente principale
  useEffect(() => {
    const handleFiltersChanged = (event: CustomEvent) => {
      const newFilters = event.detail as EsimFilter
      console.log('Filtri ricevuti nella tabella:', newFilters)
      
      // Applica i filtri direttamente
      setHasSearched(true)
      
      // Applica i filtri
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


  const sortOffers = (offers: EsimOffer[], sortBy: string, order: 'asc' | 'desc') => {
    return [...offers].sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'prezzo':
          comparison = a.prezzo - b.prezzo
          break
        case 'durata':
          comparison = a.durata - b.durata
          break
        case 'gb':
          // Gestisce sia numeri che stringhe per i GB
          if (typeof a.gb === 'number' && typeof b.gb === 'number') {
            comparison = a.gb - b.gb
          } else if (typeof a.gb === 'string' && typeof b.gb === 'string') {
            comparison = a.gb.localeCompare(b.gb)
          } else if (typeof a.gb === 'string') {
            comparison = 1 // Le stringhe vengono dopo i numeri
          } else {
            comparison = -1 // I numeri vengono prima delle stringhe
          }
          break
        default:
          comparison = a.prezzo - b.prezzo
      }
      return order === 'asc' ? comparison : -comparison
    })
  }

  const handleSort = (column: 'prezzo' | 'durata' | 'gb') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
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

  const getProviderWebsite = (provider: string) => {
    const websites: Record<string, string> = {
      'Airalo': 'https://finanza.me/airalo',
      'Holafly': 'https://finanza.me/holafly',
      'Saily': 'https://finanza.me/saily',
      'Ubigi': 'https://finanza.me/ubigi',
      'Nomad': 'https://finanza.me/nomad',
      'Jetpac': 'https://finanza.me/mobimatter',
      'eSIM4Travel': 'https://finanza.me/esim4travel',
      'Maya': 'https://finanza.me/mobimatter',
      'aloSIM': 'https://finanza.me/mobimatter',
      'Sim Local': 'https://simlocal.com',
      'Roamless': 'https://finanza.me/mobimatter',
      'Menalink': 'https://menalink.com',
      'GoMoWorld': 'https://finanza.me/gomoworld',
      'YeSim': 'https://finanza.me/yesim',
      'Yesim': 'https://finanza.me/yesim',
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
              Risultati ({offers.length} offerte trovate)
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                            <div className="text-xs text-gray-500">{offer.paese}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-sm text-gray-700">
                          <div>
                            <div className="text-xs text-gray-500">Dati totali</div>
                            <div className="font-semibold">{typeof offer.gb === 'string' ? offer.gb : `${offer.gb} GB`}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Valido per</div>
                            <div className="font-semibold">{offer.durata} giorni</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Tipo di piano</div>
                            <div className="font-semibold">Solo dati</div>
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
                            
                            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={() => window.open(getProviderWebsite(offer.provider), '_blank')}>
                              Vai a {offer.provider}
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="rounded-lg border bg-slate-50 p-3">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">Prezzo</div>
                                <div className="text-xl font-bold text-gray-900">€ {offer.prezzo.toFixed(2)}</div>
                              </div>
                            </div>

                            <Button className="w-full bg-[#03464b] hover:bg-[#02363a] text-white" onClick={() => window.open(getProviderWebsite(offer.provider), '_blank')}>
                              Vai a {offer.provider}
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
              <p className="text-gray-500">Nessuna offerta trovata con i filtri selezionati.</p>
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
                Rimuovi filtri
              </Button>
            </div>
          )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
