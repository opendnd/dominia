'use strict';

const Roll = require('roll');
const Names = require('./Names');
const Populations = require('./Populations');
const Demographics = require('./Demographics');

class Generator {
  constructor(opts = {}) {
    this.opts = opts;
  }

  primitive(opts = {}) {
    opts = Object.assign(this.opts, opts);
    const { scale, size } = opts;

    // generate name
    const nameOpts = Object.assign(opts, {});
    const name = Names.generate(nameOpts);
    
    // generate population
    const popOpts = Object.assign(opts, {});
    const population = Populations.generate(popOpts);

    let primitive = {
      name,
      population,
    }

    // generate demographics if locality
    if (scale === 'locality') {
      const demoOpts = Object.assign(opts, {
        population,
      });
      const demographics = Demographics.generate(demoOpts);

      primitive = Object.assign(primitive, {
        demographics,
      });
    }

    return primitive;
  }
}

module.exports = Generator;