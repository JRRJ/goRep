'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');

console.log(__dirname);
app.use(express.static(__dirname + '/../../src'));
routes(app);



const server = app.listen(3000);