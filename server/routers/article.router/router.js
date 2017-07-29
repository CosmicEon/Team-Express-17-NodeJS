const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/create', (req, res) => {
            return controller.getCreateArticle(req, res);
        })
        .post('/create', (req, res) => {
            return controller.createAnArticle(req, res);
        })
        .post('/search', (req, res) => {
            return controller.searchInArticles(req, res);
        })
        .get('/active', (req, res) => {
            return controller.getActiveArticles(req, res);
        })
        .get('/:id', (req, res) => {
            return controller.getArticle(req, res);
        });

    app.use('/articles', router);
};

module.exports = { attachTo };
