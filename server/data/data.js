const UsersData = require('./users.data');
const User = require('../models/user.model');
const Articles = require('./articles.data');
const Article = require('../models/article.model');

const init = (db) => {
    return Promise.resolve({
        // insert data models here
        users: new UsersData(db, User),
        publications: new Articles(db, Article),
    });
};

module.exports = { init };
