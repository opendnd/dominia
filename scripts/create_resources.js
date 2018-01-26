const fs = require('fs');
const xlsx = require('node-xlsx');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const scriptsDir = path.join(rootDir, 'scripts');

// get the worksheet
const worksheets = xlsx.parse(path.join(scriptsDir, 'Resources.xlsx'));
const data = worksheets[0].data;
const headers = data[0];

const items = {};

// setup the items through the headers
headers.forEach((header, i) => {
  if (header === 'MASTER') return;
  items[header] = {
    dice: data[1][i],
    resources: [],
  };
});

// iterate through the data and build items
data.slice(2, data.length).forEach((row) => {
  row.forEach((col, i) => {
    const header = headers[i];
    if (header === 'MASTER') return;

    items[header].resources.push(col);
  });
});

// iterate on the built items
Object.keys(items).forEach((header) => {
  const item = items[header];
  const filename = header.toLowerCase().replace(' ', '-');
  console.log(`Writing ${header}...`);
  fs.writeFileSync(`resources-${filename}.json`, JSON.stringify(item));
});
