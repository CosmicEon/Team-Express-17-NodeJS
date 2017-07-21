/* globals __dirname */

const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const init = (data) => {
    const app = express();

    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Static libs
    app.use(express.static(path.join(__dirname, '../../node_modules/')));
    app.use(express.static(path.join(__dirname, '../../public')));

    // const staticsPath = path.join(__dirname, '../../public');
    // app.use('/public', express.static(staticsPath));

    app.use(cookieParser('keyboard cat'));
    // require('./config').applyTo(app);
    // require('./auth').applyTo(app, data);

    // app.use(require('connect-flash')());
    // app.use((req, res, next) => {
    //     res.locals.messages = require('express-messages')(req, res);
    //     next();
    // });

    require('./routers')
        .attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
