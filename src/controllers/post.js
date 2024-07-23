import {
  title,
  image,
  description,
  category_code,
  id,
  status_code,
  short_description,
} from "../helper/joi_schema";
import { badRequest, interalServerError } from "../middlewares/handle_errors";
import * as services from "../services";
import Joi from "joi";
// Define schema separately for reuse
const postSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  short_description: Joi.string().optional(),
  category_code: Joi.string().optional(),
  status_code: Joi.string().optional(),
});
export const createNewPost = async (req, res) => {
  // Validate request body
  const { error } = postSchema.validate(req.body);
  if (error) return badRequest(res, error.details[0].message);

  try {
    // Add author_code to request body
    const requestData = { ...req.body, author_code: req.user.id };

    const response = await services.createNewPost(requestData);
    return res.status(response.err === 0 ? 201 : 400).json(response);
  } catch (error) {
    return internalServerError(res);
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
  const { id } = req.query;

  const { error } = Joi.object({
    id: Joi.string().required(),
  }).validate({ id });

  if (error) return badRequest(res, error?.details[0]?.message);

  try {
    const response = await services.updatePost({ id, ...req.body });
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
