const fs = require('fs');
const program = require('commander');
const questions = require('questions');
const numeral = require('numeral');
const colors = require('colors/safe');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const pinfo = require(path.join(rootDir, 'package.json'));
const Dominia = require(path.join(libDir, 'dominia'));
const Saver = require(path.join(libDir, 'saver'));
const Renderer = require(path.join(libDir, 'renderer'));
const measurements = require(path.join(libDir, 'measurements'));
const logo = fs.readFileSync(path.join(rootDir, 'logo.txt'), { encoding: 'utf-8' });

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .option('-i, --input <file>', 'input *.dom file')
  .option('-o, --output <dir>', 'output directory')
  .option('-r, --renderer <renderer>', 'which render to use default or json')
  .parse(process.argv);

let { input, output, renderer } = program;
let dominia;

const themes = ['asian', 'classical', 'medieval', 'nirimsese', 'scottish'];

// check the input
if (input !== undefined) {
  dominia = Saver.load(input);
  Renderer.render(dominia, renderer);
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

    population: {
      info: colors.cyan('Would you like to specify the population?') + colors.white(' ex: input 50,000 (people)'),
      required: false
    },

    density: {
      info: colors.cyan('Would you like to specify the density?') + colors.white(' ex: input 75 (people per sqmi)'),
      required: false
    },

    land: {
      info: colors.cyan('Would you like to specify the total land area?') + colors.white(' ex: input 1,000,000 (sqmi)'),
      required: false
    },

    name: {
      info: colors.cyan('Would you like to use an existing name?') + colors.white(' ex: Allaria, leave blank to generate'),
      required: false
    },

    theme: {
      info: colors.cyan('What theme would you like?') + colors.white(' (' + themes.join(' | ') + ')'),
      required: false
    },
  }, (opts) => {
    
    // manage the opts
    opts.type = (opts.type === '') ? undefined : opts.type.toLowerCase();
    opts.name = (opts.name === '') ? undefined : opts.name;
    opts.theme = (opts.theme === '') ? undefined : opts.theme.toLowerCase();
    opts.population = (opts.population === '') ? undefined : numeral(opts.population).value();
    opts.density = (opts.density === '') ? undefined : numeral(opts.density).value();
    opts.land = (opts.land === '') ? undefined : numeral(opts.land).value();

    /* Calculations:
     *   L = 10 sqmi
     *   P = 500 people
     *   D = 50 people per sqmi
     *
     * Formulas:
     *   L = P / D  ex:  10 = 500 / 50
     *   P = D * L  ex: 500 =  50 * 10
     *   D = P / L  ex:  50 = 500 / 10
     */
    // calculate land from pop and density
    if ((opts.land === undefined) && opts.population && opts.density) opts.land = opts.population / opts.density;

    // calculate pop from land and density
    if ((opts.population === undefined) && opts.land && opts.density) opts.population = opts.land * opts.density;

    // calculate density from land and population
    if ((opts.density === undefined) && opts.land && opts.population) opts.density = opts.population / opts.land;

    // generate
    dominia = new Dominia(opts).generate();
    Renderer.render(dominia, renderer);

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