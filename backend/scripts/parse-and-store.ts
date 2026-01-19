/**
 * Script to parse riddles from extracted text and store them in JSON format
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { RiddleParser } from '../parsers/index.js';
import { JsonStorage } from '../storage/index.js';
import { Riddle } from '../types/riddle.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('=== Riddle Parsing and Storage Tool ===\n');

  const dataDir = path.join(__dirname, '../../data');
  const rawDir = path.join(dataDir, '01-raw');
  const jsonDir = path.join(dataDir, '02-json');

  // Check if raw directory exists
  if (!fs.existsSync(rawDir)) {
    console.log('Error: Raw data directory does not exist. Please run extraction first.');
    return;
  }

  // Get all subdirectories from raw directory
  const bookDirs = fs.readdirSync(rawDir)
    .filter(name => fs.statSync(path.join(rawDir, name)).isDirectory())
    .map(name => path.join(rawDir, name));

  if (bookDirs.length === 0) {
    console.log('No book directories found in data/01-raw. Please run extraction first.');
    return;
  }

  console.log(`Found ${bookDirs.length} book(s) to parse:\n`);
  bookDirs.forEach((dir, index) => {
    console.log(`  ${index + 1}. ${path.basename(dir)}`);
  });
  console.log();

  // Parse riddles from all files
  const parser = new RiddleParser();
  const allRiddles: Riddle[] = [];
  let totalErrors = 0;

  console.log('Starting parsing...\n');

  for (const bookDir of bookDirs) {
    const bookId = path.basename(bookDir);
    const filePath = path.join(bookDir, 'raw.txt');
    const metaPath = path.join(bookDir, 'metadata.json');

    console.log(`Processing: ${bookId}`);

    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠ No raw.txt found in ${bookId}, skipping`);
      console.log();
      continue;
    }

    try {
      const text = fs.readFileSync(filePath, 'utf-8');

      if (text.length === 0) {
        console.log(`  ⚠ File is empty, skipping`);
        console.log();
        continue;
      }

      // Attempt to load per-book metadata parsing instructions
      let parsingOptions: any = undefined;
      try {
        if (fs.existsSync(metaPath)) {
          const rawMeta = fs.readFileSync(metaPath, 'utf-8');
          const meta = JSON.parse(rawMeta);
          if (meta.parsing) {
            parsingOptions = meta.parsing;
            console.log(`  ℹ Using parsing strategy: ${parsingOptions.strategy || 'default'}`);
          }
        }
      } catch (e) {
        // ignore metadata read errors and proceed with default parsing
        console.warn(`  ⚠ Could not read metadata for ${bookId}: ${e instanceof Error ? e.message : String(e)}`);
      }

      const result = parser.parseRiddles(text, bookId, parsingOptions);

      console.log(`  ✓ Parsed ${result.riddles.length} riddles`);

      if (result.errors.length > 0) {
        console.log(`  ⚠ Encountered ${result.errors.length} error(s):`);
        result.errors.forEach(error => console.log(`    - ${error}`));
        totalErrors += result.errors.length;
      }

      allRiddles.push(...result.riddles);
    } catch (error) {
      console.log(`  ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      totalErrors++;
    }

    console.log();
  }

  console.log(`Total riddles parsed: ${allRiddles.length}`);
  console.log(`Total errors: ${totalErrors}\n`);

  // Store riddles in JSON format
  if (allRiddles.length > 0) {
    console.log('Saving riddles to JSON files...\n');

    const storage = new JsonStorage(jsonDir);

    // Save all riddles in a single file
    storage.saveRiddles(allRiddles, 'riddles-all.json');

    // Save riddles grouped by source
    storage.saveRiddlesBySource(allRiddles);

    console.log('\nStorage complete!');
    console.log('\nSummary:');
    console.log(`  Total riddles: ${allRiddles.length}`);

    // Show breakdown by source
    const bySource = new Map<string, number>();
    for (const riddle of allRiddles) {
      const count = bySource.get(riddle.source.book) || 0;
      bySource.set(riddle.source.book, count + 1);
    }

    console.log('\n  Riddles by source:');
    for (const [source, count] of bySource) {
      console.log(`    - ${source}: ${count}`);
    }

    // Show breakdown by categories
    const byCategory = new Map<string, number>();
    for (const riddle of allRiddles) {
      if (riddle.categories) {
        for (const category of riddle.categories) {
          const count = byCategory.get(category) || 0;
          byCategory.set(category, count + 1);
        }
      }
    }

    console.log('\n  Riddles by category:');
    const sortedCategories = [...byCategory.entries()].sort((a, b) => b[1] - a[1]);
    for (const [category, count] of sortedCategories.slice(0, 10)) {
      console.log(`    - ${category}: ${count}`);
    }
  } else {
    console.log('No riddles were parsed. Please check the input files.');
  }
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
