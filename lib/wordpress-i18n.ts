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
  try {
    console.log(`🌐 Fetching WordPress posts for locale: ${locale}`);
    
    // Fetch all posts without language filter first
    const result = await getPostsFromREST(page, perPage, category, search);
    
    if (result.posts && result.posts.length > 0) {
      // Filter posts by content language detection
      const filteredPosts = result.posts.filter(post => {
        const title = post.title.toLowerCase();
        
        // Italian language indicators (more specific)
        const italianIndicators = [
          'come attivare', 'guida completa', 'migliore', 'migliori', 'offerte dati',
          'risparmiare', 'viaggio', 'viaggi', 'vacanza', 'vacanze', 'economici',
          'per l\'', 'per il', 'per la', 'della', 'delle', 'del', 'dei', 'dello',
          'esim', 'albania', 'sudafrica', 'giappone', 'egitto', 'apre', 'primo',
          'singapore', 'luxury collection', 'marriott apre', 'laurus'
        ];
        
        // English language indicators (more specific)
        const englishIndicators = [
          'opens', 'first', 'luxury collection', 'property', 'singapore',
          'how to', 'best', 'guide', 'offers', 'prices', 'costs', 'save',
          'travel', 'trip', 'vacation', 'flights', 'cheap', 'deals', 'tips',
          'review', 'comparison', 'complete', 'ultimate', 'marriott opens'
        ];
        
        if (locale === 'it') {
          // For Italian locale, prefer posts with Italian indicators
          const hasItalianIndicators = italianIndicators.some(indicator => 
            title.includes(indicator)
          );
          const hasEnglishIndicators = englishIndicators.some(indicator => 
            title.includes(indicator)
          );
          
          // Special case for Marriott articles
          if (title.includes('marriott') && title.includes('laurus')) {
            if (title.includes('apre') || title.includes('primo')) {
              // Italian version: "Marriott apre The Laurus: il primo Luxury Collection"
              return true;
            } else if (title.includes('opens') || title.includes('first')) {
              // English version: "Marriott opens The Laurus: the first Luxury Collection"
              console.log(`🚫 Filtering out English Marriott post: "${post.title}"`);
              return false;
            }
          }
          
          // If it has English indicators but no Italian ones, it's likely English
          if (hasEnglishIndicators && !hasItalianIndicators) {
            console.log(`🚫 Filtering out English post: "${post.title}"`);
            return false;
          }
          
          return true;
        } else {
          // For English locale, prefer posts with English indicators
          const hasItalianIndicators = italianIndicators.some(indicator => 
            title.includes(indicator)
          );
          const hasEnglishIndicators = englishIndicators.some(indicator => 
            title.includes(indicator)
          );
          
          // Special case for Marriott articles
          if (title.includes('marriott') && title.includes('laurus')) {
            if (title.includes('opens') || title.includes('first')) {
              // English version: "Marriott opens The Laurus: the first Luxury Collection"
              return true;
            } else if (title.includes('apre') || title.includes('primo')) {
              // Italian version: "Marriott apre The Laurus: il primo Luxury Collection"
              console.log(`🚫 Filtering out Italian Marriott post: "${post.title}"`);
              return false;
            }
          }
          
          // If it has Italian indicators but no English ones, it's likely Italian
          if (hasItalianIndicators && !hasEnglishIndicators) {
            console.log(`🚫 Filtering out Italian post: "${post.title}"`);
            return false;
          }
          
          return true;
        }
      });
      
      console.log(`✅ Found ${filteredPosts.length} posts in ${locale} after language filtering (from ${result.posts.length} total)`);
      
      return {
        posts: filteredPosts,
        hasNextPage: result.hasNextPage,
        totalPages: result.totalPages
      };
    }

    // If no posts found, return empty result
    console.log(`⚠️ No posts found for ${locale}`);
    return {
      posts: [],
      hasNextPage: false,
      totalPages: 0
    };
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

    // If no post found in the requested language, return null
    console.log(`⚠️ No post found in ${locale} via Polylang`);
    return null;
  } catch (error) {
    console.error(`Error fetching WordPress post by slug ${slug} for locale ${locale}:`, error);
    return null;
  }
}