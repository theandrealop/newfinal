"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Globe, MapPin, Search } from 'lucide-react'
import { esimService } from '@/lib/esim-service'

export function EsimGeographicSelector() {
  const [activeTab, setActiveTab] = useState('europe')
  const [searchQuery, setSearchQuery] = useState('')

  const regions = {
    europe: {
      name: 'Europa',
      icon: '🇪🇺',
      countries: [
        { name: 'Italia', flag: '🇮🇹', slug: 'italia' },
        { name: 'Francia', flag: '🇫🇷', slug: 'francia' },
        { name: 'Germania', flag: '🇩🇪', slug: 'germania' },
        { name: 'Spagna', flag: '🇪🇸', slug: 'spagna' },
        { name: 'Regno Unito', flag: '🇬🇧', slug: 'regno-unito' },
        { name: 'Paesi Bassi', flag: '🇳🇱', slug: 'paesi-bassi' },
        { name: 'Belgio', flag: '🇧🇪', slug: 'belgio' },
        { name: 'Svizzera', flag: '🇨🇭', slug: 'svizzera' },
        { name: 'Austria', flag: '🇦🇹', slug: 'austria' },
        { name: 'Grecia', flag: '🇬🇷', slug: 'grecia' }
      ]
    },
    asia: {
      name: 'Asia',
      icon: '🌏',
      countries: [
        { name: 'Giappone', flag: '🇯🇵', slug: 'giappone' },
        { name: 'Corea del Sud', flag: '🇰🇷', slug: 'corea-del-sud' },
        { name: 'Cina', flag: '🇨🇳', slug: 'cina' },
        { name: 'Thailandia', flag: '🇹🇭', slug: 'thailandia' },
        { name: 'Vietnam', flag: '🇻🇳', slug: 'vietnam' },
        { name: 'Singapore', flag: '🇸🇬', slug: 'singapore' },
        { name: 'Malaysia', flag: '🇲🇾', slug: 'malaysia' },
        { name: 'Indonesia', flag: '🇮🇩', slug: 'indonesia' },
        { name: 'India', flag: '🇮🇳', slug: 'india' },
        { name: 'Filippine', flag: '🇵🇭', slug: 'filippine' }
      ]
    },
    americas: {
      name: 'Americhe',
      icon: '🌎',
      countries: [
        { name: 'Stati Uniti', flag: '🇺🇸', slug: 'stati-uniti' },
        { name: 'Canada', flag: '🇨🇦', slug: 'canada' },
        { name: 'Messico', flag: '🇲🇽', slug: 'messico' },
        { name: 'Brasile', flag: '🇧🇷', slug: 'brasile' },
        { name: 'Argentina', flag: '🇦🇷', slug: 'argentina' },
        { name: 'Cile', flag: '🇨🇱', slug: 'cile' },
        { name: 'Colombia', flag: '🇨🇴', slug: 'colombia' },
        { name: 'Perù', flag: '🇵🇪', slug: 'peru' },
        { name: 'Costa Rica', flag: '🇨🇷', slug: 'costa-rica' },
        { name: 'Panama', flag: '🇵🇦', slug: 'panama' }
      ]
    },
    africa: {
      name: 'Africa',
      icon: '🌍',
      countries: [
        { name: 'Sudafrica', flag: '🇿🇦', slug: 'sudafrica' },
        { name: 'Egitto', flag: '🇪🇬', slug: 'egitto' },
        { name: 'Marocco', flag: '🇲🇦', slug: 'marocco' },
        { name: 'Tunisia', flag: '🇹🇳', slug: 'tunisia' },
        { name: 'Kenya', flag: '🇰🇪', slug: 'kenya' },
        { name: 'Tanzania', flag: '🇹🇿', slug: 'tanzania' },
        { name: 'Etiopia', flag: '🇪🇹', slug: 'etiopia' },
        { name: 'Ghana', flag: '🇬🇭', slug: 'ghana' },
        { name: 'Nigeria', flag: '🇳🇬', slug: 'nigeria' },
        { name: 'Senegal', flag: '🇸🇳', slug: 'senegal' }
      ]
    },
    oceania: {
      name: 'Oceania',
      icon: '🌏',
      countries: [
        { name: 'Australia', flag: '🇦🇺', slug: 'australia' },
        { name: 'Nuova Zelanda', flag: '🇳🇿', slug: 'nuova-zelanda' },
        { name: 'Fiji', flag: '🇫🇯', slug: 'fiji' },
        { name: 'Papua Nuova Guinea', flag: '🇵🇬', slug: 'papua-nuova-guinea' },
        { name: 'Vanuatu', flag: '🇻🇺', slug: 'vanuatu' },
        { name: 'Samoa', flag: '🇼🇸', slug: 'samoa' },
        { name: 'Tonga', flag: '🇹🇴', slug: 'tonga' },
        { name: 'Isole Salomone', flag: '🇸🇧', slug: 'isole-salomone' },
        { name: 'Nuova Caledonia', flag: '🇳🇨', slug: 'nuova-caledonia' },
        { name: 'Polinesia Francese', flag: '🇵🇫', slug: 'polinesia-francese' }
      ]
    }
  }

  const handleCountrySelect = (countryName: string) => {
    console.log('Paese selezionato:', countryName)
    
    // Filtra le offerte eSIM per il paese selezionato
    const filters = { paese: countryName }
    const offers = esimService.getOffersSortedByPrice(filters)
    
    console.log('Offerte trovate per', countryName, ':', offers)
    
    // Salva i filtri nel localStorage e invia evento
    localStorage.setItem('esimFilters', JSON.stringify(filters))
    window.dispatchEvent(new CustomEvent('esimFiltersChanged', { detail: filters }))
    
    // Scroll alla sezione di confronto
    const comparisonSection = document.getElementById('esim-comparison')
    if (comparisonSection) {
      comparisonSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Ricerca paese:', searchQuery)
      
      // Cerca il paese nel database eSIM
      const filters = { paese: searchQuery.trim() }
      const offers = esimService.getOffersSortedByPrice(filters)
      
      console.log('Risultati ricerca per', searchQuery, ':', offers)
      
      if (offers.length > 0) {
        // Salva i filtri nel localStorage e invia evento
        localStorage.setItem('esimFilters', JSON.stringify(filters))
        window.dispatchEvent(new CustomEvent('esimFiltersChanged', { detail: filters }))
        
        // Scroll alla sezione di confronto
        const comparisonSection = document.getElementById('esim-comparison')
        if (comparisonSection) {
          comparisonSection.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        alert(`Nessuna offerta eSIM trovata per "${searchQuery}". Prova con un altro paese.`)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Selettore eSIM/SIM per area geografica
            </h2>
            <p className="text-lg text-gray-600">
              Trova le migliori eSIM per la tua destinazione specifica
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              {Object.entries(regions).map(([key, region]) => (
                <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                  <span className="text-lg">{region.icon}</span>
                  <span className="hidden md:inline">{region.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(regions).map(([key, region]) => (
              <TabsContent key={key} value={key}>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-6">
                    <Globe className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      {region.name}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {region.countries.map((country) => (
                      <Button
                        key={country.name}
                        variant="outline"
                        className="flex items-center space-x-2 h-auto p-3 text-left hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        size="sm"
                        onClick={() => handleCountrySelect(country.name)}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="text-sm font-medium">{country.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Search by country */}
          <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Non trovi la tua destinazione?
              </h3>
              <p className="text-gray-600 mb-4">
                Cerca tra oltre 190 paesi supportati dalle nostre eSIM
              </p>
              <div className="flex items-center justify-center space-x-2 max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Inserisci il nome del paese..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-[#03464b] hover:bg-[#02363a] text-white"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
