'use strict';

const Generator = require('./Generator');

class Dominia {
  constructor(opts = {}) {
    const { type } = opts;

    this.type = type;
    this.opts = opts;
  }

  generate(opts = {}) {
    opts = Object.assign(this.opts, opts);

    this.generator = new Generator(opts);

    switch(this.type) {
      case 'hamlet':
        return this.generateHamlet(opts);

      case 'village':
        return this.generateVillage(opts);

      case 'town':
        return this.generateTown(opts);

      case 'city':
        return this.generateCity(opts);

      case 'capital':
        return this.generateCapital(opts);

      case 'county':
        return this.generateCounty(opts);

      case 'duchy':
        return this.generateDuchy(opts);

      case 'kingdom':
        return this.generateKingdom(opts);

      default:
        return this.generateHamlet(opts);
    }
  }

  generateHamlet(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'locality',
      size: 'hamlet',
    });

    const hamlet = this.generator.primitive(opts);

    return {
      hamlet,
    };
  }

  generateVillage(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'locality',
      size: 'village',
    });

    const village = this.generator.primitive(opts);

    return {
      village,
    };
  }

  generateTown(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'locality',
      size: 'town',
    });

    const town = this.generator.primitive(opts);

    return {
      town,
    };
  }

  generateCity(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'locality',
      size: 'city',
    });

    const city = this.generator.primitive(opts);

    return {
      city,
    };
  }

  generateCapital(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'locality',
      size: 'capital',
    });

    const city = this.generator.primitive(opts);

    return {
      city,
    };
  }

  generateCounty(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'county',
      size: 'county',
    });

    const city = this.generator.primitive(opts);

    return {
      city,
    };
  }

  generateDuchy(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'duchy',
      size: 'duchy',
    });

    const duchy = this.generator.primitive(opts);

    return {
      duchy,
    };
  }

  generateKingdom(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'kingdom',
      size: 'kingdom',
    });

    const kingdom = this.generator.primitive(opts);

    return {
      kingdom,
    };
  }
}

module.exports = Dominia;