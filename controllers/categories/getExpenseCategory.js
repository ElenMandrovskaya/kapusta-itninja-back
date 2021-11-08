const { NotFound } = require('http-errors');
const { Category } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getExpenseCategories = async (req, res) => {
  const categories = await Category.find({ typeOfOperation: false }, 'name');

  if (!categories) {
    throw new NotFound(`Categories not found`);
  }

  sendSuccessResponse(res, { categories });
};

module.exports = getExpenseCategories;
