'use strict';

const randgen = require('randgen');
const { rnorm } = randgen;
const measurements = require('./measurements');
const { sizes, densities, sqmi } = measurements;

class Populations {
  static generate(opts = {}) {
    const { size, scale } = opts;
    const sizeTemplate = sizes[size];
    const template = this.parseTemplate(sizeTemplate);
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

  static parseTemplate(template = '-') {
    const parts = template.replace(/\,/g, '').split('-');
    const min = parseInt(parts[0]);
    const max = parseInt(parts[1]);
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