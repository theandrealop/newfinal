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
    
    // Prefer Polylang language filter via REST param
    // First try with Polylang language parameter
    let result = await getPostsFromREST(page, perPage, category, search, locale);
    console.log(`📊 WordPress API returned ${result.posts?.length || 0} posts with lang=${locale} filter`);
    
    // If no posts returned, fallback: fetch without lang and apply heuristic filtering
    if (!result.posts || result.posts.length === 0) {
      console.log(`⚠️ No posts with lang filter, fetching without filter...`);
      result = await getPostsFromREST(page, perPage, category, search);
      console.log(`📊 WordPress API returned ${result.posts?.length || 0} posts without lang filter`);
    }
    
    // TEMPORARY FIX: For English locale, manually add the Marriott article if it's missing
    if (locale === 'en' && result.posts && result.posts.length > 0) {
      const hasMarriottEnglish = result.posts.some(post => 
        post.title.toLowerCase().includes('marriott opens') || 
        post.slug.includes('marriott-opens-the-laurus')
      );
      
      if (!hasMarriottEnglish) {
        console.log(`🔧 Adding missing English Marriott article manually...`);
        try {
          const marriottPost = await getPostBySlugFromREST('marriott-opens-the-laurus-the-first-luxury-collection-property-in-singapore');
          if (marriottPost) {
            result.posts.push(marriottPost);
            console.log(`✅ Added English Marriott article: ${marriottPost.title}`);
          }
        } catch (error) {
          console.log(`❌ Could not fetch Marriott article: ${error}`);
        }
      }
    }

    if (result.posts && result.posts.length > 0) {
      console.log(`📝 Posts returned from API:`, result.posts.map(p => ({ title: p.title, slug: p.slug, date: p.date })));
      
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
          'review', 'comparison', 'complete', 'ultimate', 'marriott opens',
          'morocco', 'esim', 'options', 'alternatives', 'providers', 'data',
          'internet', 'mobile', 'roaming', 'coverage', 'network', 'sim card',
          'activation', 'setup', 'configuration', 'troubleshooting', 'support',
          'u.s.', 'usa', 'united states', 'dollar',
          'roaming charges', 'tourist', 'pitfalls', 'fleeced', 'leave for'
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
          // For English locale: include if any clear English indicators.
          // Exclude only when the title has Italian indicators and NO English indicators.
          const hasItalianIndicators = italianIndicators.some(indicator => 
            title.includes(indicator)
          );
          const hasEnglishIndicators = englishIndicators.some(indicator => 
            title.includes(indicator)
          );
          
          // Special case for Marriott articles
          if (title.includes('marriott') && title.includes('laurus')) {
            if (title.includes('opens') || title.includes('first')) {
              // English version
              return true;
            } else if (title.includes('apre') || title.includes('primo')) {
              // Italian version
              console.log(`🚫 Filtering out Italian Marriott post: "${post.title}"`);
              return false;
            }
          }
          
          // Prefer English if both are present (avoid false negatives due to generic words like "esim")
          if (hasEnglishIndicators) {
            return true;
          }
          
          if (hasItalianIndicators && !hasEnglishIndicators) {
            console.log(`🚫 Filtering out Italian post: "${post.title}"`);
            return false;
          }
          
          // Ambiguous titles without clear signals: exclude from EN
          console.log(`🚫 Filtering out ambiguous post (no clear EN indicators): "${post.title}"`);
          return false;
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
 * Detects if a post is Italian based on title content
 */
function isItalianPost(post: BlogPost): boolean {
  const title = post.title.toLowerCase();
  
  // Italian language indicators (more specific)
  const italianIndicators = [
    'come attivare', 'guida completa', 'migliore', 'migliori', 'offerte dati',
    'risparmiare', 'viaggio', 'viaggi', 'vacanza', 'vacanze', 'economici',
    'per l\'', 'per il', 'per la', 'della', 'delle', 'del', 'dei', 'dello',
    'esim', 'albania', 'sudafrica', 'giappone', 'egitto', 'apre', 'primo',
    'singapore', 'luxury collection', 'marriott apre', 'laurus', 'cose',
    'funziona', 'davvero', 'conviene', 'passarci'
  ];
  
  // English language indicators (more specific)
  const englishIndicators = [
    'opens', 'first', 'luxury collection', 'property', 'singapore',
    'how to', 'best', 'guide', 'offers', 'prices', 'costs', 'save',
    'travel', 'trip', 'vacation', 'flights', 'cheap', 'deals', 'tips',
    'review', 'comparison', 'complete', 'ultimate', 'marriott opens',
    'morocco', 'esim', 'options', 'alternatives', 'providers', 'data',
    'internet', 'mobile', 'roaming', 'coverage', 'network', 'sim card',
    'activation', 'setup', 'configuration', 'troubleshooting', 'support',
    'u.s.', 'usa', 'united states', 'dollar',
    'roaming charges', 'tourist', 'pitfalls', 'fleeced', 'leave for'
  ];
  
  const hasItalianIndicators = italianIndicators.some(indicator => 
    title.includes(indicator)
  );
  const hasEnglishIndicators = englishIndicators.some(indicator => 
    title.includes(indicator)
  );
  
  // Special case for Marriott articles
  if (title.includes('marriott') && title.includes('laurus')) {
    if (title.includes('apre') || title.includes('primo')) {
      return true; // Italian version
    } else if (title.includes('opens') || title.includes('first')) {
      return false; // English version
    }
  }
  
  // If it has Italian indicators but no English ones, it's likely Italian
  if (hasItalianIndicators && !hasEnglishIndicators) {
    return true;
  }

  // If it has any English indicators, do NOT treat it as Italian
  if (hasEnglishIndicators) {
    return false;
  }

  // Ambiguous: default to NOT Italian (avoid false positives on EN)
  return false;
}

/**
 * Fetches a single WordPress post with Polylang language support
 */
export async function fetchWordPressPostBySlugWithLang(
  slug: string,
  locale: 'it' | 'en'
): Promise<BlogPost | null> {
  try {
    // Try to fetch the post without language filter first
    let post = await getPostBySlugFromREST(slug);

    if (post) {
      // Check if this is an Italian post
      const isItalian = isItalianPost(post);
      
      if (locale === 'it') {
        // For Italian locale, only show Italian posts
        if (isItalian) {
          return post;
        } else {
          // English post requested via Italian URL - return null
          console.log(`🚫 English article "${post.title}" requested via Italian URL - returning null for 404`);
          return null;
        }
      } else {
        // For English locale, only show English posts
        if (isItalian) {
          // Italian post requested via English URL - return null
          // This will trigger a 404, which is correct for SEO
          console.log(`🚫 Italian article "${post.title}" requested via English URL - returning null for 404`);
          return null;
        } else {
          return post;
        }
      }
    }

    // If no post found, return null
    return null;
  } catch (error) {
    return null;
  }
}