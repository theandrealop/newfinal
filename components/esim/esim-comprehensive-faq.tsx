"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, HelpCircle, Smartphone, Wifi, Shield, Euro } from 'lucide-react'
import { useState } from 'react'

export function EsimComprehensiveFaq() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  const faqCategories = [
    {
      id: 'troubleshooting',
      title: 'Troubleshooting e Problemi Comuni',
      icon: <HelpCircle className="w-5 h-5" />,
      color: 'red',
      faqs: [
        {
          id: 'qr-not-scanning',
          question: 'Codice QR eSIM non si scansiona - Cosa fare?',
          answer: 'Se il codice QR non si scansiona, prova questi passaggi: 1) Pulisci la fotocamera del dispositivo, 2) Assicurati che il QR code sia ben illuminato, 3) Prova a ingrandire o rimpicciolire l\'immagine, 4) Controlla che il dispositivo supporti eSIM, 5) Riavvia l\'app e riprova. Se il problema persiste, contatta il supporto del provider.',
          keyword: 'codice QR eSIM non si scansiona'
        },
        {
          id: 'activation-failed',
          question: 'Attivazione eSIM fallita - Errori comuni e soluzioni',
          answer: 'L\'attivazione eSIM può fallire per diversi motivi: 1) Connessione internet instabile - verifica la connessione WiFi, 2) Dati personali errati - controlla nome, cognome e email, 3) Dispositivo non compatibile - verifica le specifiche tecniche, 4) VPN attivo - disattiva temporaneamente, 5) Provider in manutenzione - riprova più tardi. Contatta il supporto se il problema persiste.',
          keyword: 'attivazione eSIM fallita errori comuni'
        },
        {
          id: 'not-working-italy',
          question: 'eSIM non funziona in Italia - Cosa fare?',
          answer: 'Se l\'eSIM non funziona in Italia: 1) Verifica le impostazioni APN del dispositivo, 2) Controlla che la regione sia coperta dal provider, 3) Riavvia il dispositivo, 4) Verifica che l\'eSIM sia attiva nelle impostazioni, 5) Prova a disattivare e riattivare l\'eSIM, 6) Controlla la copertura 5G nella tua zona. La maggior parte dei problemi si risolve con questi passaggi.',
          keyword: 'eSIM non funziona in Italia cosa fare'
        },
        {
          id: 'expired-renewal',
          question: 'eSIM scaduta - Come rinnovare?',
          answer: 'Per rinnovare un\'eSIM scaduta: 1) Verifica se il provider offre estensioni del piano, 2) Acquista un nuovo piano eSIM, 3) Controlla le opzioni di top-up disponibili, 4) Considera piani più lunghi per il futuro, 5) Salva i dati importanti prima della scadenza. Molti provider offrono sconti per i rinnovi automatici.',
          keyword: 'eSIM scaduta come rinnovare'
        }
      ]
    },
    {
      id: 'device-compatibility',
      title: 'Compatibilità Dispositivi',
      icon: <Smartphone className="w-5 h-5" />,
      color: 'blue',
      faqs: [
        {
          id: 'iphone-12-mini',
          question: 'eSIM iPhone 12 mini - Come configurare?',
          answer: 'Per configurare eSIM su iPhone 12 mini: 1) Vai in Impostazioni > Cellulare > Aggiungi piano cellulare, 2) Scansiona il codice QR fornito dal provider, 3) Segui le istruzioni per completare l\'attivazione, 4) Imposta l\'eSIM come piano dati principale se necessario, 5) Verifica la connessione. L\'iPhone 12 mini supporta eSIM e dual SIM.',
          keyword: 'eSIM iPhone 12 mini configurazione'
        },
        {
          id: 'samsung-galaxy-dual',
          question: 'Samsung Galaxy eSIM dual SIM - Come funziona?',
          answer: 'Samsung Galaxy con eSIM dual SIM: 1) Vai in Impostazioni > Connessioni > SIM manager, 2) Tocca "Aggiungi piano mobile", 3) Seleziona "Aggiungi usando codice QR", 4) Scansiona il codice QR del provider, 5) Configura le impostazioni dual SIM, 6) Imposta quale SIM usare per dati, chiamate e SMS. La gestione dual SIM è molto flessibile.',
          keyword: 'Samsung Galaxy eSIM dual SIM'
        },
        {
          id: 'pixel-7a-installation',
          question: 'Pixel 7a eSIM installazione - Guida passo-passo',
          answer: 'Installazione eSIM su Pixel 7a: 1) Apri Impostazioni > Rete e Internet > SIM, 2) Tocca "Aggiungi SIM", 3) Seleziona "Non ho una SIM fisica", 4) Scansiona il codice QR del provider, 5) Inserisci i dati richiesti, 6) Attiva l\'eSIM, 7) Configura le impostazioni di rete. Il Pixel 7a ha un\'ottima compatibilità eSIM.',
          keyword: 'Pixel 7a eSIM installazione'
        },
        {
          id: 'smartwatch-sharing',
          question: 'Smartwatch eSIM condivisione numero - Come funziona?',
          answer: 'Per smartwatch eSIM con condivisione numero: 1) Assicurati che lo smartwatch sia il modello Cellular/LTE, 2) Usa l\'app del produttore (es. Apple Watch app), 3) Vai in Impostazioni > Cellulare, 4) Tocca "Configura eSIM", 5) Segui le istruzioni per la condivisione del numero, 6) Attiva l\'eSIM sullo smartwatch. Solo alcuni modelli supportano eSIM.',
          keyword: 'smartwatch eSIM condivisione numero'
        }
      ]
    },
    {
      id: 'functionality',
      title: 'Funzionalità e Caratteristiche',
      icon: <Wifi className="w-5 h-5" />,
      color: 'green',
      faqs: [
        {
          id: 'hotspot-wifi',
          question: 'eSIM hotspot WiFi condivisione - Come attivare?',
          answer: 'Per attivare l\'hotspot WiFi con eSIM: 1) Verifica che il piano eSIM supporti il tethering, 2) Vai in Impostazioni > Hotspot e tethering, 3) Attiva "Hotspot WiFi", 4) Configura nome e password della rete, 5) Connetti i dispositivi alla rete creata. Attenzione: il tethering consuma più dati e potrebbe essere limitato.',
          keyword: 'eSIM hotspot WiFi condivisione'
        },
        {
          id: 'voip-calls',
          question: 'eSIM chiamate VoIP WhatsApp - Funziona?',
          answer: 'Le eSIM supportano le chiamate VoIP come WhatsApp: 1) L\'eSIM fornisce solo dati, non chiamate vocali tradizionali, 2) WhatsApp funziona perfettamente con eSIM per chiamate e messaggi, 3) Usa app come WhatsApp, Skype, FaceTime per le chiamate, 4) Verifica che il piano includa dati sufficienti, 5) Le chiamate VoIP consumano circa 1MB al minuto.',
          keyword: 'eSIM chiamate VoIP WhatsApp'
        },
        {
          id: 'topup-online',
          question: 'eSIM ricaricabile top-up online - Come funziona?',
          answer: 'Per il top-up online delle eSIM: 1) Accedi al tuo account sul sito del provider, 2) Seleziona l\'eSIM da ricaricare, 3) Scegli il piano di top-up desiderato, 4) Completa il pagamento online, 5) L\'eSIM si aggiorna automaticamente, 6) Ricevi conferma via email. Molti provider offrono top-up automatici e sconti per ricariche multiple.',
          keyword: 'eSIM ricaricabile top-up online'
        },
        {
          id: 'backup-sim',
          question: 'eSIM backup SIM fisica insieme - È possibile?',
          answer: 'Sì, puoi usare eSIM e SIM fisica insieme: 1) Configura l\'eSIM come piano dati principale, 2) Mantieni la SIM fisica per chiamate e SMS, 3) Vai in Impostazioni > Cellulare per gestire entrambe, 4) Imposta quale usare per dati, chiamate e SMS, 5) Puoi disattivare temporaneamente una delle due. Questa configurazione è ideale per viaggi.',
          keyword: 'eSIM backup SIM fisica insieme'
        }
      ]
    },
    {
      id: 'technical-issues',
      title: 'Problemi Tecnici Avanzati',
      icon: <Shield className="w-5 h-5" />,
      color: 'purple',
      faqs: [
        {
          id: 'dual-sim-conflict',
          question: 'eSIM dual SIM conflitto rete - Come risolvere?',
          answer: 'Per risolvere conflitti dual SIM: 1) Vai in Impostazioni > Cellulare, 2) Disattiva temporaneamente una delle due SIM, 3) Verifica le impostazioni di roaming per entrambe, 4) Imposta l\'eSIM come SIM dati principale, 5) Controlla che non ci siano conflitti di frequenze, 6) Riavvia il dispositivo. Alcuni dispositivi gestiscono meglio il dual SIM di altri.',
          keyword: 'eSIM dual SIM conflitto rete'
        },
        {
          id: 'roaming-ue-problems',
          question: 'eSIM roaming UE problemi copertura - Cosa fare?',
          answer: 'Per problemi di roaming UE: 1) Verifica che l\'eSIM supporti il roaming UE, 2) Controlla le impostazioni di roaming del dispositivo, 3) Assicurati di essere in una zona coperta, 4) Prova a cambiare operatore manualmente, 5) Riavvia il dispositivo, 6) Contatta il supporto del provider. Il roaming UE dovrebbe funzionare senza costi aggiuntivi.',
          keyword: 'eSIM roaming UE problemi copertura'
        },
        {
          id: '5g-not-working',
          question: 'eSIM 5G non funziona Italia - Cause e soluzioni',
          answer: 'Se l\'eSIM 5G non funziona: 1) Verifica che il dispositivo supporti 5G, 2) Controlla che la zona abbia copertura 5G, 3) Assicurati che l\'eSIM supporti 5G, 4) Vai in Impostazioni > Cellulare > Opzioni dati > Modalità voce e dati, 5) Seleziona "5G automatico", 6) Riavvia il dispositivo. La copertura 5G è ancora limitata in alcune zone.',
          keyword: 'eSIM 5G non funziona Italia'
        },
        {
          id: 'slow-speed-solutions',
          question: 'eSIM velocità lenta - Cause e soluzioni',
          answer: 'Per velocità lenta eSIM: 1) Verifica la copertura 5G/4G nella zona, 2) Controlla il consumo dati in background, 3) Disattiva app che consumano molti dati, 4) Prova a cambiare operatore se disponibile, 5) Riavvia il dispositivo, 6) Verifica che l\'eSIM non sia limitata dal provider. La velocità dipende dalla copertura e dal traffico di rete.',
          keyword: 'eSIM velocità lenta cause soluzioni'
        }
      ]
    },
    {
      id: 'comparisons',
      title: 'Confronti e Educazione',
      icon: <Euro className="w-5 h-5" />,
      color: 'orange',
      faqs: [
        {
          id: 'esim-vs-physical',
          question: 'eSIM fisica vs eSIM - Vantaggi e svantaggi',
          answer: 'eSIM vs SIM fisica: VANTAGGI eSIM: 1) Nessuna carta fisica da gestire, 2) Attivazione istantanea, 3) Più sicura (non rubabile), 4) Supporto multi-SIM, 5) Acquisto online. SVANTAGGI eSIM: 1) Non tutti i dispositivi supportano, 2) Dipendenza dalla batteria, 3) Difficile da trasferire. La eSIM è ideale per viaggiatori frequenti.',
          keyword: 'eSIM fisica vs eSIM vantaggi svantaggi'
        },
        {
          id: 'roaming-savings',
          question: 'eSIM roaming tradizionale risparmio - Quanto si risparmia?',
          answer: 'Risparmio eSIM vs roaming tradizionale: 1) Roaming tradizionale: €0.20-0.50 per MB, 2) eSIM: €0.01-0.05 per MB, 3) Risparmio medio: 60-80%, 4) Per 1GB: roaming €200-500 vs eSIM €5-20, 5) Per viaggi lunghi il risparmio è enorme. Le eSIM sono la scelta più economica per viaggi internazionali.',
          keyword: 'eSIM roaming tradizionale risparmio'
        },
        {
          id: 'wifi-pocket-comparison',
          question: 'eSIM WiFi pocket confronto costi - Quale conviene?',
          answer: 'eSIM vs WiFi pocket: eSIM VANTAGGI: 1) Sempre connesso, 2) Nessun dispositivo extra, 3) Batteria del telefono, 4) Più sicuro. WiFi pocket VANTAGGI: 1) Condivisione con più dispositivi, 2) Batteria dedicata, 3) Più dati disponibili. COSTI: eSIM €5-20 per 1-10GB, WiFi pocket €30-80 per 1-20GB. L\'eSIM conviene per uso personale.',
          keyword: 'eSIM WiFi pocket confronto costi'
        }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              FAQ eSIM - Domande Frequenti
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trova risposte alle domande più comuni sulle eSIM. Troubleshooting, 
              compatibilità, funzionalità e confronti per aiutarti a scegliere la soluzione giusta.
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(category.color)}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.faqs.map((faq) => (
                    <Card key={faq.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-3">
                        <CardTitle 
                          className="text-lg font-bold text-gray-900 cursor-pointer"
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="pr-4">{faq.question}</span>
                            {expandedFaq === faq.id ? 
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" /> : 
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            }
                          </div>
                        </CardTitle>
                      </CardHeader>
                      
                      {expandedFaq === faq.id && (
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {faq.keyword}
                              </Badge>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setExpandedFaq(null)}
                              >
                                Chiudi
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Non hai trovato la risposta che cercavi?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Supporto Provider</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Contatta direttamente il supporto del tuo provider eSIM
                </p>
                <Button variant="outline" size="sm">
                  Contatta Supporto
                </Button>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Test Compatibilità</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Verifica se il tuo dispositivo supporta eSIM
                </p>
                <Button variant="outline" size="sm">
                  Test Dispositivo
                </Button>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Wifi className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Guide Dettagliate</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Leggi le nostre guide complete per ogni dispositivo
                </p>
                <Button variant="outline" size="sm">
                  Vedi Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
