"use client"

import { Button } from '@/components/ui/button'
import { Shield, Users, CheckCircle, Award, Heart } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function EsimTrustSection() {
  const t = useTranslations('ESim.aboutTrust')
  return (
    <section className="py-16 bg-white">
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

          <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('whyTrust')}
              </h3>
              <p className="text-lg text-gray-600">
                {t('mission')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('stats.users')}
                  </h4>
                  <p className="text-gray-600">
                    {t('stats.usersDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('stats.tests')}
                  </h4>
                  <p className="text-gray-600">
                    {t('stats.testsDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('stats.opinions')}
                  </h4>
                  <p className="text-gray-600">
                    {t('stats.opinionsDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('stats.support')}
                  </h4>
                  <p className="text-gray-600">
                    {t('stats.supportDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional trust factors */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {t('numbers.title')}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">190+</div>
                  <div className="text-sm text-gray-600">{t('numbers.countries')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">10+</div>
                  <div className="text-sm text-gray-600">{t('numbers.providers')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600">{t('numbers.reviews')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">24/7</div>
                  <div className="text-sm text-gray-600">{t('numbers.support')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/chi-siamo/">
                <Button variant="link" className="text-blue-600 hover:text-blue-700">
                  {t('links.about')}
                </Button>
              </Link>
              <Link href="mailto:info@puntifurbi.com">
                <Button variant="link" className="text-blue-600 hover:text-blue-700">
                  {t('links.contact')}
                </Button>
              </Link>
              <Link href="/informativa-privacy/">
                <Button variant="link" className="text-blue-600 hover:text-blue-700">
                  {t('links.privacy')}
                </Button>
              </Link>
              <Link href="/condizioni-utilizzo/">
                <Button variant="link" className="text-blue-600 hover:text-blue-700">
                  {t('links.terms')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              {t('footer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
