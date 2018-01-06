'use strict';

const defaults = require('./defaults');
const Roll = require('roll');
const roll = new Roll();

class Resources {
  static generate(opts = {}) {
    const { terrain } = opts;

    const terrainData = defaults.terrainResources[terrain];
    const result = roll.roll(`1${terrainData.dice}`).result;
    let terrainResources = Object.assign([], terrainData.resources);
    const resources = [];

    // grab a random resource and remove from the list after selected
    let i = 0;
    while (i < result) {
      const resource = terrainResources.sample();

      // DC 5 for the resource
      if (roll.roll('1d20').result >= 5) {
        resources.push(resource);
        terrainResources.splice(terrainResources.indexOf(resource), 1);
      }

      i += 1;
    }

    return resources;
  }
}

module.exports = Resources;
