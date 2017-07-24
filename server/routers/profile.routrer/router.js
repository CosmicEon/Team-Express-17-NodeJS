const attachTo = (app, data) => {
    app.get('/profile', (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(401)
                .redirect('/unauthorized');
        }

        return res.status(200)
            .render('/profile');
    });
};

module.exports = { attachTo };
