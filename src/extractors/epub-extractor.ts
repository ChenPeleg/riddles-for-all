/**
 * EPUB text extractor
 * Uses JSZip to extract and parse EPUB files (which are ZIP archives)
 */

import * as fs from 'fs';
import * as path from 'path';
import JSZip from 'jszip';
import { IExtractor } from '../types/extractor';
import { ExtractionResult, Book } from '../types/riddle';

export class EpubExtractor implements IExtractor {
  async extract(filePath: string): Promise<ExtractionResult> {
    const book: Book = {
      id: path.basename(filePath, '.epub'),
      title: path.basename(filePath, '.epub'),
      format: 'epub',
      filePath: filePath,
    };

    try {
      // Read the EPUB file
      const fileBuffer = fs.readFileSync(filePath);
      
      // Parse as ZIP
      const zip = await JSZip.loadAsync(fileBuffer);
      
      // Find all HTML/XHTML files (content files)
      const contentFiles: string[] = [];
      zip.forEach((relativePath, file) => {
        const ext = path.extname(relativePath).toLowerCase();
        if ((ext === '.html' || ext === '.xhtml' || ext === '.htm') && !file.dir) {
          contentFiles.push(relativePath);
        }
      });
      
      // Sort files by name to maintain some order
      contentFiles.sort();
      
      // Extract text from each content file
      let fullText = '';
      for (const filePath of contentFiles) {
        const file = zip.file(filePath);
        if (file) {
          const content = await file.async('string');
          // Strip HTML tags to get text - Note: This is for text extraction only,
          // not for rendering, so we don't need XSS protection
          const text = this.stripHtml(content);
          
          if (text) {
            fullText += text + '\n\n';
          }
        }
      }

      return {
        book,
        text: fullText.trim(),
        pageCount: contentFiles.length,
      };
    } catch (error) {
      return {
        book,
        text: '',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Strip HTML tags and entities from text
   * Note: This is for text extraction only, not for rendering HTML
   * @param html HTML content to strip
   * @returns Plain text content
   */
  private stripHtml(html: string): string {
    return html
      // Remove all script and style blocks completely
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
      // Remove all remaining HTML tags
      .replace(/<[^>]+>/g, ' ')
      // Decode common HTML entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }
}
