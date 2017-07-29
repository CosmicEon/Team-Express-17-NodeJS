/* globals __dirname */

const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const config = require('../config/config');

const init = (data) => {
    const app = express();

    const server = require('http').createServer(express); // !
    const io = require('socket.io').listen(server); // !

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views/'));

    // Static libs
    app.use(express.static(path.join(__dirname, '../../public/')));
    app.use('/static', express.static('public'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());
    app.use(session({ secret: config.passport.secret, saveUninitialized: true, resave: true })); // !

    require('./config/passport').applyTo(app, data);

    require('./config/socket.io').applyTo(io, data);

    require('./routers/routers').attachTo(app, data);

    app.use(flash());
    return Promise.resolve(app);
};

module.exports = {
    init,
};
