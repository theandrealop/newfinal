// app/[locale]/blog/[slug]/page.tsx
import { notFound, redirect } from 'next/navigation'
import { fetchWordPressPostBySlugWithLang } from '@/lib/wordpress-i18n'
import { getPostBySlugFromREST } from '@/lib/wordpress-rest-api'
import { Metadata } from 'next'
import { BlogPostContent } from '@/components/blog-post-content'
// Removed cache-busting imports to fix DYNAMIC_SERVER_USAGE error
// Removed BlogPostSchema to fix DYNAMIC_SERVER_USAGE error

export const dynamic = 'force-dynamic'

// Genera i parametri statici per il build
export async function generateStaticParams() {
  // Nessun post statico, tutto on-demand
  return []
}

// Helper function to detect if a post is Italian
function isItalianPost(title: string): boolean {
  const titleLower = title.toLowerCase();
  const italianIndicators = [
    'come attivare', 'guida completa', 'migliore', 'migliori', 'offerte dati',
    'risparmiare', 'viaggio', 'viaggi', 'vacanza', 'vacanze', 'economici',
    "per l'", 'per il', 'per la', 'della', 'delle', 'del', 'dei', 'dello',
    'albania', 'sudafrica', 'giappone', 'egitto', 'apre', 'primo',
    'cose', 'funziona', 'davvero', 'conviene', 'passarci', 'marocco'
  ];
  const englishIndicators = [
    'opens', 'first', 'how to', 'best', 'guide', 'complete',
    'u.s.', 'usa', 'united states', 'luxury collection'
  ];
  
  const hasItalian = italianIndicators.some(ind => titleLower.includes(ind));
  const hasEnglish = englishIndicators.some(ind => titleLower.includes(ind));
  
  if (hasItalian && !hasEnglish) return true;
  if (hasEnglish) return false;
  return false; // Default to not Italian if ambiguous
}

// Resto del tuo codice esistente...
async function BlogPostPageContent({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  
  // Try to fetch the post without language filter first to check if redirect is needed
  const rawPost = await getPostBySlugFromREST(slug);
  
  // If post exists but is in wrong language, redirect to correct locale
  if (rawPost) {
    const isItalian = isItalianPost(rawPost.title);
    
    // If Italian article requested via English URL, redirect to Italian
    if (locale === 'en' && isItalian) {
      redirect(`/blog/${slug}`);
    }
    // If English article requested via Italian URL, redirect to English
    if (locale === 'it' && !isItalian) {
      redirect(`/en/blog/${slug}`);
    }
  }
  
  const post = await fetchWordPressPostBySlugWithLang(slug, locale as 'it' | 'en')
  
  if (!post) {
    notFound()
  }

  // Related posts functionality removed for now
  const relatedPosts = []

  const canonicalUrl = `https://puntifurbi.com/${locale}/blog/${slug}/`
  const postWithCanonical = { ...post, canonicalUrl }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BlogPostContent post={postWithCanonical} />
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await fetchWordPressPostBySlugWithLang(slug, locale as 'it' | 'en')
  
  if (!post) {
    return {
      title: 'Post non trovato',
      description: 'Il post richiesto non esiste.',
      other: {
        'cache-control': 'no-cache, no-store, must-revalidate',
        'pragma': 'no-cache',
        'expires': '0',
      },
    }
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
  }
}

export default BlogPostPageContent
