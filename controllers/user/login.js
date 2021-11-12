const { User } = require('../../models');
const { BadRequest, Unauthorized } = require('http-errors');
const { sendSuccessResponse } = require('../../utils');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong');
  }

  if (!user.verify) {
    throw new BadRequest('Email is not verify');
  }

  const { name, balance } = user;
  console.log(name);

  const token = user.createToken();
  await User.findByIdAndUpdate(user._id, { token });
  sendSuccessResponse(res, { token, user: { name, email, balance } });
};

module.exports = login;
