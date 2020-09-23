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

  getFromList(key, field) {
    return new Promise((resolve, reject) => {
      this.db.hget(key, field, (err, data) => {
        err && reject(reject);
        resolve(JSON.parse(data));
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
        this.db.hset('posts', id, JSON.stringify(post), (err) => {
          err && reject(err);
          resolve(true);
        });
      });
    });
  }
}

module.exports = Database;
