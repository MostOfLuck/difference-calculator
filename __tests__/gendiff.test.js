import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';

const jsonFile1Path = path.join(__dirname, '__fixtures__/file1.json');
const jsonFile2Path = path.join(__dirname, '__fixtures__/file2.json');
const yamlFile1Path = path.join(__dirname, '__fixtures__/file1.yml');
const yamlFile2Path = path.join(__dirname, '__fixtures__/file2.yml');

test('Compare flat JSON files (stylish format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_stylish.txt', 'utf-8');
  const diff = genDiff(jsonFile1Path, jsonFile2Path, 'stylish');
  expect(diff).toBe(expected);
});

test('Compare flat JSON files (plain format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_plain.txt', 'utf-8');
  const diff = genDiff(jsonFile1Path, jsonFile2Path, 'plain');
  expect(diff).toBe(expected);
});

test('Compare flat JSON files (json format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_json.json', 'utf-8');
  const diff = genDiff(jsonFile1Path, jsonFile2Path, 'json');
  expect(JSON.parse(diff)).toEqual(JSON.parse(expected));
});

test('Compare flat YAML files (stylish format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_stylish.txt', 'utf-8');
  const diff = genDiff(yamlFile1Path, yamlFile2Path, 'stylish');
  expect(diff).toBe(expected);
});

test('Compare flat YAML files (plain format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_plain.txt', 'utf-8');
  const diff = genDiff(yamlFile1Path, yamlFile2Path, 'plain');
  expect(diff).toBe(expected);
});

test('Compare flat YAML files (json format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_json.json', 'utf-8');
  const diff = genDiff(yamlFile1Path, yamlFile2Path, 'json');
  expect(JSON.parse(diff)).toEqual(JSON.parse(expected));
});
