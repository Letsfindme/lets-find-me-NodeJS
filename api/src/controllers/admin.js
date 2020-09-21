import models from "../setup/models";
const Product = require("../models/product");

/**
 * Create new product by admin auth
 */
exports.postAddProduct = async (req, res, next) => {
  try {
    const { title, price, description } = req.body;
    if (!req.files[0]) {
      const error = new Error("No image provided or user not registred");
      error.statusCode = 422;
      throw error;
    }
    if (!title || !price || !description) {
      console.log("message: Body is empty! error creating product!");
      return res
        .status(400)
        .json({ message: "Body is empty! error creating product!" });
    }
    const product = await models.Product.create({
      title,
      price,
      imageUrl: req.files[0].path,
      description
    });
    return res
      .status(201)
      .json({ product, message: "success created product!" });
  } catch (error) {
    res.status(500).json({ message: "error creating product!" });
    console.error("message: error creating product!", error.message);
  }
};

/**
 * Admin update exesiting product
 */
exports.putEditProduct = async (req, res, next) => {
  try {
    const { title, price, description, prodId, imageUrl } = req.body;
    const product = await models.Product.findByPk(prodId);
    product.title = title;
    product.price = price;
    product.description = description;
    product.imageUrl = req.files[0] ? req.files[0].path : imageUrl;
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
    return res.status(200).json(products);
  } catch (error) {
    err => console.log(err);
  }
};

/**
 * Admin delete a product by id
 */
exports.postDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.prodId;
    const product = await models.Product.findByPk(prodId);
    if (!product) {
      res.status(400).json({ deletedProduct, message: "Not found!!" });
    }
    const deletedProduct = await product.destroy();
    res.status(200).json({ deletedProduct, message: "DESTROYED PRODUCT" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Can't delete :/" });
  }
};
