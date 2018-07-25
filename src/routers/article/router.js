const { Router } = require('express');

const attachTo = (app, data) => {
  const router = new Router();
  const controller = require('./controller').init(data);

  router
    .get('/create', (req, res) => controller.getCreateForm(req, res))
    .post('/create', (req, res) => controller.createAnArticle(req, res))
    .get('/search', (req, res) => controller.getSearchForm(req, res))
    .post('/search', (req, res) => controller.searchInArticles(req, res))
    .get('/active', (req, res) => controller.getActiveArticles(req, res))
    .get('/:id', (req, res) => controller.getArticle(req, res));

  app.use('/articles', router);
};

module.exports = { attachTo };
