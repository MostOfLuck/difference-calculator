import path from 'path';
import fs from 'fs';
import compare from './compare.js';
import parse from './parsers.js';
import ast from './formatters/index.js';

const getData = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
  const fileExtName = path.extname(filePath).slice(1);
  return parse(fileContent, fileExtName);
};

const getDiff = (file1, file2, format = 'stylish') => ast(compare(getData(file1), getData(file2)), format);

export default getDiff;
