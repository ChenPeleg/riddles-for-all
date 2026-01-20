/**
 * Multi-stage Data Pipeline Controller
 * 
 * Usage:
 *   npm run pipeline -- --stage 2 [--file <filename>]
 *   npm run pipeline -- --all
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { RiddleParser } from '../parsers/riddle-parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STAGES = {
  1: '01-raw',
  2: '02-json',
  3: '03-type',
  4: '04-process',
  5: '05-review',
  6: '06-store'
};

async function main() {
  const args = process.argv.slice(2);
  const stageIndex = args.indexOf('--stage');
  const fileIndex = args.indexOf('--file');
  const allFlag = args.includes('--all');

  const targetStage = stageIndex !== -1 ? parseInt(args[stageIndex + 1]) : null;
  const targetFile = fileIndex !== -1 ? args[fileIndex + 1] : null;

  if (!allFlag && !targetStage) {
    console.log('Usage: npm run pipeline -- --stage <number> [--file <filename>] or --all');
    process.exit(1);
  }

  console.log(`=== Riddle Pipeline ===`);
  
  if (allFlag) {
    for (let s = 2; s <= 6; s++) {
      await runStage(s, targetFile);
    }
  } else if (targetStage) {
    await runStage(targetStage, targetFile);
  }
}

async function runStage(stage: number, fileName: string | null) {
  console.log(`\n--- Stage ${stage}: ${STAGES[stage as keyof typeof STAGES]} ---`);
  
  switch(stage) {
    case 2: await stage2_RawToJson(fileName); break;
    case 3: await stage3_TypeAssignment(fileName); break;
    case 4: await stage4_Process(fileName); break;
    case 5: await stage5_Review(fileName); break;
    case 6: await stage6_Store(fileName); break;
    default: console.log(`Stage ${stage} not implemented yet.`);
  }
}

/**
 * Stage 2: Raw to JSON
 * Extracts raw.txt into an initial JSON structure.
 */
async function stage2_RawToJson(fileName: string | null) {
  const rawDir = path.join(__dirname, '../../data/01-raw');
  const jsonDir = path.join(__dirname, '../../data/02-json');
  
  const books = fileName ? [fileName] : fs.readdirSync(rawDir).filter(f => fs.statSync(path.join(rawDir, f)).isDirectory());
  
  for (const bookId of books) {
    const rawPath = path.join(rawDir, bookId, 'raw.txt');
    if (!fs.existsSync(rawPath)) continue;
    
    console.log(`[Stage 2] Processing ${bookId}...`);
    const text = fs.readFileSync(rawPath, 'utf-8');
    
    // For Stage 2, we just want a structured representation of the text.
    // We can use the existing parser but maybe with a 'raw' mode or just mapping lines.
    const initialJson = {
      bookId,
      rawContent: text,
      extractedAt: new Date().toISOString()
    };
    
    const outDir = path.join(jsonDir, bookId);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'initial.json'), JSON.stringify(initialJson, null, 2));
    console.log(`  ✓ Created initial.json`);
  }
}

/**
 * Stage 3: Type Assignment
 * User or Auto determines the parsing strategy.
 */
async function stage3_TypeAssignment(fileName: string | null) {
  const jsonDir = path.join(__dirname, '../../data/02-json');
  const typeDir = path.join(__dirname, '../../data/03-type');
  
  const books = fileName ? [fileName] : fs.readdirSync(jsonDir).filter(f => fs.statSync(path.join(jsonDir, f)).isDirectory());
  
  for (const bookId of books) {
    const initialPath = path.join(jsonDir, bookId, 'initial.json');
    if (!fs.existsSync(initialPath)) continue;
    
    console.log(`[Stage 3] Detecting type for ${bookId}...`);
    const content = JSON.parse(fs.readFileSync(initialPath, 'utf-8'));
    
    // Simple heuristic for now, or just default to 'riddle-then-answer'
    let strategy = 'riddle-then-answer';
    if (content.rawContent.includes('Answer Key')) {
      strategy = 'riddle-then-answer';
    }
    
    const typeInfo = {
      bookId,
      strategy,
      hints: {
        questionDelimiter: '\\d+[\\.\\)]\\s+',
        answerMarkers: ['Answer Key', 'Chapter Two: Answer Key']
      }
    };
    
    const outDir = path.join(typeDir, bookId);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'metadata.json'), JSON.stringify(typeInfo, null, 2));
    console.log(`  ✓ Assigned strategy: ${strategy}`);
  }
}

/**
 * Stage 4: Process
 * Actually parse the riddles using the strategy from Stage 3.
 */
async function stage4_Process(fileName: string | null) {
  const jsonDir = path.join(__dirname, '../../data/02-json');
  const typeDir = path.join(__dirname, '../../data/03-type');
  const processDir = path.join(__dirname, '../../data/04-process');
  
  const books = fileName ? [fileName] : fs.readdirSync(typeDir).filter(f => fs.statSync(path.join(typeDir, f)).isDirectory());
  const parser = new RiddleParser();
  
  for (const bookId of books) {
    const initialPath = path.join(jsonDir, bookId, 'initial.json');
    const metaPath = path.join(typeDir, bookId, 'metadata.json');
    if (!fs.existsSync(initialPath) || !fs.existsSync(metaPath)) continue;
    
    console.log(`[Stage 4] Parsing riddles for ${bookId}...`);
    const initial = JSON.parse(fs.readFileSync(initialPath, 'utf-8'));
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    
    const result = parser.parseRiddles(initial.rawContent, bookId, meta);
    
    const outDir = path.join(processDir, bookId);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'processed.json'), JSON.stringify(result.riddles, null, 2));
    console.log(`  ✓ Parsed ${result.riddles.length} riddles`);
  }
}

async function stage5_Review(fileName: string | null) {
  // Logic to move from 04-process to 05-review
  console.log('[Stage 5] Review logic placeholder - normally would wait for human sign-off.');
}

async function stage6_Store(fileName: string | null) {
  // Logic to move from 05-review to 06-store and update riddles-all.json
  console.log('[Stage 6] Storage logic placeholder.');
}

main().catch(console.error);
