const { Comment, User, Post } = require("../models");

exports.createComment = async (postId, content, parentId, userId) => {
  const comment = await Comment.create({
    content,
    postId,
    parentId,
    userId,
  });
  return comment;
};

exports.getCommentsByPost = async (postId) => {
  const comments = await Comment.findAll({
    where: { postId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"], // chỉ lấy những thuộc tính cần thiết
      },
      {
        model: Comment,
        as: "replies",
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      },
    ],
    order: [["createdAt", "ASC"]],
  });
  return comments;
};

exports.deleteComment = async (commentId) => {
  await Comment.destroy({ where: { id: commentId } });
};
