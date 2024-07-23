import account from "./account";
import auth from "./auth";
import post from "./post";
import category from "./category";
import comment from "./comment";

import { notFound } from "../middlewares/handle_errors";
const initRoutes = (app) => {
  app.use("/api/v1/account", account);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/post", post);
  app.use("/api/v1/category", category);
  app.use("/api/v1/comments", comment);

  app.use(notFound);
};

module.exports = initRoutes;
