const fs = require('fs');
const program = require('commander');
const colors = require('colors/safe');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const pinfo = require(path.join(rootDir, 'package.json'));
const Dominia = require(path.join(libDir, 'dominia'));

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .option('-t, --type <type>', 'type to generate')
  .parse(process.argv);

const { type } = program;
const opts = {
  type,
};
const dominia = new Dominia(opts);
const output = dominia.generate();

console.log(JSON.stringify(output));