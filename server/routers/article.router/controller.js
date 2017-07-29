class ArticleController {
    constructor(data) {
        this.data = data;
    }

    getCreateArticle(req, res) {
        // if (!req.isAuthenticated()) {
        //     res.status(401)
        //         .redirect('/unauthorized');
        // }

        return res.status(200)
            .render('articles/create');
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

    createAnArticle(req, res) {
        const bodyArticle = req.body;

        // if (bodyArticle) {
        //     throw new Error('User already exists');
        // }
        console.log(bodyArticle);
        return this.data.articles.create(bodyArticle, (err, result) => {
            console.log(result);
        })
            .then((done) => {
                return res.redirect('/');
            })
            .catch((err) => {
                throw new Error(`Error occurred: ${err}`);
            });
    }

    searchInArticles(req, res) {
        const bodyUser = req.body;

        // to be implemented
    }
}

const init = (data) => {
    return new ArticleController(data);
};

module.exports = { init };
