#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import generateFormattedDiff from '../src/gendiff.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (stylish, plain, json)')
  .action(async (filepath1, filepath2, options) => {
    try {
      const { format } = options;

      // Resolve the absolute paths based on the current working directory
      const resolvedPath1 = path.resolve(process.cwd(), '__tests__/__fixtures__', filepath1);
      const resolvedPath2 = path.resolve(process.cwd(), '__tests__/__fixtures__', filepath2);

      const diff = await generateFormattedDiff(resolvedPath1, resolvedPath2, format);
      console.log(diff);
    } catch (error) {
      console.error(`Error reading or parsing file: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
