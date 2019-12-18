// Imports
import jwt from "jsonwebtoken";
import serverConfig from "../config/server.json";

// Authentication middleware
module.exports = (request, response, next) => {
  let authToken = request.headers.authorization;
  if (authToken && authToken !== null) {
    try {
      const token = authToken.split(" ");
      request.user = jwt.verify(token[1], serverConfig.secret);
    } catch (e) {
      console.warn("Invalid token detected.");
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
  } else {
    request.user = {};
  }
  next();
};