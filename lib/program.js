const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const pinfo = require(path.join(rootDir, 'package.json'));
const Saver = require(path.join(libDir, 'saver'));
const Renderer = require(path.join(libDir, 'renderer'));
const wizard = require(path.join(libDir, 'wizard'));

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .option('-i, --input <file>', 'input *.dom file')
  .option('-o, --output <dir>', 'output directory')
  .parse(process.argv);

// load a file or go through the wizard
if (program.input !== undefined) {
  const dominia = Saver.load(program.input);
  Renderer.output(dominia);
} else {
  wizard(program.output);
}
