import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';

const file1Path = path.join(__dirname, '__fixtures__/file1.yml');
const file2Path = path.join(__dirname, '__fixtures__/file2.yml');

test('Compare flat YAML files (stylish format)', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected_stylish.txt', 'utf-8');
  const diff = genDiff(file1Path, file2Path, 'stylish');
  expect(diff).toBe(expected);
});

test('Compare flat YAML files (plain format)', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected_plain.txt', 'utf-8');
  const diff = genDiff(file1Path, file2Path, 'plain');
  expect(diff).toBe(expected);
});

test('Compare flat YAML files (json format)', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected_json.json', 'utf-8');
  const diff = genDiff(file1Path, file2Path, 'json');
  expect(JSON.parse(diff)).toEqual(JSON.parse(expected));
});
