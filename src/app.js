const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();

const { signIn, processGithubOauth } = require('./handlers');

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.static('public'));
app.use(cookieParser());
app.get('/api/signIn', signIn);

app.get('/api');
app.use(express.static('public'));
app.get('/api/githubOauth', processGithubOauth);

module.exports = { app };
