"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../setup/models"));

var fs = require("fs");

var path = require("path");

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var Op = _models["default"].Sequelize.Op;
// const User = require("../models/user");
// const Image = require("../models/image");
// const Comment = require("../models/postComment");
// const Avatar = require("../models/avatar");
// const PostRate = require("../models/postRate");
var rewardPost = 20;
var rewardComment = 1;
module.exports = {
  /*
   * Get posts by user
   */
  getPosts: function () {
    var _getPosts = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var _req$query, _req$query$currentPag, currentPage, _req$query$pageSize, pageSize, offset, limit, _ref, count, posts;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //currentPage is one only if undefined "null not included"
              _req$query = req.query, _req$query$currentPag = _req$query.currentPage, currentPage = _req$query$currentPag === void 0 ? 1 : _req$query$currentPag, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === void 0 ? 4 : _req$query$pageSize; // Make sure these are numbers

              currentPage = parseInt(currentPage);
              currentPage == 1 ? currentPage = 0 : currentPage = currentPage - 1;
              pageSize = parseInt(pageSize); //offset = currentPage(7) * pageSize(25) = 175
              //limit = pageSize(25)

              offset = currentPage * pageSize;
              limit = pageSize;
              _context.prev = 6;
              _context.next = 9;
              return _models["default"].Post.findAndCountAll({
                limit: limit,
                offset: offset,
                // todo order
                //order: [["createdAt", "ASC"]],
                where: {
                  userId: req.user.id
                },
                include: [{
                  model: _models["default"].Image,
                  attributes: ["imageRef"]
                }, {
                  model: _models["default"].User,
                  attributes: ["username"],
                  include: [{
                    model: _models["default"].Avatar,
                    attributes: ["imageRef"]
                  }]
                }],
                order: [["title", "ASC"]]
              });

            case 9:
              _ref = _context.sent;
              count = _ref.count;
              posts = _ref.rows;

              if (!(posts.length > 0)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(200).json({
                message: "Posts found!",
                posts: posts,
                currentPage: currentPage + 1,
                count: count / pageSize
              }));

            case 16:
              return _context.abrupt("return", res.status(200).json({
                message: "No posts found!"
              }));

            case 17:
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](6);
              console.log(_context.t0);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 19]]);
    }));

    function getPosts(_x, _x2, _x3) {
      return _getPosts.apply(this, arguments);
    }

    return getPosts;
  }(),

  /*
   * Create a new comment for exesting post
   */
  addComment: function addComment(req, res, next) {
    var errors = validationResult(req);
    var postId = req.params.postId;

    if (!errors.isEmpty()) {
      var error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    _models["default"].User.findByPk(req.user.id, {
      include: [{
        model: _models["default"].Avatar,
        attributes: ["imageRef"]
      }]
    }).then(function (user) {
      if (user.Avatars) {
        user.update({
          credit: user.credit + rewardComment
        });
        return _models["default"].PostComment.create({
          text: req.body.text,
          imageRef: user.Avatars.imageRef,
          userId: req.user.id,
          postId: postId
        });
      } else {
        return _models["default"].PostComment.create({
          text: req.body.text,
          imageRef: "",
          userId: req.user.id,
          postId: postId
        });
      }
    }).then(function (comment) {
      return _models["default"].PostComment.findByPk(comment.id, {
        include: [{
          model: _models["default"].User,
          attributes: ["username"]
        }]
      }).then(function (comment) {
        res.status(201).json({
          message: "Comment created successfully!",
          comment: comment
        });
      });
    })["catch"](function (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
  },

  /*
   * Add rating to exesting post
   */
  addRate: function () {
    var _addRate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      var errors, postId, rate, error;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return validationResult(req);

            case 2:
              errors = _context2.sent;
              postId = req.params.postId;
              rate = req.params.postRate;

              if (errors.isEmpty()) {
                _context2.next = 9;
                break;
              }

              error = new Error("Validation failed, entered data is incorrect.");
              error.statusCode = 422;
              throw error;

            case 9:
              // postId = Post.findByPk(postId).then(post => {
              //   return post.id;
              // });
              _models["default"].PostRate.findOne({
                where: {
                  postId: postId,
                  userId: req.user.id
                }
              }).then(function (postRate) {
                if (postRate) {
                  postRate.update({
                    rate: rate
                  });
                } else {
                  _models["default"].PostRate.create({
                    postId: postId,
                    userId: req.user.id,
                    rate: rate
                  });
                }
              }).then(function (res) {
                //Add award to user after rating
                req.user.update({
                  credit: req.user.credit + rewardComment
                });
                return _models["default"].Post.findByPk(postId);
              }).then(function (post) {
                res.status(201).json({
                  message: "Rate added successfully!",
                  rate: post.starCount
                });
              })["catch"](function (err) {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }

                next(err);
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function addRate(_x4, _x5, _x6) {
      return _addRate.apply(this, arguments);
    }

    return addRate;
  }(),

  /*
   * Create new post
   */
  createPost: function () {
    var _createPost = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      var location, addressArray, address, errors, error, _error, title, content, credit;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              location = JSON.parse(req.body.location);
              addressArray = location.address.split(",");
              _context3.next = 4;
              return _models["default"].Address.create({
                street: addressArray[0],
                city: addressArray[1],
                country: addressArray[2],
                lat: location.coordinates.lat,
                lang: location.coordinates.lng,
                postcode: 0
              });

            case 4:
              address = _context3.sent;
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context3.next = 10;
                break;
              }

              error = new Error("Validation failed, entered data is incorrect.");
              error.statusCode = 422;
              throw error;

            case 10:
              if (!(!req.files[0] || !req.user)) {
                _context3.next = 14;
                break;
              }

              _error = new Error("No image provided or user not registred");
              _error.statusCode = 422;
              throw _error;

            case 14:
              title = req.body.title;
              content = req.body.content;
              credit = 0;
              return _context3.abrupt("return", _models["default"].User.findByPk(req.user.id).then(function (user) {
                if (!user) {
                  var _error2 = new Error("User not found.");

                  _error2.statusCode = 404;
                  throw _error2;
                } ///Add reward to user after posting


                credit = user.credit + rewardPost;
                user.update({
                  credit: user.credit + rewardPost
                });
                return _models["default"].Post.create({
                  title: title,
                  content: content,
                  category: req.body.category,
                  userId: user.id,
                  author: user.username,
                  imageUrl: req.files[0].path
                }).then(function (post) {
                  /**
                   *
                   */
                  post.setAddress(address);
                  req.files.map(function (file) {
                    _models["default"].Image.create({
                      imageRef: file.path
                    }).then(function (image) {
                      image.setPost(post);
                    });
                  });
                  return post; // ,
                  // Post.update({
                  //   imageUrl: req.files[0].path
                  // }, {
                  //   where: {
                  //     id: post.id
                  //   }
                  // })
                }).then(function (post) {
                  res.status(201).json({
                    message: "Post created successfully!",
                    post: post,
                    userId: req.user.id,
                    credit: credit
                  });
                });
              })["catch"](function (err) {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }

                next(err);
              }));

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function createPost(_x7, _x8, _x9) {
      return _createPost.apply(this, arguments);
    }

    return createPost;
  }(),

  /*
   * Get one post by id
   */
  getPost: function getPost(req, res, next) {
    _models["default"].Post.findByPk(req.params.postId, {
      include: [{
        model: _models["default"].Image,
        attributes: ["imageRef"]
      }, {
        model: _models["default"].Address,
        attributes: ["city", "country", "lang", "lat"]
      }, {
        model: _models["default"].User,
        attributes: ["username"],
        include: [{
          model: _models["default"].Avatar,
          attributes: ["imageRef"]
        }]
      }, {
        model: _models["default"].PostComment,
        include: [{
          model: _models["default"].User,
          attributes: ["username"]
        }]
      }]
    }).then(function (post) {
      if (!post) {
        var error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        message: "Post fetched.",
        post: post
      });
    })["catch"](function (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
  },
  // todo fix get top for each category

  /**
   * Get Top noted feeds for home
   */
  getTopFeed: function getTopFeed(req, res, next) {
    // var t5 = mydata.slice(0,5);
    _models["default"].Post.findAll({
      limit: 4,
      include: [{
        model: _models["default"].Image,
        attributes: ["imageRef"]
      }, {
        model: _models["default"].User,
        attributes: ["username"],
        include: [{
          model: _models["default"].Avatar,
          attributes: ["imageRef"]
        }]
      }]
    }).then(function (posts) {
      res.status(200).json({
        message: "Fetched top posts successfully.",
        posts: posts
      });
    })["catch"](function (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
  },
  //todo fix get top 4 of selected category

  /**
   * Get Top noted feeds by category
   */
  getTopSearchFeed: function getTopSearchFeed(req, res, next) {
    // var t5 = mydata.slice(0,5);
    _models["default"].Post.findAll({
      limit: 4,
      include: [{
        model: _models["default"].Image,
        attributes: ["imageRef"]
      }, {
        model: _models["default"].User,
        attributes: ["username"],
        include: [{
          model: _models["default"].Avatar,
          attributes: ["imageRef"]
        }]
      }]
    }).then(function (posts) {
      res.status(200).json({
        message: "Fetched top posts successfully.",
        posts: posts
      });
    })["catch"](function (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
  },

  /*
   * update exesting post
   */
  updatePost: function updatePost(req, res, next) {
    var postId = req.params.postId;
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      var error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    var title = req.body.title;
    var content = req.body.content;
    var imageUrl = req.body.image;

    if (req.file) {
      imageUrl = req.file.path;
    }

    if (!imageUrl) {
      var _error3 = new Error("No file picked.");

      _error3.statusCode = 422;
      throw _error3;
    }

    _models["default"].Post.findByPk(postId).then(function (post) {
      if (!post) {
        var _error4 = new Error("Could not find post.");

        _error4.statusCode = 404;
        throw _error4;
      }

      if (post.creator.toString() !== req.user.id) {
        var _error5 = new Error("Not authorized!");

        _error5.statusCode = 403;
        throw _error5;
      }

      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }

      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    }).then(function (result) {
      res.status(200).json({
        message: "Post updated!",
        post: result
      });
    })["catch"](function (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
  },
  deletePost: function deletePost(req, res, next) {
    var postId = req.params.postId;

    _models["default"].Post.findByPk(postId).then(function (post) {
      if (!post) {
        var error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }

      if (post.creator.toString() !== req.user.id) {
        var _error6 = new Error("Not authorized!");

        _error6.statusCode = 403;
        throw _error6;
      } // Check logged in user


      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    }).then(function (result) {
      return User.findById(req.user.id);
    }).then(function (user) {
      user.posts.pull(postId);
      return user.save();
    }).then(function (result) {
      res.status(200).json({
        message: "Deleted post."
      });
    })["catch"](function (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
  },
  clearImage: function clearImage(filePath) {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, function (err) {
      return console.log(err);
    });
  },

  /**
   * Search for post
   */
  searchPost: function () {
    var _searchPost = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res) {
      var _req$query2, term, category, city, _req$query2$currentPa, currentPage, _req$query2$pageSize, pageSize, offset, limit, _ref2, count, posts;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              //currentPage is one only if undefined "null not included"
              _req$query2 = req.query, term = _req$query2.term, category = _req$query2.category, city = _req$query2.city, _req$query2$currentPa = _req$query2.currentPage, currentPage = _req$query2$currentPa === void 0 ? 1 : _req$query2$currentPa, _req$query2$pageSize = _req$query2.pageSize, pageSize = _req$query2$pageSize === void 0 ? 2 : _req$query2$pageSize; // Make sure these are numbers

              currentPage = parseInt(currentPage);
              currentPage == 1 ? currentPage = 0 : currentPage = currentPage - 1;
              pageSize = parseInt(pageSize); // Make lowercase

              term ? term = term.toLowerCase() : ""; //offset = currentPage(7) * pageSize(25) = 175
              //limit = pageSize(25)

              offset = currentPage * pageSize;
              limit = pageSize;
              _context4.prev = 7;
              _context4.next = 10;
              return _models["default"].Post.findAndCountAll({
                limit: limit,
                offset: offset,
                // todo order
                //order: [["createdAt", "ASC"]],
                where: {
                  title: (0, _defineProperty2["default"])({}, Op.like, "%" + term + "%"),
                  category: (0, _defineProperty2["default"])({}, Op.like, "%" + category + "%")
                },
                include: [{
                  model: _models["default"].Address,
                  where: {
                    city: (0, _defineProperty2["default"])({}, Op.like, "%" + city + "%")
                  }
                }, {
                  model: _models["default"].Image,
                  attributes: ["imageRef"]
                }, {
                  model: _models["default"].User,
                  attributes: ["username"],
                  include: [{
                    model: _models["default"].Avatar,
                    attributes: ["imageRef"]
                  }]
                }],
                order: [["title", "ASC"]]
              });

            case 10:
              _ref2 = _context4.sent;
              count = _ref2.count;
              posts = _ref2.rows;

              if (!(posts.length > 0)) {
                _context4.next = 17;
                break;
              }

              return _context4.abrupt("return", res.status(200).json({
                message: "Posts found!",
                post: posts,
                currentPage: currentPage + 1,
                count: count / 2
              }));

            case 17:
              return _context4.abrupt("return", res.status(200).json({
                message: "Sorry change search term!"
              }));

            case 18:
              _context4.next = 23;
              break;

            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4["catch"](7);
              console.log(_context4.t0);

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[7, 20]]);
    }));

    function searchPost(_x10, _x11) {
      return _searchPost.apply(this, arguments);
    }

    return searchPost;
  }()
}; // module.exports = {
//     method: function() {},
//     otherMethod: function() {}
// }
//# sourceMappingURL=feed.js.map