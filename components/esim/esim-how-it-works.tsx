"use client"

import { Check, X, Smartphone, Wifi, Globe, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function EsimHowItWorks() {
  const t = useTranslations('ESim.howItWorks')
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* What is eSIM */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('whatIsEsim.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('whatIsEsim.description')}
              </p>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Smartphone className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">{t('whatIsEsim.integrated')}</p>
                  <p className="text-sm text-gray-600">{t('whatIsEsim.noPhysicalCard')}</p>
                </div>
              </div>
            </div>

            {/* How eSIM works */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('howEsimWorks.title')}
              </h3>
              <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: t('howEsimWorks.description') }}>
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <span className="text-gray-700">{t('howEsimWorks.step1')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <span className="text-gray-700">{t('howEsimWorks.step2')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <span className="text-gray-700">{t('howEsimWorks.step3')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pro & Cons Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* eSIM Pros & Cons */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Wifi className="w-6 h-6 text-blue-600 mr-3" />
                {t('prosCons.esim.title')}
              </h3>
              
              {/* Pros */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  {t('prosCons.esim.advantages.title')}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.advantages.0')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.advantages.1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.advantages.2')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.advantages.3')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.advantages.4')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.advantages.5')}</span>
                  </li>
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                  <X className="w-5 h-5 mr-2" />
                  {t('prosCons.esim.disadvantages.title')}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.disadvantages.0')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.disadvantages.1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.disadvantages.2')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.esim.disadvantages.3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* SIM Fisiche Pros & Cons */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 text-gray-600 mr-3" />
                {t('prosCons.physicalSim.title')}
              </h3>
              
              {/* Pros */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  {t('prosCons.physicalSim.advantages.title')}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.physicalSim.advantages.0')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.physicalSim.advantages.1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.physicalSim.advantages.2')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.physicalSim.advantages.3')}</span>
                  </li>
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                  <X className="w-5 h-5 mr-2" />
                  {t('prosCons.physicalSim.disadvantages.title')}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.physicalSim.disadvantages.0')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.physicalSim.disadvantages.1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.physicalSim.disadvantages.2')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.physicalSim.disadvantages.3')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('prosCons.physicalSim.disadvantages.4')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('whichToChoose.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('whichToChoose.description')}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span>{t('whichToChoose.checkCompatibility')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
