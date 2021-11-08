const { Category } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const addExpenseCategory = async (req, res) => {
  const newCategory = { ...req.body };
  const category = await Category.create(newCategory);
  sendSuccessResponse(res, { category }, 201);
};

module.exports = addExpenseCategory;
