const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const { userSchemaJoi } = require('../../models/user');

router.post(
  '/signup',
  validation(userSchemaJoi),
  controllerWrapper(ctrl.signup),
);

router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify));
router.post('/verify', controllerWrapper(ctrl.repeatVerification));
router.post('/login', validation(userSchemaJoi), controllerWrapper(ctrl.login));
router.get('/balance', authenticate, controllerWrapper(ctrl.balance));
router.post('/balance', authenticate, controllerWrapper(ctrl.addBalance));
router.patch('/balance', authenticate, controllerWrapper(ctrl.updateBalance));
router.get('/logout', authenticate, controllerWrapper(ctrl.logout));

module.exports = router;
