import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatto - Punti Furbi',
  description: 'Contatta il team di Punti Furbi per domande, suggerimenti o supporto tecnico.',
  keywords: 'contatto, supporto, assistenza, eSIM, viaggi',
}

export default function ContattoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contatto</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Hai domande sui nostri confronti eSIM? Vuoi segnalare un problema o hai suggerimenti per migliorare il nostro servizio? 
              Siamo qui per aiutarti!
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Come contattarci</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Email</h3>
              <p className="text-gray-600 mb-4">
                Per domande generali, suggerimenti o segnalazioni:
              </p>
              <a 
                href="mailto:info@puntifurbi.com" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                info@puntifurbi.com
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Supporto tecnico</h3>
              <p className="text-gray-600 mb-4">
                Per problemi tecnici o bug del sito:
              </p>
              <a 
                href="mailto:support@puntifurbi.com" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                support@puntifurbi.com
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Partnership</h3>
              <p className="text-gray-600 mb-4">
                Per proposte di collaborazione o partnership:
              </p>
              <a 
                href="mailto:partnerships@puntifurbi.com" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                partnerships@puntifurbi.com
              </a>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tempi di risposta</h2>
            <p className="text-gray-600 mb-6">
              Ci impegniamo a rispondere a tutte le email entro 24-48 ore durante i giorni lavorativi. 
              Per questioni urgenti, ti preghiamo di specificare "URGENTE" nell'oggetto dell'email.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Social media</h2>
            <p className="text-gray-600 mb-6">
              Puoi anche contattarci attraverso i nostri canali social per aggiornamenti e news:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Facebook: <a href="https://www.facebook.com/profile.php?id=61577124863452" className="text-blue-600 hover:text-blue-800">@PuntiFurbi</a></li>
              <li>Instagram: <a href="https://www.instagram.com/puntifurbi/" className="text-blue-600 hover:text-blue-800">@puntifurbi</a></li>
              <li>Telegram: <a href="https://t.me/PuntiFurbi" className="text-blue-600 hover:text-blue-800">@PuntiFurbi</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
