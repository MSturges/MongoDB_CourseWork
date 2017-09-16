const express = require('express');
const app = express();

// for any http request using get rquest
// listen for this route 'http://localhost:3050/api'
// then call the call back


app.get('/api', (req, res) => {

  res.send({ hi: 'there' });
});

module.exports = app;
