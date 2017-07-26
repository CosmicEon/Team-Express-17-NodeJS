const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/register', (req, res) => {
            return controller.getRegisterForm(req, res);
        })
        .get('/login', (req, res) => {
            return controller.getLoginForm(req, res);
        })
        .post('/logout', (req, res) => {
            return controller.logout(req, res);
        })
        .post('/register', (req, res) => {
            return controller.register(req, res).redirect('/profiles');
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true,
        }));

    app.use('/users', router);
};

module.exports = { attachTo };