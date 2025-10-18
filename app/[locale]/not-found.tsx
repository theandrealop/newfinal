import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pagina non trovata
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Torna alla Home
          </Link>
          
          <Link
            href="/voli-economici"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Vedi le Offerte
          </Link>
        </div>
      </div>
    </div>
  )
}
