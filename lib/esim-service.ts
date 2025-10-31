import esimOffers from '@/data/esim-offers.json'
import { EsimOffer, EsimFilter, EsimFilters, EsimComparisonResult } from '@/types/esim'

export class EsimService {
  private offers: EsimOffer[] = []

  constructor() {
    try {
      console.log('EsimService: Caricamento dati...')
      console.log('EsimService: Import esimOffers:', esimOffers)
      this.offers = esimOffers
      console.log('EsimService: Dati caricati:', this.offers.length, 'offerte')
      console.log('EsimService: Primi 3 paesi:', this.offers.slice(0, 3).map(o => o.paese))
    } catch (error) {
      console.error('EsimService: Errore nel caricamento dei dati:', error)
      this.offers = []
    }
  }

  /**
   * Filtra le offerte eSIM in base ai criteri specificati
   */
  filterOffers(filters: EsimFilter): EsimOffer[] {
    console.log('EsimService: Filtro offerte con criteri:', filters)
    const filtered = this.offers.filter(offer => {
      // Helper function per convertire valori in numeri
      const toNumber = (val: any) => {
        if (typeof val === 'string') {
          if (val.toLowerCase().includes('illimitati')) return Infinity;
          const clean = val.replace(/[^\d.]/g, '').trim();
          const parsed = parseFloat(clean);
          return isNaN(parsed) ? 0 : parsed;
        }
        return typeof val === 'number' ? val : 0;
      };

      // Filtro paese
      if (filters.paese && offer.paese !== filters.paese) return false
      
      // Filtro durata (supporta range e valore esatto)
      if (filters.durata) {
        const offerDuration = toNumber(offer.durata);
        const filterDuration = toNumber(filters.durata);
        
        // Logica più flessibile per durata
        if (filterDuration === 7) {
          // "Meno di una settimana" - accetta 1-7 giorni
          if (offerDuration > 7) return false
        } else if (filterDuration === 14) {
          // "1-2 settimane" - accetta 7-30 giorni (più flessibile)
          if (offerDuration < 7) return false
        } else if (filterDuration === 30) {
          // "15-29 giorni" o "30 giorni o più" - accetta 15+ giorni
          if (offerDuration < 15) return false
        }
      }
      if (filters.durataMin) {
        const offerDuration = toNumber(offer.durata);
        if (offerDuration < filters.durataMin) return false
      }
      if (filters.durataMax) {
        const offerDuration = toNumber(offer.durata);
        if (offerDuration > filters.durataMax) return false
      }
      
      // Filtro GB (supporta range e valore esatto)
      if (filters.gb) {
        // Gestione diretta per "illimitati"
        if (filters.gb === 'illimitati' || filters.gb === 'Illimitati') {
          // Se cerchiamo "illimitati", accetta solo offerte illimitate
          if (offer.gb !== 'illimitati' && offer.gb !== 'Illimitati') return false
        } else {
          // Se cerchiamo un valore specifico, confronta esatto
          const offerGb = toNumber(offer.gb);
          const filterGb = toNumber(filters.gb);
          if (offerGb !== filterGb) return false
        }
      }
      if (filters.gbMin) {
        // Se l'offerta ha GB illimitati, la includiamo sempre
        if (offer.gb === 'illimitati' || offer.gb === 'Illimitati') {
          // Includi sempre le offerte illimitate
        } else {
          const offerGb = toNumber(offer.gb);
          if (offerGb < filters.gbMin) return false
        }
      }
      
      // Filtro provider
      if (filters.provider && offer.provider !== filters.provider) return false
      
      return true
    })
    console.log('EsimService: Offerte filtrate:', filtered.length)
    return filtered
  }

  /**
   * Converte i nuovi filtri EsimFilters nei vecchi EsimFilter
   */
  private convertFilters(newFilters: EsimFilters): EsimFilter {
    const oldFilters: EsimFilter = {}
    
    // Paese
    if (newFilters.country) {
      oldFilters.paese = newFilters.country
    }
    
    // Durata
    if (newFilters.duration) {
      const durationMap: Record<string, number> = {
        '1-7d': 7,
        '1-2w': 14,
        '1m': 30,
        '2-3m': 60
      }
      oldFilters.durata = durationMap[newFilters.duration]
    }
    
    // Range di durata
    if (newFilters.validityRange) {
      oldFilters.durataMin = newFilters.validityRange.min
      oldFilters.durataMax = newFilters.validityRange.max
    }
    
    // GB
    if (newFilters.dataTier) {
      const dataTierMap: Record<string, number | string> = {
        '1gbplus': 1,
        '5gbplus': 5,
        '10gbplus': 10,
        '20gbplus': 20,
        '50gbplus': 50,
        'unlimited': 'illimitati'
      }
      oldFilters.gb = dataTierMap[newFilters.dataTier]
    }
    
    // Range di GB
    if (newFilters.dataRange) {
      oldFilters.gbMin = newFilters.dataRange.min
    }
    
    // Provider selezionati - NON applicare il filtro provider nel vecchio sistema
    // perché vogliamo mantenere tutti i provider selezionati
    // Il filtro provider verrà applicato nel nuovo sistema
    
    return oldFilters
  }

  /**
   * Filtra le offerte eSIM in base ai nuovi criteri EsimFilters
   */
  filterOffersAdvanced(filters: EsimFilters): EsimOffer[] {
    console.log('EsimService: Filtro avanzato con criteri:', filters)
    console.log('EsimService: Totale offerte disponibili:', this.offers.length)
    
    // Converti i nuovi filtri nei vecchi
    const oldFilters = this.convertFilters(filters)
    console.log('EsimService: Filtri convertiti:', oldFilters)
    let filtered = this.filterOffers(oldFilters)
    console.log('EsimService: Offerte dopo filtro base:', filtered.length)
    
    // Applica filtri aggiuntivi specifici per i nuovi filtri
    filtered = filtered.filter(offer => {
      // Helper function per convertire valori in numeri
      const toNumber = (val: any) => {
        if (typeof val === 'string') {
          if (val.toLowerCase().includes('illimitati')) return Infinity;
          const clean = val.replace(/[^\d.]/g, '').trim();
          const parsed = parseFloat(clean);
          return isNaN(parsed) ? 0 : parsed;
        }
        return typeof val === 'number' ? val : 0;
      };

      // Range di prezzo
      if (filters.priceRange) {
        const price = toNumber(offer.prezzo);
        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          console.log('EsimService: Filtro prezzo - offerta esclusa:', offer.provider, offer.prezzo, '->', price)
          return false
        }
      }
      
      // Range di durata (se specificato separatamente)
      if (filters.validityRange) {
        const duration = toNumber(offer.durata);
        if (duration < filters.validityRange.min || duration > filters.validityRange.max) {
          console.log('EsimService: Filtro durata - offerta esclusa:', offer.provider, offer.durata, '->', duration)
          return false
        }
      }
      
      // Range di GB (se specificato separatamente)
      if (filters.dataRange) {
        const normalizeGb = (val: any): number => {
          if (val === 'Illimitati' || val === 'illimitati') return Infinity
          if (typeof val === 'number') return val
          if (typeof val === 'string') {
            const parsed = parseFloat(val.replace(/[^\d.]/g, ''))
            return isNaN(parsed) ? 0 : parsed
          }
          return 0
        }

        const gb = normalizeGb(offer.gb)
        const min = filters.dataRange.min ?? 0
        const max = filters.dataRange.max ?? Infinity

        // Se max è definito come "50+" o simile, rendilo infinito
        const normalizedMax =
          typeof max === 'string' && (max as string).includes('+') ? Infinity : Number(max)

        if (gb !== Infinity && (gb < min || gb > normalizedMax)) {
          console.log('EsimService: Filtro GB - offerta esclusa:', offer.provider, offer.gb, '->', gb)
          return false
        }
        // Le offerte illimitate (Infinity) sono sempre incluse
      }
      
      // Filtri per provider selezionati (supporto multipli)
      // Se non ci sono provider selezionati, mostra tutti i provider
      if (filters.selectedProviders && filters.selectedProviders.length > 0) {
        if (!filters.selectedProviders.includes(offer.provider)) {
          console.log('EsimService: Filtro provider - offerta esclusa:', offer.provider)
          return false
        }
      }
      // Se non ci sono provider selezionati, non filtrare per provider
      
      return true
    })
    
    console.log('EsimService: Offerte filtrate (avanzato):', filtered.length)
    return filtered
  }

  /**
   * Ottiene tutte le offerte ordinate per prezzo (crescente)
   */
  getOffersSortedByPrice(filters?: EsimFilter): EsimOffer[] {
    const offers = filters ? this.filterOffers(filters) : this.offers
    return offers.sort((a, b) => a.prezzo - b.prezzo)
  }

  /**
   * Ottiene le migliori offerte per un paese specifico
   */
  getBestOffersForCountry(country: string, limit: number = 5): EsimOffer[] {
    const countryOffers = this.filterOffers({ paese: country })
    return countryOffers
      .sort((a, b) => a.prezzo - b.prezzo)
      .slice(0, limit)
  }

  /**
   * Ottiene statistiche di confronto per un paese
   */
  getComparisonStats(country: string): EsimComparisonResult {
    const offers = this.filterOffers({ paese: country })
    const totalOffers = offers.length
    const cheapestOffer = offers.length > 0 ? offers.reduce((min, offer) => 
      offer.prezzo < min.prezzo ? offer : min
    ) : undefined
    const averagePrice = offers.length > 0 
      ? offers.reduce((sum, offer) => sum + offer.prezzo, 0) / offers.length 
      : 0

    return {
      offers: offers.sort((a, b) => a.prezzo - b.prezzo),
      totalOffers,
      cheapestOffer,
      averagePrice: Math.round(averagePrice * 100) / 100
    }
  }

  /**
   * Ottiene tutti i paesi disponibili
   */
  getAvailableCountries(): string[] {
    const countries = [...new Set(this.offers.map(offer => offer.paese))].sort()
    console.log('EsimService: Paesi disponibili:', countries)
    return countries
  }

  /**
   * Ottiene tutti i provider disponibili
   */
  getAvailableProviders(): string[] {
    return [...new Set(this.offers.map(offer => offer.provider))].sort()
  }

  /**
   * Ottiene le durate disponibili
   */
  getAvailableDurations(): number[] {
    const durations = [...new Set(this.offers.map(offer => offer.durata))].sort((a, b) => a - b)
    console.log('EsimService: Durate disponibili:', durations)
    return durations
  }

  /**
   * Ottiene i GB disponibili (gestisce sia numeri che "illimitati")
   */
  getAvailableGB(): (number | string)[] {
    const gbValues = [...new Set(this.offers.map(offer => offer.gb))]
    
    // Separa numeri e stringhe
    const numericGB = gbValues.filter(gb => typeof gb === 'number').sort((a, b) => (a as number) - (b as number))
    const stringGB = gbValues.filter(gb => typeof gb === 'string')
    
    // Combina: prima i numeri, poi le stringhe
    const sortedGB = [...numericGB, ...stringGB]
    console.log('EsimService: GB disponibili:', sortedGB)
    return sortedGB
  }

  /**
   * Cerca offerte simili (stesso paese, durata o GB simili)
   */
  findSimilarOffers(offer: EsimOffer, limit: number = 3): EsimOffer[] {
    return this.offers
      .filter(o => 
        o.paese === offer.paese && 
        o.provider !== offer.provider &&
        (Math.abs(o.durata - offer.durata) <= 7 || 
         (typeof o.gb === 'number' && typeof offer.gb === 'number' && Math.abs(o.gb - offer.gb) <= 5) ||
         (typeof o.gb === 'string' && typeof offer.gb === 'string' && o.gb === offer.gb))
      )
      .sort((a, b) => a.prezzo - b.prezzo)
      .slice(0, limit)
  }

  /**
   * Ottiene le offerte più economiche per ogni paese
   */
  getCheapestByCountry(): Record<string, EsimOffer> {
    const cheapestByCountry: Record<string, EsimOffer> = {}
    
    this.getAvailableCountries().forEach(country => {
      const countryOffers = this.filterOffers({ paese: country })
      if (countryOffers.length > 0) {
        cheapestByCountry[country] = countryOffers.reduce((min, offer) => 
          offer.prezzo < min.prezzo ? offer : min
        )
      }
    })
    
    return cheapestByCountry
  }

  /**
   * Ottiene statistiche generali del database
   */
  getDatabaseStats() {
    const totalOffers = this.offers.length
    const countries = this.getAvailableCountries().length
    const providers = this.getAvailableProviders().length
    const averagePrice = this.offers.reduce((sum, offer) => sum + offer.prezzo, 0) / totalOffers
    const cheapestOffer = this.offers.reduce((min, offer) => 
      offer.prezzo < min.prezzo ? offer : min
    )

    return {
      totalOffers,
      countries,
      providers,
      averagePrice: Math.round(averagePrice * 100) / 100,
      cheapestOffer,
      priceRange: {
        min: Math.min(...this.offers.map(o => o.prezzo)),
        max: Math.max(...this.offers.map(o => o.prezzo))
      }
    }
  }

  /**
   * Ottiene tutte le offerte per un provider specifico
   */
  getOffersByProvider(provider: string): EsimOffer[] {
    return this.offers.filter(offer => offer.provider === provider)
  }

  /**
   * Ottiene informazioni su un provider
   */
  getProviderInfo(provider: string) {
    const offers = this.getOffersByProvider(provider)
    if (offers.length === 0) return null

    const countries = [...new Set(offers.map(o => o.paese))]
    const cheapestOffer = offers.reduce((cheapest, current) => 
      current.prezzo < cheapest.prezzo ? current : cheapest
    )

    return {
      name: provider,
      totalOffers: offers.length,
      countries: countries,
      cheapestOffer,
      priceRange: {
        min: Math.min(...offers.map(o => o.prezzo)),
        max: Math.max(...offers.map(o => o.prezzo))
      }
    }
  }
}

// Istanza singleton del servizio
export const esimService = new EsimService()
