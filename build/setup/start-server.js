"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _env = require("../config/env");

// App Imports
function _default(server) {
  console.info('SETUP - Starting server..');
  server.listen(_env.PORT, function (error) {
    if (error) {
      console.error('ERROR - Unable to start server.');
    } else {
      console.info("INFO - Server started on http://localhost:".concat(_env.PORT, " [").concat(_env.NODE_ENV, "]"));
    }
  });
}
//# sourceMappingURL=start-server.js.map