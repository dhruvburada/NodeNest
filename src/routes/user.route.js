import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/register", upload.fields([{ name: "avtar", maxCount:1},{name:"coverImage",maxCount:1}]), registerUser);

export default router;
