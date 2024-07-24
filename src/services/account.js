import { where } from "sequelize";
import db from "../models";

export const getUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findByPk(id);

      resolve({
        err: user ? 0 : 1,
        mes: user ? "Succesfully" : "User not found",
        data: user,
      });
    } catch (error) {
      console.error("Failed to decode JWT token:", error);
      reject(error);
    }
  });
export const getUserPosts = async (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const { count, rows: data } = await db.Post.findAndCountAll({
        where: {
          author_code: userId,
        },
        attributes: ["id", "image"],
        include: [
          {
            model: db.User,
            as: "authorData",
            attributes: ["name", "email"],
          },
        ],
      });

      resolve({
        err: data ? 0 : 1,
        mes: data ? "Get user posts successfully" : "Get user posts false",
        count,
        data,
      });
    } catch (error) {
      console.error("Failed to decode JWT token:", error);
      reject(error);
    }
  });
// ================== Delete Post ================
export const deleteUserPost = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes:
          response > 0 ? `${response} row(s) deleted.` : "Cannot delete post",
      });
    } catch (error) {
      reject(error);
    }
  });
