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
  console.log(reportArray);

  const finalReportArray = reportArray.reduce(
    (acc, c) => ((acc[c.month] = (acc[c.month] || 0) + c.value), acc),
    {},
  );

  sendSuccessResponse(res, { finalReportArray }, 200);
};

module.exports = getExpenseReport;
