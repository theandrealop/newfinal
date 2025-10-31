import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Come funziona - Punti Furbi',
  description: 'Scopri come funziona il nostro comparatore eSIM e come utilizzarlo per trovare le migliori offerte.',
  keywords: 'come funziona, guida, eSIM, comparatore, tutorial',
}

export default function ComeFunzionaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Come funziona</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Il nostro comparatore eSIM è progettato per essere semplice e intuitivo. 
              Ecco come utilizzarlo per trovare le migliori offerte per i tuoi viaggi.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Seleziona la tua destinazione</h2>
            <p className="text-gray-600 mb-6">
              Inizia inserendo il paese o la regione che visiterai. Il nostro sistema supporta oltre 190 paesi 
              e ti mostrerà tutte le offerte eSIM disponibili per quella destinazione.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Scegli la durata del tuo viaggio</h2>
            <p className="text-gray-600 mb-6">
              Specifica quanto durerà il tuo viaggio: meno di una settimana, 1-2 settimane, 15-29 giorni o 30+ giorni. 
              Questo ci aiuta a filtrare le offerte più adatte alla tua permanenza.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Indica i tuoi bisogni di dati</h2>
            <p className="text-gray-600 mb-6">
              Seleziona quanti dati ti servono: da 5GB a dati illimitati. Considera le tue abitudini di utilizzo 
              per scegliere il piano più adatto alle tue esigenze.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Confronta le offerte</h2>
            <p className="text-gray-600 mb-6">
              Il nostro comparatore ti mostrerà tutte le offerte disponibili, ordinate per prezzo o per altre 
              caratteristiche come velocità, copertura e facilità di attivazione.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Scegli e acquista</h2>
            <p className="text-gray-600 mb-6">
              Una volta trovata l'offerta ideale, clicca sul link per essere reindirizzato al sito del provider 
              e completare l'acquisto. L'attivazione è solitamente immediata.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Filtri avanzati</h2>
            <p className="text-gray-600 mb-6">
              Puoi anche utilizzare i filtri avanzati per trovare offerte specifiche:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li><strong>5G:</strong> Filtra solo le offerte che supportano la rete 5G</li>
              <li><strong>Hotspot:</strong> Mostra solo le eSIM che permettono la condivisione della connessione</li>
              <li><strong>eKYC:</strong> Filtra per livello di verifica richiesta (nessuna, passaporto, documento d'identità)</li>
              <li><strong>Top-up:</strong> Mostra solo le offerte che permettono di ricaricare i dati</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Come leggere i risultati</h2>
            <p className="text-gray-600 mb-6">
              Ogni offerta mostra informazioni dettagliate:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li><strong>Prezzo:</strong> Il costo totale dell'offerta</li>
              <li><strong>Dati:</strong> La quantità di dati inclusi</li>
              <li><strong>Durata:</strong> Per quanti giorni è valida l'offerta</li>
              <li><strong>Caratteristiche:</strong> 5G, hotspot, eKYC, top-up</li>
              <li><strong>Rating:</strong> La nostra valutazione basata su test reali</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Consigli per la scelta</h2>
            <p className="text-gray-600 mb-6">
              Ecco alcuni consigli per scegliere l'offerta giusta:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Considera sempre il rapporto qualità-prezzo, non solo il prezzo più basso</li>
              <li>Verifica la copertura nella zona specifica che visiterai</li>
              <li>Controlla se l'offerta include chiamate o solo dati</li>
              <li>Leggi le recensioni degli altri utenti</li>
              <li>Verifica i tempi di attivazione se hai bisogno di connessione immediata</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}