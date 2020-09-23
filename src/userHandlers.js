const { saveFile } = require('./utils');

const attachUser = async function (req, res, next) {
  const { sessions } = req.app.locals;
  req.user = sessions.getSession(req.cookies.sId);
  next();
};

const addPost = async function (req, res) {
  const { db } = req.app.locals;
  const image = req.files && req.files.file;
  const caption = req.body.caption || '';
  const path = await saveFile(image);
  const post = { caption, path, user: req.user, comments: [] };
  await db.addPost(post);
  res.end();
};

const getAllPosts = async function (req, res) {
  const { db } = req.app.locals;
  const posts = await db.getList('posts');
  res.json(posts);
};

const getUser = async function (req, res) {
  const { id } = req.params;
  const { db } = req.app.locals;
  const details = await db.getFromList('users', id);
  res.json(details);
};

const getUsersPosts = async function (req, res) {
  const { id } = req.params;
  const { db } = req.app.locals;
  const posts = await db.getList('posts');
  const userPosts = Object.values(posts).filter((post) => {
    return JSON.parse(post).user.id == id;
  });
  console.log(userPosts);
  res.json(userPosts);
};

module.exports = { addPost, attachUser, getAllPosts, getUser, getUsersPosts };
