const UserData = require('./user.data');

const init = (db) => {
    return Promise.resolve({
        // insert all data models here
        users: new UserData(db),
    });
};

module.exports = { init };
