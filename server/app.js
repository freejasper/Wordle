const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { getAllUsers, addUser, updateUser, nextId, findUserById, findUserByDate, syncUsers } = require('./users.js');
const { readBackup, writeBackup } = require('./usersBackup.js');

// SELECT A WORD
const getWord = require('./getWord.js');

// CHECK IF GUESS IS A VALID WORD
const wordExists = require('./wordExists.js');

// FORMAT STRING
function formatString(input) {
    if (typeof input !== 'string') return;
    return input.toLowerCase().trim();
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let dailyWord = getWord();

cron.schedule('0 0 * * *', () => {
    dailyWord = getWord();

    try {
        async function writeToServer() {
            const userData = getAllUsers();
            await writeBackup(userData);
        }
        writeToServer();
        async function readFromServer() {
            const backupData = await readBackup();
            if (backupData) {
                syncUsers(backupData);
            }
        }
        readFromServer();
    } catch (err) {
        console.error('Error during sync:', err);
    }
}, {
    scheduled: true,
    timezone: 'Australia/Brisbane'
});

app.get('/api/word', (req, res) => {
    res.json({ dailyWord });
});

app.get('/api/checkWord/:guess', (req, res) => {
    const guess = req.params.guess
    if (!guess || guess.length > 5) res.status(400).json({ error: 'Invalid' });

    console.log('WORD:', dailyWord);
    console.log('GUESS:', guess);

    const response = {
        exists: false,
        correct: false,
        letterResults: []
    };

    // Check if guess is a valid word
    response.exists = wordExists(guess);
    console.log('EXISTS:', response.exists);

    // Check each word and return class modifications for each letter
    for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        const uLetter = letter.toUpperCase();
        if (dailyWord[i] === letter) {
            response.letterResults.push({[uLetter]: 'correct'});
        } else if (dailyWord.includes(letter)) {
            const regexp = new RegExp(letter, 'g');
            const matches = [...dailyWord.matchAll(regexp)];
            // If more than one match
            if (matches.length > 1) {
                response.letterResults.push({[uLetter]: 'present'});
            } else {
                // If one match
                // If the letter is correct in another position
                if (response.letterResults.some(item => item[uLetter] === 'correct')) {
                    response.letterResults.push({[uLetter]: 'absent'});
                } else if (response.letterResults.some(item => item[uLetter] === 'present')) {
                    response.letterResults.push({[uLetter]: 'absent'});
                } else {
                    response.letterResults.push({[uLetter]: 'present'});
                }
            }
        } else {
            response.letterResults.push({[uLetter]: 'absent'});
        }
    }
    console.log('LETTER RESULTS:', response.letterResults);

    const wordMatch = formatString(dailyWord) === formatString(guess);
    console.log('WORD MATCH:', wordMatch);

    // check if guess is correct
    if (response.exists && (formatString(dailyWord) === formatString(guess))) {
        response.correct = true;
    }

    res.json(response);
});

app.get('/api/getId', (req, res) => {
    res.json({ id: nextId() });
});

app.get('/api/history/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = findUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.get('/api/history/:id/:date', (req, res) => {
    const id = parseInt(req.params.id);
    const date = req.params.date;
    const userData = findUserByDate(id, date);
    if (userData) {
        res.json(userData);
    } else {
        res.status(404).json({ error: 'User or date not found' });
    }
});

app.post('/api/addUser', (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    const user = addUser(data);
    res.status(201).json(user);
});

app.put('/api/updateUser/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    const newUser = updateUser(id, data);
    console.log('Updated user:', newUser);
    res.status(200).json(newUser);
});


// app.get('/api/sync', (req, res) => {
//     try {
//         async function writeToServer() {
//             const userData = await getAllUsers();
//             console.log('SYNC: user data pre sync:', userData);
//             await writeBackup(userData);
//         }
//         writeToServer();
//         async function readFromServer() {
//             const backupData = await readBackup();
//             if (backupData) {
//                 await syncUsers(backupData);
//                 console.log('SYNC: backup data:', backupData);
//             }
//         }
//         readFromServer();
//         res.json({ message: 'Sync complete' });
//     } catch (err) {
//         console.error('Error during sync:', err);
//         res.status(500).json({ error: 'Sync failed' });
//     }
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});