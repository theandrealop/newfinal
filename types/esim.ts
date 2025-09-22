export type DurationKey = '1-7d' | '1-2w' | '1m' | '2-3m';
export type DataTierKey = '1gbplus' | '5gbplus' | '10gbplus' | '20gbplus' | '50gbplus' | 'unlimited';

export interface EsimOffer {
  paese: string
  provider: string
  durata: number
  gb: number | string
  prezzo: number
}

export interface EsimFilter {
  paese?: string
  durata?: number
  durataMin?: number
  durataMax?: number
  gb?: number | string
  gbMin?: number
  provider?: string
}

export interface EsimComparisonResult {
  offers: EsimOffer[]
  totalOffers: number
  cheapestOffer?: EsimOffer
  averagePrice: number
}

export interface ProviderInfo {
  name: string
  logo: string
  website: string
  rating: number
  features: string[]
}

export interface Country {
  code: string;
  name: string;
  aliases: string[];
}

export interface ProviderMetadata {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
}

export interface EsimFilters {
  country?: string;
  duration?: DurationKey;
  dataTier?: DataTierKey;
  fiveG?: boolean;
  hotspot?: boolean;
  eKYC?: 'none' | 'passport' | 'id';
  topup?: boolean;
}

export type SortOption = 'best-rating' | 'lowest-price' | 'most-data' | 'best-value' | 'best-coverage';

export interface EsimState {
  filters: EsimFilters;
  sortBy: SortOption;
  offers: EsimOffer[];
  filteredOffers: EsimOffer[];
  loading: boolean;
  error?: string;
}
