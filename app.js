if (process.env.NODE_ENV !== 'test') process.env.NODE_ENV = 'dev';
const  DB_url  = process.env.DB_url || require('./config').DB_url
const mongoose = require('mongoose');
const app = require('express')();
const api = require('./utils/api route')

mongoose.connect(DB_url).then(() => console.log('DB connected'))

const { json } = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/api.route.js');

app.use(cors());
app.use(json());

app.use('/api', apiRouter);

app.get('/api', (req, res) => res.status(200).send(api))

app.use(({status, message}, req, res, next) => {
  if (status === 400) return res.status(400).send({message});
  if (status === 404) return res.status(404).send({message});
  res.status(500).send({message:'Internal server error'});
});

module.exports = app;