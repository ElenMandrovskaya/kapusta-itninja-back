const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');
const { User } = require('../models');

require('dotenv').config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    });
    return;
  }
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw new Unauthorized('Not authorized');
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(_id);
    if (!user.token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Unauthorized('Not authorized');
  }
};

module.exports = authenticate;
