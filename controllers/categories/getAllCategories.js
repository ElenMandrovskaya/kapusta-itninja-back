const { NotFound } = require('http-errors');
const { Category } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getAllCategories = async (req, res) => {
  const categories = await Category.find({}, 'name');

  if (!categories) {
    throw new NotFound(`Categories not found`);
  }

  sendSuccessResponse(res, { categories });
};

module.exports = getAllCategories;
