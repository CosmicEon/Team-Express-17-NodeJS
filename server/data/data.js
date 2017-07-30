const UsersData = require('./users.data');
const User = require('../models/user.model');
const Articles = require('./articles.data');
const Article = require('../models/article.model');
const Sockets = require('./sockets.data');
const Socket = require('../models/socket.model');

const init = (db) => {
    return Promise.resolve({
        // insert data models here
        users: new UsersData(db, User),
        articles: new Articles(db, Article),
        sockets: new Sockets(db, Socket),
    });
};

module.exports = { init };
