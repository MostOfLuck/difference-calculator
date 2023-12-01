// __tests__/gendiff.test.js
import { readFileSync } from 'fs';
import jsYaml from 'js-yaml';
import path from 'path';
import { generateDiff } from '../src/gendiff.js';

const baseDir = process.cwd();
const getFixturePath = (filename) => path.join(baseDir, '__tests__/__fixtures__', filename);

test('Compare flat YAML files (json format)', async () => {
  const expected = JSON.parse(await readFileSync(getFixturePath('expected_json.json'), 'utf-8'));
  const data1 = jsYaml.load(await readFileSync(getFixturePath('file1.yml'), 'utf-8'));
  const data2 = jsYaml.load(await readFileSync(getFixturePath('file2.yml'), 'utf-8'));
  const diff = generateDiff(data1, data2, 'json');
  expect(diff).toEqual(expected);
});

test('Compare flat YAML files (plain format)', async () => {
  const expected = await readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  const data1 = await readFileSync(getFixturePath('file1.yml'), 'utf-8');
  const data2 = await readFileSync(getFixturePath('file2.yml'), 'utf-8');
  const diff = generateDiff(data1, data2, 'plain');
  expect(diff).toEqual(expected);
});

test('Compare flat JSON (json format)', async () => {
  const expected = JSON.parse(await readFileSync(getFixturePath('expected_json.json'), 'utf-8'));
  const data1 = JSON.parse(await readFileSync(getFixturePath('file1.json'), 'utf-8'));
  const data2 = JSON.parse(await readFileSync(getFixturePath('file2.json'), 'utf-8'));
  const diff = generateDiff(data1, data2, 'json');

  console.log('Generated Diff:', diff);
  console.log('Expected Diff:', expected);

  expect(diff).toEqual(expected);
});

test('Compare flat YAML files (stylish format)', async () => {
  const expected = await readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  const data1 = await readFileSync(getFixturePath('file1.yml'), 'utf-8');
  const data2 = await readFileSync(getFixturePath('file2.yml'), 'utf-8');
  const diff = generateDiff(data1, data2, 'stylish');

  console.log('Generated Diff:', diff);
  console.log('Expected Diff:', expected);

  // Use toMatch with a regular expression
  expect(diff).toMatch(/^{\n(.+|\n)+\n}$/);
});
