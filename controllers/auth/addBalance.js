const { User } = require('../../models');
const { BadRequest, NotFound } = require('http-errors');
const { sendSuccessResponse } = require('../../utils');

const addBalance = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;

  const user = await User.findById(_id);

  if (!user) {
    throw new NotFound(`User not found`);
  }
  if (!user.verify) {
    throw new BadRequest('Email is not verify');
  }
  await User.findByIdAndUpdate(_id, { balance });
  sendSuccessResponse(res, { balance }, 200);
};

module.exports = addBalance;
