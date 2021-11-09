const express = require('express');
const router = express.Router();
const { transactions: ctrl } = require('../../controllers');
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const { transactionsSchemaJoi } = require('../../models/transactions');

router.post(
  '/expense/:categoryId',
  authenticate,
  validation(transactionsSchemaJoi),
  controllerWrapper(ctrl.addExpenseTransaction),
);
router.delete(
  '/:transactionId',
  authenticate,
  controllerWrapper(ctrl.deleteTransaction),
);

// маршрут энд-поинта получения дохода
router.post(
  '/incom/:categoryId',
  authenticate,
  validation(transactionsSchemaJoi),
  controllerWrapper(ctrl.addIncomTransaction),
);

module.exports = router;
