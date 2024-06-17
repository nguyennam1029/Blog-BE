import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/verify_token";
const router = express.Router();

router.get("/", controllers.getPosts);
router.get("/detail", controllers.getDetailPost);
router.use(verifyToken);
router.post("/", controllers.createNewPost);
router.put("/", controllers.updatePost);
router.delete("/", controllers.deletePost);

module.exports = router;
