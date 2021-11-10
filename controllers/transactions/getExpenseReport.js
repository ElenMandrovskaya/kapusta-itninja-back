const { NotFound } = require('http-errors');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getExpenseReport = async (req, res) => {
  const transactions = await Transaction.find({ typeOfOperation: false });
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
  console.log(finalReportArray);

  sendSuccessResponse(res, { finalReportArray }, 200);
};

module.exports = getExpenseReport;
