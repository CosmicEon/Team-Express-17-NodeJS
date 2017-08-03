/* globals __dirname */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morgan = require('morgan');

const config = require('../config/config');

const init = (data) => {
    const app = express();

    // Load Morgan -> HTTP request logger
    app.use(morgan('combined'));

    // Load Socket.IO
    const server = require('http').createServer(app); // !
    const io = require('socket.io')(server); // !
    server.listen(config.socketIO.port, () => {
        console.log(`Socket.IO started on port :${config.socketIO.port}`);
    });

    // Load View Engine
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views/'));

    // Load Static Content
    app.use(express.static(path.join(__dirname, '../../public/')));
    app.use('/public', express.static('public'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(flash());

    require('./config/socket.io').applyTo(io, data);
    require('./config/passport').applyTo(app, data);

    require('./routers/routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
