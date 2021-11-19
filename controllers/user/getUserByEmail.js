const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user || !user.google) {
    throw new Unauthorized('Email or password is wrong');
  }

  sendSuccessResponse(res, { user }, 200);
};

module.exports = getUserByEmail;
