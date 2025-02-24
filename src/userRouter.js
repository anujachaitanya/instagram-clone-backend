const express = require('express');
const {
  addPost,
  attachUser,
  getAllPosts,
  getUser,
  getUsersPosts,
  logout,
  toggleLike,
  addComment,
  getPost,
} = require('./userHandlers');
const userRouter = express.Router();

userRouter.use(attachUser);
userRouter.get('/getPosts', getAllPosts);
userRouter.get('/logout', logout);
userRouter.get('/getUser/:id', getUser);
userRouter.get('/toggleLike/:postId', toggleLike);
userRouter.get('/getUsersPosts/:id', getUsersPosts);
userRouter.get('/getPost/:postId', getPost);

userRouter.post('/addComment', addComment);
userRouter.post('/post', addPost);

module.exports = { userRouter };
