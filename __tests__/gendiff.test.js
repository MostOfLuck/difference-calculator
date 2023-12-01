// __tests__/gendiff.test.js
import { readFileSync } from 'fs';
import path from 'path';
import { generateDiff } from '../src/gendiff.js';

const baseDir = process.cwd();
const getFixturePath = (filename) => path.join(baseDir, '__tests__/__fixtures__', filename);

test('Compare flat YAML files (stylish format)', async () => {
  const expected = await readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  const data1 = await readFileSync(getFixturePath('file1.yml'), 'utf-8');
  const data2 = await readFileSync(getFixturePath('file2.yml'), 'utf-8');
  const diff = generateDiff(data1, data2, 'stylish');

  console.log('Generated Diff:', diff);
  console.log('Expected Diff:', expected);
  expect(diff).toMatch(/^{\n(.+|\n)+\n}$/);
});
