const fs = require('fs');
const program = require('commander');
const questions = require('questions');
const colors = require('colors/safe');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const pinfo = require(path.join(rootDir, 'package.json'));
const Dominia = require(path.join(libDir, 'dominia'));
const Saver = require(path.join(libDir, 'saver'));
const measurements = require(path.join(libDir, 'measurements'));
const logo = fs.readFileSync(path.join(rootDir, 'logo.txt'), { encoding: 'utf-8' });

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .option('-i, --input <file>', 'input *.dom file')
  .option('-o, --output <dir>', 'output directory')
  .parse(process.argv);

let { input, output } = program;
let dominia;

// check the input
if (input !== undefined) {
  dominia = Saver.load(input);
  console.log(JSON.stringify(dominia));
} else {

  // output welcome
  console.log('\n' + colors.cyan(logo) + '\n');

  // define a default output dir
  if (output === undefined) output = '.';

  // ask a few questions
  questions.askMany({
    type: { 
      info: colors.cyan('What type do you want to generate?') + colors.white(' (' + Object.keys(measurements.sizes).join(' | ') + ')'),
      required: false
    },

    theme: {
      info: colors.cyan('What theme would you like?') + colors.white(' (asian | classical | medieval)'),
      required: false
    }
  }, (opts) => {
    dominia = new Dominia(opts).generate();
    console.log(JSON.stringify(dominia));

    // save y/n?
    questions.askOne({ info: colors.cyan('Would you like to save your demesne? (y | n)') }, (res) => {
      if (result === 'y' || result === 'yes') {
        const filename = new Date().getTime() + '.dom';
        const filepath = path.join(output, filename);

        Saver.save(filepath, dominia);
        console.log(colors.green('Saving... ' + filepath));
      } else {
        console.log(colors.white('Exited without save.'));
      }
    });
  });
}