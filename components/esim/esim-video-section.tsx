"use client"

import { Play, Share2, ExternalLink, Wifi, Globe, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function EsimVideoSection() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Video e Visual
            </h2>
            <p className="text-lg text-gray-600">
              Scopri tutto quello che devi sapere sulle eSIM nel nostro video completo
            </p>
          </div>

          {/* Video Container */}
          <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl mb-8 border border-gray-100">
            {!showVideo ? (
              /* Custom Video Thumbnail */
              <div className="relative aspect-video">
                {/* Background with gradient and pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-xl"></div>
                  </div>
                  
                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                  </div>
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-8">
                    {/* Icons row */}
                    <div className="flex justify-center items-center space-x-6 mb-6">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Wifi className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                      Airalo vs Holafly
                    </h3>
                    <h4 className="text-xl md:text-2xl font-semibold mb-4 opacity-90">
                      Qual è la eSIM Migliore?
                    </h4>
                    
                    {/* Subtitle */}
                    <p className="text-lg opacity-80 mb-6">
                      Recensione Aggiornata & Dati Reali
                    </p>
                    
                    {/* Play button */}
                    <div className="flex justify-center">
                      <Button 
                        onClick={() => setShowVideo(true)}
                        size="lg" 
                        className="bg-white text-blue-600 hover:bg-gray-100 rounded-full w-16 h-16 p-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            ) : (
              /* YouTube Embed */
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/kyw895K_z6s?autoplay=1"
                  title="Airalo vs Holafly: Qual è la eSIM Migliore?"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Video Info */}
            <div className="p-6 bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Airalo vs Holafly: Qual è la eSIM Migliore?
                  </h3>
                  <p className="text-gray-600">
                    Recensione Aggiornata & Dati Reali per scegliere la migliore eSIM
                  </p>
                </div>
                
                <div className="flex gap-3">
                  {!showVideo && (
                    <Button 
                      variant="outline" 
                      className="flex items-center space-x-2"
                      onClick={() => setShowVideo(true)}
                    >
                      <Play className="w-4 h-4" />
                      <span>Play</span>
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => window.open('https://www.youtube.com/watch?v=kyw895K_z6s', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Guarda su YouTube</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Airalo vs Holafly: Qual è la eSIM Migliore?',
                          url: 'https://www.youtube.com/watch?v=kyw895K_z6s'
                        })
                      } else {
                        navigator.clipboard.writeText('https://www.youtube.com/watch?v=kyw895K_z6s')
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Condividi</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Cosa imparerai in questo video:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Come funzionano le eSIM e differenze con le SIM tradizionali</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Come scegliere il provider migliore per la tua destinazione</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Processo di attivazione passo dopo passo</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Consigli per risparmiare sui costi di roaming</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Risoluzione dei problemi più comuni</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
