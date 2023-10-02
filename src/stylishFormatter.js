#!/usr/bin/env node
import formatValue from './gendiff.js';

function formatStylish(data, depth = 0) {
  const indentSize = 4;
  const indent = '.'.repeat(depth * indentSize);

  const lines = data.map((item) => {
    const {
      key, type, value1, value2, children,
    } = item;

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${formatValue(value2, depth + 1)}`;
      case 'removed':
        return `${indent}- ${key}: ${formatValue(value1, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${formatValue(value1, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${key}: ${formatValue(value1, depth + 1)}`,
          `${indent}+ ${key}: ${formatValue(value2, depth + 1)}`,
        ];
      case 'nested':
        return `${indent}  ${key}: ${formatStylish(children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${'.'.repeat((depth - 1) * indentSize)}}`;
}

export default formatStylish;
