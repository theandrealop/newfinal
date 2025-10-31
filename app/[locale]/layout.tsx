import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import '../globals.css'
import '../../styles/flags.css'
import "../../styles/light-theme-override.css"
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { GoogleAnalytics } from '@/components/google-analytics'
import { GoogleTagManager } from '@/components/google-tag-manager'
import { LightThemeEnforcer } from '@/components/light-theme-enforcer'
import { SiteNavigation } from '@/components/site-navigation'
import Footer from '@/components/Footer'
import { OrganizationSchema, WebsiteSchema } from '@/components/structured-data'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://puntifurbi.com';
  const isDefault = locale === 'it'
  
  return {
    title: {
      default: locale === 'en' 
        ? 'Punti Furbi - Compare eSIM and Cheap Flights | Save on Travel'
        : 'Punti Furbi - Confronta eSIM e Voli Economici | Risparmia sui Viaggi',
      template: locale === 'en' ? '%s | Punti Furbi' : '%s | Punti Furbi'
    },
    description: locale === 'en'
      ? 'Compare the best eSIMs for travel and find cheap flights. Complete guide to save on roaming and transportation. Updated reviews and comparisons 2025.'
      : 'Confronta le migliori eSIM per viaggi e trova voli economici. Guida completa per risparmiare su roaming e trasporti. Recensioni e confronti aggiornati 2025.',
    keywords: locale === 'en'
      ? ['eSIM travel', 'cheap flights', 'price comparison', 'roaming', 'travel savings', 'travel SIM', 'eSIM Italy', 'Milan flights', 'roaming savings', 'international SIM']
      : ['eSIM viaggi', 'voli economici', 'confronto prezzi', 'roaming', 'risparmio viaggi', 'SIM viaggio', 'eSIM Italia', 'voli Milano', 'risparmio roaming', 'SIM internazionale'],
    authors: [{ name: 'Punti Furbi' }],
    creator: 'Punti Furbi',
    publisher: 'Punti Furbi',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: isDefault ? `${baseUrl}/` : `${baseUrl}/en/`,
      languages: {
        it: `${baseUrl}/`,
        en: `${baseUrl}/en/`
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'it_IT',
      url: isDefault ? `${baseUrl}/` : `${baseUrl}/en/`,
      title: locale === 'en'
        ? 'Punti Furbi - Compare eSIM and Cheap Flights | Save on Travel'
        : 'Punti Furbi - Confronta eSIM e Voli Economici | Risparmia sui Viaggi',
      description: locale === 'en'
        ? 'Compare the best eSIMs for travel and find cheap flights. Complete guide to save on roaming and transportation. Updated reviews and comparisons 2025.'
        : 'Confronta le migliori eSIM per viaggi e trova voli economici. Guida completa per risparmiare su roaming e trasporti. Recensioni e confronti aggiornati 2025.',
      siteName: 'Punti Furbi',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'en' ? 'Punti Furbi - Find the Best Deals' : 'Punti Furbi - Trova le Migliori Offerte',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'en'
        ? 'Punti Furbi - Find the Best Deals and Save'
        : 'Punti Furbi - Trova le Migliori Offerte e Risparmia',
      description: locale === 'en'
        ? 'Discover the best deals, discounts and promotions. Compare prices and save on travel, shopping, technology and much more.'
        : 'Scopri le migliori offerte, sconti e promozioni. Confronta prezzi e risparmia su viaggi, shopping, tecnologia e molto altro.',
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
  };
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <OrganizationSchema 
          name="Punti Furbi"
          url="https://puntifurbi.com"
          logo="https://puntifurbi.com/images/logo.png"
          socialLinks={[
            "https://twitter.com/puntifurbi",
            "https://facebook.com/puntifurbi",
            "https://instagram.com/puntifurbi"
          ]}
        />
        <WebsiteSchema 
          name="Punti Furbi"
          url="https://puntifurbi.com"
          description={locale === 'en'
            ? "Compare the best eSIMs for travel and find cheap flights. Complete guide to save on roaming and transportation."
            : "Confronta le migliori eSIM per viaggi e trova voli economici. Guida completa per risparmiare su roaming e trasporti."
          }
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
