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

module.exports = { addPost, attachUser, getAllPosts };
