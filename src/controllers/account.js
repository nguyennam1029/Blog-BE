import { badRequest, interalServerError } from "../middlewares/handle_errors";
import * as services from "../services";

export const getCurrent = async (req, res) => {
  // const token = req.headers.authorization.split(" ")[1];
  const id = req.user.id;

  try {
    const response = await services.getUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
export const getUserPosts = async (req, res) => {
  // const token = req.headers.authorization.split(" ")[1];
  const userId = req.user.id;

  try {
    const response = await services.getUserPosts(userId);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
