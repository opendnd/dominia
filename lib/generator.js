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
  constructor(opts = {}) {
    this.defaults = opts.defaults || defaults;
    this.names = new Names({
      defaults: this.defaults,
      defaultsNomina: opts.defaultsNomina,
    });
    this.populations = new Populations({
      defaults: this.defaults,
    });
    this.geography = new Geography({
      defaults: this.defaults,
    });
    this.resources = new Resources({
      defaults: this.defaults,
    });
    this.demographics = new Demographics({
      defaults: this.defaults,
    });
  }

  primitive(opts = {}) {
    const { version } = pinfo;
    const { scale, size } = opts;

    // generate name
    const nameOpts = Object.assign(opts, {});
    const name = this.names.generate(nameOpts);

    // generate population
    const popOpts = Object.assign(opts, {});
    const population = this.populations.generate(popOpts);

    // generate geography
    const geoOpts = Object.assign(opts, {
      population,
    });
    const geography = this.geography.generate(geoOpts);

    // generate prosperity
    const prosperity = opts.prosperity || this.defaults.prosperity.sample();

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
      const terrain = opts.terrain || this.defaults.terrains.sample();
      const resources = opts.resources || this.resources.generate({ terrain });

      // demographic opts
      const demoOpts = Object.assign(opts, {
        population,
        terrain,
        resources,
        prosperity,
      });

      // generate demographics
      const demographics = this.demographics.generate(demoOpts);

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
