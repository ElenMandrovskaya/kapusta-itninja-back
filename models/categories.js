const { Schema, model } = require('mongoose');
const Joi = require('joi');

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of category is required'],
    },
    typeOfOperation: {
      type: Boolean,
      required: [true, 'Type of operation is required'],
      default: false,
    },
    icon: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

const categorySchemaJoi = Joi.object({
  name: Joi.string().required(),
  typeOfOperation: Joi.boolean(),
  icons: Joi.string(),
});

const Category = model('category', categorySchema);

module.exports = {
  categorySchemaJoi,
  Category,
};
