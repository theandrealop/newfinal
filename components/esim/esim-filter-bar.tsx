"use client"

import { useState, useEffect } from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useDebounce } from '@/hooks/use-debounce'
import { 
  loadCountries, 
  getDurationOptions, 
  getDataTierOptions,
  findCountryByInput 
} from '@/lib/esim-utils'
import type { EsimFilters, Country } from '@/types/esim'
import { useCountryTranslation } from '@/lib/country-translations'

interface EsimFilterBarProps {
  filters: EsimFilters
  onFiltersChange: (filters: EsimFilters) => void
  onApplyFilters: () => void
}

export function EsimFilterBar({ filters, onFiltersChange, onApplyFilters }: EsimFilterBarProps) {
  const translateCountry = useCountryTranslation()
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  
  const debouncedCountrySearch = useDebounce(countrySearch, 300)
  const countries = loadCountries()
  const durationOptions = getDurationOptions()
  const dataTierOptions = getDataTierOptions()

  // Filtra paesi in base alla ricerca
  useEffect(() => {
    if (!debouncedCountrySearch) {
      setFilteredCountries(countries.slice(0, 10))
      return
    }

    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(debouncedCountrySearch.toLowerCase()) ||
      country.aliases.some(alias => 
        alias.toLowerCase().includes(debouncedCountrySearch.toLowerCase())
      )
    ).slice(0, 10)

    setFilteredCountries(filtered)
  }, [debouncedCountrySearch, countries])

  // Gestisce la selezione del paese
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setCountrySearch(country.name)
    onFiltersChange({ ...filters, country: country.name })
  }

  // Gestisce il cambio dei filtri
  const handleFilterChange = (key: keyof EsimFilters, value: any) => {
    // Treat "all" as no filter (undefined)
    const finalValue = value === "all" ? undefined : value
    onFiltersChange({ ...filters, [key]: finalValue })
  }

  // Gestisce il cambio dei filtri booleani
  const handleBooleanFilterChange = (key: keyof EsimFilters, value: boolean) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Ricerca Paese */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destinazione
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cerca paese..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="pl-10"
                />
                {filteredCountries.length > 0 && countrySearch && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="font-medium">{translateCountry(country.name)}</div>
                        {country.aliases.length > 0 && (
                          <div className="text-sm text-gray-500">
                            {country.aliases.slice(0, 2).join(', ')}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Durata */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durata
              </label>
              <Select
                value={filters.duration || 'all'}
                onValueChange={(value) => handleFilterChange('duration', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona durata" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le durate</SelectItem>
                  {durationOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dati */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dati
              </label>
              <Select
                value={filters.dataTier || 'all'}
                onValueChange={(value) => handleFilterChange('dataTier', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona dati" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i dati</SelectItem>
                  {dataTierOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pulsante Applica */}
            <div className="flex items-end">
              <Button 
                onClick={onApplyFilters}
                className="w-full bg-[#03464b] hover:bg-[#02363a] text-white"
              >
                Confronta eSIM
              </Button>
            </div>
          </div>

          {/* Filtri Avanzati */}
          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filtri avanzati
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                {/* 5G */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fiveG"
                    checked={filters.fiveG || false}
                    onCheckedChange={(checked) => 
                      handleBooleanFilterChange('fiveG', checked as boolean)
                    }
                  />
                  <label htmlFor="fiveG" className="text-sm font-medium text-gray-700">
                    Solo 5G
                  </label>
                </div>

                {/* Hotspot */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hotspot"
                    checked={filters.hotspot || false}
                    onCheckedChange={(checked) => 
                      handleBooleanFilterChange('hotspot', checked as boolean)
                    }
                  />
                  <label htmlFor="hotspot" className="text-sm font-medium text-gray-700">
                    Hotspot consentito
                  </label>
                </div>

                {/* eKYC */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verifica identità
                  </label>
                  <Select
                    value={filters.eKYC || 'all'}
                    onValueChange={(value) => handleFilterChange('eKYC', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tutte le verifiche" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tutte le verifiche</SelectItem>
                      <SelectItem value="none">Nessuna verifica</SelectItem>
                      <SelectItem value="passport">Passaporto</SelectItem>
                      <SelectItem value="id">Documento d'identità</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Topup */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="topup"
                    checked={filters.topup || false}
                    onCheckedChange={(checked) => 
                      handleBooleanFilterChange('topup', checked as boolean)
                    }
                  />
                  <label htmlFor="topup" className="text-sm font-medium text-gray-700">
                    Ricarica disponibile
                  </label>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>
  )
}
