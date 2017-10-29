const config = {
    server: {
        port: 8008,
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
