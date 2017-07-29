/* globals __dirname */

const fs = require('fs');
const path = require('path');

// Router definition
const attachTo = (app, data) => {
    // Home route
    app.get('/', (req, res) => {
        return data.articles.getArticles(1)
            .then((item) => {
                return res.render('home', {
                    article: item,
                });
            });
    });

    // Other routes
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file + '/router');
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };

