/* globals __dirname */

const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const init = (data) => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views/'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Static libs
    app.use(express.static(path.join(__dirname, '../../public/')));
    app.use('/static', express.static('public'));

    app.use(cookieParser('keyboard cat'));

    require('./config/passport').applyTo(app, data);

    // app.use(require('connect-flash')());
    // app.use((req, res, next) => {
    //     res.locals.messages = require('express-messages')(req, res);
    //     next();
    // });

    require('./routers/routers')
        .attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
