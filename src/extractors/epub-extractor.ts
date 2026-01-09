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
          // Strip HTML tags to get text
          const text = content
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove styles
            .replace(/<[^>]+>/g, ' ') // Remove HTML tags
            .replace(/&nbsp;/g, ' ') // Replace &nbsp;
            .replace(/&amp;/g, '&') // Replace &amp;
            .replace(/&lt;/g, '<') // Replace &lt;
            .replace(/&gt;/g, '>') // Replace &gt;
            .replace(/&quot;/g, '"') // Replace &quot;
            .replace(/&#39;/g, "'") // Replace &#39;
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();
          
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
}
