"use client"

import { useState } from "react"
import { Link } from "@/src/i18n/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight, Globe, Tag, FileText, Search } from "lucide-react"
import { usePathname } from "@/src/i18n/navigation"
import { NewsletterPopup } from "@/components/newsletter-popup"
import LocaleSwitcher from "@/components/LocaleSwitcher"
import { useTranslations } from 'next-intl'

export function SiteNavigation() {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = useState(false)
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { href: "/", label: t('home'), icon: null },
    { href: "/voli-economici", label: t('cheapFlights'), icon: Globe },
    { href: "/esim", label: t('esim'), icon: Search },
    { href: "/blog", label: t('blog'), icon: FileText },
    { href: "/premium", label: t('premium'), icon: Tag },
    { href: "/elite", label: t('elite'), icon: Tag },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleNewsletterClick = () => {
    setShowNewsletterPopup(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b" style={{background:'#fcfaf3'}}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center" style={{marginLeft: '32px'}}>
              <Image
                src="/images/logo.png"
                alt="Punti Furbi Logo"
                width={120}
                height={48}
                priority
                quality={100}
                className="h-12 w-auto hover:opacity-80 transition-opacity"
                style={{color: 'transparent'}}
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary`}
                  style={{color:'#1a2e22'}}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4" style={{marginRight: '32px'}}>
              <LocaleSwitcher />
              <Button
                onClick={handleNewsletterClick}
                className="px-6 py-2 rounded-full bg-[#483cff] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
{t('subscribe')}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsOpen(true)}
                className="p-2"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo.png"
                  alt="Punti Furbi"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="text-lg font-semibold text-gray-900">Punti Furbi</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>


            {/* Navigation Items */}
            <nav className="flex-1 py-4">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors ${
                      isActive(item.href) ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                )
              })}
            </nav>

            {/* Footer Actions */}
            <div className="border-t border-gray-100 p-6 space-y-3">
              <div className="flex justify-center mb-4">
                <LocaleSwitcher />
              </div>
              <Button
                onClick={() => {
                  setIsOpen(false)
                  handleNewsletterClick()
                }}
                className="w-full bg-[#483cff] hover:bg-[#3a30d1] text-white font-semibold py-3 rounded-lg shadow-lg"
              >
{t('subscribe')} alla Newsletter
              </Button>
              <div className="text-center">
                <span className="text-xs text-gray-500">
                  © 2024 Punti Furbi. Tutti i diritti riservati.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Newsletter Popup */}
      {showNewsletterPopup && (
        <NewsletterPopup
          isOpen={showNewsletterPopup}
          onClose={() => setShowNewsletterPopup(false)}
        />
      )}
    </>
  )
}
