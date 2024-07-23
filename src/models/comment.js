"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post",
      });
      Comment.belongsTo(models.Comment, {
        foreignKey: "parentId",
        as: "parent",
      });
      Comment.hasMany(models.Comment, {
        foreignKey: "parentId",
        as: "replies",
      });
    }
  }
  Comment.init(
    {
      content: DataTypes.TEXT,
      postId: DataTypes.INTEGER,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
