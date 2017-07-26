const attachTo = (app, data) => {
    app.get('/publication', (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(401)
                .redirect('/unauthorized');
        }

        return res.status(200)
            .render('/publication');
    });
};

module.exports = { attachTo };
