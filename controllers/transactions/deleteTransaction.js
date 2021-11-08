const { NotFound } = require('http-errors');
const { User } = require('../../models');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const deleteTransaction = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionId } = req.params;
  const transaction = await Transaction.findOneAndRemove({
    _id: transactionId,
    owner: _id,
  });

  if (!transaction) {
    throw new NotFound(`Transaction with id=${transactionId} not found`);
  }

  const { value, expenses } = transaction;
  const updateBalance = expenses === false ? balance + value : balance - value;
  await User.findByIdAndUpdate(
    { _id },
    { balance: updateBalance },
    { new: true },
  );

  sendSuccessResponse(res, { message: 'Success remove', transaction });
};

module.exports = deleteTransaction;
