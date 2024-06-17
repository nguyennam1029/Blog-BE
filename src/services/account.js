import db from "../models";
import jwt from "jsonwebtoken";

export const getUser = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await db.User.findByPk(decoded.id);

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
