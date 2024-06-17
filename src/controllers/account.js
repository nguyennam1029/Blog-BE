import { badRequest, interalServerError } from "../middlewares/handle_errors";
import * as services from "../services";

export const getCurrent = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("🚀 ~ getCurrent ~ token:", token);
  try {
    const response = await services.getUser(token);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
