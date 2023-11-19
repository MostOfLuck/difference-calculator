import { readFileSync } from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';
import generateDiff from '../src/gendiff.js';

const jsonFile1Path = path.join(__dirname, '__fixtures__/file1.json');
const jsonFile2Path = path.join(__dirname, '__fixtures__/file2.json');
const yamlFile1Path = path.join(__dirname, '__fixtures__/file1.yml');
const yamlFile2Path = path.join(__dirname, '__fixtures__/file2.yml');

test('Compare flat JSON files (stylish format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_stylish.txt', 'utf-8');
  const data1 = JSON.parse(readFileSync(jsonFile1Path, 'utf-8'));
  const data2 = JSON.parse(readFileSync(jsonFile2Path, 'utf-8'));
  const diff = generateDiff(data1, data2, 'stylish');
  expect(diff).toBe(expected);
});

test('Compare flat JSON files (plain format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_plain.txt', 'utf-8');
  const data1 = JSON.parse(readFileSync(jsonFile1Path, 'utf-8'));
  const data2 = JSON.parse(readFileSync(jsonFile2Path, 'utf-8'));
  const diff = generateDiff(data1, data2, 'plain');
  expect(diff).toBe(expected);
});

test('Compare flat JSON files (json format)', () => {
  const expected = JSON.parse(readFileSync('__tests__/__fixtures__/expected_json.json', 'utf-8'));
  const data1 = JSON.parse(readFileSync(jsonFile1Path, 'utf-8'));
  const data2 = JSON.parse(readFileSync(jsonFile2Path, 'utf-8'));
  const diff = generateDiff(data1, data2, 'json');
  expect(diff).toEqual(expected);
});

test('Compare flat YAML files (stylish format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_stylish.txt', 'utf-8');
  const data1 = jsYaml.load(readFileSync(yamlFile1Path, 'utf-8'));
  const data2 = jsYaml.load(readFileSync(yamlFile2Path, 'utf-8'));
  const diff = generateDiff(data1, data2, 'stylish');
  expect(diff).toBe(expected);
});

test('Compare flat YAML files (plain format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_plain.txt', 'utf-8');
  const data1 = jsYaml.load(readFileSync(yamlFile1Path, 'utf-8'));
  const data2 = jsYaml.load(readFileSync(yamlFile2Path, 'utf-8'));
  const diff = generateDiff(data1, data2, 'plain');
  expect(diff).toBe(expected);
});

test('Compare flat YAML files (json format)', () => {
  const expected = JSON.parse(readFileSync('__tests__/__fixtures__/expected_json.json', 'utf-8'));
  const data1 = jsYaml.load(readFileSync(yamlFile1Path, 'utf-8'));
  const data2 = jsYaml.load(readFileSync(yamlFile2Path, 'utf-8'));
  const diff = generateDiff(data1, data2, 'json');
  expect(diff).toEqual(expected);
});
