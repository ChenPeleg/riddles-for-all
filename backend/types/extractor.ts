/**
 * Interface for text extractors
 */

import { ExtractionResult } from './riddle';

export interface IExtractor {
  /**
   * Extract text content from a book file
   * @param filePath - Path to the book file
   * @returns Promise with extraction result
   */
  extract(filePath: string): Promise<ExtractionResult>;
}
