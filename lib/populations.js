'use strict';

const randgen = require('randgen');
const { rnorm } = randgen;
const measurements = require('./measurements');
const { sizes, densities, sqmi } = measurements;

class Populations {
  static generate(opts = {}) {
    const { size, scale } = opts;
    const template = this.generateTemplate(opts);
    const { min, max, diff, mean, stdev } = template;
    
    // calculate population
    // prevent max and min
    let count = Math.floor(rnorm(mean, stdev));
    if (count > max) count = max;
    if (count < min) count = min;

    // set the density
    let density = densities[size];
    density = Math.floor(rnorm(density, density * 0.3));

    return {
      count,
      density,
    };
  }

  // generate a template of the statistical info
  static generateTemplate(opts = {}) {
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