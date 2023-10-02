#!/usr/bin/env node
import { readFileSync } from 'fs';
import { program } from 'commander';
import jsYaml from 'js-yaml';

function parseJsonFile(filePath) {
  const fileContent = readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

function parseYamlFile(filePath) {
  const fileContent = readFileSync(filePath, 'utf-8');
  return jsYaml.load(fileContent);
}

function generateDiff(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const addedKeys = keys2.filter((key) => !keys1.includes(key));
  const removedKeys = keys1.filter((key) => !keys2.includes(key));
  const commonKeys = keys1.filter((key) => keys2.includes(key));

  const diff = commonKeys.map((key) => {
    if (data1[key] === data2[key]) {
      return `  ${key}: ${data1[key]}`;
    }
    return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
  });

  const result = [
    ...addedKeys.map((key) => `+ ${key}: ${data2[key]}`),
    ...removedKeys.map((key) => `- ${key}: ${data1[key]}`),
    ...diff,
  ];

  return `{\n${result.join('\n')}\n}`;
}

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    let data1; let data2;

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

    const diff = generateDiff(data1, data2);
    console.log(diff);
  })
  .parse(process.argv);
