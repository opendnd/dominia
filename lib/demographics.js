'use strict';

const defaults = require('./defaults');
const { supportValues, livestockValues } = defaults;

class Demographics {
  static industries(population, prosperityValue = 1) {
    let industries = Object.keys(supportValues);

    // generate the industries
    industries = industries.map((industry) => {
      const sv = parseInt(supportValues[industry], 10) * prosperityValue;
      const total = population / sv;
      const prob = total % 1;
      let count = Math.floor(total);

      // add an extra one based on the odds
      if (Math.random() >= (1 - prob)) {
        count += 1;
      }

      // return the count
      return {
        industry,
        count,
      };
    });

    // reduce the industries
    industries = industries.reduce((a, b) => {
      if (b.count > 0) {
        return a.concat(b);
      } else {
        return a;
      }
    }, []);

    return industries;
  }

  static livestock(population, prosperityValue = 1) {
    const { multiplier, ratios } = livestockValues;
    const total = Math.floor(population * (multiplier / prosperityValue));
    let livestock = Object.keys(ratios);

    livestock = livestock.map((animal) => {
      const ratio = ratios[animal];
      const count = Math.floor(ratio * total);

      return {
        animal,
        count,
      };
    });

    return livestock;
  }

  static generate(opts = {}) {
    const { population, terrain, resources, prosperity } = opts;
    const prosperityValue = defaults.prosperity.indexOf(prosperity) + 1;
    const industries = this.industries(population.count, prosperityValue);
    const livestock = this.livestock(population.count);

    const demographics = {
      industries,
      livestock,
    };

    return demographics;
  }
}

module.exports = Demographics;