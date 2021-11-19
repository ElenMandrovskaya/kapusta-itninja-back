const express = require('express');
const router = express.Router();
const { user: ctrl } = require('../../controllers');
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const { userSchemaJoi } = require('../../models/user');

router.get('/google', controllerWrapper(ctrl.google));
router.get('/google-redirect', controllerWrapper(ctrl.googleRedirect));
router.post('/user-google', controllerWrapper(ctrl.getUserByEmail));

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
router.get('/current', authenticate, controllerWrapper(ctrl.current));

module.exports = router;
