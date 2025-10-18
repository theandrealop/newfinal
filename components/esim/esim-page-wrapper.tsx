"use client"

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { EsimFilterBar } from './esim-filter-bar'
import { EsimComparisonTable } from './esim-comparison-table'
import { loadEsimOffers } from '@/lib/esim-utils'
import type { EsimOffer, EsimFilters } from '@/types/esim'

export function EsimPageWrapper() {
  const [offers, setOffers] = useState<EsimOffer[]>([])
  const [filters, setFilters] = useState<EsimFilters>({})
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Carica le offerte al mount
  useEffect(() => {
    const loadOffers = async () => {
      try {
        const esimOffers = loadEsimOffers()
        setOffers(esimOffers)
      } catch (error) {
        console.error('Errore nel caricamento delle offerte eSIM:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOffers()
  }, [])

  // Sincronizza i filtri con l'URL
  useEffect(() => {
    const urlFilters: EsimFilters = {}
    
    const country = searchParams.get('country')
    const duration = searchParams.get('duration')
    const dataTier = searchParams.get('dataTier')
    const fiveG = searchParams.get('fiveG')
    const hotspot = searchParams.get('hotspot')
    const eKYC = searchParams.get('eKYC')
    const topup = searchParams.get('topup')

    if (country) urlFilters.country = country
    if (duration) urlFilters.duration = duration as any
    if (dataTier) urlFilters.dataTier = dataTier as any
    if (fiveG) urlFilters.fiveG = fiveG === 'true'
    if (hotspot) urlFilters.hotspot = hotspot === 'true'
    if (eKYC) urlFilters.eKYC = eKYC as any
    if (topup) urlFilters.topup = topup === 'true'

    setFilters(urlFilters)
  }, [searchParams])

  // Aggiorna l'URL quando cambiano i filtri
  const updateURL = (newFilters: EsimFilters) => {
    const params = new URLSearchParams()
    
    if (newFilters.country) params.set('country', newFilters.country)
    if (newFilters.duration) params.set('duration', newFilters.duration)
    if (newFilters.dataTier) params.set('dataTier', newFilters.dataTier)
    if (newFilters.fiveG !== undefined) params.set('fiveG', newFilters.fiveG.toString())
    if (newFilters.hotspot !== undefined) params.set('hotspot', newFilters.hotspot.toString())
    if (newFilters.eKYC) params.set('eKYC', newFilters.eKYC)
    if (newFilters.topup !== undefined) params.set('topup', newFilters.topup.toString())

    const newURL = params.toString() ? `?${params.toString()}` : '/esim'
    router.push(newURL, { scroll: false })
  }

  // Gestisce il cambio dei filtri
  const handleFiltersChange = (newFilters: EsimFilters) => {
    setFilters(newFilters)
  }

  // Gestisce l'applicazione dei filtri
  const handleApplyFilters = () => {
    updateURL(filters)
    
    // Scroll ai risultati
    const resultsSection = document.getElementById('esim-results')
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <EsimFilterBar 
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
      />
      
      <div id="esim-results">
        <EsimComparisonTable />
      </div>
    </>
  )
}
