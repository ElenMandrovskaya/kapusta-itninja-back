const { BadRequest, NotFound } = require('http-errors');
const { User } = require('../../models');
const { sendEmail, sendSuccessResponse } = require('../../utils');

const repeatVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest('Missing required field email');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound('User not found');
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const msg = {
    to: email,
    subject: 'Confirm Your Email',
    html: `
    <a href="http://localhost:3000/api/auth/verify/${user.verifyToken}" target="_blank">Let's confirm your email address</a>
    `,
  };

  await sendEmail(msg);
  sendSuccessResponse(res, { message: 'Verification email sent' }, 200);
};

module.exports = repeatVerification;
