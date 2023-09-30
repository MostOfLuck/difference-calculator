#!/usr/bin/env node
const { program } = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .parse(process.argv);

program
  .on('--help', () => {
    console.log(`
  Examples:
    gendiff file1.json file2.json -f plain
  `);
  });

const filePath1 = program.args[0];
const filePath2 = program.args[1];
const format = program.format;

if (!filePath1 || !filePath2) {
  console.error('Error: Please provide both file paths.');
  program.help();
}

console.log('File Path 1:', filePath1);
console.log('File Path 2:', filePath2);
console.log('Format:', format);
