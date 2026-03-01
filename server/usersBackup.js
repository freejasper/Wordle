const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, 'dataBackup.json');

async function readBackup() {
  try {
    const data = await fs.readFile(usersPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading backup:', err);
  }
}

async function writeBackup(data) {
  try {
    await fs.writeFile(usersPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing backup:', err);
  }
}

module.exports = { readBackup, writeBackup };