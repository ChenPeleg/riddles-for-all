#!/usr/bin/env node

/**
 * Main CLI entry point for the riddle management system
 */

import { Command } from 'commander';
import {
  searchCommand,
  listCommand,
  viewCommand,
  statsCommand,
  interactiveCommand,
  sourcesCommand,
  categoriesCommand,
} from './commands';

const program = new Command();

program
  .name('riddles')
  .description('A TypeScript-based riddle management system')
  .version('1.0.0');

// Register all commands
searchCommand(program);
listCommand(program);
viewCommand(program);
statsCommand(program);
interactiveCommand(program);
sourcesCommand(program);
categoriesCommand(program);

// Parse command-line arguments
program.parse(process.argv);

// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
