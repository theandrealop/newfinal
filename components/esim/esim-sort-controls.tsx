"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ArrowUp, ArrowDown, DollarSign, Database, Clock, Calculator, Building } from 'lucide-react'
import { SortOption, SortOrder } from '@/types/esim'

interface EsimSortControlsProps {
  sortBy: SortOption
  sortOrder: SortOrder
  onSortChange: (sortBy: SortOption, sortOrder: SortOrder) => void
}

const sortOptions = [
  {
    key: 'prezzo' as SortOption,
    label: 'Prezzo',
    icon: DollarSign,
    description: 'Dal più economico al più costoso'
  },
  {
    key: 'dati' as SortOption,
    label: 'Dati',
    icon: Database,
    description: 'Dal minor al maggior numero di GB'
  },
  {
    key: 'validita' as SortOption,
    label: 'Validità',
    icon: Clock,
    description: 'Dalla durata più breve alla più lunga'
  },
  {
    key: 'prezzo-per-gb' as SortOption,
    label: 'Prezzo/GB',
    icon: Calculator,
    description: 'Dal miglior rapporto prezzo/gigabyte'
  },
  {
    key: 'provider' as SortOption,
    label: 'Provider',
    icon: Building,
    description: 'Ordine alfabetico per provider'
  }
]

export function EsimSortControls({ sortBy, sortOrder, onSortChange }: EsimSortControlsProps) {
  const handleSort = (newSortBy: SortOption) => {
    let newSortOrder: SortOrder = 'asc'
    
    // Se clicchiamo sulla stessa colonna, invertiamo l'ordinamento
    if (sortBy === newSortBy) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    }
    
    onSortChange(newSortBy, newSortOrder)
  }

  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />
    }
    
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-blue-600" />
      : <ArrowDown className="w-4 h-4 text-blue-600" />
  }

  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Ordina risultati</h3>
        <div className="text-sm text-gray-500">
          Clicca su una colonna per ordinare. Il primo clic ordina in modo crescente, il secondo in modo decrescente.
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {sortOptions.map((option) => {
          const Icon = option.icon
          const isActive = sortBy === option.key
          
          return (
            <Button
              key={option.key}
              variant={isActive ? "default" : "outline"}
              className={`flex items-center gap-2 h-12 ${
                isActive 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSort(option.key)}
              title={option.description}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{option.label}</span>
              {getSortIcon(option.key)}
            </Button>
          )
        })}
      </div>
      
      {sortBy && (
        <div className="mt-3 text-sm text-gray-600">
          <span className="font-medium">Ordinamento attivo:</span> {sortOptions.find(opt => opt.key === sortBy)?.label} 
          <span className="ml-1">
            {sortOrder === 'asc' ? '(crescente)' : '(decrescente)'}
          </span>
        </div>
      )}
    </div>
  )
}
