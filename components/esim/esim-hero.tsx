"use client"

export function EsimHero() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background image with blur for readability */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1437846972679-9e6e537be46e?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center" style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}>
          {/* Main headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-pp-mori">
            Trova il miglior pacchetto eSIM per il tuo prossimo viaggio
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed max-w-3xl mx-auto font-pp-mori">
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
