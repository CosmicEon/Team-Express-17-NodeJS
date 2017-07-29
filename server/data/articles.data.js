const { ObjectID } = require('mongodb');

class Articles {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Validation failed!');
        }
        return this.collection.insert(model)
            .then(() => {
                return model;
            });
    }

    getArticles(num) {
        return this.collection.find()
            .sort({ _id: 1 })
            .limit(num)
            .toArray()
            .then((models) => {
                console.log(models);
                if (this.ModelClass.toViewModel) {
                    return models.map(
                        (model) => this.ModelClass.toViewModel(model)
                    );
                }

                return models;
            });
    }

    getAllArticles() {
        return this.collection.find()
            .then((data) => {
                return data;
            });
    }

    _isModelValid(model) {
        if ('undefined' === typeof this.ObjectID ||
            'function' !== typeof this.ObjectID.isValid) {
            return true;
        }

        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = Articles;
