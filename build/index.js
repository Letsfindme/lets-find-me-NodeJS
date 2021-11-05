"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _loadModules = _interopRequireDefault(require("./setup/load-modules"));

var _upload = _interopRequireDefault(require("./setup/upload"));

var _startServer = _interopRequireDefault(require("./setup/start-server"));

//const Joi = require("joi");
// App Imports
// const morgan = require('morgan');
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const path = require("path");
// const uuidv4 = require("uuid/v4");
// const userRoute = require("./routes/user");
// const feedRoutes = require("./routes/feed");
// const authRoutes = require("./routes/auth");
// const sequelize = require("./util/database");
// const port = process.env.PORT || 8080;
// Create express server
var server = (0, _express["default"])(); // Setup uploads

(0, _upload["default"])(server); // Setup load modules

(0, _loadModules["default"])(server); // Start server

(0, _startServer["default"])(server); // const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, uuidv4());
//   }
// });
////////////////////////////////////////     Router     ////////////////////////////////////
//Enables Parse json on the body of request
//////////////////// app.use(bodyParser.json());
// HTTP logger
// server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// Static files folder
// server.use("/images", express.static(path.join(__dirname, "images")));
// Enable CORS
// server.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
// server.use((req, res, next) => {
//   res.status(404).send("<h1>not found</h1>");
// });
// sequelize
//   // .sync({
//   //     force: true
//   // })
//   .sync()
//   // .then(result => {
//   //     return User.findAll();
//   //     // console.log(result);
//   // })
//   // .then(user => {
//   //     console.log(user[0]);
//   //     if (!user[0]) {
//   //         return User.create({
//   //             firstname: 'Max',
//   //             email: 'test@test.com'
//   //         });
//   //     }
//   //     return user;
//   // })
//   .then(cart => {
//     server.listen(port, console.log(`Listening on port ${port}`));
//   })
//   .catch(err => {
//     console.log(err);
//   });
//# sourceMappingURL=index.js.map