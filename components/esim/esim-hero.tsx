"use client"

export function EsimHero() {
  return (
    <section className="bg-green-500 py-12 md:py-16 relative overflow-hidden">
      {/* Decorative arrow */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8">
        <svg 
          width="50" 
          height="65" 
          viewBox="0 0 60 80" 
          fill="none" 
          className="text-white opacity-80"
        >
          <path 
            d="M10 10 Q30 5 50 10 Q55 30 50 50 Q30 55 10 50 Q5 30 10 10" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M45 45 L50 50 L45 55" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Trova il miglior pacchetto eSIM per il tuo prossimo viaggio
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            Confronta prezzi, copertura e caratteristiche di tutti i principali provider eSIM. 
            Trova la tariffa più conveniente per la tua destinazione.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">190+</div>
              <div className="text-sm text-green-100">Paesi coperti</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">10+</div>
              <div className="text-sm text-green-100">Provider confrontati</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-green-100">Attivazione istantanea</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">€0</div>
              <div className="text-sm text-green-100">Costi nascosti</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
