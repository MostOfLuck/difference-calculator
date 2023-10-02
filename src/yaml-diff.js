import fs from 'fs';
import jsYaml from 'js-yaml';

const parseYamlFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return jsYaml.safeLoad(fileContent);
};

const generateDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const addedKeys = keys2.filter((key) => !keys1.includes(key));
  const removedKeys = keys1.filter((key) => !keys2.includes(key));
  const commonKeys = keys1.filter((key) => keys2.includes(key));

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
};

const genDiff = (filePath1, filePath2) => {
  const data1 = parseYamlFile(filePath1);
  const data2 = parseYamlFile(filePath2);

  return generateDiff(data1, data2);
};

export default genDiff;
