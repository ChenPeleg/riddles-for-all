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
  const stageIndexes = args.reduce((acc, arg, i) => {
    if (arg === '--stage') acc.push(parseInt(args[i + 1]));
    return acc;
  }, [] as number[]);
  const fileIndex = args.indexOf('--file');
  const allFlag = args.includes('--all');

  const targetFile = fileIndex !== -1 ? args[fileIndex + 1] : null;

  if (!allFlag && stageIndexes.length === 0) {
    console.log('Usage: npm run pipeline -- --stage <number> [--stage <number>...] [--file <filename>] or --all');
    process.exit(1);
  }

  console.log(`=== Riddle Pipeline ===`);
  
  if (allFlag) {
    for (let s = 2; s <= 6; s++) {
      await runStage(s, targetFile);
    }
  } else if (stageIndexes.length > 0) {
    for (const stage of stageIndexes.sort((a, b) => a - b)) {
      await runStage(stage, targetFile);
    }
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
    const rawContent = content.rawContent;
    
    // Heuristic for strategy
    let strategy = 'numbered';
    let questionDelimiter = '\\d+[\\.\\)]\\s+';
    let answerMarkers = ['Answer Key', 'Chapter Two: Answer Key', 'Answers:', 'Solutions:'];

    if (rawContent.includes('Answer Key') || rawContent.includes('Answers:')) {
       // Check if answers are likely in lots
       if (rawContent.match(/Answers\s+to\s+Chapter/i) || rawContent.match(/Answers\s+\d+-\d+/i)) {
         strategy = 'lot-answers';
       } else {
         strategy = 'riddle-then-answer';
       }
    }
    
    const typeInfo = {
      bookId,
      strategy,
      hints: {
        questionDelimiter,
        answerMarkers,
        lotSize: 20 // Default lot size
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
  const processDir = path.join(__dirname, '../../data/04-process');
  const reviewDir = path.join(__dirname, '../../data/05-review');
  
  const books = fileName ? [fileName] : fs.readdirSync(processDir).filter(f => fs.statSync(path.join(processDir, f)).isDirectory());
  
  for (const bookId of books) {
    const processedPath = path.join(processDir, bookId, 'processed.json');
    if (!fs.existsSync(processedPath)) continue;
    
    console.log(`[Stage 5] Reviewing ${bookId}...`);
    const riddles = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));
    
    // In a real app, this is where a human would check.
    // We'll just move it to review folder to signify it's ready.
    const outDir = path.join(reviewDir, bookId);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'reviewed.json'), JSON.stringify(riddles, null, 2));
    console.log(`  ✓ Moved to review: ${riddles.length} riddles`);
  }
}

async function stage6_Store(fileName: string | null) {
  const reviewDir = path.join(__dirname, '../../data/05-review');
  const storeDir = path.join(__dirname, '../../data/06-store');
  const publicDataDir = path.join(__dirname, '../../public/data');
  const examplesDir = path.join(__dirname, '../../examples');
  
  const books = fileName ? [fileName] : fs.readdirSync(reviewDir).filter(f => fs.statSync(path.join(reviewDir, f)).isDirectory());
  
  // Load existing riddles to merge
  let allRiddles: any[] = [];
  const globalPath = path.join(publicDataDir, 'riddles-all.json');
  if (fs.existsSync(globalPath)) {
    allRiddles = JSON.parse(fs.readFileSync(globalPath, 'utf-8'));
  }

  const riddleMap = new Map();
  allRiddles.forEach(r => riddleMap.set(r.id, r));

  for (const bookId of books) {
    const reviewedPath = path.join(reviewDir, bookId, 'reviewed.json');
    if (!fs.existsSync(reviewedPath)) continue;
    
    console.log(`[Stage 6] Storing ${bookId}...`);
    const bookRiddles = JSON.parse(fs.readFileSync(reviewedPath, 'utf-8'));
    
    bookRiddles.forEach((r: any) => riddleMap.set(r.id, r));
    
    // Save book-specific file in store
    const outDir = path.join(storeDir, bookId);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'final.json'), JSON.stringify(bookRiddles, null, 2));
  }

  const mergedRiddles = Array.from(riddleMap.values());
  
  // Save to 06-store/riddles-all.json
  fs.writeFileSync(path.join(storeDir, 'riddles-all.json'), JSON.stringify(mergedRiddles, null, 2));
  
  // Update public/data and examples
  if (!fs.existsSync(publicDataDir)) fs.mkdirSync(publicDataDir, { recursive: true });
  fs.writeFileSync(path.join(publicDataDir, 'riddles-all.json'), JSON.stringify(mergedRiddles, null, 2));
  
  if (fs.existsSync(examplesDir)) {
    fs.writeFileSync(path.join(examplesDir, 'riddles-all.json'), JSON.stringify(mergedRiddles, null, 2));
  }

  console.log(`  ✓ Successfully stored total of ${mergedRiddles.length} riddles.`);
}

main().catch(console.error);
