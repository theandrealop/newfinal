"use client"

import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { 
  ArrowUpDown, 
  Sparkles, 
  Database, 
  Clock, 
  DollarSign,
  Building
} from 'lucide-react'
import { SortOption, SortOrder } from '@/types/esim'
import { useTranslations } from 'next-intl'

interface EsimModernFiltersProps {
  sortBy: SortOption
  sortOrder: SortOrder
  onSortChange: (sortBy: SortOption, sortOrder: SortOrder) => void
}

const getSortOptions = (t: any) => [
  {
    key: 'prezzo' as SortOption,
    label: t('sorting.cheapest'),
    icon: DollarSign,
    shortLabel: t('sorting.cheapest')
  },
  {
    key: 'prezzo-per-gb' as SortOption,
    label: t('sorting.bestPricePerGB'),
    icon: Sparkles,
    shortLabel: t('sorting.bestPricePerGB')
  },
  {
    key: 'dati' as SortOption,
    label: t('sorting.moreGB'),
    icon: Database,
    shortLabel: t('sorting.moreGB')
  },
  {
    key: 'validita' as SortOption,
    label: t('sorting.longestValidity'),
    icon: Clock,
    shortLabel: t('sorting.longestValidity')
  },
  {
    key: 'provider' as SortOption,
    label: t('sorting.provider'),
    icon: Building,
    shortLabel: t('sorting.provider')
  }
]

export function EsimModernFilters({
  sortBy,
  sortOrder,
  onSortChange
}: EsimModernFiltersProps) {
  const t = useTranslations('ESim')
  
  const handleSort = (newSortBy: SortOption) => {
    let newSortOrder: SortOrder = 'asc'
    
    // Se clicchiamo sulla stessa opzione, invertiamo l'ordinamento
    if (sortBy === newSortBy) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    }
    
    onSortChange(newSortBy, newSortOrder)
  }

  const sortOptions = getSortOptions(t)
  const getCurrentSortOption = () => {
    return sortOptions.find(option => option.key === sortBy) || sortOptions[0]
  }

  const currentOption = getCurrentSortOption()
  const Icon = currentOption.icon

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Info text */}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-600 truncate">
              {t('results.resultsFound')}
            </div>
          </div>

          {/* Right: Sort controls */}
          <div className="flex items-center gap-2">
            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 px-3 gap-2 border-gray-200 hover:border-gray-300"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentOption.label}</span>
                  <span className="sm:hidden">{currentOption.shortLabel}</span>
                  <ArrowUpDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                {sortOptions.map((option) => {
                  const OptionIcon = option.icon
                  const isActive = sortBy === option.key
                  
                  return (
                    <DropdownMenuItem
                      key={option.key}
                      onClick={() => handleSort(option.key)}
                      className={`flex items-center gap-3 cursor-pointer ${
                        isActive ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                    >
                      <OptionIcon className="w-4 h-4" />
                      <span className="flex-1">{option.label}</span>
                      {isActive && (
                        <div className="text-xs text-blue-600">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </div>
                      )}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}