const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const pinfo = require(path.join(rootDir, 'package.json'));
const Names = require(path.join(libDir, 'names'));
const Populations = require(path.join(libDir, 'populations'));
const Geography = require(path.join(libDir, 'geography'));
const Demographics = require(path.join(libDir, 'demographics'));
const Resources = require(path.join(libDir, 'resources'));
const defaults = require(path.join(libDir, 'defaults'));

class Generator {
  primitive(opts = {}) {
    const { version } = pinfo;
    const { scale, size } = opts;

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
      version,
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
      const resources = opts.resources || Resources.generate({ terrain });

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
