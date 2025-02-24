const { saveFile } = require('./utils');
const _ = require('lodash');

const attachUser = async function (req, res, next) {
  const { sessions } = req.app.locals;
  req.user = sessions.getSession(req.cookies.sId);
  next();
};

const addPost = async function (req, res) {
  const { db } = req.app.locals;
  const image = req.files && req.files.file;
  console.log(image);
  const caption = req.body.caption || '';
  const path = await saveFile(image);
  const post = { caption, path, user: req.user, comments: [], likes: [] };
  await db.addPost(post);
  res.end();
};

const getAllPosts = async function (req, res) {
  const { db } = req.app.locals;
  const posts = await db.getList('posts');
  const postIds = await db.getKeys('posts');
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

const logout = function (req, res) {
  const { sId } = req.cookies;
  const { sessions } = req.app.locals;
  const status = sessions.deleteSession(sId);
  res.json({ status });
};

const toggleLike = async function (req, res) {
  const { postId } = req.params;
  const { db } = req.app.locals;
  const post = await db.getFromList('posts', postId);
  if (post.likes.includes(req.user.id)) {
    _.remove(post.likes, (id) => id == req.user.id);
  } else {
    post.likes.push(req.user.id);
  }
  await db.updateList('posts', post.postId, post);
  return res.json({ likes: post.likes });
};

const addComment = async function (req, res) {
  const { postId, comment } = req.body;
  const { db } = req.app.locals;
  const post = await db.getFromList('posts', postId);
  post.comments.unshift({ user: req.user.username, comment });
  await db.updateList('posts', post.postId, post);
  return res.end();
};

const getPost = async function (req, res) {
  const { postId } = req.params;
  const { db } = req.app.locals;
  const details = await db.getFromList('posts', postId);
  res.json(details);
};

module.exports = {
  addPost,
  attachUser,
  getAllPosts,
  getUser,
  getUsersPosts,
  logout,
  toggleLike,
  addComment,
  getPost,
};
