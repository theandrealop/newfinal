"use client"

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { BreadcrumbSchema } from './structured-data'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Aggiungi sempre la homepage come primo elemento
  const allItems = [
    { name: 'Home', url: '/' },
    ...items
  ]

  return (
    <>
      {/* Schema Markup per Breadcrumbs */}
      <BreadcrumbSchema items={allItems} />
      
      {/* Breadcrumbs UI */}
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-1 text-sm text-gray-600 ${className}`}
      >
        {allItems.map((item, index) => (
          <div key={item.url} className="flex items-center">
            {index === 0 ? (
              <Home className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4 mx-1" />
            )}
            
            {index === allItems.length - 1 ? (
              <span className="font-medium text-gray-900" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.url}
                className="hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}

// Hook per generare breadcrumbs automaticamente
export function useBreadcrumbs(pathname: string) {
  const pathSegments = pathname.split('/').filter(Boolean)
  
  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const url = '/' + pathSegments.slice(0, index + 1).join('/')
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    return { name, url }
  })

  return breadcrumbs
}
