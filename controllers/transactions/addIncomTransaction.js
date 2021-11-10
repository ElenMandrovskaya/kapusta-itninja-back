/* eslint-disable semi */
const { NotFound } = require('http-errors');
const { Transaction } = require('../../models');
const { Category } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const addIncomTransaction = async (res, req) => {
  const { categoryId } = req.params;
  console.log(categoryId);
  const { day, month, year } = req.query;

  // получаем категорию из БД
  const category = await Category.findById({ _id: categoryId });

  // если мы не получили категорию
  if (!category) {
    throw new NotFound('Category not found');
  }

  // получаем тип транзакции
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

module.exports = addIncomTransaction;
