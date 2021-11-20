/*
1. получаем все транзакции пользователя
2. Отбираем транзакции по месяцу и году
3.
*/

const { NotFound } = require('http-errors');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const getIncomReportByMonth = async (req, res) => {
  const { month, year } = req.query;
  const { _id } = req.user;

  // получаем список всех транзакций доходов user
  const transactions = await Transaction.find({
    owner: _id,
    expenses: true,
  });

  if (!transactions) {
    throw new NotFound('Transaction not found');
  }

  const transactionsByYear = [];
  const transactionsByMonth = [];

  // все транзакции за определенный год
  transactions.map(transaction => {
    const { date, description, icon, value, category } = transaction;

    if (year === transaction.date.year) {
      const item = {
        date,
        icon,
        description,
        value,
        category,
      };
      transactionsByYear.push(item);
    }
  });

  // все транзакции за определенный месяц
  transactionsByYear.map(transaction => {
    const { description, icon, value, category } = transaction;

    if (month === transaction.date.month) {
      const item = {
        description,
        icon,
        value,
        category,
      };

      transactionsByMonth.push(item);
    }
  });

  // if (transactionsByMonth.length === 0) {
  //   throw new NotFound('There are no transaction on this month');
  // }

  // вычисление расходов по категория
  const reducerCategory = transactionsByMonth.reduce(
    (acc, c) => ((acc[c.category] = (acc[c.category] || 0) + c.value), acc),
    {},
  );

  // получение расходов по описаниям транзакций
  const reducerDiscription = transactionsByMonth.reduce(
    (acc, c) => (
      (acc[c.description] = (acc[c.description] || 0) + c.value), acc
    ),
    {},
  );

  // создание ответа
  const result = Object.keys(reducerCategory).map(item => ({
    category: item,
    // вытягиваем название иконок для фронта из транзакций
    icon: transactionsByMonth.find(i => i.category === item).icon,
    total: reducerCategory[item],
    // полученик списка описаний расходов/доходов с вычисление их суммы
    chart: Object.keys(
      transactionsByMonth
        .filter(i => i.category === item)
        .reduce(
          (acc, c) => (
            (acc[c.description] = (acc[c.description] || 0) + c.value), acc
          ),
          {},
        ),
    ).map(item => ({
      description: item,
      total: reducerDiscription[item],
    })),
  }));

  // if (result.length === 0) {
  //   throw new NotFound('There are no transaction on this month');
  // }

  sendSuccessResponse(res, result);
};

module.exports = getIncomReportByMonth;
