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
    expect(dominia.generate()).to.be.an('object');
  });
});