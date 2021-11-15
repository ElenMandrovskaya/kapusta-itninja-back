const { NotFound, BadRequest } = require('http-errors');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getIncomeTransactions = async (req, res) => {
  const { _id } = req.user;

  const transactions = await Transaction.find({
    expenses: true,
    owner: _id,
  });

  if (transactions.length === 0) {
    throw new BadRequest('There are no transactions');
  }

  sendSuccessResponse(res, { transactions }, 200);
};

module.exports = getIncomeTransactions;
