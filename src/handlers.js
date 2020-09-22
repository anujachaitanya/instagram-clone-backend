const {
  saveFile,
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
    const sessionId = sessions.createSession(userDetails.id);
    res.cookie('sId', sessionId);
  }
  res.redirect(`${process.env.reactServer}/`);
};

const isSignedIn = function (req, res) {
  const { sId } = req.cookies;
  console.log(req.cookies);
  if (req.app.locals.sessions.getSession(sId)) {
    return res.json({ isLoggedIn: true });
  }
  res.json({ isLoggedIn: false });
};

const signIn = function (req, res) {
  const params = `client_id=${process.env.client_id}`;
  res.json({ href: `https://github.com/login/oauth/authorize?${params}` });
};

module.exports = { signIn, processGithubOauth, isSignedIn };
