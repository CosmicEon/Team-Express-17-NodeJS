const UsersData = require('./users.data');
const User = require('../models/user.model');
const Publications = require('./publications.data');
const Publication = require('../models/publication.model');

const init = (db) => {
    return Promise.resolve({
        // insert data models here
        users: new UsersData(db, User),
        publications: new Publications(db, Publication),
    });
};

module.exports = { init };
