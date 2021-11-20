const updateBalanceAfterTransaction = (balance, value, type) => {
  const newBalance = type === 'Expenses' ? balance - value : balance + value;
  return newBalance;
};

module.exports = updateBalanceAfterTransaction;
