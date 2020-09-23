const {
  fetchAuthData,
  generateAccessTokenConfig,
  getUserDetails,
} = require('./utils');

const processGithubOauth = async function (req, res) {
  const { code } = req.query;
  const { sessions, db } = req.app.locals;
  const data = await fetchAuthData(generateAccessTokenConfig(code));
  const accessToken = data && data['access_token'];
  if (accessToken) {
    const userDetails = await getUserDetails(accessToken);
    await db.addUser(userDetails);
    const sessionId = sessions.createSession(userDetails);
    res.cookie('sId', sessionId);
  }
  res.redirect(`${process.env.reactServer}/`);
};

const isSignedIn = function (req, res) {
  const { sId } = req.cookies;
  const { sessions } = req.app.locals;
  const userSession = sessions.getSession(sId);
  if (userSession) {
    return res.json({ user: userSession });
  }
  res.json({ user: null });
};

const signIn = function (req, res) {
  const params = `client_id=${process.env.client_id}`;
  res.json({ href: `https://github.com/login/oauth/authorize?${params}` });
};

module.exports = { signIn, processGithubOauth, isSignedIn };
