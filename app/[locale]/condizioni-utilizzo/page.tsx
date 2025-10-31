import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Condizioni di utilizzo - Punti Furbi',
  description: 'Leggi le condizioni di utilizzo del sito Punti Furbi e del nostro servizio di comparazione eSIM.',
  keywords: 'condizioni utilizzo, termini servizio, eSIM, comparatore',
}

export default function CondizioniUtilizzoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Condizioni di utilizzo</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Accettazione delle condizioni</h2>
            <p className="text-gray-600 mb-6">
              L'utilizzo del sito web Punti Furbi (di seguito "il Sito") implica l'accettazione delle presenti 
              condizioni di utilizzo. Se non accetti queste condizioni, ti preghiamo di non utilizzare il Sito.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Descrizione del servizio</h2>
            <p className="text-gray-600 mb-6">
              Punti Furbi fornisce un servizio di comparazione di offerte eSIM per viaggiatori. Il nostro obiettivo 
              è aiutare gli utenti a trovare le migliori offerte eSIM disponibili sul mercato, fornendo 
              informazioni aggiornate e confronti dettagliati.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Utilizzo del sito</h2>
            <p className="text-gray-600 mb-6">
              Gli utenti possono utilizzare il Sito per:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Consultare e confrontare offerte eSIM</li>
              <li>Accedere a informazioni sui provider eSIM</li>
              <li>Utilizzare i filtri di ricerca per trovare offerte specifiche</li>
              <li>Leggere recensioni e confronti dettagliati</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Limitazioni di responsabilità</h2>
            <p className="text-gray-600 mb-6">
              Punti Furbi fornisce informazioni a scopo informativo. Non siamo responsabili per:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>La disponibilità o l'accuratezza delle offerte mostrate</li>
              <li>I servizi forniti dai provider eSIM</li>
              <li>Eventuali modifiche ai prezzi o alle condizioni delle offerte</li>
              <li>Problemi tecnici o interruzioni del servizio</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Link esterni</h2>
            <p className="text-gray-600 mb-6">
              Il Sito contiene link a siti web di terze parti. Non siamo responsabili per il contenuto, 
              le politiche sulla privacy o le pratiche di questi siti esterni. L'utilizzo di questi link 
              è a proprio rischio e pericolo.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Proprietà intellettuale</h2>
            <p className="text-gray-600 mb-6">
              Tutti i contenuti presenti sul Sito, inclusi testi, immagini, loghi e design, sono di proprietà 
              di Punti Furbi o dei rispettivi proprietari e sono protetti dalle leggi sul copyright.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Modifiche alle condizioni</h2>
            <p className="text-gray-600 mb-6">
              Ci riserviamo il diritto di modificare queste condizioni in qualsiasi momento. Le modifiche 
              entreranno in vigore immediatamente dopo la pubblicazione sul Sito. L'utilizzo continuato 
              del Sito dopo le modifiche costituisce accettazione delle nuove condizioni.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Legge applicabile</h2>
            <p className="text-gray-600 mb-6">
              Queste condizioni sono regolate dalla legge italiana. Qualsiasi controversia sarà di 
              competenza del Tribunale competente per territorio.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Contatti</h2>
            <p className="text-gray-600 mb-6">
              Per qualsiasi domanda riguardo a queste condizioni, puoi contattarci all'indirizzo 
              <a href="mailto:info@puntifurbi.com" className="text-blue-600 hover:text-blue-800"> info@puntifurbi.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
