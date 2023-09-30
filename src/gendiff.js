#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(filepath1);
    const absolutePath2 = path.resolve(filepath2);

    const ext1 = path.extname(absolutePath1);
    const ext2 = path.extname(absolutePath2);

    let data1, data2;
    if (ext1 === '.json' && ext2 === '.json') {
      data1 = JSON.parse(fs.readFileSync(absolutePath1, 'utf-8'));
      data2 = JSON.parse(fs.readFileSync(absolutePath2, 'utf-8'));
    } else {
      console.error('Error: Unsupported file format.');
      return;
    }

    console.log('Parsed Data 1:', data1);
    console.log('Parsed Data 2:', data2);
  })
  .parse(process.argv);
