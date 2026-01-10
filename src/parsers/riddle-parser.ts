/**
 * Riddle parser to extract riddles from extracted text
 */

import { Riddle } from '../types/riddle';
import * as crypto from 'crypto';

export interface ParserResult {
  riddles: Riddle[];
  errors: string[];
}

export class RiddleParser {
  /**
   * Parse riddles from extracted text
   * @param text - The extracted text from a book
   * @param bookTitle - The title of the book
   * @returns Parsed riddles and any errors encountered
   */
  parseRiddles(text: string, bookTitle: string): ParserResult {
    const riddles: Riddle[] = [];
    const errors: string[] = [];

    try {
      // Try different parsing strategies based on the book format
      const numberedRiddles = this.parseNumberedRiddles(text, bookTitle);
      riddles.push(...numberedRiddles);

      // If no numbered riddles found, try other patterns
      if (riddles.length === 0) {
        const questionAnswerPairs = this.parseQuestionAnswerPairs(text, bookTitle);
        riddles.push(...questionAnswerPairs);
      }
    } catch (error) {
      errors.push(`Error parsing riddles: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return { riddles, errors };
  }

  /**
   * Parse riddles that are numbered (e.g., "1. What is...")
   */
  private parseNumberedRiddles(text: string, bookTitle: string): Riddle[] {
    const riddles: Riddle[] = [];
    
    // Pattern to match numbered riddles
    // Matches patterns like "1. Question text?" or "1) Question text?"
    const riddlePattern = /(\d+)[\.\)]\s+([^\n]+(?:\n(?!\d+[\.\)])[^\n]+)*)/g;
    
    let match;
    while ((match = riddlePattern.exec(text)) !== null) {
      const questionNumber = match[1];
      const questionText = match[2].trim();
      
      // Only include if it looks like a question or riddle
      if (questionText.length > 10 && (questionText.includes('?') || questionText.includes('What') || questionText.includes('Who') || questionText.includes('How'))) {
        const id = this.generateId(bookTitle, questionNumber);
        
        riddles.push({
          id,
          question: questionText,
          source: {
            book: bookTitle,
          },
          tags: this.extractTags(questionText),
        });
      }
    }

    return riddles;
  }

  /**
   * Parse riddles in question/answer format separated by clear delimiters
   */
  private parseQuestionAnswerPairs(text: string, bookTitle: string): Riddle[] {
    const riddles: Riddle[] = [];
    
    // Look for sections with "Answer:" or "Answers:" separators
    const sections = text.split(/(?:Answer[s]?:|Solution[s]?:)/i);
    
    if (sections.length > 1) {
      // Process question/answer pairs
      for (let i = 0; i < sections.length - 1; i++) {
        const questionSection = sections[i];
        const answerSection = sections[i + 1];
        
        // Extract the last question from the question section
        const questions = questionSection.split(/\d+[\.\)]\s+/).filter(q => q.trim().length > 0);
        if (questions.length > 0) {
          const question = questions[questions.length - 1].trim();
          
          // Extract the first answer from the answer section
          const answers = answerSection.split(/\d+[\.\)]\s+/).filter(a => a.trim().length > 0);
          if (answers.length > 0) {
            const answer = answers[0].trim().split('\n')[0];
            
            if (question.length > 10) {
              const id = this.generateId(bookTitle, `qa-${i}`);
              
              riddles.push({
                id,
                question,
                answer,
                source: {
                  book: bookTitle,
                },
                tags: this.extractTags(question),
              });
            }
          }
        }
      }
    }

    return riddles;
  }

  /**
   * Generate a unique ID for a riddle
   */
  private generateId(bookTitle: string, identifier: string): string {
    const hash = crypto.createHash('md5')
      .update(`${bookTitle}-${identifier}`)
      .digest('hex')
      .substring(0, 8);
    
    return `riddle-${hash}`;
  }

  /**
   * Extract tags from riddle text based on keywords
   */
  private extractTags(text: string): string[] {
    const tags: string[] = [];
    const lowerText = text.toLowerCase();

    // Define keyword patterns for categorization
    const categories = {
      math: ['number', 'calculate', 'plus', 'minus', 'multiply', 'divide', 'equation'],
      logic: ['logical', 'think', 'reasoning', 'deduce', 'infer'],
      wordplay: ['letter', 'word', 'spell', 'alphabet', 'rhyme'],
      visual: ['see', 'look', 'color', 'shape', 'picture'],
      nature: ['animal', 'plant', 'tree', 'water', 'earth', 'sky'],
      everyday: ['house', 'food', 'clothes', 'family', 'school'],
      tricky: ['trick', 'catch', 'impossible', 'paradox'],
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        tags.push(category);
      }
    }

    // Add a general tag if no specific category found
    if (tags.length === 0) {
      tags.push('general');
    }

    return tags;
  }
}
