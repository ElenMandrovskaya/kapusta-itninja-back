const express = require('express');
const router = express.Router();
const { reports: ctrl } = require('../../controllers');
const { controllerWrapper, authenticate } = require('../../middlewares');

// эндпотнт получения информации о транзакциях по категориям за конкретный месяц и год
router.get(
  '/monthlyexpense',
  authenticate,
  controllerWrapper(ctrl.getExpenseReportByMonth),
);
router.get(
  '/monthlyincome',
  authenticate,
  controllerWrapper(ctrl.getIncomReportByMonth),
);
router.get('/expense', authenticate, controllerWrapper(ctrl.getExpenseReport));
router.get('/income', authenticate, controllerWrapper(ctrl.getIncomeReport));

module.exports = router;
