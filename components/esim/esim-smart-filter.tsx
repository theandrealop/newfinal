"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingDown } from 'lucide-react'
import { esimService } from '@/lib/esim-service'
import { EsimOffer, EsimFilter } from '@/types/esim'
import { CountrySelector } from './country-selector'

interface EsimSmartFilterProps {
  onCompare?: (offers: EsimOffer[]) => void
}

export function EsimSmartFilter({ onCompare }: EsimSmartFilterProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedDuration, setSelectedDuration] = useState<string>('')
  const [selectedGB, setSelectedGB] = useState<string>('')
  const [countries, setCountries] = useState<string[]>([])

  useEffect(() => {
    console.log('EsimSmartFilter: Caricamento dati...')
    try {
      const fallbackCountries = ['Italia', 'Francia', 'Marocco', 'Thailandia', 'Stati Uniti', 'Brasile', 'Indonesia', 'Giappone', 'Turchia', 'Australia', 'Emirati Arabi', 'Sudafrica', 'Spagna']

      const serviceCountries = esimService.getAvailableCountries()
      console.log('Service countries:', serviceCountries)
      console.log('Service countries length:', serviceCountries.length)

      // Se il servizio non ha dati, usa i fallback
      if (serviceCountries.length === 0) {
        console.log('Nessun paese dal servizio, uso fallback')
        setCountries(fallbackCountries)
      } else {
        console.log('Usando paesi dal servizio')
        setCountries(serviceCountries)
      }
    } catch (error) {
      console.error('Errore nel caricamento dei dati eSIM:', error)
      setCountries(['Italia', 'Francia', 'Marocco', 'Thailandia', 'Stati Uniti', 'Brasile', 'Indonesia', 'Giappone', 'Turchia', 'Australia', 'Emirati Arabi', 'Sudafrica', 'Spagna'])
    }
  }, [])

  const handleCompare = () => {
    console.log('Confronta cliccato:', { selectedCountry, selectedDuration, selectedGB })
    if (!selectedCountry) return

    const filters: EsimFilter = { paese: selectedCountry }
    
    // Gestione durata
    if (selectedDuration) {
      if (selectedDuration === '1-6') {
        // Per viaggi brevi, includi solo offerte fino a 7 giorni
        filters.durataMin = 1
        filters.durataMax = 7
      } else if (selectedDuration === '7-14') {
        // Per 1-2 settimane, includi offerte da 7 giorni in su (30 giorni va bene)
        filters.durataMin = 7
        // Nessun limite massimo - una 30 giorni copre comunque 1-2 settimane
      } else if (selectedDuration === '15-29') {
        // Per 15-29 giorni, includi offerte da 15 giorni in su (30 giorni va bene)
        filters.durataMin = 15
        // Nessun limite massimo - una 30 giorni copre comunque 15-29 giorni
      } else if (selectedDuration === '30+') {
        // Per 30+ giorni, solo offerte da 30 giorni in su
        filters.durataMin = 30
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
       console.log('Offerte trovate:', offers)
      
      if (onCompare) {
        onCompare(offers)
      } else {
        const comparisonSection = document.getElementById('esim-comparison')
        if (comparisonSection) {
          comparisonSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } catch (error) {
      console.error('Errore nel confronto:', error)
    }
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Durata selezionata:', e.target.value)
    setSelectedDuration(e.target.value)
  }

  const handleGBChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('GB selezionati:', e.target.value)
    setSelectedGB(e.target.value)
  }

  console.log('Render EsimSmartFilter:', { countries, selectedCountry, selectedDuration, selectedGB })

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trova il miglior pacchetto eSIM
            </h2>
            <p className="text-lg text-gray-600">
              Confronta prezzi e trova l'offerta perfetta per il tuo viaggio
            </p>
          </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             {/* Paese */}
             <div>
               <label className="block text-sm font-semibold text-gray-700 mb-3">
                 DOVE STAI ANDANDO?
               </label>
               <CountrySelector
                 selectedCountry={selectedCountry}
                 onCountrySelect={setSelectedCountry}
                 countries={countries}
               />
             </div>

            {/* Durata */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                QUANTO DURA IL TUO VIAGGIO?
              </label>
              <select 
                value={selectedDuration} 
                onChange={handleDurationChange}
                className="w-full h-14 text-lg bg-white border-2 border-gray-200 hover:border-blue-300 transition-colors rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleziona durata</option>
                <option value="1-6">Meno di una settimana</option>
                <option value="7-14">1-2 settimane</option>
                <option value="15-29">15-29 giorni</option>
                <option value="30+">30 giorni o più</option>
              </select>
            </div>

            {/* GB */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                DI QUANTI DATI HAI BISOGNO?
              </label>
              <select 
                value={selectedGB} 
                onChange={handleGBChange}
                className="w-full h-14 text-lg bg-white border-2 border-gray-200 hover:border-blue-300 transition-colors rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Mostra tutto</option>
                <option value="5+">5 GB o più</option>
                <option value="10+">10 GB o più</option>
                <option value="20+">20 GB o più</option>
                <option value="50+">50 GB o più</option>
                <option value="100+">100 GB o più</option>
                <option value="illimitati">Dati illimitati</option>
              </select>
            </div>
          </div>

          {/* Pulsante Confronta */}
          <div className="text-center">
            <Button
              onClick={handleCompare}
              disabled={!selectedCountry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <TrendingDown className="w-5 h-5 mr-2" />
              Confronta eSIM
            </Button>
          </div>

          {/* Loghi Partner */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500 mb-4">
              Provider partner
            </p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {['Airalo', 'Holafly', 'Saily', 'Ubigi', 'Nomad'].map(provider => (
                <div key={provider} className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{provider}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
