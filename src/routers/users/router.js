const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
  const router = new Router();
  const controller = require('./controller').init(data);

  router
    .get('/register', (req, res) => controller.getRegisterForm(req, res))
    .post('/register', (req, res) => controller.register(req, res))
    .get('/login', (req, res) => controller.getLoginForm(req, res))
    .post('/login', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true,
    }))
    .post('/logout', (req, res) => controller.logout(req, res));

  app.use('/users', router);
};

module.exports = { attachTo };
