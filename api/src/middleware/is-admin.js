const jwt = require("jsonwebtoken");
import models from "../setup/models";

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    // decodedToken;
    let decodedToken = jwt.verify(token, "let$f!ndsomesupersecre+secre+");
    if (!decodedToken) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    } else if (!decodedToken.type === "Admin") {
      const error = new Error("Not admin.");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    const user = await models.User.findByPk(req.userId, {
      include: [
        {
          model: models.Role,
          attributes: ["type"]
        }
      ]
    });
    if (!user || !user.role || user.role.type != "Admin") {
      const error = new Error("Invalid request! No way!");
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    // todo log error

    // This will be caught by error handler
    return next(err);
  }

  next();
};
