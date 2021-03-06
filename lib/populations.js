const randgen = require('randgen');
const { rnorm } = randgen;
const defaults = require('./defaults');

class Populations {
  constructor(opts = {}) {
    this.defaults = opts.defaults || defaults;
  }

  generate(opts = {}) {
    const { measurements } = this.defaults;
    const { densities } = measurements;
    const { size } = opts;
    const template = this.generateTemplate(opts);
    const { min, max, mean, stdev } = template;

    // calculate population
    // prevent max and min
    let count = Math.floor(rnorm(mean, stdev));
    if (count > max) count = max;
    if (count < min) count = min;

    // set the count if we are passing it
    if (opts.population !== undefined) count = opts.population;

    // set the density
    let density = densities[size];
    density = Math.floor(rnorm(density, density * 0.3));

    // set the density if we are passing it
    if (opts.density !== undefined) density = opts.density;

    return {
      count,
      density,
    };
  }

  // generate a template of the statistical info
  generateTemplate(opts = {}) {
    const { measurements } = this.defaults;
    const { size } = opts;

    // min
    let min = measurements.getMinSize(size);
    if (opts.min !== undefined) min = opts.min;

    // max
    let max = measurements.getMaxSize(size);
    if (opts.max !== undefined) max = opts.max;

    const diff = max - min;
    const stdev = diff / 5;
    const mean = (diff / 2) + min;

    return {
      min,
      max,
      diff,
      mean,
      stdev,
    };
  }
}

module.exports = Populations;
