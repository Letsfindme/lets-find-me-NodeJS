module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    imageRef: DataTypes.STRING
  });

  Image.associate = models => {
    Image.belongsTo(models.Post);
  };

  return Image;
};
