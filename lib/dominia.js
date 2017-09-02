'use strict';

class Dominia {
  constructor() {
  }

  generate(opts = {}) {
    const { type } = opts;

    switch(type) {
      default:
        return this.generateTown(opts);
    }
  }

  generateTown(opts = {}) {
    const name = 'Alaria';

    const town = {
      name,
    };

    return town;
  }
}

module.exports = Dominia;