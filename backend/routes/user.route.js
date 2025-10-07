import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";
import authorize from "../middlewares/authorize.js";

router.get("/", authorize, userController.getUsers);
router.get("/:id", authorize, userController.getUserById);

export default router;
