const attachTo = (app, data) => {
  app.get('/profile/:id', (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(401)
        .redirect('/unauthorized');
    }

    return data.users.findById(req.params.id, (err, user) => {
      res.status(200).render('profile', {
        profile: user,
      });
    });
  });
};

module.exports = { attachTo };
