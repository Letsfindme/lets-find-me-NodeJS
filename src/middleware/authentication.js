// Imports
import jwt from "jsonwebtoken";
// import serverConfig from "../config/server.json";
import models from "../setup/models";

// Authentication middleware
module.exports = async (req, res, next) => {
  let authToken = req.headers.authorization;
  if (authToken && authToken !== null) {
    try {
      if (!authToken) {
        const error = new Error("No token!!");
        throw error;
      }
      const token = authToken.split(" ")[1];
      req.userTok = jwt.verify(token, "serverConfig.secret");
      
      req.userId = req.userTok.userId;
      req.user = await models.User.findByPk(req.userId, {
        include: [
          {
            model: models.Role,
            attributes: ["type"]
          }
        ]
      });
      if (!req.user) {
        const error = new Error("No user found!!");
        throw error;
      }
    } catch (e) {
      //todo logs
      console.log(e.message);
      // error.statusCode = 401;
      // throw error;
      return next(e);
    }
  } else {
    req.user = {};
    console.warn("No token detected.");
    const error = new Error("Not authenticated.");
    // error.statusCode = 401;
    // throw error;
    return next(error);
  }
  next();
};
