// app/[locale]/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { fetchWordPressPostBySlugWithLang } from '@/lib/wordpress-i18n'
import { Metadata } from 'next'
import { BlogPostContent } from '@/components/blog-post-content'
// Removed cache-busting imports to fix DYNAMIC_SERVER_USAGE error
import { BlogPostSchema } from '@/components/structured-data'

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
      {/* Schema Markup per articolo blog */}
      <BlogPostSchema post={{
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        modified: post.modified,
        slug: post.slug,
        featuredImage: post.featuredImage,
        author: post.author?.name
      }} />
      
      <BlogPostContent post={postWithCanonical} />
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Post Correlati</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost: any) => (
              <div key={relatedPost.id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                <p className="text-gray-600 text-sm">{relatedPost.excerpt}</p>
                <a 
                  href={`/${locale}/blog/${relatedPost.slug}/`}
                  className="text-blue-600 hover:underline"
                >
                  Leggi di più
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
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

  const canonicalUrl = `https://puntifurbi.com/${locale}/blog/${slug}/`
  const lastModified = post.date || '2025-01-01T00:00:00.000Z'

  const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://puntifurbi.com';
  
  return {
    title: post.title,
    description: post.excerpt || post.title,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: `/it/blog/${slug}/`,
        en: `/en/blog/${slug}/`
      }
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      url: canonicalUrl,
      images: post.featuredImage ? [post.featuredImage.node.sourceUrl] : [],
      modifiedTime: lastModified,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: post.featuredImage ? [post.featuredImage.node.sourceUrl] : [],
    },
  }
}

export default BlogPostPageContent
