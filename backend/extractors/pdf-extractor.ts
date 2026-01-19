/**
 * PDF text extractor
 */

import * as fs from 'fs';
import * as path from 'path';
import pdfParse from 'pdf-parse';
import { IExtractor } from '../types/extractor';
import { ExtractionResult, Book } from '../types/riddle';

export class PdfExtractor implements IExtractor {
  async extract(filePath: string): Promise<ExtractionResult> {
    const book: Book = {
      id: path.basename(filePath, '.pdf'),
      title: path.basename(filePath, '.pdf'),
      format: 'pdf',
      filePath: filePath,
    };

    try {
      // Read the PDF file
      const dataBuffer = fs.readFileSync(filePath);
      
      // Parse the PDF
      const data = await pdfParse(dataBuffer);

      return {
        book,
        text: data.text.trim(),
        pageCount: data.numpages,
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
