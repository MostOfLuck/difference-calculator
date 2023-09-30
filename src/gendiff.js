#!/usr/bin/env node
const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-h, --help', 'output usage information')
  .parse(process.argv);

if (program.help) {
  program.help();
}
