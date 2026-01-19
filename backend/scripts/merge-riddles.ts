/**
 * Script to merge parsed riddles with existing sample riddles
 */

import * as fs from 'fs';
import * as path from 'path';
import { JsonStorage } from '../storage/json-storage';
import { Riddle } from '../types/riddle';

async function main() {
  console.log('=== Riddle Merging Tool ===\n');

  const dataDir = path.join(__dirname, '../data');
  const examplesDir = path.join(__dirname, '../examples');
  const publicDataDir = path.join(__dirname, '../public/data');

  const storage = new JsonStorage(dataDir);
  const examplesStorage = new JsonStorage(examplesDir);
  const publicStorage = new JsonStorage(publicDataDir);

  // 1. Load newly parsed riddles from data/
  console.log('Loading parsed riddles from data/riddles-all.json...');
  const newRiddles = storage.loadRiddles('riddles-all.json');
  console.log(`Loaded ${newRiddles.length} riddles.`);

  // 2. Load existing riddles from examples/riddles-all.json
  console.log('\nLoading existing riddles from examples/riddles-all.json...');
  let existingRiddles: Riddle[] = [];
  try {
    existingRiddles = examplesStorage.loadRiddles('riddles-all.json');
    console.log(`Loaded ${existingRiddles.length} existing riddles.`);
  } catch (e) {
    console.log('No existing riddles found in examples/riddles-all.json.');
  }

  // 3. Merge riddles
  // Use a map to avoid duplicates by ID
  const mergedMap = new Map<string, Riddle>();
  
  // Add existing first
  existingRiddles.forEach(r => mergedMap.set(r.id, r));
  
  // Add new riddles (will overwrite if ID matches, but IDs should be different)
  newRiddles.forEach(r => mergedMap.set(r.id, r));

  const allMerged = Array.from(mergedMap.values());
  console.log(`\nMerged total: ${allMerged.length} riddles.`);

  // 4. Save to all locations
  console.log('\nSaving merged riddles...');
  
  examplesStorage.saveRiddles(allMerged, 'riddles-all.json');
  publicStorage.saveRiddles(allMerged, 'riddles-all.json');
  storage.saveRiddles(allMerged, 'riddles-all.json');
  
  // Also update source-specific files in all locations
  examplesStorage.saveRiddlesBySource(allMerged);
  publicStorage.saveRiddlesBySource(allMerged);
  storage.saveRiddlesBySource(allMerged);

  console.log('\n✅ Merging complete!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
