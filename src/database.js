class Database {
  constructor(db) {
    this.db = db;
  }

  getList(key) {
    return new Promise((resolve, reject) => {
      this.db.hgetall(key, (err, data) => {
        console.log('here', data);
        resolve(data);
      });
    });
  }

  getFromList(key, field) {
    return new Promise((resolve, reject) => {
      this.db.hget(key, field, (err, task) => {
        err && reject(reject);
        resolve(task);
      });
    });
  }

  addUser(details) {
    return new Promise((resolve, reject) => {
      console.log(details);
      this.db.hset('users', details.id, JSON.stringify(details), (err) => {
        err && reject(err);
        resolve(true);
      });
    });
  }

  pushTo(key, field, value) {
    return new Promise((resolve, reject) => {
      this.db.hset(key, field, value, (err, number) => {
        err && reject(err);
        resolve(number);
      });
    });
  }

  IncrementId(key) {
    return new Promise((resolve, reject) => {
      this.db.incr(key, (err, number) => {
        err && reject(err);
        resolve(number);
      });
    });
  }
}

module.exports = Database;
