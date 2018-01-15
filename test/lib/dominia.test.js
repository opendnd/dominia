/* eslint-disable */

const expect = require('chai').expect;
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const Dominia = require(path.join(libDir, 'dominia'));
let dominia;

describe('Dominia', () => {
  before(() => {
    dominia = new Dominia();
  });

  it('can generate', () => {
    const domain = dominia.generate();

    expect(domain).to.be.an('object');
    expect(domain.scale).to.be.a('string');
    expect(domain.size).to.be.a('string');
    expect(domain.name).to.be.a('string');
    expect(domain.terrain).to.be.a('string');
    expect(domain.population).to.be.an('object');
    expect(domain.demographics).to.be.an('object');
    expect(domain.resources).to.be.an('array');
  });

  it('can generate a hamlet', () => {
    const hamlet = dominia.generate({ size: 'hamlet' });

    expect(hamlet).to.be.an('object');
    expect(hamlet.size).to.eq('hamlet');
  });

  it('can generate a village', () => {
    const village = dominia.generate({ size: 'village' });

    expect(village).to.be.an('object');
    expect(village.size).to.eq('village');
  });

  it('can generate a town', () => {
    const town = dominia.generate({ size: 'town' });

    expect(town).to.be.an('object');
    expect(town.size).to.eq('town');
  });

  it('can generate a city', () => {
    const city = dominia.generate({ size: 'city' });

    expect(city).to.be.an('object');
    expect(city.size).to.eq('city');
  });

  it('can generate a capital', () => {
    const capital = dominia.generate({ size: 'capital' });

    expect(capital).to.be.an('object');
    expect(capital.size).to.eq('capital');
  });

  it('can generate a county', () => {
    const county = dominia.generate({ size: 'county' });

    expect(county).to.be.an('object');
    expect(county.size).to.eq('county');
  });

  it('can generate a duchy', () => {
    const duchy = dominia.generate({ size: 'duchy' });

    expect(duchy).to.be.an('object');
    expect(duchy.size).to.eq('duchy');
  });

  it('can generate a kingdom', () => {
    const kingdom = dominia.generate({ size: 'kingdom' });

    expect(kingdom).to.be.an('object');
    expect(kingdom.size).to.eq('kingdom');
  });
});