"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, Euro, Star, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function EsimDurationPlans() {
  const t = useTranslations('ESim.durationPlans')
  const durationPlans = [
    {
      id: 'sevenDays',
      duration: '7 giorni',
      title: t('sevenDays.title'),
      description: t('sevenDays.description'),
      bestProvider: t('sevenDays.bestProvider'),
      avgPrice: t('sevenDays.price'),
      dataGB: t('sevenDays.data'),
      features: [
        t('sevenDays.features.0'),
        t('sevenDays.features.1'),
        t('sevenDays.features.2'),
        t('sevenDays.features.3')
      ],
      bestFor: [
        t('sevenDays.idealFor.0'),
        t('sevenDays.idealFor.1'),
        t('sevenDays.idealFor.2')
      ],
      keyword: 'eSIM 7 giorni Italia migliore',
      popularity: 'high',
      savings: t('sevenDays.savings')
    },
    {
      id: 'weekend',
      duration: 'Weekend',
      title: t('weekend.title'),
      description: t('weekend.description'),
      bestProvider: t('weekend.bestProvider'),
      avgPrice: t('weekend.price'),
      dataGB: t('weekend.data'),
      features: [
        t('weekend.features.0'),
        t('weekend.features.1'),
        t('weekend.features.2')
      ],
      bestFor: [
        t('weekend.idealFor.0'),
        t('weekend.idealFor.1'),
        t('weekend.idealFor.2')
      ],
      keyword: 'eSIM weekend Italia economica',
      popularity: 'medium',
      savings: t('weekend.savings')
    },
    {
      id: 'threeMonths',
      duration: '3 mesi',
      title: t('threeMonths.title'),
      description: t('threeMonths.description'),
      bestProvider: t('threeMonths.bestProvider'),
      avgPrice: t('threeMonths.price'),
      dataGB: t('threeMonths.data'),
      features: [
        t('threeMonths.features.0'),
        t('threeMonths.features.1'),
        t('threeMonths.features.2'),
        t('threeMonths.features.3')
      ],
      bestFor: [
        t('threeMonths.idealFor.0'),
        t('threeMonths.idealFor.1'),
        t('threeMonths.idealFor.2')
      ],
      keyword: 'eSIM 3 mesi Italia unlimited',
      popularity: 'medium',
      savings: t('threeMonths.savings')
    },
    {
      id: 'daily',
      duration: 'Giornaliera',
      title: t('daily.title'),
      description: t('daily.description'),
      bestProvider: t('daily.bestProvider'),
      avgPrice: t('daily.price'),
      dataGB: t('daily.data'),
      features: [
        t('daily.features.0'),
        t('daily.features.1'),
        t('daily.features.2')
      ],
      bestFor: [
        t('daily.idealFor.0'),
        t('daily.idealFor.1'),
        t('daily.idealFor.2')
      ],
      keyword: 'eSIM giornaliera Italia costo',
      popularity: 'low',
      savings: t('daily.savings')
    },
    {
      id: 'monthly',
      duration: '1 mese',
      title: t('monthly.title'),
      description: t('monthly.description'),
      bestProvider: t('monthly.bestProvider'),
      avgPrice: t('monthly.price'),
      dataGB: t('monthly.data'),
      features: [
        t('monthly.features.0'),
        t('monthly.features.1'),
        t('monthly.features.2'),
        t('monthly.features.3')
      ],
      bestFor: [
        t('monthly.idealFor.0'),
        t('monthly.idealFor.1'),
        t('monthly.idealFor.2')
      ],
      keyword: 'eSIM mensile Italia',
      popularity: 'high',
      savings: t('monthly.savings')
    },
    {
      id: 'sixMonths',
      duration: '6 mesi',
      title: t('sixMonths.title'),
      description: t('sixMonths.description'),
      bestProvider: t('sixMonths.bestProvider'),
      avgPrice: t('sixMonths.price'),
      dataGB: t('sixMonths.data'),
      features: [
        t('sixMonths.features.0'),
        t('sixMonths.features.1'),
        t('sixMonths.features.2'),
        t('sixMonths.features.3')
      ],
      bestFor: [
        t('sixMonths.idealFor.0'),
        t('sixMonths.idealFor.1'),
        t('sixMonths.idealFor.2')
      ],
      keyword: 'eSIM semestrale Italia',
      popularity: 'low',
      savings: t('sixMonths.savings')
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
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
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
                    {t(`${plan.id}.cta`)}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {t('howToChooseDuration.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('howToChooseDuration.shortTrips.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('howToChooseDuration.shortTrips.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('howToChooseDuration.mediumTrips.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('howToChooseDuration.mediumTrips.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('howToChooseDuration.longStays.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('howToChooseDuration.longStays.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
