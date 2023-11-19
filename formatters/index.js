#!/usr/bin/env node
export function generateJsonDiff(data1, data2) {
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
    result[key] = { type: 'updated', oldValue: data1[key], newValue: data2[key] };
  });

  return result;
}

export function generatePlainDiff(data1, data2) {
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

export function formatValue(value, depth) {
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
