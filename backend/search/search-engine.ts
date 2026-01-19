/**
 * Search engine for riddles
 * Provides full-text search, filtering, and fuzzy matching capabilities
 */

import { Riddle } from '../types/riddle.js';

export interface SearchQuery {
  keyword?: string;
  source?: string;
  categories?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface SearchOptions {
  fuzzy?: boolean;
  caseSensitive?: boolean;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  riddle: Riddle;
  score: number;
  matches: {
    field: 'text' | 'solution' | 'categories';
    text: string;
  }[];
}

export interface PaginatedSearchResult {
  results: SearchResult[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export class SearchEngine {
  private riddles: Riddle[];

  constructor(riddles: Riddle[]) {
    this.riddles = riddles;
  }

  /**
   * Search riddles with query and options
   */
  search(query: SearchQuery, options: SearchOptions = {}): PaginatedSearchResult {
    const {
      fuzzy = true,
      caseSensitive = false,
      limit = 20,
      offset = 0,
    } = options;

    let results = this.riddles
      .map((riddle) => this.scoreRiddle(riddle, query, { fuzzy, caseSensitive }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);

    const total = results.length;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      results: paginatedResults,
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    };
  }

  /**
   * Score a riddle based on the search query
   */
  private scoreRiddle(
    riddle: Riddle,
    query: SearchQuery,
    options: { fuzzy: boolean; caseSensitive: boolean }
  ): SearchResult {
    let score = 0;
    const matches: SearchResult['matches'] = [];

    // Filter by source
    if (query.source && riddle.source.book !== query.source) {
      return { riddle, score: 0, matches: [] };
    }

    // Filter by categories
    if (query.categories && query.categories.length > 0) {
      const riddleCategories = riddle.categories || [];
      const hasMatchingCategory = query.categories.some((cat) =>
        riddleCategories.includes(cat)
      );
      if (!hasMatchingCategory) {
        return { riddle, score: 0, matches: [] };
      }
      score += 5; // Bonus for category match
    }

    // Search by keyword
    if (query.keyword) {
      const keyword = options.caseSensitive
        ? query.keyword
        : query.keyword.toLowerCase();

      // Search in text
      const text = options.caseSensitive
        ? riddle.text
        : riddle.text.toLowerCase();
      
      if (this.matchText(text, keyword, options.fuzzy)) {
        score += 10;
        matches.push({
          field: 'text',
          text: this.highlightMatch(riddle.text, keyword),
        });
      }

      // Search in solution
      if (riddle.solution) {
        const solutionText = options.caseSensitive
          ? riddle.solution
          : riddle.solution.toLowerCase();
        
        if (this.matchText(solutionText, keyword, options.fuzzy)) {
          score += 5;
          matches.push({
            field: 'solution',
            text: this.highlightMatch(riddle.solution, keyword),
          });
        }
      }

      // Search in categories
      if (riddle.categories) {
        const matchingCategories = riddle.categories.filter((cat) => {
          const catText = options.caseSensitive ? cat : cat.toLowerCase();
          return this.matchText(catText, keyword, options.fuzzy);
        });
        
        if (matchingCategories.length > 0) {
          score += matchingCategories.length * 3;
          matches.push({
            field: 'categories',
            text: matchingCategories.join(', '),
          });
        }
      }
    }

    // If no keyword is provided but filters are, give a base score
    if (!query.keyword && score === 0 && matches.length === 0) {
      score = 1;
    }

    return { riddle, score, matches };
  }

  /**
   * Match text with keyword using exact or fuzzy matching
   */
  private matchText(text: string, keyword: string, fuzzy: boolean): boolean {
    if (!fuzzy) {
      return text.includes(keyword);
    }

    // Simple fuzzy matching using Levenshtein-like approach
    // Check if keyword appears with minor variations
    const words = text.split(/\s+/);
    return words.some((word) => {
      if (word.includes(keyword)) return true;
      return this.calculateSimilarity(word, keyword) > 0.8;
    });
  }

  /**
   * Calculate similarity between two strings (0-1)
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Highlight matching keyword in text
   */
  private highlightMatch(text: string, keyword: string): string {
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '**$1**');
  }

  /**
   * Get all unique sources
   */
  getSources(): string[] {
    return [...new Set(this.riddles.map((r) => r.source.book))];
  }

  /**
   * Get all unique categories
   */
  getCategories(): string[] {
    const categories = new Set<string>();
    this.riddles.forEach((r) => {
      if (r.categories) {
        r.categories.forEach((cat) => categories.add(cat));
      }
    });
    return [...categories];
  }

  /**
   * Get statistics about the riddle collection
   */
  getStats(): {
    total: number;
    withSolutions: number;
    bySource: Record<string, number>;
    byCategory: Record<string, number>;
    byDifficulty: Record<string, number>;
  } {
    const stats = {
      total: this.riddles.length,
      withSolutions: 0,
      bySource: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
      byDifficulty: {} as Record<string, number>,
    };

    this.riddles.forEach((riddle) => {
      if (riddle.solution) stats.withSolutions++;

      const source = riddle.source.book;
      stats.bySource[source] = (stats.bySource[source] || 0) + 1;

      if (riddle.categories) {
        riddle.categories.forEach((cat) => {
          stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
        });
      }

      if (riddle.difficulty) {
        stats.byDifficulty[riddle.difficulty] =
          (stats.byDifficulty[riddle.difficulty] || 0) + 1;
      }
    });

    return stats;
  }
}
