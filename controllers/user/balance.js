const { User } = require('../../models');
const { BadRequest, NotFound } = require('http-errors');
const { sendSuccessResponse } = require('../../utils');

const balance = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    throw new NotFound(`User not found`);
  }
  if (!user.verify) {
    throw new BadRequest('Email is not verify');
  }
  const { balance } = user;
  sendSuccessResponse(res, { balance });
};

module.exports = balance;
