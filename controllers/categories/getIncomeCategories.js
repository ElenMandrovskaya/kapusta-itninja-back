const { NotFound } = require('http-errors');
const { Category } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getIncomeCategories = async (req, res) => {
  const categories = await Category.find({ typeOfOperation: true }, 'name');

  if (!categories) {
    throw new NotFound('Categories not found');
  }

  sendSuccessResponse(res, { categories });
};

module.exports = getIncomeCategories;
