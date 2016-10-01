const authenticateUser = require('./authenticateUser');

module.exports = (app) => {
  app.use(authenticateUser);
}