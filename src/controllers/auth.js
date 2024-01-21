// lay ra het funtion trong services

import { email, password } from "../helper/joi_schema";
import { badRequest, interalServerError } from "../middlewares/handle_errors";
import * as services from "../services";
import Joi from "joi";

export const register = async (req, res) => {
  const {error} = Joi.object({ email, password }).validate(req.body);
  if (error) return badRequest(res, error?.details[0]?.message);

  try {
   const response = await services.register(req.body);
    return res.status(200).json(response)
  } catch (error) {
    return interalServerError(res);
  }
};

export const login = async (req, res) => {
    const {error} = Joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(res, error?.error?.details[0]?.message);
  try {
    const response = await services.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
