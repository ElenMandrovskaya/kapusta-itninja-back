const { NotFound, BadRequest } = require('http-errors');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getExpenseTransactions = async (req, res) => {
  const { _id } = req.user;

  const transactions = await Transaction.find({
    expenses: false,
    owner: _id,
  });

  if (transactions.length === 0) {
    throw new BadRequest('There are no transactions');
  }

  sendSuccessResponse(res, { transactions }, 200);
};

module.exports = getExpenseTransactions;
