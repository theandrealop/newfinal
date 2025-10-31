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
import { EsimTroubleshooting } from '@/components/esim/esim-troubleshooting'
import { EsimDeviceCompatibility } from '@/components/esim/esim-device-compatibility'
import { EsimTargetGroups } from '@/components/esim/esim-target-groups'
import { EsimDurationPlans } from '@/components/esim/esim-duration-plans'
import { EsimComprehensiveFaq } from '@/components/esim/esim-comprehensive-faq'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FAQSchema } from '@/components/structured-data'
import Script from 'next/script'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://puntifurbi.com';
  const isDefault = locale === 'it'

  if (locale === 'en') {
    return {
      title: 'Compare eSIM: Compare the Best Data Plans for Your Travel | Punti Furbi',
      description: 'Find the best eSIM for your travels. Compare data plans, prices and coverage to stay connected without roaming costs.',
      keywords: 'eSIM Italy, eSIM Sicily, eSIM Tuscany, eSIM Lombardy, eSIM Campania, Airalo vs Holafly, eSIM iPhone, eSIM Samsung, eSIM Erasmus students, eSIM family, eSIM 7 days, eSIM weekend, eSIM 3 months, eSIM hotspot, eSIM 5G, eSIM dual SIM, eSIM not working, eSIM QR code, eSIM activation failed, eSIM expired renew, physical eSIM vs eSIM, eSIM EU roaming, eSIM summer 2025, eSIM Christmas Italy',
      openGraph: {
        title: 'Compare eSIM: Compare the Best Data Plans for Your Travel',
        description: 'Find the best eSIM for your travels. Compare data plans, prices and coverage to stay connected without roaming costs.',
        type: 'website',
      },
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: isDefault ? `${baseUrl}/esim/` : `${baseUrl}/en/esim/`,
        languages: {
          it: `${baseUrl}/esim/`,
          en: `${baseUrl}/en/esim/`
        }
      }
    };
  }

  return {
    title: 'Confronta eSIM: Confronta le Migliori Offerte Dati per il Tuo Viaggio | Punti Furbi',
    description: 'Trova la migliore eSIM per i tuoi viaggi. Confronta piani dati, prezzi e copertura per rimanere connesso senza costi di roaming.',
    keywords: 'eSIM Italia, eSIM Sicilia, eSIM Toscana, eSIM Lombardia, eSIM Campania, Airalo vs Holafly, eSIM iPhone, eSIM Samsung, eSIM studenti Erasmus, eSIM famiglia, eSIM 7 giorni, eSIM weekend, eSIM 3 mesi, eSIM hotspot, eSIM 5G, eSIM dual SIM, eSIM non funziona, codice QR eSIM, attivazione eSIM fallita, eSIM scaduta rinnovare, eSIM fisica vs eSIM, eSIM roaming UE, eSIM estate 2025, eSIM Natale Italia',
    openGraph: {
      title: 'Confronta eSIM: Confronta le Migliori Offerte Dati per il Tuo Viaggio',
      description: 'Trova la migliore eSIM per i tuoi viaggi. Confronta piani dati, prezzi e copertura per rimanere connesso senza costi di roaming.',
      type: 'website',
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: isDefault ? `${baseUrl}/esim/` : `${baseUrl}/en/esim/`,
      languages: {
        it: `${baseUrl}/esim/`,
        en: `${baseUrl}/en/esim/`
      }
    }
  };
}

export default function EsimPage() {
  return (
    <>
      {/* Product Schema con AggregateRating */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "Confronto eSIM per i Caraibi",
            "image": "https://puntifurbi.com/images/esim-comparison.jpg",
            "description": "Confronta le migliori eSIM per i Caraibi per trovare il piano dati più conveniente e rimanere connesso durante il tuo viaggio.",
            "url": "https://puntifurbi.com/esim/",
            "brand": {
              "@type": "Brand",
              "name": "Punti Furbi"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "125"
            }
          })
        }}
      />
      <div className="min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <EsimHero />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[{ name: 'eSIM', url: '/esim' }]} 
          className="mb-6"
        />
        <EsimSmartFilter />
        <div className="mt-8">
          <EsimComparisonTable />
        </div>
      </div>

      <EsimStats />

      <EsimWhyUse />
      
      <EsimDeviceCompatibility />
      
      <EsimTargetGroups />
      
      <EsimDurationPlans />
      
      <EsimTroubleshooting />
      
      <EsimVideoSection />
      
      <EsimHowItWorks />
      
      <EsimComparison />
      
      <EsimReviews />
      
      <EsimComprehensiveFaq />
      
      {/* FAQ Schema Markup */}
      <FAQSchema faqs={[
        {
          question: "Cos'è un eSIM?",
          answer: "Un eSIM (SIM embedded) è una SIM virtuale integrata nel dispositivo che permette di attivare piani dati senza dover inserire fisicamente una carta SIM. È più comoda, sicura e permette di cambiare operatore senza cambiare carta."
        },
        {
          question: "Il mio dispositivo supporta eSIM?",
          answer: "La maggior parte degli smartphone moderni supporta eSIM. iPhone dalla serie XS/XR, Samsung Galaxy dalla serie S20, Google Pixel dalla serie 3, e molti altri dispositivi Android recenti. Puoi verificare nelle impostazioni del tuo dispositivo sotto 'Cellular' o 'Connections'."
        },
        {
          question: "Come funziona l'attivazione di un eSIM?",
          answer: "L'attivazione è semplice: acquisti l'eSIM online, ricevi un QR code o un link di attivazione, lo scansioni con la fotocamera del telefono o clicchi sul link, e l'eSIM si attiva automaticamente. Non serve andare in negozio o aspettare la consegna."
        },
        {
          question: "Posso usare eSIM e SIM fisica insieme?",
          answer: "Sì, molti dispositivi supportano l'uso simultaneo di eSIM e SIM fisica. Puoi avere due numeri attivi contemporaneamente, uno per uso personale e uno per lavoro, o usare l'eSIM per i dati quando viaggi."
        },
        {
          question: "Gli eSIM funzionano in tutto il mondo?",
          answer: "Sì, gli eSIM funzionano in tutto il mondo dove c'è copertura di rete. Molti provider offrono piani globali che coprono centinaia di paesi. È perfetto per viaggiatori frequenti che vogliono evitare costi di roaming."
        }
      ]} />
      
      <EsimRelatedGuides />
      
      <EsimTrustSection />
      </div>
    </>
  )
}
