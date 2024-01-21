import { title, image, description, category_code } from "../helper/joi_schema";
import { badRequest, interalServerError } from "../middlewares/handle_errors";
import * as services from "../services";
import Joi from "joi";

export const createNewPost = async (req, res) => {
  const { error } = Joi.object({
    title,
    image,
    description,
    category_code,
  }).validate(req.body);
  if (error) return badRequest(res, error?.details[0]?.message);

    try {
      const response = await services.createNewPost(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return interalServerError(res);
    }
};
