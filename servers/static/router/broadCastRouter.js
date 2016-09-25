'use strict'; 

const broadCastRouter = require('express').Router();
const { broadCastCtrl } = require('../controllers');

broadCastRouter.route('/');

module.exports = broadCastRouter;