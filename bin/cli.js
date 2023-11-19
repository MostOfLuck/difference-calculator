#!/usr/bin/env node
import { Command } from 'commander';
import { parseJsonFile, parseYamlFile, generateDiff } from '../src/gendiff.js';
import { generateJsonDiff, generatePlainDiff } from '../formatters/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (json, plain)')
  .action((filepath1, filepath2) => {
    let data1;
    let data2;

    if (filepath1.endsWith('.json')) {
      data1 = parseJsonFile(filepath1);
    } else if (filepath1.endsWith('.yaml') || filepath1.endsWith('.yml')) {
      data1 = parseYamlFile(filepath1);
    } else {
      throw new Error(`Unsupported file format: ${filepath1}`);
    }

    if (filepath2.endsWith('.json')) {
      data2 = parseJsonFile(filepath2);
    } else if (filepath2.endsWith('.yaml') || filepath2.endsWith('.yml')) {
      data2 = parseYamlFile(filepath2);
    } else {
      throw new Error(`Unsupported file format: ${filepath2}`);
    }

    const { format } = program.opts();

    if (format === 'json') {
      const diff = generateJsonDiff(data1, data2);
      console.log(JSON.stringify(diff, null, 2));
    } else if (format === 'plain') {
      const diff = generatePlainDiff(data1, data2);
      console.log(diff);
    } else {
      const diff = generateDiff(data1, data2);
      console.log(diff);
    }
  });

program.parse(process.argv);
