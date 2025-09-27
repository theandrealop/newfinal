import { Metadata } from 'next'
import { EsimHero } from '@/components/esim/esim-hero'
import { EsimSmartFilter } from '@/components/esim/esim-smart-filter'
import { EsimWhyUse } from '@/components/esim/esim-why-use'
import { EsimVideoSection } from '@/components/esim/esim-video-section'
import { EsimHowItWorks } from '@/components/esim/esim-how-it-works'
import { EsimComparison } from '@/components/esim/esim-comparison'
import { EsimReviews } from '@/components/esim/esim-reviews'
import { EsimRelatedGuides } from '@/components/esim/esim-related-guides'
import { EsimTrustSection } from '@/components/esim/esim-trust-section'
import { EsimComparisonTable } from '@/components/esim/esim-comparison-table'
import { EsimStats } from '@/components/esim/esim-stats'

export const metadata: Metadata = {
  title: 'Confronta Offerte eSIM - Trova il Miglior Prezzo | Punti Furbi',
  description: 'Confronta prezzi e offerte eSIM per oltre 190 paesi. Trova il miglior pacchetto per il tuo viaggio con Airalo, Holafly, Saily e altri provider.',
  keywords: 'eSIM, confronto prezzi, offerte eSIM, Airalo, Holafly, Saily, viaggi, roaming',
  openGraph: {
    title: 'Confronta Offerte eSIM - Trova il Miglior Prezzo',
    description: 'Confronta prezzi e offerte eSIM per oltre 190 paesi. Trova il miglior pacchetto per il tuo viaggio.',
    type: 'website',
  },
}

export default function EsimPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <EsimHero />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <EsimSmartFilter />
        <div className="mt-8">
          <EsimComparisonTable />
        </div>
      </div>

      <EsimStats />

      <EsimWhyUse />
      
      <EsimVideoSection />
      
      <EsimHowItWorks />
      
      <EsimComparison />
      
      <EsimReviews />
      
      <EsimRelatedGuides />
      
      
      <EsimTrustSection />
    </div>
  )
}
