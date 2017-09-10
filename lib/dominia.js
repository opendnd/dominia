'use strict';

class Dominia {
  constructor() {
  }

  generate(opts = {}) {
    const { type } = opts;

    switch(type) {
      case 'hamlet':
        return this.generateHamlet(opts);

      case 'village':
        return this.generateVillage(opts);

      case 'town':
        return this.generateTown(opts);

      case 'city':
        return this.generateCity(opts);

      case 'duchy':
        return this.generateDuchy(opts);

      default:
        return this.generateKingdom(opts);
    }
  }

  generateHamlet(opts = {}) {
    const name = 'Alaria';

    const hamlet = {
      name,
    };

    return hamlet;
  }

  generateVillage(opts = {}) {
    const name = 'Alaria';

    const village = {
      name,
    };

    return village;
  }

  generateTown(opts = {}) {
    const name = 'Alaria';

    const town = {
      name,
    };

    return town;
  }

  generateCity(opts = {}) {
    const name = 'Alaria';

    const city = {
      name,
    };

    return city;
  }

  generateDuchy(opts = {}) {
    const name = 'Alaria';

    const duchy = {
      name,
    };

    return duchy;
  }

  generateKingdom(opts = {}) {
    const name = 'Alaria';

    const kingdom = {
      name,
    };

    return kingdom;
  }
}

module.exports = Dominia;