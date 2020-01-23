const express = require('express');

const adminController = require('../controllers/admin');
const userController = require('../controllers/user');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();

// GET /admin/products
router.post("/product", adminController.postAddProduct);
router.delete("/product", adminController.postDeleteProduct);
router.get("/product",isAdmin, adminController.getProducts);


module.exports = router;