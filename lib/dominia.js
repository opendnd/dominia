const Generator = require('./generator');
const defaults = require('./defaults');

class Dominia {
  constructor(opts = {}) {
    this.opts = opts;
    this.defaults = opts.defaults || defaults;
    this.defaultsNomina = opts.defaultsNomina;
  }

  generate(opts = {}) {
    opts = Object.assign(this.opts, opts);
    const { size } = opts;

    this.generator = new Generator({
      defaults: this.defaults,
      defaultsNomina: this.defaultsNomina,
    });

    switch (size) {
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
      theme: this.opts.theme,
    });

    const hamlet = this.generator.primitive(opts);

    return hamlet;
  }

  generateVillage(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'locality',
      size: 'village',
      theme: this.opts.theme,
    });

    const village = this.generator.primitive(opts);

    return village;
  }

  generateTown(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'locality',
      size: 'town',
      theme: this.opts.theme,
    });

    const town = this.generator.primitive(opts);

    return town;
  }

  generateCity(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'locality',
      size: 'city',
      theme: this.opts.theme,
    });

    const city = this.generator.primitive(opts);

    return city;
  }

  generateCapital(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'locality',
      size: 'capital',
      theme: this.opts.theme,
    });

    const capital = this.generator.primitive(opts);

    return capital;
  }

  generateCounty(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'county',
      size: 'county',
      theme: this.opts.theme,
    });

    const county = this.generator.primitive(opts);
    county.localities = this.generateLocalities(county.population.count);

    return county;
  }

  generateDuchy(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'duchy',
      size: 'duchy',
      theme: this.opts.theme,
    });

    const duchy = this.generator.primitive(opts);
    duchy.demesnes = this.generateDemesnes(duchy.population.count);

    return duchy;
  }

  generateKingdom(opts = {}) {
    opts = Object.assign(opts, {
      scale: 'kingdom',
      size: 'kingdom',
      theme: this.opts.theme,
    });

    const kingdom = this.generator.primitive(opts);
    kingdom.demesnes = this.generateDemesnes(kingdom.population.count);

    return kingdom;
  }

  // used to recursively generate localities based on population
  generateLocalities(popCount = 0, localities = []) {
    const { measurements } = this.defaults;
    const multiplier = 1.3;
    const maxPop = popCount * 0.7;
    let locality;

    // generate based on the population maxes
    // generate a capital
    if (popCount >= (measurements.getMaxSize('capital') * multiplier)) {
      locality = this.generateCapital({
        max: maxPop,
      });

    // generate a city
    } else if (popCount >= (measurements.getMaxSize('city') * multiplier)) {
      locality = this.generateCity({
        max: maxPop,
      });

    // generate a town
    } else if (popCount >= (measurements.getMaxSize('town') * multiplier)) {
      locality = this.generateTown({
        max: maxPop,
      });

    // generate a village
    } else if (popCount >= (measurements.getMaxSize('village') * multiplier)) {
      locality = this.generateVillage({
        max: maxPop,
      });

    // generate a hamlet
    } else if (popCount >= (measurements.getMaxSize('hamlet') * multiplier)) {
      locality = this.generateHamlet({
        max: maxPop,
      });
    }

    // generate more localities recursively
    if (locality !== undefined) {
      localities.push(locality);
      const nextPop = popCount - locality.population.count;
      return this.generateLocalities(nextPop, localities);
    }

    return localities;
  }

  // used to recursively generate demesnes based on population
  generateDemesnes(popCount = 0, demesnes = []) {
    const { measurements } = this.defaults;
    const multiplier = 1.3;
    let maxPop = popCount * 0.7;
    let demesne;

    // generate duchy
    if (popCount >= (measurements.getMaxSize('duchy') * multiplier)) {
      if (maxPop > measurements.getMaxSize('duchy')) {
        maxPop = measurements.getMaxSize('duchy');
      }

      demesne = this.generateDuchy({
        max: maxPop,
      });

    // generate county
    } else if (popCount >= (measurements.getMaxSize('county') * multiplier)) {
      if (maxPop > measurements.getMaxSize('county')) {
        maxPop = measurements.getMaxSize('county');
      }

      demesne = this.generateCounty({
        max: maxPop,
      });
    }

    // generate more demesnes recursively
    if (demesne !== undefined) {
      demesnes.push(demesne);
      const nextPop = popCount - demesne.population.count;
      return this.generateDemesnes(nextPop, demesnes);
    }

    return demesnes;
  }
}

module.exports = Dominia;
