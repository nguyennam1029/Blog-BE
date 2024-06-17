import { label } from "../helper/joi_schema";
import { badRequest, interalServerError } from "../middlewares/handle_errors";
import * as services from "../services";
import Joi from "joi";

export const getCategories = async (req, res) => {

  try {
    const response = await services.getCategories(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const createNewCategory = async (req, res) => {
  const { error } = Joi.object({
    label
  }).validate(req.body);
  if (error) return badRequest(res, error?.details[0]?.message);

    try {
      const response = await services.createNewCategory(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return interalServerError(res);
    }
};
//  =============== UPDATE POST ============== 
export const updateCategory = async (req, res) => {

  const { error } = Joi.object({
    id
  }).validate({id:req.body.id});
  if (error) return badRequest(res, error?.details[0]?.message);

  try {
    const response = await services.updateCategory(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

//  =============== DELETE POST ============== 
export const deleteCategory = async (req, res) => {


  const { error } = Joi.object({
    id
  }).validate({id:req.query.id});
  if (error) return badRequest(res, error?.details[0]?.message);

  try {
    const response = await services.deleteCategory(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
// export const getPosts = async (req, res) => {
// console.log("🚀 ~ getPosts ~ req:", req.query)

//     try {
//       const response = await services.getPosts(req.query);
//       return res.status(200).json(response);
//     } catch (error) {
//       return interalServerError(res);
//     }
// };