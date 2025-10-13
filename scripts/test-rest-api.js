#!/usr/bin/env node

/**
 * Script per testare la REST API WordPress
 * Esegui con: node scripts/test-rest-api.js
 */

const WORDPRESS_REST_URL = "https://puntifurbi.wasmer.app/wp-json/wp/v2"

async function testRestAPI() {
  console.log("🧪 Testando la REST API WordPress...")
  console.log(`📍 Endpoint: ${WORDPRESS_REST_URL}`)
  console.log("")

  try {
    // Test 1: Recupera i post
    console.log("1️⃣ Testando recupero post...")
    const postsResponse = await fetch(`${WORDPRESS_REST_URL}/posts?per_page=3&_embed=true`)
    
    if (!postsResponse.ok) {
      throw new Error(`HTTP ${postsResponse.status}: ${postsResponse.statusText}`)
    }
    
    const posts = await postsResponse.json()
    console.log(`✅ Trovati ${posts.length} post`)
    console.log(`📊 Total pages: ${postsResponse.headers.get('X-WP-TotalPages')}`)
    console.log(`📊 Total posts: ${postsResponse.headers.get('X-WP-Total')}`)
    
    if (posts.length > 0) {
      const firstPost = posts[0]
      console.log(`📝 Primo post: "${firstPost.title.rendered}"`)
      console.log(`🔗 Slug: ${firstPost.slug}`)
      console.log(`📅 Data: ${firstPost.date}`)
      console.log(`👤 Autore: ${firstPost._embedded?.author?.[0]?.name || 'N/A'}`)
      console.log(`🏷️ Categorie: ${firstPost._embedded?.['wp:term']?.filter(t => t.taxonomy === 'category').map(c => c.name).join(', ') || 'N/A'}`)
      console.log(`🖼️ Immagine: ${firstPost._embedded?.['wp:featuredmedia']?.[0]?.source_url ? 'Sì' : 'No'}`)
    }
    console.log("")

    // Test 2: Recupera le categorie
    console.log("2️⃣ Testando recupero categorie...")
    const categoriesResponse = await fetch(`${WORDPRESS_REST_URL}/categories`)
    
    if (!categoriesResponse.ok) {
      throw new Error(`HTTP ${categoriesResponse.status}: ${categoriesResponse.statusText}`)
    }
    
    const categories = await categoriesResponse.json()
    console.log(`✅ Trovate ${categories.length} categorie`)
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.slug}) - ${cat.count} post`)
    })
    console.log("")

    // Test 3: Testa filtro per categoria
    console.log("3️⃣ Testando filtro per categoria...")
    const esimCategory = categories.find(cat => cat.slug === 'esim')
    if (esimCategory) {
      const esimPostsResponse = await fetch(`${WORDPRESS_REST_URL}/posts?categories=${esimCategory.id}&per_page=2&_embed=true`)
      if (esimPostsResponse.ok) {
        const esimPosts = await esimPostsResponse.json()
        console.log(`✅ Trovati ${esimPosts.length} post nella categoria eSIM`)
        esimPosts.forEach(post => {
          console.log(`  - "${post.title.rendered}"`)
        })
      }
    } else {
      console.log("⚠️ Categoria 'esim' non trovata")
    }
    console.log("")

    // Test 4: Testa ricerca
    console.log("4️⃣ Testando ricerca...")
    const searchResponse = await fetch(`${WORDPRESS_REST_URL}/posts?search=esim&per_page=2`)
    if (searchResponse.ok) {
      const searchPosts = await searchResponse.json()
      console.log(`✅ Trovati ${searchPosts.length} post per ricerca "esim"`)
    }
    console.log("")

    console.log("🎉 Tutti i test completati con successo!")
    console.log("✅ La REST API è funzionante e pronta per l'uso")

  } catch (error) {
    console.error("❌ Errore durante il test:", error.message)
    console.error("🔍 Dettagli:", error)
    process.exit(1)
  }
}

// Esegui il test
testRestAPI()
