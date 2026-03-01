const { words } = require('./words.js');

module.exports = function getWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}