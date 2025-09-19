"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpDown, ExternalLink, Star, TrendingDown } from 'lucide-react'
import { esimService } from '@/lib/esim-service'
import { EsimOffer, EsimFilter } from '@/types/esim'

export function EsimComparisonTable() {
  const [offers, setOffers] = useState<EsimOffer[]>([])
  const [filters, setFilters] = useState<EsimFilter>({})
  const [sortBy, setSortBy] = useState<'prezzo' | 'durata' | 'gb'>('prezzo')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>()
  const [selectedGB, setSelectedGB] = useState<number | string | undefined>()

  const countries = esimService.getAvailableCountries()
  const durations = esimService.getAvailableDurations()
  const gbOptions = esimService.getAvailableGB()

  // Ascolta i cambiamenti dei filtri dal componente principale
  useEffect(() => {
    const handleFiltersChanged = (event: CustomEvent) => {
      const newFilters = event.detail as EsimFilter
      console.log('Filtri ricevuti nella tabella:', newFilters)
      
      // Aggiorna i filtri locali
      setSelectedCountry(newFilters.paese || 'all')
      
             // Gestione durata per i nuovi filtri
       if (newFilters.durata) {
         setSelectedDuration(newFilters.durata)
       } else if (newFilters.durataMin && newFilters.durataMax) {
         // Mappa i range di durata ai valori del select
         if (newFilters.durataMin === 1 && newFilters.durataMax === 7) {
           setSelectedDuration(7) // "Meno di una settimana"
         } else if (newFilters.durataMin === 7 && newFilters.durataMax === 14) {
           setSelectedDuration(10) // "1-2 settimane"
         } else if (newFilters.durataMin === 15 && newFilters.durataMax === 29) {
           setSelectedDuration(15) // "15-29 giorni"
         } else if (newFilters.durataMin === 30) {
           setSelectedDuration(30) // "30 giorni o più"
         }
       }
      
      // Gestione GB per i nuovi filtri
      if (newFilters.gb) {
        setSelectedGB(newFilters.gb)
      } else if (newFilters.gbMin) {
        // Mappa i GB minimi ai valori del select
        setSelectedGB(newFilters.gbMin)
      }
      
      // Applica i filtri
      const filteredOffers = esimService.filterOffers(newFilters)
      const sortedOffers = sortOffers(filteredOffers, sortBy, sortOrder)
      setOffers(sortedOffers)
      setFilters(newFilters)
    }

    // Ascolta l'evento custom
    window.addEventListener('esimFiltersChanged', handleFiltersChanged as EventListener)

    // Carica i filtri dal localStorage all'avvio
    const savedFilters = localStorage.getItem('esimFilters')
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters) as EsimFilter
        console.log('Filtri caricati dal localStorage:', parsedFilters)
        
        setSelectedCountry(parsedFilters.paese || 'all')
        
                 // Gestione durata per i nuovi filtri
         if (parsedFilters.durata) {
           setSelectedDuration(parsedFilters.durata)
         } else if (parsedFilters.durataMin && parsedFilters.durataMax) {
           // Mappa i range di durata ai valori del select
           if (parsedFilters.durataMin === 1 && parsedFilters.durataMax === 7) {
             setSelectedDuration(7) // "Meno di una settimana"
           } else if (parsedFilters.durataMin === 7 && parsedFilters.durataMax === 14) {
             setSelectedDuration(10) // "1-2 settimane"
           } else if (parsedFilters.durataMin === 15 && parsedFilters.durataMax === 29) {
             setSelectedDuration(15) // "15-29 giorni"
           } else if (parsedFilters.durataMin === 30) {
             setSelectedDuration(30) // "30 giorni o più"
           }
         }
        
        // Gestione GB per i nuovi filtri
        if (parsedFilters.gb) {
          setSelectedGB(parsedFilters.gb)
        } else if (parsedFilters.gbMin) {
          // Mappa i GB minimi ai valori del select
          setSelectedGB(parsedFilters.gbMin)
        }
        
        const filteredOffers = esimService.filterOffers(parsedFilters)
        const sortedOffers = sortOffers(filteredOffers, sortBy, sortOrder)
        setOffers(sortedOffers)
        setFilters(parsedFilters)
      } catch (error) {
        console.error('Errore nel parsing dei filtri dal localStorage:', error)
      }
    }

    return () => {
      window.removeEventListener('esimFiltersChanged', handleFiltersChanged as EventListener)
    }
  }, [sortBy, sortOrder])

  useEffect(() => {
    const newFilters: EsimFilter = {}
    if (selectedCountry && selectedCountry !== 'all') newFilters.paese = selectedCountry
    
         // Gestione durata per i nuovi filtri
     if (selectedDuration) {
       if (selectedDuration === 7) {
         newFilters.durataMin = 1
         newFilters.durataMax = 7  // Cambiato da 6 a 7 per includere "meno di una settimana"
       } else if (selectedDuration === 10) {
         newFilters.durataMin = 7
         newFilters.durataMax = 14
       } else if (selectedDuration === 15) {
         newFilters.durataMin = 15
         newFilters.durataMax = 29
       } else if (selectedDuration === 30) {
         newFilters.durataMin = 30
       } else {
         newFilters.durata = selectedDuration
       }
     }
    
    // Gestione GB per i nuovi filtri
    if (selectedGB) {
      if (selectedGB === 'illimitati') {
        newFilters.gb = 'illimitati'
      } else if (typeof selectedGB === 'number') {
        newFilters.gbMin = selectedGB
      }
    }

    const filteredOffers = esimService.filterOffers(newFilters)
    const sortedOffers = sortOffers(filteredOffers, sortBy, sortOrder)
    setOffers(sortedOffers)
    setFilters(newFilters)
  }, [selectedCountry, selectedDuration, selectedGB, sortBy, sortOrder])

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
      'Menalink': '/images/providers/menalink-logo.png'
    }
    return logos[provider] || '/images/providers/default-logo.png'
  }

  const getProviderWebsite = (provider: string) => {
    const websites: Record<string, string> = {
      'Airalo': 'https://airalo.com',
      'Holafly': 'https://holafly.com',
      'Saily': 'https://saily.com',
      'Ubigi': 'https://ubigi.com',
      'Nomad': 'https://nomad.com',
      'Jetpac': 'https://jetpac.com',
      'eSIM4Travel': 'https://esim4travel.com',
      'Maya': 'https://maya.com',
      'aloSIM': 'https://alosim.com',
      'Sim Local': 'https://simlocal.com',
      'Roamless': 'https://roamless.com',
      'Menalink': 'https://menalink.com'
    }
    return websites[provider] || '#'
  }

  const isCheapest = (offer: EsimOffer) => {
    const countryOffers = offers.filter(o => o.paese === offer.paese)
    return countryOffers.length > 0 && offer.prezzo === Math.min(...countryOffers.map(o => o.prezzo))
  }

  // Funzioni helper per mostrare i filtri applicati
  const getDurationDisplayText = () => {
    if (!selectedDuration) return "Tutte le durate"
    
    // Mappa i valori numerici ai testi dei nuovi filtri
    if (selectedDuration === 7) return "Meno di una settimana"
    if (selectedDuration === 10) return "1-2 settimane"
    if (selectedDuration === 15) return "15-29 giorni"
    if (selectedDuration === 30) return "30 giorni o più"
    
    return `${selectedDuration} giorni`
  }

  const getGBDisplayText = () => {
    if (!selectedGB) return "Tutti i GB"
    
    if (selectedGB === 'illimitati') return "Dati illimitati"
    if (typeof selectedGB === 'number') {
      if (selectedGB >= 5) return `${selectedGB}+ GB`
      return `${selectedGB} GB`
    }
    
    return selectedGB.toString()
  }

  return (
    <div className="space-y-6">
      {/* Filtri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Filtra e Confronta Offerte eSIM
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Paese</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona paese" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i paesi</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

                         <div>
               <label className="text-sm font-medium mb-2 block">Quanto dura il tuo viaggio?</label>
               <Select 
                 value={selectedDuration?.toString() || 'all'} 
                 onValueChange={(value) => setSelectedDuration(value === 'all' ? undefined : parseInt(value))}
               >
                 <SelectTrigger>
                   <SelectValue placeholder={getDurationDisplayText()} />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">Tutte le durate</SelectItem>
                   <SelectItem value="7">Meno di una settimana</SelectItem>
                   <SelectItem value="10">1-2 settimane</SelectItem>
                   <SelectItem value="15">15-29 giorni</SelectItem>
                   <SelectItem value="30">30 giorni o più</SelectItem>
                 </SelectContent>
               </Select>
             </div>

                         <div>
               <label className="text-sm font-medium mb-2 block">Di quanti dati hai bisogno?</label>
               <Select 
                 value={selectedGB?.toString() || 'all'} 
                 onValueChange={(value) => {
                   if (value === 'all') {
                     setSelectedGB(undefined)
                   } else if (value === 'illimitati') {
                     setSelectedGB('illimitati')
                   } else {
                     setSelectedGB(parseInt(value))
                   }
                 }}
               >
                 <SelectTrigger>
                   <SelectValue placeholder={getGBDisplayText()} />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">Mostra tutto</SelectItem>
                   <SelectItem value="5">5 GB o più</SelectItem>
                   <SelectItem value="10">10 GB o più</SelectItem>
                   <SelectItem value="20">20 GB o più</SelectItem>
                   <SelectItem value="50">50 GB o più</SelectItem>
                   <SelectItem value="100">100 GB o più</SelectItem>
                   <SelectItem value="illimitati">Dati illimitati</SelectItem>
                 </SelectContent>
               </Select>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Risultati */}
      <Card>
        <CardHeader>
          <CardTitle>
            Risultati ({offers.length} offerte trovate)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {offers.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Paese</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('durata')}
                        className="h-auto p-0 font-medium"
                      >
                        Durata
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('gb')}
                        className="h-auto p-0 font-medium"
                      >
                        GB
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('prezzo')}
                        className="h-auto p-0 font-medium"
                      >
                        Prezzo
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offers.map((offer, index) => (
                    <TableRow key={`${offer.provider}-${offer.paese}-${offer.durata}-${offer.gb}-${index}`}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={getProviderLogo(offer.provider)}
                            alt={offer.provider}
                            className="w-8 h-8 object-contain"
                          />
                          <span className="font-medium">{offer.provider}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{offer.paese}</Badge>
                      </TableCell>
                      <TableCell>{offer.durata} giorni</TableCell>
                      <TableCell>
                        {typeof offer.gb === 'string' ? offer.gb : `${offer.gb} GB`}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">€{offer.prezzo}</span>
                          {isCheapest(offer) && (
                            <Badge variant="default" className="bg-green-500">
                              <Star className="w-3 h-3 mr-1" />
                              Miglior prezzo
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(getProviderWebsite(offer.provider), '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Vai al sito
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nessuna offerta trovata con i filtri selezionati.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCountry('all')
                  setSelectedDuration(undefined)
                  setSelectedGB(undefined)
                }}
                className="mt-4"
              >
                Rimuovi filtri
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
