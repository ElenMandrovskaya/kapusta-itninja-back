const signup = require('./signup');
const google = require('./google');
const googleRedirect = require('./googleRedirect');
const getUserByEmail = require('./getUserByEmail');
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
  google,
  googleRedirect,
  getUserByEmail,
  login,
  logout,
  current,
  verify,
  repeatVerification,
  balance,
  addBalance,
  updateBalance,
};
