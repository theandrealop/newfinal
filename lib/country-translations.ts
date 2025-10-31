import { useTranslations } from 'next-intl'

/**
 * Hook per tradurre i nomi dei paesi
 * @returns Funzione per tradurre i nomi dei paesi
 */
export function useCountryTranslation() {
  const t = useTranslations('Countries')
  
  return (countryName: string): string => {
    // Se il paese non ha traduzione, restituisce il nome originale
    return t(countryName) || countryName
  }
}
