'use strict';

const colors = require('colors/safe');
const numeral = require('numeral');
const defaults = require('./defaults');
const { measurements } = defaults;
const { sqmi } = measurements;

class Renderer {
  static capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static formatNumber(n, decimal = false) {
    let format = '0,0';

    if (decimal) format = '0,0.00';
    
    return numeral(n).format(format);
  }

  static render(dominia, renderer = '') {
    if (renderer === 'json') {
      console.log(JSON.stringify(dominia));
      return;
    }

    // get vars and do some math
    const { name, scale, size, population, geography, prosperity, demographics, localities, demesnes, terrain, resources } = dominia;

    // start
    let output = colors.white('\n------------------------------------------------------------------------------------------------------------------------------------------\n');
    
    // quick stats
    output += colors.white('Type: \t\t');
    output += this.capitalize(size);
    output += colors.white('\nName: \t\t');
    output += this.capitalize(name);
    output += colors.white('\nProsperity: \t');
    output += this.capitalize(prosperity);
    output += colors.white('\nPopulation: \t');
    output += this.formatNumber(population.count);
    
    // desc 
    output += colors.white('\nDescription: \t');

    // intro
    output += `The ${this.capitalize(size)} of ${this.capitalize(name)} has a population of ${this.formatNumber(population.count)}`;
    output += ` and a population density of ${this.formatNumber(population.density)} people per sqmi.\n\t\t`;
    output += `The ${size} sits on ${this.formatNumber(geography.total.squaremiles)} sqmi or ${this.formatNumber(geography.total.acreage)} acres of land `;
    output += `of which ${this.formatNumber(geography.arable.squaremiles, true)} sqmi or ${this.formatNumber(geography.arable.acreage)} acres is arable.\n\t\t`
    output += `The remaining ${this.formatNumber(geography.wilderness.squaremiles, true)} sqmi or ${this.formatNumber(geography.wilderness.acreage)} acres is wilderness.\n\t\t`

    // locality body
    if (scale === 'locality') {
      const { industries, livestock } = demographics;

      // resources
      output += `\n\t\tThe locality is situated in ${terrain} terrain: \n\t\t`;
      if (resources.length > 0) {
        resources.forEach((resource) => {
          output += `  - ${resource}\n\t\t`;
        });
      }

      // industries
      output += '\n\t\tThe locality contains the following industries: \n\t\t';
      industries.forEach((industry) => {
        output += `  - ${industry.count} ${industry.industry}\n\t\t`;
      });

      // livestock
      output += '\n\t\tThe locality also has livestock of: \n\t\t';
      livestock.forEach((animal) => {
        output += `  - ${animal.count} ${animal.animal}\n\t\t`;
      });

    // county body
    } else if (scale === 'county') {
      output += '\n\t\tThe county has the following localities: \n\t\t';
      localities.forEach((locality) => {
        output += `  - ${this.capitalize(locality.size)} of ${locality.name}, popluation: ${this.formatNumber(locality.population.count)}\n\t\t`;

        this.render(locality);
      });

    // duchy body
    } else if (scale === 'duchy') {
      output += '\n\t\tThe duchy has the following counties: \n\t\t';
      demesnes.forEach((demesne) => {
        output += `  - ${this.capitalize(demesne.size)} of ${demesne.name}, popluation: ${this.formatNumber(demesne.population.count)}\n\t\t`;

        this.render(demesne);
      });

    // kingdom body
    } else if (scale === 'kingdom') {
      output += '\n\t\tThe kingdom has the following demesnes: \n\t\t';
      demesnes.forEach((demesne) => {
        output += `  - ${this.capitalize(demesne.size)} of ${demesne.name}, popluation: ${this.formatNumber(demesne.population.count)}\n\t\t`;

        this.render(demesne);
      });
    }
    
    // end
    output += colors.white('\n------------------------------------------------------------------------------------------------------------------------------------------\n');
    console.log(output);
  }
}

module.exports = Renderer;