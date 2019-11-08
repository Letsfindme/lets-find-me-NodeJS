const express = require('express');
const {
  body
} = require('express-validator');

//const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {
      req
    }) => {
      return User.findAll({
        where: {
          email: value
        }
      }).then(user => {
        if (user.length != 0) {
          return Promise.reject('E-Mail address already exists!');
        }
      });
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({
      min: 5
    })
  ],
  authController.signup
);

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserStatus);

router.patch(
  '/status',
  isAuth,
  [
    body('status')
    .trim()
    .not()
    .isEmpty()
  ],
  authController.updateUserStatus
);

module.exports = router;