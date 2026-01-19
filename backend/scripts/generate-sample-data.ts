/**
 * Script to generate sample riddles for testing
 */

import { JsonStorage } from '../storage/json-storage.js';
import { Riddle } from '../types/riddle.js';
import * as path from 'path';

const storage = new JsonStorage();

// Sample riddles for testing
const sampleRiddles: Riddle[] = [
  {
    id: 'riddle-001',
    text: 'What has keys but no locks, space but no room, and you can enter but not go inside?',
    solution: 'A keyboard',
    categories: ['wordplay', 'everyday', 'technology'],
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-002',
    text: 'What comes once in a minute, twice in a moment, but never in a thousand years?',
    solution: 'The letter M',
    categories: ['wordplay', 'tricky'],
    difficulty: 'medium',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-003',
    text: 'What has a head and a tail but no body?',
    solution: 'A coin',
    categories: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-004',
    text: 'I am not alive, but I grow; I don\'t have lungs, but I need air; I don\'t have a mouth, but water kills me. What am I?',
    solution: 'Fire',
    categories: ['logic', 'nature'],
    difficulty: 'medium',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-005',
    text: 'What can travel around the world while staying in a corner?',
    solution: 'A stamp',
    categories: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-006',
    text: 'What gets wetter the more it dries?',
    solution: 'A towel',
    categories: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-007',
    text: 'If you have me, you want to share me. If you share me, you haven\'t got me. What am I?',
    solution: 'A secret',
    categories: ['logic', 'tricky'],
    difficulty: 'medium',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-008',
    text: 'What has many teeth but cannot bite?',
    solution: 'A comb',
    categories: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-009',
    text: 'What begins with T, ends with T, and has T in it?',
    solution: 'A teapot',
    categories: ['wordplay', 'tricky'],
    difficulty: 'medium',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-010',
    text: 'The more you take, the more you leave behind. What are they?',
    solution: 'Footsteps',
    categories: ['logic', 'everyday'],
    difficulty: 'medium',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-011',
    text: 'What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?',
    solution: 'A river',
    categories: ['wordplay', 'nature'],
    difficulty: 'hard',
    source: { book: 'Nature Riddles' },
  },
  {
    id: 'riddle-010',
    text: 'What has one eye but cannot see?',
    solution: 'A needle',
    categories: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-011',
    text: 'What can you catch but not throw?',
    solution: 'A cold',
    categories: ['wordplay', 'tricky'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-012',
    text: 'I have cities but no houses, forests but no trees, and water but no fish. What am I?',
    solution: 'A map',
    categories: ['logic', 'tricky'],
    difficulty: 'hard',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-013',
    text: 'What goes up but never comes down?',
    solution: 'Your age',
    categories: ['logic', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-014',
    text: 'I have branches, but no fruit, trunk or leaves. What am I?',
    solution: 'A bank',
    categories: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-015',
    text: 'What has to be broken before you can use it?',
    solution: 'An egg',
    categories: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-016',
    text: 'I\'m tall when I\'m young, and I\'m short when I\'m old. What am I?',
    solution: 'A candle',
    categories: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-017',
    text: 'What bulan has 28 days?',
    solution: 'All of them',
    categories: ['tricky', 'logic'],
    difficulty: 'medium',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-018',
    text: 'What is full of holes but still holds water?',
    solution: 'A sponge',
    categories: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-019',
    text: 'What question can you never answer yes to?',
    solution: 'Are you asleep yet?',
    categories: ['tricky', 'logic'],
    difficulty: 'medium',
    source: { book: 'Sample Riddles Collection' },
  },
];

// Generate the sample data
console.log('🎲 Generating sample riddles...\n');

// Save to backend data directory
storage.saveRiddles(sampleRiddles, 'riddles-all.json');
storage.saveRiddlesBySource(sampleRiddles);

// Save to frontend public data directory
const frontendDataDir = path.join(__dirname, '../public/data');
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
