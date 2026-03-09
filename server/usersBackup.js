const fs = require('fs').promises;
const path = require('path');

const usersPath = path.join(__dirname, 'dataBackup.json');

async function readBackup() {
  try {
    const data = await fs.readFile(usersPath, 'utf-8');
    if (!data || data.trim() === '') {
      console.log('Backup file is empty, returning []');
      return [];
    }
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