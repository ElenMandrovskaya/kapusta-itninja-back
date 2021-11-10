/* eslint-disable semi */
const express = require('express');
const router = express.Router();
const { reports: ctrl } = require('../../controllers');
const { controllerWrapper, authenticate } = require('../../middlewares');

// эндпотнт получения подробной информации о транзакциях по категории за конкретный месяц и год
router.get(
  '/transactions/:catgoryId',
  authenticate,
  controllerWrapper(ctrl.getTransactionsByDescription),
);

// // эндпотнт получения подробной информации о расходов по категории за конкретный месяц и год
router.get(
  '/transactions',
  authenticate,
  controllerWrapper(ctrl.getTransactionsByCategory),
);

module.exports = router;
