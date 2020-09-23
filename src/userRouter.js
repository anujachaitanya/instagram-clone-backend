const express = require('express');
const {
  addPost,
  attachUser,
  getAllPosts,
  getUser,
  getUsersPosts,
  logout,
} = require('./userHandlers');
const userRouter = express.Router();

userRouter.use(attachUser);
userRouter.get('/getPosts', getAllPosts);
userRouter.get('/logout', logout);
userRouter.post('/post', addPost);
userRouter.get('/getUser/:id', getUser);
userRouter.get('/getUsersPosts/:id', getUsersPosts);

module.exports = { userRouter };
