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
        <h3 className="text-lg font-semibold mb-4">Condividi su:</h3>
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
            <svg width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><title>Facebook</title><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
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
            <svg width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.991c-.003 5.451-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .06 5.433.058 12.084c0 2.13.557 4.21 1.615 6.033L.057 24l6.063-1.606a11.93 11.93 0 0 0 5.929 1.515h.005c6.554 0 11.889-5.432 11.891-12.083a11.86 11.86 0 0 0-3.48-8.414"/></svg>
            <span className="sr-only">WhatsApp</span>
          </a>
          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(post.canonicalUrl || post.link)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su X"
            title="Condividi su X"
            className="transition-colors hover:text-black focus:outline-none focus:ring-2 focus:ring-black rounded flex items-center gap-2"
          >
            <svg width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><title>X (Twitter)</title><path d="M22.162 0H1.838C.822 0 0 .822 0 1.838v20.324C0 23.178.822 24 1.838 24h20.324C23.178 24 24 23.178 24 22.162V1.838C24 .822 23.178 0 22.162 0zM7.548 20.452H3.545V9.545h4.003v10.907zm-2.002-12.36c-1.281 0-2.32-1.04-2.32-2.32 0-1.281 1.039-2.32 2.32-2.32 1.281 0 2.32 1.039 2.32 2.32 0 1.28-1.039 2.32-2.32 2.32zm15.454 12.36h-4.003v-5.604c0-1.336-.025-3.057-1.865-3.057-1.865 0-2.151 1.454-2.151 2.957v5.704h-4.003V9.545h3.845v1.489h.055c.536-1.014 1.845-2.084 3.797-2.084 4.061 0 4.808 2.674 4.808 6.146v5.356z"/></svg>
            <span className="sr-only">X</span>
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
            <svg width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.068 0-1.143.925-2.069 2.069-2.069 1.143 0 2.068.926 2.068 2.069 0 1.142-.925 2.068-2.068 2.068zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
            <span className="sr-only">LinkedIn</span>
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
            <svg width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><title>Telegram</title><path d="M12 0C5.371 0 0 5.371 0 12c0 6.629 5.371 12 12 12s12-5.371 12-12c0-6.629-5.371-12-12-12zm5.707 8.293l-1.414 8.485c-.104.624-.441.779-.892.485l-2.475-1.828-1.194 1.151c-.132.132-.242.242-.495.242l.177-2.507 4.566-4.127c.199-.177-.043-.276-.308-.099l-5.654 3.561-2.436-.761c-.529-.165-.539-.529.11-.779l9.51-3.671c.441-.165.826.099.684.771z"/></svg>
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
    </article>
  )
}
