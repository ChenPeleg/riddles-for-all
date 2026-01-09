/**
 * Script to extract text from riddle books
 * This script demonstrates the text extraction capabilities
 */

import * as fs from 'fs';
import * as path from 'path';
import { ExtractorService } from '../src/extractors';

async function main() {
  console.log('=== Riddle Text Extraction Tool ===\n');

  const resourcesDir = path.join(__dirname, '../resources');
  const dataDir = path.join(__dirname, '../data');

  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Get all book files from resources directory
  const files = fs.readdirSync(resourcesDir)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.epub' || ext === '.pdf' || ext === '.mobi';
    })
    .map(file => path.join(resourcesDir, file));

  if (files.length === 0) {
    console.log('No book files found in resources directory.');
    return;
  }

  console.log(`Found ${files.length} book file(s):\n`);
  files.forEach((file, index) => {
    console.log(`  ${index + 1}. ${path.basename(file)}`);
  });
  console.log();

  // Extract text from all books
  const extractorService = new ExtractorService();
  
  console.log('Starting extraction...\n');

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    console.log(`Processing: ${fileName}`);
    
    try {
      const result = await extractorService.extractFromFile(filePath);
      
      if (result.error) {
        console.log(`  ❌ Error: ${result.error}`);
      } else {
        const textLength = result.text.length;
        const preview = result.text.substring(0, 200).replace(/\n/g, ' ');
        
        console.log(`  ✓ Extracted ${textLength} characters`);
        if (result.pageCount) {
          console.log(`  ✓ Page count: ${result.pageCount}`);
        }
        console.log(`  Preview: ${preview}...`);
        
        // Save extracted text to data directory
        const outputFileName = `${result.book.id}.txt`;
        const outputPath = path.join(dataDir, outputFileName);
        fs.writeFileSync(outputPath, result.text, 'utf-8');
        console.log(`  ✓ Saved to: data/${outputFileName}`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    console.log();
  }

  console.log('Extraction complete!');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
