"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, QrCode, RefreshCw, HelpCircle, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function EsimTroubleshooting() {
  const t = useTranslations('ESim.troubleshooting')
  const [expandedProblem, setExpandedProblem] = useState<string | null>(null)

  const commonProblems = [
    {
      id: 'qrCode',
      title: t('problems.qrCode.title'),
      severity: 'high',
      icon: <QrCode className="w-5 h-5" />,
      quickFix: t('problems.qrCode.quickFix'),
      solutions: [
        'Pulisci la fotocamera del dispositivo',
        'Assicurati che il QR code sia ben illuminato',
        'Prova a ingrandire o rimpicciolire l\'immagine',
        'Controlla che il dispositivo supporti eSIM',
        'Riavvia l\'app e riprova'
      ],
      keyword: 'codice QR eSIM non si scansiona'
    },
    {
      id: 'activationFailed',
      title: t('problems.activationFailed.title'),
      severity: 'high',
      icon: <XCircle className="w-5 h-5" />,
      quickFix: t('problems.activationFailed.quickFix'),
      solutions: [
        'Controlla la connessione internet stabile',
        'Verifica che i dati personali siano corretti',
        'Assicurati che il dispositivo sia compatibile',
        'Prova a disattivare temporaneamente il VPN',
        'Contatta il supporto del provider'
      ],
      keyword: 'attivazione eSIM fallita errori comuni'
    },
    {
      id: 'notWorkingItaly',
      title: t('problems.notWorkingItaly.title'),
      severity: 'medium',
      icon: <AlertTriangle className="w-5 h-5" />,
      quickFix: t('problems.notWorkingItaly.quickFix'),
      solutions: [
        'Controlla le impostazioni APN del dispositivo',
        'Verifica che la regione sia coperta dal provider',
        'Riavvia il dispositivo',
        'Controlla che l\'eSIM sia attiva nelle impostazioni',
        'Prova a disattivare e riattivare l\'eSIM'
      ],
      keyword: 'eSIM non funziona in Italia cosa fare'
    },
    {
      id: 'expired',
      title: t('problems.expired.title'),
      severity: 'medium',
      icon: <RefreshCw className="w-5 h-5" />,
      quickFix: t('problems.expired.quickFix'),
      solutions: [
        'Verifica se il provider offre estensioni',
        'Acquista un nuovo piano eSIM',
        'Controlla le opzioni di top-up disponibili',
        'Considera piani più lunghi per il futuro',
        'Salva i dati importanti prima della scadenza'
      ],
      keyword: 'eSIM scaduta come rinnovare'
    },
    {
      id: 'dualSimConflict',
      title: t('problems.dualSimConflict.title'),
      severity: 'low',
      icon: <HelpCircle className="w-5 h-5" />,
      quickFix: t('problems.dualSimConflict.quickFix'),
      solutions: [
        'Imposta l\'eSIM come SIM dati principale',
        'Disattiva temporaneamente la SIM fisica',
        'Configura le impostazioni di roaming',
        'Verifica la compatibilità del dispositivo',
        'Contatta il supporto tecnico'
      ],
      keyword: 'eSIM dual SIM conflitto rete'
    },
    {
      id: 'slowSpeed',
      title: t('problems.slowSpeed.title'),
      severity: 'medium',
      icon: <AlertTriangle className="w-5 h-5" />,
      quickFix: t('problems.slowSpeed.quickFix'),
      solutions: [
        'Controlla se sei in una zona con copertura 5G',
        'Verifica le impostazioni di rete del dispositivo',
        'Prova a cambiare operatore se disponibile',
        'Controlla il consumo dati in background',
        'Riavvia il dispositivo e riprova'
      ],
      keyword: 'eSIM velocità lenta cause soluzioni'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'Critico'
      case 'medium': return 'Medio'
      case 'low': return 'Basso'
      default: return 'Sconosciuto'
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonProblems.map((problem) => (
              <Card key={problem.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {problem.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {problem.title}
                        </CardTitle>
                        <Badge className={`mt-1 ${getSeverityColor(problem.severity)}`}>
                          {getSeverityText(problem.severity)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-800 font-medium">
                        <strong>Soluzione rapida:</strong> {problem.quickFix}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button
                    variant="outline"
                    className="w-full mb-4"
                    onClick={() => setExpandedProblem(expandedProblem === problem.id ? null : problem.id)}
                  >
                    {expandedProblem === problem.id ? 'Nascondi' : 'Mostra'} soluzioni dettagliate
                  </Button>
                  
                  {expandedProblem === problem.id && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-2">Soluzioni passo-passo:</h4>
                      <ul className="space-y-2">
                        {problem.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-sm text-gray-700">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              {t('cantResolve')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('providerSupport')}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  {t('providerSupportDesc')}
                </p>
                <Button variant="outline" size="sm">
                  {t('contactSupport')}
                </Button>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('restartDevice')}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  {t('restartDeviceDesc')}
                </p>
                <Button variant="outline" size="sm">
                  {t('restartGuide')}
                </Button>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('checkCompatibility')}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  {t('checkCompatibilityDesc')}
                </p>
                <Button variant="outline" size="sm">
                  {t('compatibilityTest')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
