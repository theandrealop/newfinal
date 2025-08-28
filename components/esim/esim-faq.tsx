"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function EsimFAQ() {
  const faqs = [
    {
      question: "Cos'è un eSIM?",
      answer: "Un eSIM (SIM embedded) è una SIM virtuale integrata nel dispositivo che permette di attivare piani dati senza dover inserire fisicamente una carta SIM. È più comoda, sicura e permette di cambiare operatore senza cambiare carta."
    },
    {
      question: "Il mio dispositivo supporta eSIM?",
      answer: "La maggior parte degli smartphone moderni supporta eSIM. iPhone dalla serie XS/XR, Samsung Galaxy dalla serie S20, Google Pixel dalla serie 3, e molti altri dispositivi Android recenti. Puoi verificare nelle impostazioni del tuo dispositivo sotto 'Cellular' o 'Connections'."
    },
    {
      question: "Come funziona l'attivazione di un eSIM?",
      answer: "L'attivazione è semplice: acquisti l'eSIM online, ricevi un QR code o un link di attivazione, lo scansioni con la fotocamera del telefono o clicchi sul link, e l'eSIM si attiva automaticamente. Non serve andare in negozio o aspettare la consegna."
    },
    {
      question: "Posso usare eSIM e SIM fisica insieme?",
      answer: "Sì, molti dispositivi supportano l'uso simultaneo di eSIM e SIM fisica. Puoi avere due numeri attivi contemporaneamente, uno per uso personale e uno per lavoro, o usare l'eSIM per i dati quando viaggi."
    },
    {
      question: "Gli eSIM funzionano in tutto il mondo?",
      answer: "Sì, gli eSIM funzionano in tutto il mondo dove c'è copertura di rete. Molti provider offrono piani globali che coprono centinaia di paesi. È perfetto per viaggiatori frequenti che vogliono evitare costi di roaming."
    },
    {
      question: "Quanto costa un eSIM?",
      answer: "I prezzi variano molto in base al paese, alla quantità di dati e alla durata. In genere partono da €5-10 per piani di pochi giorni con 1-5 GB, fino a €50-80 per piani mensili con dati illimitati. I nostri confronti ti aiutano a trovare le migliori offerte."
    },
    {
      question: "Posso ricaricare un eSIM?",
      answer: "Dipende dal provider. Alcuni eSIM sono usa e getta, altri permettono ricariche. Alcuni provider offrono piani ricaricabili con crediti che puoi usare per acquistare nuovi pacchetti di dati."
    },
    {
      question: "Cosa succede se esaurisco i dati?",
      answer: "Dipende dal piano. Alcuni eSIM si disattivano automaticamente, altri rallentano la velocità, altri ancora permettono di acquistare dati aggiuntivi. Controlla sempre i termini del piano prima dell'acquisto."
    },
    {
      question: "Gli eSIM sono sicuri?",
      answer: "Sì, gli eSIM sono molto sicuri. Non possono essere rubati fisicamente come le SIM tradizionali, e molti provider implementano misure di sicurezza avanzate. Inoltre, puoi disattivarli remotamente se perdi il dispositivo."
    },
    {
      question: "Posso trasferire un eSIM su un altro dispositivo?",
      answer: "In genere no, gli eSIM sono legati al dispositivo specifico. Tuttavia, alcuni provider come Nomad offrono eSIM trasferibili. Se cambi telefono, dovrai acquistare un nuovo eSIM."
    },
    {
      question: "Come scelgo il provider migliore?",
      answer: "Considera questi fattori: copertura nel paese di destinazione, prezzo per GB, velocità di connessione, supporto 5G, politiche di rimborso, e se hai bisogno di hotspot. Il nostro comparatore ti aiuta a valutare tutti questi aspetti."
    },
    {
      question: "Cosa devo fare se l'eSIM non funziona?",
      answer: "Prima di tutto, verifica che il dispositivo supporti eSIM e che sia sbloccato. Poi controlla le impostazioni APN e assicurati di essere nel paese corretto. Se il problema persiste, contatta il supporto del provider."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Domande frequenti
            </h2>
            <p className="text-lg text-gray-600">
              Tutto quello che devi sapere sugli eSIM
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contatto supporto */}
          <div className="mt-12 text-center">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Non hai trovato la risposta?
              </h3>
              <p className="text-gray-600 mb-4">
                Se hai altre domande sugli eSIM o sul nostro comparatore, 
                non esitare a contattarci.
              </p>
              <a 
                href="mailto:supporto@puntifurbi.com" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contattaci
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
