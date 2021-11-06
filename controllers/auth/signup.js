const { User } = require('../../models');
const { Conflict } = require('http-errors');
const { nanoid } = require('nanoid');
// const gravatar = require("gravatar");
const { sendEmail, sendSuccessResponse } = require('../../utils');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }

  const newUser = new User({ name, email });
  newUser.setVerifyToken(nanoid(10));
  newUser.setPassword(password);
  // newUser.setAvatar(gravatar.url(email));

  const { verifyToken } = await newUser.save();

  const msg = {
    to: email,
    subject: 'Confirm Your Email',
    html: `
      <a href="http://localhost:4000/api/auth/verify/${verifyToken}" target="_blank">Let's confirm your email address</a>
      `,
  };

  await sendEmail(msg);
  sendSuccessResponse(res, { name, email, verifyToken }, 201);
};

module.exports = signup;
