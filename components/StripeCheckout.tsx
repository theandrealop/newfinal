'use client'
import { useState } from 'react'
import { STRIPE_PLANS } from '@/lib/stripe-config'

interface StripeCheckoutProps {
  initialPlan?: 'premium' | 'elite'
}

export default function StripeCheckout({ initialPlan = 'premium' }: StripeCheckoutProps) {
  const [selectedPlan, setSelectedPlan] = useState(initialPlan)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState(false)

  const currentPlan = STRIPE_PLANS[selectedPlan]
  const currentPrice = currentPlan[billingCycle]

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // Redirect diretto a Stripe Checkout
      window.location.href = currentPrice.checkoutUrl
      
      // Opzione 2: Custom checkout session (se preferisci)
      // const response = await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ priceId: currentPrice.priceId })
      // })
      // const { sessionId } = await response.json()
      // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      // await stripe.redirectToCheckout({ sessionId })
      
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateSavings = () => {
    const monthlyTotal = currentPlan.monthly.price * 12
    const yearlyPrice = currentPlan.yearly.price
    return Math.round(((monthlyTotal - yearlyPrice) / monthlyTotal) * 100)
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Selezione Piano */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Scegli il tuo piano</h3>
        <div className="space-y-2">
          {Object.entries(STRIPE_PLANS).map(([key, plan]) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="plan"
                value={key}
                checked={selectedPlan === key}
                onChange={(e) => setSelectedPlan(e.target.value as 'premium' | 'elite')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">{plan.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Selezione Ciclo Fatturazione */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Ciclo di fatturazione</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600">
            <input
              type="radio"
              name="billing"
              value="monthly"
              checked={billingCycle === 'monthly'}
              onChange={(e) => setBillingCycle(e.target.value as 'monthly' | 'yearly')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900 dark:text-white">
              <strong>Mensile</strong> - €{currentPlan.monthly.price}/mese
            </span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600">
            <input
              type="radio"
              name="billing"
              value="yearly"
              checked={billingCycle === 'yearly'}
              onChange={(e) => setBillingCycle(e.target.value as 'monthly' | 'yearly')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-900 dark:text-white">
                <strong>Annuale</strong> - €{currentPlan.yearly.price}/anno
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                Risparmia {calculateSavings()}%
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Riepilogo e Pulsante */}
      <div className="border-t pt-4 dark:border-gray-600">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Totale:</span>
          <span className="text-xl font-bold text-blue-600">
            €{currentPrice.price}{billingCycle === 'monthly' ? '/mese' : '/anno'}
          </span>
        </div>
        
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Elaborazione...' : `Procedi al pagamento`}
        </button>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Pagamento sicuro tramite Stripe
        </p>
      </div>
    </div>
  )
}