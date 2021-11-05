"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _env = require("../config/env");

// Imports
var feedRoutes = require("../routes/feed");

var authRoutes = require("../routes/auth");

var userRoute = require("../routes/user");

var shopRoute = require("../routes/shop");

var adminRoute = require("../routes/admin");

var isAdmin = require("../middleware/is-admin"); // import feedRoutes from"../routes/feed";
// import authRoutes from"../routes/auth";
// import userRoute from"./routes/user";
// App Imports


// Load express modules
function _default(server) {
  console.info("SETUP - Loading modules..."); // Enable CORS

  server.use((0, _cors["default"])()); // Request body parser

  server.use(_bodyParser["default"].json());
  server.use(_bodyParser["default"].urlencoded({
    extended: false
  })); // Request body cookie parser

  server.use((0, _cookieParser["default"])()); // Static files folder

  server.use("/public", _express["default"]["static"](_path["default"].join(__dirname, "..", "..", "/public"))); // server.use("/images", express.static(path.join(__dirname, "images")));
  // HTTP logger
  // if (NODE_ENV === "development") {
  //   server.use(morgan("tiny"));
  // }

  server.use((0, _morgan["default"])("dev")); // Load routers

  server.use("/feed", feedRoutes);
  server.use("/auth", authRoutes);
  server.use("/user", userRoute);
  server.use("/shop", shopRoute);
  server.use("/admin", isAdmin, adminRoute); // error handler

  server.use(function (error, req, res, next) {
    // todo log error properly
    //console.log(error);
    var status = error.statusCode || 500;
    var message = error.message;
    var data = error.data;
    res.status(status).json({
      message: message,
      data: data
    });
  });
}
//# sourceMappingURL=load-modules.js.map