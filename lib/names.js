const Nomina = require('nomina');
const defaults = require('./defaults');

class Names {
  static generate(opts = {}) {
    const theme = opts.theme || defaults.themes.sample();

    const name = Nomina.generate({
      theme,
      type: 'dominia',
    });

    if (opts.name !== undefined) return opts.name;
    return name;
  }
}

module.exports = Names;
