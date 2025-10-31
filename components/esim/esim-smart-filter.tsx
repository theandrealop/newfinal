"use client"

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingDown } from 'lucide-react'
import { esimService } from '@/lib/esim-service'
import { EsimOffer, EsimFilter } from '@/types/esim'
import { CountrySelector } from './country-selector'
import { CurrencySelector } from './currency-selector'
import { useCountryTranslation } from '@/lib/country-translations'

interface EsimSmartFilterProps {
  onCompare?: (offers: EsimOffer[]) => void
}

export function EsimSmartFilter({ onCompare }: EsimSmartFilterProps) {
  const t = useTranslations('ESim.smartFilter')
  const translateCountry = useCountryTranslation()
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedDuration, setSelectedDuration] = useState<string>('')
  const [selectedGB, setSelectedGB] = useState<string>('')
  const [countries, setCountries] = useState<string[]>([])

  useEffect(() => {
    try {
      const fallbackCountries = ['Italia', 'Francia', 'Marocco', 'Thailandia', 'Stati Uniti', 'Brasile', 'Indonesia', 'Giappone', 'Turchia', 'Australia', 'Emirati Arabi', 'Sudafrica', 'Spagna']
      
      const serviceCountries = esimService.getAvailableCountries()
      
      // Se il servizio non ha dati, usa i fallback
      if (serviceCountries.length === 0) {
        setCountries(fallbackCountries)
      } else {
        setCountries(serviceCountries)
      }
    } catch (error) {
      setCountries(['Italia', 'Francia', 'Marocco', 'Thailandia', 'Stati Uniti', 'Brasile', 'Indonesia', 'Giappone', 'Turchia', 'Australia', 'Emirati Arabi', 'Sudafrica', 'Spagna'])
    }
  }, [])

  const handleCompare = () => {
    if (!selectedCountry) return

    const filters: EsimFilter = { 
      paese: selectedCountry
    }
    
    // Gestione durata
    if (selectedDuration) {
      if (selectedDuration === '1-6') {
        filters.durata = 7
      } else if (selectedDuration === '7-14') {
        filters.durata = 14
      } else if (selectedDuration === '15-29') {
        filters.durata = 30
      } else if (selectedDuration === '30+') {
        filters.durata = 30
      }
    }
    
    // Gestione GB
    if (selectedGB && selectedGB !== '') {
      if (selectedGB === 'illimitati') {
        filters.gb = 'illimitati'
      } else if (selectedGB.endsWith('+')) {
        const minGB = parseInt(selectedGB.replace('+', ''))
        filters.gbMin = minGB
      }
    }

    localStorage.setItem('esimFilters', JSON.stringify(filters))
    window.dispatchEvent(new CustomEvent('esimFiltersChanged', { detail: filters }))

    try {
      const offers = esimService.filterOffers(filters)
      
      if (onCompare) {
        onCompare(offers)
      } else {
        // Scroll verso i risultati
        setTimeout(() => {
          const resultsElement = document.querySelector('[data-esim-results]')
          if (resultsElement) {
            resultsElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
            })
          }
        }, 100)
      }
    } catch (error) {
      console.error("Errore durante il filtraggio delle offerte:", error)
      if (onCompare) {
        onCompare([]) // Passa un array vuoto in caso di errore
      }
    }
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(e.target.value)
  }

  const handleGBChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGB(e.target.value)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t('title')}
            </h2>
            <p className="text-gray-600">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Paese */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('whereGoing')}
              </label>
              <CountrySelector
                countries={countries}
                selectedCountry={selectedCountry}
                onCountrySelect={setSelectedCountry}
                placeholder={t('countryPlaceholder')}
              />
            </div>

            {/* Durata */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('howLong')}
              </label>
              <select
                value={selectedDuration}
                onChange={handleDurationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('selectDuration')}</option>
                <option value="1-6">{t('lessThanWeek')}</option>
                <option value="7-14">{t('oneTwoWeeks')}</option>
                <option value="15-29">{t('fifteenTwentyNine')}</option>
                <option value="30+">{t('thirtyPlus')}</option>
              </select>
            </div>

            {/* GB */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('howMuchData')}
              </label>
              <select
                value={selectedGB}
                onChange={handleGBChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('showAll')}</option>
                <option value="5+">{t('fiveGBPlus')}</option>
                <option value="10+">{t('tenGBPlus')}</option>
                <option value="20+">{t('twentyGBPlus')}</option>
                <option value="50+">{t('fiftyGBPlus')}</option>
                <option value="100+">{t('hundredGBPlus')}</option>
                <option value="illimitati">{t('unlimitedData')}</option>
              </select>
            </div>
          </div>

          {/* Selettore Valuta */}
          <div className="flex justify-center mb-6">
            <CurrencySelector />
          </div>

          {/* Bottone Confronta */}
          <div className="text-center">
            <Button
              onClick={handleCompare}
              disabled={!selectedCountry}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <TrendingDown className="w-5 h-5 mr-2" />
              {t('compareButton')}
            </Button>
          </div>

          {/* Provider Partner */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('partnerProviders')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('partnerDescription')}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6">
              {/* Airalo - Link alla pagina dedicata */}
              <a 
                href="/esim/airalo" 
                className="flex items-center justify-center bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <img 
                  src="/images/providers/airalo-logo.png" 
                  alt="Airalo" 
                  className="w-12 h-12 object-contain"
                />
              </a>

              {/* Holafly - Link alla pagina dedicata */}
              <a 
                href="/esim/holafly" 
                className="flex items-center justify-center bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <img 
                  src="/images/providers/holafly-logo.png" 
                  alt="Holafly" 
                  className="w-12 h-12 object-contain"
                />
              </a>

              {/* Saily - Link alla pagina dedicata */}
              <a 
                href="/esim/saily" 
                className="flex items-center justify-center bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <img 
                  src="/images/providers/saily-logo.png" 
                  alt="Saily" 
                  className="w-12 h-12 object-contain"
                />
              </a>

              {/* Ubigi - Link alla pagina dedicata */}
              <a 
                href="/esim/ubigi" 
                className="flex items-center justify-center bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <img 
                  src="/images/providers/ubigi-logo.png" 
                  alt="Ubigi" 
                  className="w-12 h-12 object-contain"
                />
              </a>

              {/* Nomad - Link alla pagina dedicata */}
              <a 
                href="/esim/nomad" 
                className="flex items-center justify-center bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <img 
                  src="/images/providers/nomad-logo.png" 
                  alt="Nomad" 
                  className="w-12 h-12 object-contain"
                />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}