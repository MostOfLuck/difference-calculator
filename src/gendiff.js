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

export function generateDiff(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const addedKeys = keys2.filter((key) => !keys1.includes(key));
  const removedKeys = keys1.filter((key) => !keys2.includes(key));
  const updatedKeys = keys1.filter((key) => keys2.includes(key) && data1[key] !== data2[key]);

  const result = {};

  addedKeys.forEach((key) => {
    result[key] = { type: 'added', value: data2[key] };
  });

  removedKeys.forEach((key) => {
    result[key] = { type: 'removed', value: data1[key] };
  });

  updatedKeys.forEach((key) => {
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      // Recursively call generateDiff for nested objects
      result[key] = { type: 'updated', value: generateDiff(data1[key], data2[key]) };
    } else {
      result[key] = { type: 'updated', oldValue: data1[key], newValue: data2[key] };
    }
  });

  return result;
}

export default function generateFormattedDiff(file1, file2, format = 'stylish') {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const diff = generateDiff(data1, data2);

  return formatValue(diff, format);
}
