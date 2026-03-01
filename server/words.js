const fs = require('fs');
const path = require('path');

const wordsPath = path.join(__dirname, 'words.txt');
const words = fs
  .readFileSync(wordsPath, 'utf8')
  .split(/\r?\n/)
  .filter(w => w.length === 5);

module.exports = { words };