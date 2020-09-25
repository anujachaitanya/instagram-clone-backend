const fs = require('fs');
const axios = require('axios');

const clientID = process.env.client_id;
const clientSecret = process.env.client_secret;
const saveFile = function (file) {
  console.log(fs.readdirSync(`${__dirname}/../public/posts`), __dirname);
  console.log(file);
  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/../public/posts/${file.md5}`, file.data, () =>
      resolve(`/image/${file.md5}`)
    );
  });
};

const fetchAuthData = async function (config) {
  const response = await axios(config);
  return response.data;
};

const getUserDetails = async function (token) {
  const data = await fetchAuthData(generateUserInfoConfig(token));
  return { username: data.login, avatarUrl: data.avatar_url, id: data.id };
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

module.exports = {
  saveFile,
  getUserDetails,
  fetchAuthData,
  generateAccessTokenConfig,
};
