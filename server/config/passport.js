const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo')(session);

const config = require('./config');

const applyTo = (app, data) => {
    passport.use(new LocalStrategy((username, password, done) => {
        data.users.checkPassword(username, password)
            .then(() => {
                return data.users.findByUsername(username);
            })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    }));

    app.use(session({
        store: new MongoStore({ url: config.mongo.url }),
        secret: config.passport.secret,
        resave: true,
        saveUninitialized: true,
    }));


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};

module.exports = { applyTo };
