import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { badRequest } from "../middlewares/handle_errors";
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// ================== REGISTER ================
export const register = (req) =>
  new Promise(async (resolve, reject) => {
    const { email, password, name, confirmPassword } = req;
    console.log(
      "🚀 ~ newPromise ~ email, password,name:",
      email,
      password,
      name,
      confirmPassword
    );

    try {
      const [user, created] = await db.User.findOrCreate({
        where: { email: email },
        defaults: {
          email,
          name,
          password: hashPassword(password),
        },
      });
      const token = created
        ? jwt.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: created ? 0 : 1,
        mes: created ? "register successfully" : "Email is used",
        access_token: token ? ` ${token}` : null,
      });
    } catch (error) {
      reject(error);
    }
  });

// ================ LOGIN ===============

export const login = (req) =>
  new Promise(async (resolve, reject) => {
    const { email, password } = req;

    try {
      const response = await db.User.findOne({
        where: { email: email },
        raw: false,
      });

      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role: response.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: token ? 0 : 1,
        mes: !response
          ? "Email not found"
          : token
          ? "Login is successfully"
          : "Password wrong",
        access_token: token ? `${token}` : null,
      });
    } catch (error) {
      reject("err");
    }
  });

export const logOut = async (req, res) => {
  try {
    res.clearCookie("sessionToken");
  } catch (error) {
    throw error;
  }
};
