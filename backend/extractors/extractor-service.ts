/**
 * Unified text extraction service
 * Routes extraction requests to the appropriate extractor based on file type
 */

import * as path from 'path';
import { IExtractor } from '../types/extractor.js';
import { ExtractionResult } from '../types/riddle.js';
import { EpubExtractor } from './epub-extractor.js';
import { PdfExtractor } from './pdf-extractor.js';
import { MobiExtractor } from './mobi-extractor.js';

export class ExtractorService {
  private epubExtractor: EpubExtractor;
  private pdfExtractor: PdfExtractor;
  private mobiExtractor: MobiExtractor;

  constructor() {
    this.epubExtractor = new EpubExtractor();
    this.pdfExtractor = new PdfExtractor();
    this.mobiExtractor = new MobiExtractor();
  }

  /**
   * Extract text from a book file based on its extension
   * @param filePath - Path to the book file
   * @returns Promise with extraction result
   */
  async extractFromFile(filePath: string): Promise<ExtractionResult> {
    const ext = path.extname(filePath).toLowerCase();
    
    let extractor: IExtractor;
    
    switch (ext) {
      case '.epub':
        extractor = this.epubExtractor;
        break;
      case '.pdf':
        extractor = this.pdfExtractor;
        break;
      case '.mobi':
        extractor = this.mobiExtractor;
        break;
      default:
        throw new Error(`Unsupported file format: ${ext}`);
    }

    return await extractor.extract(filePath);
  }

  /**
   * Extract text from multiple book files
   * @param filePaths - Array of paths to book files
   * @returns Promise with array of extraction results
   */
  async extractFromFiles(filePaths: string[]): Promise<ExtractionResult[]> {
    const results: ExtractionResult[] = [];
    
    for (const filePath of filePaths) {
      try {
        const result = await this.extractFromFile(filePath);
        results.push(result);
      } catch (error) {
        const ext = path.extname(filePath).toLowerCase();
        let format: 'epub' | 'pdf' | 'mobi' = 'pdf'; // default
        if (ext === '.epub') format = 'epub';
        else if (ext === '.mobi') format = 'mobi';
        
        console.error(`Error extracting ${filePath}:`, error);
        results.push({
          book: {
            id: path.basename(filePath),
            title: path.basename(filePath),
            format: format,
            filePath: filePath,
          },
          text: '',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
    
    return results;
  }
}
