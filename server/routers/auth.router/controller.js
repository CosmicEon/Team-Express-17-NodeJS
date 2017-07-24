class AuthController {
    constructor(data) {
        this.data = data;
    }

    getRegisterForm(req, res) {
        return res.render('auth/register');
    }
    getLoginForm(req, res) {
        return res.render('auth/login');
    }
    logout(req, res) {
        req.logout();
        return res.redirect('/');
    }

    register(req, res) {
        const bodyUser = req.body;

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }

                return this.data.users.create(bodyUser);
            })
            .then((dbUser) => {
                return res.redirect('/auth/login');
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
