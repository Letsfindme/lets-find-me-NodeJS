"use strict";

var express = require('express');

var _require = require('express-validator'),
    body = _require.body; //const User = require('../models/user');


var authController = require('../controllers/auth');

var isAuth = require("../middleware/authentication");

var router = express.Router();
router.put('/signup', [body('email').isEmail().withMessage('Please enter a valid email.').custom(function (value, _ref) {
  var req = _ref.req;
  return User.findAll({
    where: {
      email: value
    }
  }).then(function (user) {
    if (user.length != 0) {
      return Promise.reject('E-Mail address already exists!');
    }
  });
}).normalizeEmail(), body('password').trim().isLength({
  min: 5
})], authController.signup);
router.post('/login', authController.login);
router.get('/status', isAuth, authController.getUserStatus);
router.patch('/status', isAuth, [body('status').trim().not().isEmpty()], authController.updateUserStatus);
module.exports = router;
//# sourceMappingURL=auth.js.map