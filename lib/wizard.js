const fs = require('fs');
const questions = require('questions');
const numeral = require('numeral');
const colors = require('colors/safe');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const Dominia = require(path.join(libDir, 'dominia'));
const Saver = require(path.join(libDir, 'saver'));
const Renderer = require(path.join(libDir, 'renderer'));
const defaults = require(path.join(libDir, 'defaults'));
const logo = fs.readFileSync(path.join(rootDir, 'logo.txt'), { encoding: 'utf-8' });
const Nomina = require('nomina');
const nomina = new Nomina();
const themes = nomina.getThemes();
const { measurements } = defaults;

const wizard = (outputDir) => {
  if (outputDir === undefined) outputDir = '.';

  // output welcome
  process.stdout.write(`\n${colors.cyan(logo)}\n`);

  // ask a few questions
  questions.askMany({
    size: {
      info: colors.cyan('What size domain do you want to generate?') + colors.white(` (${Object.keys(measurements.sizes).join(' | ')})`),
      required: false,
    },

    population: {
      info: colors.cyan('Would you like to specify the population?') + colors.white(' ex: input 50,000 (people)'),
      required: false,
    },

    theme: {
      info: colors.cyan('What theme would you like?') + colors.white(` (${themes.join(' | ')})`),
      required: false,
    },

    name: {
      info: colors.cyan('Would you like to use an existing name?') + colors.white(' ex: Allaria, leave blank to generate'),
      required: false,
    },

    prosperity: {
      info: colors.cyan('Would you like to specify the prosperity?') + colors.white(` (${defaults.prosperity.join(' | ')})`),
      required: false,
    },

    terrain: {
      info: colors.cyan('Would you like to specify the terrain?') + colors.white(` (${defaults.terrains.join(' | ')})`),
      required: false,
    },

    resources: {
      info: colors.cyan('Would you like to specify the resources?') + colors.white(` separate with comma (${defaults.resources.join(' | ')})`),
      required: false,
    },

    density: {
      info: colors.cyan('Would you like to specify the density?') + colors.white(' ex: input 75 (people per sqmi)'),
      required: false,
    },

    land: {
      info: colors.cyan('Would you like to specify the total land area?') + colors.white(' ex: input 1,000,000 (sqmi)'),
      required: false,
    },
  }, (opts) => {
    // manage the opts
    opts.size = (opts.size === '') ? undefined : opts.size.toLowerCase();
    opts.name = (opts.name === '') ? undefined : opts.name;
    opts.theme = (opts.theme === '') ? undefined : opts.theme.toLowerCase();
    opts.population = (opts.population === '') ? undefined : numeral(opts.population).value();
    opts.density = (opts.density === '') ? undefined : numeral(opts.density).value();
    opts.land = (opts.land === '') ? undefined : numeral(opts.land).value();
    opts.terrain = (opts.terrain === '') ? undefined : opts.terrain;
    opts.resources = (opts.resources === '') ? undefined : opts.resources.split(', ');

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
    const dominia = new Dominia(opts).generate();
    Renderer.output(dominia);
    Saver.finish(outputDir, 'Would you like to save your domain? (y | n)', dominia, dominia.name);
  });
};

module.exports = wizard;
