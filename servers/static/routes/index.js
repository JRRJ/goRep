'use strict';

const { broadCastRouter } = require('../router');

module.exports = function mountRoutes(app) {
  app.use('/broadcast', broadCastRouter);
}