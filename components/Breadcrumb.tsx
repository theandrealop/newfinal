import Link from 'next/link'

export default function Breadcrumb({ plan }: { plan: string }) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
        </li>
        <li className="text-gray-500">/</li>
        <li>
          <Link
            href={`/${plan}`}
            className="text-gray-500 hover:text-gray-700"
          >
            Piano {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </Link>
        </li>
        <li className="text-gray-500">/</li>
        <li className="text-gray-900 font-medium">Checkout</li>
      </ol>
    </nav>
  )
}