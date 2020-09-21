const axios = require('axios');

const sessions = {};
let sessionId = 0;

const clientID = process.env.client_id;
const clientSecret = process.env.client_secret;

const fetchAuthData = async function (config) {
  const response = await axios(config);
  return response.data;
};

const generateUserInfoConfig = function (accessToken) {
  return {
    url: 'https://api.github.com/user',
    headers: {
      Authorization: `token ${accessToken}`,
      accept: 'application/json',
    },
  };
};

const generateAccessTokenConfig = function (code) {
  return {
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
    headers: {
      accept: 'application/json',
    },
  };
};

const processGithubOauth = async function (req, res) {
  const code = req.url.split('=')[1];
  const data = await fetchAuthData(generateAccessTokenConfig(code));
  const accessToken = data && data['access_token'];
  if (accessToken) {
    res.cookie('sId', sessionId);
    sessions[sessionId] = accessToken;
    sessionId++;
    res.redirect(`${process.env.reactServer}`);
  }
};

const isSignedIn = function (req, res) {
  const { sId } = req.cookies;
  if (sessions[sId]) {
    return res.json({ isLoggedIn: true });
  }
  res.json({ isLoggedIn: false });
};

const signIn = function (req, res) {
  const params = `client_id=${process.env.client_id}`;
  res.json({ href: `https://github.com/login/oauth/authorize?${params}` });
};

module.exports = { signIn, processGithubOauth, isSignedIn };
