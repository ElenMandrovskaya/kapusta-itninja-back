const { Category } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const addIncomeCategory = async (req, res) => {
  const newCategory = { ...req.body, typeOfOperation: true };
  const category = await Category.create(newCategory);
  sendSuccessResponse(res, { category }, 201);
};

module.exports = addIncomeCategory;
