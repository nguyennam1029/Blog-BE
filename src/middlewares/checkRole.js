import { forbiddenError } from "./handle_errors";

export const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role_code;

    if (!roles.includes(userRole)) {
      return forbiddenError(res, "Access denied");
    }

    next();
  };
};
