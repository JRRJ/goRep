'use strict';

const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const mountMiddleware = require('./middleware');

routes(app);
// mountMiddleware(app);
app.use(express.static(__dirname + '/../../src'));

app.post('/login', authenticateUser, (req, res) => {
  let message = { user: req.user};
  res.redirect('/profile');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../src/index.html'));
});


const server = app.listen(3000);

function authenticateUser(req, res, next) {
  // TODO: check DB if user credentials are valid
  // for now -- default it to OK
  let userValid = true;
  let username = 'temp username';
  if (userValid) {
    req.user = username;
    next();
  } else {
    res.redirect('/login');
  }
}