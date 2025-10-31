"use client"

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Euro, DollarSign } from 'lucide-react'
import { useTranslations } from 'next-intl'

export type Currency = 'EUR' | 'USD'

interface CurrencySelectorProps {
  onCurrencyChange?: (currency: Currency) => void
  className?: string
}

export function CurrencySelector({ onCurrencyChange, className = "" }: CurrencySelectorProps) {
  const t = useTranslations('ESim.currency')
  const [currency, setCurrency] = useState<Currency>('EUR')

  useEffect(() => {
    // Carica la valuta salvata dal localStorage
    const savedCurrency = localStorage.getItem('esimCurrency') as Currency
    if (savedCurrency && (savedCurrency === 'EUR' || savedCurrency === 'USD')) {
      setCurrency(savedCurrency)
    }
  }, [])

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem('esimCurrency', newCurrency)
    
    // Invia evento per notificare il cambio di valuta
    window.dispatchEvent(new CustomEvent('esimCurrencyChanged', { 
      detail: { currency: newCurrency } 
    }))
    
    if (onCurrencyChange) {
      onCurrencyChange(newCurrency)
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700">
        {t('currency')}:
      </span>
      <Select value={currency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="EUR">
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4" />
              <span>EUR (€)</span>
            </div>
          </SelectItem>
          <SelectItem value="USD">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>USD ($)</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
