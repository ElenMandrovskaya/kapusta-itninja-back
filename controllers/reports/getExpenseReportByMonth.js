const { NotFound, BadRequest } = require('http-errors');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getExpenseReportByMonth = async (req, res) => {
  const { _id } = req.user;
  const { month } = req.query;
  console.log(month);
  const transactions = await Transaction.find({
    typeOfOperation: false,
    owner: _id,
  });

  if (!transactions) {
    throw new NotFound(`Transactions not found`);
  }

  const reportArray = [];

  transactions.map(transaction => {
    const { value, description } = transaction;

    if (month === transaction.date.month) {
      const record = {
        description,
        value,
      };

      reportArray.push(record);
    }
  });

  const reducer = reportArray.reduce(
    (acc, c) => (
      (acc[c.description] = (acc[c.description] || 0) + c.value), acc
    ),
    {},
  );

  const finalReportArray = Object.keys(reducer).map(item => ({
    description: item,
    value: reducer[item],
  }));

  if (finalReportArray.length === 0) {
    throw new BadRequest(`There are no transactions on this month`);
  }

  sendSuccessResponse(res, { finalReportArray }, 200);
};

module.exports = getExpenseReportByMonth;
