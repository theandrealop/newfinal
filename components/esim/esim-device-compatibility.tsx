"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Smartphone, CheckCircle, XCircle, AlertCircle, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function EsimDeviceCompatibility() {
  const t = useTranslations('ESim.deviceCompatibility')
  const devices = [
    {
      name: 'iPhone 12 mini',
      brand: 'Apple',
      icon: '📱',
      compatibility: 'full',
      features: ['eSIM', 'Dual SIM', '5G', 'Hotspot'],
      setup: 'Impostazioni > Cellulare > Aggiungi piano cellulare',
      keyword: 'eSIM iPhone 12 mini configurazione',
      notes: 'Supporto completo eSIM con configurazione facile'
    },
    {
      name: 'Samsung Galaxy S24',
      brand: 'Samsung',
      icon: '📱',
      compatibility: 'full',
      features: ['eSIM', 'Dual SIM', '5G', 'Hotspot'],
      setup: 'Impostazioni > Connessioni > SIM manager',
      keyword: 'Samsung Galaxy eSIM dual SIM',
      notes: 'Supporto eSIM con gestione dual SIM avanzata'
    },
    {
      name: 'Pixel 7a',
      brand: 'Google',
      icon: '📱',
      compatibility: 'full',
      features: ['eSIM', 'Dual SIM', '5G', 'Hotspot'],
      setup: 'Impostazioni > Rete e Internet > SIM',
      keyword: 'Pixel 7a eSIM installazione',
      notes: 'Configurazione eSIM semplice e intuitiva'
    },
    {
      name: 'Apple Watch Series 9',
      brand: 'Apple',
      icon: '⌚',
      compatibility: 'limited',
      features: ['eSIM', 'Cellular', 'Condivisione numero'],
      setup: 'App Apple Watch > Cellulare',
      keyword: 'smartwatch eSIM condivisione numero',
      notes: 'eSIM solo per modelli Cellular, condivisione numero con iPhone'
    },
    {
      name: 'iPhone 13 Pro',
      brand: 'Apple',
      icon: '📱',
      compatibility: 'full',
      features: ['eSIM', 'Dual SIM', '5G', 'Hotspot'],
      setup: 'Impostazioni > Cellulare > Aggiungi piano cellulare',
      keyword: 'eSIM iPhone configurazione',
      notes: 'Supporto completo con gestione dual SIM'
    },
    {
      name: 'Samsung Galaxy A54',
      brand: 'Samsung',
      icon: '📱',
      compatibility: 'partial',
      features: ['eSIM', 'Dual SIM', '4G'],
      setup: 'Impostazioni > Connessioni > SIM manager',
      keyword: 'Samsung Galaxy eSIM compatibilità',
      notes: 'Supporto eSIM limitato, verifica compatibilità'
    }
  ]

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case 'full': return 'bg-green-100 text-green-800'
      case 'partial': return 'bg-yellow-100 text-yellow-800'
      case 'limited': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCompatibilityText = (compatibility: string) => {
    switch (compatibility) {
      case 'full': return 'Completo'
      case 'partial': return 'Parziale'
      case 'limited': return 'Limitato'
      default: return 'Sconosciuto'
    }
  }

  const getCompatibilityIcon = (compatibility: string) => {
    switch (compatibility) {
      case 'full': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'partial': return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'limited': return <XCircle className="w-5 h-5 text-orange-600" />
      default: return <XCircle className="w-5 h-5 text-gray-600" />
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
            {devices.map((device) => (
              <Card key={device.name} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{device.icon}</div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {device.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{device.brand}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getCompatibilityIcon(device.compatibility)}
                      <Badge className={getCompatibilityColor(device.compatibility)}>
                        {getCompatibilityText(device.compatibility)}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {device.notes}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">{t('howToCheck.checksToDo')}:</h4>
                      <div className="flex flex-wrap gap-1">
                        {device.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Configurazione:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {device.setup}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-[#03464b] hover:bg-[#02363a] text-white"
                    size="sm"
                  >
                    Guida Configurazione
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {t('howToCheck.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-600" />
                  {t('howToCheck.checksToDo')}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('howToCheck.checks.0')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('howToCheck.checks.1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('howToCheck.checks.2')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{t('howToCheck.checks.3')}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
                  {t('howToCheck.quickTest')}
                </h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-900 mb-1">iPhone:</p>
                    <p className="text-xs text-blue-700">
                      {t('howToCheck.iphoneTest')}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-900 mb-1">Android:</p>
                    <p className="text-xs text-green-700">
                      {t('howToCheck.androidTest')}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-purple-900 mb-1">Smartwatch:</p>
                    <p className="text-xs text-purple-700">
                      {t('howToCheck.smartwatchTest')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
