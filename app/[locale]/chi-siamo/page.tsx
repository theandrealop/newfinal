import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi siamo - Punti Furbi',
  description: 'Scopri la missione di Punti Furbi: aiutare i viaggiatori a trovare le migliori offerte eSIM e risparmiare sui costi di roaming.',
  keywords: 'chi siamo, missione, eSIM, viaggi, risparmio, roaming',
}

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Chi siamo</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Punti Furbi nasce dalla passione per i viaggi e dalla frustrazione di dover pagare costi di roaming esorbitanti. 
              La nostra missione è semplice: aiutare i viaggiatori a trovare le migliori offerte eSIM e risparmiare sui costi di connessione mobile.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">La nostra storia</h2>
            <p className="text-gray-600 mb-6">
              Fondato da viaggiatori per viaggiatori, Punti Furbi è nato dall'esperienza diretta di dover affrontare 
              costi di roaming imprevedibili durante i viaggi. Abbiamo deciso di creare una piattaforma che mette 
              a confronto le migliori offerte eSIM disponibili sul mercato.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">La nostra missione</h2>
            <p className="text-gray-600 mb-6">
              Vogliamo democratizzare l'accesso alle connessioni mobile durante i viaggi, rendendo trasparenti 
              i costi e le opzioni disponibili. Il nostro obiettivo è aiutare ogni viaggiatore a trovare 
              la soluzione più adatta alle proprie esigenze e al proprio budget.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Come funziona</h2>
            <p className="text-gray-600 mb-6">
              Analizziamo costantemente il mercato delle eSIM, confrontando prezzi, copertura e caratteristiche 
              dei principali provider. I nostri confronti sono basati su dati reali e test effettivi, 
              garantendo informazioni aggiornate e affidabili.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Trasparenza</h2>
            <p className="text-gray-600 mb-6">
              Crediamo nella trasparenza totale. Alcuni dei link presenti sul nostro sito possono generare 
              commissioni che ci aiutano a mantenere il servizio gratuito. Tuttavia, questo non influenza 
              mai la nostra indipendenza editoriale e le nostre raccomandazioni.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
