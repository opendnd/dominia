'use strict';

const path = require('path');
const fs = require('fs');
const questions = require('questions');
const colors = require('colors/safe');

// info
const fileExt = 'dom';
const fileName = 'dominia.json';

class Saver {
  static load(filepath = '') {
    const ext = filepath.substr(filepath.length - 4);
    let valid = true;

    // validate the file
    if (!fs.existsSync(filepath)) {
      valid = false;
      console.log(colors.red('Error: File not found!'));
      return;
    }

    // validate the extension
    if (ext !== `.${fileExt}`) {
      valid = false;
      console.log(colors.red('Error: File not correct extension!'));
      return;
    }

    const zip = new require('node-zip')(fs.readFileSync(filepath), { base64: false, checkCRC32: true });

    if (Object.keys(zip.files).indexOf(fileName) < 0) {
      valid = false;
      console.log(colors.red('Error: File corrupt!'));
      return;
    }

    const dominia = JSON.parse(zip.files[fileName]._data);
    return dominia;
  }

  static save(filepath = '', dominia = {}) {
    const zip  = new require('node-zip')();
    zip.file(fileName, JSON.stringify(dominia));

    // write the file
    const data = zip.generate({ base64: false, compression: 'DEFLATE' });
    fs.writeFileSync(filepath, data, 'binary');

    return;
  }

  // a way to easily finish out the wizard
  static finish(outputDir, question, data, cb) {
    // save the file or not
    questions.askOne({ info: colors.cyan(question) }, (result) => {
      if (result === 'y' || result === 'yes') {
        questions.askOne({ info: colors.cyan('filename'), required: false }, (name) => {
          name = (name.length >= 1) ? name : data.name;

          const filename = `${name}.${fileExt}`;
          const filepath = path.join(outputDir, filename);

          this.save(filepath, data);
          process.stdout.write(colors.green(`Saving... ${filepath}\n`));

          if (cb) cb(true);
        });
      } else {
        process.stdout.write(colors.white('Exited without save.\n'));
        if (cb) cb(false);
      }
    });
  }
}

module.exports = Saver;