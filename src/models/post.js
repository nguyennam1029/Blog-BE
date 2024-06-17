"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, {
        foreignKey: "category_code",
        targetKey: "code",
        as: "categoryData",
      });
      Post.belongsTo(models.Status, {
        foreignKey: "status_code",
        targetKey: "code",
        as: "statusData",
      });
      Post.belongsTo(models.User, {
        foreignKey: "author_code",
        targetKey: "id",
        as: "authorData",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      category_code: DataTypes.STRING,
      status_code: DataTypes.STRING,
      author_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
