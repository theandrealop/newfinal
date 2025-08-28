"use client"

import { Smartphone, Globe, Zap, Shield, CreditCard, Wifi } from 'lucide-react'

export function EsimWhyUse() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Perché usare una eSIM?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Le eSIM offrono una soluzione <strong className="text-blue-600">completamente digitale</strong> 
              per la connessione mobile, più pratica e conveniente delle SIM tradizionali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Nessuna SIM fisica
                  </h3>
                  <p className="text-gray-600">
                    <em>Niente più carte SIM da gestire.</em> Le eSIM sono integrate 
                    nel dispositivo e si attivano digitalmente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Copertura globale
                  </h3>
                  <p className="text-gray-600">
                    <strong>Funziona in oltre 190 paesi</strong> con un'unica eSIM. 
                    Perfetto per viaggiatori frequenti.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Attivazione istantanea
                  </h3>
                  <p className="text-gray-600">
                    <em>Connesso in pochi secondi.</em> Basta scansionare un QR code 
                    per attivare la tua eSIM.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Sicurezza avanzata
                  </h3>
                  <p className="text-gray-600">
                    <strong>Impossibile da rubare fisicamente.</strong> Le eSIM sono 
                    protette da crittografia avanzata.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Acquisto online
                  </h3>
                  <p className="text-gray-600">
                    <em>Niente più code in negozio.</em> Acquista online e ricevi 
                    l'eSIM istantaneamente via email.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Multi-SIM support
                  </h3>
                  <p className="text-gray-600">
                    <strong>Più numeri su un dispositivo.</strong> Mantieni la tua SIM 
                    principale e aggiungi eSIM per viaggi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
