"use client"

import { Button } from '@/components/ui/button'
import { Star, ExternalLink, Globe, Shield, DollarSign, Users } from 'lucide-react'
import Image from 'next/image'

export function EsimComparison() {
  const providers = [
    {
      name: 'Saily',
      rating: 9.2,
      logo: '/images/providers/saily-logo.png',
      description: 'Provider europeo con copertura globale e prezzi competitivi',
      countries: 190,
      avgPrice: '€8-15',
      duration: '7-30 giorni',
      features: ['Tethering', 'VPN', 'SMS'],
      scores: {
        credibility: 9.5,
        coverage: 9.0,
        costs: 8.8,
        satisfaction: 9.1
      },
      reviewUrl: '/recensioni/saily',
      websiteUrl: 'https://saily.com'
    },
    {
      name: 'Airalo',
      rating: 8.9,
      logo: '/images/providers/airalo-logo.png',
      description: 'Leader globale con la più ampia copertura di paesi',
      countries: 200,
      avgPrice: '€10-20',
      duration: '7-365 giorni',
      features: ['Tethering', 'VPN'],
      scores: {
        credibility: 9.2,
        coverage: 9.5,
        costs: 8.5,
        satisfaction: 8.8
      },
      reviewUrl: '/recensioni/airalo',
      websiteUrl: 'https://airalo.com'
    },
    {
      name: 'Holafly',
      rating: 8.7,
      logo: '/images/providers/holafly-logo.png',
      description: 'Specializzato in dati illimitati per viaggiatori',
      countries: 160,
      avgPrice: '€15-30',
      duration: '5-90 giorni',
      features: ['Dati illimitati', 'Tethering'],
      scores: {
        credibility: 8.8,
        coverage: 8.5,
        costs: 8.0,
        satisfaction: 9.0
      },
      reviewUrl: '/recensioni/holafly',
      websiteUrl: 'https://holafly.com'
    },
    {
      name: 'Yesim',
      rating: 8.5,
      logo: '/images/providers/yesim-logo.png',
      description: 'Provider emergente con prezzi molto competitivi',
      countries: 150,
      avgPrice: '€6-12',
      duration: '7-30 giorni',
      features: ['Tethering', 'SMS'],
      scores: {
        credibility: 8.5,
        coverage: 8.2,
        costs: 9.2,
        satisfaction: 8.3
      },
      reviewUrl: '/recensioni/yesim',
      websiteUrl: 'https://yesim.com'
    },
    {
      name: 'Nomad',
      rating: 8.3,
      logo: '/images/providers/nomad-logo.png',
      description: 'Flessibile con piani personalizzabili',
      countries: 165,
      avgPrice: '€8-18',
      duration: '1-30 giorni',
      features: ['Tethering', 'VPN', 'SMS'],
      scores: {
        credibility: 8.3,
        coverage: 8.0,
        costs: 8.7,
        satisfaction: 8.5
      },
      reviewUrl: '/recensioni/nomad',
      websiteUrl: 'https://nomad.com'
    },
    {
      name: 'Ubigi',
      rating: 8.1,
      logo: '/images/providers/ubigi-logo.png',
      description: 'Specializzato in Asia e Pacifico',
      countries: 120,
      avgPrice: '€7-15',
      duration: '7-30 giorni',
      features: ['Tethering'],
      scores: {
        credibility: 8.1,
        coverage: 7.8,
        costs: 8.9,
        satisfaction: 8.2
      },
      reviewUrl: '/recensioni/ubigi',
      websiteUrl: 'https://ubigi.com'
    }
  ]

  return (
    <section id="esim-comparison" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Confronto MIGLIORI eSIM
            </h2>
            <p className="text-lg text-gray-600">
              Confronta i principali provider eSIM e trova quello perfetto per le tue esigenze
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div key={provider.name} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={provider.logo}
                        alt={`${provider.name} logo`}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold text-gray-900">{provider.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm">
                  {provider.description}
                </p>

                {/* Mini Scores Table */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credibilità</span>
                      <span className="font-semibold">{provider.scores.credibility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Copertura</span>
                      <span className="font-semibold">{provider.scores.coverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Costi</span>
                      <span className="font-semibold">{provider.scores.costs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soddisfazione</span>
                      <span className="font-semibold">{provider.scores.satisfaction}</span>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>{provider.countries} paesi</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{provider.avgPrice}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span>{provider.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {provider.features.map((feature) => (
                      <span 
                        key={feature} 
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                    onClick={() => window.open(provider.websiteUrl, '_blank')}
                  >
                    Vai a {provider.name}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    size="sm"
                    onClick={() => window.open(provider.reviewUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Leggi recensione
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Non sei sicuro quale scegliere?
            </h3>
            <p className="text-gray-600 mb-6">
              Leggi le nostre recensioni dettagliate per ogni provider e scopri quale 
              si adatta meglio alle tue esigenze di viaggio.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Confronta tutti i provider
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
