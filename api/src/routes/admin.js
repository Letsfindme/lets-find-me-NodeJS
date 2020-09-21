const express = require('express');

const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/is-admin');
const router = express.Router();

// GET /admin/products
router.post("/product", adminController.postAddProduct);
router.put("/product", adminController.putEditProduct);
router.delete("/product", adminController.postDeleteProduct);
router.get("/product",isAdmin, adminController.getProducts);


module.exports = router;