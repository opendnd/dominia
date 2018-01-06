'use strict';

const Names = require('./names');
const Populations = require('./populations');
const Geography = require('./geography');
const Demographics = require('./demographics');
const Resources = require('./resources');
const defaults = require('./defaults');

class Generator {
  primitive(opts = {}) {
    let { scale, size } = opts;

    // generate name
    const nameOpts = Object.assign(opts, {});
    const name = Names.generate(nameOpts);
    
    // generate population
    const popOpts = Object.assign(opts, {});
    const population = Populations.generate(popOpts);

    // generate geography
    const geoOpts = Object.assign(opts, {
      population,
    });
    const geography = Geography.generate(geoOpts);

    // generate prosperity
    const prosperity = opts.prosperity || defaults.prosperity.sample();

    // set the primitive
    let primitive = {
      scale,
      size,
      name,
      population,
      geography,
      prosperity,
    };

    // generate demographics if locality
    if (scale === 'locality') {
      const terrain = opts.terrain || defaults.terrains.sample();
      const resources = opts.resources || Resources.generate({ terrain, });

      // demographic opts
      const demoOpts = Object.assign(opts, {
        population,
        terrain,
        resources,
        prosperity,
      });

      // generate demographics
      const demographics = Demographics.generate(demoOpts);

      // assign primitive
      primitive = Object.assign(primitive, {
        demographics,
        terrain,
        resources,
      });
    }

    return primitive;
  }
}

module.exports = Generator;