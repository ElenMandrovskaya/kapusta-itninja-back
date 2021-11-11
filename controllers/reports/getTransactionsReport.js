const { NotFound } = require('http-errors');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getTransactionsReport = async (req, res) => {
  const { _id } = req.user;
  const { month, year } = req.query;
  console.log(month, year);

  // получаем список всех транзакций user
  const transactions = await Transaction.find({
    owner: _id,
  });

  console.log(transactions);

  if (!transactions) {
    throw new NotFound('Transaction not found');
  }

  const result = {};
  sendSuccessResponse(res, { result }, 201);
};

module.exports = getTransactionsReport;
