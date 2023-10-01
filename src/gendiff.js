#!/usr/bin/env node
import { readFileSync } from 'fs';
import path from 'path';
import { program } from 'commander';
import _ from 'lodash';

function genDiff(filepath1, filepath2) {
  const absolutePath1 = path.resolve(filepath1);
  const absolutePath2 = path.resolve(filepath2);

  const data1 = JSON.parse(readFileSync(absolutePath1, 'utf-8'));
  const data2 = JSON.parse(readFileSync(absolutePath2, 'utf-8'));

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const addedKeys = _.difference(keys2, keys1);
  const removedKeys = _.difference(keys1, keys2);
  const commonKeys = _.intersection(keys1, keys2);

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
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  })
  .parse(process.argv);
