const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const { sendSuccessResponse } = require('../../utils');

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });
  if (!user) {
    throw new Unauthorized('Not authorized');
  }
  sendSuccessResponse(res, null, 200);
};

module.exports = logout;
