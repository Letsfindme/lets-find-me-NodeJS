
module.exports = (sequelize, DataTypes) => {
  const PostRate = sequelize.define("postRate", {
    // id: {
    //   type: Sequelize.UUID,
    //   allowNull: false,
    //   primaryKey: true,
    //   defaultValue: Sequelize.UUIDV4
    // },
    rate: DataTypes.INTEGER
  });

  return PostRate;
};
