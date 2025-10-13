import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Informativa sulla privacy - Punti Furbi',
  description: 'Scopri come Punti Furbi raccoglie, utilizza e protegge i tuoi dati personali.',
  keywords: 'privacy, dati personali, GDPR, protezione dati, eSIM',
}

export default function InformativaPrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Informativa sulla privacy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduzione</h2>
            <p className="text-gray-600 mb-6">
              Punti Furbi rispetta la tua privacy e si impegna a proteggere i tuoi dati personali. 
              Questa informativa descrive come raccogliamo, utilizziamo e proteggiamo le tue informazioni 
              quando visiti il nostro sito web.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Dati che raccogliamo</h2>
            <p className="text-gray-600 mb-4">
              Raccogliamo diversi tipi di informazioni:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li><strong>Dati di navigazione:</strong> Informazioni sui tuoi dispositivi, browser e comportamento di navigazione</li>
              <li><strong>Dati di utilizzo:</strong> Come interagisci con il nostro sito e i nostri servizi</li>
              <li><strong>Dati di contatto:</strong> Nome, email e altre informazioni che ci fornisci volontariamente</li>
              <li><strong>Cookie e tecnologie simili:</strong> Per migliorare la tua esperienza di navigazione</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Come utilizziamo i tuoi dati</h2>
            <p className="text-gray-600 mb-4">
              Utilizziamo i tuoi dati per:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Fornire e migliorare i nostri servizi di comparazione eSIM</li>
              <li>Personalizzare la tua esperienza sul sito</li>
              <li>Rispondere alle tue richieste e fornire supporto</li>
              <li>Analizzare l'utilizzo del sito per miglioramenti</li>
              <li>Inviare comunicazioni relative ai nostri servizi (solo se hai dato il consenso)</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Condivisione dei dati</h2>
            <p className="text-gray-600 mb-6">
              Non vendiamo, affittiamo o condividiamo i tuoi dati personali con terze parti, eccetto nei seguenti casi:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Con il tuo consenso esplicito</li>
              <li>Per adempiere a obblighi legali</li>
              <li>Con fornitori di servizi che ci aiutano a gestire il sito (sotto stretto controllo)</li>
              <li>In caso di fusione, acquisizione o vendita di asset</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Cookie e tecnologie di tracciamento</h2>
            <p className="text-gray-600 mb-6">
              Utilizziamo cookie e tecnologie simili per:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Migliorare la funzionalità del sito</li>
              <li>Analizzare il traffico e l'utilizzo</li>
              <li>Personalizzare contenuti e annunci</li>
              <li>Ricordare le tue preferenze</li>
            </ul>
            <p className="text-gray-600 mb-6">
              Puoi gestire le tue preferenze sui cookie attraverso le impostazioni del tuo browser.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Sicurezza dei dati</h2>
            <p className="text-gray-600 mb-6">
              Implementiamo misure di sicurezza appropriate per proteggere i tuoi dati personali contro 
              accessi non autorizzati, alterazioni, divulgazioni o distruzioni. Tuttavia, nessun metodo 
              di trasmissione su Internet è completamente sicuro.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. I tuoi diritti</h2>
            <p className="text-gray-600 mb-4">
              Hai il diritto di:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Accedere ai tuoi dati personali</li>
              <li>Correggere dati inesatti o incompleti</li>
              <li>Richiedere la cancellazione dei tuoi dati</li>
              <li>Limitare il trattamento dei tuoi dati</li>
              <li>Opporti al trattamento dei tuoi dati</li>
              <li>Richiedere la portabilità dei dati</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Conservazione dei dati</h2>
            <p className="text-gray-600 mb-6">
              Conserviamo i tuoi dati personali solo per il tempo necessario agli scopi per cui sono stati 
              raccolti o come richiesto dalla legge. I dati di navigazione vengono generalmente conservati 
              per un periodo massimo di 24 mesi.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Trasferimenti internazionali</h2>
            <p className="text-gray-600 mb-6">
              I tuoi dati potrebbero essere trasferiti e processati in paesi al di fuori dell'Unione Europea. 
              In questi casi, assicuriamo che siano in atto garanzie appropriate per proteggere i tuoi dati.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Modifiche a questa informativa</h2>
            <p className="text-gray-600 mb-6">
              Potremmo aggiornare questa informativa periodicamente. Ti informeremo di eventuali modifiche 
              significative pubblicando la nuova informativa sul sito.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contatti</h2>
            <p className="text-gray-600 mb-6">
              Per qualsiasi domanda riguardo a questa informativa o per esercitare i tuoi diritti, 
              puoi contattarci all'indirizzo 
              <a href="mailto:privacy@puntifurbi.com" className="text-blue-600 hover:text-blue-800"> privacy@puntifurbi.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
