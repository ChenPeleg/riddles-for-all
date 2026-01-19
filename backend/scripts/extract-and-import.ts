/**
 * Script to extract text from riddle books
 * This script demonstrates the text extraction capabilities
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ExtractorService } from '../extractors/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('=== Riddle Text Extraction Tool ===\n');

  const resourcesDir = path.join(__dirname, '../../resources');
  const dataDir = path.join(__dirname, '../../data');

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

  // Attempt to load resources manifest for DRM hints
  const manifestPath = path.join(__dirname, '../plans/resources-manifest.json');
  const manifestMap: Map<string, any> = new Map();
  try {
    if (fs.existsSync(manifestPath)) {
      const raw = fs.readFileSync(manifestPath, 'utf-8');
      const m = JSON.parse(raw);
      m.forEach((entry: any) => manifestMap.set(entry.name, entry));
    }
  } catch (e) {
    console.warn('Could not load resources manifest:', e instanceof Error ? e.message : e);
  }

  // Helper to create a filesystem-safe id
  const sanitize = (s: string) => s.replace(/[^a-z0-9-_]/gi, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '').toLowerCase();

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    console.log(`Processing: ${fileName}`);

    const manifestEntry = manifestMap.get(fileName);
    const ext = path.extname(fileName).toLowerCase();
    const rawDirName = sanitize(path.basename(fileName, ext));
    const rawDir = path.join(dataDir, 'raw', rawDirName);

    // Ensure raw directory exists
    fs.mkdirSync(rawDir, { recursive: true });

    if (manifestEntry && manifestEntry.drm_suspected) {
      console.log(`  ⚠️ Skipping due to suspected DRM: ${manifestEntry.drm_reason}`);
      const meta = {
        id: rawDirName,
        title: path.basename(fileName, ext),
        format: ext.replace('.', ''),
        sourceFileName: fileName,
        sourcePath: filePath,
        skipped: true,
        skipReason: manifestEntry.drm_reason,
        extractedAt: new Date().toISOString(),
      };
      fs.writeFileSync(path.join(rawDir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf-8');
      console.log(`  ✓ Metadata written to: ${path.join('data', 'raw', rawDirName, 'metadata.json')}`);
      console.log();
      continue;
    }

    try {
      const result = await extractorService.extractFromFile(filePath);
      const extractedAt = new Date().toISOString();
      const meta = {
        id: rawDirName,
        title: result.book?.title || path.basename(fileName, ext),
        format: result.book?.format || ext.replace('.', ''),
        sourceFileName: fileName,
        sourcePath: filePath,
        extractedAt,
        pageCount: result.pageCount || null,
        charCount: result.text ? result.text.length : 0,
        error: result.error || null,
      };

      // Save raw text and metadata to data/raw/<book-id>/
      fs.writeFileSync(path.join(rawDir, 'raw.txt'), result.text || '', 'utf-8');
      fs.writeFileSync(path.join(rawDir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf-8');

      if (result.error) {
        console.log(`  ❌ Error: ${result.error}`);
      } else {
        const textLength = (result.text || '').length;
        const preview = (result.text || '').substring(0, 200).replace(/\n/g, ' ');
        console.log(`  ✓ Extracted ${textLength} characters`);
        if (result.pageCount) {
          console.log(`  ✓ Page count: ${result.pageCount}`);
        }
        console.log(`  Preview: ${preview}...`);
        console.log(`  ✓ Saved raw: ${path.join('data', 'raw', rawDirName, 'raw.txt')}`);
        console.log(`  ✓ Saved metadata: ${path.join('data', 'raw', rawDirName, 'metadata.json')}`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      const meta = {
        id: rawDirName,
        title: path.basename(fileName, ext),
        format: ext.replace('.', ''),
        sourceFileName: fileName,
        sourcePath: filePath,
        extractedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      };
      fs.writeFileSync(path.join(rawDir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf-8');
      console.log(`  ✓ Wrote metadata with error to: ${path.join('data', 'raw', rawDirName, 'metadata.json')}`);
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
