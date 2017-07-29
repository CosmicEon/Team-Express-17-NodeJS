const attachTo = (app, data) => {
    app.get('/chat', (req, res) => {
        return res.status(200)
            .render('chat');
    });
};

module.exports = { attachTo };
