const async = () => {
    return Promise.resolve();
};

const config = require('./config');

async()
    .then(() => require('./db').init(config.mongo.url))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.server.port, () =>
            console.log(`Server runs at port :${config.server.port}`));
    })
    .catch((err) => {
        console.log(err);
    });
