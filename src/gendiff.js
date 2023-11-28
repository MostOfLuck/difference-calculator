#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';
import formatValue from '../formatters/index.js';

export function parseFile(file) {
  const fileExt = path.extname(file).toLowerCase();
  const fileContent = fs.readFileSync(file, 'utf-8');

  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return parseYaml(fileContent);
    default:
      throw new Error(`Unsupported file format: ${fileExt}`);
  }
}

export function parseYaml(yamlString) {
  try {
    return jsYaml.load(yamlString);
  } catch (error) {
    throw new Error(`Error while parsing YAML: ${error.message}`);
  }
}

export function generateDiff(data1, data2, depth = 1) {
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

export default function generateFormattedDiff(file1, file2, format = 'stylish') {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const diff = generateDiff(data1, data2);

  return formatValue(diff, format);
}
