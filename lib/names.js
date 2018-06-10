const Nomina = require('nomina');
const defaults = require('./defaults');

class Names {
  constructor(opts = {}) {
    this.defaults = opts.defaults || defaults;
    this.nomina = new Nomina({ defaults: opts.defaultsNomina });
  }

  generate(opts = {}) {
    const theme = opts.theme || this.nomina.getThemes().sample();

    const name = this.nomina.generate({
      theme,
      type: 'dominia',
    });

    if (opts.name !== undefined) return opts.name;
    return name;
  }
}

module.exports = Names;
