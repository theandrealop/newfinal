import { BlogPost } from './graphql-api';
import { getPostsFromREST, getPostBySlugFromREST } from './wordpress-rest-api';

// Interface for WordPress multilingual post
interface WPPostWithLang extends BlogPost {
  language?: string;
  translatedTitle?: string;
  translatedExcerpt?: string;
  translatedContent?: string;
}

/**
 * Fetches WordPress posts with Polylang language support
 */
export async function fetchWordPressPostsWithLang(
  page = 1,
  perPage = 10,
  locale: 'it' | 'en',
  category?: string,
  search?: string
): Promise<{ posts: BlogPost[], hasNextPage: boolean, totalPages: number }> {
  const langParam = locale === 'it' ? 'it' : 'en'; // Polylang uses 'it' and 'en' directly

  try {
    console.log(`🌐 Fetching WordPress posts for locale: ${locale} (Polylang: ${langParam})`);
    const result = await getPostsFromREST(page, perPage, category, search, langParam);
    
    if (result.posts && result.posts.length > 0) {
      console.log(`✅ Found ${result.posts.length} posts in ${locale} via Polylang`);
      return result;
    }

    // Fallback: if no posts found in the requested language, try the other language
    console.log(`⚠️ No posts found in ${locale}, trying fallback...`);
    const fallbackLang = locale === 'it' ? 'en' : 'it';
    const fallbackResult = await getPostsFromREST(page, perPage, category, search, fallbackLang);
    
    if (fallbackResult.posts && fallbackResult.posts.length > 0) {
      console.log(`🔄 Using ${fallbackLang} posts as fallback for ${locale}`);
      return fallbackResult;
    }

    return result;
  } catch (error) {
    console.error(`Error fetching WordPress posts for locale ${locale}:`, error);
    throw error;
  }
}

/**
 * Fetches a single WordPress post with Polylang language support
 */
export async function fetchWordPressPostBySlugWithLang(
  slug: string,
  locale: 'it' | 'en'
): Promise<BlogPost | null> {
  const langParam = locale === 'it' ? 'it' : 'en';

  try {
    console.log(`🌐 Fetching WordPress post "${slug}" for locale: ${locale} (Polylang: ${langParam})`);
    let post = await getPostBySlugFromREST(slug, langParam);

    if (post) {
      console.log(`✅ Found post "${slug}" in ${locale} via Polylang`);
      return post;
    }

    // Fallback: if no post found in the requested language, try the other language
    console.log(`⚠️ No post found in ${locale}, trying fallback...`);
    const fallbackLang = locale === 'it' ? 'en' : 'it';
    const fallbackPost = await getPostBySlugFromREST(slug, fallbackLang);
    
    if (fallbackPost) {
      console.log(`🔄 Using ${fallbackLang} post as fallback for ${locale}`);
      return fallbackPost;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching WordPress post by slug ${slug} for locale ${locale}:`, error);
    return null;
  }
}