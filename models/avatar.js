const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const User = require("./user");

const Avatar = sequelize.define("Avatar", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  imageRef: Sequelize.STRING
});

//Avatar.belongsTo(User);

module.exports = Avatar;
