const { BadRequest } = require('http-errors');
const { User } = require('../../models');
const { Transaction } = require('../../models');
const { sendSuccessResponse } = require('../../utils');

const updateBalance = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;

  const transaction = await Transaction.findOne({ owner: _id }).sort({
    $natural: -1,
  });

  const { value, typeTransaction } = transaction;

  const updateBalance =
    typeTransaction === 'Expenses' ? balance - value : balance + value;

  if (updateBalance < 0) {
    throw new BadRequest('There are no enough money for this purchase');
  }

  await User.findByIdAndUpdate(
    { _id },
    { balance: updateBalance },
    { new: true },
  );

  sendSuccessResponse(res, { updateBalance });
};

module.exports = updateBalance;
