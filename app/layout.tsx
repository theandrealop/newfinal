import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/flags.css'
// import './no-animations.css'
import "../styles/light-theme-override.css"
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { GoogleAnalytics } from '@/components/google-analytics'
import { GoogleTagManager } from '@/components/google-tag-manager'
import { LightThemeEnforcer } from '@/components/light-theme-enforcer'
import { SiteNavigation } from '@/components/site-navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Punti Furbi - Trova le Migliori Offerte e Risparmia',
    template: '%s | Punti Furbi'
  },
  description: 'Scopri le migliori offerte, sconti e promozioni. Confronta prezzi e risparmia su viaggi, shopping, tecnologia e molto altro.',
  keywords: ['offerte', 'sconti', 'promozioni', 'risparmio', 'confronto prezzi', 'viaggi', 'shopping'],
  authors: [{ name: 'Punti Furbi' }],
  creator: 'Punti Furbi',
  publisher: 'Punti Furbi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://puntifurbi.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://puntifurbi.com',
    title: 'Punti Furbi - Trova le Migliori Offerte e Risparmia',
    description: 'Scopri le migliori offerte, sconti e promozioni. Confronta prezzi e risparmia su viaggi, shopping, tecnologia e molto altro.',
    siteName: 'Punti Furbi',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Punti Furbi - Trova le Migliori Offerte',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punti Furbi - Trova le Migliori Offerte e Risparmia',
    description: 'Scopri le migliori offerte, sconti e promozioni. Confronta prezzi e risparmia su viaggi, shopping, tecnologia e molto altro.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteNavigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <LightThemeEnforcer />
          <Toaster />
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

