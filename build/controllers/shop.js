"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../setup/models"));

var Product = _models["default"].Product,
    User = _models["default"].User; //User get all products

exports.getProducts =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var products;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Product.findAll();

          case 3:
            products = _context.sent;
            return _context.abrupt("return", res.status(200).json(products));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            //todo logs
            console.log(_context.t0);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getProduct = function (req, res, next) {
  var prodId = req.params.productId; // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));

  Product.findByPk(prodId).then(function (product) {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products"
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getIndex = function (req, res, next) {
  Product.findAll().then(function (products) {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getCart = function (req, res, next) {
  req.user.getCart().then(function (cart) {
    return cart.getProducts().then(function (products) {
      return res.status(200).json(products);
    })["catch"](function (err) {
      return console.log(err);
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}; // Add item to cart (replace all items)


exports.postCart = function (req, res, next) {
  var prodId = req.body.productId;
  var fetchedCart;
  var newQuantity = 1;
  req.user.getCart().then(function (cart) {
    fetchedCart = cart; //Create carte if it doesn't exist

    if (!cart) {
      return req.user.createCart();
    } else {
      cart.getProducts().then(function (products) {
        return products.map(function (product) {
          return product.cartItem.destroy();
        });
      });
      return cart.getProducts();
    }
  }) //CASE product already in the cart (for later use)
  .then(function (products) {
    //CASE product not in the cart
    //Find products to add them to cart
    return Product.findAll({
      where: {
        id: prodId
      }
    });
  }).then(function (products) {
    products.map(function (product) {
      return (//Add each product to cart
        fetchedCart.addProduct(product, {
          through: {
            quantity: newQuantity
          }
        })
      );
    });
    return products;
  }).then(function (products) {
    res.status(200).json(products);
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postCartDeleteProduct = function (req, res, next) {
  var prodId = req.body.productId;
  req.user.getCart().then(function (cart) {
    return cart.getProducts({
      where: {
        id: prodId
      }
    });
  }).then(function (products) {
    var product = products[0];
    return product.cartItem.destroy();
  }).then(function (result) {
    res.status(200);
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postOrder = function (req, res, next) {
  var fetchedCart;
  req.user.getCart().then(function (cart) {
    fetchedCart = cart;
    return cart.getProducts();
  }).then(function (products) {
    var total = 0;
    products.map(function (product) {
      return total += product.price;
    }); //todo  req.user.credit > products.price
    //verfiy user credit befor submitting order
    // If user dont have credit

    if (total > req.user.credit) {
      var error = new Error("User dont have credit");
      error.statusCode = 500;
      throw error;
    } //update user credit


    User.findByPk(req.userId).then(function (user) {
      if (!user) {
        var _error = new Error("Not found.");

        _error.statusCode = 404;
        throw _error;
      }

      return user.update({
        credit: req.user.credit - total
      });
    });
    return req.user.createOrder().then(function (order) {
      return order.addProducts(products.map(function (product) {
        product.orderItem = {
          quantity: product.cartItem.quantity
        };
        return product;
      }));
    })["catch"](function (err) {
      return console.log(err);
    });
  }).then(function (result) {
    return fetchedCart.setProducts(null);
  }).then(function (result) {
    res.status(200).json(result);
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getOrders = function (req, res, next) {
  req.user.getOrders({
    include: ["products"]
  }).then(function (orders) {
    res.status(200).json({
      orders: orders,
      credit: req.user.credit
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};
//# sourceMappingURL=shop.js.map