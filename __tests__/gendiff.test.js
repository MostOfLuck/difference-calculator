import genDiff from '../src/gendiff';
import { readFileSync } from 'fs';

const file1Path = '__tests__/__fixtures__/file1.json';
const file2Path = '__tests__/__fixtures__/file2.json';

test('Compare flat JSON files (stylish format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_stylish.txt', 'utf-8');
  const diff = genDiff(file1Path, file2Path, 'stylish');
  expect(diff).toBe(expected);
});

test('Compare flat JSON files (plain format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_plain.txt', 'utf-8');
  const diff = genDiff(file1Path, file2Path, 'plain');
  expect(diff).toBe(expected);
});

test('Compare flat JSON files (json format)', () => {
  const expected = readFileSync('__tests__/__fixtures__/expected_json.json', 'utf-8');
  const diff = genDiff(file1Path, file2Path, 'json');
  expect(JSON.parse(diff)).toEqual(JSON.parse(expected));
});
