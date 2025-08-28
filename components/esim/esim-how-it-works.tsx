"use client"

import { Check, X, Smartphone, Wifi, Globe, Shield } from 'lucide-react'

export function EsimHowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Cos'è e come funziona una eSIM?
            </h2>
            <p className="text-lg text-gray-600">
              Scopri tutto quello che devi sapere sulle eSIM e confronta con le SIM tradizionali
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* What is eSIM */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Cos'è un'eSIM?
              </h3>
              <p className="text-gray-600 mb-4">
                Un'eSIM (SIM embedded) è una <strong>SIM virtuale integrata</strong> nel dispositivo 
                che permette di attivare piani dati senza dover inserire fisicamente una carta SIM.
              </p>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Smartphone className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Integrata nel dispositivo</p>
                  <p className="text-sm text-gray-600">Nessuna carta fisica da gestire</p>
                </div>
              </div>
            </div>

            {/* How eSIM works */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Come funzionano le eSIM?
              </h3>
              <p className="text-gray-600 mb-4">
                L'attivazione è <em>semplice e veloce</em>: acquisti l'eSIM online, ricevi un QR code 
                o un link di attivazione, e l'eSIM si attiva automaticamente.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <span className="text-gray-700">Acquista online</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <span className="text-gray-700">Ricevi QR code via email</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <span className="text-gray-700">Scansiona e attiva</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pro & Cons Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* eSIM Pros & Cons */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Wifi className="w-6 h-6 text-blue-600 mr-3" />
                Pro & Contro delle eSIM
              </h3>
              
              {/* Pros */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  Vantaggi ✅
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Nessuna carta SIM fisica da gestire</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Attivazione istantanea</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Più sicura (impossibile da rubare)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Supporto multi-SIM</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Acquisto online semplice</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Spesso più economica del roaming</span>
                  </li>
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                  <X className="w-5 h-5 mr-2" />
                  Inconvenienti ❌
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Non tutti i dispositivi supportano eSIM</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Difficile trasferire su altro dispositivo</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Alcuni provider hanno limitazioni</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Supporto tecnico può essere limitato</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* SIM Fisiche Pros & Cons */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 text-gray-600 mr-3" />
                Pro & Contro SIM Fisiche
              </h3>
              
              {/* Pros */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  Vantaggi ✅
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compatibilità universale</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Facile trasferire tra dispositivi</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Supporto tecnico consolidato</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Nessuna dipendenza da software</span>
                  </li>
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                  <X className="w-5 h-5 mr-2" />
                  Inconvenienti ❌
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Carta fisica da gestire e non perdere</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Attivazione più complessa</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Può essere rubata o danneggiata</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Spesso più costosa per roaming</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Limitazioni di spazio nel dispositivo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Quale scegliere?
            </h3>
            <p className="text-gray-700 mb-4">
              <strong>Le eSIM sono la scelta migliore per i viaggiatori moderni</strong> grazie alla 
              loro praticità, sicurezza e convenienza. Tuttavia, assicurati che il tuo dispositivo 
              supporti le eSIM prima di acquistarne una.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span>Verifica la compatibilità del tuo dispositivo nelle impostazioni</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
