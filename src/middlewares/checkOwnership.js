import db from "../models";
import { forbiddenError, interalServerError, notAuth } from "./handle_errors";

export const checkOwnership = async (req, res, next) => {
  const { id } = req.query; // Lấy id bài viết từ URL
  // console.log("🚀 ~ checkOwnership ~ id:", id);
  const userId = req.user.id; // Lấy id người dùng từ thông tin xác thực (đã được gán trong verifyToken)
  // console.log("🚀 ~ checkOwnership ~ userId:", userId);
  // console.log("🚀 ~ checkOwnership ~ req.user:", req.user);

  try {
    // Tìm bài viết theo id
    const post = await db.Post.findByPk(id, {
      raw: true,
      nest: true,
      attributes: [],
      include: [
        {
          model: db.User,
          as: "authorData",
          attributes: ["id", "name", "email", "role_code"],
        },
      ],
    });
    // console.log("🚀 ~ checkOwnership ~ post:", post);

    if (!post) {
      return notAuth("Post not found", res);
    }

    if (req.user?.role_code === "R1" || post?.authorData?.id == userId) {
      return next();
    }

    // Nếu không phải tác giả và không phải admin, từ chối yêu cầu
    return res.status(403).json({
      err: 1,
      mes: "Access denied",
    });
  } catch (error) {
    // console.log("🚀 ~ checkOwnership ~ error:", error);
    // Xử lý lỗi hệ thống
    return interalServerError(res);
  }
};
