import type { BlogPost } from "@/lib/graphql-api"
import { Badge } from "@/components/ui/badge"
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import CopyLinkButton from "@/components/CopyLinkButton"

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Function to process HTML content and add target="_blank" to all links
  const processContentLinks = (htmlContent: string) => {
    return htmlContent.replace(
      /<a([^>]*?)>/g, 
      '<a$1 target="_blank" rel="noopener noreferrer">'
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8">
          <img
            src={post.featuredImage.node.sourceUrl || "/placeholder.svg"}
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
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.canonicalUrl || post.link)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su Facebook"
            title="Condividi su Facebook"
            className="transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            <FaFacebook size={40} className="text-[#1877F2] hover:text-blue-500" />
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
            <FaInstagram size={40} className="text-[#E4405F] hover:text-pink-500" />
            <span className="sr-only">Instagram</span>
          </a>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + (post.canonicalUrl || post.link))}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su WhatsApp"
            title="Condividi su WhatsApp"
            className="transition-colors hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          >
            <FaTelegram size={40} className="text-[#25D366] hover:text-green-600" />
            <span className="sr-only">WhatsApp</span>
          </a>
          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(post.canonicalUrl || post.link)}&title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su LinkedIn"
            title="Condividi su LinkedIn"
            className="transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 rounded"
          >
            <FaLinkedin size={40} className="text-[#0077B5] hover:text-blue-800" />
            <span className="sr-only">LinkedIn</span>
          </a>
          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(post.canonicalUrl || post.link)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su X (Twitter)"
            title="Condividi su X (Twitter)"
            className="transition-colors hover:text-black focus:outline-none focus:ring-2 focus:ring-black rounded"
          >
            <FaXTwitter size={40} className="text-black hover:text-gray-700" />
            <span className="sr-only">X (Twitter)</span>
          </a>
          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(post.canonicalUrl || post.link)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su Telegram"
            title="Condividi su Telegram"
            className="transition-colors hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            <FaTelegram size={40} className="text-[#229ED9] hover:text-blue-400" />
            <span className="sr-only">Telegram</span>
          </a>
          {/* Copia link */}
          <CopyLinkButton url={post.canonicalUrl || post.link} />
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
    </article>
  )
}
