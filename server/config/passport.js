const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo')(session);

const config = require('../../config/config');

const applyTo = (app, data) => {
    passport.use(new LocalStrategy((username, password, done) => {
        console.log(username + "|" + password);
        data.users.checkUser(username, password)
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
        saveUninitialized: true,
        resave: true,
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
};

module.exports = { applyTo };
