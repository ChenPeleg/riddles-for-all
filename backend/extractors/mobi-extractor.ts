/**
 * MOBI text extractor
 * 
 * Note: MOBI extraction is more complex and may require additional libraries.
 * For now, we'll use a basic approach that may need refinement.
 */

import * as fs from 'fs';
import * as path from 'path';
import { IExtractor } from '../types/extractor';
import { ExtractionResult, Book } from '../types/riddle';

export class MobiExtractor implements IExtractor {
  async extract(filePath: string): Promise<ExtractionResult> {
    const book: Book = {
      id: path.basename(filePath, '.mobi'),
      title: path.basename(filePath, '.mobi'),
      format: 'mobi',
      filePath: filePath,
    };

    try {
      // Read the MOBI file as a buffer
      const fileBuffer = fs.readFileSync(filePath);
      
      // MOBI format is complex. A simple approach is to extract text
      // by searching for readable ASCII text within the file.
      // This is a basic implementation and may need refinement.
      
      // Convert buffer to string, filtering for printable characters
      let text = '';
      for (let i = 0; i < fileBuffer.length; i++) {
        const byte = fileBuffer[i];
        // Include printable ASCII characters and common whitespace
        if ((byte >= 32 && byte <= 126) || byte === 10 || byte === 13 || byte === 9) {
          text += String.fromCharCode(byte);
        } else if (byte === 0 || byte < 32) {
          // Replace non-printable with space to separate words
          if (text.length > 0 && text[text.length - 1] !== ' ') {
            text += ' ';
          }
        }
      }
      
      // Clean up the extracted text
      text = text
        .replace(/\s+/g, ' ')  // Normalize whitespace
        .replace(/(.)\1{9,}/g, '$1$1$1') // Remove long sequences of repeated characters (10+), keep 3
        .trim();

      return {
        book,
        text: text,
        pageCount: undefined, // MOBI doesn't have fixed pages
      };
    } catch (error) {
      return {
        book,
        text: '',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
