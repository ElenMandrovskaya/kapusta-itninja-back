/*
1. получаем все транзакции пользователя
2. Отбираем транзакции по месяцу и году
3.
*/

const { NotFound } = require('http-errors');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getTransactionsReport = async (req, res) => {
  const { month, year } = req.query;
  const { _id } = req.user;

  // console.log(month, year);

  // получаем список всех транзакций расходов user
  const transactions = await Transaction.find({
    owner: _id,
    expenses: true,
  });

  // console.log(transactions);

  if (!transactions) {
    throw new NotFound('Transaction not found');
  }

  const transactionsByYear = [];
  const transactionsByMonth = [];

  const result = [];
  const newReport = {
    category: '',
    total: null,
    icon: '',
    chart: [
      {
        description: '',
        total: null,
      },
    ],
  };

  // все транзакции за определенный год
  transactions.map(transaction => {
    const { date, description, icons, value, category } = transaction;

    if (year === transaction.date.year) {
      const item = {
        date,
        description,
        icons,
        value,
        category,
      };
      transactionsByYear.push(item);
    }
  });

  transactionsByYear.map(transaction => {
    const { description, icons, value, category } = transaction;

    if (month === transaction.date.month) {
      const item = {
        description,
        icons,
        value,
        category,
      };

      transactionsByMonth.push(item);
      // console.log(transactionsByMonth);
    }
  });

  // вычисление расходов по категория
  const reducerCategory = transactionsByMonth.reduce(
    (acc, c) => ((acc[c.category] = (acc[c.category] || 0) + c.value), acc),
    {},
  );
  console.log(
    Object.keys(reducerCategory).map(item => ({
      category: item,
      total: reducerCategory[item],
    })),
  );

  // получение расходов по описаниям
  const reducerDiscription = transactionsByMonth.reduce(
    (acc, c) => (
      (acc[c.description] = (acc[c.description] || 0) + c.value), acc
    ),
    {},
  );

  // console.log(reducerDiscription);

  result.push(
    Object.keys(reducerCategory).map(item => ({
      category: item,
      total: reducerCategory[item],
    })),
  );
  sendSuccessResponse(res, { result }, 201);
};

module.exports = getTransactionsReport;
