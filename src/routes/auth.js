import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/verify_token";
import { checkRole } from "../middlewares/checkRole";
const router = express.Router();

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.get("/logOut", controllers.logOut);
router.get("/users", verifyToken, checkRole(["R1"]), controllers.getAllUsers);
router.get("/me", verifyToken, controllers.getAccountMe);
module.exports = router;
