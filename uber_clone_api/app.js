const express = require('express');
const app = express();
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/uber');
}

app.use(bodyParser.json());
routes(app);


// error handeling middnleware
app.use((err, req, res, next) => {
  console.log(err)

  res.status(422).send({ error: err.message });
});

module.exports = app;
