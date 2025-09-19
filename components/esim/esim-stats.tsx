"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, Database, TrendingDown, Star } from 'lucide-react'
import { esimService } from '@/lib/esim-service'

export function EsimStats() {
  const stats = esimService.getDatabaseStats()

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Il Nostro Database eSIM
          </h2>
          <p className="text-gray-600">
            Aggiornato costantemente con le migliori offerte del mercato
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offerte Totali</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOffers}</div>
              <p className="text-xs text-muted-foreground">
                Offerte disponibili
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paesi Coperti</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.countries}</div>
              <p className="text-xs text-muted-foreground">
                Destinazioni disponibili
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Provider</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.providers}</div>
              <p className="text-xs text-muted-foreground">
                Partner verificati
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prezzo Medio</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{stats.averagePrice}</div>
              <p className="text-xs text-muted-foreground">
                Per offerta
              </p>
            </CardContent>
          </Card>
        </div>

        {stats.cheapestOffer && (
          <div className="mt-8">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">
                      🏆 Offerta Più Economica
                    </h3>
                    <p className="text-green-700">
                      {stats.cheapestOffer.provider} - {stats.cheapestOffer.paese} 
                      ({stats.cheapestOffer.gb} GB, {stats.cheapestOffer.durata} giorni)
                    </p>
                  </div>
                  <Badge variant="default" className="bg-green-500 text-white">
                    €{stats.cheapestOffer.prezzo}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
