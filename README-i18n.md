# Internationalization (i18n) Implementation Guide

This document describes the complete i18n implementation for Punti Furbi using next-intl, including WordPress blog integration.

## Overview

The i18n system supports:
- **Italian (it)** - Default locale
- **English (en)** - Secondary locale
- WordPress blog multilingual support
- SEO-optimized URLs with locale prefixes
- Automatic locale detection and redirection

## Architecture

### Core Files

```
src/
├── i18n/
│   ├── routing.ts          # Locale routing configuration
│   ├── navigation.ts      # i18n navigation wrappers
│   └── request.ts          # Request configuration for messages
├── messages/
│   ├── it.json            # Italian translations
│   └── en.json            # English translations
lib/
├── wordpress-i18n.ts      # WordPress multilingual integration
└── wordpress-rest-api.ts  # WordPress REST API utilities
```

### App Structure

```
app/
├── [locale]/              # Localized routes
│   ├── layout.tsx         # Root layout with NextIntlClientProvider
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog pages
│   ├── esim/              # eSIM pages
│   └── ...                # Other pages
├── globals.css            # Global styles
└── layout.tsx             # Root layout (redirects to [locale])
```

## Configuration

### 1. Next.js Configuration

The `next.config.mjs` includes the next-intl plugin:

```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
```

### 2. Routing Configuration

`src/i18n/routing.ts` defines:
- Supported locales: `['it', 'en']`
- Default locale: `'it'`
- Pathname mappings for all routes

### 3. Middleware

`middleware.ts` handles:
- Locale negotiation
- Automatic redirects
- Asset filtering

## Usage

### Adding New Translations

1. **Add to message files:**
   ```json
   // src/messages/it.json
   {
     "NewSection": {
       "title": "Nuovo Titolo",
       "description": "Nuova descrizione"
     }
   }
   ```

   ```json
   // src/messages/en.json
   {
     "NewSection": {
       "title": "New Title",
       "description": "New description"
     }
   }
   ```

2. **Use in components:**
   ```tsx
   import { useTranslations } from 'next-intl';
   
   export default function MyComponent() {
     const t = useTranslations('NewSection');
     
     return (
       <div>
         <h1>{t('title')}</h1>
         <p>{t('description')}</p>
       </div>
     );
   }
   ```

### Navigation

Use i18n navigation wrappers:

```tsx
import { Link, useRouter, usePathname } from '@/src/i18n/navigation';

// Link component
<Link href="/blog">Blog</Link>

// Router hooks
const router = useRouter();
const pathname = usePathname();
```

### Adding New Routes

1. **Update routing configuration:**
   ```typescript
   // src/i18n/routing.ts
   export const routing = defineRouting({
     locales: ['it', 'en'],
     defaultLocale: 'it',
     pathnames: {
       '/': '/',
       '/new-page': '/new-page',  // Add new route
       // ... other routes
     }
   });
   ```

2. **Create the page:**
   ```
   app/[locale]/new-page/page.tsx
   ```

## WordPress Blog Integration

### Multilingual Support

The system supports two WordPress multilingual approaches:

#### Option A: Polylang Plugin (Recommended)

If Polylang is installed on WordPress:

1. **Configure environment variables:**
   ```env
   WP_REST_ENDPOINT=https://your-wordpress-site.com/wp-json/wp/v2
   ```

2. **Posts are automatically fetched in the correct language:**
   ```typescript
   // Automatically fetches posts in the requested locale
   const posts = await fetchWordPressPostsWithLang(1, 10, 'en');
   ```

#### Option B: DeepL Translation (Fallback)

If Polylang is not available, content is translated using DeepL API:

1. **Configure DeepL API:**
   ```env
   DEEPL_API_KEY=your-deepl-api-key
   DEEPL_API_URL=https://api-free.deepl.com/v2/translate
   ```

2. **Translation happens automatically:**
   ```typescript
   // Italian posts are translated to English on-the-fly
   const translatedPosts = await translateWordPressPosts(posts, 'en');
   ```

### Blog Implementation

The blog system automatically:
- Detects Polylang support
- Falls back to DeepL translation if needed
- Caches translations for performance
- Maintains SEO-friendly URLs

## SEO Configuration

### Metadata

Each page includes proper SEO metadata:

```typescript
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'en' 
      ? 'English Title'
      : 'Italian Title',
    alternates: {
      canonical: './',
      languages: {
        it: '/it',
        en: '/en'
      }
    }
  };
}
```

### URL Structure

- Italian (default): `/` → `/it/`
- English: `/en/`
- All existing URLs redirect automatically
- Canonical URLs point to the correct locale

## Environment Variables

Required environment variables:

```env
# WordPress Configuration
WP_REST_ENDPOINT=https://your-wordpress-site.com/wp-json/wp/v2
WP_GRAPHQL_ENDPOINT=https://your-wordpress-site.com/graphql

# DeepL Translation (Optional)
DEEPL_API_KEY=your-deepl-api-key
DEEPL_API_URL=https://api-free.deepl.com/v2/translate

# App Configuration
NEXT_PUBLIC_APP_BASE_URL=https://puntifurbi.com
```

## Development

### Adding New Locales

1. **Update routing configuration:**
   ```typescript
   // src/i18n/routing.ts
   export const routing = defineRouting({
     locales: ['it', 'en', 'fr'], // Add new locale
     defaultLocale: 'it',
     // ... rest of configuration
   });
   ```

2. **Create message file:**
   ```
   src/messages/fr.json
   ```

3. **Update LocaleSwitcher component:**
   ```tsx
   // Add new locale button
   <Button onClick={() => switchLocale('fr')}>FR</Button>
   ```

### Testing

1. **Test locale switching:**
   - Visit `/` (should redirect to `/it/`)
   - Visit `/en/` (should show English content)
   - Use LocaleSwitcher component

2. **Test WordPress integration:**
   - Check blog posts in both languages
   - Verify Polylang detection
   - Test DeepL fallback

3. **Test SEO:**
   - Check canonical URLs
   - Verify hreflang tags
   - Test redirects

## Performance Considerations

### Caching

- WordPress posts are cached for 60 seconds
- Translations are cached to avoid repeated API calls
- Static generation is preserved where possible

### Optimization

- Parallel translation requests
- Fallback mechanisms for reliability
- Minimal bundle size impact

## Troubleshooting

### Common Issues

1. **Locale not detected:**
   - Check middleware configuration
   - Verify routing setup
   - Ensure locale is in supported list

2. **WordPress posts not loading:**
   - Check WP_REST_ENDPOINT configuration
   - Verify WordPress site accessibility
   - Check Polylang plugin status

3. **Translations not working:**
   - Verify message files exist
   - Check useTranslations hook usage
   - Ensure NextIntlClientProvider is configured

### Debug Mode

Enable debug logging:

```typescript
// Add to your component
console.log('Current locale:', locale);
console.log('Available messages:', messages);
```

## Migration Notes

### From Existing Setup

1. **URLs remain stable:**
   - `/blog` → `/it/blog` (automatic redirect)
   - `/en/blog` → `/en/blog` (new English URL)

2. **Components updated:**
   - Navigation components use i18n wrappers
   - All text content uses translation keys
   - SEO metadata is locale-aware

3. **WordPress integration:**
   - Existing blog functionality preserved
   - New multilingual capabilities added
   - Performance optimizations included

## Support

For issues or questions:
1. Check this documentation
2. Review console logs for errors
3. Verify environment variables
4. Test with minimal configuration

## Future Enhancements

Potential improvements:
- Additional locale support
- Advanced WordPress multilingual features
- Translation management integration
- Performance monitoring
- A/B testing for translations
