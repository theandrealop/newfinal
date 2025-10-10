import esimOffers from '@/data/esim-offers.json'
import { EsimOffer, EsimFilter, EsimComparisonResult } from '@/types/esim'

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
      // Filtro paese
      if (filters.paese && offer.paese !== filters.paese) return false
      
      // Filtro durata (supporta range e valore esatto)
      if (filters.durata && offer.durata !== filters.durata) return false
      if (filters.durataMin && offer.durata < filters.durataMin) return false
      if (filters.durataMax && offer.durata > filters.durataMax) return false
      
      // Filtro GB (supporta range e valore esatto)
      if (filters.gb && offer.gb !== filters.gb) {
        // Gestisce la differenza di maiuscole/minuscole per "illimitati"
        if (filters.gb === 'illimitati' && offer.gb === 'Illimitati') {
          // Accetta entrambe le varianti
        } else {
          return false
        }
      }
      if (filters.gbMin) {
        // Se l'offerta ha GB illimitati, la includiamo sempre
        if (offer.gb === 'Illimitati' || offer.gb === 'illimitati') {
          // Includi offerte illimitate
        } else if (typeof offer.gb === 'number' && offer.gb < filters.gbMin) {
          return false
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
}

// Istanza singleton del servizio
export const esimService = new EsimService()
