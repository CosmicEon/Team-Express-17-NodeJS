const async = () => {
    return Promise.resolve();
};

const config = require('./config/config');

async()
    .then(() => require('./db/db').init(config.mongo.url))
    .then((db) => require('./data/data').init(db))
    .then((data) => require('./server/app').init(data))
    .then((app) => {
        app.listen(config.server.port, () =>
            console.log(`Server runs at port :${config.server.port}`));
    })
    .catch((err) => {
        console.log(err);
    });
