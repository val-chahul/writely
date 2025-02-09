/**
 * Types of SEO recommendations that can be provided
 */
export type RecommendationType = 'success' | 'warning' | 'error';

/**
 * A single SEO recommendation with type and message
 */
export interface SEORecommendation {
  type: RecommendationType;
  message: string;
}

/**
 * Heading structure analysis results
 */
export interface HeadingStructure {
  isValid: boolean;
  messages: string[];
  levels?: number[]; // Track heading levels used
}

/**
 * Internal linking analysis results
 */
export interface InternalLinks {
  count: number;
  suggestions: string[];
  density?: number; // Links per 100 words
}

interface ImageAnalysis {
  count: number;
  missingAlt: number;
  shortAlt: number; // Alt text < 5 chars
  longAlt: number; // Alt text > 100 chars
  recommendations: SEORecommendation[];
}

/**
 * Complete SEO analysis results
 */
export interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export interface MetaTagAnalysis {
  score: number;
  recommendations: SEORecommendation[];
  missingTags: string[];
  lengthIssues: { tag: string; message: string }[];
}

export interface SEOAnalysis {
  score: number;
  readabilityScore: number;
  keywordDensity: { [key: string]: number };
  readingTime: number; // In minutes
  recommendations: SEORecommendation[];
  headingStructure: HeadingStructure;
  internalLinks: InternalLinks;
  metaTags: MetaTagAnalysis;
  metaDataPresent?: boolean; // Track if meta tags are present
  images: ImageAnalysis;
}

/**
 * Analyzes content for SEO optimization and readability
 * @param content - The content to analyze
 * @param keyword - Primary keyword to check density for
 * @param options - Optional configuration for analysis
 * @returns SEOAnalysis object with detailed metrics and recommendations
 */
export function analyzeSEO(
  content: string,
  keyword: string,
  options: {
    wordsPerMinute?: number;
    minKeywordDensity?: number;
    maxKeywordDensity?: number;
    metaTags?: MetaTags;
  } = {},
): SEOAnalysis {
  // Configuration
  const { wordsPerMinute = 200, minKeywordDensity = 1, maxKeywordDensity = 3 } = options;

  // Early return for empty content or keyword
  if (!content?.trim() || !keyword?.trim()) {
    return {
      score: 0,
      readabilityScore: 0,
      keywordDensity: { [keyword || '']: 0 },
      readingTime: 0,
      recommendations: [
        {
          type: 'error',
          message: !content?.trim() ? 'Content is empty' : 'No target keyword specified',
        },
      ],
      headingStructure: {
        isValid: false,
        messages: ['No content to analyze'],
      },
      internalLinks: {
        count: 0,
        suggestions: ['Add content before analyzing SEO metrics'],
        density: 0,
      },
      metaTags: analyzeMetaTags(options.metaTags, keyword),
      images: {
        count: 0,
        missingAlt: 0,
        shortAlt: 0,
        longAlt: 0,
        recommendations: [],
      },
    };
  }

  // Analyze images
  const imageAnalysis = analyzeImages(content, keyword);

  // Core metrics calculation
  const keywordCount = keyword ? (content.match(new RegExp(keyword, 'gi')) || []).length : 0;
  const words = content.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const keywordDensityValue = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;
  const readingTimeValue = Math.ceil(wordCount / wordsPerMinute);

  // Analyze heading structure
  const headings = content.match(/#{1,6}\s[^\n]+/g) || [];
  const headingLevels = headings.map((h) => h.match(/#{1,6}/)?.[0]?.length || 0);
  const headingStructure = analyzeHeadingStructure(headingLevels);

  // Analyze internal links
  const internalLinkCount = (content.match(/\[([^\]]+)\]\((?!http)[^)]+\)/g) || []).length;
  const linkDensity = wordCount > 0 ? (internalLinkCount / wordCount) * 100 : 0;

  // Generate recommendations
  const recommendations: SEORecommendation[] = [];

  // Content length recommendations
  if (wordCount < 100) {
    recommendations.push({
      type: 'error',
      message: 'Content is too short for meaningful SEO analysis',
    });
  }

  // Keyword density recommendations
  if (wordCount >= 100) {
    if (keywordDensityValue < minKeywordDensity) {
      recommendations.push({
        type: 'warning',
        message: `Keyword density (${keywordDensityValue.toFixed(1)}%) is below recommended minimum of ${minKeywordDensity}%`,
      });
    } else if (keywordDensityValue > maxKeywordDensity) {
      recommendations.push({
        type: 'warning',
        message: `Keyword density (${keywordDensityValue.toFixed(1)}%) exceeds recommended maximum of ${maxKeywordDensity}%`,
      });
    } else {
      recommendations.push({
        type: 'success',
        message: 'Keyword density is within optimal range',
      });
    }
  }

  // Internal linking recommendations
  if (internalLinkCount < 2 && wordCount >= 300) {
    recommendations.push({
      type: 'warning',
      message: 'Consider adding more internal links to improve content connectivity',
    });
  }

  // Final analysis object
  const metaTagAnalysis = analyzeMetaTags(options.metaTags, keyword);

  return {
    score: calculateScore({
      keywordDensityValue,
      headingStructure,
      internalLinkCount,
      wordCount,
      metaTagScore: metaTagAnalysis.score,
    }),
    readabilityScore: calculateReadabilityScore(content),
    keywordDensity: {
      [keyword]: keywordDensityValue,
    },
    readingTime: readingTimeValue,
    recommendations,
    headingStructure: {
      isValid: headingStructure.isValid,
      messages: headingStructure.messages,
      levels: headingLevels,
    },
    internalLinks: {
      count: internalLinkCount,
      suggestions: getInternalLinkSuggestions(internalLinkCount, wordCount),
      density: linkDensity,
    },
    metaDataPresent: content.includes('---'), // Check for frontmatter
    metaTags: metaTagAnalysis,
    images: imageAnalysis,
  };
}

/**
 * Analyzes heading structure for proper hierarchy
 */
function analyzeHeadingStructure(levels: number[]): HeadingStructure {
  if (!levels.length) {
    return {
      isValid: false,
      messages: ['No headings found in content'],
      levels,
    };
  }

  const messages: string[] = [];
  let isValid = true;

  // Check if H1 exists and is first
  if (levels[0] !== 1) {
    messages.push('Content should start with an H1 heading');
    isValid = false;
  }

  // Check for proper hierarchy
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      messages.push(`Improper heading structure: H${levels[i - 1]} followed by H${levels[i]}`);
      isValid = false;
    }
  }

  return { isValid, messages, levels };
}

/**
 * Calculates overall SEO score based on various metrics
 */
function calculateScore(metrics: {
  keywordDensityValue: number;
  headingStructure: HeadingStructure;
  internalLinkCount: number;
  wordCount: number;
  metaTagScore: number;
}): number {
  let score = 100;

  // Word count impact
  if (metrics.wordCount < 100) {
    score -= 50; // Significant penalty for very short content
  } else if (metrics.wordCount < 300) {
    score -= 25;
  }

  // Keyword density impact (only if content is substantial)
  if (metrics.wordCount >= 100) {
    if (metrics.keywordDensityValue < 1 || metrics.keywordDensityValue > 3) {
      score -= 10;
    }
  }

  // Heading structure impact
  if (!metrics.headingStructure.isValid) {
    score -= 15;
  }

  // Internal linking impact (only for longer content)
  if (metrics.wordCount >= 300 && metrics.internalLinkCount < 2) {
    score -= 10;
  }

  // Meta tag impact
  score = (score + metrics.metaTagScore) / 2; // Give equal weight to meta tags

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculates readability score using basic metrics
 * Could be enhanced with more sophisticated algorithms
 */
function calculateReadabilityScore(content: string): number {
  if (!content?.trim()) return 0;

  // Simple implementation - could be expanded
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  const words = content.split(/\s+/).filter(Boolean);

  if (words.length === 0) return 0;

  const avgWordsPerSentence = words.length / sentences.length;

  let score = 100;

  // Penalize very long sentences
  if (avgWordsPerSentence > 25) {
    score -= 10;
  }

  // Penalize very long paragraphs
  const paragraphs = content.split('\n\n').filter(Boolean);
  if (paragraphs.length === 0) return 0;

  const avgWordsPerParagraph = words.length / paragraphs.length;
  if (avgWordsPerParagraph > 150) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Generates suggestions for internal linking based on content metrics
 */
function getInternalLinkSuggestions(linkCount: number, wordCount: number): string[] {
  const suggestions: string[] = [];

  if (wordCount < 100) {
    suggestions.push('Add more content before focusing on internal linking');
    return suggestions;
  }

  const recommendedMinLinks = Math.floor(wordCount / 200); // 1 link per 200 words

  if (linkCount < recommendedMinLinks) {
    suggestions.push(
      `Consider adding more internal links - recommended minimum is ${recommendedMinLinks} for content of this length`,
    );
  }

  if (linkCount === 0) {
    suggestions.push('Add internal links to improve content connectivity and SEO');
  }

  return suggestions;
}

/**
 * Analyzes images in content for accessibility and SEO best practices
 */
function analyzeImages(content: string, keyword: string): ImageAnalysis {
  // Find all markdown images using regex
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const matches = Array.from(content.matchAll(imageRegex));

  const images = matches.map((match) => ({
    alt: match[1],
    url: match[2],
  }));

  const missingAlt = images.filter((img) => !img.alt.trim()).length;
  const shortAlt = images.filter(
    (img) => img.alt.trim().length < 5 && img.alt.trim().length > 0,
  ).length;
  const longAlt = images.filter((img) => img.alt.trim().length > 100).length;

  const recommendations: SEORecommendation[] = [];

  if (images.length === 0) {
    recommendations.push({
      type: 'warning',
      message: 'Consider adding relevant images to improve content engagement',
    });
  }

  if (missingAlt > 0) {
    recommendations.push({
      type: 'error',
      message: `${missingAlt} image${missingAlt > 1 ? 's' : ''} missing alt text - critical for accessibility and SEO`,
    });
  }

  if (shortAlt > 0) {
    recommendations.push({
      type: 'warning',
      message: `${shortAlt} image${shortAlt > 1 ? 's have' : ' has'} very short alt text - consider being more descriptive`,
    });
  }

  if (longAlt > 0) {
    recommendations.push({
      type: 'warning',
      message: `${longAlt} image${longAlt > 1 ? 's have' : ' has'} very long alt text - consider being more concise`,
    });
  }

  // Check keyword presence in alt text if images exist
  if (images.length > 0) {
    const altTextWithKeyword = images.filter((img) =>
      img.alt.toLowerCase().includes(keyword.toLowerCase()),
    ).length;

    if (altTextWithKeyword === 0) {
      recommendations.push({
        type: 'warning',
        message: 'Consider including target keyword in relevant image alt text',
      });
    }
  }

  return {
    count: images.length,
    missingAlt,
    shortAlt,
    longAlt,
    recommendations,
  };
}

/**
 * Analyzes meta tags for SEO best practices
 */
function analyzeMetaTags(tags: MetaTags = {}, keyword: string): MetaTagAnalysis {
  const missingTags: string[] = [];
  const lengthIssues: { tag: string; message: string }[] = [];
  const recommendations: SEORecommendation[] = [];
  let score = 100;

  // Check title
  if (!tags.title) {
    missingTags.push('title');
    score -= 20;
    recommendations.push({
      type: 'error',
      message: 'Meta title is missing',
    });
  } else {
    if (tags.title.length < 30 || tags.title.length > 60) {
      lengthIssues.push({
        tag: 'title',
        message: `Title length (${tags.title.length}) should be between 30-60 characters`,
      });
      score -= 10;
    }
    if (!tags.title.toLowerCase().includes(keyword.toLowerCase())) {
      recommendations.push({
        type: 'warning',
        message: 'Target keyword not found in meta title',
      });
      score -= 5;
    }
  }

  // Check description
  if (!tags.description) {
    missingTags.push('description');
    score -= 15;
    recommendations.push({
      type: 'error',
      message: 'Meta description is missing',
    });
  } else {
    if (tags.description.length < 120 || tags.description.length > 160) {
      lengthIssues.push({
        tag: 'description',
        message: `Description length (${tags.description.length}) should be between 120-160 characters`,
      });
      score -= 10;
    }
    if (!tags.description.toLowerCase().includes(keyword.toLowerCase())) {
      recommendations.push({
        type: 'warning',
        message: 'Target keyword not found in meta description',
      });
      score -= 5;
    }
  }

  // Check Open Graph
  if (!tags.ogTitle || !tags.ogDescription || !tags.ogImage) {
    missingTags.push('Open Graph tags');
    score -= 10;
    recommendations.push({
      type: 'warning',
      message: 'Missing Open Graph tags for social media sharing',
    });
  }

  // Check Twitter Card
  if (!tags.twitterCard || !tags.twitterTitle || !tags.twitterDescription || !tags.twitterImage) {
    missingTags.push('Twitter Card tags');
    score -= 10;
    recommendations.push({
      type: 'warning',
      message: 'Missing Twitter Card tags for social media sharing',
    });
  }

  // Additional recommendations for implemented tags
  if (tags.keywords && tags.keywords.length > 0) {
    if (!tags.keywords.includes(keyword)) {
      recommendations.push({
        type: 'warning',
        message: 'Target keyword not included in meta keywords',
      });
    }
    if (tags.keywords.length > 10) {
      recommendations.push({
        type: 'warning',
        message: 'Too many meta keywords (recommended: max 10)',
      });
      score -= 5;
    }
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    recommendations,
    missingTags,
    lengthIssues,
  };
}
