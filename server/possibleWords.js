const fs = require('fs');
const path = require('path');

const possibleWordsPath = path.join(__dirname, 'possibleWords.txt');
const possibleWords = fs
  .readFileSync(possibleWordsPath, 'utf8')
  .split(/\r?\n/)
  .filter(w => w.length === 5);

module.exports = { possibleWords };