"use client"

import { CountrySelector } from '@/components/esim/country-selector'
import { useState } from 'react'

export default function TestFlagsPage() {
  const [selectedCountry, setSelectedCountry] = useState('')
  
  const countries = [
    'Australia',
    'Brasile', 
    'Emirati Arabi',
    'Francia',
    'Giappone',
    'Indonesia',
    'Italia',
    'Marocco',
    'Spagna',
    'Stati Uniti',
    'Sudafrica',
    'Thailandia',
    'Turchia'
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Bandiere</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">CountrySelector Test</h2>
          
          <CountrySelector
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
            countries={countries}
          />
          
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <p><strong>Paese selezionato:</strong> {selectedCountry || 'Nessuno'}</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Test Bandiere Singole</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {countries.map(country => (
              <div key={country} className="flex items-center p-3 border rounded">
                <span className={`flag flag-${country.toLowerCase().replace(' ', '-')}`}></span>
                <span className="ml-2 font-medium">{country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
