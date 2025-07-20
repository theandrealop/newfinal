import type { BlogPost } from "@/lib/graphql-api"
import { Badge } from "@/components/ui/badge"
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
            className="transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded flex items-center gap-2"
          >
            {/* SVG Facebook icons8 */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><circle cx="16" cy="16" r="16" fill="#1877F2"/><path d="M20.5 16h-2v8h-3v-8h-2v-3h2v-1.5A2.5 2.5 0 0 1 18 9h2.5v3H18a.5.5 0 0 0-.5.5V13h3l-.5 3z" fill="#fff"/></svg>
            <span className="sr-only">Facebook</span>
          </a>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + (post.canonicalUrl || post.link))}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su WhatsApp"
            title="Condividi su WhatsApp"
            className="transition-colors hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded flex items-center gap-2"
          >
            {/* SVG WhatsApp icons8 */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><circle cx="16" cy="16" r="16" fill="#25D366"/><path d="M22.2 19.6c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.6-.4z" fill="#fff"/></svg>
            <span className="sr-only">WhatsApp</span>
          </a>
          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(post.canonicalUrl || post.link)}&title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su LinkedIn"
            title="Condividi su LinkedIn"
            className="transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 rounded flex items-center gap-2"
          >
            {/* SVG LinkedIn icons8 */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><circle cx="16" cy="16" r="16" fill="#0077B5"/><path d="M12.5 22h-3v-8h3v8zm-1.5-9.1c-1 0-1.7-.7-1.7-1.6 0-.9.7-1.6 1.7-1.6s1.7.7 1.7 1.6c0 .9-.7 1.6-1.7 1.6zm10 9.1h-3v-4c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1-.1.2-.1.5-.1.8v3.9h-3s.1-6.3 0-8h3v1.1c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1v4.3z" fill="#fff"/></svg>
            <span className="sr-only">LinkedIn</span>
          </a>
          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(post.canonicalUrl || post.link)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su X (Twitter)"
            title="Condividi su X (Twitter)"
            className="transition-colors hover:text-black focus:outline-none focus:ring-2 focus:ring-black rounded flex items-center gap-2"
          >
            {/* SVG X icons8 */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><title>X (Twitter)</title><circle cx="16" cy="16" r="16" fill="#222"/><path d="M21.5 10h-2.1l-3.4 4.2-3.4-4.2H8.5l4.2 5.2-4.2 5.2h2.1l3.4-4.2 3.4 4.2h2.1l-4.2-5.2 4.2-5.2z" fill="#fff"/></svg>
            <span className="sr-only">X (Twitter)</span>
          </a>
          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(post.canonicalUrl || post.link)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su Telegram"
            title="Condividi su Telegram"
            className="transition-colors hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded flex items-center gap-2"
          >
            {/* SVG Telegram icons8 */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><circle cx="16" cy="16" r="16" fill="#229ED9"/><path d="M22.98 10.29l-2.47 10.44c-.18.77-.65.96-1.31.6l-3.63-2.68-1.75 1.69c-.15.15-.28.28-.57.28l.21-3.68 6.7-6.06c.29-.26-.06-.41-.44-.15l-8.3 5.23-3.58-1.12c-.78-.24-.8-.78.18-1.15l13.99-5.41c.65-.25 1.22.15 1.01 1.09z" fill="#fff"/></svg>
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
