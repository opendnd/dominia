/* eslint-disable */
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const dataDir = path.join(libDir, 'data');

// load resource data
const Coastal = require(path.join(dataDir, 'resources-coastal.json'));
const Desert = require(path.join(dataDir, 'resources-desert.json'));
const FloodPlains = require(path.join(dataDir, 'resources-flood-plains.json'));
const Forest = require(path.join(dataDir, 'resources-forest.json'));
const Grassland = require(path.join(dataDir, 'resources-grassland.json'));
const Hills = require(path.join(dataDir, 'resources-hills.json'));
const Jungle = require(path.join(dataDir, 'resources-jungle.json'));
const Lakes = require(path.join(dataDir, 'resources-lakes.json'));
const Marsh = require(path.join(dataDir, 'resources-marsh.json'));
const Mountains = require(path.join(dataDir, 'resources-mountains.json'));
const Oasis = require(path.join(dataDir, 'resources-oasis.json'));
const Plains = require(path.join(dataDir, 'resources-plains.json'));
const River = require(path.join(dataDir, 'resources-river.json'));
const Snow = require(path.join(dataDir, 'resources-snow.json'));
const Tundra = require(path.join(dataDir, 'resources-tundra.json'));

const terrains = ['Coastal', 'Desert', 'Grassland', 'Hills', 'Mountains', 'Plains', 'Snow', 'Tundra', 'Forest', 'River', 'Jungle', 'Marsh', 'Flood Plains', 'Lakes', 'Oasis'];
const resources = ['Aluminum', 'Amber', 'Bananas', 'Bronze', 'Camels', 'Cattle', 'Chickens', 'Cinnamon', 'Citrus', 'Clay', 'Cloves', 'Coal', 'Cobalt', 'Cocoa', 'Coffee', 'Copper', 'Cosmetics', 'Cotton', 'Crabs', 'Deer', 'Diamonds', 'Ducks', 'Dyes', 'Fish', 'Furs', 'Geese', 'Goats', 'Gold', 'Gypsum', 'Honey', 'Horses', 'Incense', 'Iron', 'Ivory', 'Jade', 'Marble', 'Mercury', 'Obsidian', 'Peacocks', 'Pearls', 'Perfume', 'Pigs', 'Platinum', 'Rice', 'Salt', 'Sheep', 'Silk', 'Silver', 'Spices', 'Springs', 'Stone', 'Sugar', 'Sulphur', 'Tea', 'Tobacco', 'Truffles', 'Whales', 'Wheat', 'Wine', 'Wood', 'Wool'];
const advantages = {
  'Miners': ['Aluminum', 'Amber', 'Bronze', 'Coal', 'Cobalt', 'Copper', 'Diamonds', 'Gold', 'Gypsum', 'Iron', 'Jade', 'Obsidian', 'Salt', 'Stone', 'Sulphur'],
  'Hunters': ['Deer', 'Geese', 'Ducks', 'Peacocks', 'Ivory'],
  'Produce-Farmers': ['Bananas', 'Cinnamon', 'Citrus', 'Cloves', 'Cocoa', 'Coffee', 'Cotton', 'Honey', 'Rice', 'Sugar', 'Tea', 'Tobacco','Wheat'],
  'Horse-Farmers': ['Horses'],
  'Cattle-Farmers': ['Cattle'],
  'Poultry-Farmers': ['Chickens', 'Geese', 'Duck'],
  'Pork-Farmers': ['Pigs'],
  'Goatherders': ['Goats'],
  'Shepherders': ['Sheep', 'Wool'],
  'Shoemakers': ['Cattle'],
  'Furriers': ['Furs'],
  'Tailors': ['Cattle', 'Furs'],
  'Barbers': ['Iron', 'Bronze'],
  'Jewelers': ['Jade', 'Gold', 'Silver', 'Platinum', 'Gypsum', 'Cobalt', 'Bronze', 'Copper', 'Ivory', 'Pearls', 'Diamonds'],
  'Taverns': ['Wine', 'Wood', 'Spices'],
  'Clothiers': ['Wool', 'Cattle', 'Dyes', 'Furs'],
  'Pastrycooks': ['Chickens', 'Wheat'],
  'Masons': ['Clay', 'Coal', 'Wood', 'Gypsum', 'Marble', 'Stone'],
  'Carpenters': ['Wood', 'Iron', 'Bronze'],
  'Weavers': ['Iron', 'Wool', 'Sheep', 'Cotton'],
  'Chandlers': ['Honey'],
  'Mercers': ['Silk', 'Wool', 'Cattle', 'Cotton'],
  'Coopers': ['Wood', 'Bronze', 'Iron'],
  'Bakers': ['Wheat', 'Chickens', 'Clay', 'Wood', 'Rice'],
  'Watercarriers': ['Fish', 'Wood', 'Springs'],
  'Scabbardmakers': ['Cattle', 'Wood', 'Bronze', 'Iron', 'Copper'],
  'Wine-Sellers': ['Wine'],
  'Hatmakers': ['Cattle'],
  'Saddlers': ['Horses'],
  'Chicken-Butchers': ['Chickens'],
  'Pursemakers': ['Cattle'],
  'Woodsellers': ['Wood'],
  'Magic-Shops': ['Dyes', 'Sulphur', 'Gold', 'Perfume', 'Incense'],
  'Bookbinders': ['Wood', 'Cattle'],
  'Butchers': ['Cattle', 'Pigs', 'Chickens', 'Bronze', 'Iron'],
  'Fishmongers': ['Fish', 'Whales', 'Crabs'],
  'Beer-Sellers': ['Wheat'],
  'Buckle-Makers': ['Bronze', 'Copper', 'Iron', 'Silver', 'Gold'],
  'Plasterers': ['Clay', 'Gypsum'],
  'Spice-Merchants': ['Spices'],
  'Blacksmiths': ['Bronze', 'Copper', 'Iron', 'Silver', 'Gold', 'Platinum'],
  'Painters': ['Dyes'],
  'Healers': ['Incense', 'Perfume', 'Silver', 'Citrus', 'Cocoa', 'Springs'],
  'Doctors': ['Silver', 'Gold', 'Iron', 'Platinum'],
  'Roofers': ['Clay', 'Wood', 'Marble'],
  'Locksmiths': ['Iron', 'Bronze', 'Copper'],
  'Bathers': ['Ivory', 'Marble'],
  'Ropemakers': ['Wood'],
  'Inns': ['Wood', 'Cotton', 'Wool'],
  'Tanners': ['Cattle'],
  'Copyists': ['Wood', 'Gold', 'Silver'],
  'Sculptors': ['Stone', 'Marble', 'Gold', 'Silver'],
  'Rugmakers': ['Silk', 'Wool', 'Furs'],
  'Harness-Makers': ['Wood', 'Bronze', 'Iron'],
  'Bleachers': ['Dyes'],
  'Hay-Merchants': ['Cattle', 'Pigs'],
  'Cutlers': ['Iron', 'Silver', 'Gold'],
  'Glovemakers': ['Wool', 'Cattle'],
  'Woodcarvers': ['Wood', 'Iron', 'Bronze'],
  'Booksellers': ['Gold', 'Platinum', 'Cosmetics'],
  'Illuminators': ['Honey', 'Wood'],
  'Clergy': ['Incense', 'Gold', 'Spices'],
  'Priests': ['Incense', 'Gold'],
  'Advocates': ['Silver', 'Gold', 'Platinum'],
  'Nobles': ['Cosmetics', 'Tobacco', 'Tea', 'Perfume'],
  'Guards': ['Silver', 'Gold', 'Platinum'],
  'Scholars': ['Silver', 'Gold', 'Platinum'],
  'Master-Artists': ['Silver', 'Gold', 'Platinum', 'Dyes', 'Marble', 'Cosmetics', 'Perfume'],
};
const backgroundMappings = {
  'Miners': { backgrounds: ['Guild Artisan'], specialties: ['Smiths and metal-forgers'] },
  'Hunters': { backgrounds: ['Guild Artisan'], specialties: ['Cooks and bakers'] },
  'Produce-Farmers': { backgrounds: ['Guild Artisan'], specialties: ['Cooks and bakers'] },
  'Horse-Farmers': { backgrounds: ['Guild Artisan'], specialties: ['Cooks and bakers'] },
  'Cattle-Farmers': { backgrounds: ['Guild Artisan'], specialties: ['Cooks and bakers'] },
  'Poultry-Farmers': { backgrounds: ['Guild Artisan'], specialties: ['Cooks and bakers'] },
  'Pork-Farmers': { backgrounds: ['Guild Artisan'], specialties: ['Cooks and bakers'] },
  'Goatherders': { backgrounds: ['Guild Artisan'], specialties: ['Cooks and bakers'] },
  'Shepherders': { backgrounds: ['Guild Artisan'], specialties: ['Cooks and bakers'] },
  'Butlers': { backgrounds: ['Servant'] , specialties: ['Butler'] },
  'Maidservants': { backgrounds: ['Servant'] , specialties: ['Housekeeper'] },
  'Cooks': { backgrounds: ['Servant'] , specialties: ['Cook'] },
  'Groundskeepers': { backgrounds: ['Servant'] , specialties: ['Groundskeeper'] },
  'Chauffeurs': { backgrounds: ['Servant'] , specialties: ['Chauffeur'] },
  'Nannies': { backgrounds: ['Servant'] , specialties: ['Child Rearer'] },
  'Bodyguards': { backgrounds: ['Servant'] , specialties: ['Bodyguard'] },
  'Majordomos': { backgrounds: ['Servant'] , specialties: ['Majordomo'] },
  'Cobblers': { backgrounds: ['Guild Artisan'] , specialties: ['Cobblers and shoemakers'] },
  'Shoemakers': { backgrounds: ['Guild Artisan'] , specialties: ['Cobblers and shoemakers'] },
  'Furriers': { backgrounds: ['Guild Artisan'] , specialties: ['Weavers and dyers'] },
  'Tailors': { backgrounds: ['Guild Artisan'] , specialties: ['Weavers and dyers'] },
  'Barbers': { backgrounds: ['Guild Artisan'] , specialties: ['Tinkers, pewterers, and casters'] },
  'Jewelers': { backgrounds: ['Guild Artisan'] , specialties: ['Jewelers and gemcutters'] },
  'Taverns': { backgrounds: ['Guild Artisan'] , specialties: ['Brewers, distillers, and vintners'] },
  'Clothiers': { backgrounds: ['Guild Artisan'] , specialties: ['Weavers and dyers'] },
  'Glassblowers': { backgrounds: ['Guild Artisan'] , specialties: ['Glassblowers and glaziers'] },
  'Pastrycooks': { backgrounds: ['Guild Artisan'] , specialties: ['Cooks and bakers'] },
  'Masons': { backgrounds: ['Guild Artisan'] , specialties: ['Masons and stonecutters'] },
  'Carpenters': { backgrounds: ['Guild Artisan'] , specialties: ['Carpenters, roofers, and plasterers'] },
  'Weavers': { backgrounds: ['Guild Artisan'] , specialties: ['Weavers and dyers'] },
  'Chandlers': { backgrounds: ['Guild Artisan'] , specialties: ['Tinkers, pewterers, and casters'] },
  'Mercers': { backgrounds: ['Guild Artisan'] , specialties: ['Weavers and dyers'] },
  'Coopers': { backgrounds: ['Guild Artisan'] , specialties: ['Woodcarvers, coopers, and bowyers'] },
  'Bakers': { backgrounds: ['Guild Artisan'] , specialties: ['Cooks and bakers'] },
  'Watercarriers': { backgrounds: ['Guild Artisan'] , specialties: ['Cooks and bakers'] },
  'Armorers': { backgrounds: ['Guild Artisan'] , specialties: ['Armorers, locksmiths, and finesmiths'] },
  'Scabbardmakers': { backgrounds: ['Guild Artisan'] , specialties: ['Armorers, locksmiths, and finesmiths'] },
  'Wine-Sellers': { backgrounds: ['Guild Artisan'] , specialties: ['Brewers, distillers, and vintners'] },
  'Tanners': { backgrounds: ['Guild Artisan'] , specialties: ['Leatherworkers, skinners, and tanners'] },
  'Skinners': { backgrounds: ['Guild Artisan'] , specialties: ['Leatherworkers, skinners, and tanners'] },
  'Leatherworkers': { backgrounds: ['Guild Artisan'] , specialties: ['Leatherworkers, skinners, and tanners'] },
  'Hatmakers': { backgrounds: ['Guild Artisan'] , specialties: ['Leatherworkers, skinners, and tanners'] },
  'Saddlers': { backgrounds: ['Guild Artisan'] , specialties: ['Armorers, locksmiths, and finesmiths'] },
  'Chicken-Butchers': { backgrounds: ['Guild Artisan'] , specialties: ['Cooks and bakers'] },
  'Pursemakers': { backgrounds: ['Guild Artisan'] , specialties: ['Weavers and dyers'] },
  'Woodsellers': { backgrounds: ['Guild Artisan'] , specialties: ['Woodcarvers, coopers, and bowyers'] },
  'Magic-Shops': { backgrounds: ['Guild Artisan'] , specialties: ['Alchemists and apothecaries'] },
  'Bookbinders': { backgrounds: ['Guild Artisan'] , specialties: ['Calligraphers, scribes, and scriveners'] },
  'Butchers': { backgrounds: ['Guild Artisan'] , specialties: ['Cooks and bakers'] },
  'Fishmongers': { backgrounds: ['Guild Artisan'] , specialties: ['Shipwrights and sailmakers'] },
  'Shipwrights': { backgrounds: ['Guild Artisan'] , specialties: ['Shipwrights and sailmakers'] },
  'Beer-Sellers': { backgrounds: ['Guild Artisan'] , specialties: ['Brewers, distillers, and vintners'] },
  'Buckle-Makers': { backgrounds: ['Guild Artisan'] , specialties: ['Armorers, locksmiths, and finesmiths'] },
  'Plasterers': { backgrounds: ['Guild Artisan'] , specialties: ['Masons and stonecutters'] },
  'Spice-Merchants': { backgrounds: ['Guild Artisan'] , specialties: ['Cooks and bakers'] },
  'Blacksmiths': { backgrounds: ['Guild Artisan'] , specialties: ['Smiths and metal-forgers'] },
  'Painters': { backgrounds: ['Guild Artisan'] , specialties: ['Painters, limners, and sign-makers'] },
  'Roofers': { backgrounds: ['Guild Artisan'] , specialties: ['Masons and stonecutters'] },
  'Locksmiths': { backgrounds: ['Guild Artisan'] , specialties: ['Armorers, locksmiths, and finesmiths'] },
  'Finesmiths': { backgrounds: ['Guild Artisan'] , specialties: ['Armorers, locksmiths, and finesmiths'] },
  'Bathers': { backgrounds: ['Guild Artisan'] , specialties: ['Potters and tile-makers'] },
  'Potters': { backgrounds: ['Guild Artisan'] , specialties: ['Potters and tile-makers'] },
  'Tilemakers': { backgrounds: ['Guild Artisan'] , specialties: ['Potters and tile-makers'] },
  'Ropemakers': { backgrounds: ['Guild Artisan'] , specialties: ['Leatherworkers, skinners, and tanners'] },
  'Inns': { backgrounds: ['Guild Artisan'] , specialties: ['Cooks and bakers'] },
  'Copyists': { backgrounds: ['Guild Artisan'] , specialties: ['Calligraphers, scribes, and scriveners'] },
  'Sculptors': { backgrounds: ['Guild Artisan'] , specialties: ['Masons and stonecutters'] },
  'Rugmakers': { backgrounds: ['Guild Artisan'] , specialties: ['Weavers and dyers'] },
  'Harness-Makers': { backgrounds: ['Guild Artisan'] , specialties: ['Armorers, locksmiths, and finesmiths'] },
  'Bleachers': { backgrounds: ['Guild Artisan'] , specialties: ['Weavers and dyers'] },
  'Hay-Merchants': { backgrounds: ['Guild Artisan'] , specialties: ['Tinkers, pewterers, and casters'] },
  'Cutlers': { backgrounds: ['Guild Artisan'] , specialties: ['Armorers, locksmiths, and finesmiths'] },
  'Glovemakers': { backgrounds: ['Guild Artisan'] , specialties: ['Leatherworkers, skinners, and tanners'] },
  'Woodcarvers': { backgrounds: ['Guild Artisan'] , specialties: ['Woodcarvers, coopers, and bowyers'] },
  'Booksellers': { backgrounds: ['Guild Artisan'] , specialties: ['Calligraphers, scribes, and scriveners'] },
  'Surveyors': { backgrounds: ['Guild Artisan'] , specialties: ['Cartographers, surveyors, and chart-makers'] },
  'Cartographers': { backgrounds: ['Guild Artisan'] , specialties: ['Cartographers, surveyors, and chart-makers'] },
  'Illuminators': { backgrounds: ['Guild Artisan'] , specialties: ['Tinkers, pewterers, and casters'] },
  'Master-Artists': { backgrounds: ['Guild Artisan'] , specialties: ['Painters, limners, and sign-makers'] },
  'Alchemists': { backgrounds: ['Sage'] , specialties: ['Alchemist'] },
  'Astronomers': { backgrounds: ['Sage'] , specialties: ['Astronomer'] },
  'Scribes': { backgrounds: ['Sage'] , specialties: ['Scribe'] },
  'Librarians': { backgrounds: ['Sage'] , specialties: ['Librarian'] },
  'Scholars': { backgrounds: ['Sage'] , specialties: ['Professor', 'Discredited academic', 'Researcher'] },
  'Apprentices': { backgrounds: ['Sage'] , specialties: ['Wizard\'s apprentice'] },
  'Advocates': { backgrounds: ['Sage'] , specialties: ['Scribe', 'Discredited academic', 'Researcher'] },
  'Healers': { backgrounds: ['Sage'] , specialties: ['Scribe'] },
  'Doctors': { backgrounds: ['Sage'] , specialties: ['Professor'] },
  'Clergy': { backgrounds: ['Acolyte'] , specialties: [] },
  'Priests': { backgrounds: ['Acolyte'] , specialties: [] },
  'Nobles': { backgrounds: ['Noble'] , specialties: ['Marquess/Marquise', 'Count/Countess', 'Viscount/Viscountess', 'Baron/Baroness', 'Baronet', 'Knight'] },
  'Guards': { backgrounds: ['Soldier'] , specialties: ['Officer', 'Scout', 'Infantry', 'Cavalry', 'Quartermaster', 'Standard bearer'] },
  'Urchins': { backgrounds: ['Urchin'] , specialties: [] },
  'Hermits': { backgrounds: ['Hermit'] , specialties: [] },
  'Folk-Heroes': { backgrounds: ['Folk Hero'] , specialties: [] },
  'Charlatans': { backgrounds: ['Charlatan'] , specialties: [] },
  'Criminals': { backgrounds: ['Criminal'] , specialties: [] },
  'Entertainers': { backgrounds: ['Entertainer'] , specialties: [] },
};

// these are used to determine the number of people required to obtain
// 1 of these industries, the resulting percentage is always a probability
// to affect the dice roll
const supportValues = {
  'Miners': 78,
  'Hunters': 54,
  'Produce-Farmers': 24,
  'Horse-Farmers': 98,
  'Cattle-Farmers': 34,
  'Poultry-Farmers': 31,
  'Pork-Farmers': 42,
  'Goatherders': 54,
  'Shepherders': 47,
  'Butlers': 2000,
  'Maidservants': 200,
  'Cooks': 200,
  'Groundskeepers': 200,
  'Chauffeurs': 2000,
  'Nannies': 400,
  'Bodyguards': 200,
  'Majordomos': 4000,
  'Cobblers': 150,
  'Shoemakers': 150,
  'Furriers': 250,
  'Tailors': 250,
  'Barbers': 350,
  'Jewelers': 400,
  'Taverns': 400,
  'Clothiers': 400,
  'Glassblowers': 400,
  'Pastrycooks': 500,
  'Masons': 500,
  'Carpenters': 550,
  'Weavers': 600,
  'Chandlers': 700,
  'Mercers': 700,
  'Coopers': 700,
  'Bakers': 800,
  'Watercarriers': 850,
  'Armorers': 950,
  'Scabbardmakers': 850,
  'Wine-Sellers': 800,
  'Tanners': 2000,
  'Skinners': 1000,
  'Leatherworkers': 1000,
  'Hatmakers': 950,
  'Saddlers': 1000,
  'Chicken-Butchers': 800,
  'Pursemakers': 1100,
  'Woodsellers': 2400,
  'Magic-Shops': 2800,
  'Bookbinders': 3000,
  'Butchers': 800,
  'Fishmongers': 1200,
  'Shipwrights': 2400,
  'Beer-Sellers': 1400,
  'Buckle-Makers': 1400,
  'Plasterers': 1400,
  'Spice-Merchants': 1400,
  'Blacksmiths': 1500,
  'Painters': 1500,
  'Roofers': 1800,
  'Locksmiths': 1900,
  'Finesmiths': 2400,
  'Bathers': 1900,
  'Potters': 1900,
  'Tilemakers': 1900,
  'Ropemakers': 1900,
  'Inns': 2000,
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
  'Surveyors': 1400,
  'Cartographers': 2800,
  'Illuminators': 3900,
  'Master-Artists': 60000,
  'Alchemists': 20000,
  'Astronomers': 40000,
  'Scribes': 4000,
  'Librarians': 6000,
  'Scholars': 8000,
  'Apprentices': 450,
  'Advocates': 650,
  'Healers': 450,
  'Doctors': 1000,
  'Clergy': 40,
  'Priests': 1200,
  'Nobles': 200,
  'Guards': 150,
  'Urchins': 320,
  'Hermits': 160,
  'Folk-Heroes': 60000,
  'Charlatans': 650,
  'Criminals': 350,
  'Entertainers': 1000,
};

// livestock distribution
const livestockValues = {
  multiplier: 1.8, // multiply human population by multiplier to determine livestock population
  
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
};

// types of prosperity
const prosperity = [
  'Booming',
  'Prosperous',
  'Poor',
  'Very Poor',
];

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

const defaults = {
  measurements,
  prosperity,
  terrains,
  terrainResources: {
    Coastal,
    Desert,
    'Flood Plains': FloodPlains,
    Forest,
    Grassland,
    Hills,
    Jungle,
    Lakes,
    Marsh,
    Mountains,
    Oasis,
    Plains,
    River,
    Snow,
    Tundra,
  },
  resources,
  advantages,
  supportValues,
  livestockValues,
};

module.exports = defaults;
