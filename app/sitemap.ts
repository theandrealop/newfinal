import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// Helper per ottenere i post del blog (da adattare se necessario)
async function getBlogPosts() {
  try {
    // Per ora restituiamo un array vuoto, ma qui si può integrare con WordPress API o altro CMS
    // const response = await fetch('https://api.puntifurbi.com/posts', { cache: 'no-store' })
    // if (response.ok) {
    //   const posts = await response.json()
    //   return posts
    // }
    return []
  } catch (error) {
    console.error('Errore caricamento posts blog:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://puntifurbi.com'
  const locales = ['it', 'en'] as const
  
  // Static pages localized for it/en
  const corePaths = [
    '/',
    '/voli-economici/',
    '/blog/',
    '/come-funziona/',
    '/premium/',
    '/elite/',
    '/checkout/',
    '/esim/',
    '/chi-siamo/',
    '/contatto/',
    '/informativa-privacy/',
    '/condizioni-utilizzo/',
  ]

  const staticPages: MetadataRoute.Sitemap = corePaths.map((path, idx) => ({
    url: path,
    lastModified: new Date(),
    changeFrequency: idx <= 2 ? 'daily' : idx <= 6 ? 'weekly' : idx <= 9 ? 'monthly' : 'yearly',
    priority: idx === 0 ? 1 : idx === 1 || idx === 6 || idx === 3 ? 0.8 : idx === 2 || idx === 7 ? 0.9 : idx <= 9 ? 0.5 : 0.3,
  })).map((entry) => ({
    ...entry,
    url: `${baseUrl}${entry.url}`,
  }))

  // Dynamic blog posts
  const blogPosts = await getBlogPosts()
  const blogSitemapEntries: MetadataRoute.Sitemap = [
    // Default locale (it) unprefixed
    ...blogPosts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // English locale prefixed
    ...blogPosts.map((post: any) => ({
      url: `${baseUrl}/en/blog/${post.slug}/`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [
    ...staticPages,
    ...blogSitemapEntries,
  ]
}