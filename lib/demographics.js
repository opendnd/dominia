const defaults = require('./defaults');

class Demographics {
  constructor(opts = {}) {
    this.defaults = opts.defaults || defaults;
  }

  industries(population, prosperityValue = 1) {
    const { supportValues } = this.defaults;
    let industries = Object.keys(supportValues);

    // generate the industries
    industries = industries.map((industry) => {
      // determine if advantage or not
      let applyAdvantage = 1;
      const advantages = this.defaults.advantages[industry];
      if (advantages) {
        advantages.forEach((advantage) => {
          // halves the prosperity value if we have advantage
          if (advantages.indexOf(advantage) >= 0) {
            applyAdvantage = 2;
          }
        });
      }

      // calculate the SV and other values
      const sv = parseInt(supportValues[industry], 10) * (prosperityValue / applyAdvantage);
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
      }

      return a;
    }, []);

    return industries;
  }

  livestock(population, prosperityValue = 1) {
    const { livestockValues } = this.defaults;
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

  generate(opts = {}) {
    const { population, prosperity } = opts;
    const prosperityValue = this.defaults.prosperity.indexOf(prosperity) + 1;
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
