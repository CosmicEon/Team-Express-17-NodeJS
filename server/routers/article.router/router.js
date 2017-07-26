const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    // const controller = require('./controller').init(data);

    router
        .get('/create', (req, res) => {
            if (!req.isAuthenticated()) {
                res.status(401)
                    .redirect('/unauthorized');
            }

            return res.status(200)
                .render('/article');
        })
        .post('/create', (req, res) => {
            return res.status(200)
                .render('/article');
        })
        .post('/search', (req, res) => {

        })
        .get('/active', (req, res) => {

        })

    app.use('/articles', router);
};

module.exports = { attachTo };
