"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _path = _interopRequireDefault(require("path"));

var _authentication = _interopRequireDefault(require("../middleware/authentication"));

var _server = _interopRequireDefault(require("../config/server.json"));

// Imports
// import multer from "multer";
var multer = require("multer");

var uuidv4 = require("uuid/v4");

// File upload configurations and route
function _default(server) {
  console.info("SETUP - Upload..."); // Set destination

  var storage = multer.diskStorage({
    destination: _path["default"].join( // __dirname,
    // "..",
    // "..",
    "public", "images", "uploads"),
    filename: function filename(request, file, callback) {
      callback(null, file.fieldname + "-" + Date.now() + _path["default"].extname(file.originalname));
    }
  });
  var upload = multer({
    storage: storage
  }).array("file"); // Upload route

  server.post(_server["default"].upload.endpoint, function (request, response) {
    upload(request, response, function (error) {
      if (!error) {
        var fileNames = [];

        for (var filename in request.files) {
          fileNames.push(request.files[filename].filename);
        }

        return response.status(201).json({
          success: true,
          file: fileNames
        });
      } else {
        return response.json({
          success: false,
          file: null
        });
      }
    });
  }); //todo if you want to intercept all connection 
  //server.use(authentication);
  //filter file type

  var fileFilter = function fileFilter(req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/icon" || file.mimetype === "image/vnd.microsoft.icon" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }; //todo none used code


  var fileStorage = multer.diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, "file");
    },
    filename: function filename(req, file, cb) {
      cb(null, uuidv4());
    }
  }); // limit file size

  server.use(multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 1000 * 1000 * 2
    }
  }).array("image"));
}
//# sourceMappingURL=upload.js.map