'use strict';

const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const mountMiddleware = require('./middleware');
const bodyParser = require("body-parser");
const request = require('request');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// app.use(bodyParser.json())

routes(app);
// mountMiddleware(app);
app.use(express.static(__dirname + '/../../src'));


const authServer = "http://localhost:4000";
app.post('/signin', (req, res) => {
  console.log('piping to `authServer`');
  let response = req.pipe(
    request.post(authServer + '/auth/local')
    ).pipe(res);
});

app.use('/profile', authenticateUser);


app.get('*', (req, res) => {
  console.log('got something...');
  res.sendFile(path.resolve(__dirname, '../../src/index.html'));
});


const server = app.listen(3000);

function authenticateUser(req, res, next) {
  console.log('authenticating...');
  let response = req.pipe(request.get('http://localhost:4000/auth/session'))
  response.on('response', function() {
    let statusCode = response.responseContent.statusCode;
    if (statusCode === 200) {
      next();
    } else {
      res.redirect('/sign-in');
    }
  });
}