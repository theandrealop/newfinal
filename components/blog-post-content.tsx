import type { BlogPost } from "@/lib/graphql-api"
import { Badge } from "@/components/ui/badge"
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const formatDate = (dateString: string) => {
    // Static date formatting - just return the date string as is
    return dateString.split('T')[0] // Extract just the date part (YYYY-MM-DD)
  }

  // Function to process HTML content for links and images
  const processContentLinks = (htmlContent: string) => {
    let processedContent = htmlContent
    
    // Convert HTTP URLs to HTTPS for images and links
    processedContent = processedContent.replace(
      /http:\/\/puntifurbi\.wasmer\.app/g,
      'https://puntifurbi.wasmer.app'
    )
    
    // Rewrite expiring Jasper GCS signed URLs through local proxy
    processedContent = processedContent
      // storage.googleapis.com/.../jasper-production-images-doc/...
      .replace(
        /src=\"(https:\/\/storage\.googleapis\.com\/[^"]*jasper-production-images-doc[^"]*)\"/g,
        'src="/api/proxy-image?url=$1"'
      )
      // jasper-production-images-doc.storage.googleapis.com/...
      .replace(
        /src=\"(https:\/\/jasper-production-images-doc\.storage\.googleapis\.com\/[^"]*)\"/g,
        'src="/api/proxy-image?url=$1"'
      )
    
    // Add alt attributes to images that don't have them
    processedContent = processedContent.replace(
      /<img([^>]*?)(?<!alt=)([^>]*?)>/g,
      '<img$1 alt="Immagine" $2>'
    )
    
    // Add onerror fallback to images to handle 403/expired links
    processedContent = processedContent.replace(
      /<img([^>]*?)>/g,
      '<img$1 onerror="this.onerror=null;this.src=\'/placeholder.jpg\';" />'
    )
    
    // Add target="_blank" to all links
    processedContent = processedContent.replace(
      /<a([^>]*?)>/g, 
      '<a$1 target="_blank" rel="noopener noreferrer">'
    )

    // Rewrite legacy internal links to current destinations to avoid crawler hitting 404/redirects
    const legacyMap: Record<string, string> = {
      // Italian
      '/giappone-pocket-wifi-vs-sim': '/blog/',
      '/come-attivare-esim': '/esim/',
      '/esim-marocco-guida-completa': '/esim/',
      '/esim-per-il-marocco-tutte-le-opzioni-costi-e-migliori-alternative-2025': '/blog/esim-marocco-opzioni-costi-provider',
      '/esim-risparmiare-viaggi': '/esim/',
      '/guida-punti-fedelta': '/blog/',
      '/migliori-esim-internazionali': '/esim/',
      '/category/mobile-viaggi': '/blog/',
      '/esim-partner': '/esim/',
      '/esim-giappone-faq': '/esim/',
      '/status-hotel': '/',
      '/guide-marocco-mobile-internet': '/blog/',
      '/comparatore-esim-internazionali': '/esim/',
      '/contatti': '/contatto/',
      // English
      '/en/giappone-pocket-wifi-vs-sim': '/en/blog/',
      '/en/come-attivare-esim': '/en/esim/',
      '/en/esim-marocco-guida-completa': '/en/esim/',
      '/en/esim-per-il-marocco-tutte-le-opzioni-costi-e-migliori-alternative-2025': '/en/blog/',
      '/en/cose-una-esim-come-funziona-davvero-e-quanto-ti-conviene-passarci': '/blog/cose-una-esim-come-funziona-davvero-e-quanto-ti-conviene-passarci',
      '/en/esim-risparmiare-viaggi': '/en/esim/',
      '/en/guida-punti-fedelta': '/en/blog/',
      '/en/migliori-esim-internazionali': '/en/esim/',
      '/en/category/mobile-viaggi': '/en/blog/',
      '/en/esim-partner': '/en/esim/',
      '/en/esim-giappone-faq': '/en/esim/',
      '/en/status-hotel': '/en/',
      '/en/guide-marocco-mobile-internet': '/en/blog/',
      '/en/comparatore-esim-internazionali': '/en/esim/',
      '/en/contatti': '/en/contatto/',
    }
    Object.entries(legacyMap).forEach(([fromPath, toPath]) => {
      const pattern = new RegExp(`href=\\"(?:https?:\\/\\/)?(?:www\\.)?puntifurbi\\.com${fromPath}\\/?\\"`, 'g')
      processedContent = processedContent.replace(pattern, `href=\"${toPath}\"`)
      // Also handle site-relative links
      const relPattern = new RegExp(`href=\\"${fromPath}\\/?\\"`, 'g')
      processedContent = processedContent.replace(relPattern, `href=\"${toPath}\"`)
    })
    
    return processedContent
  }

  const canonicalUrl = `https://www.puntifurbi.com/blog/${post.slug}/`

  return (
    <article className="max-w-4xl mx-auto">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8">
          <img
            src={post.featuredImage.node.sourceUrl?.replace('http://', 'https://') || "/placeholder.svg"}
            alt={post.featuredImage.node.altText || post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.categories.nodes.map((category) => (
          <Badge key={category.slug} variant="secondary">
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark-green">{post.title}</h1>

      {/* Social Sharing */}
      <section className="mb-8" aria-label="Condividi l’articolo">
        <span className="block text-lg font-semibold mb-4">Condividi su:</span>
        <div className="flex flex-wrap gap-3">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su Facebook"
            title="Condividi su Facebook"
            className="transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            <FaFacebook size={20} className="text-[#1877F2] hover:text-blue-500" />
            <span className="sr-only">Facebook</span>
          </a>
          {/* Instagram */}
          <a
            href={`https://www.instagram.com/puntifurbi/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su Instagram"
            title="Condividi su Instagram"
            className="transition-colors hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
          >
            <FaInstagram size={20} className="text-[#E4405F] hover:text-pink-500" />
            <span className="sr-only">Instagram</span>
          </a>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + canonicalUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su WhatsApp"
            title="Condividi su WhatsApp"
            className="transition-colors hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          >
            <FaTelegram size={20} className="text-[#25D366] hover:text-green-600" />
            <span className="sr-only">WhatsApp</span>
          </a>
          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(canonicalUrl)}&title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su LinkedIn"
            title="Condividi su LinkedIn"
            className="transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 rounded"
          >
            <FaLinkedin size={20} className="text-[#0077B5] hover:text-blue-800" />
            <span className="sr-only">LinkedIn</span>
          </a>
          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su X (Twitter)"
            title="Condividi su X (Twitter)"
            className="transition-colors hover:text-black focus:outline-none focus:ring-2 focus:ring-black rounded"
          >
            <FaXTwitter size={20} className="text-black hover:text-gray-700" />
            <span className="sr-only">X (Twitter)</span>
          </a>
          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su Telegram"
            title="Condividi su Telegram"
            className="transition-colors hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            <FaTelegram size={20} className="text-[#229ED9] hover:text-blue-400" />
            <span className="sr-only">Telegram</span>
          </a>
        </div>
      </section>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-8 text-muted-foreground">
        <span>Di {post.author.node.name}</span>
        <span>•</span>
        <span>{formatDate(post.date)}</span>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: processContentLinks(post.content) }} />

      {/* Tags */}
      {post.tags.nodes.length > 0 && (
        <div className="mt-8 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Tag</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.nodes.map((tag) => (
              <Badge key={tag.slug} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Related Links */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Link Utili</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/esim/" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <h4 className="font-semibold text-blue-900 mb-2">Confronta eSIM</h4>
            <p className="text-sm text-blue-700">Trova la migliore eSIM per i tuoi viaggi</p>
          </a>
          <a href="/voli-economici/" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <h4 className="font-semibold text-green-900 mb-2">Voli Economici</h4>
            <p className="text-sm text-green-700">Scopri le migliori offerte di volo</p>
          </a>
          <a href="/premium/" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <h4 className="font-semibold text-purple-900 mb-2">Piano Premium</h4>
            <p className="text-sm text-purple-700">Accesso a offerte esclusive</p>
          </a>
          <a href="/blog/" className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <h4 className="font-semibold text-orange-900 mb-2">Blog</h4>
            <p className="text-sm text-orange-700">Leggi altri articoli e guide</p>
          </a>
        </div>
      </div>
    </article>
  )
}
