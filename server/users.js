// DATA STRUCTURE FOR USERS
// { id: userId, 
//   history: {
//         date: { 
//          wordFound: Boolean,
//          currentGuess: Number,
//          inputs: Array,
//          inputStatus: Array,
//          alphabet: Object
//         }
//    }
// }

const users = [];

const id = users.length + 1;

function getAllUsers() {
    return users;
}

function addUser(data) {
    const user = { id, ...data };
    users.push(user);
    return user;
}

function findUserById(id) {
    return users.find(user => user.id === id);
}

function findUserByDate(id, date) {
    const user = findUserById(id);
    if (user && user.history && user.history[date]) {
        return user.history[date];
    }
}

function updateUser(id, data) {
    const user = findUserById(id);
    if (user) {
        const userIndex = users.indexOf(user);
        users[userIndex] = { ...users[userIndex], ...data };
    }
    console.log('Updated users array:', users);
    return user;
}

function syncUsers(data) {
    users.length = 0;
    users.push(...data);
}

function nextId() {
    return id;
}

module.exports = { getAllUsers,addUser, updateUser, nextId, findUserById, findUserByDate, syncUsers };