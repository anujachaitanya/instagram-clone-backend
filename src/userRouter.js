const express = require('express');
const { addPost } = require('./userHandlers');
const userRouter = express.Router();

userRouter.post('/post', addPost);

module.exports = { userRouter };
