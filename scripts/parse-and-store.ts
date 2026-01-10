/**
 * Script to parse riddles from extracted text and store them in JSON format
 */

import * as fs from 'fs';
import * as path from 'path';
import { RiddleParser } from '../src/parsers';
import { JsonStorage } from '../src/storage';
import { Riddle } from '../src/types/riddle';

async function main() {
  console.log('=== Riddle Parsing and Storage Tool ===\n');

  const dataDir = path.join(__dirname, '../data');

  // Check if data directory exists
  if (!fs.existsSync(dataDir)) {
    console.log('Error: Data directory does not exist. Please run extraction first.');
    return;
  }

  // Get all text files from data directory
  const files = fs.readdirSync(dataDir)
    .filter(file => path.extname(file).toLowerCase() === '.txt')
    .map(file => path.join(dataDir, file));

  if (files.length === 0) {
    console.log('No text files found in data directory. Please run extraction first.');
    return;
  }

  console.log(`Found ${files.length} text file(s) to parse:\n`);
  files.forEach((file, index) => {
    console.log(`  ${index + 1}. ${path.basename(file)}`);
  });
  console.log();

  // Parse riddles from all files
  const parser = new RiddleParser();
  const allRiddles: Riddle[] = [];
  let totalErrors = 0;

  console.log('Starting parsing...\n');

  for (const filePath of files) {
    const fileName = path.basename(filePath, '.txt');
    console.log(`Processing: ${fileName}`);

    try {
      const text = fs.readFileSync(filePath, 'utf-8');

      if (text.length === 0) {
        console.log(`  ⚠ File is empty, skipping`);
        console.log();
        continue;
      }

      // Attempt to load per-book metadata parsing instructions (data/raw/<id>/metadata.json)
      const metaPath = path.join(__dirname, '../data/raw', fileName, 'metadata.json');
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
        console.warn(`  ⚠ Could not read metadata for ${fileName}: ${e instanceof Error ? e.message : String(e)}`);
      }

      const result = parser.parseRiddles(text, fileName, parsingOptions);

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

    const storage = new JsonStorage(dataDir);

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

    // Show breakdown by tags
    const byTag = new Map<string, number>();
    for (const riddle of allRiddles) {
      if (riddle.tags) {
        for (const tag of riddle.tags) {
          const count = byTag.get(tag) || 0;
          byTag.set(tag, count + 1);
        }
      }
    }

    console.log('\n  Riddles by category:');
    const sortedTags = [...byTag.entries()].sort((a, b) => b[1] - a[1]);
    for (const [tag, count] of sortedTags.slice(0, 10)) {
      console.log(`    - ${tag}: ${count}`);
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
