import type { BlogPost } from "@/lib/graphql-api"
import { Badge } from "@/components/ui/badge"

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
            {/* SVG Facebook ufficiale */}
            <svg width="32" height="32" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 32 32"><title>Facebook</title><path d="M29 0H3C1.343 0 0 1.343 0 3v26c0 1.657 1.343 3 3 3h13V20h-4v-5h4v-3.5C16 8.57 18.014 7 20.5 7c1.104 0 2.5.196 2.5.196V11h-1.41C20.36 11 20 11.672 20 12.5V15h5l-1 5h-4v12h6c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3z"/></svg>
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
            {/* SVG WhatsApp ufficiale */}
            <svg width="32" height="32" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 32 32"><title>WhatsApp</title><path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.86 5.1 2.33 7.13L4 29l7.13-2.33A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.93 0-3.77-.5-5.36-1.44l-.38-.22-4.23 1.38 1.38-4.23-.22-.38A9.97 9.97 0 0 1 6 15c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.07-6.1c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.62.14-.19.28-.74.91-.91 1.09-.17.18-.33.2-.6.07-.28-.14-1.18-.44-2.25-1.38-.83-.74-1.39-1.65-1.56-1.93-.17-.28-.02-.43.12-.57.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.62-1.5-.85-2.06-.22-.54-.44-.47-.6-.48-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.97-.95 2.37 0 1.4 1.02 2.75 1.16 2.94.14.19 1.99 3.04 4.83 4.15.67.29 1.19.47 1.6.6.67.21 1.28.18 1.76.11.54-.08 1.65-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.25-.18-.53-.32z"/></svg>
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
            {/* SVG LinkedIn ufficiale */}
            <svg width="32" height="32" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 32 32"><title>LinkedIn</title><path d="M27 3H5C3.343 3 2 4.343 2 6v20c0 1.657 1.343 3 3 3h22c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3zM12 25H8V13h4v12zm-2-13.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm15 13.5h-4v-5.5c0-1.104-.896-2-2-2s-2 .896-2 2V25h-4V13h4v1.5c.553-.832 1.553-1.5 2.5-1.5 1.933 0 3.5 1.567 3.5 3.5V25z"/></svg>
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
            {/* SVG X ufficiale */}
            <svg width="32" height="32" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 32 32"><title>X (Twitter)</title><image href="https://cdn.freelogovectors.net/wp-content/uploads/2023/07/twitter_x-logo-freelogovectors.net_.png" width="32" height="32"/></svg>
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
            {/* SVG Telegram ufficiale */}
            <svg width="32" height="32" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 32 32"><title>Telegram</title><path d="M16 3C8.82 3 3 8.82 3 16c0 7.18 5.82 13 13 13s13-5.82 13-13c0-7.18-5.82-13-13-13zm5.98 8.29l-2.47 10.44c-.18.77-.65.96-1.31.6l-3.63-2.68-1.75 1.69c-.15.15-.28.28-.57.28l.21-3.68 6.7-6.06c.29-.26-.06-.41-.44-.15l-8.3 5.23-3.58-1.12c-.78-.24-.8-.78.18-1.15l13.99-5.41c.65-.25 1.22.15 1.01 1.09z"/></svg>
            <span className="sr-only">Telegram</span>
          </a>
          {/* Copia link */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(post.canonicalUrl || post.link)
            }}
            aria-label="Copia link dell'articolo"
            title="Copia link dell'articolo"
            className="transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded flex items-center gap-2"
          >
            {/* SVG link/copy */}
            <svg width="32" height="32" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 32 32"><title>Copia link</title><path d="M18.364 13.636a1 1 0 0 1 1.414 1.414l-6.364 6.364a4 4 0 1 1-5.656-5.656l4.243-4.243a4 4 0 0 1 5.656 5.656l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a2 2 0 1 0-2.828-2.828l-4.243 4.243a2 2 0 1 0 2.828 2.828l6.364-6.364z"/></svg>
            <span className="sr-only">Copia link</span>
          </button>
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
