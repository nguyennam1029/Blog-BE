import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/verify_token";
import { checkOwnership } from "../middlewares/checkOwnership";
const router = express.Router();

router.get("/", controllers.getPosts);
router.get("/detail", controllers.getDetailPost);
router.use(verifyToken);
router.post("/", controllers.createNewPost);
router.put("/", checkOwnership, controllers.updatePost);
router.delete("/", checkOwnership, controllers.deletePost);

module.exports = router;
