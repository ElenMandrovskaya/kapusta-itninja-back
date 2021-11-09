const { Schema, model } = require('mongoose');
const Joi = require('joi');

const transactionSchema = Schema(
  {
    date: {
      day: String,
      month: String,
      year: String,
    },
    description: {
      type: String,
      required: [true, 'This field is required'],
    },
    value: {
      type: Number,
      required: [true, 'This field is required'],
      default: 0.0,
    },
    expenses: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, 'This field is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const transactionsSchemaJoi = Joi.object({
  date: Joi.object({
    day: Joi.string(),
    month: Joi.string(),
    year: Joi.string(),
  }),
  description: Joi.string().required(),
  value: Joi.number().required(),
  category: Joi.string(),
  expenses: Joi.boolean(),
});

const Transaction = model('transaction', transactionSchema);

module.exports = {
  transactionsSchemaJoi,
  Transaction,
};
