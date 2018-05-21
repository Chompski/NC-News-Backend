if (process.env.NODE_ENV !== 'test') process.env.NODE_ENV = 'dev';
const {DB_url} = require('./config')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(DB_url).then(() => console.log('DB connected'))

const { json } = require('body-parser');
const apiRouter = require('./routes/api.route.js');

app.use(json());

app.use('/api', apiRouter);



module.exports = app;