const signup = require('./signup');
const verify = require('./verify');
const repeatVerification = require('./repeatVerification');
const login = require('./login');
const logout = require('./logout');
const balance = require('./balance');
const addBalance = require('./addBalance');

module.exports = {
  signup,
  login,
  logout,
  verify,
  repeatVerification,
  balance,
  addBalance,
};
