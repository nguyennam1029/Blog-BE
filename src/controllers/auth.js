// lay ra het funtion trong services

import { email, password, name, confirmPassword } from "../helper/joi_schema";
import { badRequest, interalServerError } from "../middlewares/handle_errors";
import * as services from "../services";
import Joi from "joi";

export const register = async (req, res) => {
  const { error } = Joi.object({
    email,
    password,
    name,
    confirmPassword,
  }).validate(req.body);

  if (error) return badRequest(res, error?.details[0]?.message);

  try {
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const logOut = async (req, res) => {
  try {
    await res.clearCookie("sessionToken");
    return res.status(200).json({
      err: 0,
      mess: "LogOut Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      err: 1,
      mess: "Internal Server Error",
    });
  }
};
export const login = async (req, res) => {
  const { error } = Joi.object({ email, password }).validate(req.body);
  if (error) return badRequest(res, error?.error?.details[0]?.message);
  try {
    const response = await services.login(req.body);
    return res.status(200).json(response);

    //   if (response.err === 1) {
    //     // Nếu có lỗi xảy ra trong quá trình đăng nhập
    //     return res.status(401).json(response);
    // } else {
    //     // Nếu đăng nhập thành công
    //     return res.status(200).json(response);
    // }
  } catch (error) {
    return badRequest(res, error);
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await services.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return interalServerError(res);
  }
};

export const getAccountMe = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to attach the user object to the request
    const user = await services.getAccountMe(userId);
    return res.status(200).json(user);
  } catch (error) {
    return interalServerError(res);
  }
};
