class AuthController {
    constructor(data) {
        this.data = data;
    }

    getRegisterForm(req, res) {
        return res.status(200)
            .render('users/register');
    }
    getLoginForm(req, res) {
        return res.status(200)
            .render('users/login');
    }
    logout(req, res) {
        req.status(200)
            .logout();
        return res.redirect('/');
    }

    register(req, res) {
        const bodyUser = req.body;

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    // throw new Error('User already exists');
                    res.render('users/register');
                }

                return this.data.users.create(bodyUser, (err, result) => {
                    console.log(result);
                    console.log(err);
                });
            })
            .then((dbUser) => {
                return res.redirect('/users/login');
            })
            .catch((err) => {
                throw new Error(`Error occurred: ${err}`);
            });
    }
}

const init = (data) => {
    return new AuthController(data);
};

module.exports = { init };
