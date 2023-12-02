#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { parseYamlFile, generateDiff, parseJsonFile } from './src/gendiff.js';
import generatePlainDiff from './formatters/plainFormatter.js';
import formatStylish from './formatters/stylishFormatter.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (json, plain)')
  .action((filepath1, filepath2) => {
    const fixturesPath = path.resolve(process.cwd(), '__tests__/__fixtures__');
    const fullPath1 = path.join(fixturesPath, filepath1);
    const fullPath2 = path.join(fixturesPath, filepath2);

    let data1;
    let data2;

    if (fullPath1.endsWith('.json')) {
      data1 = parseJsonFile(fullPath1);
    } else if (fullPath1.endsWith('.yaml') || fullPath1.endsWith('.yml')) {
      data1 = parseYamlFile(fullPath1);
    } else {
      throw new Error(`Unsupported file format: ${fullPath1}`);
    }

    if (fullPath2.endsWith('.json')) {
      data2 = parseJsonFile(fullPath2);
    } else if (fullPath2.endsWith('.yaml') || fullPath2.endsWith('.yml')) {
      data2 = parseYamlFile(fullPath2);
    } else {
      throw new Error(`Unsupported file format: ${fullPath2}`);
    }

    const { format } = program.opts();

    if (format === 'plain') {
      const diff = generatePlainDiff(data1, data2);
      console.log(diff);
    } else if (format === 'stylish') {
      const diff = formatStylish(data1, data2);
      console.log(diff);
    } else {
      const diff = generateDiff(data1, data2);
      console.log(diff);
    }
  });

program.parse(process.argv);
