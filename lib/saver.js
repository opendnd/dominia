'use strict';

const fs = require('fs');
const colors = require('colors/safe');

class Saver {
  static load(filepath = 'dominia.dom') {
    const ext = filepath.substr(filepath.length - 4);
    let valid = true;

    // validate the file
    if (!fs.existsSync(filepath)) {
      valid = false;
      console.log(colors.red('Error: File not found!'));
      return;
    }

    // validate the extension
    if (ext !== '.dom') {
      valid = false;
      console.log(colors.red('Error: File not correct extension!'));
      return;
    }

    const zip = new require('node-zip')(fs.readFileSync(filepath), { base64: false, checkCRC32: true });

    if (Object.keys(zip.files).indexOf('dominia.json') < 0) {
      valid = false;
      console.log(colors.red('Error: File corrupt!'));
      return;
    }

    const dominia = JSON.parse(zip.files['dominia.json']._data);
    return dominia;
  }

  static save(filepath = 'dominia.dom', dominia = {}) {
    const zip  = new require('node-zip')();
    zip.file('dominia.json', JSON.stringify(dominia));

    // write the file
    const data = zip.generate({ base64: false, compression: 'DEFLATE' });
    fs.writeFileSync(filepath, data, 'binary');

    return;
  }
}

module.exports = Saver;