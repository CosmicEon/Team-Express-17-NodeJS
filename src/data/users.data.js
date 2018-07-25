const { ObjectID } = require('mongodb');

class UsersData {
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

  findById(id) {
    return this.collection.findOne({
      _id: new ObjectID(id),
    });
  }

  filterBy(props) {
    return this.collection.find(props)
      .toArray();
  }

  findByUsername(username) {
    return this
      .filterBy({ username: new RegExp(username, 'i') })
      .then(([user]) => user);
  }

  checkUser(username, password) {
    return this.findByUsername(username)
      .then((user) => {
        if (!user) {
          throw new Error('Invalid user');
        }

        if (user.password !== password) {
          throw new Error('Invalid password');
        }

        return true;
      });
  }

  _isModelValid(model) {
    if ('undefined' === typeof this.validator
      || 'function' !== typeof this.validator.isValid) {
      return true;
    }

    return this.validator.isValid(model);
  }

  _getCollectionName() {
    return this.ModelClass.name.toLowerCase() + 's';
  }
}

module.exports = UsersData;
