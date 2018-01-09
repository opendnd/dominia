'use strict';

const Nomina = require('nomina');

class Names {
  static generate(opts = {}) {
    let theme = opts.theme || 'medieval';

    const name = Nomina.generate({
      theme,
      type: 'dominia',
    });

    if (opts.name !== undefined) return opts.name;
    return name;
  }
}

module.exports = Names;