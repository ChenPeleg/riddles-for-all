/**
 * Script to generate sample riddles for testing
 */

import { JsonStorage } from '../src/storage/json-storage';
import { Riddle } from '../src/types/riddle';

const storage = new JsonStorage();

// Sample riddles for testing
const sampleRiddles: Riddle[] = [
  {
    id: 'riddle-001',
    question: 'What has keys but no locks, space but no room, and you can enter but not go inside?',
    answer: 'A keyboard',
    category: 'wordplay',
    tags: ['wordplay', 'everyday', 'technology'],
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-002',
    question: 'What comes once in a minute, twice in a moment, but never in a thousand years?',
    answer: 'The letter M',
    category: 'wordplay',
    tags: ['wordplay', 'tricky'],
    difficulty: 'medium',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-003',
    question: 'What has a head and a tail but no body?',
    answer: 'A coin',
    category: 'wordplay',
    tags: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-004',
    question: 'I am not alive, but I grow; I don\'t have lungs, but I need air; I don\'t have a mouth, but water kills me. What am I?',
    answer: 'Fire',
    category: 'logic',
    tags: ['logic', 'nature'],
    difficulty: 'medium',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-005',
    question: 'What can travel around the world while staying in a corner?',
    answer: 'A stamp',
    category: 'wordplay',
    tags: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-006',
    question: 'What gets wetter the more it dries?',
    answer: 'A towel',
    category: 'wordplay',
    tags: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-007',
    question: 'If you have me, you want to share me. If you share me, you haven\'t got me. What am I?',
    answer: 'A secret',
    category: 'logic',
    tags: ['logic', 'tricky'],
    difficulty: 'medium',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-008',
    question: 'What has many teeth but cannot bite?',
    answer: 'A comb',
    category: 'wordplay',
    tags: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-009',
    question: 'What begins with T, ends with T, and has T in it?',
    answer: 'A teapot',
    category: 'wordplay',
    tags: ['wordplay', 'tricky'],
    difficulty: 'medium',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-010',
    question: 'The more you take, the more you leave behind. What are they?',
    answer: 'Footsteps',
    category: 'logic',
    tags: ['logic', 'everyday'],
    difficulty: 'medium',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-011',
    question: 'What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?',
    answer: 'A river',
    category: 'nature',
    tags: ['wordplay', 'nature'],
    difficulty: 'hard',
    source: { book: 'Nature Riddles' },
  },
  {
    id: 'riddle-012',
    question: 'What has one eye but cannot see?',
    answer: 'A needle',
    category: 'wordplay',
    tags: ['wordplay', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-013',
    question: 'What can you catch but not throw?',
    answer: 'A cold',
    category: 'wordplay',
    tags: ['wordplay', 'tricky'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
  {
    id: 'riddle-014',
    question: 'I have cities but no houses, forests but no trees, and water but no fish. What am I?',
    answer: 'A map',
    category: 'logic',
    tags: ['logic', 'tricky'],
    difficulty: 'hard',
    source: { book: 'Sample Riddles Collection' },
  },
  {
    id: 'riddle-015',
    question: 'What goes up but never comes down?',
    answer: 'Your age',
    category: 'logic',
    tags: ['logic', 'everyday'],
    difficulty: 'easy',
    source: { book: 'Classic Riddles' },
  },
];

// Generate the sample data
console.log('🎲 Generating sample riddles...\n');
storage.saveRiddles(sampleRiddles, 'riddles-all.json');
storage.saveRiddlesBySource(sampleRiddles);

console.log('\n✅ Sample data generated successfully!');
console.log(`   Created riddles-all.json with ${sampleRiddles.length} riddles`);
console.log(`   Created ${new Set(sampleRiddles.map(r => r.source.book)).size} source-specific files`);
console.log('\n💡 You can now test the CLI with:');
console.log('   npm run cli stats');
console.log('   npm run cli search -- -k keyboard');
console.log('   npm run cli list');
console.log('   npm run cli interactive');
