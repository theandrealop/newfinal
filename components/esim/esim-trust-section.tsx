"use client"

import { Button } from '@/components/ui/button'
import { Shield, Users, CheckCircle, Award, Heart } from 'lucide-react'

export function EsimTrustSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About, trust e trasparenza
            </h2>
            <p className="text-lg text-gray-600">
              Perché fidarsi di Punti Furbi per le tue scelte eSIM
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Perché fidarsi di Punti Furbi?
              </h3>
              <p className="text-lg text-gray-600">
                La nostra missione è aiutarti a trovare le migliori offerte eSIM 
                con trasparenza e indipendenza
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Più di 15 milioni di utenti
                  </h4>
                  <p className="text-gray-600">
                    La nostra community di viaggiatori ci ha scelto per trovare 
                    le migliori offerte eSIM in tutto il mondo.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Test indipendenti
                  </h4>
                  <p className="text-gray-600">
                    I nostri esperti testano personalmente ogni servizio eSIM 
                    per garantire recensioni accurate e imparziali.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Opinioni imparziali
                  </h4>
                  <p className="text-gray-600">
                    Le commissioni non influenzano le nostre opinioni. 
                    Raccomandiamo solo i servizi che riteniamo davvero validi.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Supporto dedicato
                  </h4>
                  <p className="text-gray-600">
                    Il nostro team di supporto è sempre disponibile per aiutarti 
                    a scegliere l'eSIM perfetta per le tue esigenze.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional trust factors */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                I nostri numeri parlano per noi:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">190+</div>
                  <div className="text-sm text-gray-600">Paesi coperti</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">10+</div>
                  <div className="text-sm text-gray-600">Provider testati</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600">Recensioni verificate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">24/7</div>
                  <div className="text-sm text-gray-600">Supporto disponibile</div>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                Chi siamo
              </Button>
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                Come funziona
              </Button>
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                Contatto
              </Button>
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </Button>
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                Termini d'uso
              </Button>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Punti Furbi è un sito di confronto indipendente. Possiamo ricevere commissioni 
              quando acquisti tramite i nostri link, ma questo non influisce sui nostri giudizi.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
