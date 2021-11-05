module.exports = (sequelize,DataTypes) => {
  const Order = sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  });

  Order.associate = models => {
    Order.belongsTo(models.User, {
      constraints: true,
      onDelete: "CASCADE"
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderItem
    });
  };

  return Order;
};
