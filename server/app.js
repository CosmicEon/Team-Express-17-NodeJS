/* globals __dirname */

const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

const config = require('../config/config');

const init = (data) => {
    const app = express();

    const server = require('http').createServer(app); // !
    const io = require('socket.io')(server); // !
    server.listen(80);

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views/'));

    // Static libs
    app.use(express.static(path.join(__dirname, '../../public/')));
    app.use('/static', express.static('public'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());
    //app.use(session({ secret: config.passport.secret, saveUninitialized: true, resave: true })); // !
    app.use(session({
        store: new MongoStore({ url: config.mongo.url }),
        secret: config.passport.secret,
        saveUninitialized: true,
        resave: true,
    }));
    app.use(flash());

    require('./config/passport').applyTo(app, data);
    require('./config/socket.io').applyTo(io, data);

    require('./routers/routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
