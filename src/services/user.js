import db from "../models";
import jwt from "jsonwebtoken";

export const getUser = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
        attributes: { exclude: ["password"] },
      });

      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Succesfully" : "Not Found",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
