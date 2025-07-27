"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Send, Users, Bell, Zap, Star, MessageCircle } from "lucide-react"
import Image from "next/image"
import Head from "next/head"
import Script from "next/script"

declare global {
  interface Window {
    fbq: any;
  }
}

export default function TelegramLandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const trackLead = () => {
    if (typeof window !== 'undefined' && typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Lead');
    }
  }

  const handleTelegramClick = () => {
    trackLead();
    window.open('https://t.me/PuntiFurbi', '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      {/* Meta Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID'); // Sostituire con il vero Pixel ID
          fbq('track', 'PageView');
        `}
              </Script>

      {/* Schema JSON-LD per SEO */}
      <Script
        id="telegram-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Canale Telegram Punti Furbi - Offerte Voli Esclusive",
            "description": "Unisciti al canale Telegram ufficiale di Punti Furbi per ricevere notifiche istantanee su tariffe errore e offerte esclusive sui voli.",
            "url": "https://puntifurbi.com/telegram",
            "mainEntity": {
              "@type": "Organization",
              "name": "Punti Furbi",
              "url": "https://puntifurbi.com",
              "sameAs": [
                "https://t.me/PuntiFurbi"
              ],
              "description": "Servizio di notifiche per offerte voli e tariffe errore che permette di risparmiare fino al 90% sui viaggi."
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://puntifurbi.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Canale Telegram",
                  "item": "https://puntifurbi.com/telegram"
                }
              ]
            }
          })
        }}
      />

      <div className="min-h-screen bg-cream">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#483cff]/5 to-light-green/10"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          ></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
                <MessageCircle className="w-5 h-5 text-[#229ED9] mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Canale Telegram Ufficiale
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-extrabold text-[#1a2e22] leading-tight">
                  Entra nel canale Telegram di{" "}
                  <span className="bg-gradient-to-r from-[#483cff] to-[#229ED9] bg-clip-text text-transparent">
                    Punti Furbi
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Scopri ogni giorno le <strong>migliori occasioni online</strong> direttamente sul tuo smartphone. 
                  Offerte esclusive, tariffe errore e sconti fino al <strong>90%</strong> sui voli.
                </p>
              </div>

              {/* Main CTA Button */}
              <div className="pt-8">
                <button
                  onClick={handleTelegramClick}
                  className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-[#229ED9] to-[#0088cc] text-white text-2xl font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <Send className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                  Unisciti al canale Telegram
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <p className="text-sm text-gray-500 mt-4">
                  Gratuito • Oltre 50.000 utenti attivi • Offerte esclusive
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
                <Users className="w-12 h-12 text-[#483cff] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-[#1a2e22] mb-2">50.000+</h3>
                <p className="text-gray-600">Utenti attivi</p>
              </div>
              
              <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
                <Bell className="w-12 h-12 text-[#483cff] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-[#1a2e22] mb-2">24/7</h3>
                <p className="text-gray-600">Notifiche in tempo reale</p>
              </div>
              
              <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
                <Zap className="w-12 h-12 text-[#483cff] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-[#1a2e22] mb-2">90%</h3>
                <p className="text-gray-600">Risparmio massimo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 lg:py-24 bg-light-green">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#1a2e22] mb-6">
                Perché scegliere il nostro canale Telegram?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Il modo più veloce e diretto per non perdere mai le migliori offerte di viaggio
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#483cff]/10 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-[#483cff]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a2e22] mb-4">
                  Notifiche Istantanee
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ricevi avvisi in tempo reale su tariffe errore e offerte esclusive prima che scadano
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#483cff]/10 rounded-full flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-[#483cff]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a2e22] mb-4">
                  Offerte Esclusive
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Accesso privilegiato a deal che non troverai da nessun'altra parte
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#483cff]/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-[#483cff]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a2e22] mb-4">
                  Community Attiva
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Unisciti a migliaia di viaggiatori smart che condividono consigli e esperienze
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#1a2e22] mb-6">
                Cosa dicono i nostri utenti
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Grazie al canale Telegram ho risparmiato più di 1.500€ sui voli quest'anno!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#483cff]/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#483cff] font-bold">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2e22]">Marco R.</p>
                    <p className="text-sm text-gray-500">Viaggiatore frequente</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Le notifiche sono sempre puntuali e le offerte incredibili. Non posso più farne a meno!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#483cff]/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#483cff] font-bold">GM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2e22]">Giulia M.</p>
                    <p className="text-sm text-gray-500">Travel blogger</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Finalmente posso permettermi di viaggiare spesso! Le offerte sono davvero esclusive."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#483cff]/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#483cff] font-bold">AT</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2e22]">Alessandro T.</p>
                    <p className="text-sm text-gray-500">Studente universitario</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-[#483cff] to-[#229ED9] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Non perdere mai più un'offerta!
            </h2>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Unisciti ai 50.000+ viaggiatori smart che risparmiano ogni giorno con Punti Furbi
            </p>
            
            <button
              onClick={handleTelegramClick}
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-[#483cff] text-2xl font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <Send className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              Entra nel canale Telegram ora
            </button>
            
            <p className="text-sm mt-6 opacity-75">
              ✅ Gratis per sempre ✅ Cancellazione in un click ✅ Zero spam
            </p>
          </div>
        </section>
      </div>
    </>
  )
}