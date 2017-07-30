/* globals process */

const config = {
    server: {
        port: process.env.PORT || 8080,
    },
    mongo: {
        url: process.env.MONGO_DB_URI || 'mongodb://localhost/forum',
    },
    passport: {
        secret: 'NodeJS Secret Key',
    },
    socketIO: {
        port: 80, // default port for Socket.io
    },
};

module.exports = config;
