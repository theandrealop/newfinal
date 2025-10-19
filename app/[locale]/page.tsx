"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { Link } from "@/src/i18n/navigation"
import { useTranslations, useLocale } from 'next-intl'
import Image from "next/image"
import { subscribeToNewsletter } from "@/lib/buttondown"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { HomepageBlogPreview } from "@/components/homepage-blog-preview"

export default function PuntiFurbiHomepage() {
  const t = useTranslations('Homepage');
  const locale = useLocale() as 'it' | 'en';
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [screenSize, setScreenSize] = useState("desktop")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile")
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const testimonials = [
    {
      name: "Marco R.",
      text: t('Testimonials.marco'),
      image: "https://i.imgur.com/mR4OFJ6.jpeg",
    },
    {
      name: "Giulia M.",
      text: t('Testimonials.giulia'),
      image: "https://i.imgur.com/Z3VfOYP.jpeg",
    },
    {
      name: "Alessandro T.",
      text: t('Testimonials.alessandro'),
      image: "https://us.123rf.com/450wm/satura86/satura861708/satura86170801548/84040788-coppia-di-turisti-prendendo-selfie-sulla-spiaggia-concetto-di-vacanza-amore-viaggi-e-vacanze.jpg",
    },
    {
      name: "Carla S.",
      text: t('Testimonials.carla'),
      image: "https://preview.redd.it/vacation-selfie-v0-acwyez0cavye1.jpeg",
    },
    {
      name: "Luca P.",
      text: t('Testimonials.luca'),
      image: "https://us.123rf.com/450wm/chalabala/chalabala1601/chalabala160100085/50765742-young-man-on-vacation-taking-selfie-in-the-sea.jpg",
    },
    {
      name: "Sofia B.",
      text: t('Testimonials.sofia'),
      image: "https://st3.depositphotos.com/1200816/15288/i/450/depositphotos_152888356-stock-photo-young-woman-taking-selfie.jpg",
    },
  ]

  const getCardsToShow = () => {
    switch (screenSize) {
      case "mobile":
        return 1
      case "tablet":
        return 2
      case "desktop":
        return 3
      default:
        return 3
    }
  }

  const cardsToShow = getCardsToShow()
  const maxIndex = testimonials.length - cardsToShow

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentTestimonial + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        setSubmitMessage(result.message)
        setEmail("")
      } else {
        setSubmitMessage(result.message)
      }
    } catch (error) {
      console.error("Newsletter signup error:", error)
      setSubmitMessage("Andrea it's better to change platform for your newsletter")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewsletterClick = () => {
    setShowNewsletterPopup(true)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#483cff]/5 to-light-green/10 text-[rgba(255,193,170,1)] bg-[rgba(255,254,240,1)]"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Badge */}

<div className="flex justify-center">
          <div className="inline-flex items-center px-3 sm:px-6 py-3 rounded-full bg-light-green text-dark-green animate-bounce-in">
            <div className="flex -space-x-3 flex-shrink-0">
              <img 
                src="https://i.imgur.com/mR4OFJ6.jpeg" 
                alt="Marco R. - Cliente soddisfatto di Punti Furbi per voli economici" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
              />
              <img 
                src="https://i.imgur.com/Z3VfOYP.jpeg" 
                alt="Giulia M. - Cliente che ha risparmiato su voli New York con Punti Furbi" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
              />
              <img 
                src="https://us.123rf.com/450wm/satura86/satura861708/satura86170801548/84040788-coppia-di-turisti-prendendo-selfie-sulla-spiaggia-concetto-di-vacanza-amore-viaggi-e-vacanze.jpg" 
                alt="Alessandro T. - Cliente che ha risparmiato migliaia di euro sui voli Giappone" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
              />
            </div>
            <div className="flex flex-col justify-center ml-3 sm:ml-4 mr-2 sm:mr-4 flex-shrink-0">
              <span className="text-sm sm:text-lg font-semibold leading-tight">{t('lovedBy')}</span>
              <span className="text-sm sm:text-lg font-semibold leading-tight">{t('users')}</span>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1 sm:ml-2 text-sm sm:text-lg font-semibold">{t('rating')}</span>
            </div>
          </div>
        </div>
              {/* Headline */}
              <div className="space-y-2 animate-fade-in-up animation-delay-200">
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight font-pp-mori mb-6 lg:mb-8 text-center md:text-left">
                  {t('title')}
                </h1>
              </div>

              {/* Subheadline */}
              <p className="home-subheadline text-3xl lg:text-4xl font-pp-mori font-normal text-dark-green animate-fade-in-up animation-delay-400 mb-10 lg:mb-12 text-center md:text-left">
                {t('subtitle')}
              </p>

              {/* Newsletter Signup */}
              <div className="animate-fade-in-up animation-delay-600">
                <form onSubmit={handleEmailSubmit} className="home-newsletter-form flex flex-col sm:flex-row gap-4 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    required
                    className="home-email-input flex-1 px-6 py-5 text-2xl rounded-xl border-2 border-gray-200 focus:border-[#483cff] focus:outline-none font-pp-mori min-h-[64px] h-[64px]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="home-subscribe-btn px-10 bg-[#483cff] text-white rounded-full font-extrabold text-2xl font-pp-mori hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[64px] h-[64px] flex items-center justify-center flex-shrink-0"
                  >
                    {isSubmitting ? t('submitting') : t('subscribeButton')}
                  </button>
                </form>
                {submitMessage && (
                  <p className={`text-lg mt-2 ${submitMessage.includes("Grazie") ? "text-green-600" : "text-red-600"}`}>
                    {submitMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in-right">
              <div className="relative">
                {/* Background Circle */}
                <div
                  className="absolute inset-0 w-96 h-96 rounded-full opacity-20 bg-gradient-to-br from-[#483cff] to-light-green transform -translate-x-10 -translate-y-10"
                  style={{ transform: `translate(-10%, -10%) rotate(${scrollY * 0.1}deg)` }}
                ></div>

                {/* Phone Mockup */}
                <div className="relative z-10 w-72 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl phone-float">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Phone Screen Content */}
                    <div className="absolute inset-0">
                      <img
                        src="https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg"
                        alt="Senso-ji temple in Kyoto, Japan"
                        className="w-full h-full object-cover"
                      />

                      {/* Notification Overlay */}
                      <div className="absolute top-20 left-4 right-4 animate-slide-in-down animation-delay-800">
                        <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">PF</span>
                            </div>
                            <span className="font-semibold text-sm">Punti Furbi</span>
                          </div>
                          <h3 className="font-bold text-lg mb-1">{t('newOffer')}</h3>
                          <p className="text-sm text-gray-600 mb-2">{t('romeTokyo')}</p>
                          <p className="text-2xl font-bold text-[#483cff]">{t('price')}</p>
                          <p className="text-xs text-gray-500">{t('savings')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Press Logos */}
          <div className="mt-16 pt-8 border-t border-gray-200 animate-fade-in-up animation-delay-1000">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
              <img
                src="https://i.imgur.com/aS3Rjbp.png"
                alt="Today"
                className="h-20 w-auto hover:opacity-70 transition-opacity"
              />
              <img
                src="https://i.imgur.com/p7NjAkU.png"
                alt="The New York Times"
                className="h-20 w-auto hover:opacity-70 transition-opacity"
              />
              <img
                src="https://i.imgur.com/6YmMRjG.png"
                alt="Good Morning America"
                className="h-20 w-auto hover:opacity-70 transition-opacity"
              />
              <img
                src="https://i.imgur.com/Nm4pAwD.png"
                alt="The Washington Post"
                className="h-20 w-auto hover:opacity-70 transition-opacity"
              />
              <img
                src="https://i.imgur.com/2h2kJjb.png"
                alt="Live Kelly & Ryan"
                className="h-20 w-auto hover:opacity-70 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-light-green">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 text-dark-green font-pp-mori">{t('tiredOfSearching')}</h2>
            <p className="text-2xl lg:text-3xl font-extrabold text-[#483cff] font-pp-mori">{t('makeTravelEasier')}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Feature 1 */}
            <div className="text-center space-y-6 animate-fade-in-up animation-delay-200">
              <div className="flex justify-center">
                <div className="w-48 h-80 bg-black rounded-3xl p-1 shadow-xl feature-card">
                  <div
                    className="w-full h-full bg-white rounded-[1.4rem] overflow-hidden relative"
                    style={{
                      backgroundImage:
                        "url('https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    role="img"
                    aria-label="Tempio Senso-ji a Kyoto, Giappone - Esempio di destinazione per voli economici"
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-dark-green">{t('trackPrices')}</h3>
                <p className="text-gray-700">
                  {t('trackPricesDesc')}
                </p>
                <Link href="/voli-economici/" className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
                  {t('discoverOffers')}
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-6 animate-fade-in-up animation-delay-400">
              <div className="flex justify-center">
                <div className="w-48 h-80 bg-black rounded-3xl p-1 shadow-xl feature-card">
                  <div
                    className="w-full h-full bg-white rounded-[1.4rem] overflow-hidden relative"
                    style={{
                      backgroundImage: "url('https://images.pexels.com/photos/5081424/pexels-photo-5081424.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    role="img"
                    aria-label="Notifiche push per offerte voli economici - Punti Furbi ti avvisa quando i prezzi scendono"
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-dark-green">{t('dreamDestinations')}</h3>
                <p className="text-gray-700">
                  {t('dreamDestinationsDesc')}
                </p>
                <Link href="/blog/" className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
                  {t('readGuides')}
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-6 animate-fade-in-up animation-delay-600">
              <div className="flex justify-center">
                <div className="w-48 h-80 bg-black rounded-3xl p-1 shadow-xl feature-card">
                  <div
                    className="w-full h-full bg-white rounded-[1.4rem] overflow-hidden relative"
                    style={{
                      backgroundImage: "url('https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-dark-green">{t('bookFlight')}</h3>
                <p className="text-gray-700">
                  {t('bookFlightDesc')}
                </p>
                <Link href="/esim/" className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
                  {t('compareEsim')}
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center animate-fade-in-up animation-delay-800">
            <button
              onClick={handleNewsletterClick}
              className="px-8 py-4 text-lg rounded-full bg-[#483cff] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              {t('subscribe')}
            </button>
          </div>
        </div>
      </section>

      {/* Internal Linking Section */}
      <section className="py-16" style={{ backgroundColor: '#fcfaf3' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-green mb-4">
              {t('discoverServices')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('everythingYouNeed')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-dark-green mb-3">{t('compareEsimTitle')}</h3>
              <p className="text-gray-600 mb-4">
                {t('compareEsimDesc')}
              </p>
              <Link 
                href="/esim/" 
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('compareEsimButton')}
              </Link>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-dark-green mb-3">{t('cheapFlightsTitle')}</h3>
              <p className="text-gray-600 mb-4">
                {t('cheapFlightsDesc')}
              </p>
              <a 
                href="https://t.me/PuntiFurbi" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('seeOffers')}
              </a>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-dark-green mb-3">{t('travelGuidesTitle')}</h3>
              <p className="text-gray-600 mb-4">
                {t('travelGuidesDesc')}
              </p>
              <Link 
                href="/blog/" 
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {t('readBlog')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <HomepageBlogPreview locale={locale} />

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 overflow-visible">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 text-dark-green font-pp-mori">
              {t('joinMillions')}
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg font-medium text-dark-green">{t('ratedExcellent')}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                ))}
              </div>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto animate-fade-in-up animation-delay-200 overflow-visible">
            {/* Carousel Container with responsive height and spacing */}
            <div className="min-h-[450px] sm:min-h-[420px] lg:min-h-[400px] flex items-center justify-center overflow-visible py-4 sm:py-6 lg:py-8">
              <div
                className={`flex items-stretch justify-center overflow-visible ${
                  screenSize === "mobile" ? "w-full px-4" : screenSize === "tablet" ? "space-x-4" : "space-x-6"
                }`}
              >
                {getVisibleTestimonials().map((testimonial, index) => (
                  <div
                    key={`${testimonial.name}-${currentTestimonial}-${index}`}
                    className={`flex-shrink-0 bg-light-green rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 text-center space-y-4 testimonial-card flex flex-col ${
                      screenSize === "mobile" ? "w-full max-w-sm mx-auto" : screenSize === "tablet" ? "w-72" : "w-80"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`${testimonial.name} - Testimonial cliente Punti Furbi per voli economici e risparmio viaggi`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <h3 className="text-xl font-bold text-dark-green">{testimonial.name}</h3>
                      <p className="text-gray-700">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Popup */}
      <NewsletterPopup isOpen={showNewsletterPopup} onClose={() => setShowNewsletterPopup(false)} />
    </div>
  )
}
