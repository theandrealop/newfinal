"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GraduationCap, Users, Baby, Heart, Briefcase, Globe } from 'lucide-react'

export function EsimTargetGroups() {
  const targetGroups = [
    {
      id: 'students',
      title: 'eSIM per Studenti Erasmus',
      icon: <GraduationCap className="w-6 h-6" />,
      description: 'Soluzioni eSIM economiche per studenti in mobilità europea',
      bestProvider: 'Saily',
      avgPrice: '€5-12',
      duration: '1-6 mesi',
      features: ['Prezzi studente', 'Copertura UE', 'Supporto multilingue', 'Documentazione semplificata'],
      benefits: [
        'Sconti speciali per studenti',
        'Piani flessibili per semestri',
        'Supporto in italiano e inglese',
        'Nessun costo di attivazione'
      ],
      keyword: 'eSIM per studenti Erasmus Italia',
      color: 'blue'
    },
    {
      id: 'seniors',
      title: 'eSIM per Senior - Viaggi Organizzati',
      icon: <Heart className="w-6 h-6" />,
      description: 'eSIM semplici e affidabili per viaggiatori senior',
      bestProvider: 'Holafly',
      avgPrice: '€15-25',
      duration: '7-30 giorni',
      features: ['Supporto telefonico', 'Configurazione assistita', 'Piani illimitati', 'Assistenza 24/7'],
      benefits: [
        'Supporto telefonico dedicato',
        'Configurazione assistita',
        'Piani con dati illimitati',
        'Assistenza in italiano'
      ],
      keyword: 'eSIM senior viaggi organizzati Italia',
      color: 'green'
    },
    {
      id: 'families',
      title: 'eSIM per Famiglie - 4 Persone',
      icon: <Users className="w-6 h-6" />,
      description: 'Pacchetti famiglia con condivisione dati e controllo parentale',
      bestProvider: 'Airalo',
      avgPrice: '€8-20',
      duration: '7-30 giorni',
      features: ['Pacchetti famiglia', 'Condivisione hotspot', 'Controllo parentale', 'Gestione centralizzata'],
      benefits: [
        'Sconti per pacchetti famiglia',
        'Condivisione dati tra dispositivi',
        'Controllo del consumo bambini',
        'Gestione centralizzata'
      ],
      keyword: 'eSIM famiglia 4 persone Italia',
      color: 'purple'
    },
    {
      id: 'children',
      title: 'eSIM per Bambini - Controllo Parentale',
      icon: <Baby className="w-6 h-6" />,
      description: 'eSIM sicure per bambini con controlli parentali avanzati',
      bestProvider: 'Nomad',
      avgPrice: '€6-15',
      duration: '7-30 giorni',
      features: ['Controllo parentale', 'Limiti di utilizzo', 'Filtri contenuti', 'Monitoraggio real-time'],
      benefits: [
        'Controllo completo del consumo',
        'Limiti di tempo e dati',
        'Filtri per contenuti inappropriati',
        'Monitoraggio in tempo reale'
      ],
      keyword: 'eSIM bambini controllo parentale',
      color: 'pink'
    },
    {
      id: 'business',
      title: 'eSIM per Business - Viaggi di Lavoro',
      icon: <Briefcase className="w-6 h-6" />,
      description: 'Soluzioni eSIM professionali per viaggi di business',
      bestProvider: 'Ubigi',
      avgPrice: '€12-30',
      duration: '7-90 giorni',
      features: ['Priorità supporto', 'Fatturazione aziendale', 'VPN aziendale', 'Backup automatico'],
      benefits: [
        'Supporto prioritario 24/7',
        'Fatturazione aziendale',
        'VPN per sicurezza aziendale',
        'Backup automatico dati'
      ],
      keyword: 'eSIM business viaggi lavoro',
      color: 'indigo'
    },
    {
      id: 'frequent-travelers',
      title: 'eSIM per Viaggiatori Frequenti',
      icon: <Globe className="w-6 h-6" />,
      description: 'eSIM globali per chi viaggia spesso in tutto il mondo',
      bestProvider: 'Saily',
      avgPrice: '€10-25',
      duration: '30-365 giorni',
      features: ['Copertura globale', 'Piani annuali', 'Top-up automatico', 'App dedicata'],
      benefits: [
        'Copertura in 190+ paesi',
        'Piani annuali convenienti',
        'Top-up automatico',
        'App per gestione viaggi'
      ],
      keyword: 'eSIM viaggiatori frequenti',
      color: 'orange'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      pink: 'bg-pink-100 text-pink-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      orange: 'bg-orange-100 text-orange-600'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              eSIM per Target Specifici
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Soluzioni eSIM personalizzate per ogni tipo di viaggiatore. 
              Studenti, famiglie, senior, business: trova la soluzione perfetta per te.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(group.color)}`}>
                        {group.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {group.title}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {group.bestProvider}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {group.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Prezzo:</span>
                        <p className="font-semibold text-green-600">{group.avgPrice}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Durata:</span>
                        <p className="font-semibold">{group.duration}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Caratteristiche:</h4>
                      <div className="flex flex-wrap gap-1">
                        {group.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Vantaggi:</h4>
                      <ul className="space-y-1">
                        {group.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2 text-xs text-gray-600">
                            <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-[#03464b] hover:bg-[#02363a] text-white"
                    size="sm"
                  >
                    Scopri Soluzioni
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Come Scegliere la Soluzione Giusta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Per Studenti e Giovani</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Prezzi scontati e piani flessibili</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Supporto multilingue per studi all'estero</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Documentazione semplificata</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Per Famiglie e Senior</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Supporto telefonico dedicato</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Controlli parentali per bambini</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pacchetti famiglia convenienti</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
