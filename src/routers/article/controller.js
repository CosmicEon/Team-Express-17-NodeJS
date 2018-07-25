class ArticleController {
  constructor(data) {
    this.data = data;
  }

  getCreateForm(req, res) {
    return res.status(200)
      .render('articles/create');
  }

  createAnArticle(req, res) {
    const bodyArticle = req.body;

    return this.data.articles.create(bodyArticle, (err, result) => {
    })
      .then((done) => {
        return res.redirect('/');
      })
      .catch((err) => {
        throw new Error(`Error occurred: ${err}`);
      });
  }

  getSearchForm(req, res) {
    return res.status(200)
      .render('articles/search');
  }

  searchInArticles(req, res) {
    const searchedItem = req.body;
    return this.data.articles.searchForArticles(searchedItem)
      .then((items) => {
        return res.render('articles/result', {
          articles: items,
        });
      });
  }

  getActiveArticles(req, res) {
    return this.data.articles.getArticles(5)
      .then((items) => {
        return res.render('articles/active', {
          articles: items,
        });
      });
  }

  getArticle(req, res) {
    this.data.articles.findById(req.params.id, (err, article) => {
      res.render('article', {
        article: article,
      });
    });
  }
}

const init = (data) => {
  return new ArticleController(data);
};

module.exports = { init };
