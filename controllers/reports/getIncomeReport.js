const { NotFound, BadRequest } = require('http-errors');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getIncomeReport = async (req, res) => {
  const { _id } = req.user;
  const transactions = await Transaction.find({
    typeOfOperation: true,
    owner: _id,
  });

  if (!transactions) {
    throw new NotFound('Transactions not found');
  }
  const reportArray = [];

  transactions.forEach(transaction => {
    const { month } = transaction.date;
    const { value } = transaction;

    const record = {
      month,
      value,
    };

    reportArray.push(record);
  });

  const reducer = reportArray.reduce(
    (acc, c) => ((acc[c.month] = (acc[c.month] || 0) + c.value), acc),
    {},
  );

  const finalReportArray = Object.keys(reducer)
    .map(item => ({
      month: item,
      value: reducer[item],
    }))
    .sort((a, b) => (a.month < b.month ? 1 : b.month < a.month ? -1 : 0));

  if (finalReportArray.length === 0) {
    throw new BadRequest('There are no transactions on this month');
  }

  sendSuccessResponse(res, { finalReportArray }, 200);
};

module.exports = getIncomeReport;