const config = {
    server: {
        port: process.env.PORT || 8008, // process.env.PORT is used for heroku dynamic port generator
    },
    mongo: {
        url: 'mongodb://testuser:test1234@ds237475.mlab.com:37475/forum', // 'mongodb://localhost/forum'
    },
    passport: {
        secret: 'NodeJS Secret Key',
    },
    socketIO: {
        port: 8080, // default port for Socket.io?
    },
};

module.exports = config;
