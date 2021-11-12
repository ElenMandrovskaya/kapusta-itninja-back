const express = require('express');
const router = express.Router();
const { reports: ctrl } = require('../../controllers');
const { controllerWrapper, authenticate } = require('../../middlewares');

// эндпотнт получения информации о транзакциях по категориям за конкретный месяц и год
router.get(
  '/transactions/:userId',
  authenticate,
  controllerWrapper(ctrl.getTransactionsReport),
);
router.get('/expense', authenticate, controllerWrapper(ctrl.getExpenseReport));
router.get('/income', authenticate, controllerWrapper(ctrl.getIncomeReport));

// router.get(
//   '/expense/monthly',
//   authenticate,
//   controllerWrapper(ctrl.getExpenseReportByMonth),
// );

module.exports = router;
