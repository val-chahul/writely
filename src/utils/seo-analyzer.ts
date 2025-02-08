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

/**
 * Complete SEO analysis results
 */
export interface SEOAnalysis {
  score: number;
  readabilityScore: number;
  keywordDensity: { [key: string]: number };
  readingTime: number; // In minutes
  recommendations: SEORecommendation[];
  headingStructure: HeadingStructure;
  internalLinks: InternalLinks;
  metaDataPresent?: boolean; // Track if meta tags are present
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
  } = {},
): SEOAnalysis {
  // Configuration
  const { wordsPerMinute = 200, minKeywordDensity = 1, maxKeywordDensity = 3 } = options;

  // Core metrics calculation
  const keywordCount = (content.match(new RegExp(keyword, 'gi')) || []).length;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const keywordDensityValue = (keywordCount / wordCount) * 100;
  const readingTimeValue = Math.ceil(wordCount / wordsPerMinute);

  // Analyze heading structure
  const headings = content.match(/#{1,6}\s[^\n]+/g) || [];
  const headingLevels = headings.map((h) => h.match(/#{1,6}/)?.[0]?.length || 0);
  const headingStructure = analyzeHeadingStructure(headingLevels);

  // Analyze internal links
  const internalLinkCount = (content.match(/\[([^\]]+)\]\((?!http)[^)]+\)/g) || []).length;
  const linkDensity = (internalLinkCount / wordCount) * 100;

  // Generate recommendations
  const recommendations: SEORecommendation[] = [];

  // Keyword density recommendations
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

  // Internal linking recommendations
  if (internalLinkCount < 2) {
    recommendations.push({
      type: 'warning',
      message: 'Consider adding more internal links to improve content connectivity',
    });
  }

  // Final analysis object
  return {
    score: calculateScore({
      keywordDensityValue,
      headingStructure,
      internalLinkCount,
      wordCount,
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
}): number {
  let score = 100;

  // Keyword density impact
  if (metrics.keywordDensityValue < 1 || metrics.keywordDensityValue > 3) {
    score -= 10;
  }

  // Heading structure impact
  if (!metrics.headingStructure.isValid) {
    score -= 15;
  }

  // Internal linking impact
  if (metrics.internalLinkCount < 2) {
    score -= 10;
  }

  // Content length impact
  if (metrics.wordCount < 300) {
    score -= 15;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculates readability score using basic metrics
 * Could be enhanced with more sophisticated algorithms
 */
function calculateReadabilityScore(content: string): number {
  // Simple implementation - could be expanded
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  const words = content.split(/\s+/).filter(Boolean);
  const avgWordsPerSentence = words.length / sentences.length;

  let score = 100;

  // Penalize very long sentences
  if (avgWordsPerSentence > 25) {
    score -= 10;
  }

  // Penalize very long paragraphs
  const paragraphs = content.split('\n\n').filter(Boolean);
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
