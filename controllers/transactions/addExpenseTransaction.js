const { NotFound } = require('http-errors');
const { Transaction } = require('../../models');
const { Category } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const addExpenseTransaction = async (req, res) => {
  const { balance } = req.user;
  const { categoryId } = req.params;
  const { day, month, year } = req.query;

  const category = await Category.findById({ _id: categoryId });

  if (!balance) {
    throw new BadRequest(`There are no money on your balance`);
  }

  if (!category) {
    throw new NotFound(`Category not found`);
  }

  const { name, typeOfOperation } = category;
  const newTransaction = {
    ...req.body,
    date: {
      day,
      month,
      year,
    },
    owner: req.user._id,
    category: name,
    expenses: typeOfOperation,
  };
  const result = await Transaction.create(newTransaction);
  sendSuccessResponse(res, { result }, 201);
};

module.exports = addExpenseTransaction;
