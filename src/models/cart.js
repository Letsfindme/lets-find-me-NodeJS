
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  });

  Cart.associate = models => {
    Cart.belongsTo(models.User, {
      constraints: true,
      onDelete: "CASCADE"
    });
    Cart.belongsToMany(models.Product, {
      through: models.CartItem
    });
  };

  return Cart;
};
