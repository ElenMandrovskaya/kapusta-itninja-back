const { NotFound } = require('http-errors');
const { User } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });
  if (!user) {
    throw new NotFound('User not found');
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  sendSuccessResponse(res, { message: 'Verification successful' }, 200);
};

module.exports = verify;
