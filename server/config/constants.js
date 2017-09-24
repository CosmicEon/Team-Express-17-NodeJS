const config = {
    server: {
        port: 8008,
    },
    mongo: {
        url: 'mongodb://localhost/forum',
    },
    passport: {
        secret: 'NodeJS Secret Key',
    },
    socketIO: {
        port: 8080, // default port for Socket.io?
    },
};

module.exports = config;
