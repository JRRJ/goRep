'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.static(__dirname + '../src'));
routes(app);



const server = app.listen(300);