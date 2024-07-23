import * as services from "../services";

exports.createComment = async (req, res) => {
  try {
    const { postId, content, parentId, userId } = req.body;
    const comment = await services.createComment(
      postId,
      content,
      parentId,
      userId
    );
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await services.getCommentsByPost(postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await services.deleteComment(commentId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
