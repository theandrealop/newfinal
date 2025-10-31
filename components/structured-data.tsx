import Script from 'next/script'

interface OrganizationSchemaProps {
  name: string
  url: string
  logo?: string
  socialLinks?: string[]
}

export function OrganizationSchema({ name, url, logo, socialLinks }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: logo || `${url}/placeholder-logo.png`,
    sameAs: socialLinks || [],
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface WebsiteSchemaProps {
  name: string
  url: string
  description: string
}

export function WebsiteSchema({ name, url, description }: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/voli-economici/?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FlightOfferSchemaProps {
  offers: Array<{
    id: number
    origin: string
    destination: string
    price: number
    originalPrice: number
    airline: string
    dates: string
  }>
}

export function FlightOffersSchema({ offers }: FlightOfferSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: offers.map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: `Volo ${offer.origin} - ${offer.destination}`,
        description: `Volo economico da ${offer.origin} a ${offer.destination} con ${offer.airline}`,
        offers: {
          '@type': 'Offer',
          price: offer.price,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          validThrough: '2025-12-31',
        },
        brand: {
          '@type': 'Brand',
          name: offer.airline,
        },
      },
    })),
  }

  return (
    <Script
      id="flight-offers-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const isLastItem = index === items.length - 1
      const absoluteUrl = item.url.startsWith('http') ? item.url : `https://puntifurbi.com${item.url}`
      
      const listItem: any = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      }
      
      // Solo gli elementi non finali hanno la proprietà "item"
      if (!isLastItem) {
        listItem.item = absoluteUrl
      }
      
      return listItem
    }),
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BlogPostSchemaProps {
  post: {
    title: string
    excerpt: string
    date: string
    modified?: string
    slug: string
    featuredImage?: string
    author?: string
  }
}

export function BlogPostSchema({ post }: BlogPostSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author || 'Punti Furbi'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Punti Furbi',
      url: 'https://puntifurbi.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://puntifurbi.com/images/logo.png'
      }
    },
    datePublished: post.date,
    dateModified: post.modified || post.date,
    url: `https://puntifurbi.com/blog/${post.slug}/`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://puntifurbi.com/blog/${post.slug}/`
    },
    image: post.featuredImage ? {
      '@type': 'ImageObject',
      url: post.featuredImage
    } : undefined,
    articleSection: 'Viaggi e Tecnologia',
    keywords: ['eSIM', 'viaggi', 'voli economici', 'risparmio', 'roaming']
  }

  return (
    <Script
      id="blog-post-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BlogListSchemaProps {
  posts: Array<{
    title: string
    excerpt: string
    date: string
    slug: string
    featuredImage?: string
  }>
}

export function BlogListSchema({ posts }: BlogListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blog Punti Furbi',
    description: 'Articoli e guide su eSIM, voli economici e risparmio viaggi',
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        url: `https://puntifurbi.com/blog/${post.slug}/`,
        datePublished: post.date,
        image: post.featuredImage
      }
    }))
  }

  return (
    <Script
      id="blog-list-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQSchemaProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ReviewSchemaProps {
  reviews: Array<{
    author: string
    rating: number
    reviewBody: string
    datePublished: string
  }>
}

export function ReviewSchema({ reviews }: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Punti Furbi',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished
    }))
  }

  return (
    <Script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ProductSchemaProps {
  product: {
    name: string
    description: string
    price?: number
    currency?: string
    availability?: string
    brand?: string
    category?: string
  }
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Punti Furbi'
    },
    category: product.category,
    offers: product.price ? {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'EUR',
      availability: product.availability || 'https://schema.org/InStock'
    } : undefined
  }

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}