module.exports = (sequelize, DataTypes) => {
  const PostContent = sequelize.define("postContent", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    text: DataTypes.STRING
  });

  return PostContent;
};
