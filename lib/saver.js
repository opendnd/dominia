const path = require('path');
const fs = require('fs');
const questions = require('questions');
const colors = require('colors/safe');
const NodeZip = require('node-zip');

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
      process.stdout.write(colors.red('Error: File not found!'));
    }

    // validate the extension
    if (ext !== `.${fileExt}`) {
      valid = false;
      process.stdout.write(colors.red('Error: File not correct extension!'));
    }

    const zip = new NodeZip(fs.readFileSync(filepath), { base64: false, checkCRC32: true });

    if (Object.keys(zip.files).indexOf(fileName) < 0) {
      valid = false;
      process.stdout.write(colors.red('Error: File corrupt!'));
    }

    // only parse if valid
    if (valid) {
      const data = JSON.parse(zip.files[fileName]._data);
      return data;
    }

    return {};
  }

  static save(filepath = '', inputData = {}) {
    const zip = new NodeZip();
    zip.file(fileName, JSON.stringify(inputData));

    // write the file
    const data = zip.generate({ base64: false, compression: 'DEFLATE' });
    fs.writeFileSync(filepath, data, 'binary');
  }

  // a way to easily finish out the wizard
  static finish(outputDir, question, data, defaultName, cb) {
    // save the file or not
    questions.askOne({ info: colors.cyan(question) }, (result) => {
      if (result === 'y' || result === 'yes') {
        questions.askOne({ info: colors.cyan('filename'), required: false }, (name) => {
          name = (name.length >= 1) ? name : defaultName;

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
