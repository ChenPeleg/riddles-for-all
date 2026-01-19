/**
 * Riddle parser to extract riddles from extracted text
 */

import { Riddle } from '../types/riddle';
import * as crypto from 'crypto';

export interface ParserResult {
  riddles: Riddle[];
  errors: string[];
}

export interface ParsingOptions {
  strategy?: string; // e.g., 'numbered', 'lot-answers', 'chapter-based', 'needs-cleanup', 'skipped'
  questionDelimiter?: string; // regex string
  answerMarkers?: string[];
  lotSize?: number;
  notes?: string;
}

export class RiddleParser {
  /**
   * Parse riddles from extracted text
   * @param text - The extracted text from a book
   * @param bookTitle - The title of the book
   * @param parsingOptions - Optional per-book parsing hints from metadata
   * @returns Parsed riddles and any errors encountered
   */
  parseRiddles(text: string, bookTitle: string, parsingOptions?: ParsingOptions): ParserResult {
    const riddles: Riddle[] = [];
    const errors: string[] = [];

    try {
      // Respect 'skipped' strategy immediately
      if (parsingOptions?.strategy === 'skipped') {
        errors.push(`Parsing skipped: ${parsingOptions.notes || 'skipped by metadata'}`);
        return { riddles, errors };
      }

      // Prepare cleaned text for strategies that benefit from normalization
      let cleanText = text;
      if (parsingOptions?.strategy === 'needs-cleanup' || parsingOptions?.strategy === 'lot-answers' || parsingOptions?.strategy === 'chapter-based') {
        cleanText = this.cleanupText(text);
      }

      // Build question delimiter regex if provided
      let questionRegex: RegExp | undefined;
      if (parsingOptions?.questionDelimiter) {
        questionRegex = new RegExp(parsingOptions.questionDelimiter, 'g');
      }

      // If strategy explicitly requires lot-based mapping, use that
      if (parsingOptions?.strategy === 'lot-answers') {
        const lotSize = parsingOptions?.lotSize || 20;
        const lotRiddles = this.parseLotAnswers(cleanText, bookTitle, lotSize, questionRegex, parsingOptions?.answerMarkers);
        riddles.push(...lotRiddles);
        return { riddles, errors };
      }

      // Primary: try numbered parsing (may use custom delimiter)
      const numberedRiddles = this.parseNumberedRiddles(cleanText, bookTitle, questionRegex);
      riddles.push(...numberedRiddles);

      // If no numbered riddles found, try question/answer parsing with custom markers
      if (riddles.length === 0) {
        const questionAnswerPairs = this.parseQuestionAnswerPairs(cleanText, bookTitle, parsingOptions?.answerMarkers);
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
  private parseNumberedRiddles(text: string, bookTitle: string, questionRegex?: RegExp): Riddle[] {
    const riddles: Riddle[] = [];

    // Pattern to match numbered riddles
    // Matches patterns like "1. Question text?" or "1) Question text?"
    const defaultPattern = /(\d+)[\.\)]\s+([^\n]+(?:\n(?!\d+[\.\)])[^\n]+)*)/g;
    const riddlePattern = questionRegex || defaultPattern;

    let match;
    while ((match = riddlePattern.exec(text)) !== null) {
      const questionNumber = match[1];
      const questionText = match[2].trim();

      // Only include if it looks like a question or riddle
      if (questionText.length > 10 && (questionText.includes('?') || questionText.includes('What') || questionText.includes('Who') || questionText.includes('How') || questionText.length > 20)) {
        const id = this.generateId(bookTitle, questionNumber);

        riddles.push({
          id,
          text: questionText,
          source: {
            book: bookTitle,
          },
          categories: this.extractCategories(questionText),
        });
      }
    }

    return riddles;
  }

  /**
   * Parse riddles in question/answer format separated by clear delimiters
   */
  private parseQuestionAnswerPairs(text: string, bookTitle: string, answerMarkers?: string[]): Riddle[] {
    const riddles: Riddle[] = [];

    // Build answer marker regex if custom markers supplied
    let markerRegex = /(?:Answer[s]?:|Solution[s]?:)/i;
    if (answerMarkers && answerMarkers.length > 0) {
      const escaped = answerMarkers.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      markerRegex = new RegExp('(?:' + escaped.join('|') + ')', 'i');
    }

    // Split based on the chosen markers
    const sections = text.split(markerRegex);

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
                text: question,
                solution: answer,
                source: {
                  book: bookTitle,
                },
                categories: this.extractCategories(question),
              });
            }
          }
        }
      }
    }

    return riddles;
  }

  /**
   * Parse riddles where questions are given in lots (e.g., lots of 20)
   * and answers are provided in corresponding 'Answers' sections.
   */
  private parseLotAnswers(text: string, bookTitle: string, lotSize: number = 20, questionRegex?: RegExp, answerMarkers?: string[]): Riddle[] {
    const riddles: Riddle[] = [];

    // Extract questions globally
    const qPattern = questionRegex || /(\d+)[\.\)]\s+([^\n]+(?:\n(?!\d+[\.\)])[^\n]+)*)/g;
    const questions: { num: string; text: string }[] = [];
    let qm;
    while ((qm = qPattern.exec(text)) !== null) {
      questions.push({ num: qm[1], text: qm[2].trim() });
    }

    if (questions.length === 0) return riddles;

    // Build marker regex for answer sections
    let markerRegex = /(?:Answers?:|Answer:|Response:)/ig;
    if (answerMarkers && answerMarkers.length) {
      const escaped = answerMarkers.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      markerRegex = new RegExp('(?:' + escaped.join('|') + ')', 'ig');
    }

    // Find answer sections by marker positions
    const indices: number[] = [];
    let res;
    while ((res = markerRegex.exec(text)) !== null) {
      indices.push(res.index);
    }

    const answersSections: string[] = [];
    if (indices.length === 0) {
      // fallback: try to locate 'Answer Key' or a single 'Answers:' occurrence
      const ak = text.search(/Answer\s*Key/i);
      if (ak !== -1) indices.push(ak);
      else {
        const single = text.match(/(?:Answer[s]?:|Solution[s]?:)/i);
        if (single && typeof single.index === 'number') {
          answersSections.push(text.slice(single.index + single[0].length));
        }
      }
    }

    if (indices.length > 0) {
      for (let i = 0; i < indices.length; i++) {
        const start = indices[i];
        const end = i + 1 < indices.length ? indices[i + 1] : text.length;
        answersSections.push(text.slice(start, end));
      }
    }

    // Parse answers inside each section
    const aPattern = /(\d+)[\.\)]\s*([^\n]+)/g;
    const answersList: { num: string; answer: string }[][] = [];
    for (const sec of answersSections) {
      const list: { num: string; answer: string }[] = [];
      let am;
      while ((am = aPattern.exec(sec)) !== null) {
        list.push({ num: am[1], answer: am[2].trim() });
      }
      if (list.length > 0) answersList.push(list);
    }

    // Map questions in chunks to answers
    let qIndex = 0;
    let sectionIndex = 0;
    while (qIndex < questions.length) {
      const chunk = questions.slice(qIndex, qIndex + lotSize);
      const answersForChunk = answersList[sectionIndex] || [];

      for (let i = 0; i < chunk.length; i++) {
        const q = chunk[i];
        let answerText: string | undefined;

        if (answersForChunk.length === chunk.length) {
          answerText = answersForChunk[i].answer;
        } else {
          // try to find by question number across all sections
          for (const sec of answersList) {
            const found = sec.find(s => s.num === q.num);
            if (found) { answerText = found.answer; break; }
          }
        }

        const id = this.generateId(bookTitle, q.num);
        const r: Riddle = {
          id,
          text: q.text,
          source: { book: bookTitle },
          categories: this.extractCategories(q.text),
        };
        if (answerText) r.solution = answerText;
        riddles.push(r);
      }

      qIndex += lotSize;
      sectionIndex += 1;
    }

    return riddles;
  }

  /**
   * Basic cleanup/sanitization for noisy extracted text
   */
  private cleanupText(text: string): string {
    // Normalize newlines
    let t = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    // Remove null chars
    t = t.replace(/\u0000/g, '');

    // Remove lines with lots of non-alphanumeric noise
    const lines = t.split('\n').filter(line => {
      const trimmed = line.trim();
      if (trimmed.length === 0) return false;
      const nonAlpha = (trimmed.match(/[^A-Za-z0-9\s.,!?"'():;%\-]/g) || []).length;
      return (nonAlpha / Math.max(1, trimmed.length)) < 0.6;
    });
    t = lines.join('\n');

    // Collapse long non-word sequences to single space
    t = t.replace(/[^A-Za-z0-9\s]{3,}/g, ' ');

    // Collapse repeated whitespace
    t = t.replace(/[ \t]{2,}/g, ' ');

    // Reduce long repeated letters (e.g., GGGGG -> G)
    t = t.replace(/([A-Za-z])\1{4,}/g, '$1');

    // Trim whitespace on each line
    t = t.split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');

    return t;
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
   * Extract categories from riddle text based on keywords
   */
  private extractCategories(text: string): string[] {
    const categoriesList: string[] = [];
    const lowerText = text.toLowerCase();

    // Define keyword patterns for categorization
    const categoriesMap: { [k: string]: string[] } = {
      math: ['number', 'calculate', 'plus', 'minus', 'multiply', 'divide', 'equation'],
      logic: ['logical', 'think', 'reasoning', 'deduce', 'infer'],
      wordplay: ['letter', 'word', 'spell', 'alphabet', 'rhyme'],
      visual: ['see', 'look', 'color', 'shape', 'picture'],
      nature: ['animal', 'plant', 'tree', 'water', 'earth', 'sky'],
      everyday: ['house', 'food', 'clothes', 'family', 'school'],
      tricky: ['trick', 'catch', 'impossible', 'paradox'],
    };

    for (const [category, keywords] of Object.entries(categoriesMap)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        categoriesList.push(category);
      }
    }

    // Add a general category if no specific category found
    if (categoriesList.length === 0) {
      categoriesList.push('general');
    }

    return categoriesList;
  }
}

