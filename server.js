const config = require('./server/config/constants');
const open = require('open');

const asyncServerBoot = () => {
    return Promise.resolve();
};

asyncServerBoot()
    .then(() => require('./server/config/db').init(config.mongo.url))
    .then((db) => require('./server/data/data').init(db))
    .then((data) => require('./server/app').init(data))
    .then((app) => {
        app.listen(config.server.port, () => {
            console.log(`Server runs at port :${config.server.port}`);
            open(`http://localhost:${config.server.port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
