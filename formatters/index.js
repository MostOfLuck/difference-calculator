#!/usr/bin/env node
export default function formatValue(value, depth) {
  if (typeof value === 'object' && value !== null) {
    const keys = Object.keys(value);
    const formattedLines = keys.map((key) => {
      const formattedValue = formatValue(value[key], depth + 1);
      const type = value[key]?.type;
      let sign = ' ';
      if (type === 'added') {
        sign = '+';
      } else if (type === 'removed') {
        sign = '-';
      }
      return `${' '.repeat(depth * 4)}${sign} ${key}: ${formattedValue}`;
    });
    return `{\n${formattedLines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
  }
  return value;
}
