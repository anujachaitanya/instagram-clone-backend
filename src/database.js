const { values } = require('lodash');

class Database {
  constructor(db) {
    this.db = db;
  }

  incrementPostId() {
    return new Promise((resolve, reject) => {
      this.db.incr('postid', (err, number) => {
        err && reject(err);
        resolve(number);
      });
    });
  }

  getList(key) {
    return new Promise((resolve, reject) => {
      this.db.hgetall(key, (err, data) => {
        resolve(data);
      });
    });
  }

  getKeys(key) {
    return new Promise((resolve, reject) => {
      this.db.hkeys(key, (err, data) => {
        resolve(data);
      });
    });
  }

  getFromList(key, field) {
    return new Promise((resolve, reject) => {
      this.db.hget(key, field, (err, data) => {
        err && reject(reject);
        resolve(JSON.parse(data));
      });
    });
  }

  updateList(key, field, value) {
    return new Promise((resolve, reject) => {
      this.db.hset(key, field, JSON.stringify(value), (err) => {
        err && reject(err);
        resolve(true);
      });
    });
  }

  addUser(details) {
    return new Promise((resolve, reject) => {
      this.db.hset('users', details.id, JSON.stringify(details), (err) => {
        err && reject(err);
        resolve(true);
      });
    });
  }

  addPost(post) {
    return new Promise(async (resolve, reject) => {
      this.incrementPostId().then((id) => {
        this.db.hset(
          'posts',
          id,
          JSON.stringify({ postId: id, ...post }),
          (err) => {
            err && reject(err);
            resolve(true);
          }
        );
      });
    });
  }
}

module.exports = Database;
