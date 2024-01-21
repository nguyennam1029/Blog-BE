

import { badRequest, interalServerError } from "../middlewares/handle_errors";
import * as services from "../services";


export const getCurrent = async (req, res) => {
    const {id} = req.user;
    try {
    const response = await services.getUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};