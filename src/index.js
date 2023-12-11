import path from 'path';
import fs from 'fs';
import compare from './compare.js';
import parse from './parsers.js';
import ast from './formatters/index.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath, 'utf-8').trim();
  return data;
};

const readFiles = (path1, path2) => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);
  return [data1, data2];
};

const getDiff = (path1, path2, format = 'stylish') => {
  const [data1, data2] = readFiles(path1, path2);

  const parsedData1 = parse(data1, path.extname(path1).slice(1));
  const parsedData2 = parse(data2, path.extname(path2).slice(1));

  const difference = compare(parsedData1, parsedData2);
  const formattedDiff = ast(difference, format);

  return formattedDiff;
};

export default getDiff;
