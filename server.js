const config = require('./server/config/config');

const asyncServerBoot = () => {
    return Promise.resolve();
};

asyncServerBoot()
    .then(() => require('./database/database').init(config.mongo.url))
    .then((db) => require('./server/data/data').init(db))
    .then((data) => require('./server/app').init(data))
    .then((app) => {
        app.listen(config.server.port, () =>
            console.log(`Server runs at port :${config.server.port}`));
    })
    .catch((err) => {
        console.log(err);
    });
