"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, Euro, Star, Zap } from 'lucide-react'

export function EsimDurationPlans() {
  const durationPlans = [
    {
      duration: '7 giorni',
      title: 'eSIM 7 giorni Italia - Migliore',
      description: 'Perfetta per weekend lunghi e viaggi brevi',
      bestProvider: 'Saily',
      avgPrice: '€8-15',
      dataGB: '5-20 GB',
      features: ['Attivazione istantanea', '5G', 'Hotspot', 'SMS'],
      bestFor: ['Weekend lunghi', 'Viaggi brevi', 'City break'],
      keyword: 'eSIM 7 giorni Italia migliore',
      popularity: 'high',
      savings: 'Fino al 60% vs roaming'
    },
    {
      duration: 'Weekend',
      title: 'eSIM Weekend Italia - Economica',
      description: 'Soluzione economica per weekend di 2-3 giorni',
      bestProvider: 'Nomad',
      avgPrice: '€5-10',
      dataGB: '3-10 GB',
      features: ['Prezzo basso', 'Attivazione rapida', '4G/5G'],
      bestFor: ['Weekend corti', 'Viaggi lampo', 'Budget limitato'],
      keyword: 'eSIM weekend Italia economica',
      popularity: 'medium',
      savings: 'Fino al 70% vs roaming'
    },
    {
      duration: '3 mesi',
      title: 'eSIM 3 mesi Italia - Unlimited',
      description: 'Piano lungo con dati illimitati per soggiorni estesi',
      bestProvider: 'Holafly',
      avgPrice: '€45-80',
      dataGB: 'Illimitati',
      features: ['Dati illimitati', '5G', 'Hotspot', 'Supporto 24/7'],
      bestFor: ['Soggiorni lunghi', 'Lavoro temporaneo', 'Studi all\'estero'],
      keyword: 'eSIM 3 mesi Italia unlimited',
      popularity: 'medium',
      savings: 'Fino al 50% vs piani mensili'
    },
    {
      duration: 'Giornaliera',
      title: 'eSIM Giornaliera Italia - Costo',
      description: 'Piano giornaliero per viaggi di un giorno',
      bestProvider: 'Ubigi',
      avgPrice: '€2-5',
      dataGB: '1-3 GB',
      features: ['Attivazione istantanea', 'Prezzo fisso', '4G'],
      bestFor: ['Gite giornaliere', 'Viaggi di lavoro', 'Test eSIM'],
      keyword: 'eSIM giornaliera Italia costo',
      popularity: 'low',
      savings: 'Fino all\'80% vs roaming'
    },
    {
      duration: '1 mese',
      title: 'eSIM Mensile Italia - Popolare',
      description: 'Il piano più popolare per viaggi di un mese',
      bestProvider: 'Airalo',
      avgPrice: '€15-30',
      dataGB: '10-50 GB',
      features: ['Ottimo rapporto qualità-prezzo', '5G', 'Hotspot', 'Top-up'],
      bestFor: ['Viaggi mensili', 'Vacanze', 'Lavoro temporaneo'],
      keyword: 'eSIM mensile Italia',
      popularity: 'high',
      savings: 'Fino al 65% vs roaming'
    },
    {
      duration: '6 mesi',
      title: 'eSIM Semestrale Italia - Conveniente',
      description: 'Piano semestrale con sconti significativi',
      bestProvider: 'Saily',
      avgPrice: '€80-150',
      dataGB: '50-100 GB',
      features: ['Sconto semestrale', '5G', 'Hotspot', 'Supporto dedicato'],
      bestFor: ['Soggiorni lunghi', 'Lavoro temporaneo', 'Studi'],
      keyword: 'eSIM semestrale Italia',
      popularity: 'low',
      savings: 'Fino al 40% vs piani mensili'
    }
  ]

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'high': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPopularityText = (popularity: string) => {
    switch (popularity) {
      case 'high': return 'Molto Popolare'
      case 'medium': return 'Popolare'
      case 'low': return 'Niche'
      default: return 'Sconosciuto'
    }
  }

  const getPopularityIcon = (popularity: string) => {
    switch (popularity) {
      case 'high': return <Star className="w-4 h-4 text-green-600" />
      case 'medium': return <Zap className="w-4 h-4 text-yellow-600" />
      case 'low': return <Clock className="w-4 h-4 text-gray-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Piani eSIM per Durata
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Scegli il piano eSIM perfetto per la durata del tuo viaggio. 
              Dalla giornaliera al semestrale, trova la soluzione più conveniente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {durationPlans.map((plan) => (
              <Card key={plan.duration} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {plan.duration}
                        </CardTitle>
                        <Badge className={getPopularityColor(plan.popularity)}>
                          {getPopularityIcon(plan.popularity)}
                          <span className="ml-1">{getPopularityText(plan.popularity)}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Prezzo:</span>
                        <p className="font-semibold text-green-600">{plan.avgPrice}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Dati:</span>
                        <p className="font-semibold">{plan.dataGB}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 text-sm">Miglior Provider:</span>
                      <p className="font-semibold text-blue-600">{plan.bestProvider}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Caratteristiche:</h4>
                      <div className="flex flex-wrap gap-1">
                        {plan.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Ideale per:</h4>
                      <ul className="space-y-1">
                        {plan.bestFor.map((use, index) => (
                          <li key={index} className="flex items-start space-x-2 text-xs text-gray-600">
                            <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Euro className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          {plan.savings}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-[#03464b] hover:bg-[#02363a] text-white"
                    size="sm"
                  >
                    Confronta Piani {plan.duration}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Come Scegliere la Durata Giusta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Viaggi Brevi (1-7 giorni)</h4>
                <p className="text-sm text-gray-600">
                  Scegli piani giornalieri o settimanali per massimizzare il risparmio
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Viaggi Medi (1-3 mesi)</h4>
                <p className="text-sm text-gray-600">
                  Piani mensili offrono il miglior rapporto qualità-prezzo
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Soggiorni Lunghi (3+ mesi)</h4>
                <p className="text-sm text-gray-600">
                  Piani semestrali con sconti significativi e top-up
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
