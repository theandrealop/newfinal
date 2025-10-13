// app/[locale]/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { fetchWordPressPostBySlugWithLang } from '@/lib/wordpress-i18n'
import { Metadata } from 'next'
import { BlogPostContent } from '@/components/blog-post-content'
// Removed cache-busting imports to fix DYNAMIC_SERVER_USAGE error
// Removed BlogPostSchema to fix DYNAMIC_SERVER_USAGE error

// Genera i parametri statici per il build
export async function generateStaticParams() {
  // Nessun post statico, tutto on-demand
  return []
}

// Resto del tuo codice esistente...
async function BlogPostPageContent({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
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
