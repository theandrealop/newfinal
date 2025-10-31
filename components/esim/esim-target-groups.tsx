"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GraduationCap, Users, Baby, Heart, Briefcase, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function EsimTargetGroups() {
  const t = useTranslations('ESim.targetGroups')
  const targetGroups = [
    {
      id: 'students',
      title: t('students.title'),
      icon: <GraduationCap className="w-6 h-6" />,
      description: t('students.description'),
      bestProvider: t('students.provider'),
      avgPrice: t('students.price'),
      duration: t('students.duration'),
      features: 'students.features',
      benefits: 'students.advantages',
      keyword: 'eSIM per studenti Erasmus Italia',
      color: 'blue'
    },
    {
      id: 'senior',
      title: t('senior.title'),
      icon: <Heart className="w-6 h-6" />,
      description: t('senior.description'),
      bestProvider: t('senior.provider'),
      avgPrice: t('senior.price'),
      duration: t('senior.duration'),
      features: 'senior.features',
      benefits: 'senior.advantages',
      keyword: 'eSIM senior viaggi organizzati Italia',
      color: 'green'
    },
    {
      id: 'family',
      title: t('family.title'),
      icon: <Users className="w-6 h-6" />,
      description: t('family.description'),
      bestProvider: t('family.provider'),
      avgPrice: t('family.price'),
      duration: t('family.duration'),
      features: 'family.features',
      benefits: 'family.advantages',
      keyword: 'eSIM famiglia 4 persone Italia',
      color: 'purple'
    },
    {
      id: 'kids',
      title: t('kids.title'),
      icon: <Baby className="w-6 h-6" />,
      description: t('kids.description'),
      bestProvider: t('kids.provider'),
      avgPrice: t('kids.price'),
      duration: t('kids.duration'),
      features: 'kids.features',
      benefits: 'kids.advantages',
      keyword: 'eSIM bambini controllo parentale',
      color: 'pink'
    },
    {
      id: 'business',
      title: t('business.title'),
      icon: <Briefcase className="w-6 h-6" />,
      description: t('business.description'),
      bestProvider: t('business.provider'),
      avgPrice: t('business.price'),
      duration: t('business.duration'),
      features: 'business.features',
      benefits: 'business.advantages',
      keyword: 'eSIM business viaggi lavoro',
      color: 'indigo'
    },
    {
      id: 'frequent',
      title: t('frequent.title'),
      icon: <Globe className="w-6 h-6" />,
      description: t('frequent.description'),
      bestProvider: t('frequent.provider'),
      avgPrice: t('frequent.price'),
      duration: t('frequent.duration'),
      features: 'frequent.features',
      benefits: 'frequent.advantages',
      keyword: 'eSIM viaggiatori frequenti',
      color: 'orange'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      pink: 'bg-pink-100 text-pink-600',
      indigo: 'bg-indigo-100 text-indigo-600',
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
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(group.color)}`}>
                        {group.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {group.title}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {group.bestProvider}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {group.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Prezzo:</span>
                        <p className="font-semibold text-green-600">{group.avgPrice}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Durata:</span>
                        <p className="font-semibold">{group.duration}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Caratteristiche:</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {t(`${group.id}.features.0`)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {t(`${group.id}.features.1`)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {t(`${group.id}.features.2`)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {t(`${group.id}.features.3`)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Vantaggi:</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start space-x-2 text-xs text-gray-600">
                          <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{t(`${group.id}.advantages.0`)}</span>
                        </li>
                        <li className="flex items-start space-x-2 text-xs text-gray-600">
                          <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{t(`${group.id}.advantages.1`)}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-[#03464b] hover:bg-[#02363a] text-white"
                    size="sm"
                  >
                    {t('students.cta')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {t('howToChoose.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">{t('howToChoose.students.title')}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('howToChoose.students.features.0')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('howToChoose.students.features.1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('howToChoose.students.features.2')}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">{t('howToChoose.families.title')}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('howToChoose.families.features.0')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('howToChoose.families.features.1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('howToChoose.families.features.2')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
