#!/usr/bin/env node
import { readFileSync } from 'fs';
import { Command } from 'commander';
import jsYaml from 'js-yaml';

function parseJsonFile(filePath) {
  const fileContent = readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

function parseYamlFile(filePath) {
  const fileContent = readFileSync(filePath, 'utf-8');
  return jsYaml.load(fileContent);
}

function generateDiff(data1, data2, depth = 1) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const addedKeys = keys2.filter((key) => !keys1.includes(key));
  const removedKeys = keys1.filter((key) => !keys2.includes(key));
  const commonKeys = keys1.filter((key) => keys2.includes(key));

  const diff = commonKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      const nestedDiff = generateDiff(value1, value2, depth + 1);
      return `    ${'  '.repeat(depth)}${key}: ${nestedDiff}`;
    }

    if (value1 === value2) {
      return `    ${'  '.repeat(depth)}${key}: ${value1}`;
    }

    return [
      `${'  '.repeat(depth)}- ${key}: ${value1}`,
      `${'  '.repeat(depth)}+ ${key}: ${value2}`,
    ].join('\n');
  });

  const result = [
    ...addedKeys.map((key) => `  + ${'  '.repeat(depth)}${key}: ${formatValue(data2[key], depth)}`),
    ...removedKeys.map((key) => `  - ${'  '.repeat(depth)}${key}: ${formatValue(data1[key], depth)}`),
    ...diff,
  ];

  return `{\n${result.join('\n')}\n${'  '.repeat(depth - 1)}}`;
}

// Функция форматирования значений
function formatValue(value, depth) {
  if (typeof value === 'object' && value !== null) {
    const keys = Object.keys(value);
    const formattedLines = keys.map((key) => {
      const formattedValue = formatValue(value[key], depth + 1);
      return `${' '.repeat(depth * 4)}  ${key}: ${formattedValue}`;
    });
    return `{\n${formattedLines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
  }
  return value;
}

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
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

    const diff = generateDiff(data1, data2);
    console.log(diff);
  });

program.parse(process.argv);

export { formatValue };
