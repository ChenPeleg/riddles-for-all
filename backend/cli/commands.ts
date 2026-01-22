/**
 * CLI commands for the riddle management system
 */

import { Command } from 'commander';
import * as path from 'path';
import { JsonStorage } from '../storage/json-storage.js';
import { SearchEngine, SearchQuery } from '../search/search-engine.js';
import * as readline from 'readline';

const storage = new JsonStorage();

/**
 * Search command - search riddles by keyword, tags, source, etc.
 */
export function searchCommand(program: Command): void {
  program
    .command('search')
    .option('-k, --keyword <keyword>', 'Search keyword')
    .option('-s, --source <source>', 'Filter by source book')
    .option('-c, --categories <categories>', 'Filter by categories (comma-separated)')
    .option('-d, --difficulty <difficulty>', 'Filter by difficulty (easy, medium, hard)')
    .option('--no-fuzzy', 'Disable fuzzy matching')
    .option('--case-sensitive', 'Enable case-sensitive search')
    .option('-l, --limit <number>', 'Maximum number of results', '20')
    .option('-o, --offset <number>', 'Offset for pagination', '0')
    .action((options) => {
      try {
        const riddles = storage.loadRiddles('riddles-all.json');
        const searchEngine = new SearchEngine(riddles);

        const query: SearchQuery = {};
        if (options.keyword) query.keyword = options.keyword;
        if (options.source) query.source = options.source;
        if (options.categories) query.categories = options.categories.split(',').map((c: string) => c.trim());
        if (options.difficulty) query.difficulty = options.difficulty;

        const result = searchEngine.search(query, {
          fuzzy: options.fuzzy !== false,
          caseSensitive: options.caseSensitive || false,
          limit: parseInt(options.limit),
          offset: parseInt(options.offset),
        });

        console.log(`\n🔍 Found ${result.total} riddle(s)`);
        console.log(`Showing ${result.results.length} results (offset: ${result.offset})\n`);

        result.results.forEach((searchResult, index) => {
          const { riddle, score, matches } = searchResult;
          console.log(`${index + 1 + result.offset}. [Score: ${score}] ${riddle.text}`);
          
          if (riddle.solution) {
            console.log(`   💡 Solution: ${riddle.solution}`);
          }
          
          console.log(`   📚 Source: ${riddle.source.book}`);
          
          if (riddle.categories && riddle.categories.length > 0) {
            console.log(`   🏷️  Categories: ${riddle.categories.join(', ')}`);
          }
          
          if (matches.length > 0) {
            console.log(`   🎯 Matches: ${matches.map(m => `${m.field}`).join(', ')}`);
          }
          
          console.log('');
        });

        if (result.hasMore) {
          console.log(`📄 More results available. Use --offset ${result.offset + result.limit} to see more.`);
        }
      } catch (error) {
        console.error('❌ Error searching riddles:', (error as Error).message);
        process.exit(1);
      }
    });
}

/**
 * List command - list riddles with optional filters
 */
export function listCommand(program: Command): void {
  program
    .command('list')
    .description('List all riddles or filter by source')
    .option('-s, --source <source>', 'Filter by source book')
    .option('-l, --limit <number>', 'Maximum number of results', '10')
    .action((options) => {
      try {
        const riddles = storage.loadRiddles('riddles-all.json');
        let filtered = riddles;

        if (options.source) {
          filtered = riddles.filter((r) => r.source.book === options.source);
        }

        const limit = parseInt(options.limit);
        const toShow = filtered.slice(0, limit);

        console.log(`\n📖 Listing ${toShow.length} of ${filtered.length} riddle(s)\n`);

        toShow.forEach((riddle, index) => {
          console.log(`${index + 1}. ${riddle.text}`);
          if (riddle.solution) {
            console.log(`   💡 Solution: ${riddle.solution}`);
          }
          console.log(`   📚 Source: ${riddle.source.book}`);
          if (riddle.categories && riddle.categories.length > 0) {
            console.log(`   🏷️  Categories: ${riddle.categories.join(', ')}`);
          }
          console.log('');
        });

        if (filtered.length > limit) {
          console.log(`... and ${filtered.length - limit} more riddles.`);
        }
      } catch (error) {
        console.error('❌ Error listing riddles:', (error as Error).message);
        process.exit(1);
      }
    });
}

/**
 * View command - view a specific riddle by ID
 */
export function viewCommand(program: Command): void {
  program
    .command('view <id>')
    .description('View a specific riddle by ID')
    .action((id) => {
      try {
        const riddles = storage.loadRiddles('riddles-all.json');
        const riddle = riddles.find((r) => r.id === id);

        if (!riddle) {
          console.error(`❌ Riddle with ID "${id}" not found.`);
          process.exit(1);
        }

        console.log('\n📝 Riddle Details:\n');
        console.log(`ID: ${riddle.id}`);
        console.log(`Text: ${riddle.text}`);
        if (riddle.solution) {
          console.log(`Solution: ${riddle.solution}`);
        }
        console.log(`Source: ${riddle.source.book}`);
        if (riddle.difficulty) {
          console.log(`Difficulty: ${riddle.difficulty}`);
        }
        if (riddle.categories && riddle.categories.length > 0) {
          console.log(`Categories: ${riddle.categories.join(', ')}`);
        }
        console.log('');
      } catch (error) {
        console.error('❌ Error viewing riddle:', (error as Error).message);
        process.exit(1);
      }
    });
}

/**
 * Stats command - show statistics about the riddle collection
 */
export function statsCommand(program: Command): void {
  program
    .command('stats')
    .description('Show statistics about the riddle collection')
    .action(() => {
      try {
        const riddles = storage.loadRiddles('riddles-all.json');
        const searchEngine = new SearchEngine(riddles);
        const stats = searchEngine.getStats();

        console.log('\n📊 Riddle Collection Statistics:\n');
        console.log(`Total Riddles: ${stats.total}`);
        console.log(`With Solutions: ${stats.withSolutions} (${Math.round((stats.withSolutions / stats.total) * 100)}%)`);
        
        console.log('\n📚 By Source:');
        Object.entries(stats.bySource)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .forEach(([source, count]) => {
            console.log(`  • ${source}: ${count}`);
          });

        if (Object.keys(stats.byCategory).length > 0) {
          console.log('\n🏷️  By Category:');
          Object.entries(stats.byCategory)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 10)
            .forEach(([cat, count]) => {
              console.log(`  • ${cat}: ${count}`);
            });
        }

        if (Object.keys(stats.byDifficulty).length > 0) {
          console.log('\n⭐ By Difficulty:');
          Object.entries(stats.byDifficulty)
            .forEach(([difficulty, count]) => {
              console.log(`  • ${difficulty}: ${count}`);
            });
        }

        console.log('');
      } catch (error) {
        console.error('❌ Error getting statistics:', (error as Error).message);
        process.exit(1);
      }
    });
}

/**
 * Interactive search command
 */
export function interactiveCommand(program: Command): void {
  program
    .command('interactive')
    .alias('i')
    .description('Interactive search mode')
    .action(async () => {
      try {
        const riddles = storage.loadRiddles('riddles-all.json');
        const searchEngine = new SearchEngine(riddles);

        console.log('\n🎯 Interactive Search Mode');
        console.log('Type your search query or "exit" to quit.\n');

        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        const askQuestion = () => {
          rl.question('Search: ', (keyword) => {
            if (keyword.toLowerCase() === 'exit' || keyword.toLowerCase() === 'quit') {
              console.log('\n👋 Goodbye!\n');
              rl.close();
              return;
            }

            if (!keyword.trim()) {
              askQuestion();
              return;
            }

            const result = searchEngine.search({ keyword }, { limit: 5 });

            console.log(`\n🔍 Found ${result.total} riddle(s)\n`);

            result.results.forEach((searchResult, index) => {
              const { riddle } = searchResult;
              console.log(`${index + 1}. ${riddle.text}`);
              if (riddle.solution) {
                console.log(`   💡 Solution: ${riddle.solution}`);
              }
              console.log(`   📚 Source: ${riddle.source.book}`);
              console.log('');
            });

            if (result.hasMore) {
              console.log(`... and ${result.total - result.results.length} more results.\n`);
            }

            askQuestion();
          });
        };

        askQuestion();
      } catch (error) {
        console.error('❌ Error in interactive mode:', (error as Error).message);
        process.exit(1);
      }
    });
}

/**
 * Sources command - list all available sources
 */
export function sourcesCommand(program: Command): void {
  program
    .command('sources')
    .description('List all available sources')
    .action(() => {
      try {
        const riddles = storage.loadRiddles('riddles-all.json');
        const searchEngine = new SearchEngine(riddles);
        const sources = searchEngine.getSources();

        console.log('\n📚 Available Sources:\n');
        sources.forEach((source, index) => {
          const count = riddles.filter((r) => r.source.book === source).length;
          console.log(`${index + 1}. ${source} (${count} riddles)`);
        });
        console.log('');
      } catch (error) {
        console.error('❌ Error listing sources:', (error as Error).message);
        process.exit(1);
      }
    });
}

/**
 * Categories command - list all available categories
 */
export function categoriesCommand(program: Command): void {
  program
    .command('categories')
    .description('List all available categories')
    .action(() => {
      try {
        const riddles = storage.loadRiddles('riddles-all.json');
        const searchEngine = new SearchEngine(riddles);
        const categories = searchEngine.getCategories();

        console.log('\n🏷️  Available Categories:\n');
        categories.sort().forEach((cat, index) => {
          const count = riddles.filter((r) => r.categories?.includes(cat)).length;
          console.log(`${index + 1}. ${cat} (${count} riddles)`);
        });
        console.log('');
      } catch (error) {
        console.error('❌ Error listing categories:', (error as Error).message);
        process.exit(1);
      }
    });
}
