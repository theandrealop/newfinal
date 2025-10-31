"use client"

import { useState, useEffect } from 'react'
import { Currency } from '@/components/esim/currency-selector'

// Tasso di cambio EUR/USD (può essere aggiornato dinamicamente)
const EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.08 // 1 EUR = 1.08 USD (aggiornare periodicamente)
}

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('EUR')

  useEffect(() => {
    // Carica la valuta salvata
    const savedCurrency = localStorage.getItem('esimCurrency') as Currency
    if (savedCurrency && (savedCurrency === 'EUR' || savedCurrency === 'USD')) {
      setCurrency(savedCurrency)
    }

    // Ascolta i cambiamenti di valuta
    const handleCurrencyChange = (event: CustomEvent) => {
      setCurrency(event.detail.currency)
    }

    window.addEventListener('esimCurrencyChanged', handleCurrencyChange as EventListener)
    
    return () => {
      window.removeEventListener('esimCurrencyChanged', handleCurrencyChange as EventListener)
    }
  }, [])

  const convertPrice = (priceInEUR: number): number => {
    if (currency === 'EUR') {
      return priceInEUR
    }
    return priceInEUR * EXCHANGE_RATES.USD
  }

  const formatPrice = (priceInEUR: number): string => {
    const convertedPrice = convertPrice(priceInEUR)
    const symbol = currency === 'EUR' ? '€' : '$'
    return `${symbol}${convertedPrice.toFixed(2)}`
  }

  const getCurrencySymbol = (): string => {
    return currency === 'EUR' ? '€' : '$'
  }

  return {
    currency,
    convertPrice,
    formatPrice,
    getCurrencySymbol
  }
}
