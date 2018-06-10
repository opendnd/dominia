/* eslint-disable */

const fs = require('fs');
const path = require('path');
const Nomina = require('nomina');
const nomina = new Nomina();
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const home = process.env.HOME || process.env.USERPROFILE;
const userPath = path.join(home, '.dnd', 'dominia', 'defaults.js');
let defaults;

// only push unique elements
Array.prototype.pushUnique = function(element) { 
  if (this.indexOf(element) === -1) {
    this.push(element);
  }
};

// grab a random element
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
};

// get from the user path
if (fs.existsSync(userPath)) {
  defaults = require(userPath);
} else {
  defaults = require(path.join(libDir, 'defaults-default'));
}

module.exports = defaults;
