const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/authentication");

// router.post("/product", adminController.postAddProduct);
// router.put("/product", adminController.putEditProduct);
// router.delete("/product", adminController.postDeleteProduct);

// GET all products /shop/products
router.get("/products", shopController.getProducts);

// GET all products in cart /shop/cart
router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.postCart);
router.post("/cart/order", isAuth, shopController.postOrder);

// GET all products in order /shop/cart/orders
router.get("/cart/orders", isAuth, shopController.getOrders);

module.exports = router;
