'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface StripeSuccessHandlerProps {
  onSessionRetrieved?: (session: any) => void
}

export default function StripeSuccessHandler({ onSessionRetrieved }: StripeSuccessHandlerProps) {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const sessionId = searchParams?.get('session_id')
    
    if (sessionId) {
      fetchSessionDetails(sessionId)
    } else {
      setLoading(false)
    }
  }, [searchParams])

  const fetchSessionDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/checkout/session?session_id=${sessionId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch session details')
      }
      
      const sessionData = await response.json()
      setSession(sessionData)
      
      if (onSessionRetrieved) {
        onSessionRetrieved(sessionData)
      }
    } catch (err) {
      console.error('Error fetching session:', err)
      setError('Errore nel recupero dei dettagli del pagamento')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">{error}</p>
      </div>
    )
  }

  if (session) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Pagamento completato con successo!
        </h3>
        <div className="text-sm text-green-700">
          <p><strong>Importo:</strong> €{(session.amount_total / 100).toFixed(2)}</p>
          <p><strong>Email:</strong> {session.customer_details?.email}</p>
          <p><strong>ID Sessione:</strong> {session.id}</p>
        </div>
      </div>
    )
  }

  return null
}