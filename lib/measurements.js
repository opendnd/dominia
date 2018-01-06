'use strict';

// use these measurements to help generate maps and population
const measurements = {

  // one square on a map is 5x5 feet
  square: {
    width: 5,
    height: 5,
  },

  // one acre is roughly 40,000 sqft or 40 x 40 squares
  acre: {
    width: 40,
    height: 40,
  },

  // how many acres are in a square mile
  sqmi: 640, // 32 x 20 acres (landscape) city map

  // locality is either a capital, city, town, village or hamlet
  // county is not required a capital
  // duchy and kingdom must have a capital
  scales: {
    locality: 1,    // 1 sqmi / 640 acres / 1600 squares
    county: 800,    // 800 sqmi can support up to 200 localities
    duchy: 16000,   // 16,000 sqmi can support up to 20 counties
    kingdom: 80000, // 80,000 sqmi can support up to 5 duchies
  },

  // population sizes
  sizes: {
    hamlet: '20-150',
    village: '150-800',
    town: '800-8,000',
    city: '8,000-20,000',
    capital: '20,000-120,000',
    county: '500-300,000',
    duchy: '20,000-3,000,000',
    kingdom: '100,000-8,000,000',
  },

  getSizeParts: (size) => {
    return measurements.sizes[size].replace(/\,/g, '').split('-');
  },

  getMinSize: (size) => {
    return parseInt(measurements.getSizeParts(size)[0]);
  },

  getMaxSize: (size) => {
    return parseInt(measurements.getSizeParts(size)[1]);
  },

  // population defaults
  // population in sqmi
  densities: {
    hamlet: 2560,
    village: 6400,
    town: 15360,
    city: 30720,
    capital: 61440,
    county: 75,
    duchy: 75,
    kingdom: 75,
  },
};

module.exports = measurements;