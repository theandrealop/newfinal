import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="text-gray-500 mx-2">/</span>}
            {item.href ? (
              <Link 
                href={item.href} 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Mantieni la compatibilità con il vecchio formato per il checkout
export function CheckoutBreadcrumb({ plan }: { plan: string }) {
  return (
    <Breadcrumb 
      items={[
        { label: 'Home', href: '/' },
        { label: `Piano ${plan.charAt(0).toUpperCase() + plan.slice(1)}`, href: `/${plan}` },
        { label: 'Checkout' }
      ]} 
    />
  )
}