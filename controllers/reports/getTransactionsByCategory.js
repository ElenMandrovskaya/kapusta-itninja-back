const { NotFound } = require('http-errors');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getTransactionsByCategory = async (res, req) => {
  //   получаем Id категории, месяц и год из реквеста
  const { categoryId } = req.param;
  const { month, year } = req.query;

  // получаем список всех транзакций по категории
  const transactions = await Transaction.findById({ _id: categoryId });
};

module.exports = getTransactionsByCategory;
