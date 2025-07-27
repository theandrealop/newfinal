"use client"

import { useState } from "react"
import { Menu, X, Crown, Check, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useGoogleTagManager } from "@/components/google-tag-manager"

export default function PremiumPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { trackEvent, trackPremiumSubscription } = useGoogleTagManager()

  const handlePremiumClick = () => {
    // Track premium subscription start
    trackEvent('premium_subscription_start', {
      subscription_plan: 'premium',
      subscription_price: 4.90,
      currency: 'EUR',
      subscription_type: 'monthly'
    })
    
    // Track conversion event
    trackEvent('conversion', {
      event_category: 'premium',
      event_label: 'premium_subscription_click',
      value: 4.90
    })
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Main content only, no custom header here */}
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#483cff]/5 to-light-green/10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Crown className="text-[#483cff] mr-3" size={48} />
            <h1 className="text-4xl lg:text-6xl font-bold text-dark-green">
              Punti Furbi <span className="text-[#483cff]">Premium</span>
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-gray-700 mb-8">
            Accesso esclusivo alle migliori offerte di volo e funzionalità avanzate
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-light-green">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-dark-green">Funzionalità Premium</h2>
            <p className="text-xl text-gray-700">Tutto quello che ti serve per viaggiare come un professionista</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#483cff] rounded-lg flex items-center justify-center mb-4">
                <Crown className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark-green">Offerte esclusive</h3>
              <p className="text-gray-700">
                Accesso prioritario alle migliori offerte di volo prima che vengano pubblicate per tutti
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-light-green rounded-lg flex items-center justify-center mb-4">
                <Star className="text-dark-green" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark-green">Avvisi istantanei</h3>
              <p className="text-gray-700">
                Notifiche push immediate per le offerte che corrispondono esattamente alle tue preferenze
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#483cff] rounded-lg flex items-center justify-center mb-4">
                <Check className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark-green">Supporto prioritario</h3>
              <p className="text-gray-700">Assistenza clienti dedicata con tempi di risposta garantiti entro 2 ore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-dark-green">
            Scegli il tuo <span className="text-[#483cff]">piano Premium</span>
          </h2>
          <p className="text-xl text-gray-700 mb-12">Inizia a risparmiare ancora di più sui tuoi viaggi</p>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-[#483cff] max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Crown className="text-[#483cff] mr-2" size={32} />
              <h3 className="text-2xl font-bold text-dark-green">Premium</h3>
            </div>
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-[#483cff] mb-2">€4,90</div>
              <div className="text-gray-600">al mese / €99 all'anno</div>
            </div>
            <ul className="space-y-4 mb-8 text-left max-w-md mx-auto">
              <li className="flex items-center">
                <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span className="text-left">Tutte le offerte Economy e Premium Economy</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span className="text-left">Offerte esclusive in Business e First Class</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span className="text-left">Segnalazioni di tariffe error fare premium</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span className="text-left">Supporto via email prioritario</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <span className="text-left">Accesso a offerte riservate</span>
              </li>
            </ul>
            <Link 
              href="/checkout?plan=premium"
              className="w-full bg-[#483cff] text-white py-4 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors text-center block text-lg mt-4"
              onClick={handlePremiumClick}
            >
              Passa a Premium
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  )
}
