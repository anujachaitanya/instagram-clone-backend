const express = require('express');
const { addPost, attachUser, getAllPosts } = require('./userHandlers');
const userRouter = express.Router();

userRouter.use(attachUser);
userRouter.get('/getPosts', getAllPosts);
userRouter.post('/post', addPost);

module.exports = { userRouter };
