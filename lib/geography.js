'use strict';

const randgen = require('randgen');
const { rnorm } = randgen;
const measurements = require('./measurements');
const { sqmi } = measurements;

class Geography {
  static generate(opts = {}) {
    const { population } = opts;
    let { count, density } = population;
    
    const total = Math.ceil(count / density);
    const arable = rnorm(0.4, 0.1);
    const wilderness = 1.0 - arable;
    const arableSqmi = total * arable;
    const wildernessSqmi = total * wilderness;

    const geography = {
      arable: {
        squaremiles: arableSqmi,
        acreage: Math.ceil(arableSqmi * sqmi),
      },
      wilderness: {
        squaremiles: wildernessSqmi,
        acreage: Math.ceil(wildernessSqmi * sqmi),
      },
      total: {
        squaremiles: total,
        acreage: Math.ceil(total * sqmi),
      },
    };

    return geography;
  }
}

module.exports = Geography;