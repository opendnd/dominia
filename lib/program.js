const fs = require('fs');
const program = require('commander');
const colors = require('colors/safe');
const path = require('path');
const pinfo = require('../package.json');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const Dominia = require(path.join(libDir, 'dominia'));
const dominia = new Dominia();

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .parse(process.argv);

const opts = {};
const output = dominia.generate(opts);

console.log(output);