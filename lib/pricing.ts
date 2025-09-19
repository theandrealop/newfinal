export interface PricingPlan {
  id: string
  name: string
  priceId: string
  price: number
  yearlyPriceId?: string
  yearlyPrice?: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  color: string
  popular?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'premium',
    name: 'Premium',
    priceId: 'price_1RkqssLhwgrXzl4cHffnRCCn', // Premium Mensile
    price: 4.90,
    yearlyPriceId: 'price_1Rlt5sLhwgrXzl4cjs4vicMF', // Premium Annuale
    yearlyPrice: 49.90,
    currency: 'EUR',
    interval: 'month',
    features: [
      'Tutte le offerte Economy e Premium Economy',
      'Offerte esclusive in Business e First Class',
      'Segnalazioni di tariffe error fare premium',
      'Supporto via email prioritario',
      'Accesso a offerte riservate'
    ],
    color: '#483cff'
  },
  {
    id: 'elite',
    name: 'Elite',
    priceId: 'price_1RkssfLhwgrXzl4cMXVOdKdW', // Elite Mensile
    price: 19.90,
    yearlyPriceId: 'price_1Rlt6ELhwgrXzl4cO1G0R5y7', // Elite Annuale
    yearlyPrice: 199.90,
    currency: 'EUR',
    interval: 'month',
    features: [
      'Tutto il piano Premium',
      'Concierge personale',
      'Servizi premium di travel hacking',
      'Ricerca personalizzata con punti e miglia',
      '1 consulenza personalizzata al mese',
      'Accesso anticipato a tutte le offerte',
      'Consigli su status, carte e strategie travel hacking'
    ],
    color: '#483cff',
    popular: true
  }
]

export const getPlanById = (id: string): PricingPlan | undefined => {
  return pricingPlans.find(plan => plan.id === id)
}

export const getPlanByPriceId = (priceId: string): PricingPlan | undefined => {
  return pricingPlans.find(plan => plan.priceId === priceId || plan.yearlyPriceId === priceId)
}

// Helper per ottenere il priceId corretto in base all'intervallo di fatturazione
export const getPriceIdForInterval = (planId: string, interval: 'month' | 'year'): string | undefined => {
  const plan = getPlanById(planId)
  if (!plan) return undefined
  
  return interval === 'year' ? (plan.yearlyPriceId || plan.priceId) : plan.priceId
}

// Helper per formattare i prezzi
export const formatPrice = (price: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

// Legacy compatibility per transizione graduale
export const legacyPlansConfig = {
  premium: {
    name: 'Premium',
    price: 4.90,
    yearlyPrice: 49.90,
    features: pricingPlans[0].features,
    color: '#483cff'
  },
  elite: {
    name: 'Elite',
    price: 19.90,
    yearlyPrice: 199.90,
    features: pricingPlans[1].features,
    color: '#483cff'
  }
}