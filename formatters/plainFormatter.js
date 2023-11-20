#!/usr/bin/env node
import formatValue from './index.js';

export default function generatePlainDiff(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const addedKeys = keys2.filter((key) => !keys1.includes(key));
  const removedKeys = keys1.filter((key) => !keys2.includes(key));
  const updatedKeys = keys1.filter((key) => keys2.includes(key) && data1[key] !== data2[key]);

  const result = [];

  addedKeys.forEach((key) => {
    result.push(`Property '${key}' was added with value: ${formatValue(data2[key])}`);
  });

  removedKeys.forEach((key) => {
    result.push(`Property '${key}' was removed`);
  });

  updatedKeys.forEach((key) => {
    result.push(`Property '${key}' was updated. From ${formatValue(data1[key])} to ${formatValue(data2[key])}`);
  });

  return result.join('\n');
}
