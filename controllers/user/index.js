const signup = require('./signup');
const verify = require('./verify');
const repeatVerification = require('./repeatVerification');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const balance = require('./balance');
const addBalance = require('./addBalance');
const updateBalance = require('./updateBalance');

module.exports = {
  signup,
  login,
  logout,
  current,
  verify,
  repeatVerification,
  balance,
  addBalance,
  updateBalance,
};
