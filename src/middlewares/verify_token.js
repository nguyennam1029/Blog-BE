import jwt from "jsonwebtoken";
import { notAuth } from "./handle_errors";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return notAuth("Require authorization", res);

  const tokenParts = authHeader.split(" ");
  if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
    return notAuth("Malformed authorization header", res);
  }

  const accessToken = tokenParts[1];
  console.log("🚀 ~ verifyToken ~ accessToken:", accessToken);

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return notAuth("Access token has expired", res);
      } else if (err.name === "JsonWebTokenError") {
        return notAuth("Access token is invalid", res);
      } else {
        return notAuth("Failed to authenticate token", res);
      }
    }

    req.user = decoded;

    next();
  });
};
