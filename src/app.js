const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const Database = require('./database');
const Sessions = require('./session');
const { userRouter } = require('./userRouter');
const { getRedisClient } = require('./redisClient');

const { signIn, processGithubOauth, isSignedIn } = require('./handlers');

const app = express();
app.locals.db = new Database(getRedisClient());
app.locals.sessions = new Sessions();

app.use(express.static(`${__dirname}/../build`));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use('/image', express.static(`${__dirname}/..public/posts`));
app.use(express.static(`${__dirname}/..public`));
app.use(cookieParser());
app.use('/api/user', userRouter);

app.get('/api/signIn', signIn);
app.get('/api/isSignedIn', isSignedIn);
app.get('/api/githubOauth', processGithubOauth);

module.exports = { app };
