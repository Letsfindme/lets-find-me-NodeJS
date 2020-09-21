import models from "../setup/models";

const { Product, User } = models;

//User get all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    //todo logs
    console.log(error);
    next(error);
  }
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          return res.status(200).json(products);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

// Add item to cart (replace all items)
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      //Create carte if it doesn't exist
      if (!cart) {
        return req.user.createCart();
      } else {
        cart
          .getProducts()
          .then((products) =>
            products.map((product) => product.cartItem.destroy())
          );

        return cart.getProducts();
      }
    })
    //CASE product already in the cart (for later use)
    .then((products) => {
      //CASE product not in the cart
      //Find products to add them to cart
      return Product.findAll({
        where: {
          id: prodId,
        },
      });
    })
    .then((products) => {
      products.map((product) =>
        //Add each product to cart
        fetchedCart.addProduct(product, {
          through: { quantity: newQuantity },
        })
      );
      return products;
    })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.status(200);
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      let total = 0;
      products.map((product) => (total += product.price));
      //todo  req.user.credit > products.price
      //verfiy user credit befor submitting order

      // If user dont have credit
      if (total > req.user.credit) {
        const error = new Error("User dont have credit");
        error.statusCode = 500;
        throw error;
      }

      //update user credit
      User.findByPk(req.userId).then((user) => {
        if (!user) {
          const error = new Error("Not found.");
          error.statusCode = 404;
          throw error;
        }
        return user.update({ credit: req.user.credit - total });
      });

      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.status(200).json({
        orders: orders,
        credit:req.user.credit
      });
    })
    .catch((err) => console.log(err));
};
