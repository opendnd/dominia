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
    county: '500-200,000',
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

  // these are used to determine the number of people required to obtain
  // 1 of these industries, the resulting percentage is always a probability
  // to affect the dice roll
  supportValues: {
    'Shoemakers': 150,
    'Furriers': 250,
    'Maidservants': 250,
    'Tailors': 250,
    'Barbers': 350,
    'Jewelers': 400,
    'Taverns': 400,
    'Old-Clothes': 400,
    'Pastrycooks': 500,
    'Masons': 500,
    'Carpenters': 550,
    'Weavers': 600,
    'Chandlers': 700,
    'Mercers': 700,
    'Coopers': 700,
    'Bakers': 800,
    'Watercarriers': 850,
    'Scabbardmakers': 850,
    'Wine-Sellers': 900,
    'Hatmakers': 950,
    'Saddlers': 1000,
    'Chicken-Butchers': 1000,
    'Pursemakers': 1100,
    'Woodsellers': 2400,
    'Magic-Shops': 2800,
    'Bookbinders': 3000,
    'Butchers': 1200,
    'Fishmongers': 1200,
    'Beer-Sellers': 1400,
    'Buckle-Makers': 1400,
    'Plasterers': 1400,
    'Spice-Merchants': 1400,
    'Blacksmiths': 1500,
    'Painters': 1500,
    'Healers': 350,
    'Doctors': 1700,
    'Roofers': 1800,
    'Locksmiths': 1900,
    'Bathers': 1900,
    'Ropemakers': 1900,
    'Inns': 2000,
    'Tanners': 2000,
    'Copyists': 2000,
    'Sculptors': 2000,
    'Rugmakers': 2000,
    'Harness-Makers': 2000,
    'Bleachers': 2100,
    'Hay-Merchants': 2300,
    'Cutlers': 2300,
    'Glovemakers': 2400,
    'Woodcarvers': 2400,
    'Booksellers': 6300,
    'Illuminators': 3900,
    'Clergy': 40,
    'Priests': 1200,
    'Advocates': 650,
    'Nobles': 200,
    'Guards': 150,
    'Scholars': 40000,
    'Master-Artists': 60000,
  },

  // livestock distribution
  livestockValues: {
    multiplier: 2.2, // multiply human population by multiplier to determine livestock population
    
    // below are default ratios to distribute the livestock
    // other conditions of climate / geography will affect this
    ratios: {
      chickens: 0.48,
      geese: 0.10,
      ducks: 0.10,
      cattle: 0.08,
      pigs: 0.14,
      sheep: 0.07,
      goats: 0.03,
    },
  },
};

module.exports = measurements;