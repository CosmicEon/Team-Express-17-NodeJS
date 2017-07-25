/* globals process */

const config = {
    server: {
        port: process.env.PORT || 8080,
    },
    mongo: {
        url: process.env.MONGO_DB_URI || 'mongodb://localhost/data',
    },
    passport: {
        secret: 'hidden key',
    },
};

module.exports = config;
