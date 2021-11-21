const { BadRequest } = require('http-errors');
const { User } = require('../../models');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const updateBalance = async (req, res) => {
  const { _id, balance } = req.user;

  const transaction = await Transaction.findOne({ owner: _id }).sort({
    $natural: -1,
  });
  // console.log(transaction);
  // if (!transaction) {
  //   throw new NotFound('User not found');
  // }

  const { value, typeTransaction } = transaction;

  const updateBalance =
    typeTransaction === 'Expenses' ? balance - value : balance + value;

  if (updateBalance < 0) {
    throw new BadRequest('There are no enough money for this purchase');
  }
  // const updateBalance = expenses === false ? balance - value : balance + value;

  await User.findByIdAndUpdate(
    { _id },
    { balance: updateBalance },
    { new: true },
  );

  sendSuccessResponse(res, { updateBalance });
};

module.exports = updateBalance;
