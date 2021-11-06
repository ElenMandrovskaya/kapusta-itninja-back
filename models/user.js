const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { SECRET_KEY } = process.env;

// const passwordRegexp =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      minlength: 3,
      default: 'Guest',
    },
    password: {
      type: String,
      // match: [
      //   passwordRegexp,
      //   'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length',
      // ],
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    // avatarUrl: {
    //   type: String,
    // },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    balance: {
      type: Number,
      default: 0.0,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  };

  return jwt.sign(payload, SECRET_KEY);
};

// userSchema.methods.setAvatar = function (avatar) {
//   this.avatarUrl = avatar;
// };

userSchema.methods.setVerifyToken = function (verifyToken) {
  this.verifyToken = verifyToken;
};

const userSchemaJoi = Joi.object({
  name: Joi.string().min(3),
  password: Joi.string()
    // .regex(
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    //   'Passsword must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length',
    // )
    .required(),
  email: Joi.string().email().required(),
  balance: Joi.number(),
});

const User = model('user', userSchema);

module.exports = {
  userSchemaJoi,
  User,
};
