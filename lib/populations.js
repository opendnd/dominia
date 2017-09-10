'use strict';

const randgen = require('randgen');
const { rnorm } = randgen;
const measurements = require('./measurements');
const { sizes } = measurements;

class Populations {
  static generate(opts = {}) {
    const { size } = opts;
    const sizeTemplate = sizes[size];
    const template = this.parseTemplate(sizeTemplate);
    const { min, max, diff, mean, stdev } = template;
    
    // calculate population
    // prevent max and min
    let population = Math.floor(rnorm(mean, stdev));
    if (population > max) population = max;
    if (population < min) population = min;

    return population;
  }

  static parseTemplate(template = '-') {
    const parts = template.replace(/\,/g, '').split('-');
    const min = parseInt(parts[0]);
    const max = parseInt(parts[1]);
    const diff = max - min;
    const stdev = diff / 4;
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