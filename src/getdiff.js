import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import ast from './formatters/index.js';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keysSorted = _.sortBy(_.union(keys1, keys2));

  const result = keysSorted.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: compare(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });

  return result;
};

const getData = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
  const fileExtName = path.extname(filePath).slice(1);
  return parse(fileContent, fileExtName);
};

const getDiff = (file1, file2, format = 'stylish') => ast(compare(getData(file1), getData(file2)), format);

export default getDiff;
