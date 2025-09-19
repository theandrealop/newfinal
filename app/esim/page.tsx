import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import { EsimHero } from '@/components/esim/esim-hero'
import { EsimSmartFilter } from '@/components/esim/esim-smart-filter'
import { EsimWhyUse } from '@/components/esim/esim-why-use'
import { EsimVideoSection } from '@/components/esim/esim-video-section'
import { EsimHowItWorks } from '@/components/esim/esim-how-it-works'
import { EsimComparison } from '@/components/esim/esim-comparison'
import { EsimReviews } from '@/components/esim/esim-reviews'
import { EsimRelatedGuides } from '@/components/esim/esim-related-guides'
import { EsimGeographicSelector } from '@/components/esim/esim-geographic-selector'
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
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'eSIM', href: '/esim' }
        ]} 
      />
      
      <EsimHero />
      
      <div className="container mx-auto px-4 py-8">
        <EsimSmartFilter />
      </div>

      <EsimStats />

      <EsimWhyUse />
      
      <EsimVideoSection />
      
      <EsimHowItWorks />
      
      <div id="esim-comparison" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Confronta Offerte eSIM
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trova l'offerta migliore per la tua destinazione. Confronta prezzi, durata e GB 
              tra i principali provider eSIM del mercato.
            </p>
          </div>
          
          <EsimComparisonTable />
        </div>
      </div>
      
      <EsimComparison />
      
      <EsimReviews />
      
      <EsimRelatedGuides />
      
      <EsimGeographicSelector />
      
      <EsimTrustSection />
    </div>
  )
}
