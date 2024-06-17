import {
  title,
  image,
  description,
  category_code,
  id,
  status_code,
} from "../helper/joi_schema";
import { badRequest, interalServerError } from "../middlewares/handle_errors";
import * as services from "../services";
import Joi from "joi";

export const createNewPost = async (req, res) => {
  const { error } = Joi.object({
    title,
    image,
    description,
    category_code,
    status_code,
  }).validate(req.body);
  console.log(error);
  if (error) return badRequest(res, error?.details[0]?.message);

  try {
    const response = await services.createNewPost(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const getPosts = async (req, res) => {
  try {
    const response = await services.getPosts(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ getPosts ~ error:", error);
    return interalServerError(res);
  }
};
export const getDetailPost = async (req, res) => {
  const { error } = Joi.object({
    id,
  }).validate({ id: req.query.id });
  if (error) return badRequest(res, error?.details[0]?.message);

  try {
    const response = await services.getPostDetail(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ getPosts ~ error:", error);
    return interalServerError(res);
  }
};
//  =============== UPDATE POST ==============
export const updatePost = async (req, res) => {
  const { error } = Joi.object({
    id,
  }).validate({ id: req.body.id });
  if (error) return badRequest(res, error?.details[0]?.message);

  try {
    const response = await services.updatePost(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

//  =============== DELETE POST ==============
export const deletePost = async (req, res) => {
  const { error } = Joi.object({
    id,
  }).validate({ id: req.query.id });
  if (error) return badRequest(res, error?.details[0]?.message);

  try {
    const response = await services.deletePost(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
