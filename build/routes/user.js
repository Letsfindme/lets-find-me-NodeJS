"use strict";

var path = require('path');

var express = require('express');

var adminController = require('../controllers/admin');

var userController = require('../controllers/user');

var isAuth = require("../middleware/authentication");

var router = express.Router(); // /admin/add-product => GET

router.get('/profile', isAuth, userController.getProfile);
router.post('/profile', isAuth, userController.updateProfile);
router.post('/profile/address', isAuth, userController.updateAdresse);
router.post('/profile/avatar', isAuth, userController.postAvatar);
router.get('/profile/avatar', isAuth, userController.getAvatar); // /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);
// // /admin/products => GET
// router.get('/products', adminController.getProducts);
// // /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);
// router.get('/edit-product/:productId', adminController.getEditProduct);
// router.post('/edit-product', adminController.postEditProduct);
// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
//# sourceMappingURL=user.js.map