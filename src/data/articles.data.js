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

  getArticles(max) {
    return this.collection.find()
      .sort({ _id: -1 }) // -1 for reverse
      .limit(max)
      .toArray()
      .then((models) => {
        if (this.ModelClass.toViewModel) {
          return models.map((model) => this.ModelClass.toViewModel(model));
        }

        return models;
      });
  }

  getAllArticles() {
    return this.collection.find()
      .toArray()
      .then((data) => {
        return data;
      });
  }

  searchForArticles(name) {
    return this.collection.find({ title: name })
      .toArray()
      .then((models) => {
        if (this.ModelClass.toViewModel) {
          return models.map((model) => this.ModelClass.toViewModel(model));
        }

        return models;
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
