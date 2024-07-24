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
          role_code: "R2",
        },
      });
      const token = created
        ? jwt.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role_code,
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
      // Tìm người dùng theo email
      const user = await db.User.findOne({
        where: { email },
        raw: true, // Chỉ lấy dữ liệu thô
      });

      if (!user) {
        return resolve({
          err: 1,
          mes: "Email not found",
          access_token: null,
        });
      }

      // So sánh mật khẩu
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return resolve({
          err: 1,
          mes: "Password is incorrect",
          access_token: null,
        });
      }

      // Tạo token với role_code
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role_code: user.role_code, // Đảm bảo bao gồm role_code
        },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      resolve({
        err: 0,
        mes: "Login is successful",
        access_token: token,
      });
    } catch (error) {
      console.error("Login error:", error);
      reject({
        err: 1,
        mes: "Internal server error",
        access_token: null,
      });
    }
  });

export const logOut = async (req, res) => {
  try {
    res.clearCookie("sessionToken");
  } catch (error) {
    throw error;
  }
};

// ================ GET ALL USERS ===============
export const getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { count, rows: data } = await db.User.findAndCountAll({
        attributes: { exclude: ["password"] },
      });
      resolve({
        err: data ? 0 : 1,
        mes: data ? "Fetch users successfully" : "Cannot get users",

        count,
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// ================ GET ACCOUNT ME ===============
export const getAccountMe = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        resolve({
          err: 1,
          mes: "User not found",
        });
      } else {
        resolve({
          err: 0,
          mes: "Fetch account successfully",
          data: user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
