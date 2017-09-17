'use strict';

const nomina = require('nomina');

class Names {
  static generate(opts = {}) {
    let type = opts.theme || 'medieval';

    const name = nomina({
      type,
      gender: 'dominia',
    });

    if (opts.name !== undefined) return opts.name;
    return name;
  }
}

module.exports = Names;