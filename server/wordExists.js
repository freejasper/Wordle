const { possibleWords } = require('./possibleWords.js');

module.exports = function wordExists(guess) {
    if (possibleWords.includes(guess)) {
        return true;
    }
    return false;
}