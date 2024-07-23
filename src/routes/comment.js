import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/verify_token";
const router = express.Router();

router.get("/post/:postId", controllers.getCommentsByPost);
router.use(verifyToken);
router.post("/", controllers.createComment);
router.delete("/:commentId", controllers.deleteComment);

module.exports = router;
