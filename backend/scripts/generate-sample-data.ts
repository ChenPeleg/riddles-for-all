/**
 * Script to generate sample riddles for testing
 */

import { JsonStorage } from '../storage/json-storage.js';
import { Riddle } from '../types/riddle.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = new JsonStorage();

// Sample riddles for testing
const sampleRiddles: Riddle[] =  []

// Generate the sample data
console.log('🎲 Generating sample riddles...\n');

// Save to backend data directory
storage.saveRiddles(sampleRiddles, 'riddles-all.json');
storage.saveRiddlesBySource(sampleRiddles);

// Save to frontend public data directory
const frontendDataDir = path.join(__dirname, '../../public/data');
const frontendStorage = new JsonStorage(frontendDataDir);
frontendStorage.saveRiddles(sampleRiddles, 'riddles-all.json');
frontendStorage.saveRiddlesBySource(sampleRiddles);

console.log('\n✅ Sample data generated successfully!');
console.log(`   Created riddles-all.json with ${sampleRiddles.length} riddles in both data/ and public/data/`);
console.log(`   Created ${new Set(sampleRiddles.map(r => r.source.book)).size} source-specific files`);
console.log('\n💡 You can now test the CLI with:');
console.log('   npm run cli stats');
console.log('   npm run cli search -- -k keyboard');
console.log('   npm run cli list');
console.log('   npm run cli interactive');
