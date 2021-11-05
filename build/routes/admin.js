"use strict";

var express = require('express');

var adminController = require('../controllers/admin');

var isAdmin = require('../middleware/is-admin');

var router = express.Router(); // GET /admin/products

router.post("/product", adminController.postAddProduct);
router.put("/product", adminController.putEditProduct);
router["delete"]("/product", adminController.postDeleteProduct);
router.get("/product", isAdmin, adminController.getProducts);
module.exports = router;
//# sourceMappingURL=admin.js.map