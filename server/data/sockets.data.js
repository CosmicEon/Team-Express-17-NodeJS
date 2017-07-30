class Sockets {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    initCollection() {
        return this.collection;
    }

    create(model) {
        console.log(this.validator);
        if (!this._isModelValid(model)) {
            return Promise.reject('Validation failed!');
        }

        return this.collection.insert(model)
            .then(() => {
                return model;
            });
    }

    _isModelValid(model) {
        if ('undefined' === typeof this.validator ||
            'function' !== typeof this.validator.isValid) {
            return true;
        }

        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = Sockets;
