class Session {
  constructor() {
    this.sessions = {};
    this.id = 0;
  }

  createSession(userId) {
    this.id++;
    this.sessions[this.id] = userId;
    return this.id;
  }

  getSession(sessionId) {
    return this.sessions[sessionId];
  }

  deleteSession(sessionId) {
    delete this.sessions[sessionId];
    return true;
  }
}

module.exports = Session;
