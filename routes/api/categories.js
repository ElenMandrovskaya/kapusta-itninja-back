const express = require('express');
const router = express.Router();
const { categories: ctrl } = require('../../controllers');
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const { categorySchemaJoi } = require('../../models/categories');

router.get('/', controllerWrapper(ctrl.getAllCategories));
router.get('/expense', controllerWrapper(ctrl.getExpenseCategories));
router.get('/income', controllerWrapper(ctrl.getIncomeCategories));
router.post(
  '/expense',
  authenticate,
  validation(categorySchemaJoi),
  controllerWrapper(ctrl.addExpenseCategory),
);

router.post(
  '/income',
  authenticate,
  validation(categorySchemaJoi),
  controllerWrapper(ctrl.addIncomeCategory),
);

module.exports = router;
