/**
 * Core data types for the riddle management system
 */

export interface Riddle {
  id: string;
  text: string;
  clue?: string;
  image?: string;
  solution?: string;
  categories: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  source: {
    book: string;
    page?: number;
  };
}

export interface Book {
  id: string;
  title: string;
  format: 'epub' | 'pdf' | 'mobi';
  filePath: string;
}

export interface ExtractionResult {
  book: Book;
  text: string;
  pageCount?: number;
  error?: string;
}
