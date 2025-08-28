"use client"

import { useState, useMemo, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Globe, X, ChevronDown } from 'lucide-react'

interface CountrySelectorProps {
  selectedCountry: string
  onCountrySelect: (country: string) => void
  countries: string[]
}

const countryFlagClasses: Record<string, string> = {
  'Australia': 'flag-au',
  'Brasile': 'flag-br',
  'Emirati Arabi': 'flag-ae',
  'Francia': 'flag-fr',
  'Giappone': 'flag-jp',
  'Indonesia': 'flag-id',
  'Italia': 'flag-it',
  'Marocco': 'flag-ma',
  'Spagna': 'flag-es',
  'Stati Uniti': 'flag-us',
  'Sudafrica': 'flag-za',
  'Thailandia': 'flag-th',
  'Turchia': 'flag-tr'
}

export function CountrySelector({ selectedCountry, onCountrySelect, countries }: CountrySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Gestisce il click outside per chiudere il dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries
    return countries.filter(country => 
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [countries, searchTerm])

  const selectedCountryFlagClass = selectedCountry ? countryFlagClasses[selectedCountry] : ''

  const handleClearSelection = () => {
    onCountrySelect('')
    setSearchTerm('')
    setShowDropdown(false)
  }

  const handleCountryClick = (country: string) => {
    onCountrySelect(country)
    setSearchTerm('')
    setShowDropdown(false)
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
    if (!showDropdown) {
      setSearchTerm('')
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Card className="shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
        <CardContent className="p-0">
          {/* Header con radio buttons */}
          <div className="flex border-b border-gray-200">
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${!isOpen ? 'bg-blue-50 text-blue-600' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <Globe className="w-4 h-4 mr-2" />
              Paese
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${isOpen ? 'bg-blue-50 text-blue-600' : ''}`}
              onClick={() => setIsOpen(true)}
            >
              <Globe className="w-4 h-4 mr-2" />
              Regione
            </Button>
          </div>

          {/* Barra di ricerca con paese selezionato */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              {selectedCountry && (
                <span className={`absolute left-10 top-1/2 transform -translate-y-1/2 flag ${selectedCountryFlagClass}`}></span>
              )}
              <Input
                type="text"
                placeholder={selectedCountry ? selectedCountry : "Clicca qui per selezionare un paese"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  setSearchTerm('')
                  setShowDropdown(true)
                }}
                className={`border-0 focus:ring-0 text-gray-600 italic ${selectedCountry ? 'pl-16' : 'pl-10'} cursor-pointer`}
                onClick={() => setShowDropdown(true)}
                readOnly={!!(selectedCountry && !searchTerm)}
              />
              
              {/* Pulsante per deselezionare */}
              {selectedCountry && !searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 hover:bg-gray-100 rounded-full"
                  onClick={handleClearSelection}
                >
                  <X className="w-3 h-3 text-gray-400" />
                </Button>
              )}
              
              {/* Pulsante dropdown */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 hover:bg-gray-100 rounded-full"
                onClick={toggleDropdown}
              >
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Lista paesi - mostrata quando dropdown è aperto o c'è ricerca */}
          {(showDropdown || searchTerm || !selectedCountry) && (
            <div className="max-h-64 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <Button
                    key={country}
                    variant="ghost"
                    className={`w-full justify-start px-4 py-3 rounded-none border-0 hover:bg-orange-50 ${
                      selectedCountry === country ? 'bg-orange-100 text-orange-600' : ''
                    }`}
                    onClick={() => handleCountryClick(country)}
                  >
                    <span className={`flag ${countryFlagClasses[country]}`}></span>
                    <span className="font-semibold">{country}</span>
                  </Button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center">
                  Nessun paese trovato
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
