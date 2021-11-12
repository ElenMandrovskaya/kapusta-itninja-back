const { BadRequest, NotFound } = require('http-errors');
const { User } = require('../../models');
const { sendEmail, sendSuccessResponse } = require('../../utils');

const repeatVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest('Missing required field email');
  }

  const user = await User.findOne({ email });
  const { name, verifyToken } = user;

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
      <h2>Hi ${name}</h2>
  <p>We just need to verify your email address before you can access Kapu$ta.</p>

  <p>Verify your email address</p>
  <a href="https://kapusta-finance-tracker.herokuapp.com/api/user/verify/${verifyToken}" target="_blank">Let's confirm your email address</a>

  <p>Thanks! &#8211; The ItNinja team</p>
      `,
  };

  await sendEmail(msg);
  sendSuccessResponse(res, { message: 'Verification email sent' }, 200);
};

module.exports = repeatVerification;
