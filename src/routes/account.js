import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/verify_token";
const router = express.Router();
router.use(verifyToken);
router.get("/me", controllers.getCurrent);
router.get("/posts", controllers.getUserPosts);

module.exports = router;
