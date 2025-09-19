#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Schema di validazione semplificato
const validateEsimOffer = (offer) => {
  const errors = []
  
  // Campi obbligatori
  const requiredFields = ['id', 'providerId', 'countryCode', 'countryName', 'planName', 'dataGB', 'durationKey', 'durationDays', 'priceEUR', 'network', 'fiveG', 'hotspot', 'eKYC', 'link', 'rating', 'updatedAt']
  
  requiredFields.forEach(field => {
    if (offer[field] === undefined || offer[field] === null) {
      errors.push(`Campo mancante: ${field}`)
    }
  })

  // Validazione tipi
  if (typeof offer.priceEUR !== 'number' || offer.priceEUR <= 0) {
    errors.push('priceEUR deve essere un numero positivo')
  }

  if (typeof offer.durationDays !== 'number' || offer.durationDays <= 0) {
    errors.push('durationDays deve essere un numero positivo')
  }

  if (offer.dataGB !== 'unlimited' && (typeof offer.dataGB !== 'number' || offer.dataGB <= 0)) {
    errors.push('dataGB deve essere "unlimited" o un numero positivo')
  }

  if (typeof offer.fiveG !== 'boolean') {
    errors.push('fiveG deve essere un booleano')
  }

  if (typeof offer.hotspot !== 'boolean') {
    errors.push('hotspot deve essere un booleano')
  }

  if (!['none', 'passport', 'id'].includes(offer.eKYC)) {
    errors.push('eKYC deve essere "none", "passport" o "id"')
  }

  if (!['1-7d', '1-2w', '1m', '2-3m'].includes(offer.durationKey)) {
    errors.push('durationKey deve essere uno dei valori validi')
  }

  // Validazione rating
  if (!offer.rating || typeof offer.rating.overall !== 'number' || offer.rating.overall < 0 || offer.rating.overall > 10) {
    errors.push('rating.overall deve essere un numero tra 0 e 10')
  }

  // Validazione data
  if (!Date.parse(offer.updatedAt)) {
    errors.push('updatedAt deve essere una data valida')
  }

  return errors
}

const validateCountry = (country) => {
  const errors = []
  
  if (!country.code || !country.name) {
    errors.push('Campo mancante: code o name')
  }

  if (country.code && country.code.length !== 2) {
    errors.push('code deve essere di 2 caratteri')
  }

  if (!Array.isArray(country.aliases)) {
    errors.push('aliases deve essere un array')
  }

  return errors
}

const validateProvider = (provider) => {
  const errors = []
  
  const requiredFields = ['id', 'name', 'description', 'website']
  
  requiredFields.forEach(field => {
    if (!provider[field]) {
      errors.push(`Campo mancante: ${field}`)
    }
  })

  return errors
}

// Funzione principale
function buildEsimData() {
  console.log('🔍 Validazione dati eSIM...')
  
  const dataDir = path.join(__dirname, '..', 'data')
  let hasErrors = false

  try {
    // Validazione offerte eSIM
    console.log('\n📊 Validazione offerte eSIM...')
    const offersPath = path.join(dataDir, 'esim-offers.json')
    const offers = JSON.parse(fs.readFileSync(offersPath, 'utf8'))
    
    offers.forEach((offer, index) => {
      const errors = validateEsimOffer(offer)
      if (errors.length > 0) {
        console.error(`❌ Errore nell'offerta ${index + 1} (${offer.id}):`)
        errors.forEach(error => console.error(`   - ${error}`))
        hasErrors = true
      }
    })

    if (!hasErrors) {
      console.log(`✅ ${offers.length} offerte validate con successo`)
    }

    // Validazione paesi
    console.log('\n🌍 Validazione paesi...')
    const countriesPath = path.join(dataDir, 'countries.json')
    const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'))
    
    countries.forEach((country, index) => {
      const errors = validateCountry(country)
      if (errors.length > 0) {
        console.error(`❌ Errore nel paese ${index + 1} (${country.code}):`)
        errors.forEach(error => console.error(`   - ${error}`))
        hasErrors = true
      }
    })

    if (!hasErrors) {
      console.log(`✅ ${countries.length} paesi validati con successo`)
    }

    // Validazione provider
    console.log('\n🏢 Validazione provider...')
    const providersPath = path.join(dataDir, 'provider-metadata.json')
    const providers = JSON.parse(fs.readFileSync(providersPath, 'utf8'))
    
    providers.forEach((provider, index) => {
      const errors = validateProvider(provider)
      if (errors.length > 0) {
        console.error(`❌ Errore nel provider ${index + 1} (${provider.id}):`)
        errors.forEach(error => console.error(`   - ${error}`))
        hasErrors = true
      }
    })

    if (!hasErrors) {
      console.log(`✅ ${providers.length} provider validati con successo`)
    }

    // Calcolo statistiche
    if (!hasErrors) {
      console.log('\n📈 Statistiche:')
      console.log(`   - Offerte totali: ${offers.length}`)
      console.log(`   - Paesi coperti: ${countries.length}`)
      console.log(`   - Provider: ${providers.length}`)
      
      const countriesWithOffers = new Set(offers.map(o => o.countryCode)).size
      console.log(`   - Paesi con offerte: ${countriesWithOffers}`)
      
      const avgPrice = offers.reduce((sum, o) => sum + o.priceEUR, 0) / offers.length
      console.log(`   - Prezzo medio: €${avgPrice.toFixed(2)}`)
      
      const fiveGOffers = offers.filter(o => o.fiveG).length
      console.log(`   - Offerte 5G: ${fiveGOffers} (${((fiveGOffers / offers.length) * 100).toFixed(1)}%)`)
    }

  } catch (error) {
    console.error('❌ Errore durante la validazione:', error.message)
    process.exit(1)
  }

  if (hasErrors) {
    console.error('\n❌ Validazione fallita. Correggi gli errori prima di continuare.')
    process.exit(1)
  } else {
    console.log('\n✅ Tutti i dati eSIM sono validi!')
  }
}

// Esegui se chiamato direttamente
if (require.main === module) {
  buildEsimData()
}

module.exports = { buildEsimData }
