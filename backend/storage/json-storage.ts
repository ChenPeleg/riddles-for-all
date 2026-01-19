/**
 * JSON storage for riddles
 * Stores riddles in JSON format for frontend consumption
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Riddle } from '../types/riddle.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface RiddleCollection {
  metadata: {
    totalRiddles: number;
    sources: string[];
    generatedAt: string;
    version: string;
  };
  riddles: Riddle[];
}

export class JsonStorage {
  private dataDir: string;

  constructor(dataDir: string = path.join(__dirname, '../../data/02-json')) {
    this.dataDir = dataDir;
  }

  /**
   * Save riddles to a JSON file
   * @param riddles - Array of riddles to save
   * @param filename - Name of the output file
   */
  saveRiddles(riddles: Riddle[], filename: string = 'riddles.json'): void {
    // Ensure data directory exists
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }

    // Extract unique sources
    const sources = [...new Set(riddles.map(r => r.source.book))];

    // Create collection with metadata
    const collection: RiddleCollection = {
      metadata: {
        totalRiddles: riddles.length,
        sources,
        generatedAt: new Date().toISOString(),
        version: '1.0.0',
      },
      riddles,
    };

    // Write to file
    const filePath = path.join(this.dataDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(collection, null, 2), 'utf-8');
    
    console.log(`✓ Saved ${riddles.length} riddles to ${filename}`);
  }

  /**
   * Load riddles from a JSON file
   * @param filename - Name of the file to load
   */
  loadRiddles(filename: string = 'riddles.json'): Riddle[] {
    const filePath = path.join(this.dataDir, filename);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Riddles file not found: ${filePath}`);
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    const collection: RiddleCollection = JSON.parse(data);
    
    return collection.riddles;
  }

  /**
   * Save riddles grouped by source book
   * Creates separate JSON files for each book
   */
  saveRiddlesBySource(riddles: Riddle[]): void {
    // Group riddles by source
    const bySource = new Map<string, Riddle[]>();
    
    for (const riddle of riddles) {
      const source = riddle.source.book;
      if (!bySource.has(source)) {
        bySource.set(source, []);
      }
      bySource.get(source)!.push(riddle);
    }

    // Save each source to a separate file
    for (const [source, sourceRiddles] of bySource) {
      // Create a safe filename from the source name
      const safeFilename = source
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase();
      
      this.saveRiddles(sourceRiddles, `riddles-${safeFilename}.json`);
    }

    // Also save all riddles together
    this.saveRiddles(riddles, 'riddles-all.json');
  }

  /**
   * Get statistics about stored riddles
   */
  getStatistics(filename: string = 'riddles.json'): {
    total: number;
    bySource: Record<string, number>;
    byCategory: Record<string, number>;
    withSolutions: number;
  } {
    const riddles = this.loadRiddles(filename);
    
    const stats = {
      total: riddles.length,
      bySource: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
      withSolutions: 0,
    };

    for (const riddle of riddles) {
      // Count by source
      const source = riddle.source.book;
      stats.bySource[source] = (stats.bySource[source] || 0) + 1;

      // Count by categories
      if (riddle.categories) {
        for (const category of riddle.categories) {
          stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
        }
      }

      // Count riddles with solutions
      if (riddle.solution) {
        stats.withSolutions++;
      }
    }

    return stats;
  }
}
