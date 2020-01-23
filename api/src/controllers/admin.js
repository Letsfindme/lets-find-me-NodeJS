import models from "../setup/models";
const Product = require("../models/product");

/**
 * Create new product by admin auth
 */
exports.postAddProduct = async (req, res, next) => {
  try {
    const { title, imageUrl, price, description } = req.body;
    const product = await models.Product.create({
      title,
      price,
      imageUrl,
      description
    });
    return res
      .status(201)
      .json({ product, message: "success created product!" });
  } catch (error) {
    res.status(500).json({ message: "error creating product!" });
    console.error(err);
  }
};

/**
 * Admin update exesiting product
 */
exports.postEditProduct = async (req, res, next) => {
  try {
    const {
      prodId,
      updatedTitle,
      updatedPrice,
      updatedImageUrl,
      updatedDesc
    } = req.body;
    const product = await models.Product.findByPk(prodId);
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    const savedProduct = await product.save();
    res
      .status(200)
      .json({ result: savedProduct, message: "product update success" });
  } catch (error) {
    err => console.log(err);
  }
};

/**
 * Admin get all products
 */
exports.getProducts = async (req, res, next) => {
  try {
    const products = await models.Product.findAll();
    return res.status(302).json(products);
  } catch (error) {
    err => console.log(err);
  }
};

/**
 * Admin delete a product by id
 */
exports.postDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const product = await models.Product.findByPk(prodId);
    const deletedProduct = await product.destroy();
    res.status(200).json({ deletedProduct, message: "DESTROYED PRODUCT" });
  } catch (error) {
    err => console.log(err);
  }
};
