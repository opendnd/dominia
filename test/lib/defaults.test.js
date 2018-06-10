const expect = require('chai').expect;
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const defaults = require(path.join(libDir, 'defaults'));

describe('defaults', () => {
  it('loads from default', () => {
    expect(defaults).to.be.an('object');
  });

  it('has measurements', () => {
    expect(defaults.measurements).to.be.an('object');
  });
});
