'use strict';

const measurements = require('./measurements');
const { supportValues, livestockValues } = measurements;

class Demographics {
  static industries(population, bonus = {}) {
    let industries = Object.keys(supportValues);

    // generate the industries
    industries = industries.map((industry) => {
      const sv = supportValues[industry];
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

  static livestock(population, bonus = {}) {
    const { multiplier, ratios } = livestockValues;
    const total = Math.floor(population * multiplier);
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
    const { population } = opts;
    const industries = this.industries(population);
    const livestock = this.livestock(population);

    const demographics = {
      industries,
      livestock,
    };

    return demographics;
  }
}

module.exports = Demographics;